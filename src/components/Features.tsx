import { Heart, CheckSquare, ShieldCheck, MapPin, Zap, MessageCircle } from "lucide-react";

export default function Features() {
  const features = [
    {
      title: "Бережное отношение",
      description: "Аккуратно убираем и бережно относимся к вашим вещам, мебели и поверхностям. Убираем как для себя.",
      icon: <Heart className="h-6 w-6 text-emerald-600" />
    },
    {
      title: "Гибкий выбор услуг",
      description: "Можно заказать одну услугу или комплекс. Выбирайте только то, что вам действительно нужно.",
      icon: <CheckSquare className="h-6 w-6 text-emerald-600" />
    },
    {
      title: "Честная цена",
      description: "Заранее называем предварительную стоимость на сайте. Никаких скрытых платежей.",
      icon: <ShieldCheck className="h-6 w-6 text-emerald-600" />
    },
    {
      title: "Работаем по Иваново",
      description: "Мы местная семейная команда, отлично знаем город и приезжаем без опозданий.",
      icon: <MapPin className="h-6 w-6 text-emerald-600" />
    },
    {
      title: "Быстрая онлайн-заявка",
      description: "Оставьте заявку онлайн за 1 минуту, и мы быстро свяжемся с вами для подтверждения.",
      icon: <Zap className="h-6 w-6 text-emerald-600" />
    },
    {
      title: "Уточняем детали",
      description: "После заявки мы обсуждаем детали, объем работ и подтверждаем финальную цену до начала уборки.",
      icon: <MessageCircle className="h-6 w-6 text-emerald-600" />
    }
  ];

  return (
    <section className="section-padding bg-slate-50 border-y border-slate-100">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Почему выбирают нас
          </h2>
          <p className="text-lg text-slate-600">
            Мы предлагаем не просто уборку, а заботу о вашем доме с семейным подходом.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="flex gap-4 p-6 bg-white rounded-2xl shadow-sm border border-slate-100/60">
              <div className="flex-shrink-0 mt-1">
                <div className="h-12 w-12 rounded-xl bg-emerald-50 flex items-center justify-center">
                  {feature.icon}
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}