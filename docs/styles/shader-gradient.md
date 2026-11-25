# 着色器渐变 — 风格参考

> 一块真的在计算的虹彩场，玻璃面板浮在上面。

**Theme:** dark

着色器渐变是近年高级 SaaS 首屏的标准做法：一个实时运行的 WebGL 片元着色器在近黑画布上渲染流动的网格渐变，颜色缓慢呼吸，磨砂玻璃面板浮在上面，全站只用一支紫色做 UI 强调。它的难点不在视觉而在纪律——绝不能拿静态渐变图或 CSS 关键帧冒充实时着色器（这是廉价感的根源）；必须给 devicePixelRatio 设上限；离屏时必须用 IntersectionObserver 暂停 requestAnimationFrame；必须提供 WebGL 不可用时的回退；文字绝不能直接压在渐变场上。

## Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Canvas Black | `#08090d` | `--color-canvas-black` | 着色器画布的底色。近黑但不纯黑，让虹彩有暗部可以沉下去。 |
| Bright White | `#edeef2` | `--color-bright-white` | 主要文字与高对比元素。略带冷的白。 |
| Violet | `#7c5cff` | `--color-violet` | 唯一的 UI 强调色：主按钮、聚焦态与图标。着色器里的虹彩不算 UI 色。 |
| Cyan | `#22d3ee` | `--color-cyan` | 只出现在着色器场里，用于让渐变有冷暖过渡。 |
| Pink | `#f472b6` | `--color-pink` | 同样只属于着色器，是虹彩的第三支。 |

## Typography

### Inter — 全站唯一字体。标题 48 到 64px 配紧字距，小标签 12px 全大写。

- **Substitute:** -apple-system, 'SF Pro Display', system-ui, sans-serif
- **Weights:** 400, 500, 600
- **Sizes:** 12, 14, 16, 20, 32, 48, 64
- **Line height:** 1.05 (display), 1.15 (headings), 1.6 (body)
- **Letter spacing:** -0.03em on display, 0.14em on uppercase labels

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|---|---|---|---|---|---|---|
| display | — | 600 | 64px | 1.05 | -0.03em | `--text-display` |
| heading-lg | — | 600 | 48px | 1.1 | -0.025em | `--text-heading-lg` |
| heading | — | 600 | 32px | 1.2 | — | `--text-heading` |
| body-lg | — | 400 | 20px | 1.5 | — | `--text-body-lg` |
| body | — | 400 | 16px | 1.6 | — | `--text-body` |
| label | — | 500 | 12px | 1.4 | 0.14em | `--text-label` |

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
| cards | 16px |
| buttons | 12px |
| inputs | 12px |
| icons | 8px |

- **Page max-width:** 1120px
- **Section gap:** 128px
- **Card padding:** 24px
- **Element gap:** 16px

## Components

### Violet CTA

**Role:** 主行动按钮

紫色填充、白字、12px 圆角、无描边，16px/500、padding 12px 24px，阴影 0 8px 30px 紫 35%。hover 时填充提亮到 #8f72ff；按下缩放 0.98。过渡 300ms。全页只有一个。

- **Sizes:** padding 12px 24px; label 16px
- **States:** hover: #8f72ff; active: scale 0.98

### Glass Card

**Role:** 内容卡与特性卡

白 6% 填充、24px 模糊、16px 圆角、1px 白 10% 描边、内边距 24px，阴影 0 20px 60px 黑 45%。左上角一个 36px 的紫色 20% 底图标块（8px 圆角、1px 紫 30% 描边）。标题 20px/600 白色，正文 14px 白 60%。

### Shader Field

**Role:** 实时着色器画布（签名组件）

一个满幅 canvas 固定在最底层，运行片元着色器渲染三支色（紫、青、粉）的网格渐变，颜色随时间缓慢呼吸（周期 20 到 30 秒）。必须给 devicePixelRatio 设上限（通常 2），必须用 IntersectionObserver 在离屏时暂停 requestAnimationFrame，WebGL 不可用时回退为一张静态渐变图（同一配色），prefers-reduced-motion 时只渲染单帧。全页只能有一个 canvas。

