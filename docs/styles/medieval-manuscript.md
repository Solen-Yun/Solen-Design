# 中世纪手抄本 — 风格参考

> 羊皮纸、双线边框、金红首字：一页被手指翻旧的书。

**Theme:** light

中世纪手抄本模仿泥金装饰手稿：羊皮纸底（#f0e6d0）、金（#c9a74e）与深红（#8b1a1a）作装饰与标题、深棕（#3d2b1f）作正文，边框用 border-double 或双层实线（外层 3 到 4px、内层 1px）模拟手抄本的双线框，标题首字放大到 5xl 以上做首字下沉，全页衬线保证古典一致。它的层次全靠装饰性边框与首字，不靠阴影与颜色对比。

## Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Parchment | `#f0e6d0` | `--color-parchment` | 页面底。泛黄的纸，所有内容写在它上面。 |
| Deep Red | `#8b1a1a` | `--color-deep-red` | 标题与重要文字。抄本里的朱砂墨。 |
| Gold | `#c9a74e` | `--color-gold` | 边框、首字底与装饰。泥金装饰的颜色。 |
| Deep Brown | `#3d2b1f` | `--color-deep-brown` | 正文与辅助边框。像旧墨水的棕黑。 |
| Forest | `#2d4a2d` | `--color-forest` | 藤蔓装饰与次级强调。 |
| Bright Green | `#6bc15e` | `--color-bright-green` | 首字内部的叶片点缀，出现频率最低。 |

## Typography

### UnifrakturMaguntia — 标题用哥特体或高对比装饰衬线，正文用可读衬线。哥特体只做标题与首字。

- **Substitute:** 'Cinzel', Georgia, serif
- **Weights:** 400
- **Sizes:** 20, 26, 34, 44, 58, 76
- **Line height:** 1.15 (display), 1.25 (headings), 1.7 (body)
- **Letter spacing:** 0.02em on display, 0.16em on uppercase labels

### EB Garamond — 正文与说明。行高 1.8，像手抄本的正文栏。

- **Substitute:** Garamond, 'Songti SC', serif
- **Weights:** 400, 600
- **Sizes:** 16, 18, 21
- **Line height:** 1.5 (display), 1.5 (headings), 1.8 (body)
- **Letter spacing:** 0.01em on display, 0.16em on uppercase labels

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|---|---|---|---|---|---|---|
| display | UnifrakturMaguntia | 400 | 76px | 1.15 | 0.02em | `--text-display` |
| heading | UnifrakturMaguntia | 400 | 58px | 1.2 | — | `--text-heading` |
| subheading | UnifrakturMaguntia | 400 | 44px | 1.25 | — | `--text-subheading` |
| body-lg | EB Garamond | 400 | 21px | 1.75 | — | `--text-body-lg` |
| body | EB Garamond | 400 | 18px | 1.8 | — | `--text-body` |
| label | EB Garamond | 600 | 16px | 1.6 | 0.16em | `--text-label` |

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
| cards | 0 |
| buttons | 0 |
| initials | 4px |

- **Page max-width:** 960px
- **Section gap:** 128px
- **Card padding:** 40px
- **Element gap:** 24px

## Components

### Double Frame

**Role:** 双线边框（核心组件）

外层 3px 深棕实线、内层 1px 金实线，两层之间留 8px 羊皮纸色空隙（用 padding + 内层描边实现，或双 border 配 outline-offset）。零圆角。四角各放一个 16px 的角饰（几何卷草或十字）。整个内容写在框内，像一页抄本。

### Illuminated Initial

**Role:** 泥金首字（签名）

段落首字母 float: left、字号为正文的 4 倍、行高对齐三到四行，字体内填金 18% 底、外描 2px 深红、四角各有 2px 的深棕角线。首字内部可放极简的卷草或叶片线条（墨绿）。每个内容区块只允许一次。

### Rubric Label

**Role:** 朱批标签

16px/600、字距 0.16em、深红文字、无底无边框。它是抄本里用红墨写的小标题，用在区块上方 8px 处与段落之间的批注。

### Parchment Button

**Role:** 行动按钮

羊皮纸填充、深棕文字、零圆角、3px 深棕描边加内层 1px 金线（双层）、16px/600、字距 0.16em、padding 14px 32px，无阴影。hover 时底层填充转金 18%、描边转深红；按下时整体位移 1px 2px。过渡 250ms ease-out。

- **Sizes:** padding 14px 32px; label 16px
- **States:** hover: gold ground, red border; active: offset 1px 2px

### Margin Vine

**Role:** 页边藤蔓

沿页边（或区块侧边）垂直延伸的 1px 墨绿藤蔓线，带 6 到 10 片小叶（各 8px）与 2 到 3 朵深红小花。它模拟抄本页边的装饰栏，单屏最多两条。

## Do's and Don'ts

### Do

- 羊皮纸底配金与深红
- 边框必须是双线（3px 加 1px）
- 标题首字放大到 4 倍
- 全页衬线
- 页边有藤蔓装饰
- 正文行宽不超过 60 字符

### Don't

- 不要用单线边框
- 不要用哥特体排正文
- 不要用写实摄影
- 不要用圆角
- 不要用阴影
- 不要每段都有首字下沉

## Surfaces

| Level | Name | Value | Purpose |
|---|---|---|---|
| 0 | Parchment | `#f0e6d0` | 页面底 |
| 1 | Gold Ground | `rgba(201,167,78,0.18)` | 首字与装饰底 |
| 2 | Ink Block | `#3d2b1f` | 深色块 |

## Elevation

- **None:** `none — the double frame carries all depth`
- **Max allowed:** `inset 0 0 40px rgba(61,43,31,0.06)`

## Imagery

手抄本插图、木刻版画、泥金装饰、羊皮纸纹理。图像必须有平面化的线稿与金红配色，可加金箔底。不使用写实摄影、现代插画与彩色渐变图像。

## Layout

上限 960px、容器内边距 32px，区块间距 128px。整页包在一个 Double Frame 里，页边保留装饰栏。正文单栏、行宽不超过 60 字符，像抄本的正文块。

## Agent Prompt Guide

### Implementation Contract

- 以用户请求中的页面、用户任务和真实内容为依据，只实施指定范围；标明缺失的业务信息，不编造数据或能力。
- 先检查现有项目、技术栈与组件；沿用项目结构、路由和依赖，复用已有组件，不重建未要求的页面或功能。
- 沿用项目断点，调整窄屏与桌面的网格和留白；保留信息层级，避免意外横向溢出。
- 对本次涉及的交互，处理键盘焦点与减少动态效果；补齐适用的禁用、加载、空内容与错误状态。
- 完成后按项目现有脚本检查，仅报告实际运行的测试与视觉检查，并列出未验证项。

QUICK COLOR REFERENCE:

- text: `#3d2b1f`
- background: `#f0e6d0`
- red: `#8b1a1a`
- gold: `#c9a74e`
- forest: `#2d4a2d`
- brown: `#3d2b1f`

EXAMPLE COMPONENT PROMPTS:

1. 做一个中世纪手抄本版面：羊皮纸底 #f0e6d0、正文 EB Garamond 18px、行高 1.8、色 #3d2b1f。外层 3px solid #3d2b1f 边框加内层 1px solid #c9a74e（两层之间留 8px 空隙），四角各一个 16px 的金色角饰，零圆角。标题用哥特体 58px、色 #8b1a1a。首段首字母放大到 4 倍、金 18% 底、2px 深红描边。区块上方放 16px 字距 0.16em 的深红朱批标签。页边加一条 1px 墨绿藤蔓带小叶片。全页无阴影、无圆角。
