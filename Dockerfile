# Multi-stage build для оптимизации размера образа
FROM node:18-alpine AS builder

WORKDIR /app

# Копируем package files
COPY package*.json ./

# Устанавливаем зависимости
RUN npm ci

# Копируем исходный код
COPY . .

# Собираем фронтенд
RUN npm run build

# Production образ
FROM node:18-alpine

WORKDIR /app

# Устанавливаем только production зависимости
COPY package*.json ./
RUN npm ci --omit=dev

# Копируем собранный фронтенд и серверный код
COPY --from=builder /app/dist ./dist
COPY server.ts ./
COPY firebase-applet-config.json ./
COPY public ./public

# Устанавливаем tsx для запуска TypeScript
RUN npm install -g tsx

# Открываем порт
EXPOSE 3000

# Переменные окружения
ENV NODE_ENV=production
ENV PORT=3000

# Запуск приложения
CMD ["npm", "start"]
