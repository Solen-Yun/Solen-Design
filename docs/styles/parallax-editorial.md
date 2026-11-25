# 视差杂志 — 风格参考

> 暖纸上的长文，前后景以不同速度移动，翻页被拉成一段旅程。

**Theme:** light

视差杂志把编辑排版与物理景深缝起来：暖纸底（#f5f0e6）配近黑墨正文（#1a1712），首字下沉 3 到 4 行高并用砖红，章节号与引文也用同一支砖红，其余全是墨。视差只用 transform 做——绝不能在 scroll 事件里改 top、margin 或 height，那会触发重排并卡顿。景深层级最多三级，因为再多景深就浑浊。正文永远不做视差主体，行宽不超过 75 字符；移动端必须削弱或关闭视差，否则性能和眩晕都会出问题。

## Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Ink | `#1a1712` | `--color-ink` | 正文与标题。带暖调的近黑，像印刷油墨。 |
| Warm Paper | `#f5f0e6` | `--color-warm-paper` | 页面底。偏黄的纸色，绝不能用纯白或冷白。 |
| Brick Red | `#b3401f` | `--color-brick-red` | 唯一强调色，只用于首字、章节号、引文与链接。绝不能铺成大色块。 |
| Deep Umber | `#2e2a22` | `--color-deep-umber` | 深色区块与引文底，是墨的暖化版本。 |
| Sand | `#c9bba0` | `--color-sand` | 次级区块与图片衬底，用于在不破坏纸感的前提下分区。 |

## Typography

### Source Serif — 正文与标题都用衬线。行高 1.75，行长控制在 75 字符以内，这是视差不干扰阅读的前提。

- **Substitute:** Georgia, 'Songti SC', serif
- **Weights:** 400, 600
- **Sizes:** 14, 16, 19, 26, 34, 48
- **Line height:** 1.15 (display), 1.3 (headings), 1.75 (body)
- **Letter spacing:** -0.01em on display, 0.14em on uppercase labels

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|---|---|---|---|---|---|---|
| display | Source Serif | 600 | 48px | 1.15 | -0.01em | `--text-display` |
| heading | Source Serif | 600 | 34px | 1.25 | — | `--text-heading` |
| subheading | Source Serif | 400 | 26px | 1.35 | — | `--text-subheading` |
| body-lg | Source Serif | 400 | 19px | 1.75 | — | `--text-body-lg` |
| body | Source Serif | 400 | 16px | 1.75 | — | `--text-body` |
| label | Source Serif | 600 | 14px | 1.5 | 0.14em | `--text-label` |

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
| cards | 4px |
| buttons | 4px |
| images | 2px |

- **Page max-width:** 960px
- **Section gap:** 128px
- **Card padding:** 32px
- **Element gap:** 24px

## Components

### Drop Cap

**Role:** 首字下沉（识别核心）

段落首字母 float: left、字号约为正文的 3.4 倍（行高对齐三到四行）、颜色砖红、右与下各留 8px、字体同正文衬线。每个长文区块只允许一次，且仅用于第一个段落。

### Parallax Layer

**Role:** 视差层

滚动时只用 transform: translate3d(0, Ypx, 0) 移动，Y 由滚动进度乘速率得出（背景 0.15，中景 0.30，前景 1.0）。绝不能在 scroll 处理器里读或写布局属性（offsetTop、getBoundingClientRect、top、margin、height）。一屏最多三个速率层级。prefers-reduced-motion 时所有层归零。

- **Sizes:** rates 0.15 / 0.30 / 1.0

### Sticky Interlock

**Role:** 图文锁定（sticky 交叠）

图片容器 sticky top-24，高度 60vh；右侧正文正常滚动并逐段覆盖图片。图片不缩放、不淡出，只靠位置关系产生「翻页」的错觉。移动端取消 sticky，改为图文上下排列。

### Chapter Number

**Role:** 章节号

砖红色、14px/600、字距 0.14em、全大写、位于标题上方 16px，格式为「第一章」或「01」。可配一条 24px 的砖红短线在左侧。

### Pull Quote

**Role:** 引文

左侧 3px 砖红竖线、内边距 24px 32px、引文 26px/400 衬线斜体、行高 1.5、墨色，下方 14px 的署名。它随正文一起滚动，不参与视差。

## Do's and Don'ts

### Do

- 视差只用 transform
- 一屏最多三级视差速率
- 正文不做视差主体，行宽不超 75 字符
- 砖红只给首字、章节号、引文、链接
- 暖纸底，绝不用纯白
- prefers-reduced-motion 时全部归零

### Don't

- 不要在 scroll 里改 top/margin/height
- 不要超过三级视差
- 不要让视差压过可读性
- 不要在移动端保留强视差
- 不要用多个强调色或大面积砖红
- 不要省略 reduced-motion 降级

## Surfaces

| Level | Name | Value | Purpose |
|---|---|---|---|
| 0 | Warm Paper | `#f5f0e6` | 页面底 |
| 1 | Sand | `rgba(201,187,160,0.30)` | 次级区块 |
| 2 | Deep Umber | `#2e2a22` | 深色区块与引文 |

## Elevation

- **None:** `none — the paper has no thickness`
- **Image:** `0 12px 32px rgba(26,23,18,0.10)`

## Imagery

编辑类摄影：人物、场所、物件，暖调、有纸感、可做轻微颗粒。图片以 4:5 或 3:2 出现，配 sticky 交叠。不使用冷光摄影、纯白背景图与插画。

## Layout

上限 960px、容器内边距 24px，区块间距 128px。正文单栏、行宽不超过 75 字符；图片可跨到 100% 宽但文字不动。章节之间用 64px 的留白加一个砖红章节号。

## Agent Prompt Guide

### Implementation Contract

- 以用户请求中的页面、用户任务和真实内容为依据，只实施指定范围；标明缺失的业务信息，不编造数据或能力。
- 先检查现有项目、技术栈与组件；沿用项目结构、路由和依赖，复用已有组件，不重建未要求的页面或功能。
- 沿用项目断点，调整窄屏与桌面的网格和留白；保留信息层级，避免意外横向溢出。
- 对本次涉及的交互，处理键盘焦点与减少动态效果；补齐适用的禁用、加载、空内容与错误状态。
- 完成后按项目现有脚本检查，仅报告实际运行的测试与视觉检查，并列出未验证项。

QUICK COLOR REFERENCE:

- text: `#1a1712`
- background: `#f5f0e6`
- accent: `#b3401f`
- dark: `#2e2a22`
- sand: `#c9bba0`
- border: `rgba(26,23,18,0.15)`

EXAMPLE COMPONENT PROMPTS:

1. 做一个视差杂志文章页：暖纸底 #f5f0e6、正文墨色 #1a1712、16px 衬线、行高 1.75、行宽不超过 75 字符。首段首字母下沉：float left、字号 3.4 倍、色 #b3401f、右侧与下方各留 8px。图片容器 sticky top-24、高度 60vh，正文滚过覆盖它。视差只用 transform: translate3d(0, Ypx, 0)，速率 0.15/0.30/1.0，一屏最多三层；不要在 scroll 事件里读写布局属性。章节号用 14px/600 #b3401f、字距 0.14em。
