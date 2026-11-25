# 像素艺术风 — 风格参考

> 没有过渡的世界：所有状态变化都是硬切，像 8-bit 游戏机。

**Theme:** light

像素艺术风的美学来自硬件限制：只有几种颜色、没有抗锯齿、没有过渡。落到网页上就是三条硬规则——零圆角、4px 纯黑边框、4px 零模糊的偏移阴影。最关键的一条是 transition-none：像素游戏是状态机而不是动画引擎，hover 与按下必须是瞬间完成，任何淡入淡出都会毁掉这个错觉。交互语义也照搬游戏：hover 直接把调色板里的某一个颜色换成另一个（红的按钮变蓝），按下时元素位移 4px 且阴影归零，像按钮被真正按到底。

## Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Deep Indigo | `#1a1c2c` | `--color-deep-indigo` | 所有边框、阴影、深色区块与正文。8-bit 调色板里最暗的一档。 |
| Paper | `#ffffff` | `--color-paper` | 面板填充。只与深靛配对，不做灰度过渡。 |
| Pixel Red | `#ff004d` | `--color-pixel-red` | 主行动与危险动作。hover 时会被换成像素蓝。 |
| Pixel Green | `#00e436` | `--color-pixel-green` | 成功与生命值，游戏语义里的正向状态。 |
| Pixel Blue | `#29adff` | `--color-pixel-blue` | 链接、选中态与 hover 替换色。 |
| Pixel Yellow | `#ffec27` | `--color-pixel-yellow` | 金币、得分与高亮，用于需要立刻被看到的小元素。 |

## Typography

### Press Start 2P — 标题与按钮用像素字体，全大写；正文用等宽字体保持可读。字距必须偏宽，否则像素会粘在一起。

- **Substitute:** 'Courier New', ui-monospace, monospace
- **Weights:** 400
- **Sizes:** 10, 12, 16, 24, 32
- **Line height:** 1.2 (display), 1.3 (headings), 1.7 (body)
- **Letter spacing:** 0.05em on display, 0.12em on uppercase labels

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|---|---|---|---|---|---|---|
| display | — | 400 | 32px | 1.2 | 0.05em | `--text-display` |
| heading | — | 400 | 24px | 1.3 | 0.05em | `--text-heading` |
| body-lg | — | 400 | 16px | 1.7 | — | `--text-body-lg` |
| body | — | 400 | 12px | 1.7 | — | `--text-body` |
| label | — | 400 | 10px | 1.4 | 0.12em | `--text-label` |

## Spacing & Layout

**Base unit:** 4px
**Density:** compact

### Spacing Scale

| Name | Value | Token |
|---|---|---|
| 4 | 4px | `--spacing-4` |
| 8 | 8px | `--spacing-8` |
| 12 | 12px | `--spacing-12` |
| 16 | 16px | `--spacing-16` |
| 24 | 24px | `--spacing-24` |
| 32 | 32px | `--spacing-32` |
| 48 | 48px | `--spacing-48` |
| 64 | 64px | `--spacing-64` |

### Border Radius

| Element | Value |
|---|---|
| cards | 0 |
| buttons | 0 |
| inputs | 0 |

- **Page max-width:** 1024px
- **Section gap:** 64px
- **Card padding:** 24px
- **Element gap:** 16px

## Components

### Pixel Button

**Role:** 主行动按钮

像素红填充、纸白字、4px 深靛边框、零圆角、4px 硬偏移阴影。字级 12px、全大写、字距 0.12em、padding 12px 24px。hover 时填充硬切到像素蓝、阴影硬切到像素红；按下时位移 4px 4px 且阴影归零。全程 transition-none。

- **Sizes:** padding 12px 24px; label 12px
- **States:** hover: palette swap, no fade; active: translate 4px, shadow none

### Pixel Card

**Role:** 内容卡与关卡卡片

纸白填充、4px 深靛边框、零圆角、内边距 24px、4px 硬阴影。标题 24px 全大写，正文 12px 等宽。hover 时边框与阴影硬切到像素红、标题文字同步变红，元素本身不位移。

### Pixel Input

**Role:** 输入框

纸白填充、4px 深靛边框、零圆角、padding 12px 16px、12px 等宽全大写。占位符用深靛 50%。聚焦时用 2px 像素蓝的内描边（inset 0 0 0 2px），不改外框尺寸。

### Pixel Nav

**Role:** 顶部导航

深靛填充、底部 4px 像素红边框、白字全大写、字距 0.05em。链接 12px，hover 直接换成纸白（硬切），选中项用像素黄。高度 56px，无圆角无阴影。

## Do's and Don'ts

### Do

- 零圆角、4px 边框、4px 硬阴影
- 全程 transition-none，状态硬切
- hover 做调色板替换，不做淡入
- 按下位移等于阴影偏移量
- 字号取 8-bit 值：10、12、16、24、32
- 所有尺寸是 4 的倍数

### Don't

- 不要用任何圆角
- 不要用渐变或柔和阴影
- 不要用 transition-* 除 none
- 不要用细边框
- 不要在 hover 里做 opacity 过渡
- 不要用超出调色板的颜色

## Surfaces

| Level | Name | Value | Purpose |
|---|---|---|---|
| 0 | Paper | `#ffffff` | 面板与卡片 |
| 1 | Deep Indigo | `#1a1c2c` | 深色区块与导航 |

## Elevation

- **Hard offset:** `4px 4px 0 #1a1c2c`
- **Hover offset:** `4px 4px 0 #ff004d`
- **Pressed:** `none`

## Imagery

像素画与 8-bit 图标是唯一图像语言。允许把照片降采样成像素图。不使用矢量插画、柔和摄影与任何抗锯齿图形。

## Layout

上限 1024px、容器内边距 24px，区块间距 64px。所有尺寸取 4 的倍数，元素按 4px 网格对齐。允许用点阵棋盘格作为区块背景，但面积不超过一屏的 30%。

## Agent Prompt Guide

### Implementation Contract

- 以用户请求中的页面、用户任务和真实内容为依据，只实施指定范围；标明缺失的业务信息，不编造数据或能力。
- 先检查现有项目、技术栈与组件；沿用项目结构、路由和依赖，复用已有组件，不重建未要求的页面或功能。
- 沿用项目断点，调整窄屏与桌面的网格和留白；保留信息层级，避免意外横向溢出。
- 对本次涉及的交互，处理键盘焦点与减少动态效果；补齐适用的禁用、加载、空内容与错误状态。
- 完成后按项目现有脚本检查，仅报告实际运行的测试与视觉检查，并列出未验证项。

QUICK COLOR REFERENCE:

- text: `#1a1c2c`
- background: `#ffffff`
- red: `#ff004d`
- green: `#00e436`
- blue: `#29adff`
- yellow: `#ffec27`

EXAMPLE COMPONENT PROMPTS:

1. 做一个像素风按钮：背景 #ff004d、白字、4px solid #1a1c2c 边框、border-radius 0、box-shadow 4px 4px 0 #1a1c2c、12px 全大写 0.12em 字距、padding 12px 24px、transition: none。hover 时背景硬切到 #29adff、阴影硬切到 #ff004d；active 时 transform: translate(4px, 4px)、box-shadow 设为 none。
