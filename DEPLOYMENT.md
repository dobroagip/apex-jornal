# Deployment Guide - APEX Magazine

Полное руководство по развертыванию React + Express приложения с Firebase.

## Требования
- Node.js 18+ (рекомендуется v22+)
- Firebase проект (настроен)
- VPS сервер (Ubuntu 20.04+) или Google Cloud Run
- Домен с настроенным DNS

## Локальная разработка

```bash
# 1. Установка зависимостей
npm install

# 2. Создание .env файла (опционально)
cp .env.example .env

# 3. Запуск dev сервера
npm run dev
# Приложение: http://localhost:5173
# API сервер: http://localhost:3000
```

## Production Build

```bash
# Сборка фронтенда
npm run build

# Проверка сборки
npm run preview
```

**Важно**: В production режиме Express сервер автоматически раздает статические файлы из `dist/`.

---

## 🚀 Развертывание на VPS (Ubuntu/Debian)

### Шаг 1: Подготовка сервера

```bash
# Обновление системы
sudo apt update && sudo apt upgrade -y

# Установка Node.js 18+
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs nginx git

# Проверка версий
node --version  # должно быть v18+
npm --version
```

### Шаг 2: Загрузка проекта

```bash
# Вариант А: через Git
git clone <your-repo-url> /var/www/apex-magazine
cd /var/www/apex-magazine

# Вариант Б: через SCP (с локальной машины)
scp -r ./apex-jornal user@your-server:/var/www/apex-magazine
```

### Шаг 3: Установка зависимостей

```bash
cd /var/www/apex-magazine

# Установка production зависимостей
npm install --omit=dev

# Сборка фронтенда
npm run build

# Создание папки для загрузок (НЕ НУЖНА - изображения в Firebase Storage)
# mkdir -p public/uploads
# chmod 755 public/uploads
```

### Шаг 4: Настройка переменных окружения

```bash
# Создание .env файла
cat > .env << 'EOF'
NODE_ENV=production
PORT=3000
RECAPTCHA_SECRET_KEY=your_recaptcha_secret_here
EOF

# Убедитесь что firebase-applet-config.json существует
ls -la firebase-applet-config.json
```

### Шаг 5: Настройка Firebase Admin SDK

**ВАЖНО**: Для работы Firebase Admin SDK на сервере нужны credentials.

```bash
# Вариант А: Application Default Credentials (рекомендуется для Cloud Run)
# Скачайте service account key из Firebase Console:
# Project Settings > Service Accounts > Generate new private key

# Сохраните файл как firebase-admin-key.json
nano firebase-admin-key.json
# Вставьте содержимое скачанного JSON

# Установите переменную окружения
export GOOGLE_APPLICATION_CREDENTIALS="/var/www/apex-magazine/firebase-admin-key.json"

# Добавьте в .env
echo "GOOGLE_APPLICATION_CREDENTIALS=/var/www/apex-magazine/firebase-admin-key.json" >> .env
```

### Шаг 6: Process Manager (PM2)

```bash
# Установка PM2 глобально
sudo npm install -g pm2

# ВАЖНО: Используйте npm start, а не npm run dev
pm2 start npm --name "apex-magazine" -- start

# Автозапуск при перезагрузке
pm2 save
pm2 startup
# Выполните команду, которую покажет pm2 startup

# Полезные команды PM2
pm2 status              # Статус приложения
pm2 logs apex-magazine  # Просмотр логов
pm2 restart apex-magazine  # Перезапуск
pm2 stop apex-magazine     # Остановка
```

### Шаг 7: Nginx Reverse Proxy

```bash
# Создание конфигурации Nginx
sudo nano /etc/nginx/sites-available/apex-magazine
```

Вставьте следующую конфигурацию:

```nginx
server {
    listen 80;
    server_name your-domain.com www.your-domain.com;

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
        
        # Таймауты
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }

    # Статические файлы (dist)
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        proxy_pass http://localhost:3000;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

```bash
# Активация конфигурации
sudo ln -s /etc/nginx/sites-available/apex-magazine /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default  # Удаляем дефолтный сайт

# Проверка конфигурации
sudo nginx -t

# Перезапуск Nginx
sudo systemctl restart nginx
```

### Шаг 8: SSL сертификат (Let's Encrypt)

```bash
# Установка Certbot
sudo apt install certbot python3-certbot-nginx -y

# Получение SSL сертификата
sudo certbot --nginx -d your-domain.com -d www.your-domain.com

# Автообновление сертификата (проверка)
sudo certbot renew --dry-run
```

### Шаг 9: Firestore Rules

```bash
# Установка Firebase CLI (если еще не установлен)
npm install -g firebase-tools

