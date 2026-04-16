#!/bin/bash

# Скрипт для быстрого деплоя на VPS
# Использование: ./deploy.sh

set -e

echo "🚀 Начинаем деплой APEX Magazine..."

# Цвета для вывода
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Проверка Node.js
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js не установлен${NC}"
    exit 1
fi

echo -e "${GREEN}✓ Node.js $(node --version)${NC}"

# Проверка npm
if ! command -v npm &> /dev/null; then
    echo -e "${RED}❌ npm не установлен${NC}"
    exit 1
fi

echo -e "${GREEN}✓ npm $(npm --version)${NC}"

# Проверка firebase-applet-config.json
if [ ! -f "firebase-applet-config.json" ]; then
    echo -e "${RED}❌ firebase-applet-config.json не найден${NC}"
    exit 1
fi

echo -e "${GREEN}✓ Firebase config найден${NC}"

# Установка зависимостей
echo -e "${YELLOW}📦 Установка зависимостей...${NC}"
npm install --omit=dev

# Сборка фронтенда
echo -e "${YELLOW}🔨 Сборка фронтенда...${NC}"
npm run build

# Проверка dist
if [ ! -d "dist" ]; then
    echo -e "${RED}❌ Сборка не удалась - папка dist не создана${NC}"
    exit 1
fi

echo -e "${GREEN}✓ Фронтенд собран${NC}"

# Создание папки для логов
mkdir -p logs

# Проверка PM2
if ! command -v pm2 &> /dev/null; then
    echo -e "${YELLOW}⚠️  PM2 не установлен. Устанавливаем...${NC}"
    sudo npm install -g pm2
fi

echo -e "${GREEN}✓ PM2 установлен${NC}"

# Остановка старого процесса (если есть)
if pm2 list | grep -q "apex-magazine"; then
    echo -e "${YELLOW}🔄 Перезапуск приложения...${NC}"
    pm2 restart apex-magazine
else
    echo -e "${YELLOW}▶️  Запуск приложения...${NC}"
    pm2 start ecosystem.config.js
fi

# Сохранение конфигурации PM2
pm2 save

echo -e "${GREEN}✅ Деплой завершен успешно!${NC}"
echo -e "${GREEN}Приложение доступно на http://localhost:3000${NC}"
echo ""
echo "Полезные команды:"
echo "  pm2 status              - статус приложения"
echo "  pm2 logs apex-magazine  - просмотр логов"
echo "  pm2 restart apex-magazine - перезапуск"
echo "  pm2 monit               - мониторинг"
