# 构成主义 — 风格参考

> 红与黑切进纸里：一切都在斜着喊。

**Theme:** light

构成主义来自苏联宣传海报：只用红（#cc0000）、黑（#1a1a1a）与泛黄纸（#f2e8d5）三色，色块以对角线切入画面，元素整体旋转 -6 到 3 度并斜切（skew-x-3），字是超粗全大写（6xl、900 字重），边框 4px 黑，阴影是 4px 的硬偏移模拟版画。它的纪律是「三色、直角、硬边」——禁止圆角、禁止渐变、禁止任何超出这三色的颜色。混乱是表面的，构成是精确的。

## Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Poster Red | `#cc0000` | `--color-poster-red` | 主色：色块、强调与需要立刻被看到的一切。 |
| Ink | `#1a1a1a` | `--color-ink` | 文字、4px 边框与硬阴影。结构与冲击都靠它。 |
| Aged Paper | `#f2e8d5` | `--color-aged-paper` | 页面底。泛黄，像 1920 年代的印刷纸。 |
| Gold | `#d4a843` | `--color-gold` | 唯一允许的第三色，只作小面积高亮。 |
| Ochre | `#8b4513` | `--color-ochre` | 压在红色上的文字色，避免红上红。 |

## Typography

### Inter — 只有 900 一个字重，全大写。标题 80 到 112px、行高 0.88，字块本身是一块斜切的版面。

- **Substitute:** 'Arial Black', 'Helvetica Neue', sans-serif
- **Weights:** 900
- **Sizes:** 16, 24, 36, 56, 80, 112
- **Line height:** 0.88 (display), 0.95 (headings), 1.5 (body)
- **Letter spacing:** -0.03em on display, 0.04em on uppercase labels

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|---|---|---|---|---|---|---|
| display | — | 900 | 112px | 0.88 | -0.03em | `--text-display` |
| heading-lg | — | 900 | 80px | 0.92 | -0.03em | `--text-heading-lg` |
| heading | — | 900 | 56px | 0.95 | — | `--text-heading` |
| subheading | — | 900 | 36px | 1 | — | `--text-subheading` |
| body | — | 900 | 16px | 1.5 | — | `--text-body` |
| label | — | 900 | 16px | 1.4 | 0.04em | `--text-label` |

## Spacing & Layout

**Base unit:** 8px
**Density:** compact

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
| cards | 0 |
| buttons | 0 |
| inputs | 0 |

- **Page max-width:** 1200px
- **Section gap:** 96px
- **Card padding:** 24px
- **Element gap:** 16px

## Components

### Diagonal Plane

**Role:** 斜切色块（核心组件）

一个填红或黑的矩形，用 transform: rotate(-6deg) skewX(3deg) 倾斜，或直接用 clip-path 切出斜边。零圆角，可选 4px 黑色描边。它不被容器裁切，允许溢出页面边缘，产生「切进纸里」的感觉。

### Agitprop Headline

**Role:** 标语式标题

80 到 112px、900 字重、全大写、行高 0.88、字距 -0.03em，本身旋转 -3 度。允许分三行堆叠并与色块重叠，但文字必须在最上层。部分词可反白（在红色块上）或转红。

### Block Button

**Role:** 行动按钮

红填充、旧纸色文字、4px 黑边、零圆角、16px/900 全大写、padding 12px 28px，硬阴影 4px 4px 0 墨。hover 时填充转黑、文字转旧纸、阴影扩到 8px；按下时位移 4px 4px 且阴影归零。过渡 100ms linear。

- **Sizes:** padding 12px 28px; label 16px
- **States:** hover: inverted, shadow 8px; active: translate 4px

### Bar Divider

**Role:** 粗横条分隔

高 8px 或 16px 的纯黑或纯红横条，横跨全宽，可倾斜 -2 度。它替代留白来分隔区块——构成主义不用空，用块。

### Number Stamp

**Role:** 大号数字标记

80 到 160px 的 900 字重数字，颜色红或黑，可半透明（30%）压在色块上作为背景标记。用于章节编号与数据强调，一屏最多两处。

## Do's and Don'ts

### Do

- 严格三色：红、黑、旧纸
- 对角线与斜切色块
- 只有 900 一个字重，全大写
- 4px 黑边加 4px 硬阴影
- 角度只用 -6、0、+3 三档
- 用粗条分隔区块而不是留白

### Don't

- 不要用柔和圆角
- 不要用渐变
- 不要超出三色体系
- 不要用超过三档角度
- 不要用细边框
- 不要用柔和插画

## Surfaces

| Level | Name | Value | Purpose |
|---|---|---|---|
| 0 | Aged Paper | `#f2e8d5` | 页面底 |
| 1 | Red Plane | `#cc0000` | 红色斜切块 |
| 2 | Ink Plane | `#1a1a1a` | 黑色块 |

## Elevation

- **Hard offset:** `4px 4px 0 #1a1a1a`
- **Hard offset lg:** `8px 8px 0 #1a1a1a`
- **Pressed:** `none`

## Imagery

构成主义海报式图形：几何色块、粗黑剪影、工厂与齿轮、工人剪影、放射线。允许把照片处理成红黑双色调并加粗黑描边。不使用彩色摄影、柔和插画与渐变。

## Layout

上限 1200px，允许元素溢出容器与页面边缘。整页以对角线为主要构图手段，区块之间用 8 到 16px 粗条分隔。角度只用三档：-6、0、+3 度，混用更多角度会让版面失序。

## Agent Prompt Guide

### Implementation Contract

- 以用户请求中的页面、用户任务和真实内容为依据，只实施指定范围；标明缺失的业务信息，不编造数据或能力。
- 先检查现有项目、技术栈与组件；沿用项目结构、路由和依赖，复用已有组件，不重建未要求的页面或功能。
- 沿用项目断点，调整窄屏与桌面的网格和留白；保留信息层级，避免意外横向溢出。
- 对本次涉及的交互，处理键盘焦点与减少动态效果；补齐适用的禁用、加载、空内容与错误状态。
- 完成后按项目现有脚本检查，仅报告实际运行的测试与视觉检查，并列出未验证项。

QUICK COLOR REFERENCE:

- text: `#1a1a1a`
- background: `#f2e8d5`
- red: `#cc0000`
- ink: `#1a1a1a`
- gold: `#d4a843`
- ochre: `#8b4513`

EXAMPLE COMPONENT PROMPTS:

1. 做一个构成主义海报版面：旧纸底 #f2e8d5，一个红色 #cc0000 的斜切色块（transform: rotate(-6deg) skewX(3deg)、零圆角、4px 黑边）从左侧切入并溢出容器。标题 112px/900 全大写、行高 0.88、字距 -0.03em、rotate(-3deg)、色 #1a1a1a，与色块重叠但压在最上层。按钮红填充、旧纸色文字、4px 黑边、零圆角、box-shadow 4px 4px 0 #1a1a1a，hover 时黑白反转。区块之间用 16px 纯黑横条分隔。全页只用红、黑、旧纸三色。
