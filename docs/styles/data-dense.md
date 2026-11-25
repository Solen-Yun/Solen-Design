# 数据密集 — 风格参考

> 每像素都用来放数据：字号 10 到 12px，间距 4px 一跳，没有装饰。

**Theme:** light

数据密集是为操作台服务的，所有美学指标被压到最小：字号 10 到 12px、行高 28px、间距以 4px 递增、圆角 4px、无阴影无渐变。它的层次靠三件事建立——交替行底色（白与极浅蓝灰）、1px 分隔线、以及状态标签的色块。数字、ID 与代码一律等宽并右对齐，保证纵向可比。这套风格的价值在密度本身：一屏能看到 40 行记录，而不是 12 行。任何增加留白的改动都是退步。

## Colors

| Name | Value | Token | Role |
|---|---|---|---|
| White | `#ffffff` | `--color-white` | 表格与面板底。与交替行色形成最轻的一层区分。 |
| Row Tint | `#f8fafc` | `--color-row-tint` | 交替行与表头底色。只差一档，靠重复面积被感知。 |
| Ink | `#1e293b` | `--color-ink` | 主要文字与数字。深板岩，在密集排版里仍保持锐利。 |
| Muted | `#64748b` | `--color-muted` | 表头、次要列与说明。永远与 10px 全大写同时出现。 |
| Primary Blue | `#3b82f6` | `--color-primary-blue` | 主操作、选中行与焦点。在表格里是唯一允许的饱和色块。 |
| Danger | `#ef4444` | `--color-danger` | 删除与错误状态，只出现在文字与 10% 底的标签上。 |
| Success | `#22c55e` | `--color-success` | 增长与完成状态，与危险红同等面积同等字重。 |

## Typography

### Inter — 全站唯一字体，最大只到 18px。表头 10px 全大写是这套风格的识别标记。

- **Substitute:** system-ui, -apple-system, 'Segoe UI', sans-serif
- **Weights:** 400, 500, 600
- **Sizes:** 10, 11, 12, 14, 18
- **Line height:** 1.2 (display), 1.3 (headings), 1.45 (body)
- **Letter spacing:** -0.01em on display, 0.06em on uppercase labels

### JetBrains Mono — 数字、ID、时间戳与代码。等宽让纵向对比成为可能。

- **Substitute:** ui-monospace, SFMono-Regular, Menlo, monospace
- **Weights:** 400, 500
- **Sizes:** 11, 12, 14
- **Line height:** 1.4 (display), 1.4 (headings), 1.45 (body)
- **Letter spacing:** 0 on display, 0.02em on uppercase labels

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|---|---|---|---|---|---|---|
| heading | — | 600 | 18px | 1.3 | — | `--text-heading` |
| body-lg | — | 500 | 14px | 1.45 | — | `--text-body-lg` |
| body | — | 400 | 12px | 1.45 | — | `--text-body` |
| body-sm | — | 400 | 11px | 1.4 | — | `--text-body-sm` |
| label | — | 500 | 10px | 1.3 | 0.06em | `--text-label` |

## Spacing & Layout

**Base unit:** 4px
**Density:** compact

### Spacing Scale

| Name | Value | Token |
|---|---|---|
| 4 | 4px | `--spacing-4` |
| 8 | 8px | `--spacing-8` |
| 12 | 12px | `--spacing-12` |
| 16 | 16px | `--spacing-16` |
| 24 | 24px | `--spacing-24` |
| 32 | 32px | `--spacing-32` |

### Border Radius

| Element | Value |
|---|---|
| cards | 4px |
| buttons | 4px |
| inputs | 4px |
| tags | 4px |

- **Page max-width:** 1600px
- **Section gap:** 16px
- **Card padding:** 12px
- **Element gap:** 4px

## Components

### Data Table

**Role:** 主数据表

外框 1px #e2e8f0、4px 圆角、无阴影。表头高 32px、底色 #f8fafc、10px 全大写 0.06em 灰字 500 字重。行高 28px、内边距 8px 12px、交替行底色 #f8fafc。数值列等宽右对齐，状态列放色标签。hover 整行为 #eff6ff。过渡 120ms。

