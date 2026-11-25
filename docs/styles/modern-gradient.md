# 现代渐变风 — 风格参考

> 深靛夜空上的一束紫粉光，玻璃卡片把光切成层次。

**Theme:** dark

现代渐变风属于创业公司发布页那一路：深靛底（#1e1b4b）压住整个画面，紫到品红的渐变作为唯一光源，玻璃卡片把光切成层次。它的关键是渐变必须「有方向」——按钮用 200% 宽的三色渐变，hover 时背景滑到另一端，颜色随之流动，而不是简单换色。卡片用 10% 白填充加 20% 白描边，hover 时透明度提升并注入紫色光晕。动效偏慢（500ms ease-out），配合轻微上浮与 1.02 放大，让「光在动」这件事被感知。

## Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Violet | `#8b5cf6` | `--color-violet` | 渐变起点与主强调。所有发光效果都从它出发。 |
| Deep Indigo | `#1e1b4b` | `--color-deep-indigo` | 页面底色。比纯黑暖，能让紫光显得是在发光而不是发灰。 |
| Fuchsia | `#ec4899` | `--color-fuchsia` | 渐变终点与 hover 态。只与紫同时出现，构成那条光。 |
| Cyan | `#06b6d4` | `--color-cyan` | 数据、图表第二序列与对比高亮。与紫形成冷暖对位。 |
| Amber | `#f59e0b` | `--color-amber` | 稀缺提示与徽标。全屏不超过一处，用来打破冷色。 |
| Glass White | `rgba(255,255,255,0.10)` | `--color-glass` | 卡片填充。必须配描边与模糊，否则在深底上会消失。 |

## Typography

### Inter — 全站唯一字体。标题 700 与紧字距压住发光背景，正文 400 保证暗底可读。

- **Substitute:** system-ui, -apple-system, 'Segoe UI', sans-serif
- **Weights:** 400, 500, 600, 700
- **Sizes:** 12, 14, 16, 20, 28, 40, 64
- **Line height:** 1.05 (display), 1.15 (headings), 1.6 (body)
- **Letter spacing:** -0.03em on display, 0.06em on uppercase labels

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|---|---|---|---|---|---|---|
| display | — | 700 | 64px | 1.05 | -0.03em | `--text-display` |
| heading-lg | — | 700 | 40px | 1.1 | -0.02em | `--text-heading-lg` |
| heading | — | 600 | 28px | 1.2 | — | `--text-heading` |
| subheading | — | 600 | 20px | 1.35 | — | `--text-subheading` |
| body-lg | — | 400 | 16px | 1.6 | — | `--text-body-lg` |
| body | — | 400 | 14px | 1.6 | — | `--text-body` |
| label | — | 600 | 12px | 1.4 | 0.06em | `--text-label` |

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
| buttons | 16px |
| inputs | 16px |
| icons | 16px |

- **Page max-width:** 1200px
- **Section gap:** 112px
- **Card padding:** 32px
- **Element gap:** 24px

## Components

### Gradient Button

**Role:** 主行动按钮

紫→品红→紫三色线性渐变，宽度 200%，白字、16px 圆角、无描边，字级 16px、字重 700、字距 0.02em、padding 16px 32px。静态阴影 0 8px 20px 紫 30%。hover 时背景位置滑到右端（渐变反向流动）、阴影扩到 0 15px 30px 品红 40%、上浮 4px、放大 1.02；按下缩放 0.95。过渡 500ms ease-out。

- **Sizes:** padding 16px 32px; label 16px
- **States:** hover: gradient slides, lift 4px, glow widens; active: scale 0.95

### Glass Card

**Role:** 功能卡与内容卡

10% 白填充、20px 模糊、1px 20% 白描边、24px 圆角、内边距 32px。图标块 56px 见方、渐变填充、16px 圆角、白图标。hover 时填充升到 15%、描边转紫 50%、上浮 8px、放大 1.02、注入 0 20px 50px 紫 18% 光晕，图标块放大 1.1 并旋转 12 度，过渡 500ms ease-out。

