---
title: "Hello, World — 博客上线了"
description: "第一篇文章，用于验证博客的各项功能：代码高亮、目录、标签、阅读时长、深色模式。如果你能正常阅读这篇文章，说明一切运转正常。"
pubDate: 2025-01-15
tags: ["Astro", "TypeScript", "Blog"]
draft: false
featured: true
toc: true
lang: "zh-CN"
---

这是博客的第一篇文章，主要目的是验证渲染流水线的各个环节是否正常工作。如果你能看到格式正确的代码高亮、可点击的目录、以及 JetBrains Mono 字体，那么一切都就绪了。

## 为什么搭这个博客

写作对我来说是一种思考方式。把某个问题写清楚，意味着真正理解了它。

相比于各类内容平台，自建博客的好处是：

- 完全掌控内容格式与发布节奏
- 没有算法推荐的干扰，读者来了就是真的想看
- 可以长期积累，形成自己的知识体系
- 技术栈可以自己选，顺便练手

这个博客基于 [Astro](https://astro.build) 构建，部署在 Cloudflare Pages 上，源码托管于 GitHub。

## 技术栈一览

| 层级 | 选型 | 说明 |
|------|------|------|
| 框架 | Astro 6 | 静态优先，内容站点最佳选择 |
| 样式 | Tailwind CSS v4 | CSS-first 配置，无 `tailwind.config.js` |
| 代码字体 | JetBrains Mono | 通过 `@fontsource` 自托管 |
| 代码高亮 | Shiki（内置） | 双主题，随系统深色模式切换 |
| 部署 | Cloudflare Pages | 全球 CDN，静态资源无带宽限制 |

## 代码高亮测试

下面几个代码块用于验证 Shiki 高亮和 JetBrains Mono 字体是否正常渲染。

### TypeScript

```typescript
// Content Collections schema — src/content.config.ts
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog };
```

### Astro 组件

```astro
---
// PostCard.astro
import type { CollectionEntry } from 'astro:content';

interface Props {
  post: CollectionEntry<'blog'>;
}

const { post } = Astro.props;
const { title, description, pubDate, tags } = post.data;
---

<article class="py-8 border-b border-zinc-200 dark:border-zinc-800">
  <h2 class="text-xl font-semibold">
    <a href={`/blog/${post.id}`}>{title}</a>
  </h2>
  <p class="mt-2 text-zinc-600 dark:text-zinc-300">{description}</p>
</article>
```

### Bash / Shell

```bash
# 初始化项目并安装依赖
pnpm create astro@latest . --template empty --typescript strict

# 安装 Tailwind v4 vite 插件
pnpm add tailwindcss @tailwindcss/vite @tailwindcss/typography

# 安装字体
pnpm add @fontsource/jetbrains-mono

# 本地开发
pnpm dev
```

### CSS（Tailwind v4 配置风格）

```css
/* global.css — Tailwind v4 CSS-first 配置 */
@import 'tailwindcss';
@plugin '@tailwindcss/typography';

@theme {
  /* JetBrains Mono 作为全局等宽字体 */
  --font-mono: 'JetBrains Mono', ui-monospace, monospace;
}

@layer base {
  code, pre, kbd {
    font-family: var(--font-mono);
    font-feature-settings: 'liga' 1, 'calt' 1; /* 启用连字 */
  }
}
```

## 连字特性演示

JetBrains Mono 内置编程连字，以下字符序列在渲染时会合并为连字符号：

行内代码示例：`->` `=>` `===` `!==` `<=` `>=` `//` `/**` `*/`

这些连字纯粹是视觉效果，不影响复制粘贴的内容。如果你不喜欢，可以在 `global.css` 中关闭：

```css
code, pre {
  font-feature-settings: 'liga' 0, 'calt' 0;
  font-variant-ligatures: none;
}
```

## Markdown 特性测试

### 引用块

> 把某个问题写清楚，意味着真正理解了它。
>
> 写作是最好的调试方式。

### 任务列表

- [x] 初始化 Astro 项目
- [x] 配置 Tailwind CSS v4
- [x] 接入 JetBrains Mono 字体
- [x] 配置 Shiki 代码高亮
- [x] 部署到 Cloudflare Pages
- [ ] 接入 Pagefind 站内搜索
- [ ] 接入 Giscus 评论系统

### 删除线与强调

支持 **粗体**、*斜体*、~~删除线~~ 和 `行内代码`，这些都来自 GitHub Flavored Markdown（`remark-gfm`）。

### 水平分隔线

---

### 嵌套列表

1. 部署流程
   1. 推送代码到 GitHub
   2. Cloudflare Pages 自动触发构建
   3. `pnpm build` 生成静态文件到 `dist/`
   4. 发布到全球边缘节点
2. 更新流程
   - 修改 Markdown 文件
   - 提交并推送
   - 自动重新构建

## 下一步计划

MVP 上线后，计划按以下优先级补充功能：

1. **Pagefind 站内搜索** — 构建后生成索引，无需后端
2. **Giscus 评论系统** — 基于 GitHub Discussions，零 React 依赖
3. **项目展示页** — 与文章形成联动
4. **访客统计** — 接入 Umami，隐私友好

如果你正在看这篇文章，说明部署成功了。

欢迎通过 [GitHub](https://github.com/yourusername) 联系我，或者订阅 [RSS](/rss.xml) 保持关注。