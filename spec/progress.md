# progress.md — 开发进度追踪

本文件记录博客项目的实现进度，供跨 session 快速恢复上下文使用。

---

## 当前状态

**阶段**：阶段一（项目底座）✅ 完成，等待开发者本地预览确认
**最后更新**：阶段一完成

---

## 核心决策（已确认）

| 决策项 | 结论 |
|--------|------|
| 框架 | Astro **6.1.1**（静态输出，`output: 'static'`） |
| 语言 | TypeScript strict 模式 |
| 样式 | Tailwind CSS **v4.2.2** — CSS-first，通过 `@tailwindcss/vite` 集成（无 `tailwind.config.js`） |
| 排版插件 | `@tailwindcss/typography 0.5.19`，通过 `@plugin` 指令在 CSS 中加载 |
| 代码字体 | JetBrains Mono **5.2.8**，`@fontsource/jetbrains-mono` 自托管，通过 `@theme { --font-mono }` 注册 |
| 内容 | Markdown + MDX，Astro **Content Layer API**（`src/content.config.ts` + glob loader） |
| Schema | `import { z } from 'zod'`（Zod **4.3.6**，直接导入，不用已弃用的 `astro:content` 再导出） |
| 代码高亮 | Shiki（Astro 内置），双主题 `github-light` / `github-dark`，随系统深色模式切换 |
| 搜索 | Pagefind **1.4.0**（第一轮增强） |
| 评论 | Giscus 原生 script（零 React 依赖，第一轮增强） |
| 部署 | Cloudflare Pages |
| 域名 | blog.<yourdomain>，Cloudflare DNS CNAME 指向 pages.dev |
| 统计 | Umami（第二阶段） |

---

## Spec 文件索引

| 文件 | 状态 | 内容摘要 |
|------|------|---------|
| `spec/00_architecture.md` | ✅ 完成 | 架构总览、与原规划的差异、关键决策 |
| `spec/01_dependencies.md` | ✅ 完成 | 更新后的依赖清单（注：实际使用 Tailwind v4 + @tailwindcss/vite，与 spec/01 中的 @astrojs/tailwind 方案不同） |
| `spec/02_font_setup.md` | ✅ 完成 | JetBrains Mono 字体配置方案（实现与 spec 一致，改用 @theme 注册） |
| `spec/03_cloudflare_setup.md` | ✅ 完成 | Cloudflare Pages 部署与域名配置 |
| `spec/progress.md` | ✅ 本文件 | 进度追踪 |

原始规划文件（参考，不再修改）：

| 文件 | 说明 |
|------|------|
| `PROJECT_PLAN.md` | 原始技术方案（主体方向正确，部分细节已被 spec 覆盖） |
| `docs/DEPENDENCIES.md` | 原始依赖清单（已被 spec/01 取代） |
| `docs/FRONTMATTER_SPEC.md` | Frontmatter 字段规范（仍有效，无需修改） |
| `docs/WRITING_GUIDE.md` | 写作规范（仍有效，无需修改） |
| `templates/post-template.md` | 文章模板（仍有效，无需修改） |

---

## 实现阶段与任务

### 阶段一：项目底座
**目标**：项目可运行，可读取渲染文章

