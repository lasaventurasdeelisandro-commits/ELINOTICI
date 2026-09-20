import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, TrendingDown, RefreshCw, Calculator, 
  ArrowRightLeft, ExternalLink, X, DollarSign, Sparkles, Check
} from 'lucide-react';
import { CurrencyRateItem, MarketRatesResponse } from '../types';

interface CurrencyExchangeBarProps {
  onOpenCalculator?: () => void;
}

export const CurrencyExchangeBar: React.FC<CurrencyExchangeBarProps> = ({ onOpenCalculator }) => {
  const [ratesData, setRatesData] = useState<MarketRatesResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState<'all' | 'fiat' | 'crypto'>('all');

  // Calculator state
  const [calcAmount, setCalcAmount] = useState<number>(100);
  const [calcCurrency, setCalcCurrency] = useState<string>('USD');

  const fetchRates = async () => {
    try {
      setIsRefreshing(true);
      const res = await fetch('/api/market/rates');
      const json = await res.json();
      if (json.success && json.data) {
        setRatesData(json.data);
      }
    } catch (e) {
      console.error('Error fetching currency rates:', e);
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchRates();
    // Auto-refresh every 60 seconds
    const interval = setInterval(fetchRates, 60000);
    return () => clearInterval(interval);
  }, []);

  if (loading && !ratesData) {
    return (
      <div className="bg-stone-900 text-stone-300 py-1.5 px-4 text-xs flex items-center justify-between border-b border-stone-800">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
          <span>Cargando cotizaciones oficiales y criptomonedas en tiempo real...</span>
        </div>
      </div>
    );
  }

  const allRates: CurrencyRateItem[] = [
    ...(ratesData?.fiat || []),
    ...(ratesData?.crypto || []),
  ];

  const filteredRates = allRates.filter((r) => {
    if (activeTab === 'fiat') return r.type === 'fiat';
    if (activeTab === 'crypto') return r.type === 'crypto';
    return true;
  });

  // Calculate conversion for modal
  const selectedRateItem = allRates.find(r => r.code === calcCurrency) || allRates[0];
  const convertedToDOP = selectedRateItem 
    ? (selectedRateItem.type === 'crypto'
        ? calcAmount * selectedRateItem.priceDOP
        : (calcAmount * (selectedRateItem.sellPriceDOP || selectedRateItem.priceDOP)))
    : 0;

  const convertedToUSD = selectedRateItem
    ? (selectedRateItem.type === 'crypto'
        ? calcAmount * selectedRateItem.priceUSD
        : calcAmount * selectedRateItem.priceUSD)
    : 0;

  return (
    <>
      {/* Horizontal Financial Exchange Bar */}
      <div className="w-full bg-stone-900 text-stone-100 border-b border-stone-800 text-xs shadow-inner">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-1.5 flex items-center justify-between gap-3">
          
          {/* Label & Modal Trigger Button */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setShowModal(true)}
              className="flex items-center gap-1.5 bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 border border-amber-500/30 px-2.5 py-0.5 rounded font-bold transition"
              title="Abrir convertidor y tabla oficial de divisas"
            >
              <DollarSign className="w-3.5 h-3.5 text-amber-400" />
              <span className="font-semibold tracking-wide uppercase text-[11px]">TASAS DE CAMBIO</span>
              <Calculator className="w-3 h-3 ml-0.5 opacity-80" />
            </button>
            <span className="hidden lg:inline text-stone-500 text-[10px]">BCRD & Criptomercados</span>
          </div>

          {/* Marquee / Scrollable Rates Items */}
          <div className="flex-1 overflow-x-auto no-scrollbar flex items-center gap-4 sm:gap-6 py-0.5">
            {allRates.map((rate) => {
              const isPositive = rate.change24h >= 0;
              return (
                <button
                  key={rate.code}
                  onClick={() => {
                    setCalcCurrency(rate.code);
                    setShowModal(true);
                  }}
                  className="flex items-center gap-2 shrink-0 hover:bg-stone-800/80 px-2 py-0.5 rounded transition group cursor-pointer text-left"
                  title={`${rate.name} - Clic para convertir`}
                >
                  <span className="text-sm">{rate.flag}</span>
                  <div className="flex items-baseline gap-1.5">
                    <span className="font-bold text-stone-200 group-hover:text-amber-300 transition">
                      {rate.code}
                    </span>

                    {/* Price Display */}
                    {rate.type === 'fiat' ? (
                      <span className="text-stone-300 font-mono text-[11px]">
                        RD$ {rate.buyPriceDOP?.toFixed(2)} / {rate.sellPriceDOP?.toFixed(2)}
                      </span>
                    ) : (
                      <span className="text-amber-300 font-mono text-[11px] font-semibold">
                        ${rate.priceUSD.toLocaleString('en-US', { minimumFractionDigits: rate.priceUSD < 10 ? 2 : 0, maximumFractionDigits: 2 })}
                        <span className="text-[10px] text-stone-400 font-normal ml-1">
                          (RD$ {rate.priceDOP.toLocaleString('es-DO')})
                        </span>
                      </span>
                    )}

                    {/* Change Badge */}
                    <span
                      className={`inline-flex items-center text-[10px] font-semibold px-1 rounded ${
                        isPositive 
                          ? 'text-emerald-400 bg-emerald-950/60' 
                          : 'text-red-400 bg-red-950/60'
                      }`}
                    >
                      {isPositive ? (
                        <TrendingUp className="w-2.5 h-2.5 mr-0.5 inline" />
                      ) : (
                        <TrendingDown className="w-2.5 h-2.5 mr-0.5 inline" />
                      )}
                      {isPositive ? '+' : ''}{rate.change24h}%
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Quick Refresh & Converter Launch */}
          <div className="flex items-center gap-2 shrink-0 text-stone-400 text-[11px]">
            <button
              onClick={fetchRates}
              disabled={isRefreshing}
              className="p-1 hover:text-stone-100 hover:bg-stone-800 rounded transition"
              title="Actualizar tasas en vivo"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin text-amber-400' : ''}`} />
            </button>
            <button
              onClick={() => setShowModal(true)}
              className="hidden sm:flex items-center gap-1 font-medium text-amber-400 hover:text-amber-300 transition underline underline-offset-2"
            >
              <span>Convertidor</span>
            </button>
          </div>

        </div>
      </div>

      {/* Interactive Modal: Complete Currency Table & Instant Converter */}
      {showModal && (
        <div 
          className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6"
          onClick={() => setShowModal(false)}
        >
          <div 
            className="relative bg-white dark:bg-stone-900 w-full max-w-3xl rounded-2xl shadow-2xl border border-stone-200 dark:border-stone-800 overflow-hidden my-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="px-6 py-4 bg-stone-100 dark:bg-stone-950 border-b border-stone-200 dark:border-stone-800 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-amber-500/10 text-amber-600 rounded-lg">
                  <DollarSign className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold font-serif text-stone-950 dark:text-stone-100">
                    Tasas de Cambio Oficiales & Criptomonedas
                  </h3>
                  <p className="text-xs text-stone-500 dark:text-stone-400">
                    Valores referenciales del Banco Central de la República Dominicana y mercados globales de Bitcoin y Ethereum.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="p-1.5 rounded-full hover:bg-stone-200 dark:hover:bg-stone-800 text-stone-500 hover:text-stone-900 dark:hover:text-stone-100 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Interactive Currency Converter */}
            <div className="p-6 bg-amber-50/50 dark:bg-amber-950/20 border-b border-amber-200/50 dark:border-amber-900/30">
              <div className="flex items-center gap-2 mb-3">
                <Calculator className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                <h4 className="text-xs font-bold uppercase tracking-wider text-amber-900 dark:text-amber-300">
                  Calculadora / Convertidor Inmediato
                </h4>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
                {/* Input Amount */}
                <div className="sm:col-span-4">
                  <label className="block text-[11px] font-semibold text-stone-600 dark:text-stone-400 mb-1">
                    Cantidad a convertir:
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="any"
                    value={calcAmount}
                    onChange={(e) => setCalcAmount(parseFloat(e.target.value) || 0)}
                    className="w-full px-3 py-2 rounded-lg bg-white dark:bg-stone-800 border border-stone-300 dark:border-stone-700 font-bold text-sm text-stone-900 dark:text-stone-100 focus:outline-hidden focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                {/* Currency Select */}
                <div className="sm:col-span-4">
                  <label className="block text-[11px] font-semibold text-stone-600 dark:text-stone-400 mb-1">
                    Moneda o Cripto:
                  </label>
                  <select
                    value={calcCurrency}
                    onChange={(e) => setCalcCurrency(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-white dark:bg-stone-800 border border-stone-300 dark:border-stone-700 font-bold text-sm text-stone-900 dark:text-stone-100 focus:outline-hidden focus:ring-2 focus:ring-amber-500"
                  >
                    <optgroup label="Monedas Tradicionales">
                      {(ratesData?.fiat || []).map(f => (
                        <option key={f.code} value={f.code}>
                          {f.flag} {f.code} - {f.name}
                        </option>
                      ))}
                    </optgroup>
                    <optgroup label="Criptomonedas Principales">
                      {(ratesData?.crypto || []).map(c => (
                        <option key={c.code} value={c.code}>
                          {c.flag} {c.code} - {c.name}
                        </option>
                      ))}
                    </optgroup>
                  </select>
                </div>

                {/* Converted Result */}
                <div className="sm:col-span-4 bg-white dark:bg-stone-800 p-3 rounded-lg border border-amber-300 dark:border-amber-900/60 shadow-xs">
                  <span className="block text-[10px] font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400">
                    Equivalente en Pesos (DOP):
                  </span>
                  <div className="text-lg font-black text-amber-700 dark:text-amber-400 font-mono truncate">
                    RD$ {convertedToDOP.toLocaleString('es-DO', { maximumFractionDigits: 2 })}
                  </div>
                  {selectedRateItem?.type === 'crypto' && (
                    <span className="block text-[10px] text-stone-500 dark:text-stone-400">
                      ≈ ${convertedToUSD.toLocaleString('en-US', { maximumFractionDigits: 2 })} USD
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Filter Tabs */}
            <div className="px-6 pt-4 pb-2 flex items-center justify-between border-b border-stone-200 dark:border-stone-800">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveTab('all')}
                  className={`px-3 py-1 rounded-full text-xs font-bold transition ${
                    activeTab === 'all'
                      ? 'bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-950'
                      : 'text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800'
                  }`}
                >
                  Todas ({allRates.length})
                </button>
                <button
                  onClick={() => setActiveTab('fiat')}
                  className={`px-3 py-1 rounded-full text-xs font-bold transition ${
                    activeTab === 'fiat'
                      ? 'bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-950'
                      : 'text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800'
                  }`}
                >
                  Monedas Fíat ({ratesData?.fiat.length || 0})
                </button>
                <button
                  onClick={() => setActiveTab('crypto')}
                  className={`px-3 py-1 rounded-full text-xs font-bold transition ${
                    activeTab === 'crypto'
                      ? 'bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-950'
                      : 'text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800'
                  }`}
                >
                  Criptomonedas ({ratesData?.crypto.length || 0})
                </button>
              </div>

              <div className="text-[11px] text-stone-500 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                <span>Actualizado cada 60 segundos</span>
              </div>
            </div>

            {/* Table of Rates */}
            <div className="max-h-80 overflow-y-auto px-6 py-2 divide-y divide-stone-100 dark:divide-stone-800">
              {filteredRates.map((rate) => {
                const isPositive = rate.change24h >= 0;
                return (
                  <div
                    key={rate.code}
                    className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-stone-50/70 dark:hover:bg-stone-800/40 px-2 rounded-lg transition"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{rate.flag}</span>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-stone-900 dark:text-stone-100">
                            {rate.name}
                          </span>
                          <span className="text-xs px-1.5 py-0.5 rounded bg-stone-200 dark:bg-stone-800 text-stone-700 dark:text-stone-300 font-mono font-semibold">
                            {rate.code}
                          </span>
                        </div>
                        <span className="text-[11px] text-stone-500 dark:text-stone-400">
                          {rate.referenceSource}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-5">
                      {rate.type === 'fiat' ? (
                        <div className="text-right">
                          <div className="text-xs font-semibold text-stone-800 dark:text-stone-200 font-mono">
                            Compra: <strong className="text-emerald-700 dark:text-emerald-400">RD$ {rate.buyPriceDOP?.toFixed(2)}</strong>
                            {' '}| Venta: <strong className="text-amber-700 dark:text-amber-400">RD$ {rate.sellPriceDOP?.toFixed(2)}</strong>
                          </div>
                          <span className="text-[10px] text-stone-400 block">
                            Tasa de referencia BCRD
                          </span>
                        </div>
                      ) : (
                        <div className="text-right">
                          <div className="text-xs font-bold text-stone-950 dark:text-stone-50 font-mono">
                            ${rate.priceUSD.toLocaleString('en-US', { minimumFractionDigits: 2 })} USD
                          </div>
                          <span className="text-xs text-amber-600 dark:text-amber-400 font-semibold font-mono block">
                            ≈ RD$ {rate.priceDOP.toLocaleString('es-DO')}
                          </span>
                        </div>
                      )}

                      {/* 24h variation */}
                      <div
                        className={`text-xs font-bold px-2 py-1 rounded flex items-center gap-0.5 shrink-0 ${
                          isPositive 
                            ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400'
                            : 'bg-red-50 dark:bg-red-950/60 text-red-700 dark:text-red-400'
                        }`}
                      >
                        {isPositive ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
                        <span>{isPositive ? '+' : ''}{rate.change24h}%</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-3 bg-stone-50 dark:bg-stone-950 border-t border-stone-200 dark:border-stone-800 flex flex-wrap items-center justify-between text-xs text-stone-500 gap-2">
              <span>
                Datos referenciales con fines informativos.
              </span>
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-1.5 bg-stone-900 hover:bg-stone-800 dark:bg-stone-100 dark:hover:bg-white text-white dark:text-stone-900 font-bold rounded-lg transition"
              >
                Cerrar
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
};
