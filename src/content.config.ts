import { defineCollection } from 'astro:content';
import { z } from 'zod';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: z.object({
    /** Article title — shown in <h1>, <title>, and post cards */
    title: z.string(),

    /** Short summary — used in post cards, SEO description, and RSS */
    description: z.string(),

    /** First publish date */
    pubDate: z.coerce.date(),

    /** Last updated date — set when content changes meaningfully */
    updatedDate: z.coerce.date().optional(),

    /** Topic tags — 2–5 recommended, use consistent casing */
    tags: z.array(z.string()).default([]),

    /** When true, the post is excluded from production builds */
    draft: z.boolean().default(false),

    /** When true, the post appears in the home page featured section */
    featured: z.boolean().default(false),

    /** Series name — groups related multi-part posts */
    series: z.string().optional(),

    /** Cover image path relative to /public — used in OG and hero */
    heroImage: z.string().optional(),

    /** Explicit canonical URL — overrides the auto-generated one */
    canonicalURL: z.string().optional(),

    /** Whether to render the table of contents on the article page */
    toc: z.boolean().default(true),

    /** BCP 47 language tag — used in <html lang="..."> for the article */
    lang: z.string().default('zh-CN'),
  }),
});

export const collections = { blog };
