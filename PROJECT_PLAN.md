# 纯前端技术向个人博客方案

## 1. 完整技术选型文档

### 1.1 项目定位

目标是构建一个纯前端、技术内容优先、长期可维护、具备良好写作体验和优秀阅读体验的个人博客。该博客不依赖自建后端，内容以 Markdown/MDX 为核心，最终以静态站点方式部署。

核心诉求：
- 技术文章写作体验好
- 页面性能好，首屏快
- SEO 友好，利于搜索引擎收录
- 可逐步扩展为“博客 + 项目展示 + 技术实验室”
- 维护成本低，适合个人长期运营

### 1.2 推荐主方案

技术栈：
- 框架：Astro
- 语言：TypeScript
- 样式：Tailwind CSS
- 内容方案：Markdown + MDX
- 内容管理：Astro Content Collections
- 代码高亮：Shiki
- 搜索：Pagefind
- 评论：Giscus
- 部署：Vercel
- 统计分析：Plausible 或 Umami
- SEO：Astro Sitemap + RSS + Open Graph + 结构化数据

### 1.3 为什么选择 Astro

Astro 是这个场景下最合适的主框架，原因如下：

- 面向内容站点设计，天然适合博客、文档、作品集
- 默认输出静态页面，性能好，JS 负担小
- 支持 Markdown 和 MDX，适合技术写作
- 可按需集成 React、Vue、Svelte 组件，不把项目绑死在某一种 UI 框架上
- 生态成熟，SEO、RSS、图片优化等能力完善
- 后续想加入交互组件、项目展示或实验页时扩展性足够

结论：如果目标是“高质量技术博客”，而不是“通用 Web 应用”，Astro 比 Next.js 更轻、更贴题。

### 1.4 关键选型说明

#### TypeScript

推荐理由：
- 适合长期维护
- 在内容 schema、组件 props、工具函数中更稳
- 后续增加搜索、文章元数据、页面生成逻辑时更容易控制复杂度

#### Tailwind CSS

推荐理由：
- 开发效率高
- 适合快速搭建个性化页面
- 对个人博客这种组件规模适中的项目比较友好
- 方便统一设计 token，例如颜色、间距、字体、圆角、阴影

补充建议：
- 不要直接使用默认视觉风格，尽早建立自己的设计变量
- 配合少量自定义 CSS 做排版和文章内容样式

#### Markdown + MDX

推荐理由：
- Markdown 适合高频写作
- MDX 支持在文章中插入自定义组件，适合技术博客
- 可用于封装提示框、代码组、折叠块、参数表、流程图等内容组件

建议策略：
- 普通文章优先使用 Markdown
- 遇到复杂交互内容再使用 MDX
- 避免所有文章都写成重型 MDX，降低维护成本

#### Astro Content Collections

推荐理由：
- 可以为文章 frontmatter 建立类型约束
- 有利于统一管理 title、description、tags、draft、pubDate 等元信息
- 可避免文章元数据格式不一致的问题

#### Shiki

推荐理由：
- 代码高亮质量高
- 主题选择灵活
- 非常适合技术博客中的代码展示场景

建议：
- 同时准备浅色和深色代码主题
- 支持文件名、代码高亮行、diff 高亮等增强能力

#### Pagefind

推荐理由：
- 专为静态网站设计
- 不依赖后端
- 搜索效果好，集成成本低

适用判断：
- 对博客类站点非常合适
- 比接 Algolia 之类外部服务更轻、更省维护

#### Giscus

推荐理由：
- 依托 GitHub Discussions
- 适合技术博客受众
- 无需自建评论后端

前提：
- 需要 GitHub 仓库和 Discussions 支持

#### Vercel

推荐理由：
- 部署流程顺畅
- 静态站支持成熟
- 预览环境体验好

可替代方案：
- Cloudflare Pages
- Netlify

如果你更看重全球静态资源分发和边缘能力，也可以改用 Cloudflare Pages。

### 1.5 不推荐作为第一选择的方案

#### Next.js

不作为首选的原因：
- 偏全栈框架
- 对纯博客场景来说能力冗余
- 服务端能力和路由复杂度很多时候用不上

