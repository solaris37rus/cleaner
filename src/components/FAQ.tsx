import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "Почему цена в калькуляторе предварительная?",
      answer: "Каждое помещение уникально. На итоговую стоимость может повлиять степень загрязнения, количество мебели, наличие труднодоступных зон и ваши дополнительные пожелания. Финальную цену мы называем до начала работ после уточнения всех деталей."
    },
    {
      question: "Что влияет на итоговую стоимость?",
      answer: "Основной фактор — это площадь и тип уборки. Также цена может измениться при сильных загрязнениях (например, после жильцов или ремонта), необходимости мыть нестандартное остекление или большое количество дополнительной техники."
    },
    {
      question: "Нужно ли мне быть дома во время уборки?",
      answer: "Не обязательно. Вы можете впустить нас, оставить ключи и пойти по своим делам, а затем вернуться к завершению уборки для приемки работы. Мы гарантируем сохранность ваших вещей."
    },
    {
      question: "Можно ли заказать только мойку окон?",
      answer: "Да, конечно. Вы можете выбрать мойку окон как самостоятельную услугу или добавить её к поддерживающей или генеральной уборке."
    },
    {
      question: "Делаете ли вы уборку после ремонта?",
      answer: "Да, это одна из наших основных услуг. Мы бережно удаляем строительную пыль, следы краски, скотча и затирки, готовя помещение к комфортному проживанию."
    },
    {
      question: "Можно ли добавить дополнительные услуги уже на месте?",
      answer: "Да, если у нас будет позволять время и наличие нужных средств. Но лучше всего обсудить все пожелания заранее, чтобы мы могли точно спланировать время."
    }
  ];

  return (
    <section id="faq" className="section-padding bg-white border-y border-slate-100">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Частые вопросы
          </h2>
          <p className="text-lg text-slate-600">
            Ответы на самые популярные вопросы о нашей работе
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`bg-white border rounded-2xl overflow-hidden transition-colors ${
                openIndex === index ? 'border-primary-200 shadow-sm ring-1 ring-primary-50' : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <button
                className="w-full px-6 py-5 text-left flex items-center justify-between focus:outline-none"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className="font-semibold text-slate-900 pr-4">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`h-5 w-5 flex-shrink-0 transition-transform duration-300 ${
                    openIndex === index ? 'rotate-180 text-primary-500' : 'text-slate-400'
                  }`}
                />
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-6 pb-5 text-slate-600 text-sm leading-relaxed border-t border-slate-50 pt-4">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}