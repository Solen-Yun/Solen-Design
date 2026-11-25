# 水彩艺术风 — 风格参考

> 颜料在水里散开：边缘是渗的，颜色是层叠的，纸是湿的。

**Theme:** light

水彩艺术风模拟真实水彩的物理行为：颜料从中心向边缘池化（用 radial-gradient 做按钮）、边缘不规则地渗开、颜色以极低不透明度层层叠加、纸面有颗粒纹理（feTurbulence）。它的技术参数刻意压到极低——边框只有 8% 到 18% 不透明度、阴影极柔且带色、圆角 24px 以上。禁令也很明确：禁止硬边偏移阴影、禁止 2px 以上粗边框、禁止纯黑与霓虹、禁止等宽字体、禁止全大写，因为水彩里没有尖锐的东西。

## Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Blush | `#d4a0a0` | `--color-blush` | 主色：主按钮与主要色块，像一层薄薄的赭红。 |
| Wet Paper | `#faf6f0` | `--color-wet-paper` | 页面底。带纹理的暖白，模拟水彩纸。 |
| Water Blue | `#7bb8d4` | `--color-water-blue` | 第二色，用于水与天空的意象。 |
| Leaf Green | `#8cc5a8` | `--color-leaf-green` | 植物语义与成功状态。 |
| Petal Violet | `#c3a0d4` | `--color-petal-violet` | 情绪化强调与花卉点缀。 |
| Gamboge | `#e8c87a` | `--color-gamboge` | 高光与阳光的一层，最常作为叠加色。 |

## Typography

### Cormorant Garamond — 全站衬线，字距 0.14em 放宽，行高 1.85。禁止等宽与全大写。

- **Substitute:** 'EB Garamond', Georgia, 'Songti SC', serif
- **Weights:** 300, 400, 600
- **Sizes:** 15, 18, 22, 30, 40, 54
- **Line height:** 1.15 (display), 1.3 (headings), 1.85 (body)
- **Letter spacing:** 0.02em on display, 0.14em on uppercase labels

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|---|---|---|---|---|---|---|
| display | Cormorant Garamond | 300 | 54px | 1.15 | 0.02em | `--text-display` |
| heading | Cormorant Garamond | 400 | 40px | 1.25 | — | `--text-heading` |
| subheading | Cormorant Garamond | 400 | 30px | 1.35 | — | `--text-subheading` |
| body-lg | Cormorant Garamond | 400 | 22px | 1.8 | — | `--text-body-lg` |
| body | Cormorant Garamond | 400 | 18px | 1.85 | — | `--text-body` |
| label | Cormorant Garamond | 600 | 15px | 1.6 | 0.14em | `--text-label` |

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
| buttons | 24px |
| inputs | 24px |

- **Page max-width:** 1060px
- **Section gap:** 128px
- **Card padding:** 36px
- **Element gap:** 28px

## Components

### Wet Button

**Role:** 行动按钮（颜料池化）

藕粉填充并叠一层 radial-gradient（中心亮 110%、边缘降到 90%）模拟颜料池化、24px 圆角、1px 藕粉 18% 描边、衬线 15px、字距 0.14em、padding 16px 40px，阴影 0 4px 20px 藕粉 30% 加 inset 0 1px 0 白 20%。hover 时填充加深到 #c99595、阴影扩到 40px；按下缩到 0.98 并加内阴影。过渡 500ms ease-in-out。

- **Sizes:** padding 16px 40px; label 15px
- **States:** hover: deeper wash, wider shadow; active: scale 0.98

### Wash Card

**Role:** 内容卡（多色层叠）

白底上叠两层极淡色块（第一层 10% 藕粉、第二层 8% 水蓝，各自用 radial-gradient 从一角散开）、32px 圆角、1px 藕粉 12% 描边、内边距 36px，柔阴影 0 4px 20px 藕粉 30%。三层叠加后边缘应显得不匀，模仿湿画法。

### Bleed Edge

**Role:** 渗化边缘装饰

