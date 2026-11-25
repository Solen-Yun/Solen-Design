---
name: solen-design
description: 使用 Solen Design 设计系统干活时的领路技能。当用户想按某种视觉风格做页面（新野兽派、玻璃拟态、赛博朋克、侘寂等 151 套）、想复刻 Solen Design 里的某个组件、或问「该用什么风格 / 有没有现成的组件」时使用。指引 agent 用 MCP 工具或自带 CLI 搜目录、取设计文档与组件源码。
---

# Solen Design 目录使用指引

这是一套纯 CSS 设计系统加 464 个动效/交互组件，另有 151 套网站风格
（视觉风格 133、布局模式 18），每套风格带一份中英双语的设计文档——
那文档就是交给你的复刻提示词，照着它写，效果和官方展示页一致。

## 怎么查目录

两条路，哪条通用哪条：

**接了 MCP（优先）**：`search_styles` 搜风格、`get_style_doc` 取风格
设计文档、`list_categories` 看分类；`search_components` 搜组件、
`get_component` 取组件的提示词、props 表与源码。

**没接 MCP**：自带命令行（在仓库根或包根运行）：

```sh
node ai/scripts/solen.mjs search "折叠 滚动"     # 搜组件
node ai/scripts/solen.mjs show <id> --framework react
node ai/scripts/solen.mjs pull <id> --framework react --out <目录>
```

风格没有 CLI，直接读文件：`docs/styles/<id>.md` 是设计文档，
`ai/catalog.json` 有全量组件索引。

## 做一套风格页面的流程

1. 听用户描述气质（「要赛博感」「要安静」），用 `search_styles` 搜，
   或 `list_categories` 按分类逛；拿不准就给用户两三个候选。
2. `get_style_doc` 取设计文档，通读 Colors / Typography / Components /
   Do's and Don'ts。
3. 照文档实现。文档里的数值（色值、字号、圆角、阴影、过渡时长）都是
   定稿规格，照抄；QUICK COLOR REFERENCE 是色值速查；
   EXAMPLE COMPONENT PROMPTS 可以直接当提示词用。

## 复刻一个组件的流程

1. `search_components` 找到组件 id。
2. `get_component` 取它的复刻提示词（prompt 字段是唯一事实来源，逐字
   保留，不要改写）和源码。
3. 按提示词从零实现，或直接取对应框架的源码文件。

## 写代码的约束

- 只用 `--sd-*` 令牌，不写死颜色与尺寸；类名一律 `.sd-*`。
- 明暗两套都要成立：只改令牌值，不写 `color`。
- 提示词与设计文档是唯一事实来源：实现和它对不上时，先判断哪边是对的，
  不要悄悄选一个。

## 更多的底

组件全表在 `ai/SKILL.md`；接入各客户端的方法在 `mcp/README.md`。
