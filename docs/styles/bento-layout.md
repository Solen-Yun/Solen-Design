# 便当盒布局 — 风格参考

> 大小不一的卡片在同一张网格里，用尺寸而不是颜色分出主次。

**Theme:** light

便当盒布局把页面当成一张 4 栏网格，卡片跨 1 列、2 列或 2 行，尺寸本身就是信息层级：最大的格子放主功能，最小的格子放补充说明。所有间隙必须一致（16px 或 24px），否则整张网格会散。卡片统一 24px 圆角、极浅描边、一层几乎看不见的阴影；hover 时上浮 4px、放大 1% 并把阴影扩到 0 8px 30px，像把一个真实的盒子往上提了一下。允许在少数卡片用渐变做视觉锚点，但整屏不超过两张。

## Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Ink | `#18181b` | `--color-ink` | 标题、主按钮与深色锚点卡。也是整张网格的对比基准。 |
| Snow | `#fafafa` | `--color-snow` | 页面画布。卡片比它亮一档，靠明度差浮起。 |
| Card White | `#ffffff` | `--color-card` | 所有卡片填充。不使用灰卡，层级只由尺寸与内容决定。 |
| Sky | `#3b82f6` | `--color-sky` | 主要强调与图标底。用于一张锚点卡片或一组图标。 |
| Violet | `#8b5cf6` | `--color-violet` | 第二强调，只与天蓝搭配出现在渐变锚点卡上。 |
| Tangerine | `#f97316` | `--color-tangerine` | 数据与提醒。全屏最多一处，用在小格子里。 |

## Typography

### Inter — 全站唯一字体。卡片标题用 600，网格标题用 700，正文 400。

- **Substitute:** system-ui, -apple-system, 'Segoe UI', sans-serif
- **Weights:** 400, 500, 600, 700
- **Sizes:** 12, 14, 16, 24, 32
- **Line height:** 1.15 (display), 1.25 (headings), 1.6 (body)
- **Letter spacing:** -0.02em on display, 0.02em on uppercase labels

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|---|---|---|---|---|---|---|
| display | — | 700 | 32px | 1.15 | -0.02em | `--text-display` |
| heading | — | 600 | 24px | 1.25 | — | `--text-heading` |
| body-lg | — | 500 | 16px | 1.5 | — | `--text-body-lg` |
| body | — | 400 | 14px | 1.6 | — | `--text-body` |
| label | — | 500 | 12px | 1.4 | 0.02em | `--text-label` |

## Spacing & Layout

**Base unit:** 8px
**Density:** comfortable

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
| cards | 24px |
| buttons | 12px |
| inputs | 12px |
| icons | 16px |

- **Page max-width:** 1152px
- **Section gap:** 64px
- **Card padding:** 24px
- **Element gap:** 16px

## Components

### Bento Cell

**Role:** 网格中的任意一张卡片

白底、24px 圆角、1px #f4f4f5 描边、内边距 24px（大格 32px）、阴影 0 2px 10px 2%。卡片默认跨 1 列，可按需跨 2 列或 2 行。hover 上浮 4px、缩放 1.01、阴影扩到 0 8px 30px 8%，过渡 300ms ease-out。

- **Sizes:** 1x1, 2x1, 2x2; padding 24px or 32px
- **States:** hover: lift 4px, scale 1.01, shadow widens

### Anchor Card

**Role:** 主功能卡，通常是 2x2 大格

墨黑填充或天蓝到紫的 135 度渐变、白字、32px 内边距。标题 24px/600，正文 14px 白 80%。图标 48px 见方、16px 圆角、白色 12% 底。hover 时阴影带主色（天蓝 30%）并上浮 4px。整屏只允许一张。

### Bento Grid Container

**Role:** 页面级网格容器

移动端 1 列、平板 2 列、桌面 4 列；间隙统一 16px（紧凑）或 24px（宽松），全页只选一种。行高用 grid-auto-rows 固定为 180px 的倍数，保证跨行卡片的比例稳定。

### Bento Tile Action

**Role:** 卡片内的按钮与链接

墨黑填充、白字、12px 圆角、字级 14px/500、padding 8px 18px，阴影一级。hover 换成墨黑 80% 并上浮 2px；按下缩放 0.95。深色卡内改用白底墨黑字。

## Do's and Don'ts

### Do

