import React, { useState } from 'react';
import { 
  X, ShieldCheck, Sparkles, Clock, Globe, Volume2, 
  VolumeX, Play, Pause, ExternalLink, Tag, BookOpen, AlertCircle
} from 'lucide-react';
import { NewsArticle, SupportedLanguage } from '../types';
import { SocialShareBar } from './SocialShareBar';
import { SUPPORTED_LANGUAGES, t } from '../utils/translations';
import { decodeHtmlEntities, formatSummaryPoint, cleanSummaryArray } from '../utils/textUtils';

interface ArticleModalProps {
  article: NewsArticle | null;
  onClose: () => void;
  onTagClick: (tag: string) => void;
  lang: SupportedLanguage;
}

export const ArticleModal: React.FC<ArticleModalProps> = ({
  article,
  onClose,
  onTagClick,
  lang: currentLang,
}) => {
  if (!article) return null;

  const [translatedData, setTranslatedData] = useState<{
    title: string;
    summary: string[];
    content: string;
    targetLang: string;
  } | null>(null);
  const [isTranslating, setIsTranslating] = useState(false);
  const [selectedLang, setSelectedLang] = useState<SupportedLanguage>('en');

  // Audio Speech state
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speechRate, setSpeechRate] = useState<number>(1);

  // Trigger speech synthesis
  const handleToggleSpeech = () => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      alert('Tu navegador no soporta síntesis de voz.');
      return;
    }

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    } else {
      window.speechSynthesis.cancel();
      const textToRead = `${translatedData ? translatedData.title : article.title}. Resumen verificado: ${
        (translatedData ? translatedData.summary : article.summary).join('. ')
      }. ${translatedData ? translatedData.content : article.content}`;

      const utterance = new SpeechSynthesisUtterance(textToRead);
      utterance.lang = translatedData ? translatedData.targetLang : 'es-DO';
      utterance.rate = speechRate;

      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);

      window.speechSynthesis.speak(utterance);
      setIsSpeaking(true);
    }
  };

  // Close speech if modal closes
  const handleClose = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    onClose();
  };

  // Translate with Gemini
  const handleTranslate = async (targetLang: SupportedLanguage) => {
    if (targetLang === 'es') {
      setTranslatedData(null);
      return;
    }

    setIsTranslating(true);
    try {
      const res = await fetch('/api/ai/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: article.title,
          summary: article.summary,
          content: article.content,
          targetLang,
        }),
      });
      const data = await res.json();
      if (data.success && data.data) {
        setTranslatedData({
          ...data.data,
          targetLang,
        });
      }
    } catch (err) {
      console.error('Translation error:', err);
    } finally {
      setIsTranslating(false);
    }
  };

  const rawTitle = translatedData ? translatedData.title : article.title;
  const rawSummary = translatedData ? translatedData.summary : article.summary;
  const rawContent = translatedData ? translatedData.content : article.content;

  const title = decodeHtmlEntities(rawTitle);
  const summary = cleanSummaryArray(rawSummary);
  const content = decodeHtmlEntities(rawContent);

  const formattedDate = new Intl.DateTimeFormat('es-DO', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(article.publishedAt));

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/75 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 md:p-6 animate-fadeIn">
      <div 
        className="relative bg-white dark:bg-stone-900 w-full max-w-4xl rounded-2xl shadow-2xl border border-stone-200 dark:border-stone-800 overflow-hidden my-auto max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Sticky Bar */}
        <div className="px-5 py-3.5 bg-stone-50 dark:bg-stone-950 border-b border-stone-200 dark:border-stone-800 flex items-center justify-between gap-4 shrink-0">
          <div className="flex items-center gap-2">
            <span className="text-xs font-black uppercase tracking-wider text-amber-700 dark:text-amber-400">
              {article.category}
            </span>
            <span className="text-stone-300 dark:text-stone-700">•</span>
            <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded">
              <ShieldCheck className="w-4 h-4" />
              <span>{article.aiVerification.credibilityScore}% Verificado por IA</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Audio Reader Button */}
            <button
              id="article-listen-btn"
              onClick={handleToggleSpeech}
              className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 transition ${
                isSpeaking 
                  ? 'bg-amber-600 text-white animate-pulse'
                  : 'bg-stone-200 dark:bg-stone-800 hover:bg-stone-300 dark:hover:bg-stone-700 text-stone-800 dark:text-stone-200'
              }`}
              title="Escuchar noticia con voz sintetizada"
            >
              {isSpeaking ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              <span>{isSpeaking ? 'Pausar audio' : 'Escuchar Nota'}</span>
            </button>

            {/* Close Button */}
            <button
              onClick={handleClose}
              className="p-1.5 rounded-full hover:bg-stone-200 dark:hover:bg-stone-800 text-stone-500 hover:text-stone-900 dark:hover:text-stone-100 transition"
              title="Cerrar ventana"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Translation Banner */}
        <div className="bg-amber-50 dark:bg-amber-950/30 border-b border-amber-200/60 dark:border-amber-900/40 px-5 py-2 text-xs flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 text-amber-900 dark:text-amber-300">
            <Globe className="w-3.5 h-3.5" />
            <span>El periódico es en español. ¿Deseas leer esta noticia en otro idioma?</span>
          </div>

          <div className="flex items-center gap-2">
            <select
              value={selectedLang}
              onChange={(e) => setSelectedLang(e.target.value as any)}
              className="bg-white dark:bg-stone-800 border border-stone-300 dark:border-stone-700 rounded px-2 py-0.5 text-xs text-stone-800 dark:text-stone-200 font-medium"
            >
              {SUPPORTED_LANGUAGES.filter(l => l.code !== 'es').map((l) => (
                <option key={l.code} value={l.code}>
                  {l.flag} {l.nativeName}
                </option>
              ))}
            </select>

            <button
              onClick={() => handleTranslate(selectedLang)}
              disabled={isTranslating}
              className="px-2.5 py-0.5 rounded bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs disabled:opacity-50 transition shadow-xs"
            >
              {isTranslating ? 'Traduciendo con IA...' : 'Traducir con IA'}
            </button>

            {translatedData && (
              <button
                onClick={() => setTranslatedData(null)}
                className="text-xs text-stone-500 hover:underline font-medium"
              >
                Volver a Español original
              </button>
            )}
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto px-5 sm:px-8 py-6 space-y-6">
          {/* Header Title & Byline */}
          <div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold font-serif text-stone-950 dark:text-stone-50 leading-tight mb-3">
              {title}
            </h1>

            <div className="flex flex-wrap items-center gap-3 text-xs text-stone-500 dark:text-stone-400 pb-4 border-b border-stone-200 dark:border-stone-800">
              <span className="font-bold text-stone-800 dark:text-stone-200">
                Por: {article.author}
              </span>
              <span>•</span>
              <span>{formattedDate}</span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {article.readTimeMinutes} min de lectura
              </span>
              <span>•</span>
              <a
                href={article.source.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-700 dark:text-amber-400 hover:underline flex items-center gap-1 font-semibold"
              >
                Fuente original: {article.source.name}
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Main Hero Photo */}
          <div className="rounded-xl overflow-hidden bg-stone-100 dark:bg-stone-800">
            <img
              src={article.imageUrl}
              alt={title}
              className="w-full max-h-[440px] object-cover"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = 'https://images.unsplash.com/photo-1495020689067-958852a7765e?auto=format&fit=crop&w=1200&q=80';
              }}
            />
            {article.imageCaption && (
              <p className="p-2.5 text-xs italic text-stone-500 dark:text-stone-400 bg-stone-100 dark:bg-stone-800 text-center font-reading">
                {decodeHtmlEntities(article.imageCaption)}
              </p>
            )}
          </div>

          {/* Article Full Editorial Content */}
          <div className="prose dark:prose-invert max-w-none text-stone-800 dark:text-stone-200 font-reading text-base sm:text-lg leading-relaxed space-y-4">
            {content.split('\n\n').map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>

          {/* Social Share Bar */}
          <SocialShareBar article={article} variant="full" />

          {/* AI Executive Summary Box - Posicionado debajo de Compartir esta noticia */}
          <div className="bg-amber-500/10 dark:bg-amber-500/5 border border-amber-500/30 rounded-xl p-4 sm:p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2 text-sm font-bold text-amber-950 dark:text-amber-300">
                <Sparkles className="w-4 h-4 text-amber-600" />
                <span>Resumen Ejecutivo Generado por IA (3 Puntos Clave)</span>
              </div>
              <span className="text-[11px] font-semibold text-amber-700 dark:text-amber-400 bg-amber-500/20 px-2 py-0.5 rounded">
                Rigor Periodístico
              </span>
            </div>

            <ul className="space-y-2 text-sm text-stone-800 dark:text-stone-200 font-reading">
              {summary.map((point: any, idx: number) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-amber-600 font-bold text-base leading-none mt-1">✓</span>
                  <span>{formatSummaryPoint(point)}</span>
                </li>
              ))}
            </ul>

            {/* Fact-check facts */}
            {article.aiVerification.keyFactsVerified && (
              <div className="mt-3 pt-3 border-t border-amber-500/20 text-xs text-stone-600 dark:text-stone-400 flex flex-wrap items-center gap-x-4 gap-y-1">
                <span className="font-bold text-emerald-700 dark:text-emerald-400">Verificación de Hechos:</span>
                {article.aiVerification.keyFactsVerified.map((fact, idx) => (
                  <span key={idx}>• {decodeHtmlEntities(fact)}</span>
                ))}
              </div>
            )}
          </div>

          {/* Tags */}
          <div className="pt-2">
            <div className="flex items-center gap-1.5 text-xs font-bold text-stone-500 dark:text-stone-400 mb-2">
              <Tag className="w-3.5 h-3.5 text-amber-600" />
              <span>Etiquetas sugeridas por la IA:</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {article.tags.map((tag, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    handleClose();
                    onTagClick(tag);
                  }}
                  className="px-2.5 py-1 text-xs font-medium bg-stone-100 hover:bg-amber-100 hover:text-amber-800 dark:bg-stone-800 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-300 rounded-full transition"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
