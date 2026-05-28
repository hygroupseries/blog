# Giscus 评论配置

本项目使用 Giscus 作为文章评论系统。Giscus 基于 GitHub Discussions，不需要自建后端，也不需要引入 React。

## 1. 已接入的位置

- 评论组件：`src/components/blog/CommentSection.astro`
- 文章布局：`src/layouts/PostLayout.astro`
- 配置入口：`src/consts/site.ts`

评论区会出现在每篇文章底部。

## 2. GitHub 仓库准备

请在 GitHub 仓库中完成：

1. 打开仓库 Settings
2. 启用 Discussions
3. 安装 Giscus GitHub App
4. 确认评论使用的 Discussions 分类存在，例如 `Announcements`

## 3. 获取 Giscus 配置

打开 Giscus 官网：

```txt
https://giscus.app/
```

填写仓库：

```txt
hygroupseries/blog
```

推荐配置：

- Page ↔ Discussion Mapping：`pathname`
- Discussion Category：`Announcements`
- Features：启用 reactions
- Input position：`top`
- Theme：`preferred_color_scheme`
- Language：`zh-CN`

然后从生成的 script 中复制：

- `data-repo-id`
- `data-category-id`

## 4. 填写项目配置

编辑 `src/consts/site.ts`：

```ts
giscusRepo: 'hygroupseries/blog',
giscusRepoId: '从 giscus.app 复制 data-repo-id',
giscusCategory: 'Announcements',
giscusCategoryId: '从 giscus.app 复制 data-category-id',
```

如果 `giscusRepoId` 或 `giscusCategoryId` 为空，生产环境不会渲染评论区。本地开发环境会显示配置提示。

## 5. 验证

配置完成后运行：

```bash
pnpm build
pnpm dev
```

打开任意文章页，底部应出现 GitHub 评论区。
