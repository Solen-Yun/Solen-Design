# 全屏滚动布局 — 风格参考

> 一屏一个场景，滚动一下换一幕：页面即分镜。

**Theme:** dark

全屏滚动布局把每个 section 做成 100vh 的独立场景，用 scroll-snap 强制吸附（scroll-snap-type: y mandatory），再配 scroll-behavior: smooth。它的成败全在细节：内容绝不能溢出单屏、必须给滚动提示、动画必须轻、锁定滚动的时间不能太长。最容易被忽略的一条是过渡延迟必须错落——如果所有元素同时进场，景深消失，页面就会像幻灯片而不是场景。

## Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Curtain Black | `#000000` | `--color-curtain-black` | 场景默认底。无纹理无渐变，让每屏的内容自己成立。 |
| Stage White | `#ffffff` | `--color-stage-white` | 反色场景底。黑白场景交替是这套布局最常用的节奏工具。 |
| Indigo | `#6366f1` | `--color-indigo` | 主行动与进度指示，跨所有场景保持一致。 |
| Magenta | `#ec4899` | `--color-magenta` | 情绪转折场景的强调色，用于打破黑白节奏。 |
| Teal | `#14b8a6` | `--color-teal` | 数据与功能场景，作为「理性」的一侧。 |
| Amber | `#f59e0b` | `--color-amber` | 提示与行动号召，出现频率最低。 |

## Typography

### Inter — 全站唯一字体。场景标题 44 到 64px 配紧字距，小标签 12px 全大写。

- **Substitute:** -apple-system, 'Helvetica Neue', system-ui, sans-serif
- **Weights:** 400, 500, 700
- **Sizes:** 12, 14, 18, 28, 44, 64
- **Line height:** 1.05 (display), 1.15 (headings), 1.55 (body)
- **Letter spacing:** -0.03em on display, 0.12em on uppercase labels

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|---|---|---|---|---|---|---|
| display | — | 700 | 64px | 1.05 | -0.03em | `--text-display` |
| heading-lg | — | 700 | 44px | 1.1 | -0.025em | `--text-heading-lg` |
| heading | — | 600 | 28px | 1.2 | — | `--text-heading` |
| body-lg | — | 400 | 18px | 1.55 | — | `--text-body-lg` |
| body | — | 400 | 14px | 1.55 | — | `--text-body` |
| label | — | 500 | 12px | 1.4 | 0.12em | `--text-label` |

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

### Border Radius

| Element | Value |
|---|---|
| cards | 20px |
| buttons | 999px |
| inputs | 12px |

- **Page max-width:** 1120px
- **Section gap:** 0px
- **Card padding:** 32px
- **Element gap:** 24px

## Components

### Snap Section

**Role:** 全屏场景容器

高 100vh（移动端用 100dvh 避免地址栏跳动）、scroll-snap-align: start、内容垂直居中、最大宽度 1120px、内边距 48px。内容必须能在单屏内看完，不允许内部再滚动。相邻场景底色交替（黑 / 白 / 图）形成剪辑感。

- **Sizes:** 100vh per scene

### Staggered Reveal

**Role:** 场景内元素进场

当一个场景进入视口时，元素依次以 80ms 的间隔上浮并淡入（translateY 24px → 0，opacity 0 → 1，600ms ease-out）。第一个元素延迟 0，第二个 80ms，第三个 160ms，最多延到 320ms。所有元素同时进场会让景深消失，这是硬禁令。

### Scroll Cue

**Role:** 滚动提示（必须存在）

固定在视口底部居中，距底 32px：一个 24px 高的细箭头或 1px 竖线，下方 12px 全大写 0.12em 的提示文字，整体做 2 秒的往复淡入淡出。最后一个场景切换为「回到顶部」。

### Scene Progress

**Role:** 场景进度指示

固定在右侧中部，竖排 n 个 8px 圆点，间距 12px。当前场景的圆点拉伸为 24px 的短竖条并填充靛蓝，其余为白 30%。点击圆点跳转到对应场景，跳转用 smooth 但不做长时锁定。

### Scene CTA

**Role:** 场景内行动按钮

靛蓝填充、白字、999px 全圆角、16px/500、padding 14px 32px，阴影 0 8px 20px 靛蓝 30%。hover 时提亮并上浮 2px；按下缩放 0.98。每个场景最多一个。

## Do's and Don'ts

### Do

- 用 scroll-snap-type: y mandatory 吸附
- 一屏内容必须装得下
- 必须有滚动提示
- 进场延迟按 80ms 错落
- 移动端用 100dvh
- 场景底色交替形成剪辑感

