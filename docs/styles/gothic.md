# 哥特式风 — 风格参考

> 尖拱、玫瑰窗、手抄本边饰：一座还没点灯的大教堂。

**Theme:** dark

哥特式风来自中世纪教堂建筑与手抄本装饰：深紫（#2d1b4e）、血红（#8b1a1a）与黑为底，金色（#c9a227）作装饰线，形状一律是尖拱、三叶饰与玫瑰花窗，标题必须用衬线并带装饰性，页面必须有边饰与首字下沉这类手抄本语汇。它的禁令是：不许明亮欢快的配色、不许圆润可爱的元素、不许现代无衬线做标题、不许过度简约、不许轻浮的快速抖动或弹性跳动——庄严感不容许任何轻快。

## Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Deep Violet | `#2d1b4e` | `--color-deep-violet` | 页面底与主色。教堂夜里的紫，比黑更有层次。 |
| Blood Red | `#8b1a1a` | `--color-blood-red` | 第二主色：彩窗、印章与关键强调。 |
| Gold | `#c9a227` | `--color-gold` | 装饰线、描边与高光。所有镶边的颜色。 |
| Black | `#0a0a0a` | `--color-black` | 最深的区块与阴影。 |
| Mid Violet | `#4a2d6e` | `--color-mid-violet` | 抬升面与卡片，比底色亮一档。 |
| Verdigris | `#4bc542` | `--color-verdigris` | 彩窗里的一抹绿与「生」的语义，面积最小。 |

## Typography

### UnifrakturMaguntia — 标题用哥特体或高对比装饰衬线，正文用可读衬线。哥特体只做标题，正文用它读不动。

- **Substitute:** 'Cinzel', 'Playfair Display', Georgia, serif
- **Weights:** 400, 700
- **Sizes:** 18, 24, 32, 44, 60, 84
- **Line height:** 1.15 (display), 1.25 (headings), 1.7 (body)
- **Letter spacing:** 0.02em on display, 0.18em on uppercase labels

### EB Garamond — 正文与说明。可读衬线，行高 1.75，像手抄本的正文栏。

- **Substitute:** Garamond, 'Songti SC', serif
- **Weights:** 400, 600
- **Sizes:** 15, 17, 20
- **Line height:** 1.5 (display), 1.5 (headings), 1.75 (body)
- **Letter spacing:** 0.01em on display, 0.18em on uppercase labels

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|---|---|---|---|---|---|---|
| display | UnifrakturMaguntia | 400 | 84px | 1.15 | 0.02em | `--text-display` |
| heading | UnifrakturMaguntia | 400 | 60px | 1.2 | — | `--text-heading` |
| subheading | UnifrakturMaguntia | 400 | 44px | 1.25 | — | `--text-subheading` |
| body-lg | EB Garamond | 400 | 20px | 1.7 | — | `--text-body-lg` |
| body | EB Garamond | 400 | 17px | 1.75 | — | `--text-body` |
| label | EB Garamond | 600 | 15px | 1.6 | 0.18em | `--text-label` |

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
| cards | 0 |
| buttons | 0 |
| arches | 50% 50% 0 0 |
| windows | 999px |

- **Page max-width:** 1080px
- **Section gap:** 128px
- **Card padding:** 36px
- **Element gap:** 24px

## Components

### Pointed Arch Frame

**Role:** 尖拱框架（核心组件）

容器顶部用 clip-path 切出尖拱（两侧圆弧在顶部相交，或直接 polygon 画尖顶），零圆角，1px 金描边沿边勾出。内部填中紫或深紫，可嵌彩窗式色块。整块高宽比常见 1:2 到 1:2.5，像教堂的窗。

### Gilt Button

**Role:** 行动按钮

血红填充、金文字、1px 金描边、零圆角、衬线 15px、字距 0.18em、padding 14px 36px，无阴影。hover 时填充转深紫、文字转金 100%、描边升到 80%；按下时整体下沉 1px。过渡 400ms ease-out。

