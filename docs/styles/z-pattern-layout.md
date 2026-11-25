# Z 型布局 — 风格参考

> 视线走 Z 字形：左上到右上，斜穿到左下，再落到右下。

**Theme:** light

Z 型布局把营销页的注意力路径画出来：第一笔是页头（左 logo、右 CTA），第二笔是斜穿首屏的对角线，第三笔是底部区域的横向扫过并落在右侧 CTA。所以规则很硬——Z 路径上只能放必须被看到的内容，CTA 必须在路径的终点，任何打断流动的元素（大段正文、无关图片、双列卡片）都不允许。视觉上它需要高对比与强主色，因为路径靠对比被牵引。

## Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Deep Slate | `#0f172a` | `--color-deep-slate` | 标题与正文。在白色页面上提供最高对比，牵引视线。 |
| White | `#ffffff` | `--color-white` | 页面画布。保持干净，让 Z 路径不被噪音干扰。 |
| Indigo | `#6366f1` | `--color-indigo` | 路径终点的 CTA 与链接。全页最强的视觉锚点。 |
| Cyan | `#06b6d4` | `--color-cyan` | 次级强调与图形点缀，用于对角线的右侧。 |
| Amber | `#f59e0b` | `--color-amber` | 徽标与稀缺提示，用于路径起点附近吸引初始注意。 |
| Pink | `#ec4899` | `--color-pink` | 第二 CTA 或情绪化强调，出现频率最低。 |

## Typography

### Inter — 全站唯一字体。首屏标题 56px/700 配紧字距，其余迅速回落，保持路径简洁。

- **Substitute:** system-ui, -apple-system, 'Segoe UI', sans-serif
- **Weights:** 400, 500, 600, 700
- **Sizes:** 12, 14, 16, 20, 28, 40, 56
- **Line height:** 1.05 (display), 1.2 (headings), 1.6 (body)
- **Letter spacing:** -0.03em on display, 0.06em on uppercase labels

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|---|---|---|---|---|---|---|
| display | — | 700 | 56px | 1.05 | -0.03em | `--text-display` |
| heading-lg | — | 700 | 40px | 1.1 | -0.02em | `--text-heading-lg` |
| heading | — | 600 | 28px | 1.2 | — | `--text-heading` |
| body-lg | — | 400 | 16px | 1.6 | — | `--text-body-lg` |
| body | — | 400 | 14px | 1.6 | — | `--text-body` |
| label | — | 500 | 12px | 1.4 | 0.06em | `--text-label` |

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
| badges | 999px |

- **Page max-width:** 1120px
- **Section gap:** 128px
- **Card padding:** 24px
- **Element gap:** 16px

## Components

### Path CTA

**Role:** 路径终点的主行动

靛蓝填充、白字、12px 圆角、无描边，18px/700、padding 16px 40px，阴影 0 4px 14px 靛蓝 30%。hover 时阴影扩到 25px、上浮 4px、放大 1.02；按下缩放 0.95 并下移 2px。过渡 200ms ease-out。全页最多两处，且都在 Z 路径上。

- **Sizes:** padding 16px 40px; label 18px
- **States:** hover: lift 4px, shadow 25px; active: scale 0.95

### Diagonal Lead

**Role:** 首屏对角区的主视觉块

标题左对齐置于左上，使视线从左下扫到右上；右侧放一个视觉块（截图、产品图或抽象图形），高度不超过视口 60%。两者之间不加分隔线。副标题最多两行，紧贴标题下方 16px。

### Header Bar

**Role:** 路径起点：页头

高 72px、白底、无边框。左侧 20px/700 字标，右侧一个 Path CTA 与最多三个链接。中间留空——中间放导航会打断第一笔横线。

### Bottom Band

**Role:** 路径终点区域

深板岩底或白底，横向排列：左侧一句话结论，右侧一个 CTA 与一个邮箱输入框。整块高度不超过 240px，不放卡片网格。

### Trust Row

**Role:** 信任条（logo 或数据）

紧贴首屏下方的一条横带，高 80px，放 4 到 6 个灰度 logo 或三个关键数字。文字 12px 全大写 0.06em，透明度 60%。它是 Z 第二笔的支撑，不打断路径。

## Do's and Don'ts

### Do

- Z 路径上只放必须被看到的内容
- CTA 放在路径终点（右下）
- 标题左对齐，视觉块右置
- 首屏一个主张，不堆信息
- 保持高对比与单一主色
- 页头中间留空

### Don't

- 不要在路径上放次要内容
- 不要打断 Z 的流动
- 不要堆过多内容干扰路径
- 不要把 CTA 放在路径之外
- 不要让页面过于复杂
- 不要在中段放双列卡片墙

## Surfaces

| Level | Name | Value | Purpose |
|---|---|---|---|
| 0 | White | `#ffffff` | 页面画布 |
| 1 | Slate Band | `#0f172a` | 反色区块（通常在中段） |

## Elevation

- **CTA:** `0 4px 14px rgba(99,102,241,0.30)`
- **CTA hover:** `0 8px 25px rgba(99,102,241,0.50)`
- **Card:** `0 2px 8px rgba(15,23,42,0.06)`

## Imagery

右对齐的产品截图或抽象图形，用于承接对角线。允许设备的干净外框。不使用大幅人物摄影与背景图，它们会把视线拉离路径。

## Layout

上限 1120px、容器内边距 24px，区块间距 128px。结构固定三段：页头横线 → 对角线区 → 底部终点带。每段只放一个主张，中段不允许出现双列卡片墙。

## Agent Prompt Guide

### Implementation Contract

- 以用户请求中的页面、用户任务和真实内容为依据，只实施指定范围；标明缺失的业务信息，不编造数据或能力。
- 先检查现有项目、技术栈与组件；沿用项目结构、路由和依赖，复用已有组件，不重建未要求的页面或功能。
- 沿用项目断点，调整窄屏与桌面的网格和留白；保留信息层级，避免意外横向溢出。
- 对本次涉及的交互，处理键盘焦点与减少动态效果；补齐适用的禁用、加载、空内容与错误状态。
- 完成后按项目现有脚本检查，仅报告实际运行的测试与视觉检查，并列出未验证项。

QUICK COLOR REFERENCE:

- text: `#0f172a`
- background: `#ffffff`
- accent: `#6366f1`
- secondary: `#06b6d4`
- badge: `#f59e0b`
- muted: `#64748b`

EXAMPLE COMPONENT PROMPTS:

1. 做一个 Z 型营销页首屏：页头 72px 白底，左 logo 20px/700、右侧一个 #6366f1 圆角按钮（18px/700、padding 16px 40px、阴影 0 4px 14px rgba(99,102,241,0.3)）。中段左对齐 56px/700 标题（字距 -0.03em）与两行副标题，右侧放产品截图。底部横带左侧一句话，右侧 CTA 与邮箱输入框。区块间距 128px。