### Don't

- 不要让内容溢出单屏
- 不要省略滚动提示
- 不要用过于复杂的动画
- 不要长时间锁定滚动
- 不要忽略移动端体验
- 不要让所有元素同一延迟进场

## Surfaces

| Level | Name | Value | Purpose |
|---|---|---|---|
| 0 | Curtain Black | `#000000` | 深色场景 |
| 1 | Stage White | `#ffffff` | 浅色场景 |
| 2 | Scene Image | `full-bleed photo` | 图像场景 |

## Elevation

- **Card:** `0 16px 40px rgba(0,0,0,0.30)`
- **Button:** `0 8px 20px rgba(99,102,241,0.30)`

## Imagery

每个图像场景用一张全幅照片或渲染图，必须能承载白色或黑色文字（自带明暗区）。允许 20% 的暗角遮罩。不用装饰插画与图标墙。

## Layout

上限 1120px，每个 section 100vh 且 scroll-snap-align: start，容器设 scroll-snap-type: y mandatory。内容垂直居中、单列、行宽不超过 40 字符。场景之间不加留白与分隔线——吸附本身就是分隔。

## Agent Prompt Guide

### Implementation Contract

- 以用户请求中的页面、用户任务和真实内容为依据，只实施指定范围；标明缺失的业务信息，不编造数据或能力。
- 先检查现有项目、技术栈与组件；沿用项目结构、路由和依赖，复用已有组件，不重建未要求的页面或功能。
- 沿用项目断点，调整窄屏与桌面的网格和留白；保留信息层级，避免意外横向溢出。
- 对本次涉及的交互，处理键盘焦点与减少动态效果；补齐适用的禁用、加载、空内容与错误状态。
- 完成后按项目现有脚本检查，仅报告实际运行的测试与视觉检查，并列出未验证项。

QUICK COLOR REFERENCE:

- text: `#ffffff`
- background: `#000000`
- accent: `#6366f1`
- magenta: `#ec4899`
- teal: `#14b8a6`
- muted: `#a1a1aa`

EXAMPLE COMPONENT PROMPTS:

1. 做一个全屏滚动页面：容器设 scroll-snap-type: y mandatory、scroll-behavior: smooth。每个 section 高 100dvh、scroll-snap-align: start、内容垂直居中、最大宽度 1120px、内边距 48px。相邻场景底色交替黑与白。场景进入视口时元素按 80ms 间隔依次 translateY(24px) → 0、opacity 0 → 1、600ms ease-out。底部固定一个 24px 的滚动提示箭头与 12px 全大写文字，2 秒往复淡入淡出。

## Quick Start

```css

:root {
  /* Colors */
  --color-curtain-black: #000000;
  --color-stage-white: #ffffff;
  --color-indigo: #6366f1;
  --color-magenta: #ec4899;
  --color-teal: #14b8a6;
  --color-amber: #f59e0b;

  /* Typography — Font Families */
  --font-sans: 'Inter', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;

  /* Typography — Scale */
  --text-display: 64px;
  --leading-display: 1.05;
  --tracking-display: -0.03em;
  --text-heading-lg: 44px;
  --leading-heading-lg: 1.1;
  --tracking-heading-lg: -0.025em;
  --text-heading: 28px;
  --leading-heading: 1.2;
  --text-body-lg: 18px;
  --leading-body-lg: 1.55;
  --text-body: 14px;
  --leading-body: 1.55;
  --text-label: 12px;
  --leading-label: 1.4;
  --tracking-label: 0.12em;

  /* Typography — Weights */
  --font-weight-regular: 400;
  --font-weight-medium: 500;
  --font-weight-bold: 700;

  /* Spacing */
  --spacing-unit: 8px;
  --spacing-8: 8px;
  --spacing-16: 16px;
  --spacing-24: 24px;
  --spacing-32: 32px;
  --spacing-48: 48px;
  --spacing-64: 64px;
  --spacing-96: 96px;

  /* Layout */
  --page-max-width: 1120px;
  --section-gap: 0px;
  --card-padding: 32px;
  --element-gap: 24px;
  --density: airy;

  /* Border Radius */
  --radius-cards: 20px;
  --radius-buttons: 999px;
  --radius-inputs: 12px;

  /* Surfaces */
  --surface-curtain-black: #000000;
  --surface-stage-white: #ffffff;
  --surface-scene-image: full-bleed photo;
}

```