- **Sizes:** padding 14px 36px; label 15px
- **States:** hover: violet fill, gold border 80%; active: sink 1px

### Rose Window

**Role:** 玫瑰花窗装饰

一个 96 到 240px 的圆形，内部用 conic-gradient 分成 8 或 12 个扇形，各取红、紫、绿、金之一并降到 40% 不透明度，外圈 2px 金描边加 4 个同心细环。放在区块顶部居中或角落，像教堂的窗。

### Manuscript Border

**Role:** 手抄本边饰

页边 24 到 48px 的装饰带：1px 金线加重复的小菱形或三叶饰，四角各放一个 16px 的十字或花饰。它框住整个内容区，让页面像一页手抄本。

### Drop Cap

**Role:** 首字下沉

段落首字母 float: left、字号为正文的 3.2 倍、行高对齐三行、颜色金或血红、字体用装饰衬线。每个内容区块只允许一次，且只在第一段。

## Do's and Don'ts

### Do

- 深紫、血红、黑配金线
- 形状用尖拱、三叶与玫瑰窗
- 标题用哥特体，正文用可读衬线
- 页边必须有手抄本式边饰
- 首字下沉
- 过渡 400ms 起，动作庄重

### Don't

- 不要用明亮欢快的配色
- 不要用圆润可爱的元素
- 不要用现代无衬线做标题
- 不要过度简约
- 不要用快速抖动与弹性跳动
- 不要用哥特体排正文

## Surfaces

| Level | Name | Value | Purpose |
|---|---|---|---|
| 0 | Deep Violet | `#2d1b4e` | 页面底 |
| 1 | Mid Violet | `#4a2d6e` | 卡片与抬升面 |
| 2 | Black | `#0a0a0a` | 最深区块 |

## Elevation

- **None:** `none — depth comes from arch and shadow shape`
- **Gold rim:** `inset 0 0 0 1px rgba(201,162,39,0.40)`

## Imagery

教堂建筑摄影、彩窗局部、手抄本插图、木刻版画。必须暗调、有明确的拱形构图。允许把照片处理成深紫与血红的双色调。不使用明亮摄影、现代插画与任何轻快的图形。

## Layout

上限 1080px、容器内边距 32px，区块间距 128px。允许严格轴对称（与暗黑学院不同，哥特更讲仪式性的对称）。页边保留装饰带，内容区收窄。

## Agent Prompt Guide

### Implementation Contract

- 以用户请求中的页面、用户任务和真实内容为依据，只实施指定范围；标明缺失的业务信息，不编造数据或能力。
- 先检查现有项目、技术栈与组件；沿用项目结构、路由和依赖，复用已有组件，不重建未要求的页面或功能。
- 沿用项目断点，调整窄屏与桌面的网格和留白；保留信息层级，避免意外横向溢出。
- 对本次涉及的交互，处理键盘焦点与减少动态效果；补齐适用的禁用、加载、空内容与错误状态。
- 完成后按项目现有脚本检查，仅报告实际运行的测试与视觉检查，并列出未验证项。

QUICK COLOR REFERENCE:

- text: `#c9a227`
- background: `#2d1b4e`
- red: `#8b1a1a`
- gold: `#c9a227`
- black: `#0a0a0a`
- mid: `#4a2d6e`

EXAMPLE COMPONENT PROMPTS:

1. 做一个哥特式卡片：深紫 #2d1b4e 底、顶部用 clip-path 切出尖拱、零圆角、1px 金 #c9a227 描边、内边距 36px。标题用哥特体 60px、字距 0.02em、色 #c9a227；正文 EB Garamond 17px、行高 1.75、色 rgba(233,225,245,0.85)。首段首字母下沉 3.2 倍、色 #c9a227。按钮血红 #8b1a1a 填充、金字、1px 金边、零圆角、hover 时填充转深紫。页面底 #2d1b4e，页边保留 32px 手抄本式金线边饰。
