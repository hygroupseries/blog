# 00 - 架构总览与核心决策

本文档是整个项目的顶层规划，记录最终确认的技术选型与关键调整理由。

## 1. 项目定位

纯前端技术向个人博客，以文字和代码内容为主，长期可维护，部署在 Cloudflare 上，通过自定义二级域名 `blog.<yourdomain>` 访问。

核心诉求：
- 页面清晰，以文字和代码为核心阅读对象
- 代码字体统一使用 JetBrains Mono（Nerd Font 变体，自托管）
- 轻量化，尽量减少客户端 JavaScript
- 纯静态输出，适合 Cloudflare Pages 托管
- SEO 友好，首屏快
- 写作体验好，使用 Markdown / MDX

---

## 2. 最终技术栈

| 层级 | 选型 | 说明 |
|------|------|------|
| 框架 | Astro | 静态优先，内容站点最佳选择 |
| 语言 | TypeScript (strict) | 类型安全，长期维护友好 |
| 样式 | Tailwind CSS v3 | 原子化，快速搭建 |
| 排版 | @tailwindcss/typography | 文章 prose 样式，文字博客必备 |
| 代码字体 | JetBrains Mono（自托管） | 通过 @fontsource/jetbrains-mono 引入 |
| 内容 | Markdown + MDX | Astro Content Collections 管理 |
| 代码高亮 | Shiki（Astro 内置） | 无需额外安装，配置主题即可 |
| 搜索 | Pagefind | 纯静态全文搜索，构建后生成索引 |
| 评论 | Giscus（原生脚本） | 直接嵌入 script，不引入 React |
| 部署 | Cloudflare Pages | 全球 CDN，静态资源分发优秀 |
| 域名 | blog.<yourdomain> | Cloudflare DNS 配置 CNAME |
| SEO | Astro Sitemap + RSS + OG | 内置 + 集成插件 |
| 统计 | Umami（可选，第二阶段） | 自托管或 Umami Cloud，隐私友好 |

---

## 3. 与原规划的关键差异

### 3.1 部署平台：Cloudflare Pages（而非 Vercel）

原规划推荐 Vercel，但你明确指定 Cloudflare。两者对纯静态 Astro 站都支持良好，调整如下：

- Astro 使用默认 `output: 'static'`，**无需安装 `@astrojs/cloudflare` 适配器**（该适配器仅用于 SSR）
- 构建产物目录：`dist/`
- Cloudflare Pages 构建命令：`pnpm build`
- 本地开发仍使用 `astro dev`，无需 `wrangler` 模拟（静态站不依赖 Worker 运行时）
- 安全响应头通过 `public/_headers` 文件配置（Cloudflare Pages 原生支持）

### 3.2 代码字体：JetBrains Mono 自托管

原规划未涉及字体方案，新增如下决策：

- 使用 `@fontsource/jetbrains-mono` npm 包自托管字体
- 自托管相比 Google Fonts CDN：减少一次外部 DNS 解析，对 Cloudflare 静态托管更友好
- "Nerd Font" 变体中的图标字形（Powerline 符号、Dev Icons 等）属于终端字体扩展，**不适合 Web 渲染**，在浏览器中不会被激活
- 因此 Web 端直接使用标准 JetBrains Mono，视觉效果与 Nerd Font 在代码字符上完全一致
- 字体仅应用于 `code`、`pre`、`kbd` 元素，不影响正文阅读字体

### 3.3 评论系统：去除 React 依赖

原规划使用 `@giscus/react`，会引入整个 React 运行时，与轻量化目标相悖。调整为：

- 创建原生 `.astro` 组件直接嵌入 Giscus `<script>` 标签
- 彻底消除 React 依赖
- 功能完全一致，且对 Cloudflare Pages 静态资源更友好

### 3.4 Shiki 无需单独安装

原规划将 Shiki 列为独立依赖，实际上 Astro 从 v3 起已内置 Shiki，只需在 `astro.config.mjs` 中配置主题即可。

### 3.5 新增 @tailwindcss/typography

原规划遗漏了这个关键依赖。文字为主的博客，文章正文的排版样式（标题、段落、引用、表格、列表间距）强烈依赖 `@tailwindcss/typography` 提供的 `prose` class，否则需要大量手写 prose 样式。

---

## 4. 不引入的内容（保持轻量）

以下内容在 MVP 阶段主动排除：

| 排除项 | 原因 |
|--------|------|
| React / Vue / Svelte 岛组件 | MVP 阶段不需要重型交互，纯 Astro 组件足够 |
| `@giscus/react` | 用原生 script 替代 |
| `satori` + `sharp`（OG 图生成） | 第二阶段，构建时生成，需要 Node.js 环境 |
| `mermaid` | 第二阶段，按需引入 |
| `remark-math` + `rehype-katex` | 第二阶段，按需引入 |
| Umami / Plausible 统计 | 第二阶段，站点稳定后接入 |
| ESLint | 第一版先用 Prettier + `astro check` |

---

## 5. 域名配置方案

在 Cloudflare DNS 中配置：

1. 前往 Cloudflare Dashboard → 你的域名 → DNS 记录
2. 添加 CNAME 记录：
   - 名称：`blog`
   - 目标：`<your-project>.pages.dev`
   - 代理状态：已代理（橙色云）
3. 在 Cloudflare Pages 项目设置中，Custom Domains 添加 `blog.<yourdomain>`
4. Cloudflare 自动签发并续签 SSL 证书

---

## 6. Cloudflare Pages 构建配置

在 Pages 项目设置中：

```
Framework preset: Astro
Build command:    pnpm build
Build output:     dist
Root directory:   / （或你的仓库根目录）
Node.js version:  20
```

环境变量在 Pages → Settings → Environment Variables 中配置（如 `SITE_URL`）。

---

## 7. 安全响应头

在 `public/_headers` 文件中配置，Cloudflare Pages 静态部署时自动注入：

```
/*
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=()
```

---

## 8. 输出模式确认

```js
// astro.config.mjs
export default defineConfig({
  output: 'static',   // 默认值，纯静态输出，无需适配器
  site: 'https://blog.<yourdomain>',
  // ...
})
```

`site` 字段对 Sitemap、RSS、OG 绝对路径生成至关重要，必须在初始化时设置为最终域名。

---

## 9. 相关 Spec 文件索引

| 文件 | 内容 |
|------|------|
| `01_dependencies.md` | 更新后的依赖清单与安装命令 |
| `02_font_setup.md` | JetBrains Mono 字体配置详细方案 |
| `03_cloudflare_setup.md` | Cloudflare Pages 部署与域名配置 |
| `04_project_structure.md` | 目录结构与组件分层 |
| `05_content_model.md` | Content Collections schema 设计 |
| `progress.md` | 开发进度追踪 |