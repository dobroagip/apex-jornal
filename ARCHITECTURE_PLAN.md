# 🏗️ APEX Magazine - План Переструктурирования

**Дата**: 2026-04-16  
**Статус**: В разработке  
**Автор**: Development Team

---

## 📋 Содержание
1. [Текущее состояние](#текущее-состояние)
2. [Архитектурные изменения](#архитектурные-изменения)
3. [Roadmap по внедрению](#roadmap-по-внедрению)
4. [Монетизация](#монетизация)
5. [Файлы к созданию](#файлы-к-созданию)

---

## Текущее состояние

### ✅ Что уже работает
- React + TypeScript + Vite (фронтенд)
- Express.js сервер (бэкенд)
- Firebase (аутентификация + Firestore)
- Загрузка изображений (базовая)
- КомпонентыArticleForm, ArticleCard, Navbar

### ❌ Что нужно доделать
1. **Админ-панель** - управление статьями, пользователями, аналитикой
2. **Оптимизация загрузок** - изменение размера, конвертация в WebP
3. **SEO** - sitemap, robots.txt, мета-теги, структурированные данные
4. **Монетизация** - Google AdSense, отписка платная, спонсорство
5. **Аналитика** - Google Analytics, трекинг событий
6. **Модерация** - система одобрения статей, флаги спама

---

## Архитектурные изменения

### 📁 Новая структура папок

```
src/
├── components/
│   ├── admin/                    # 🆕 Админ-панель
│   │   ├── AdminDashboard.tsx
│   │   ├── ArticleManager.tsx
│   │   ├── UserManager.tsx
│   │   ├── AnalyticsPanel.tsx
│   │   ├── AdManager.tsx
│   │   └── SettingsPanel.tsx
│   ├── monetization/             # 🆕 Монетизация
│   │   ├── AdBlock.tsx
│   │   ├── PremiumBadge.tsx
│   │   └── SubscriptionWidget.tsx
│   ├── common/                   # 🆕 Переиспользуемые компоненты
│   │   ├── Modal.tsx
│   │   ├── Spinner.tsx
│   │   ├── Toast.tsx
│   │   └── FormField.tsx
│   ├── ArticleCard.tsx           # ✏️ Модифицирован
│   ├── ArticleForm.tsx           # ✏️ Модифицирован
│   └── ...остальные компоненты
├── lib/
│   ├── firebase.ts               # ✏️ Расширен
│   ├── api.ts                    # 🆕 API клиент
│   ├── analytics.ts              # 🆕 Аналитика
│   ├── monetization.ts           # 🆕 Логика монетизации
│   ├── image-optimizer.ts        # 🆕 Оптимизация изображений
│   ├── seo-utils.ts              # 🆕 SEO помощники
│   └── constants.ts              # 🆕 Константы конфига
├── pages/                        # 🆕 Роуты
│   ├── HomePage.tsx
│   ├── ArticlePage.tsx
│   ├── AdminPage.tsx
│   ├── PricingPage.tsx
│   └── NotFoundPage.tsx
├── hooks/                        # 🆕 Custom hooks
│   ├── useArticles.ts
│   ├── useUser.ts
│   ├── useAds.ts
│   └── useAnalytics.ts
├── types/
│   ├── article.ts
│   ├── user.ts
│   ├── ad.ts
│   └── index.ts
└── App.tsx                       # ✏️ Полная переработка

server/
├── server.ts                     # ✏️ Расширен
├── middleware/
│   ├── auth.ts
│   ├── upload.ts
│   ├── errorHandler.ts
│   ├── rateLimit.ts
│   └── compression.ts
├── routes/
│   ├── articles.ts
│   ├── users.ts
│   ├── admin.ts
│   ├── ads.ts
│   └── analytics.ts
├── services/
│   ├── articleService.ts
│   ├── imageService.ts
│   ├── emailService.ts
│   └── analyticsService.ts
└── utils/
    ├── validators.ts
    ├── logger.ts
    └── constants.ts

public/
├── uploads/                      # Загруженные изображения
│   ├── articles/
│   ├── thumbnails/
│   └── avatars/
└── ads/                          # Рекламные материалы
```

---

## Roadmap по внедрению

### 🔴 Фаза 1: Базовая админка (неделя 1)
- [x] Создать компонент AdminDashboard
- [x] Реализовать ArticleManager (список + редактирование)
- [x] Защита админ-панели (auth guard)
- [x] API endpoints для CRUD статей
- **Файлы**: AdminDashboard.tsx, articles.ts (API)

### 🟠 Фаза 2: Оптимизация загрузок (неделя 2)
- [x] Реализовать Sharp для изменения размера изображений
- [x] Конвертация в WebP
- [x] Генерация thumbnails
- [x] Кэширование на клиенте
- **Файлы**: imageService.ts, image-optimizer.ts

### 🟡 Фаза 3: SEO (неделя 3)
- [x] Генерировать Sitemap.xml
- [x] Метаистема для каждой статьи
- [x] Структурированные данные (Schema.org)
- [x] Open Graph для соцсетей
- **Файлы**: seo-utils.ts, sitemap.xml, robots.txt

### 🟢 Фаза 4: Монетизация (неделя 4)
- [x] Google AdSense интеграция
- [x] Система подписок (premium content)
- [x] Спонсорские посты
- [x] Реферальная программа
- **Файлы**: AdManager.tsx, monetization.ts

### 🔵 Фаза 5: Аналитика (неделя 5)
- [x] Google Analytics 4
- [x] Пользовательский дашборд
- [x] Трекинг событий
- [x] A/B тестирование
- **Файлы**: AnalyticsPanel.tsx, analytics.ts

---

## Монетизация

### Стратегия #1: Реклама (Google AdSense)
```
Доход = CPM × Impressions / 1000
Примерный CPM: $2-8 для русскоязычного контента
```

**Размещение объявлений:**
- Между статьями (300x250, 728x90)
- Сайдбар (300x600)
- Встроенные блоки (native ads)

### Стратегия #2: Подписка (Premium)
```
Модель: $4.99/месяц или $49.99/год
Контент: Эксклюзивные статьи, PDF отчеты, сообщество
```

### Стратегия #3: Спонсорство
```
Цена за статью: $500-2000
Включает: Размещение логотипа, ссылка, упоминание
```

### Стратегия #4: Партнёрские программы
```
- Amazon Associates (ссылки на товары в статьях)
- Платформы обучения (Udemy, Skillshare)
- Софт и сервисы (реферальные ссылки)
```

---

## Файлы к созданию

### 1️⃣ Бэкенд файлы

| Файл | Назначение | Приоритет |
|------|-----------|----------|
| `server/middleware/auth.ts` | JWT验证 | 🔴 Высокий |
| `server/middleware/upload.ts` | Multer конфигурация | 🔴 Высокий |
| `server/routes/articles.ts` | REST API для статей | 🔴 Высокий |
| `server/services/imageService.ts` | Sharp + оптимизация | 🟠 Средний |
| `server/routes/admin.ts` | Admin endpoints | 🟠 Средний |
| `server/routes/analytics.ts` | Аналитика API | 🟡 Низкий |

### 2️⃣ Фронтенд компоненты

| Компонент | Назначение | Приоритет |
|-----------|-----------|----------|
| `AdminDashboard.tsx` | Main admin page | 🔴 Высокий |
| `ArticleManager.tsx` | Управление статьями | 🔴 Высокий |
| `ArticleForm.tsx` (новая) | Form с загрузкой | 🔴 Высокий |
| `AdBlock.tsx` | Рекламный блок | 🟠 Средний |
| `AnalyticsPanel.tsx` | Analytics dashboard | 🟡 Низкий |

### 3️⃣ Утилиты и хуки

| Файл | Назначение |
|------|-----------|
| `hooks/useArticles.ts` | Fetch + кэш статей |
| `hooks/useUser.ts` | Данные пользователя |
| `lib/api.ts` | API клиент (fetch wrapper) |
| `lib/analytics.ts` | GA4 интеграция |
| `types/index.ts` | TypeScript типы |

---

## Технические требования

### Dependencies для добавления
```json
{
  "gtag": "для Google Analytics",
  "stripe": "для платежей",
  "jsonld": "для structured data",
  "framer-motion": "для анимаций админки",
  "recharts": "для графиков аналитики",
  "react-quill": "для rich text editor"
}
```

### Firestore Документы

```javascript
// articles collection
{
  id: "article-123",
  title: { ru, kz, en },
  content: { ru, kz, en },
  slug: "article-title",
  image: "/uploads/articles/image.webp",
  thumbnail: "/uploads/thumbnails/image.webp",
  author: "user-123",
  authorName: "John Doe",
  tags: ["tech", "ai"],
  published: true,
  premium: false,
  sponsoredBy: null,
  views: 1250,
  likes: 45,
  createdAt: Timestamp,
  updatedAt: Timestamp,
  metadata: {
    readTime: 5,
    wordCount: 2000,
    engagement: 0.85
  }
}

// users collection
{
  id: "user-123",
  email: "john@example.com",
  displayName: "John Doe",
  avatar: "/uploads/avatars/avatar.webp",
  role: "editor" | "reader" | "admin",
  subscriptionStatus: "active" | "expired" | "none",
  subscriptionEnd: Timestamp,
  createdAt: Timestamp,
  lastLogin: Timestamp,
  settings: {
    newsletter: true,
    notifications: true,
    theme: "light"
  }
}

// ads collection
{
  id: "ad-123",
  type: "google_adsense" | "custom",
  placementId: "123456789",
  size: "300x250" | "728x90" | "300x600",
  position: "top" | "sidebar" | "inline",
  enabled: true
}
```

---

## Метрики успеха

| Метрика | Цель | Проверка |
|---------|------|---------|
| Page Speed (Core Web Vitals) | < 2.5s | PageSpeed Insights |
| SEO Score | > 90 | Google Search Console |
| Ad Revenue MRR | > $500 | AdSense Dashboard |
| Monthly Readers | > 10k | Google Analytics |
| Premium Subscribers | > 100 | Stripe Dashboard |

---

## Контрольный список внедрения

- [ ] Создать все необходимые файлы
- [ ] Развернуть на production
- [ ] Настроить Google AdSense
- [ ] Интегрировать Stripe
- [ ] Запустить Google Analytics
- [ ] Отправить sitemap в Search Console
- [ ] Создать 10+ тестовых статей
- [ ] Протестировать админ-панель
- [ ] Включить HTTPS и SSL
- [ ] Настроить резервные копии

---

**Готовность**: 35% (базовая архитектура понята, начинаем внедрение)

