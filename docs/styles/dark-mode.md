# 暗黑模式 — 风格参考

> 深板岩底上的一支蓝，靠内发光而不是投影说明层次。

**Theme:** dark

暗黑模式不是把白色反过来，而是重建一套明度秩序：最深的一层是 #0f172a（绝不用纯黑，纯黑会让阴影失效），往上每一级只提亮 4% 到 6%，最多三级。边框用 1px 的白色 6% 到 10%，靠它切分区块而不是靠阴影。所有发光都朝内：按钮顶边一层 inset 白色高光，模拟屏幕自下而上的光，这才是暗色界面里真实的物理。强调色只有一支蓝，其余（绿、橙、红）仅作为状态。

## Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Deep Slate | `#0f172a` | `--color-deep-slate` | 页面底，全站最深的一层。用它替代纯黑，阴影才有落点。 |
| Slate 800 | `#1e293b` | `--color-slate-800` | 卡片与面板。比底色亮 4%，是主要的承载层。 |
| Slate 700 | `#334155` | `--color-slate-700` | 浮层与 hover 态。第三级，不再往上加。 |
| Primary Blue | `#3b82f6` | `--color-primary-blue` | 主行动、链接与选中态。深底上要提起一档亮度才够读。 |
| State Green | `#22c55e` | `--color-state-green` | 成功与在线，用 15% 底配实色文字。 |
| State Amber | `#f59e0b` | `--color-state-amber` | 警告与待处理，只在图标与徽标上出现。 |
| State Red | `#ef4444` | `--color-state-red` | 错误与删除，出现即代表代价。 |

## Typography

### Inter — 全站唯一字体。暗底上需要比亮色版更宽松的行高（1.6）与略低的最大字重，避免光晕。

- **Substitute:** system-ui, -apple-system, 'Segoe UI', sans-serif
- **Weights:** 400, 500, 600, 700
- **Sizes:** 12, 14, 16, 20, 30, 40, 60
- **Line height:** 1.1 (display), 1.25 (headings), 1.6 (body)
- **Letter spacing:** -0.02em on display, 0.04em on uppercase labels

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|---|---|---|---|---|---|---|
| display | — | 700 | 60px | 1.1 | -0.02em | `--text-display` |
| heading-lg | — | 700 | 40px | 1.15 | -0.015em | `--text-heading-lg` |
| heading | — | 600 | 30px | 1.2 | — | `--text-heading` |
| subheading | — | 600 | 20px | 1.35 | — | `--text-subheading` |
| body-lg | — | 400 | 16px | 1.6 | — | `--text-body-lg` |
| body | — | 400 | 14px | 1.6 | — | `--text-body` |
| label | — | 500 | 12px | 1.4 | 0.04em | `--text-label` |

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

### Border Radius

| Element | Value |
|---|---|
| cards | 12px |
| buttons | 8px |
| inputs | 8px |
| badges | 999px |

- **Page max-width:** 1200px
- **Section gap:** 96px
- **Card padding:** 24px
- **Element gap:** 16px

## Components

### Primary Button

**Role:** 主行动按钮

主蓝填充、白字、8px 圆角、无描边。字级 14px、字重 500、padding 8px 16px。核心是顶边内高光：inset 0 1px 0 白 15%，模拟屏幕自身的光。hover 时填充提亮到蓝 500 并叠一层 0 0 10px 蓝 30% 的外发光；按下缩放 0.98，内阴影换成 inset 0 2px 4px 黑 30%。过渡 200ms ease-out。

- **Sizes:** padding 8px 16px; label 14px
- **States:** hover: brighter fill + outer glow; active: inset shadow, scale 0.98

### Surface Card

**Role:** 内容卡与列表容器

石板 800 的 50% 填充、1px 石板 700 描边、12px 圆角、内边距 24px，无阴影——暗色里阴影几乎不可见，靠描边分层。hover 时填充升到完全不透明、描边转石板 500、上浮 2px、加 0 8px 30px 黑 50%。过渡 300ms ease-out。

- **States:** hover: fill opaque, border lighter, lift 2px

### Dark Input

**Role:** 表单与搜索

石板 800 填充、1px 石板 700 描边、8px 圆角、padding 8px 12px、14px 字。占位符用石板 400。聚焦时描边转主蓝并加 2px 主蓝 30% 外环，焦点环 offset 用深板岩本色以免出现白边。

### Status Chip

**Role:** 状态与分类标记

全圆角、12px 字、500 字重、padding 2px 10px。成功用绿 15% 底配绿 400 文字，警告用橙 15% 配橙 400，错误用红 15% 配红 400。必须带一个小圆点，不只靠色相传达状态。

## Do's and Don'ts

### Do

- 用深板岩 #0f172a 而不是纯黑做底
- 明度分三级，每级只差 4% 到 6%
- 用 1px 白色 6% 到 10% 的描边分层
- 按钮带顶边内高光
- 正文行高 1.6，字重不超过 700
- 焦点环的 offset 用底色而不是白色

### Don't

- 不要用纯黑 #000000 做底
- 不要靠投影分层，暗色里看不见
- 不要把状态色当装饰色
- 不要用低于 4.5:1 的正文对比
- 不要用纯白文字，用 90% 到 95%
- 不要在暗底上使用亮色大色块

## Surfaces

| Level | Name | Value | Purpose |
|---|---|---|---|
| 0 | Deep Slate | `#0f172a` | 页面底 |
| 1 | Slate 800 | `#1e293b` | 卡片与面板 |
| 2 | Slate 700 | `#334155` | 浮层与 hover |

## Elevation

- **Card:** `none — 1px border carries it`
- **Card hover:** `0 8px 30px rgba(0,0,0,0.50)`
- **Inset glow:** `inset 0 1px 0 rgba(255,255,255,0.15)`

## Imagery

产品界面截图与暗色场景摄影。允许在 hero 使用一层极暗的径向渐变光。所有素材必须本身偏暗，把亮部留给界面。不使用白底图、彩色插画与大面积纯色块。

## Layout

上限 1200px、12 栏、容器内边距 24px，区块间距 96px。区块之间用 1px 白色 6% 的分隔线而不是阴影。允许侧栏与主区同时存在，但两者明度至少相差一级。

## Agent Prompt Guide

### Implementation Contract

- 以用户请求中的页面、用户任务和真实内容为依据，只实施指定范围；标明缺失的业务信息，不编造数据或能力。
- 先检查现有项目、技术栈与组件；沿用项目结构、路由和依赖，复用已有组件，不重建未要求的页面或功能。
- 沿用项目断点，调整窄屏与桌面的网格和留白；保留信息层级，避免意外横向溢出。
- 对本次涉及的交互，处理键盘焦点与减少动态效果；补齐适用的禁用、加载、空内容与错误状态。
- 完成后按项目现有脚本检查，仅报告实际运行的测试与视觉检查，并列出未验证项。

QUICK COLOR REFERENCE:

- text: `#e2e8f0`
- background: `#0f172a`
- card: `#1e293b`
- accent: `#3b82f6`
- muted: `#94a3b8`
- border: `rgba(255,255,255,0.08)`

EXAMPLE COMPONENT PROMPTS:

1. 做一个暗色卡片：背景 #1e293b（可用 50% 不透明）、1px rgba(255,255,255,0.08) 描边、12px 圆角、内边距 24px、无阴影。标题 20px/600 #e2e8f0，正文 14px #94a3b8。hover 时背景变完全不透明、描边升到 rgba(255,255,255,0.16)、translateY(-2px)、加 0 8px 30px rgba(0,0,0,0.5)。页面底色 #0f172a。
