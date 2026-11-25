# 手绘涂鸦风 — 风格参考

> 笔记本上的随手涂画：虚线、彩色马克笔、胶带与图钉。

**Theme:** light

手绘涂鸦风把界面做成一页贴满便签的笔记：奶白纸底（#fffef5），所有边框都是 2 到 3px 的虚线，阴影不是灰的而是彩色的实心偏移（黄、红或青），标题允许 -3 度的斜切，卡片 hover 时轻微旋转。装饰语言包括胶带条、图钉、回形针——它们是这套风格区别于「铅笔手绘」的关键：铅笔更安静，涂鸦更热闹。字体用无衬线加粗，绝不使用等宽，因为笔记里的字是随手写的。

## Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Ink | `#2c2c2c` | `--color-ink` | 虚线边框、标题与主要文字。像黑色签字笔。 |
| Cream | `#fffef5` | `--color-cream` | 页面与卡片底色。极浅的暖黄，像再生纸。 |
| Marker Red | `#ff6b6b` | `--color-marker-red` | 第一强调与阴影色。卡片 hover 时阴影会换成它。 |
| Marker Teal | `#4ecdc4` | `--color-marker-teal` | 链接与次级强调，按钮 hover 时的阴影色。 |
| Marker Yellow | `#ffd93d` | `--color-marker-yellow` | 高亮与默认阴影色，用于强调一块区域。 |
| Olive | `#a98d16` | `--color-olive` | 唯一的暗色强调，用于压在黄色上的文字。 |

## Typography

### Baloo 2 — 标题与按钮，字重 800 并允许 -3 度斜切。圆润的无衬线是涂鸦的语气。

- **Substitute:** 'Comic Sans MS', 'Trebuchet MS', sans-serif
- **Weights:** 600, 800
- **Sizes:** 14, 18, 24, 32, 44
- **Line height:** 1.1 (display), 1.2 (headings), 1.55 (body)
- **Letter spacing:** 0.02em on display, 0.12em on uppercase labels

### Nunito — 正文与说明，保持可读但仍有手写气质。

- **Substitute:** 'Segoe UI', system-ui, sans-serif
- **Weights:** 400, 600
- **Sizes:** 14, 16, 18
- **Line height:** 1.4 (display), 1.4 (headings), 1.65 (body)
- **Letter spacing:** 0 on display, 0.12em on uppercase labels

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|---|---|---|---|---|---|---|
| display | Baloo 2 | 800 | 44px | 1.1 | 0.02em | `--text-display` |
| heading | Baloo 2 | 800 | 32px | 1.15 | — | `--text-heading` |
| subheading | Baloo 2 | 600 | 24px | 1.25 | — | `--text-subheading` |
| body-lg | Nunito | 600 | 18px | 1.6 | — | `--text-body-lg` |
| body | Nunito | 400 | 16px | 1.65 | — | `--text-body` |
| label | Baloo 2 | 600 | 14px | 1.35 | 0.12em | `--text-label` |

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
| doodles | 60% 40% 50% 50% |

- **Page max-width:** 1080px
- **Section gap:** 96px
- **Card padding:** 32px
- **Element gap:** 24px

## Components

### Doodle Button

**Role:** 行动按钮

奶白底、2px 虚线墨黑描边、2px 圆角、18px/800 全大写 0.12em 字距、padding 12px 24px，阴影 4px 4px 0 标记红。hover 时填充硬切墨黑、文字转奶白、上浮 4px、右移 1px、旋转 1 度、阴影换成标记青并扩到 6px；按下时位移 3px 3px、缩放 0.98、旋转归零、阴影去除。过渡 150ms 线性。

- **Sizes:** padding 12px 24px; label 18px
- **States:** hover: invert, rotate 1deg, teal shadow; active: translate 3px, shadow none

### Note Card

**Role:** 便签卡与内容卡

