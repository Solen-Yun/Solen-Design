# 新野兽派 — 风格参考

> 黑框、硬阴影、零圆角：界面由一块块压不扁的实体组成。

**Theme:** light

新野兽派从建筑取来态度：结构外露，材料不加装饰。网页上的做法是给每个元素一个 2px 到 4px 的纯黑外框、一层无模糊的偏移阴影、以及零圆角，让平面产生真实厚度。交互也必须是物理的——hover 时阴影变大、元素向左上抬起（Brutal Snap）；active 时元素位移量正好等于阴影偏移量，阴影归零，像被手掌压平（Physical Crushing）。颜色只有黑白打底，加四支高饱和强调色，每支承担一个固定职能，不做渐变、不做半透明。

## Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Ink | `#000000` | `--color-ink` | 所有边框、文字、硬阴影与反色区块。结构的全部重量都由它承担，不允许换成深灰。 |
| Paper | `#ffffff` | `--color-paper` | 页面画布与卡片填充。纯白是为了让黑框与阴影的对比拉到最大。 |
| Hot Pink | `#ff006e` | `--color-hot-pink` | 选中文字与主强调。也是卡片 hover 时阴影可切换的颜色。 |
| Acid Lime | `#ccff00` | `--color-acid-lime` | hover 强调底色。用于标签与主按钮的悬停底；背景过渡遵循通用 token，或具名组件单独声明的状态时长。不要使用渐变或 opacity 淡入淡出。 |
| Electric Cyan | `#00d9ff` | `--color-electric-cyan` | 数据、状态与次级面板的强调。和粉、绿同时出现时只占小面积。 |
| Tangerine | `#ff9500` | `--color-tangerine` | 警示与第四强调色。使用频率最低，全站不超过三处同时出现。 |

## Typography

### sans-serif — 所有标题，权重固定 900。标题的力量来自字重与紧缩字距，不来自字号堆叠。

- **Substitute:** Inter, 'Helvetica Neue', Arial, sans-serif
- **Weights:** 700, 900
- **Sizes:** 24, 32, 48, 64, 72
- **Line height:** 0.95 (display), 1.05 (headings), 1.6 (body)
- **Letter spacing:** -0.02em on display, 0.12em on uppercase labels

### mono — 正文、标签、按钮与数据。等宽字体让界面读起来像终端输出，是这套风格的第二识别点。

- **Substitute:** ui-monospace, SFMono-Regular, Menlo, Consolas, monospace
- **Weights:** 400, 700
- **Sizes:** 12, 14, 16
- **Line height:** 1.1 (display), 1.2 (headings), 1.6 (body)
- **Letter spacing:** -0.01em on display, 0.12em on uppercase labels

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|---|---|---|---|---|---|---|
| display | sans-serif | 900 | 72px | 0.95 | -0.02em | `--text-display` |
| heading-lg | sans-serif | 900 | 48px | 1 | -0.02em | `--text-heading-lg` |
| heading | sans-serif | 900 | 32px | 1.1 | -0.01em | `--text-heading` |
| subheading | sans-serif | 700 | 24px | 1.2 | — | `--text-subheading` |
| body | mono | 400 | 16px | 1.6 | — | `--text-body` |
| body-sm | mono | 400 | 14px | 1.6 | — | `--text-body-sm` |
| label | mono | 700 | 12px | 1.4 | 0.12em | `--text-label` |

## Spacing & Layout

**Base unit:** 8px
**Density:** compact

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
| cards | 0 |
| buttons | 0 |
| inputs | 0 |
| badges | 0 |

- **Page max-width:** 1280px
- **Section gap:** 80px
- **Card padding:** 24px
- **Element gap:** 16px

## Components

### Block Button

**Role:** 主行动按钮

白底、2px 墨黑描边、直角、4px 硬阴影（偏移 4px 4px，模糊 0）。字号 12px、字重 700、全大写、字距 0.12em、等宽；padding 12px 24px。hover 时阴影增到 10px、元素向左上位移 4px，背景转为酸柠绿，按 150ms ease-out 过渡。按下时元素右下位移 6px，阴影归零。

- **Sizes:** padding 12px 24px; label 12px
- **States:** hover: fill, shadow, and translate transition 150ms ease-out; active: translate 6px 6px, shadow none

### Brutal Card

**Role:** 内容卡片与商品卡

白底、2px 墨黑描边、直角、8px 硬阴影。内边距 24px，卡片间距 32px。hover 时元素上移 4px、阴影增到 10px，阴影色可切到荧光粉，过渡 150ms ease-out。

