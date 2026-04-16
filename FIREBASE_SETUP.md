# Firebase Admin SDK Setup Guide

## Проблема
В `server.ts` используется `admin.credential.applicationDefault()`, который требует правильной настройки credentials на сервере.

## Решение для VPS

### Шаг 1: Получение Service Account Key

1. Откройте [Firebase Console](https://console.firebase.google.com/)
2. Выберите ваш проект
3. Перейдите в **Project Settings** (⚙️ иконка)
4. Вкладка **Service Accounts**
5. Нажмите **Generate new private key**
6. Сохраните скачанный JSON файл

### Шаг 2: Загрузка на сервер

```bash
# С локальной машины
scp firebase-admin-key.json user@your-server:/var/www/apex-magazine/

# На сервере установите правильные права
chmod 600 /var/www/apex-magazine/firebase-admin-key.json
```

### Шаг 3: Настройка переменной окружения

```bash
# Добавьте в .env
echo "GOOGLE_APPLICATION_CREDENTIALS=/var/www/apex-magazine/firebase-admin-key.json" >> .env

# Или экспортируйте глобально
export GOOGLE_APPLICATION_CREDENTIALS="/var/www/apex-magazine/firebase-admin-key.json"

# Для постоянного экспорта добавьте в ~/.bashrc
echo 'export GOOGLE_APPLICATION_CREDENTIALS="/var/www/apex-magazine/firebase-admin-key.json"' >> ~/.bashrc
source ~/.bashrc
```

### Шаг 4: Обновление server.ts (опционально)

Если хотите явно указать путь к credentials, измените инициализацию Firebase:

```typescript
// Вместо
admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  storageBucket: firebaseConfig.storageBucket
});

// Используйте
admin.initializeApp({
  credential: admin.credential.cert('./firebase-admin-key.json'),
  storageBucket: firebaseConfig.storageBucket
});
```

## Решение для Google Cloud Run

На Cloud Run `applicationDefault()` работает автоматически, дополнительная настройка не требуется.

## Решение для Docker

### Вариант А: Через переменную окружения

```bash
docker run -d \
  -p 3000:3000 \
  -e GOOGLE_APPLICATION_CREDENTIALS=/app/firebase-admin-key.json \
  -v /path/to/firebase-admin-key.json:/app/firebase-admin-key.json:ro \
  apex-magazine
```

### Вариант Б: Встроить в образ (НЕ РЕКОМЕНДУЕТСЯ для production)

```dockerfile
# В Dockerfile
COPY firebase-admin-key.json ./
ENV GOOGLE_APPLICATION_CREDENTIALS=/app/firebase-admin-key.json
```

⚠️ **Внимание**: Не коммитьте `firebase-admin-key.json` в Git!

## Проверка настройки

```bash
# Запустите приложение
npm start

# Проверьте логи на ошибки Firebase
pm2 logs apex-magazine | grep -i firebase

# Если все настроено правильно, вы НЕ увидите ошибок типа:
# "Could not load the default credentials"
# "Error: Could not load application default credentials"
```

## Firebase Storage Rules

Убедитесь, что правила Storage разрешают публичное чтение:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /articles/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

Деплой правил:
```bash
firebase deploy --only storage
```

## Troubleshooting

### Ошибка: "Could not load the default credentials"

**Причина**: Переменная `GOOGLE_APPLICATION_CREDENTIALS` не установлена или указывает на несуществующий файл.

**Решение**:
```bash
# Проверьте путь
echo $GOOGLE_APPLICATION_CREDENTIALS
ls -la $GOOGLE_APPLICATION_CREDENTIALS

# Установите правильный путь
export GOOGLE_APPLICATION_CREDENTIALS="/var/www/apex-magazine/firebase-admin-key.json"
```

### Ошибка: "Permission denied"

**Причина**: Неправильные права доступа к файлу credentials.

**Решение**:
```bash
chmod 600 /var/www/apex-magazine/firebase-admin-key.json
chown $USER:$USER /var/www/apex-magazine/firebase-admin-key.json
```

### Ошибка: "Storage bucket not found"

**Причина**: Неправильно указан `storageBucket` в конфигурации.

**Решение**:
```bash
# Проверьте firebase-applet-config.json
cat firebase-applet-config.json | grep storageBucket

# Должно быть: "storageBucket": "your-project-id.appspot.com"
```

## Безопасность

✅ **DO:**
- Храните `firebase-admin-key.json` вне публичной директории
- Установите права `600` на файл
- Добавьте `firebase-admin-key.json` в `.gitignore`
- Используйте переменные окружения

❌ **DON'T:**
- Не коммитьте credentials в Git
- Не храните в публичной папке (public/)
- Не используйте одинаковые credentials для dev и prod
- Не давайте права `777` на файл
