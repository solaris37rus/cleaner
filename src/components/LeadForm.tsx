import { useState } from "react";
import { ArrowLeft, CheckCircle2, Loader2, AlertCircle } from "lucide-react";
import type { CalculatorState } from "./PriceCalculator";

interface LeadFormProps {
  calculatorState: CalculatorState;
  onBack: () => void;
}

export default function LeadForm({ calculatorState, onBack }: LeadFormProps) {
  const [formData, setFormData] = useState({ name: "", phone: "", address: "", date: "", comment: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const formatPhoneNumber = (value: string) => {
    const phone = value.replace(/\D/g, '');
    if (!phone) return '';
    let normalized = phone;
    if (phone[0] === '8' || phone[0] === '7') normalized = '7' + phone.slice(1);
    else if (phone[0] === '9') normalized = '7' + phone;

    if (normalized.length <= 1) return `+7`;
    if (normalized.length <= 4) return `+7 (${normalized.slice(1)}`;
    if (normalized.length <= 7) return `+7 (${normalized.slice(1, 4)}) ${normalized.slice(4)}`;
    if (normalized.length <= 9) return `+7 (${normalized.slice(1, 4)}) ${normalized.slice(4, 7)}-${normalized.slice(7)}`;
    return `+7 (${normalized.slice(1, 4)}) ${normalized.slice(4, 7)}-${normalized.slice(7, 9)}-${normalized.slice(9, 11)}`;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name === 'phone') setFormData(prev => ({ ...prev, [name]: formatPhoneNumber(value) }));
    else setFormData(prev => ({ ...prev, [name]: value }));
  };

  const generateMessageText = () => {
    const { roomType, area, serviceType, windowsCount, extras, complexDirt, total } = calculatorState;
    let text = `🧽 *Новая заявка на клининг (Сайт)*\n\n`;
    text += `👤 *ФИО:* ${formData.name}\n`;
    text += `📞 *Телефон:* ${formData.phone}\n`;
    text += `📍 *Адрес:* ${formData.address}\n`;
    text += `📅 *Дата/время:* ${formData.date || "Не указана"}\n\n`;
    text += `🏠 *Тип помещения:* ${roomType}\n`;
    text += `📐 *${serviceType === "Мойка окон" ? "Количество створок:" : "Площадь:"}* ${serviceType === "Мойка окон" ? windowsCount + " шт" : area + " м²"}\n`;
    text += `🧹 *Основная услуга:* ${serviceType}\n`;
    if (complexDirt) text += `⚠️ *Сложное загрязнение:* Да (+20%)\n`;
    if (extras.length > 0) {
      text += `\n➕ *Дополнительные услуги:*\n`;
      extras.forEach(e => text += `- ${e.name} ${e.type === 'count' ? `(x${e.count})` : ''}\n`);
    }
    if (formData.comment) text += `\n💬 *Комментарий:* ${formData.comment}\n`;
    text += `\n💰 *Предварительная стоимость:* ~ ${total} ₽\n\n`;
    text += `_Важно: цена предварительная. Итог зависит от объёма работ, степени загрязнения и дополнительных пожеланий._\nИсточник: сайт`;
    return text;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rawText: generateMessageText() }),
      });
      if (!response.ok) throw new Error("Не удалось отправить заявку");
      setStatus("success");
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  };

  const directTelegramUrl = `https://t.me/gyrman37?text=${encodeURIComponent(generateMessageText())}`;

  if (status === "success") {
    return (
      <div className="bg-white p-6 md:p-8 rounded-3xl shadow-lg border border-primary-100 text-center">
        <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-8 h-8 text-primary-500" />
        </div>
        <h3 className="text-2xl font-bold text-slate-900 mb-4">Заявка отправлена!</h3>
        <p className="text-slate-600 mb-8">Спасибо за обращение. Мы свяжемся с вами в ближайшее время по указанному номеру.</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 md:p-8 rounded-3xl shadow-lg border border-primary-100">
      <button onClick={onBack} className="flex items-center gap-2 text-sm text-slate-500 hover:text-primary-600 transition-colors mb-6">
        <ArrowLeft className="w-4 h-4" /> Назад к расчету
      </button>

      <h3 className="text-xl font-bold text-slate-900 mb-6 border-b border-slate-100 pb-4">Оформление заявки</h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">ФИО *</label>
          <input type="text" name="name" required value={formData.name} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary-500 outline-none" placeholder="Иван Иванов" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Телефон *</label>
          <input type="tel" name="phone" required value={formData.phone} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary-500 outline-none" placeholder="+7 (999) 000-00-00" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Адрес</label>
          <input type="text" name="address" value={formData.address} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary-500 outline-none" placeholder="ул. Ленина, д. 1" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Желаемая дата и время</label>
          <input type="text" name="date" value={formData.date} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary-500 outline-none" placeholder="Например: завтра в 10:00" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Комментарий</label>
          <textarea name="comment" rows={3} value={formData.comment} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary-500 outline-none resize-none" placeholder="Особенности помещения и т.д."></textarea>
        </div>

        {status === "error" && (
          <div className="p-4 bg-red-50 text-red-700 rounded-xl text-sm border border-red-100 flex items-start gap-3 flex-col">
            <div className="flex items-center gap-2"><AlertCircle className="w-5 h-5" /> Ошибка отправки</div>
            <a href={directTelegramUrl} target="_blank" rel="noopener noreferrer" className="btn-primary w-full bg-sky-500 hover:bg-sky-600">Написать в Telegram</a>
            <a href="https://vk.com/bread_1996" target="_blank" rel="noopener noreferrer" className="btn-primary w-full bg-blue-600 hover:bg-blue-700">Написать во ВКонтакте</a>
          </div>
        )}

        <button type="submit" disabled={status === "loading"} className="btn-primary w-full py-4 text-base mt-2">
          {status === "loading" ? <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Отправка...</> : "Отправить заявку"}
        </button>
      </form>
    </div>
  );
}