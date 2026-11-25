# 瑞士国际风格 — 风格参考

> 网格、左对齐、无衬线、三原色——让结构本身成为装饰。

**Theme:** light

瑞士国际风格来自 1950 年代的平面设计：一切对齐到一张严格的网格，文字一律左对齐（从不居中），字体只用无衬线的常规与粗体两档，装饰被彻底删掉，只留下黑、白与三原色（红、蓝、黄）。页面的秩序来自栏线与留白的节奏，而不是卡片边框。交互也保持结构感：hover 时左侧的引导线从灰变红、底色轻微变灰，等于把那条结构线「激活」，而不是加阴影或位移。

## Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Black | `#000000` | `--color-black` | 正文、标题与栏线。瑞士风格允许纯黑，因为它追求印刷级对比。 |
| White | `#ffffff` | `--color-white` | 页面画布，不做任何灰度渐变。 |
| Signal Red | `#ff0000` | `--color-red` | 唯一的强调色：编号、激活线、关键数据。面积控制在一个字符宽。 |
| Ultramarine | `#0057b8` | `--color-blue` | 链接与可点击标记。与红同屏时只出现一种。 |
| Cadmium Yellow | `#ffcc00` | `--color-yellow` | 大面积色块与海报式区块，用于分区而非强调。 |

## Typography

### Helvetica Neue — 全站唯一字体，只用 400 与 700 两档。层级完全由字号与栏宽承担。

- **Substitute:** Inter, Arial, 'Helvetica Neue', sans-serif
- **Weights:** 400, 700
- **Sizes:** 11, 13, 15, 20, 32, 56, 88
- **Line height:** 0.98 (display), 1.05 (headings), 1.5 (body)
- **Letter spacing:** -0.03em on display, 0.08em on uppercase labels

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|---|---|---|---|---|---|---|
| display | — | 700 | 88px | 0.98 | -0.03em | `--text-display` |
| heading-lg | — | 700 | 56px | 1 | -0.02em | `--text-heading-lg` |
| heading | — | 700 | 32px | 1.05 | — | `--text-heading` |
| body-lg | — | 400 | 20px | 1.4 | — | `--text-body-lg` |
| body | — | 400 | 15px | 1.5 | — | `--text-body` |
| label | — | 700 | 11px | 1.3 | 0.08em | `--text-label` |

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
| inputs | 0 |

- **Page max-width:** 1200px
- **Section gap:** 96px
- **Card padding:** 24px
- **Element gap:** 16px

## Components

### Structural List Row

**Role:** 列表、目录与索引行

无背景、无圆角、无阴影。左侧 2px 竖线默认 #d4d4d4，行高 64px，内边距左 16px。编号用 11px/700、0.08em 字距、红色。标题 20px/700 左对齐。hover 时左侧竖线变红、背景变 #f0f0f0，过渡 200ms；不做位移。

- **States:** hover: rule grey to red, ground #f0f0f0

### Section Label

**Role:** 栏目编号与分类标签

11px、700 字重、0.08em 字距、全大写。编号与标题之间用一条 24px 的黑色短线连接。不接受胶囊形状与圆角。

### Inline Button

**Role:** 行动按钮与链接按钮

无填充、无描边、无圆角，左对齐，文字 13px/700 全大写 0.08em，下方一条 2px 黑线。hover 时线变红、文字保持黑色，200ms；按下时线加粗到 3px，不做其他变化。

### Color Field

**Role:** 分区色块与海报区

整块填充红、蓝或黄，无圆角、无阴影、无渐变。块内文字一律白色或黑色（按对比度选），字号至少 32px/700，左对齐并贴齐色块内边距 48px。色块在一屏内不超过一块。

## Do's and Don'ts

### Do

- 一切左对齐，永不居中
- 只用 400 与 700 两档字重
- 红作为唯一强调，控制在一个字符宽
- 分隔用 1px 或 2px 黑线，不用卡片框
- hover 激活结构线，不加阴影与位移
- 字号跨度大：11px 到 88px

### Don't

- 不要用圆角
- 不要用阴影与渐变
- 不要居中排版
- 不要让红与蓝同时作为强调
- 不要用超过两档字重
- 不要用卡片包裹内容

## Surfaces

| Level | Name | Value | Purpose |
|---|---|---|---|
| 0 | White | `#ffffff` | 页面画布 |
| 1 | Black Block | `#000000` | 反色区块与栏线 |
| 2 | Yellow Block | `#ffcc00` | 分区色块 |

## Elevation

- **None:** `none`

## Imagery

黑白摄影、几何构图、大字号排版本身即是图像。允许整版单色块。不使用彩色摄影、插画、图标墙与任何柔和过渡。

## Layout

12 栏、上限 1200px、栏间距 24px。所有内容左对齐、贴齐栏线，标题可跨 8 栏以上。区块间距 96px，允许一条 1px 黑线贯穿整宽作为分隔。页面拒绝居中排版与卡片容器。

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
- accent: `#ff0000`
- link: `#0057b8`
- block: `#ffcc00`
- rule: `#d4d4d4`

EXAMPLE COMPONENT PROMPTS:

1. 做一个瑞士风格索引列表：每行无背景、无圆角、高 64px、左侧 2px #d4d4d4 竖线、内边距左 16px。行内左边 11px/700 红色编号（0.08em 字距），右边 20px/700 黑色标题，全部左对齐。hover 时左侧竖线变 #ff0000、背景变 #f0f0f0，transition 200ms，不加位移与阴影。
