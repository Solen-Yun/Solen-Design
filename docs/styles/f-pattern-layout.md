# F 型布局 — 风格参考

> 按眼动轨迹排版：先横扫顶部，再下移横扫，最后沿左缘直落。

**Theme:** light

F 型布局来自眼动研究：读者先横向扫过顶部，再往下横扫一次，最后沿左边缘纵向跳读，轨迹像字母 F。所以它把最重要的信息放在顶部两行、把关键词放在每段的句首、把行宽压到 65 到 75 字符。视觉上它必须安静：白底、深色标题、极少的强调色，因为任何装饰都会打断扫描。它的价值不在好看，而在让一屏能多读 30% 的内容——适合文档、博客、新闻列表与长页说明。

## Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Ink | `#1a1a2e` | `--color-ink` | 标题与正文。深而不黑，长读不刺眼。 |
| Paper | `#f8f9fa` | `--color-paper` | 页面底。极浅的冷白，让文字对比最大化。 |
| Vermilion | `#e63946` | `--color-vermilion` | 唯一的高强调，用于关键结论与必须被扫到的词。 |
| Steel Blue | `#457b9d` | `--color-steel-blue` | 链接与次级标题，扫读时次要但仍需可见。 |
| Pine | `#2a9d8f` | `--color-pine` | 成功与「可执行」提示，出现频率低。 |
| Sand | `#e9c46a` | `--color-sand` | 行内高亮，用于标记一段里的关键短语。 |

## Typography

### Inter — 全站唯一字体。层级靠四级字号加两档字重建立，不靠颜色。

- **Substitute:** system-ui, -apple-system, 'Segoe UI', sans-serif
- **Weights:** 400, 500, 600, 700
- **Sizes:** 12, 14, 16, 20, 28, 36
- **Line height:** 1.15 (display), 1.3 (headings), 1.7 (body)
- **Letter spacing:** -0.02em on display, 0.06em on uppercase labels

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|---|---|---|---|---|---|---|
| display | — | 700 | 36px | 1.15 | -0.02em | `--text-display` |
| heading-lg | — | 700 | 28px | 1.25 | -0.01em | `--text-heading-lg` |
| heading | — | 600 | 20px | 1.35 | — | `--text-heading` |
| body-lg | — | 400 | 16px | 1.7 | — | `--text-body-lg` |
| body | — | 400 | 14px | 1.7 | — | `--text-body` |
| label | — | 600 | 12px | 1.4 | 0.06em | `--text-label` |

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
| cards | 8px |
| buttons | 6px |
| inputs | 6px |
| tags | 4px |

- **Page max-width:** 760px
- **Section gap:** 48px
- **Card padding:** 20px
- **Element gap:** 12px

## Components

### Scan Header

**Role:** 页面顶部标题区（F 的顶横）

标题 36px/700 单行、行宽不超过 34 字符；其下 16px 导语最多两行；再下一条 1px #e2e8f0 横线。整块左对齐，顶部内边距 48px。关键词放在标题前三个词内。

### Scan Row

**Role:** 横向扫描行（F 的中横）

三到四项横向排列，每项：12px 全大写标签在上、20px/600 标题在中、14px 摘要在下（最多两行）。项与项之间 32px 间距，整行高度不超过 160px。左对齐，不居中。

### Article List

**Role:** 纵向列表（F 的竖笔）

每行左侧有一条 2px 宽、48px 高的强调色竖条（可取朱、钢蓝或松绿），右侧是 16px/600 标题与 14px 摘要。行高 88px、行间 1px #e2e8f0 分隔。hover 时竖条加宽到 4px、背景转白。

- **States:** hover: bar 2px→4px, ground white

### Inline Highlight

**Role:** 行内高亮与关键词标记

淡沙金底（#e9c46a 的 35%）、无圆角、padding 0 2px，只在行内使用，不加粗。整篇文章的高亮不超过三处，否则扫读会失去锚点。

### Measure Column

**Role:** 正文列宽容器

最大宽度 760px、正文行宽控制在 65 到 75 字符（约 34em）。左内边距 0、右内边距留白；段间距 20px，段首不缩进。禁止把正文居中。

## Do's and Don'ts

### Do

- 关键词放在标题前三个词
- 正文行宽 65 到 75 字符
- 每段首句承担结论
- 强调色只用于必须被扫到的词
- 重要内容放左上
- 用标题层级、列表与分段提升可扫描性

### Don't

- 不要把重要内容放右下角
- 不要居中大段文字
- 不要忽视内容优先级
- 不要写没有分段的长文
- 不要在左侧留过多空白
- 不要用超过三处高亮

## Surfaces

| Level | Name | Value | Purpose |
|---|---|---|---|
| 0 | Paper | `#f8f9fa` | 页面底 |
| 1 | White Card | `#ffffff` | 列表项与引用块 |

## Elevation

- **None:** `none — separation comes from rules and spacing`
- **Card hover:** `0 2px 8px rgba(26,26,46,0.06)`

## Imagery

以文字为主，图像必须服务于扫读：图表、截图、缩略图（统一 16:10）。不使用装饰性大图与背景图，它们会把 F 的轨迹切断。

## Layout

上限 760px 单栏、容器内边距 24px，区块间距 48px。页面结构固定为：顶横（标题加导语）→ 中横（三到四项）→ 竖笔（列表）。重要内容永远在左上，右下角只放次要信息。

## Agent Prompt Guide

### Implementation Contract

- 以用户请求中的页面、用户任务和真实内容为依据，只实施指定范围；标明缺失的业务信息，不编造数据或能力。
- 先检查现有项目、技术栈与组件；沿用项目结构、路由和依赖，复用已有组件，不重建未要求的页面或功能。
- 沿用项目断点，调整窄屏与桌面的网格和留白；保留信息层级，避免意外横向溢出。
- 对本次涉及的交互，处理键盘焦点与减少动态效果；补齐适用的禁用、加载、空内容与错误状态。
- 完成后按项目现有脚本检查，仅报告实际运行的测试与视觉检查，并列出未验证项。

QUICK COLOR REFERENCE:

- text: `#1a1a2e`
- background: `#f8f9fa`
- accent: `#e63946`
- link: `#457b9d`
- success: `#2a9d8f`
- highlight: `#e9c46a`

EXAMPLE COMPONENT PROMPTS:

1. 做一个 F 型布局的文章页：单栏上限 760px、正文 16px/1.7、行宽 34em、左对齐。顶部 36px/700 标题（关键词在前三个词）加两行导语加 1px #e2e8f0 横线；中部放三列扫描行（每列 12px 全大写标签 + 20px/600 标题 + 14px 两行摘要）；下部是文章列表，每行左侧 2px 强调色竖条（48px 高）、右侧 16px/600 标题与 14px 摘要，行间 1px 分隔线。
