import React, { useState } from 'react';
import { NewsArticle } from '../types';
import { Cpu, ShieldCheck, Sparkles, Globe, Terminal, Layers, Radio } from 'lucide-react';
import { SocialShareBar } from './SocialShareBar';

interface TechSectionProps {
  articles: NewsArticle[];
  onSelect: (article: NewsArticle) => void;
}

export const TechSection: React.FC<TechSectionProps> = ({ articles, onSelect }) => {
  const [scope, setScope] = useState<'all' | 'dominican' | 'global'>('all');
  const [radarTab, setRadarTab] = useState<'ai' | 'rd'>('ai');

  const techArticles = articles.filter(a => {
    if (a.category !== 'tecnologia') return false;
    if (scope === 'dominican') return a.isDominican;
    if (scope === 'global') return !a.isDominican;
    return true;
  });

  const aiTrends = [
    { title: 'Modelos de Razonamiento IA', desc: 'Sistemas con inferencia paso a paso y verificación formal matemática.', badge: 'Vanguardia' },
    { title: 'Litografía de 2nm GAAFET', desc: 'Chips de silicio con 50,000M de transistores optimizados para servidores cloud.', badge: 'Hardware' },
    { title: 'Ciberseguridad Cuántica', desc: 'Cifrado post-cuántico adoptado por bancos y agencias de telecomunicaciones.', badge: 'Seguridad' },
    { title: 'Robótica Humanoide con Visión IA', desc: 'Autómatas para logística de almacenes y ensamblaje de precisión.', badge: 'Robótica' },
  ];

  const rdInnovations = [
    { title: 'Agenda Digital 2030 RD', desc: 'Burocracia Cero y digitalización de más de 300 trámites ciudadanos en línea.', badge: 'Gobierno Tech' },
    { title: 'Hub Tecnológico del Caribe', desc: 'Incentivos fiscales para instalación de centros de datos y desarrollo de software.', badge: 'Inversión' },
    { title: 'IA en Red Hospitalaria Pública', desc: 'Diagnóstico radiológico automatizado en hospitales de Santo Domingo y el Cibao.', badge: 'Salud Digital' },
    { title: 'Fintech & Pagos QR Interoperables', desc: 'Expansión de billeteras móviles y transferencias instantáneas bancarias.', badge: 'Fintech' },
  ];

  return (
    <section className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b-2 border-stone-900 dark:border-stone-100 pb-3">
        <div className="flex items-center gap-3">
          <span className="text-3xl">🤖💻</span>
          <div>
            <h2 className="text-2xl sm:text-3xl font-black font-serif text-stone-950 dark:text-stone-50">
              TECNOLOGÍA, INNOVACIÓN & SILICON VALLEY
            </h2>
            <p className="text-xs text-stone-500">
              Inteligencia artificial, semiconductores, telecomunicaciones en RD y avances de la industria global.
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
            Toda la Tecnología
          </button>
          <button
            onClick={() => setScope('dominican')}
            className={`px-3 py-1.5 rounded-md transition flex items-center gap-1 ${
              scope === 'dominican'
                ? 'bg-amber-600 text-white shadow-sm'
                : 'text-stone-600 dark:text-stone-400 hover:text-stone-900'
            }`}
          >
            <span>🇩🇴</span> Innovación RD
          </button>
          <button
            onClick={() => setScope('global')}
            className={`px-3 py-1.5 rounded-md transition flex items-center gap-1 ${
              scope === 'global'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-stone-600 dark:text-stone-400 hover:text-stone-900'
            }`}
          >
            <span>🌎</span> Mundial & IA
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Tech News */}
        <div className="lg:col-span-8 space-y-4">
          {techArticles.length === 0 ? (
            <div className="p-12 text-center bg-white dark:bg-stone-900 rounded-xl border border-stone-200 dark:border-stone-800">
              <Cpu className="w-8 h-8 text-stone-400 mx-auto mb-2" />
              <p className="text-sm font-bold text-stone-600 dark:text-stone-300">
                No hay noticias tecnológicas en este filtro actualmente.
              </p>
            </div>
          ) : (
            techArticles.map((art) => (
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
                      {art.isDominican ? '🇩🇴 Tech Quisqueya' : '🌎 Tecnología Mundial'}
                    </span>
                    <span className="text-stone-600 dark:text-stone-400">
                      {art.subcategory || (art.isDominican ? 'Innovación Local' : 'Inteligencia Artificial')}
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

        {/* Right Column: Radar Tech & Innovation */}
        <div className="lg:col-span-4 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4 border-b border-stone-200 dark:border-stone-800 pb-2.5">
              <div className="flex items-center gap-1 bg-stone-100 dark:bg-stone-800 p-1 rounded-lg text-xs font-bold">
                <button
                  onClick={() => setRadarTab('ai')}
                  className={`px-2.5 py-1 rounded transition ${
                    radarTab === 'ai'
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'text-stone-500 hover:text-stone-900'
                  }`}
                >
                  ⚡ Radar IA Mundial
                </button>
                <button
                  onClick={() => setRadarTab('rd')}
                  className={`px-2.5 py-1 rounded transition ${
                    radarTab === 'rd'
                      ? 'bg-amber-600 text-white shadow-xs'
                      : 'text-stone-500 hover:text-stone-900'
                  }`}
                >
                  🇩🇴 Ecosistema RD
                </button>
              </div>

              <span className="text-[10px] text-emerald-700 dark:text-emerald-400 font-bold uppercase flex items-center gap-1">
                <Radio className="w-3 h-3 text-emerald-500 animate-pulse" />
                Radar
              </span>
            </div>

            <div className="space-y-3">
              {(radarTab === 'ai' ? aiTrends : rdInnovations).map((item, idx) => (
                <div
                  key={idx}
                  className="p-3 bg-stone-50 dark:bg-stone-800/60 rounded-lg border border-stone-100 dark:border-stone-800 space-y-1"
                >
                  <div className="flex items-center justify-between gap-2">
                    <h5 className="text-xs font-bold text-stone-900 dark:text-stone-100">
                      {item.title}
                    </h5>
                    <span className="text-[9px] font-black uppercase px-1.5 py-0.5 rounded bg-amber-500/15 text-amber-800 dark:text-amber-300">
                      {item.badge}
                    </span>
                  </div>
                  <p className="text-[11px] text-stone-600 dark:text-stone-400 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-5 p-3 bg-stone-900 text-stone-100 dark:bg-stone-800 rounded-lg text-xs">
            <div className="flex items-center gap-1.5 text-amber-400 font-bold mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Centro de Ciberseguridad & IA</span>
            </div>
            <p className="text-[11px] text-stone-300 dark:text-stone-400 leading-relaxed">
              Monitoreo permanente de estándares de seguridad, patentes de semiconductores e infraestructura digital caribeña.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
