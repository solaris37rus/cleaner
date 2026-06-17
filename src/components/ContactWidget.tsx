"use client";

import { MessageCircle, PhoneCall, X } from "lucide-react";
import { useState, useEffect } from "react";

export default function ContactWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Show widget after scrolling down a bit
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
        setIsOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Expanded Menu */}
      <div
        className={`flex flex-col gap-3 transition-all duration-300 origin-bottom-right ${
          isOpen ? "scale-100 opacity-100" : "scale-0 opacity-0 pointer-events-none"
        }`}
      >
        <a
          href="https://t.me/gyrman37"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 bg-white pl-4 pr-1 py-1 rounded-full shadow-lg border border-sky-100 group hover:border-sky-300 transition-colors"
        >
          <span className="text-sm font-medium text-slate-700">Написать в Telegram</span>
          <div className="w-10 h-10 rounded-full bg-sky-500 flex items-center justify-center shadow-md shadow-sky-500/20 group-hover:bg-sky-600 transition-colors">
            <MessageCircle className="w-5 h-5 text-white" />
          </div>
        </a>

        <a
          href="https://vk.com/bread_1996"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 bg-white pl-4 pr-1 py-1 rounded-full shadow-lg border border-blue-100 group hover:border-blue-300 transition-colors"
        >
          <span className="text-sm font-medium text-slate-700">Написать во ВКонтакте</span>
          <div className="w-10 h-10 rounded-full bg-[#0077FF] flex items-center justify-center shadow-md shadow-blue-500/20 group-hover:bg-blue-600 transition-colors">
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path fillRule="evenodd" d="M23.45 5.948c.166-.546 0-.948-.795-.948H20.03c-.668 0-.976.347-1.143.73 0 0-1.335 3.196-3.226 5.272-.612.602-.89.793-1.224.793-.167 0-.418-.19-.418-.738V5.948c0-.656-.184-.948-.74-.948H9.151c-.417 0-.668.304-.668.593 0 .621.931.765 1.024 2.513v3.811c0 .833-.153.984-.487.984-.89 0-3.055-3.211-4.34-6.885-.249-.715-.5-1-1.187-1H.857c-.75 0-.9.347-.9.73 0 .682.89 4.074 4.145 8.551 2.17 3.06 5.225 4.72 8.008 4.72 1.67 0 1.875-.368 1.875-1.004V15.44c0-.736.156-.884.687-.884.39 0 1.057.19 2.615 1.667 1.78 1.749 2.073 2.536 3.075 2.536h2.625c.75 0 1.126-.368.91-1.096-.238-.724-1.088-1.775-2.215-3.022-.612-.71-1.53-1.475-1.809-1.856-.389-.475-.278-.68 0-1.12 0 0 3.225-4.435 3.532-5.93z" clipRule="evenodd" />
            </svg>
          </div>
        </a>
      </div>

      {/* Main Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-emerald-500 flex items-center justify-center text-white shadow-lg shadow-emerald-500/30 hover:bg-emerald-600 transition-all hover:scale-105 active:scale-95 z-50"
        aria-label="Связаться с нами"
      >
        {isOpen ? (
          <X className="w-6 h-6 animate-in fade-in zoom-in duration-200" />
        ) : (
          <PhoneCall className="w-6 h-6 animate-in fade-in zoom-in duration-200" />
        )}
      </button>

      {/* Attention dot when closed */}
      {!isOpen && (
        <span className="absolute top-0 right-0 flex h-4 w-4">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500 border-2 border-white"></span>
        </span>
      )}
    </div>
  );
}