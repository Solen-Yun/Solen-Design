# 几何大胆风 — 风格参考

> 巨大的圆、方块与三角在版面上相撞，字体大得像海报。

**Theme:** light

几何大胆风把版式当成海报：字大到 160px、色块纯到红蓝黄、形状只有圆、方、三角三种，而且必须互相重叠。所有元素绝对定位，允许旋转 6 到 12 度制造动势。圆角只有两个合法值——完全直角或完全圆，没有中间态。它的难度在秩序：形状再多也必须落在一条隐形网格上，色块面积必须有明显的主次（最大的一块不超过屏幕 40%）。

## Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Black | `#000000` | `--color-black` | 主文字、最大色块与形状描边。海报需要最极端的对比。 |
| White | `#ffffff` | `--color-white` | 画布与反白文字。与黑成对，不做灰度中间层。 |
| Red | `#ff0000` | `--color-red` | 主强调与焦点形状。全屏面积不超过 25%。 |
| Blue | `#0000ff` | `--color-blue` | 第二色块，用于与红形成对位，面积小于红。 |
| Yellow | `#ffff00` | `--color-yellow` | 高亮点缀，用于标签与小型形状，面积最小。 |
| Ochre | `#6c3b00` | `--color-ochre` | 唯一的暗暖色，用于需要压在黄色上的文字。 |

## Typography

### Inter — 全站唯一字体，只用 700 与 900 两档。海报字的行高压到 0.88，让字块成为形状。

- **Substitute:** Helvetica Neue, Arial, sans-serif
- **Weights:** 700, 900
- **Sizes:** 14, 18, 24, 40, 80, 160
- **Line height:** 0.88 (display), 0.95 (headings), 1.5 (body)
- **Letter spacing:** -0.045em on display, 0.1em on uppercase labels

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|---|---|---|---|---|---|---|
| display | — | 900 | 160px | 0.88 | -0.045em | `--text-display` |
| heading-lg | — | 900 | 80px | 0.92 | -0.035em | `--text-heading-lg` |
| heading | — | 700 | 40px | 0.98 | -0.02em | `--text-heading` |
| subheading | — | 700 | 24px | 1.1 | — | `--text-subheading` |
| body | — | 700 | 18px | 1.5 | — | `--text-body` |
| label | — | 700 | 14px | 1.3 | 0.1em | `--text-label` |

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
| 192 | 192px | `--spacing-192` |

### Border Radius

| Element | Value |
|---|---|
| cards | 0 |
| buttons | 0 |
| shapes | 999px |

- **Page max-width:** 1440px
- **Section gap:** 192px
- **Card padding:** 32px
- **Element gap:** 24px

## Components

### Shape Block

**Role:** 几何形状与色块

只用圆、正方、等腰三角三种。填纯色（黑、红、蓝、黄之一），无描边无阴影，允许与其它形状重叠 20% 到 40%。可旋转 6 到 12 度。同一屏内最多四种形状，其中一种面积必须明显更大。

- **States:** hover: rotate an extra 3deg, no scale

### Poster Headline

**Role:** 主标题字块

160px、900 字重、行高 0.88、字距 -0.045em，行宽由内容决定而非容器。允许三行堆叠并与形状重叠，但文字必须始终在最上层且与背景保持至少 7:1 对比。可整体旋转 -2 到 2 度。

### Block Button

**Role:** 行动按钮

纯黑或纯红填充、白字、直角、无阴影。14px/700、0.1em 字距、padding 16px 32px、2px 描边（与填充同色）。hover 时填充与文字互换；按下时整体向右下偏移 4px 并保持无阴影。过渡 120ms。

- **States:** hover: inverted; active: offset 4px

### Grid Scaffold

**Role:** 隐形网格

12 栏、24px 间距、内容上限 1440px。所有形状与文字块必须贴齐栏线或其中点，重叠允许但落点必须在网格上。允许一条 1px 的辅助线贯穿整页，但只在设计稿中显示。

## Do's and Don'ts

### Do

- 只用圆、方、三角三种形状
- 圆角只有 0 或全圆两个值
- 标题 160px、行高 0.88
- 形状允许重叠 20% 到 40%
- 所有元素贴齐 12 栏网格
- 最大色块不超过屏幕 40%

### Don't

- 不要用中间圆角
- 不要用渐变与柔和阴影
- 不要把文字放在形状下面
- 不要用超过四种形状
- 不要让三个色块面积相等
- 不要用写实插画或摄影做主视觉

## Surfaces

| Level | Name | Value | Purpose |
|---|---|---|---|
| 0 | White | `#ffffff` | 画布 |
| 1 | Black Block | `#000000` | 主形状与反色区块 |
| 2 | Color Block | `#ff0000` | 强调形状 |

## Elevation

- **None:** `none — shapes stack by overlap, not shadow`

## Imagery

几何图形本身即是图像，不用摄影。允许将照片处理成纯色双色调后作为形状填充。不使用渐变、柔和阴影与写实插画。

## Layout

上限 1440px、12 栏、24px 间距。区块间距 192px，形状允许溢出容器边缘。首屏常见为巨型标题压在两个重叠形状上。整页滚动平滑，不做视差。

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
- blue: `#0000ff`
- yellow: `#ffff00`
- ochre: `#6c3b00`

EXAMPLE COMPONENT PROMPTS:

1. 做一个几何大胆风首屏：白底、12 栏网格。左上放一个占屏 35% 的黑色圆（无描边无阴影），右下放一个 20% 的红色正方，两者重叠 25%。标题 160px/900、行高 0.88、字距 -0.045em、纯黑，压在两个形状之上。下面一个纯黑直角按钮（14px/700、0.1em 字距、padding 16px 32px），hover 时黑白反转。
