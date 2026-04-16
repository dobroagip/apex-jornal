# 📋 Deployment Checklist - APEX Magazine

Используйте этот чеклист для проверки готовности к развертыванию.

---

## 🔧 Подготовка к деплою

### Локальная проверка

- [ ] Проект собирается без ошибок (`npm run build`)
- [ ] TypeScript проверка проходит (`npm run lint`)
- [ ] Все зависимости установлены (`npm install`)
- [ ] `.gitignore` настроен правильно
- [ ] Секретные файлы не в Git (`firebase-admin-key.json`, `.env`)

### Firebase настройка

- [ ] Firebase проект создан
- [ ] `firebase-applet-config.json` создан и заполнен
- [ ] Firebase Authentication включен (Google provider)
- [ ] Firestore Database создан
- [ ] Firebase Storage включен
- [ ] Firestore Rules развернуты (`firebase deploy --only firestore:rules`)
- [ ] Storage Rules развернуты (`firebase deploy --only storage`)
- [ ] Service Account Key скачан (`firebase-admin-key.json`)

### Проверка конфигурации

- [ ] `package.json` содержит правильные скрипты
- [ ] `server.ts` настроен для production
- [ ] `.env.example` создан с примерами переменных
- [ ] `ecosystem.config.js` настроен для PM2
- [ ] `Dockerfile` создан (если используется Docker)

---

## 🖥️ Настройка сервера (VPS)

### Системные требования

- [ ] Ubuntu 20.04+ или Debian 11+
- [ ] Минимум 1GB RAM
- [ ] Минимум 10GB свободного места
- [ ] Открыт порт 80 (HTTP)
- [ ] Открыт порт 443 (HTTPS)
- [ ] Открыт порт 22 (SSH)

### Установка ПО

- [ ] Node.js 18+ установлен
- [ ] npm установлен
- [ ] Nginx установлен
- [ ] PM2 установлен глобально
- [ ] Git установлен (если деплой через Git)
- [ ] Certbot установлен (для SSL)

### Загрузка проекта

- [ ] Проект загружен на сервер (Git clone или SCP)
- [ ] Расположен в `/var/www/apex-magazine`
- [ ] Права доступа настроены (`chmod`, `chown`)
- [ ] `firebase-admin-key.json` загружен на сервер
- [ ] Права на `firebase-admin-key.json` установлены (`chmod 600`)

### Установка зависимостей

- [ ] `npm install --omit=dev` выполнен
- [ ] `npm run build` выполнен успешно
- [ ] Папка `dist/` создана
- [ ] Папка `logs/` создана

### Переменные окружения

- [ ] `.env` файл создан на сервере
- [ ] `NODE_ENV=production` установлен
- [ ] `PORT=3000` установлен
- [ ] `GOOGLE_APPLICATION_CREDENTIALS` установлен
- [ ] `RECAPTCHA_SECRET_KEY` установлен (если используется)

---

## 🚀 Запуск приложения

### PM2 настройка

- [ ] PM2 запущен (`pm2 start ecosystem.config.js`)
- [ ] Приложение в статусе "online" (`pm2 status`)
- [ ] Логи не показывают ошибок (`pm2 logs apex-magazine`)
- [ ] PM2 автозапуск настроен (`pm2 startup`, `pm2 save`)
- [ ] Приложение отвечает на `http://localhost:3000`

### Nginx настройка

- [ ] Конфигурация создана в `/etc/nginx/sites-available/apex-magazine`
- [ ] Symlink создан в `/etc/nginx/sites-enabled/`
- [ ] Дефолтный сайт удален (`rm /etc/nginx/sites-enabled/default`)
- [ ] Конфигурация валидна (`sudo nginx -t`)
- [ ] Nginx перезапущен (`sudo systemctl restart nginx`)
- [ ] Сайт доступен по домену (HTTP)

### SSL сертификат

- [ ] DNS записи настроены (A record на IP сервера)
- [ ] Certbot установлен
- [ ] SSL сертификат получен (`sudo certbot --nginx -d your-domain.com`)
- [ ] Сайт доступен по HTTPS
- [ ] HTTP редиректит на HTTPS
- [ ] Автообновление сертификата работает (`sudo certbot renew --dry-run`)

