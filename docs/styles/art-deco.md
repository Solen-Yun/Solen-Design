# 装饰艺术风格 — 风格参考

> 金色几何线条压在深底上，对称到近乎仪式感。

**Theme:** dark

装饰艺术来自 1920 到 30 年代：金色、深蓝黑、严格的轴对称、几何化的装饰线条（放射、阶梯、扇形）。它的规则是三条禁令——不许鲜艳的现代配色、不许不对称的混乱布局、不许现代无衬线字体，也不许省略装饰元素。界面上最有效的做法是：深底（#1a1a2e）配金色描边（#d4af37 的 1px 或 2px），标题用衬线加大字距，装饰用 1px 的金线构成上下对称的边框。

## Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Gold | `#d4af37` | `--color-gold` | 描边、标题与小面积装饰。整套风格的奢华感全部来自它。 |
| Midnight | `#1a1a2e` | `--color-midnight` | 页面底。深蓝黑而不是纯黑，让金色显得更暖。 |
| Antique Gold | `#c9a227` | `--color-antique-gold` | 次级描边与压印效果，比主金暗一档。 |
| Slate Navy | `#2d2d44` | `--color-slate-navy` | 卡片与面板。只比底色亮一点，保持整体的沉。 |
| Ivory | `#f5f5dc` | `--color-ivory` | 正文与浅色区块。比纯白柔，像旧信纸。 |
| Emerald | `#4bc542` | `--color-emerald` | 唯一的第二色，只用于极小的宝石式点缀。 |

## Typography

### Cinzel — 标题与字标。全大写、字距 0.12 到 0.2em，字形本身带 20 年代的纪念碑感。

- **Substitute:** 'Trajan Pro', Georgia, serif
- **Weights:** 400, 700
- **Sizes:** 14, 18, 24, 36, 48, 64
- **Line height:** 1.1 (display), 1.2 (headings), 1.7 (body)
- **Letter spacing:** 0.12em on display, 0.2em on uppercase labels

### Georgia — 正文。衬线是唯一合法的正文字体，无衬线在这套语言里是不合时代的。

- **Substitute:** 'Songti SC', serif
- **Weights:** 400, 700
- **Sizes:** 14, 16, 18
- **Line height:** 1.4 (display), 1.4 (headings), 1.7 (body)
- **Letter spacing:** 0.01em on display, 0.2em on uppercase labels

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|---|---|---|---|---|---|---|
| display | Cinzel | 700 | 64px | 1.1 | 0.12em | `--text-display` |
| heading-lg | Cinzel | 700 | 48px | 1.15 | 0.12em | `--text-heading-lg` |
| heading | Cinzel | 400 | 36px | 1.2 | 0.1em | `--text-heading` |
| subheading | Cinzel | 400 | 24px | 1.3 | 0.08em | `--text-subheading` |
| body | Georgia | 400 | 16px | 1.7 | — | `--text-body` |
| label | Cinzel | 400 | 14px | 1.5 | 0.2em | `--text-label` |

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

### Border Radius

| Element | Value |
|---|---|
| cards | 0 |
| buttons | 0 |
| inputs | 0 |
| medallions | 999px |

- **Page max-width:** 1080px
- **Section gap:** 128px
- **Card padding:** 32px
- **Element gap:** 24px

## Components

### Gold Frame

**Role:** 对称金线边框（识别核心）

在内容块外侧用两层 1px 金线（#d4af37）：外层距边 0，内层距边 8px，四角各加一个 12px 的 45 度短斜线作为角饰。上下边框比左右粗一档（2px 对 1px），强化 20 年代的框式构图。框内保持纯粹，不加其他装饰。

### Deco Button

**Role:** 行动按钮

透明底、1px 金描边、零圆角、金色文字全大写、14px/400、字距 0.2em、padding 14px 36px。hover 时填充金 12%、文字转象牙、外发光 0 0 12px 金 35%；按下时填充升到 20%。过渡 250ms ease-out。