适合什么时候选：
- 你计划很快加入会员、后台、API、动态内容

#### VitePress

不作为首选的原因：
- 更偏文档站
- 做博客没有 Astro 灵活

适合什么时候选：
- 你主要写教程、知识库和技术笔记

#### Hexo/Hugo

不作为首选的原因：
- 传统静态博客生态成熟但前端组件化灵活性相对一般
- 现代前端扩展体验不如 Astro

### 1.6 非功能性建设建议

从项目一开始就纳入这些要求：

- SEO：标题、描述、canonical、sitemap、RSS、robots、结构化数据
- 性能：尽量静态生成、控制首屏 JS、优化图片资源
- 可维护性：统一内容 schema、统一设计 token、统一页面布局
- 可扩展性：预留 projects、tags、series、lab 等模块
- 可读性：重视文章排版、代码块、目录和锚点体验

## 2. 项目初始化命令和依赖清单

### 2.1 初始化命令

推荐使用 pnpm：

```bash
pnpm create astro@latest .
```

初始化时建议选择：

- 模板：Empty
- TypeScript：Strict
- 安装依赖：Yes
- 初始化 Git：Yes

然后安装核心依赖：

```bash
pnpm add @astrojs/tailwind @astrojs/mdx @astrojs/rss @astrojs/sitemap rehype-slug rehype-autolink-headings remark-gfm remark-math rehype-katex pagefind
pnpm add @giscus/react
pnpm add -D tailwindcss prettier prettier-plugin-astro prettier-plugin-tailwindcss
```

如果后续要支持 Mermaid，可补充：

```bash
pnpm add mermaid
```

如果后续要做 Open Graph 图生成，可补充：

```bash
pnpm add satori sharp
```

### 2.2 推荐脚本

`package.json` 建议至少包含：

```json
{
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview",
    "format": "prettier --write .",
    "check": "astro check"
  }
}
```

如果集成 Pagefind，建议在构建后执行搜索索引：

```json
{
  "scripts": {
    "dev": "astro dev",
    "build": "astro build && pagefind --site dist",
    "preview": "astro preview",
    "format": "prettier --write .",
    "check": "astro check"
  }
}
```

### 2.3 依赖清单说明

核心运行依赖：
- `astro`：站点框架
- `typescript`：类型系统
- `@astrojs/tailwind`：Tailwind 集成
- `@astrojs/mdx`：MDX 支持
- `@astrojs/rss`：RSS 输出
- `@astrojs/sitemap`：站点地图
- `rehype-slug`：标题锚点 id
- `rehype-autolink-headings`：标题自动链接
- `remark-gfm`：GitHub Flavored Markdown 扩展
- `remark-math`：数学公式语法
- `rehype-katex`：数学公式渲染
- `pagefind`：静态全文搜索
- `@giscus/react`：评论组件

开发依赖：
- `tailwindcss`：原子化样式
- `prettier`：格式化
- `prettier-plugin-astro`：Astro 文件格式化
- `prettier-plugin-tailwindcss`：Tailwind 类名排序

可选依赖：
- `mermaid`：流程图、时序图
- `satori`、`sharp`：动态生成 OG 图片

### 2.4 环境与工程规范建议

建议尽早补上：

- Node.js：建议 LTS 版本
- 包管理器：`pnpm`
- 提交规范：Conventional Commits
- 代码格式化：Prettier
- 可选：ESLint

对于 Astro 博客，Prettier 是必须项，ESLint 可以作为第二阶段补充，不一定要在第一天就上满。

## 3. 详细页面结构与目录设计

### 3.1 页面结构设计

推荐站点结构如下：

- `/`：首页
- `/blog`：文章列表页
- `/blog/[slug]`：文章详情页
- `/tags`：标签总览页
- `/tags/[tag]`：标签归档页
- `/about`：关于页
- `/projects`：项目页
- `/rss.xml`：RSS 订阅
- `/404`：错误页

MVP 阶段可先实现：
- 首页
- 文章列表页
- 文章详情页
- 标签页
- 关于页
- 404 页面

### 3.2 首页信息架构

首页建议包含：

- Hero 区域：一句定位 + 个人简介
- Featured Posts：精选文章
- Latest Posts：最新文章列表
- Tags Overview：常用标签
- Projects Preview：项目预览
- Footer：社交链接、RSS、版权信息