---

## ✅ Функциональное тестирование

### Основные функции

- [ ] Главная страница загружается
- [ ] Навигация работает
- [ ] Переключение языков работает (RU/KZ/EN)
- [ ] Google Login работает
- [ ] Logout работает
- [ ] Форма создания статьи доступна (для авторизованных)
- [ ] Загрузка изображений работает
- [ ] Изображения оптимизируются в WebP
- [ ] Изображения загружаются в Firebase Storage
- [ ] Статьи сохраняются в Firestore
- [ ] Статьи отображаются на главной странице
- [ ] Детальная страница статьи работает

### SEO проверка

- [ ] `robots.txt` доступен (`/robots.txt`)
- [ ] `sitemap.xml` доступен (`/sitemap.xml`)
- [ ] Meta-теги корректны (проверить через View Source)
- [ ] Open Graph теги настроены
- [ ] Favicon отображается

### Безопасность

- [ ] HTTPS работает (зеленый замок в браузере)
- [ ] CSRF защита работает
- [ ] XSS защита работает (контент санитизируется)
- [ ] Rate limiting работает (попробуйте создать >3 статей за 10 минут)
- [ ] Firestore Rules защищают данные
- [ ] Storage Rules защищают файлы
- [ ] Секретные файлы не доступны публично

### Производительность

- [ ] Страницы загружаются быстро (< 3 секунды)
- [ ] Изображения оптимизированы
- [ ] Gzip/Brotli сжатие работает
- [ ] Статические файлы кэшируются
- [ ] Core Web Vitals в норме (проверить через PageSpeed Insights)

---

## 📊 Мониторинг и бэкапы

### Мониторинг

- [ ] PM2 мониторинг работает (`pm2 monit`)
- [ ] Логи пишутся корректно
- [ ] Nginx логи доступны (`/var/log/nginx/`)
- [ ] Дисковое пространство достаточно (`df -h`)
- [ ] Память не переполнена (`free -h`)

### Бэкапы

- [ ] Cron задача для бэкапа настроена
- [ ] Папка `/backups` создана
- [ ] Тестовый бэкап выполнен успешно
- [ ] Firestore экспорт настроен (опционально)
- [ ] Восстановление из бэкапа протестировано

---

## 🔄 Post-deployment

### Документация

- [ ] README.md обновлен с production URL
- [ ] Команда знает как деплоить обновления
- [ ] Процедура rollback документирована
- [ ] Контакты для поддержки указаны

### Мониторинг и алерты

- [ ] Google Analytics подключен (опционально)
- [ ] Uptime мониторинг настроен (UptimeRobot, Pingdom)
- [ ] Email алерты настроены для критических ошибок
- [ ] Slack/Telegram уведомления настроены (опционально)

### Оптимизация

- [ ] CDN настроен для статических файлов (опционально)
- [ ] Database индексы созданы в Firestore
- [ ] Кэширование настроено (Redis, опционально)
- [ ] Image CDN настроен (Cloudinary, опционально)

---

## 🎉 Готово к запуску!

Если все пункты отмечены, ваше приложение готово к production использованию!

### Финальная проверка

```bash
# На сервере
pm2 status
sudo systemctl status nginx
curl -I https://your-domain.com

# Локально
curl -I https://your-domain.com
```

### Полезные команды после деплоя

```bash
# Просмотр логов
pm2 logs apex-magazine

# Перезапуск приложения
pm2 restart apex-magazine

# Обновление приложения
cd /var/www/apex-magazine
git pull
npm install --omit=dev
npm run build
pm2 restart apex-magazine

# Проверка SSL
sudo certbot certificates
```

---

## 📞 Поддержка

При возникновении проблем:
1. Проверьте логи: `pm2 logs apex-magazine`
2. Проверьте статус: `pm2 status`
3. Проверьте Nginx: `sudo nginx -t`
4. Проверьте Firebase Console
5. Обратитесь к документации: `DEPLOYMENT.md`, `FIREBASE_SETUP.md`

---

**Дата последней проверки**: ___________  
**Проверил**: ___________  
**Статус**: ⬜ Готов к деплою / ⬜ Требуются доработки