用 SVG 的 feTurbulence 加 feDisplacementMap（baseFrequency 0.02、scale 8）作用在色块或图片边缘上，让边界轻微抖动与晕开。只作用于装饰块，绝不作用于文字。

### Paper Grain

**Role:** 纸纹叠加层

全页固定覆盖一层 2% 到 4% 不透明度的噪点纹理（feTurbulence 或 base64 噪点图），pointer-events: none，混合模式 multiply。这层让所有色块看起来是画在纸上的。

### Botanical Sprig

**Role:** 植物水彩点缀

一枝 64 到 160px 的水彩叶或花（半透明、边缘渗开），颜色取叶绿或花紫并降到 40% 到 60%，置于卡片角落或标题旁。单屏最多三处。

## Do's and Don'ts

### Do

- 边框只有 8% 到 18% 不透明度
- 用 radial-gradient 做颜料池化
- 叠一层 2% 到 4% 的纸纹
- 圆角 24px 以上
- 阴影极柔且带色
- 过渡 500ms ease-in-out

### Don't

- 不要用硬边偏移阴影
- 不要用 2px 以上边框
- 不要用纯黑或霓虹色
- 不要用等宽字体
- 不要用全大写文字
- 不要给文字加渗化滤镜

## Surfaces

| Level | Name | Value | Purpose |
|---|---|---|---|
| 0 | Wet Paper | `#faf6f0` | 页面底（带纸纹） |
| 1 | Wash Card | `rgba(212,160,160,0.10)` | 卡片（极淡色层） |
| 2 | Pool | `radial-gradient` | 颜料池化区域 |

## Elevation

- **Soft tinted:** `0 4px 20px rgba(212,160,160,0.30), inset 0 1px 0 rgba(255,255,255,0.20)`
- **Soft tinted hover:** `0 10px 40px rgba(212,160,160,0.50), inset 0 1px 0 rgba(255,255,255,0.20)`
- **Pressed:** `inset 0 2px 4px rgba(90,62,62,0.10)`

## Imagery

水彩画与湿画法插画：植物、风景、静物，必须有渗化边缘与颜色层叠。允许把照片处理成水彩效果。不使用硬边矢量插画、高饱和图像与纯黑背景。

## Layout

上限 1060px、容器内边距 24px，区块间距 128px。允许元素轻微错位与旋转（-2 到 2 度）。色块可以溢出容器边缘一点，像颜料画出了界。留白宽松，密度低于常规。

## Agent Prompt Guide

### Implementation Contract

- 以用户请求中的页面、用户任务和真实内容为依据，只实施指定范围；标明缺失的业务信息，不编造数据或能力。
- 先检查现有项目、技术栈与组件；沿用项目结构、路由和依赖，复用已有组件，不重建未要求的页面或功能。
- 沿用项目断点，调整窄屏与桌面的网格和留白；保留信息层级，避免意外横向溢出。
- 对本次涉及的交互，处理键盘焦点与减少动态效果；补齐适用的禁用、加载、空内容与错误状态。
- 完成后按项目现有脚本检查，仅报告实际运行的测试与视觉检查，并列出未验证项。

QUICK COLOR REFERENCE:

- text: `#5a3e3e`
- background: `#faf6f0`
- blush: `#d4a0a0`
- blue: `#7bb8d4`
- green: `#8cc5a8`
- violet: `#c3a0d4`

EXAMPLE COMPONENT PROMPTS:

1. 做一个水彩风按钮：背景 #d4a0a0 叠 radial-gradient(circle at 35% 30%, rgba(255,255,255,0.18), transparent 60%) 模拟颜料池化、24px 圆角、1px rgba(212,160,160,0.18) 描边、衬线 15px 字距 0.14em、padding 16px 40px、box-shadow 0 4px 20px rgba(212,160,160,0.3), inset 0 1px 0 rgba(255,255,255,0.2)。hover 时背景 #c99595、阴影扩到 0 10px 40px rgba(212,160,160,0.5)；active 时 scale(0.98) 并加 inset 0 2px 4px rgba(90,62,62,0.1)。transition 500ms ease-in-out。页面底色 #faf6f0，可叠 3% 纸纹噪点。
