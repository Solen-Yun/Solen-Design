# 中世纪现代 — 风格参考

> 1950 年代的原子时代：星芒、有机曲线、饱和暖色平涂。

**Theme:** light

中世纪现代来自 1950 年代的原子时代设计：伊姆斯椅子、原子钟与星芒图案。它用饱和但偏暖的颜色（橙 #e8572a、青绿 #2a6e5e、芥黄 #c4a35a、灰蓝 #44628c）压在奶油底（#f5f0e1）上，形状是几何平涂加有机曲线（中等圆角 8 到 12px），排版靠宽字距（tracking-wide 到 wider）营造复古感，边框用 2px 风格色强调结构。禁令是：不许荧光与霓虹、不许衬线或手写字体、不许渐变背景——平面色块是它的地基。

## Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Atomic Orange | `#e8572a` | `--color-atomic-orange` | 第一主色：主按钮、星芒与最抢眼的色块。 |
| Cream | `#f5f0e1` | `--color-cream` | 页面底。略黄的奶油色，是那个年代的家居色。 |
| Teal | `#2a6e5e` | `--color-teal` | 第二主色：文字、次级按钮与对位色块。 |
| Mustard | `#c4a35a` | `--color-mustard` | 暖色点缀与高亮底，常与橙相邻。 |
| Slate Blue | `#44628c` | `--color-slate-blue` | 冷侧平衡色，用于信息与第三区块。 |
| Charcoal | `#3d3d3d` | `--color-charcoal` | 正文与描边。比纯黑柔，适合 50 年代的印刷。 |

## Typography

### Inter — 几何无衬线，字距放宽（正文 0.02em、标签 0.14em）。宽字距是它最直接的年代信号。

- **Substitute:** 'Futura', 'Century Gothic', sans-serif
- **Weights:** 400, 600, 700
- **Sizes:** 14, 16, 20, 28, 38, 52
- **Line height:** 1.15 (display), 1.25 (headings), 1.65 (body)
- **Letter spacing:** 0.02em on display, 0.14em on uppercase labels

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|---|---|---|---|---|---|---|
| display | — | 700 | 52px | 1.15 | 0.02em | `--text-display` |
| heading | — | 700 | 38px | 1.2 | 0.02em | `--text-heading` |
| subheading | — | 600 | 28px | 1.3 | 0.02em | `--text-subheading` |
| body-lg | — | 400 | 20px | 1.6 | — | `--text-body-lg` |
| body | — | 400 | 16px | 1.65 | — | `--text-body` |
| label | — | 600 | 14px | 1.5 | 0.14em | `--text-label` |

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
| cards | 12px |
| buttons | 8px |
| inputs | 8px |
| motifs | 999px |

- **Page max-width:** 1120px
- **Section gap:** 96px
- **Card padding:** 28px
- **Element gap:** 20px

## Components

### Block Button

**Role:** 行动按钮

原子橙填充、奶油文字、8px 圆角、无描边、16px/600、字距 0.02em、padding 12px 28px。hover 时填充加深到 #cf4a20；按下缩放 0.98。过渡 200ms ease-out。允许在文字前放一个 12px 的星芒图形。

- **Sizes:** padding 12px 28px; label 16px
- **States:** hover: #cf4a20; active: scale 0.98

### Blocks Card

**Role:** 内容卡

奶油或一支纯色填充、12px 圆角、2px 风格色描边（橙、青绿或芥黄之一）、内边距 28px，无阴影。标题 28px/600，正文 16px/400 行高 1.65。卡内右上角可放一个 48px 的星芒或椭圆装饰。

### Starburst

**Role:** 星芒装饰（签名）

从中心放射的 8 到 16 条等长尖角线（用 clip-path polygon 或 SVG），尺寸 48 到 120px，填原子橙或芥黄。它是最能标识这个年代的图形，放在卡片角落或标题旁，单屏 2 到 4 处。

### Organic Oval

**Role:** 有机椭圆

160 到 320px 的椭圆（border-radius 取 50% / 60% 40%），填一支纯色并降到 25% 或全不透明，绝对定位在区块角落，允许溢出容器。它模拟伊姆斯时代的有机线条。

### Wide Label

**Role:** 宽字距标签

14px/600、字距 0.14em、全大写、炭灰或青绿。它是复古感的来源之一，用在区块编号、年份与分类上。绝不低于 12px，否则宽字距会让字挤在一起。

## Do's and Don'ts

### Do

- 饱和暖色平涂，绝不用渐变
- 几何无衬线加宽字距
- 圆角 8 到 12px 模拟有机曲线
- 2px 风格色描边强调结构
- 星芒与椭圆作装饰
- 奶油底压暖色

### Don't

- 不要用荧光或霓虹色
- 不要用衬线或手写字体
- 不要用渐变背景
- 不要用全圆角按钮
- 不要用冷灰作中性色
- 不要省略星芒装饰

## Surfaces

| Level | Name | Value | Purpose |
|---|---|---|---|
| 0 | Cream | `#f5f0e1` | 页面底 |
| 1 | Orange Block | `#e8572a` | 强调块 |
| 2 | Teal Block | `#2a6e5e` | 对位块 |

## Elevation

- **None:** `none — flat blocking carries everything`
- **Max allowed:** `0 2px 6px rgba(61,61,61,0.08)`

## Imagery

1950 年代风格插画与摄影：家具、原子图案、星芒、抽象椭圆、家居内景。图像必须平涂或高对比，配饱和暖色。不使用渐变图像、霓虹色与当代写实摄影。

## Layout

上限 1120px、容器内边距 24px，区块间距 96px。允许元素重叠与错位。整页由大平涂色块分区，色块形状可以是矩形带圆角或有机曲线。

## Agent Prompt Guide

### Implementation Contract

- 以用户请求中的页面、用户任务和真实内容为依据，只实施指定范围；标明缺失的业务信息，不编造数据或能力。
- 先检查现有项目、技术栈与组件；沿用项目结构、路由和依赖，复用已有组件，不重建未要求的页面或功能。
- 沿用项目断点，调整窄屏与桌面的网格和留白；保留信息层级，避免意外横向溢出。
- 对本次涉及的交互，处理键盘焦点与减少动态效果；补齐适用的禁用、加载、空内容与错误状态。
- 完成后按项目现有脚本检查，仅报告实际运行的测试与视觉检查，并列出未验证项。

QUICK COLOR REFERENCE:

- text: `#3d3d3d`
- background: `#f5f0e1`
- orange: `#e8572a`
- teal: `#2a6e5e`
- mustard: `#c4a35a`
- slate: `#44628c`

EXAMPLE COMPONENT PROMPTS:

1. 做一个中世纪现代风格卡片：奶油 #f5f0e1 填充、12px 圆角、2px solid #e8572a 描边、内边距 28px、无阴影。标题 28px/600、字距 0.02em、色 #2a6e5e；正文 16px/400、行高 1.65、色 #3d3d3d。右上角放一个 48px 的原子橙星芒（8 条放射尖角，clip-path）。标签 14px/600 全大写、字距 0.14em。主按钮 #e8572a 填充、奶油文字、8px 圆角。页面底色 #f5f0e1，区块之间用大平涂色块分区，全站不用渐变。
