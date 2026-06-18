# Чисто•Иваново — Сайт клининговых услуг

Современный, адаптивный сайт для предоставления услуг клининга в Иваново. Сайт включает в себя интерактивный калькулятор стоимости и отправку заявок напрямую в Telegram.

## Стек технологий

- Next.js 15 (App Router)
- React 19
- TypeScript
- Tailwind CSS 4
- Lucide React (иконки)

## Структура проекта

- `src/components/` - UI компоненты (Hero, Services, Calculator, Form и т.д.)
- `src/app/` - Страницы и роуты Next.js
- `src/app/api/lead/route.ts` - Серверный обработчик для отправки в Telegram
- `src/app/globals.css` - Глобальные стили и дизайн-система

## Как запустить локально

1. Клонируйте репозиторий и установите зависимости:
\`\`\`bash
npm install
\`\`\`

2. Настройте переменные окружения:
Скопируйте файл `.env.example` в `.env.local` и заполните свои данные (инструкция по получению ниже).
\`\`\`bash
cp .env.example .env.local
\`\`\`

3. Запустите сервер для разработки:
\`\`\`bash
npm run dev
\`\`\`
Сайт будет доступен по адресу [http://localhost:3000](http://localhost:3000).

## Настройка Telegram бота

Чтобы заявки с сайта приходили вам в Telegram:

1. **Создайте бота:**
   - Откройте Telegram и найдите бота [@BotFather](https://t.me/BotFather)
   - Напишите команду `/newbot`
   - Придумайте имя и username для бота (например, `chisto_ivanovo_bot`)
   - BotFather выдаст вам **HTTP API Token** (длинная строка вида `123456789:ABCDefgh...`).
   - Скопируйте этот токен и вставьте в `.env.local` в поле `TELEGRAM_BOT_TOKEN`.

2. **Узнайте свой Chat ID:**
   - Чтобы бот знал, кому отправлять заявки, нужен ваш ID.
   - Найдите в Telegram бота [@userinfobot](https://t.me/userinfobot) и напишите ему `/start`
   - Он ответит вашим `Id`.
   - Скопируйте эти цифры и вставьте в `.env.local` в поле `TELEGRAM_CHAT_ID`.

3. **Запустите вашего бота:**
   - Обязательно найдите своего созданного бота в поиске Telegram (по username, который вы ему задали) и нажмите **"Запустить"** (`/start`). Бот не сможет писать вам первым, если вы его не запустите.

*Примечание:* Если отправка через API по какой-то причине не сработает, на сайте реализован fallback (запасной вариант) — клиенту будет предложено нажать кнопку, которая откроет Telegram с уже готовым текстом заявки для отправки вам напрямую (@gyrman37).

## Деплой на Cloudflare Pages

Сайт полностью подготовлен для бесплатного и сверхбыстрого хостинга на **Cloudflare Pages**. Мы настроили Edge Runtime для API-роутов, чтобы форма заявки работала корректно.

### Пошаговая инструкция по деплою на Cloudflare:

1. Зарегистрируйтесь на [Cloudflare](https://dash.cloudflare.com/sign-up) и перейдите в раздел **Workers & Pages**.
2. Нажмите **Create application** -> перейдите на вкладку **Pages** -> выберите **Connect to Git**.
3. Подключите свой GitHub/GitLab и выберите репозиторий с этим проектом.
4. В разделе **Set up builds and deployments** заполните настройки ТОЧНО так:
   - **Framework preset:** `Next.js`
   - **Build command:** `npm run pages:build` (ВАЖНО! Не просто `npm run build`)
   - **Build output directory:** `.vercel/output/static`
5. Внизу в разделе **Environment variables (advanced)** добавьте две переменные:
   - `TELEGRAM_BOT_TOKEN` = (ваш токен бота)
   - `TELEGRAM_CHAT_ID` = (ваш ID чата)
6. Нажмите **Save and Deploy**.

> ⚠️ **Возможная ошибка при первом деплое:**
> Если вы видите ошибку `Error: Failed to build` или 404 страницу (как на скриншоте `chrome-error://chromewebdata/`), убедитесь, что:
> 1. В `package.json` есть скрипт `"pages:build": "npx @cloudflare/next-on-pages"`.
> 2. Build output directory в настройках Cloudflare установлен именно на `.vercel/output/static`.
> 3. В файле `src/app/api/lead/route.ts` прописано `export const runtime = 'edge';`.
