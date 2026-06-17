export default function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Оставляете заявку",
      description: "Вы выбираете нужные услуги в калькуляторе и оставляете заявку на сайте."
    },
    {
      number: "02",
      title: "Уточняем детали",
      description: "Мы связываемся с вами, чтобы обсудить объём работ, удобное время и финальную цену."
    },
    {
      number: "03",
      title: "Приезжаем",
      description: "Мы приезжаем в назначенное время со всем необходимым инвентарем."
    },
    {
      number: "04",
      title: "Убираем",
      description: "Тщательно и аккуратно выполняем уборку по согласованному плану."
    },
    {
      number: "05",
      title: "Принимаете работу",
      description: "Вы оцениваете результат. Мы гарантируем, что вам понравится!"
    }
  ];

  return (
    <section id="how-it-works" className="section-padding bg-white">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Как проходит уборка
          </h2>
          <p className="text-lg text-slate-600">
            Простой и прозрачный процесс от заявки до сияющей чистоты
          </p>
        </div>

        <div className="relative">
          {/* Connector line for desktop */}
          <div className="hidden lg:block absolute top-12 left-0 w-full h-0.5 bg-slate-100 -z-10"></div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative flex flex-col items-center text-center">
                <div className="w-24 h-24 rounded-full bg-white border-4 border-emerald-50 shadow-sm flex items-center justify-center mb-6 relative z-10">
                  <span className="text-2xl font-black text-emerald-500">
                    {step.number}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-slate-600 text-sm">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}