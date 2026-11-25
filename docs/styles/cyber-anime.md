# 赛博动漫风 — 风格参考

> 驾驶舱 HUD 加动漫光效：斜切角、八角网格、三层霓虹。

**Theme:** dark

赛博动漫把机甲驾驶舱的 HUD 与动漫的光效语言合在一起：主容器四角带斜切角标（clip-path 或用两条边线拼出），背景用六边形网格而不是方形网格，霓虹是多层叠加而非单层发光，微交互像座舱按钮——hover 快速上浮、按下压实、光晕在 180 到 280ms 内 amplify。它的禁令很硬：不许柔和粉彩与自然有机色、不许衬线、不许全圆角（一切形状必须带角）、不许浅色主背景、不许弹跳弹簧动画。

## Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Deep Violet Black | `#0f0f1a` | `--color-deep-violet-black` | 页面底。带紫的近黑，让霓虹与紫主色都能发光。 |
| Frame Violet | `#7c3aed` | `--color-frame-violet` | 主色：边框、主按钮与座舱框架。 |
| Neon Teal | `#06d6a0` | `--color-neon-teal` | 第一层光晕与「系统在线」状态。 |
| Neon Pink | `#ff006e` | `--color-neon-pink` | 第二层光晕，用于警报与高能状态。 |
| Electric Blue | `#38bdf8` | `--color-electric-blue` | 链接与数据高亮，与青形成冷暖过渡。 |
| Pale Blue | `#51b1ff` | `--color-pale-blue` | 第三层光晕与文字高光，最亮的一站。 |

## Typography

### Chakra Petch — 几何无衬线，带科技切角感。全大写并放宽字距 0.16em，像 HUD 标签。

- **Substitute:** 'Segoe UI', 'Arial Narrow', sans-serif
- **Weights:** 400, 600, 700
- **Sizes:** 11, 13, 15, 20, 28, 40
- **Line height:** 1.15 (display), 1.25 (headings), 1.6 (body)
- **Letter spacing:** 0.04em on display, 0.16em on uppercase labels

### JetBrains Mono — 数值、坐标与状态码。座舱里的读数必须是等宽的。

- **Substitute:** ui-monospace, 'Courier New', monospace
- **Weights:** 400, 700
- **Sizes:** 11, 12, 14
- **Line height:** 1.4 (display), 1.4 (headings), 1.55 (body)
- **Letter spacing:** 0.04em on display, 0.16em on uppercase labels

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|---|---|---|---|---|---|---|
| display | Chakra Petch | 700 | 40px | 1.15 | 0.04em | `--text-display` |
| heading | Chakra Petch | 700 | 28px | 1.2 | 0.04em | `--text-heading` |
| subheading | Chakra Petch | 600 | 20px | 1.3 | 0.04em | `--text-subheading` |
| body-lg | Chakra Petch | 400 | 15px | 1.55 | — | `--text-body-lg` |
| body | Chakra Petch | 400 | 13px | 1.6 | — | `--text-body` |
| label | JetBrains Mono | 400 | 11px | 1.4 | 0.16em | `--text-label` |

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
| 64 | 64px | `--spacing-64` |

### Border Radius

| Element | Value |
|---|---|
| cards | 0 |
| buttons | 0 |
| inputs | 0 |
| dots | 999px |

- **Page max-width:** 1320px
- **Section gap:** 48px
- **Card padding:** 24px
- **Element gap:** 12px

## Components

### Bracket Panel

**Role:** 斜切角面板（核心组件）

紫 8% 填充、零圆角、1px 机体紫 40% 描边、内边距 24px。四角各用两条伪元素画 L 形支架（2px 机体紫、长 16px），并用 clip-path 切掉右上与左下各 12px 形成斜切。外发光三层：紫 12px、青 24px 35%、粉 48px 20%。hover 时发光 amplify 到 18/36/72px，整体上浮 2px，过渡 220ms。

- **States:** hover: glow amplified, lift 2px

### HUD Button

**Role:** 主行动按钮

机体紫填充、白字、零圆角、1px 浅蓝 30% 描边，用 clip-path 切掉左上与右下各 10px。11px 等宽全大写 0.16em、padding 12px 28px，三层发光。hover 时填充提亮到 #8b4ff5、发光 amplify；按下时位移 1px 并让发光收到 8/16/28px。过渡 180ms。

