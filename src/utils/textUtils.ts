/**
 * Comprehensive text utilities for El Faro Quisqueya
 * Handles HTML entity decoding, sanitization, and summary formatting.
 */

const NAMED_ENTITIES: Record<string, string> = {
  '&nbsp;': ' ',
  '&amp;': '&',
  '&quot;': '"',
  '&apos;': "'",
  '&#39;': "'",
  '&lt;': '<',
  '&gt;': '>',
  '&copy;': '©',
  '&reg;': '®',
  '&deg;': '°',
  '&plusmn;': '±',
  '&middot;': '·',
  '&bull;': '•',
  '&hellip;': '…',
  '&ndash;': '–',
  '&mdash;': '—',
  '&lsquo;': '‘',
  '&rsquo;': '’',
  '&sbquo;': '‚',
  '&ldquo;': '“',
  '&rdquo;': '”',
  '&iexcl;': '¡',
  '&iquest;': '¿',
  '&laquo;': '«',
  '&raquo;': '»',
  '&aacute;': 'á',
  '&eacute;': 'é',
  '&iacute;': 'í',
  '&oacute;': 'ó',
  '&uacute;': 'ú',
  '&ntilde;': 'ñ',
  '&Aacute;': 'Á',
  '&Eacute;': 'É',
  '&Iacute;': 'Í',
  '&Oacute;': 'Ó',
  '&Uacute;': 'Ú',
  '&Ntilde;': 'Ñ',
  '&uuml;': 'ü',
  '&Uuml;': 'Ü',
  '&ccedil;': 'ç',
  '&Ccedil;': 'Ç',
  '&euro;': '€',
  '&pound;': '£',
  '&yen;': '¥',
  '&percnt;': '%',
};

/**
 * Decodes all HTML entities (decimal, hex, named, and nested/double-encoded).
 */
export function decodeHtmlEntities(input: string): string {
  if (!input) return '';
  let text = String(input);
  let prev = '';
  let iterations = 0;

  while (text !== prev && iterations < 3) {
    prev = text;
    iterations++;

    // 1. Decimal entities: &#237; -> í, &#250; -> ú, &#37; -> %
    text = text.replace(/&#(\d+);/g, (_, dec) => {
      try {
        const code = parseInt(dec, 10);
        return String.fromCharCode(code);
      } catch {
        return _;
      }
    });

    // 2. Hex entities: &#x00e9; -> é
    text = text.replace(/&#x([0-9a-fA-F]+);/g, (_, hex) => {
      try {
        const code = parseInt(hex, 16);
        return String.fromCharCode(code);
      } catch {
        return _;
      }
    });

    // 3. Named entities
    for (const [entity, char] of Object.entries(NAMED_ENTITIES)) {
      if (text.includes(entity)) {
        text = text.split(entity).join(char);
      }
    }
  }

  // Handle double-encoded entities like &#38;#37; -> %
  text = text.replace(/&#38;#(\d+);/g, (_, dec) => {
    try {
      return String.fromCharCode(parseInt(dec, 10));
    } catch {
      return _;
    }
  });

  return text.trim();
}

/**
 * Ensures any summary item (string, object, or nested) is converted to a clean, readable string
 * and never outputs "[object Object]".
 */
export function formatSummaryPoint(point: any): string {
  if (!point) return '';
  let str = '';

  if (typeof point === 'string') {
    str = point;
  } else if (typeof point === 'object') {
    // If it's an object with keys like text, point, summary, value
    str = point.text || point.point || point.summary || point.value || point['#text'] || '';
    if (!str) {
      const vals = Object.values(point).filter(v => typeof v === 'string');
      str = vals.join(' ');
    }
  } else {
    str = String(point);
  }

  str = str.replace(/\[object\s+Object\]/gi, '').trim();
  str = decodeHtmlEntities(str);
  return str;
}

/**
 * Cleans an entire summary array, removing invalid entries or objects.
 */
export function cleanSummaryArray(summary: any[] | undefined | null): string[] {
  if (!Array.isArray(summary)) return [];
  return summary
    .map(formatSummaryPoint)
    .filter(s => s && s.length > 5);
}
