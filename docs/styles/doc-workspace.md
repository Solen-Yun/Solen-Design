# 文档工作台风 — 风格参考

> 米色纸面上的一篇文档，界面退到看不见，只剩内容。

**Theme:** light

文档工作台风是为长时间阅读与写作服务的界面。它用一层米色纸面（#f7f6f3）代替纯白，把文字压到柔和的墨黑（#37352f），所有分隔只用极浅的 1px 线。交互的信噪比被刻意压到最低：hover 只让背景从 #f7f6f3 变到 #efedea，150ms 内完成，没有位移、没有缩放、没有阴影跳变——因为任何漂浮感都会破坏阅读的稳定。标志性的细节是拖拽手柄：hover 时从透明变为可见，提示「这块可以移动」，除此之外不加任何装饰。

## Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Ink | `#37352f` | `--color-ink` | 正文、标题与图标。这套风格的墨色偏暖，纯黑会让纸面显得脏。 |
| Paper | `#f7f6f3` | `--color-paper` | 页面画布。整站默认背景，也是 hover 前后的基准色。 |
| Hover Grey | `#efedea` | `--color-hover-grey` | hover 与选中底色。只比纸面暗一点，做到「能感觉到但不打扰」。 |
| Hairline | `#e9e7e4` | `--color-hairline` | 表格线、分隔线与输入框描边。永远 1px，永远这么浅。 |
| Link Blue | `#2eaadc` | `--color-link-blue` | 链接与可点击引用。是整套系统里唯一明确跳出来的颜色。 |
| Marker Red | `#eb5757` | `--color-marker-red` | 删除与错误提示。出现即表示内容有风险。 |

## Typography

### ui-sans-serif — 全站唯一字体。系统栈优先，因为文档工具最重要的指标是渲染稳定。

- **Substitute:** Inter, -apple-system, 'Segoe UI', 'PingFang SC', sans-serif
- **Weights:** 400, 500, 600
- **Sizes:** 12, 14, 16, 20, 24, 32
- **Line height:** 1.2 (display), 1.3 (headings), 1.6 (body)
- **Letter spacing:** -0.01em on display, 0.02em on uppercase labels

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|---|---|---|---|---|---|---|
| display | — | 600 | 32px | 1.2 | -0.01em | `--text-display` |
| heading | — | 600 | 24px | 1.3 | — | `--text-heading` |
| subheading | — | 500 | 20px | 1.4 | — | `--text-subheading` |
| body-lg | — | 400 | 16px | 1.6 | — | `--text-body-lg` |
| body | — | 400 | 14px | 1.6 | — | `--text-body` |
| label | — | 500 | 12px | 1.4 | 0.02em | `--text-label` |

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
| 96 | 96px | `--spacing-96` |

### Border Radius

| Element | Value |
|---|---|
| cards | 4px |
| buttons | 4px |
| inputs | 4px |
| pills | 999px |

- **Page max-width:** 708px
- **Section gap:** 48px
- **Card padding:** 16px
- **Element gap:** 8px

## Components

### Block Row

**Role:** 文档块、页面树与设置项

透明底、无边框、4px 圆角、padding 4px 8px、行高 1.6、14px 字。hover 时背景变 #efedea，150ms 颜色过渡，不做任何位移。左侧拖拽手柄宽 16px，默认透明，hover 与聚焦时可见。

- **States:** hover: ground #efedea; handle: transparent to visible

### Ghost Button

**Role:** 工具栏按钮与次级行动

透明底、无描边、4px 圆角、13px/500 字、padding 4px 8px、图标 16px 线性、与文字间距 6px。hover 背景 #efedea，按下 #e3e1db。禁止上浮与缩放，只变颜色，150ms。

- **States:** hover: #efedea; active: #e3e1db

### Inline Input

**Role:** 行内编辑与搜索

透明底、无描边、padding 4px 8px、正文同字号。聚焦时只加一层 1px #e9e7e4 的底边线，不加外环、不改背景。占位符用 60% 墨色。

- **States:** focus: 1px bottom rule only

### Callout Block

**Role:** 提示、引用与说明块

浅灰底（#efedea）、4px 圆角、padding 12px 16px、左侧留 8px 图标位。文字 14px/1.6。允许一种柔和强调底色（蓝、黄、红任选其一），但同一页面只用一种。

## Do's and Don'ts

### Do

- 用米纸 #f7f6f3 做画布，正文墨色 #37352f
- hover 只变背景色，150ms，无位移无缩放
- 拖拽手柄 hover 时从透明变可见
- 分隔线一律 1px #e9e7e4
- 正文宽度 708px 上限，行长不超过 80 字符
- 圆角不超过 4px，除胶囊标签外

### Don't

- 不要用渐变背景
- 不要用重阴影，除弹层外一律无阴影
- 不要用任何 translate 或 scale 动画
- 不要用 hover 边框或阴影跳变
- 不要用 8px 以上的圆角
- 不要给按钮加上浮效果，文档没有漂浮感

## Surfaces

| Level | Name | Value | Purpose |
|---|---|---|---|
| 0 | Paper | `#f7f6f3` | 页面画布 |
| 1 | White Page | `#ffffff` | 文档正文与弹层 |
| 2 | Hover Grey | `#efedea` | hover 与选中行 |

## Elevation

- **None:** `none`
- **Popover:** `0 8px 24px rgba(15,15,15,0.12)`

## Imagery

几乎不用装饰性图像。允许内容截图、图表与嵌入的媒体块，且必须与文档同宽、直角或 4px 圆角。不使用背景图、插画与图标墙，它们会把纸面变成海报。

## Layout

单栏、正文宽度 708px 上限、左右内边距 24px 到 96px。区块间距 48px，块内元素间距 8px。所有内容左对齐，标题不居中。允许侧边栏 240px 与正文并列，但正文宽度不随之缩小。

## Agent Prompt Guide

### Implementation Contract

- 以用户请求中的页面、用户任务和真实内容为依据，只实施指定范围；标明缺失的业务信息，不编造数据或能力。
- 先检查现有项目、技术栈与组件；沿用项目结构、路由和依赖，复用已有组件，不重建未要求的页面或功能。
- 沿用项目断点，调整窄屏与桌面的网格和留白；保留信息层级，避免意外横向溢出。
- 对本次涉及的交互，处理键盘焦点与减少动态效果；补齐适用的禁用、加载、空内容与错误状态。
- 完成后按项目现有脚本检查，仅报告实际运行的测试与视觉检查，并列出未验证项。

QUICK COLOR REFERENCE:

- text: `#37352f`
- background: `#f7f6f3`
- page: `#ffffff`
- hover: `#efedea`
- border: `#e9e7e4`
- link: `#2eaadc`

EXAMPLE COMPONENT PROMPTS:

1. 做一个文档块列表：每行透明底、4px 圆角、padding 4px 8px、14px 字、行高 1.6。hover 时背景变 #efedea，transition-colors 150ms，不加位移与阴影。行左侧放一个 16px 宽的拖拽手柄（默认透明，hover 时可见）。页面底色 #f7f6f3，正文色 #37352f。
