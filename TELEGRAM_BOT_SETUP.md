# Telegram Bot Setup Guide

Это руководство поможет настроить Telegram бота для уведомлений о новых статьях APEX Magazine.

## Шаг 1: Создание Telegram бота

1. Откройте Telegram и найдите [@BotFather](https://t.me/botfather)
2. Отправьте команду `/newbot`
3. Введите имя бота (например: `APEX Magazine Bot`)
4. Введите username бота (например: `apex_magazine_bot`)
5. BotFather выдаст вам **токен** - сохраните его!

Пример токена: `1234567890:ABCdefGHIjklMNOpqrsTUVwxyz`

## Шаг 2: Настройка команд бота

Отправьте BotFather команду `/setcommands` и выберите вашего бота, затем отправьте:

```
start - Начать работу с ботом
subscribe - Подписаться на уведомления
unsubscribe - Отписаться от уведомлений
status - Проверить статус подписки
```

## Шаг 3: Настройка переменных окружения

### Локальная разработка

Добавьте в `.env`:

```env
VITE_TELEGRAM_BOT_TOKEN=your_bot_token_here
```

### Firebase Functions

Установите конфигурацию Firebase:

```bash
firebase functions:config:set telegram.bot_token="YOUR_BOT_TOKEN"
firebase functions:config:set app.url="https://your-domain.com"
```

Проверьте конфигурацию:

```bash
firebase functions:config:get
```

## Шаг 4: Установка зависимостей для Functions

```bash
cd functions
npm install firebase-functions firebase-admin
```

Создайте `functions/package.json` если его нет:

```json
{
  "name": "functions",
  "scripts": {
    "build": "tsc",
    "serve": "npm run build && firebase emulators:start --only functions",
    "shell": "npm run build && firebase functions:shell",
    "start": "npm run shell",
    "deploy": "firebase deploy --only functions",
    "logs": "firebase functions:log"
  },
  "engines": {
    "node": "18"
  },
  "main": "lib/index.js",
  "dependencies": {
    "firebase-admin": "^12.0.0",
    "firebase-functions": "^5.0.0"
  },
  "devDependencies": {
    "typescript": "^5.0.0"
  }
}
```

Создайте `functions/tsconfig.json`:

```json
{
  "compilerOptions": {
    "module": "commonjs",
    "noImplicitReturns": true,
    "noUnusedLocals": true,
    "outDir": "lib",
    "sourceMap": true,
    "strict": true,
    "target": "es2017"
  },
  "compileOnSave": true,
  "include": ["src"]
}
```

## Шаг 5: Создание index.ts для Functions

Создайте `functions/src/index.ts`:

```typescript
import * as telegram from './telegram';

// Export all functions
export const telegramWebhook = telegram.telegramWebhook;
export const notifyNewArticle = telegram.notifyNewArticle;
```

## Шаг 6: Деплой Functions

```bash
cd functions
npm run build
firebase deploy --only functions
```

После деплоя вы получите URL функции, например:
`https://us-central1-your-project.cloudfunctions.net/telegramWebhook`

## Шаг 7: Настройка Webhook

Установите webhook для вашего бота (замените `<TOKEN>` и `<FUNCTION_URL>`):

```bash
curl -X POST "https://api.telegram.org/bot<TOKEN>/setWebhook?url=<FUNCTION_URL>"
```

Пример:
```bash
curl -X POST "https://api.telegram.org/bot1234567890:ABCdefGHI/setWebhook?url=https://us-central1-apex-journal.cloudfunctions.net/telegramWebhook"
```

Проверьте webhook:
```bash
curl "https://api.telegram.org/bot<TOKEN>/getWebhookInfo"
```

## Шаг 8: Обновление компонента Newsletter

Замените секцию Newsletter в `src/App.tsx`:

```tsx
import Newsletter from './components/Newsletter';

// В JSX замените старую секцию на:
<Newsletter />
```

## Шаг 9: Обновление переводов

Добавьте в `src/lib/i18n.ts`:

```typescript
newsletter: {
  title: "Join the",
  accent: "Inner Circle",
  description: "Get exclusive access to behind-the-scenes content, early race reports, and member-only events.",
  placeholder: "Enter your email",
  subscribe: "Subscribe",
  subscribing: "Subscribing...",
  invalidEmail: "Please enter a valid email address",
  alreadySubscribed: "This email is already subscribed",
  successMessage: "Success! Check your email for Telegram bot link to complete subscription.",
  errorMessage: "Something went wrong. Please try again.",
  telegramInfo: "Get instant notifications via Telegram! After subscribing, you'll receive a link to connect our bot.",
  telegramSecure: "Secure & instant notifications"
}
```

## Шаг 10: Firestore Security Rules

Обновите `firestore.rules`:

```
match /subscribers/{subscriberId} {
  // Allow users to create their own subscription
  allow create: if request.auth != null 
    && request.resource.data.email == request.auth.token.email;
  
  // Only admins can read/update/delete
  allow read, update, delete: if isAdmin();
}
```

## Использование

### Для пользователей:

1. **Через сайт:**
   - Введите email в форму подписки
   - Получите письмо со ссылкой на бота
   - Нажмите `/start` в боте

2. **Напрямую через Telegram:**
   - Найдите бота по username (например: `@apex_magazine_bot`)
   - Нажмите `/start`
   - Используйте `/subscribe` для подписки

### Команды бота:

- `/start` - Приветствие и информация
- `/subscribe` - Подписаться на уведомления
- `/unsubscribe` - Отписаться
- `/status` - Проверить статус подписки

## Автоматические уведомления

Когда администратор публикует новую статью (устанавливает `published: true`), Firebase Function автоматически:

1. Находит всех активных подписчиков
2. Отправляет им уведомление в Telegram с:
   - Заголовком статьи
   - Кратким описанием
   - Ссылкой на статью

## Тестирование

### Локальное тестирование Functions:

```bash
cd functions
npm run serve
```

### Тестирование бота:

1. Найдите вашего бота в Telegram
2. Отправьте `/start`
3. Отправьте `/subscribe`
4. Создайте тестовую статью в админке
5. Проверьте, что уведомление пришло

## Мониторинг

### Логи Functions:

```bash
firebase functions:log
```

### Проверка подписчиков в Firestore:

```javascript
// В Firebase Console -> Firestore
// Коллекция: subscribers
// Поля:
// - email: string
// - telegramChatId: string
// - telegramUsername: string
// - subscribedAt: timestamp
// - status: 'active' | 'unsubscribed'
// - source: 'website' | 'telegram'
```

## Troubleshooting

### Webhook не работает:

```bash
# Проверьте webhook
curl "https://api.telegram.org/bot<TOKEN>/getWebhookInfo"

# Удалите webhook
curl "https://api.telegram.org/bot<TOKEN>/deleteWebhook"

# Установите заново
curl -X POST "https://api.telegram.org/bot<TOKEN>/setWebhook?url=<FUNCTION_URL>"
```

### Уведомления не приходят:

1. Проверьте логи Functions: `firebase functions:log`
2. Убедитесь что статья имеет `published: true`
3. Проверьте что у подписчика `status: 'active'`
4. Проверьте что `telegramChatId` не null

### Ошибка "Bot token not configured":

```bash
# Проверьте конфигурацию
firebase functions:config:get

# Установите токен
firebase functions:config:set telegram.bot_token="YOUR_TOKEN"

# Передеплойте
firebase deploy --only functions
```

## Безопасность

1. **Никогда не коммитьте токен бота в Git**
2. Используйте Firebase Functions config для production
3. Используйте `.env` для локальной разработки (добавлен в `.gitignore`)
4. Регулярно проверяйте логи на подозрительную активность

## Стоимость

- **Telegram Bot API:** Бесплатно
- **Firebase Functions:** 
  - 2 млн вызовов/месяц бесплатно
  - ~$0.40 за 1 млн вызовов после лимита
- **Firestore:** 
  - 50k чтений/день бесплатно
  - 20k записей/день бесплатно

Для небольшого журнала с ~1000 подписчиков стоимость будет минимальной или нулевой.

## Дополнительные возможности

### Добавить кнопки в сообщения:

```typescript
await fetch(url, {
  method: 'POST',
  body: JSON.stringify({
    chat_id: chatId,
    text: message,
    parse_mode: 'HTML',
    reply_markup: {
      inline_keyboard: [
        [
          { text: '📖 Read Article', url: articleUrl },
          { text: '🔗 Share', url: `https://t.me/share/url?url=${articleUrl}` }
        ]
      ]
    }
  })
});
```

### Добавить статистику:

```typescript
// В Firestore добавьте поле для отслеживания
await subscriberRef.update({
  notificationsSent: admin.firestore.FieldValue.increment(1),
  lastNotificationAt: admin.firestore.FieldValue.serverTimestamp()
});
```

### Добавить категории подписки:

```typescript
// Позволить пользователям выбирать категории
await subscriberRef.update({
  categories: ['racing', 'technical', 'interviews']
});

// При отправке проверять категорию статьи
if (subscriber.categories.includes(article.category)) {
  await sendMessage(chatId, message);
}
```