- [x] 初始化项目目录结构（手动创建，Astro 6 无法在非空目录用交互式 CLI）
- [x] 安装所有 MVP 依赖（`pnpm install`，镜像源改为 npmmirror 解决国内网络问题）
- [x] 配置 `astro.config.mjs`（site、output: static、mdx + sitemap 集成、Shiki 双主题、rehype-slug + rehype-autolink-headings、remark-gfm）
- [x] 配置 Tailwind v4（`@tailwindcss/vite` Vite 插件，无 tailwind.config.js）
- [x] 创建 `src/styles/global.css`（@fontsource 导入、@import tailwindcss、@plugin typography、@theme --font-mono、Shiki 双主题 CSS、代码块样式、heading anchor 样式）
- [x] 建立 Content Layer（`src/content.config.ts`，glob loader，Zod v4 schema）
- [x] 定义站点常量（`src/consts/site.ts`，SiteConfig 接口类型）
- [x] 创建 `src/env.d.ts`
- [x] 创建工具函数（`date.ts`、`reading-time.ts`、`content.ts`、`tags.ts`）
- [x] 创建 BaseLayout.astro（完整 SEO meta、OG、Twitter Card、RSS 自动发现）
- [x] 创建 PostLayout.astro（文章头部、TOC、prose 排版、上下篇导航）
- [x] 创建 Header.astro（粘性导航、active link 检测、backdrop-blur）
- [x] 创建 Footer.astro（版权、社交链接、RSS）
- [x] 创建 UI 组件（Container、PostCard、TagList、TOC）
- [x] 写测试文章 `hello-world.md`（验证代码高亮、连字、表格、任务列表）
- [x] `pnpm build` — **9 页面零错误生成**（含 sitemap、RSS）
- [x] `pnpm check` — **0 errors，0 warnings**（修复了 `as const` 类型收窄 bug 和 `z` 弃用警告）

### 阶段二：核心页面
**目标**：完整站点结构可浏览

- [x] 首页 `src/pages/index.astro`（Hero、精选文章、最新文章、标签入口）
- [x] 博客列表页 `src/pages/blog/index.astro`（按年份分组，文章计数）
- [x] 文章详情页 `src/pages/blog/[slug].astro`（Content Layer render()、prev/next 导航）
- [x] About 页 `src/pages/about.astro`（占位内容，待用户填写）
- [x] 标签总览页 `src/pages/tags/index.astro`（标签 + 文章数，网格布局）
- [x] 标签详情页 `src/pages/tags/[tag].astro`（tagToSlug / slugToTag 双向映射）
- [x] 404 页面 `src/pages/404.astro`
- [x] RSS 端点 `src/pages/rss.xml.ts`

### 阶段三：阅读体验增强
**目标**：技术博客体验达到可上线标准

- [x] 代码块高亮（Shiki 双主题，OS 深色模式自动切换，CSS 变量方案）
- [x] 标题锚点（rehype-slug + rehype-autolink-headings append 模式，hover 显示 `#`）
- [x] 文章目录组件（TOC.astro，过滤 h2/h3，自动剥离锚点符号）
- [x] 阅读时长估算（中英文混合计算，CJK 400字/分钟，英文 200词/分钟）
- [x] 上一篇 / 下一篇导航（PostLayout 底部，`getAdjacentPosts` 工具函数）
- [x] 深色模式支持（`prefers-color-scheme` 纯 CSS 方案，零 JS，无闪烁）
- [x] 响应式适配（max-w-3xl 容器，sm/lg 断点，移动端导航）
- [ ] 代码块复制按钮（第二阶段，需要少量 JS）
- [ ] 文章排版微调（待本地预览后按需调整）

### 阶段四：上线准备
**目标**：可正式上线的 MVP

- [x] RSS 输出（`src/pages/rss.xml.ts`，含 categories + language customData）
- [x] Sitemap（`@astrojs/sitemap` 集成，构建后自动生成 `sitemap-index.xml`）
- [x] SEO meta（BaseLayout 内联，title + description + canonical + OG + Twitter Card）
- [x] robots.txt（`public/robots.txt`）
- [x] favicon（`public/favicon.svg`，SVG 格式，终端风格 `>_` 图标）
- [x] `public/_headers`（安全响应头 + `/_astro/*` 长期缓存头）
- [ ] **⚠️ 待操作**：修改 `src/consts/site.ts` 填写真实姓名、域名、GitHub 链接
- [ ] **⚠️ 待操作**：修改 `astro.config.mjs` 将 `site` 改为真实生产域名
- [ ] **⚠️ 待操作**：修改 `public/robots.txt` 中的 sitemap URL
- [ ] 初始化 Git 仓库并推送到 GitHub
- [ ] 在 Cloudflare Pages 创建项目并连接 Git 仓库
- [ ] 配置构建设置（pnpm build、dist、`NODE_VERSION=20`）
- [ ] 配置自定义域名 `blog.<yourdomain>`
- [ ] 部署后验证清单（见 spec/03 第 10 节）

