import {
  Sparkles,
  Brush,
  PaintRoller,
  SunDim,
  ChefHat,
  Archive,
  MonitorSmartphone,
  ClipboardList
} from "lucide-react";

export default function Services() {
  const services = [
    {
      title: "Поддерживающая уборка",
      description: "Регулярная уборка для поддержания чистоты и порядка. Включает сухую и влажную уборку поверхностей.",
      icon: <Sparkles className="h-6 w-6 text-primary-600" />,
      price: "от 150 ₽/м²",
    },
    {
      title: "Генеральная уборка",
      description: "Глубокая очистка всех помещений, труднодоступных мест, плинтусов и удаление сложных загрязнений.",
      icon: <Brush className="h-6 w-6 text-primary-600" />,
      price: "от 300 ₽/м²",
    },
    {
      title: "Уборка после ремонта",
      description: "Удаление строительной пыли, следов краски, скотча, клея и затирки. Подготовка помещения к заезду.",
      icon: <PaintRoller className="h-6 w-6 text-primary-600" />,
      price: "от 250 ₽/м²",
    },
    {
      title: "Мойка окон",
      description: "Очистка стекол, рам, подоконников и откосов без разводов. Работаем с нестандартным остеклением.",
      icon: <SunDim className="h-6 w-6 text-primary-600" />,
      price: "от 500 ₽/створка",
    },
    {
      title: "Дополнительные услуги на кухне",
      description: "Мытьё холодильника, духовки, микроволновки, вытяжки и кухонных фасадов от жира.",
      icon: <ChefHat className="h-6 w-6 text-primary-600" />,
      price: "по прайсу",
    },
    {
      title: "Мытьё шкафов",
      description: "Аккуратная очистка шкафов и гардеробных внутри с предварительным освобождением полок.",
      icon: <Archive className="h-6 w-6 text-primary-600" />,
      price: "300 ₽/шкаф",
    },
    {
      title: "Мытьё техники",
      description: "Бережная очистка бытовой техники, люстр и осветительных приборов.",
      icon: <MonitorSmartphone className="h-6 w-6 text-primary-600" />,
      price: "по прайсу",
    },
    {
      title: "Индивидуальная уборка",
      description: "Собираем пакет услуг под ваши конкретные задачи и нестандартные требования.",
      icon: <ClipboardList className="h-6 w-6 text-primary-600" />,
      price: "по договоренности",
    },
  ];

  return (
    <section id="services" className="section-padding bg-slate-50 border-y border-slate-100">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Наши услуги
          </h2>
          <p className="text-lg text-slate-600">
            Полный спектр клининговых услуг для любых задач. Выбирайте то, что нужно именно вам.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 hover:shadow-lg hover:-translate-y-1 hover:border-primary-200 transition-all duration-300 flex flex-col h-full"
            >
              <div className="h-12 w-12 rounded-xl bg-primary-50 flex items-center justify-center mb-6">
                {service.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                {service.title}
              </h3>
              <p className="text-slate-600 text-sm mb-6 flex-grow leading-relaxed">
                {service.description}
              </p>
              <div className="mt-auto pt-4 border-t border-slate-100">
                <span className="text-primary-700 font-bold">
                  {service.price}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <a href="#calculator" className="btn-primary">
            Рассчитать мою уборку
          </a>
        </div>
      </div>
    </section>
  );
}