奶白底、3px 虚线墨黑描边、2px 圆角、内边距 32px，阴影 5px 5px 0 标记黄。标题 32px/800，默认 -3 度斜切，hover 时归零。hover 卡片上浮 4px、旋转 -1 度、阴影换标记红并扩到 8px。过渡 150ms 线性。

### Tape Strip

**Role:** 装饰胶带

宽 96px、高 24px、旋转 -4 度、半透明标记黄 80%、左右两端各一个 2px 的锯齿（clip-path），无边框无阴影。放在卡片的左上或右上角，压住边框 4px。纯装饰，不承载交互。

### Scribble Input

**Role:** 表单与笔记输入

奶白底、2px 虚线墨黑描边、2px 圆角、padding 12px 16px、16px 无衬线。占位符墨黑 30%。聚焦时描边转标记红并加 2px 2px 0 标记黄的硬阴影，不改变盒子尺寸。过渡 200ms。

### Doodle Underline

**Role:** 手绘下划线与圈注

用单周期 SVG 波浪线（stroke 2px、颜色取标记色之一）压在文字下方 4px，长度比文字宽 6%。圈注用椭圆、倾斜 6 度、不闭合（留 12px 缺口），只用一次以保持强调的稀缺。

## Do's and Don'ts

### Do

- 所有边框用虚线，2 到 3px
- 阴影用彩色实心偏移
- 卡片允许 ±2 度旋转
- 用胶带、图钉等实物装饰
- 标题加粗并允许 -3 度斜切
- 动效 150ms 线性

### Don't

- 不要用实线边框
- 不要用灰色模糊阴影
- 不要用等宽字体
- 不要用渐变
- 不要用精确的直角与几何
- 不要用大圆角

## Surfaces

| Level | Name | Value | Purpose |
|---|---|---|---|
| 0 | Cream | `#fffef5` | 页面画布 |
| 1 | Note | `#fffef5` | 卡片（同色，靠虚线与彩影区分） |

## Elevation

- **Default:** `5px 5px 0 #ffd93d`
- **Hover:** `8px 8px 0 #ff6b6b`
- **Button default:** `4px 4px 0 #ff6b6b`
- **Pressed:** `none`

## Imagery

涂鸦插画、便签照片、手写步骤图。允许把照片贴成「拍立得」并加胶带。不使用写实摄影、渐变与精确矢量插画。

## Layout

上限 1080px、容器内边距 24px，区块间距 96px。卡片允许 ±2 度旋转，同屏最多三张带旋转。元素可略微错位，像贴在墙上的便签。整体保持可读的网格，不追求整齐。

## Agent Prompt Guide

### Implementation Contract

- 以用户请求中的页面、用户任务和真实内容为依据，只实施指定范围；标明缺失的业务信息，不编造数据或能力。
- 先检查现有项目、技术栈与组件；沿用项目结构、路由和依赖，复用已有组件，不重建未要求的页面或功能。
- 沿用项目断点，调整窄屏与桌面的网格和留白；保留信息层级，避免意外横向溢出。
- 对本次涉及的交互，处理键盘焦点与减少动态效果；补齐适用的禁用、加载、空内容与错误状态。
- 完成后按项目现有脚本检查，仅报告实际运行的测试与视觉检查，并列出未验证项。

QUICK COLOR REFERENCE:

- text: `#2c2c2c`
- background: `#fffef5`
- red: `#ff6b6b`
- teal: `#4ecdc4`
- yellow: `#ffd93d`
- olive: `#a98d16`

EXAMPLE COMPONENT PROMPTS:

1. 做一个涂鸦风按钮：背景 #fffef5、2px dashed #2c2c2c 边框、2px 圆角、18px/800 全大写 0.12em 字距、padding 12px 24px、box-shadow 4px 4px 0 #ff6b6b。hover 时背景变 #2c2c2c、文字变 #fffef5、translate(-1px, -4px) rotate(1deg)、阴影换成 6px 6px 0 #4ecdc4。active 时 translate(3px,3px) scale(0.98) 且阴影 none。transition 150ms linear。页面底色 #fffef5。
