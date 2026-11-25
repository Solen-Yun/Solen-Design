# 纸艺手作 — 风格参考

> 一层层剪好的纸叠起来：每层都有一点阴影，每张都歪一点点。

**Theme:** light

纸艺手作模拟剪纸与层叠纸片：纸白底（#fdf6ee）上放明快的纸艺色块（玫红 #e85d75、薄荷 #5cb8a5、明黄 #f5c040、蓝 #6b7fb5），每块纸片带 4px 固定的偏移硬阴影（黑 8%）表示它离桌面有一点距离，圆角取 12 到 16px 但配合 1 度的微旋转显得不完美，层叠靠多个绝对定位的 div 加不同阴影深度实现。它禁止深色背景、禁止发光与霓虹阴影、禁止金属与玻璃质感——纸不反光。

## Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Rose Paper | `#e85d75` | `--color-rose-paper` | 第一纸色：主按钮、最上层的纸片与关键强调。 |
| Paper White | `#fdf6ee` | `--color-paper-white` | 页面底与最大的那张底纸。 |
| Mint Paper | `#5cb8a5` | `--color-mint-paper` | 第二纸色，用于次级区块与「自然」语义。 |
| Marigold Paper | `#f5c040` | `--color-marigold-paper` | 高亮与徽标，是四支纸色里最跳的一支。 |
| Indigo Paper | `#6b7fb5` | `--color-indigo-paper` | 冷侧纸色，用于信息与第三层。 |
| Ink | `#2d2d2d` | `--color-ink` | 文字与剪纸轮廓。不是纯黑。 |

## Typography

### Quicksand — 圆润无衬线或带手写感的字体。字形不能太尖，纸艺里没有尖锐的笔画。

- **Substitute:** 'Trebuchet MS', 'Segoe UI', sans-serif
- **Weights:** 500, 700
- **Sizes:** 13, 16, 20, 26, 34, 46
- **Line height:** 1.15 (display), 1.3 (headings), 1.7 (body)
- **Letter spacing:** 0.01em on display, 0.08em on uppercase labels

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|---|---|---|---|---|---|---|
| display | — | 700 | 46px | 1.15 | 0.01em | `--text-display` |
| heading | — | 700 | 34px | 1.25 | — | `--text-heading` |
| subheading | — | 500 | 26px | 1.35 | — | `--text-subheading` |
| body-lg | — | 500 | 20px | 1.6 | — | `--text-body-lg` |
| body | — | 500 | 16px | 1.7 | — | `--text-body` |
| label | — | 700 | 13px | 1.5 | 0.08em | `--text-label` |

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
| cards | 16px |
| buttons | 12px |
| inputs | 12px |
| stickers | 999px |

- **Page max-width:** 1080px
- **Section gap:** 96px
- **Card padding:** 28px
- **Element gap:** 24px

## Components

### Paper Card

**Role:** 纸片卡片（核心组件）

纸白或一支纸色填充、16px 圆角、无描边、内边距 28px，硬阴影 4px 4px 0 黑 8%。整张卡 rotate(1deg)。hover 时上浮 2px、阴影扩到 6px 且旋转归零。过渡 300ms ease-out。

- **States:** hover: lift 2px, rotation to 0

### Stacked Sheets

**Role:** 层叠纸片

三层绝对定位的圆角矩形，每层比上一层偏移 8px 并加深阴影（4px → 6px → 8px），角度各异（-1、0、+1.5 度）。只有最上层承载内容，其余两层填不同纸色。层数固定三层，再多会显得脏。

### Craft Button

**Role:** 行动按钮

纸色填充、纸白文字、12px 圆角、无描边、16px/700、padding 12px 28px，硬阴影 3px 3px 0 黑 10%。hover 时阴影扩到 5px 并上浮 1px；按下时阴影归零并下沉 1px。过渡 150ms ease-out。

- **Sizes:** padding 12px 28px; label 16px
- **States:** hover: shadow 5px, lift 1px; active: shadow none

