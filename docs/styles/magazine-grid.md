# 杂志网格布局 — 风格参考

> 版面自己会说话：大块讲主故事，小块填次要，尺寸就是优先级。

**Theme:** light

杂志网格把印刷版的版面逻辑搬到网页：用 grid-template-areas 画出不等大的区块，头条占 2×2，次条占 2×1，短讯占 1×1，读者一眼就知道什么最重要。它的三条纪律是——所有块不能同尺寸（那等于没有层级）、图片裁切比例必须统一（否则网格会歪）、正文段落绝不能加位移动画（阅读稳定性优先）。标题的 hover 只允许直接换色，不允许发光或阴影。

## Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Ink | `#1a1a1a` | `--color-ink` | 标题与正文。报纸式的深灰，长读不累。 |
| Paper | `#fafafa` | `--color-paper` | 页面底。近白但不刺眼，让图片承担对比。 |
| Red | `#e63946` | `--color-red` | 头条标记与栏目标签，是版面上最抢眼的色。 |
| Teal | `#2a9d8f` | `--color-teal` | 次级分类与文化栏目。 |
| Gold | `#e9c46a` | `--color-gold` | 引文底与高亮，用于标记值得单独读的一段。 |
| Navy | `#264653` | `--color-navy` | 深度报道与专题标签，出现频率低于红与青。 |

## Typography

### Playfair Display — 标题用衬线。版面层级主要靠字号与栏宽，字体只需提供印刷感。

- **Substitute:** Georgia, 'Songti SC', serif
- **Weights:** 400, 700, 900
- **Sizes:** 16, 20, 28, 40, 56
- **Line height:** 1.05 (display), 1.15 (headings), 1.7 (body)
- **Letter spacing:** -0.02em on display, 0.1em on uppercase labels

### Inter — 正文、标签与元数据。无衬线正文与衬线标题的对照是杂志感的关键。

- **Substitute:** system-ui, 'Segoe UI', sans-serif
- **Weights:** 400, 500
- **Sizes:** 12, 13, 15
- **Line height:** 1.4 (display), 1.4 (headings), 1.7 (body)
- **Letter spacing:** 0 on display, 0.1em on uppercase labels

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|---|---|---|---|---|---|---|
| display | Playfair Display | 900 | 56px | 1.05 | -0.02em | `--text-display` |
| heading-lg | Playfair Display | 700 | 40px | 1.1 | — | `--text-heading-lg` |
| heading | Playfair Display | 700 | 28px | 1.2 | — | `--text-heading` |
| subheading | Playfair Display | 400 | 20px | 1.3 | — | `--text-subheading` |
| body | Inter | 400 | 15px | 1.7 | — | `--text-body` |
| label | Inter | 500 | 12px | 1.4 | 0.1em | `--text-label` |

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

### Border Radius

| Element | Value |
|---|---|
| cards | 8px |
| buttons | 4px |
| images | 4px |

- **Page max-width:** 1280px
- **Section gap:** 64px
- **Card padding:** 24px
- **Element gap:** 16px

## Components

### Lead Block

**Role:** 头条区块（2×2）

占两列两行，含一张 16:9 大图（4px 圆角、固定裁切）与下方 40px/700 衬线标题、20px 导语（最多两行）。左上角放一个 12px 全大写 0.1em 的红色栏目标签。整块不加阴影。

### Brick Block

**Role:** 次条与短讯区块

1×1 或 2×1，图片固定 1:1 或 4:3（同尺寸块必须同比例）。标题 28px/700（1×1）或 28px/700（2×1），说明 15px、行高 1.7、最多三行。标签颜色按栏目固定：文化用青、深度用深蓝。

### Pull Quote

**Role:** 引文块

金色底（#e9c46a 的 25%）或纯金色块、4px 圆角、内边距 24px，引文用 28px 衬线斜体、行高 1.4，下方 13px 无衬线署名。只用于整版最值得单独读的一段，每屏最多一处。

### Section Label

**Role:** 栏目与分类标签

12px/500、全大写、字距 0.1em、无底无边框。颜色按栏目固定且全站不得混用：头条红、文化青、深度深蓝、评论墨。标签永远在标题上方 8px。

### Title Hover

**Role:** 标题的 hover 规则

hover 时只把标题颜色换成该栏目的强调色，过渡 120ms，不加下划线、不加阴影、不加发光、不做位移。这是整套风格对「利落」的定义。

## Do's and Don'ts

### Do

- 用不等大的区块建立层级
- 同尺寸块必须同图片比例
- 标签颜色按栏目固定
- 标题 hover 只换色，120ms
- 正文行高 1.7，段间 16px
- 移动端降列数并取消跨列

### Don't

- 不要让所有块同尺寸
- 不要忽略移动端适配
- 不要拥挤到没有留白
- 不要混用栏目标签颜色
- 不要忽略图片裁切比例
- 不要给正文加位移动画

## Surfaces

| Level | Name | Value | Purpose |
|---|---|---|---|
| 0 | Paper | `#fafafa` | 页面底 |
| 1 | Card White | `#ffffff` | 内容块 |
| 2 | Gold Quote | `#e9c46a` | 引文块 |

## Elevation

- **None:** `none — the grid does the separating`
- **Card hover:** `0 4px 16px rgba(26,26,26,0.08)`

## Imagery

新闻摄影与编辑类图像，必须统一裁切比例（大图 16:9、小图 1:1 或 4:3）。允许人物、场景与图表。不使用插画与装饰图形。

## Layout

上限 1280px、容器内边距 24px，主网格 4 列、间距 24px，用 grid-template-areas 显式定义版面。区块间距 64px。小于 1024px 时降到 2 列，小于 768px 时全部单列且头条不再跨列。

## Agent Prompt Guide

### Implementation Contract

- 以用户请求中的页面、用户任务和真实内容为依据，只实施指定范围；标明缺失的业务信息，不编造数据或能力。
- 先检查现有项目、技术栈与组件；沿用项目结构、路由和依赖，复用已有组件，不重建未要求的页面或功能。
- 沿用项目断点，调整窄屏与桌面的网格和留白；保留信息层级，避免意外横向溢出。
- 对本次涉及的交互，处理键盘焦点与减少动态效果；补齐适用的禁用、加载、空内容与错误状态。
- 完成后按项目现有脚本检查，仅报告实际运行的测试与视觉检查，并列出未验证项。

QUICK COLOR REFERENCE:

- text: `#1a1a1a`
- background: `#fafafa`
- card: `#ffffff`
- red: `#e63946`
- teal: `#2a9d8f`
- gold: `#e9c46a`

EXAMPLE COMPONENT PROMPTS:

1. 做一个杂志网格版面：4 列 grid、间距 24px、用 grid-template-areas 定义。头条占 2×2（16:9 大图 + 40px/700 衬线标题 + 两行 20px 导语 + 12px 全大写 0.1em 红色栏目标签）。其余为 1×1 或 2×1 的小块（1:1 或 4:3 图 + 28px/700 标题 + 15px/1.7 说明）。另放一个金色底（#e9c46a 25%）的引文块，28px 衬线斜体。标题 hover 只把颜色换成栏目强调色，transition 120ms，不加阴影不发散。
