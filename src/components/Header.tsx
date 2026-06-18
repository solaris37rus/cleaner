import { MessageCircle } from "lucide-react";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200">
      <div className="container-custom py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold text-primary-600">
            ЧистоИваново
          </span>
        </div>

        <nav className="hidden md:flex items-center gap-6">
          <a href="#services" className="text-sm font-medium text-slate-600 hover:text-primary-600 transition-colors">Услуги</a>
          <a href="#calculator" className="text-sm font-medium text-slate-600 hover:text-primary-600 transition-colors">Цены</a>
          <a href="#faq" className="text-sm font-medium text-slate-600 hover:text-primary-600 transition-colors">Вопросы</a>
        </nav>

        <div className="flex items-center gap-4">
          <a
            href="https://t.me/gyrman37"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-2 text-sm font-medium text-slate-700 hover:text-primary-600 transition-colors"
          >
            <MessageCircle className="w-5 h-5 text-sky-500" />
            @gyrman37
          </a>
          <a href="#calculator" className="btn-primary py-2 px-4 text-sm hidden sm:inline-flex">
            Рассчитать
          </a>
          {/* Mobile CTA */}
          <a href="#calculator" className="btn-primary py-2 px-3 text-xs sm:hidden">
            Заявка
          </a>
        </div>
      </div>
    </header>
  );
}