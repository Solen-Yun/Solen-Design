# 新艺术运动风 — 风格参考

> 没有一条直线：藤蔓、长发、花茎都按植物生长的逻辑弯。

**Theme:** light

新艺术运动来自 19 世纪末：一切边缘都必须是曲线，藤蔓与花茎是主要装饰语汇，Mucha 式的海报构图把人物与植物编织进同一个框架。落到界面上，核心纪律是「禁止直角与几何形状」——按钮全圆角、卡片圆角、边框用弧线、分隔线用波浪。字体必须是衬线或装饰性字体，现代无衬线在标题上是被禁的。节奏也要慢：过渡 500 到 700ms 的 ease-in-out，像植物的律动；150 到 200ms 的短促过渡和硬边阴影一同被排除。

## Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Deep Green | `#2d5016` | `--color-deep-green` | 主色：正文、主按钮与深色区块。植物茎叶的绿。 |
| Ivory | `#f5f0e1` | `--color-ivory` | 页面底与纸面。泛黄的旧海报色。 |
| Gold | `#c9a227` | `--color-gold` | 描边与高光，用于勾出曲线的边缘。 |
| Wisteria | `#8b6db5` | `--color-wisteria` | 第二色，用于花朵与情绪化强调。 |
| Leaf | `#4a7c3f` | `--color-leaf` | 中绿，用于次级区块与藤蔓线条。 |
| Bright Green | `#4bc542` | `--color-bright-green` | 最小面积的点缀，只用于新芽与「新增」标记。 |

## Typography

### Playfair Display — 标题用高对比衬线，带装饰性。正文用同一族但更细的字重，行高 1.8。

- **Substitute:** Georgia, 'Songti SC', serif
- **Weights:** 400, 700
- **Sizes:** 16, 20, 26, 36, 48, 60
- **Line height:** 1.1 (display), 1.25 (headings), 1.8 (body)
- **Letter spacing:** 0.01em on display, 0.12em on uppercase labels

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|---|---|---|---|---|---|---|
| display | Playfair Display | 700 | 60px | 1.1 | 0.01em | `--text-display` |
| heading-lg | Playfair Display | 700 | 48px | 1.15 | — | `--text-heading-lg` |
| heading | Playfair Display | 700 | 36px | 1.25 | — | `--text-heading` |
| subheading | Playfair Display | 400 | 26px | 1.35 | — | `--text-subheading` |
| body | Playfair Display | 400 | 16px | 1.8 | — | `--text-body` |
| label | Playfair Display | 400 | 14px | 1.5 | 0.12em | `--text-label` |

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
| 128 | 128px | `--spacing-128` |

### Border Radius

| Element | Value |
|---|---|
| cards | 32px |
| buttons | 999px |
| inputs | 999px |
| frames | 48px |

- **Page max-width:** 1080px
- **Section gap:** 128px
- **Card padding:** 36px
- **Element gap:** 24px

## Components

### Vine Button

**Role:** 行动按钮

深绿填充、象牙文字、1px 金描边、999px 全圆角、衬线 15px、字距 0.12em、padding 16px 32px，阴影 0 4px 15px 绿 20%。hover 时填充换金、文字换深绿、阴影扩到 25px、箭头右移 4px；按下缩到 0.98。过渡 500ms ease-in-out。

- **Sizes:** padding 16px 32px; label 15px
- **States:** hover: gold fill, arrow shifts; active: scale 0.98

### Vine Card

**Role:** 内容卡与海报块

柔和象牙填充、32px 圆角、1px 金 35% 描边、内边距 36px，阴影 0 4px 15px 绿 20%。顶部或左侧放一条 1px 叶绿的藤蔓曲线（用 SVG 单条 path 画，带两到三片叶子）。hover 时描边升到 60%、阴影扩到 25px、藤蔓整体顺时针旋转 3 度。过渡 700ms ease-in-out。

### Wave Divider

**Role:** 波浪分隔线

一条 1px 的金色波浪线（SVG 单周期正弦，振幅 8px、周期 120px），横跨内容宽，中央可放一朵 16px 的紫藤花。替代直线分隔，与藤蔓装饰配套。

### Curved Frame

**Role:** 弧形边框与图片容器

图片容器不用矩形，用拱形（border-radius 顶端 999px 而底部 8px）或椭圆裁切。外框 1px 金描边，四角各放一个小卷草纹。不加阴影。

### Blossom Mark

**Role:** 花朵标记与徽标

五瓣花形（用 SVG path 或 CSS 多圆叠加），32px 到 64px，填紫藤或金色，中心一个 6px 的深色圆点。用于章节标记与「精选」标签，单屏不超过三处。

## Do's and Don'ts

### Do

- 所有边缘都是曲线
- 用藤蔓与花朵作装饰
- 标题用装饰性衬线
- 过渡 500 到 700ms ease-in-out
- 深绿配金与象牙
- 分隔用波浪线

### Don't

- 不要用生硬直角与几何形状
- 不要用霓虹或高饱和现代色
- 不要用粗犷无装饰的设计
- 不要在标题用现代无衬线
- 不要用 150 或 200ms 的短促过渡
- 不要用硬边阴影

## Surfaces

| Level | Name | Value | Purpose |
|---|---|---|---|
| 0 | Ivory | `#f5f0e1` | 页面底 |
| 1 | Soft Ivory | `#faf7ef` | 卡片 |
| 2 | Deep Green | `#2d5016` | 深色区块 |

## Elevation

- **Soft:** `0 4px 15px rgba(45,80,22,0.20)`
- **Soft hover:** `0 8px 25px rgba(201,162,39,0.40)`

## Imagery

Mucha 式海报插画：长发、花卉、藤蔓边框、单色平涂加细线。允许把照片处理成新艺术风格的双色调后再加曲线边框。不使用几何插画、现代摄影与硬边图形。

## Layout

上限 1080px、容器内边距 24px，区块间距 128px。允许非对称构图与曲线边界（区块底部可做成弧线）。元素沿植物生长的方向轻微偏移，但正文保持可读的左对齐。

## Agent Prompt Guide

### Implementation Contract

- 以用户请求中的页面、用户任务和真实内容为依据，只实施指定范围；标明缺失的业务信息，不编造数据或能力。
- 先检查现有项目、技术栈与组件；沿用项目结构、路由和依赖，复用已有组件，不重建未要求的页面或功能。
- 沿用项目断点，调整窄屏与桌面的网格和留白；保留信息层级，避免意外横向溢出。
- 对本次涉及的交互，处理键盘焦点与减少动态效果；补齐适用的禁用、加载、空内容与错误状态。
- 完成后按项目现有脚本检查，仅报告实际运行的测试与视觉检查，并列出未验证项。

QUICK COLOR REFERENCE:

- text: `#2d5016`
- background: `#f5f0e1`
- card: `#faf7ef`
- gold: `#c9a227`
- wisteria: `#8b6db5`
- leaf: `#4a7c3f`

EXAMPLE COMPONENT PROMPTS:

1. 做一个新艺术风格卡片：背景 #faf7ef、32px 圆角、1px rgba(201,162,39,0.35) 描边、内边距 36px、阴影 0 4px 15px rgba(45,80,22,0.2)。左侧放一条 1px #4a7c3f 的藤蔓 SVG 曲线并带两片叶子。标题 36px Playfair Display 700、色 #2d5016；正文 16px 衬线、行高 1.8。卡片下方用一条 1px 金色波浪线（振幅 8px）分隔。hover 时描边升到 rgba(201,162,39,0.6)、藤蔓 rotate(3deg)，transition 700ms ease-in-out。页面底色 #f5f0e1。
