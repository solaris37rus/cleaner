import { CheckCircle2 } from "lucide-react";

export default function Hero() {
  const benefits = [
    "Семейный подход",
    "Работаем по Иваново",
    "Честная цена",
    "Аккуратно к вещам",
  ];

  return (
    <section className="relative overflow-hidden bg-emerald-50/50 section-padding pb-20 pt-24 lg:pb-28 lg:pt-32">
      {/* Decorative background elements */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-emerald-100/40 via-transparent to-transparent"></div>
      <div className="absolute -left-40 top-40 -z-10 h-72 w-72 rounded-full bg-emerald-200/20 blur-3xl"></div>

      <div className="container-custom relative">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-6 inline-flex items-center rounded-full bg-emerald-100 px-3 py-1 text-sm font-medium text-emerald-800">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 mr-2"></span>
            Профессиональный клининг в Иваново
          </div>

          <h1 className="mb-8 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl md:text-6xl">
            Аккуратная уборка{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-600">
              квартиры, дома или офиса
            </span>
          </h1>

          <p className="mb-10 text-lg leading-relaxed text-slate-600 sm:text-xl">
            Поддерживающая, генеральная, после ремонта, мойка окон и дополнительные услуги. Рассчитайте предварительную стоимость и оставьте заявку за 1 минуту.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
            <a href="#calculator" className="btn-primary w-full sm:w-auto text-base px-8 py-4">
              Рассчитать стоимость
            </a>
            <a href="#calculator" className="btn-secondary w-full sm:w-auto text-base px-8 py-4">
              Оставить заявку
            </a>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8 border-t border-slate-200/60">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex flex-col items-center justify-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                <span className="text-sm font-medium text-slate-700">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}