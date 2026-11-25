# 机甲风 — 风格参考

> 驾驶舱面板：切角金属、粗边框、警告黄与军绿。

**Theme:** dark

机甲风来自高达与 EVA 的机设语言：军绿与深蓝海军作底，警告黄与危险红作强调，界面像一块被切角、铆接、贴了警示标的面板。它的技术特征是切角（clip-path polygon 切掉一角或两角）、粗边框（2px 起，左侧常加一条 4px 的强调边）、以及零模糊的硬阴影。字体必须等宽大写并放宽字距，因为这是设备铭牌。禁止柔和圆角、禁止粉色与浅色调、禁止花哨渐变与毛玻璃、禁止手写体。

## Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Navy | `#1a2744` | `--color-navy` | 主底与深色面板。机体涂装的主色。 |
| Military Green | `#4a5c3a` | `--color-military-green` | 次级面板与边框。装甲板的哑光绿。 |
| Hazard Yellow | `#fbbf24` | `--color-hazard-yellow` | 主强调：左侧边条、按钮文字与关键读数。工业警示色。 |
| Danger Red | `#ef4444` | `--color-danger-red` | 警报、过载与删除。出现即表示状态异常。 |
| Signal Green | `#56ed40` | `--color-signal-green` | 正常运转与「系统在线」，像仪表上的指示灯。 |
| Deep Green | `#069006` | `--color-deep-green` | 绿色的暗部，用于压在亮绿上的文字与图表第二序列。 |

## Typography

### JetBrains Mono — 全站等宽大写。字距 0.08 到 0.16em，像喷在装甲上的编号。

- **Substitute:** ui-monospace, 'Courier New', monospace
- **Weights:** 400, 700
- **Sizes:** 10, 11, 13, 15, 20, 28
- **Line height:** 1.2 (display), 1.3 (headings), 1.6 (body)
- **Letter spacing:** 0.08em on display, 0.16em on uppercase labels

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|---|---|---|---|---|---|---|
| heading | — | 700 | 28px | 1.2 | 0.08em | `--text-heading` |
| subheading | — | 700 | 20px | 1.3 | 0.08em | `--text-subheading` |
| body-lg | — | 400 | 15px | 1.55 | — | `--text-body-lg` |
| body | — | 400 | 13px | 1.6 | — | `--text-body` |
| body-sm | — | 400 | 11px | 1.55 | — | `--text-body-sm` |
| label | — | 700 | 10px | 1.4 | 0.16em | `--text-label` |

## Spacing & Layout

**Base unit:** 4px
**Density:** compact

### Spacing Scale

| Name | Value | Token |
|---|---|---|
| 4 | 4px | `--spacing-4` |
| 8 | 8px | `--spacing-8` |
| 12 | 12px | `--spacing-12` |
| 16 | 16px | `--spacing-16` |
| 24 | 24px | `--spacing-24` |
| 32 | 32px | `--spacing-32` |
| 48 | 48px | `--spacing-48` |

### Border Radius

| Element | Value |
|---|---|
| cards | 0 |
| buttons | 0 |
| inputs | 0 |
| dials | 999px |

- **Page max-width:** 1360px
- **Section gap:** 32px
- **Card padding:** 24px
- **Element gap:** 12px

## Components

### Armor Button

**Role:** 主行动按钮

深灰填充、警告黄文字、2px 警告黄 60% 描边、零圆角、4px 4px 0 海军蓝硬阴影，等宽 11px/700、全大写、字距 0.16em、padding 12px 32px。用 clip-path 切掉左上与右下各 14px 形成切角。hover 时填充硬切到警告黄、文字转海军蓝；按下位移 2px 2px 且阴影缩到 2px。过渡 100ms linear。

- **Sizes:** padding 12px 32px; label 11px
- **States:** hover: yellow fill; active: translate 2px

### Armor Panel

**Role:** 卡片与仪表面板

海军蓝填充、2px 军绿描边、左侧 4px 警告黄边条、零圆角、内边距 24px，硬阴影 4px 4px 0 警告黄 30%。右下角用 clip-path 切掉 20px。右上角放一个 32px 的 L 形角标（2px 警告黄 40%），hover 时角标向内侧移动 2px 并升到 100%。hover 时左边条从 4px 增宽到 10px，过渡 150ms linear。

