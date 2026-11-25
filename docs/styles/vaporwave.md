# 霓虹复古 — 风格参考

> 粉紫青三色渐变、扫描线、故障位移：一个坏掉的 1987 年系统。

**Theme:** dark

霓虹复古（Vaporwave / Synthwave）是 80 到 90 年代未来想象的回收：粉、紫、青三色渐变铺底，霓虹发光必须是双色重影（粉与青各偏移 1 到 2px），扫描线与网格背景暗示 CRT 与透视地面。它的交互语汇也来自旧系统——点击时元素做 2px 的错位抖动，像错误弹窗。动效刻意慢：hover 用长时间漂浮而不是快速响应。禁止单调灰、禁止现代极简、禁止单色发光。

## Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Neon Pink | `#ff71ce` | `--color-neon-pink` | 第一主色与发光重影的暖侧。标题与主按钮的核心。 |
| Seafoam Cyan | `#01cdfe` | `--color-cyan` | 第二主色与发光重影的冷侧。与粉成对出现，不可单独使用。 |
| Midnight | `#0d0221` | `--color-midnight` | 页面底。带紫的近黑，让粉与青的发光都能浮起来。 |
| Mint | `#05ffa1` | `--color-mint` | 成功与「在线」状态，是第三支霓虹。 |
| Violet | `#b967ff` | `--color-violet` | 渐变的中间站，用于让粉过渡到青。 |
| Sunlight | `#fffb96` | `--color-sunlight` | 高亮与关键数值，面积最小。 |

## Typography

### Space Grotesk — 标题用方形无衬线，小标签用等宽全大写加 0.24em 的宽字距——宽字距是这套风格最强的年代信号。

- **Substitute:** 'Arial Black', 'Courier New', sans-serif
- **Weights:** 500, 700
- **Sizes:** 12, 14, 18, 24, 36, 52
- **Line height:** 1.05 (display), 1.15 (headings), 1.6 (body)
- **Letter spacing:** 0.02em on display, 0.24em on uppercase labels

### JetBrains Mono — 正文、标签与数据。等宽让整页像一份从旧系统导出的日志。

- **Substitute:** ui-monospace, 'Courier New', monospace
- **Weights:** 400
- **Sizes:** 12, 13, 15
- **Line height:** 1.4 (display), 1.4 (headings), 1.6 (body)
- **Letter spacing:** 0.04em on display, 0.24em on uppercase labels

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|---|---|---|---|---|---|---|
| display | Space Grotesk | 700 | 52px | 1.05 | 0.02em | `--text-display` |
| heading | Space Grotesk | 700 | 36px | 1.15 | 0.02em | `--text-heading` |
| subheading | Space Grotesk | 500 | 24px | 1.25 | — | `--text-subheading` |
| body-lg | JetBrains Mono | 400 | 15px | 1.6 | — | `--text-body-lg` |
| body | JetBrains Mono | 400 | 13px | 1.6 | — | `--text-body` |
| label | JetBrains Mono | 400 | 12px | 1.4 | 0.24em | `--text-label` |

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
| cards | 4px |
| buttons | 4px |
| inputs | 4px |

- **Page max-width:** 1160px
- **Section gap:** 96px
- **Card padding:** 24px
- **Element gap:** 16px

## Components

### Neon Button

**Role:** 主行动按钮

透明底、1px 荧光粉描边、4px 圆角，12px 等宽全大写 0.24em、padding 12px 24px，文字荧光粉并带双色文字发光（粉加青）。hover 时填充粉 12%、上浮 4px、发光扩到 24px，过渡 600ms ease-out（慢漂浮，不能快）；按下时元素做 2px 的 glitch 错位（X 轴 +2px、Y 轴 -2px）并在 120ms 内复位。

- **Sizes:** padding 12px 24px; label 12px
- **States:** hover: fill 12%, lift 4px, slow; active: glitch 2px offset

### Glitch Card

**Role:** 内容卡与面板

粉 6% 填充、4px 圆角、1px 青 30% 描边、内边距 24px，1px 粉 20% 的偏移重影（2px 2px 0）。标题 24px/500 带双色文字发光，正文 13px 等宽、粉白 75%。hover 时描边转粉 60%、重影换成青、上浮 2px，过渡 600ms。

