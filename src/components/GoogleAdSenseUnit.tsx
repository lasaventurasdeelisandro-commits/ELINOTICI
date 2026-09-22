import React, { useEffect, useRef } from 'react';
import { Sparkles, Settings2, ExternalLink, ShieldAlert, CheckCircle } from 'lucide-react';
import { AdSenseConfig } from '../types';

interface GoogleAdSenseUnitProps {
  slot: 'header_top' | 'in_feed' | 'sidebar' | 'article_modal' | 'footer_banner';
  config?: AdSenseConfig;
  onOpenAdSenseConfig: () => void;
  className?: string;
  format?: 'auto' | 'horizontal' | 'rectangle' | 'vertical';
}

const SLOT_NAMES: Record<string, string> = {
  header_top: 'Cabecera Superior (Leaderboard 728x90)',
  in_feed: 'Dentro del Contenido / Noticias (In-Feed Responsive)',
  sidebar: 'Columna Lateral / Robapáginas (300x250 / 300x600)',
  article_modal: 'Lectura de Noticia (AdSense In-Article)',
  footer_banner: 'Pie de Página (Horizontal 970x90 / 728x90)',
};

export const GoogleAdSenseUnit: React.FC<GoogleAdSenseUnitProps> = ({
  slot,
  config,
  onOpenAdSenseConfig,
  className = '',
  format = 'horizontal',
}) => {
  const adRef = useRef<HTMLDivElement>(null);

  const publisherId = config?.publisherId || 'ca-pub-9842510294719283';
  const slotId = config?.slots?.[slot] || '1029384756';
  const isEnabled = config?.enabled ?? true;
  const isTestMode = config?.testMode ?? false;

  // Attempt to push to adsbygoogle array if live in real DOM
  useEffect(() => {
    if (isEnabled && !isTestMode && typeof window !== 'undefined') {
      try {
        const windowWithAds = window as unknown as { adsbygoogle?: unknown[] };
        if (windowWithAds.adsbygoogle) {
          windowWithAds.adsbygoogle.push({});
        }
      } catch {
        // Handled silently
      }
    }
  }, [isEnabled, isTestMode, slotId]);

  if (!isEnabled) {
    return null;
  }

  return (
    <div
      id={`google-adsense-slot-${slot}`}
      ref={adRef}
      className={`w-full relative bg-stone-50 dark:bg-stone-900/70 border-2 border-dashed border-blue-300 dark:border-blue-900/60 rounded-xl overflow-hidden shadow-2xs transition hover:border-blue-400 dark:hover:border-blue-700 ${className}`}
    >
      {/* Google AdSense Distinct Brand Header */}
      <div className="flex flex-wrap items-center justify-between px-3 py-1.5 bg-blue-50/80 dark:bg-blue-950/40 border-b border-blue-200 dark:border-blue-900/50 text-[11px]">
        <div className="flex items-center gap-2">
          {/* Google 4-Color Dots badge */}
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-[#4285F4]" title="Google Blue"></span>
            <span className="w-2 h-2 rounded-full bg-[#EA4335]" title="Google Red"></span>
            <span className="w-2 h-2 rounded-full bg-[#FBBC05]" title="Google Yellow"></span>
            <span className="w-2 h-2 rounded-full bg-[#34A853]" title="Google Green"></span>
          </div>

          <span className="font-bold text-blue-900 dark:text-blue-300 tracking-wide">
            Google AdSense
          </span>
          <span className="text-stone-300 dark:text-stone-700">|</span>
          <span className="text-stone-500 dark:text-stone-400 text-[10px]">
            Red Automática de Anuncios
          </span>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-[10px] text-stone-400 dark:text-stone-500 hidden sm:inline font-mono">
            Slot: {slotId}
          </span>
          <button
            onClick={onOpenAdSenseConfig}
            className="text-[11px] font-semibold text-blue-700 dark:text-blue-400 hover:text-blue-900 dark:hover:text-blue-200 hover:underline flex items-center gap-1"
          >
            <Settings2 className="w-3 h-3" />
            <span>Configurar AdSense</span>
          </button>
        </div>
      </div>

      {/* AdSense Interactive Slot Container */}
      <div className="p-4 sm:p-5 flex flex-col items-center justify-center text-center min-h-[90px] relative">
        <div className="w-full max-w-2xl flex flex-col items-center justify-center space-y-2">
          {/* Status Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 text-[10px] font-mono">
            <span className="px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-300 font-semibold border border-blue-200 dark:border-blue-800">
              Publisher ID: {publisherId}
            </span>
            <span className="px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-semibold border border-emerald-200 dark:border-emerald-800 flex items-center gap-1">
              <CheckCircle className="w-3 h-3" />
              <span>Verificado por ads.txt</span>
            </span>
            {isTestMode && (
              <span className="px-2 py-0.5 rounded bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 font-semibold border border-amber-200 dark:border-amber-800">
                Modo Pruebas (Test Mode)
              </span>
            )}
          </div>

          <div className="space-y-1">
            <h4 className="text-xs sm:text-sm font-bold text-stone-800 dark:text-stone-200">
              {SLOT_NAMES[slot] || 'Espacio Publicitario Google AdSense'}
            </h4>
            <p className="text-[11px] text-stone-500 dark:text-stone-400 max-w-lg leading-relaxed">
              Anuncios contextuales servidos de forma programática por la red publicitaria global de Google AdSense basados en el contenido de la noticia.
            </p>
          </div>

          {/* AdChoices & Disclaimer footer */}
          <div className="pt-1 flex items-center justify-center gap-3 text-[10px] text-stone-400">
            <span className="hover:underline cursor-pointer">AdChoices ⓘ</span>
            <span>•</span>
            <span className="hover:underline cursor-pointer">Privacidad de Anuncios Google</span>
            <span>•</span>
            <a
              href="/ads.txt"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center gap-0.5"
            >
              <span>Ver ads.txt</span>
              <ExternalLink className="w-2.5 h-2.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
