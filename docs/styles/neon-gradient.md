# 霓虹渐变 — 风格参考

> 深紫底上一张张渐变卡片，边缘发着光。

**Theme:** dark

霓虹渐变是近年 SaaS 与年轻品牌最常见的视觉：深紫黑底（#0f0a1e）上放一张张渐变填充的卡片（紫到粉、青到绿等对角渐变），卡片用 16 到 24px 的大圆角与粗彩色描边，边缘带同色霓虹发光，标题可以是纯白或渐变文字，按钮是渐变加外发光。它的规则是「渐变必须有明确的两极」——从一支饱和色到另一支饱和色，不允许三色以上的浑浊过渡；而且发光必须与渐变同色，否则会显脏。

## Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Deep Violet Ground | `#0f0a1e` | `--color-deep-violet` | 页面底。带紫的近黑，让所有渐变都显得更亮。 |
| Violet | `#a855f7` | `--color-violet` | 渐变的第一极，也是主按钮的起点。 |
| Pink | `#f472b6` | `--color-pink` | 渐变的第二极，与紫成对出现。 |
| Cyan | `#22d3ee` | `--color-cyan` | 第二组渐变的冷极，用于数据与科技语义。 |
| Lime | `#a3e635` | `--color-lime` | 第二组渐变的暖极与成功状态。 |
| Amber | `#fbbf24` | `--color-amber` | 第三组渐变与徽标高亮。 |

## Typography

### Inter — 全站唯一字体。标题 34 到 48px 配紧字距，可用渐变文字。

- **Substitute:** system-ui, -apple-system, 'Segoe UI', sans-serif
- **Weights:** 400, 600, 700
- **Sizes:** 12, 14, 17, 24, 34, 48
- **Line height:** 1.1 (display), 1.2 (headings), 1.6 (body)
- **Letter spacing:** -0.02em on display, 0.1em on uppercase labels

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|---|---|---|---|---|---|---|
| display | — | 700 | 48px | 1.1 | -0.02em | `--text-display` |
| heading | — | 700 | 34px | 1.15 | -0.02em | `--text-heading` |
| subheading | — | 600 | 24px | 1.25 | — | `--text-subheading` |
| body-lg | — | 400 | 17px | 1.55 | — | `--text-body-lg` |
| body | — | 400 | 14px | 1.6 | — | `--text-body` |
| label | — | 600 | 12px | 1.45 | 0.1em | `--text-label` |

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
| 128 | 128px | `--spacing-128` |

### Border Radius

| Element | Value |
|---|---|
| cards | 24px |
| buttons | 16px |
| inputs | 16px |
| pills | 999px |

- **Page max-width:** 1200px
- **Section gap:** 96px
- **Card padding:** 28px
- **Element gap:** 20px

## Components

### Gradient Card

**Role:** 渐变卡片（核心组件）

135 度的双极渐变填充（紫到粉，或青到青柠）、24px 圆角、1px 白 20% 描边、内边距 28px，外发光 0 0 32px 紫 45%——发光必须取渐变的主极色。标题纯白 34px/700，正文白 85%。hover 时渐变角度转为 180 度并让发光扩到 40px。

- **States:** hover: gradient rotates, glow 40px

### Gradient Button

**Role:** 主行动按钮

紫到粉横向渐变、白字、16px 圆角、无描边、17px/600、padding 12px 28px，外发光 0 8px 32px 紫 50%。hover 时渐变横向位移（background-position 从 left 到 right）、发光扩到 40px；按下缩放 0.98。渐变必须设 background-size: 200% 才有可动的余量。

- **Sizes:** padding 12px 28px; label 17px
- **States:** hover: gradient slides, glow 40px; active: scale 0.98

### Gradient Text

**Role:** 渐变标题

用 background: linear-gradient(90deg, 紫, 粉) 配 background-clip: text 与 color: transparent。只用于首屏与关键区块标题，且同一页不超过两处——用多了整页会失去重点。绝不用于正文。

### Glow Border

**Role:** 发光描边

1px 渐变描边（用 padding 1px 的渐变层加内层深底实现），外带 0 0 24px 的同色发光。用于次级卡片与输入框，替代实色描边。描边颜色必须与卡片的渐变同族。

### Sparkle Badge

**Role:** 徽标与图标底

999px 全圆或 12px 圆角的小块，填渐变或渐变 20% 底，内放一个 16 到 20px 的线性图标（星、火箭、闪光）。图标用白色，绝不用彩色图标压在彩色渐变上——那会糊。

## Do's and Don'ts

### Do

- 渐变必须有两个饱和极
- 发光与渐变同色
- 卡片圆角 24px，按钮 16px
- 渐变文字最多两处
- 按钮渐变设 background-size 200%
- 同屏渐变不超过三组

### Don't

- 不要用三色以上的浑浊渐变
- 不要让发光与渐变不同色
- 不要在正文用渐变文字
- 不要用彩色图标压彩色渐变
- 不要用写实摄影抢亮度
- 不要用锐角

## Surfaces

| Level | Name | Value | Purpose |
|---|---|---|---|
| 0 | Deep Violet | `#0f0a1e` | 页面底 |
| 1 | Violet→Pink | `linear-gradient(135deg, #a855f7, #f472b6)` | 卡片渐变 |
| 2 | Cyan→Lime | `linear-gradient(135deg, #22d3ee, #a3e635)` | 第二组渐变 |

## Elevation

- **Violet glow:** `0 0 32px rgba(168,85,247,0.45)`
- **Pink glow:** `0 0 40px rgba(244,114,182,0.40)`
- **Button glow:** `0 8px 32px rgba(168,85,247,0.50)`

## Imagery

以渐变、抽象图形与图标为主。允许产品截图放在渐变卡片里。不使用写实摄影、灰度图像与柔和插画，它们会与渐变抢亮度。

## Layout

上限 1200px、容器内边距 24px，区块间距 96px。卡片可大小不一（1×1 与 2×1），但同一屏的渐变不超过三组。整页保持深紫底，渐变块之间留出足够暗区，否则发光会互相污染。

## Agent Prompt Guide

### Implementation Contract

- 以用户请求中的页面、用户任务和真实内容为依据，只实施指定范围；标明缺失的业务信息，不编造数据或能力。
- 先检查现有项目、技术栈与组件；沿用项目结构、路由和依赖，复用已有组件，不重建未要求的页面或功能。
- 沿用项目断点，调整窄屏与桌面的网格和留白；保留信息层级，避免意外横向溢出。
- 对本次涉及的交互，处理键盘焦点与减少动态效果；补齐适用的禁用、加载、空内容与错误状态。
- 完成后按项目现有脚本检查，仅报告实际运行的测试与视觉检查，并列出未验证项。

QUICK COLOR REFERENCE:

- text: `#ffffff`
- background: `#0f0a1e`
- violet: `#a855f7`
- pink: `#f472b6`
- cyan: `#22d3ee`
- lime: `#a3e635`

EXAMPLE COMPONENT PROMPTS:

1. 做一个霓虹渐变卡片：background linear-gradient(135deg, #a855f7, #f472b6)、24px 圆角、1px rgba(255,255,255,0.2) 描边、内边距 28px、box-shadow 0 0 32px rgba(168,85,247,0.45)。标题 34px/700 纯白，正文 14px rgba(255,255,255,0.85)。按钮紫到粉横向渐变、background-size 200%、16px 圆角、白字 17px/600、padding 12px 28px、box-shadow 0 8px 32px rgba(168,85,247,0.5)，hover 时 background-position 从 left 移到 right、发光扩到 40px。页面底色 #0f0a1e，同屏渐变不超过三组。
