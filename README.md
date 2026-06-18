# ЧистоИваново — Сайт клининговых услуг

Профессиональный сайт клининга в Иваново с интерактивным калькулятором и автоматической отправкой заявок в Telegram через Cloudflare Pages Functions.

## 🛠 Технологии

- React 18 + TypeScript
- Vite
- Tailwind CSS 3
- Lucide React (иконки)
- Cloudflare Pages Functions (Serverless backend)

## 🚀 Как запустить локально

1. Установите зависимости:
\`\`\`bash
npm install
\`\`\`

2. Создайте локальный файл переменных окружения:
Скопируйте \`.env.example\` в файл \`.env\` (для локального тестирования UI) или \`.dev.vars\` (для локального тестирования Cloudflare Functions через Wrangler).
\`\`\`bash
cp .env.example .env
\`\`\`

3. Запустите проект локально:
\`\`\`bash
npm run dev
\`\`\`
Сайт будет доступен по адресу: http://localhost:5173

## 📦 Как собрать проект

Для сборки оптимизированной версии для продакшена выполните:
\`\`\`bash
npm run build
\`\`\`
Результат появится в папке \`dist/\`.

## ☁️ Деплой на Cloudflare Pages

Сайт полностью готов к размещению на Cloudflare Pages с использованием Functions.

### Настройки в панели Cloudflare:

1. Перейдите в **Workers & Pages** -> **Create application** -> **Pages** -> **Connect to Git**.
2. Выберите ваш репозиторий.
3. В разделе **Set up builds and deployments** укажите следующие параметры:
   - 🚨 **Framework preset:** `Vite` (ЕСЛИ У ВАС СТОЯЛ NEXT.JS - ОБЯЗАТЕЛЬНО ИЗМЕНИТЕ НА VITE! Иначе сборка упадет с ошибкой "Output directory dist not found")
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
4. В разделе **Environment variables (advanced)** обязательно добавьте переменные:
   - `TELEGRAM_BOT_TOKEN` = ваш_токен_бота
   - `TELEGRAM_CHAT_ID` = ваш_чат_id

### Как получить ключи Telegram:

* **TELEGRAM_BOT_TOKEN:** Зайдите в Telegram, найдите бота [@BotFather](https://t.me/BotFather), отправьте `/newbot`, задайте имя и скопируйте HTTP API Token.
* **TELEGRAM_CHAT_ID:** Найдите бота [@userinfobot](https://t.me/userinfobot), отправьте `/start`, скопируйте цифры из поля `Id`.
* **ВАЖНО:** Обязательно найдите своего созданного бота в поиске Telegram и нажмите **"Запустить"** (`/start`), иначе он не сможет присылать вам заявки.

## ✅ Проверка работы

1. Откройте задеплоенный сайт.
2. Спуститесь к калькулятору и выберите услуги (площадь, тип, доп. опции).
3. Заполните форму заявки вашими тестовыми данными.
4. Нажмите "Отправить заявку".
5. Убедитесь, что вы увидели сообщение об успехе на сайте, а в ваш Telegram мгновенно пришло красиво оформленное сообщение с расчетом. Если переменные настроены неверно, сайт не сломается, а предложит клиенту кнопки для прямой связи.