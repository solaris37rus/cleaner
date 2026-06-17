import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { MessageCircle } from "lucide-react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin", "cyrillic"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin", "cyrillic"],
});

export const metadata: Metadata = {
  title: "Клининг Иваново — аккуратная уборка квартир, домов и офисов",
  description: "Поддерживающая и генеральная уборка в Иваново, уборка после ремонта, мойка окон и дополнительные услуги. Семейный подход, честная предварительная цена. Онлайн-калькулятор и заявка.",
  keywords: "клининг Иваново, уборка квартир Иваново, генеральная уборка Иваново, уборка после ремонта Иваново, мойка окон Иваново, поддерживающая уборка Иваново, заказать уборку",
  openGraph: {
    title: "Клининг Иваново — профессиональная и аккуратная уборка",
    description: "Рассчитайте стоимость уборки вашей квартиры, дома или офиса и оставьте заявку онлайн.",
    locale: "ru_RU",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#10B981",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <header className="sticky top-0 z-50 glass-effect border-b border-slate-200">
          <div className="container-custom py-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent">
                Чисто&bull;Иваново
              </span>
            </div>

            <div className="hidden md:flex items-center gap-6">
              <a href="#services" className="text-sm font-medium text-slate-600 hover:text-emerald-500 transition-colors">Услуги</a>
              <a href="#calculator" className="text-sm font-medium text-slate-600 hover:text-emerald-500 transition-colors">Цены</a>
              <a href="#faq" className="text-sm font-medium text-slate-600 hover:text-emerald-500 transition-colors">Вопросы</a>
            </div>

            <div className="flex items-center gap-4">
              <div className="hidden sm:flex flex-col items-end">
                <a href="https://t.me/gyrman37" target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-slate-700 hover:text-emerald-500 flex items-center gap-1">
                  <MessageCircle className="w-4 h-4 text-sky-500" />
                  @gyrman37
                </a>
              </div>
              <a href="#calculator" className="btn-primary py-2 px-4 text-xs sm:text-sm">
                Рассчитать
              </a>
            </div>
          </div>
        </header>

        <main className="flex-grow">
          {children}
        </main>

        <footer className="bg-slate-900 text-slate-300 py-12 mt-auto">
          <div className="container-custom grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <span className="text-2xl font-bold text-white mb-4 block">
                Чисто&bull;Иваново
              </span>
              <p className="text-sm text-slate-400 mb-6">
                Семейный клининг в Иваново. Аккуратно, с душой и по честной цене. Убираем как для себя.
              </p>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Контакты</h3>
              <ul className="space-y-3">
                <li>
                  <a href="https://t.me/gyrman37" target="_blank" rel="noopener noreferrer" className="text-sm hover:text-white flex items-center gap-2 transition-colors">
                    <MessageCircle className="w-4 h-4 text-sky-400" />
                    Telegram: @gyrman37
                  </a>
                </li>
                <li>
                  <a href="https://vk.com/bread_1996" target="_blank" rel="noopener noreferrer" className="text-sm hover:text-white flex items-center gap-2 transition-colors">
                    <svg className="w-4 h-4 text-blue-400" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M23.45 5.948c.166-.546 0-.948-.795-.948H20.03c-.668 0-.976.347-1.143.73 0 0-1.335 3.196-3.226 5.272-.612.602-.89.793-1.224.793-.167 0-.418-.19-.418-.738V5.948c0-.656-.184-.948-.74-.948H9.151c-.417 0-.668.304-.668.593 0 .621.931.765 1.024 2.513v3.811c0 .833-.153.984-.487.984-.89 0-3.055-3.211-4.34-6.885-.249-.715-.5-1-1.187-1H.857c-.75 0-.9.347-.9.73 0 .682.89 4.074 4.145 8.551 2.17 3.06 5.225 4.72 8.008 4.72 1.67 0 1.875-.368 1.875-1.004V15.44c0-.736.156-.884.687-.884.39 0 1.057.19 2.615 1.667 1.78 1.749 2.073 2.536 3.075 2.536h2.625c.75 0 1.126-.368.91-1.096-.238-.724-1.088-1.775-2.215-3.022-.612-.71-1.53-1.475-1.809-1.856-.389-.475-.278-.68 0-1.12 0 0 3.225-4.435 3.532-5.93z" clipRule="evenodd" />
                    </svg>
                    VK: @bread_1996
                  </a>
                </li>
                <li className="text-sm text-slate-400">
                  Город: Иваново
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Навигация</h3>
              <ul className="space-y-2">
                <li><a href="#services" className="text-sm hover:text-white transition-colors">Услуги</a></li>
                <li><a href="#calculator" className="text-sm hover:text-white transition-colors">Калькулятор стоимости</a></li>
                <li><a href="#how-it-works" className="text-sm hover:text-white transition-colors">Как мы работаем</a></li>
                <li><a href="#faq" className="text-sm hover:text-white transition-colors">Частые вопросы</a></li>
              </ul>
            </div>
          </div>
          <div className="container-custom mt-12 pt-8 border-t border-slate-800 text-sm text-slate-500 text-center">
            &copy; {new Date().getFullYear()} Чисто&bull;Иваново. Все права защищены. Стоимость на сайте не является публичной офертой.
          </div>
        </footer>
      </body>
    </html>
  );
}