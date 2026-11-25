# 滚动叙事 — 风格参考

> 滚动手势就是时间轴：画面钉住，文字一步步走过，每步换一个状态。

**Theme:** dark

滚动叙事是数据长报道的语法：一个 sticky 画布钉在视口里，文字步骤从它旁边滚过，每一步触发一次离散的状态变化（数字滚动、形状变形、图层点亮）。它与「滚动擦洗」的关键区别在于离散而非连续——用 IntersectionObserver 检测每一步进入视口再切换状态，绝不在 scroll 事件里读 offsetTop 或 getBoundingClientRect 做连续计算，那会卡顿。画布只改 transform 与 opacity，绝不改 top、width、height。数值必须有 DOM 里的静态文本作为真实来源，因为计数器读屏与 SEO 都读不到。

## Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Deep Base | `#0e1116` | `--color-deep-base` | 页面底。数据长报道的沉浸底色。 |
| Warm White | `#f7f5f0` | `--color-warm-white` | 正文与画布标注。比纯白暖，长时间阅读不刺眼。 |
| Signal Blue | `#2f6fed` | `--color-signal-blue` | 当前焦点的唯一标记：活动步骤、高亮数据点、进度。 |
| Vermilion | `#e8503a` | `--color-vermilion` | 只用于对比与警示，不参与常规强调。 |
| Mid Ink | `#1c2530` | `--color-mid-ink` | 卡片与画布衬底，比深底亮一档。 |

## Typography

### Inter — 全站唯一字体。步骤标题 24 到 36px、600 字重，正文 17px、行高 1.6。

- **Substitute:** -apple-system, 'Helvetica Neue', system-ui, sans-serif
- **Weights:** 400, 600, 700
- **Sizes:** 12, 14, 17, 24, 36, 48
- **Line height:** 1.1 (display), 1.2 (headings), 1.6 (body)
- **Letter spacing:** -0.02em on display, 0.14em on uppercase labels

### JetBrains Mono — 步骤编号、坐标轴刻度与数值标签。等宽让数据可被比较。

- **Substitute:** ui-monospace, 'Courier New', monospace
- **Weights:** 400, 700
- **Sizes:** 11, 13
- **Line height:** 1.4 (display), 1.4 (headings), 1.5 (body)
- **Letter spacing:** 0.04em on display, 0.14em on uppercase labels

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|---|---|---|---|---|---|---|
| display | Inter | 700 | 48px | 1.1 | -0.02em | `--text-display` |
| heading | Inter | 700 | 36px | 1.15 | — | `--text-heading` |
| subheading | Inter | 600 | 24px | 1.25 | — | `--text-subheading` |
| body-lg | Inter | 400 | 17px | 1.6 | — | `--text-body-lg` |
| body | Inter | 400 | 14px | 1.6 | — | `--text-body` |
| label | JetBrains Mono | 400 | 11px | 1.4 | 0.14em | `--text-label` |

## Spacing & Layout

**Base unit:** 8px
**Density:** airy

### Spacing Scale

| Name | Value | Token |
|---|---|---|
| 8 | 8px | `--spacing-8` |
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
| cards | 8px |
| buttons | 6px |
| dots | 999px |

- **Page max-width:** 1200px
- **Section gap:** 128px
- **Card padding:** 24px
- **Element gap:** 24px

## Components

### Sticky Canvas

**Role:** 钉住的画布（核心组件）

外层高 300vh，内层 sticky top-0、高 100vh、含一个 canvas 或 SVG。每一步由 IntersectionObserver 触发，把画布切到该步的离散状态（不做连续擦洗）。所有状态切换只改 transform 与 opacity，绝不改 top、width、height。prefers-reduced-motion 时直接跳到各步的终态。

- **Sizes:** outer 300vh; sticky 100vh

### Step Block

**Role:** 叙事步骤块

