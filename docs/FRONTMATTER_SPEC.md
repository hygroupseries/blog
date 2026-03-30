# Frontmatter 字段规范

本文档定义博客文章的 frontmatter 字段规范，用于统一文章元信息、SEO 展示和内容管理。

## 1. 推荐字段

每篇文章建议包含以下字段：

```yaml
---
title: "Astro 博客为什么适合技术写作者"
description: "从性能、内容组织和开发体验三个角度，分析 Astro 作为技术博客框架的优势。"
pubDate: 2026-03-18
updatedDate: 2026-03-18
tags: ["Astro", "Frontend", "Blog"]
draft: false
featured: false
series: "博客搭建"
heroImage: "/images/blog/astro-cover.png"
canonicalURL: "https://your-domain.com/blog/why-astro-is-good-for-tech-bloggers"
toc: true
lang: "zh-CN"
---
```

## 2. 字段说明

### 必填字段

#### `title`

- 类型：`string`
- 说明：文章标题
- 要求：
  - 清晰表达主题
  - 避免过长，建议控制在 18 到 32 个中文字符内
  - 不建议使用过度营销化表达

示例：

```yaml
title: "Astro 博客为什么适合技术写作者"
```

#### `description`

- 类型：`string`
- 说明：文章摘要，用于列表页、SEO 描述、社交分享摘要
- 要求：
  - 建议 100 到 140 个中文字符
  - 说明文章解决什么问题、适合谁、核心价值是什么
  - 不要只重复标题

示例：

```yaml
description: "从性能、内容组织和开发体验三个角度，分析 Astro 作为技术博客框架的优势。"
```

#### `pubDate`

- 类型：`date`
- 说明：首次发布时间
- 要求：
  - 使用统一日期格式
  - 发布后不要随意改动

示例：

```yaml
pubDate: 2026-03-18
```

#### `tags`

- 类型：`string[]`
- 说明：文章标签，用于分类、筛选和标签归档页
- 要求：
  - 建议 2 到 5 个
  - 命名保持稳定
  - 优先使用技术主题词，而不是情绪化词语

示例：

```yaml
tags: ["Astro", "Frontend", "Blog"]
```

#### `draft`

- 类型：`boolean`
- 说明：是否为草稿
- 要求：
  - 未准备发布时设为 `true`
  - 正式发布设为 `false`

示例：

```yaml
draft: false
```

### 推荐字段

#### `updatedDate`

- 类型：`date`
- 说明：最后更新时间
- 使用场景：
  - 修正错误
  - 补充新内容
  - 更新版本兼容信息

#### `featured`

- 类型：`boolean`
- 说明：是否为精选文章
- 使用场景：
  - 首页精选区
  - 推荐阅读列表

#### `series`

- 类型：`string`
- 说明：所属系列文章名称
- 使用场景：
  - 某类内容形成连续专题时使用

#### `heroImage`

- 类型：`string`
- 说明：文章封面图路径
- 要求：
  - 使用站内静态资源路径
  - 保持统一宽高比例

#### `canonicalURL`

- 类型：`string`
- 说明：规范化 URL
- 使用场景：
  - 多地址访问同一内容时避免 SEO 重复

#### `toc`

- 类型：`boolean`
- 说明：是否展示目录
- 默认建议：`true`

#### `lang`

- 类型：`string`
- 说明：文章语言
- 默认建议：`zh-CN`

## 3. 字段使用建议

- `title` 负责吸引点击，但核心是准确，不要标题党
- `description` 负责解释价值，不要写成空泛介绍
- `tags` 要形成稳定词表，避免同义词乱用
- `draft` 应该进入发布流程控制，而不是靠人工记忆
- `updatedDate` 只在内容有实际更新时修改

## 4. 标签命名规范

建议统一使用首字母大写或统一小写，不要混用。

推荐做法：

- 技术名词统一英文：`React`、`TypeScript`、`Astro`
- 主题概念统一英文或中文中的一种
- 同一个概念只保留一个标签名

示例：

- 推荐：`JavaScript`
- 不推荐：`javascript`、`JS`、`js` 混用

## 5. 最小可用 frontmatter

如果你只想保留最小必要字段，建议至少写成这样：

```yaml
---
title: "Astro 博客为什么适合技术写作者"
description: "从性能、内容组织和开发体验三个角度，分析 Astro 作为技术博客框架的优势。"
pubDate: 2026-03-18
tags: ["Astro", "Frontend", "Blog"]
draft: false
---
```

## 6. 推荐发布前检查

发布前确认以下内容：

- `title` 是否准确表达主题
- `description` 是否能独立概括文章价值
- `pubDate` 是否正确
- `tags` 是否符合既有标签体系
- `draft` 是否已设为 `false`
- `updatedDate` 是否需要填写
- 封面图路径是否有效
