import React, { useState, useEffect } from 'react';
import { Flame, ChevronLeft, ChevronRight, Volume2 } from 'lucide-react';
import { NewsArticle } from '../types';
import { t } from '../utils/translations';

interface BreakingNewsTickerProps {
  articles: NewsArticle[];
  onSelectArticle: (article: NewsArticle) => void;
  lang: any;
}

export const BreakingNewsTicker: React.FC<BreakingNewsTickerProps> = ({
  articles,
  onSelectArticle,
  lang,
}) => {
  const breakingItems = articles.filter(a => a.isBreaking || a.aiVerification.credibilityScore >= 97).slice(0, 5);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (breakingItems.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % breakingItems.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [breakingItems.length]);

  if (breakingItems.length === 0) return null;

  const current = breakingItems[currentIndex];

  return (
    <div className="bg-red-700 text-white border-y border-red-800 text-xs sm:text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-1.5 flex items-center justify-between gap-3">
        {/* Badge */}
        <div className="flex items-center gap-1.5 bg-red-950/80 px-2.5 py-0.5 rounded font-black tracking-wider uppercase text-[11px] shrink-0 text-red-200">
          <span className="w-2 h-2 rounded-full bg-red-400 animate-ping"></span>
          <Flame className="w-3.5 h-3.5 text-amber-300" />
          <span>{t('breakingNews', lang)}</span>
        </div>

        {/* Current headline */}
        <div className="flex-1 truncate">
          <button
            onClick={() => onSelectArticle(current)}
            className="text-left font-medium hover:underline truncate block w-full text-red-50 hover:text-white transition"
            title={current.title}
          >
            <span className="font-bold mr-2 text-amber-300">[{current.source.name}]</span>
            {current.title}
          </button>
        </div>

        {/* Controls */}
        <div className="hidden sm:flex items-center gap-1 shrink-0 text-red-200">
          <span className="text-[11px] opacity-75 mr-1">
            {currentIndex + 1} de {breakingItems.length}
          </span>
          <button
            onClick={() => setCurrentIndex((prev) => (prev - 1 + breakingItems.length) % breakingItems.length)}
            className="p-0.5 hover:bg-red-800 rounded transition"
            title="Anterior"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setCurrentIndex((prev) => (prev + 1) % breakingItems.length)}
            className="p-0.5 hover:bg-red-800 rounded transition"
            title="Siguiente"
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
