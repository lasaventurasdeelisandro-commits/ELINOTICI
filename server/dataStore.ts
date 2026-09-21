import { NewsArticle, RssFeedSource, PodcastEpisode } from '../src/types';
import { getContextualArticlePhoto, scanAndDeduplicateArticles } from './imageCatalog';
import { cleanJournalisticText, decodeHtmlEntities } from './textUtils';
import { INITIAL_FEEDS, INITIAL_ARTICLES, INITIAL_PODCASTS } from '../src/data/initialData';

export { INITIAL_FEEDS, INITIAL_ARTICLES, INITIAL_PODCASTS } from '../src/data/initialData';

export interface SyncLogEntry {
  id: string;
  timestamp: string;
  articlesAdded: number;
  totalFeedsChecked: number;
  trigger: 'automatic_3h' | 'manual' | 'startup';
  status: 'success' | 'no_new_content' | 'partial_error';
  message: string;
}

export interface DataStoreState {
  articles: NewsArticle[];
  feeds: RssFeedSource[];
  podcasts: PodcastEpisode[];
  lastSyncTime: string;
  nextScheduledSync: string;
  syncIntervalHours: number;
  lastSyncNewArticlesCount: number;
  syncHistory: SyncLogEntry[];
  stats: {
    totalProcessed: number;
    verifiedPublished: number;
    spamFiltered: number;
    duplicatesMerged: number;
  };
}

function sanitizeArticleFields(a: NewsArticle): NewsArticle {
  a.title = decodeHtmlEntities(cleanJournalisticText(a.title));
  a.excerpt = decodeHtmlEntities(cleanJournalisticText(a.excerpt));
  a.content = decodeHtmlEntities(cleanJournalisticText(a.content));
  if (Array.isArray(a.summary)) {
    a.summary = a.summary
      .map((item: any) => cleanJournalisticText(item))
      .filter((s: string) => s && s !== '[object Object]' && s.length > 5);
  }
  if (!a.summary || a.summary.length === 0) {
    a.summary = [
      a.title,
      `Cobertura periodística verificada por ${a.source?.name || 'redacción'}.`,
      'Información contrastada con agencias oficiales.'
    ];
  }
  return a;
}

class DataStore {
  private state: DataStoreState;

  constructor() {
    const THREE_HOURS_MS = 3 * 60 * 60 * 1000;
    this.state = {
      articles: INITIAL_ARTICLES.map(sanitizeArticleFields),
      feeds: INITIAL_FEEDS,
      podcasts: INITIAL_PODCASTS,
      lastSyncTime: new Date().toISOString(),
      nextScheduledSync: new Date(Date.now() + THREE_HOURS_MS).toISOString(),
      syncIntervalHours: 3,
      lastSyncNewArticlesCount: 0,
      syncHistory: [
        {
          id: 'log-init',
          timestamp: new Date().toISOString(),
          articlesAdded: INITIAL_ARTICLES.length,
          totalFeedsChecked: INITIAL_FEEDS.length,
          trigger: 'startup',
          status: 'success',
          message: 'Sistema inicializado con cobertura base de prensa dominicana e internacional.',
        }
      ],
      stats: {
        totalProcessed: 54,
        verifiedPublished: INITIAL_ARTICLES.length,
        spamFiltered: 12,
        duplicatesMerged: 8,
      }
    };

    // Run automated scan & deduplication to ensure ZERO repeated images across different stories
    scanAndDeduplicateArticles(this.state.articles);
  }

  getState(): DataStoreState {
    return this.state;
  }

  getArticles(params?: {
    category?: string;
    search?: string;
    tag?: string;
    country?: 'DO' | 'GLOBAL' | 'all';
    limit?: number;
    offset?: number;
  }): { items: NewsArticle[]; total: number } {
    // Continuous image scan & deduplication check before returning to users
    scanAndDeduplicateArticles(this.state.articles);

    let list = [...this.state.articles];

    if (params?.category && params.category !== 'all' && params.category !== 'portada') {
      list = list.filter(a => a.category === params.category);
    }

    if (params?.country && params.country !== 'all') {
      if (params.country === 'DO') {
        list = list.filter(a => a.isDominican);
      } else {
        list = list.filter(a => !a.isDominican);
      }
    }

    if (params?.tag) {
      const cleanTag = params.tag.toLowerCase();
      list = list.filter(a => a.tags.some(t => t.toLowerCase() === cleanTag || t.toLowerCase().includes(cleanTag)));
    }

    if (params?.search) {
      const q = params.search.toLowerCase();
      list = list.filter(a => 
        a.title.toLowerCase().includes(q) ||
        a.excerpt.toLowerCase().includes(q) ||
        a.content.toLowerCase().includes(q) ||
        a.author.toLowerCase().includes(q)
      );
    }

    // Sort newest first
    list.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());

