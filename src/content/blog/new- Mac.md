---
title: "Mac mini 一周使用体验：从开箱到开发环境落地"
description: "这篇文章复盘我在 Mac mini 上一周的真实使用感受，并给出一套可复用的前端开发环境配置流程，包含 Homebrew、CodexApp、VS Code 和 Ghostty 的安装与基础优化。"
pubDate: 2026-03-31
updatedDate: 2026-03-31
tags: ["Mac mini", "开发环境", "Homebrew", "VS Code", "Ghostty", "CodexApp"]
draft: false
featured: true
series: ""
heroImage: ""
canonicalURL: ""
toc: true
lang: "zh-CN"
---

## 背景

这次入手 Mac mini，核心目标很明确：一台安静、省电、可以稳定写代码的桌面机器。我的主要工作是前端开发和内容写作，日常工具集中在浏览器、编辑器、终端和少量 CLI 工具。

我希望在最短时间内把机器从“可用”变成“顺手”，所以这篇文章不聊跑分，只记录真实体验和一套可复制的环境配置流程。如果你刚买 Mac，或者准备把主力开发机迁到 macOS，这份清单可以直接照着走。

## 问题分析

新 Mac 到手后，最容易遇到的不是“不会安装软件”，而是“环境不统一”：

- 没有包管理器，很多命令行工具只能手动找安装包。
- 终端、编辑器、AI 工具分散，快捷键和配置不一致。
- 一开始随手装软件，后续迁移和重装成本会越来越高。

如果不在第一天把工具链打好，后面每天都会被细碎问题打断。

## 方案设计

我的结论是：先用 Homebrew 管理安装入口，再按“终端 -> 编辑器 -> AI 工具”的顺序搭建。这样做的好处是安装可追踪、配置可复现、迁移成本低。

### 方案一

统一用 Homebrew 安装核心工具：

- 优点：命令统一、更新简单、卸载干净。
- 缺点：第一次配置需要理解 `brew`、`cask` 和环境变量。
- 适用场景：希望长期维护开发环境的人。

### 方案二

全部使用官网安装包：

- 优点：上手直观，不需要命令行基础。
- 缺点：版本管理分散，后续维护成本高。
- 适用场景：临时使用或只装极少工具。

我最终采用方案一，只有个别工具在 Homebrew 不稳定时才回退到官网安装。

## 实现过程

下面是我在 Mac mini 上实际执行的一套顺序。

### 第一步：安装 Homebrew

先打开“终端”执行官方安装命令：

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

安装完成后，根据终端提示把 Homebrew 加入 shell 环境（Apple Silicon 通常是 `/opt/homebrew/bin/brew`）：

```bash
echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> ~/.zprofile
eval "$(/opt/homebrew/bin/brew shellenv)"
brew --version
```

建议顺手做一次基础校验：

```bash
brew doctor
brew update
```

### 第二步：安装 Ghostty 作为主力终端

我选择 Ghostty 的原因是启动快、渲染流畅、默认体验干净，适合高频命令行工作。

```bash
brew install --cask ghostty
```

安装后优先做三件事：

- 打开“开机自动恢复窗口”与“关闭确认”相关选项，减少误操作。
- 统一字体与行高，保证中英混排可读性。
- 把默认 shell 确认成 `zsh`，避免脚本行为不一致。

### 第三步：安装 VS Code 并接入开发常用能力

```bash
brew install --cask visual-studio-code
```

然后把 `code` 命令加入 PATH，方便在终端快速打开项目：

```bash
cat <<'EOF' >> ~/.zprofile
export PATH="$PATH:/Applications/Visual Studio Code.app/Contents/Resources/app/bin"
EOF
source ~/.zprofile
code --version
```

我会优先安装这些扩展类型：

- 语言支持：TypeScript、JSON、Markdown。
- 代码质量：ESLint、Prettier。
- 工作流：GitHub Pull Requests、GitLens。

### 第四步：安装 CodexApp

CodexApp 我主要用于日常的代码生成、重构建议和命令辅助，和 VS Code 搭配能明显减少样板工作。

```bash
brew install --cask codex
```

如果你本地的 Homebrew 仓库里暂时没有这个 cask，就使用官网安装包；安装后记得完成登录，并在权限里允许它访问你需要的项目目录。

### 第五步：安装基础开发工具链

虽然这篇重点是四个应用，但实际开发还需要最小工具链：

```bash
brew install git node pnpm
node -v
pnpm -v
git --version
```

到这里，一台可用于前端开发和写作的 Mac mini 环境就基本成型了。

## 关键代码

我把常用安装动作收敛成一段脚本，重装机器时可以直接复用：

```bash
# setup-dev.sh
brew update
brew install git node pnpm
brew install --cask ghostty visual-studio-code codex
brew cleanup
```

这段脚本的价值不在“省几分钟”，而在于让环境配置可重复。你可以把它放进 dotfiles 仓库，未来换机器时只要执行一次就能恢复 80% 的工作状态。

## 注意事项

- Apple Silicon 与 Intel 的 Homebrew 路径不同，教程里的路径不要盲抄。
- 安装 GUI 应用前确认网络和系统版本，失败时先 `brew update` 再重试。
- 新机器建议先完成系统更新，再大规模安装开发工具。
- 如果公司网络有代理或证书策略，先处理网络再执行安装命令。
- 重要配置建议托管到 Git 仓库，例如 shell 配置、编辑器配置和安装脚本。

## 总结

Mac mini 给我的第一印象是稳定、安静、专注，尤其适合长时间写代码。开发环境配置上，Homebrew 是整个流程的支点，先搭好它再装应用会顺很多。Ghostty 提供了更轻快的终端体验，VS Code 负责主编辑流，CodexApp 补齐智能辅助。按本文顺序执行，你可以在一小时内把新机器从“开机状态”推进到“可投入开发”的状态。后续如果要继续升级，建议从 dotfiles 自动化和项目模板化两条线开始。
