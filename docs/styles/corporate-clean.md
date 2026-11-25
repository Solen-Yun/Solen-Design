# 企业简洁风 — 风格参考

> 克制的商务蓝，一切为可读性与信任感让路。

**Theme:** light

企业简洁风是一套被大量 B2B 产品验证过的默认解：浅灰蓝底、一个主蓝、白色卡片配极浅描边、12px 圆角。它不追求记忆点，追求的是零风险——任何人打开都不会觉得奇怪。层次靠 1px 边框与两级阴影（sm 与 md）建立，交互只做两件事：hover 时元素上浮半像素级并加深阴影，active 时缩小 2% 给出按压反馈。焦点环必须带 offset，这是无障碍底线。所有动效不超过 200ms，超过就开始显得轻浮。

## Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Corporate Blue | `#1e40af` | `--color-corporate-blue` | 主行动按钮、链接与关键图标。只用一个蓝，避免同一页面出现两种蓝。 |
| Slate Mist | `#f8fafc` | `--color-slate-mist` | 页面画布与区块交替底色。比纯白低一档，让白色卡片能浮起来。 |
| Action Blue | `#3b82f6` | `--color-action-blue` | 焦点环、选中态与数据高亮。不用于大面积填充。 |
| Slate | `#64748b` | `--color-slate` | 次要文字、说明与图标描边。层级后退时用它，而不是缩小字号。 |
| Confirm Green | `#10b981` | `--color-confirm-green` | 成功状态与正向指标。仅在状态语义明确时出现。 |
| Hint Violet | `#c559f0` | `--color-hint-violet` | 极少使用的第四强调，用于新产品标签与实验性功能。 |

## Typography

### Inter — 全站唯一字体。层级靠 400/500/600/700 四档字重与字号建立。

- **Substitute:** system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif
- **Weights:** 400, 500, 600, 700
- **Sizes:** 12, 14, 16, 20, 30, 36, 60
- **Line height:** 1.1 (display), 1.25 (headings), 1.65 (body)
- **Letter spacing:** -0.02em on display, 0.04em on uppercase labels

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|---|---|---|---|---|---|---|
| display | — | 700 | 60px | 1.1 | -0.02em | `--text-display` |
| heading-lg | — | 700 | 36px | 1.2 | -0.01em | `--text-heading-lg` |
| heading | — | 600 | 30px | 1.25 | -0.01em | `--text-heading` |
| subheading | — | 600 | 20px | 1.4 | — | `--text-subheading` |
| body-lg | — | 400 | 18px | 1.65 | — | `--text-body-lg` |
| body | — | 400 | 16px | 1.65 | — | `--text-body` |
| body-sm | — | 400 | 14px | 1.6 | — | `--text-body-sm` |
| label | — | 500 | 12px | 1.4 | 0.04em | `--text-label` |

## Spacing & Layout

**Base unit:** 8px
**Density:** comfortable

### Spacing Scale

| Name | Value | Token |
|---|---|---|
| 8 | 8px | `--spacing-8` |
| 12 | 12px | `--spacing-12` |
| 16 | 16px | `--spacing-16` |
| 24 | 24px | `--spacing-24` |
| 32 | 32px | `--spacing-32` |
| 48 | 48px | `--spacing-48` |
| 64 | 64px | `--spacing-64` |
| 96 | 96px | `--spacing-96` |
| 128 | 128px | `--spacing-128` |

### Border Radius

| Element | Value |
|---|---|
| cards | 12px |
| buttons | 8px |
| inputs | 8px |
| badges | 999px |

- **Page max-width:** 1120px
- **Section gap:** 96px
- **Card padding:** 24px
- **Element gap:** 16px

## Components

### Primary Button

**Role:** 主行动，例：Get Started

企业蓝填充、白字、8px 圆角、无描边。字级 14px、字重 500、padding 8px 16px。阴影 rest 为 0 1px 2px。hover 时换成更深的蓝并上浮 2px、阴影升到 0 4px 12px；active 时缩放 0.98 且去掉上浮。过渡 150ms ease-out。

- **Sizes:** padding 8px 16px; label 14px
- **States:** hover: lift 2px + deeper fill; active: scale 0.98; focus: 2px ring with 2px offset

### Feature Card

**Role:** 功能卡与内容容器

