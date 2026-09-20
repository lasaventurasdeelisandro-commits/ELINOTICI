import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { 
  NewsArticle, RssFeedSource, PodcastEpisode, UserPreferences, 
  NewsCategory, SupportedLanguage 
} from './types';
import { Header } from './components/Header';
import { CurrencyExchangeBar } from './components/CurrencyExchangeBar';
import { BreakingNewsTicker } from './components/BreakingNewsTicker';
import { ArticleCard } from './components/ArticleCard';
import { ArticleModal } from './components/ArticleModal';
import { PodcastsSection } from './components/PodcastsSection';
import { OpinionSection } from './components/OpinionSection';
import { SportsSection } from './components/SportsSection';
import { EconomySection } from './components/EconomySection';
import { TechSection } from './components/TechSection';
import { RssConfigModal } from './components/RssConfigModal';
import { PreferencesModal } from './components/PreferencesModal';
import { SubscriptionModal } from './components/SubscriptionModal';
import { NotificationToast } from './components/NotificationToast';
import { Footer } from './components/Footer';
import { 
  Flame, Sparkles, Filter, RefreshCw, AlertCircle, 
  Award, Bell, CheckCircle2, ChevronRight 
} from 'lucide-react';
import { t } from './utils/translations';

const DEFAULT_PREFERENCES: UserPreferences = {
  topics: ['rd', 'mundo', 'deportes', 'economia', 'opinion', 'tecnologia'],
  notificationsEnabled: true,
  urgentAlertsOnly: true,
  alertCategories: ['rd', 'deportes', 'economia'],
  darkMode: false,
  language: 'es',
  subscriptionTier: 'free',
  email: null,
  savedArticleIds: [],
};

