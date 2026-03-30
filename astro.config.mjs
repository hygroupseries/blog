// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import remarkGfm from 'remark-gfm';

// https://astro.build/config
export default defineConfig({
  // Replace with your actual production domain
  site: 'https://blog.qiaohaoyu.com',

  // Pure static output — no adapter needed for Cloudflare Pages
  output: 'static',

  integrations: [mdx(), sitemap()],

  vite: {
    plugins: [tailwindcss()],
  },

  markdown: {
    // Shiki is built into Astro — no separate install needed
    shikiConfig: {
      themes: {
        light: 'github-light',
        dark: 'github-dark',
      },
      // Prevent horizontal overflow in code blocks
      wrap: true,
    },
    rehypePlugins: [
      // Add id attributes to headings
      rehypeSlug,
      // Append anchor links to headings
      [
        rehypeAutolinkHeadings,
        {
          behavior: 'append',
          properties: {
            class: 'heading-anchor',
            ariaHidden: 'true',
            tabIndex: -1,
          },
          content: {
            type: 'element',
            tagName: 'span',
            properties: { ariaHidden: 'true' },
            children: [{ type: 'text', value: '#' }],
          },
        },
      ],
    ],
    remarkPlugins: [
      // GitHub Flavored Markdown: tables, strikethrough, task lists, etc.
      remarkGfm,
    ],
  },
});
