# 任务控制台风 — 风格参考

> 近黑底、1px 白线、一支靛紫渐变：精密仪器般的工作界面。

**Theme:** dark

任务控制台风是近年产品界常见的暗色系统。它的层次极薄：底色近黑（#0a0a0b），面板只提亮 3% 到 6%，边框一律 1px 白色 10%，几乎没有阴影。唯一的颜色是靛紫到紫的渐变，只出现在主按钮与品牌标记上。交互的核心纪律是「只用不透明度」——hover 不改颜色，只把文字从 70% 提到 100%，把面板从 3% 提到 6%，过渡 150ms。这套克制让高密度的产品界面读起来安静。

## Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Near Black | `#0a0a0b` | `--color-near-black` | 页面底。不用纯黑，否则面板提亮时没有对比空间。 |
| Panel | `rgba(255,255,255,0.03)` | `--color-panel` | 卡片与行容器，hover 时升到 6%。全站唯一的分层手段。 |
| Indigo | `#5e6ad2` | `--color-indigo` | 主按钮起点、选中态与链接。全局唯一的品牌色。 |
| Violet | `#8b5cf6` | `--color-violet` | 渐变的终点。只与靛紫成对出现，不单独使用。 |
| Amber | `#f2c94c` | `--color-amber` | 优先级与阻塞状态，只用于 8px 圆点与短标签。 |
| Green | `#27ae60` | `--color-green` | 已完成与在线，用于状态点。 |
| Red | `#eb5757` | `--color-red` | 紧急与错误，出现在状态点与删除动作上。 |

## Typography

### Inter — 全站唯一字体，字级极小（11 到 14px）并统一 -0.01em 字距。密而清晰是这套风格的语气。

- **Substitute:** -apple-system, 'SF Pro Text', system-ui, sans-serif
- **Weights:** 400, 500, 600
- **Sizes:** 11, 12, 13, 14, 16, 20, 24
- **Line height:** 1.2 (display), 1.3 (headings), 1.5 (body)
- **Letter spacing:** -0.01em on display, 0.02em on uppercase labels

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|---|---|---|---|---|---|---|
| heading | — | 600 | 24px | 1.25 | -0.01em | `--text-heading` |
| subheading | — | 600 | 20px | 1.3 | — | `--text-subheading` |
| body-lg | — | 500 | 16px | 1.5 | — | `--text-body-lg` |
| body | — | 400 | 13px | 1.5 | — | `--text-body` |
| body-sm | — | 400 | 12px | 1.45 | — | `--text-body-sm` |
| label | — | 500 | 11px | 1.4 | 0.02em | `--text-label` |

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
| 20 | 20px | `--spacing-20` |
| 24 | 24px | `--spacing-24` |
| 32 | 32px | `--spacing-32` |
| 48 | 48px | `--spacing-48` |

### Border Radius

| Element | Value |
|---|---|
| cards | 8px |
| buttons | 8px |
| inputs | 8px |
| pills | 999px |

- **Page max-width:** 1280px
- **Section gap:** 32px
- **Card padding:** 20px
- **Element gap:** 8px

## Components

### Gradient Button

**Role:** 主行动按钮

靛紫到紫的横向渐变、白字、8px 圆角、无描边。字级 14px、字重 500、padding 8px 16px。hover 不换色，只把整体不透明度降到 90%；按下降到 80%。过渡 150ms，只动 opacity。

- **Sizes:** padding 8px 16px; label 14px
- **States:** hover: opacity 90%; active: opacity 80%

### Issue Card

**Role:** 卡片、列表行与看板项

白 3% 填充、1px 白 10% 描边、8px 圆角、内边距 20px，无阴影。标题 14px/500 纯白，说明 12px 白 50%，时间戳 11px 白 40%。左侧放一个 16px 的状态圆环（2px 描边、按状态取色）。hover 时填充升到 6%，过渡 150ms。

- **States:** hover: fill 3%→6%

### Dark Input

**Role:** 表单与搜索

白 3% 填充、1px 白 10% 描边、8px 圆角、padding 8px 12px、13px 字。标签 12px 白 60%。聚焦时描边转靛紫 50%、填充升到 5%，不加外环。过渡 150ms。

- **States:** focus: border indigo 50%, fill 5%

### Command Bar

**Role:** 顶部命令栏与浮层

白 4% 填充、1px 白 10% 描边、12px 圆角、12px 模糊、内边距 8px。左侧搜索图标 16px、占位文字 13px 白 50%、右侧放一个 ⌘K 提示（11px、白 30%）。展开时容器高度 360px、选项行高 36px、hover 行填充白 6%。

## Do's and Don'ts

### Do

- 近黑底，不用纯黑
- 分层只靠白 3% 与 6% 两档填充
- 边框一律 1px 白 10%
- hover 只改不透明度，不改颜色
- 唯一渐变只给主按钮
- 字级 11 到 14px，统一 -0.01em 字距

### Don't

- 不要用浅色背景
- 不要用彩色阴影或大面积阴影
- 不要引入第二种字体
- 不要用高饱和色，除品牌紫外
- 不要靠阴影分层
- 不要用超过 150ms 的动效

## Surfaces

| Level | Name | Value | Purpose |
|---|---|---|---|
| 0 | Near Black | `#0a0a0b` | 页面底 |
| 1 | Panel 3% | `rgba(255,255,255,0.03)` | 卡片与行 |
| 2 | Panel 6% | `rgba(255,255,255,0.06)` | hover 与浮层 |

## Elevation

- **None:** `none — 1px borders only`
- **Flyout:** `0 12px 32px rgba(0,0,0,0.55)`

## Imagery

几乎不用图像。允许头像 16px、状态圆点、极小的品牌标记。不使用摄影、插画与背景图，任何图像都会破坏这套系统的密度感。

## Layout

上限 1280px、容器内边距 16px，区块间距 32px，卡片间距 8px。左侧 240px 导航加右侧列表，列表行高 56px。整体密度接近桌面应用，留白只出现在区块之间。

## Agent Prompt Guide

### Implementation Contract

- 以用户请求中的页面、用户任务和真实内容为依据，只实施指定范围；标明缺失的业务信息，不编造数据或能力。
- 先检查现有项目、技术栈与组件；沿用项目结构、路由和依赖，复用已有组件，不重建未要求的页面或功能。
- 沿用项目断点，调整窄屏与桌面的网格和留白；保留信息层级，避免意外横向溢出。
- 对本次涉及的交互，处理键盘焦点与减少动态效果；补齐适用的禁用、加载、空内容与错误状态。
- 完成后按项目现有脚本检查，仅报告实际运行的测试与视觉检查，并列出未验证项。

QUICK COLOR REFERENCE:

- text: `#ffffff`
- background: `#0a0a0b`
- panel: `rgba(255,255,255,0.03)`
- accent: `#5e6ad2`
- muted: `#8a8a94`
- border: `rgba(255,255,255,0.10)`

EXAMPLE COMPONENT PROMPTS:

1. 做一个任务控制台风卡片：背景 rgba(255,255,255,0.03)、1px rgba(255,255,255,0.1) 描边、8px 圆角、内边距 20px、无阴影。标题 14px/500 纯白，说明 12px rgba(255,255,255,0.5)。hover 时背景升到 rgba(255,255,255,0.06)，transition 150ms。页面底色 #0a0a0b，主按钮用 linear-gradient(to right, #5e6ad2, #8b5cf6)。
