# 编辑杂志风 — 风格参考

> 暖米纸上的衬线杂志版面，秩序来自留白与一条发丝线，而不是分栏装饰。

**Theme:** light

编辑部风格来自印刷媒体：高端杂志与报纸的版面语言。它把全部表现力放在字号级差、衬线标题与留白的呼吸感上，颜色退到只剩一个柔和的墨黑与一层暖米底。层次靠透明度（文字 /60、/40，边框 /10）和字距（标题收紧，标签放开）建立；深度靠留白与 1px 细线，不用阴影、不用圆角、不用渐变。整套系统只有一个暖色点缀，出现面积控制在一屏的 2% 以内，用于引文标记与选中态。

## Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Ink | `#1c1c1c` | `--color-ink` | 正文、标题、1px 边框与反色区块的底色。全站唯一的深色，替代纯黑以免印刷感过硬。 |
| Paper | `#f9f8f6` | `--color-paper` | 页面画布。所有默认背景都用它，比冷白更接近纸张，也避免长时间阅读的刺目感。 |
| Graphite | `#6b7280` | `--color-graphite` | 次要文字、题注、日期与辅助说明。层级需要后退时用它，而不是缩小字号。 |
| Mauve | `#816d70` | `--color-mauve` | 全站唯一暖色点缀。只出现在引文标记与选中态，面积不得超过一屏的 2%。 |

## Typography

### serif — 所有标题、引文与数字。衬线是这套风格的识别核心，缺了它就只剩一页灰底文字。

- **Substitute:** Georgia, 'Times New Roman', 'Songti SC', serif
- **Weights:** 400, 500
- **Sizes:** 28, 36, 48, 60, 72
- **Line height:** 1.05 (display), 1.15 (headings), 1.7 (body)
- **Letter spacing:** -0.02em on display, 0.2em on uppercase labels

### sans-serif — 正文、按钮、标签与导航。始终与衬线标题成对出现，承担所有功能性文本。

- **Substitute:** Inter, system-ui, -apple-system, sans-serif
- **Weights:** 400, 500, 700
- **Sizes:** 12, 14, 16
- **Line height:** 1.05 (display), 1.2 (headings), 1.7 (body)
- **Letter spacing:** -0.01em on display, 0.2em on uppercase labels

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|---|---|---|---|---|---|---|
| display | serif | 400 | 72px | 1.05 | -0.02em | `--text-display` |
| heading-lg | serif | 400 | 48px | 1.1 | -0.02em | `--text-heading-lg` |
| heading | serif | 400 | 36px | 1.2 | -0.01em | `--text-heading` |
| subheading | serif | 400 | 28px | 1.3 | — | `--text-subheading` |
| body-lg | sans-serif | 400 | 16px | 1.7 | — | `--text-body-lg` |
| body | sans-serif | 400 | 14px | 1.7 | — | `--text-body` |
| label | sans-serif | 500 | 12px | 1.4 | 0.2em | `--text-label` |

## Spacing & Layout

**Base unit:** 8px
**Density:** airy

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
| 160 | 160px | `--spacing-160` |

### Border Radius

| Element | Value |
|---|---|
| cards | 0 |
| buttons | 0 |
| inputs | 0 |
| images | 0 |

- **Page max-width:** 1200px
- **Section gap:** 96px
- **Card padding:** 24px
- **Element gap:** 8px

## Components

### Contrast Lockup Button

**Role:** 主行动按钮，例：Read Story、Subscribe

墨黑填充、暖米纸色文字、1px 墨黑描边、直角。字级 12px、字重 500、全大写、字距 0.2em；padding 16px 32px。hover 时填充与文字互换，过渡 200ms。

- **Sizes:** padding 16px 32px; label 12px
- **States:** rest: ink on paper inverted; hover: paper fill, ink text; focus-visible: 2px ink outline, 2px offset

### Underline Text Link

**Role:** 次级行动与导航，例：View All

无填充无边框，12px 全大写 0.2em 字距。下划线是一条 1px 当前色线，从右向左以 scale-x 0 起步，hover 时从左展开到 1，时长 500ms，缓动 cubic-bezier(0.16, 1, 0.3, 1)。

- **States:** hover: underline scale-x 0 to 1; focus-visible: 2px outline, no underline

### Hairline Card

**Role:** 文章卡片与列表项

顶部 1px 墨黑 /10 边线，padding-top 24px，无圆角无阴影无背景。hover 时边线加深到 /40，过渡 500ms；内部图片以 1.02 倍慢速放大，时长 600ms。

