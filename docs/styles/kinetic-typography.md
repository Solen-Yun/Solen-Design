# 动力学排印 — 风格参考

> 字就是界面：它逐个到场、字重会呼吸、宽度跟着滚动速度伸展。

**Theme:** dark

动力学排印把可变字体当成动画本体：近黑舞台（#0b0b0c）配暖骨白文字（#f4f1eb），字母逐个入场、字重呼吸、宽度随滚动速度伸展，唯一的强调色是信号橙（#ff4d00），只落在主 CTA、关键词与 hover 态。它的技术纪律比视觉更硬——只许动 transform、opacity 与 font-variation-settings，绝不动 top、left、width、height（那会重排卡顿）；离散入场用 expo-out 0.7 到 0.9 秒，hover 用 0.3 到 0.5 秒，超过 1.2 秒或对一次性过渡用 linear 都算错；一屏只能有一个主导动效（一次一个主角）。

## Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Ink Black | `#0b0b0c` | `--color-ink-black` | 舞台底。近黑，让骨白文字与橙色跳跃。 |
| Bone | `#f4f1eb` | `--color-bone` | 全部文字。微暖的白，在深底上不刺眼。 |
| Signal Orange | `#ff4d00` | `--color-signal-orange` | 唯一强调色：主 CTA、关键词与 hover。绝不作大面积底色。 |
| Panel | `#141416` | `--color-panel` | 卡片与浮层，只比底色亮一档。 |
| Muted Grey | `#8a857b` | `--color-muted-grey` | 次级文字、元数据与时间戳。 |

## Typography

### Inter Variable — 可变字体是这套风格的动画引擎：字重与字宽随滚动与交互实时变化，标题 96 到 132px。

- **Substitute:** 'Helvetica Neue', system-ui, sans-serif
- **Weights:** 300, 500, 700, 900
- **Sizes:** 14, 18, 26, 40, 64, 96, 132
- **Line height:** 0.92 (display), 1 (headings), 1.5 (body)
- **Letter spacing:** -0.04em on display, 0.12em on uppercase labels

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|---|---|---|---|---|---|---|
| display | — | 900 | 132px | 0.92 | -0.04em | `--text-display` |
| heading-lg | — | 900 | 96px | 0.95 | -0.03em | `--text-heading-lg` |
| heading | — | 700 | 64px | 1 | -0.03em | `--text-heading` |
| subheading | — | 700 | 40px | 1.05 | — | `--text-subheading` |
| body-lg | — | 500 | 18px | 1.5 | — | `--text-body-lg` |
| body | — | 300 | 14px | 1.5 | — | `--text-body` |
| label | — | 500 | 14px | 1.4 | 0.12em | `--text-label` |

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
| 160 | 160px | `--spacing-160` |

### Border Radius

| Element | Value |
|---|---|
| cards | 2px |
| buttons | 2px |
| inputs | 2px |

- **Page max-width:** 1360px
- **Section gap:** 160px
- **Card padding:** 24px
- **Element gap:** 24px

## Components

### Letter Stagger

**Role:** 字母逐个入场（核心动效）

标题按字符拆成 span，每个字符初始 translateY(110%) 加 opacity 0，进入视口时按 30 到 40ms 间隔依次回到 0 与 1，缓动 cubic-bezier(0.22, 1, 0.36, 1)（expo-out），单字符时长 0.7 到 0.9 秒。父容器加 overflow hidden 形成遮罩上升，绝不用纯 opacity 淡入代替。prefers-reduced-motion 时直接显示终态。

- **Sizes:** stagger 30–40ms; per-letter 0.7–0.9s

### Variable Breath

**Role:** 字重与字宽呼吸

用 font-variation-settings 在 2.4 秒内循环改变 wght（300 到 900）与 wdth（85 到 100），缓动 ease-in-out。连续装饰循环不受一次性过渡的 1.2 秒上限约束。单屏最多一个元素在做呼吸，否则会互相打架。

- **Sizes:** 2.4s ease-in-out loop

### Scroll Marquee

**Role:** 跑马灯

