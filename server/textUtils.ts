/**
 * Server-side text sanitization and HTML entity decoder for El Faro Quisqueya.
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
 * Safely extracts raw text from unknown XML/JSON parsed structures (strings, nested objects, CDATA, etc.)
 * Prevents any "[object Object]" from ever entering the system.
 */
export function extractRawText(val: any): string {
  if (!val) return '';
  if (typeof val === 'string') return val;
  if (typeof val === 'number') return String(val);
  if (Array.isArray(val)) {
    return val.map(extractRawText).join(' ');
  }
  if (typeof val === 'object') {
    if (val['#text']) return extractRawText(val['#text']);
    if (val['_']) return extractRawText(val['_']);
    const pieces: string[] = [];
    for (const key of Object.keys(val)) {
      if (!key.startsWith('@_')) {
        pieces.push(extractRawText(val[key]));
      }
    }
    if (pieces.length > 0) {
      return pieces.join(' ');
    }
  }
  return '';
}

/**
 * Strips HTML tags, removes scripts/styles, strips "[object Object]", and decodes all HTML entities.
 */
export function cleanJournalisticText(raw: any): string {
  const extracted = extractRawText(raw);
  if (!extracted) return '';

  const stripped = extracted
    .replace(/<script[^>]*>([\S\s]*?)<\/script>/gim, '')
    .replace(/<style[^>]*>([\S\s]*?)<\/style>/gim, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\[object\s+Object\]/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  return decodeHtmlEntities(stripped);
}
