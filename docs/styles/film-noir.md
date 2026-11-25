# 黑色电影 — 风格参考

> 一束斜光切开黑房间：其余全部藏在阴影里。

**Theme:** dark

黑色电影来自 1940 到 50 年代的黑色片：极端明暗对比、深灰阶分层、斜向光影、以及只在必要时出现的一抹猩红（#c41e3a）。它不用颜色造层次而用亮度——卡片之间靠 #1a1a1a 与 #262626 这类极微妙的灰差区分，光影用线性渐变模拟，hover 只改亮度不改色相。标题用衬线斜体，像片头字幕。禁令是：不许彩色背景、不许高饱和色（猩红只作点缀）、不许大圆角。

## Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Film Black | `#0a0a0a` | `--color-film-black` | 页面底与最深的阴影。近纯黑，让光看起来是打上去的。 |
| Screen Grey | `#1a1a1a` | `--color-screen-grey` | 第一层抬升面。只比底色亮一档。 |
| Second Grey | `#262626` | `--color-second-grey` | 第二层抬升面与卡片内部。 |
| Smoke White | `#f5f5f0` | `--color-smoke-white` | 标题与主要文字。略带暖的灰白，像旧拷贝。 |
| Crimson | `#c41e3a` | `--color-crimson` | 唯一的彩色，只作点缀：一个标记、一条线、一次警告。 |
| Brass | `#d4af37` | `--color-brass` | 极少量用于「贵」的暗示，如奖项与年份。 |

## Typography

### Playfair Display — 标题用衬线斜体，像 1940 年代的片头字幕。正文用同族正体，行高 1.7。

- **Substitute:** Georgia, 'Songti SC', serif
- **Weights:** 400, 700
- **Sizes:** 20, 28, 38, 52, 72
- **Line height:** 1.1 (display), 1.2 (headings), 1.6 (body)
- **Letter spacing:** -0.01em on display, 0.14em on uppercase labels

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|---|---|---|---|---|---|---|
| display | Playfair Display | 700 | 72px | 1.1 | -0.01em | `--text-display` |
| heading | Playfair Display | 700 | 52px | 1.15 | — | `--text-heading` |
| subheading | Playfair Display | 400 | 38px | 1.25 | — | `--text-subheading` |
| body-lg | Playfair Display | 400 | 28px | 1.4 | — | `--text-body-lg` |
| body | Playfair Display | 400 | 20px | 1.7 | — | `--text-body` |
| label | Playfair Display | 700 | 20px | 1.4 | 0.14em | `--text-label` |

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
| cards | 4px |
| buttons | 2px |
| inputs | 2px |

- **Page max-width:** 1120px
- **Section gap:** 128px
- **Card padding:** 32px
- **Element gap:** 24px

## Components

### Shaft Card

**Role:** 斜光卡片（核心组件）

#1a1a1a 填充、4px 圆角、1px #2e2e2e 描边、内边距 32px。关键是用一层线性渐变模拟斜光：linear-gradient(115deg, rgba(255,255,255,0.08) 0%, transparent 45%)，从左上打入。标题 38px 衬线斜体烟白，正文 20px 烟白 70%。hover 时整体亮度升 8%（filter: brightness），绝不改色相。

- **States:** hover: brightness +8%

### Noir Button

**Role:** 行动按钮

透明底、1px 烟白 30% 描边、2px 圆角、20px/700、字距 0.14em、padding 12px 32px。hover 时描边升到 70%、文字从 85% 升到 100%、背景加烟白 4%；按下时亮度降 10%。过渡 400ms ease-out。

- **Sizes:** padding 12px 32px; label 20px
- **States:** hover: border 70%, brighter text; active: brightness -10%

### Crimson Mark

**Role:** 猩红标记

一条 2px、长 32 到 64px 的猩红横线，或一个 8px 的猩红圆点，或一行猩红文字。全页只允许出现一到两处，它是画面的「出血点」。绝不铺成色块。

### Diagonal Shadow

**Role:** 斜向阴影带

一个绝对定位的斜向条带（rotate(-18deg)）、宽 200 到 400px、填黑 60% 并加 120px 模糊，压在内容上但 pointer-events: none。它模拟百叶窗或门框投下的影，单屏最多两处。

### Smoke Field

**Role:** 暗场输入

#1a1a1a 填充、2px 圆角、1px #2e2e2e 描边、padding 12px 16px、20px 衬线。占位符烟白 35%。聚焦时描边转烟白 50% 并加 1px 外环。

## Do's and Don'ts

### Do

- 极端明暗对比，深灰阶分层
- 用线性渐变模拟斜光
- hover 只改亮度不改色相
- 标题用衬线斜体
- 猩红只作点缀，一到两处
- 圆角不超过 4px

### Don't

- 不要用彩色背景
- 不要用高饱和色（猩红除外）
- 不要用大圆角
- 不要把猩红铺成色块
- 不要用平光摄影
- 不要用彩色图像

## Surfaces

| Level | Name | Value | Purpose |
|---|---|---|---|
| 0 | Film Black | `#0a0a0a` | 页面底 |
| 1 | Screen Grey | `#1a1a1a` | 第一层 |
| 2 | Second Grey | `#262626` | 第二层 |

## Elevation

- **None:** `none — light is faked with gradients`
- **Card:** `0 24px 60px rgba(0,0,0,0.70)`

## Imagery

黑白摄影：人物侧影、百叶窗光、雨夜街道、烟雾、烟头特写。必须有强方向光与深阴影。允许把彩色照片转成高对比黑白。不使用彩色图像、平光摄影与柔和插画。

## Layout

上限 1120px、容器内边距 24px，区块间距 128px。允许斜向构图与元素错位。整页以黑为主，靠不同层的暗灰区分区域，几乎不用留白做分隔。

## Agent Prompt Guide

### Implementation Contract

- 以用户请求中的页面、用户任务和真实内容为依据，只实施指定范围；标明缺失的业务信息，不编造数据或能力。
- 先检查现有项目、技术栈与组件；沿用项目结构、路由和依赖，复用已有组件，不重建未要求的页面或功能。
- 沿用项目断点，调整窄屏与桌面的网格和留白；保留信息层级，避免意外横向溢出。
- 对本次涉及的交互，处理键盘焦点与减少动态效果；补齐适用的禁用、加载、空内容与错误状态。
- 完成后按项目现有脚本检查，仅报告实际运行的测试与视觉检查，并列出未验证项。

QUICK COLOR REFERENCE:

- text: `#f5f5f0`
- background: `#0a0a0a`
- raised: `#1a1a1a`
- higher: `#262626`
- crimson: `#c41e3a`
- brass: `#d4af37`

EXAMPLE COMPONENT PROMPTS:

1. 做一个黑色电影风格卡片：#1a1a1a 填充、4px 圆角、1px #2e2e2e 描边、内边距 32px。叠一层对角线光：background-image linear-gradient(115deg, rgba(255,255,255,0.08) 0%, transparent 45%)。标题 38px Playfair Display 斜体、色 #f5f5f0；正文 20px 衬线、行高 1.7、色 rgba(245,245,240,0.7)。左下角放一条 2px、48px 长的猩红 #c41e3a 横线作为唯一彩色。hover 时整体 filter: brightness(1.08)，不改色相。页面底色 #0a0a0a。
