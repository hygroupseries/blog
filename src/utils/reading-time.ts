/**
 * Reading time estimator for mixed Chinese / English content.
 *
 * Reference speeds:
 *   - English prose:   ~200 words / minute
 *   - Chinese prose:   ~400 characters / minute
 *
 * Code blocks are stripped before counting because readers scan
 * them rather than reading word-by-word.
 */

const EN_WPM = 200;
const ZH_CPM = 400;

/**
 * Strip fenced code blocks and inline code from a markdown string
 * so they don't inflate the word count.
 */
function stripCode(content: string): string {
  return content
    .replace(/```[\s\S]*?```/g, '')   // fenced blocks
    .replace(/`[^`]*`/g, '');         // inline code
}

/**
 * Count Chinese / CJK characters.
 * Range covers CJK Unified Ideographs + common extensions.
 */
function countCJK(text: string): number {
  return (text.match(/[\u4e00-\u9fff\u3400-\u4dbf\uf900-\ufaff]/g) ?? []).length;
}

/**
 * Count English words (sequences of word characters separated by
 * non-word boundaries — handles hyphenated words as two words).
 */
function countEnglishWords(text: string): number {
  return (text.match(/\b[a-zA-Z]+(?:'[a-zA-Z]+)*\b/g) ?? []).length;
}

/**
 * Return an estimated reading time string for the given raw
 * markdown body.
 *
 * @param body  Raw markdown / MDX source string
 * @returns     e.g. "3 分钟" or "1 分钟"
 *
 * @example
 * getReadingTime(post.body)  // "5 分钟"
 */
export function getReadingTime(body: string): string {
  const text = stripCode(body);
  const cjk = countCJK(text);
  const en = countEnglishWords(text);

  const minutes = Math.ceil(en / EN_WPM + cjk / ZH_CPM);

  return `${Math.max(1, minutes)} 分钟`;
}

/**
 * Return the raw estimated minute count as a number.
 * Useful when you need to do arithmetic (e.g. for structured data).
 */
export function getReadingMinutes(body: string): number {
  const text = stripCode(body);
  const cjk = countCJK(text);
  const en = countEnglishWords(text);
  return Math.max(1, Math.ceil(en / EN_WPM + cjk / ZH_CPM));
}
