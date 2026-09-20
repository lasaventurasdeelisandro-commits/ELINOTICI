import React, { useState } from 'react';
import { NewsArticle } from '../types';
import { TrendingUp, ShieldCheck, DollarSign, Globe, BarChart3, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { SocialShareBar } from './SocialShareBar';

interface EconomySectionProps {
  articles: NewsArticle[];
  onSelect: (article: NewsArticle) => void;
}

export const EconomySection: React.FC<EconomySectionProps> = ({ articles, onSelect }) => {
  const [scope, setScope] = useState<'all' | 'dominican' | 'global'>('all');
  const [activeMarketTab, setActiveMarketTab] = useState<'rd' | 'global' | 'crypto'>('rd');

  const economyArticles = articles.filter(a => {
    if (a.category !== 'economia') return false;
    if (scope === 'dominican') return a.isDominican;
    if (scope === 'global') return !a.isDominican;
    return true;
  });

  const dominicanIndicators = [
    { name: 'Tasa Política Monetaria (BCRD)', value: '5.75%', change: 'Estable', positive: true },
    { name: 'Dólar Estadounidense (USD/DOP)', value: 'RD$ 60.15 / 60.45', change: '+0.08% BCRD', positive: false },
    { name: 'Euro Oficial (EUR/DOP)', value: 'RD$ 65.20 / 65.85', change: '-0.15% BCRD', positive: true },
    { name: 'Dólar Canadiense (CAD/DOP)', value: 'RD$ 43.85 / 44.30', change: '+0.12%', positive: true },
    { name: 'Libra Esterlina (GBP/DOP)', value: 'RD$ 77.40 / 78.20', change: '+0.22%', positive: true },
    { name: 'Inflación Interanual', value: '3.45%', change: 'Rango Meta BCRD', positive: true },
    { name: 'Reservas Internacionales', value: 'US$ 14,850M', change: 'Máximo Histórico', positive: true },
    { name: 'Inversión Extranjera (IED)', value: 'US$ 4,380M', change: '+9.2%', positive: true },
  ];

  const cryptoIndicators = [
    { name: 'Bitcoin (BTC / USD)', value: '$81,150.00', change: '+1.45% 24h', subValue: 'RD$ 4,893,345', positive: true },
    { name: 'Ethereum / Etherior (ETH)', value: '$2,640.00', change: '+2.10% 24h', subValue: 'RD$ 159,192', positive: true },
    { name: 'Solana (SOL / USD)', value: '$110.50', change: '-0.65% 24h', subValue: 'RD$ 6,663', positive: false },
    { name: 'Tether USD (USDT / DOP)', value: 'RD$ 60.30', change: '+0.02%', subValue: '$1.00 USD', positive: true },
  ];

  const globalIndicators = [
    { name: 'S&P 500 (Wall Street)', value: '5,864.20', change: '+0.42%', positive: true },
    { name: 'Nasdaq Composite', value: '20,120.10', change: '+0.68%', positive: true },
    { name: 'Barril Petróleo WTI', value: 'US$ 71.30', change: '-0.35%', positive: true },
    { name: 'Onza de Oro (Spot)', value: 'US$ 2,642.50', change: '+0.55%', positive: true },
    { name: 'Tasa FED (Reserva Federal)', value: '4.75% - 5.00%', change: 'Pausa Monetaria', positive: true },
    { name: 'Rendimiento Bono 10A EE.UU.', value: '4.12%', change: '-0.04%', positive: true },
  ];

  return (
    <section className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b-2 border-stone-900 dark:border-stone-100 pb-3">
        <div className="flex items-center gap-3">
          <span className="text-3xl">💼📈</span>
          <div>
            <h2 className="text-2xl sm:text-3xl font-black font-serif text-stone-950 dark:text-stone-50">
              ECONOMÍA, NEGOCIOS & MERCADOS GLOBALES
            </h2>
            <p className="text-xs text-stone-500">
              Crecimiento dominicano, turismo, tipo de cambio, Wall Street, petróleo y finanzas internacionales.
            </p>
          </div>
        </div>

        {/* Scope Sub-Filters */}
        <div className="flex items-center gap-1.5 p-1 bg-stone-200/70 dark:bg-stone-800 rounded-lg text-xs font-bold">
          <button
            onClick={() => setScope('all')}
            className={`px-3 py-1.5 rounded-md transition ${
              scope === 'all'
                ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 shadow-sm'
                : 'text-stone-600 dark:text-stone-400 hover:text-stone-900'
            }`}
          >
            Todas las Finanzas
          </button>
          <button
            onClick={() => setScope('dominican')}
            className={`px-3 py-1.5 rounded-md transition flex items-center gap-1 ${
              scope === 'dominican'
                ? 'bg-amber-600 text-white shadow-sm'
                : 'text-stone-600 dark:text-stone-400 hover:text-stone-900'
            }`}
          >
            <span>🇩🇴</span> Economía RD
          </button>
          <button
            onClick={() => setScope('global')}
            className={`px-3 py-1.5 rounded-md transition flex items-center gap-1 ${
              scope === 'global'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-stone-600 dark:text-stone-400 hover:text-stone-900'
            }`}
          >
            <span>🌎</span> Mercados Mundiales
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Economy News */}
        <div className="lg:col-span-8 space-y-4">
          {economyArticles.length === 0 ? (
            <div className="p-12 text-center bg-white dark:bg-stone-900 rounded-xl border border-stone-200 dark:border-stone-800">
              <TrendingUp className="w-8 h-8 text-stone-400 mx-auto mb-2" />
              <p className="text-sm font-bold text-stone-600 dark:text-stone-300">
                No hay noticias económicas en este filtro actualmente.
              </p>
            </div>
          ) : (
            economyArticles.map((art) => (
              <article
                key={art.id}
                onClick={() => onSelect(art)}
                className="p-4 sm:p-5 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl hover:shadow-md transition cursor-pointer flex flex-col sm:flex-row gap-4 justify-between"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase mb-1.5 flex-wrap">
                    {/* Geographic Tag */}
                    <span className={`px-2 py-0.5 rounded text-[10px] font-black ${
                      art.isDominican
                        ? 'bg-amber-500/15 text-amber-800 dark:text-amber-300 border border-amber-500/30'
                        : 'bg-blue-500/15 text-blue-800 dark:text-blue-300 border border-blue-500/30'
                    }`}>
                      {art.isDominican ? '🇩🇴 Finanzas RD' : '🌎 Economía Mundial'}
                    </span>
                    <span className="text-stone-600 dark:text-stone-400">
                      {art.subcategory || (art.isDominican ? 'Macroeconomía RD' : 'Mercados Globales')}
                    </span>
                    <span className="text-stone-300 dark:text-stone-700">•</span>
                    <span className="flex items-center gap-1 text-[11px] text-emerald-700 dark:text-emerald-400 font-semibold">
                      <ShieldCheck className="w-3 h-3" />
                      {art.aiVerification.credibilityScore}% Verificado
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold font-serif text-stone-900 dark:text-stone-100 leading-snug hover:text-amber-700 transition mb-2">
                    {art.title}
                  </h3>

                  <p className="text-xs text-stone-600 dark:text-stone-300 font-reading line-clamp-2 leading-relaxed mb-3">
                    {art.excerpt}
                  </p>

                  <div className="flex items-center justify-between text-xs text-stone-500 pt-2 border-t border-stone-100 dark:border-stone-800">
                    <span className="font-semibold text-stone-700 dark:text-stone-300">{art.source.name}</span>
                    <SocialShareBar article={art} variant="compact" />
                  </div>
                </div>

                <div className="w-full sm:w-44 h-32 rounded-lg overflow-hidden shrink-0 bg-stone-100 dark:bg-stone-800 relative">
                  <img
                    src={art.imageUrl}
                    alt={art.title}
                    className="w-full h-full object-cover hover:scale-105 transition duration-300"
                  />
                  <span className="absolute bottom-1 right-1 text-[9px] font-bold px-1.5 py-0.5 rounded bg-stone-950/80 text-white backdrop-blur">
                    {art.isDominican ? '🇩🇴 DO' : '🌎 GLOBAL'}
                  </span>
                </div>
              </article>
            ))
          )}
        </div>

        {/* Right Column: Financial Indicators Dashboard */}
        <div className="lg:col-span-4 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4 border-b border-stone-200 dark:border-stone-800 pb-2.5">
              <div className="flex items-center gap-1 bg-stone-100 dark:bg-stone-800 p-1 rounded-lg text-xs font-bold flex-wrap">
                <button
                  onClick={() => setActiveMarketTab('rd')}
                  className={`px-2 py-1 rounded transition ${
                    activeMarketTab === 'rd'
                      ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 shadow-xs'
                      : 'text-stone-500 hover:text-stone-900'
                  }`}
                >
                  🇩🇴 Tasas RD
                </button>
                <button
                  onClick={() => setActiveMarketTab('crypto')}
                  className={`px-2 py-1 rounded transition ${
                    activeMarketTab === 'crypto'
                      ? 'bg-amber-600 text-white shadow-xs'
                      : 'text-stone-500 hover:text-stone-900'
                  }`}
                >
                  🪙 Cripto (BTC/ETH)
                </button>
                <button
                  onClick={() => setActiveMarketTab('global')}
                  className={`px-2 py-1 rounded transition ${
                    activeMarketTab === 'global'
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'text-stone-500 hover:text-stone-900'
                  }`}
                >
                  🌎 Wall Street
                </button>
              </div>

              <span className="text-[10px] text-emerald-700 dark:text-emerald-400 font-bold uppercase flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                En vivo
              </span>
            </div>

            <div className="space-y-3">
              {(activeMarketTab === 'rd' 
                ? dominicanIndicators 
                : (activeMarketTab === 'crypto' ? cryptoIndicators : globalIndicators)
              ).map((item, idx) => (
                <div
                  key={idx}
                  className="p-2.5 bg-stone-50 dark:bg-stone-800/60 rounded-lg flex items-center justify-between border border-stone-100 dark:border-stone-800"
                >
                  <div>
                    <span className="text-xs font-semibold text-stone-700 dark:text-stone-300 block">
                      {item.name}
                    </span>
                    <span className="text-[11px] text-stone-400">
                      {item.change}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-bold font-mono text-stone-900 dark:text-stone-100 block">
                      {item.value}
                    </span>
                    {'subValue' in item && (
                      <span className="text-[11px] font-mono text-amber-600 dark:text-amber-400 font-semibold block">
                        {(item as any).subValue}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-5 p-3 bg-amber-500/10 dark:bg-amber-500/5 rounded-lg border border-amber-500/20 text-xs text-stone-700 dark:text-stone-300">
            <span className="font-bold text-amber-800 dark:text-amber-300 block mb-1">
              {activeMarketTab === 'rd' 
                ? 'Banco Central RD (BCRD)' 
                : (activeMarketTab === 'crypto' ? 'Mercado Criptográfico Internacional' : 'Bolsa de Nueva York (NYSE)')}
            </span>
            <p className="text-[11px] text-stone-600 dark:text-stone-400 leading-relaxed">
              {activeMarketTab === 'rd'
                ? 'Tasas de compra y venta del dólar y euro, armonizadas con el Banco Central y la banca múltiple de la República Dominicana.'
                : (activeMarketTab === 'crypto'
                    ? 'Precios en tiempo real de Bitcoin (BTC), Ethereum (Etherior) y activos digitales líderes con paridad y conversión oficial a pesos dominicanos (DOP).'
                    : 'Cotizaciones de referencia internacional con actualización continua para el análisis de inversionistas y analistas.')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
