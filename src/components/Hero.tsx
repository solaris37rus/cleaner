import { CheckCircle2 } from "lucide-react";

export default function Hero() {
  const benefits = [
    "Семейный подход",
    "Работаем по Иваново",
    "Честная цена",
    "Аккуратно к вещам",
  ];

  return (
    <section className="relative overflow-hidden bg-primary-50/50 section-padding pb-20 pt-16 lg:pb-28 lg:pt-24">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 -z-10 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary-100/60 via-transparent to-transparent"></div>
      <div className="absolute -left-40 top-40 -z-10 h-72 w-72 rounded-full bg-primary-200/30 blur-3xl"></div>

      <div className="container-custom relative">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-6 inline-flex items-center rounded-full bg-primary-100 px-4 py-1.5 text-sm font-semibold text-primary-800 border border-primary-200 shadow-sm">
            <span className="flex h-2.5 w-2.5 rounded-full bg-primary-500 mr-2 animate-pulse"></span>
            Профессиональный клининг
          </div>

          <h1 className="mb-8 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl md:text-6xl lg:leading-[1.1]">
            Аккуратная уборка <br/>
            <span className="text-primary-600">
              квартиры, дома или офиса
            </span>
          </h1>

          <p className="mb-10 text-lg leading-relaxed text-slate-600 sm:text-xl max-w-2xl mx-auto">
            Поддерживающая, генеральная, после ремонта, мойка окон и дополнительные услуги в Иваново. Рассчитайте предварительную стоимость и оставьте заявку за 1 минуту.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
            <a href="#calculator" className="btn-primary w-full sm:w-auto text-lg px-8 py-4 shadow-lg shadow-primary-500/30">
              Рассчитать стоимость
            </a>
            <a href="#calculator" className="btn-outline w-full sm:w-auto text-lg px-8 py-4">
              Оставить заявку
            </a>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 border-t border-slate-200/60">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex flex-col items-center justify-center gap-2">
                <CheckCircle2 className="h-6 w-6 text-primary-500" />
                <span className="text-sm font-medium text-slate-700">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}