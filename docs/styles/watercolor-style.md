# 水彩画风 — 风格参考

> 纸上的三层晕染：颜色从不描边，只在边缘化开。

**Theme:** light

水彩画风的关键是「没有硬边」。所有色块都是半径极大的模糊圆，彼此叠压形成晕染；卡片的渐变从对角淡入淡出，边缘再叠一层 1px 的极淡描边暗示纸张。底色是暖纸白（#faf8f5），主色是偏灰的蓝（#4a6fa5），标题用衬线斜体，正文行高拉到 1.7。它不使用投影来分层，而是靠「颜色在纸上扩散的面积」——hover 时卡片内部的色斑放大并加深，像水在湿纸上继续晕开。

## Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Watercolor Blue | `#4a6fa5` | `--color-watercolor-blue` | 主行动、标题与文字。偏灰的蓝，像颜料被水稀释过一次。 |
| Paper White | `#faf8f5` | `--color-paper-white` | 页面画布。暖白，用来模拟水彩纸的底色。 |
| Peach | `#e8a87c` | `--color-peach` | 暖色晕染的第一层，出现在标题区与卡片一角。 |
| Water Teal | `#85cdca` | `--color-water-teal` | 冷色晕染，与蜜桃叠压成中间色。 |
| Rose | `#c38d94` | `--color-rose` | 第三层晕染，透明度最低，只用来加深中心。 |
| Ochre | `#d4a373` | `--color-ochre` | 纸边与分隔，多用于 10% 到 20% 透明度的细线。 |

## Typography

### Cormorant Garamond — 标题、引文与导航字标，多用斜体。衬线斜体是水彩最自然的文字表情。

- **Substitute:** Georgia, 'Songti SC', serif
- **Weights:** 400, 500
- **Sizes:** 20, 26, 34, 44, 60
- **Line height:** 1.2 (display), 1.3 (headings), 1.7 (body)
- **Letter spacing:** -0.005em on display, 0.12em on uppercase labels

### Inter — 正文与说明，保持中性，避免与衬线标题抢戏。

- **Substitute:** system-ui, -apple-system, sans-serif
- **Weights:** 300, 400
- **Sizes:** 13, 15, 17
- **Line height:** 1.5 (display), 1.5 (headings), 1.7 (body)
- **Letter spacing:** 0 on display, 0.12em on uppercase labels

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|---|---|---|---|---|---|---|
| display | Cormorant Garamond | 400 | 60px | 1.2 | — | `--text-display` |
| heading | Cormorant Garamond | 400 | 44px | 1.25 | — | `--text-heading` |
| subheading | Cormorant Garamond | 500 | 26px | 1.35 | — | `--text-subheading` |
| body-lg | Inter | 300 | 17px | 1.7 | — | `--text-body-lg` |
| body | Inter | 400 | 15px | 1.7 | — | `--text-body` |
| label | Inter | 400 | 13px | 1.5 | 0.12em | `--text-label` |

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
| 128 | 128px | `--spacing-128` |
| 192 | 192px | `--spacing-192` |

### Border Radius

| Element | Value |
|---|---|
| cards | 24px |
| buttons | 999px |
| inputs | 16px |
| washes | 999px |

- **Page max-width:** 1080px
- **Section gap:** 128px
- **Card padding:** 32px
- **Element gap:** 24px

## Components

### Wash Button

**Role:** 主行动按钮

蓝到水青的横向渐变（80% 不透明）、白字、999px 全圆角、无描边。字级 17px、衬线、padding 16px 32px，阴影 0 10px 30px 蓝 20%。hover 时渐变升到 90%、阴影扩到 40px、上浮 2px；按下缩放 0.98 并让阴影收回到 10px。过渡 500ms ease-in-out。

- **States:** hover: gradient 80%→90%, lift 2px; active: scale 0.98

### Wash Card

**Role:** 作品卡与内容卡

