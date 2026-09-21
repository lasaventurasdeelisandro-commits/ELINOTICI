import React, { useState, useEffect } from 'react';
import { ExternalLink, Sparkles, ChevronRight, Info, DollarSign, ShieldCheck } from 'lucide-react';
import { AdPlacement, AdvertiserCampaign, AdSenseConfig } from '../types';

interface AdBannerProps {
  placement: AdPlacement;
  onOpenAdPortal: (preselectedPlacement?: AdPlacement) => void;
  className?: string;
  config?: AdSenseConfig;
  campaigns?: AdvertiserCampaign[];
}

export const AdBanner: React.FC<AdBannerProps> = ({
  placement,
  onOpenAdPortal,
  className = '',
  config,
  campaigns = [],
}) => {
  const [activeAd, setActiveAd] = useState<AdvertiserCampaign | null>(null);
  const [adSenseConfig, setAdSenseConfig] = useState<AdSenseConfig>(
    config || {
      enabled: true,
      publisherId: 'ca-pub-9842510294719283',
      slots: {
        header_top: '1029384756',
        in_feed: '2938475610',
        sidebar: '3847561029',
        article_modal: '4756102938',
        footer_banner: '5610293847',
      },
      testMode: false,
      monetizationMode: 'hybrid',
    }
  );

  useEffect(() => {
    if (config) {
      setAdSenseConfig(config);
    }
  }, [config]);

  // Pick matching direct campaign if available
  useEffect(() => {
    const matching = campaigns.filter(
      (c) => c.status === 'active' && c.placement === placement
    );
    if (matching.length > 0) {
      // Pick random or first
      const randomIndex = Math.floor(Math.random() * matching.length);
      setActiveAd(matching[randomIndex]);

      // Record impression
      fetch(`/api/ads/impression/${matching[randomIndex].id}`, { method: 'POST' }).catch(() => {});
    } else {
      setActiveAd(null);
    }
  }, [campaigns, placement]);

  const handleDirectAdClick = () => {
    if (!activeAd) return;
    fetch(`/api/ads/click/${activeAd.id}`, { method: 'POST' }).catch(() => {});
    window.open(activeAd.targetUrl, '_blank', 'noopener,noreferrer');
  };

  const mode = adSenseConfig.monetizationMode;

  // Decide what to show:
  // If mode === 'direct_only' and no active ad -> show House ad / "Anúnciate Aquí"
  // If mode === 'adsense_only' -> show AdSense slot
  // If mode === 'hybrid' -> show direct ad if present, else AdSense slot
  const showDirect = (mode === 'direct_only' || mode === 'hybrid') && activeAd !== null;

  // ----------------------------------------------------
  // 1. Direct-Sold Advertiser Banner
  // ----------------------------------------------------
  if (showDirect && activeAd) {
    if (placement === 'sidebar') {
      return (
        <aside
          id={`ad-slot-${placement}`}
          className={`group relative bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl overflow-hidden shadow-xs hover:border-amber-500/50 dark:hover:border-amber-500/50 transition ${className}`}
        >
          {/* Header Label */}
          <div className="flex items-center justify-between px-3 py-1.5 bg-stone-100 dark:bg-stone-800/80 border-b border-stone-200 dark:border-stone-700/60 text-[10px] text-stone-500">
            <span className="font-semibold uppercase tracking-wider text-amber-700 dark:text-amber-400">
              Patrocinado
            </span>
            <button
              onClick={() => onOpenAdPortal(placement)}
              className="hover:text-stone-800 dark:hover:text-stone-200 transition underline decoration-dotted"
            >
              Anúnciate aquí
            </button>
          </div>

          {/* Ad Image & Content */}
          <div
            onClick={handleDirectAdClick}
            className="cursor-pointer block overflow-hidden"
          >
            <div className="h-44 w-full overflow-hidden bg-stone-100 dark:bg-stone-800 relative">
              <img
                src={activeAd.imageUrl}
                alt={activeAd.adTitle}
                className="w-full h-full object-cover group-hover:scale-102 transition duration-300"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src =
                    'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80';
                }}
              />
              <span className="absolute bottom-2 left-2 bg-stone-900/80 backdrop-blur-xs text-white text-[10px] px-2 py-0.5 rounded font-medium">
                {activeAd.advertiserName}
              </span>
            </div>

            <div className="p-3.5 space-y-2">
              <h4 className="text-sm font-bold text-stone-900 dark:text-stone-100 line-clamp-2 leading-snug group-hover:text-amber-600 transition">
                {activeAd.adTitle}
              </h4>
              {activeAd.adSubtitle && (
                <p className="text-xs text-stone-600 dark:text-stone-400 line-clamp-2 font-reading">
                  {activeAd.adSubtitle}
                </p>
              )}

              <div className="pt-1 flex items-center justify-between">
                <span className="text-xs font-bold text-amber-700 dark:text-amber-400 flex items-center gap-1">
                  <span>{activeAd.callToAction}</span>
                  <ExternalLink className="w-3 h-3" />
                </span>
                <span className="text-[10px] text-stone-400">Publicidad</span>
              </div>
            </div>
          </div>
        </aside>
      );
    }

    // Horizontal Banners (header_top, in_feed, article_modal, footer_banner)
    return (
      <div
        id={`ad-slot-${placement}`}
        className={`w-full group relative bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl overflow-hidden shadow-xs hover:border-amber-500/50 transition ${className}`}
      >
        {/* Top Mini Label */}
        <div className="flex items-center justify-between px-3 py-1 bg-stone-100 dark:bg-stone-800/80 border-b border-stone-200 dark:border-stone-700/60 text-[10px] text-stone-500">
          <div className="flex items-center gap-2">
            <span className="font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400">
              Espacio Patrocinado
            </span>
            <span>•</span>
            <span className="text-stone-600 dark:text-stone-400 font-medium">{activeAd.advertiserName}</span>
          </div>
          <button
            onClick={() => onOpenAdPortal(placement)}
            className="hover:text-stone-900 dark:hover:text-stone-100 transition underline decoration-dotted"
          >
            Tarifario & Anúnciate aquí
          </button>
        </div>

        {/* Banner Body */}
        <div
          onClick={handleDirectAdClick}
          className="cursor-pointer p-3 sm:p-4 flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <div className="flex items-center gap-3 sm:gap-4 w-full sm:w-auto">
            <div className="w-16 h-16 sm:w-20 sm:h-20 shrink-0 rounded-lg overflow-hidden bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700">
              <img
                src={activeAd.imageUrl}
                alt={activeAd.adTitle}
                className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src =
                    'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=600&q=80';
                }}
              />
            </div>
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-amber-50 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 text-[11px] font-semibold">
                <span>{activeAd.businessCategory || 'Comercio RD'}</span>
              </div>
              <h4 className="text-sm sm:text-base font-bold text-stone-900 dark:text-stone-100 group-hover:text-amber-600 transition leading-snug">
                {activeAd.adTitle}
              </h4>
              {activeAd.adSubtitle && (
                <p className="text-xs text-stone-600 dark:text-stone-400 line-clamp-1 font-reading">
                  {activeAd.adSubtitle}
                </p>
              )}
            </div>
          </div>

          <div className="shrink-0 w-full sm:w-auto flex items-center justify-end">
            <button
              onClick={handleDirectAdClick}
              className="w-full sm:w-auto px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white dark:bg-amber-500 dark:hover:bg-amber-600 dark:text-stone-950 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5 shadow-sm"
            >
              <span>{activeAd.callToAction}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ----------------------------------------------------
  // 2. Google AdSense / Hybrid Fallback Slot
  // ----------------------------------------------------
  const slotId = adSenseConfig.slots[placement] || '1029384756';
  const pubId = adSenseConfig.publisherId || 'ca-pub-9842510294719283';

  return (
    <div
      id={`ad-slot-${placement}`}
      className={`w-full relative bg-stone-50 dark:bg-stone-900/60 border border-stone-200 dark:border-stone-800 rounded-xl overflow-hidden ${className}`}
    >
      {/* AdSense Top Header */}
      <div className="flex items-center justify-between px-3 py-1 bg-stone-100/90 dark:bg-stone-800/80 border-b border-stone-200 dark:border-stone-700/60 text-[10px] text-stone-500">
        <div className="flex items-center gap-1.5">
          <span className="font-semibold text-stone-600 dark:text-stone-400">Anuncios Google</span>
          <span className="text-stone-300 dark:text-stone-600">|</span>
          <span className="text-[9px] text-stone-400">AdChoices ⓘ</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => onOpenAdPortal(placement)}
            className="text-amber-700 dark:text-amber-400 hover:underline font-semibold flex items-center gap-0.5"
          >
            <span>Pauta tu anuncio aquí</span>
            <ChevronRight className="w-2.5 h-2.5" />
          </button>
        </div>
      </div>

      {/* AdSense Responsive Slot Canvas */}
      <div className="p-3 sm:p-4 text-center flex flex-col items-center justify-center min-h-[90px]">
        {/* If live adsbygoogle is requested, standard ins tag */}
        <div className="w-full flex flex-col items-center justify-center gap-1 text-center">
          <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-mono font-medium text-stone-500 bg-stone-200/60 dark:bg-stone-800/70 border border-stone-300 dark:border-stone-700">
            <span>Google AdSense Slot</span>
            <span>•</span>
            <span>ID: {slotId}</span>
            <span>•</span>
            <span className="text-emerald-600 dark:text-emerald-400 font-bold">Activo</span>
          </div>

          <div className="my-1 py-1 max-w-lg">
            <p className="text-xs font-semibold text-stone-700 dark:text-stone-300">
              Espacio disponible para anuncios contextuales de Google AdSense y patrocinadores directos de ELINOTICIA.
            </p>
            <p className="text-[11px] text-stone-500 dark:text-stone-400 mt-0.5">
              Tarifas preferenciales para empresas dominicanas y marcas globales.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2 mt-1">
            <button
              onClick={() => onOpenAdPortal(placement)}
              className="px-3 py-1 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs rounded shadow-xs transition flex items-center gap-1"
            >
              <DollarSign className="w-3 h-3" />
              <span>Ver Tarifario & Publicar Mi Anuncio</span>
            </button>
            <button
              onClick={() => onOpenAdPortal(placement)}
              className="px-3 py-1 bg-stone-200 dark:bg-stone-800 hover:bg-stone-300 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-300 font-medium text-xs rounded transition"
            >
              Configurar AdSense ({pubId.slice(0, 10)}...)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