首页定位建议：
- 强调“技术内容”和“个人视角”
- 不要做成通用作品集模板首页
- 内容优先，视觉服务于阅读

### 3.3 博客列表页

博客列表页建议支持：

- 文章卡片列表
- 按时间倒序
- 显示标题、摘要、发布时间、阅读时长、标签
- 支持分页或按年份分组

如果文章数量在早期不多，先不做分页，直接列表即可。

### 3.4 文章详情页

文章页建议包含：

- 标题
- 摘要
- 发布时间
- 更新时间
- 阅读时长
- 标签
- 文章目录
- 正文内容
- 上一篇 / 下一篇
- 评论区

技术博客尤其建议补强这些细节：

- 标题锚点
- 代码块复制按钮
- 高亮行
- 图片说明
- 引用块和提示块样式

### 3.5 标签页

建议包含两类页面：

- 标签总览页：展示所有标签及文章数量
- 标签详情页：查看某个标签下的所有文章

标签是技术博客的重要组织方式，不建议后期再补，MVP 就可以纳入。

### 3.6 项目页

虽然不是 MVP 必须项，但建议预留：

- 项目名称
- 简短介绍
- 技术栈
- 在线地址
- 仓库地址

原因：
- 技术博客通常会和项目展示形成联动
- 后续可把文章和项目关联

### 3.7 推荐目录结构

```txt
/
├─ public/
│  ├─ favicon.svg
│  ├─ social/
│  └─ images/
├─ src/
│  ├─ components/
│  │  ├─ blog/
│  │  ├─ layout/
│  │  ├─ search/
│  │  └─ ui/
│  ├─ content/
│  │  ├─ blog/
│  │  ├─ projects/
│  │  └─ config.ts
│  ├─ layouts/
│  │  ├─ BaseLayout.astro
│  │  └─ PostLayout.astro
│  ├─ pages/
│  │  ├─ index.astro
│  │  ├─ about.astro
│  │  ├─ projects.astro
│  │  ├─ tags/
│  │  │  ├─ index.astro
│  │  │  └─ [tag].astro
│  │  ├─ blog/
│  │  │  ├─ index.astro
│  │  │  └─ [slug].astro
│  │  ├─ 404.astro
│  │  └─ rss.xml.ts
│  ├─ styles/
│  │  ├─ global.css
│  │  └─ prose.css
│  ├─ utils/
│  │  ├─ content.ts
│  │  ├─ date.ts
│  │  ├─ tags.ts
│  │  ├─ seo.ts
│  │  └─ reading-time.ts
│  └─ consts/
│     └─ site.ts
├─ astro.config.mjs
├─ tailwind.config.mjs
├─ tsconfig.json
├─ package.json
└─ README.md
```

### 3.8 内容模型设计

`src/content/config.ts` 中建议定义文章 schema：

```ts
title: string
description: string
pubDate: Date
updatedDate?: Date
heroImage?: string
tags: string[]
draft: boolean
featured?: boolean
series?: string
```

推荐补充字段：
- `canonicalURL`：便于 SEO
- `toc`：是否显示目录
- `lang`：多语言扩展预留

### 3.9 组件分层建议

建议分为四类组件：

- `layout`：页面骨架，例如 Header、Footer、ThemeToggle
- `blog`：文章相关组件，例如 PostCard、TOC、TagList、CommentSection
- `ui`：基础 UI 组件，例如 Button、Badge、Container
- `search`：搜索相关组件，例如 SearchDialog、SearchInput

这样后续迭代时不会把博客逻辑和基础 UI 混在一起。

## 4. 第一版 MVP 功能清单 + 开发排期

### 4.1 MVP 目标

第一版 MVP 的目标不是“功能全”，而是“能稳定写、能稳定发、能稳定读”。

交付标准：
- 能发布多篇技术文章
- 有清晰的信息结构
- 阅读体验良好
- 具备基础 SEO 能力
- 可部署上线

### 4.2 MVP 功能清单

#### 必做功能