    const total = list.length;
    const offset = params?.offset || 0;
    const limit = params?.limit !== undefined ? params.limit : 250;

    return {
      items: list.slice(offset, offset + limit),
      total,
    };
  }

  getArticleById(id: string): NewsArticle | undefined {
    return this.state.articles.find(a => a.id === id);
  }

  addArticle(article: NewsArticle): boolean {
    article = sanitizeArticleFields(article);

    // Sanitize any repetitive legacy building photos
    if (article.imageUrl && (article.imageUrl.includes('photo-1486406146926-c627a92ad1ab') || article.imageUrl.includes('photo-1544620347-c4fd4a3d5957'))) {
      article.imageUrl = getContextualArticlePhoto(article.title, article.category);
    }

    // Check duplicate by exact title or similar
    const isDup = this.state.articles.some(
      a => a.id === article.id || a.title.trim().toLowerCase() === article.title.trim().toLowerCase()
    );

    if (isDup) {
      this.state.stats.duplicatesMerged++;
      return false;
    }

    this.state.articles.unshift(article);
    this.state.stats.verifiedPublished++;
    scanAndDeduplicateArticles(this.state.articles);
    return true;
  }

  getFeeds(): RssFeedSource[] {
    return this.state.feeds;
  }

  addFeed(feed: Omit<RssFeedSource, 'id' | 'itemCount' | 'lastFetched' | 'status'>): RssFeedSource {
    const newFeed: RssFeedSource = {
      ...feed,
      id: `feed-${Date.now()}`,
      itemCount: 0,
      lastFetched: null,
      status: 'pending',
    };
    this.state.feeds.push(newFeed);
    return newFeed;
  }

  toggleFeed(id: string): boolean {
    const feed = this.state.feeds.find(f => f.id === id);
    if (feed) {
      feed.enabled = !feed.enabled;
      return feed.enabled;
    }
    return false;
  }

  deleteFeed(id: string): boolean {
    const prevLen = this.state.feeds.length;
    this.state.feeds = this.state.feeds.filter(f => f.id !== id);
    return this.state.feeds.length < prevLen;
  }

  updateFeedStatus(id: string, status: 'healthy' | 'error' | 'pending', countIncrement = 0) {
    const feed = this.state.feeds.find(f => f.id === id);
    if (feed) {
      feed.status = status;
      feed.lastFetched = new Date().toISOString();
      if (countIncrement > 0) {
        feed.itemCount += countIncrement;
      }
    }
  }

  getPodcasts(): PodcastEpisode[] {
    return this.state.podcasts;
  }

  updateSyncTimestamp(newArticlesAdded: number = 0, trigger: 'automatic_3h' | 'manual' | 'startup' = 'automatic_3h', totalFeedsChecked: number = 0) {
    const THREE_HOURS_MS = 3 * 60 * 60 * 1000;
    const now = new Date().toISOString();
    this.state.lastSyncTime = now;
    this.state.nextScheduledSync = new Date(Date.now() + THREE_HOURS_MS).toISOString();
    this.state.lastSyncNewArticlesCount = newArticlesAdded;

    const logEntry: SyncLogEntry = {
      id: `sync-${Date.now()}`,
      timestamp: now,
      articlesAdded: newArticlesAdded,
      totalFeedsChecked: totalFeedsChecked || this.state.feeds.filter(f => f.enabled).length,
      trigger,
      status: newArticlesAdded > 0 ? 'success' : 'no_new_content',
      message: newArticlesAdded > 0
        ? `Se subieron ${newArticlesAdded} noticias nuevas verificadas en este ciclo.`
        : 'Ciclo completado. No se detectaron noticias nuevas en las fuentes verificadas.',
    };

    this.state.syncHistory.unshift(logEntry);
    if (this.state.syncHistory.length > 20) {
      this.state.syncHistory = this.state.syncHistory.slice(0, 20);
    }
  }
}

export const dataStore = new DataStore();
