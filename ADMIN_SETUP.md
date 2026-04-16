# 🔐 Настройка администратора APEX Magazine

## Проблема безопасности

**До исправления**: Любой авторизованный пользователь мог создавать статьи → прямой путь к спаму!

**После исправления**: Только пользователи с ролью `admin` могут создавать статьи.

---

## 🛡️ Система защиты

### 1. Firestore Rules (серверная защита)
```javascript
match /articles/{articleId} {
  // Только админы могут создавать статьи
  allow create, update: if isAdmin();
}

function isAdmin() {
  return isAuthenticated() && 
    (get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin' ||
     request.auth.token.email == "milleniumtraffy@gmail.com");
}
```

### 2. Frontend защита (ArticleForm)
- Проверка роли пользователя через `useUserRole` hook
- Блокировка доступа к форме для не-админов
- Отображение сообщения "Access Denied"

---

## 👤 Как назначить администратора

### Способ 1: Hardcoded Admin Email (быстрый)

Уже настроен в `firestore.rules`:
```javascript
request.auth.token.email == "milleniumtraffy@gmail.com"
```

**Чтобы добавить свой email:**

1. Откройте `firestore.rules`
2. Измените email на свой:
```javascript
request.auth.token.email == "your-email@gmail.com"
```
3. Деплой правил:
```bash
firebase deploy --only firestore:rules
```

### Способ 2: Через Firestore (рекомендуется)

#### Шаг 1: Создайте коллекцию `users`

В Firebase Console → Firestore Database:

1. Создайте коллекцию `users`
2. Добавьте документ с ID = UID пользователя
3. Поля документа:
```json
{
  "uid": "user-firebase-uid",
  "email": "admin@example.com",
  "displayName": "Admin Name",
  "role": "admin",
  "createdAt": "2026-04-16T00:00:00Z",
  "updatedAt": "2026-04-16T00:00:00Z"
}
```

#### Шаг 2: Получите UID пользователя

**Вариант А: Через консоль браузера**
```javascript
// После логина откройте консоль (F12) и выполните:
firebase.auth().currentUser.uid
```

**Вариант Б: Через Firebase Console**
1. Authentication → Users
2. Найдите пользователя
3. Скопируйте User UID

#### Шаг 3: Создайте скрипт для назначения админа

Создайте файл `scripts/make-admin.js`:

```javascript
const admin = require('firebase-admin');
const serviceAccount = require('../firebase-admin-key.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

async function makeAdmin(email) {
  try {
    // Получить пользователя по email
    const userRecord = await admin.auth().getUserByEmail(email);
    
    // Создать документ в Firestore
    await db.collection('users').doc(userRecord.uid).set({
      uid: userRecord.uid,
      email: userRecord.email,
      displayName: userRecord.displayName || 'Admin',
      role: 'admin',
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    });
    
    console.log(`✅ User ${email} is now an admin!`);
  } catch (error) {
    console.error('❌ Error:', error);
  }
}

// Использование
const adminEmail = process.argv[2];
if (!adminEmail) {
  console.error('Usage: node make-admin.js <email>');
  process.exit(1);
}

makeAdmin(adminEmail);
```

**Запуск:**
```bash
node scripts/make-admin.js your-email@gmail.com
```

---

## 🔍 Проверка роли пользователя

### В консоли браузера (после логина):

```javascript
// Проверить текущего пользователя
firebase.auth().currentUser.email

// Проверить роль в Firestore
firebase.firestore().collection('users')
  .doc(firebase.auth().currentUser.uid)
  .get()
  .then(doc => console.log('Role:', doc.data().role))
```

---

## 📋 Workflow публикации статей

### Для обычных пользователей:
1. Логин через Google
2. Попытка открыть админку
3. ❌ **Access Denied** - "You don't have permission"

### Для администраторов:
1. Логин через Google (с admin email)
2. Открыть админку через Footer → "Submit Article"
3. ✅ Доступ к форме создания статьи
4. Заполнить форму (Title, Image, Content)
5. Нажать "Publish Article"
6. Статья публикуется с `published: true`

---

## 🚀 Быстрый старт для первого админа

```bash
# 1. Залогиньтесь в приложение через Google

# 2. Откройте консоль браузера (F12) и выполните:
firebase.auth().currentUser.uid
# Скопируйте UID

# 3. В Firebase Console → Firestore:
# Создайте документ: users/{UID}
# Поля:
{
  "uid": "скопированный-uid",
  "email": "ваш-email@gmail.com",
  "role": "admin",
  "createdAt": "2026-04-16T00:00:00Z",
  "updatedAt": "2026-04-16T00:00:00Z"
}

# 4. Обновите страницу
# 5. Откройте админку - теперь у вас есть доступ!
```

---

## 🔒 Уровни защиты

### ✅ Что защищено:

1. **Firestore Rules** - серверная защита
   - Только админы могут создавать/редактировать статьи
   - Обычные пользователи могут только читать опубликованные статьи

2. **Frontend Guard** - защита UI
   - Проверка роли перед отображением формы
   - Сообщение "Access Denied" для не-админов

3. **Rate Limiting** - защита от спама
   - Ограничение 3 запроса на загрузку изображений за 10 минут (по IP)

4. **XSS Protection** - защита от вредоносного кода
   - Санитизация контента через DOMPurify на бэкенде

5. **CSRF Protection** - защита от подделки запросов
   - XSRF токены для всех POST запросов

---

## 📞 Troubleshooting

### Проблема: "Access Denied" для админа

**Решение:**
1. Проверьте email в Firestore Rules
2. Проверьте документ в коллекции `users`
3. Убедитесь что `role: "admin"`
4. Обновите страницу (Ctrl+R)

### Проблема: Firestore Rules не работают

**Решение:**
```bash
# Деплой правил
firebase deploy --only firestore:rules

# Проверка правил в Firebase Console
# Firestore Database → Rules → Test rules
```

### Проблема: Не могу создать статью (Permission Denied)

**Причины:**
1. Роль не `admin` в Firestore
2. Firestore Rules не задеплоены
3. Email не совпадает с hardcoded в rules

---

## 🎯 Рекомендации

1. **Используйте Firestore для ролей** вместо hardcoded email
2. **Создайте админ-панель** для управления пользователями
3. **Добавьте логирование** всех действий админов
4. **Настройте email уведомления** при создании статей
5. **Добавьте модерацию** для статей от редакторов (роль `editor`)

---

**Текущий админ email**: `milleniumtraffy@gmail.com`  
**Дата обновления**: 2026-04-16
