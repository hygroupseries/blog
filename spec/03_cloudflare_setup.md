# 03 - Cloudflare Pages 部署与域名配置

本文档说明如何将 Astro 静态博客部署到 Cloudflare Pages，并配置 `blog.<yourdomain>` 二级域名。

---

## 1. 前置条件

- Cloudflare 账户（免费计划即可）
- 域名已托管在 Cloudflare（NS 已指向 Cloudflare）
- Git 仓库（GitHub 或 GitLab，Cloudflare Pages 支持两者）
- Node.js 20 LTS
- pnpm

---

## 2. Astro 项目配置确认

在部署前确认 `astro.config.mjs` 中的关键配置：

```js
// astro.config.mjs
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  // 必须设置为最终生产域名，影响 sitemap、RSS、OG 图片的绝对路径
  site: 'https://blog.yourdomain.com',

  // 默认即为 'static'，纯静态输出，无需适配器
  output: 'static',

  integrations: [
    mdx(),
    sitemap(),
    tailwind(),
  ],

  markdown: {
    shikiConfig: {
      themes: {
        light: 'github-light',
        dark: 'github-dark',
      },
      wrap: true,
    },
  },
});
```

> **重要**：`output: 'static'` 是 Astro 的默认值。纯静态博客**不需要**安装 `@astrojs/cloudflare` 适配器，该适配器仅在需要 SSR（服务端渲染）时使用。

---

## 3. 在 Cloudflare Pages 中创建项目

### 3.1 连接 Git 仓库

