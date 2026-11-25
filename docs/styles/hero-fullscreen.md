# 全屏英雄区布局 — 风格参考

> 一整屏的画面先说话，文字只是画面上的标注。

**Theme:** dark

全屏英雄区把首屏让给一张图或一段视频：视口高度 100vh，背景铺满，上面盖一层 30% 到 50% 的黑色遮罩保证文字可读。它的排版是反过来的——标题极大（56 到 96px）、副标题短、只放两个行动按钮，其余信息全部下移。按钮用反色（白底黑字）才能在深色遮罩上跳出。视觉细节只有一个：CTA 的「重力浮起」，hover 时上浮 4px 并让阴影爆发到 28px，像被光托起来。往下滚动时背景可做 0.3 到 0.5 的视差。

## Colors

| Name | Value | Token | Role |
|---|---|---|---|
| White | `#ffffff` | `--color-white` | 主按钮填充与标题文字。在全屏画面之上，白是唯一能保证可读的色。 |
| Black | `#000000` | `--color-black` | 遮罩与按钮文字。遮罩用 30% 到 50% 不透明度铺在图上。 |
| Coral | `#ff6b6b` | `--color-coral` | 次要强调与徽标，用于需要从画面中跳出的信息。 |
| Cyan | `#4ecdc4` | `--color-cyan` | 链接与次级按钮的悬停色，与暖色画面形成对位。 |
| Yellow | `#ffe66d` | `--color-yellow` | 高亮与数字，只用在小面积标注上。 |
| Indigo | `#6c5ce7` | `--color-indigo` | 品牌色，用于 logo 与一处强调。不与珊瑚、黄同屏面积相当。 |

## Typography

### Inter — 全站唯一字体。首屏标题靠 96px 与 -0.035em 字距制造压迫感，其余字级迅速回落。

- **Substitute:** -apple-system, 'Segoe UI', system-ui, sans-serif
- **Weights:** 400, 500, 600, 700
- **Sizes:** 13, 15, 18, 24, 40, 64, 96
- **Line height:** 0.98 (display), 1.1 (headings), 1.6 (body)
- **Letter spacing:** -0.035em on display, 0.08em on uppercase labels

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|---|---|---|---|---|---|---|
| display | — | 700 | 96px | 0.98 | -0.035em | `--text-display` |
| heading-lg | — | 700 | 64px | 1.02 | -0.03em | `--text-heading-lg` |
| heading | — | 600 | 40px | 1.1 | -0.02em | `--text-heading` |
| subheading | — | 400 | 24px | 1.3 | — | `--text-subheading` |
| body-lg | — | 400 | 18px | 1.6 | — | `--text-body-lg` |
| body | — | 400 | 15px | 1.6 | — | `--text-body` |
| label | — | 600 | 13px | 1.4 | 0.08em | `--text-label` |

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
| cards | 16px |
| buttons | 999px |
| inputs | 12px |
| media | 0 |

- **Page max-width:** 1280px
- **Section gap:** 160px
- **Card padding:** 32px
- **Element gap:** 24px

## Components

### Hero CTA

**Role:** 首屏主行动按钮

白底、黑字、999px 全圆角、无描边，字级 18px、字重 600、padding 16px 32px，阴影 0 4px 14px 黑 30%。hover 时填充降到 95%、上浮 4px、阴影爆发到 0 8px 28px 黑 50%；按下缩放 0.98、位移归零、阴影回到 8px。焦点环用白色 80% 并带黑色 offset。过渡 200ms ease-out。

- **Sizes:** padding 16px 32px; label 18px
- **States:** hover: lift 4px, shadow burst; active: scale 0.98

### Frosted Feature Card

**Role:** 首屏内的特性卡与数据块

白 10% 填充、8px 模糊、1px 白 20% 描边、16px 圆角、内边距 32px。图标块 48px 见方、白 20% 底、12px 圆角。hover 时填充升到 15%、描边到 30%、上浮 8px、阴影 0 16px 40px 黑 50%，图标放大 1.1。过渡 300ms ease-out。

