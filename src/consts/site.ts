// Site-wide constants — update these before deploying
// -------------------------------------------------------
// SITE.url   must match the `site` field in astro.config.mjs
// SITE.name  is used in the HTML <title>, header, footer, and RSS feed

interface SiteConfig {
  /** Your name or pen name, shown in the header and <title> */
  name: string;
  /** Full page title when no article title is present */
  title: string;
  /** Default meta description for pages without their own description */
  description: string;
  /** Production URL — must end WITHOUT a trailing slash */
  url: string;
  /** Author name used in RSS feed and article meta */
  author: string;
  /** Author email (shown in footer / RSS) — set to '' to hide */
  email: string;
  /** GitHub profile URL — set to '' to hide */
  github: string;
  /** Twitter/X profile URL — set to '' to hide */
  twitter: string;
  /** Default locale for <html lang="..."> and date formatting */
  locale: string;
  /** How many posts to show on the home page's "latest" section */
  homePostCount: number;
}

export const SITE: SiteConfig = {
  name: 'hygroupseries',
  title: "hygroupseries's Blog",
  description: '技术思考、工程实践与个人笔记。',
  url: 'https://blog.qiaohaoyu.com',
  author: 'hygroupseries',
  email: '',
  github: 'https://github.com/hygroupseries',
  twitter: '',
  locale: 'zh-CN',
  homePostCount: 5,
};
