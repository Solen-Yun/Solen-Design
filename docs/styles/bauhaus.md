# 包豪斯风格 — 风格参考

> 形式追随功能：圆、方、三角与三原色，其余一律删掉。

**Theme:** light

包豪斯是一套功能主义的设计纪律，不是一种装饰。它的规则极简到近乎苛刻：只用基本几何（圆、方、三角）、只用三原色加黑白、不用阴影、不用渐变、不用装饰性插图。层次通过尺度与色块面积建立，文字主导版面且一律左对齐。与几何大胆风的区别在于克制——包豪斯不允许为了动势而旋转与重叠，每个元素都必须有功能位置。

## Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Black | `#000000` | `--color-black` | 文字、描边与最深色块。功能主义需要绝对的对比。 |
| White | `#ffffff` | `--color-white` | 画布与反白文字。不做灰阶过渡。 |
| Red | `#ff0000` | `--color-red` | 警示与主强调。全屏面积不超过 20%。 |
| Yellow | `#ffcc00` | `--color-yellow` | 高亮与区块底色，用于承载深色文字。 |
| Blue | `#0000ff` | `--color-blue` | 链接与信息区块，是三原色里最冷静的一支。 |

## Typography

### Futura — 全站唯一字体，几何无衬线，只用 400 与 700。标题左对齐、字距收紧；标签全大写、字距放开。

- **Substitute:** 'Jost', 'Century Gothic', 'Helvetica Neue', sans-serif
- **Weights:** 400, 700
- **Sizes:** 12, 14, 18, 28, 48, 72
- **Line height:** 1 (display), 1.1 (headings), 1.55 (body)
- **Letter spacing:** -0.02em on display, 0.14em on uppercase labels

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|---|---|---|---|---|---|---|
| display | — | 700 | 72px | 1 | -0.02em | `--text-display` |
| heading-lg | — | 700 | 48px | 1.05 | -0.02em | `--text-heading-lg` |
| heading | — | 700 | 28px | 1.1 | — | `--text-heading` |
| body-lg | — | 400 | 18px | 1.5 | — | `--text-body-lg` |
| body | — | 400 | 14px | 1.55 | — | `--text-body` |
| label | — | 700 | 12px | 1.4 | 0.14em | `--text-label` |

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
| shapes | 999px |

- **Page max-width:** 1200px
- **Section gap:** 96px
- **Card padding:** 24px
- **Element gap:** 24px

## Components

### Function Button

**Role:** 行动按钮

纯黑填充、白字、零圆角、无阴影、无描边。14px/700、全大写、0.14em 字距、padding 14px 28px。hover 时填充换成红并保持白字；按下时整体位移到 1px 描边状态（无位移动画）。过渡 120ms。

- **Sizes:** padding 14px 28px; label 14px
- **States:** hover: red fill; active: 1px border, black fill

### Primary Block

**Role:** 色块分区与信息卡

整块填三原色之一（红、黄、蓝），零圆角、无描边、无阴影，内边距 32px。块内文字用黑或白按对比度选择，字号至少 18px。一个区块只用一种颜色，禁止在同一块内混两种。

### Geometric Frame

**Role:** 图片与内容框架

容器零圆角、1px 黑描边（或无描边），内部图像可为圆形或半圆裁切。允许在区块角落放一个 96px 到 160px 的实心圆或三角作为构图元素，但不得遮挡文字。

### Type Stack

**Role:** 标题与正文排版组

一律左对齐，标题 48 到 72px 加 0.14em 字距的全大写标签置于其上，两者间距 16px。正文单栏、行长不超过 70 字符。禁止居中与右对齐。

## Do's and Don'ts

### Do

- 只用圆、方、三角三种形状
- 只用三原色加黑白
- 一切左对齐
- 零圆角、零阴影、零渐变
- 层次靠字号与色块面积
- 标签 12px 全大写 0.14em

### Don't

- 不要旋转或重叠元素
- 不要用渐变与阴影
- 不要混用两套圆角
- 不要引入三原色之外的颜色
- 不要用装饰性插画
- 不要居中排版

## Surfaces

| Level | Name | Value | Purpose |
|---|---|---|---|
| 0 | White | `#ffffff` | 画布 |
| 1 | Primary Block | `#ffcc00` | 色块分区 |
| 2 | Black Block | `#000000` | 深色分区与页脚 |

## Elevation

- **None:** `none`

## Imagery

几何构成与黑白摄影。允许把照片裁成圆形或半圆嵌入色块。不使用彩色摄影、装饰插画与任何非基本几何的形状。

## Layout

上限 1200px、12 栏、24px 间距。区块间距 96px，色块可跨 4 到 6 栏。所有内容贴齐栏线左边缘，标题可跨 8 栏。禁止重叠与旋转。

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
- yellow: `#ffcc00`
- blue: `#0000ff`
- border: `#000000`

EXAMPLE COMPONENT PROMPTS:

1. 做一个包豪斯风格区块：白色画布，左侧放一块占 6 栏的黄色实心色块（零圆角、无阴影、内边距 32px），块内黑字 28px/700 左对齐，上方 12px 全大写 0.14em 标签。右侧 6 栏放黑白摄影，裁成圆形。整体对齐 12 栏网格、24px 间距，区块间距 96px。
