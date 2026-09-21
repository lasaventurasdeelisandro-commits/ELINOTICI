export type NewsCategory = 'rd' | 'mundo' | 'deportes' | 'opinion' | 'economia' | 'tecnologia' | 'cultura';

export interface AiVerification {
  isVerified: boolean;
  credibilityScore: number; // 0-100
  sourceRating: 'Fuente Oficial' | 'Medio Verificado' | 'Agencia Internacional' | 'Colaborador Autorizado';
  verificationDetails: string;
  antiSpamChecked: boolean;
  duplicateChecked: boolean;
  keyFactsVerified: string[];
}

export interface NewsArticle {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  summary: string[]; // AI bullet points
  aiVerification: AiVerification;
  tags: string[];
  category: NewsCategory;
  subcategory?: string;
  source: {
    name: string;
    url: string;
    domain: string;
    feedId?: string;
  };
  author: string;
  publishedAt: string;
  imageUrl: string;
  imageCaption?: string;
  isBreaking?: boolean;
  isOpinion?: boolean;
  isDominican: boolean;
  readTimeMinutes: number;
  socialShares: {
    whatsapp: number;
    twitter: number;
    facebook: number;
    linkedin: number;
  };
}

export interface SyncLogEntry {
  id: string;
  timestamp: string;
  articlesAdded: number;
  totalFeedsChecked: number;
  trigger: 'automatic_3h' | 'manual' | 'startup';
  status: 'success' | 'no_new_content' | 'partial_error';
  message: string;
}

export interface SyncStatusInfo {
  lastSyncTime: string;
  nextScheduledSync: string;
  syncIntervalHours: number;
  lastSyncNewArticlesCount: number;
  syncHistory: SyncLogEntry[];
}

export interface RssFeedSource {
  id: string;
  name: string;
  url: string;
  category: NewsCategory;
  country: 'DO' | 'GLOBAL';
  enabled: boolean;
  lastFetched: string | null;
  status: 'healthy' | 'error' | 'pending';
  itemCount: number;
  reliability: 'high' | 'official' | 'trusted';
}

export interface StudioCameraFeed {
  id: string;
  name: string;
  label: string;
  cameraType: 'main' | 'commentators' | 'guests' | 'split';
  previewImageUrl: string;
  description: string;
  viewAngle: string;
}

export interface StudioCommentator {
  id: string;
  name: string;
  role: string;
  avatarUrl: string;
  isSpeaking?: boolean;
  notes: string;
  cameraRef: string;
}

export interface StudioGuest {
  id: string;
  name: string;
  title: string;
  organization: string;
  avatarUrl: string;
  topic: string;
  connectionType: 'Presencial en Cabina' | 'Enlace Satelital 4K' | 'Llamada Telefónica';
  isSpeaking?: boolean;
  cameraRef: string;
}

export interface LiveStreamData {
  channelName: string;
  isLive: boolean;
  viewerCount: number;
  currentSegment: string;
  programSchedule: string;
  streamResolution: string;
  cameras: StudioCameraFeed[];
  commentators: StudioCommentator[];
  guests: StudioGuest[];
  tickerNews: string[];
}

export interface PodcastEpisode {
  id: string;
  title: string;
  show: string;
  host: string;
  category: string;
  duration: string;
  durationSeconds: number;
  publishedAt: string;
  audioUrl: string;
  summary: string;
  transcript: string;
  imageUrl: string;
  keyTakeaways: string[];
  hasVideoStream?: boolean;
  streamData?: LiveStreamData;
}

export interface UserPreferences {
  topics: NewsCategory[];
  notificationsEnabled: boolean;
  urgentAlertsOnly: boolean;
  alertCategories: NewsCategory[];
  darkMode: boolean;
  language: SupportedLanguage;
  subscriptionTier: 'free' | 'digital_plus' | 'patron';
  email: string | null;
  savedArticleIds: string[];
}

export type SupportedLanguage = 'es' | 'en' | 'fr' | 'ht' | 'pt' | 'de' | 'it' | 'zh';

export interface LanguageOption {
  code: SupportedLanguage;
  name: string;
  flag: string;
  nativeName: string;
}

export interface SubscriptionPlan {
  id: 'free' | 'digital_plus' | 'patron';
  name: string;
  priceDOP: number;
  period: string;
  badge?: string;
  features: string[];
  isPopular?: boolean;
}

export interface CurrencyRateItem {
  code: string;
  name: string;
  type: 'fiat' | 'crypto';
  symbol: string;
  flag?: string;
  buyPriceDOP?: number;
  sellPriceDOP?: number;
  priceUSD: number;
  priceDOP: number;
  change24h: number; // percentage, e.g. +1.85 or -0.42
  high24h?: number;
  low24h?: number;
  referenceSource: string;
}

export interface MarketRatesResponse {
  updatedAt: string;
  baseCurrency: 'DOP';
  usdRateDOP: number;
  fiat: CurrencyRateItem[];
  crypto: CurrencyRateItem[];
}

export type AdPlacement = 'header_top' | 'in_feed' | 'sidebar' | 'article_modal' | 'footer_banner';
export type AdNetworkMode = 'hybrid' | 'direct_only' | 'adsense_only';

export interface DirectAdPlan {
  id: string;
  name: string;
  placement: AdPlacement;
  dimensions: string;
  pricePerDayDOP: number;
  pricePerDayUSD: number;
  estimatedImpressionsDay: string;
  description: string;
  badge?: string;
  isPopular?: boolean;
}

export interface AdvertiserCampaign {
  id: string;
  advertiserName: string;
  businessCategory: string;
  contactEmail: string;
  contactPhone: string;
  rncTaxId?: string;
  adTitle: string;
  adSubtitle?: string;
  targetUrl: string;
  imageUrl: string;
  callToAction: string;
  placement: AdPlacement;
  startDate: string;
  endDate: string;
  days: number;
  totalPriceDOP: number;
  totalPriceUSD: number;
  paymentMethod: 'banco_popular' | 'banreservas' | 'banco_bhd' | 'card' | 'whatsapp_billing';
  paymentStatus: 'paid' | 'pending_verification';
  status: 'active' | 'pending_review' | 'expired';
  clicksCount: number;
  impressionsCount: number;
  createdAt: string;
}

export interface AdSenseConfig {
  enabled: boolean;
  publisherId: string;
  slots: {
    header_top: string;
    in_feed: string;
    sidebar: string;
    article_modal: string;
    footer_banner: string;
  };
  testMode: boolean;
  monetizationMode: AdNetworkMode;
}

export interface AdMonetizationState {
  config: AdSenseConfig;
  campaigns: AdvertiserCampaign[];
  rateCard: DirectAdPlan[];
  totalDirectRevenueDOP: number;
  totalDirectRevenueUSD: number;
  totalImpressions: number;
  totalClicks: number;
}
