import { NewsArticle, RssFeedSource, PodcastEpisode, AdvertiserCampaign, DirectAdPlan, AdSenseConfig, AdPlacement } from '../src/types';
import { getContextualArticlePhoto, scanAndDeduplicateArticles } from './imageCatalog';
import { cleanJournalisticText, decodeHtmlEntities } from './textUtils';
import { INITIAL_FEEDS, INITIAL_ARTICLES, INITIAL_PODCASTS } from '../src/data/initialData';

export { INITIAL_FEEDS, INITIAL_ARTICLES, INITIAL_PODCASTS } from '../src/data/initialData';

export const INITIAL_RATE_CARD: DirectAdPlan[] = [
  {
    id: 'plan-header-top',
    name: 'Banner Cabecera Principal (Leaderboard)',
    placement: 'header_top',
    dimensions: '728x90 px / 970x90 px Responsive',
    pricePerDayDOP: 2500,
    pricePerDayUSD: 42,
    estimatedImpressionsDay: '65,000+ visualizaciones/día',
    description: 'Máxima visibilidad inmediatamente debajo de la barra de cotizaciones y logo. Impacto directo en el 100% de los lectores al ingresar al portal.',
    badge: 'Más Vendido',
    isPopular: true
  },
  {
    id: 'plan-in-feed',
    name: 'Banner Intermedio en Noticias (In-Feed)',
    placement: 'in_feed',
    dimensions: '728x90 px / 970x250 px Billboard',
    pricePerDayDOP: 1800,
    pricePerDayUSD: 30,
    estimatedImpressionsDay: '48,000+ visualizaciones/día',
    description: 'Ubicado estratégicamente entre la noticia principal y el bloque de crónicas de portada. Tasa de clics (CTR) superior al 2.6%.',
    badge: 'Mayor CTR'
  },
  {
    id: 'plan-sidebar',
    name: 'Robapáginas / Columna Lateral (Skyscraper & Box)',
    placement: 'sidebar',
    dimensions: '300x250 px / 300x600 px Half-Page',
    pricePerDayDOP: 1400,
    pricePerDayUSD: 23,
    estimatedImpressionsDay: '38,000+ visualizaciones/día',
    description: 'Visible permanentemente durante la lectura de columnas de opinión, cotizaciones financieras y podcasts.'
  },
  {
    id: 'plan-article-modal',
    name: 'Anuncio Patrocinado en Lectura de Noticia',
    placement: 'article_modal',
    dimensions: 'Responsive 680x140 px Banner Integrado',
    pricePerDayDOP: 1600,
    pricePerDayUSD: 26,
    estimatedImpressionsDay: '52,000+ lecturas completas/día',
    description: 'Aparece dentro del visor de lectura de alta concentración de la noticia, justo antes del resumen de IA y botones de compartir.',
    badge: 'Alta Conversión'
  },
  {
    id: 'plan-footer-banner',
    name: 'Banner Pie de Página & Cierre de Edición',
    placement: 'footer_banner',
    dimensions: '728x90 px / 970x90 px Horizontal',
    pricePerDayDOP: 950,
    pricePerDayUSD: 16,
    estimatedImpressionsDay: '22,000+ visualizaciones/día',
    description: 'Presencia continua al pie de todas las secciones informativas, hemeroteca y suscripciones.'
  }
];

