# 论文排版风 — 风格参考

> Computer Modern 的比例、编号的层级、三线表的克制：一张纸。

**Theme:** light

论文排版风把学术排版系统的语汇搬到网页：全文衬线并收紧字距以模拟经典数学衬线体，标题用 1 与 1.1 的层级编号，摘要用两侧缩进的窄块加居中小标题，定理用浅底或 2px 左线加粗体标签配斜体正文，表格用学术三线表（上下粗线加表头细线，绝无竖线与斑马纹），链接统一论文链接蓝。它禁止彩色大按钮、渐变、无衬线正文、圆角、阴影与装饰图形——纸是平的，层次只靠横线与留白。

## Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Ink | `#111111` | `--color-ink` | 正文、标题、三线表的粗线。印刷黑。 |
| White | `#ffffff` | `--color-white` | 纸面。纯白，不泛黄。 |
| Hyperref Blue | `#0b5394` | `--color-hyperref-blue` | 链接与交叉引用，是唯一允许出现的彩色。 |
| Theorem Ground | `#f5f5f0` | `--color-theorem-ground` | 定理环境与代码块的浅底。 |
| Muted Grey | `#6b6b66` | `--color-muted-grey` | 图注、元数据与参考文献的补充信息。 |
| Rule Grey | `#d4d4d0` | `--color-rule-grey` | 表头细线与极次级分隔。 |

## Typography

### Latin Modern Roman — 全文衬线，标题加紧字距模拟 Computer Modern。正文行高 1.55，比常规论文略松以适应屏幕。

- **Substitute:** 'Computer Modern', 'Source Serif', Georgia, serif
- **Weights:** 400, 700
- **Sizes:** 12, 14, 17, 20, 26, 34
- **Line height:** 1.2 (display), 1.3 (headings), 1.55 (body)
- **Letter spacing:** -0.01em on display, 0.04em on uppercase labels

### Latin Modern Mono — 代码、公式编号与算法块。等宽只在代码处出现，正文绝不使用。

- **Substitute:** ui-monospace, 'Courier New', monospace
- **Weights:** 400
- **Sizes:** 12, 13
- **Line height:** 1.4 (display), 1.4 (headings), 1.5 (body)
- **Letter spacing:** 0 on display, 0.04em on uppercase labels

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|---|---|---|---|---|---|---|
| display | Latin Modern Roman | 700 | 34px | 1.2 | -0.01em | `--text-display` |
| heading | Latin Modern Roman | 700 | 26px | 1.25 | — | `--text-heading` |
| subheading | Latin Modern Roman | 700 | 20px | 1.3 | — | `--text-subheading` |
| body-lg | Latin Modern Roman | 400 | 17px | 1.55 | — | `--text-body-lg` |
| body | Latin Modern Roman | 400 | 14px | 1.55 | — | `--text-body` |
| label | Latin Modern Roman | 700 | 12px | 1.4 | 0.04em | `--text-label` |

## Spacing & Layout

**Base unit:** 4px
**Density:** comfortable

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

- **Page max-width:** 700px
- **Section gap:** 48px
- **Card padding:** 16px
- **Element gap:** 12px

## Components

### Numbered Section

**Role:** 带编号的小节标题

格式为「1 引言」「1.1 背景」，编号与标题之间用 12px 空隙（不用制表符）。一级 26px/700，二级 20px/700，均为衬线并紧字距。编号不缩进，标题与编号左对齐。

### Theorem Block

**Role:** 定理环境

浅底 #f5f5f0（或白底配 2px 墨色左线）、零圆角、内边距 12px 16px，无阴影。标签用 12px/700 正体（如「定理 1」），正文用 14px 斜体衬线、行高 1.55，标签与正文之间一个空格。

### Booktabs Table

**Role:** 三线表

顶部 2px 墨线、表头下 1px 墨线（或 #d4d4d0）、底部 2px 墨线，单元格 padding 4px 12px、14px 衬线，数值列右对齐。绝不允许竖线与斑马纹。表题在表上方，格式为「表 1：」。

### Abstract Block

**Role:** 摘要

最大宽度 36rem、左右各 32px 内边距、居中放置。上方一个 12px/700 居中小标题「摘要」，正文 14px 衬线、行高 1.6、两端对齐（text-align: justify）。

### Reference Entry

**Role:** 参考文献条目

14px 衬线、行高 1.5、悬挂缩进（padding-left: 1.5em 配 text-indent: -1.5em），条目编号用 [1] 方括号。条目之间 8px。作者与年份不加粗，保持平铺。

## Do's and Don'ts

### Do

- 全文衬线，标题紧字距
- 小节用 1 与 1.1 编号
- 表格用 booktabs 三线
- 链接统一 hyperref 蓝
- 定理用浅底或左线
- 零圆角、零阴影

### Don't

- 不要给表格加竖线与斑马纹
- 不要用彩色大按钮与渐变
- 不要用无衬线正文
- 不要用任何圆角
- 不要用阴影
- 不要用装饰图形与 emoji

## Surfaces

| Level | Name | Value | Purpose |
|---|---|---|---|
| 0 | White | `#ffffff` | 纸面 |
| 1 | Theorem Ground | `#f5f5f0` | 定理与代码块 |

## Elevation

- **None:** `none — paper is flat`

## Imagery

图形只能作为带编号图注的 Figure 出现：折线、柱状、示意图，黑白或低饱和。图注在图下方、14px 次灰、格式为「图 1：」。不使用装饰插画、emoji、彩色大图与任何无编号的图像。

## Layout

版心 700px、居中、文字两端对齐。区块间距 48px，标题上方留 32px。单栏，页边距对称。所有分隔用横线，绝不用底色块或阴影分区。

## Agent Prompt Guide

### Implementation Contract

- 以用户请求中的页面、用户任务和真实内容为依据，只实施指定范围；标明缺失的业务信息，不编造数据或能力。
- 先检查现有项目、技术栈与组件；沿用项目结构、路由和依赖，复用已有组件，不重建未要求的页面或功能。
- 沿用项目断点，调整窄屏与桌面的网格和留白；保留信息层级，避免意外横向溢出。
- 对本次涉及的交互，处理键盘焦点与减少动态效果；补齐适用的禁用、加载、空内容与错误状态。
- 完成后按项目现有脚本检查，仅报告实际运行的测试与视觉检查，并列出未验证项。

QUICK COLOR REFERENCE:

- text: `#111111`
- background: `#ffffff`
- link: `#0b5394`
- theorem: `#f5f5f0`
- muted: `#6b6b66`
- rule: `#d4d4d0`

EXAMPLE COMPONENT PROMPTS:

1. 做一个论文排版页面：版心 700px、居中、全文衬线（Latin Modern Roman 或 Source Serif）、正文 14px、行高 1.55、两端对齐。标题用 1 / 1.1 编号、编号与标题间距 12px、26px 与 20px 700 字重。摘要用 36rem 窄块居中、上方 12px 居中小标题。表格用 booktabs：顶部 2px #111、表头下 1px #d4d4d0、底部 2px #111，绝无竖线。链接色 #0b5394。零圆角零阴影。
