# 拼贴艺术风 — 风格参考

> 剪下来、撕开口、歪着贴上去：一页手工拼贴的杂志内页。

**Theme:** light

拼贴艺术风模拟手工拼贴：纸片被剪下、撕出毛边、用胶粘在旧纸上，边缘对不齐，角度也不统一。技术上靠四件事——clip-path polygon 做撕纸边、任意角度旋转（rotate-[Ndeg] 而不是 inline transform，避免与 hover 冲突）、硬偏移阴影模拟纸片厚度、以及混合字体交替（衬线、无衬线、等宽在同一页轮流出现）。它禁止平滑渐变、禁止 8px 以上的圆角、禁止毛玻璃，因为手工拼贴的每一块都是实体纸。

## Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Ink | `#2d2d2d` | `--color-ink` | 文字与剪影描边。像黑色记号笔。 |
| Aged Paper | `#f5f0e8` | `--color-aged-paper` | 页面底。泛黄的纸，所有纸片都贴在上面。 |
| Clipping Red | `#e74c3c` | `--color-clipping-red` | 第一块撞色纸片，也是最常见的强调。 |
| Clipping Blue | `#3498db` | `--color-clipping-blue` | 第二块撞色，与红形成主对位。 |
| Clipping Orange | `#f39c12` | `--color-clipping-orange` | 暖色纸片与高亮标签。 |
| Clipping Violet | `#9b59b6` | `--color-clipping-violet` | 最异质的一支，用于让画面失去秩序感。 |

## Typography

### Playfair Display — 大标题用衬线，模拟从杂志上剪下来的标题块。

- **Substitute:** Georgia, 'Songti SC', serif
- **Weights:** 700, 900
- **Sizes:** 18, 24, 34, 48, 64
- **Line height:** 1.05 (display), 1.15 (headings), 1.6 (body)
- **Letter spacing:** -0.02em on display, 0.06em on uppercase labels

### Inter — 正文与标签用的无衬线，字体在页面中交替出现是本风格的语法。

- **Substitute:** system-ui, 'Segoe UI', sans-serif
- **Weights:** 400, 700, 900
- **Sizes:** 13, 15, 18
- **Line height:** 1.4 (display), 1.35 (headings), 1.6 (body)
- **Letter spacing:** 0 on display, 0.06em on uppercase labels

### JetBrains Mono — 编号、坐标与注释标签，像打字机打的标签条。

- **Substitute:** ui-monospace, 'Courier New', monospace
- **Weights:** 400, 700
- **Sizes:** 11, 13
- **Line height:** 1.4 (display), 1.4 (headings), 1.5 (body)
- **Letter spacing:** 0.04em on display, 0.12em on uppercase labels

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|---|---|---|---|---|---|---|
| display | Playfair Display | 900 | 64px | 1.05 | -0.02em | `--text-display` |
| heading | Playfair Display | 700 | 48px | 1.1 | — | `--text-heading` |
| subheading | Inter | 900 | 34px | 1.15 | — | `--text-subheading` |
| body-lg | Inter | 400 | 18px | 1.55 | — | `--text-body-lg` |
| body | Inter | 400 | 15px | 1.6 | — | `--text-body` |
| label | JetBrains Mono | 400 | 13px | 1.4 | 0.12em | `--text-label` |

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
| cards | 2px |
| buttons | 2px |
| stickers | 999px |
| torn | 0 |

- **Page max-width:** 1200px
- **Section gap:** 96px
- **Card padding:** 28px
- **Element gap:** 20px

## Components

### Torn Paper Card

**Role:** 撕纸卡片（核心组件）

旧纸色或撞色填充、零圆角，用 clip-path 的多边形（8 到 12 个顶点，各点上下随机偏移 2 到 6px）做出撕开的毛边。硬偏移阴影 6px 6px 0 墨色 28%。默认旋转 -2 到 -1 度。hover 时旋转归零并上浮 2px，阴影扩到 8px。过渡 200ms。

- **States:** hover: rotation to 0, lift 2px

### Cutout Tag

**Role:** 剪下来的标签条

高 28px、内边距 0 12px、零圆角，左右两端用 clip-path 切成斜角（各 8px），填撞色之一，文字用等宽 13px 全大写 0.12em。整体旋转 1 到 3 度，硬阴影 3px 3px 0 墨 22%。

