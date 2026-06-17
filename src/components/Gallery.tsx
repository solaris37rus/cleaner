import { Camera } from "lucide-react";

export default function Gallery() {
  const items = [
    {
      title: "Чистота на кухне",
      desc: "Отмыли кухонный гарнитур и технику от сложного жира",
      bgColor: "bg-emerald-100",
      textColor: "text-emerald-800"
    },
    {
      title: "Сияющие окна",
      desc: "Мойка панорамного остекления без единого развода",
      bgColor: "bg-sky-100",
      textColor: "text-sky-800"
    },
    {
      title: "Идеальный санузел",
      desc: "Удаление известкового налета и дезинфекция",
      bgColor: "bg-indigo-100",
      textColor: "text-indigo-800"
    },
    {
      title: "После ремонта",
      desc: "Полное обеспыливание и подготовка квартиры к заезду",
      bgColor: "bg-amber-100",
      textColor: "text-amber-800"
    }
  ];

  return (
    <section id="gallery" className="section-padding bg-white border-y border-slate-100">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center justify-center p-3 bg-emerald-50 rounded-2xl mb-4 text-emerald-600">
            <Camera className="w-8 h-8" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Результаты нашей работы
          </h2>
          <p className="text-lg text-slate-600">
            Мы не используем стоковые фото. Это реальные примеры того, как мы преображаем помещения.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item, index) => (
            <div
              key={index}
              className={`rounded-2xl p-6 ${item.bgColor} h-64 flex flex-col justify-end relative overflow-hidden group transition-transform hover:-translate-y-1 duration-300`}
            >
              {/* Placeholder for actual image. Instruct user to replace this div with Next.js <Image /> */}
              <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJjdXJyZW50Q29sb3IiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48cmVjdCB3aWR0aD0iMTgiIGhlaWdodD0iMTgiIHg9IjMiIHk9IjMiIHJ4PSIyIiByeT0iMiIvPjxjaXJjbGUgY3g9IjguNSIgY3k9IjguNSIgcj0iMS41Ii8+PHBhdGggZD0iTTIxIDE1bC01LTVMNSA5Ii8+PC9zdmc+')] bg-center bg-no-repeat bg-[length:50%_50%] transition-transform duration-700 group-hover:scale-110"></div>

              <div className="relative z-10 bg-white/90 backdrop-blur-sm p-4 rounded-xl shadow-sm border border-white/50 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                <h3 className={`font-bold ${item.textColor} mb-1`}>{item.title}</h3>
                <p className="text-xs text-slate-600">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center text-sm text-slate-500">
          *Временно используем заглушки. Вы сможете загрузить свои реальные фото в код (см. инструкцию).
        </div>
      </div>
    </section>
  );
}