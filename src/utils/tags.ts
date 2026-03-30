import type { CollectionEntry } from 'astro:content';

export type Post = CollectionEntry<'blog'>;

/**
 * Return a deduplicated, alphabetically sorted list of all tags
 * across the provided posts.
 *
 * @example
 * const tags = getAllTags(posts);  // ["Astro", "TypeScript", "Vue"]
 */
export function getAllTags(posts: Post[]): string[] {
  const tagSet = new Set<string>();
  for (const post of posts) {
    for (const tag of post.data.tags) {
      tagSet.add(tag);
    }
  }
  return Array.from(tagSet).sort((a, b) => a.localeCompare(b));
}

/**
 * Return a Map of tag → post count, sorted descending by count.
 *
 * Useful for rendering a tag cloud where popular tags appear more prominently.
 *
 * @example
 * const counts = getTagCounts(posts);
 * counts.get('TypeScript')  // 12
 */
export function getTagCounts(posts: Post[]): Map<string, number> {
  const counts = new Map<string, number>();
  for (const post of posts) {
    for (const tag of post.data.tags) {
      counts.set(tag, (counts.get(tag) ?? 0) + 1);
    }
  }

  // Sort by count descending, then alphabetically for ties
  return new Map(
    [...counts.entries()].sort(([aTag, aCount], [bTag, bCount]) => {
      if (bCount !== aCount) return bCount - aCount;
      return aTag.localeCompare(bTag);
    })
  );
}

/**
 * Return a deduplicated, count-sorted list of all tags from the given posts.
 * Similar to getAllTags but ordered by popularity instead of alphabet.
 *
 * @example
 * const popular = getTagsSortedByCount(posts);
 * // ["TypeScript", "Astro", "CSS", ...]
 */
export function getTagsSortedByCount(posts: Post[]): string[] {
  return Array.from(getTagCounts(posts).keys());
}

/**
 * Slugify a tag string into a URL-safe path segment.
 *
 * Rules:
 *   - Lowercased
 *   - Spaces and underscores replaced with hyphens
 *   - Characters that are not alphanumeric, hyphens, or CJK are removed
 *   - Leading / trailing hyphens stripped
 *
 * @example
 * tagToSlug('TypeScript')      // "typescript"
 * tagToSlug('Web Assembly')    // "web-assembly"
 * tagToSlug('C++')             // "c"
 * tagToSlug('前端开发')         // "前端开发"
 */
export function tagToSlug(tag: string): string {
  return tag
    .toLowerCase()
    .replace(/[\s_]+/g, '-')
    .replace(/[^a-z0-9\u4e00-\u9fff\u3400-\u4dbf-]/g, '')
    .replace(/^-+|-+$/g, '');
}

/**
 * Reverse of tagToSlug — given a URL slug, find the matching original tag
 * from a list of known tags. Returns undefined if no match is found.
 *
 * Because tagToSlug is lossy, this comparison is done case-insensitively
 * after re-slugifying each candidate tag.
 *
 * @example
 * slugToTag('typescript', ['TypeScript', 'Astro'])  // "TypeScript"
 */
export function slugToTag(slug: string, knownTags: string[]): string | undefined {
  return knownTags.find((tag) => tagToSlug(tag) === slug);
}