# Логин в Firebase
firebase login

# Деплой правил безопасности
firebase deploy --only firestore:rules
```

Пример правил (`firestore.rules`):

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
    
    match /users/{userId} {
      allow read: if true;
      allow write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

---

## 📊 Мониторинг и обслуживание

### Просмотр логов

```bash
# Логи приложения
pm2 logs apex-magazine

# Логи Nginx
sudo tail -f /var/log/nginx/apex-access.log
sudo tail -f /var/log/nginx/apex-error.log

# Системные логи
journalctl -u nginx -f
```

### Мониторинг ресурсов

```bash
# PM2 мониторинг
pm2 monit

# Использование диска
df -h

# Использование памяти
free -h

# Процессы Node.js
ps aux | grep node
```

### Бэкапы

```bash
# Создание директории для бэкапов
sudo mkdir -p /backups
sudo chmod 755 /backups

# Настройка автоматического бэкапа (crontab)
crontab -e
```

Добавьте следующие строки:

```bash
# Бэкап Firestore (экспорт через Firebase CLI) каждую ночь в 3:00
0 3 * * * cd /var/www/apex-magazine && firebase firestore:export gs://your-bucket/backups/$(date +\%Y\%m\%d) 2>/dev/null

# Очистка старых бэкапов (старше 30 дней)
0 4 * * * find /backups -name "apex-*.tar.gz" -mtime +30 -delete
```

---

## 🔧 Устранение неполадок

### Проблема: 502 Bad Gateway

```bash
# Проверить статус приложения
pm2 status

# Проверить порт 3000
sudo netstat -tlnp | grep 3000
# или
sudo lsof -i :3000

# Перезапустить приложение
pm2 restart apex-magazine

# Проверить логи на ошибки
pm2 logs apex-magazine --err
```

### Проблема: Ошибка Firebase Admin

```bash
# Проверить наличие credentials
ls -la /var/www/apex-magazine/firebase-admin-key.json

# Проверить переменные окружения
cat /var/www/apex-magazine/.env

# Проверить права доступа
chmod 600 /var/www/apex-magazine/firebase-admin-key.json

# Проверить логи
pm2 logs apex-magazine | grep -i firebase
```

### Проблема: Изображения не загружаются

**Примечание**: Изображения загружаются в Firebase Storage, а не на локальный сервер.

```bash
# Проверить Firebase Storage Rules
# В Firebase Console: Storage > Rules

# Правила должны разрешать публичное чтение:
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

### Проблема: CORS ошибки

Проверьте настройки CORS в `server.ts` - должен быть включен `cors()` middleware.

---

## 🔄 Обновление приложения

```bash
# Перейти в директорию проекта
cd /var/www/apex-magazine

# Получить последние изменения
git pull origin main

# Установить новые зависимости
npm install --omit=dev

# Пересобрать фронтенд
npm run build

# Перезапустить приложение
pm2 restart apex-magazine

# Перезапустить Nginx (если изменилась конфигурация)
sudo systemctl restart nginx
```

---

## 🌐 Google Cloud Run (альтернатива VPS)

### Dockerfile

Создайте `Dockerfile` в корне проекта:

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --omit=dev

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
```

### Деплой на Cloud Run

```bash
# Установка gcloud CLI
# https://cloud.google.com/sdk/docs/install

# Логин
gcloud auth login

# Установка проекта
gcloud config set project YOUR_PROJECT_ID

# Сборка и деплой
gcloud run deploy apex-magazine \
  --source . \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated \
  --set-env-vars NODE_ENV=production,PORT=3000

# Firebase credentials будут автоматически доступны через Application Default Credentials
```

---

## ✅ Чеклист после развертывания

- [ ] Приложение доступно по домену
- [ ] SSL сертификат установлен (HTTPS работает)
- [ ] Firebase Authentication работает
- [ ] Загрузка изображений работает (проверить Firebase Storage)
- [ ] Firestore правила развернуты
- [ ] PM2 автозапуск настроен
- [ ] Nginx логи пишутся корректно
- [ ] Бэкапы настроены (cron)
- [ ] Мониторинг настроен (pm2 monit)
- [ ] Sitemap доступен: https://your-domain.com/sitemap.xml
- [ ] robots.txt доступен: https://your-domain.com/robots.txt
- [ ] Google Analytics подключен (если нужен)
- [ ] Google AdSense настроен (если нужен)

---

## 📞 Поддержка

При возникновении проблем:
1. Проверьте логи: `pm2 logs apex-magazine`
2. Проверьте статус: `pm2 status`
3. Проверьте Nginx: `sudo nginx -t`
4. Проверьте Firebase Console на ошибки

**Контакты**: [ваш email или Telegram]
