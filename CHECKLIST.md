# ✅ Чеклист для деплою APEX Magazine

## Виконано ✅

- [x] Українська мова встановлена за замовчуванням
- [x] Проект успішно зібрано (`npm run build`)
- [x] Створено інструкції для деплою (DEPLOY_INSTRUCTIONS.md)
- [x] Створено український README (README_UK.md)
- [x] Всі зміни закомічено та запушено в GitHub

## Що потрібно зробити зараз 🎯

### 1. Завантажити Firebase Admin ключ (5 хв)

```
1. Відкрити: https://console.firebase.google.com/
2. Вибрати проект: gen-lang-client-0793631432
3. Project Settings ⚙️ → Service Accounts
4. Generate New Private Key
5. Зберегти як: firebase-admin-key.json (в корені проекту)
```

### 2. Створити суперадміна (2 хв)

```bash
# Спочатку запустіть сайт
npm run dev

# Залогіньтесь на сайті через браузер
# Потім запустіть:
node scripts/make-admin.js ВАШ_EMAIL@gmail.com admin
```

### 3. Задеплоїти (10 хв)

**Варіант A - Vercel (найпростіше):**
```bash
npm i -g vercel
vercel --prod
```

**Варіант B - Firebase Hosting:**
```bash
npm i -g firebase-tools
firebase login
firebase init hosting
firebase deploy --only hosting
```

**Варіант C - Власний сервер:**
```bash
# На сервері
git pull origin main
npm install
npm run build
npm start
```

### 4. Створити першу статтю (5 хв)

```
1. Відкрити сайт
2. Залогінитись як адмін
3. Натиснути кнопку "Admin" в футері
4. Заповнити форму статті
5. Опублікувати
```

## 📝 Важливі посилання

- GitHub: https://github.com/dobroagip/apex-jornal
- Firebase Console: https://console.firebase.google.com/project/gen-lang-client-0793631432
- Детальні інструкції: DEPLOY_INSTRUCTIONS.md

## 🎉 Готово!

Після виконання цих кроків ваш сайт буде:
- ✅ Працювати українською мовою за замовчуванням
- ✅ Мати суперадміна для керування контентом
- ✅ Задеплоєний та доступний онлайн
- ✅ Готовий до публікації статей

---

**Потрібна допомога?** Пишіть на dobrocreate@gmail.com
