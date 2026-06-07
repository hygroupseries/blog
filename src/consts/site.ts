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
  /** GitHub repo used by Giscus comments, formatted as owner/repo */
  giscusRepo: string;
  /** GitHub repository node ID from https://giscus.app */
  giscusRepoId: string;
  /** GitHub Discussions category name used by Giscus */
  giscusCategory: string;
  /** GitHub Discussions category node ID from https://giscus.app */
  giscusCategoryId: string;
}

export const SITE: SiteConfig = {
  name: 'hygroupseries',
  title: "hygroupseries's Blog",
  description: '技术思考、工程实践与个人笔记。',
  url: 'https://blog.qiaohaoyu.tech',
  author: 'hygroupseries',
  email: '',
  github: 'https://github.com/hygroupseries',
  twitter: '',
  locale: 'zh-CN',
  homePostCount: 5,
  giscusRepo: 'hygroupseries/blog',
  giscusRepoId: 'R_kgDOR0011w',
  giscusCategory: 'Announcements',
  giscusCategoryId: 'DIC_kwDOR001184C9_nK',
};