export default function App() {
  // State
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [feeds, setFeeds] = useState<RssFeedSource[]>([]);
  const [podcasts, setPodcasts] = useState<PodcastEpisode[]>([]);
  const [stats, setStats] = useState({
    totalProcessed: 28,
    verifiedPublished: 16,
    spamFiltered: 8,
    duplicatesMerged: 4,
  });
  const [lastSyncTime, setLastSyncTime] = useState<string>(new Date().toISOString());
  const [nextScheduledSync, setNextScheduledSync] = useState<string>(
    new Date(Date.now() + 3 * 60 * 60 * 1000).toISOString()
  );
  const [syncIntervalHours, setSyncIntervalHours] = useState<number>(3);
  const [lastSyncNewArticlesCount, setLastSyncNewArticlesCount] = useState<number>(0);
  const [syncHistory, setSyncHistory] = useState<any[]>([]);
  const [isSyncing, setIsSyncing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // User Navigation & Filters
  const [currentCategory, setCurrentCategory] = useState<NewsCategory | 'portada'>('portada');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // Modals & Active Selections
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);
  const [isPreferencesOpen, setIsPreferencesOpen] = useState(false);
  const [isSubscriptionOpen, setIsSubscriptionOpen] = useState(false);
  const [isRssManagerOpen, setIsRssManagerOpen] = useState(false);

  // Push Notifications
  const [activePushToast, setActivePushToast] = useState<NewsArticle | null>(null);
  const [seenArticleIds, setSeenArticleIds] = useState<Set<string>>(new Set());
  const [pushPermissionState, setPushPermissionState] = useState<NotificationPermission | 'unsupported'>('default');

  // Preferences from localStorage
  const [preferences, setPreferences] = useState<UserPreferences>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('el_faro_preferences');
        if (saved) return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return DEFAULT_PREFERENCES;
  });

  // Sync Dark Mode with <html> class
  useEffect(() => {
    if (preferences.darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [preferences.darkMode]);

  // Save Preferences to localStorage
  const updatePreferences = (newPrefs: Partial<UserPreferences>) => {
    setPreferences((prev) => {
      const updated = { ...prev, ...newPrefs };
      if (typeof window !== 'undefined') {
        localStorage.setItem('el_faro_preferences', JSON.stringify(updated));
      }
      return updated;
    });
  };

  // Play subtle chime for urgent push notification
  const playAlertChime = () => {
    try {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
      osc.frequency.setValueAtTime(880, ctx.currentTime + 0.1); // A5
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.6);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.6);
    } catch (e) {
      // ignore
    }
  };

  // Fetch initial data
  const loadData = useCallback(async (isSilent = false) => {
    if (!isSilent) setIsLoading(true);
    try {
      const [newsRes, feedsRes, podcastsRes, statsRes] = await Promise.all([
        fetch('/api/news'),
        fetch('/api/feeds'),
        fetch('/api/podcasts'),
        fetch('/api/stats'),
      ]);

      const newsData = await newsRes.json();
      const feedsData = await feedsRes.json();
      const podcastsData = await podcastsRes.json();
      const statsData = await statsRes.json();

      if (newsData.success && Array.isArray(newsData.data)) {
        setArticles(newsData.data);

        // Check for new breaking alerts
        setSeenArticleIds((prevSeen) => {
          if (prevSeen.size > 0) {
            const newlyArrived = newsData.data.find(
              (a: NewsArticle) =>
                !prevSeen.has(a.id) &&
                (a.isBreaking || a.aiVerification.credibilityScore >= 97) &&
                preferences.alertCategories.includes(a.category)
            );
            if (newlyArrived) {
              setActivePushToast(newlyArrived);
              playAlertChime();
              // Browser push if permitted
              if (
                typeof window !== 'undefined' &&
                'Notification' in window &&
                Notification.permission === 'granted'
              ) {
                new Notification(`🚨 Alerta: ${newlyArrived.title}`, {
                  body: newlyArrived.excerpt,
                  icon: newlyArrived.imageUrl,
                });
              }
            }
          }
          return new Set(newsData.data.map((a: NewsArticle) => a.id));
        });
      }

      if (feedsData.success) {
        setFeeds(feedsData.data);
        if (feedsData.syncIntervalHours) setSyncIntervalHours(feedsData.syncIntervalHours);
        if (feedsData.lastSyncNewArticlesCount !== undefined) setLastSyncNewArticlesCount(feedsData.lastSyncNewArticlesCount);
        if (feedsData.syncHistory) setSyncHistory(feedsData.syncHistory);
      }
      if (podcastsData.success) setPodcasts(podcastsData.data);
      if (statsData.success) {
        const s = statsData.data?.stats || statsData.stats;
        if (s) setStats(s);
        const lst = statsData.data?.lastSyncTime || statsData.lastSyncTime;
        if (lst) setLastSyncTime(lst);
        const nss = statsData.data?.nextScheduledSync || statsData.nextScheduledSync;
        if (nss) setNextScheduledSync(nss);
        const sih = statsData.data?.syncIntervalHours || statsData.syncIntervalHours;
        if (sih) setSyncIntervalHours(sih);
        const history = statsData.data?.syncHistory || statsData.syncHistory;
        if (history) setSyncHistory(history);
      }
    } catch (err) {
      console.error('Error fetching newspaper data:', err);
    } finally {
      if (!isSilent) setIsLoading(false);
    }
  }, [preferences.alertCategories]);

  useEffect(() => {
    loadData();

    // Check Push Permission state
    if (typeof window !== 'undefined' && 'Notification' in window) {
      setPushPermissionState(Notification.permission);
    } else {
      setPushPermissionState('unsupported');
    }

    // Auto-poll in real time every 30 seconds
    const interval = setInterval(() => {
      loadData(true);
    }, 30000);

    return () => clearInterval(interval);
  }, [loadData]);

  // Trigger manual RSS sync
  const handleTriggerSync = async () => {
    setIsSyncing(true);
    try {
      const res = await fetch('/api/news/refresh', { method: 'POST' });
      const data = await res.json();
      if (data.success) {
        await loadData(true);
      }
    } catch (err) {
      console.error('Failed to refresh feeds:', err);
    } finally {
      setIsSyncing(false);
    }
  };

  // Toggle feed enabled/disabled
  const handleToggleFeed = async (id: string) => {
    try {
      const res = await fetch(`/api/feeds/${id}/toggle`, { method: 'POST' });
      const data = await res.json();
      if (data.success) {
        setFeeds(data.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Delete feed
  const handleDeleteFeed = async (id: string) => {
    try {
      const res = await fetch(`/api/feeds/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        setFeeds(data.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Add custom feed
  const handleAddFeed = async (newFeed: { name: string; url: string; category: any; country: 'DO' | 'GLOBAL' }) => {
    const res = await fetch('/api/feeds', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newFeed),
    });
    const data = await res.json();
    if (data.success) {
      setFeeds(data.data);
    }
  };

  // Request browser push notification permission
  const handleRequestPushPermission = async () => {
    if (typeof window !== 'undefined' && 'Notification' in window) {
      const perm = await Notification.requestPermission();
      setPushPermissionState(perm);
      if (perm === 'granted') {
        new Notification('✅ Notificaciones de ELINOTICIA Activadas', {
          body: 'Recibirás alertas de última hora y noticias verificadas en tiempo real.',
        });
      }
    }
  };

  // Subscription handler
  const handleSubscribe = async (tier: 'free' | 'digital_plus' | 'patron', email: string) => {
    updatePreferences({ subscriptionTier: tier, email });
  };

  // Filter articles based on category, topics, tag, search
  const filteredArticles = useMemo(() => {
    return articles.filter((art) => {
      // 1. Tag filter
      if (selectedTag && !art.tags.includes(selectedTag)) {
        return false;
      }

      // 2. Search query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTitle = art.title.toLowerCase().includes(q);
        const matchExcerpt = art.excerpt.toLowerCase().includes(q);
        const matchTag = art.tags.some(t => t.toLowerCase().includes(q));
        const matchAuthor = art.author.toLowerCase().includes(q);
        if (!matchTitle && !matchExcerpt && !matchTag && !matchAuthor) {
          return false;
        }
      }

      // 3. Category tab filter
      if (currentCategory !== 'portada') {
        if (art.category !== currentCategory) return false;
      } else {
        // In 'portada', respect user's interest topics
        if (preferences.topics.length > 0 && !preferences.topics.includes(art.category)) {
          return false;
        }
      }

      return true;
    });
  }, [articles, currentCategory, preferences.topics, searchQuery, selectedTag]);

  // Featured Lead Story
  const heroArticle = useMemo(() => {
    if (filteredArticles.length === 0) return null;
    return (
      filteredArticles.find(a => a.isBreaking) ||
      filteredArticles.find(a => a.category === 'rd') ||
      filteredArticles[0]
    );
  }, [filteredArticles]);

  // Other secondary stories
  const secondaryArticles = useMemo(() => {
    if (!heroArticle) return filteredArticles;
    return filteredArticles.filter(a => a.id !== heroArticle.id);
  }, [filteredArticles, heroArticle]);

  return (
    <div className="min-h-screen bg-stone-100 dark:bg-stone-950 text-stone-900 dark:text-stone-100 transition-colors flex flex-col selection:bg-amber-500 selection:text-stone-950">
      {/* 1. Masthead & Nav Header */}
      <Header
        currentCategory={currentCategory}
        onSelectCategory={(cat) => {
          setCurrentCategory(cat);
          setSelectedTag(null);
        }}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        preferences={preferences}
        onUpdatePreferences={updatePreferences}
        onOpenPreferences={() => setIsPreferencesOpen(true)}
        onOpenSubscription={() => setIsSubscriptionOpen(true)}
        onOpenRssManager={() => setIsRssManagerOpen(true)}
        isSyncing={isSyncing}
        onTriggerRefresh={handleTriggerSync}
      />

      {/* 2. Tasa de Cambio Oficial & Criptomonedas en Vivo (USD, EUR, Bitcoin, Ethereum, etc.) */}
      <CurrencyExchangeBar />

      {/* 3. Breaking News Live Ticker */}
      <BreakingNewsTicker
        articles={articles}
        onSelectArticle={(art) => setSelectedArticle(art)}
        lang={preferences.language}
      />

      {/* 3. Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 flex-1 w-full space-y-10">
        {/* Active Filter Tags / Reset bar */}
        {(selectedTag || searchQuery) && (
          <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/60 p-3 rounded-xl flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-amber-600" />
              <span>
                Filtrando por:{' '}
                {selectedTag && <strong className="text-amber-800 dark:text-amber-300">#{selectedTag}</strong>}
                {selectedTag && searchQuery && ' + '}
                {searchQuery && <strong className="text-amber-800 dark:text-amber-300">"{searchQuery}"</strong>}
              </span>
              <span className="text-stone-400">({filteredArticles.length} resultados)</span>
            </div>
            <button
              onClick={() => {
                setSelectedTag(null);
                setSearchQuery('');
              }}
              className="text-amber-800 dark:text-amber-300 font-bold hover:underline"
            >
              Limpiar filtros
            </button>
          </div>
        )}

        {/* Live sync status alert bar */}
        <div className="flex flex-wrap items-center justify-between text-xs text-stone-500 dark:text-stone-400 border-b border-stone-200 dark:border-stone-800 pb-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Edición Continua en Tiempo Real</span>
            <span>•</span>
            <span>Próxima ingestión automática de feeds en: <strong>{new Date(nextScheduledSync).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</strong></span>
          </div>

          <div className="flex items-center gap-3">
            <span>{filteredArticles.length} notas verificadas</span>
            <button
              onClick={handleTriggerSync}
              disabled={isSyncing}
              className="hover:text-amber-600 flex items-center gap-1 font-semibold"
              title="Actualizar ahora"
            >
              <RefreshCw className={`w-3 h-3 ${isSyncing ? 'animate-spin' : ''}`} />
              <span>{isSyncing ? 'Sincronizando...' : 'Actualizar ahora'}</span>
            </button>
          </div>
        </div>

        {/* Loading State */}
        {isLoading && articles.length === 0 ? (
          <div className="py-24 text-center space-y-4">
            <div className="w-10 h-10 border-4 border-amber-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
            <h3 className="text-lg font-bold font-serif text-stone-800 dark:text-stone-200">
              Cargando redacción y verificando fuentes RSS con IA...
            </h3>
            <p className="text-xs text-stone-500">
              Analizando credibilidad, descartando spam y generando resúmenes en tiempo real.
            </p>
          </div>
        ) : filteredArticles.length === 0 ? (
          <div className="py-16 text-center space-y-3 bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 p-8">
            <AlertCircle className="w-10 h-10 text-amber-600 mx-auto" />
            <h3 className="text-lg font-bold font-serif">No se encontraron noticias con estos criterios</h3>
            <p className="text-xs text-stone-500 max-w-md mx-auto">
              Intenta cambiar los temas de interés en tus preferencias o buscar con otro término.
            </p>
            <button
              onClick={() => {
                setCurrentCategory('portada');
                setSelectedTag(null);
                setSearchQuery('');
              }}
              className="px-4 py-2 bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 text-xs font-bold rounded-lg shadow"
            >
              Volver a Portada Completa
            </button>
          </div>
        ) : (
          <>
            {/* PORTADA VIEW OR STANDARD CATEGORY VIEW */}

            {/* If Category is SPECIFIC: DEPORTES */}
            {currentCategory === 'deportes' ? (
              <SportsSection
                articles={articles}
                onSelect={(art) => setSelectedArticle(art)}
              />
            ) : currentCategory === 'economia' ? (
              /* If Category is ECONOMIA */
              <EconomySection
                articles={articles}
                onSelect={(art) => setSelectedArticle(art)}
              />
            ) : currentCategory === 'tecnologia' ? (
              /* If Category is TECNOLOGIA */
              <TechSection
                articles={articles}
                onSelect={(art) => setSelectedArticle(art)}
              />
            ) : currentCategory === 'opinion' ? (
              /* If Category is OPINION */
              <OpinionSection
                articles={articles}
                onSelect={(art) => setSelectedArticle(art)}
              />
            ) : (
              <>
                {/* 1. LEAD HERO STORY */}
                {heroArticle && (
                  <section className="space-y-2">
                    <ArticleCard
                      article={heroArticle}
                      variant="hero"
                      onSelect={(art) => setSelectedArticle(art)}
                      onTagClick={(tag) => setSelectedTag(tag)}
                      lang={preferences.language}
                      onPlayAudio={(art) => setSelectedArticle(art)}
                    />
                  </section>
                )}

                {/* 2. THREE-COLUMN BROADSHEET GRID */}
                <section className="space-y-4">
                  <div className="flex items-center justify-between border-b-2 border-stone-900 dark:border-stone-100 pb-1.5">
                    <h3 className="text-lg sm:text-xl font-bold font-serif uppercase tracking-tight text-stone-950 dark:text-stone-50">
                      {currentCategory === 'portada' ? 'Noticias Principales Verificadas' : `Sección ${currentCategory.toUpperCase()}`}
                    </h3>
                    <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400">
                      100% Fuentes Confiables
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {secondaryArticles.slice(0, 6).map((article) => (
                      <ArticleCard
                        key={article.id}
                        article={article}
                        variant="standard"
                        onSelect={(art) => setSelectedArticle(art)}
                        onTagClick={(tag) => setSelectedTag(tag)}
                        lang={preferences.language}
                        onPlayAudio={(art) => setSelectedArticle(art)}
                      />
                    ))}
                  </div>
                </section>

                {/* 3. PODCASTS AUDIO SECTION (on Portada) */}
                {currentCategory === 'portada' && podcasts.length > 0 && (
                  <PodcastsSection podcasts={podcasts} />
                )}

                {/* 4. SPORTS STANDINGS SNAPSHOT & BASEBALL (on Portada) */}
                {currentCategory === 'portada' && (
                  <SportsSection
                    articles={articles}
                    onSelect={(art) => setSelectedArticle(art)}
                  />
                )}

                {/* 5. OPINION TRIBUNE (on Portada) */}
                {currentCategory === 'portada' && (
                  <OpinionSection
                    articles={articles}
                    onSelect={(art) => setSelectedArticle(art)}
                  />
                )}

                {/* 6. MORE HEADLINES / REST OF ARTICLES */}
                {secondaryArticles.length > 6 && (
                  <section className="space-y-4 pt-4 border-t border-stone-200 dark:border-stone-800">
                    <h3 className="text-base sm:text-lg font-bold font-serif uppercase tracking-wide text-stone-900 dark:text-stone-100">
                      Más Crónicas y Cobertura Noticiosa
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {secondaryArticles.slice(6).map((article) => (
                        <ArticleCard
                          key={article.id}
                          article={article}
                          variant="standard"
                          onSelect={(art) => setSelectedArticle(art)}
                          onTagClick={(tag) => setSelectedTag(tag)}
                          lang={preferences.language}
                          onPlayAudio={(art) => setSelectedArticle(art)}
                        />
                      ))}
                    </div>
                  </section>
                )}
              </>
            )}
          </>
        )}
      </main>

      {/* 4. Footer */}
      <Footer
        onOpenSubscription={() => setIsSubscriptionOpen(true)}
        onOpenRssManager={() => setIsRssManagerOpen(true)}
        onOpenPreferences={() => setIsPreferencesOpen(true)}
        onCategorySelect={(cat) => setCurrentCategory(cat)}
      />

      {/* MODALS */}

      {/* Article Detail Reading Modal with Translation & Speech */}
      <ArticleModal
        article={selectedArticle}
        onClose={() => setSelectedArticle(null)}
        onTagClick={(tag) => {
          setSelectedTag(tag);
          setSelectedArticle(null);
        }}
        lang={preferences.language}
      />

      {/* User Preferences & Push Alerts Modal */}
      <PreferencesModal
        isOpen={isPreferencesOpen}
        onClose={() => setIsPreferencesOpen(false)}
        preferences={preferences}
        onUpdate={updatePreferences}
        onRequestPushPermission={handleRequestPushPermission}
        pushPermissionState={pushPermissionState}
      />

      {/* RSS & AI Engine Management Modal */}
      <RssConfigModal
        isOpen={isRssManagerOpen}
        onClose={() => setIsRssManagerOpen(false)}
        feeds={feeds}
        stats={stats}
        lastSyncTime={lastSyncTime}
        nextScheduledSync={nextScheduledSync}
        syncIntervalHours={syncIntervalHours}
        lastSyncNewArticlesCount={lastSyncNewArticlesCount}
        syncHistory={syncHistory}
        isSyncing={isSyncing}
        onTriggerSync={handleTriggerSync}
        onToggleFeed={handleToggleFeed}
        onDeleteFeed={handleDeleteFeed}
        onAddFeed={handleAddFeed}
      />

      {/* Subscription Modal */}
      <SubscriptionModal
        isOpen={isSubscriptionOpen}
        onClose={() => setIsSubscriptionOpen(false)}
        preferences={preferences}
        onSubscribe={handleSubscribe}
      />

      {/* Floating Push Alert Toast */}
      <NotificationToast
        article={activePushToast}
        onOpen={(art) => {
          setSelectedArticle(art);
          setActivePushToast(null);
        }}
        onDismiss={() => setActivePushToast(null)}
      />
    </div>
  );
}