白底、1px #e5e7eb 描边、12px 圆角、1px 高度阴影、内边距 24px。标题 20px/600、正文 14px/石板灰。hover 时阴影升到 0 4px 12px 并上浮 2px。图标容器 40px 见方、12px 圆角、浅蓝底，hover 时填充企业蓝、图标转白、放大 1.1。

- **States:** hover: lift 2px, shadow md; icon: fill, white glyph, scale 1.1

### Form Input

**Role:** 表单输入与搜索

白底、1px #d1d5db 描边、8px 圆角、16px 字级、padding 8px 12px。标签 14px/500 深灰，帮助文字 12px 石板灰。聚焦时描边转企业蓝并加 2px 焦点环，环与元素之间留 2px offset；不改变盒子尺寸。

- **States:** focus: blue border + 2px ring, 2px offset

### Top Navigation

**Role:** 全站顶部导航

高 64px，白底、底部 1px 浅灰描边、无阴影。字标 18px/600 深灰；链接 14px/500 石板灰、间距 24px、hover 转深灰并上浮 1px；右侧一个主按钮。

### Status Badge

**Role:** 状态与分类标签

全圆角、12px 字号、500 字重、padding 4px 10px。默认浅蓝底配企业蓝字；成功用浅绿底配确认绿；提示用 1px 描边而不用填充。永远带一行小圆点或图标，不只靠颜色传达状态。

## Do's and Don'ts

### Do

- 只用一种蓝，主色与链接色同源
- 卡片用 1px 描边加一级浅阴影，不要用重阴影
- 焦点态必须带 2px offset 的焦点环
- hover 上浮不超过 2px，active 缩放不小于 0.98
- 动效不超过 200ms，用 ease-out
- 正文 16px 起，行高 1.65，行长控制在 70 字符内

### Don't

- 不要在同一页面出现两种主色蓝
- 不要用渐变按钮
- 不要用直角或大于 16px 的圆角
- 不要用重阴影（shadow-2xl 一类）
- 不要省略 focus 环的 offset
- 不要让按钮缺少 active 反馈，否则按钮像装饰

## Surfaces

| Level | Name | Value | Purpose |
|---|---|---|---|
| 0 | Slate Mist | `#f8fafc` | 页面画布 |
| 1 | White Card | `#ffffff` | 卡片、面板、弹层 |

## Elevation

- **Rest:** `0 1px 2px rgba(15,23,42,0.06)`
- **Hover:** `0 4px 12px rgba(15,23,42,0.08)`
- **Focus ring:** `0 0 0 2px #f8fafc, 0 0 0 4px #3b82f6`

## Imagery

产品截图与界面局部为主，白底或浅灰底、干净的设备外框、无人物特写。允许灰度图标与线稿示意。不使用抽象渐变、夸张插画或高饱和摄影。

## Layout

12 栏、上限 1120px，容器内边距 16px 到 32px。区块间距 96px，卡片间距 24px，栅格用 24px 间距。hero 居中或左文右图，左右比例 1:1 或 6:6。表单与设置页用单栏，宽度不超过 640px。

## Agent Prompt Guide

### Implementation Contract

- 以用户请求中的页面、用户任务和真实内容为依据，只实施指定范围；标明缺失的业务信息，不编造数据或能力。
- 先检查现有项目、技术栈与组件；沿用项目结构、路由和依赖，复用已有组件，不重建未要求的页面或功能。
- 沿用项目断点，调整窄屏与桌面的网格和留白；保留信息层级，避免意外横向溢出。
- 对本次涉及的交互，处理键盘焦点与减少动态效果；补齐适用的禁用、加载、空内容与错误状态。
- 完成后按项目现有脚本检查，仅报告实际运行的测试与视觉检查，并列出未验证项。

QUICK COLOR REFERENCE:

- text: `#0f172a`
- background: `#f8fafc`
- card: `#ffffff`
- primary: `#1e40af`
- muted: `#64748b`
- border: `#e5e7eb`

EXAMPLE COMPONENT PROMPTS:

1. 做一个企业 SaaS 卡片：白底、1px #e5e7eb 描边、12px 圆角、阴影 0 1px 2px rgba(15,23,42,0.06)、内边距 24px。左上 40px 见方的浅蓝图标块（12px 圆角），下面是 20px/600 标题和 14px #64748b 正文。hover 时阴影变 0 4px 12px 并上浮 2px。
