import React, { useState } from 'react';
import { NewsArticle } from '../types';
import { Trophy, ShieldCheck, Flame, Calendar, Globe, Award } from 'lucide-react';
import { SocialShareBar } from './SocialShareBar';

interface SportsSectionProps {
  articles: NewsArticle[];
  onSelect: (article: NewsArticle) => void;
}

export const SportsSection: React.FC<SportsSectionProps> = ({ articles, onSelect }) => {
  const [scope, setScope] = useState<'all' | 'dominican' | 'global'>('all');
  const [activeTable, setActiveTable] = useState<'lidom' | 'champions'>('lidom');

  const sportsArticles = articles.filter(a => {
    if (a.category !== 'deportes') return false;
    if (scope === 'dominican') return a.isDominican;
    if (scope === 'global') return !a.isDominican;
    return true;
  });

  // LIDOM Standing Table (Dominican Winter League)
  const lidomStandings = [
    { team: 'Tigres del Licey', city: 'Santo Domingo', w: 32, l: 18, pct: '.640', gb: '-' },
    { team: 'Águilas Cibaeñas', city: 'Santiago', w: 30, l: 20, pct: '.600', gb: '2.0' },
    { team: 'Leones del Escogido', city: 'Santo Domingo', w: 27, l: 23, pct: '.540', gb: '5.0' },
    { team: 'Estrellas Orientales', city: 'San Pedro', w: 25, l: 25, pct: '.500', gb: '7.0' },
    { team: 'Gigantes del Cibao', city: 'San Francisco', w: 20, l: 30, pct: '.400', gb: '12.0' },
    { team: 'Toros del Este', city: 'La Romana', w: 16, l: 34, pct: '.320', gb: '16.0' },
  ];

  // UEFA Champions League / Global Soccer Standings
  const championsStandings = [
    { team: 'Real Madrid', country: 'España', pts: 18, pj: 6, diff: '+12' },
    { team: 'Manchester City', country: 'Inglaterra', pts: 16, pj: 6, diff: '+11' },
    { team: 'Bayern Múnich', country: 'Alemania', pts: 15, pj: 6, diff: '+9' },
    { team: 'Liverpool FC', country: 'Inglaterra', pts: 15, pj: 6, diff: '+8' },
    { team: 'FC Barcelona', country: 'España', pts: 13, pj: 6, diff: '+6' },
    { team: 'Paris Saint-Germain', country: 'Francia', pts: 12, pj: 6, diff: '+4' },
  ];

  return (
    <section className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b-2 border-stone-900 dark:border-stone-100 pb-3">
        <div className="flex items-center gap-3">
          <span className="text-3xl">⚾⚽</span>
          <div>
            <h2 className="text-2xl sm:text-3xl font-black font-serif text-stone-950 dark:text-stone-50">
              DEPORTES NACIONALES E INTERNACIONALES
            </h2>
            <p className="text-xs text-stone-500">
              Pelota invernal dominicana (LIDOM), estrellas en MLB, UEFA Champions League, fútbol mundial y NBA.
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
            Todos los Deportes
          </button>
          <button
            onClick={() => setScope('dominican')}
            className={`px-3 py-1.5 rounded-md transition flex items-center gap-1 ${
              scope === 'dominican'
                ? 'bg-amber-600 text-white shadow-sm'
                : 'text-stone-600 dark:text-stone-400 hover:text-stone-900'
            }`}
          >
            <span>🇩🇴</span> Quisqueya & LIDOM
          </button>
          <button
            onClick={() => setScope('global')}
            className={`px-3 py-1.5 rounded-md transition flex items-center gap-1 ${
              scope === 'global'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-stone-600 dark:text-stone-400 hover:text-stone-900'
            }`}
          >
            <span>🌎</span> Mundial & Champions
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Sports News */}
        <div className="lg:col-span-8 space-y-4">
          {sportsArticles.length === 0 ? (
            <div className="p-12 text-center bg-white dark:bg-stone-900 rounded-xl border border-stone-200 dark:border-stone-800">
              <Trophy className="w-8 h-8 text-stone-400 mx-auto mb-2" />
              <p className="text-sm font-bold text-stone-600 dark:text-stone-300">
                No hay noticias deportivas en este filtro actualmente.
              </p>
            </div>
          ) : (
            sportsArticles.map((art) => (
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
                      {art.isDominican ? '🇩🇴 Pelota RD' : '🌎 Deporte Mundial'}
                    </span>
                    <span className="text-stone-600 dark:text-stone-400">
                      {art.subcategory || (art.isDominican ? 'Béisbol Dominicano' : 'Fútbol Internacional')}
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

        {/* Right Column: Standings (LIDOM + Champions League Tabs) */}
        <div className="lg:col-span-4 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl p-5 shadow-xs flex flex-col justify-between">
          <div>
            {/* Table Switcher */}
            <div className="flex items-center justify-between mb-4 border-b border-stone-200 dark:border-stone-800 pb-2.5">
              <div className="flex items-center gap-1 bg-stone-100 dark:bg-stone-800 p-1 rounded-lg text-xs font-bold">
                <button
                  onClick={() => setActiveTable('lidom')}
                  className={`px-2.5 py-1 rounded transition ${
                    activeTable === 'lidom'
                      ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 shadow-xs'
                      : 'text-stone-500 hover:text-stone-900'
                  }`}
                >
                  🇩🇴 LIDOM
                </button>
                <button
                  onClick={() => setActiveTable('champions')}
                  className={`px-2.5 py-1 rounded transition ${
                    activeTable === 'champions'
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'text-stone-500 hover:text-stone-900'
                  }`}
                >
                  ⚽ Champions
                </button>
              </div>

              <span className="text-[10px] text-emerald-700 dark:text-emerald-400 font-bold uppercase flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                En vivo
              </span>
            </div>

            {activeTable === 'lidom' ? (
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead>
                    <tr className="border-b border-stone-200 dark:border-stone-700 text-stone-500 text-[10px] uppercase font-bold">
                      <th className="py-2">Equipo</th>
                      <th className="py-2 text-center">G</th>
                      <th className="py-2 text-center">P</th>
                      <th className="py-2 text-center">PCT</th>
                      <th className="py-2 text-right">DIF</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100 dark:divide-stone-800 font-medium">
                    {lidomStandings.map((team, idx) => (
                      <tr key={idx} className="hover:bg-stone-50 dark:hover:bg-stone-800/50 transition">
                        <td className="py-2.5 font-bold text-stone-900 dark:text-stone-100 flex items-center gap-1.5">
                          <span className="text-xs text-stone-400 font-mono w-4">{idx + 1}.</span>
                          <span>{team.team}</span>
                        </td>
                        <td className="py-2.5 text-center text-stone-700 dark:text-stone-300 font-mono">{team.w}</td>
                        <td className="py-2.5 text-center text-stone-700 dark:text-stone-300 font-mono">{team.l}</td>
                        <td className="py-2.5 text-center text-stone-700 dark:text-stone-300 font-mono">{team.pct}</td>
                        <td className="py-2.5 text-right font-bold text-amber-700 dark:text-amber-400 font-mono">{team.gb}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead>
                    <tr className="border-b border-stone-200 dark:border-stone-700 text-stone-500 text-[10px] uppercase font-bold">
                      <th className="py-2">Club</th>
                      <th className="py-2 text-center">PJ</th>
                      <th className="py-2 text-center">DIF</th>
                      <th className="py-2 text-right">PTS</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100 dark:divide-stone-800 font-medium">
                    {championsStandings.map((team, idx) => (
                      <tr key={idx} className="hover:bg-stone-50 dark:hover:bg-stone-800/50 transition">
                        <td className="py-2.5 font-bold text-stone-900 dark:text-stone-100 flex items-center gap-1.5">
                          <span className="text-xs text-stone-400 font-mono w-4">{idx + 1}.</span>
                          <div>
                            <div>{team.team}</div>
                            <div className="text-[10px] text-stone-400 font-normal">{team.country}</div>
                          </div>
                        </td>
                        <td className="py-2.5 text-center text-stone-700 dark:text-stone-300 font-mono">{team.pj}</td>
                        <td className="py-2.5 text-center text-stone-700 dark:text-stone-300 font-mono">{team.diff}</td>
                        <td className="py-2.5 text-right font-bold text-blue-700 dark:text-blue-400 font-mono">{team.pts}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          <div className="mt-4 p-3 bg-amber-500/10 dark:bg-amber-500/5 rounded-lg border border-amber-500/20 text-xs text-stone-700 dark:text-stone-300">
            {activeTable === 'lidom' ? (
              <>
                <span className="font-bold text-amber-800 dark:text-amber-300 block mb-1">
                  Próximo Duelo Clásico Dominicano:
                </span>
                <p className="flex items-center justify-between text-stone-900 dark:text-stone-100 font-semibold">
                  <span>Tigres del Licey vs. Águilas Cibaeñas</span>
                  <span className="text-amber-700 dark:text-amber-400 font-mono">7:30 PM</span>
                </p>
                <span className="text-[11px] text-stone-500 block mt-0.5">
                  Estadio Quisqueya Juan Marichal • Transmisión HD
                </span>
              </>
            ) : (
              <>
                <span className="font-bold text-blue-800 dark:text-blue-300 block mb-1">
                  Próximo Choque de Cuartos de Champions:
                </span>
                <p className="flex items-center justify-between text-stone-900 dark:text-stone-100 font-semibold">
                  <span>Real Madrid vs. Manchester City</span>
                  <span className="text-blue-700 dark:text-blue-400 font-mono">3:00 PM</span>
                </p>
                <span className="text-[11px] text-stone-500 block mt-0.5">
                  Santiago Bernabéu, Madrid • Transmisión Global
                </span>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
