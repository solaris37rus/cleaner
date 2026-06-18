import { useState } from "react";
import { Plus, Minus, Info, Calculator as CalcIcon } from "lucide-react";
import LeadForm from "./LeadForm";

export type RoomType = "Квартира" | "Дом" | "Офис" | "Другое";
export type ServiceType = "Поддерживающая" | "Генеральная" | "После ремонта" | "Мойка окон";

export interface ExtraService {
  id: string;
  name: string;
  price: number;
  type: "count" | "boolean";
  count: number;
  selected: boolean;
}

export interface CalculatorState {
  roomType: RoomType;
  area: number;
  serviceType: ServiceType;
  windowsCount: number;
  extras: ExtraService[];
  complexDirt: boolean;
  total: number;
}

const INITIAL_EXTRAS: ExtraService[] = [
  { id: "fridge", name: "Мытьё холодильника внутри", price: 800, type: "boolean", count: 0, selected: false },
  { id: "oven", name: "Мытьё духовки", price: 700, type: "boolean", count: 0, selected: false },
  { id: "microwave", name: "Мытьё микроволновки", price: 400, type: "boolean", count: 0, selected: false },
  { id: "facades", name: "Мытьё кухонных фасадов снаружи", price: 1000, type: "boolean", count: 0, selected: false },
  { id: "hood", name: "Мытьё вытяжки", price: 500, type: "boolean", count: 0, selected: false },
  { id: "cabinet", name: "Мытьё шкафов внутри", price: 300, type: "count", count: 0, selected: false },
  { id: "chandelier", name: "Мытьё люстры/светильника", price: 300, type: "count", count: 0, selected: false },
  { id: "bathroom", name: "Дополнительный санузел", price: 800, type: "count", count: 0, selected: false },
];

const PRICES: Record<string, { perSqm?: number; min?: number; price?: number }> = {
  "Поддерживающая": { perSqm: 150, min: 3000 },
  "Генеральная": { perSqm: 300, min: 5000 },
  "После ремонта": { perSqm: 250, min: 6000 },
  "Мойка окон": { price: 500 }, // per sash
};

