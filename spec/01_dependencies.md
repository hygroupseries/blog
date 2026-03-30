# 01 - 依赖清单（已针对 Cloudflare 与轻量化调整）

本文档是 `docs/DEPENDENCIES.md` 的修订版，反映以下调整：
- 部署目标改为 Cloudflare Pages（纯静态输出）
- 代码字体改为 @fontsource/jetbrains-mono 自托管
- 评论系统改为原生 Giscus script，移除 React 依赖
- 新增 @tailwindcss/typography（文字博客必备）
- 明确 Shiki 已内置于 Astro，无需单独安装
- 精简掉 MVP 阶段不需要的依赖

---

## 1. 依赖分层

| 层级 | 说明 |
|------|------|
| MVP 必需 | 项目跑通、内容可发布、可上线的最小依赖集 |
| 第一轮增强 | 上线后优先补强的功能依赖 |
| 工程质量 | 代码规范与检查工具 |
| 第二阶段 | 内容扩展与高级功能，按需引入 |

---

## 2. MVP 必需依赖

### 2.1 运行依赖

```bash
pnpm add \
  @astrojs/mdx \
  @astrojs/rss \
  @astrojs/sitemap \
  @astrojs/tailwind \
  @fontsource/jetbrains-mono \
  rehype-slug \
  rehype-autolink-headings \
  remark-gfm
```

| 包名 | 用途 |
|------|------|
| `@astrojs/mdx` | MDX 支持，文章中嵌入组件 |
| `@astrojs/rss` | RSS 订阅输出 |
| `@astrojs/sitemap` | 自动生成 sitemap.xml |
| `@astrojs/tailwind` | Tailwind CSS v3 集成 |
| `@fontsource/jetbrains-mono` | JetBrains Mono 字体自托管，用于代码块 |
| `rehype-slug` | 为标题自动生成锚点 id |
| `rehype-autolink-headings` | 标题添加可链接的 # 符号 |
| `remark-gfm` | GitHub Flavored Markdown 扩展（表格、删除线等） |

### 2.2 开发依赖

```bash
pnpm add -D \
  tailwindcss \
  @tailwindcss/typography \
  typescript \
  prettier \
  prettier-plugin-astro \
  prettier-plugin-tailwindcss
```

| 包名 | 用途 |
|------|------|
| `tailwindcss` | Tailwind CSS 核心（v3） |
| `@tailwindcss/typography` | `prose` 样式插件，文字博客核心排版依赖 |
| `typescript` | TypeScript 编译器 |
| `prettier` | 代码格式化 |
| `prettier-plugin-astro` | Astro 文件 Prettier 支持 |
| `prettier-plugin-tailwindcss` | Tailwind class 自动排序 |

### 2.3 不需要单独安装的内置能力

以下功能 Astro 已内置，**无需安装额外包**：

| 能力 | 说明 |
|------|------|
| Shiki 代码高亮 | Astro v3+ 内置，在 `astro.config.mjs` 的 `markdown.shikiConfig` 中配置主题即可 |
| TypeScript 支持 | Astro 原生支持，无需额外配置 |
| 图片优化 | `<Image />` 组件内置，无需 Sharp（构建时 Cloudflare Pages 环境会处理） |

---

## 3. 第一轮增强依赖（上线后优先补充）

### 3.1 站内搜索

```bash
pnpm add -D pagefind
```

| 包名 | 用途 |
|------|------|
| `pagefind` | 纯静态全文搜索，构建后生成索引，无需后端 |

集成后构建脚本改为：

```json
{
  "scripts": {
    "build": "astro build && pagefind --site dist"
  }
}
```

### 3.2 评论系统

**不安装 `@giscus/react`**，改为在 `.astro` 组件中直接嵌入 Giscus script：

```astro
---
// src/components/blog/Comments.astro
// 无需任何 import，直接输出 script 标签
---
<script
  src="https://giscus.app/client.js"
  data-repo="your-username/your-repo"
  data-repo-id="your-repo-id"
  data-category="Announcements"
  data-category-id="your-category-id"
  data-mapping="pathname"
  data-strict="0"
  data-reactions-enabled="1"
  data-emit-metadata="0"
  data-input-position="bottom"
  data-theme="preferred_color_scheme"
  data-lang="zh-CN"
  crossorigin="anonymous"
  async
></script>
```

优点：
- 零 JavaScript 框架依赖（不引入 React）
- 功能与 `@giscus/react` 完全一致
- 文件体积更小

---

## 4. 工程质量依赖（第一版跑通后补充）

```bash
pnpm add -D \
  eslint \
  eslint-plugin-astro \
  @typescript-eslint/parser \
  @typescript-eslint/eslint-plugin
```

MVP 阶段可以先跳过，仅使用 `prettier` 和 `astro check` 保证基本质量。

---

## 5. 第二阶段依赖（按需引入）

| 包名 | 用途 | 引入时机 |
|------|------|---------|
| `remark-math` + `rehype-katex` | 数学公式渲染 | 有数学内容需求时 |
| `mermaid` | 流程图 / 架构图 | 有图表内容需求时 |
| `satori` + `sharp` | 构建时动态生成 OG 图片 | 第二阶段，提升社交分享效果 |

> **注意**：`satori` 和 `sharp` 在 Cloudflare Pages 构建环境（Node.js）下可以正常使用，它们在构建阶段运行，不在边缘运行时执行。

---

## 6. 明确不引入的包

| 包名 | 原因 |
|------|------|
| `@giscus/react` | 引入 React 运行时，与轻量化目标冲突，用原生 script 替代 |
| `@astrojs/react` / `@astrojs/vue` | MVP 阶段无重型交互需求 |
| `@astrojs/cloudflare` | 仅 SSR 模式需要；纯静态输出不需要适配器 |
| `shiki` | Astro 内置，无需单独安装 |

---

## 7. 完整 MVP 安装命令（一次执行）

```bash
# 初始化项目
pnpm create astro@latest . -- --template empty --typescript strict --install --git

# 运行依赖
pnpm add \
  @astrojs/mdx \
  @astrojs/rss \
  @astrojs/sitemap \
  @astrojs/tailwind \
  @fontsource/jetbrains-mono \
  rehype-slug \
  rehype-autolink-headings \
  remark-gfm

# 开发依赖
pnpm add -D \
  tailwindcss \
  @tailwindcss/typography \
  typescript \
  prettier \
  prettier-plugin-astro \
  prettier-plugin-tailwindcss
```

---

## 8. 推荐 package.json scripts

```json
{
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview",
    "check": "astro check",
    "format": "prettier --write ."
  }
}
```

接入 Pagefind 后更新 build 脚本：

```json
{
  "scripts": {
    "build": "astro build && pagefind --site dist"
  }
}
```

---

## 9. Node.js 版本要求

- 推荐：Node.js 20 LTS（与 Cloudflare Pages 构建环境一致）
- 包管理器：pnpm（在项目根目录用 `.npmrc` 锁定）

`.npmrc` 建议配置：

```ini
engine-strict=true
```

`package.json` 补充 engines 字段：

```json
{
  "engines": {
    "node": ">=20.0.0"
  }
}
```
