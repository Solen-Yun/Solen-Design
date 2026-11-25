# 魔法阵风 — 风格参考

> 同心环、六芒星、符文沿圆周排列：一条还没启动的法阵。

**Theme:** dark

魔法阵风来自奇幻作品的施法视觉：深海军黑底（#0a0920）上叠多层次同心圆环，核心是六芒星或六边形，符文沿圆周排布，生命之花等神圣几何作暗纹，金色（#fbbf24）作唯一的暖光。它的核心动效叫 Arcane Rotation——卡片 hover 时内部虚线同心环在 3000ms 内线性旋转 180 度，像法阵被启动；按钮按下必须缩到 0.95，因为施法需要能量聚焦。焦点环必须带深底色的 offset，否则在暗场上看不见。

## Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Circle Ground | `#0a0920` | `--color-circle-ground` | 页面底。深海军黑，让金环与靛蓝符文都能浮起来。 |
| Circle Indigo | `#1e1b4b` | `--color-circle-indigo` | 面板与抬升面。法阵内部的底色。 |
| Gold | `#fbbf24` | `--color-gold` | 唯一的暖光：圆环、符文与主按钮。 |
| Silver | `#e2e8f0` | `--color-silver` | 主要文字与次级圆环。冷侧的亮。 |
| Indigo | `#818cf8` | `--color-indigo` | 符文文字与数据。与金形成冷暖对位。 |
| Spirit Green | `#56ed40` | `--color-spirit-green` | 「已充能」状态与成功，出现频率最低。 |

## Typography

### Cinzel — 标题用纪念碑式衬线加宽字距，符文与标签用等宽。正文用衬线保证可读。

- **Substitute:** 'Trajan Pro', Georgia, serif
- **Weights:** 400, 700
- **Sizes:** 11, 13, 16, 22, 32, 44
- **Line height:** 1.15 (display), 1.25 (headings), 1.7 (body)
- **Letter spacing:** 0.08em on display, 0.24em on uppercase labels

### JetBrains Mono — 符文、坐标与咒文。等宽让符文沿圆周排列时宽度一致。

- **Substitute:** ui-monospace, 'Courier New', monospace
- **Weights:** 400
- **Sizes:** 11, 13
- **Line height:** 1.5 (display), 1.5 (headings), 1.6 (body)
- **Letter spacing:** 0.12em on display, 0.24em on uppercase labels

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|---|---|---|---|---|---|---|
| display | Cinzel | 700 | 44px | 1.15 | 0.08em | `--text-display` |
| heading | Cinzel | 700 | 32px | 1.2 | 0.08em | `--text-heading` |
| subheading | Cinzel | 400 | 22px | 1.35 | 0.06em | `--text-subheading` |
| body | Cinzel | 400 | 16px | 1.7 | — | `--text-body` |
| body-sm | Cinzel | 400 | 13px | 1.65 | — | `--text-body-sm` |
| label | JetBrains Mono | 400 | 11px | 1.5 | 0.24em | `--text-label` |

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
| cards | 8px |
| buttons | 2px |
| circles | 999px |
| hexagons | 0 |

- **Page max-width:** 1120px
- **Section gap:** 128px
- **Card padding:** 32px
- **Element gap:** 24px

## Components

### Arcane Circle

**Role:** 法阵圆环组（核心组件）

由 3 到 5 层同心环组成：最外 1px 金 40% 实线、次外 1px 金 25% 虚线圈（dash 8 gap 6）、中间 2px 金 60% 实线、内部虚线环。核心放一个六芒星（两个三角形交叠）或六边形。所有环在 hover 时以 3000ms linear 旋转 180 度——绝不允许静止不动。prefers-reduced-motion 时静止。

- **Sizes:** 240–480px; rotation 3000ms linear

### Rune Path

**Role:** 圆周符文

沿圆周均匀排列 8 到 24 个 11px 等宽字符，每个字符按其在圆上的角度旋转（transform: rotate(角度) 后反向旋转文字以保持直立或沿切线排列）。使用几何符号或拉丁大写，不用真实文字。颜色金 60%。

### Sigil Button

**Role:** 施法按钮

