# 动力学构成主义 — 风格参考

> 几何图元不是被摆放的，而是被装上轴的：圆在公转，三角在摆动。

**Theme:** light

动力学构成主义把构成主义装上了马达：米白纸（#efe9dc）上只用圆、三角、方、粗斜条与弧这五种图元，填构成红（#e0231b）、群青（#1c4a87）、金黄（#f4b301）三色，暖墨（#17130e）作主体。图元不装饰版面，而是沿轴运动——圆公转、三角像钟摆摆动、方块按拍子行进。入场用 expo-out（0.6 到 0.9 秒），旋转循环用 linear 或 steps() 做出齿轮感。禁令极硬：不许圆角阴影渐变发光模糊、不许第四种颜色、不许把三原色调浑、不许插画抢戏、不许一屏所有图元同时乱动（保留静态骨架，一次只有一组主导运动）、不许动画布局属性、不许忽略 reduced-motion。

## Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Bone Paper | `#efe9dc` | `--color-bone-paper` | 页面底。略带黄的纸色，像一张还没印的海报。 |
| Warm Ink | `#17130e` | `--color-warm-ink` | 文字与最粗的斜条。带暖调的近黑。 |
| Constructivist Red | `#e0231b` | `--color-red` | 第一原色：主圆盘与最抢眼的图元。 |
| Ultramarine | `#1c4a87` | `--color-ultramarine` | 第二原色：三角与次级图元。 |
| Chrome Yellow | `#f4b301` | `--color-chrome-yellow` | 第三原色：最小的方块与高亮点。 |

## Typography

### Inter — 全站无衬线，700 与 900。标题压到行高 0.95，字块本身就是一块几何体。

- **Substitute:** 'Arial Black', Helvetica, sans-serif
- **Weights:** 700, 900
- **Sizes:** 13, 16, 22, 32, 48, 72
- **Line height:** 0.95 (display), 1.05 (headings), 1.5 (body)
- **Letter spacing:** -0.03em on display, 0.08em on uppercase labels

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|---|---|---|---|---|---|---|
| display | — | 900 | 72px | 0.95 | -0.03em | `--text-display` |
| heading | — | 900 | 48px | 1 | -0.03em | `--text-heading` |
| subheading | — | 700 | 32px | 1.1 | — | `--text-subheading` |
| body-lg | — | 700 | 22px | 1.4 | — | `--text-body-lg` |
| body | — | 700 | 16px | 1.5 | — | `--text-body` |
| label | — | 700 | 13px | 1.4 | 0.08em | `--text-label` |

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
| cards | 0 |
| buttons | 0 |
| discs | 999px |

- **Page max-width:** 1200px
- **Section gap:** 96px
- **Card padding:** 24px
- **Element gap:** 24px

## Components

### Orbiting Disc

**Role:** 公转圆盘（核心组件）

一个实心圆（40 到 160px、填构成红），沿另一个更大的隐形圆轨道公转：用 @keyframes 只改 transform 的 rotate（外圈旋转带动内层反向旋转以保持自身不转）。周期 12 到 24 秒、linear 无限。圆本身零圆角（它是圆）、无阴影无描边。

- **Sizes:** cycle 12–24s linear

### Pendulum Triangle

**Role:** 钟摆三角

一个实心等腰三角（用 clip-path polygon）以顶点为轴做 ±18 度的摆动，周期 4 到 6 秒、cubic-bezier(0.45, 0, 0.55, 1)（近似正弦）。填群青或金黄。摆动的支点必须在顶点，否则看起来像在飘。

- **Sizes:** swing ±18deg; 4–6s

### Marching Blocks

**Role:** 行进的方块

3 到 6 个等大的方块（各 24 到 40px）排成一行，依次以 120ms 的延迟沿 X 轴平移 16px 再回位，周期 1.6 秒、linear 或 steps(2)（齿轮感）。填三原色轮换。绝不许它们同时移动——错峰才有行军感。

- **Sizes:** stagger 120ms; cycle 1.6s

### Diagonal Bar

**Role:** 粗斜条

一条 16 到 40px 粗、斜 45 度或 -30 度的实心条，填暖墨或构成红，横跨区块并允许溢出容器。它是最强的构图轴，静态——动的图元应该沿着它的方向运动。

### Hard Button

**Role:** 行动按钮

构成红填充、米白文字、零圆角、无描边、16px/900、字距 0.08em、padding 12px 28px，无阴影。hover 时填充硬切到群青；按下时位移 2px 2px（无阴影可归零，用位移表示压入）。入场用 expo-out 0.7 秒。

- **Sizes:** padding 12px 28px; label 16px
- **States:** hover: blue fill; active: translate 2px

## Do's and Don'ts

### Do

- 只用五种图元、三种原色
- 圆公转、三角摆、方块行进
- 入场用 expo-out 0.6 到 0.9 秒
- 旋转循环用 linear 或 steps()
- 一屏只有一组主导运动
- 动画只用 transform

### Don't

- 不要用圆角、阴影、渐变、发光与模糊
- 不要引入第四种颜色
- 不要把三原色调浑
- 不要让插画抢戏
- 不要一屏所有图元同时乱动
- 不要动画布局属性

## Surfaces

| Level | Name | Value | Purpose |
|---|---|---|---|
| 0 | Bone Paper | `#efe9dc` | 页面底 |
| 1 | Red Solid | `#e0231b` | 红色图元 |
| 2 | Ultramarine Solid | `#1c4a87` | 蓝色图元 |

## Elevation

- **None:** `none — knife-cut hard edges only`

## Imagery

没有图像，图元就是图像。允许极少量黑白摄影并以硬边几何裁切嵌入。不使用插画、3D 拟物与有任何柔和边缘的图像。

## Layout

上限 1200px、容器内边距 24px，区块间距 96px。允许图元溢出容器与页面边缘。**一屏只允许一组主导运动**：其余图元保持静态，作为骨架。所有运动只用 transform，绝不动 top/left/width/height。

## Agent Prompt Guide

### Implementation Contract

- 以用户请求中的页面、用户任务和真实内容为依据，只实施指定范围；标明缺失的业务信息，不编造数据或能力。
- 先检查现有项目、技术栈与组件；沿用项目结构、路由和依赖，复用已有组件，不重建未要求的页面或功能。
- 沿用项目断点，调整窄屏与桌面的网格和留白；保留信息层级，避免意外横向溢出。
- 对本次涉及的交互，处理键盘焦点与减少动态效果；补齐适用的禁用、加载、空内容与错误状态。
- 完成后按项目现有脚本检查，仅报告实际运行的测试与视觉检查，并列出未验证项。

QUICK COLOR REFERENCE:

- text: `#17130e`
- background: `#efe9dc`
- red: `#e0231b`
- blue: `#1c4a87`
- yellow: `#f4b301`
- ink: `#17130e`

EXAMPLE COMPONENT PROMPTS:

1. 做一个动力学构成主义版面：米白纸 #efe9dc 底、暖墨 #17130e 文字。一个 120px 的构成红 #e0231b 实心圆沿隐形轨道公转（@keyframes 只改 transform rotate、周期 18s linear、内层反向旋转保持直立）。一个群青 #1c4a87 等腰三角以顶点为轴 ±18 度摆动（5s、cubic-bezier(0.45,0,0.55,1)）。四个 32px 的金黄 #f4b301 方块错峰 120ms 沿 X 轴平移 16px（1.6s linear）。一条 32px 粗的暖墨斜条以 45 度横跨区块并溢出容器。标题 72px/900、行高 0.95、字距 -0.03em。零圆角零阴影无渐变，一屏只有一组主导运动。
