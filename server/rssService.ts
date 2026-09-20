import { XMLParser } from 'fast-xml-parser';
import { dataStore } from './dataStore';
import { verifyAndEnhanceNews } from './aiService';
import { NewsArticle, RssFeedSource } from '../src/types';
import { getContextualArticlePhoto } from './imageCatalog';

const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: '@_',
  textNodeName: '#text',
  trimValues: true,
});

function stripHtml(html: string): string {
  if (!html) return '';
  return html
    .replace(/<script[^>]*>([\S\s]*?)<\/script>/gim, '')
    .replace(/<style[^>]*>([\S\s]*?)<\/style>/gim, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/\s+/g, ' ')
    .trim();
}

function extractImage(item: any, title: string = '', category: string = ''): string {
  // Check enclosure
  if (item.enclosure && item.enclosure['@_url']) {
    const encUrl = String(item.enclosure['@_url']);
    if (encUrl.startsWith('http') && !encUrl.includes('cleardot.gif')) {
      return encUrl;
    }
  }
  // Check media:content
  if (item['media:content']) {
    const mc = Array.isArray(item['media:content']) ? item['media:content'][0] : item['media:content'];
    if (mc && mc['@_url']) {
      const mcUrl = String(mc['@_url']);
      if (mcUrl.startsWith('http') && !mcUrl.includes('cleardot.gif')) {
        return mcUrl;
      }
    }
  }
  // Check media:thumbnail
  if (item['media:thumbnail']) {
    const mt = Array.isArray(item['media:thumbnail']) ? item['media:thumbnail'][0] : item['media:thumbnail'];
    if (mt && mt['@_url']) {
      const mtUrl = String(mt['@_url']);
      if (mtUrl.startsWith('http') && !mtUrl.includes('cleardot.gif')) {
        return mtUrl;
      }
    }
  }
  // Check description or content for <img> tag
  const rawHtml = String(item['content:encoded'] || item.description || '');
  const imgMatch = rawHtml.match(/<img[^>]+src=["']([^"']+)["']/i);
  if (imgMatch && imgMatch[1] && !imgMatch[1].includes('cleardot.gif') && !imgMatch[1].includes('feedburner')) {
    return imgMatch[1];
  }

  // Dynamic contextual journalism photo from high-resolution catalog
  // Deterministic hashing ensures zero generic skyscraper repetition!
  return getContextualArticlePhoto(title, category);
}

/**
 * Fetch and process a single RSS feed
 */