### 第一轮增强（上线后）

- [ ] Pagefind 站内搜索接入（`pnpm add -D pagefind` 已完成，build 脚本改为 `astro build && pagefind --site dist`）
- [ ] Giscus 评论组件（原生 script 方案，见 spec/01 第 3.2 节）
- [ ] 代码块复制按钮（少量 inline script，无框架依赖）
- [ ] 项目展示页 `src/pages/projects.astro`
- [ ] 阅读量统计或访客统计（Umami）

### 第二阶段（按需）

- [ ] OG 图片动态生成（satori + sharp）
- [ ] 数学公式支持（remark-math + rehype-katex）
- [ ] Mermaid 图表支持
- [ ] 系列文章页
- [ ] ESLint 接入

---

## 实际已生成的目录结构

```
/
├─ public/
│  ├─ favicon.svg          ✅
│  ├─ _headers             ✅
│  └─ robots.txt           ✅
├─ src/
│  ├─ components/
│  │  ├─ blog/
│  │  │  ├─ PostCard.astro ✅
│  │  │  ├─ TagList.astro  ✅
│  │  │  └─ TOC.astro      ✅
│  │  ├─ layout/
│  │  │  ├─ Header.astro   ✅
│  │  │  └─ Footer.astro   ✅
│  │  └─ ui/
│  │     └─ Container.astro ✅
│  ├─ content/
│  │  └─ blog/
│  │     └─ hello-world.md  ✅  (测试文章)
│  ├─ content.config.ts    ✅  (Content Layer API，位于 src/ 根，非 src/content/)
│  ├─ env.d.ts             ✅
│  ├─ layouts/
│  │  ├─ BaseLayout.astro  ✅
│  │  └─ PostLayout.astro  ✅
│  ├─ pages/
│  │  ├─ index.astro       ✅
│  │  ├─ about.astro       ✅
│  │  ├─ 404.astro         ✅
│  │  ├─ rss.xml.ts        ✅
│  │  ├─ blog/
│  │  │  ├─ index.astro    ✅
│  │  │  └─ [slug].astro   ✅
│  │  └─ tags/
│  │     ├─ index.astro    ✅
│  │     └─ [tag].astro    ✅
│  ├─ styles/
│  │  └─ global.css        ✅  (Tailwind v4 CSS-first，含字体、Shiki、heading anchor)
│  ├─ utils/
│  │  ├─ content.ts        ✅
│  │  ├─ date.ts           ✅
│  │  ├─ tags.ts           ✅
│  │  └─ reading-time.ts   ✅
│  └─ consts/
│     └─ site.ts           ✅
├─ astro.config.mjs        ✅  (无 tailwind.config.mjs — Tailwind v4 CSS-first)
├─ tsconfig.json           ✅
├─ .npmrc                  ✅
├─ .prettierrc             ✅
└─ package.json            ✅  (含 pnpm.onlyBuiltDependencies)
```

---

## 关键配置备忘

### astro.config.mjs（已实现）
- `site`: 占位 `https://blog.example.com`，**上线前必须改为真实域名**
- `output: 'static'`：纯静态输出，Cloudflare Pages 无需适配器
- `integrations`: `mdx()` + `sitemap()`（无 tailwind 集成——Tailwind v4 通过 vite.plugins 接入）
- `vite.plugins`: `[tailwindcss()]`（来自 `@tailwindcss/vite`）
- `markdown.shikiConfig.themes`: `{ light: 'github-light', dark: 'github-dark' }`
- `markdown.shikiConfig.wrap`: `true`
- rehype/remark 插件：rehype-slug、rehype-autolink-headings（append 模式）、remark-gfm

