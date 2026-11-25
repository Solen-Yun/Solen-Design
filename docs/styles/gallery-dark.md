# 暗色画廊风 — 风格参考

> 近黑的展厅里只有照片发光，其余一切退到看不见。

**Theme:** dark

暗色画廊风为摄影师与影像作者服务：近黑底（#0a0a0a）让全幅照片获得绝对注意力，抬升面用 #1a1a1a，分隔线 #2a2a2a，元信息（日期、标签、地点、展签）一律用暖琥珀（#c4956a）的 10 到 11px 全大写 0.15em 细体，正文用白色细体，大标题 4xl 到 7xl 细体紧字距。卡片只加 1px 描边与 2px 圆角、绝不加阴影。它的禁令是：不许彩色阴影与渐变背景、不许亮色背景——任何提亮都会破坏暗场沉浸。

## Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Gallery Black | `#0a0a0a` | `--color-gallery-black` | 页面底。近黑，让照片成为唯一光源。 |
| Raised | `#1a1a1a` | `--color-raised` | 卡片与侧面板，只比底色亮一档。 |
| Divider | `#2a2a2a` | `--color-divider` | 所有 1px 描边与分隔线。暗场里唯一的结构手段。 |
| Amber | `#c4956a` | `--color-amber` | 唯一强调色：元信息、展签、链接与聚焦描边。 |
| White | `#ffffff` | `--color-white` | 正文与标题，一律用 300 细体。 |

## Typography

### Inter — 全站唯一字体，只用 300 与 400。大标题 56 到 72px 细体紧字距，元信息 10px 全大写 0.15em。

- **Substitute:** -apple-system, 'Helvetica Neue', system-ui, sans-serif
- **Weights:** 300, 400
- **Sizes:** 10, 11, 14, 20, 36, 56, 72
- **Line height:** 1.05 (display), 1.15 (headings), 1.6 (body)
- **Letter spacing:** -0.02em on display, 0.15em on uppercase labels

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|---|---|---|---|---|---|---|
| display | — | 300 | 72px | 1.05 | -0.02em | `--text-display` |
| heading | — | 300 | 56px | 1.1 | -0.02em | `--text-heading` |
| subheading | — | 300 | 36px | 1.2 | — | `--text-subheading` |
| body-lg | — | 300 | 20px | 1.5 | — | `--text-body-lg` |
| body | — | 300 | 14px | 1.6 | — | `--text-body` |
| label | — | 300 | 11px | 1.5 | 0.15em | `--text-label` |

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
| cards | 2px |
| buttons | 2px |
| inputs | 2px |

- **Page max-width:** 1440px
- **Section gap:** 128px
- **Card padding:** 0px
- **Element gap:** 24px

## Components

### Full Bleed Frame

**Role:** 全幅作品（核心）

容器 overflow hidden、内边距 0，图片 object-fit: cover、占满、宽高 100%。零圆角零边框零阴影。上方或下方距离 48px 处放展签：10px 全大写 0.15em 的琥珀色元信息，加白色 20px 的作品名。图片绝不加遮罩或文字。

### Work Card

**Role:** 作品卡与缩略图格

抬升面 #1a1a1a 填充、2px 圆角、1px #2a2a2a 描边、无内边距（图片铺满）、无阴影。下方 16px 处放展签。hover 时图片整体不透明度降到 90%（亮度微变），不加缩放、不加阴影。

- **States:** hover: opacity 90%

### Quiet Nav

**Role:** 顶部导航

内边距 24px 32px、底部 1px #2a2a2a 描边、无模糊无底色变化。链接 11px 全大写 0.15em 细体白色，hover 时转琥珀。字标 20px/300。

### Amber Field

**Role:** 搜索与订阅输入

展厅黑填充、2px 圆角、1px #2a2a2a 描边、padding 10px 14px、14px 细体。占位符白 40%。聚焦时描边转琥珀并加 1px 的琥珀 30% 外环。

### Wall Label

**Role:** 展签元信息

固定格式：日期 · 地点 · 媒介，10px 全大写 0.15em 细体琥珀色，行高 1.5。它是这套风格唯一有颜色的文字，也是它区别于「极简暗色」的身份标记。

## Do's and Don'ts

### Do

- 近黑底，抬升面只亮一档
- 元信息用琥珀色 10px 全大写 0.15em
- 标题与正文都用 300 细体
- 卡片只加 1px 描边，不加阴影
- 照片全幅、无遮罩无文字
- hover 只做 opacity 到 90%

### Don't

- 不要用彩色阴影与渐变背景
- 不要用亮色背景
- 不要在照片上加文字或遮罩
- 不要用粗字重
- 不要给卡片加阴影
- 不要引入第二个强调色

## Surfaces

| Level | Name | Value | Purpose |
|---|---|---|---|
| 0 | Gallery Black | `#0a0a0a` | 页面底 |
| 1 | Raised | `#1a1a1a` | 卡片与侧栏 |

## Elevation

- **None:** `none — a shadow would interrupt the dark`

## Imagery

摄影是唯一内容，必须全幅、精确裁切、无滤镜。允许不同比例但同一系列的调色一致。不使用插画、图标装饰与任何非摄影图像。

## Layout

上限 1440px，全幅作品可突破到 100vw。缩略图网格 2 列（移动）到 3 列（桌面）、间距 16 到 24px。区块间距 128px。垂直留白让每张照片单独成立。

## Agent Prompt Guide

### Implementation Contract

- 以用户请求中的页面、用户任务和真实内容为依据，只实施指定范围；标明缺失的业务信息，不编造数据或能力。
- 先检查现有项目、技术栈与组件；沿用项目结构、路由和依赖，复用已有组件，不重建未要求的页面或功能。
- 沿用项目断点，调整窄屏与桌面的网格和留白；保留信息层级，避免意外横向溢出。
- 对本次涉及的交互，处理键盘焦点与减少动态效果；补齐适用的禁用、加载、空内容与错误状态。
- 完成后按项目现有脚本检查，仅报告实际运行的测试与视觉检查，并列出未验证项。

QUICK COLOR REFERENCE:

- text: `#ffffff`
- background: `#0a0a0a`
- raised: `#1a1a1a`
- amber: `#c4956a`
- divider: `#2a2a2a`
- muted: `#8a8a8a`

EXAMPLE COMPONENT PROMPTS:

1. 做一个暗色画廊页面：页面底 #0a0a0a、卡片 #1a1a1a、描边 #2a2a2a。作品图全幅 object-fit cover、零圆角零阴影、容器 overflow hidden 且无内边距。图片下方 48px 放展签：10px 全大写 0.15em 的 #c4956a 元信息（日期 · 地点 · 媒介）加 20px/300 白色作品名。大标题 72px/300、字距 -0.02em。卡片 2px 圆角、1px 描边、无阴影，hover 时图片 opacity 90%。全站只用 300 与 400 字重，不用任何亮色背景。
