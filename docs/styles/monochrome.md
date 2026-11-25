# 单色极简 — 风格参考

> 没有颜色：层次全靠五档灰、字重与负空间。

**Theme:** light

单色极简是最严格的减法：整个页面只有黑、白与三档灰（#111111、#444444、#666666、#999999、#cccccc、#e5e5e5）。层级靠三件事建立——字重对比（300 对 500）、灰度深浅、以及负空间。它禁止任何带色相的颜色、禁止全圆角、禁止重阴影、禁止渐变。节奏刻意放慢：过渡 700ms 的 ease-in-out，而且只改颜色不改位置，因为在这套语言里位移本身就是噪音。

## Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Ink | `#111111` | `--color-ink` | 主文字、主按钮与最深区块。整套风格的唯一「强调」。 |
| Paper | `#fafafa` | `--color-paper` | 页面底。极浅的灰白，让卡片能靠 #f5f5f5 分层。 |
| Deep Grey | `#444444` | `--color-deep-grey` | hover 后的次级文字，比 #666666 再深一档。 |
| Mid Grey | `#666666` | `--color-mid-grey` | 正文与说明文字。与 #111111 形成第一层对比。 |
| Light Grey | `#999999` | `--color-light-grey` | 元数据与占位符，第三层级。 |
| Border Grey | `#e5e5e5` | `--color-border-grey` | 所有 1px 分隔线。几乎不可见，但缺了结构会散。 |

## Typography

### Inter — 全站唯一字体，只用 300 到 500。字重差是这套风格建立层级的主要手段。

- **Substitute:** 'Helvetica Neue', system-ui, sans-serif
- **Weights:** 300, 400, 500
- **Sizes:** 11, 13, 16, 22, 32, 44
- **Line height:** 1.15 (display), 1.3 (headings), 1.8 (body)
- **Letter spacing:** -0.01em on display, 0.2em on uppercase labels

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|---|---|---|---|---|---|---|
| display | — | 300 | 44px | 1.15 | -0.01em | `--text-display` |
| heading | — | 300 | 32px | 1.25 | — | `--text-heading` |
| subheading | — | 400 | 22px | 1.35 | — | `--text-subheading` |
| body-lg | — | 300 | 16px | 1.8 | — | `--text-body-lg` |
| body | — | 300 | 13px | 1.8 | — | `--text-body` |
| label | — | 500 | 11px | 1.5 | 0.2em | `--text-label` |

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

### Border Radius

| Element | Value |
|---|---|
| cards | 2px |
| buttons | 2px |
| inputs | 2px |

- **Page max-width:** 1040px
- **Section gap:** 160px
- **Card padding:** 40px
- **Element gap:** 32px

## Components

### Mono Button

**Role:** 主行动按钮

墨色填充、纸色文字、2px 圆角、无描边、无阴影，11px/500、全大写、字距 0.2em、padding 16px 32px。hover 时填充转 #2a2a2a；按下再暗一档。过渡 700ms ease-in-out，只改颜色。

- **Sizes:** padding 16px 32px; label 11px
- **States:** hover: #2a2a2a; active: darker still

### Grey Card

**Role:** 内容卡

#f5f5f5 填充、2px 圆角、1px #e5e5e5 描边、内边距 40px，无阴影。标题 32px/300 墨色、字距微开；正文 13px/300 中灰、行高 1.8。hover 时填充转 #ebebeb、描边转 #cccccc、正文转 #444444，全部在 700ms 内完成，元素不动。

### Hairline Divider

**Role:** 极细分隔线

1px #e5e5e5 横线，横跨内容宽，不做渐变淡出。它是这套风格唯一的结构工具，比留白更明确、比阴影更安静。

### Ghost Field

**Role:** 输入框

纸色填充、2px 圆角、1px #e5e5e5 描边、padding 14px 16px、13px 字。占位符 #999999。聚焦时描边转墨色并保持 1px，不加外环、不改背景。

### Weight Ladder

**Role:** 字重层级规则

标题只用 300，正文只用 300，标签与按钮用 500，元数据用 400。禁止出现 600 以上字重——一旦出现，灰度的细腻感会被压死。层级靠字号、灰度与留白三重叠加。

## Do's and Don'ts

### Do

- 只用五到六档灰，无色相
- 层级靠字重与灰度
- 字重不超过 500
- 过渡 700ms，只改颜色
- 边框 1px #e5e5e5
- 留白作为主要构图手段

### Don't

- 不要用任何带色相的颜色
- 不要用全圆角
- 不要用重阴影
- 不要用渐变
- 不要在 hover 时位移元素
- 不要用 600 以上的字重

## Surfaces

| Level | Name | Value | Purpose |
|---|---|---|---|
| 0 | Paper | `#fafafa` | 页面底 |
| 1 | Panel | `#f5f5f5` | 卡片 |
| 2 | Hover Panel | `#ebebeb` | 卡片 hover |

## Elevation

- **None:** `none — a 1px #e5e5e5 border does the work`
- **Max allowed:** `0 1px 2px rgba(17,17,17,0.04)`

## Imagery

黑白摄影与建筑摄影：必须有明确的形状与光影结构，不能靠颜色成立。允许灰度图注。不使用彩色图像、插画与图标装饰。

## Layout

上限 1040px、容器内边距 32px，区块间距 160px。以负空间为主要构图手段，元素间距至少 32px。单栏或严格对齐的双栏，禁止错位与旋转。

## Agent Prompt Guide

### Implementation Contract

- 以用户请求中的页面、用户任务和真实内容为依据，只实施指定范围；标明缺失的业务信息，不编造数据或能力。
- 先检查现有项目、技术栈与组件；沿用项目结构、路由和依赖，复用已有组件，不重建未要求的页面或功能。
- 沿用项目断点，调整窄屏与桌面的网格和留白；保留信息层级，避免意外横向溢出。
- 对本次涉及的交互，处理键盘焦点与减少动态效果；补齐适用的禁用、加载、空内容与错误状态。
- 完成后按项目现有脚本检查，仅报告实际运行的测试与视觉检查，并列出未验证项。

QUICK COLOR REFERENCE:

- text: `#111111`
- background: `#fafafa`
- card: `#f5f5f5`
- muted: `#666666`
- light: `#999999`
- border: `#e5e5e5`

EXAMPLE COMPONENT PROMPTS:

1. 做一个单色极简卡片：背景 #f5f5f5、2px 圆角、1px #e5e5e5 描边、内边距 40px、无阴影。标题 32px/300 #111111、字距微开；正文 13px/300 #666666、行高 1.8。hover 时背景 #ebebeb、描边 #cccccc、正文 #444444，transition 700ms ease-in-out，元素不位移。页面底色 #fafafa。禁止出现任何带色相的颜色。
