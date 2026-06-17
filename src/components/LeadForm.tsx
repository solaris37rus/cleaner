"use client";

import { useState } from "react";
import { ArrowLeft, CheckCircle2, Loader2, MessageCircle, AlertCircle } from "lucide-react";
import type { CalculatorState } from "./Calculator";

interface LeadFormProps {
  calculatorState: CalculatorState;
  onBack: () => void;
}

export default function LeadForm({ calculatorState, onBack }: LeadFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    date: "",
    comment: "",
  });

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const formatPhoneNumber = (value: string) => {
    const phone = value.replace(/\D/g, '');
    if (!phone) return '';

    // Auto-prepend 7 if starts with 9, 8, or 7
    let normalized = phone;
    if (phone[0] === '8' || phone[0] === '7') {
      normalized = '7' + phone.slice(1);
    } else if (phone[0] === '9') {
      normalized = '7' + phone;
    }

    if (normalized.length <= 1) return `+7`;
    if (normalized.length <= 4) return `+7 (${normalized.slice(1)}`;
    if (normalized.length <= 7) return `+7 (${normalized.slice(1, 4)}) ${normalized.slice(4)}`;
    if (normalized.length <= 9) return `+7 (${normalized.slice(1, 4)}) ${normalized.slice(4, 7)}-${normalized.slice(7)}`;
    return `+7 (${normalized.slice(1, 4)}) ${normalized.slice(4, 7)}-${normalized.slice(7, 9)}-${normalized.slice(9, 11)}`;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    if (name === 'phone') {
      // Only format if user is not deleting digits excessively or handle formatting
      const formatted = formatPhoneNumber(value);
      setFormData(prev => ({ ...prev, [name]: formatted }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const generateMessageText = () => {
    const { roomType, area, serviceType, windowsCount, extras, complexDirt, total } = calculatorState;

    let text = `✨ *Новая заявка на клининг (Сайт)*\n\n`;
    text += `👤 *Имя:* ${formData.name}\n`;
    text += `📞 *Телефон:* ${formData.phone}\n`;
    text += `📍 *Адрес:* ${formData.address}\n`;
    text += `📅 *Дата:* ${formData.date || "Не указана"}\n\n`;

    text += `🏠 *Помещение:* ${roomType}\n`;
    text += `📏 *${serviceType === "Мойка окон" ? "Количество створок:" : "Площадь:"}* ${serviceType === "Мойка окон" ? windowsCount + " шт" : area + " м²"}\n`;
    text += `🧽 *Основная услуга:* ${serviceType}\n`;

    if (complexDirt) {
      text += `⚠️ *Сложное загрязнение:* Да (+20%)\n`;
    }

    if (extras.length > 0) {
      text += `\n➕ *Доп. услуги:*\n`;
      extras.forEach(e => {
        text += `- ${e.name} ${e.type === 'count' ? `(x${e.count})` : ''}\n`;
      });
    }

    if (formData.comment) {
      text += `\n💬 *Комментарий:* ${formData.comment}\n`;
    }

    text += `\n💰 *Предварительная сумма:* ~ ${total} ₽`;

    return text;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          calculatorState,
          rawText: generateMessageText()
        }),
      });

      if (!response.ok) {
        throw new Error("Не удалось отправить заявку");
      }

      setStatus("success");
    } catch (error) {
      console.error("Submit error:", error);
      setStatus("error");
      setErrorMessage("Произошла ошибка при отправке. Пожалуйста, напишите нам в Telegram напрямую.");
    }
  };

  const directTelegramUrl = `https://t.me/gyrman37?text=${encodeURIComponent(generateMessageText())}`;

  if (status === "success") {
    return (
      <div className="bg-white p-6 md:p-8 rounded-3xl shadow-lg border border-emerald-100 text-center">
        <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-8 h-8 text-emerald-500" />
        </div>
        <h3 className="text-2xl font-bold text-slate-900 mb-4">
          Заявка отправлена!
        </h3>
        <p className="text-slate-600 mb-8">
          Спасибо за обращение. Мы свяжемся с вами в ближайшее время по указанному номеру для подтверждения деталей и стоимости.
        </p>
        <div className="space-y-4">
          <p className="text-sm text-slate-500">Также вы можете написать нам напрямую:</p>
          <a
            href="https://t.me/gyrman37"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary w-full flex items-center gap-2 justify-center"
          >
            <MessageCircle className="w-5 h-5 text-sky-500" />
            Написать в Telegram
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 md:p-8 rounded-3xl shadow-lg border border-emerald-100">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-sm text-slate-500 hover:text-emerald-600 transition-colors mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Назад к расчету
      </button>

      <h3 className="text-xl font-bold text-slate-900 mb-6 border-b border-slate-100 pb-4">
        Оформление заявки
      </h3>

      <div className="mb-6 p-4 bg-slate-50 rounded-xl border border-slate-100 flex justify-between items-center">
        <span className="text-sm font-medium text-slate-600">Сумма заказа:</span>
        <span className="text-xl font-bold text-emerald-600">~ {calculatorState.total.toLocaleString('ru-RU')} ₽</span>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">Имя *</label>
          <input
            type="text"
            id="name"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
            placeholder="Иван Иванов"
          />
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-1">Телефон *</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            required
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
            placeholder="+7 (999) 000-00-00"
          />
        </div>

        <div>
          <label htmlFor="address" className="block text-sm font-medium text-slate-700 mb-1">Адрес (улица, дом)</label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
            placeholder="ул. Ленина, д. 1"
          />
        </div>

        <div>
          <label htmlFor="date" className="block text-sm font-medium text-slate-700 mb-1">Желаемая дата и время</label>
          <input
            type="text"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
            placeholder="Например: завтра в 10:00"
          />
        </div>

        <div>
          <label htmlFor="comment" className="block text-sm font-medium text-slate-700 mb-1">Комментарий</label>
          <textarea
            id="comment"
            name="comment"
            rows={3}
            value={formData.comment}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all resize-none"
            placeholder="Особенности помещения, наличие животных и т.д."
          ></textarea>
        </div>

        {status === "error" && (
          <div className="p-4 bg-red-50 text-red-700 rounded-xl text-sm border border-red-100 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
            <div>
              <p className="mb-2">{errorMessage}</p>
              <a
                href={directTelegramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium underline hover:no-underline"
              >
                Отправить заявку через Telegram
              </a>
            </div>
          </div>
        )}

        <button
          type="submit"
          disabled={status === "loading"}
          className="btn-primary w-full py-4 text-base mt-2 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {status === "loading" ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              Отправка...
            </>
          ) : (
            "Отправить заявку"
          )}
        </button>

        <p className="text-xs text-center text-slate-500 mt-4">
          Нажимая кнопку, вы соглашаетесь с обработкой персональных данных.
        </p>
      </form>
    </div>
  );
}