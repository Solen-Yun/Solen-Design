# 学术科普风 — 风格参考

> 一条窄衬线栏讲论证，边注放旁白，图表突破版心放证据。

**Theme:** light

学术科普风以学术期刊网站为范式：正文是 42rem 宽的窄衬线栏、行高 1.75，边注（sidenote）在大屏上绝对定位悬浮到右缘、小屏折叠为浅灰内联块，图表则突破版心到 64rem 居中展示证据。它的规则严格到近乎期刊——分割只用 1px 的 hairline，表格用 booktabs 风格（上下两条粗横线加表头细线，绝无竖线与斑马纹），引用用上标编号配参考文献，颜色只有两种职能：学术蓝给链接与引用，图表橙给数据强调。

## Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Ink | `#1f2933` | `--color-ink` | 正文与标题。深灰蓝，比纯黑更适合长文。 |
| Paper | `#ffffff` | `--color-paper` | 页面底。纯白无纹理，论文不需要气氛。 |
| Academic Blue | `#2a7ae2` | `--color-academic-blue` | 链接、上标引用与关键强调。只有这三个用途。 |
| Chart Orange | `#e4572e` | `--color-chart-orange` | 数据强调与图表主序列，绝不用于界面装饰。 |
| Muted Grey | `#6b7280` | `--color-muted-grey` | 图注、边注与元信息。永远是第三层级。 |
| Grey Block | `#f3f4f6` | `--color-grey-block` | 小屏的边注折叠块与代码块底。 |

## Typography

### Source Serif — 正文与标题必须衬线。行高 1.75 是长文可读性的下限，不可压缩。

- **Substitute:** Georgia, 'Songti SC', serif
- **Weights:** 400, 600
- **Sizes:** 13, 15, 17, 21, 28, 36
- **Line height:** 1.2 (display), 1.3 (headings), 1.75 (body)
- **Letter spacing:** -0.01em on display, 0.06em on uppercase labels

### Inter — 仅用于 UI 控件标签与元信息。正文绝不使用无衬线。

- **Substitute:** system-ui, sans-serif
- **Weights:** 400, 500
- **Sizes:** 12, 13
- **Line height:** 1.4 (display), 1.4 (headings), 1.6 (body)
- **Letter spacing:** 0 on display, 0.06em on uppercase labels

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|---|---|---|---|---|---|---|
| display | Source Serif | 600 | 36px | 1.2 | -0.01em | `--text-display` |
| heading-lg | Source Serif | 600 | 28px | 1.25 | — | `--text-heading-lg` |
| heading | Source Serif | 600 | 21px | 1.35 | — | `--text-heading` |
| body-lg | Source Serif | 400 | 17px | 1.75 | — | `--text-body-lg` |
| body | Source Serif | 400 | 15px | 1.75 | — | `--text-body` |
| label | Inter | 500 | 12px | 1.4 | 0.06em | `--text-label` |

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
| 96 | 96px | `--spacing-96` |

### Border Radius

| Element | Value |
|---|---|
| cards | 6px |
| buttons | 4px |
| figures | 0 |

- **Page max-width:** 672px
- **Section gap:** 64px
- **Card padding:** 24px
- **Element gap:** 16px

## Components

### Reading Column

**Role:** 正文窄栏（核心结构）

max-width 42rem（672px）、左右各 24px 内边距、居中。正文 17px 衬线、行高 1.75、段间距 24px、段首不缩进。绝不允许正文全宽铺满——全宽只属于图表。

- **Sizes:** 42rem measure

### Sidenote

**Role:** 边注（旁白）

大屏（1280px 以上）绝对定位到正文右缘外侧 24px、宽 200px、12px 灰字、行高 1.5；小屏折叠为正文内的浅灰块（#f3f4f6）、4px 圆角、内边距 12px、12px 灰字。锚点用上标数字。

### Evidence Figure

**Role:** 图表（突破版心）

max-width 64rem（1024px）、居中，比正文宽出一倍。图注 13px 灰、以「图 N：」开头，与图之间 12px。图表区域零圆角、无边框。这是唯一允许突破版心的元素。

### Booktabs Table

**Role:** booktabs 风格表格

顶部 2px 墨色横线、表头下 1px 墨色横线、底部 2px 墨色横线，中间绝无竖线与斑马纹。单元格内边距 8px 12px、14px 衬线，数值列右对齐并用等宽数字。

### Citation Sup

**Role:** 上标引用

正文后跟 12px 上标数字（学术蓝、不换行、与正文间距 2px），文末参考文献列按编号排列，每条 13px、含标题与出处。点击上标跳转到条目并高亮 2 秒。

## Do's and Don'ts

### Do

- 正文窄栏 42rem、行高 1.75
- 正文必须衬线，无衬线只给 UI
- 边注在大屏浮到右缘、小屏折叠
- 图表突破版心到 64rem
- 表格用 booktabs，无竖线无斑马纹
- 分割只用 1px hairline

### Don't

- 不要用任何渐变
- 不要用重阴影
- 不要用大圆角
- 不要让正文全宽铺满
- 不要用多彩装饰与大色块
- 不要给表格加竖线与斑马纹

## Surfaces

| Level | Name | Value | Purpose |
|---|---|---|---|
| 0 | Paper | `#ffffff` | 页面底 |
| 1 | Grey Block | `#f3f4f6` | 代码与折叠边注 |

## Elevation

- **None:** `none — hairlines and whitespace do the work`
- **Max allowed:** `0 1px 2px rgba(31,41,51,0.05)`

## Imagery

图表即图像：散点、折线、网络、注意力热图，必须带坐标轴与图注。允许作者照片。不使用装饰摄影、插画与背景图，气氛在这套语言里没有位置。

## Layout

正文版心 42rem、图表 64rem、页面上限 1024px。区块间距 64px，标题上方留 48px。分割一律 1px #e5e7eb 的 hairline。整页单栏，不做侧栏导航。

## Agent Prompt Guide

### Implementation Contract

- 以用户请求中的页面、用户任务和真实内容为依据，只实施指定范围；标明缺失的业务信息，不编造数据或能力。
- 先检查现有项目、技术栈与组件；沿用项目结构、路由和依赖，复用已有组件，不重建未要求的页面或功能。
- 沿用项目断点，调整窄屏与桌面的网格和留白；保留信息层级，避免意外横向溢出。
- 对本次涉及的交互，处理键盘焦点与减少动态效果；补齐适用的禁用、加载、空内容与错误状态。
- 完成后按项目现有脚本检查，仅报告实际运行的测试与视觉检查，并列出未验证项。

QUICK COLOR REFERENCE:

- text: `#1f2933`
- background: `#ffffff`
- accent: `#2a7ae2`
- chart: `#e4572e`
- muted: `#6b7280`
- rule: `#e5e7eb`

EXAMPLE COMPONENT PROMPTS:

1. 做一个学术科普页面：正文栏 max-width 42rem、居中、17px 衬线、行高 1.75、段间距 24px。标题层级 36px/28px/21px 衬线。图表区 max-width 64rem 居中、零圆角，图注 13px #6b7280、以「图 N：」开头。表格用 booktabs：顶部 2px、表头下 1px、底部 2px 的 #1f2933 横线，无竖线无斑马纹。上标引用用 12px #2a7ae2。所有分割用 1px #e5e7eb。页面底色 #ffffff。