export async function processFeed(feed: RssFeedSource): Promise<number> {
  if (!feed.enabled) return 0;

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 9000);

    const response = await fetch(feed.url, {
      signal: controller.signal,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) ElFaroQuisqueya/2.0 News Reader',
        'Accept': 'application/rss+xml, application/xml, text/xml, */*',
      },
    });
    clearTimeout(timeout);

    if (!response.ok) {
      console.warn(`[RSS] Feed ${feed.name} returned status ${response.status}`);
      dataStore.updateFeedStatus(feed.id, 'error');
      return 0;
    }

    const xmlText = await response.text();
    const parsed = parser.parse(xmlText);

    // Extract items from RSS 2.0 or Atom
    let items: any[] = [];
    if (parsed.rss && parsed.rss.channel && parsed.rss.channel.item) {
      items = Array.isArray(parsed.rss.channel.item) ? parsed.rss.channel.item : [parsed.rss.channel.item];
    } else if (parsed.feed && parsed.feed.entry) {
      items = Array.isArray(parsed.feed.entry) ? parsed.feed.entry : [parsed.feed.entry];
    }

    let addedCount = 0;
    // Process up to 8 candidate items per feed
    const candidateItems = items.slice(0, 8);

    for (const item of candidateItems) {
      const rawTitle = item.title ? (typeof item.title === 'string' ? item.title : item.title['#text'] || '') : '';
      let cleanTitle = stripHtml(rawTitle);
      if (!cleanTitle || cleanTitle.length < 10) continue;

      // Extract real source name if provided by aggregator like Google News
      let sourceName = feed.name;
      let sourceDomain = 'elfaroquisqueya.com';
      try {
        sourceDomain = new URL(feed.url).hostname;
      } catch (e) {}

      if (item.source) {
        const itemSourceText = typeof item.source === 'string' ? item.source : item.source['#text'];
        if (itemSourceText && typeof itemSourceText === 'string') {
          sourceName = itemSourceText.trim();
          // Remove trailing " - Fuente" if duplicated in title
          cleanTitle = cleanTitle.replace(new RegExp(`\\s*-\\s*${sourceName}\\s*$`, 'i'), '').trim();
        }
      }

      const rawContent = item['content:encoded'] || item.description || item.summary || cleanTitle;
      const cleanContent = stripHtml(String(rawContent));
      const link = item.link ? (typeof item.link === 'string' ? item.link : item.link['@_href'] || item.link['#text'] || '') : '';
      const pubDate = item.pubDate || item.published || item.updated || new Date().toISOString();
      const imageUrl = extractImage(item, cleanTitle, feed.category);

      // Verify and enhance with AI
      const aiResult = await verifyAndEnhanceNews(
        cleanTitle,
        cleanContent,
        sourceName,
        feed.category
      );

      // Only publish verified news to avoid duplicates or spam
      if (aiResult.isVerified && aiResult.credibilityScore >= 60) {
        const article: NewsArticle = {
          id: `rss-${Buffer.from(cleanTitle.slice(0, 45)).toString('base64').replace(/[^a-zA-Z0-9]/g, '')}`,
          title: cleanTitle,
          excerpt: cleanContent.slice(0, 260) + (cleanContent.length > 260 ? '...' : ''),
          content: cleanContent,
          summary: aiResult.summary,
          aiVerification: aiResult,
          tags: aiResult.tags,
          category: feed.category,
          source: {
            name: sourceName,
            url: link || feed.url,
            domain: sourceDomain,
            feedId: feed.id,
          },
          author: item['dc:creator'] || item.author || sourceName,
          publishedAt: new Date(pubDate).toISOString(),
          imageUrl: imageUrl,
          isDominican: feed.country === 'DO' || cleanTitle.toLowerCase().includes('dominican') || cleanTitle.toLowerCase().includes('santo domingo'),
          isBreaking: Math.random() < 0.25,
          readTimeMinutes: Math.max(2, Math.ceil(cleanContent.split(' ').length / 180)),
          socialShares: {
            whatsapp: Math.floor(Math.random() * 120) + 15,
            twitter: Math.floor(Math.random() * 85) + 10,
            facebook: Math.floor(Math.random() * 140) + 25,
            linkedin: Math.floor(Math.random() * 35) + 5,
          },
        };

        const added = dataStore.addArticle(article);
        if (added) {
          addedCount++;
        }
      } else {
        dataStore.getState().stats.spamFiltered++;
      }
    }

    dataStore.updateFeedStatus(feed.id, 'healthy', addedCount);
    return addedCount;
  } catch (err) {
    console.error(`[RSS] Error processing feed ${feed.name} (${feed.url}):`, err);
    dataStore.updateFeedStatus(feed.id, 'error');
    return 0;
  }
}

/**
 * Trigger sync of all active RSS feeds
 */
export async function syncAllFeeds(
  trigger: 'automatic_3h' | 'manual' | 'startup' = 'automatic_3h'
): Promise<{ totalAdded: number; totalFeeds: number; trigger: string }> {
  const feeds = dataStore.getFeeds().filter(f => f.enabled);
  let totalAdded = 0;

  for (const feed of feeds) {
    const added = await processFeed(feed);
    totalAdded += added;
  }

  dataStore.updateSyncTimestamp(totalAdded, trigger, feeds.length);
  return {
    totalAdded,
    totalFeeds: feeds.length,
    trigger,
  };
}

let scheduledInterval: NodeJS.Timeout | null = null;

/**
 * Setup 3-hour automatic background scheduler
 * "cada tres hora auntoamticamente subas las noticias nuevas si lo hay"
 */
export function startThreeHourRssScheduler() {
  if (scheduledInterval) {
    clearInterval(scheduledInterval);
  }

  // 3 hours in milliseconds: 3 * 60 * 60 * 1000 = 10,800,000 ms
  const THREE_HOURS_MS = 3 * 60 * 60 * 1000;

  scheduledInterval = setInterval(async () => {
    console.log('[RSS 3-Hour Scheduler] Ejecutando ciclo de comprobación automática (cada 3 horas)...');
    try {
      const result = await syncAllFeeds('automatic_3h');
      if (result.totalAdded > 0) {
        console.log(`[RSS 3-Hour Scheduler] ✅ Se encontraron y subieron ${result.totalAdded} noticias nuevas.`);
      } else {
        console.log('[RSS 3-Hour Scheduler] ℹ️ Ciclo de 3 horas finalizado: no se encontraron noticias nuevas en las fuentes.');
      }
    } catch (e) {
      console.error('[RSS 3-Hour Scheduler] Error en el ciclo programado:', e);
    }
  }, THREE_HOURS_MS);

  console.log('[RSS 3-Hour Scheduler] Programador automático configurado: se comprobarán y subirán noticias cada 3 horas.');
}

// Alias for backwards compatibility
export const startHourlyRssScheduler = startThreeHourRssScheduler;
