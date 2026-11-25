# 玻璃拟态 — 风格参考

> 夜色里的光学：玻璃没有自己的颜色，它只借用、弯曲、柔化背后的光。

**Theme:** dark

玻璃拟态的本质是光学，不是配色。真实玻璃是无色的，它从内容层取色、保持自身中性，这也是所有系统级玻璃效果共同的原则。整套系统由三件事构成：一是深墨夜景底加两到三个大半径柔光斑，玻璃必须有东西可模糊；二是面板本身只用 5% 到 12% 的白，配 40px 到 60px 的 backdrop-blur 与 180% 的 backdrop-saturate；三是光必须有方向——顶边 1px 白色内高光、底边 1px 深色内暗缘、外层深阴影，三层同时存在才有厚度。唯一允许的颜色是香槟金，只给主 CTA 与关键数字。

## Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Night Deep | `#060a13` | `--color-night-deep` | 最深一层底，用于全屏背景与最底层区块。玻璃浮在它上面才有对比。 |
| Night | `#0b1322` | `--color-night` | 默认页面底色。比深夜底亮一档，用来区分相邻区块而不引入第二条色带。 |
| Night Steel | `#16233a` | `--color-night-steel` | 次级面板与输入框底。用于需要在玻璃下层再分一层的地方。 |
| Moon Steel | `#33517a` | `--color-moon-steel` | 次级文字、图表对比与分隔线。是夜景里最接近「结构线」的颜色。 |
| Moonlight | `#7c9cc4` | `--color-moonlight` | 高光文字、图标与数据点。用于需要发亮但不抢主 CTA 的位置。 |
| Champagne | `#e4b863` | `--color-champagne` | 全站唯一强调色。只给主 CTA、关键数字与最重要的一条链接。 |
| Glass Fill | `rgba(255,255,255,0.08)` | `--color-glass-fill` | 面板填充。始终半透明，绝不超过 15%，否则退化成实心色块。 |

## Typography

### Inter — 全站唯一字体。层级靠字重（400/500/600）与字号，不靠第二套字体。

- **Substitute:** SF Pro Display, system-ui, -apple-system, sans-serif
- **Weights:** 400, 500, 600
- **Sizes:** 12, 14, 16, 24, 40, 64
- **Line height:** 1.05 (display), 1.15 (headings), 1.6 (body)
- **Letter spacing:** -0.02em on display, 0.14em on uppercase labels

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|---|---|---|---|---|---|---|
| display | Inter | 600 | 64px | 1.05 | -0.02em | `--text-display` |
| heading | Inter | 600 | 40px | 1.15 | -0.01em | `--text-heading` |
| subheading | Inter | 500 | 24px | 1.3 | — | `--text-subheading` |
| body-lg | Inter | 400 | 16px | 1.6 | — | `--text-body-lg` |
| body | Inter | 400 | 14px | 1.6 | — | `--text-body` |
| label | Inter | 500 | 12px | 1.4 | 0.14em | `--text-label` |

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
| cards | 24px |
| panels | 32px |
| buttons | 16px |
| inputs | 14px |
| pills | 999px |

- **Page max-width:** 1280px
- **Section gap:** 128px
- **Card padding:** 32px
- **Element gap:** 16px

## Components

### Glass Panel

**Role:** 所有内容容器：卡片、面板、弹层

白色 8% 填充、40px backdrop-blur、180% backdrop-saturate、1px 白色 15% 描边、24px 圆角。阴影必须三层同时存在：外层 0 16px 40px 深色、顶边 inset 0 1px 0 白色 22%、底边 inset 0 -1px 0 深色 35%。内边距 32px。hover 时填充升到 14%、描边到 30%、阴影升到 64px 档、面板上浮 2px，过渡 500ms cubic-bezier(0.16, 1, 0.3, 1)。

- **Sizes:** padding 32px; radius 24px
- **States:** hover: fill 8% to 14%, border 15% to 30%, translateY -2px

### Champagne CTA

**Role:** 主行动按钮，全页只允许一个

香槟金填充、深墨文字、999px 全圆角、无描边。16px 字体、500 字重、padding 14px 28px。hover 时填充提到 92% 不透明度、上浮 1px、加一层 0 12px 32px 金色 25% 的光晕，过渡 500ms 同一缓动。

- **Sizes:** padding 14px 28px; radius 999px
- **States:** hover: lift 1px, glow; focus-visible: 2px champagne outline, 2px offset

### Glass Input

**Role:** 表单输入与搜索框

透明底、1px 白色 15% 描边、14px 圆角、无外阴影。内边距 12px 16px、14px 字体、占位符用月光钢。聚焦时描边升到 40%，并加一圈 0 0 0 3px 白色 8% 的外环，不改变尺寸。

- **States:** focus: border 40%, 3px outer ring

### Stat Tile

**Role:** 关键数字与仪表盘指标

