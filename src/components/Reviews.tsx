import { Star, Quote } from "lucide-react";

export default function Reviews() {
  const reviews = [
    {
      name: "Анна С.",
      service: "Генеральная уборка",
      date: "2 недели назад",
      text: "Заказывали генеральную уборку после квартирантов. Ребята отмыли всё! Духовка и ванная как новые. Очень вежливые, приехали вовремя. Однозначно рекомендую.",
      rating: 5
    },
    {
      name: "Михаил В.",
      service: "Уборка после ремонта",
      date: "1 месяц назад",
      text: "Отлично справились со строительной пылью. Думал, придётся самому неделю всё отмывать, но команда всё сделала за день. Окна сверкают, ни следа от скотча или краски.",
      rating: 5
    },
    {
      name: "Екатерина М.",
      service: "Поддерживающая уборка",
      date: "3 дня назад",
      text: "Пользуюсь услугами каждый месяц. Очень нравится бережное отношение к вещам. Приятно возвращаться в чистую квартиру, где пахнет свежестью, а не химией.",
      rating: 5
    }
  ];

  return (
    <section id="reviews" className="section-padding bg-emerald-50/30">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Отзывы наших клиентов
          </h2>
          <p className="text-lg text-slate-600">
            Мы дорожим своей репутацией и работаем так, чтобы нас рекомендовали друзьям.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <div key={index} className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100 relative">
              <Quote className="absolute top-6 right-6 w-8 h-8 text-emerald-100" />

              <div className="flex gap-1 mb-4">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                ))}
              </div>

              <p className="text-slate-700 italic mb-6 relative z-10 leading-relaxed">
                &ldquo;{review.text}&rdquo;
              </p>

              <div className="border-t border-slate-100 pt-4 mt-auto">
                <div className="font-bold text-slate-900">{review.name}</div>
                <div className="text-xs text-emerald-600 font-medium mb-1">{review.service}</div>
                <div className="text-xs text-slate-400">{review.date}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <a href="https://t.me/gyrman37" target="_blank" rel="noopener noreferrer" className="btn-outline">
            Оставить свой отзыв
          </a>
        </div>
      </div>
    </section>
  );
}