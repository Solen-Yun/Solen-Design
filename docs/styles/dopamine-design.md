# 多巴胺设计 — 风格参考

> 高饱和撞色加圆润大字：让界面看起来像在笑。

**Theme:** light

多巴胺设计要的是情绪冲击：粉、紫、黄、蓝四支高饱和色并置，标题推到 5xl 到 7xl 加 900 字重，按钮全圆角加彩色投影，卡片用双色渐变，一切都圆润、都大、都亮。它的规则主要是禁令——禁止大面积灰、禁止低饱和马卡龙色、禁止严肃商务排版、禁止衬线字体。允许 emoji 与趣味图标点缀，这在别的风格里是被禁的，在这里是语气的一部分。

## Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Hot Pink | `#ff006e` | `--color-hot-pink` | 第一主色与主按钮。整套风格最强的情绪信号。 |
| Electric Violet | `#8338ec` | `--color-electric-violet` | 第二主色，与热粉构成渐变与撞色关系。 |
| Sunny Yellow | `#ffbe0b` | `--color-sunny-yellow` | 高亮与徽标，用于需要跳出的信息。 |
| Vivid Blue | `#3a86ff` | `--color-vivid-blue` | 第三撞色与链接，是画面里最冷的一支。 |
| Mint | `#06d6a0` | `--color-mint` | 成功与「完成」状态，面积较小。 |
| Tangerine | `#fb5607` | `--color-tangerine` | 最热的一支，用于强调与倒计时。 |

## Typography

### Inter — 全站唯一无衬线，只用 700 与 900。标题 44 到 64px 并压紧字距，字块要够重才有冲击。

- **Substitute:** 'Segoe UI', system-ui, sans-serif
- **Weights:** 700, 900
- **Sizes:** 15, 18, 22, 30, 44, 64
- **Line height:** 1.02 (display), 1.1 (headings), 1.5 (body)
- **Letter spacing:** -0.03em on display, 0.02em on uppercase labels

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|---|---|---|---|---|---|---|
| display | — | 900 | 64px | 1.02 | -0.03em | `--text-display` |
| heading-lg | — | 900 | 44px | 1.05 | -0.02em | `--text-heading-lg` |
| heading | — | 900 | 30px | 1.15 | — | `--text-heading` |
| subheading | — | 700 | 22px | 1.25 | — | `--text-subheading` |
| body-lg | — | 700 | 18px | 1.5 | — | `--text-body-lg` |
| body | — | 700 | 15px | 1.5 | — | `--text-body` |

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
| cards | 24px |
| buttons | 999px |
| inputs | 16px |
| badges | 999px |

- **Page max-width:** 1160px
- **Section gap:** 96px
- **Card padding:** 32px
- **Element gap:** 20px

## Components

### Dopamine Button

**Role:** 主行动按钮

热粉填充、白字、999px 全圆角、无描边，18px/700、padding 16px 32px，彩色投影 0 8px 30px 粉 40%。hover 时投影扩到 40px 并加深到 60%、放大 1.05、上浮 2px；按下缩到 0.95。过渡 200ms。

- **Sizes:** padding 16px 32px; label 18px
- **States:** hover: scale 1.05, deeper pink shadow; active: scale 0.95

### Gradient Card

**Role:** 内容卡与功能卡

电紫到活力蓝的对角渐变填充、24px 圆角、无描边、内边距 32px，投影 0 16px 50px 紫 35%。左上角放一个白 20% 底的全圆角标签（14px/600）并带轻微模糊。hover 时投影扩到 60px、放大 1.02。

### Bold Input

**Role:** 输入框

白底、16px 圆角、2px 电紫 20% 描边、padding 14px 20px、15px/700 字。标签电紫 15px/700 置于上方 8px。聚焦时描边转热粉并加 4px 的热粉 15% 外环。

### Emoji Badge

**Role:** 带 emoji 的标签

阳光黄或薄荷绿填充、999px 全圆角、无描边、14px/700、padding 6px 14px，前面放一个 16px 的 emoji 或趣味图标。这是本风格唯一允许 emoji 的地方。

### Blob Shape

**Role:** 装饰色块

不规则圆（border-radius 取 60% 40% 55% 45% 这样的四值）、尺寸 120 到 320px、填一支高饱和色并降到 20% 不透明度，绝对定位在区块角落，允许溢出。单屏最多三个。

## Do's and Don'ts

### Do

- 高饱和撞色并置
- 标题推到大字号加 900 字重
- 按钮全圆角加彩色投影
- 卡片用双色渐变
- 允许 emoji 与趣味图标
- 动效 200ms，带 1.05 的放大

### Don't

- 不要大面积用灰
- 不要用低饱和马卡龙色
- 不要做严肃商务排版
- 不要用衬线字体
- 不要用锐利直角
- 不要一次上五种以上撞色

## Surfaces

| Level | Name | Value | Purpose |
|---|---|---|---|
| 0 | White | `#ffffff` | 页面底 |
| 1 | Pink Wash | `rgba(255,0,110,0.08)` | 区块底 |
| 2 | Gradient Card | `linear-gradient violet→blue` | 卡片 |

## Elevation

- **Pink lift:** `0 8px 30px rgba(255,0,110,0.40)`
- **Pink lift hover:** `0 12px 40px rgba(255,0,110,0.60)`
- **Violet lift:** `0 16px 50px rgba(131,56,236,0.35)`

## Imagery

高饱和插画、几何图形、3D 渲染的糖果色物件。允许 emoji 作为视觉元素。不使用低饱和摄影、严肃企业照与灰调插画。

## Layout

上限 1160px、容器内边距 24px，区块间距 96px。允许大量装饰色块溢出与旋转。元素间距至少 20px，留白中等——多巴胺靠颜色不靠空旷。

## Agent Prompt Guide

### Implementation Contract

- 以用户请求中的页面、用户任务和真实内容为依据，只实施指定范围；标明缺失的业务信息，不编造数据或能力。
- 先检查现有项目、技术栈与组件；沿用项目结构、路由和依赖，复用已有组件，不重建未要求的页面或功能。
- 沿用项目断点，调整窄屏与桌面的网格和留白；保留信息层级，避免意外横向溢出。
- 对本次涉及的交互，处理键盘焦点与减少动态效果；补齐适用的禁用、加载、空内容与错误状态。
- 完成后按项目现有脚本检查，仅报告实际运行的测试与视觉检查，并列出未验证项。

QUICK COLOR REFERENCE:

- text: `#1a1a1a`
- background: `#ffffff`
- pink: `#ff006e`
- violet: `#8338ec`
- yellow: `#ffbe0b`
- blue: `#3a86ff`

EXAMPLE COMPONENT PROMPTS:

1. 做一个多巴胺风格按钮：背景 #ff006e、白字、18px/700、999px 全圆角、padding 16px 32px、box-shadow 0 8px 30px rgba(255,0,110,0.4)。hover 时阴影扩到 0 12px 40px rgba(255,0,110,0.6)、scale(1.05)、translateY(-2px)；active 时 scale(0.95)，transition 200ms。角落可放一个 240px 的不规则圆（border-radius 60% 40% 55% 45%），填 #ffbe0b、不透明度 20%。页面底色 #ffffff。
