# Deployment Guide - APEX Magazine

This project is a full-stack React + Express application using Firebase for database and authentication.

## Prerequisites
- Node.js 18+
- Firebase Project (already set up)
- Google Cloud Project (for hosting)

## Local Development
1. `npm install`
2. `npm run dev` (Starts Express server + Vite)

## Production Build
1. `npm run build`
   - This generates static files in `dist/`.
2. The Express server (`server.ts`) is configured to serve these static files when `NODE_ENV=production`.

## Deploying to Cloud Run (Recommended)
1. Ensure your environment variables are set in the Cloud Run configuration:
   - `FIREBASE_CONFIG` (or use the existing `firebase-applet-config.json`)
2. Deploy the container:
   - The system uses the `start` script: `node server.ts` (Note: `tsx` is for dev, use compiled JS or `node --loader ts-node/esm` for prod if not pre-compiled).
   - *Recommendation*: Compile `server.ts` to JS for production.

## VPS Deployment (Ubuntu/Debian)

### 1. Server Setup
```bash
sudo apt update && sudo apt upgrade -y
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs nginx
```

### 2. Process Management (PM2)
```bash
sudo npm install -g pm2
pm2 start tsx -- server.ts --name "apex-magazine"
# Or if compiled to JS:
# pm2 start dist/server.js --name "apex-magazine"
```

### 3. Nginx Reverse Proxy
Create `/etc/nginx/sites-available/apex`:
```nginx
server {
    listen 80;
    server_name yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    # Serve static uploads directly for performance
    location /uploads/ {
        alias /path/to/your/app/public/uploads/;
    }
}
```
`sudo ln -s /etc/nginx/sites-available/apex /etc/nginx/sites-enabled/`
`sudo nginx -t && sudo systemctl restart nginx`

### 4. SSL (Certbot)
```bash
sudo apt install certbot python3-certbot-nginx -y
sudo certbot --nginx -d yourdomain.com
```

## Firebase Rules
- Always deploy rules after changes:
  - `npx firebase deploy --only firestore:rules` (or use the provided tool).

## SEO & Sitemap
- `robots.txt` is in `public/`.
- Sitemap should be generated dynamically or manually updated in `public/sitemap.xml`.

## перевод на русский
# Руководство по развертыванию - APEX Magazine

## Требования
- Node.js 18+ (проверено на v22.21.1)
- Firebase проект (настроен)
- Git

## Быстрый старт (локальная разработка)

```bash
# 1. Клонирование
git clone <your-repo>
cd apex-jornal

# 2. Установка зависимостей
npm install

# 3. Настройка Firebase
# Убедитесь что firebase-applet-config.json в корне проекта

# 4. Запуск
npm run dev
# Приложение доступно: http://localhost:5173
# Сервер API: http://localhost:3000
# Руководство по развертыванию - APEX Magazine

## Требования
- Node.js 18+ (проверено на v22.21.1)
- Firebase проект (настроен)
- Git

## Быстрый старт (локальная разработка)

```bash
# 1. Клонирование
git clone <your-repo>
cd apex-jornal

# 2. Установка зависимостей
npm install

# 3. Настройка Firebase
# Убедитесь что firebase-applet-config.json в корне проекта

# 4. Запуск
npm run dev
# Приложение доступно: http://localhost:5173
# Сервер API: http://localhost:3000
# Обновление системы
sudo apt update && sudo apt upgrade -y

# Установка Node.js 18+
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs nginx git

# Проверка версий
node --version  # v18+ 
npm --version

# Вариант А: через Git
git clone <your-repo> /var/www/apex-magazine
cd /var/www/apex-magazine

# Вариант Б: через SCP (с локальной машины)
scp -r ./apex-jornal user@your-server:/var/www/apex-magazine

# Установка зависимостей
cd /var/www/apex-magazine
npm install --production

# Создание папки для загрузок
mkdir -p public/uploads
chmod 755 public/uploads

# Установка PM2
sudo npm install -g pm2

# Запуск приложения
pm2 start npm --name "apex-magazine" -- run dev

# Сохранение конфигурации
pm2 save
pm2 startup
# Выполните команду, которую покажет pm2 startup

# Другие команды
pm2 status
pm2 logs apex-magazine
pm2 restart apex-magazine

# Создание конфигурации
sudo nano /etc/nginx/sites-available/apex-magazine
server {
    listen 80;
    server_name your-domain.com;

    # Максимальный размер загружаемого файла
    client_max_body_size 10M;

    # Логи
    access_log /var/log/nginx/apex-access.log;
    error_log /var/log/nginx/apex-error.log;

    # Прокси на Node.js приложение
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # Статические файлы загрузок
    location /uploads/ {
        alias /var/www/apex-magazine/public/uploads/;
        expires 30d;
        add_header Cache-Control "public, immutable";
    }
}

# Активация конфигурации
sudo ln -s /etc/nginx/sites-available/apex-magazine /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default  # Удаляем дефолтный сайт
sudo nginx -t
sudo systemctl restart nginx



# Создание .env файла на сервере
cd /var/www/apex-magazine
cat > .env << 'EOF'
NODE_ENV=production
PORT=3000
GOOGLE_APPLICATION_CREDENTIALS=/var/www/apex-magazine/firebase-applet-config.json
EOF

# Деплой правил
npx firebase deploy --only firestore:rules

# Или вручную через консоль Firebase

rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /articles/{article} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}

Публикация статей (для редактора)
Доступ к админ-панели
text
https://your-domain.com/admin
Процесс публикации
Открыть /admin

Заполнить заголовки (RU, KZ, EN)

Загрузить фото (поддерживаются JPG, PNG, WebP)

Написать текст статьи (RU, KZ, EN)

Нажать "Опубликовать"

Фото автоматически:
Оптимизируются через Sharp

Конвертируются в WebP

Сохраняются в папку /uploads/

Доступны по прямой ссылке

Обслуживание и бэкапы
Ежедневный бэкап (Cron)
bash
# Добавить в crontab
crontab -e

# Бэкап статей и загрузок каждую ночь
0 3 * * * cd /var/www/apex-magazine && tar -czf /backups/apex-$(date +\%Y\%m\%d).tar.gz public/uploads/ 2>/dev/null

# Очистка старых бэкапов (старше 30 дней)
0 4 * * * find /backups -name "apex-*.tar.gz" -mtime +30 -delete
Мониторинг
bash
# Просмотр логов
pm2 logs apex-magazine

# Просмотр использования ресурсов
pm2 monit

# Проверка статуса Nginx
sudo systemctl status nginx
Устранение неполадок
Проблема: 502 Bad Gateway
bash
# Проверить запущен ли Node.js
pm2 status

# Проверить порт
netstat -tlnp | grep 3000

# Перезапустить
pm2 restart apex-magazine
Проблема: Не загружаются фото
bash
# Проверить права на папку
sudo chown -R www-data:www-data /var/www/apex-magazine/public/uploads
sudo chmod -R 755 /var/www/apex-magazine/public/uploads
Проблема: Ошибка Firebase
bash
# Проверить конфиг
cat /var/www/apex-magazine/firebase-applet-config.json

# Проверить переменные окружения
cat /var/www/apex-magazine/.env
Полезные команды
bash
# Быстрый рестарт всего
pm2 restart apex-magazine && sudo systemctl restart nginx

# Просмотр ошибок
journalctl -u nginx -f

# Обновление приложения
cd /var/www/apex-magazine
git pull
npm install --production
pm2 restart apex-magazine
##Контакты
При возникновении проблем: [ваш контакт]

text
