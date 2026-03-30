# 02 - JetBrains Mono 字体配置方案

本文档说明如何在 Astro + Tailwind CSS 项目中配置 JetBrains Mono 作为代码字体，采用 npm 自托管方案，适配 Cloudflare Pages 静态部署。

---

## 1. 关于 "Nerd Font" 在 Web 端的说明

JetBrains Mono Nerd Font 是由 [Nerd Fonts](https://www.nerdfonts.com/) 项目对 JetBrains Mono 进行的补丁版本，主要扩展了以下字形：

- Powerline 符号
- Devicons / File type icons
- Font Awesome 图标子集
- 其他终端 UI 专用字形

**这些扩展字形专为终端渲染设计，在浏览器中无实际用途。**

对于 Web 博客，标准 JetBrains Mono 与 Nerd Font 版本在代码字符（字母、数字、标点、运算符）上的渲染效果完全一致。因此：

- Web 端使用标准 `@fontsource/jetbrains-mono`
- 终端 / IDE 端继续使用 Nerd Font 变体
- 两者视觉体验在代码内容上无差异

---

## 2. 字体安装

使用 `@fontsource/jetbrains-mono` 自托管字体文件，避免依赖外部 CDN（Google Fonts），减少 DNS 解析开销，符合 Cloudflare Pages 静态部署的最佳实践。

```bash
pnpm add @fontsource/jetbrains-mono
```

该包会将字体文件安装到 `node_modules/@fontsource/jetbrains-mono/`，构建时 Astro / Tailwind 的处理流程会将字体文件打包到 `dist/` 中。

---

## 3. 字重选择建议

JetBrains Mono 提供以下字重：

| 字重值 | 命名 | 推荐用途 |
|--------|------|---------|
| 100 | Thin | 不推荐用于代码 |
| 200 | ExtraLight | 不推荐 |
| 300 | Light | 不推荐用于代码 |
| 400 | Regular | **代码正文（必选）** |
| 500 | Medium | 可选，强调代码 |
| 600 | SemiBold | 不常用 |
| 700 | Bold | **行内代码高亮（建议引入）** |
| 800 | ExtraBold | 不推荐 |

**建议只引入 400 和 700 两个字重，减少字体文件体积。**

---

## 4. 全局样式中引入字体

在 `src/styles/global.css` 中引入字体 CSS：

```css
/* src/styles/global.css */

/* JetBrains Mono - Regular（代码正文） */
@import '@fontsource/jetbrains-mono/400.css';

/* JetBrains Mono - Bold（行内代码、粗体代码） */
@import '@fontsource/jetbrains-mono/700.css';

/* 如需斜体变体（注释等场景） */
@import '@fontsource/jetbrains-mono/400-italic.css';
```

> **注意**：只 import 你实际用到的字重，每个文件约 30–60 KB（WOFF2），按需引入可显著减小总体积。

---

## 5. Tailwind 配置

在 `tailwind.config.mjs` 中扩展 `fontFamily`，将 JetBrains Mono 注册为等宽字体：

```js
// tailwind.config.mjs
import { fontFamily } from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      fontFamily: {
        // 将 JetBrains Mono 置于系统等宽字体之前
        mono: ['"JetBrains Mono"', ...fontFamily.mono],
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
```

通过扩展 `fontFamily.mono`，Tailwind 的 `font-mono` utility class 和 `@tailwindcss/typography` 的 prose 代码样式都会自动使用 JetBrains Mono。

---

## 6. 全局 CSS 应用字体

在 `src/styles/global.css` 中补充基础样式，确保所有代码元素统一使用 JetBrains Mono：

```css
/* src/styles/global.css */

@import '@fontsource/jetbrains-mono/400.css';
@import '@fontsource/jetbrains-mono/700.css';
@import '@fontsource/jetbrains-mono/400-italic.css';

@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  /* 代码字体全局应用 */
  code,
  pre,
  kbd,
  samp {
    font-family: 'JetBrains Mono', ui-monospace, 'Cascadia Code', 'Source Code Pro',
      Menlo, Consolas, 'DejaVu Sans Mono', monospace;
    font-feature-settings: 'liga' 1, 'calt' 1; /* 启用连字特性 */
    font-variant-ligatures: contextual;
  }

  /* 行内代码样式 */
  :not(pre) > code {
    font-size: 0.875em;
    font-weight: 400;
  }

  /* 代码块基础样式 */
  pre {
    font-size: 0.875rem;
    line-height: 1.7142857;
    overflow-x: auto;
  }
}
```

---

## 7. Prose 样式中的代码字体（@tailwindcss/typography）

`@tailwindcss/typography` 的 `prose` class 会自动将 `font-mono` 应用到 `code`、`pre`、`kbd` 等元素。由于第 5 步已将 JetBrains Mono 注册到 `fontFamily.mono`，prose 内的代码块会自动继承。

如需进一步定制 prose 中的代码样式，在 `tailwind.config.mjs` 中扩展 typography 配置：

```js
// tailwind.config.mjs
export default {
  theme: {
    extend: {
      fontFamily: {
        mono: ['"JetBrains Mono"', ...fontFamily.mono],
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            'code::before': { content: '""' }, // 移除 prose 默认的反引号
            'code::after': { content: '""' },
            code: {
              fontFamily: '"JetBrains Mono", ui-monospace, monospace',
              fontWeight: '400',
              fontSize: '0.875em',
              backgroundColor: theme('colors.zinc.100'),
              borderRadius: theme('borderRadius.sm'),
              paddingTop: '0.1em',
              paddingBottom: '0.1em',
              paddingLeft: '0.3em',
              paddingRight: '0.3em',
            },
            pre: {
              fontFamily: '"JetBrains Mono", ui-monospace, monospace',
            },
          },
        },
        invert: {
          css: {
            code: {
              backgroundColor: theme('colors.zinc.800'),
            },
          },
        },
      }),
    },
  },
};
```

---

## 8. Shiki 代码高亮配置

Astro 内置 Shiki，在 `astro.config.mjs` 中配置代码高亮主题：

```js
// astro.config.mjs
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://blog.<yourdomain>',
  markdown: {
    shikiConfig: {
      // 推荐主题组合（浅色 / 深色）
      themes: {
        light: 'github-light',
        dark: 'github-dark',
      },
      // 启用自动换行，防止代码块溢出
      wrap: true,
    },
  },
  // ...
});
```

Shiki 输出的代码块 HTML 结构中，字体由 CSS 决定，Shiki 本身不指定字体族。第 6 步的 `pre` 样式会自动作用于 Shiki 的输出。

### 推荐主题参考

| 风格 | 浅色主题 | 深色主题 |
|------|---------|---------|
| 简洁（类 GitHub） | `github-light` | `github-dark` |
| 高对比度 | `light-plus` | `dark-plus` |
| 暖色调 | `solarized-light` | `solarized-dark` |
| 极简单色 | `min-light` | `min-dark` |

---

## 9. 连字（Ligatures）说明

JetBrains Mono 内置了丰富的编程连字，例如：

| 字符序列 | 连字效果 |
|---------|---------|
| `->` | →（箭头） |
| `=>` | ⇒（胖箭头） |
| `!=` | ≠ |
| `===` | ≡ |
| `<=` / `>=` | ≤ / ≥ |
| `//` | 注释符号连字 |

连字通过 `font-feature-settings: 'liga' 1, 'calt' 1` 启用（已在第 6 步的 CSS 中配置）。

**是否启用连字取决于个人偏好**，如不需要可设置：

```css
code, pre {
  font-feature-settings: 'liga' 0, 'calt' 0;
  font-variant-ligatures: none;
}
```

---

## 10. 字体文件体积参考

`@fontsource/jetbrains-mono` 每个字重文件（WOFF2 格式）约为：

| 文件 | 大小（参考） |
|------|------------|
| 400.css + WOFF2 | ~45 KB |
| 700.css + WOFF2 | ~44 KB |
| 400-italic.css + WOFF2 | ~46 KB |

引入两个字重（400 + 700）共约 **90 KB**，通过 Cloudflare CDN 缓存后首次加载后无额外开销。

---

## 11. 正文字体建议

当前规划仅指定了代码字体，正文字体建议使用系统字体栈，无需额外引入：

```css
@layer base {
  body {
    font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont,
      'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif;
  }
}
```

系统字体栈的优势：
- 零额外加载体积
- 渲染速度最快
- 在各平台上与系统 UI 视觉协调（macOS 使用 SF Pro，Windows 使用 Segoe UI，Android 使用 Roboto）
- 符合"以文字为主、轻量化"的目标

如后续希望统一跨平台正文字体，推荐使用 `@fontsource/inter`（约 80 KB），无需改动任何结构，只需在 global.css 中 import 并在 Tailwind 的 `fontFamily.sans` 中注册即可。