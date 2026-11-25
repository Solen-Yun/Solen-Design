# 非对称网格 — 风格参考

> 列宽不相等、元素互相压着：张力来自失衡，而不是来自装饰。

**Theme:** light

非对称网格用不等的列宽制造张力：grid-template-columns 写成 1fr 2fr 0.6fr 这样的比例，元素用 -translate 与 z-index 互相压着，字号层级拉开极大的差距（小到 12px、大到 120px），阴影用硬边偏移强化「物理剥离感」。它的禁令是可操作的质量线——不许所有列宽相等、不许元素整齐对齐毫无变化、不许忽略移动端、不许过度杂乱失去可读性、不许所有元素大小相近。前四条给出张力，后两条防止张力变成噪音。

## Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Ink | `#0f0f0f` | `--color-ink` | 文字、色块与硬阴影。结构的全部重量。 |
| White | `#ffffff` | `--color-white` | 画布。纯白让色块与阴影都更锐利。 |
| Tension Red | `#ff3366` | `--color-tension-red` | 主强调：最大那块色与最粗的那个标题。 |
| Signal Cyan | `#00d4ff` | `--color-signal-cyan` | 第二强调，与红形成冷暖对位。 |
| Alert Yellow | `#ffcc00` | `--color-alert-yellow` | 高亮与标签底，用于让元素从重叠中跳出来。 |
| Rust | `#b45700` | `--color-rust` | 最暗的一支强调，用于压在黄色上的文字。 |

## Typography

### Inter — 全站唯一字体。字号层级必须拉开——12px 与 120px 同时出现在一屏是常态。

- **Substitute:** 'Helvetica Neue', system-ui, sans-serif
- **Weights:** 400, 700, 900
- **Sizes:** 12, 16, 24, 40, 72, 120
- **Line height:** 0.95 (display), 1.05 (headings), 1.55 (body)
- **Letter spacing:** -0.03em on display, 0.06em on uppercase labels

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|---|---|---|---|---|---|---|
| display | — | 900 | 120px | 0.95 | -0.03em | `--text-display` |
| heading-lg | — | 900 | 72px | 1 | -0.03em | `--text-heading-lg` |
| heading | — | 700 | 40px | 1.05 | -0.02em | `--text-heading` |
| subheading | — | 700 | 24px | 1.2 | — | `--text-subheading` |
| body | — | 400 | 16px | 1.55 | — | `--text-body` |
| label | — | 700 | 12px | 1.4 | 0.06em | `--text-label` |

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

- **Page max-width:** 1440px
- **Section gap:** 96px
- **Card padding:** 24px
- **Element gap:** 16px

## Components

### Uneven Grid

**Role:** 不等宽网格（核心结构）

grid-template-columns 用 1fr 2.2fr 0.6fr 或 2fr 1fr 1.4fr 这类比例，绝不出现三等分。12 栏基准、间距 16px，但每行的列组合可以不同。移动端降为单列并取消负位移。

### Overlap Block

**Role:** 重叠色块

一个填色块用 -translate-x-8 与 -translate-y-4 压到相邻元素上，z-index 显式设定（相邻两层差 10）。零圆角，硬阴影 6px 6px 0 墨或红。重叠量控制在 16 到 48px，超过就吃掉内容。

### Contrast Headline

**Role:** 极端对比标题

120px/900、行高 0.95、字距 -0.03em，与其下方的 12px 标签形成 10 倍的尺寸差。允许标题跨越两列并压在其他元素上，但文字必须始终在最上层且保持可读。

### Label Chip

**Role:** 小标签

警示黄填充、墨色文字、零圆角、12px/700、字距 0.06em、padding 4px 10px。它常被压在重叠区的边缘，作为「这块是什么」的说明，与大标题形成尺寸反差。

### Edge Button

**Role:** 行动按钮

张力红填充、白字、零圆角、16px/700、padding 14px 28px，硬阴影 6px 6px 0 墨。hover 时阴影换到信号青；按下时位移 6px 6px 且阴影归零。过渡 120ms linear。

## Do's and Don'ts

### Do

- 列宽必须不相等
- 用负位移与 z-index 做重叠
- 字号层级拉开到 10 倍
- 硬边偏移阴影强化剥离感
- 移动端降单列并取消重叠
- 重叠量控制在 16 到 48px

### Don't

- 不要让列宽完全相等
- 不要让元素整齐对齐毫无变化
- 不要忽略移动端响应式
- 不要杂乱到失去可读性
- 不要让元素大小相近
- 不要让重叠吃掉内容

## Surfaces

| Level | Name | Value | Purpose |
|---|---|---|---|
| 0 | White | `#ffffff` | 画布 |
| 1 | Ink Block | `#0f0f0f` | 深色块 |
| 2 | Red Block | `#ff3366` | 强调块 |

## Elevation

- **Hard offset:** `6px 6px 0 #0f0f0f`
- **Hard offset color:** `6px 6px 0 #ff3366`
- **Pressed:** `none`

## Imagery

图像可以尺寸悬殊：一张横跨三列的巨图配一张 120px 的小图。允许裁切与局部特写。不使用等尺寸网格与整齐对齐的画廊式排列。

## Layout

上限 1440px、容器内边距 24px，区块间距 96px。每行的列组合都要不同，允许负位移与重叠。移动端降为单列、取消重叠、字号层级压缩到 4 倍以内。

## Agent Prompt Guide

### Implementation Contract

- 以用户请求中的页面、用户任务和真实内容为依据，只实施指定范围；标明缺失的业务信息，不编造数据或能力。
- 先检查现有项目、技术栈与组件；沿用项目结构、路由和依赖，复用已有组件，不重建未要求的页面或功能。
- 沿用项目断点，调整窄屏与桌面的网格和留白；保留信息层级，避免意外横向溢出。
- 对本次涉及的交互，处理键盘焦点与减少动态效果；补齐适用的禁用、加载、空内容与错误状态。
- 完成后按项目现有脚本检查，仅报告实际运行的测试与视觉检查，并列出未验证项。

QUICK COLOR REFERENCE:

- text: `#0f0f0f`
- background: `#ffffff`
- red: `#ff3366`
- cyan: `#00d4ff`
- yellow: `#ffcc00`
- ink: `#0f0f0f`

EXAMPLE COMPONENT PROMPTS:

1. 做一个非对称网格版面：grid-template-columns: 1fr 2.2fr 0.6fr、间距 16px、上限 1440px。左侧一块张力红 #ff3366 色块用 translate(-32px,-16px) 压到中间列、z-index 显式设定、零圆角、硬阴影 6px 6px 0 #0f0f0f。标题 120px/900、行高 0.95、字距 -0.03em，跨两列；旁边一个 12px 警示黄小标签形成 10 倍反差。移动端降为单列、取消位移、字号层级压到 4 倍以内。页面底色 #ffffff。