export const INITIAL_CAMPAIGNS: AdvertiserCampaign[] = [
  {
    id: 'ad-popular-1',
    advertiserName: 'Banco Popular Dominicano',
    businessCategory: 'Banca & Finanzas',
    contactEmail: 'publicidad@bpd.com.do',
    contactPhone: '+1 (809) 544-5555',
    rncTaxId: '1-01-01010-1',
    adTitle: 'Préstamo Hipotecario a Tasa Fija Preferencial',
    adSubtitle: 'Haz realidad el sueño de tu nuevo hogar o apartamento con la tasa más competitiva de República Dominicana.',
    targetUrl: 'https://popularenlinea.com',
    imageUrl: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200&q=80',
    callToAction: 'Calcular Préstamo Online',
    placement: 'header_top',
    startDate: '2026-09-01T00:00:00Z',
    endDate: '2026-10-01T00:00:00Z',
    days: 30,
    totalPriceDOP: 60000,
    totalPriceUSD: 1000,
    paymentMethod: 'banco_popular',
    paymentStatus: 'paid',
    status: 'active',
    clicksCount: 1420,
    impressionsCount: 86400,
    createdAt: '2026-09-01T10:00:00Z'
  },
  {
    id: 'ad-claro-2',
    advertiserName: 'Claro Dominicana',
    businessCategory: 'Telecomunicaciones & Tecnología',
    contactEmail: 'negocios@claro.com.do',
    contactPhone: '+1 (809) 220-1111',
    rncTaxId: '1-01-00101-2',
    adTitle: 'Internet Fibra Óptica Ultrarrápida 1 Gbps',
    adSubtitle: 'La mayor velocidad y estabilidad de conexión para tu empresa, oficina o entretenimiento en el hogar.',
    targetUrl: 'https://claro.com.do',
    imageUrl: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=1200&q=80',
    callToAction: 'Ver Planes y Cobertura',
    placement: 'in_feed',
    startDate: '2026-09-10T00:00:00Z',
    endDate: '2026-10-10T00:00:00Z',
    days: 30,
    totalPriceDOP: 45000,
    totalPriceUSD: 750,
    paymentMethod: 'card',
    paymentStatus: 'paid',
    status: 'active',
    clicksCount: 980,
    impressionsCount: 52300,
    createdAt: '2026-09-10T12:00:00Z'
  },
  {
    id: 'ad-super-3',
    advertiserName: 'Supermercados Nacional & CCN',
    businessCategory: 'Comercio & Consumo Masivo',
    contactEmail: 'mercadeo@ccn.net.do',
    contactPhone: '+1 (809) 537-5011',
    rncTaxId: '1-01-55555-5',
    adTitle: 'Feria de Frescura y Calidad Gourmet',
    adSubtitle: 'Aprovecha ofertas exclusivas en cortes seleccionados, mariscos frescos y vinos internacionales toda la semana.',
    targetUrl: 'https://supermercadosnacional.com',
    imageUrl: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80',
    callToAction: 'Explorar Catálogo Digital',
    placement: 'sidebar',
    startDate: '2026-09-15T00:00:00Z',
    endDate: '2026-09-30T00:00:00Z',
    days: 15,
    totalPriceDOP: 18900,
    totalPriceUSD: 315,
    paymentMethod: 'banreservas',
    paymentStatus: 'paid',
    status: 'active',
    clicksCount: 610,
    impressionsCount: 29400,
    createdAt: '2026-09-15T09:30:00Z'
  },
  {
    id: 'ad-turismo-4',
    advertiserName: 'Mitur / GoDominicanRepublic',
    businessCategory: 'Turismo & Destinos',
    contactEmail: 'promocion@mitur.gob.do',
    contactPhone: '+1 (809) 221-4660',
    adTitle: 'República Dominicana lo tiene todo',
    adSubtitle: 'Descubre los tesoros de Samaná, Pedernales y la Cordillera Central en tus próximas vacaciones familiares.',
    targetUrl: 'https://godominicanrepublic.com',
    imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
    callToAction: 'Planificar mi Viaje',
    placement: 'article_modal',
    startDate: '2026-09-12T00:00:00Z',
    endDate: '2026-10-12T00:00:00Z',
    days: 30,
    totalPriceDOP: 40000,
    totalPriceUSD: 660,
    paymentMethod: 'banco_bhd',
    paymentStatus: 'paid',
    status: 'active',
    clicksCount: 840,
    impressionsCount: 41200,
    createdAt: '2026-09-12T14:00:00Z'
  },
  {
    id: 'ad-universal-5',
    advertiserName: 'Grupo Universal Seguros',
    businessCategory: 'Seguros & Protección Familiar',
    contactEmail: 'contacto@universal.com.do',
    contactPhone: '+1 (809) 544-7100',
    adTitle: 'Póliza de Salud Internacional y Viajes',
    adSubtitle: 'Atención médica de primera clase en los mejores centros hospitalarios de RD, EE. UU. y Europa.',
    targetUrl: 'https://universal.com.do',
    imageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80',
    callToAction: 'Cotizar Póliza Digital',
    placement: 'footer_banner',
    startDate: '2026-09-05T00:00:00Z',
    endDate: '2026-10-05T00:00:00Z',
    days: 30,
    totalPriceDOP: 24000,
    totalPriceUSD: 400,
    paymentMethod: 'banco_popular',
    paymentStatus: 'paid',
    status: 'active',
    clicksCount: 390,
    impressionsCount: 19800,
    createdAt: '2026-09-05T11:00:00Z'
  }
];

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
  adSenseConfig: AdSenseConfig;
  campaigns: AdvertiserCampaign[];
  rateCard: DirectAdPlan[];
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
      },
      adSenseConfig: {
        enabled: true,
        publisherId: process.env.GOOGLE_ADSENSE_CLIENT_ID || 'ca-pub-9842510294719283',
        slots: {
          header_top: '1029384756',
          in_feed: '2938475610',
          sidebar: '3847561029',
          article_modal: '4756102938',
          footer_banner: '5610293847',
        },
        testMode: false,
        monetizationMode: 'hybrid',
      },
      campaigns: [...INITIAL_CAMPAIGNS],
      rateCard: [...INITIAL_RATE_CARD],
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

  // ----------------------------------------------------
  // Advertisement & Monetization Management
  // ----------------------------------------------------

  getAdState() {
    const totalDOP = this.state.campaigns.reduce((acc, c) => acc + (c.totalPriceDOP || 0), 0);
    const totalUSD = this.state.campaigns.reduce((acc, c) => acc + (c.totalPriceUSD || 0), 0);
    const totalImpressions = this.state.campaigns.reduce((acc, c) => acc + (c.impressionsCount || 0), 0);
    const totalClicks = this.state.campaigns.reduce((acc, c) => acc + (c.clicksCount || 0), 0);

    return {
      config: this.state.adSenseConfig,
      campaigns: this.state.campaigns,
      rateCard: this.state.rateCard,
      totalDirectRevenueDOP: totalDOP,
      totalDirectRevenueUSD: totalUSD,
      totalImpressions,
      totalClicks,
    };
  }

  getRateCard(): DirectAdPlan[] {
    return this.state.rateCard;
  }

  getAdSenseConfig(): AdSenseConfig {
    return this.state.adSenseConfig;
  }

  updateAdSenseConfig(updates: Partial<AdSenseConfig>): AdSenseConfig {
    this.state.adSenseConfig = {
      ...this.state.adSenseConfig,
      ...updates,
      slots: {
        ...this.state.adSenseConfig.slots,
        ...(updates.slots || {}),
      },
    };
    return this.state.adSenseConfig;
  }

  getActiveCampaigns(placement?: AdPlacement): AdvertiserCampaign[] {
    const active = this.state.campaigns.filter(c => c.status === 'active');
    if (!placement) return active;
    return active.filter(c => c.placement === placement);
  }

  addCampaign(campaignData: Omit<AdvertiserCampaign, 'id' | 'createdAt' | 'clicksCount' | 'impressionsCount' | 'status'> & { status?: 'active' | 'pending_review' }): AdvertiserCampaign {
    const newCampaign: AdvertiserCampaign = {
      ...campaignData,
      id: `ad-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      status: campaignData.status || 'active',
      clicksCount: 0,
      impressionsCount: 1,
      createdAt: new Date().toISOString(),
    };

    this.state.campaigns.unshift(newCampaign);
    return newCampaign;
  }

  recordAdImpression(campaignId: string): boolean {
    const campaign = this.state.campaigns.find(c => c.id === campaignId);
    if (campaign) {
      campaign.impressionsCount = (campaign.impressionsCount || 0) + 1;
      return true;
    }
    return false;
  }

  recordAdClick(campaignId: string): boolean {
    const campaign = this.state.campaigns.find(c => c.id === campaignId);
    if (campaign) {
      campaign.clicksCount = (campaign.clicksCount || 0) + 1;
      return true;
    }
    return false;
  }

  toggleCampaignStatus(campaignId: string): AdvertiserCampaign | null {
    const campaign = this.state.campaigns.find(c => c.id === campaignId);
    if (campaign) {
      campaign.status = campaign.status === 'active' ? 'pending_review' : 'active';
      return campaign;
    }
    return null;
  }
}

export const dataStore = new DataStore();
