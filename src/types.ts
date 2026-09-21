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
