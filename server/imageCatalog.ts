/**
 * High-definition, journalistic photo catalog & automated image scanning engine for ELINOTICIA.
 * 
 * Guarantees zero duplicate images across different articles by maintaining a global uniqueness scanner.
 */

import { NewsArticle } from '../src/types';
import { 
  THEMATIC_POOLS, 
  matchArticleToContextualPhoto, 
  scanAndDeduplicateArticles as scanCore 
} from '../src/services/imageContextMatcher';

export { THEMATIC_POOLS };

/**
 * Normalizes title for deduplication comparison
 */
function normalizeTitle(title: string): string {
  return (title || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]/g, '')
    .trim();
}

/**
 * Finds the most contextually relevant photo for an article based on title, excerpt, and category.
 * Strictly guarantees that if `usedImages` is provided, the photo is unique and not repeated.
 */
export function getContextualArticlePhoto(
  title: string,
  category: string = '',
  usedImages?: Set<string>,
  excerpt: string = ''
): string {
  return matchArticleToContextualPhoto(title, excerpt, category, usedImages);
}

/**
 * Global Anti-Repetition Scanner:
 * Scans an array of articles and ensures that NO TWO DIFFERENT ARTICLES share the exact same image.
 * If two articles are identical (same title or ID), they may share the image; otherwise,
 * any duplicate or contextually mismatched image is replaced with a guaranteed unique, contextual photo.
 */
export function scanAndDeduplicateArticles(articles: NewsArticle[]): void {
  if (!articles || articles.length === 0) return;

  const scanned = scanCore(articles);
  for (let i = 0; i < articles.length; i++) {
    if (scanned[i]) {
      articles[i].imageUrl = scanned[i].imageUrl;
    }
  }
}
