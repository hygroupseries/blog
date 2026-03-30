import { getCollection } from 'astro:content';
import type { CollectionEntry } from 'astro:content';

export type Post = CollectionEntry<'blog'>;

/**
 * Return all blog posts, sorted by pubDate descending (newest first).
 *
 * In production builds, draft posts are excluded.
 * In development, draft posts are included so you can preview them.
 *
 * @example
 * const posts = await getAllPosts();
 */
export async function getAllPosts(): Promise<Post[]> {
  const posts = await getCollection('blog', ({ data }) => {
    return import.meta.env.PROD ? !data.draft : true;
  });

  return posts.sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf()
  );
}

/**
 * Return posts marked with `featured: true`, sorted by pubDate descending.
 * Used on the home page's featured section.
 *
 * @example
 * const featured = await getFeaturedPosts();
 */
export async function getFeaturedPosts(): Promise<Post[]> {
  const posts = await getAllPosts();
  return posts.filter((post) => post.data.featured);
}

/**
 * Return the N most recent published posts.
 * Useful for the home page "latest posts" section.
 *
 * @param count  Maximum number of posts to return (default: 5)
 *
 * @example
 * const latest = await getLatestPosts(5);
 */
export async function getLatestPosts(count = 5): Promise<Post[]> {
  const posts = await getAllPosts();
  return posts.slice(0, count);
}

/**
 * Return all posts that belong to a given tag (case-sensitive).
 *
 * @param tag  Tag string to filter by, e.g. "TypeScript"
 *
 * @example
 * const tsPosts = await getPostsByTag('TypeScript');
 */
export async function getPostsByTag(tag: string): Promise<Post[]> {
  const posts = await getAllPosts();
  return posts.filter((post) => post.data.tags.includes(tag));
}

/**
 * Return all posts that belong to the given series, sorted by
 * pubDate ascending (so series read in chronological order).
 *
 * @param series  Series name string, e.g. "博客搭建"
 */
export async function getPostsBySeries(series: string): Promise<Post[]> {
  const posts = await getAllPosts();
  return posts
    .filter((post) => post.data.series === series)
    .sort((a, b) => a.data.pubDate.valueOf() - b.data.pubDate.valueOf());
}

/**
 * Given a post, return { prev, next } neighbours from the full sorted list.
 * "prev" is the post published immediately before; "next" is immediately after.
 * Either can be undefined when the post is at the boundary of the list.
 *
 * @example
 * const { prev, next } = await getAdjacentPosts(post);
 */
export async function getAdjacentPosts(
  current: Post
): Promise<{ prev: Post | undefined; next: Post | undefined }> {
  const posts = await getAllPosts(); // newest first
  const index = posts.findIndex((p) => p.id === current.id);

  return {
    // "next" in reading order = older post = higher index in the sorted array
    next: index < posts.length - 1 ? posts[index + 1] : undefined,
    // "prev" in reading order = newer post = lower index in the sorted array
    prev: index > 0 ? posts[index - 1] : undefined,
  };
}