### global.css（已实现，Tailwind v4 CSS-first）
- `@import '@fontsource/jetbrains-mono/400.css'` 等（字体先于 tailwindcss 导入）
- `@import 'tailwindcss'`（替代旧的 @tailwind base/components/utilities 三条指令）
- `@plugin '@tailwindcss/typography'`（替代旧的 require() 方式）
- `@theme { --font-mono: 'JetBrains Mono', ... }`（替代旧的 tailwind.config fontFamily 配置）
- Shiki 双主题 CSS：`pre.astro-code` 默认 light，`@media (prefers-color-scheme: dark)` 切 dark
- `.prose code::before/after { content: '' }` 消除排版插件默认反引号

### public/_headers（已实现）
- 安全头（X-Frame-Options、X-Content-Type-Options 等）
- `/_astro/*` 和 `/*.js`、`/*.css` 长期缓存（immutable）

---

## 注意事项与已知决策

1. **`@astrojs/tailwind` 不兼容 Astro 6**：其 peer deps 仅到 Astro 5；改用 `@tailwindcss/vite` 原生集成
2. **Tailwind v4 无 tailwind.config.js**：所有配置（字体、插件、主题）全部在 CSS 中完成
3. **Content Layer API**：`src/content.config.ts`（注意：不是 `src/content/config.ts`）；`render()` 从 `astro:content` 独立导入
4. **`z` 从 `zod` 直接导入**：`astro:content` 的 `z` 再导出在 Astro 6 已弃用，改为 `import { z } from 'zod'`
5. **`SITE` 不用 `as const`**：改用显式 `SiteConfig` 接口，避免字面量类型导致 TypeScript 将条件渲染收窄为 `never`
6. **Shiki 深色模式**：采用 CSS 变量 + `@media (prefers-color-scheme: dark)` 纯 CSS 方案，零 JS，无 FOUC
7. **不安装 `@astrojs/cloudflare`**：仅 SSR 需要；纯静态无需适配器
8. **不安装 `@giscus/react`**：用原生 `<script>` 方案替代，零 React 依赖
9. **`NODE_VERSION=20`**：Cloudflare Pages 部署时必须在环境变量中设置
10. **pnpm 国内镜像**：已设置 `https://registry.npmmirror.com`，后续 `pnpm install` 速度正常

---

## 会话恢复指引

如果新会话需要恢复上下文，按以下顺序阅读：

1. `spec/progress.md`（本文件）— 了解当前状态和已完成的任务
2. `spec/00_architecture.md` — 了解核心技术决策（注意：实际技术栈与 spec/01 有出入，以 progress.md 为准）
3. `astro.config.mjs` — 查看实际生效的构建配置
4. `src/styles/global.css` — 查看实际生效的 Tailwind v4 + 字体 + Shiki CSS 配置
5. `PROJECT_PLAN.md` — 了解原始规划背景（页面结构、内容模型部分仍有效）
6. `docs/FRONTMATTER_SPEC.md` — 文章 frontmatter 规范（与已实现的 schema 基本一致）

## 下一步操作（开发者需执行）

在启动本地预览或部署前，请先完成以下必填项：

### 1. 修改站点信息（`src/consts/site.ts`）
```ts
name: '你的真实姓名或笔名',
title: "你的名字's Blog",
description: '一句话描述你的博客',
url: 'https://blog.yourdomain.com',   // 与 astro.config.mjs site 字段保持一致
author: '你的姓名',
email: 'you@example.com',             // 不想显示则留空 ''
github: 'https://github.com/你的用户名',
twitter: '',                          // 没有 Twitter 则留空 ''
```

### 2. 修改构建域名（`astro.config.mjs`）
```js
site: 'https://blog.yourdomain.com',  // 替换 example.com
```

### 3. 修改 robots.txt（`public/robots.txt`）
```
Sitemap: https://blog.yourdomain.com/sitemap-index.xml
```

### 4. 本地预览
```bash
pnpm dev
# 访问 http://localhost:4321
```

### 5. 修改 About 页（`src/pages/about.astro`）
将占位内容替换为真实的个人介绍。