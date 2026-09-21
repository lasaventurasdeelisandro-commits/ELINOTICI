import React, { useState } from 'react';
import { 
  ShieldCheck, Clock, Sparkles, ChevronDown, ChevronUp, 
  Volume2, ExternalLink, Bookmark, Check
} from 'lucide-react';
import { NewsArticle } from '../types';
import { SocialShareBar } from './SocialShareBar';
import { t } from '../utils/translations';
import { decodeHtmlEntities, formatSummaryPoint } from '../utils/textUtils';

interface ArticleCardProps {
  article: NewsArticle;
  variant?: 'hero' | 'standard' | 'compact' | 'opinion';
  onSelect: (article: NewsArticle) => void;
  onTagClick?: (tag: string) => void;
  lang: any;
  onPlayAudio?: (article: NewsArticle) => void;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({
  article,
  variant = 'standard',
  onSelect,
  onTagClick,
  lang,
  onPlayAudio,
}) => {
  const [showSummary, setShowSummary] = useState(false);

  const formattedDate = new Intl.DateTimeFormat('es-DO', {
    hour: '2-digit',
    minute: '2-digit',
    day: 'numeric',
    month: 'short',
  }).format(new Date(article.publishedAt));

  // Hero Lead Story
  if (variant === 'hero') {
    return (
      <article className="group bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
          {/* Image */}
          <div className="lg:col-span-7 relative overflow-hidden bg-stone-100 dark:bg-stone-800 min-h-[260px] sm:min-h-[340px]">
            <img
              src={article.imageUrl}
              alt={article.title}
              className="w-full h-full object-cover group-hover:scale-102 transition duration-500"
              loading="lazy"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = 'https://images.unsplash.com/photo-1495020689067-958852a7765e?auto=format&fit=crop&w=1200&q=80';
              }}
            />
            {article.isBreaking && (
              <span className="absolute top-3 left-3 bg-red-600 text-white text-[11px] font-black uppercase tracking-wider px-2.5 py-1 rounded shadow">
                ÚLTIMA HORA
              </span>
            )}
            {article.isDominican ? (
              <span className="absolute top-3 right-3 bg-stone-900/80 backdrop-blur text-white text-[11px] font-bold px-2 py-0.5 rounded flex items-center gap-1 shadow-xs">
                🇩🇴 República Dominicana
              </span>
            ) : (
              <span className="absolute top-3 right-3 bg-blue-900/80 backdrop-blur text-white text-[11px] font-bold px-2 py-0.5 rounded flex items-center gap-1 shadow-xs">
                🌎 Mundial
              </span>
            )}
          </div>

          {/* Content */}
          <div className="lg:col-span-5 p-5 sm:p-6 flex flex-col justify-between">
            <div>
              {/* Category & Verification */}
              <div className="flex items-center justify-between gap-2 text-xs mb-2.5">
                <span className="font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400">
                  {article.category.toUpperCase()} {article.subcategory ? `• ${article.subcategory}` : ''}
                </span>

                <div className="flex items-center gap-1 text-[11px] font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>{article.aiVerification.credibilityScore}% Verificado</span>
                </div>
              </div>

              {/* Title */}
              <h2 
                onClick={() => onSelect(article)}
                className="text-xl sm:text-2xl lg:text-3xl font-bold font-serif leading-tight text-stone-900 dark:text-stone-50 cursor-pointer hover:text-amber-800 dark:hover:text-amber-400 transition mb-3"
              >
                {decodeHtmlEntities(article.title)}
              </h2>

              {/* Excerpt */}
              <p className="text-sm text-stone-600 dark:text-stone-300 line-clamp-3 mb-4 font-reading leading-relaxed">
                {decodeHtmlEntities(article.excerpt)}
              </p>

              {/* AI Executive Summary Snippet */}
              <div className="p-3 bg-amber-500/10 dark:bg-amber-500/5 rounded-lg border border-amber-500/20 mb-4">
                <div className="flex items-center gap-1.5 text-xs font-bold text-amber-900 dark:text-amber-300 mb-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                  <span>Resumen IA en 3 Puntos:</span>
                </div>
                <ul className="space-y-1 text-xs text-stone-700 dark:text-stone-300">
                  {(article.summary || []).slice(0, 2).map((item, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="text-amber-600 dark:text-amber-400 font-bold">•</span>
                      <span className="line-clamp-2">{formatSummaryPoint(item)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Footer metadata & actions */}
            <div>
              {/* Tags */}
              <div className="flex flex-wrap gap-1 mb-3">
                {article.tags.slice(0, 3).map((tag, idx) => (
                  <button
                    key={idx}
                    onClick={(e) => {
                      e.stopPropagation();
                      onTagClick?.(tag);
                    }}
                    className="text-[11px] font-medium text-stone-600 dark:text-stone-400 bg-stone-100 dark:bg-stone-800 px-2 py-0.5 rounded hover:bg-amber-100 hover:text-amber-800 dark:hover:bg-stone-700 transition"
                  >
                    {tag}
                  </button>
                ))}
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-stone-200 dark:border-stone-800 text-xs text-stone-500 dark:text-stone-400">
                <div className="flex items-center gap-2 truncate">
                  <span className="font-semibold text-stone-700 dark:text-stone-300 truncate">{article.source.name}</span>
                  <span>•</span>
                  <span>{formattedDate}</span>
                </div>

                <div className="flex items-center gap-2">
                  {onPlayAudio && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onPlayAudio(article);
                      }}
                      className="p-1 rounded text-stone-600 dark:text-stone-300 hover:text-amber-600 transition"
                      title="Escuchar noticia"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  )}
                  <SocialShareBar article={article} variant="compact" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>
    );
  }

  // Standard Card
  return (
    <article className="group bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl overflow-hidden shadow-xs hover:shadow-md transition flex flex-col justify-between">
      <div>
        {/* Thumbnail */}
        <div 
          onClick={() => onSelect(article)}
          className="relative h-44 sm:h-48 overflow-hidden bg-stone-100 dark:bg-stone-800 cursor-pointer"
        >
          <img
            src={article.imageUrl}
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-103 transition duration-500"
            loading="lazy"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = 'https://images.unsplash.com/photo-1495020689067-958852a7765e?auto=format&fit=crop&w=1200&q=80';
            }}
          />
          {article.isBreaking && (
            <span className="absolute top-2.5 left-2.5 bg-red-600 text-white text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded shadow">
              URGENTE
            </span>
          )}
          {article.isDominican ? (
            <span className="absolute top-2.5 right-2.5 bg-stone-900/80 backdrop-blur text-white text-[10px] font-bold px-1.5 py-0.5 rounded shadow-xs">
              🇩🇴 RD
            </span>
          ) : (
            <span className="absolute top-2.5 right-2.5 bg-blue-900/80 backdrop-blur text-white text-[10px] font-bold px-1.5 py-0.5 rounded shadow-xs">
              🌎 Global
            </span>
          )}
        </div>

        {/* Body */}
        <div className="p-4">
          <div className="flex items-center justify-between text-[11px] mb-2">
            <span className="font-bold uppercase tracking-wide text-amber-700 dark:text-amber-400">
              {article.category}
            </span>
            <span className="flex items-center gap-1 font-semibold text-emerald-700 dark:text-emerald-400">
              <ShieldCheck className="w-3 h-3" />
              {article.aiVerification.credibilityScore}%
            </span>
          </div>

          <h3
            onClick={() => onSelect(article)}
            className="text-base sm:text-lg font-bold font-serif leading-snug text-stone-900 dark:text-stone-50 cursor-pointer hover:text-amber-800 dark:hover:text-amber-400 transition mb-2"
          >
            {decodeHtmlEntities(article.title)}
          </h3>

          <p className="text-xs text-stone-600 dark:text-stone-300 font-reading line-clamp-2 leading-relaxed mb-3">
            {decodeHtmlEntities(article.excerpt)}
          </p>

          {/* AI Summary Expander */}
          <div className="mb-2">
            <button
              onClick={() => setShowSummary(!showSummary)}
              className="text-[11px] font-bold text-amber-800 dark:text-amber-400 hover:underline flex items-center gap-1"
            >
              <Sparkles className="w-3 h-3" />
              {showSummary ? 'Ocultar resumen IA' : 'Ver resumen IA (3 viñetas)'}
              {showSummary ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
            </button>

            {showSummary && (
              <div className="mt-2 p-2.5 bg-amber-500/10 dark:bg-amber-500/5 rounded border border-amber-500/20 text-xs text-stone-800 dark:text-stone-200">
                <ul className="space-y-1">
                  {(article.summary || []).map((point, idx) => (
                    <li key={idx} className="flex items-start gap-1">
                      <span className="text-amber-600 font-bold">•</span>
                      <span>{formatSummaryPoint(point)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="px-4 pb-3 pt-2 border-t border-stone-100 dark:border-stone-800/80 flex items-center justify-between text-xs text-stone-500 dark:text-stone-400">
        <div className="truncate max-w-[55%]">
          <span className="font-semibold text-stone-700 dark:text-stone-300 truncate block">
            {article.source.name}
          </span>
          <span className="text-[10px] text-stone-400">{formattedDate}</span>
        </div>

        <div className="flex items-center gap-2">
          {onPlayAudio && (
            <button
              onClick={() => onPlayAudio(article)}
              className="p-1 rounded text-stone-500 hover:text-amber-600 transition"
              title="Escuchar audio"
            >
              <Volume2 className="w-3.5 h-3.5" />
            </button>
          )}
          <SocialShareBar article={article} variant="compact" />
        </div>
      </div>
    </article>
  );
};