- **States:** hover: brighter, amplified glow; active: translate 1px

### Hex Field

**Role:** 六边形背景网格

用两层 repeating-linear-gradient 各转 60 度叠出六边形网格，线宽 1px、机体紫 8%，单元尺寸 32px。全页固定覆盖，pointer-events: none。它必须比方形网格更弱，否则会压过内容。

### Holo Projection

**Role:** 全息投影面板

青色 8% 填充、1px 青 30% 描边、零圆角、16px 模糊，叠一层 4px 间隔的青色扫描线（8%），边缘用 clip-path 做出轻微梯形（上窄下宽 4%）。用于展示角色或机体数据，允许轻微上下浮动 2px（4s 循环）。

### Status Readout

**Role:** 状态读数条

高 28px、零圆角、1px 机体紫 25% 描边，左段等宽显示标签（11px 全大写）、中段显示分段条（10 格、间隔 2px）、右段显示数值。正常青、警告粉、离线灰。分段条必须以离散格填充，不用连续渐变。

## Do's and Don'ts

### Do

- 四角 L 形支架加斜切角
- 六边形网格而非方形
- 霓虹三层叠加
- 微交互 180 到 280ms
- 深底加半透明面板
- 几何无衬线或等宽

### Don't

- 不要用柔和粉彩与自然色
- 不要用衬线字体
- 不要用全圆角
- 不要用浅色主背景
- 不要用弹跳弹簧动画
- 不要混用两种切角尺寸

## Surfaces

| Level | Name | Value | Purpose |
|---|---|---|---|
| 0 | Deep Violet Black | `#0f0f1a` | 页面底 |
| 1 | Panel | `rgba(124,58,237,0.08)` | 面板（紫调半透明） |
| 2 | Hex Grid | `hexagonal pattern` | 六边形网格层 |

## Elevation

- **Triple glow:** `0 0 12px #7c3aed, 0 0 24px rgba(6,214,160,0.35), 0 0 48px rgba(255,0,110,0.20)`
- **Amplified:** `0 0 18px #7c3aed, 0 0 36px rgba(6,214,160,0.45), 0 0 72px rgba(255,0,110,0.30)`

## Imagery

动漫角色与机体的霓虹剪影、全息投影、数据可视化与 HUD 叠层。允许把角色立绘处理成双色调加发光边缘。不使用柔和粉彩、自然风景与写实人像。

## Layout

上限 1320px、容器内边距 16px，面板间距 12px，形成密集座舱。允许面板以 1px 线拼接。所有切角固定 10px 或 12px，混用即为错误。

## Agent Prompt Guide

### Implementation Contract

- 以用户请求中的页面、用户任务和真实内容为依据，只实施指定范围；标明缺失的业务信息，不编造数据或能力。
- 先检查现有项目、技术栈与组件；沿用项目结构、路由和依赖，复用已有组件，不重建未要求的页面或功能。
- 沿用项目断点，调整窄屏与桌面的网格和留白；保留信息层级，避免意外横向溢出。
- 对本次涉及的交互，处理键盘焦点与减少动态效果；补齐适用的禁用、加载、空内容与错误状态。
- 完成后按项目现有脚本检查，仅报告实际运行的测试与视觉检查，并列出未验证项。

QUICK COLOR REFERENCE:

- text: `#e8e6f5`
- background: `#0f0f1a`
- violet: `#7c3aed`
- teal: `#06d6a0`
- pink: `#ff006e`
- blue: `#38bdf8`

EXAMPLE COMPONENT PROMPTS:

1. 做一个赛博动漫风面板：背景 rgba(124,58,237,0.08)、零圆角、1px rgba(124,58,237,0.4) 描边、内边距 24px、clip-path 切掉右上与左下各 12px、box-shadow 0 0 12px #7c3aed, 0 0 24px rgba(6,214,160,0.35), 0 0 48px rgba(255,0,110,0.2)。四角各用 2px 机体紫画 16px 的 L 形支架。全页叠一层 32px 单元的六边形网格（1px 线、rgba(124,58,237,0.08)）。hover 时发光 amplify 到 18/36/72px 并 translateY(-2px)，transition 220ms。页面底色 #0f0f1a。
