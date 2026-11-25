# 欧普艺术 — 风格参考

> 黑白条纹让静止的页面看起来在动——眼睛被图案骗了。

**Theme:** light

欧普艺术用几何图案制造视觉错觉：纯黑白的极端对比是底子，同心圆、条纹与棋盘格作为装饰，振动色彩对（红与蓝、黄与紫）作点缀。它的纪律与「乱」相反——所有元素严格对齐网格、居中、用 2px 黑线勾出、零圆角，因为错觉依赖图案的精确性，任何松动都会让效果失效。它禁止大面积密集图案（会造成视觉疲劳与晕眩）、禁止柔和渐变、禁止柔和阴影。

## Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Black | `#000000` | `--color-black` | 图案的一半、文字与 2px 线条。对比的极限。 |
| White | `#ffffff` | `--color-white` | 图案的另一半与画布。纯白，不做任何灰阶过渡。 |
| Vibrating Red | `#ff3300` | `--color-vibrating-red` | 第一振动色，与蓝并置时边缘会「抖」。 |
| Vibrating Blue | `#0066ff` | `--color-vibrating-blue` | 第二振动色，与红成对使用，绝单独出现。 |
| Vibrating Yellow | `#ffcc00` | `--color-vibrating-yellow` | 第三振动色，只作小块点缀。 |
| Olive | `#5e6d00` | `--color-olive` | 压在黄色上的文字色，避免黄底黄字。 |

## Typography

### Inter — 极简无衬线，字重 500 与 700。文字必须克制——图案已经是主角。

- **Substitute:** Helvetica, 'Arial Black', sans-serif
- **Weights:** 500, 700
- **Sizes:** 13, 16, 22, 30, 44, 64
- **Line height:** 1.1 (display), 1.2 (headings), 1.5 (body)
- **Letter spacing:** -0.02em on display, 0.1em on uppercase labels

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|---|---|---|---|---|---|---|
| display | — | 700 | 64px | 1.1 | -0.02em | `--text-display` |
| heading | — | 700 | 44px | 1.15 | — | `--text-heading` |
| subheading | — | 500 | 30px | 1.25 | — | `--text-subheading` |
| body-lg | — | 500 | 22px | 1.45 | — | `--text-body-lg` |
| body | — | 500 | 16px | 1.5 | — | `--text-body` |
| label | — | 700 | 13px | 1.4 | 0.1em | `--text-label` |

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
| cards | 0 |
| buttons | 0 |
| inputs | 0 |

- **Page max-width:** 1200px
- **Section gap:** 96px
- **Card padding:** 24px
- **Element gap:** 16px

## Components

### Concentric Rings

**Role:** 同心圆图案（签名）

用 repeating-radial-gradient 画 8px 一环的黑白同心圆，覆盖一个 240 到 480px 的方或圆区域。线与线的宽度必须相等（各 8px），一宽一窄就失去欧普的「呼吸」节奏。

### Stripe Field

**Role:** 条纹与棋盘格

用 repeating-linear-gradient 画 8px 间隔的黑白条纹，或 16px 的棋盘格，覆盖一个区块。条纹可以 15 度倾斜制造更强的振动。面积上限为单屏 30%——超过会导致视觉疲劳。

### Vibrating Pair

**Role:** 振动色对

红与蓝（或黄与紫）两块等面积的色块紧贴并列，中间加一条 2px 黑线。两色边界会产生震颤感。绝不让其中一块独占大面积，面积必须相等才有振动。

### Op Button

**Role:** 行动按钮

黑填充、白字、零圆角、2px 黑描边（反色时为白描边）、16px/700、padding 12px 28px，无阴影。hover 时填充与文字硬切互换（黑白反转）；按下时内缩 2px 并加 2px 黑内边框。过渡 120ms linear。

- **Sizes:** padding 12px 28px; label 16px
- **States:** hover: invert; active: inset 2px

### Grid Cell

**Role:** 严格网格单元

所有内容放在严格对齐的网格里（4 或 6 列），单元用 2px 黑线分隔，零圆角。内容居中（items-center justify-center）。禁止错位——欧普的错觉会被任何松动破坏。

## Do's and Don'ts

### Do

- 纯黑白的高对比
- 同心圆、条纹与棋盘格
- 条纹与间隔宽度必须相等
- 严格网格对齐并居中
- 振动色对大块等面积并列
- 密集图案不超过单屏 30%

### Don't

- 不要大面积铺密集图案
- 不要用柔和渐变
- 不要用柔和阴影
- 不要偏移网格
- 不要用圆角
- 不要让振动色对面积不等

## Surfaces

| Level | Name | Value | Purpose |
|---|---|---|---|
| 0 | White | `#ffffff` | 画布 |
| 1 | Black Block | `#000000` | 反色区块 |
| 2 | Pattern Field | `repeating gradient` | 图案区 |

## Elevation

- **None:** `none — a shadow would break the flat illusion`

## Imagery

图像即图案：同心圆、条纹、棋盘格、莫尔条纹、波动线。允许把照片转成超高高对比的黑白半调。不使用彩色摄影、柔和插画与任何有景深的图像。

## Layout

上限 1200px、容器内边距 24px，区块间距 96px。一切严格对齐网格并居中，零圆角零阴影。图案区块的面积受控：单屏不超过 30% 是密集图案区，其余留白或纯色。

## Agent Prompt Guide

### Implementation Contract

- 以用户请求中的页面、用户任务和真实内容为依据，只实施指定范围；标明缺失的业务信息，不编造数据或能力。
- 先检查现有项目、技术栈与组件；沿用项目结构、路由和依赖，复用已有组件，不重建未要求的页面或功能。
- 沿用项目断点，调整窄屏与桌面的网格和留白；保留信息层级，避免意外横向溢出。
- 对本次涉及的交互，处理键盘焦点与减少动态效果；补齐适用的禁用、加载、空内容与错误状态。
- 完成后按项目现有脚本检查，仅报告实际运行的测试与视觉检查，并列出未验证项。

QUICK COLOR REFERENCE:

- text: `#000000`
- background: `#ffffff`
- red: `#ff3300`
- blue: `#0066ff`
- yellow: `#ffcc00`
- olive: `#5e6d00`

EXAMPLE COMPONENT PROMPTS:

1. 做一个欧普艺术版面：白底 #ffffff、纯黑 #000000 图案。左侧一个 320px 见方的同心圆区域，用 repeating-radial-gradient 画 8px 环（线与间隔各 8px）。右侧严格 6 栏网格、居中排版，标题 44px/700 字距 -0.02em，正文 16px/500。中间放一对等面积的振动色块：红 #ff3300 与蓝 #0066ff 紧贴、中间 2px 黑线。按钮黑填充白字、零圆角、2px 黑边，hover 时黑白反转，transition 120ms linear。全站零圆角、零阴影、无渐变。密集图案面积不超过单屏 30%。