### Cut Edge

**Role:** 剪边装饰

用 clip-path 的多边形在纸片的一边做出手工剪痕（5 到 8 个顶点，各点偏移 2 到 4px），或用一个半圆的扇贝边重复。它必须只有一边有剪痕——四边都剪会失去「剪」的感觉。

### Corner Sticker

**Role:** 角贴与圆点贴纸

32 到 56px 的圆或半圆，填一支纸色，带 3px 3px 0 黑 10% 的硬阴影，压在纸片角上并跨过边缘 8px。它是最能表现「手工贴上去」的元素，单屏 2 到 4 处。

## Do's and Don'ts

### Do

- 纸白底，纸色块贴上去
- 4px 固定偏移硬阴影表示离桌面
- 圆角 12 到 16px 配 1 度微旋转
- 层叠最多三层，阴影逐层加深
- 只有一边有剪痕
- 角贴贴纸跨过边缘 8px

### Don't

- 不要用深色或黑色背景
- 不要用发光或霓虹阴影
- 不要用金属或玻璃质感
- 不要四边都做剪痕
- 不要层叠超过三层
- 不要用尖锐字形

## Surfaces

| Level | Name | Value | Purpose |
|---|---|---|---|
| 0 | Paper White | `#fdf6ee` | 页面底 |
| 1 | Rose Sheet | `#e85d75` | 第一层纸片 |
| 2 | Mint Sheet | `#5cb8a5` | 第二层纸片 |

## Elevation

- **Paper layer 1:** `4px 4px 0 rgba(0,0,0,0.08)`
- **Paper layer 2:** `6px 6px 0 rgba(0,0,0,0.10)`
- **Button:** `3px 3px 0 rgba(0,0,0,0.10)`

## Imagery

剪纸插画、分层纸片构图、纸纹理摄影。图像可以是多层纸片拼出的场景，必须有明确的手工剪痕。不使用写实摄影、金属与玻璃质感、发光图像。

## Layout

上限 1080px、容器内边距 24px，区块间距 96px。元素允许 ±1.5 度旋转与 8px 错位。层叠深度最多三层。整页保持纸白底，色块像贴上去的纸片。

## Agent Prompt Guide

### Implementation Contract

- 以用户请求中的页面、用户任务和真实内容为依据，只实施指定范围；标明缺失的业务信息，不编造数据或能力。
- 先检查现有项目、技术栈与组件；沿用项目结构、路由和依赖，复用已有组件，不重建未要求的页面或功能。
- 沿用项目断点，调整窄屏与桌面的网格和留白；保留信息层级，避免意外横向溢出。
- 对本次涉及的交互，处理键盘焦点与减少动态效果；补齐适用的禁用、加载、空内容与错误状态。
- 完成后按项目现有脚本检查，仅报告实际运行的测试与视觉检查，并列出未验证项。

QUICK COLOR REFERENCE:

- text: `#2d2d2d`
- background: `#fdf6ee`
- rose: `#e85d75`
- mint: `#5cb8a5`
- marigold: `#f5c040`
- indigo: `#6b7fb5`

EXAMPLE COMPONENT PROMPTS:

1. 做一个纸艺手作卡片：纸白 #fdf6ee 填充、16px 圆角、无边框、内边距 28px、box-shadow 4px 4px 0 rgba(0,0,0,0.08)、transform rotate(1deg)。标题 34px/700、色 #2d2d2d；正文 16px/500、行高 1.7。卡片下方垫两层纸片：各偏移 8px、阴影依次 6px 与 8px、旋转 -1 度与 1.5 度、填 #5cb8a5 与 #f5c040。左上角贴一个 40px 的玫红 #e85d75 圆形角贴，跨过边缘 8px，带 3px 3px 0 rgba(0,0,0,0.1)。hover 时卡片上浮 2px、旋转归零。页面底色 #fdf6ee。
