# Site Manual & Roadmap - APEX Magazine

## Current Status
- **Auth**: Google Login integrated via Navbar.
- **Articles**: 
  - Mock data is currently used in `App.tsx`.
  - **ArticleForm** is implemented for adding new articles (Draft mode).
  - **Backend** handles image uploads to `public/uploads/` and HTML sanitization.
- **SEO**: `react-helmet-async` integrated for dynamic meta tags.
- **Legal**: GDPR and Impressum pages available via Footer.

## Placeholders & TODOs
1. **Recaptcha**: The verification in `server.ts` is currently mocked. You need to add your `SITE_KEY` and `SECRET_KEY`.
2. **Database Migration**: The `Journal` component currently uses `MOCK_ARTICLES`. 
   - *Action*: Update `Journal.tsx` to fetch from Firestore `articles` collection.
3. **Moderation UI**: There is no UI for admins to "Approve" articles yet.
   - *Action*: Create an Admin Dashboard to toggle `published: true` on articles.
4. **Sitemap**: `public/sitemap.xml` needs to be created and updated as new articles are added.

## Security Features
- **XSS**: All article content is sanitized via `DOMPurify` on the backend before saving.
- **Rate Limiting**: Users are limited to 3 article submissions per 10 minutes (IP-based).
- **Email Validation**: Handled by Firebase Auth and HTML5 input types.

## Future Roadmap
### 1. Mobile Optimization
- Implement "Pull to Refresh" for the article list.
- Optimize image sizes using a CDN or sharp (Node.js library) on upload.
- Add PWA (Progressive Web App) support for offline reading.

### 2. CDN Integration (Images)
To scale the application and handle high traffic, it is recommended to move image storage from the local server to a CDN (like Firebase Storage, AWS S3, or Cloudinary).
#### Steps to implement:
1. **Update `server.ts`**: In the `/api/upload` route, after the `sharp` optimization, upload the resulting file to your chosen CDN provider using their SDK.
2. **Return CDN URL**: Instead of returning a local path (`/uploads/...`), return the public URL provided by the CDN.
3. **Update Firestore**: Store the CDN URL in the `article` document.
4. **Nginx Config**: If using a VPS, you can still use Nginx to cache these CDN assets or redirect requests.

### 3. Performance
- **Lazy Loading**: Use `React.lazy` for heavy components like `ArticleForm` and `LegalPages`.
- **Image Optimization**: Implement WebP conversion on the backend.
- **Caching**: Add Redis or a simple in-memory cache for frequently read articles.

### 3. Cybersecurity
- Implement CSRF protection for the Express API.
- Add Security Headers (Helmet middleware for Express).
- Regular dependency audits (`npm audit`).

##  Русский первод

# Руководство по эксплуатации и дорожная карта - APEX Magazine

## Текущее состояние
- **Аутентификация**: Интегрирован вход через Google (Navbar).
- **Статьи**: 
  - В `App.tsx` используются тестовые данные (mock).
  - **ArticleForm** реализован для добавления новых статей (режим черновика).
  - **Бэкенд** обрабатывает загрузку изображений в `public/uploads/` и санитизацию HTML.
- **SEO**: Интегрирован `react-helmet-async` для динамических мета-тегов.
- **Юридические страницы**: GDPR и Impressum доступны через футер.

## Заглушки и задачи (TODOs)
1. **Recaptcha**: Верификация в `server.ts` сейчас имитируется. Добавьте свои `SITE_KEY` и `SECRET_KEY`.
2. **Миграция базы данных**: Компонент `Journal` сейчас использует `MOCK_ARTICLES`. 
   - *Действие*: Обновите `Journal.tsx` для получения данных из коллекции `articles` в Firestore.
3. **UI модерации**: Нет интерфейса для администраторов, чтобы "Одобрять" статьи.
   - *Действие*: Создайте панель администратора для переключения `published: true` у статей.
4. **Карта сайта**: `public/sitemap.xml` нужно создать и обновлять при добавлении новых статей.

## Функции безопасности
- **XSS**: Весь контент статей санитизируется через `DOMPurify` на бэкенде перед сохранением.
- **Лимитирование запросов**: Пользователи ограничены 3 публикациями статей в 10 минут (по IP).
- **Валидация email**: Обрабатывается Firebase Auth и HTML5 типами полей.

## Дорожная карта

### 1. Мобильная оптимизация
- Реализовать "Pull to Refresh" для списка статей.
- Оптимизировать размеры изображений с помощью CDN или sharp при загрузке.
- Добавить PWA поддержку для офлайн-чтения.

### 2. Интеграция CDN (изображения)
Для масштабирования приложения и обработки высокого трафика рекомендуется переместить хранение изображений с локального сервера на CDN (Firebase Storage, AWS S3 или Cloudinary).

#### Шаги для реализации:
1. **Обновите `server.ts`**: В маршруте `/api/upload` после оптимизации через sharp загрузите полученный файл в выбранный CDN с помощью их SDK.
2. **Возвращайте CDN URL**: Вместо локального пути (`/uploads/...`) возвращайте публичный URL от CDN.
3. **Обновите Firestore**: Храните CDN URL в документе `article`.
4. **Конфигурация Nginx**: При использовании VPS можно настроить Nginx для кэширования этих CDN-ресурсов или перенаправления запросов.

### 3. Производительность
- **Ленивая загрузка**: Используйте `React.lazy` для тяжелых компонентов, таких как `ArticleForm` и `LegalPages`.
- **Оптимизация изображений**: Реализуйте конвертацию в WebP на бэкенде.
- **Кэширование**: Добавьте Redis или простое кэширование в памяти для часто читаемых статей.

### 4. Кибербезопасность
- Реализовать CSRF защиту для Express API.
- Добавить заголовки безопасности (Helmet middleware для Express).
- Регулярные аудиты зависимостей (`npm audit`).

## Обслуживание и мониторинг

### Ежедневные задачи
- Проверка логов ошибок: `pm2 logs apex-magazine --err`
- Мониторинг дискового пространства: `df -h`
- Проверка загрузки CPU: `htop`

### Еженедельные задачи
- Проверка неопубликованных статей в Firestore
- Аудит безопасности: `npm audit`
- Обновление зависимостей: `npm update`

### Ежемесячные задачи
- Бэкап базы данных Firestore (экспорт)
- Ротация логов Nginx
- Проверка SSL сертификата: `sudo certbot renew --dry-run`

## Полезные скрипты для администрирования

```bash
# Создание бэкапа статей
node scripts/backup-articles.js

# Очистка старых загрузок
node scripts/clean-uploads.js --days=30

# Проверка битых ссылок
npx broken-link-checker https://your-domain.com

# Генерация карты сайта
node scripts/generate-sitemap.js