# 大理石奢华 — 风格参考

> 大理石白、古金细线、极细衬线：一切都在说「不急」。

**Theme:** light

大理石奢华是高端酒店与地产的语言：大理石白底（#f8f6f3）、纯黑文字（#1a1a1a）、古金（#c9a96e）只作 1px 分隔线与细边框、衬线字体保持细字重、字距放到 0.2em 以上。它的奢侈感来自「少而精」——没有阴影、没有渐变、没有装饰图形，只有比例、留白与那一根金线。石材纹理作为极淡的底纹（不透明度 5% 到 8%）出现，绝不做成抢眼的大理石贴图。

## Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Marble White | `#f8f6f3` | `--color-marble-white` | 页面底。带一丝暖的白，像抛光石材。 |
| Black | `#1a1a1a` | `--color-black` | 全部文字。纯黑，不掺灰。 |
| Antique Gold | `#c9a96e` | `--color-antique-gold` | 唯一强调色：1px 分隔线、细边框与小标记。 |
| Stone Grey | `#8a7968` | `--color-stone-grey` | 次级文字与纹理的暗线。 |
| Pale Stone | `#e8e0d6` | `--color-pale-stone` | 次级区块与卡片衬底，只比底色深一档。 |
| Jade | `#85bd73` | `--color-jade` | 极少量用于「自然」「园林」语义，出现频率最低。 |

## Typography

### Cormorant Garamond — 细衬线，只用 300 与 400。标题字距 0.04em、标签 0.28em，行高 1.85——慢是它的语法。

- **Substitute:** 'EB Garamond', Georgia, 'Songti SC', serif
- **Weights:** 300, 400
- **Sizes:** 13, 15, 18, 24, 34, 48
- **Line height:** 1.2 (display), 1.35 (headings), 1.85 (body)
- **Letter spacing:** 0.04em on display, 0.28em on uppercase labels

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|---|---|---|---|---|---|---|
| display | — | 300 | 48px | 1.2 | 0.04em | `--text-display` |
| heading | — | 300 | 34px | 1.3 | 0.04em | `--text-heading` |
| subheading | — | 400 | 24px | 1.4 | — | `--text-subheading` |
| body-lg | — | 300 | 18px | 1.8 | — | `--text-body-lg` |
| body | — | 300 | 15px | 1.85 | — | `--text-body` |
| label | — | 400 | 13px | 1.6 | 0.28em | `--text-label` |

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

- **Page max-width:** 1120px
- **Section gap:** 240px
- **Card padding:** 48px
- **Element gap:** 40px

## Components

### Gold Rule

**Role:** 古金分隔线（核心结构）

1px、色古金 30%，横跨内容宽并在两端各收进 5%。它替代所有其它分隔手段——不用阴影、不用底色块、不用留白条。奢华感的全部重量在这根线上。

### Marble Card

**Role:** 内容卡

大理石白或浅石填充、零圆角、1px 古金 20% 描边、内边距 48px，无阴影。标题 34px/300 黑、字距 0.04em；正文 15px/300 行高 1.85。hover 时只把描边升到 40%，其余不变。

### Quiet Button

**Role:** 行动按钮

透明底、1px 黑 40% 描边、零圆角、13px/400、字距 0.28em、padding 18px 40px，无阴影。hover 时描边转古金 100%、文字转古金；按下时描边升到 2px 但位置不变。过渡 500ms ease-out。

- **Sizes:** padding 18px 40px; label 13px
- **States:** hover: gold border and text; active: border 2px

### Stone Vein

**Role:** 石纹底

用 SVG 的 feTurbulence 加 feDisplacementMap（极低频、细线）生成几缕不规则石纹，颜色石纹灰、不透明度 5% 到 8%，只出现在大区块的背景。它的存在应该几乎察觉不到——察觉到了就太重。

### Index Mark

**Role:** 序号与小标记

13px/400、字距 0.28em、古金或石纹灰。格式为「01 — 04」或「EST. 1987」。它是页面上除标题外唯一的「小字」，也是唯一允许的装饰性文字。

## Do's and Don'ts

### Do

- 大理石白底配纯黑文字
- 古金只作 1px 线与细边框
- 衬线只用 300 与 400 字重
- 字距 0.2em 以上
- 零圆角零阴影
- 留白占六成以上

### Don't

- 不要用阴影
- 不要用渐变
- 不要把金铺成面
- 不要用粗边框
- 不要用装饰图形
- 不要让石纹抢眼

## Surfaces

| Level | Name | Value | Purpose |
|---|---|---|---|
| 0 | Marble White | `#f8f6f3` | 页面底 |
| 1 | Pale Stone | `#e8e0d6` | 次级区块 |

## Elevation

- **None:** `none — flat stone, no shadow`

## Imagery

建筑与室内摄影：石材、金属、玻璃、比例精确的空间。必须自然光、低饱和、构图克制。允许把照片处理成暖灰单色。不使用高饱和摄影、装饰插画与人像特写。

## Layout

上限 1120px、容器内边距 32px，区块间距 240px。留白占页面六成以上。单栏或克制双栏，一切左对齐或严格居中，禁止错位与旋转。

## Agent Prompt Guide

### Implementation Contract

- 以用户请求中的页面、用户任务和真实内容为依据，只实施指定范围；标明缺失的业务信息，不编造数据或能力。
- 先检查现有项目、技术栈与组件；沿用项目结构、路由和依赖，复用已有组件，不重建未要求的页面或功能。
- 沿用项目断点，调整窄屏与桌面的网格和留白；保留信息层级，避免意外横向溢出。
- 对本次涉及的交互，处理键盘焦点与减少动态效果；补齐适用的禁用、加载、空内容与错误状态。
- 完成后按项目现有脚本检查，仅报告实际运行的测试与视觉检查，并列出未验证项。

QUICK COLOR REFERENCE:

- text: `#1a1a1a`
- background: `#f8f6f3`
- gold: `#c9a96e`
- stone: `#8a7968`
- pale: `#e8e0d6`
- jade: `#85bd73`

EXAMPLE COMPONENT PROMPTS:

1. 做一个大理石奢华卡片：大理石白 #f8f6f3 填充、零圆角、1px rgba(201,169,110,0.2) 描边、内边距 48px、无阴影。标题 34px/300 Cormorant Garamond、字距 0.04em、色 #1a1a1a；正文 15px/300、行高 1.85。卡片之间用 1px rgba(201,169,110,0.3) 的古金线分隔，两端各收进 5%。页边留白 240px，背景可叠 5% 不透明度的细石纹（feTurbulence）。按钮透明底、1px 黑 40% 描边、零圆角、13px 字距 0.28em、padding 18px 40px，hover 时描边与文字转 #c9a96e。页面底色 #f8f6f3。
