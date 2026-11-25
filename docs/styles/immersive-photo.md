# 沉浸摄影 — 风格参考

> 照片就是界面：它不装饰内容，它就是内容本身。

**Theme:** dark

沉浸摄影把所有界面元素减到最少，让全幅照片占据视口，文字浮在可读性遮罩之上。它的技术纪律比视觉更重要——每张图必须有 aspect-ratio（防 CLS）、用 AVIF 或 WebP 配 srcset、首屏给 LQIP 占位再淡入、缓慢的 Ken Burns 漂移只用 transform（8 秒起，且尊重 prefers-reduced-motion）。强调色只有一支，而且必须从照片的暖光里采样（例如琥珀金），不允许硬塞品牌色去和照片打架。

## Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Ink | `#0c0d10` | `--color-ink` | 遮罩、页脚与照片之间的空隙。近黑但不纯黑，避免与照片的暗部糊在一起。 |
| Paper | `#f4f1ea` | `--color-paper` | 浅色区块与图注。暖白，用于在照片之外提供呼吸。 |
| Amber | `#e8b04b` | `--color-amber` | 唯一强调色，从照片的暖光采样。只用于关键 CTA 与小标签。 |
| Deep Grey | `#1a1c22` | `--color-deep-grey` | 次级区块底与卡片，比墨亮一档，用于分层。 |
| Mist | `#b8bcc4` | `--color-mist` | 图注、元数据与次级文字。永远不与琥珀金同屏竞争。 |

## Typography

### Inter — 全站唯一字体。照片上的标题用 44 到 64px、500 字重，图注用 11px 全大写加 0.16em 字距。

- **Substitute:** -apple-system, 'Helvetica Neue', system-ui, sans-serif
- **Weights:** 400, 500, 600
- **Sizes:** 11, 12, 14, 18, 28, 44, 64
- **Line height:** 1.05 (display), 1.15 (headings), 1.6 (body)
- **Letter spacing:** -0.02em on display, 0.16em on uppercase labels

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|---|---|---|---|---|---|---|
| display | — | 500 | 64px | 1.05 | -0.02em | `--text-display` |
| heading-lg | — | 500 | 44px | 1.1 | -0.02em | `--text-heading-lg` |
| heading | — | 600 | 28px | 1.2 | — | `--text-heading` |
| body-lg | — | 400 | 18px | 1.6 | — | `--text-body-lg` |
| body | — | 400 | 14px | 1.6 | — | `--text-body` |
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
| cards | 16px |
| buttons | 999px |
| media | 0 |

- **Page max-width:** 1440px
- **Section gap:** 128px
- **Card padding:** 24px
- **Element gap:** 16px

## Components

### Photo Stage

**Role:** 首屏与全幅图片区块

100vh 高、object-fit: cover、带 aspect-ratio（首屏 16:9，卡片 4:5），底部到顶部叠一层从黑 70% 到透明的渐变遮罩。图片带 20s 的 Ken Burns 漂移（scale 1.00 到 1.06，只用 transform，ease-out），prefers-reduced-motion 时静止。加载前显示 LQIP 模糊占位并在 400ms 内淡入。

- **Sizes:** 16:9 hero, 4:5 card

### Caption Block

**Role:** 图片说明与元数据

贴在图片底部或左下方，距边 24px。上方 11px 全大写 0.16em 的琥珀金系列标签，中间 18 到 28px 白色标题，下方 12px 雾色元数据（地点、时间、器材）。文字必须落在遮罩较暗的一侧，保证至少 4.5:1 的对比。

### Amber CTA

**Role:** 关键行动按钮

琥珀金填充、墨色文字、999px 全圆角、无描边，14px/600、padding 12px 28px，阴影 0 8px 24px 琥珀 30%。hover 时填充提亮 8%、阴影扩到 32px；按下缩放 0.98。全页只允许一个。

### Photo Grid

**Role:** 画廊与作品列表

两到三列、间距 16px、每张卡片固定 4:5 比例、16px 圆角、overflow hidden。图片 hover 时 scale 到 1.05、过渡 1200ms ease-out，卡片阴影同时加深。卡片内不加边框，靠照片本身分隔。

- **States:** hover: image scale 1.05, shadow deepens

### Minimal Nav

**Role:** 顶部导航

绝对定位在首屏之上，高 72px、透明底、无边框。字标与链接为白色，11px 全大写 0.16em；hover 时链接转琥珀金。滚动后切换为墨色 90% 底加 12px 模糊。

## Do's and Don'ts

### Do

- 每张图必须有 aspect-ratio
- 用 AVIF 或 WebP 配 srcset
- 首屏给 LQIP 占位再淡入
- Ken Burns 只用 transform，8 秒起
- 文字必须落在遮罩暗侧
- 尊重 prefers-reduced-motion

### Don't

- 不要把照片当背景再铺卡片挡住它
- 不要让文字直接压在图上不加遮罩
- 不要用未优化的全尺寸 JPG
- 不要用无 aspect-ratio 的图片
- 不要引入第二个强调色
- 不要用快于 8 秒的漂移

## Surfaces

| Level | Name | Value | Purpose |
|---|---|---|---|
| 0 | Photo | `full-bleed image` | 首屏与画廊 |
| 1 | Ink | `#0c0d10` | 遮罩与页脚 |
| 2 | Deep Grey | `#1a1c22` | 次级区块 |

## Elevation

- **Photo card:** `0 24px 60px rgba(0,0,0,0.35)`
- **Photo hover:** `0 32px 80px rgba(0,0,0,0.45)`
- **CTA:** `0 8px 24px rgba(232,176,75,0.30)`

## Imagery

全部是全幅摄影，且照片必须具备明确的光线方向与可安放文字的暗部。允许同一位摄影师的一组作品形成系列感。不使用插画、图标墙、渐变背景与非摄影图像。

## Layout

上限 1440px，首屏 100vh 全幅，画廊三列、间距 16px。区块之间的过渡用全幅照片而不是留白，或在照片之间插一段墨色 128px 的空白作为呼吸。文字块宽度不超过 40em。

## Agent Prompt Guide

### Implementation Contract

- 以用户请求中的页面、用户任务和真实内容为依据，只实施指定范围；标明缺失的业务信息，不编造数据或能力。
- 先检查现有项目、技术栈与组件；沿用项目结构、路由和依赖，复用已有组件，不重建未要求的页面或功能。
- 沿用项目断点，调整窄屏与桌面的网格和留白；保留信息层级，避免意外横向溢出。
- 对本次涉及的交互，处理键盘焦点与减少动态效果；补齐适用的禁用、加载、空内容与错误状态。
- 完成后按项目现有脚本检查，仅报告实际运行的测试与视觉检查，并列出未验证项。

QUICK COLOR REFERENCE:

- text: `#f4f1ea`
- scrim: `rgba(0,0,0,0.70)`
- background: `#0c0d10`
- accent: `#e8b04b`
- muted: `#b8bcc4`
- card: `#1a1c22`

EXAMPLE COMPONENT PROMPTS:

1. 做一个沉浸摄影卡片：容器 aspect-ratio 4/5、overflow hidden、16px 圆角。图片 object-fit: cover、占满容器、hover 时 scale(1.05)、过渡 1200ms ease-out。底部叠 linear-gradient(to top, rgba(0,0,0,0.7), transparent) 遮罩。左下角放 11px 全大写 0.16em 的 #e8b04b 标签、18px 白色标题与 12px #b8bcc4 元数据。页面底色 #0c0d10。