- **States:** hover: fill 10%→15%, border violet, lift 8px, icon rotate 12deg

### Gradient Input

**Role:** 表单与订阅输入

8% 白填充、10px 模糊、1px 18% 白描边、16px 圆角、padding 14px 18px、14px 字。占位符用白 45%。聚焦时描边转紫 60%，并加一圈 3px 紫 25% 外环。

### Aurora Backdrop

**Role:** 首屏背景光

深靛底上放两到三个 600px 半径的径向渐变光斑（紫 40%、品红 30%、青 20%），模糊 120px，整体不透明度 60%。只出现在首屏与一两个区块，滚动时固定不动。

## Do's and Don'ts

### Do

- 渐变必须有方向，hover 时让颜色流动
- 玻璃卡片必须同时有模糊、描边与填充
- 深靛底，不用纯黑
- 动效 500ms，配合上浮与 1.02 放大
- 光斑只在首屏与少数区块出现
- 正文对比度不低于 4.5:1

### Don't

- 不要用纯黑背景
- 不要用无描边的玻璃卡片
- 不要让渐变出现在正文文字上
- 不要同时用三支以上强调色
- 不要用快速过渡，光不会瞬移
- 不要让光斑铺满整页

## Surfaces

| Level | Name | Value | Purpose |
|---|---|---|---|
| 0 | Deep Indigo | `#1e1b4b` | 页面底 |
| 1 | Glass | `rgba(255,255,255,0.10)` | 卡片与面板 |
| 2 | Glass Hover | `rgba(255,255,255,0.15)` | hover 态填充 |

## Elevation

- **Button glow:** `0 8px 20px rgba(167,139,250,0.30)`
- **Button hover:** `0 15px 30px rgba(217,70,239,0.40)`
- **Card hover:** `0 20px 50px rgba(167,139,250,0.18)`

## Imagery

抽象渐变、光斑、3D 渲染的几何体。允许把产品界面裁切后叠在渐变上。不使用人物摄影、写实插画或纯色平面背景——没有光就没有这套风格。

## Layout

上限 1200px、12 栏、容器内边距 24px，区块间距 112px。hero 居中且占满首屏，标题不超过两行。功能区用三栏玻璃卡片。整页保持深色，只在页脚允许一次反色。

## Agent Prompt Guide

### Implementation Contract

- 以用户请求中的页面、用户任务和真实内容为依据，只实施指定范围；标明缺失的业务信息，不编造数据或能力。
- 先检查现有项目、技术栈与组件；沿用项目结构、路由和依赖，复用已有组件，不重建未要求的页面或功能。
- 沿用项目断点，调整窄屏与桌面的网格和留白；保留信息层级，避免意外横向溢出。
- 对本次涉及的交互，处理键盘焦点与减少动态效果；补齐适用的禁用、加载、空内容与错误状态。
- 完成后按项目现有脚本检查，仅报告实际运行的测试与视觉检查，并列出未验证项。

QUICK COLOR REFERENCE:

- text: `#f8fafc`
- background: `#1e1b4b`
- card: `rgba(255,255,255,0.10)`
- accent: `#8b5cf6`
- secondary: `#ec4899`
- border: `rgba(255,255,255,0.20)`

EXAMPLE COMPONENT PROMPTS:

1. 做一个渐变主按钮：background: linear-gradient(90deg, #8b5cf6, #ec4899, #8b5cf6)，background-size: 200% auto，白字、16px 圆角、700 字重、padding 16px 32px，阴影 0 8px 20px rgba(167,139,250,0.3)。hover 时 background-position 移到 right、阴影扩到 0 15px 30px rgba(217,70,239,0.4)、transform 上浮 4px 并放大 1.02，transition 500ms ease-out。页面底色 #1e1b4b。