玻璃面板的轻量版：白色 5% 填充、24px 模糊、16px 圆角、内边距 24px。上方 12px 全大写 0.14em 标签用月光钢，下方 40px 数字用 600 字重白色，数字下方留 8px 放趋势说明。数字本身不允许用香槟金，除非它是页面上唯一的强调。

### Night Nav

**Role:** 顶部导航

高 72px，白色 4% 填充、20px 模糊、仅底部 1px 白色 10% 描边。左侧字标 16px 500 字重，中间链接 14px 月光钢、hover 转月光，右侧放一个香槟金 CTA。滚动超过一屏后填充升到 8%。

## Do's and Don'ts

### Do

- 背景必须先有光：深墨底加两到三个大半径柔光斑
- 玻璃面板只用 5% 到 12% 的白，绝不超 15%
- 模糊 40px 起，并始终叠加 180% 饱和度增强
- 阴影必须三层：外层深阴影、顶边白色内高光、底边深色内暗缘
- 唯一强调色香槟金只给主 CTA 与关键数字
- 圆角 16px 起，面板用 24px 到 32px
- 过渡统一 500ms 与 cubic-bezier(0.16, 1, 0.3, 1)

### Don't

- 不要用紫粉 AI 渐变背景（#667eea、#764ba2、#f093fb 一类）
- 不要在纯色平面背景上用玻璃，没有可模糊的东西
- 不要给玻璃面板本身上色，颜色属于背景
- 不要用 backdrop-blur-sm 或低于 40px 的模糊
- 不要省略 backdrop-saturate
- 不要用不透明填充（bg-white、bg-black）
- 不要用直角或小于 16px 的圆角
- 不要用单层扁平阴影
- 不要用 100ms 到 150ms 的快过渡，玻璃需要慢

## Surfaces

| Level | Name | Value | Purpose |
|---|---|---|---|
| 0 | Night | `#0b1322` | 页面底，所有光斑画在它上面 |
| 1 | Glass | `rgba(255,255,255,0.08)` | 标准玻璃面板 |
| 2 | Glass Raised | `rgba(255,255,255,0.14)` | hover 态与需要更靠前的浮层 |

## Elevation

- **Glass rest:** `0 16px 40px rgba(3,7,18,0.5), inset 0 1px 0 rgba(255,255,255,0.22), inset 0 -1px 0 rgba(2,6,16,0.35)`
- **Glass hover:** `0 24px 64px rgba(3,7,18,0.6), inset 0 1px 0 rgba(255,255,255,0.32), inset 0 -1px 0 rgba(2,6,16,0.35)`

## Imagery

必须有光源。用夜景摄影、暗场产品照，或纯 CSS 的两到三个大半径径向光斑。图像低饱和、深色、带明显的高光区域，因为玻璃要靠这些高光才能读出折射。不使用插画、图标墙与纯色平面背景。

## Layout

12 栏、上限 1280px。区块间距 128px，面板内边距 32px，元素间距 16px。内容浮在光斑之上：光斑固定于背景层，滚动时保持视差。一屏内玻璃面板不超过三个，超过就没有「实心」参照物，玻璃感会失效。

## Agent Prompt Guide

### Implementation Contract

- 以用户请求中的页面、用户任务和真实内容为依据，只实施指定范围；标明缺失的业务信息，不编造数据或能力。
- 先检查现有项目、技术栈与组件；沿用项目结构、路由和依赖，复用已有组件，不重建未要求的页面或功能。
- 沿用项目断点，调整窄屏与桌面的网格和留白；保留信息层级，避免意外横向溢出。
- 对本次涉及的交互，处理键盘焦点与减少动态效果；补齐适用的禁用、加载、空内容与错误状态。
- 完成后按项目现有脚本检查，仅报告实际运行的测试与视觉检查，并列出未验证项。

QUICK COLOR REFERENCE:

- text: `#ffffff`
- background: `#0b1322`
- muted: `#7c9cc4`
- accent: `#e4b863`
- glassFill: `rgba(255,255,255,0.08)`
- glassBorder: `rgba(255,255,255,0.15)`

EXAMPLE COMPONENT PROMPTS:

1. 做一个玻璃面板：背景 rgba(255,255,255,0.08)，backdrop-filter: blur(40px) saturate(180%)，1px 描边 rgba(255,255,255,0.15)，圆角 24px，内边距 32px。阴影写成 box-shadow: 0 16px 40px rgba(3,7,18,0.5), inset 0 1px 0 rgba(255,255,255,0.22), inset 0 -1px 0 rgba(2,6,16,0.35)。页面底色 #0b1322，并在面板后面放两个大半径径向光斑（一个 #33517a、一个 #e4b863，opacity 0.25）。
2. 做一个夜间 hero：左栏 12px 全大写 0.14em 标签（#7c9cc4），下面 64px 600 字重标题（#ffffff，字距 -0.02em），再接 16px 正文（#7c9cc4，行高 1.6），底部一个香槟金全圆角按钮（#e4b863 底、#060a13 文字、padding 14px 28px）。右栏一张玻璃卡片，hover 过渡 500ms，填充升到 14%、上浮 2px。
