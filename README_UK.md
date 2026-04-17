# APEX Magazine 🏎️

Автомобільний журнал про високопродуктивні автомобілі, перегони та автомобільну культуру.

## 🌍 Мови

- 🇺🇦 **Українська** (за замовчуванням)
- 🇬🇧 Англійська
- 🇩🇪 Німецька

## 🚀 Швидкий старт

```bash
# Встановити залежності
npm install

# Запустити локально
npm run dev

# Білд для production
npm run build

# Запустити production
npm start
```

## 📋 Створення суперадміна

1. Завантажте `firebase-admin-key.json` з Firebase Console
2. Залогіньтесь на сайті хоча б один раз
3. Запустіть:

```bash
node scripts/make-admin.js ВАШ_EMAIL@gmail.com admin
```

Детальні інструкції: [DEPLOY_INSTRUCTIONS.md](./DEPLOY_INSTRUCTIONS.md)

## 🛠️ Технології

- **Frontend**: React 19, TypeScript, Tailwind CSS
- **Backend**: Express, Node.js
- **Database**: Firebase Firestore
- **Auth**: Firebase Authentication
- **i18n**: i18next
- **Build**: Vite

## 📁 Структура проекту

```
apex-jornal/
├── src/
│   ├── components/     # React компоненти
│   ├── lib/           # Утиліти та конфігурація
│   └── types/         # TypeScript типи
├── public/            # Статичні файли
├── scripts/           # Скрипти (make-admin.js)
└── server.ts          # Express сервер
```

## 🔑 Змінні середовища

Створіть файл `.env`:

```env
VITE_F1_API_KEY=your_api_key
VITE_F1_API_HOST=f1-motorsport-data.p.rapidapi.com
```

## 📝 Функціонал

- ✅ Багатомовність (UK/EN/DE)
- ✅ Система статей з повним контентом
- ✅ Адмін панель для створення статей
- ✅ Firebase Authentication
- ✅ Розклад гонок F1
- ✅ Newsletter підписка
- ✅ SEO оптимізація
- ✅ GDPR compliance
- ✅ Responsive дизайн

## 👥 Ролі користувачів

- **User** - звичайний користувач
- **Editor** - може створювати чернетки статей
- **Admin** - може публікувати та редагувати всі статті
- **Superadmin** - повний доступ (hardcoded: milleniumtraffy@gmail.com)

## 🚀 Деплой

Детальні інструкції в [DEPLOY_INSTRUCTIONS.md](./DEPLOY_INSTRUCTIONS.md)

### Швидкий деплой на Vercel:

```bash
npm i -g vercel
vercel --prod
```

## 📄 Ліцензія

Apache-2.0

## 📧 Контакти

- Email: dobrocreate@gmail.com
- Website: [apex-jornal.vercel.app](https://apex-jornal.vercel.app)

---

**Зроблено з ❤️ для автомобільних ентузіастів**