蜜桃 20% 到白到水青 20% 的三段对角渐变、24px 圆角、1px 蓝 10% 描边、内边距 32px、10px 模糊，内部右上角放一块 96px 的水青 30% 模糊圆。hover 时两端渐变升到 30%、圆斑放大 1.5 倍并加深到 40%、阴影扩到 40px。过渡 500ms，圆斑 700ms。

### Wash Input

**Role:** 表单与写作输入

白 60% 填充、1px 蓝 20% 描边、16px 圆角、padding 16px 20px、15px 衬线。占位符用蓝 40%。聚焦时描边升到 40%、填充升到 80%、加一层 0 10px 30px 蓝 10% 的柔光。过渡 300ms。

### Color Wash

**Role:** 背景晕染层

二到三块直径 256px 到 384px 的圆，填充蜜桃、水青或玫瑰的 20% 到 30%，模糊 64px，随意分布在页面两角与中心，彼此可叠压。不使用动画。整页不超过三块。

## Do's and Don'ts

### Do

- 所有色块都是大半径模糊圆，没有硬边
- 标题用衬线斜体
- hover 让色斑放大与加深
- 纸白底，不用冷白
- 每页晕染圆不超过三块
- 动效 500ms，色斑 700ms

### Don't

- 不要用硬边描边或锐利几何
- 不要用高饱和原色
- 不要用投影作为主要分层手段
- 不要在正文用衬线加粗
- 不要让晕染遮住文字
- 不要用三块以上的晕染叠在一起

## Surfaces

| Level | Name | Value | Purpose |
|---|---|---|---|
| 0 | Paper White | `#faf8f5` | 页面画布 |
| 1 | Wash Card | `rgba(255,255,255,0.60)` | 卡片与浮层 |

## Elevation

- **Card:** `0 10px 30px rgba(74,111,165,0.10)`
- **Card hover:** `0 12px 40px rgba(74,111,165,0.18)`

## Imagery

水彩原作、晕染质感、纸质纹理。允许在照片上叠一层纸纹并降低饱和度。不使用锐利摄影、硬边图形、3D 渲染与霓虹色。

## Layout

上限 1080px、容器内边距 32px，区块间距 128px。版面留白极多，文字块宽度控制在 34em 以内。允许标题跨栏并与晕染圆叠压。图片可用 24px 圆角或不规则裁切。

## Agent Prompt Guide

### Implementation Contract

- 以用户请求中的页面、用户任务和真实内容为依据，只实施指定范围；标明缺失的业务信息，不编造数据或能力。
- 先检查现有项目、技术栈与组件；沿用项目结构、路由和依赖，复用已有组件，不重建未要求的页面或功能。
- 沿用项目断点，调整窄屏与桌面的网格和留白；保留信息层级，避免意外横向溢出。
- 对本次涉及的交互，处理键盘焦点与减少动态效果；补齐适用的禁用、加载、空内容与错误状态。
- 完成后按项目现有脚本检查，仅报告实际运行的测试与视觉检查，并列出未验证项。

QUICK COLOR REFERENCE:

- text: `#4a6fa5`
- background: `#faf8f5`
- card: `rgba(255,255,255,0.60)`
- accent: `#e8a87c`
- secondary: `#85cdca`
- border: `rgba(74,111,165,0.20)`

EXAMPLE COMPONENT PROMPTS:

1. 做一个水彩卡片：background 用 135 度渐变 linear-gradient(135deg, rgba(232,168,124,0.2), #ffffff, rgba(133,205,202,0.2))，24px 圆角、1px rgba(74,111,165,0.1) 描边、内边距 32px、backdrop-blur 10px。右上角放一个 96px 的 rgba(133,205,202,0.3) 圆形并 blur(40px)。hover 时两端渐变升到 0.3、圆斑 scale(1.5) 并加深到 0.4，过渡 700ms。页面底色 #faf8f5，标题用衬线斜体 #4a6fa5。
