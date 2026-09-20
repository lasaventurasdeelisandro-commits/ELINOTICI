import React from 'react';
import { NewsArticle } from '../types';
import { ShieldCheck, MessageSquare, Quote } from 'lucide-react';
import { SocialShareBar } from './SocialShareBar';

interface OpinionSectionProps {
  articles: NewsArticle[];
  onSelect: (article: NewsArticle) => void;
}

export const OpinionSection: React.FC<OpinionSectionProps> = ({ articles, onSelect }) => {
  const opinionArticles = articles.filter(a => a.category === 'opinion' || a.isOpinion);

  const columnists = [
    {
      name: 'Dr. Alejandro Valdez Tavárez',
      role: 'Director Editorial • Doctor en Derecho Constitucional',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
      quote: '«La República se construye cada día con instituciones sólidas y una ciudadanía educada para discernir la verdad del ruido partidario.»'
    },
    {
      name: 'Dra. Yocasta Beras de Morales',
      role: 'Analista Económica • Exdirectora de Política Fiscal',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
      quote: '«El reto macroeconómico dominicano no es solo crecer al 5%, sino asegurar que ese crecimiento irrigue a las provincias más necesitadas.»'
    },
    {
      name: 'Lic. Franklin Domínguez Cedeño',
      role: 'Sociólogo y Ensayista • Catedrático UASD',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
      quote: '«Nuestra identidad caribeña es un tejido de resiliencia cultural que debe dialogar con las vanguardias tecnológicas sin perder el arraigo.»'
    }
  ];

  return (
    <section className="bg-stone-100 dark:bg-stone-900/70 border border-stone-200 dark:border-stone-800 rounded-2xl p-6 sm:p-8 space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-200 dark:border-stone-800 pb-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400">
            Tribuna & Pensamiento Libre
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold font-serif text-stone-900 dark:text-stone-100">
            Sección de Opinión y Análisis Editorial
          </h2>
        </div>
        <span className="text-xs text-stone-500 italic font-reading">
          «Las ideas son el faro que alumbra las decisiones de una nación libre»
        </span>
      </div>

      {/* Featured Columnists */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {columnists.map((col, idx) => (
          <div 
            key={idx}
            className="p-5 bg-white dark:bg-stone-900 rounded-xl border border-stone-200 dark:border-stone-800/80 shadow-xs flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-3 mb-3">
                <img
                  src={col.avatar}
                  alt={col.name}
                  className="w-12 h-12 rounded-full object-cover border border-stone-200 dark:border-stone-700 shadow-xs"
                />
                <div>
                  <h4 className="text-sm font-bold font-serif text-stone-900 dark:text-stone-100">
                    {col.name}
                  </h4>
                  <span className="text-[11px] text-stone-500 dark:text-stone-400 block leading-tight">
                    {col.role}
                  </span>
                </div>
              </div>
              <p className="text-xs text-stone-600 dark:text-stone-300 italic font-reading leading-relaxed">
                {col.quote}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Opinion Articles */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
        {opinionArticles.map((art) => (
          <div
            key={art.id}
            onClick={() => onSelect(art)}
            className="p-5 bg-white dark:bg-stone-900 rounded-xl border border-stone-200 dark:border-stone-800 hover:border-amber-500/50 shadow-xs hover:shadow transition cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between text-xs text-amber-700 dark:text-amber-400 font-bold uppercase mb-1.5">
                <span>{art.subcategory || 'Columna de Fondo'}</span>
                <span className="flex items-center gap-1 text-[11px] text-emerald-700 dark:text-emerald-400">
                  <ShieldCheck className="w-3 h-3" />
                  Verificado
                </span>
              </div>

              <h3 className="text-lg font-bold font-serif text-stone-900 dark:text-stone-100 leading-snug hover:text-amber-700 transition mb-2">
                {art.title}
              </h3>

              <p className="text-xs text-stone-600 dark:text-stone-300 font-reading line-clamp-3 leading-relaxed mb-3">
                {art.excerpt}
              </p>
            </div>

            <div className="pt-3 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between text-xs text-stone-500">
              <span className="font-bold text-stone-700 dark:text-stone-300">{art.author}</span>
              <SocialShareBar article={art} variant="compact" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
