# 柔和野兽派 — 风格参考

> 骨架仍是硬阴影与零圆角，但换成灰边、灰影与粉彩色。

**Theme:** light

柔和野兽派保留了野兽派的骨架：零圆角、硬偏移阴影、按下时位移等于偏移并归零。但它把三个最刺眼的参数降了一档——边框从 4px 纯黑降到 2px gray-800，阴影从纯黑降到 20% 的黑，配色从霓虹换成粉彩（pink-400 而非 #ff006e）。结果是一套可以放进企业产品里的野兽派：仍然有物理感，但不再喊叫。底色也从纯白退到浅灰。

## Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Deep Grey | `#1a1a1a` | `--color-deep-grey` | 文字、边框与阴影基准。比纯黑柔一档，长时间阅读更舒服。 |
| Light Ground | `#f5f5f5` | `--color-light-ground` | 页面画布。不用纯白，让白卡片有依托。 |
| Card White | `#ffffff` | `--color-card-white` | 卡片填充，只在浅灰底上出现。 |
| Soft Pink | `#f472b6` | `--color-soft-pink` | 主强调与选中态。pink-400 的柔和版，不做主按钮的大面积填充。 |
| Lime | `#a3e635` | `--color-lime` | hover 高亮与成功状态，用于小面积标签。 |
| Sky | `#38bdf8` | `--color-sky` | 链接与信息标记，与柔粉形成冷暖对位。 |
| Amber | `#fbbf24` | `--color-amber` | 提醒与高亮底，出现频率最低。 |

## Typography

### Inter — 全站唯一字体，500 到 800 三档。标题 800 但不全大写，这是与硬核野兽派的分界。

- **Substitute:** system-ui, -apple-system, 'Segoe UI', sans-serif
- **Weights:** 500, 700, 800
- **Sizes:** 13, 15, 18, 24, 32, 44
- **Line height:** 1.1 (display), 1.2 (headings), 1.55 (body)
- **Letter spacing:** -0.02em on display, 0.04em on uppercase labels

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|---|---|---|---|---|---|---|
| display | — | 800 | 44px | 1.1 | -0.02em | `--text-display` |
| heading | — | 800 | 32px | 1.2 | — | `--text-heading` |
| subheading | — | 700 | 24px | 1.3 | — | `--text-subheading` |
| body-lg | — | 500 | 18px | 1.5 | — | `--text-body-lg` |
| body | — | 500 | 15px | 1.55 | — | `--text-body` |
| label | — | 700 | 13px | 1.4 | 0.04em | `--text-label` |

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
| inputs | 0 |
| badges | 0 |

- **Page max-width:** 1120px
- **Section gap:** 80px
- **Card padding:** 24px
- **Element gap:** 16px

## Components

### Soft Block Button

**Role:** 主行动按钮

白底、深灰文字、2px gray-800 描边、零圆角、4px 灰色硬阴影（黑 20%），15px/700、padding 12px 24px。hover 时填充换成柔粉、文字转白、阴影扩到 6px，不上浮也不过量位移；按下时位移 4px 4px 且阴影归零。过渡 150ms ease-out。

- **Sizes:** padding 12px 24px; label 15px
- **States:** hover: pink fill, shadow 6px; active: translate 4px, shadow none

### Soft Brutal Card

**Role:** 内容卡与功能卡

白底、2px gray-800 描边、零圆角、内边距 24px、4px 灰色硬阴影。标题 24px/700 深灰，正文 15px/500 灰 60%。hover 时上浮 2px、阴影扩到 6px、描边转柔粉。过渡 150ms。

### Quiet Input

**Role:** 表单输入

白底、2px gray-800 描边、零圆角、padding 10px 14px、15px 字。聚焦时描边转天蓝并加 4px 的灰硬阴影，不改变盒子尺寸。

### Pastel Tag

**Role:** 标签与状态

粉彩填充（柔粉、青柠、天蓝或琥珀之一，取 15% 透明度作底）、零圆角、2px gray-800 描边、13px/700、padding 2px 8px。文字用深灰，不用白色。

## Do's and Don'ts

### Do

- 2px gray-800 边框，不用纯黑
- 阴影用 20% 黑而不是实色
- 粉彩强调，每屏不超过两种
- 保持零圆角与硬偏移阴影
- 浅灰底，不用纯白
- 过渡 150ms，短促

### Don't

- 不要用圆角
- 不要用纯黑边框
- 不要用高饱和纯色
- 不要用纯黑背景
- 不要用渐变
- 不要用模糊阴影

## Surfaces

| Level | Name | Value | Purpose |
|---|---|---|---|
| 0 | Light Ground | `#f5f5f5` | 页面画布 |
| 1 | Card White | `#ffffff` | 卡片与面板 |

## Elevation

- **Soft hard shadow:** `4px 4px 0 rgba(0,0,0,0.20)`
- **Hover:** `6px 6px 0 rgba(0,0,0,0.24)`
- **Pressed:** `none`

## Imagery

几何图形与粗描边图标。允许把照片处理成粉彩双色调后加 2px 描边。不使用柔和渐变的摄影与装饰插画。

## Layout

上限 1120px、容器内边距 24px，区块间距 80px。允许元素轻微错位 4px 制造手工感，但不做旋转。卡片垂直错落 8px，整体保持整齐。

## Agent Prompt Guide

### Implementation Contract

- 以用户请求中的页面、用户任务和真实内容为依据，只实施指定范围；标明缺失的业务信息，不编造数据或能力。
- 先检查现有项目、技术栈与组件；沿用项目结构、路由和依赖，复用已有组件，不重建未要求的页面或功能。
- 沿用项目断点，调整窄屏与桌面的网格和留白；保留信息层级，避免意外横向溢出。
- 对本次涉及的交互，处理键盘焦点与减少动态效果；补齐适用的禁用、加载、空内容与错误状态。
- 完成后按项目现有脚本检查，仅报告实际运行的测试与视觉检查，并列出未验证项。

QUICK COLOR REFERENCE:

- text: `#1a1a1a`
- background: `#f5f5f5`
- card: `#ffffff`
- pink: `#f472b6`
- sky: `#38bdf8`
- border: `#262626`

EXAMPLE COMPONENT PROMPTS:

1. 做一个柔和野兽派按钮：白底、#1a1a1a 文字、2px solid #262626 边框、border-radius 0、700 字重 15px、padding 12px 24px、box-shadow 4px 4px 0 rgba(0,0,0,0.2)。hover 时背景 #f472b6、文字白色、阴影扩到 6px 6px 0 rgba(0,0,0,0.24)。active 时 translate(4px,4px) 且阴影 none。transition 150ms ease-out。页面底色 #f5f5f5。