export default function PriceCalculator() {
  const [roomType, setRoomType] = useState<RoomType>("Квартира");
  const [area, setArea] = useState<number>(50);
  const [serviceType, setServiceType] = useState<ServiceType>("Поддерживающая");
  const [windowsCount, setWindowsCount] = useState<number>(0);
  const [complexDirt, setComplexDirt] = useState<boolean>(false);
  const [extras, setExtras] = useState<ExtraService[]>(INITIAL_EXTRAS);
  const [showForm, setShowForm] = useState<boolean>(false);

  // Derived state calculation
  let currentTotal = 0;
  if (serviceType === "Мойка окон") {
    currentTotal = windowsCount * (PRICES["Мойка окон"].price || 0);
  } else {
    const calculatedBase = area * (PRICES[serviceType].perSqm || 0);
    currentTotal = Math.max(calculatedBase, PRICES[serviceType].min || 0);
  }

  extras.forEach(extra => {
    if (extra.type === "boolean" && extra.selected) {
      currentTotal += extra.price;
    } else if (extra.type === "count" && extra.count > 0) {
      currentTotal += extra.price * extra.count;
    }
  });

  if (complexDirt) {
    currentTotal = currentTotal * 1.2;
  }

  // Round to nearest 50 for cleaner numbers
  const total = Math.round(currentTotal / 50) * 50;

  const handleExtraToggle = (id: string) => {
    setExtras(prev => prev.map(extra =>
      extra.id === id ? { ...extra, selected: !extra.selected } : extra
    ));
  };

  const handleExtraCount = (id: string, increment: boolean) => {
    setExtras(prev => prev.map(extra => {
      if (extra.id === id) {
        const newCount = increment ? extra.count + 1 : Math.max(0, extra.count - 1);
        return { ...extra, count: newCount, selected: newCount > 0 };
      }
      return extra;
    }));
  };

  const calculatorState: CalculatorState = {
    roomType,
    area,
    serviceType,
    windowsCount,
    extras: extras.filter(e => (e.type === 'boolean' && e.selected) || (e.type === 'count' && e.count > 0)),
    complexDirt,
    total
  };

  return (
    <section id="calculator" className="section-padding bg-slate-50">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center justify-center p-3 bg-primary-100 rounded-2xl mb-4 text-primary-600">
            <CalcIcon className="w-8 h-8" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Калькулятор стоимости
          </h2>
          <p className="text-lg text-slate-600">
            Рассчитайте предварительную стоимость уборки и оставьте онлайн заявку
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Inputs Section */}
          <div className="w-full lg:w-2/3 space-y-8 bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-slate-200">

            {/* Room Type */}
            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-3">Тип помещения</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {(["Квартира", "Дом", "Офис", "Другое"] as RoomType[]).map((type) => (
                  <button
                    key={type}
                    onClick={() => setRoomType(type)}
                    className={`py-3 px-4 rounded-xl text-sm font-medium border transition-all ${
                      roomType === type
                        ? "border-primary-500 bg-primary-50 text-primary-700 shadow-sm"
                        : "border-slate-200 bg-white text-slate-600 hover:border-primary-200"
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Service Type */}
            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-3">Основная услуга</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {(["Поддерживающая", "Генеральная", "После ремонта", "Мойка окон"] as ServiceType[]).map((type) => (
                  <button
                    key={type}
                    onClick={() => {
                      setServiceType(type);
                      if (type === "Мойка окон" && windowsCount === 0) setWindowsCount(1);
                    }}
                    className={`py-3 px-4 rounded-xl text-sm font-medium border text-left transition-all ${
                      serviceType === type
                        ? "border-primary-500 bg-primary-50 text-primary-700 shadow-sm"
                        : "border-slate-200 bg-white text-slate-600 hover:border-primary-200"
                    }`}
                  >
                    <div className="font-semibold mb-1">{type}</div>
                    <div className={`text-xs ${serviceType === type ? "text-primary-600/80" : "text-slate-400"}`}>
                      {type === "Мойка окон" ? "от 500 ₽/створка" : `от ${PRICES[type]?.perSqm} ₽/м²`}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Size Input */}
            <div>
              {serviceType === "Мойка окон" ? (
                <>
                  <label className="block text-sm font-semibold text-slate-900 mb-3">Количество створок (шт)</label>
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => setWindowsCount(Math.max(1, windowsCount - 1))}
                      className="w-12 h-12 rounded-xl border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-50"
                    >
                      <Minus className="w-5 h-5" />
                    </button>
                    <input
                      type="number" min="1" value={windowsCount}
                      onChange={(e) => setWindowsCount(Math.max(1, parseInt(e.target.value) || 1))}
                      className="w-24 h-12 text-center text-lg font-bold text-slate-900 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none"
                    />
                    <button
                      onClick={() => setWindowsCount(windowsCount + 1)}
                      className="w-12 h-12 rounded-xl border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-50"
                    >
                      <Plus className="w-5 h-5" />
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <label className="block text-sm font-semibold text-slate-900 mb-3">Площадь помещения (м²)</label>
                  <div className="flex items-center gap-4">
                    <input
                      type="range" min="10" max="300" step="1" value={area}
                      onChange={(e) => setArea(parseInt(e.target.value))}
                      className="flex-grow h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-primary-500"
                    />
                    <input
                      type="number" min="1" value={area}
                      onChange={(e) => setArea(Math.max(1, parseInt(e.target.value) || 1))}
                      className="w-24 h-12 px-3 text-center text-lg font-bold text-slate-900 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none"
                    />
                  </div>
                </>
              )}
            </div>

            {/* Dirt Level */}
            <div>
              <label className="flex items-center gap-3 p-4 border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-50 transition-colors">
                <input
                  type="checkbox" checked={complexDirt} onChange={(e) => setComplexDirt(e.target.checked)}
                  className="w-5 h-5 text-primary-500 rounded border-slate-300 focus:ring-primary-500"
                />
                <div>
                  <div className="font-semibold text-sm text-slate-900">Сложное загрязнение (+20%)</div>
                  <div className="text-xs text-slate-500">Сильное загрязнение, после жильцов или запущенное состояние</div>
                </div>
              </label>
            </div>

            {/* Extras */}
            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-3">Дополнительные услуги</label>
              <div className="space-y-3">
                {extras.map(extra => (
                  <div key={extra.id} className="flex items-center justify-between p-3 sm:p-4 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors">
                    <div className="flex items-center gap-3">
                      {extra.type === "boolean" ? (
                        <input
                          type="checkbox" checked={extra.selected} onChange={() => handleExtraToggle(extra.id)}
                          className="w-5 h-5 text-primary-500 rounded border-slate-300 focus:ring-primary-500 cursor-pointer"
                        />
                      ) : <div className="w-5 h-5" />}
                      <div>
                        <div className="text-sm font-medium text-slate-900 cursor-pointer" onClick={() => extra.type === "boolean" && handleExtraToggle(extra.id)}>
                          {extra.name}
                        </div>
                        <div className="text-xs text-slate-500">+{extra.price} ₽</div>
                      </div>
                    </div>
                    {extra.type === "count" && (
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleExtraCount(extra.id, false)} disabled={extra.count === 0}
                          className="w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-100 disabled:opacity-50"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-6 text-center text-sm font-medium text-slate-900">{extra.count}</span>
                        <button
                          onClick={() => handleExtraCount(extra.id, true)}
                          className="w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-100"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Checkout Column */}
          <div className="w-full lg:w-1/3">
            <div className="sticky top-24 space-y-6">
              {!showForm ? (
                <div className="bg-white p-6 md:p-8 rounded-3xl shadow-lg border border-primary-100">
                  <h3 className="text-lg font-bold text-slate-900 mb-6 border-b border-slate-100 pb-4">Ваш заказ</h3>

                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500">Тип:</span>
                      <span className="font-medium text-slate-900">{roomType}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500">Услуга:</span>
                      <span className="font-medium text-slate-900">{serviceType}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500">{serviceType === "Мойка окон" ? "Створки:" : "Площадь:"}</span>
                      <span className="font-medium text-slate-900">{serviceType === "Мойка окон" ? `${windowsCount} шт` : `${area} м²`}</span>
                    </div>
                    {complexDirt && (
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-500">Сложное загрязнение:</span>
                        <span className="font-medium text-primary-600">+20%</span>
                      </div>
                    )}
                    {calculatorState.extras.length > 0 && (
                      <div className="pt-4 border-t border-slate-100">
                        <div className="text-xs text-slate-400 mb-2 font-semibold uppercase tracking-wider">Дополнительно:</div>
                        {calculatorState.extras.map(e => (
                          <div key={e.id} className="flex justify-between text-sm mb-2">
                            <span className="text-slate-600 truncate mr-2">{e.name} {e.type === 'count' ? `x${e.count}` : ''}</span>
                            <span className="font-medium text-slate-900 whitespace-nowrap">+{e.price * (e.count || 1)} ₽</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="pt-6 border-t border-slate-100 mb-6">
                    <div className="text-sm text-slate-500 mb-1">Предварительная стоимость</div>
                    <div className="text-3xl font-black text-primary-600">~ {total.toLocaleString('ru-RU')} ₽</div>
                    {serviceType !== "Мойка окон" && area * (PRICES[serviceType]?.perSqm || 0) < (PRICES[serviceType]?.min || 0) && (
                      <div className="text-xs text-slate-400 mt-2">
                        * Применена минимальная стоимость выезда ({PRICES[serviceType]?.min} ₽)
                      </div>
                    )}
                  </div>

                  <div className="bg-amber-50 p-3 rounded-xl flex gap-3 mb-6">
                    <Info className="w-5 h-5 text-amber-500 flex-shrink-0" />
                    <p className="text-xs text-amber-700 leading-relaxed">
                      Стоимость предварительная. Итоговая цена зависит от площади, объёма работ, степени загрязнения и дополнительных пожеланий.
                    </p>
                  </div>

                  <button onClick={() => setShowForm(true)} className="btn-primary w-full py-4 text-base">
                    Перейти к оформлению
                  </button>
                </div>
              ) : (
                <LeadForm calculatorState={calculatorState} onBack={() => setShowForm(false)} />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}