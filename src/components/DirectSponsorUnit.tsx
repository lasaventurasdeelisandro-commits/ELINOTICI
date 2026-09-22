import React, { useState, useEffect } from 'react';
import { 
  Building2, ExternalLink, ShieldCheck, DollarSign, 
  ArrowRight, Sparkles, Phone, Mail, Award, CheckCircle2 
} from 'lucide-react';
import { AdPlacement, AdvertiserCampaign } from '../types';

interface DirectSponsorUnitProps {
  placement: AdPlacement;
  campaigns?: AdvertiserCampaign[];
  onOpenDirectAdPortal: (placement?: AdPlacement) => void;
  className?: string;
  variant?: 'banner' | 'card' | 'compact';
}

export const DirectSponsorUnit: React.FC<DirectSponsorUnitProps> = ({
  placement,
  campaigns = [],
  onOpenDirectAdPortal,
  className = '',
  variant = 'banner',
}) => {
  const [activeCampaign, setActiveCampaign] = useState<AdvertiserCampaign | null>(null);

  useEffect(() => {
    const matching = campaigns.filter(
      (c) => c.status === 'active' && c.placement === placement
    );
    if (matching.length > 0) {
      // Pick random among active or first
      const chosen = matching[Math.floor(Math.random() * matching.length)];
      setActiveCampaign(chosen);

      // Record impression in background
      fetch(`/api/ads/impression/${chosen.id}`, { method: 'POST' }).catch(() => {});
    } else {
      setActiveCampaign(null);
    }
  }, [campaigns, placement]);

  const handleCampaignClick = () => {
    if (!activeCampaign) return;
    fetch(`/api/ads/click/${activeCampaign.id}`, { method: 'POST' }).catch(() => {});
    window.open(activeCampaign.targetUrl, '_blank', 'noopener,noreferrer');
  };

  // ----------------------------------------------------------------------
  // CASE A: We have an active Direct Advertiser Campaign for this placement
  // ----------------------------------------------------------------------
  if (activeCampaign) {
    if (variant === 'card' || placement === 'sidebar') {
      return (
        <div
          id={`direct-sponsor-${placement}`}
          className={`group relative bg-white dark:bg-stone-900 border-2 border-amber-300 dark:border-amber-900/70 rounded-xl overflow-hidden shadow-xs hover:border-amber-500 transition duration-200 ${className}`}
        >
          {/* Direct Ad Distinctive Top Badge */}
          <div className="flex items-center justify-between px-3 py-1.5 bg-amber-500 text-stone-950 font-bold text-[10px] tracking-wide">
            <div className="flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 fill-stone-950" />
              <span className="uppercase">Patrocinador Directo Exclusivo</span>
            </div>
            <button
              onClick={() => onOpenDirectAdPortal(placement)}
              className="hover:underline text-[9px] font-semibold tracking-normal text-stone-900"
            >
              Pautar aquí
            </button>
          </div>

          <div
            onClick={handleCampaignClick}
            className="cursor-pointer block overflow-hidden"
          >
            <div className="h-44 w-full overflow-hidden bg-stone-100 dark:bg-stone-800 relative">
              <img
                src={activeCampaign.imageUrl}
                alt={activeCampaign.adTitle}
                className="w-full h-full object-cover group-hover:scale-103 transition duration-300"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src =
                    'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80';
                }}
              />
              <span className="absolute bottom-2 left-2 bg-stone-950/85 backdrop-blur-xs text-amber-300 text-[10px] px-2 py-0.5 rounded font-bold border border-amber-500/30">
                {activeCampaign.advertiserName}
              </span>
            </div>

            <div className="p-3.5 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-semibold text-amber-800 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/50 px-2 py-0.5 rounded">
                  {activeCampaign.businessCategory}
                </span>
                <span className="text-[10px] text-stone-400 flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-emerald-600" />
                  Verificado
                </span>
              </div>

              <h4 className="text-sm font-bold text-stone-900 dark:text-stone-100 group-hover:text-amber-600 transition leading-snug">
                {activeCampaign.adTitle}
              </h4>

              {activeCampaign.adSubtitle && (
                <p className="text-xs text-stone-600 dark:text-stone-400 line-clamp-2 font-reading">
                  {activeCampaign.adSubtitle}
                </p>
              )}

              <div className="pt-2 flex items-center justify-between border-t border-stone-100 dark:border-stone-800">
                <button
                  onClick={handleCampaignClick}
                  className="px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs rounded-lg transition flex items-center gap-1"
                >
                  <span>{activeCampaign.callToAction}</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onOpenDirectAdPortal(placement);
                  }}
                  className="text-[10px] text-stone-500 hover:text-stone-800 dark:hover:text-stone-300 hover:underline"
                >
                  Anúnciate aquí
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }

    // Horizontal Banner Format
    return (
      <div
        id={`direct-sponsor-${placement}`}
        className={`w-full group relative bg-white dark:bg-stone-900 border-2 border-amber-400/80 dark:border-amber-600/60 rounded-xl overflow-hidden shadow-xs hover:border-amber-500 transition duration-200 ${className}`}
      >
        {/* Direct Ad Distinctive Top Strip */}
        <div className="flex flex-wrap items-center justify-between px-3.5 py-1.5 bg-gradient-to-r from-amber-500 to-amber-600 text-stone-950 font-bold text-[11px]">
          <div className="flex items-center gap-2">
            <Award className="w-3.5 h-3.5 fill-stone-950" />
            <span className="uppercase tracking-wider">Patrocinio Comercial Directo</span>
            <span>•</span>
            <span className="font-normal text-stone-900">Anunciante Oficial de ELINOTICIA</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[10px] bg-stone-950/15 px-2 py-0.5 rounded font-mono">
              {activeCampaign.advertiserName}
            </span>
            <button
              onClick={() => onOpenDirectAdPortal(placement)}
              className="text-stone-950 hover:underline text-[10px] font-bold"
            >
              Pautar mi negocio aquí →
            </button>
          </div>
        </div>

        {/* Banner Body */}
        <div
          onClick={handleCampaignClick}
          className="cursor-pointer p-3.5 sm:p-4.5 flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <div className="flex items-center gap-3 sm:gap-4 w-full sm:w-auto">
            <div className="w-16 h-16 sm:w-20 sm:h-20 shrink-0 rounded-lg overflow-hidden bg-stone-100 dark:bg-stone-800 border-2 border-amber-200 dark:border-amber-900/60 relative">
              <img
                src={activeCampaign.imageUrl}
                alt={activeCampaign.adTitle}
                className="w-full h-full object-cover group-hover:scale-104 transition duration-300"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src =
                    'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=600&q=80';
                }}
              />
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-amber-100 dark:bg-amber-950/70 text-amber-900 dark:text-amber-300 text-[10px] font-bold">
                  {activeCampaign.businessCategory}
                </span>
                <span className="text-[10px] text-stone-500 font-medium">
                  {activeCampaign.advertiserName}
                </span>
              </div>

              <h4 className="text-sm sm:text-base font-bold text-stone-900 dark:text-stone-100 group-hover:text-amber-600 transition leading-snug">
                {activeCampaign.adTitle}
              </h4>

              {activeCampaign.adSubtitle && (
                <p className="text-xs text-stone-600 dark:text-stone-400 line-clamp-1 font-reading">
                  {activeCampaign.adSubtitle}
                </p>
              )}
            </div>
          </div>

          <div className="shrink-0 w-full sm:w-auto flex items-center justify-end gap-2">
            <button
              onClick={handleCampaignClick}
              className="w-full sm:w-auto px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs rounded-lg transition flex items-center justify-center gap-1.5 shadow-xs"
            >
              <span>{activeCampaign.callToAction}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ----------------------------------------------------------------------
  // CASE B: Slot is open for Direct Advertisers to book their campaign
  // ----------------------------------------------------------------------
  return (
    <div
      id={`direct-sponsor-open-${placement}`}
      className={`w-full relative bg-amber-50/50 dark:bg-amber-950/20 border-2 border-dashed border-amber-300 dark:border-amber-800/60 rounded-xl overflow-hidden transition hover:border-amber-400 dark:hover:border-amber-600 ${className}`}
    >
      {/* Top Banner Bar */}
      <div className="flex items-center justify-between px-3.5 py-1.5 bg-amber-100 dark:bg-amber-900/40 border-b border-amber-200 dark:border-amber-800/60 text-[11px] font-bold text-amber-900 dark:text-amber-300">
        <div className="flex items-center gap-1.5">
          <Building2 className="w-3.5 h-3.5 text-amber-700 dark:text-amber-400" />
          <span className="uppercase tracking-wide">Espacio Reservado para Anunciantes Directos</span>
        </div>
        <span className="text-[10px] text-amber-800 dark:text-amber-400 bg-amber-200/70 dark:bg-amber-900/60 px-2 py-0.5 rounded font-mono">
          Pauta Directa ELINOTICIA
        </span>
      </div>

      <div className="p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1.5 text-center sm:text-left">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-800 dark:text-amber-300">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>¿Quieres publicar tu anuncio comercial directamente aquí?</span>
          </div>
          <p className="text-xs text-stone-600 dark:text-stone-400 max-w-xl">
            Promociona tu empresa, producto o servicio frente a miles de lectores diarios en República Dominicana y la diáspora. Pago directo en pesos dominicanos o dólares.
          </p>
          <div className="flex flex-wrap items-center gap-3 pt-1 text-[11px] text-stone-500 dark:text-stone-400 justify-center sm:justify-start">
            <span className="flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-emerald-600" />
              Sin comisiones de intermediarios
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-emerald-600" />
              Depósitos Banco Popular, Banreservas, BHD o Tarjeta
            </span>
          </div>
        </div>

        <div className="shrink-0 w-full sm:w-auto">
          <button
            onClick={() => onOpenDirectAdPortal(placement)}
            className="w-full sm:w-auto px-5 py-2.5 bg-stone-900 hover:bg-stone-800 text-white dark:bg-amber-500 dark:hover:bg-amber-400 dark:text-stone-950 font-bold text-xs rounded-xl shadow-xs transition flex items-center justify-center gap-2"
          >
            <DollarSign className="w-4 h-4" />
            <span>Pautar Mi Anuncio Directo</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
