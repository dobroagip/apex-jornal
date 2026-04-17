# Telegram Bot - Быстрый старт

## Минимальная настройка (5 минут)

### 1. Создайте бота

1. Откройте Telegram → найдите [@BotFather](https://t.me/botfather)
2. Отправьте `/newbot`
3. Введите имя: `APEX Magazine Bot`
4. Введите username: `apex_magazine_bot` (или любой доступный)
5. Скопируйте токен (например: `1234567890:ABCdefGHI...`)

### 2. Настройте команды бота

Отправьте BotFather:
```
/setcommands
```
Выберите вашего бота, затем отправьте:
```
start - Начать работу с ботом
subscribe - Подписаться на уведомления
unsubscribe - Отписаться от уведомлений
status - Проверить статус подписки
```

### 3. Добавьте токен в .env

```bash
# Скопируйте .env.example в .env
cp .env.example .env

# Откройте .env и добавьте токен
VITE_TELEGRAM_BOT_TOKEN=ваш_токен_здесь
```

### 4. Запустите проект

```bash
npm run dev
```

## Тестирование (без Firebase Functions)

На данный момент работает:
- ✅ Форма подписки на сайте
- ✅ Сохранение email в Firestore
- ✅ Валидация и проверка дубликатов
- ✅ UI с уведомлениями об успехе/ошибке

Для полного функционала (автоматические уведомления в Telegram) нужно:
- Развернуть Firebase Functions (см. TELEGRAM_BOT_SETUP.md)
- Настроить webhook

## Структура данных в Firestore

Коллекция `subscribers`:
```javascript
{
  email: "user@example.com",
  telegramChatId: "123456789", // null пока не подключен
  telegramUsername: "username",
  subscribedAt: Timestamp,
  status: "pending" | "active" | "unsubscribed",
  source: "website" | "telegram"
}
```

## Что дальше?

Для полной интеграции см. [TELEGRAM_BOT_SETUP.md](./TELEGRAM_BOT_SETUP.md)

Основные шаги:
1. Установить Firebase CLI
2. Настроить Firebase Functions
3. Развернуть функции
4. Настроить webhook
5. Протестировать уведомления

## Проверка работы формы

1. Откройте сайт
2. Прокрутите до секции "Join the Inner Circle"
3. Введите email
4. Нажмите "Subscribe"
5. Проверьте Firestore → коллекция `subscribers`

## Безопасность

⚠️ **Важно:** Токен бота в `.env` не попадет в Git (файл в `.gitignore`)

Никогда не коммитьте:
- `.env` файл
- Токены в коде
- API ключи

## Поддержка

Если что-то не работает:
1. Проверьте консоль браузера (F12)
2. Проверьте Firebase Console → Firestore
3. Убедитесь что `.env` файл создан
4. Перезапустите dev сервер

## Стоимость

- Telegram Bot API: **Бесплатно**
- Firestore (до 1000 подписчиков): **Бесплатно**
- Firebase Functions (базовая настройка): **Бесплатно**

Для масштабирования см. документацию Firebase Pricing.
