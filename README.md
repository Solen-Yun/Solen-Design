# Solen Design

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="docs/assets/mark-01-v2-reverse.svg">
  <img src="docs/assets/mark-01-v2-accent.svg" alt="Solen Design" width="88" height="88" align="right">
</picture>

一套安静、极简的设计系统：核心是纯 CSS，另带 React、Vue、Svelte、Solid、Preact 与原生 DOM 六套框架入口。

> 素净的瓷色中性色，一线克制的钢蓝，明暗两态开箱即用。

## 安装

```sh
npm install solen-design
```

## 用法

CSS 入口——所有样式都装在级联层里，你自己的 CSS 永远赢过它：

```html
<link rel="stylesheet" href="node_modules/solen-design/src/index.css">
```

这个入口是令牌与基础层。多数组件的样式随引擎自带，不需要额外引入；自带样式表的组件会在构建时收敛成一份文件：

```jsx
import "solen-design/src/index.css";         // 令牌 + 基础层
import "solen-design/dist/solen-design.css";  // 组件样式
```

`dist/` 随 npm 包附带。用的是本仓库的克隆？跑一次 `npm install && npm run build`，同样的路径本地就能解析。

React 组件（React DOM >= 18 作为 peer dependency）：

```jsx
import { PixelToggle } from "solen-design/react";
```

Vue、Svelte、Solid、Preact 与原生 DOM 入口共享同一套引擎，行为与 props 完全一致。每个入口都是一份和 React 入口一样的 barrel 文件——按名字引入组件即可：

```jsx
import { PixelToggle } from "solen-design/vue";
```

原生入口里每个组件的 `mount()` 都带自己的名字——一个包没法导出 246 个重名的 `mount`：

```ts
import { mountPixelToggle } from "solen-design/vanilla";
```

## 主题

令牌就是普通 CSS 变量——随便覆盖。明暗是同一套系统，靠 `light-dark()` 与 `color-scheme` 驱动：

```css
:root { --sd-accent: teal; }
```

## 文档

464 个组件都在 `src/components/`，文档工作台里有实时演示。接 AI 工具：先读 `llms.txt`（一份 21KB 的索引），再按需从 `ai/components/<id>.json` 里取你要的那一个组件。目录（`ai/catalog.json`）与关键词索引（`ai/search-index.json`）刻意分开存放，agent 查一个组件不必加载整个注册表。组件提示词与源码逐字随附。

本地跑工作台（需要 Node.js，无其它服务）：

```sh
npm install
npm run build:docs   # 打包压缩后的站点 → docs-dist/
npm run preview      # → http://localhost:4173/docs/
```

想改组件或工作台本身，用开发服务器（`npm run dev` → `http://localhost:5173/docs/`）。

## MCP

包里自带一个 MCP 服务，任何 agent 都能直接使用这套目录——搜风格、取设计文档、取组件规格，也可以编辑目录。有 Node 就行，无需安装别的。

```json
{
  "mcpServers": {
    "solen-design": {
      "command": "node",
      "args": ["node_modules/solen-design/mcp/server.mjs"]
    }
  }
}
```

从仓库克隆运行的话，把路径指向 `mcp/server.mjs`——编辑类工具需要完整仓库。各客户端的配置写法见 `mcp/README.md`。没接 MCP 的 agent 也有办法：仓库带一个现成的技能包（`.agents/skills/solen-design/`），把那个文件夹拷进你项目的 `.agents/skills/`，agent 就学会用这套目录了；还有一个教「怎么设计」的 `solen-design-craft`，同一位置可取。

## 许可

[MIT](LICENSE)