1. 登录 [Cloudflare Dashboard](https://dash.cloudflare.com)
2. 左侧菜单选择 **Workers & Pages**
3. 点击 **Create application** → **Pages** → **Connect to Git**
4. 授权并选择你的博客仓库

### 3.2 配置构建设置

在 **Set up builds and deployments** 页面填写：

| 配置项 | 值 |
|-------|-----|
| Framework preset | `Astro` |
| Build command | `pnpm build` |
| Build output directory | `dist` |
| Root directory | `/`（仓库根目录，默认即可） |

### 3.3 配置环境变量

在 **Environment variables** 部分添加：

| 变量名 | 值 | 环境 |
|-------|----|------|
| `NODE_VERSION` | `20` | Production + Preview |

> Cloudflare Pages 默认使用较旧的 Node.js 版本，**必须**通过此环境变量指定 Node 20，否则 Astro v4+ 可能构建失败。

点击 **Save and Deploy** 完成初始部署。

---

## 4. 配置自定义域名 `blog.<yourdomain>`

### 4.1 在 Pages 项目中添加自定义域名

1. 进入你的 Pages 项目
2. 点击顶部 **Custom domains** 标签
3. 点击 **Set up a custom domain**
4. 输入 `blog.yourdomain.com`（替换为你的实际域名）
5. 点击 **Continue**

### 4.2 DNS 记录配置

由于你的域名已托管在 Cloudflare，系统会**自动**提示添加 CNAME 记录。确认后 Cloudflare 会自动创建：

```
类型:   CNAME
名称:   blog
目标:   <your-project-name>.pages.dev
代理:   已代理（橙色云图标 ✓）
```

如需手动创建，前往 **DNS** → **Records** → **Add record**，按上表填写。

### 4.3 SSL/TLS 证书

Cloudflare 会自动为自定义域名签发 SSL 证书（通过 Let's Encrypt 或 Cloudflare 的通用证书），通常在几分钟内生效，无需手动操作。

确认 SSL/TLS 加密模式：**Cloudflare Dashboard → SSL/TLS → Overview** 中选择 **Full** 或 **Full (strict)**。

---

## 5. 构建缓存与性能优化

Cloudflare Pages 会自动缓存 `node_modules`，加速后续构建。无需额外配置。

如需进一步提升构建速度，在项目根目录添加 `.npmrc`：

```ini
# .npmrc
engine-strict=true
```

---

## 6. 安全响应头配置

在 `public/_headers` 文件中定义 HTTP 响应头，Cloudflare Pages 会在所有请求中自动注入：

```
/*
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=()
  X-XSS-Protection: 1; mode=block

/fonts/*
  Cache-Control: public, max-age=31536000, immutable

/_astro/*
  Cache-Control: public, max-age=31536000, immutable
```

说明：
- `/*`：对所有页面注入安全头
- `/fonts/*` 和 `/_astro/*`：对静态资源设置长期缓存，字体和 JS/CSS 文件内容 hash 化后可安全设为 1 年缓存

---

## 7. 重定向配置（可选）

如需配置重定向规则（例如将旧路径重定向到新路径），在 `public/_redirects` 文件中定义：

```
# 示例：旧文章路径重定向
/posts/*   /blog/:splat   301

# 示例：将裸域重定向到 blog 子域（通常在 Cloudflare DNS 层面处理更佳）
# 此处仅为参考，实际配置建议在 Cloudflare Rules 中处理
```

Cloudflare Pages 原生支持 `_redirects` 文件，语法与 Netlify 兼容。

---

## 8. Preview 部署（预览环境）

Cloudflare Pages 对每个 Pull Request / 分支自动生成独立的预览 URL，格式为：

```
https://<branch-name>.<your-project-name>.pages.dev
```

这对于在正式发布前预览文章内容非常有用。

---

## 9. 与 Vercel 的关键差异

| 特性 | Cloudflare Pages | Vercel |
|------|-----------------|--------|
| 全球 CDN 节点 | 300+ 边缘节点 | ~100 节点 |
| 静态文件托管 | 免费无限制 | 免费计划有带宽限制 |
| 自定义域名 | 免费，无限制 | 免费计划仅限部分功能 |
| 构建分钟数 | 免费 500 分钟/月 | 免费 6000 分钟/月 |
| 预览部署 | 支持 | 支持 |
| 适配器需求 | 静态无需适配器 | 静态无需适配器 |
| Pagefind 兼容性 | 完全兼容 | 完全兼容 |

对于纯静态博客，两者功能上无本质差异。选择 Cloudflare 的主要优势是：
- 与域名 DNS 在同一平台，管理更统一
- 边缘节点更多，全球访问速度更均匀
- 免费计划的静态资源无带宽限制

---

## 10. 部署后验证清单

部署完成后逐项确认：

- [ ] `https://blog.yourdomain.com` 可以正常访问
- [ ] HTTPS 证书有效（浏览器地址栏显示锁形图标）
- [ ] 文章页面可以正常渲染
- [ ] 代码块高亮正常，JetBrains Mono 字体加载正常
- [ ] `/rss.xml` 可以访问并格式正确
- [ ] `/sitemap-index.xml` 或 `/sitemap.xml` 可以访问
- [ ] `/404` 自定义错误页面正常显示
- [ ] 响应头中包含安全头（使用浏览器开发者工具 Network 面板确认）
- [ ] 字体缓存头正确（`Cache-Control: public, max-age=31536000, immutable`）

---

## 11. 常见问题

### 构建失败：Node.js 版本不兼容

**原因**：未设置 `NODE_VERSION` 环境变量，Cloudflare 使用了旧版 Node。

**解决**：在 Pages → Settings → Environment variables 中添加 `NODE_VERSION = 20`。

### 自定义域名 DNS 未生效

**原因**：DNS 传播需要时间，通常 1–5 分钟内生效（Cloudflare 代理域名传播极快）。

**解决**：等待几分钟后刷新，或在 Cloudflare Dashboard 的 DNS 页面确认 CNAME 记录已创建。

### Pagefind 搜索在部署后无效

**原因**：`pagefind --site dist` 命令未在构建脚本中执行，或构建命令配置不正确。

**解决**：确认 `package.json` 的 build 脚本为：
```json
"build": "astro build && pagefind --site dist"
```
并确认 Cloudflare Pages 使用的构建命令与 `package.json` 中一致。

### RSS / Sitemap 中的 URL 不正确

**原因**：`astro.config.mjs` 中的 `site` 字段未设置或设置错误。

**解决**：确认 `site: 'https://blog.yourdomain.com'`（使用最终生产域名，不含尾部斜杠）。