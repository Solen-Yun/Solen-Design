# 全息渐变 — 风格参考

> 彩虹色谱在深空底上随角度流动：像镭射膜在光里翻转。

**Theme:** dark

全息渐变模拟镭射全息膜的棱镜折射：底色是深紫或深海军（#0a0a1f），所有元素都带三色以上的渐变，而且渐变会随交互横向流动——这是它独有的规则叫 Spectrum Shift，用 background-size: 200% 加 hover 时 background-position 从左侧移到右侧来实现，模拟箔片随视角变色。它禁止纯色元素（没有渐变的实心块在这套语言里等于失去材质）、禁止浅色背景（会直接杀掉全息感）、禁止低饱和色、也禁止没有光晕的锐角。

## Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Deep Space | `#0a0a1f` | `--color-deep-space` | 页面底。深到让所有虹彩都能浮起来。 |
| Deep Violet | `#1a0b2e` | `--color-deep-violet` | 次级面板底，比深空偏紫。 |
| Hologram Violet | `#a855f7` | `--color-hologram-violet` | 渐变的主站与品牌色，最常用于按钮起点。 |
| Magenta | `#ff0080` | `--color-magenta` | 光谱的暖端，用于让渐变跨过紫与青。 |
| Cyan | `#00d4ff` | `--color-cyan` | 光谱的冷端，是渐变里最亮的一站。 |
| Gold | `#ffd700` | `--color-gold` | 高光与「箔片反光」，只在渐变中出现，不做填充。 |
| Neon Green | `#00ff88` | `--color-neon-green` | 光谱的第五站，用于让渐变多一层不规则。 |

## Typography

### Inter — 全站唯一字体。标题用渐变文字（background-clip: text），标签全大写。

- **Substitute:** -apple-system, 'Helvetica Neue', system-ui, sans-serif
- **Weights:** 400, 500, 700
- **Sizes:** 12, 14, 17, 24, 36, 52
- **Line height:** 1.1 (display), 1.2 (headings), 1.6 (body)
- **Letter spacing:** -0.02em on display, 0.14em on uppercase labels

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|---|---|---|---|---|---|---|
| display | — | 700 | 52px | 1.1 | -0.02em | `--text-display` |
| heading | — | 700 | 36px | 1.2 | — | `--text-heading` |
| subheading | — | 500 | 24px | 1.3 | — | `--text-subheading` |
| body-lg | — | 400 | 17px | 1.55 | — | `--text-body-lg` |
| body | — | 400 | 14px | 1.6 | — | `--text-body` |
| label | — | 500 | 12px | 1.4 | 0.14em | `--text-label` |

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
| cards | 20px |
| buttons | 999px |
| inputs | 16px |

- **Page max-width:** 1160px
- **Section gap:** 112px
- **Card padding:** 24px
- **Element gap:** 16px

## Components

### Spectrum Button

**Role:** 主行动按钮

紫到品红到青的三色线性渐变填充（每站约 1/3）、白色文字、999px 全圆角、无描边，15px/700、padding 12px 28px，外发光 0 0 32px 品红 30%。渐变设 background-size: 200% auto，hover 时 background-position 从 left 移到 right（1.2s ease），这就是 Spectrum Shift。按下缩放 0.98。

- **Sizes:** padding 12px 28px; label 15px
- **States:** hover: background-position left→right; active: scale 0.98

### Prism Card

**Role:** 内容卡

白 6% 填充、20px 圆角、1px 白 12% 描边、内边距 24px，外加一层紫到青的柔光晕（0 0 40px 紫 35%）。顶部放一条 2px 的三色渐变横线（紫→品红→青）作为「箔片边缘」。hover 时渐变横线的 background-position 反向流动，卡片外发光转品红。

### Spectrum Text

**Role:** 渐变标题

用 background: linear-gradient(90deg, 紫, 品红, 青, 金) 配 background-clip: text 与 color: transparent，background-size 200%，hover 时位置移动。仅用于首屏与章节标题，正文绝不使用（可读性会崩）。

### Glass Field

**Role:** 输入框

白 6% 填充、16px 圆角、1px 白 15% 描边、padding 12px 18px、15px 字。聚焦时描边换 1px 渐变（用 border-image 或伪元素），并加 0 0 0 3px 的紫 25% 环——焦点环必须带 offset 到深空色，否则在暗底上看不见。

### Iridescent Orb

**Role:** 装饰光球

96px 到 240px 的圆，径向渐变从紫中心渐隐到品红与青，无边框，外发光 0 0 60px 紫 30%。放在卡片背后或区块角落，允许溢出容器。单屏最多两个。

## Do's and Don'ts

### Do

- 所有元素带三色以上渐变
- 深紫或深海军底
- 用 Spectrum Shift 让渐变横向流动
- 锐角必须配光晕
- 焦点环带深空色 offset
- 高饱和色，保持虹彩强度

### Don't

- 不要用无渐变的纯色块
- 不要用浅色或白色背景
- 不要用低饱和或灰调色
- 不要给锐角不加光晕
- 不要连续两个以上的非渐变元素
- 不要让焦点环在暗底上消失

## Surfaces

| Level | Name | Value | Purpose |
|---|---|---|---|
| 0 | Deep Space | `#0a0a1f` | 页面底 |
| 1 | Glass Panel | `rgba(255,255,255,0.06)` | 卡片（半透明） |
| 2 | Spectrum | `linear-gradient 3+ stops` | 渐变元素 |

## Elevation

- **Iridescent glow:** `0 0 40px rgba(168,85,247,0.35)`
- **Magenta glow:** `0 0 32px rgba(255,0,128,0.30)`

## Imagery

镭射材质、棱镜、箔片、流体与晶体。所有图像必须带多色虹彩。允许把照片叠一层 30% 的彩虹渐变后用 overlay 混合。不使用单色摄影、纯白背景与灰调插画。

## Layout

上限 1160px、容器内边距 24px，区块间距 112px。允许元素大范围重叠与溢出的光球。相邻两个元素不得都是无渐变的纯色块——这条规则强制整页始终有光谱在场。

## Agent Prompt Guide

### Implementation Contract

- 以用户请求中的页面、用户任务和真实内容为依据，只实施指定范围；标明缺失的业务信息，不编造数据或能力。
- 先检查现有项目、技术栈与组件；沿用项目结构、路由和依赖，复用已有组件，不重建未要求的页面或功能。
- 沿用项目断点，调整窄屏与桌面的网格和留白；保留信息层级，避免意外横向溢出。
- 对本次涉及的交互，处理键盘焦点与减少动态效果；补齐适用的禁用、加载、空内容与错误状态。
- 完成后按项目现有脚本检查，仅报告实际运行的测试与视觉检查，并列出未验证项。

QUICK COLOR REFERENCE:

- text: `#ffffff`
- background: `#0a0a1f`
- violet: `#a855f7`
- magenta: `#ff0080`
- cyan: `#00d4ff`
- gold: `#ffd700`

EXAMPLE COMPONENT PROMPTS:

1. 做一个全息渐变按钮：background linear-gradient(90deg, #a855f7, #ff0080, #00d4ff)、background-size 200% auto、白字 15px/700、999px 圆角、padding 12px 28px、box-shadow 0 0 32px rgba(255,0,128,0.3)。hover 时 background-position 从 left 移到 right，transition 1.2s ease；active 时 scale(0.98)。页面底色 #0a0a1f。相邻元素中不允许连续出现两个无渐变的纯色块。
