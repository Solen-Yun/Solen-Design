# 铅笔手绘风 — 风格参考

> 线不是画直的：虚线、波浪、轻微歪斜，像在纸上随手勾出来的。

**Theme:** light

铅笔手绘风的关键是「拒绝完美」。所有边框都是虚线或波浪线，卡片允许 -1 度倾斜，hover 时回到 0 度，阴影用交叉排线而不是实色模糊。纸底是暖米（#f5f0e8），主色是铅笔灰（#2c2c2c），强调色像彩色铅笔一样只有四支且不饱和。动效必须短促（150 到 200ms），因为铅笔的反馈是「画下去」，不是「飘起来」。这条风格最容易被做坏的地方是——把不规则做得太规律，反而变成装饰图案。

## Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Pencil Grey | `#2c2c2c` | `--color-pencil` | 全部线条、文字与描边。带一点暖的灰，模拟 2B 铅笔。 |
| Paper | `#f5f0e8` | `--color-paper` | 页面画布。偏黄的米色，比纯白更像速写本。 |
| Vermilion | `#e74c3c` | `--color-vermilion` | 重点标记与提醒，像红笔批注。 |
| Lake Blue | `#3498db` | `--color-lake-blue` | 链接与次级标记，是最冷静的一支彩色铅笔。 |
| Grass | `#27ae60` | `--color-grass` | 完成与勾选，用于手绘对勾与状态。 |
| Amber | `#f39c12` | `--color-amber` | 标注与高亮底色，用于荧光笔式的强调。 |

## Typography

### Caveat — 标题与手写标注。笔迹感是这套风格的人格，缺了就只剩虚线边框。

- **Substitute:** 'Comic Sans MS', 'Segoe Script', cursive
- **Weights:** 400, 700
- **Sizes:** 18, 22, 28, 40, 56
- **Line height:** 1.15 (display), 1.2 (headings), 1.6 (body)
- **Letter spacing:** 0.01em on display, 0.1em on uppercase labels

### Georgia — 正文。衬线正文比手写体更耐读，形成手写标题与印刷正文的对照。

- **Substitute:** 'Songti SC', serif
- **Weights:** 400, 700
- **Sizes:** 14, 16, 18
- **Line height:** 1.4 (display), 1.4 (headings), 1.7 (body)
- **Letter spacing:** 0 on display, 0.1em on uppercase labels

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|---|---|---|---|---|---|---|
| display | Caveat | 700 | 56px | 1.15 | — | `--text-display` |
| heading | Caveat | 700 | 40px | 1.2 | — | `--text-heading` |
| subheading | Caveat | 400 | 28px | 1.25 | — | `--text-subheading` |
| body-lg | Georgia | 400 | 18px | 1.7 | — | `--text-body-lg` |
| body | Georgia | 400 | 16px | 1.7 | — | `--text-body` |
| label | Caveat | 400 | 18px | 1.3 | 0.1em | `--text-label` |

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
| inputs | 2px |
| doodles | 40% 60% 70% 30% |

- **Page max-width:** 1080px
- **Section gap:** 96px
- **Card padding:** 32px
- **Element gap:** 24px

## Components

### Sketch Button

**Role:** 行动按钮

透明底、2px 虚线铅笔灰描边、2px 圆角、衬线斜体加粗、0.1em 字距、padding 12px 32px，阴影 4px 4px 0 铅笔灰 15%。hover 时填充硬切为铅笔灰、文字转纸色、阴影扩到 6px 并上浮 4px、旋转 1 度；按下时位移 4px 4px、旋转 -2 度、阴影归零。过渡 150ms。

- **Sizes:** padding 12px 32px
- **States:** hover: invert, lift 4px, rotate 1deg; active: translate 4px, rotate -2deg, shadow none

### Sketch Card

**Role:** 内容卡与便签

纸底、2px 实线铅笔灰描边（卡片允许实线，按钮用虚线）、2px 圆角、内边距 32px，默认倾斜 -1 度，阴影 5px 5px 0 铅笔灰 15%。hover 时旋转回到 0 度、上浮 4px、阴影扩到 8px，过渡 200ms。右上角可放 32px 的手绘圈（border-radius 40% 60% 70% 30%），hover 时出现并放大到 1.25。

