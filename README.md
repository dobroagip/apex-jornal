<div align="center">
<img width="1200" height="475" alt="APEX Magazine Banner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />

# 📰 APEX Magazine

**Современная мультиязычная платформа для публикации статей**

[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-19.2-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue.svg)](https://www.typescriptlang.org/)
[![Firebase](https://img.shields.io/badge/Firebase-12.12-orange.svg)](https://firebase.google.com/)

</div>

---

## 🚀 Быстрый старт

```bash
# 1. Клонирование репозитория
git clone <your-repo-url>
cd apex-jornal

# 2. Автоматическая настройка окружения
./setup.sh

# 3. Запуск в режиме разработки
npm run dev
```

Приложение будет доступно на:
- **Фронтенд**: http://localhost:5173
- **API сервер**: http://localhost:3000

---

## ✨ Возможности

- 🌍 **Мультиязычность** - Поддержка русского, казахского и английского языков
- 🔐 **Аутентификация** - Google OAuth через Firebase Authentication
- 📝 **Редактор статей** - Удобный интерфейс для создания и редактирования
- 🖼️ **Оптимизация изображений** - Автоматическая конвертация в WebP с помощью Sharp
- ☁️ **Firebase Storage** - Надежное хранение изображений в облаке
- 🔒 **Безопасность** - XSS защита, CSRF токены, rate limiting
- 📊 **SEO оптимизация** - Динамические meta-теги, sitemap, robots.txt
- 🎨 **Современный UI** - Tailwind CSS + Framer Motion
- ⚡ **Высокая производительность** - Vite для быстрой разработки

---

## 🛠️ Технологический стек

### Frontend
- **React 19.2** - UI библиотека
- **TypeScript 5.8** - Типизация
- **Vite 6.2** - Сборщик и dev сервер
- **Tailwind CSS 4.1** - Стилизация
- **i18next** - Интернационализация
- **React Helmet Async** - SEO meta-теги

### Backend
- **Express 5.2** - Web сервер
- **Firebase Admin SDK** - Серверная интеграция с Firebase
- **Sharp** - Обработка изображений
- **Multer** - Загрузка файлов
- **DOMPurify** - XSS защита
- **Helmet** - Security headers

### Database & Auth
- **Firebase Firestore** - NoSQL база данных
- **Firebase Authentication** - Управление пользователями
- **Firebase Storage** - Хранение файлов

---

## 📁 Структура проекта

```
apex-jornal/
├── src/                          # Фронтенд
│   ├── components/               # React компоненты
│   │   ├── ArticleCard.tsx      # Карточка статьи
│   │   ├── ArticleForm.tsx      # Форма создания статьи
│   │   ├── Navbar.tsx           # Навигация
│   │   └── ...
│   ├── lib/                     # Утилиты
│   │   └── firebase.ts          # Firebase конфигурация
│   ├── pages/                   # Страницы
│   ├── types.ts                 # TypeScript типы
│   └── App.tsx                  # Главный компонент
├── server.ts                    # Express сервер
├── public/                      # Статические файлы
│   ├── robots.txt              # SEO
│   └── uploads/                # Локальные загрузки (временные)
├── dist/                        # Production сборка
├── firebase-applet-config.json  # Firebase client config
├── firestore.rules             # Firestore security rules
├── Dockerfile                  # Docker конфигурация
├── ecosystem.config.js         # PM2 конфигурация
├── deploy.sh                   # Скрипт деплоя
└── setup.sh                    # Скрипт настройки
```

---

## 📖 Документация

- **[QUICKSTART.md](QUICKSTART.md)** - Краткая справка по командам
- **[DEPLOYMENT.md](DEPLOYMENT.md)** - Полное руководство по развертыванию
- **[FIREBASE_SETUP.md](FIREBASE_SETUP.md)** - Настройка Firebase Admin SDK
- **[MANUAL.md](MANUAL.md)** - Руководство по эксплуатации
- **[ARCHITECTURE_PLAN.md](ARCHITECTURE_PLAN.md)** - План архитектуры

---

## 🔧 Установка и настройка

### Требования
- Node.js 18+ (рекомендуется v22+)
- npm или yarn
- Firebase проект

### 1. Установка зависимостей

```bash
npm install
```

### 2. Настройка Firebase

Создайте `firebase-applet-config.json` в корне проекта:

```json
{
  "apiKey": "your-api-key",
  "authDomain": "your-project.firebaseapp.com",
  "projectId": "your-project-id",
  "storageBucket": "your-project.appspot.com",
  "messagingSenderId": "123456789",
  "appId": "your-app-id"
}
```

### 3. Настройка переменных окружения (опционально)

```bash
cp .env.example .env
```

Отредактируйте `.env`:
```env
NODE_ENV=development
PORT=3000
RECAPTCHA_SECRET_KEY=your_secret_key
```

### 4. Запуск

```bash
# Режим разработки
npm run dev

# Production сборка
npm run build
npm start
```

---

## 🚀 Развертывание

### VPS (Ubuntu/Debian)

```bash
# Быстрый деплой
./deploy.sh

# Или вручную
npm install --omit=dev
npm run build
pm2 start ecosystem.config.js
```

См. [DEPLOYMENT.md](DEPLOYMENT.md) для подробных инструкций.

### Docker

```bash
docker build -t apex-magazine .
docker run -d -p 3000:3000 apex-magazine
```

### Google Cloud Run

```bash
gcloud run deploy apex-magazine \
  --source . \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated
```

---

## 🔐 Безопасность

### Firestore Rules

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /articles/{article} {
      allow read: if true;
      allow create: if request.auth != null;
      allow update, delete: if request.auth != null && 
        (request.auth.token.admin == true || 
         resource.data.authorId == request.auth.uid);
    }
  }
}
```

Деплой правил:
```bash
firebase deploy --only firestore:rules
```

---

## 🧪 Тестирование

```bash
# TypeScript проверка
npm run lint

# Запуск тестов (когда будут добавлены)
npm test
```

---

## 📊 Мониторинг

```bash
# PM2 статус
pm2 status

# Логи в реальном времени
pm2 logs apex-magazine

# Мониторинг ресурсов
pm2 monit
```

---

## 🤝 Вклад в проект

1. Fork репозитория
2. Создайте feature branch (`git checkout -b feature/amazing-feature`)
3. Commit изменения (`git commit -m 'Add amazing feature'`)
4. Push в branch (`git push origin feature/amazing-feature`)
5. Откройте Pull Request

---

## 📝 Лицензия

Этот проект создан для образовательных целей.

---

## 📞 Контакты

При возникновении вопросов или проблем:
- Создайте Issue в репозитории
- Проверьте документацию в папке проекта

---

<div align="center">

**Сделано с ❤️ для APEX Magazine**

</div>
