# 电影视频首屏 — 风格参考

> 一帧海报先到，然后画面开始动——像预告片的第一镜。

**Theme:** dark

电影视频首屏用一个短片建立氛围：海报帧先渲染成为 LCP，静音视频在进入视口后才加载并自动循环，文字压在可读性遮罩上。它的技术纪律比视觉更严格——视频绝不能是 LCP 依赖，必须有 poster，绝不能 preload=auto，关键信息绝不能放进视频（视频可能不播或被降级），不能有声自动播，循环必须无缝且运动要慢。prefers-reduced-motion 与移动端降级都必须处理，否则在弱网设备上会直接变成一片黑。

## Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Film Black | `#05060a` | `--color-film-black` | 视频区与页面底。近黑带蓝，让金色强调显得更暖。 |
| Warm White | `#f3efe8` | `--color-warm-white` | 浅色区块与文字。偏暖的米白，像放映厅的银幕。 |
| Warm Gold | `#e4c063` | `--color-warm-gold` | 唯一的强调色：主按钮、场景编号与高亮。 |
| Card Dark | `#141821` | `--color-card-dark` | 卡片与信息块。比影黑亮一点，用于在不破坏暗场的前提下分区。 |
| Silver | `#9aa6b8` | `--color-silver` | 次级文字与元数据，像字幕的灰。 |

## Typography

### Inter — 全站唯一字体。首屏标题 40 到 56px、500 字重，小标签 11px 全大写 0.16em。

- **Substitute:** -apple-system, 'Helvetica Neue', system-ui, sans-serif
- **Weights:** 400, 500, 600
- **Sizes:** 11, 13, 16, 24, 40, 56
- **Line height:** 1.05 (display), 1.15 (headings), 1.55 (body)
- **Letter spacing:** -0.02em on display, 0.16em on uppercase labels

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|---|---|---|---|---|---|---|
| display | — | 500 | 56px | 1.05 | -0.02em | `--text-display` |
| heading-lg | — | 500 | 40px | 1.1 | -0.02em | `--text-heading-lg` |
| heading | — | 600 | 24px | 1.2 | — | `--text-heading` |
| body-lg | — | 400 | 16px | 1.55 | — | `--text-body-lg` |
| body | — | 400 | 13px | 1.55 | — | `--text-body` |
| label | — | 500 | 11px | 1.4 | 0.16em | `--text-label` |

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

### Border Radius

| Element | Value |
|---|---|
| cards | 12px |
| buttons | 999px |
| inputs | 999px |

- **Page max-width:** 1200px
- **Section gap:** 128px
- **Card padding:** 24px
- **Element gap:** 16px

## Components

### Gold Button

**Role:** 主行动按钮

暖金填充、影黑文字、999px 全圆角、无描边，16px/600、padding 14px 28px。hover 时填充提亮到 #efce78；按下缩放 0.98。可带一个 12px 的播放三角图标，间距 8px。过渡 300ms。

- **Sizes:** padding 14px 28px; label 16px
- **States:** hover: #efce78; active: scale 0.98

### Video Stage

**Role:** 视频首屏（签名组件）

高 100vh、overflow hidden、影黑底。先渲染 poster 图（AVIF，作为 LCP），video 元素设 muted、loop、playsInline、preload="none"，用 IntersectionObserver 在 25% 入视时调用 load 与 play。上覆一层从底部黑 75% 到透明的渐变遮罩。prefers-reduced-motion 时完全不播放，只保留 poster。移动端可降级为 poster 加一张静帧。

- **Sizes:** 100vh; poster as LCP

### Scene Card

**Role:** 场景卡与影片条目

16:9 比例、12px 圆角、overflow hidden，底图用 poster 静帧并叠一层从底部黑 75% 到透明的遮罩。左下角放 11px 全大写 0.16em 的暖金场景编号，下方 18px/600 白色标题。整卡不加边框。

### Ghost Button

**Role:** 次级行动

白 10% 填充、12px 模糊、999px 全圆角、1px 白 25% 描边、白字 16px/500、padding 14px 28px。hover 时填充升到 18%。用于「了解更多」这类次级动作。

### Pill Field

**Role:** 邮箱与订阅输入

白 10% 填充、12px 模糊、999px 全圆角、1px 白 25% 描边、padding 12px 20px、16px 字，占位符白 50%。聚焦时描边转暖金 70%、填充升到 15%。

## Do's and Don'ts

### Do

- poster 先渲染并作为 LCP
- video 用 preload=none，入视才加载
- 必须静音、playsInline、无缝循环
- 文字必须压在遮罩上
- 关键信息放在 DOM，不放视频里
- reduced-motion 时只留 poster

### Don't

- 不要让视频成为 LCP 依赖
- 不要省略 poster
- 不要用 preload=auto 加载大视频
- 不要把关键信息放进视频
- 不要有声自动播
- 不要用快切或无缝失败的循环

## Surfaces

| Level | Name | Value | Purpose |
|---|---|---|---|
| 0 | Film Black | `#05060a` | 视频区与页面底 |
| 1 | Card Dark | `#141821` | 卡片 |
| 2 | Warm White | `#f3efe8` | 浅色区块 |

## Elevation

- **Gold CTA:** `0 8px 24px rgba(228,192,99,0.28)`
- **Card:** `0 20px 50px rgba(0,0,0,0.45)`

## Imagery

视频与静帧必须同源同调：暗场、慢速运动、无缝循环。允许自然光与夜景。不使用快速剪辑、跳变运动与色彩跳变的素材。

## Layout

上限 1200px，首屏 100vh 全幅、文字居中或左下三分之一。区块间距 128px。视频区之外全部用影黑或卡面深，不用白色大区块，保持暗场连贯。

## Agent Prompt Guide

### Implementation Contract

- 以用户请求中的页面、用户任务和真实内容为依据，只实施指定范围；标明缺失的业务信息，不编造数据或能力。
- 先检查现有项目、技术栈与组件；沿用项目结构、路由和依赖，复用已有组件，不重建未要求的页面或功能。
- 沿用项目断点，调整窄屏与桌面的网格和留白；保留信息层级，避免意外横向溢出。
- 对本次涉及的交互，处理键盘焦点与减少动态效果；补齐适用的禁用、加载、空内容与错误状态。
- 完成后按项目现有脚本检查，仅报告实际运行的测试与视觉检查，并列出未验证项。

QUICK COLOR REFERENCE:

- text: `#f3efe8`
- background: `#05060a`
- card: `#141821`
- accent: `#e4c063`
- muted: `#9aa6b8`
- scrim: `rgba(0,0,0,0.75)`

EXAMPLE COMPONENT PROMPTS:

1. 做一个电影视频首屏：section 高 100vh、背景 #05060a、overflow hidden。先渲染 poster 图（AVIF）作为 LCP；video 设 muted、loop、playsInline、preload="none"，用 IntersectionObserver 在 25% 入视时才 load() 与 play()，prefers-reduced-motion 时完全不播。上覆 linear-gradient(to top, rgba(0,0,0,0.75), transparent)。文字区放 56px/500 标题（字距 -0.02em）、11px 全大写 0.16em 的 #e4c063 场景标签，与一个 999px 圆角暖金按钮（#e4c063 填充、#05060a 文字、padding 14px 28px）。