- **States:** hover: left edge 4px→10px, bracket brightens

### Hazard Stripe

**Role:** 警示条纹

高 8px 的斜条纹带：45 度重复的警告黄与海军蓝（各 12px 宽），用于面板顶部或区块之间。它不带圆角、不带阴影，是纯平面的工业标记。

### Readout Gauge

**Role:** 读数与状态仪表

12px 高的分段条，分成 10 格、每格间隔 2px、零圆角，底槽为军绿 30%。填充按状态取荧光绿（正常）、警告黄（注意）、危险红（过载）。左侧 10px 全大写标签，右侧等宽数值，中间用 1px 军绿分隔。

### Cockpit Frame

**Role:** 页头与座舱框架

高 64px、海军蓝底、底部 2px 军绿描边、顶部 8px 警示条纹。左侧 20px 等宽大写字标，中部放三到四个系统的状态灯（8px 圆点加 10px 标签），右侧一个 Armor Button。整体零圆角。

## Do's and Don'ts

### Do

- 切角用 clip-path，不用圆角
- 面板左侧 4px 警告黄边条
- 等宽大写、字距 0.08 到 0.16em
- 硬阴影零模糊
- 军绿配海军蓝，警告黄作强调
- 所有尺寸取 4 的倍数

### Don't

- 不要用柔和的圆角
- 不要用粉色或浅色调
- 不要用花哨渐变与毛玻璃
- 不要用手写体或花体字
- 不要用模糊阴影
- 不要在同一屏混两种切角尺寸

## Surfaces

| Level | Name | Value | Purpose |
|---|---|---|---|
| 0 | Navy | `#1a2744` | 页面底 |
| 1 | Panel | `#22283a` | 面板 |
| 2 | Armor | `#4a5c3a` | 次级区块 |

## Elevation

- **Hard drop:** `4px 4px 0 #1a2744`
- **Hard drop yellow:** `4px 4px 0 rgba(251,191,36,0.30)`
- **Pressed:** `2px 2px 0 #1a2744`

## Imagery

机甲线稿、装甲板纹理、警示标与仪表盘。允许把照片处理成军绿双色调后叠网纹。不使用柔和插画、粉色系图像与毛玻璃图层。

## Layout

上限 1360px、容器内边距 16px，面板间距 12px，形成密集的舱内排布。面板可用 2px 军绿线拼接成大屏。所有尺寸取 4 的倍数，切角统一 14px 或 20px。

## Agent Prompt Guide

### Implementation Contract

- 以用户请求中的页面、用户任务和真实内容为依据，只实施指定范围；标明缺失的业务信息，不编造数据或能力。
- 先检查现有项目、技术栈与组件；沿用项目结构、路由和依赖，复用已有组件，不重建未要求的页面或功能。
- 沿用项目断点，调整窄屏与桌面的网格和留白；保留信息层级，避免意外横向溢出。
- 对本次涉及的交互，处理键盘焦点与减少动态效果；补齐适用的禁用、加载、空内容与错误状态。
- 完成后按项目现有脚本检查，仅报告实际运行的测试与视觉检查，并列出未验证项。

QUICK COLOR REFERENCE:

- text: `#fbbf24`
- background: `#1a2744`
- panel: `#22283a`
- green: `#4a5c3a`
- danger: `#ef4444`
- signal: `#56ed40`

EXAMPLE COMPONENT PROMPTS:

1. 做一个机甲风按钮：背景 #2b2b2b、文字 #fbbf24、2px solid rgba(251,191,36,0.6) 边框、零圆角、box-shadow 4px 4px 0 #1a2744、等宽 11px/700 全大写 0.16em 字距、padding 12px 32px、clip-path: polygon(14px 0,100% 0,100% calc(100% - 14px),calc(100% - 14px) 100%,0 100%,0 14px)。hover 时背景 #fbbf24、文字 #1a2744；active 时 translate(2px,2px)、阴影缩到 2px 2px 0，transition 100ms linear。页面底色 #1a2744。
