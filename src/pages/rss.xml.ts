import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { SITE } from '../consts/site';
import type { APIContext } from 'astro';

/**
 * RSS Feed Endpoint — /rss.xml
 * ─────────────────────────────
 * Generates a valid RSS 2.0 feed from all published blog posts.
 *
 * The feed is auto-discovered by browsers and RSS readers via the
 * <link rel="alternate" type="application/rss+xml"> tag in BaseLayout.
 *
 * Cloudflare Pages serves this as a static file after build.
 * The Content-Type header (application/xml) is set automatically
 * by @astrojs/rss.
 *
 * Usage
 *   Subscribe at: https://blog.example.com/rss.xml
 */
export async function GET(context: APIContext) {
  const posts = await getCollection('blog', ({ data }) => !data.draft);

  // Sort newest first so RSS readers show the latest entry at the top
  const sorted = posts.sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf()
  );

  return rss({
    // Feed metadata
    title: SITE.title,
    description: SITE.description,
    site: context.site ?? SITE.url,

    // One <item> per published post
    items: sorted.map((post) => ({
      title: post.data.title,
      pubDate: post.data.pubDate,
      description: post.data.description,
      // Absolute link — context.site ensures the correct production base URL
      link: `/blog/${post.id}/`,
      // Include all tags as <category> elements
      categories: post.data.tags,
      // Author name in <author> element
      author: SITE.author,
    })),

    // Optional: <atom:link> self-reference improves feed validator compliance
    customData: `<language>${SITE.locale}</language>`,
  });
}