- **Sizes:** padding 14px 36px; label 14px
- **States:** hover: fill 12%, ivory text, glow; active: fill 20%

### Deco Card

**Role:** 内容卡与菜单卡

石板蓝底、零圆角、1px 暗金 60% 描边、内边距 32px。顶部居中放一个 24px 的几何装饰（扇形或放射线，用 1px 金线画），标题 24px/400 全大写 0.08em 居中，正文 16px 衬线象牙。整卡上下留 32px 金线分隔。

### Sunburst Divider

**Role:** 放射状分隔装饰

由一条水平金线与 7 到 9 条向下辐射的短线（各 8 到 12px，间隔 12 度）组成，线宽 1px，宽 120 到 200px，居中置于区块之间。它是这套风格的签名装饰，单屏最多两处。

### Ivory Panel

**Role:** 浅色区块

象牙底、零圆角、四边各 1px 暗金描边、内边距 48px，内部文字转深夜蓝。用于打破全暗的页面，但整页不超过一块。

## Do's and Don'ts

### Do

- 严格轴对称，一切居中
- 金色只用 1px 与 2px 细线
- 标题衬线、全大写、宽字距
- 装饰必须有：角饰、放射、扇形
- 零圆角，只用直角
- 深底配象牙文字

### Don't

- 不要用鲜艳的现代配色
- 不要用不对称的混乱布局
- 不要用现代无衬线字体
- 不要省略装饰元素
- 不要用大圆角
- 不要一屏放两块象牙面板

## Surfaces

| Level | Name | Value | Purpose |
|---|---|---|---|
| 0 | Midnight | `#1a1a2e` | 页面底 |
| 1 | Slate Navy | `#2d2d44` | 卡片与面板 |
| 2 | Ivory | `#f5f5dc` | 浅色区块 |

## Elevation

- **None:** `none — 1px gold lines do the separating`
- **Gold glow:** `0 0 12px rgba(212,175,55,0.35)`

## Imagery

黑白摄影与几何装饰图形：放射线、阶梯形、扇形、对称花纹。允许把照片处理成金调双色调。不使用彩色摄影、现代插画与不对称构图。

## Layout

上限 1080px、容器内边距 24px，区块间距 128px。一切严格居中对称，标题与内容都走中轴线。装饰线从页面边缘延伸到内容边缘，形成框式构图。禁止左对齐的偏置布局。

## Agent Prompt Guide

### Implementation Contract

- 以用户请求中的页面、用户任务和真实内容为依据，只实施指定范围；标明缺失的业务信息，不编造数据或能力。
- 先检查现有项目、技术栈与组件；沿用项目结构、路由和依赖，复用已有组件，不重建未要求的页面或功能。
- 沿用项目断点，调整窄屏与桌面的网格和留白；保留信息层级，避免意外横向溢出。
- 对本次涉及的交互，处理键盘焦点与减少动态效果；补齐适用的禁用、加载、空内容与错误状态。
- 完成后按项目现有脚本检查，仅报告实际运行的测试与视觉检查，并列出未验证项。

QUICK COLOR REFERENCE:

- text: `#f5f5dc`
- background: `#1a1a2e`
- card: `#2d2d44`
- gold: `#d4af37`
- antique: `#c9a227`
- emerald: `#4bc542`

EXAMPLE COMPONENT PROMPTS:

1. 做一个装饰艺术风格卡片：背景 #2d2d44、零圆角、1px rgba(201,162,39,0.6) 描边、内边距 32px。顶部居中放一个用 1px #d4af37 画的扇形装饰（24px 高）。标题 24px Cinzel 全大写 0.08em 居中、色 #d4af37；正文 16px 衬线、行高 1.7、色 #f5f5dc。整卡上下各留 32px 的 1px 金线。页面底色 #1a1a2e。
