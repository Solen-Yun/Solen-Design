# 波普艺术 — 风格参考

> 粗黑轮廓、Ben-Day 网点、喊出来的对话框：漫画印在画布上。

**Theme:** light

波普艺术来自沃霍尔与利希滕斯坦：4px 粗黑边框包住一切，背景铺 Ben-Day 网点（等距圆点），颜色是高饱和的平涂黄、粉、蓝，文字用 900 字重全大写像漫画标题，按钮与卡片带 4px 4px 0 黑的硬阴影。它禁止渐变（一切必须平涂）、禁止低饱和与灰调、禁止 2px 以下细边框、禁止全圆角、禁止极简无装饰——空白的波普等于没画完。

## Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Pop Yellow | `#ffdd00` | `--color-pop-yellow` | 主底色与最大色块。整套风格的亮度来源。 |
| Pop Pink | `#ff69b4` | `--color-pop-pink` | 第二主色，常与黄直接相撞。 |
| Pop Blue | `#00bfff` | `--color-pop-blue` | 第三撞色与对话气泡底。 |
| Black | `#000000` | `--color-black` | 4px 轮廓、硬阴影与文字。一切形状都由它勾出。 |
| White | `#ffffff` | `--color-white` | 画布与网点底色，也用于反白文字。 |
| Light Violet | `#a486ff` | `--color-light-violet` | 第四撞色，出现频率最低，用于打破黄粉蓝的固定组合。 |

## Typography

### Inter — 只有 900 一个字重，全大写。标题 56 到 80px、行高 0.95，像漫画封面。

- **Substitute:** 'Arial Black', Impact, sans-serif
- **Weights:** 900
- **Sizes:** 16, 20, 28, 40, 56, 80
- **Line height:** 0.95 (display), 1.05 (headings), 1.4 (body)
- **Letter spacing:** -0.02em on display, 0.04em on uppercase labels

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|---|---|---|---|---|---|---|
| display | — | 900 | 80px | 0.95 | -0.02em | `--text-display` |
| heading | — | 900 | 56px | 1 | -0.02em | `--text-heading` |
| subheading | — | 900 | 40px | 1.05 | — | `--text-subheading` |
| body-lg | — | 900 | 20px | 1.35 | — | `--text-body-lg` |
| body | — | 900 | 16px | 1.4 | — | `--text-body` |
| label | — | 900 | 16px | 1.3 | 0.04em | `--text-label` |

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
| cards | 2px |
| buttons | 2px |
| bubbles | 24px |

- **Page max-width:** 1160px
- **Section gap:** 96px
- **Card padding:** 24px
- **Element gap:** 16px

## Components

### Comic Headline

**Role:** 漫画式标题（核心）

56 到 80px、900 字重、全大写、行高 0.95、字距 -0.02em，颜色黑或白。可叠 2px 的文字描边（-webkit-text-stroke）与 4px 4px 0 黑的偏移阴影，形成漫画标题的立体感。允许旋转 -2 到 2 度。

### Pop Button

**Role:** 行动按钮

波普黄或粉填充、黑字、4px 黑边、2px 圆角、16px/900 全大写、padding 12px 28px，硬阴影 4px 4px 0 黑。hover 时填充硬切到另一撞色、阴影扩到 6px；按下时位移 4px 4px 且阴影归零。过渡 100ms linear。

- **Sizes:** padding 12px 28px; label 16px
- **States:** hover: color cut, shadow 6px; active: translate 4px

### Ben-Day Bed

**Role:** Ben-Day 网点底（签名）

用 radial-gradient 做 6px 间距、1.5px 半径的圆点，颜色取撞色之一（黄、粉或蓝）的 100%，铺在白底上。网格角度 45 度（避免摩尔纹）。它必须清晰可见——网点是利希滕斯坦的签名，模糊它就等于丢掉风格。

### Speech Bubble

**Role:** 对话气泡

白或黄填充、4px 黑边、24px 圆角（气泡是唯一允许圆角的元素）、内边距 20px，硬阴影 4px 4px 0 黑。尾巴用两个伪元素画：一个 4px 黑边三角、一个覆盖描边的白三角。文字 20px/900 全大写。

### Dot Card

**Role:** 网点内容卡

白底叠 45 度 Ben-Day 网点、4px 黑边、2px 圆角、内边距 24px，硬阴影 4px 4px 0 黑。标题 40px/900，正文 16px/900。hover 时网点颜色换到另一撞色、阴影扩到 6px。

## Do's and Don'ts

### Do

- 4px 粗黑边框包住一切
- Ben-Day 网点作背景纹理
- 高饱和平涂，绝不用渐变
- 900 字重全大写标题
- 硬阴影 4px 4px 0 黑
- 对话气泡承载引语

### Don't

- 不要用渐变
- 不要用低饱和或灰色系
- 不要用 2px 以下边框
- 不要用全圆角（气泡除外）
- 不要做极简无装饰的页面
- 不要把网点做糊

## Surfaces

| Level | Name | Value | Purpose |
|---|---|---|---|
| 0 | Pop Yellow | `#ffdd00` | 黄底区块 |
| 1 | White | `#ffffff` | 白底区块 |
| 2 | Pop Pink | `#ff69b4` | 粉底区块 |

## Elevation

- **Hard offset:** `4px 4px 0 #000000`
- **Hard offset lg:** `6px 6px 0 #000000`
- **Pressed:** `none`

## Imagery

波普化图像：把照片压成 4 到 6 个平涂色块加黑轮廓（像丝网印刷），或处理成网点单色。允许重复排列同一张图（沃霍尔式）。不使用渐变图像、写实摄影与极简构图。

## Layout

上限 1160px、容器内边距 24px，区块间距 96px。允许元素重叠与旋转 -2 到 2 度。整页以大色块分区（黄、白、粉），每个区块必须至少有网点或粗边，不能出现无装饰的空区。

## Agent Prompt Guide

### Implementation Contract

- 以用户请求中的页面、用户任务和真实内容为依据，只实施指定范围；标明缺失的业务信息，不编造数据或能力。
- 先检查现有项目、技术栈与组件；沿用项目结构、路由和依赖，复用已有组件，不重建未要求的页面或功能。
- 沿用项目断点，调整窄屏与桌面的网格和留白；保留信息层级，避免意外横向溢出。
- 对本次涉及的交互，处理键盘焦点与减少动态效果；补齐适用的禁用、加载、空内容与错误状态。
- 完成后按项目现有脚本检查，仅报告实际运行的测试与视觉检查，并列出未验证项。

QUICK COLOR REFERENCE:

- text: `#000000`
- background: `#ffdd00`
- pink: `#ff69b4`
- blue: `#00bfff`
- white: `#ffffff`
- violet: `#a486ff`

EXAMPLE COMPONENT PROMPTS:

1. 做一个波普风卡片：白底叠 45 度 Ben-Day 网点（6px 间距、1.5px 半径、色 #ff69b4）、4px solid #000 边框、2px 圆角、内边距 24px、box-shadow 4px 4px 0 #000。标题 40px/900 全大写、行高 0.95、黑色，正文 16px/900。按钮 #ffdd00 填充、黑字、4px 黑边、2px 圆角、硬阴影 4px 4px 0 #000，hover 时填充硬切到 #ff69b4、阴影扩到 6px。页面以黄、白、粉三种大色块分区，全站不用渐变。
