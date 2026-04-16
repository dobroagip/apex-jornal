#!/bin/bash

# Quick Start Script для APEX Magazine
# Автоматическая проверка и настройка окружения

set -e

echo "🔍 Проверка окружения для APEX Magazine..."

# Цвета
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

# Проверка Node.js
echo -n "Проверка Node.js... "
if command -v node &> /dev/null; then
    NODE_VERSION=$(node --version)
    echo -e "${GREEN}✓ $NODE_VERSION${NC}"
else
    echo -e "${RED}✗ Node.js не установлен${NC}"
    echo "Установите Node.js 18+ с https://nodejs.org/"
    exit 1
fi

# Проверка npm
echo -n "Проверка npm... "
if command -v npm &> /dev/null; then
    NPM_VERSION=$(npm --version)
    echo -e "${GREEN}✓ v$NPM_VERSION${NC}"
else
    echo -e "${RED}✗ npm не установлен${NC}"
    exit 1
fi

# Проверка Firebase config
echo -n "Проверка firebase-applet-config.json... "
if [ -f "firebase-applet-config.json" ]; then
    echo -e "${GREEN}✓ Найден${NC}"
else
    echo -e "${RED}✗ Не найден${NC}"
    echo "Создайте firebase-applet-config.json с вашими Firebase credentials"
    exit 1
fi

# Проверка .env
echo -n "Проверка .env файла... "
if [ -f ".env" ]; then
    echo -e "${GREEN}✓ Найден${NC}"
else
    echo -e "${YELLOW}⚠ Не найден, создаем из .env.example...${NC}"
    if [ -f ".env.example" ]; then
        cp .env.example .env
        echo -e "${GREEN}✓ .env создан${NC}"
    else
        echo -e "${YELLOW}⚠ .env.example не найден, пропускаем${NC}"
    fi
fi

# Установка зависимостей
echo -e "\n${YELLOW}📦 Установка зависимостей...${NC}"
npm install

# Проверка Firebase Admin credentials
echo -e "\n${YELLOW}🔐 Проверка Firebase Admin credentials...${NC}"
if [ -f "firebase-admin-key.json" ]; then
    echo -e "${GREEN}✓ firebase-admin-key.json найден${NC}"
    export GOOGLE_APPLICATION_CREDENTIALS="$(pwd)/firebase-admin-key.json"
else
    echo -e "${YELLOW}⚠ firebase-admin-key.json не найден${NC}"
    echo "Для production развертывания скачайте Service Account Key из Firebase Console"
    echo "См. FIREBASE_SETUP.md для инструкций"
fi

# Создание необходимых директорий
echo -e "\n${YELLOW}📁 Создание директорий...${NC}"
mkdir -p public/uploads
mkdir -p logs
echo -e "${GREEN}✓ Директории созданы${NC}"

echo -e "\n${GREEN}✅ Окружение готово!${NC}"
echo -e "\nДля запуска в режиме разработки:"
echo -e "  ${YELLOW}npm run dev${NC}"
echo -e "\nДля production сборки:"
echo -e "  ${YELLOW}npm run build${NC}"
echo -e "  ${YELLOW}npm start${NC}"
echo -e "\nДля деплоя на сервер:"
echo -e "  ${YELLOW}./deploy.sh${NC}"
