# 自然有机风 — 风格参考

> 大地色、纸与布的质感、不规则的形状——像手工做出来的东西。

**Theme:** light

自然有机风服务于健康、有机食品、环保与手作品牌。它拒绝一切冷色与精确几何：底色是暖米（#faf6f1），文字用深棕（#5c4033）而不是黑，形状用 32px 以上的大圆角甚至 blob 曲线，边界从不完全平行。四支辅色全部来自自然——鼠尾草绿、陶土橘、亚麻米、湖水青——饱和度都在 40% 以下。质感靠一层极淡的纸纹或织物噪点承担，不能有明显图案。动效平缓，hover 只是让底色变深一档，不做位移。

## Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Deep Bark | `#5c4033` | `--color-bark` | 正文、标题与描边。替代黑色，让页面保持暖调。 |
| Warm Cream | `#faf6f1` | `--color-cream` | 页面画布。所有区块默认底色，接近未漂白的纸。 |
| Linen | `#e9e0d4` | `--color-linen` | 卡片与次级区块。只比米色深一档，靠质感而非对比分层。 |
| Sage | `#8b9d77` | `--color-sage` | 植物性与「天然」语义的主强调，用于标签与成功状态。 |
| Terracotta | `#d4a373` | `--color-terracotta` | 暖色强调与手作感，用于价格、徽标与小面积填充。 |
| Lake Teal | `#75a191` | `--color-lake` | 唯一允许的冷色，只作为对比出现，面积不超过一屏的 10%。 |

## Typography

### Fraunces — 所有标题。带一点手写感的衬线是这套风格的人格来源。

- **Substitute:** Georgia, 'Songti SC', serif
- **Weights:** 400, 500
- **Sizes:** 24, 32, 40, 56
- **Line height:** 1.15 (display), 1.25 (headings), 1.7 (body)
- **Letter spacing:** -0.01em on display, 0.14em on uppercase labels

### Inter — 正文、说明与表单。保持中性，避免与衬线标题抢戏。

- **Substitute:** -apple-system, 'Segoe UI', system-ui, sans-serif
- **Weights:** 400, 500
- **Sizes:** 13, 15, 17
- **Line height:** 1.4 (display), 1.4 (headings), 1.7 (body)
- **Letter spacing:** 0 on display, 0.14em on uppercase labels

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|---|---|---|---|---|---|---|
| display | Fraunces | 400 | 56px | 1.15 | -0.01em | `--text-display` |
| heading | Fraunces | 400 | 40px | 1.2 | — | `--text-heading` |
| subheading | Fraunces | 500 | 24px | 1.3 | — | `--text-subheading` |
| body-lg | Inter | 400 | 17px | 1.7 | — | `--text-body-lg` |
| body | Inter | 400 | 15px | 1.7 | — | `--text-body` |
| label | Inter | 500 | 13px | 1.4 | 0.14em | `--text-label` |

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
| cards | 32px |
| buttons | 999px |
| inputs | 20px |
| images | 32px |

- **Page max-width:** 1180px
- **Section gap:** 112px
- **Card padding:** 32px
- **Element gap:** 24px

## Components

### Handmade Button

**Role:** 主行动按钮

深棕填充、暖米文字、999px 全圆角、无描边，字级 15px/500、padding 14px 28px、字距 0.02em。hover 只把填充提亮到深棕 90%，不加位移与阴影；按下填充换鼠尾草。过渡 300ms ease-out。

- **States:** hover: lighter fill only; active: sage fill

### Paper Card

**Role:** 产品卡与故事卡

亚麻底、32px 圆角、无描边、内边距 32px，阴影 0 8px 24px 棕 8%（可省略）。上方图片直角改 32px 圆角、宽高比 4:5；标题用衬线 24px/500，正文 15px 深棕 70%。hover 时底色加深到鼠尾草 12%，其余不动。

### Rounded Input

**Role:** 表单与订阅输入

暖米底、1px 深棕 20% 描边、20px 圆角、padding 14px 18px、15px 字。聚焦时描边转鼠尾草并加 3px 鼠尾草 20% 外环，不改变尺寸。

### Blob Badge

**Role:** 标签与「有机」徽标

不规则的 blob 形状（border-radius 用 60% 40% 55% 45% / 45% 55% 45% 55% 一类），填充用鼠尾草或陶土 15%，文字 13px/500 深棕。不描边，不加阴影。

## Do's and Don'ts

### Do

- 用大地色系，饱和度控制在 40% 以下
- 圆角 20px 起，卡片 32px，允许 blob 形状
- 用深棕替代纯黑
- 加一层极淡的纸纹或织物噪点
- 标题用带手写感的衬线
- hover 只加深底色，不做位移

### Don't

- 不要用纯黑 #000000
- 不要用冷色调作为主色
- 不要用锐利直角与完美圆形
- 不要用霓虹或高饱和色
- 不要用科技感的深色仪表盘
- 不要让纹理变成可见图案

## Surfaces

| Level | Name | Value | Purpose |
|---|---|---|---|
| 0 | Warm Cream | `#faf6f1` | 页面画布 |
| 1 | Linen | `#e9e0d4` | 卡片与次级区块 |

## Elevation

- **None:** `none`
- **Soft:** `0 8px 24px rgba(92,64,51,0.08)`

## Imagery

自然光下的实物摄影：植物、陶器、织物、食材，暖调、低饱和、允许轻微颗粒。构图可留出大片空白。不使用冷光、高对比、科技感产品或几何插画。

## Layout

上限 1180px，容器内边距 24px 到 48px。区块间距 112px，留白不求对称，允许左右不等。两栏时比例用 5:7 而不是 1:1，避免过于规整。图片可用 blob 或拱形裁切。

## Agent Prompt Guide

### Implementation Contract

- 以用户请求中的页面、用户任务和真实内容为依据，只实施指定范围；标明缺失的业务信息，不编造数据或能力。
- 先检查现有项目、技术栈与组件；沿用项目结构、路由和依赖，复用已有组件，不重建未要求的页面或功能。
- 沿用项目断点，调整窄屏与桌面的网格和留白；保留信息层级，避免意外横向溢出。
- 对本次涉及的交互，处理键盘焦点与减少动态效果；补齐适用的禁用、加载、空内容与错误状态。
- 完成后按项目现有脚本检查，仅报告实际运行的测试与视觉检查，并列出未验证项。

QUICK COLOR REFERENCE:

- text: `#5c4033`
- background: `#faf6f1`
- card: `#e9e0d4`
- accent: `#8b9d77`
- warm: `#d4a373`
- border: `rgba(92,64,51,0.20)`

EXAMPLE COMPONENT PROMPTS:

1. 做一个自然有机风卡片：亚麻底色 #e9e0d4、32px 圆角、无边框、内边距 32px。上方 4:5 图片、同样 32px 圆角；下面 24px 衬线标题（深棕 #5c4033）与 15px 正文（深棕 70%），底部一个鼠尾草标签（13px、blob 形状、15% 底色）。hover 时底色变成鼠尾草 12%，不加位移与阴影。
