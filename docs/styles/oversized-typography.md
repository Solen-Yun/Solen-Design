# 超大字体排版 — 风格参考

> 字就是版面：用 clamp() 让它随视口长满宽度，其余全退开。

**Theme:** light

超大字体排版是 2026 年前后设计作品集的主流语汇：标题用 clamp(3rem, 12vw, 10rem) 随视口连续缩放并顶满宽度，名字与主张本身就是首屏，图像退为点缀。导航、标注与元信息一律用小号等宽全大写加宽字距，形成极端的尺寸对立。配色只有三档——近黑（#0a0a0a）、暖白（#fafaf8）与国际橙（#ff4d00），橙色之外不得出现任何彩色。它禁止渐变、禁止圆角卡片堆砌、禁止投影、禁止装饰性图标替代文字——层次只靠字号、字重与留白。

## Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Ink | `#0a0a0a` | `--color-ink` | 文字与 hairline。极深的黑，在暖白上对比最强。 |
| Warm White | `#fafaf8` | `--color-warm-white` | 页面底。微暖的白，让大字不显得冷。 |
| International Orange | `#ff4d00` | `--color-international-orange` | 唯一强调色：一个词、一条线、一个按钮。绝不出现在第二处语义上。 |
| Mid Grey | `#71717a` | `--color-mid-grey` | 元信息、标注与页脚小字。 |
| Rule Grey | `#e4e4e7` | `--color-rule-grey` | hairline 分隔线与极浅的分区底。 |
| Off Black | `#18181b` | `--color-off-black` | 反色区块底，只比墨亮一档。 |

## Typography

### Inter — 标题用无衬线 900 并压到行高 0.85、字距 -0.05em；字号用 clamp(3rem, 12vw, 10rem) 连续缩放。

- **Substitute:** 'Helvetica Neue', system-ui, sans-serif
- **Weights:** 400, 500, 900
- **Sizes:** 12, 16, 24, 48, 96, 160
- **Line height:** 0.85 (display), 0.9 (headings), 1.5 (body)
- **Letter spacing:** -0.05em on display, 0.2em on uppercase labels

### JetBrains Mono — 导航、标注与元信息一律 11 到 12px 等宽全大写 0.2em，与大标题形成 10 倍以上的尺寸对立。

- **Substitute:** ui-monospace, 'Courier New', monospace
- **Weights:** 400
- **Sizes:** 11, 12
- **Line height:** 1.5 (display), 1.5 (headings), 1.5 (body)
- **Letter spacing:** 0.2em on display, 0.2em on uppercase labels

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|---|---|---|---|---|---|---|
| display | Inter | 900 | 160px | 0.85 | -0.05em | `--text-display` |
| heading | Inter | 900 | 96px | 0.88 | -0.04em | `--text-heading` |
| subheading | Inter | 500 | 48px | 1.05 | -0.03em | `--text-subheading` |
| body-lg | Inter | 400 | 24px | 1.4 | — | `--text-body-lg` |
| body | Inter | 400 | 16px | 1.5 | — | `--text-body` |
| label | JetBrains Mono | 400 | 11px | 1.5 | 0.2em | `--text-label` |

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
| 160 | 160px | `--spacing-160` |
| 240 | 240px | `--spacing-240` |

### Border Radius

| Element | Value |
|---|---|
| cards | 0 |
| buttons | 0 |
| inputs | 0 |

- **Page max-width:** 1600px
- **Section gap:** 160px
- **Card padding:** 24px
- **Element gap:** 24px

## Components

### Fluid Headline

**Role:** 流式超大标题（核心）

font-size: clamp(3rem, 12vw, 10rem)、900 字重、行高 0.85、字距 -0.05em，左对齐并顶满容器宽度。允许单个词换成国际橙或用 -webkit-text-stroke 做成描边字（作为第二行）。绝不设固定字级——固定字级在窄屏会溢出、宽屏会显小。

- **Sizes:** clamp(3rem, 12vw, 10rem)

### Mono Label

**Role:** 等宽小标签

11 到 12px 等宽、全大写、字距 0.2em、中灰或墨。用于导航、区块编号（01 / 02）、元信息与页脚。它是大标题之外的唯一文字尺寸，不许出现中间的第三档。

### Hairline Section

**Role:** hairline 区块分隔

区块之间用 1px 墨色 15% 的 border-top 加 160px 的垂直留白。绝不用阴影或色块分区分隔——分隔与留白就是全部。

### Orange Arrow

**Role:** 国际橙行动标记

国际橙填充、白字、零圆角、16px/500、padding 14px 28px。或更常见的形式：一行国际橙文字加一个右箭头符号（→），箭头只作为文字的从属，绝不单独出现。

### Index Row

**Role:** 作品索引行

每行用 1px 墨色 15% 的下边框分为四段：编号（等宽 11px）、项目名（48px/500）、类别（等宽 11px）、年份（等宽 11px）。hover 时整行文字换国际橙、项目名不换字号不位移。

## Do's and Don'ts

### Do

- 标题用 clamp() 连续缩放
- 只用近黑、暖白与国际橙
- 小字一律等宽全大写 0.2em
- 区块用 hairline 加 160px 留白
- 零圆角、零投影
- 允许描边字做第二行

### Don't

- 不要用渐变背景或渐变文字
- 不要堆砌圆角卡片
- 不要用任何投影
- 不要引入第二种强调色
- 不要用装饰图标代替文字
- 不要给标题设固定字级

## Surfaces

| Level | Name | Value | Purpose |
|---|---|---|---|
| 0 | Warm White | `#fafaf8` | 页面底 |
| 1 | Off Black | `#18181b` | 反色区块 |

## Elevation

- **None:** `none — hierarchy comes from size alone`

## Imagery

图像退为点缀：小尺寸、单张、无边框。允许作品截图与肖像。不使用大图横幅与画廊网格，任何图像的视觉重量都必须低于字。

## Layout

上限 1600px、容器内边距 32px，区块间距 160px。首屏只有一段巨大的名字或主张，占据视口 60% 以上。导航固定顶部、极薄、只有等宽小字。留白是主要构图手段。

## Agent Prompt Guide

### Implementation Contract

- 以用户请求中的页面、用户任务和真实内容为依据，只实施指定范围；标明缺失的业务信息，不编造数据或能力。
- 先检查现有项目、技术栈与组件；沿用项目结构、路由和依赖，复用已有组件，不重建未要求的页面或功能。
- 沿用项目断点，调整窄屏与桌面的网格和留白；保留信息层级，避免意外横向溢出。
- 对本次涉及的交互，处理键盘焦点与减少动态效果；补齐适用的禁用、加载、空内容与错误状态。
- 完成后按项目现有脚本检查，仅报告实际运行的测试与视觉检查，并列出未验证项。

QUICK COLOR REFERENCE:

- text: `#0a0a0a`
- background: `#fafaf8`
- accent: `#ff4d00`
- muted: `#71717a`
- rule: `#e4e4e7`
- dark: `#18181b`

EXAMPLE COMPONENT PROMPTS:

1. 做一个超大字体排版首屏：暖白 #fafaf8 底、墨 #0a0a0a 字。标题 font-size: clamp(3rem, 12vw, 10rem)、900 字重、行高 0.85、字距 -0.05em、左对齐顶满宽度，其中一个词用国际橙 #ff4d00。上方导航用 11px 等宽全大写 0.2em 的 #71717a。区块之间用 1px rgba(10,10,10,0.15) 的 border-top 加 160px 留白。全站零圆角、零投影、无渐变，只用三档颜色加两档灰。