### Mixed Type Stack

**Role:** 混合字体排版组

同一区块内故意混用三种字体：标题衬线 900、副标题无衬线 900、标签等宽。三者各自带不同的旋转（-2、0、+2 度）与不同的底色条，形成「分别剪下来再拼」的效果。

### Tape Strip

**Role:** 胶带

96 到 160px 长、20px 高、旋转 -6 到 6 度，填半透明撞色（60%）或半透明白，两端用 clip-path 切锯齿。压在纸片的角上，跨过边缘 8px。无边框无阴影。

### Cut Mark Border

**Role:** 剪切痕迹边框

2px 虚线或实线边框，颜色取墨 40%，配合一个小剪刀图标或沿边的短刻度线，暗示「这块是沿着这条线剪下来的」。只用于强调某一个元素，不滥用。

## Do's and Don'ts

### Do

- 用 clip-path 做撕纸与斜角
- 旋转用 rotate-[Ndeg] 不用 inline transform
- 硬偏移阴影模拟纸片厚度
- 三种字体在同页交替
- 旧纸底，纸片贴在上面
- 每块旋转 -3 到 3 度

### Don't

- 不要用平滑渐变
- 不要用 8px 以上圆角
- 不要用毛玻璃
- 不要让所有块角度一致
- 不要用统一字体
- 不要让撕边完全规律

## Surfaces

| Level | Name | Value | Purpose |
|---|---|---|---|
| 0 | Aged Paper | `#f5f0e8` | 页面底 |
| 1 | Cutout Paper | `#fbf7ef` | 纸片 |
| 2 | Clipping | `#e74c3c` | 撞色纸片 |

## Elevation

- **Paper lift:** `6px 6px 0 rgba(45,45,45,0.28)`
- **Paper lift sm:** `3px 3px 0 rgba(45,45,45,0.22)`
- **Pressed:** `none`

## Imagery

剪报照片、杂志碎片、手绘涂鸦、标签与印花。图像必须有清晰剪裁边缘（可带白边），允许叠两层不同来源的碎片。不使用平滑渐变、圆形裁切与统一风格的摄影。

## Layout

上限 1200px、容器内边距 24px，区块间距 96px。元素允许互相覆盖与错位，旋转范围 -3 到 3 度。整体保持一条隐形的中轴让拼贴不至于失控，但每块都偏离它一点。

## Agent Prompt Guide

### Implementation Contract

- 以用户请求中的页面、用户任务和真实内容为依据，只实施指定范围；标明缺失的业务信息，不编造数据或能力。
- 先检查现有项目、技术栈与组件；沿用项目结构、路由和依赖，复用已有组件，不重建未要求的页面或功能。
- 沿用项目断点，调整窄屏与桌面的网格和留白；保留信息层级，避免意外横向溢出。
- 对本次涉及的交互，处理键盘焦点与减少动态效果；补齐适用的禁用、加载、空内容与错误状态。
- 完成后按项目现有脚本检查，仅报告实际运行的测试与视觉检查，并列出未验证项。

QUICK COLOR REFERENCE:

- text: `#2d2d2d`
- background: `#f5f0e8`
- paper: `#fbf7ef`
- red: `#e74c3c`
- blue: `#3498db`
- orange: `#f39c12`

EXAMPLE COMPONENT PROMPTS:

1. 做一个拼贴风卡片：背景 #fbf7ef、零圆角、用 clip-path: polygon(0 2%,8% 0,20% 3%,35% 0,50% 2%,65% 0,80% 3%,92% 0,100% 2%,100% 98%,90% 100%,75% 97%,60% 100%,45% 98%,30% 100%,15% 97%,0 100%) 做出撕纸边、box-shadow 6px 6px 0 rgba(45,45,45,0.28)、transform rotate(-1.5deg)。标题用衬线 48px/700，副标题用无衬线 34px/900 并 rotate(1deg)，左上角贴一条 120px 长、旋转 -4 度的半透明红色胶带（clip-path 切锯齿）。hover 时 rotate(0)、translateY(-2px)，transition 200ms。页面底色 #f5f0e8。
