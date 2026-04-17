# Інструкції для деплою APEX Magazine

## ✅ Виконано

- [x] Українська мова встановлена за замовчуванням
- [x] Проект зібрано (`npm run build`)
- [x] Зміни закомічено в git

## 📋 Наступні кроки

### 1. Завантажити Firebase Admin SDK ключ

Для створення суперадміна потрібен файл `firebase-admin-key.json`:

1. Відкрийте [Firebase Console](https://console.firebase.google.com/)
2. Виберіть проект **gen-lang-client-0793631432**
3. Перейдіть до **Project Settings** (⚙️) → **Service Accounts**
4. Натисніть **Generate New Private Key**
5. Збережіть файл як `firebase-admin-key.json` в корені проекту

⚠️ **ВАЖЛИВО**: Додайте цей файл до `.gitignore` (вже додано)

### 2. Створити суперадміна

Спочатку потрібно створити обліковий запис:

1. Запустіть сайт локально: `npm run dev`
2. Відкрийте в браузері та залогіньтесь через Google/Email
3. Після логіну запустіть скрипт:

```bash
node scripts/make-admin.js ВАШ_EMAIL@gmail.com admin
```

Приклад:
```bash
node scripts/make-admin.js milleniumtraffy@gmail.com admin
```

Перевірити список користувачів:
```bash
node scripts/make-admin.js --list
```

### 3. Деплой

#### Варіант A: Vercel (рекомендовано)

```bash
# Встановіть Vercel CLI
npm i -g vercel

# Деплой
vercel

# Або для production
vercel --prod
```

#### Варіант B: Firebase Hosting

```bash
# Встановіть Firebase CLI
npm i -g firebase-tools

# Логін
firebase login

# Ініціалізація (якщо ще не зроблено)
firebase init hosting

# Деплой
firebase deploy --only hosting
```

#### Варіант C: Власний сервер

```bash
# На сервері
git pull origin main
npm install
npm run build
npm start
```

### 4. Налаштування змінних середовища

Переконайтесь, що на production сервері є файл `.env` з:

```env
# F1 Motorsport Data API
VITE_F1_API_KEY=0a25f0acaemsh6b9da6670291e88p1e6555jsnac4cf6b33c4b
VITE_F1_API_HOST=f1-motorsport-data.p.rapidapi.com
```

### 5. Створення та публікація статті

Після деплою:

1. Залогіньтесь як адмін
2. Перейдіть на сторінку адміна (кнопка в футері або `/admin`)
3. Створіть нову статтю
4. Опублікуйте її

## 🔧 Корисні команди

```bash
# Локальна розробка
npm run dev

# Білд для production
npm run build

# Запуск production версії
npm start

# Перевірка типів
npm run lint

# Очистити dist
npm run clean
```

## 📝 Примітки

- Сайт тепер за замовчуванням відкривається українською мовою
- Користувачі можуть перемикати мову через селектор в навбарі
- Hardcoded суперадмін: `milleniumtraffy@gmail.com`
- Firebase проект: `gen-lang-client-0793631432`

## 🚀 Готово до деплою!

Проект повністю готовий до деплою. Виконайте кроки 1-2 для створення адміна, потім виберіть один з варіантів деплою (крок 3).