内容复制两份、容器 overflow hidden，用 translateX 从 0 到 -50% 的 24 秒 linear 无缝循环。hover 时暂停。自动播放超过 5 秒且与其他内容并列时，必须提供可持续使用的暂停／停止／隐藏控制，不能只靠 hover。

- **Sizes:** 24s linear, seamless

### Signal CTA

**Role:** 主行动按钮

信号橙填充、墨黑文字、2px 圆角、无描边，18px/700、padding 14px 32px。hover 时填充提亮 8% 并把文字变成可变字重的 900（0.4 秒 expo-out）；按下缩放 0.98。过渡只动 opacity、transform 与 font-variation-settings。

- **Sizes:** padding 14px 32px; label 18px
- **States:** hover: weight to 900, brighter; active: scale 0.98

### Velocity Widen

**Role:** 随滚动速度改变字宽

读取滚动速度（在 rAF 内计算两帧 scrollY 差值并缓存），映射到 font-variation-settings 的 wdth（85 到 100）与 letter-spacing（-0.04em 到 -0.02em）。速度衰减用 0.3 秒的阻尼，静止时回到默认值。禁止在 scroll 事件里读布局属性。

## Do's and Don'ts

### Do

- 只动 transform、opacity、font-variation-settings
- 入场用 expo-out 0.7 到 0.9 秒
- 一屏只有一个主导动效
- 跑马灯用 24 秒 linear 无缝循环
- 自动播放超过 5 秒必须提供暂停控制
- 信号橙只给 CTA、关键词与 hover

### Don't

- 不要动布局属性（top/left/width/height）
- 不要一屏跑多个主效
- 不要让图像抢戏
- 不要超过一个强调色
- 不要用纯 opacity 淡入代替遮罩上升
- 不要让一次性过渡超过 1.2 秒或用 linear

## Surfaces

| Level | Name | Value | Purpose |
|---|---|---|---|
| 0 | Ink Black | `#0b0b0c` | 舞台 |
| 1 | Panel | `#141416` | 卡片 |

## Elevation

- **None:** `none — the type carries the depth`
- **Panel:** `0 24px 60px rgba(0,0,0,0.60)`

## Imagery

几乎没有图像——文字就是图像。允许极低不透明度的噪点或网格作为舞台纹理。不使用插画与摄影，任何有形象的图像都会抢走字的戏。

## Layout

上限 1360px、容器内边距 32px，区块间距 160px。字可以极大并跨越整个宽度，允许与容器边缘齐平或溢出。一屏只安排一个主导动效，其余元素保持静止。

## Agent Prompt Guide

### Implementation Contract

- 以用户请求中的页面、用户任务和真实内容为依据，只实施指定范围；标明缺失的业务信息，不编造数据或能力。
- 先检查现有项目、技术栈与组件；沿用项目结构、路由和依赖，复用已有组件，不重建未要求的页面或功能。
- 沿用项目断点，调整窄屏与桌面的网格和留白；保留信息层级，避免意外横向溢出。
- 对本次涉及的交互，处理键盘焦点与减少动态效果；补齐适用的禁用、加载、空内容与错误状态。
- 完成后按项目现有脚本检查，仅报告实际运行的测试与视觉检查，并列出未验证项。

QUICK COLOR REFERENCE:

- text: `#f4f1eb`
- background: `#0b0b0c`
- accent: `#ff4d00`
- panel: `#141416`
- muted: `#8a857b`
- border: `rgba(244,241,235,0.12)`

EXAMPLE COMPONENT PROMPTS:

1. 做一个动力学排印首屏：舞台底 #0b0b0c、文字 #f4f1eb。标题 132px/900、行高 0.92、字距 -0.04em，按字符拆成 span，每个初始 translateY(110%)、opacity 0，进入视口时按 35ms 间隔依次回到原位，单字符 0.8s cubic-bezier(0.22,1,0.36,1)，父容器 overflow hidden。主 CTA 用 #ff4d00 填充、墨黑文字、2px 圆角。跑马灯复制两份内容、translateX 0 → -50%、24s linear 无缝循环、hover 暂停。全站只动 transform、opacity 与 font-variation-settings，一屏只一个主导动效。