### Transparent Nav

**Role:** 首屏顶部导航

完全透明，无边框无阴影。高 80px、水平内边距 32px，字标与链接均为白色，链接 13px/500、字距 0.08em、间距 32px，hover 转白 70%。滚动超过一屏后切换到实色底并加 1px 白 10% 下边框。

### Hero Media

**Role:** 首屏背景图或视频

100vh 高、铺满宽度、object-fit: cover、直角。上覆一层 40% 黑遮罩（顶部可深到 55% 保证导航可读）。允许 0.3 到 0.5 的视差速度。视频必须静音、循环、poster 必填。

## Do's and Don'ts

### Do

- 首屏必须占满一个视口
- 遮罩 40% 起，保证文字可读
- 按钮用反色（白底黑字）
- 标题最多两行，副标题一行
- CTA hover 上浮并爆发阴影
- 视差控制在 0.3 到 0.5

### Don't

- 不要在首屏放超过两个按钮
- 不要把正文塞进首屏
- 不要在图片角落放关键信息
- 不要用低于 30% 的遮罩
- 不要用自动播放带声音的视频
- 不要让视差超过 0.6

## Surfaces

| Level | Name | Value | Purpose |
|---|---|---|---|
| 0 | Full-bleed media | `image or video at 100vh` | 首屏背景 |
| 1 | Veil | `rgba(0,0,0,0.40)` | 压在媒体上的遮罩 |
| 2 | Frosted panel | `rgba(255,255,255,0.10)` | 首屏内的特性卡 |

## Elevation

- **CTA rest:** `0 4px 14px rgba(0,0,0,0.30)`
- **CTA hover:** `0 8px 28px rgba(0,0,0,0.50)`
- **Card hover:** `0 16px 40px rgba(0,0,0,0.50)`

## Imagery

全屏摄影或视频是这套布局的全部内容：风景、产品、现场。图片必须有明确的明暗区域来安放文字，四角不要有重要信息。不使用插画与图案背景。

## Layout

首屏 100vh，内容垂直居中或偏下 60% 处，最大宽度 1280px、左右内边距 32px。标题最多两行，副标题一行，两个按钮横排。首屏内不放超过三个信息块。往下每个区块至少 160px 间距。

## Agent Prompt Guide

### Implementation Contract

- 以用户请求中的页面、用户任务和真实内容为依据，只实施指定范围；标明缺失的业务信息，不编造数据或能力。
- 先检查现有项目、技术栈与组件；沿用项目结构、路由和依赖，复用已有组件，不重建未要求的页面或功能。
- 沿用项目断点，调整窄屏与桌面的网格和留白；保留信息层级，避免意外横向溢出。
- 对本次涉及的交互，处理键盘焦点与减少动态效果；补齐适用的禁用、加载、空内容与错误状态。
- 完成后按项目现有脚本检查，仅报告实际运行的测试与视觉检查，并列出未验证项。

QUICK COLOR REFERENCE:

- text: `#ffffff`
- veil: `rgba(0,0,0,0.40)`
- ctaFill: `#ffffff`
- ctaText: `#000000`
- accent: `#ff6b6b`
- secondary: `#4ecdc4`

EXAMPLE COMPONENT PROMPTS:

1. 做一个全屏英雄区：容器 100vh、背景图 object-fit: cover、上面盖一层 rgba(0,0,0,0.4) 遮罩。内容垂直居中，标题 96px/700 白色、字距 -0.035em、最多两行；副标题 24px 白 80%；下面横排两个按钮，第一个白底黑字全圆角（18px/600、padding 16px 32px、阴影 0 4px 14px rgba(0,0,0,0.3)，hover 时 translateY(-4px) 阴影扩到 0 8px 28px）。