- **States:** hover: translate -4px -4px, shadow 10px

### Mono Label

**Role:** 分类标签与状态徽标

墨黑填充、白字、直角、无描边。12px 等宽、字重 700、全大写、字距 0.12em；padding 4px 8px。反色用途时改为白底黑框。

- **Sizes:** padding 4px 8px; label 12px

### Hard Input

**Role:** 表单输入

白底、2px 墨黑描边、直角、无阴影。14px 等宽、padding 12px 16px。聚焦时出现 4px 硬阴影并保持描边宽度不变，不改变尺寸以避免布局抖动。

- **States:** focus: 4px hard shadow, border width unchanged

### Marquee Bar

**Role:** 页面顶部或底部的滚动条

墨黑底、白字、直角、无阴影。16px 等宽、全大写、字距 0.12em、上下 padding 8px，内容横向匀速滚动，间隔用 4px 实心方块分隔。

## Do's and Don'ts

### Do

- 所有元素使用 2px 到 4px 纯黑边框，绝不用灰色边框
- 阴影必须是零模糊的硬偏移，4px 与 8px 两档
- 保持直角，任何圆角都会削弱实体感
- hover 增大阴影，active 位移等于阴影偏移并把阴影归零
- 标题固定 900 字重，正文用等宽字体
- 共享过渡 token 为 transition-all duration-200；本页具名 showcase 组件示例采用 150ms ease-out

### Don't

- 不要使用任何圆角（rounded-lg、rounded-full 等）
- 不要用模糊阴影（shadow-lg、shadow-xl），它们会毁掉物理感
- 不要用渐变，包括按钮与背景
- 不要用灰色或半透明边框
- 不要用 opacity 淡入淡出；区分共享 token 的 200ms 与具名 showcase 组件的 150ms 覆盖
- 不要在 active 时只位移不归零阴影

## Surfaces

| Level | Name | Value | Purpose |
|---|---|---|---|
| 0 | Paper | `#ffffff` | 页面画布 |
| 1 | Slab | `#f4f4f4` | 次级面板与分区底 |

## Elevation

- **Hard offset sm:** `4px 4px 0 0 #000000`
- **Hard offset lg:** `8px 8px 0 0 #000000`
- **Hover lift:** `10px 10px 0 0 #000000`
- **Pressed:** `none`

## Imagery

不用摄影。用粗描边的几何图形、点阵与棋盘格、像素化的图标，全部单色或四支强调色之一。任何图像都必须能画成 2px 线条与实心块，出现渐变或柔光就破坏风格。

## Layout

12 栏、上限 1280px，容器内边距 16px 到 32px。区块间距 80px，卡片间距 32px。允许元素相对网格偏移 4px 到 8px 制造碰撞感，但同一区块内偏移方向保持一致。标题与正文的对齐必须是硬对齐，不做居中柔化。

## Agent Prompt Guide

### Implementation Contract

- 以用户请求中的页面、用户任务和真实内容为依据，只实施指定范围；标明缺失的业务信息，不编造数据或能力。
- 先检查现有项目、技术栈与组件；沿用项目结构、路由和依赖，复用已有组件，不重建未要求的页面或功能。
- 沿用项目断点，调整窄屏与桌面的网格和留白；保留信息层级，避免意外横向溢出。
- 对本次涉及的交互，处理键盘焦点与减少动态效果；补齐适用的禁用、加载、空内容与错误状态。
- 完成后按项目现有脚本检查，仅报告实际运行的测试与视觉检查，并列出未验证项。

QUICK COLOR REFERENCE:

- text: `#000000`
- background: `#ffffff`
- border: `#000000`
- accent: `#ff006e`
- hoverFill: `#ccff00`
- secondaryPanel: `#f4f4f4`

EXAMPLE COMPONENT PROMPTS:

1. 做一个主按钮：白底、2px 纯黑描边、直角、box-shadow 4px 4px 0 0 #000。文字 12px 等宽、700、全大写、字距 0.12em，padding 12px 24px。hover 时 box-shadow 变 10px 10px 0 0 #000，transform 位移 -4px -4px，背景过渡到 #ccff00，transition 150ms ease-out。active 时 transform 位移 6px 6px，box-shadow 变 none。
2. 做一个卡片网格：三列，间距 32px。每张卡白底、2px 纯黑描边、直角、8px 硬阴影，内边距 24px，内部依次是 12px 全大写等宽标签（墨黑底白字）、32px 900 字重标题、14px 等宽正文。hover 时卡片位移 -4px -4px，阴影变 10px。
