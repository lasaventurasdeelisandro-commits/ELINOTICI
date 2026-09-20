import React, { useState } from 'react';

interface BrandLogoProps {
  variant?: 'masthead' | 'navbar' | 'compact' | 'footer' | 'iconOnly';
  className?: string;
  showSlogan?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  variant = 'masthead',
  className = '',
  showSlogan = true,
}) => {
  const [imgError, setImgError] = useState(false);

  // Icon only (e.g. mobile drawer or small badges)
  if (variant === 'iconOnly') {
    return (
      <div className={`inline-flex items-center justify-center select-none ${className}`}>
        {!imgError ? (
          <img
            src="/elinoticia-emblem-transparent.png"
            alt="ELINOTICIA"
            className="w-10 h-10 object-contain drop-shadow-sm"
            referrerPolicy="no-referrer"
            onError={() => setImgError(true)}
          />
        ) : (
          <img
            src="/favicon.svg"
            alt="ELINOTICIA"
            className="w-10 h-10 object-contain"
            referrerPolicy="no-referrer"
          />
        )}
      </div>
    );
  }

  // Navbar / Compact variant (Horizontal Layout in Top Header)
  if (variant === 'navbar' || variant === 'compact') {
    return (
      <div className={`inline-flex items-center gap-3 select-none ${className}`}>
        {/* Emblem from the exact logo */}
        <div className="relative h-10 sm:h-11 shrink-0 flex items-center">
          <img
            src="/elinoticia-emblem-transparent.png"
            alt="ELINOTICIA Emblema"
            className="h-full w-auto max-w-[58px] object-contain drop-shadow-sm filter dark:drop-shadow-[0_2px_8px_rgba(56,189,248,0.3)]"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Wordmark exact style */}
        <div className="flex flex-col text-left leading-none justify-center">
          <div className="flex items-baseline tracking-tight font-black text-2xl sm:text-[26px] italic font-sans">
            <span className="text-slate-900 dark:text-white drop-shadow-sm">ELI</span>
            <span className="text-blue-600 dark:text-sky-400 drop-shadow-[0_1px_4px_rgba(2,132,199,0.3)]">NOTICIA</span>
          </div>
          {showSlogan && (
            <span className="text-[8px] sm:text-[9px] tracking-wider uppercase font-semibold text-stone-500 dark:text-stone-400 mt-0.5">
              La Noticia, Dondequiera que Estés
            </span>
          )}
        </div>
      </div>
    );
  }

  // Footer variant
  if (variant === 'footer') {
    return (
      <div className={`space-y-4 select-none ${className}`}>
        <div className="flex items-center gap-3.5">
          <div className="h-14 sm:h-16 shrink-0 bg-white/5 rounded-xl p-1 border border-white/10 flex items-center justify-center">
            <img
              src="/elinoticia-emblem-transparent.png"
              alt="ELINOTICIA"
              className="h-full w-auto object-contain drop-shadow-md"
              referrerPolicy="no-referrer"
            />
          </div>

          <div className="flex flex-col">
            <div className="flex items-baseline tracking-tight font-black text-3xl sm:text-4xl italic font-sans leading-none">
              <span className="text-white">ELI</span>
              <span className="text-sky-400 drop-shadow-[0_2px_8px_rgba(56,189,248,0.5)]">NOTICIA</span>
            </div>
            <span className="text-[10px] text-stone-400 font-bold tracking-widest uppercase mt-1">
              Redacción Central Santo Domingo
            </span>
          </div>
        </div>

        {/* Slogan Banner with Accent Blue Line */}
        <div className="flex items-center gap-2.5 text-stone-300 text-[10.5px] tracking-widest uppercase font-semibold">
          <span className="w-8 h-0.5 bg-blue-500"></span>
          <span>LA NOTICIA, DONDEQUIERA QUE ESTÉS</span>
          <span className="w-8 h-0.5 bg-blue-500"></span>
        </div>
      </div>
    );
  }

  // Default: Masthead Centerpiece (Top of digital newspaper)
  return (
    <div className={`flex flex-col items-center justify-center select-none py-2 ${className}`}>
      {/* High-Resolution Exact Graphic Logo */}
      <div className="relative group max-w-[340px] sm:max-w-[420px] md:max-w-[480px] w-full flex flex-col items-center">
        {/* Crisp Image of the Official Logo with subtle transparent integration */}
        <div className="relative w-full flex items-center justify-center">
          <img
            src="/elinoticia-logo-transparent.png"
            alt="ELINOTICIA - La Noticia, Dondequiera que Estés"
            className="w-full h-auto max-h-[170px] sm:max-h-[220px] object-contain drop-shadow-[0_8px_24px_rgba(15,23,42,0.18)] dark:drop-shadow-[0_10px_30px_rgba(56,189,248,0.25)] transition-transform duration-300 hover:scale-[1.01]"
            referrerPolicy="no-referrer"
            onError={() => setImgError(true)}
          />
        </div>

        {/* Fallback Vector Rendering in case image loading fails */}
        {imgError && (
          <div className="flex flex-col items-center justify-center text-center">
            <div className="flex items-baseline tracking-tight font-black text-5xl sm:text-6xl md:text-7xl font-sans italic uppercase">
              <span className="text-slate-900 dark:text-white">ELI</span>
              <span className="text-blue-600 dark:text-sky-400">NOTICIA</span>
            </div>
            <div className="mt-2 text-xs sm:text-sm font-bold tracking-[0.2em] uppercase text-stone-700 dark:text-stone-300">
              LA NOTICIA, DONDEQUIERA QUE ESTÉS
            </div>
            <div className="w-28 h-1 bg-gradient-to-r from-blue-600 to-sky-400 rounded-full mt-2"></div>
          </div>
        )}
      </div>
    </div>
  );
};
