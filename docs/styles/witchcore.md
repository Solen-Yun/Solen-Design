# 巫术核心 — 风格参考

> 月相、塔罗、紫水晶与金符文：一次摆在深夜桌面上的占卜。

**Theme:** dark

巫术核心是神秘学美学：深紫到午夜黑的垂直渐变作底（#4a1942 到 #0d0b14），金色符文文字（#c9a74e）带 0 0 8px 的微光，边框是 30% 的金色半透明细线、hover 时升到 60%，卡片用 #0d0b14 的 80% 加轻微模糊营造朦胧感，紫水晶（#7b68ae）作次级信息色，背景点缀星尘（radial-gradient 的小光点）。衬线字体加宽字距，让文字有仪式感。月相、塔罗牌、水晶与草药是它的图形语汇。

## Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Deep Violet | `#4a1942` | `--color-deep-violet` | 渐变顶端。黄昏的紫，往午夜黑过渡。 |
| Midnight | `#0d0b14` | `--color-midnight` | 渐变底端与卡片底。带紫的近黑。 |
| Gold | `#c9a74e` | `--color-gold` | 符文、边框与所有发光。仪式感的来源。 |
| Amethyst | `#7b68ae` | `--color-amethyst` | 次级信息与月光语义。 |
| Herb Green | `#3d8b6e` | `--color-herb-green` | 草药与「生长」的语义，出现频率较低。 |
| Sprout | `#6bc15e` | `--color-sprout` | 最亮的一支，只在草药细节与「新增」标记上出现。 |

## Typography

### Cormorant Garamond — 衬线体，标题加 0.04em 字距、标签加 0.24em。宽字距让文字像被念出来的咒语。

- **Substitute:** 'EB Garamond', Georgia, 'Songti SC', serif
- **Weights:** 400, 600
- **Sizes:** 14, 17, 21, 28, 36, 48
- **Line height:** 1.2 (display), 1.3 (headings), 1.75 (body)
- **Letter spacing:** 0.04em on display, 0.24em on uppercase labels

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|---|---|---|---|---|---|---|
| display | — | 600 | 48px | 1.2 | 0.04em | `--text-display` |
| heading | — | 600 | 36px | 1.25 | 0.04em | `--text-heading` |
| subheading | — | 400 | 28px | 1.35 | — | `--text-subheading` |
| body-lg | — | 400 | 21px | 1.7 | — | `--text-body-lg` |
| body | — | 400 | 17px | 1.75 | — | `--text-body` |
| label | — | 600 | 14px | 1.55 | 0.24em | `--text-label` |

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
| cards | 12px |
| buttons | 8px |
| moons | 999px |

- **Page max-width:** 1040px
- **Section gap:** 112px
- **Card padding:** 32px
- **Element gap:** 24px

## Components

### Haze Card

**Role:** 朦胧卡片（核心组件）

午夜 80% 填充、8px 模糊、12px 圆角、1px 金 30% 描边、内边距 32px。标题 36px/600 金并带 0 0 8px 金字微光，正文 17px 白 80%。hover 时描边升到 60%、金字光晕扩到 24px。

### Rune Label

**Role:** 符文标签

透明底、1px 金 30% 描边、8px 圆角、14px/600、字距 0.24em、padding 4px 12px，文字金色带 0 0 8px 微光。左右可各放一个 6px 的金色菱形作为符文分隔。

### Moon Phase Row

**Role:** 月相装饰

一排 5 到 8 个 16px 的月相图标（新月到满月），间距 12px，颜色金或紫水晶，当前相带 0 0 12px 微光。它既是装饰也是「现在处于哪一阶段」的指示，用于章节与状态。

### Tarot Frame

**Role:** 塔罗牌卡片

竖向 2:3 比例、12px 圆角、1px 金 40% 描边、内边距 20px，午夜 90% 填充。顶部与底部各一条 1px 金线内框，中央放图形（月相、水晶、草药线稿）。hover 时卡片上浮 4px、金线描边升到 80%、并让星尘在 600ms 内亮起。

### Stardust Bed

**Role:** 星尘背景

在渐变底上叠 20 到 40 个 1 到 2px 的白色或淡金光点（radial-gradient 或 box-shadow 多重投影），不透明度 20% 到 50%，分布不均。可做极慢的闪烁（每点周期 4 到 8 秒、错峰），但绝不做快速闪烁。

## Do's and Don'ts

### Do

- 深紫到午夜黑的垂直渐变
- 金色符文配 8px 微光
- 边框 30% 金，hover 升到 60%
- 卡片 80% 午夜加轻微模糊
- 衬线加宽字距
- 月相与塔罗作图形语汇

### Don't

- 不要用明亮摄影
- 不要用高饱和图像
- 不要让星尘快速闪烁
- 不要用粗边框
- 不要用现代无衬线作标题
- 不要让星尘承载内容

## Surfaces

| Level | Name | Value | Purpose |
|---|---|---|---|
| 0 | Sky Gradient | `linear-gradient(#4a1942, #0d0b14)` | 页面底 |
| 1 | Haze Card | `rgba(13,11,20,0.80)` | 卡片 |
| 2 | Gold Ground | `rgba(201,167,78,0.12)` | 符文底 |

## Elevation

- **Gold shimmer:** `0 0 8px rgba(201,167,78,0.40)`
- **Gold bloom:** `0 0 24px rgba(201,167,78,0.30)`

## Imagery

神秘学图像：塔罗牌面、月相、水晶、草药、烛光、星图。必须暗调、金紫配色、有朦胧感。不使用明亮摄影、现代插画与高饱和图像。

## Layout

上限 1040px、容器内边距 24px，区块间距 112px。允许元素轻微旋转（-1 到 1 度）与错位，像牌被摊开。留白宽松，星尘填补空白但不承载内容。

## Agent Prompt Guide

### Implementation Contract

- 以用户请求中的页面、用户任务和真实内容为依据，只实施指定范围；标明缺失的业务信息，不编造数据或能力。
- 先检查现有项目、技术栈与组件；沿用项目结构、路由和依赖，复用已有组件，不重建未要求的页面或功能。
- 沿用项目断点，调整窄屏与桌面的网格和留白；保留信息层级，避免意外横向溢出。
- 对本次涉及的交互，处理键盘焦点与减少动态效果；补齐适用的禁用、加载、空内容与错误状态。
- 完成后按项目现有脚本检查，仅报告实际运行的测试与视觉检查，并列出未验证项。

QUICK COLOR REFERENCE:

- text: `#c9a74e`
- background: `#0d0b14`
- violet: `#4a1942`
- amethyst: `#7b68ae`
- herb: `#3d8b6e`
- gold: `#c9a74e`

EXAMPLE COMPONENT PROMPTS:

1. 做一个巫术核心卡片：背景 rgba(13,11,20,0.8) 加 8px 模糊、12px 圆角、1px rgba(201,167,78,0.3) 描边、内边距 32px。标题 36px/600 Cormorant Garamond、色 #c9a74e、text-shadow 0 0 8px rgba(201,167,78,0.4)、字距 0.04em；正文 17px、行高 1.75、色 rgba(255,255,255,0.8)。上方放一排 16px 的月相图标（金色，当前相带 0 0 12px 微光），间距 12px。页面底用 linear-gradient(#4a1942, #0d0b14)，叠 30 个 1-2px 的淡金光点（不透明度 30%）作星尘。hover 时描边升到 rgba(201,167,78,0.6)。