### Grid Floor

**Role:** 透视网格与扫描线背景

底层用 repeating-linear-gradient 画 4px 间隔的青色 6% 横线（扫描线），再叠一层 40px 间隔的品红 8% 竖线构成网格。需要透视时用 transform: perspective(400px) rotateX(60deg) 做出地平线。整个覆盖层 pointer-events: none。

### Chrome Text

**Role:** 铬金属标题（可选装饰）

用 background-clip: text 填三段渐变（粉 → 紫 → 青），再叠 2px 的深色描边（-webkit-text-stroke）与双色重影。仅用于首屏主标题，单页最多一处，正文绝不使用。

### Status Strip

**Role:** 底部状态条

固定在视口底部、高 32px、深夜底、顶部 1px 青 20% 描边，左侧 12px 等宽薄荷绿文字显示「在线」，右侧显示时间与坐标。像旧系统的状态栏。

## Do's and Don'ts

### Do

- 粉紫青三色渐变
- 发光必须是粉青双色重影
- 叠扫描线与透视网格
- 标签全大写、字距 0.24em
- hover 用 600ms 慢漂浮
- 点击做 2px 的 glitch 错位

### Don't

- 不要用单调灰配色
- 不要做现代简约风
- 不要省略霓虹发光
- 不要用正式字体
- 不要只用单色发光
- 不要让交互过快

## Surfaces

| Level | Name | Value | Purpose |
|---|---|---|---|
| 0 | Midnight | `#0d0221` | 页面底 |
| 1 | Panel | `rgba(255,113,206,0.06)` | 卡片（粉调） |
| 2 | Grid Overlay | `repeating-linear-gradient` | 网格与扫描线 |

## Elevation

- **Dual glow:** `2px 2px 0 #01cdfe, -2px -2px 0 #ff71ce`
- **Neon bloom:** `0 0 20px rgba(255,113,206,0.50)`
- **Text glow:** `0 0 10px rgba(255,113,206,0.60), 0 0 20px rgba(1,205,254,0.40)`

## Imagery

合成器风景、棕榈剪影、古典雕塑、透视网格与 CRT 扫描线。图像必须带粉紫调色与发光边缘。不使用写实摄影、自然光照片与现代插画。

## Layout

上限 1160px、容器内边距 24px，区块间距 96px。首屏常为居中大标题压在透视网格上。允许元素轻微倾斜与重叠，但网格背景必须贯穿全页以保持年代统一。

## Agent Prompt Guide

### Implementation Contract

- 以用户请求中的页面、用户任务和真实内容为依据，只实施指定范围；标明缺失的业务信息，不编造数据或能力。
- 先检查现有项目、技术栈与组件；沿用项目结构、路由和依赖，复用已有组件，不重建未要求的页面或功能。
- 沿用项目断点，调整窄屏与桌面的网格和留白；保留信息层级，避免意外横向溢出。
- 对本次涉及的交互，处理键盘焦点与减少动态效果；补齐适用的禁用、加载、空内容与错误状态。
- 完成后按项目现有脚本检查，仅报告实际运行的测试与视觉检查，并列出未验证项。

QUICK COLOR REFERENCE:

- text: `#ff71ce`
- background: `#0d0221`
- cyan: `#01cdfe`
- violet: `#b967ff`
- mint: `#05ffa1`
- border: `rgba(1,205,254,0.30)`

EXAMPLE COMPONENT PROMPTS:

1. 做一个霓虹复古卡片：背景 rgba(255,113,206,0.06)、4px 圆角、1px rgba(1,205,254,0.3) 描边、内边距 24px、box-shadow 2px 2px 0 #01cdfe, -2px -2px 0 #ff71ce。标题 24px 荧光粉 #ff71ce，text-shadow 0 0 10px rgba(255,113,206,0.6), 0 0 20px rgba(1,205,254,0.4)。正文 13px 等宽。hover 时描边转 rgba(255,113,206,0.6)、translateY(-2px)，transition 600ms ease-out。页面底色 #0d0221，可叠 4px 间隔的青色 6% 扫描线。