- **States:** hover: rule /10 to /40, image 1 to 1.02

### Section Label

**Role:** 区块分类与栏目名

12px 全大写、0.2em 字距、石墨色；前面接一条 24px 长、1px 宽的墨黑横线，线与文字间距 12px。不加大写以外任何装饰。

### Pull Quote

**Role:** 段落中的引文强调

28 至 36px 衬线斜体、行高 1.3、左右各缩进 24px、左侧 2px 墨黑竖线、上下留白 32px。引号用莫夫色，字号为正文的 1.5 倍。

## Do's and Don'ts

### Do

- 标题用衬线、正文用无衬线，两者始终成对出现
- 用透明度构建灰度：文字 /60 与 /40，边框 /10，而不是引入新颜色
- 区块间距至少 96px，容器内边距 24px 到 48px
- 标签统一 12px 全大写 0.2em 字距，不加粗
- 斜体只用于副标题与引文，不用于正文强调
- 交互只用下划线展开与颜色反转，时长 500ms 上下

### Don't

- 不要引入其它彩色强调。只允许莫夫色 #816d70 用于引文标记和选中态，面积不超过一屏的 2%
- 不要用阴影表达层次，深度只来自留白与 1px 线
- 不要用纯黑 #0a0a0a 或冷白 #fafafa 做主色
- 标题不得使用无衬线字体
- 不要用任何圆角，包括卡片、按钮与输入框
- 不要用渐变、背景图案或装饰性几何
- 不要堆叠元素，宁可多留一屏白

## Surfaces

| Level | Name | Value | Purpose |
|---|---|---|---|
| 0 | Paper | `#f9f8f6` | 默认页面画布 |
| 1 | Ink Band | `#1c1c1c` | 反色区块：页脚、CTA 条、引文段 |

## Elevation

- **None:** `none`
- **Hairline:** `1px solid rgba(28,28,28,0.1)`

## Imagery

以摄影为主，低饱和、暖调、full-bleed 满幅裁切，人物与静物都可以，但必须能读成杂志跨页。不使用插画、图形纹样与图标系统；需要图示时用 1px 墨黑线框代替，保持纸面感。

## Layout

单栏 1200px 上限，内部 8 栏网格。hero 为 45/55 左右分栏（文字 / 图像），正文区块单栏或 2 栏，栏间距 48px。区块间距 96 至 128px，容器内边距 24px（移动）到 48px（桌面）。阅读宽度控制在 34em 以内，超过就断行，不做三栏以上的密集排版。

## Agent Prompt Guide

### Implementation Contract

- 以用户请求中的页面、用户任务和真实内容为依据，只实施指定范围；标明缺失的业务信息，不编造数据或能力。
- 先检查现有项目、技术栈与组件；沿用项目结构、路由和依赖，复用已有组件，不重建未要求的页面或功能。
- 沿用项目断点，调整窄屏与桌面的网格和留白；保留信息层级，避免意外横向溢出。
- 对本次涉及的交互，处理键盘焦点与减少动态效果；补齐适用的禁用、加载、空内容与错误状态。
- 完成后按项目现有脚本检查，仅报告实际运行的测试与视觉检查，并列出未验证项。

QUICK COLOR REFERENCE:

- text: `#1c1c1c`
- background: `#f9f8f6`
- muted: `#6b7280`
- accent: `#816d70`
- border: `rgba(28,28,28,0.1)`

EXAMPLE COMPONENT PROMPTS:

1. 做一个杂志式 hero：1200px 容器，左 45% 放 12px 全大写 0.2em 石墨色栏目名加一条 24px 横线，下面是 72px 衬线标题（行高 1.05，字距 -0.02em，墨黑），再接 16px 无衬线导语（行高 1.7，宽 34em 以内），底部一个墨黑填充直角按钮（12px 全大写 0.2em，padding 16px 32px）。右 55% 放一张低饱和暖调满幅照片，直角，无阴影。
2. 做一个文章列表：每行顶部 1px rgba(28,28,28,0.1) 边线，内边距上方 24px，行间 64px。行内左侧 48px 石墨色日期（12px 全大写 0.2em），右侧 28px 衬线标题与 14px 无衬线摘要（行高 1.7，颜色 #6b7280），摘要不超过两行。hover 时边线加深到 rgba(28,28,28,0.4)，过渡 500ms。