- Astro 项目初始化
- TypeScript 严格模式
- Tailwind 样式体系
- 全站基础布局
- 首页
- 博客列表页
- 文章详情页
- About 页面
- 标签总览页
- 标签详情页
- Markdown/MDX 内容系统
- 文章 schema 校验
- 代码高亮
- 标题锚点
- 文章目录
- 响应式适配
- 深色模式
- RSS
- Sitemap
- 基础 SEO 元信息
- 404 页面
- Vercel 部署

#### 建议纳入 MVP 的增强功能

- 阅读时长
- 上一篇 / 下一篇导航
- 文章摘要卡片
- Featured 文章区块
- 草稿过滤

#### 可延后到第二阶段的功能

- 搜索
- 评论
- Open Graph 动态图片
- Mermaid
- 数学公式
- 项目页
- 系列文章页
- 访问统计

### 4.3 页面级 MVP 范围

#### 首页

包含：
- 站点标题与定位
- 个人简介
- 最新文章
- 精选文章
- 标签入口

#### 文章列表页

包含：
- 所有文章列表
- 时间倒序
- 标题、摘要、日期、标签

#### 文章详情页

包含：
- 文章头部信息
- 目录
- 正文
- 标签
- 上下篇导航

#### 标签页

包含：
- 标签总览
- 标签归档列表

#### About 页

包含：
- 个人介绍
- 技术方向
- 联系方式或社交链接

### 4.4 开发排期建议

建议按 4 个阶段推进，每阶段 2 到 3 天，整体约 1 到 2 周完成可上线版本。

#### 阶段一：项目底座

时间：第 1 到 2 天

任务：
- 初始化 Astro + TypeScript + Tailwind
- 配置 MDX、RSS、Sitemap
- 建立全局布局和样式入口
- 定义站点常量
- 建立内容集合与文章 schema

产出：
- 项目可运行
- 可读取和渲染文章内容

#### 阶段二：核心页面

时间：第 3 到 4 天

任务：
- 完成首页
- 完成博客列表页
- 完成文章详情页
- 完成 About 页
- 完成标签总览页和标签详情页

产出：
- 整体站点结构成型
- 用户可完整浏览内容

#### 阶段三：阅读体验增强

时间：第 5 到 6 天

任务：
- 接入 Shiki 高亮
- 增加标题锚点
- 增加目录
- 增加阅读时长
- 增加上下篇导航
- 优化文章排版样式
- 做好移动端适配

产出：
- 技术博客体验达到可上线标准

#### 阶段四：上线准备

时间：第 7 到 8 天

任务：
- 完成 SEO 基础配置
- 生成 sitemap 和 RSS
- 补充 favicon、OG 默认图、站点元信息
- 接入部署平台
- 自测与修复样式细节

产出：
- 可正式上线的 MVP

### 4.5 上线后的第二阶段建议

MVP 上线后优先补这几个：

1. 搜索：用 Pagefind 完成站内搜索
2. 评论：用 Giscus 提升互动性
3. 项目页：形成博客与作品联动
4. 统计：接入 Plausible 或 Umami
5. OG 图：提升分享展示效果

优先级建议：
- 第一优先级：搜索、评论
- 第二优先级：项目页、统计
- 第三优先级：OG 图、Mermaid、数学公式

## 5. 推荐执行顺序

如果你准备立刻开工，建议按这个顺序：

1. 初始化 Astro 项目并接入 Tailwind、MDX
2. 搭好内容集合和文章 schema
3. 完成首页、博客列表页、文章详情页
4. 做标签页、About 页、404 页
5. 增加目录、代码高亮、阅读时长、上下篇
6. 配置 SEO、RSS、Sitemap
7. 部署到 Vercel
8. 第二阶段再补搜索、评论和项目页

## 6. 最终建议

对于“纯前端技术向个人博客”，推荐直接采用这套组合：

- `Astro`
- `TypeScript`
- `Tailwind CSS`
- `MDX`
- `Astro Content Collections`
- `Shiki`
- `Pagefind`
- `Giscus`
- `Vercel`

这套方案的优点是：
- 上手快
- 写作体验强
- 技术内容表达力好
- 性能和 SEO 表现优秀
- 后续拓展空间充足

它非常适合作为个人长期经营的技术博客底座。
