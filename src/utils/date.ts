/**
 * Date utility functions
 * Used for formatting dates in post cards, article headers, and RSS feeds.
 */

/**
 * Format a Date object into a human-readable string.
 * Defaults to zh-CN locale: e.g. "2025年1月15日"
 *
 * @example
 * formatDate(new Date('2025-01-15'))        // "2025年1月15日"
 * formatDate(new Date('2025-01-15'), 'en')  // "January 15, 2025"
 */
export function formatDate(date: Date, locale = 'zh-CN'): string {
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
}

/**
 * Format a Date object as a compact numeric string.
 * Useful for secondary metadata where space is limited.
 *
 * @example
 * formatDateShort(new Date('2025-01-15'))  // "2025/01/15"
 */
export function formatDateShort(date: Date, locale = 'zh-CN'): string {
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(date);
}

/**
 * Return an ISO 8601 date string (YYYY-MM-DD) suitable for
 * <time datetime="..."> attributes and RSS pubDate fields.
 *
 * @example
 * toISODate(new Date('2025-01-15'))  // "2025-01-15"
 */
export function toISODate(date: Date): string {
  return date.toISOString().split('T')[0];
}

/**
 * Return the full ISO 8601 datetime string, used in sitemap
 * <lastmod> and structured data.
 *
 * @example
 * toISODateTime(new Date('2025-01-15T12:00:00Z'))
 * // "2025-01-15T12:00:00.000Z"
 */
export function toISODateTime(date: Date): string {
  return date.toISOString();
}