- **Sizes:** full-bleed; DPR capped at 2

### Glass Input

**Role:** 邮箱与表单输入

白 6% 填充、12px 模糊、12px 圆角、1px 白 12% 描边、padding 12px 16px、16px 字。占位符白 40%。聚焦时描边转紫 70%、填充升到 9%、加 2px 紫 25% 外环。

### Scrim Layer

**Role:** 文字可读性遮罩

在着色器与文字之间必须有一层遮罩：垂直渐变从黑 60% 到透明，或一块 24px 模糊的玻璃面板。目的只有一个——保证文字与场的对比度至少 4.5:1。禁止省略。

## Do's and Don'ts

### Do

- 用真实的 WebGL 片元着色器
- 给 devicePixelRatio 设上限
- 离屏时用 IntersectionObserver 暂停 rAF
- 提供 WebGL 不可用的静态回退
- 文字下必须有玻璃板或遮罩
- UI 只用一支紫色强调

### Don't

- 不要用静态渐变图冒充实时着色器
- 不要不限 DPR（会掉帧）
- 不要在离屏时继续跑 rAF
- 不要忽略 reduced-motion 与 WebGL 回退
- 不要让文字直接压场
- 不要放多个 canvas 或多支抢眼强调色

## Surfaces

| Level | Name | Value | Purpose |
|---|---|---|---|
| 0 | Canvas Black | `#08090d` | 着色器画布 |
| 1 | Glass 6% | `rgba(255,255,255,0.06)` | 卡片与面板 |
| 2 | Glass 12% | `rgba(255,255,255,0.12)` | hover 与次级按钮 |

## Elevation

- **Glass card:** `0 20px 60px rgba(0,0,0,0.45)`
- **Violet CTA:** `0 8px 30px rgba(124,92,255,0.35)`

## Imagery

图像即是着色器本身，不使用摄影与插画。允许产品截图放在玻璃面板内。禁止额外的背景图，它会与场打架。

## Layout

上限 1120px、容器内边距 24px，区块间距 128px。首屏为 100vh，内容垂直居中并包在玻璃面板里。整个页面只有一个 canvas，其余内容全部是 DOM 层。

## Agent Prompt Guide

### Implementation Contract

- 以用户请求中的页面、用户任务和真实内容为依据，只实施指定范围；标明缺失的业务信息，不编造数据或能力。
- 先检查现有项目、技术栈与组件；沿用项目结构、路由和依赖，复用已有组件，不重建未要求的页面或功能。
- 沿用项目断点，调整窄屏与桌面的网格和留白；保留信息层级，避免意外横向溢出。
- 对本次涉及的交互，处理键盘焦点与减少动态效果；补齐适用的禁用、加载、空内容与错误状态。
- 完成后按项目现有脚本检查，仅报告实际运行的测试与视觉检查，并列出未验证项。

QUICK COLOR REFERENCE:

- text: `#edeef2`
- background: `#08090d`
- accent: `#7c5cff`
- cyan: `#22d3ee`
- pink: `#f472b6`
- glass: `rgba(255,255,255,0.06)`

EXAMPLE COMPONENT PROMPTS:

1. 做一个着色器渐变首屏：底层一个满幅 canvas 跑 WebGL 片元着色器，用 #7c5cff、#22d3ee、#f472b6 三色做流动的网格渐变，颜色 25 秒缓慢呼吸；devicePixelRatio 封顶 2；用 IntersectionObserver 在离屏时暂停 requestAnimationFrame；WebGL 不可用时回退到同配色的静态渐变。上层放一块玻璃面板（rgba(255,255,255,0.06) 填充、24px 模糊、16px 圆角、1px rgba(255,255,255,0.1) 描边、内边距 24px），板内是 64px/600 标题（字距 -0.03em）与一个紫色 CTA（#7c5cff 填充、12px 圆角、16px/500）。
