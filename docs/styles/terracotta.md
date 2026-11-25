# 赤陶暖调 — 风格参考

> 赤陶、沙、奶油：地中海的午后，一切都在阳光里慢慢干。

**Theme:** light

赤陶暖调来自地中海的手工陶器与土墙：奶油底（#faf5ef）、赤陶主色（#b5654a）、沙（#d4a373）与土棕（#7a6350）作大地色系层次、橄榄绿（#8b9d77）作自然元素。阴影是暖色调的柔光（赤陶 10%）而不是灰的黑，点击反馈用下沉压印（active 时 translateY 而非缩放），因为陶器被按下去是陷进去不是弹出来。它禁止一切冷色——蓝与紫在这套语言里是不存在的。

## Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Terracotta | `#b5654a` | `--color-terracotta` | 主色：主按钮、主强调与陶器语义。 |
| Cream | `#faf5ef` | `--color-cream` | 页面底。暖白的墙面色。 |
| Sand | `#d4a373` | `--color-sand` | 第一层次色，用于区块底与装饰。 |
| Earth Brown | `#7a6350` | `--color-earth-brown` | 正文与第二层次。像烧过的黏土。 |
| Olive | `#8b9d77` | `--color-olive` | 植物与「自然」语义，用于标签与点缀。 |
| Fresh Green | `#8fb86a` | `--color-fresh-green` | 最亮的一支，只在「新芽」与春季主题出现。 |

## Typography

### Lora — 衬线字体，行高 1.75。手作感需要一点不精确，所以字距只微开不加宽。

- **Substitute:** Georgia, 'Songti SC', serif
- **Weights:** 400, 600
- **Sizes:** 14, 17, 21, 28, 36, 48
- **Line height:** 1.2 (display), 1.3 (headings), 1.75 (body)
- **Letter spacing:** 0.01em on display, 0.1em on uppercase labels

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|---|---|---|---|---|---|---|
| display | — | 600 | 48px | 1.2 | 0.01em | `--text-display` |
| heading | — | 600 | 36px | 1.3 | — | `--text-heading` |
| subheading | — | 400 | 28px | 1.4 | — | `--text-subheading` |
| body-lg | — | 400 | 21px | 1.7 | — | `--text-body-lg` |
| body | — | 400 | 17px | 1.75 | — | `--text-body` |
| label | — | 600 | 14px | 1.55 | 0.1em | `--text-label` |

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
| inputs | 8px |
| pots | 999px 999px 40% 40% |

- **Page max-width:** 1080px
- **Section gap:** 112px
- **Card padding:** 32px
- **Element gap:** 24px

## Components

### Clay Button

**Role:** 行动按钮

赤陶填充、奶油文字、8px 圆角、无描边、17px/600、padding 14px 32px，暖阴影 0 6px 20px 赤陶 10%。hover 时填充加深到 #a1563f、阴影扩到 32px；按下时 translateY(2px) 且阴影收到 6px——是压印而不是缩放。过渡 200ms ease-out。

- **Sizes:** padding 14px 32px; label 17px
- **States:** hover: deeper fill; active: translateY 2px

### Clay Card

**Role:** 内容卡

奶油或沙 18% 填充、12px 圆角、1px 土棕 12% 描边、内边距 32px，暖阴影 0 6px 20px 赤陶 10%。标题 36px/600 土棕，正文 17px 土棕 80%。hover 时阴影扩到 32px 并上浮 2px。

### Pot Silhouette

**Role:** 陶罐轮廓装饰

用 border-radius 的四值（如 999px 999px 40% 40%）做出罐子的轮廓，填沙或赤陶并降到 20% 到 35%，尺寸 64 到 160px。放在卡片角落或区块之间，作为「手工器物」的暗示，单屏 2 到 3 处。

### Earth Gradient

**Role:** 大地色渐变层

从沙到土棕的 135 度渐变（不透明度 20% 到 40%），叠在区块背景上，模拟墙面受光的变化。绝不做到 60% 以上——它应该是气息而不是色块。

### Clay Field

**Role:** 表单输入

奶油填充、8px 圆角、1px 土棕 25% 描边、padding 12px 16px、17px 衬线。占位符土棕 45%。聚焦时描边转赤陶并加 2px 的赤陶 20% 外环。

## Do's and Don'ts

### Do

- 奶油底配赤陶与大地色
- 阴影是暖色调而非灰黑
- 点击下沉压印，不缩放
- 橄榄绿作自然元素
- 圆角 8 到 12px
- 用陶罐轮廓暗示手作

### Don't

- 不要用蓝、紫等冷色
- 不要用灰黑阴影
- 不要用弹性缩放反馈
- 不要用金属高光
- 不要让渐变超过 60%
- 不要用冷调摄影

## Surfaces

| Level | Name | Value | Purpose |
|---|---|---|---|
| 0 | Cream | `#faf5ef` | 页面底 |
| 1 | Sand Block | `rgba(212,163,115,0.18)` | 次级区块 |
| 2 | Terracotta Block | `#b5654a` | 强调块 |

## Elevation

- **Warm soft:** `0 6px 20px rgba(181,101,74,0.10)`
- **Warm hover:** `0 12px 32px rgba(181,101,74,0.16)`
- **Pressed:** `0 2px 6px rgba(181,101,74,0.12)`

## Imagery

手作器物与地中海场景：陶罐、土墙、橄榄树、亚麻、食物。必须自然光、暖调、可见材质纹理。不使用冷调摄影、蓝色与紫色图像、金属高光。

## Layout

上限 1080px、容器内边距 24px，区块间距 112px。允许轻微的不对称（5:7 双栏）。留白宽松，暖阴影负责把元素从底上抬起，而不是边框。

## Agent Prompt Guide

### Implementation Contract

- 以用户请求中的页面、用户任务和真实内容为依据，只实施指定范围；标明缺失的业务信息，不编造数据或能力。
- 先检查现有项目、技术栈与组件；沿用项目结构、路由和依赖，复用已有组件，不重建未要求的页面或功能。
- 沿用项目断点，调整窄屏与桌面的网格和留白；保留信息层级，避免意外横向溢出。
- 对本次涉及的交互，处理键盘焦点与减少动态效果；补齐适用的禁用、加载、空内容与错误状态。
- 完成后按项目现有脚本检查，仅报告实际运行的测试与视觉检查，并列出未验证项。

QUICK COLOR REFERENCE:

- text: `#7a6350`
- background: `#faf5ef`
- terracotta: `#b5654a`
- sand: `#d4a373`
- brown: `#7a6350`
- olive: `#8b9d77`

EXAMPLE COMPONENT PROMPTS:

1. 做一个赤陶暖调卡片：奶油 #faf5ef 填充、12px 圆角、1px rgba(122,99,80,0.12) 描边、内边距 32px、box-shadow 0 6px 20px rgba(181,101,74,0.1)。标题 36px/600 Lora、色 #7a6350；正文 17px、行高 1.75、色 rgba(122,99,80,0.8)。左上角放一个 96px 的陶罐轮廓（border-radius 999px 999px 40% 40%、填 rgba(212,163,115,0.3)）。主按钮 #b5654a 填充、奶油文字、8px 圆角、padding 14px 32px、暖阴影，hover 时填充加深到 #a1563f，active 时 translateY(2px) 而非缩放。页面底色 #faf5ef，全站禁用蓝紫等冷色。
