# 像素动漫风 — 风格参考

> 一屏 GBA 时代的 JRPG：对话框有角块，动画只有 15 帧。

**Theme:** light

像素动漫风合并了经典 JRPG 的界面语法与像素动漫的画风：RPG 对话框（4px 边框加四角方块装饰）、状态条、等宽字体、NES 调色板（蓝、红、金、绿四支）。它的时间规则叫 Framerate Drop——所有过渡 75ms、缓动必须 linear 或 transition-none，因为 2000 年代初的掌机只有 15 帧，动画是跳的不是滑的。禁止平滑渐变、禁止圆角、禁止任何模糊（包括光晕，像素的发光必须是零模糊的硬边）。

## Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Hero Blue | `#4a90d9` | `--color-hero-blue` | 主色：对话框边框、主按钮与选中项。JRPG 的界面蓝。 |
| Night Purple | `#2d1b69` | `--color-night-purple` | 深底与对话框内部。像战斗时的暗场。 |
| Alert Red | `#ff6b6b` | `--color-alert-red` | 危险、伤害与「敌人」标记。 |
| Coin Gold | `#ffd93d` | `--color-coin-gold` | 经验、金币与高亮，是画面里唯一「亮」的东西。 |
| Heal Green | `#50c878` | `--color-heal-green` | 生命值、恢复与成功。 |
| Olive | `#a98d16` | `--color-olive` | 最暗的一支强调，用于压在金色上的文字。 |

## Typography

### Press Start 2P — 全站唯一字体，等宽。行高必须放大到 1.8，否则像素字会粘在一起。

- **Substitute:** 'Courier New', ui-monospace, monospace
- **Weights:** 400
- **Sizes:** 10, 12, 14, 18, 24, 32
- **Line height:** 1.3 (display), 1.4 (headings), 1.8 (body)
- **Letter spacing:** 0.05em on display, 0.12em on uppercase labels

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|---|---|---|---|---|---|---|
| display | — | 400 | 32px | 1.35 | 0.05em | `--text-display` |
| heading | — | 400 | 24px | 1.4 | 0.05em | `--text-heading` |
| subheading | — | 400 | 18px | 1.5 | — | `--text-subheading` |
| body-lg | — | 400 | 14px | 1.8 | — | `--text-body-lg` |
| body | — | 400 | 12px | 1.8 | — | `--text-body` |
| label | — | 400 | 10px | 1.6 | 0.12em | `--text-label` |

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

- **Page max-width:** 960px
- **Section gap:** 64px
- **Card padding:** 20px
- **Element gap:** 12px

## Components

### Dialog Box

**Role:** RPG 对话框（核心组件）

深紫 #1a1038 填充、4px 勇者蓝边框、零圆角、内边距 20px。四角各放一个 8px × 8px 的实心方块（勇者蓝）作为角装饰，位于边框内侧。文字 14px 等宽、行高 1.8、白色。框外可选 4px 零模糊的硬阴影。

### Command Button

**Role:** 指令按钮

勇者蓝填充、白色等宽字、4px 夜紫边框、零圆角、14px、字距 0.12em、padding 12px 24px，硬阴影 4px 4px 0 夜紫。hover 时填充硬切到金币黄、文字转夜紫（调色板替换，不做渐变）；按下时位移 4px 4px 且阴影归零。全程 transition-none 或 75ms linear。

- **Sizes:** padding 12px 24px; label 14px
- **States:** hover: palette swap; active: translate 4px, shadow none

### Status Bar

**Role:** 状态条（HP / EXP）

高 12px、零圆角、4px 夜紫边框，内部填充用治疗绿（HP）或金币黄（EXP），并分成 8px 宽的小格（每格之间 2px 空隙），模拟分段血条。绝不使用平滑渐变。数值以等宽字体放在条右侧。

### Corner Block Decoration

**Role:** 角块与像素装饰

8px 或 12px 的实心方块，取调色板四色之一，放在面板四角、标题两侧或作为分隔符。可组成 2×2 的小簇作为「星光」效果，但每个方块必须有硬边、零模糊、零圆角。

### Menu List

**Role:** 菜单与选项列表

每项高 32px、零圆角、左侧 8px 处一个 8px 的箭头方块指示选中（未选中时透明）。选中项填充勇者蓝 20%、文字转金币黄。切选项时只做颜色硬切，不做滑动。

## Do's and Don'ts

### Do

- 4px 边框加四角方块装饰
- 全站等宽像素字体
- 只用 NES 调色板的四支色
- 过渡 75ms 或 transition-none
- 缓动只用 linear
- 发光必须是零模糊硬边

### Don't

- 不要用平滑渐变
- 不要用任何圆角
- 不要用模糊（含 backdrop-blur）
- 不要用衬线字体
- 不要用 ease-in-out 或 ease
- 不要用柔和阴影

## Surfaces

| Level | Name | Value | Purpose |
|---|---|---|---|
| 0 | Night Purple | `#2d1b69` | 页面底 |
| 1 | Dialog Box | `#1a1038` | 对话框内部 |
| 2 | Paper | `#f4f4f4` | 浅色面板 |

## Elevation

- **Hard drop:** `4px 4px 0 #2d1b69`
- **Pressed:** `none`
- **Never:** `blurred shadows are forbidden`

## Imagery

像素画：16×16 到 64×64 的角色、道具与地形，必须放大整数倍（2× 或 3×）并用 image-rendering: pixelated 保持硬边。允许把照片降采样成像素图。不使用矢量插画、平滑渐变与模糊。

## Layout

上限 960px、容器内边距 16px，区块间距 64px。布局像游戏画面：中央是主内容区，底部可固定一条对话框，右上角挂状态。所有尺寸取 4 的倍数并落在 4px 网格上。

## Agent Prompt Guide

### Implementation Contract

- 以用户请求中的页面、用户任务和真实内容为依据，只实施指定范围；标明缺失的业务信息，不编造数据或能力。
- 先检查现有项目、技术栈与组件；沿用项目结构、路由和依赖，复用已有组件，不重建未要求的页面或功能。
- 沿用项目断点，调整窄屏与桌面的网格和留白；保留信息层级，避免意外横向溢出。
- 对本次涉及的交互，处理键盘焦点与减少动态效果；补齐适用的禁用、加载、空内容与错误状态。
- 完成后按项目现有脚本检查，仅报告实际运行的测试与视觉检查，并列出未验证项。

QUICK COLOR REFERENCE:

- text: `#ffffff`
- background: `#2d1b69`
- dialog: `#1a1038`
- blue: `#4a90d9`
- gold: `#ffd93d`
- green: `#50c878`

EXAMPLE COMPONENT PROMPTS:

1. 做一个像素 RPG 对话框：背景 #1a1038、4px solid #4a90d9 边框、border-radius 0、内边距 20px。四角各放一个 8px × 8px 的 #4a90d9 实心方块（距边框内侧 4px）。文字 14px Press Start 2P、行高 1.8、白色。下方一个指令按钮：背景 #4a90d9、白色等宽字、4px #2d1b69 边框、零圆角、box-shadow 4px 4px 0 #2d1b69。hover 时背景硬切到 #ffd93d、文字转 #2d1b69；active 时 translate(4px,4px) 且阴影 none，transition: none。页面底色 #2d1b69。
