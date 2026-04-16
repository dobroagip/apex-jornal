# APEX Magazine - Quick Reference

## 🚀 Быстрый старт

### Локальная разработка
```bash
./setup.sh    # Проверка окружения и установка зависимостей
npm run dev   # Запуск dev сервера
```

### Production деплой
```bash
./deploy.sh   # Автоматический деплой с PM2
```

## 📁 Структура проекта

```
apex-jornal/
├── src/                    # Фронтенд (React + TypeScript)
│   ├── components/         # React компоненты
│   ├── lib/               # Утилиты и Firebase config
│   ├── pages/             # Страницы приложения
│   └── App.tsx            # Главный компонент
├── server.ts              # Express сервер
├── public/                # Статические файлы
│   ├── uploads/           # Загруженные изображения (локально)
│   └── robots.txt         # SEO
├── dist/                  # Собранный фронтенд (после npm run build)
└── firebase-applet-config.json  # Firebase конфигурация
```

## 🔧 Основные команды

```bash
npm install              # Установка зависимостей
npm run dev             # Разработка (Vite + Express)
npm run build           # Сборка фронтенда
npm start               # Production запуск
npm run lint            # TypeScript проверка
```

## 🔐 Настройка Firebase

### 1. Firebase Client (фронтенд)
Файл: `firebase-applet-config.json`
```json
{
  "apiKey": "...",
  "authDomain": "...",
  "projectId": "...",
  "storageBucket": "...",
  "messagingSenderId": "...",
  "appId": "..."
}
```

### 2. Firebase Admin (бэкенд)
Для production нужен Service Account Key:
```bash
# Скачайте из Firebase Console > Project Settings > Service Accounts
# Сохраните как firebase-admin-key.json
export GOOGLE_APPLICATION_CREDENTIALS="$(pwd)/firebase-admin-key.json"
```

См. `FIREBASE_SETUP.md` для подробных инструкций.

## 🌐 Деплой на VPS

### Быстрый деплой
```bash
./deploy.sh
```

### Ручной деплой
```bash
# 1. Установка зависимостей
npm install --omit=dev

# 2. Сборка
npm run build

# 3. Запуск с PM2
pm2 start ecosystem.config.js

# 4. Сохранение конфигурации
pm2 save
pm2 startup
```

### Nginx конфигурация
```nginx
server {
    listen 80;
    server_name your-domain.com;
    
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## 🐳 Docker деплой

```bash
# Сборка образа
docker build -t apex-magazine .

# Запуск контейнера
docker run -d \
  -p 3000:3000 \
  -e NODE_ENV=production \
  -v $(pwd)/firebase-admin-key.json:/app/firebase-admin-key.json:ro \
  apex-magazine
```

## 📊 Мониторинг

```bash
pm2 status              # Статус приложения
pm2 logs apex-magazine  # Логи в реальном времени
pm2 monit              # Мониторинг ресурсов
```

## 🔒 Безопасность

### Firestore Rules
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /articles/{article} {
      allow read: if true;
      allow create: if request.auth != null;
      allow update, delete: if request.auth != null && 
        (request.auth.token.admin == true || resource.data.authorId == request.auth.uid);
    }
  }
}
```

### Storage Rules
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
firebase deploy --only firestore:rules
firebase deploy --only storage
```

## 🐛 Troubleshooting

### Проблема: 502 Bad Gateway
```bash
pm2 status
pm2 restart apex-magazine
sudo systemctl restart nginx
```

### Проблема: Firebase Admin ошибка
```bash
# Проверьте credentials
echo $GOOGLE_APPLICATION_CREDENTIALS
ls -la $GOOGLE_APPLICATION_CREDENTIALS

# Установите правильный путь
export GOOGLE_APPLICATION_CREDENTIALS="/var/www/apex-magazine/firebase-admin-key.json"
```

### Проблема: Изображения не загружаются
Изображения загружаются в Firebase Storage, а не на локальный сервер.
Проверьте Storage Rules в Firebase Console.

## 📚 Документация

- `README.md` - Общая информация о проекте
- `DEPLOYMENT.md` - Полное руководство по развертыванию
- `MANUAL.md` - Руководство по эксплуатации
- `ARCHITECTURE_PLAN.md` - План архитектуры и roadmap
- `FIREBASE_SETUP.md` - Настройка Firebase Admin SDK

## 🔗 Полезные ссылки

- [Firebase Console](https://console.firebase.google.com/)
- [Google Cloud Console](https://console.cloud.google.com/)
- [PM2 Documentation](https://pm2.keymetrics.io/)
- [Nginx Documentation](https://nginx.org/en/docs/)

## 📞 Поддержка

При возникновении проблем:
1. Проверьте логи: `pm2 logs apex-magazine`
2. Проверьте статус: `pm2 status`
3. Проверьте Nginx: `sudo nginx -t`
4. Проверьте Firebase Console на ошибки

---

**Версия**: 1.0.0  
**Последнее обновление**: 2026-04-16