- **Sizes:** row 28px; header 32px
- **States:** hover: row #eff6ff

### Action Button

**Role:** 行内操作与工具栏按钮

高 24px、padding 4px 10px、4px 圆角、11px/500，无阴影。主操作用蓝填充白字；次要操作白底配 1px #e2e8f0 描边；删除操作用红字透明底。hover 只变底色，过渡 120ms。

- **Sizes:** height 24px; label 11px

### Stat Card

**Role:** 顶部指标条

白底、1px #e2e8f0 描边、4px 圆角、内边距 10px 12px、无阴影。第一行 10px 全大写灰字标签，第二行 18px/600 等宽数字，第三行 10px 的涨跌（绿或红）。三张卡以上等宽横排，间距 12px。

### Status Tag

**Role:** 状态与分类标记

10px/500、4px 圆角、padding 2px 6px、无描边。进行中用蓝 10% 底配蓝 700 字，成功用绿 10% 配绿 700，失败用红 10% 配红 700。颜色必须与文字标签同时出现，不单靠色相。

### Admin Rail

**Role:** 左侧导航

宽 192px、#f8fafc 底、右侧 1px #e2e8f0 描边、垂直内边距 12px。项目高 26px、4px 圆角、12px 字、图标 14px。选中项蓝填充白字，hover 白底加墨字。分组标签 10px 全大写灰字，上间距 12px。

## Do's and Don'ts

### Do

- 字号 10 到 12px，最大 18px
- 间距以 4px 递增
- 行高固定 28px
- 数字与 ID 用等宽右对齐
- 用交替行色与 1px 线分层
- 状态色必须配文字标签

### Don't

- 不要用 16px 以上的内边距
- 不要用 8px 以上的圆角
- 不要给表格加阴影
- 不要用装饰性渐变
- 不要为了美观而加留白
- 不要用色相单独传达状态

## Surfaces

| Level | Name | Value | Purpose |
|---|---|---|---|
| 0 | White | `#ffffff` | 表格与面板 |
| 1 | Row Tint | `#f8fafc` | 交替行与表头 |
| 2 | Rail | `#f8fafc` | 左侧导航 |

## Elevation

- **None:** `none — 1px borders only`

## Imagery

几乎没有图像。允许头像 20px、图标 14px 与迷你趋势图（高度不超过 24px）。不使用大图、插画与背景纹理，它们会直接减少可显示的行数。

## Layout

左侧 192px 导航加右侧内容区，内容区上限 1600px、内边距 16px。顶部指标条 12px 间距，下方表格占满剩余高度。所有间距是 4 的倍数，表格行高固定 28px，一屏目标 35 行以上。

## Agent Prompt Guide

### Implementation Contract

- 以用户请求中的页面、用户任务和真实内容为依据，只实施指定范围；标明缺失的业务信息，不编造数据或能力。
- 先检查现有项目、技术栈与组件；沿用项目结构、路由和依赖，复用已有组件，不重建未要求的页面或功能。
- 沿用项目断点，调整窄屏与桌面的网格和留白；保留信息层级，避免意外横向溢出。
- 对本次涉及的交互，处理键盘焦点与减少动态效果；补齐适用的禁用、加载、空内容与错误状态。
- 完成后按项目现有脚本检查，仅报告实际运行的测试与视觉检查，并列出未验证项。

QUICK COLOR REFERENCE:

- text: `#1e293b`
- background: `#ffffff`
- rowTint: `#f8fafc`
- accent: `#3b82f6`
- muted: `#64748b`
- border: `#e2e8f0`

EXAMPLE COMPONENT PROMPTS:

1. 做一个数据表：外框 1px #e2e8f0、4px 圆角、无阴影。表头高 32px、底色 #f8fafc、10px 全大写 0.06em #64748b。行高 28px、内边距 8px 12px、交替行底色 #f8fafc、hover 整行 #eff6ff。数值列 font-variant-numeric: tabular-nums 并右对齐，状态列用 10px 标签（10% 底 + 实色文字，4px 圆角、padding 2px 6px）。
