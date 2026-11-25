# 奢品零售 — 风格参考

> 暖白、3:4 的产品大图、细边框按钮：价格不必喊出来。

**Theme:** light

奢品零售是精品店的电商语言：暖白底（#faf9f6）而非纯白、衬线标题（#1a1a1a）、金色（#c9a96e）只出现在边框、分隔线与图标上、产品图必须大面积展示（至少 3:4）、按钮用细边框透明底、hover 时反色填充、正文加宽字距与松行高。分隔线一律 1px 暖灰（#e8e0d4）而非粗分割。它的克制来自「不解释」——没有促销标签、没有折扣角标、没有滚动横幅。

## Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Warm White | `#faf9f6` | `--color-warm-white` | 页面底。带一丝暖的白，比纯白贵。 |
| Black | `#1a1a1a` | `--color-black` | 标题、正文与按钮描边。 |
| Gold | `#c9a96e` | `--color-gold` | 唯一强调：边框、分隔线与图标。绝不作底色。 |
| Antique Brown | `#8b7355` | `--color-antique-brown` | 次级文字与材质的暗示。 |
| Pale Sand | `#e8e0d4` | `--color-pale-sand` | 所有 1px 分隔线与次级区块。 |
| Graphite | `#2c2c2c` | `--color-graphite` | hover 反色后的填充与深色区块。 |

## Typography

### Cormorant Garamond — 细衬线，标题 300 字重、字距 0.02em；正文加宽字距并按 1.85 行高排。

- **Substitute:** 'EB Garamond', Georgia, 'Songti SC', serif
- **Weights:** 300, 400
- **Sizes:** 13, 16, 19, 26, 34, 46
- **Line height:** 1.25 (display), 1.35 (headings), 1.85 (body)
- **Letter spacing:** 0.02em on display, 0.2em on uppercase labels

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|---|---|---|---|---|---|---|
| display | — | 300 | 46px | 1.25 | 0.02em | `--text-display` |
| heading | — | 300 | 34px | 1.3 | 0.02em | `--text-heading` |
| subheading | — | 400 | 26px | 1.4 | — | `--text-subheading` |
| body-lg | — | 400 | 19px | 1.8 | — | `--text-body-lg` |
| body | — | 400 | 16px | 1.85 | — | `--text-body` |
| label | — | 400 | 13px | 1.6 | 0.2em | `--text-label` |

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
| 160 | 160px | `--spacing-160` |
| 240 | 240px | `--spacing-240` |

### Border Radius

| Element | Value |
|---|---|
| cards | 0 |
| buttons | 0 |
| inputs | 0 |
| media | 0 |

- **Page max-width:** 1280px
- **Section gap:** 160px
- **Card padding:** 32px
- **Element gap:** 32px

## Components

### Product Frame

**Role:** 产品展示（核心组件）

产品图固定 3:4 最小比例（可为 3:4 或更高），铺满容器宽、零圆角零边框零阴影。图片下方 24px 处放产品名（19px 衬线）与价格（16px，不加粗不标红）。图片必须是唯一的主角，周围留白至少是其宽度的 10%。

- **Sizes:** aspect 3:4 or taller

### Outline Button

**Role:** 行动按钮

透明底、1px 黑 60% 描边、零圆角、13px/400、字距 0.2em、padding 16px 40px，无阴影。hover 时填充转黑、文字转暖白（反色）；按下时保持反色但描边不加粗。过渡 300ms ease-out。

- **Sizes:** padding 16px 40px; label 13px
- **States:** hover: inverted; active: inverted, border unchanged

### Gold Hairline

**Role:** 金线与暖灰分隔

两种 1px 线：语义分隔用暖灰 #e8e0d4（横跨内容宽），强调分隔用金 #c9a96e（两端各收进 15%）。绝不用 2px 以上，也不用虚线。

### Quiet Field

**Role:** 表单输入

透明底、仅底部 1px 暖灰描边（无包围边框）、padding 12px 0、16px 衬线。聚焦时底线转金并保持 1px。

### Range Label

**Role:** 系列与分类标签

13px/400、字距 0.2em、全大写、金或古棕、无底无边框。它是页面上唯一的装饰性小字，用于系列名与季别（如「SPRING · 2026」）。

## Do's and Don'ts

### Do

- 暖白底，不用纯白
- 金只出现在线与图标上
- 产品图至少 3:4 并大面积展示
- 按钮细边框，hover 反色
- 分隔线 1px 暖灰
- 价格不加粗不标红

### Don't

- 不要用促销标签与折扣角标
- 不要用滚动横幅
- 不要用 2px 以上分隔线
- 不要用圆角
- 不要用阴影
- 不要把金铺成底色

## Surfaces

| Level | Name | Value | Purpose |
|---|---|---|---|
| 0 | Warm White | `#faf9f6` | 页面底 |
| 1 | Pale Sand | `#e8e0d4` | 次级区块 |
| 2 | Graphite | `#2c2c2c` | 反色区块 |

## Elevation

- **None:** `none — a shadow would suggest a discount`

## Imagery

产品摄影：白或浅砂底、单光源、精确构图，必须 3:4 以上并大面积展示。允许材质特写。不使用模特生活照、促销图与多色背景。

## Layout

上限 1280px、容器内边距 32px，区块间距 160px。产品网格 2 列（移动）到 3 列（桌面）、间距 32px。留白占页面六成以上。零圆角零阴影贯穿全站。

## Agent Prompt Guide

### Implementation Contract

- 以用户请求中的页面、用户任务和真实内容为依据，只实施指定范围；标明缺失的业务信息，不编造数据或能力。
- 先检查现有项目、技术栈与组件；沿用项目结构、路由和依赖，复用已有组件，不重建未要求的页面或功能。
- 沿用项目断点，调整窄屏与桌面的网格和留白；保留信息层级，避免意外横向溢出。
- 对本次涉及的交互，处理键盘焦点与减少动态效果；补齐适用的禁用、加载、空内容与错误状态。
- 完成后按项目现有脚本检查，仅报告实际运行的测试与视觉检查，并列出未验证项。

QUICK COLOR REFERENCE:

- text: `#1a1a1a`
- background: `#faf9f6`
- gold: `#c9a96e`
- brown: `#8b7355`
- sand: `#e8e0d4`
- graphite: `#2c2c2c`

EXAMPLE COMPONENT PROMPTS:

1. 做一个奢品零售产品卡：暖白 #faf9f6 底、零圆角零边框零阴影，产品图 3:4 铺满卡宽、四周留白为宽度的 10%。图片下方 24px 放 19px 衬线产品名与 16px 价格（不加粗）。按钮透明底、1px rgba(26,26,26,0.6) 描边、零圆角、13px 字距 0.2em、padding 16px 40px，hover 时填充转 #1a1a1a、文字转 #faf9f6。分隔线用 1px #e8e0d4，强调分隔用 1px #c9a96e 且两端各收进 15%。系列标签 13px 全大写 0.2em 金色。页面底色 #faf9f6。