左侧 2px 信号蓝竖线、内边距 0 0 0 24px，行高 96px 以上。上方 11px 等宽全大写步骤编号（Step 02），标题 24 到 36px/600，正文 17px 暖白 70%、最大宽度 28rem。当前步骤的竖线与编号升到 100% 不透明度，非当前降到 30%。

### Progress Rail

**Role:** 进度轨

固定在视口右侧中部，宽 2px、高 40vh，底槽为暖白 15%。已完成部分填信号蓝，高度按当前步骤索引递增。旁边等宽显示「02 / 07」。

### Figure Label

**Role:** 图注与数值标注

图注 11px 等宽全大写、暖白 50%、位于图下方 12px。关键数值必须同时以静态 DOM 文本存在（而不是只由计数器渲染），字体 13px 等宽、信号蓝。

### Next Button

**Role:** 章节推进按钮

信号蓝填充、白字、6px 圆角、14px/600、padding 10px 20px，hover 时填充加深到 #2560d4；按下缩放 0.98。焦点环 2px 信号蓝 50% 且 offset 必须取深底色，否则在暗底上看不见。

## Do's and Don'ts

### Do

- 用 IntersectionObserver 触发离散状态
- 画布只改 transform 与 opacity
- 一步只讲一个新信息
- 数值必须有静态 DOM 文本
- 只用两个强调色
- reduced-motion 时跳到终态

### Don't

- 不要在 scroll 里读 offsetTop 做连续擦洗
- 不要一步塞多个新信息
- 不要改画布的布局属性
- 不要让计数器成为唯一数值来源
- 不要在移动端让画布挤掉文字
- 不要超过两个强调色

## Surfaces

| Level | Name | Value | Purpose |
|---|---|---|---|
| 0 | Deep Base | `#0e1116` | 页面底 |
| 1 | Mid Ink | `#1c2530` | 卡片与画布衬底 |

## Elevation

- **None:** `none — the canvas carries the depth`
- **Card:** `0 8px 24px rgba(0,0,0,0.35)`

## Imagery

图表即图像：折线、面积、散点、地图与流程，全部由画布绘制并随步骤切换状态。允许一条底线示意与少量标注。不使用装饰摄影与插画，任何图像都必须承担数据。

## Layout

上限 1200px。桌面为左右分栏：左侧 45% 放钉住的画布或右侧 55% 放滚动的文字（或反之），文字列最大宽度 28rem。移动端改为上图下文，画布高度降到 50vh，绝不挤掉文字。

## Agent Prompt Guide

### Implementation Contract

- 以用户请求中的页面、用户任务和真实内容为依据，只实施指定范围；标明缺失的业务信息，不编造数据或能力。
- 先检查现有项目、技术栈与组件；沿用项目结构、路由和依赖，复用已有组件，不重建未要求的页面或功能。
- 沿用项目断点，调整窄屏与桌面的网格和留白；保留信息层级，避免意外横向溢出。
- 对本次涉及的交互，处理键盘焦点与减少动态效果；补齐适用的禁用、加载、空内容与错误状态。
- 完成后按项目现有脚本检查，仅报告实际运行的测试与视觉检查，并列出未验证项。

QUICK COLOR REFERENCE:

- text: `#f7f5f0`
- background: `#0e1116`
- accent: `#2f6fed`
- alert: `#e8503a`
- card: `#1c2530`
- muted: `#8b94a3`

EXAMPLE COMPONENT PROMPTS:

1. 做一个滚动叙事页面：深底 #0e1116、暖白文字 #f7f5f0。左侧一块 sticky top-0、高 100vh 的画布（外层 300vh），右侧是滚动的步骤块（左边 2px #2f6fed 竖线、11px 等宽全大写步骤编号、24px/600 标题、17px 正文）。用 IntersectionObserver 检测每步进入视口后把画布切到该步的离散状态，画布只改 transform 与 opacity。当前步骤的竖线与编号 100% 不透明、其余 30%。关键数值必须有静态 DOM 文本。reduced-motion 时直接跳到终态。
