# 开发依赖列表

本文档用于整理当前博客项目的开发依赖，基于以下目标：

- 使用 Astro 构建纯前端技术博客
- 以 Markdown / MDX 作为内容来源
- 以阅读体验和技术文章展示为中心
- 使用 GitHub Discussions 作为评论系统
- 后续支持搜索、SEO、RSS、Sitemap 等能力

## 1. 依赖分层建议

推荐把依赖分成三层：

1. MVP 必需依赖
2. 第一轮增强依赖
3. 工程质量依赖

这样可以先尽快把博客跑起来，再逐步补强功能。

## 2. MVP 必需依赖

### 运行依赖

- `astro`
- `typescript`
- `@astrojs/mdx`
- `@astrojs/tailwind`
- `@astrojs/rss`
- `@astrojs/sitemap`
- `rehype-slug`
- `rehype-autolink-headings`
- `remark-gfm`

### 开发依赖

- `tailwindcss`
- `prettier`
- `prettier-plugin-astro`
- `prettier-plugin-tailwindcss`

## 3. 第一轮增强依赖

这些依赖建议在博客主体跑通后接入。

### 内容与阅读增强

- `remark-math`
- `rehype-katex`

用途：
- 数学公式
- 技术文章中的公式展示

### 搜索

- `pagefind`

用途：
- 纯静态站内搜索
- 构建后索引内容

### 评论

- `@giscus/react`

用途：
- 基于 GitHub Discussions 的评论系统

说明：
- 如果后面你决定完全不引入 React 岛组件，也可以改成直接嵌入 Giscus script，而不是使用 React 包装组件。

### 图表与媒体增强

- `mermaid`

用途：
- 流程图
- 时序图
- 架构图

### Open Graph 图片

- `satori`
- `sharp`

用途：
- 自动生成文章分享图

## 4. 工程质量依赖

这些依赖不是第一天必须，但建议在第一版页面跑通后补上。

- `eslint`
- `eslint-plugin-astro`
- `@typescript-eslint/parser`
- `@typescript-eslint/eslint-plugin`

用途：
- 统一代码质量
- 提前发现低级错误

如果想保持项目初期更轻量，也可以先只使用：

- `prettier`
- `astro check`

## 5. 推荐安装命令

## 5.1 初始化项目

```bash
pnpm create astro@latest .
```

## 5.2 安装 MVP 必需依赖

```bash
pnpm add @astrojs/mdx @astrojs/rss @astrojs/sitemap @astrojs/tailwind rehype-slug rehype-autolink-headings remark-gfm
pnpm add -D prettier prettier-plugin-astro prettier-plugin-tailwindcss tailwindcss typescript
```

## 5.3 安装第一轮增强依赖

```bash
pnpm add @giscus/react pagefind rehype-katex remark-math mermaid satori sharp
```

## 5.4 安装工程质量依赖

```bash
pnpm add -D eslint eslint-plugin-astro @typescript-eslint/parser @typescript-eslint/eslint-plugin
```

## 6. 推荐脚本

`package.json` 建议包含：

```json
{
  "scripts": {
    "dev": "astro dev",
    "build": "astro build && pagefind --site dist",
    "preview": "astro preview",
    "check": "astro check",
    "format": "prettier --write ."
  }
}
```

如果还没有接入 `pagefind`，构建脚本可以先写成：

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

## 7. 当前推荐安装顺序

建议按下面顺序安装：

1. `astro` 项目初始化
2. `@astrojs/mdx`
3. `@astrojs/tailwind`
4. `@astrojs/rss`
5. `@astrojs/sitemap`
6. `remark-gfm`
7. `rehype-slug`
8. `rehype-autolink-headings`
9. `prettier` 相关依赖
10. `pagefind`
11. `@giscus/react`
12. 其他增强依赖

## 8. 最小启动方案

如果你准备今天就开始开发，最小一套只需要：

- `astro`
- `typescript`
- `@astrojs/mdx`
- `@astrojs/tailwind`
- `@astrojs/rss`
- `@astrojs/sitemap`
- `remark-gfm`
- `rehype-slug`
- `rehype-autolink-headings`
- `tailwindcss`
- `prettier`

这套已经足够完成：

- 首页
- 文章列表页
- 文章详情页
- 标签页
- About 页
- RSS
- Sitemap

## 9. 当前建议

当前最合理的策略是：

- 先安装 MVP 必需依赖
- 在项目结构跑通后再接入 `pagefind` 和 `giscus`
- `mermaid`、`katex`、OG 图片生成放在第二阶段

这样能兼顾开发效率和复杂度控制。