### Sketch Input

**Role:** 表单与写作输入

透明底、仅底部 2px 波浪线（用 repeating-linear-gradient 模拟）、无左右描边、padding 8px 4px、16px 衬线。聚焦时波浪线转湖蓝并加粗到 3px，不改变盒子尺寸，不加外环。

### Hand Underline

**Role:** 标题与链接的手绘下划线

用一条 2px 的虚线或单周期 SVG 波浪线，长度比文字宽出 8%，位置下沉 2px，允许 1 度倾斜。hover 时下划线从长度 0 展开到 100%，时长 200ms，用 steps 或线性缓动而不是弹簧。

### Cross Hatched Shadow

**Role:** 排线阴影（替代模糊阴影）

用一层 45 度与 -45 度的 1px 线条重复图案（间距 6px、铅笔灰 15%）填充阴影区域，不加模糊。仅用于需要「体积」的插图与手绘元素，界面元素用硬偏移阴影即可。

## Do's and Don'ts

### Do

- 边框用虚线或波浪，不用完美直线
- 卡片允许 ±1 度倾斜
- 阴影用硬偏移或排线，不用模糊
- 纸色底，不用纯白
- 动效 150 到 200ms，短促直接
- 标题用手写体，正文用衬线

### Don't

- 不要用完美直线与对称圆角
- 不要用纯白背景
- 不要用渐变与玻璃模糊
- 不要用高饱和色
- 不要用超过 200ms 的平滑动画
- 不要让不规则变得有规律

## Surfaces

| Level | Name | Value | Purpose |
|---|---|---|---|
| 0 | Paper | `#f5f0e8` | 页面画布 |
| 1 | Card Paper | `#f5f0e8` | 卡片（与底色同，靠边框区分） |

## Elevation

- **Sketch offset:** `5px 5px 0 rgba(44,44,44,0.15)`
- **Sketch hover:** `8px 8px 0 rgba(44,44,44,0.20)`
- **Pressed:** `none`

## Imagery

手绘线稿、铅笔草稿、便签涂鸦。允许把照片处理成线稿后再上色。不使用写实摄影、渐变与任何平滑的矢量插画。

## Layout

上限 1080px、容器内边距 24px，区块间距 96px。元素允许 ±1 度倾斜制造手写感，但同一区块内倾斜方向要一致。留白可以不完全对称，像手账贴纸的排布。

## Agent Prompt Guide

### Implementation Contract

- 以用户请求中的页面、用户任务和真实内容为依据，只实施指定范围；标明缺失的业务信息，不编造数据或能力。
- 先检查现有项目、技术栈与组件；沿用项目结构、路由和依赖，复用已有组件，不重建未要求的页面或功能。
- 沿用项目断点，调整窄屏与桌面的网格和留白；保留信息层级，避免意外横向溢出。
- 对本次涉及的交互，处理键盘焦点与减少动态效果；补齐适用的禁用、加载、空内容与错误状态。
- 完成后按项目现有脚本检查，仅报告实际运行的测试与视觉检查，并列出未验证项。

QUICK COLOR REFERENCE:

- text: `#2c2c2c`
- background: `#f5f0e8`
- accent: `#e74c3c`
- link: `#3498db`
- success: `#27ae60`
- highlight: `#f39c12`

EXAMPLE COMPONENT PROMPTS:

1. 做一个手绘风格按钮：透明底、2px dashed #2c2c2c 描边、2px 圆角、衬线斜体 700、0.1em 字距、padding 12px 32px、box-shadow 4px 4px 0 rgba(44,44,44,0.15)。hover 时背景变 #2c2c2c、文字变 #f5f0e8、阴影扩到 6px、transform translateY(-4px) rotate(1deg)。active 时 translate(4px,4px) rotate(-2deg) 且阴影 none。transition 150ms。页面底色 #f5f0e8。
