import React, { useState } from 'react';
import { 
  Search, Moon, Sun, Bell, Sliders, Rss, 
  Globe, Sparkles, Check, ChevronDown, Award, Volume2
} from 'lucide-react';
import { NewsCategory, SupportedLanguage, UserPreferences } from '../types';
import { SUPPORTED_LANGUAGES, t } from '../utils/translations';
import { BrandLogo } from './BrandLogo';

interface HeaderProps {
  currentCategory: NewsCategory | 'portada';
  onSelectCategory: (cat: NewsCategory | 'portada') => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  preferences: UserPreferences;
  onUpdatePreferences: (prefs: Partial<UserPreferences>) => void;
  onOpenPreferences: () => void;
  onOpenSubscription: () => void;
  onOpenRssManager: () => void;
  onOpenPodcastPlayer?: () => void;
  isSyncing: boolean;
  onTriggerRefresh: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  preferences,
  onUpdatePreferences,
  onOpenPreferences,
  onOpenSubscription,
  onOpenRssManager,
  isSyncing,
  onTriggerRefresh,
}) => {
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const lang = preferences.language;

  // Format date in Spanish or current language
  const todayFormatted = new Intl.DateTimeFormat(lang === 'es' ? 'es-DO' : lang, {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date());

  const categories: { id: NewsCategory | 'portada'; label: string; icon?: string }[] = [
    { id: 'portada', label: t('all', lang) },
    { id: 'rd', label: t('dominicanRepublic', lang), icon: '🇩🇴' },
    { id: 'mundo', label: t('world', lang), icon: '🌎' },
    { id: 'deportes', label: t('sports', lang), icon: '⚾' },
    { id: 'economia', label: t('economy', lang), icon: '💼' },
    { id: 'opinion', label: t('opinion', lang), icon: '✍️' },
    { id: 'tecnologia', label: t('technology', lang), icon: '🤖' },
  ];

  return (
    <header className="w-full bg-stone-50 dark:bg-stone-900 border-b border-stone-200 dark:border-stone-800 transition-colors">
      {/* Top Utility Bar */}
      <div className="border-b border-stone-200/70 dark:border-stone-800/80 text-xs text-stone-600 dark:text-stone-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-1.5 flex flex-wrap items-center justify-between gap-3">
          {/* Left: Date & Weather / Market */}
          <div className="flex items-center gap-4 flex-wrap">
            <span className="capitalize font-medium text-stone-800 dark:text-stone-200">
              {todayFormatted}
            </span>
            <span className="hidden sm:inline-block text-stone-300 dark:text-stone-700">•</span>
            <div className="hidden sm:flex items-center gap-2">
              <span>Santo Domingo: <strong>29°C</strong> ☀️</span>
              <span className="text-stone-300 dark:text-stone-700">|</span>
              <span title="Dólar Oficial Banco Central RD">USD: <strong className="text-emerald-700 dark:text-emerald-400 font-mono">RD$ 60.15</strong></span>
              <span className="text-stone-300 dark:text-stone-700">|</span>
              <span title="Bitcoin en tiempo real">BTC: <strong className="text-amber-600 dark:text-amber-400 font-mono">$81.1K</strong></span>
              <span className="hidden lg:inline text-stone-300 dark:text-stone-700">|</span>
              <span className="hidden lg:inline" title="Ethereum en tiempo real">ETH: <strong className="text-blue-600 dark:text-sky-400 font-mono">$2,640</strong></span>
            </div>
            <span className="hidden md:inline-block text-stone-300 dark:text-stone-700">•</span>
            <div className="flex items-center gap-1.5 text-emerald-700 dark:text-emerald-400 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>Redacción en Directo</span>
            </div>
          </div>

          {/* Right: Language, Dark Mode, Push, RSS & Subscription */}
          <div className="flex items-center gap-2 sm:gap-3 ml-auto">
            {/* Language Dropdown */}
            <div className="relative">
              <button
                id="header-language-btn"
                onClick={() => setShowLangMenu(!showLangMenu)}
                className="flex items-center gap-1 px-2 py-1 rounded bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 transition"
                title={t('language', lang)}
              >
                <Globe className="w-3.5 h-3.5 text-stone-600 dark:text-stone-300" />
                <span className="font-semibold uppercase text-[11px]">{lang}</span>
                <ChevronDown className="w-3 h-3 text-stone-400" />
              </button>

              {showLangMenu && (
                <div 
                  className="absolute right-0 mt-1 w-44 bg-white dark:bg-stone-800 rounded-lg shadow-xl border border-stone-200 dark:border-stone-700 py-1.5 z-50"
                  onMouseLeave={() => setShowLangMenu(false)}
                >
                  <div className="px-3 py-1 text-[10px] uppercase font-bold text-stone-400 dark:text-stone-500 border-b border-stone-100 dark:border-stone-700/60 mb-1">
                    {t('language', lang)}
                  </div>
                  {SUPPORTED_LANGUAGES.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => {
                        onUpdatePreferences({ language: l.code });
                        setShowLangMenu(false);
                      }}
                      className="w-full text-left px-3 py-1.5 text-xs flex items-center justify-between hover:bg-amber-50 dark:hover:bg-stone-700 transition"
                    >
                      <span className="flex items-center gap-2">
                        <span>{l.flag}</span>
                        <span className={preferences.language === l.code ? 'font-bold text-amber-700 dark:text-amber-400' : ''}>
                          {l.nativeName}
                        </span>
                      </span>
                      {preferences.language === l.code && <Check className="w-3.5 h-3.5 text-amber-600" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Dark Mode Toggle */}
            <button
              id="header-dark-mode-toggle"
              onClick={() => onUpdatePreferences({ darkMode: !preferences.darkMode })}
              className="p-1.5 rounded text-stone-600 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-800 transition"
              title={preferences.darkMode ? t('lightMode', lang) : t('darkMode', lang)}
            >
              {preferences.darkMode ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5" />}
            </button>

            {/* Preferences Button */}
            <button
              id="header-preferences-btn"
              onClick={onOpenPreferences}
              className="p-1.5 rounded text-stone-600 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-800 transition flex items-center gap-1"
              title={t('preferences', lang)}
            >
              <Sliders className="w-3.5 h-3.5" />
              <span className="hidden md:inline">{t('preferences', lang)}</span>
            </button>

            {/* RSS & AI Engine Manager */}
            <button
              id="header-rss-manager-btn"
              onClick={onOpenRssManager}
              className="p-1.5 px-2 rounded text-amber-800 dark:text-amber-300 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-400/30 transition flex items-center gap-1.5 font-medium"
              title="Motor RSS & Auto-subida cada 3 horas"
            >
              <Rss className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
              <span className="hidden sm:inline">{t('rssEngine', lang)}</span>
              <span className="text-[10px] font-bold px-1 py-0.5 rounded bg-amber-600 text-white dark:bg-amber-500 dark:text-stone-950 leading-none">
                3h
              </span>
            </button>

            {/* Subscription Button */}
            <button
              id="header-subscribe-btn"
              onClick={onOpenSubscription}
              className={`px-2.5 py-1 rounded font-bold text-xs flex items-center gap-1 shadow-sm transition ${
                preferences.subscriptionTier !== 'free'
                  ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                  : 'bg-stone-900 hover:bg-stone-800 text-white dark:bg-amber-500 dark:hover:bg-amber-600 dark:text-stone-950'
              }`}
            >
              {preferences.subscriptionTier !== 'free' ? (
                <>
                  <Award className="w-3.5 h-3.5 text-amber-300" />
                  <span>{t('subscribed', lang)}</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{t('subscribe', lang)}</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Primary Category Nav + Search Bar (Clean single line with Brand Logo) */}
      <div className="sticky top-0 z-30 bg-stone-50/95 dark:bg-stone-900/95 backdrop-blur border-b border-stone-200 dark:border-stone-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between gap-3">
          {/* Brand Logo - Single Clean Line */}
          <button
            onClick={() => onSelectCategory('portada')}
            className="flex items-center hover:opacity-90 transition shrink-0 py-1.5"
            title="Ir a Portada ELINOTICIA"
          >
            <BrandLogo variant="compact" showSlogan={false} />
          </button>

          {/* Categories Nav (Desktop) */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-1.5 py-2 overflow-x-auto no-scrollbar">
            {categories.map((cat) => {
              const active = currentCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  id={`nav-category-${cat.id}`}
                  onClick={() => onSelectCategory(cat.id)}
                  className={`px-3 py-1.5 rounded text-sm font-semibold whitespace-nowrap transition flex items-center gap-1.5 ${
                    active
                      ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 shadow-sm'
                      : 'text-stone-700 dark:text-stone-300 hover:bg-stone-200/70 dark:hover:bg-stone-800'
                  }`}
                >
                  {cat.icon && <span className="text-xs">{cat.icon}</span>}
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Mobile Category Select */}
          <div className="md:hidden py-2 flex items-center gap-2 flex-1">
            <select
              value={currentCategory}
              onChange={(e) => onSelectCategory(e.target.value as any)}
              className="bg-white dark:bg-stone-800 border border-stone-300 dark:border-stone-700 text-stone-900 dark:text-stone-100 rounded px-2.5 py-1.5 text-xs font-semibold w-full"
            >
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.icon ? `${c.icon} ` : ''}{c.label}
                </option>
              ))}
            </select>
          </div>

          {/* Search Input */}
          <div className="relative w-48 sm:w-64 lg:w-72 py-2">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              type="text"
              id="header-search-input"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder={t('searchPlaceholder', lang)}
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-stone-100 dark:bg-stone-800/90 border border-stone-200 dark:border-stone-700 rounded-full focus:outline-none focus:ring-2 focus:ring-amber-500/50 text-stone-800 dark:text-stone-100 placeholder-stone-400 transition"
            />
            {searchQuery && (
              <button 
                onClick={() => onSearchChange('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-stone-400 hover:text-stone-600"
              >
                ✕
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
