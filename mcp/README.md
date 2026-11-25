# Solen Design MCP

把 Solen Design 接到任何 agent 上。agent 能直接查这套目录、拿设计文档与组件源码，
也能直接改目录 —— 不用人手动翻文件。

零依赖：只要有 Node（≥ 18）就能跑，不用先 `npm install`。

## 一行装上

在你的项目里跑（Claude Code；npm 上的包需已发布）：

```sh
claude mcp add solen-design -- npx -y -p solen-design solen-design-mcp
```

Codex 把 `claude` 换成 `codex`，写法相同。配置完重启客户端生效。
这一行用的是 npm 包里随包分发的那套目录；想读仓库最新的一套，用下面的 clone 方式。

## 接上你的 agent

服务走 stdio，配置里指到 `mcp/server.mjs` 就行。

**Claude Code / WorkBuddy（CodeBuddy）**：两家读的是同一个项目根 `.mcp.json`，格式一致，仓库根目录已经带了一份，clone 下来即可用：

```json
{
  "mcpServers": {
    "solen-design": {
      "command": "node",
      "args": ["mcp/server.mjs"]
    }
  }
}
```

WorkBuddy 的全局配置（`~/.workbuddy/mcp.json`，企业版为 `~/.codebuddy/mcp.json`）用同一份内容；配置后第一次连接要在客户端里信任授权。也可以用 CLI 注册（用户级）：

```sh
codebuddy mcp add-json solen-design '{"type":"stdio","command":"npx","args":["-y","-p","solen-design","solen-design-mcp"]}'
```

**Cursor**（`.cursor/mcp.json`）：

```json
{
  "mcpServers": {
    "solen-design": {
      "command": "node",
      "args": ["mcp/server.mjs"]
    }
  }
}
```

**VS Code（Copilot）**：仓库里带了 `.vscode/mcp.json`，打开项目即用（顶层键是 `servers`，与别家不同）：

```json
{
  "servers": {
    "solen-design": {
      "type": "stdio",
      "command": "node",
      "args": ["mcp/server.mjs"]
    }
  }
}
```

**Gemini CLI**：仓库里带了 `.gemini/settings.json`，格式与 Claude Code 相同（顶层键 `mcpServers`）。

**ZCode**：Settings → MCP 里加一个 stdio 服务。ZCode 的配置文件不展开 `${...}` 模板，
路径要写绝对的：

```json
{
  "mcp": {
    "servers": {
      "solen-design": {
        "type": "stdio",
        "command": "node",
        "args": ["<仓库绝对路径>/mcp/server.mjs"]
      }
    }
  }
}
```

**Codex**：仓库里带了 `.codex/config.toml`，打开仓库即用；第一次会先问你是否信任本项目，信任后生效。从仓库根目录启动 `codex`（`args` 里的相对路径按启动目录解析）。手动加到全局配置（`~/.codex/config.toml`）的写法：

```toml
[mcp_servers.solen-design]
command = "node"
args = ["<你的仓库路径>/mcp/server.mjs"]
```

**装成 npm 包用**（包里带了服务、风格目录与设计文档，五个读取工具可用；全库体检与三个写工具要对着完整仓库用）。除了上面的 `npx` 一行装法，也可以手动指路径：

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

## 工具有哪些

### 读

| 工具 | 做什么 |
|---|---|
| `list_categories` | 列出分类表（视觉 15 类、布局 6 类）与每类的命中数量 |
| `search_styles` | 按关键词搜风格：中文名、英文名、简介、标签、分类都参与匹配 |
| `get_style_doc` | 取一套风格的完整设计文档（中/英）——复现提示词的事实来源 |
| `search_components` | 按关键词搜组件库（464 个） |
| `get_component` | 取组件的复现提示词、props 表与框架源码 |

### 改

| 工具 | 做什么 |
|---|---|
| `audit_catalog` | 全库体检：设计文档（中/英）、详情页、分类标记、llms.txt 索引行是否齐全 |
| `add_style` | 新增一套风格：写双语设计文档、加目录卡（带分类）、加 llms.txt 索引行 |
| `set_style_categories` | 改一套风格在目录卡上的分类 |
| `release` | 发版：bump 版本号，在更新日志最前面插一条（带「本次更新主要看」提要行） |

`add_style` 只做能机械生成的部分。详情页和它那套 CSS 是逐套手写的，工具会把
剩下要做的列出来。

## 数据从哪来

| 读的东西 | 位置 |
|---|---|
| 风格目录（卡片、分类） | `docs/style.html` 的 `data-cat` 与目录卡 |
| 风格设计文档 | `docs/styles/<id>.md` / `<id>.en.md` |
| 分类表 | `docs/style-field.js` 的 `CATEGORIES` |
| 组件机器可读面 | `ai/catalog.json`、`ai/search-index.json`、`ai/components/<id>.json`、`ai/packages/<id>/<framework>.json` |
| 更新日志 | `docs/docs.html` 的「更新日志」段 |

组件那部分要跑过 `npm run ai:build` 才有。

## 自测

```sh
npm run mcp:test
```

会把服务拉起来走一遍握手、列工具、逐个调工具；写操作跑在临时副本里，不碰仓库。

## 指到别的目录

`SOLEN_ROOT` 可以指到另一份 Solen Design（工作副本、旧版本、npm 包）：

```sh
SOLEN_ROOT=/path/to/solen-design node mcp/server.mjs
```
