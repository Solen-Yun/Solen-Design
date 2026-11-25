# 浮世绘数字风 — 风格参考

> 靛蓝、朱红、金箔压在粗线条里：一版套一版的木刻。

**Theme:** light

浮世绘数字风来自日本木版画的套色工艺：靛蓝、朱红、金箔三色为主，形用粗线条勾出，色块平涂，构图取北斋式的斜向动势与波浪纹。它的交互语言也照搬版画——hover 时元素做硬边偏移位移（像第二版印歪了一点），绝不允许柔和模糊。禁令很硬：不许渐变阴影与柔和模糊、不许透明度与玻璃效果、不许西式圆角与圆形按钮、不许霓虹、不许弹簧回弹与丝滑动效。

## Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Indigo | `#1a3055` | `--color-indigo` | 主色：文字、粗线条与深色区块。木版画里的「蓝摺」。 |
| Washi | `#f5f0e1` | `--color-washi` | 纸底。米白的和纸色，所有色块压在它上面。 |
| Vermilion | `#d4553a` | `--color-vermilion` | 第一强调：印章、日出与警示。是画面里唯一的暖色重音。 |
| Gold Leaf | `#c9a227` | `--color-gold-leaf` | 贵重与高光，面积必须小，像贴上去的金箔。 |
| Ultramarine | `#2a5a8c` | `--color-ultramarine` | 第二层蓝，用于水与远景，比主靛更亮。 |
| Young Grass | `#747800` | `--color-young-grass` | 植物与苔，出现频率最低。 |

## Typography

### Noto Serif SC — 标题用粗衬线并放宽字距，像版画上的题签。正文同族但更细，行高 1.7。

- **Substitute:** 'Songti SC', Georgia, serif
- **Weights:** 600, 700
- **Sizes:** 16, 20, 26, 34, 46, 60
- **Line height:** 1.15 (display), 1.3 (headings), 1.7 (body)
- **Letter spacing:** 0.02em on display, 0.2em on uppercase labels

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|---|---|---|---|---|---|---|
| display | Noto Serif SC | 700 | 60px | 1.15 | 0.02em | `--text-display` |
| heading | Noto Serif SC | 700 | 46px | 1.25 | — | `--text-heading` |
| subheading | Noto Serif SC | 600 | 34px | 1.35 | — | `--text-subheading` |
| body-lg | Noto Serif SC | 600 | 20px | 1.6 | — | `--text-body-lg` |
| body | Noto Serif SC | 600 | 16px | 1.7 | — | `--text-body` |
| label | Noto Serif SC | 700 | 16px | 1.5 | 0.2em | `--text-label` |

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
| seals | 4px |

- **Page max-width:** 1100px
- **Section gap:** 112px
- **Card padding:** 32px
- **Element gap:** 24px

## Components

### Woodblock Card

**Role:** 版画卡片（核心组件）

和纸填充、零圆角、3px 靛蓝描边、内边距 32px，硬阴影 4px 4px 0 靛蓝。顶部或底部用 4px 的朱红横条压边。hover 时硬阴影扩到 6px 并整体位移 2px 2px（模拟第二版印歪），过渡 150ms linear。

- **States:** hover: shadow 6px, offset 2px

### Seal Button

**Role:** 行动按钮

朱红填充、和纸文字、零圆角（绝不是圆形）、3px 靛蓝描边、20px/700、字距 0.2em、padding 14px 32px，硬阴影 4px 4px 0 靛蓝。hover 时阴影扩到 6px 且整体位移 2px 2px；按下时阴影归零并下沉。过渡 120ms linear。

- **Sizes:** padding 14px 32px; label 20px
- **States:** hover: shadow 6px, offset 2px; active: shadow none

### Wave Pattern

**Role:** 波浪纹装饰

用重复的圆弧（SVG path 或 border-radius 拼合）画出北斋式波浪，线宽 3px、靛蓝或群青，高度 48 到 120px。只出现在区块的上下边，单屏不超过两处。

### Gold Seal

**Role:** 印章标记

32px 见方的朱红或金箔方块（4px 圆角）、内嵌 20px 的和纸色衬线单字、边缘做 1px 的残缺（mask 切掉几像素）。用于标记章节与「已阅」。

### Cartouche Label

**Role:** 题签标签

靛蓝填充、和纸文字、零圆角、16px/700、字距 0.2em、padding 6px 14px，左侧加一条 3px 金箔竖线。用于栏目名与编号，位置常在区块左上。

## Do's and Don'ts

### Do

- 靛蓝、朱红、金箔三色为主
- 3px 粗描边勾形
- 硬边偏移阴影，零模糊
- 零圆角，绝不圆形按钮
- hover 做版画式偏移位移
- 粗衬线配宽字距

### Don't

- 不要用渐变阴影或柔和模糊
- 不要用透明度与玻璃效果
- 不要用西式圆角与圆形按钮
- 不要用霓虹或高饱和现代色
- 不要用弹簧回弹
- 不要用丝滑的现代动效

## Surfaces

| Level | Name | Value | Purpose |
|---|---|---|---|
| 0 | Washi | `#f5f0e1` | 纸底 |
| 1 | Indigo Block | `#1a3055` | 深色区块 |
| 2 | Vermilion Block | `#d4553a` | 强调区块 |

## Elevation

- **Woodblock offset:** `4px 4px 0 #1a3055`
- **Woodblock hover:** `6px 6px 0 #1a3055`
- **Pressed:** `none`

## Imagery

木版画风插画：波浪、富士、花鸟、人物侧面，必须粗描边加平涂。允许把照片处理成三色木刻效果。不使用柔和渐变、写实摄影与玻璃质感。

## Layout

上限 1100px、容器内边距 24px，区块间距 112px。允许斜向构图与元素错位（模拟套版），但正文保持可读。零圆角贯穿全站。

## Agent Prompt Guide

### Implementation Contract

- 以用户请求中的页面、用户任务和真实内容为依据，只实施指定范围；标明缺失的业务信息，不编造数据或能力。
- 先检查现有项目、技术栈与组件；沿用项目结构、路由和依赖，复用已有组件，不重建未要求的页面或功能。
- 沿用项目断点，调整窄屏与桌面的网格和留白；保留信息层级，避免意外横向溢出。
- 对本次涉及的交互，处理键盘焦点与减少动态效果；补齐适用的禁用、加载、空内容与错误状态。
- 完成后按项目现有脚本检查，仅报告实际运行的测试与视觉检查，并列出未验证项。

QUICK COLOR REFERENCE:

- text: `#1a3055`
- background: `#f5f0e1`
- vermilion: `#d4553a`
- gold: `#c9a227`
- ultramarine: `#2a5a8c`
- ink: `#1a3055`

EXAMPLE COMPONENT PROMPTS:

1. 做一个浮世绘风卡片：和纸色 #f5f0e1 填充、零圆角、3px solid #1a3055 描边、内边距 32px、box-shadow 4px 4px 0 #1a3055。顶部压一条 4px #d4553a 横条。标题 46px 粗衬线、字距 0.02em、色 #1a3055。hover 时阴影扩到 6px 6px 0 #1a3055 并 translate(2px,2px)，transition 150ms linear。按钮用 #d4553a 填充、和纸色文字、零圆角、3px 靛蓝描边、硬阴影。页面底色 #f5f0e1。全站零圆角、零模糊。
