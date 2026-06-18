import { Heart, CheckSquare, ShieldCheck, MapPin, Zap, MessageCircle } from "lucide-react";

export default function Benefits() {
  const benefits = [
    {
      title: "Семейный подход",
      description: "Мы работаем сами на себя, поэтому качество уборки и бережное отношение к вещам — наш главный приоритет. Убираем как для себя.",
      icon: <Heart className="h-6 w-6 text-primary-600" />
    },
    {
      title: "Работаем по Иваново",
      description: "Мы местная команда. Отлично знаем город, приезжаем без опозданий во все районы Иванова и Кохмы.",
      icon: <MapPin className="h-6 w-6 text-primary-600" />
    },
    {
      title: "Честная стоимость",
      description: "Вы заранее видите предварительную цену в нашем калькуляторе на сайте. Никаких скрытых наценок в процессе работы.",
      icon: <ShieldCheck className="h-6 w-6 text-primary-600" />
    },
    {
      title: "Гибкий выбор услуг",
      description: "Нужно только помыть окна или убрать кухню? Без проблем. Можно заказать как одну услугу, так и полный комплекс.",
      icon: <CheckSquare className="h-6 w-6 text-primary-600" />
    },
    {
      title: "Быстрая онлайн-заявка",
      description: "Оставьте заявку онлайн за 1 минуту, и мы свяжемся с вами в Telegram или VK для быстрого подтверждения.",
      icon: <Zap className="h-6 w-6 text-primary-600" />
    },
    {
      title: "Уточняем детали",
      description: "После заявки мы всегда обсуждаем детали, объем работ и подтверждаем финальную цену до начала уборки.",
      icon: <MessageCircle className="h-6 w-6 text-primary-600" />
    }
  ];

  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Почему выбирают нас
          </h2>
          <p className="text-lg text-slate-600">
            Мы предлагаем не просто уборку, а заботу о вашем доме с душевным подходом.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div key={index} className="flex gap-4 p-6 bg-slate-50 rounded-2xl shadow-sm border border-slate-100 hover:border-primary-100 transition-colors">
              <div className="flex-shrink-0 mt-1">
                <div className="h-12 w-12 rounded-xl bg-primary-100 flex items-center justify-center">
                  {benefit.icon}
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  {benefit.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}