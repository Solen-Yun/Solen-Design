# 网页粗野主义 — 风格参考

> 回到 1993 年的 HTML：系统字体、蓝下划线链接、纯白底、零装饰。

**Theme:** light

网页粗野主义不是「难看」，而是拒绝被设计：纯白底（#ffffff）、系统字体栈（无衬线正文配 Times New Roman 标题）、蓝色 #0000ff 下划线链接作为唯一交互语言、1px 实线边框做结构、零圆角、零阴影、零渐变与背景图、间距压到最小。它的价值判断是内容优先于形式——任何为了好看而增加的东西都被视为负担。这也是它与新野兽派的区别：新野兽派靠粗边与硬阴影造风格，网页粗野主义连风格都不要。

## Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Black | `#000000` | `--color-black` | 正文与标题。纯黑，不做灰度修饰。 |
| White | `#ffffff` | `--color-white` | 所有区块的底。纯白，绝不用米色或灰白。 |
| Link Blue | `#0000ff` | `--color-link-blue` | 唯一的主交互色。未访问链接用它，访问后转 #551a8b。 |
| Red | `#ff0000` | `--color-red` | 警告与错误，浏览器默认语义。 |
| Green | `#008000` | `--color-green` | 成功与「OK」，同样来自浏览器默认。 |
| Magenta | `#d60099` | `--color-magenta` | 已访问链接的变体与特殊标记，出现频率极低。 |

## Typography

### Times New Roman — 标题用衬线，浏览器默认字体。不加字距、不做字重处理，因为 1993 年没有这些。

- **Substitute:** 'Songti SC', Georgia, serif
- **Weights:** 400, 700
- **Sizes:** 16, 20, 24, 32, 40
- **Line height:** 1.2 (display), 1.3 (headings), 1.5 (body)
- **Letter spacing:** 0 on display, 0 on uppercase labels

### system-ui — 正文用系统无衬线栈或等宽。默认、无修饰、随系统变化。

- **Substitute:** 'Segoe UI', Arial, Helvetica, sans-serif
- **Weights:** 400, 700
- **Sizes:** 14, 16, 18
- **Line height:** 1.4 (display), 1.4 (headings), 1.5 (body)
- **Letter spacing:** 0 on display, 0 on uppercase labels

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|---|---|---|---|---|---|---|
| display | Times New Roman | 700 | 40px | 1.15 | — | `--text-display` |
| heading | Times New Roman | 700 | 32px | 1.2 | — | `--text-heading` |
| subheading | Times New Roman | 700 | 24px | 1.3 | — | `--text-subheading` |
| body-lg | system-ui | 400 | 18px | 1.5 | — | `--text-body-lg` |
| body | system-ui | 400 | 16px | 1.5 | — | `--text-body` |
| label | system-ui | 400 | 14px | 1.4 | — | `--text-label` |

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

### Border Radius

| Element | Value |
|---|---|
| cards | 0 |
| buttons | 0 |
| inputs | 0 |

- **Page max-width:** 720px
- **Section gap:** 24px
- **Card padding:** 12px
- **Element gap:** 8px

## Components

### Bare Link

**Role:** 链接（唯一交互语言）

内联文本、色 #0000ff、带下划线（text-decoration: underline）、无背景无边框无过渡。hover 时保持同样样式（浏览器默认行为即可），不加上划线、不改透明、不做位移。已访问转 #551a8b。

### Bare Button

**Role:** 提交按钮

浏览器默认按钮外观（或 1px 实线黑边加白底）、零圆角、14px 系统字体、padding 4px 12px。不加悬停动画、不加阴影。它的「朴素」是刻意的。

- **States:** hover: no change; active: default pressed state only

### Rule Block

**Role:** 1px 边框分区

用 1px 实线黑边（#000000 或 50% 灰）画出区块边界，内边距 12px。整页可以有多层嵌套边框，像早期 HTML 的 table 布局。绝不用阴影或底色分区。

### Default List

**Role:** 列表与表格

使用浏览器默认的 ul / ol 缩进与项目符号，表格用 1px 实线边框（border-collapse: collapse）、单元格 padding 4px 8px、无斑马纹无圆角。

### Dense Text Column

**Role:** 正文栏

最大宽度 720px、行高 1.5（不放大）、段间距 12px、段首不缩进。左对齐，不使用首字下沉或任何排版装饰。密度接近纯文本文件。

## Do's and Don'ts

### Do

- 纯白底，不用米色或灰白
- 系统字体栈，不做字体设计
- 蓝下划线链接作为主交互
- 1px 实线边框分区
- 零圆角、零阴影、零渐变
- 间距压到最小

### Don't

- 不要用任何圆角
- 不要用投影或文字阴影
- 不要用渐变或背景图
- 不要给链接加过渡动画
- 不要用装饰性字体
- 不要为了好看而加元素

## Surfaces

| Level | Name | Value | Purpose |
|---|---|---|---|
| 0 | White | `#ffffff` | 所有区块 |
| 1 | Nothing | `none` | 没有第二层 |

## Elevation

- **None:** `none — shadows are forbidden`

## Imagery

几乎不用图像。允许未优化的原生图片（不做圆角、不加遮罩、不加滤镜），alt 文字必须完整。不使用装饰插画、全幅背景图与任何经过艺术处理的图像。

## Layout

上限 720px、容器内边距 16px，区块间距 24px。单栏、紧排、不用网格系统。元素之间用 1px 边框分隔而不是留白。整页读起来应该像一个排版良好的纯文本文件。

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
- link: `#0000ff`
- red: `#ff0000`
- green: `#008000`
- visited: `#551a8b`

EXAMPLE COMPONENT PROMPTS:

1. 做一个网页粗野主义的文档页：纯白底 #ffffff、正文 16px 系统无衬线栈、行高 1.5、最大宽度 720px、左对齐、段间距 12px。标题用 Times New Roman 700、32px 与 24px。链接色 #0000ff 带下划线、无过渡、无 hover 变化。区块之间用 1px solid #000 边框分隔，内边距 12px。圆角 0、阴影无、渐变无。
