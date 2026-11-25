# 瑞士海报风 — 风格参考

> 字大到成为图形，区块紧贴不留缝，层级靠尺寸与色块。

**Theme:** light

瑞士海报风是国际主义风格的海报分支：与常规瑞士风格的区别在于它把字推到海报尺度——字大到成为图形本身，行宽与栏宽由内容决定，允许单字占半屏。它的版面规则极其硬：黑白为主，原色（红 #ff0000、蓝 #0057b8、黄 #ffcc00）只作色块强调；区域之间用 2px 黑线分隔而不是留白，元素之间 gap-0 紧贴；圆角不超过 2px。禁止装饰性字体与等宽字体、禁止渐变、禁止虚线边框。

## Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Black | `#000000` | `--color-black` | 文字、分隔线与最大色块。海报的骨架全靠它。 |
| White | `#ffffff` | `--color-white` | 画布与反白文字。与黑成对，不做灰阶过渡。 |
| Red | `#ff0000` | `--color-red` | 第一强调色块。用于标记最重要的信息，面积不超过一屏 20%。 |
| Blue | `#0057b8` | `--color-blue` | 第二强调色块，常与红形成对角关系。 |
| Yellow | `#ffcc00` | `--color-yellow` | 第三强调与高亮条，用于需要跳出的细节。 |
| Ochre | `#6c3b00` | `--color-ochre` | 唯一暗暖色，用于压在黄色块上的文字。 |

## Typography

### Inter — 全站唯一字体，只用 700 与 900。海报标题 120 到 180px、行高压到 0.85，字块本身就是图形。

- **Substitute:** Helvetica, 'Arial Black', sans-serif
- **Weights:** 700, 900
- **Sizes:** 14, 18, 24, 40, 72, 120, 180
- **Line height:** 0.85 (display), 0.92 (headings), 1.4 (body)
- **Letter spacing:** -0.045em on display, 0.04em on uppercase labels

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|---|---|---|---|---|---|---|
| display | — | 900 | 180px | 0.85 | -0.045em | `--text-display` |
| heading-lg | — | 900 | 120px | 0.88 | -0.04em | `--text-heading-lg` |
| heading | — | 900 | 72px | 0.92 | -0.03em | `--text-heading` |
| subheading | — | 700 | 40px | 1 | — | `--text-subheading` |
| body | — | 700 | 18px | 1.4 | — | `--text-body` |
| label | — | 700 | 14px | 1.3 | 0.04em | `--text-label` |

## Spacing & Layout

**Base unit:** 0px
**Density:** compact

### Spacing Scale

| Name | Value | Token |
|---|---|---|
| 0 | 0px | `--spacing-0` |
| 8 | 8px | `--spacing-8` |
| 16 | 16px | `--spacing-16` |
| 24 | 24px | `--spacing-24` |
| 40 | 40px | `--spacing-40` |
| 64 | 64px | `--spacing-64` |
| 96 | 96px | `--spacing-96` |

### Border Radius

| Element | Value |
|---|---|
| cards | 0 |
| buttons | 0 |
| inputs | 0 |

- **Page max-width:** 1440px
- **Section gap:** 0px
- **Card padding:** 24px
- **Element gap:** 0px

## Components

### Poster Headline

**Role:** 海报主标题（核心）

120 到 180px、900 字重、行高 0.85、字距 -0.045em，字块左对齐或贴顶部，允许单行占满 1440px 宽。可与色块重叠（文字永远在上），与相邻区块之间不加空隙而是用 2px 黑线分割。

### Flush Grid

**Role:** 紧贴网格（gap-0）

12 栏网格、gap 为 0，区域之间只用 2px 黑线分隔。每个区域填纯色（白、黑或一支原色），区域内边距 24px。禁止用 gap-4 之类的间距做分隔——在瑞士海报里线就是间距。

### Block Button

**Role:** 行动按钮

纯黑填充、白字、零圆角、无描边、无阴影，14px/700、字距 0.04em、padding 16px 40px。hover 时填充硬切到原红；按下时填充换原蓝并位移 2px 2px（模拟套印偏移）。过渡 120ms linear。

- **Sizes:** padding 16px 40px; label 14px
- **States:** hover: red fill; active: blue fill, offset 2px

### Color Field

**Role:** 色块区域

整块填一支原色（红、蓝或黄）或纯黑，零圆角、无描边（由网格的 2px 线代替），内边距 24px。块内文字用黑或白按对比选择，最小 24px。一块只用一色。

### Rule Divider

**Role:** 2px 分隔线

2px 纯黑实线，横跨或纵贯，用于切割区域。绝不用虚线（这在瑞士语言里等于软弱），也绝不用留白代替线。

## Do's and Don'ts

### Do

- 字大到成为图形（120 到 180px）
- 黑白为主，原色只作色块
- 区域用 2px 黑线分隔，gap 为 0
- 行高压到 0.85 到 0.92
- 允许极端非对称
- 圆角不超过 2px

### Don't

- 不要用装饰性字体或等宽字体
- 不要用超过 2px 的圆角
- 不要用渐变
- 不要用虚线边框
- 不要用间距代替分隔线
- 不要做居中的对称排版

## Surfaces

| Level | Name | Value | Purpose |
|---|---|---|---|
| 0 | White | `#ffffff` | 画布 |
| 1 | Black Block | `#000000` | 反色区域 |
| 2 | Red Block | `#ff0000` | 强调区域 |

## Elevation

- **None:** `none — nothing floats on a poster`

## Imagery

黑白摄影、几何构成、单色图形。图像必须能被裁剪成严格的矩形并贴齐网格，允许高对比双色调叠加一支原色。不使用柔和摄影、插画与装饰图形。

## Layout

上限 1440px、零间距、12 栏、区域用 2px 线分隔。海报允许极端非对称：标题占 10 栏、正文占 2 栏。禁止居中的对称排版，也禁止用留白代替分隔线。

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
- red: `#ff0000`
- blue: `#0057b8`
- yellow: `#ffcc00`
- ochre: `#6c3b00`

EXAMPLE COMPONENT PROMPTS:

1. 做一个瑞士海报版面：12 栏网格、gap 为 0、区域之间用 2px solid #000 分隔。主标题 180px/900、行高 0.85、字距 -0.045em、左对齐并占满 10 栏。右侧两栏放 18px/700 正文。一块区域填 #ff0000、一块填 #0057b8、一块纯黑，块内文字按对比取黑或白、最小 24px。按钮纯黑填充、白字、零圆角、padding 16px 40px，hover 时硬切到 #ff0000。页面底色 #ffffff。
