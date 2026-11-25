# 维多利亚植物 — 风格参考

> 钢笔线描的枝叶、旧纸、暗绿与金：一页自然史图鉴。

**Theme:** light

维多利亚植物模仿 19 世纪的自然史图鉴与植物学插图：仿旧纸底（#faf5ef）、暗绿主色（#2d4a2d）、金（#8b6914）作强调、绛红（#6b3a3a）作花的点缀。核心图形是钢笔线描的植物——1px 的细线与不规则的自然曲线，绝不填充成色块。边框是 30% 暗绿的细线呼应线描，圆角克制在 8px，阴影是极淡的暖绿。交互状态把描边换成金色。

## Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Dark Green | `#2d4a2d` | `--color-dark-green` | 主色：文字、线描与主按钮。植物标本的墨绿。 |
| Aged Paper | `#faf5ef` | `--color-aged-paper` | 页面底。带暖调的仿旧纸，像图鉴的页面。 |
| Gold | `#8b6914` | `--color-gold` | 强调与 hover 态：描边、小标记与标题细节。 |
| Crimson | `#6b3a3a` | `--color-crimson` | 花与果实，出现频率低但很醒目。 |
| Mid Green | `#3d5c3d` | `--color-mid-green` | 线描的次级线条与叶脉。 |
| Sprout | `#308323` | `--color-sprout` | 新叶与「新增」标记，最亮的一支。 |

## Typography

### Cormorant Garamond — 衬线体，标题加 0.04em 字距、标签 0.18em。行高 1.8 让长文像图鉴的说明栏。

- **Substitute:** 'EB Garamond', Georgia, 'Songti SC', serif
- **Weights:** 400, 600
- **Sizes:** 13, 16, 20, 26, 34, 46
- **Line height:** 1.2 (display), 1.3 (headings), 1.8 (body)
- **Letter spacing:** 0.04em on display, 0.18em on uppercase labels

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|---|---|---|---|---|---|---|
| display | — | 600 | 46px | 1.2 | 0.04em | `--text-display` |
| heading | — | 600 | 34px | 1.3 | — | `--text-heading` |
| subheading | — | 400 | 26px | 1.4 | — | `--text-subheading` |
| body-lg | — | 400 | 20px | 1.75 | — | `--text-body-lg` |
| body | — | 400 | 16px | 1.8 | — | `--text-body` |
| label | — | 600 | 13px | 1.6 | 0.18em | `--text-label` |

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
| cards | 8px |
| buttons | 6px |
| inputs | 6px |

- **Page max-width:** 1040px
- **Section gap:** 112px
- **Card padding:** 32px
- **Element gap:** 24px

## Components

### Plant Plate

**Role:** 植物线描图版（核心组件）

一个 1:1 或 3:4 的区域，内部用 1px 的暗绿线描出植物（茎、叶、花），线条必须自然弯曲、粗细一致、绝不填充。叶脉用中绿 1px。下方放 13px 等宽的学名（斜体衬线）与编号（如「图版 XII」）。整块零背景、零边框。

### Fine Card

**Role:** 细线卡片

旧纸填充、8px 圆角、1px 暗绿 30% 描边、内边距 32px，阴影 0 2px 8px 暗绿 10%。标题 34px/600 暗绿，正文 16px 行高 1.8。hover 时描边转金 60%、阴影扩到 18px——交互状态的主要变化是那根线换色。

- **States:** hover: gold border, wider shadow

### Gold Button

**Role:** 行动按钮

暗绿填充、旧纸文字、6px 圆角、1px 金 40% 描边、13px/600、字距 0.18em、padding 12px 28px，阴影 0 2px 8px 暗绿 10%。hover 时描边升到 100%、文字转金；按下时位移 1px 2px。过渡 250ms ease-out。

- **Sizes:** padding 12px 28px; label 13px
- **States:** hover: gold border and text; active: offset 1px 2px

### Sprig Rule

**Role:** 枝叶分隔线

一条 1px 暗绿 30% 的横线，中央嵌入一段 32px 的枝叶线描（两片叶加一截茎），两端延伸出细的卷须。它替代普通分隔线，也是版面上最典型的装饰。

### Index Label

**Role:** 图鉴编号

13px/600、字距 0.18em、暗绿或金。格式固定为「图版 XII · 1836」或「PL. XII」。它是页面上唯一的装饰性文字，模仿图鉴的标注。

## Do's and Don'ts

### Do

- 旧纸底配暗绿与金
- 线描必须 1px 且不填充
- 边框 1px 的 30% 暗绿
- hover 把描边换成金
- 圆角克制在 8px
- 标注用图版编号

### Don't

- 不要给线描填色
- 不要用粗边框
- 不要用高饱和图像
- 不要用全圆角
- 不要用现代无衬线
- 不要用冷灰阴影

## Surfaces

| Level | Name | Value | Purpose |
|---|---|---|---|
| 0 | Aged Paper | `#faf5ef` | 页面底 |
| 1 | Green Wash | `rgba(45,74,45,0.06)` | 次级区块 |

## Elevation

- **Warm green:** `0 2px 8px rgba(45,74,45,0.10)`
- **Warm green hover:** `0 6px 18px rgba(45,74,45,0.14)`

## Imagery

植物学线描、标本摄影、图鉴页面扫描。线描必须 1px 且不填充；照片必须柔和、暖调、去饱和。不使用彩色插画、现代排版与高饱和图像。

## Layout

上限 1040px、容器内边距 32px，区块间距 112px。允许不对称双栏（图版在左、说明在右）。留白宽松，线描与文字之间至少 32px，让图版能独立呼吸。

## Agent Prompt Guide

### Implementation Contract

- 以用户请求中的页面、用户任务和真实内容为依据，只实施指定范围；标明缺失的业务信息，不编造数据或能力。
- 先检查现有项目、技术栈与组件；沿用项目结构、路由和依赖，复用已有组件，不重建未要求的页面或功能。
- 沿用项目断点，调整窄屏与桌面的网格和留白；保留信息层级，避免意外横向溢出。
- 对本次涉及的交互，处理键盘焦点与减少动态效果；补齐适用的禁用、加载、空内容与错误状态。
- 完成后按项目现有脚本检查，仅报告实际运行的测试与视觉检查，并列出未验证项。

QUICK COLOR REFERENCE:

- text: `#2d4a2d`
- background: `#faf5ef`
- gold: `#8b6914`
- crimson: `#6b3a3a`
- mid: `#3d5c3d`
- sprout: `#308323`

EXAMPLE COMPONENT PROMPTS:

1. 做一个维多利亚植物卡片：旧纸 #faf5ef 填充、8px 圆角、1px rgba(45,74,45,0.3) 描边、内边距 32px、box-shadow 0 2px 8px rgba(45,74,45,0.1)。左侧放一个 3:4 的植物线描图版：1px 暗绿线条画出茎与两片叶，叶脉用 #3d5c3d，绝不填充。下方 13px 斜体学名与「图版 XII」标注。标题 34px/600 Cormorant Garamond、字距 0.04em、色 #2d4a2d；正文 16px、行高 1.8。hover 时描边转 #8b6914、阴影扩到 18px。页面底色 #faf5ef。