阵底填充、金文字、2px 圆角、1px 金 40% 描边、16px/700、字距 0.24em、padding 12px 32px，外发光 0 0 15px 金 15%。hover 时描边升到 100%、发光扩到 30px 并加内发光；按下时缩到 0.95 且内发光加深到 60%——这是施法的能量聚焦。过渡 500ms。

- **Sizes:** padding 12px 32px; label 16px
- **States:** hover: border full, glow 30px; active: scale 0.95, inner glow

### Hex Card

**Role:** 六边形卡片

用 clip-path polygon 切出正六边形（或 8px 圆角矩形配六边形角标），阵紫填充、1px 金 30% 描边、内边距 32px。内容居中。hover 时描边升到 60% 并触发内部圆环旋转。

### Sacred Geometry Bed

**Role:** 神圣几何暗纹

全页或区块底层叠一层生命之花或六边形网格，线宽 1px、金 6% 或靛蓝 8%，不透明度极低。它只在被注意到时才存在，绝不能压过内容。

## Do's and Don'ts

### Do

- 多层同心环加六芒星核心
- hover 时圆环 3000ms 线性旋转
- 符文沿圆周等距排列
- 金是唯一暖光，靛蓝为冷侧
- 按钮按下缩到 0.95
- 焦点环带深底色 offset

### Don't

- 不要用明亮霓虹色
- 不要让圆环在 hover 时静止
- 不要用缺少 offset 的焦点环
- 不要让按钮按下无缩放
- 不要让暗纹压过内容
- 不要用真实文字作符文

## Surfaces

| Level | Name | Value | Purpose |
|---|---|---|---|
| 0 | Circle Ground | `#0a0920` | 页面底 |
| 1 | Circle Indigo | `#1e1b4b` | 面板 |
| 2 | Gold Rim | `rgba(251,191,36,0.20)` | 金环 |

## Elevation

- **Gold glow:** `0 0 15px rgba(251,191,36,0.15)`
- **Gold glow strong:** `0 0 30px rgba(251,191,36,0.40), inset 0 0 15px rgba(251,191,36,0.10)`
- **Cast:** `inset 0 0 30px rgba(251,191,36,0.60)`

## Imagery

符阵插画、炼金术符号、星图、魔法书页扫描。必须线稿式、金色或靛蓝、深底。不使用写实摄影、柔和插画与彩色图像。

## Layout

上限 1120px、容器内边距 24px，区块间距 128px。允许圆形与六边形打破矩形容器。法阵常作为首屏的中心视觉，文字围绕或压在其上但必须可读。

## Agent Prompt Guide

### Implementation Contract

- 以用户请求中的页面、用户任务和真实内容为依据，只实施指定范围；标明缺失的业务信息，不编造数据或能力。
- 先检查现有项目、技术栈与组件；沿用项目结构、路由和依赖，复用已有组件，不重建未要求的页面或功能。
- 沿用项目断点，调整窄屏与桌面的网格和留白；保留信息层级，避免意外横向溢出。
- 对本次涉及的交互，处理键盘焦点与减少动态效果；补齐适用的禁用、加载、空内容与错误状态。
- 完成后按项目现有脚本检查，仅报告实际运行的测试与视觉检查，并列出未验证项。

QUICK COLOR REFERENCE:

- text: `#e2e8f0`
- background: `#0a0920`
- panel: `#1e1b4b`
- gold: `#fbbf24`
- indigo: `#818cf8`
- green: `#56ed40`

EXAMPLE COMPONENT PROMPTS:

1. 做一个魔法阵风卡片：阵底 #0a0920 填充、8px 圆角、1px rgba(251,191,36,0.3) 描边、内边距 32px。内部放 4 层同心环：外 1px 金 40% 实线、次 1px 金 25% 虚线（dash 8 gap 6）、中间 2px 金 60%、内部虚线环，核心一个六芒星。hover 时所有环以 3000ms linear 旋转 180 度。沿圆周排 12 个 11px 等宽符文（金 60%，各自按角度旋转）。按钮阵底填充、金文字、2px 圆角、1px 金 40% 描边，hover 发光扩到 0 0 30px rgba(251,191,36,0.4)，active 时 scale(0.95)。页面底色 #0a0920，焦点环带 offset-2 offset-[#0a0920]。
