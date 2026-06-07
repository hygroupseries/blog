# 04 - SEO 配置与发布检查

本文档记录博客当前的技术 SEO 实现，以及新增文章和上线后的检查要求。

## 已实现

- 所有页面输出唯一的 title、description 和 canonical URL
- 首页输出 `WebSite` JSON-LD
- 文章页输出 `BlogPosting` JSON-LD
- 文章页输出发布时间、更新时间、作者和标签 Open Graph metadata
- 默认分享图为 `/og-default.png`，尺寸为 1200 x 630
- 空 `heroImage` 和无效 `canonicalURL` 会在内容校验阶段失败
- 404 页面输出 `noindex, follow`
- Sitemap、RSS 和 robots.txt 使用 `https://blog.qiaohaoyu.tech`

## 文章 Frontmatter 约定

- `title` 应清楚描述文章解决的问题
- `description` 应独立概括文章内容，避免与标题完全重复
- `updatedDate` 仅在内容有实质更新时修改
- 没有文章专属图片时，省略 `heroImage`，不要填写空字符串
- 原创文章通常省略 `canonicalURL`
- 转载或迁移内容需要填写有效的绝对 canonical URL

## 上线后检查

1. 在 Google Search Console 验证 `qiaohaoyu.tech`
2. 提交 `https://blog.qiaohaoyu.tech/sitemap-index.xml`
3. 使用 URL Inspection 请求索引首页和重要文章
4. 使用 Google Rich Results Test 验证文章结构化数据
5. 检查分享卡片是否正确显示 1200 x 630 图片

## Sitemap 更新时间

当前 Sitemap 不输出 `lastmod`。`@astrojs/sitemap` 无法直接读取每篇文章的 frontmatter
更新时间；统一写入构建时间会产生误导，因此暂不添加。未来若实现自定义 Sitemap，应使用每篇文章的
`updatedDate ?? pubDate` 作为真实更新时间。