- 卡片尺寸必须有差异，尺寸就是层级
- 全页只用一个间隙值
- 圆角统一 24px，不混用 12px 与 32px
- hover 上浮 4px、放大 1%，300ms 内完成
- 锚点卡（渐变或墨黑）全屏不超过一张
- 移动端退化为单列，保留原有顺序

### Don't

- 不要让所有卡片同样大小
- 不要在页面里混用两种间隙
- 不要用直角
- 不要用硬偏移阴影（neo-brutalist 那一套）
- 不要在一张卡片里塞三段以上内容
- 不要让某一行只剩一张卡

## Surfaces

| Level | Name | Value | Purpose |
|---|---|---|---|
| 0 | Snow | `#fafafa` | 页面画布 |
| 1 | Card White | `#ffffff` | 标准卡片 |
| 2 | Ink Anchor | `#18181b` | 主功能卡，全屏不超过一张 |

## Elevation

- **Card rest:** `0 2px 10px rgba(0,0,0,0.02)`
- **Card hover:** `0 8px 30px rgba(0,0,0,0.08)`
- **Anchor card hover:** `0 12px 40px rgba(59,130,246,0.30)`

## Imagery

卡片里以产品截图、数据图表、图标网格和小段动效为主。允许在一张锚点卡上使用渐变作为图像替代。不使用大幅人物摄影或装饰性插画，它们会撑破网格。

## Layout

4 栏网格、上限 1152px、间隙 16px 或 24px、行高基准 180px。跨列与跨行必须成对出现：有 2x2 就至少配两个 1x1，避免整行只有一张卡。移动端退化为单列顺序流，保持同样的间隙值与内边距。

## Agent Prompt Guide

### Implementation Contract

- 以用户请求中的页面、用户任务和真实内容为依据，只实施指定范围；标明缺失的业务信息，不编造数据或能力。
- 先检查现有项目、技术栈与组件；沿用项目结构、路由和依赖，复用已有组件，不重建未要求的页面或功能。
- 沿用项目断点，调整窄屏与桌面的网格和留白；保留信息层级，避免意外横向溢出。
- 对本次涉及的交互，处理键盘焦点与减少动态效果；补齐适用的禁用、加载、空内容与错误状态。
- 完成后按项目现有脚本检查，仅报告实际运行的测试与视觉检查，并列出未验证项。

QUICK COLOR REFERENCE:

- text: `#18181b`
- background: `#fafafa`
- card: `#ffffff`
- accent: `#3b82f6`
- secondary: `#8b5cf6`
- border: `#f4f4f5`

EXAMPLE COMPONENT PROMPTS:

1. 做一个便当盒网格：桌面 4 栏、间隙 16px、行高基准 180px。第一张卡片跨 2 列 2 行、墨黑填充、白字、32px 内边距、24px 圆角；其余为白底 24px 圆角卡片，1px #f4f4f5 描边，内边距 24px。所有卡片 hover 上浮 4px、缩放 1.01、阴影从 0 2px 10px rgba(0,0,0,0.02) 扩到 0 8px 30px rgba(0,0,0,0.08)，300ms ease-out。

## Quick Start

```css

:root {
  /* Colors */
  --color-ink: #18181b;
  --color-snow: #fafafa;
  --color-card: #ffffff;
  --color-sky: #3b82f6;
  --color-violet: #8b5cf6;
  --color-tangerine: #f97316;

  /* Typography — Font Families */
  --font-sans: 'Inter', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;

  /* Typography — Scale */
  --text-display: 32px;
  --leading-display: 1.15;
  --tracking-display: -0.02em;
  --text-heading: 24px;
  --leading-heading: 1.25;
  --text-body-lg: 16px;
  --leading-body-lg: 1.5;
  --text-body: 14px;
  --leading-body: 1.6;
  --text-label: 12px;
  --leading-label: 1.4;
  --tracking-label: 0.02em;

  /* Typography — Weights */
  --font-weight-regular: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
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
  --page-max-width: 1152px;
  --section-gap: 64px;
  --card-padding: 24px;
  --element-gap: 16px;
  --density: comfortable;

  /* Border Radius */
  --radius-cards: 24px;
  --radius-buttons: 12px;
  --radius-inputs: 12px;
  --radius-icons: 16px;

  /* Surfaces */
  --surface-snow: #fafafa;
  --surface-card-white: #ffffff;
  --surface-ink-anchor: #18181b;
}

```
