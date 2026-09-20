import React, { useEffect, useState } from 'react';
import { Bell, X, Flame, ChevronRight } from 'lucide-react';
import { NewsArticle } from '../types';

interface NotificationToastProps {
  article: NewsArticle | null;
  onOpen: (article: NewsArticle) => void;
  onDismiss: () => void;
}

export const NotificationToast: React.FC<NotificationToastProps> = ({
  article,
  onOpen,
  onDismiss,
}) => {
  if (!article) return null;

  return (
    <div className="fixed bottom-5 right-4 sm:right-6 z-50 max-w-sm w-full bg-stone-900 text-white border-2 border-red-600 rounded-xl shadow-2xl overflow-hidden animate-slideUp">
      <div className="p-3.5 flex items-start gap-3">
        <div className="p-2 bg-red-600 text-white rounded-lg shrink-0 animate-pulse">
          <Flame className="w-5 h-5" />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] font-black uppercase tracking-wider text-red-400 bg-red-950 px-1.5 py-0.5 rounded">
              Alerta Urgente Push
            </span>
            <button
              onClick={onDismiss}
              className="text-stone-400 hover:text-white p-0.5"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          <h5 
            onClick={() => onOpen(article)}
            className="text-xs font-bold font-serif text-stone-100 line-clamp-2 hover:underline cursor-pointer"
          >
            {article.title}
          </h5>

          <p className="text-[11px] text-stone-300 line-clamp-1 mt-1 font-reading">
            {article.summary[0] || article.excerpt}
          </p>

          <button
            onClick={() => onOpen(article)}
            className="mt-2 text-[11px] font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1"
          >
            <span>Ver noticia completa</span>
            <ChevronRight className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
};
