# 孟菲斯风格 — 风格参考

> 撞色、粗边、几何乱飞：把 1981 年米兰那群人的玩笑做成界面。

**Theme:** light

孟菲斯是 1981 年米兰设计团体对现代主义的反驳：不要克制，要撞色；不要网格，要不规则。落到界面上有两条硬规则——第一，几何装饰必须存在，而且 hover 时要各自朝不同方向移动或旋转（Playful Chaos）；第二，标题与文字允许在 hover 时瞬间反转成高饱和撞色（Pop Swap），150ms 硬切。边框一律 4px 纯黑，阴影是硬偏移且按下时归零。它禁止单调配色、禁止过于对称的布局、也禁止几何装饰在 hover 时保持静止。

## Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Coral | `#ff6b6b` | `--color-coral` | 第一撞色与主行动。孟菲斯的起点，永远与黄、蓝对撞使用。 |
| Honey | `#feca57` | `--color-honey` | 第二撞色与高亮底。常作为 Coral 的直接对手。 |
| Electric Blue | `#48dbfb` | `--color-electric-blue` | 第三撞色与链接，用于打破红黄的暖调。 |
| Bubblegum | `#ff9ff3` | `--color-bubblegum` | 几何装饰专用，几乎不用于文字。 |
| Mint | `#1dd1a1` | `--color-mint` | 成功状态与第四撞色，面积最小。 |
| Grape | `#5f27cd` | `--color-grape` | 深色撞色，用于压在浅底上做形状或次要按钮。 |

## Typography

### Inter — 全站唯一字体，只用 700 与 900。标题压到行高 1.0，字块本身就是几何形状。

- **Substitute:** 'Arial Black', Helvetica, sans-serif
- **Weights:** 700, 900
- **Sizes:** 14, 18, 24, 32, 44, 60
- **Line height:** 1 (display), 1.1 (headings), 1.5 (body)
- **Letter spacing:** -0.02em on display, 0.06em on uppercase labels

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|---|---|---|---|---|---|---|
| display | — | 900 | 60px | 1 | -0.02em | `--text-display` |
| heading | — | 900 | 44px | 1.05 | -0.02em | `--text-heading` |
| subheading | — | 700 | 32px | 1.1 | — | `--text-subheading` |
| body-lg | — | 700 | 18px | 1.45 | — | `--text-body-lg` |
| body | — | 700 | 14px | 1.5 | — | `--text-body` |
| label | — | 700 | 14px | 1.35 | 0.06em | `--text-label` |

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
| cards | 0 |
| buttons | 0 |
| shapes | 999px |

- **Page max-width:** 1200px
- **Section gap:** 96px
- **Card padding:** 28px
- **Element gap:** 20px

## Components

### Pop Button

**Role:** 主行动按钮

珊瑚填充、白字、4px 纯黑描边、零圆角、6px 硬偏移阴影，14px/700、0.06em 字距、padding 12px 24px。hover 时填充硬切到蜜黄、文字转黑、阴影扩到 10px，绝不向阴影方向位移；按下时位移 6px 6px 且阴影归零。过渡 150ms。

- **States:** hover: color swap, shadow grows; active: translate 6px, shadow none

### Playground Card

**Role:** 内容卡与作品卡

暖白填充、4px 纯黑描边、零圆角、内边距 28px，6px 硬阴影。卡内放 3 到 4 个几何装饰（圆、三角、波浪线），各自不同色。hover 时每个装饰朝不同方向移动 6 到 10px 并各自旋转 8 到 20 度（Playful Chaos），标题文字硬切到撞色（Pop Swap），卡片本身不动。过渡 150ms。

### Geometric Ornament

**Role:** 几何装饰元素

只用圆、三角、波浪线与锯齿四种，填撞色之一，可带 3px 黑描边。尺寸 24px 到 96px，绝对定位在卡片或区块的边角并允许溢出边界 8 到 16px。hover 时按各自方向位移与旋转，绝不同步。

### Memphis Input

**Role:** 表单输入

白填充、4px 纯黑描边、零圆角、padding 10px 14px、14px/700。聚焦时描边颜色硬切到电蓝并加 4px 蜜黄硬阴影，不改变尺寸。

### Zigzag Divider

**Role:** 区块分隔

高 16px 的锯齿折线（clip-path 或 SVG），填撞色之一，横跨内容宽。用于替代直线分隔，同一页面不超过三条。

## Do's and Don'ts

### Do

- 撞色成对使用，不与同色系相邻
- 4px 纯黑描边，零圆角
- 几何装饰必须有，且 hover 时各自移动
- hover 颜色硬切，150ms
- 按下位移等于阴影偏移并归零
- 标题 900 字重、行高 1.0

### Don't

- 不要用单调或低饱和配色
- 不要用对称规整的布局
- 不要用细边框
- 不要省略几何装饰
- 不要让装饰在 hover 时静止
- 不要在 hover 时向阴影方向位移

## Surfaces

| Level | Name | Value | Purpose |
|---|---|---|---|
| 0 | Paper | `#fdf6e3` | 页面底（暖白） |
| 1 | Coral Block | `#ff6b6b` | 强调区块 |
| 2 | Honey Block | `#feca57` | 高亮区块 |

## Elevation

- **Hard offset:** `6px 6px 0 #000000`
- **Hard offset lg:** `10px 10px 0 #000000`
- **Pressed:** `none`

## Imagery

几何图形即是图像，不用摄影。允许 80 年代风格的抽象插画与粗描边线稿。不使用写实摄影、渐变与柔和阴影。

## Layout

上限 1200px、容器内边距 24px，区块间距 96px。刻意打破对称：元素可偏离网格、可倾斜 -3 到 3 度、装饰可溢出容器。信息仍按 8px 网格落点，混乱只发生在视觉层。

## Agent Prompt Guide

### Implementation Contract

- 以用户请求中的页面、用户任务和真实内容为依据，只实施指定范围；标明缺失的业务信息，不编造数据或能力。
- 先检查现有项目、技术栈与组件；沿用项目结构、路由和依赖，复用已有组件，不重建未要求的页面或功能。
- 沿用项目断点，调整窄屏与桌面的网格和留白；保留信息层级，避免意外横向溢出。
- 对本次涉及的交互，处理键盘焦点与减少动态效果；补齐适用的禁用、加载、空内容与错误状态。
- 完成后按项目现有脚本检查，仅报告实际运行的测试与视觉检查，并列出未验证项。

QUICK COLOR REFERENCE:

- text: `#000000`
- background: `#fdf6e3`
- coral: `#ff6b6b`
- honey: `#feca57`
- blue: `#48dbfb`
- mint: `#1dd1a1`

EXAMPLE COMPONENT PROMPTS:

1. 做一个孟菲斯按钮：背景 #ff6b6b、白字、4px solid #000 边框、border-radius 0、700 字重 14px、0.06em 字距、padding 12px 24px、box-shadow 6px 6px 0 #000。hover 时背景硬切到 #feca57、文字转黑、阴影扩到 10px 10px 0 #000，不做位移。active 时 translate(6px,6px) 且 box-shadow none。transition 150ms。页面底色 #fdf6e3。
