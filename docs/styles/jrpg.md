# 日式 RPG — 风格参考

> 斜面边框、金色标题、蓝底渐变：一个 1995 年的菜单窗口。

**Theme:** dark

日式 RPG 界面来自 16 位到 32 位时代的游戏菜单：深海军蓝底（#0f172a）上叠蓝色到深蓝的渐变，窗口用 2px 蓝色边框加内阴影做出斜面浮雕感，标题用金色（#fbbf24），状态栏用绿（HP）与蓝（MP），卡片是双层描边（2px 深蓝加 1px 亮蓝环），按钮靠 inset 白色高光显得凸起。菜单反馈必须硬切——75 到 120ms，模拟手柄选中项的节奏，绝不能平滑缓动。它禁止极简扁平：无边框无阴影在这里等于没做。

## Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Deep Navy | `#0f172a` | `--color-deep-navy` | 页面底与窗口内部。32 位时代 RPG 的菜单底色。 |
| Command Blue | `#1e40af` | `--color-command-blue` | 窗口边框、按钮底与 MP 条。 |
| Gold | `#fbbf24` | `--color-gold` | 标题、重要数值与选中项。菜单里唯一发亮的颜色。 |
| Window White | `#f0f9ff` | `--color-window-white` | 主要文字与描述。略带蓝的白。 |
| HP Green | `#22c55e` | `--color-hp-green` | 生命值与成功。永远是分段条而非连续渐变。 |
| Signal Green | `#56ed40` | `--color-signal-green` | 状态提示与「可执行」标记。 |

## Typography

### Inter — 带一点方正的界面无衬线，标题 700 并带金色。字级偏紧凑，因为菜单要在一屏内放下很多行。

- **Substitute:** 'Segoe UI', system-ui, sans-serif
- **Weights:** 400, 700
- **Sizes:** 13, 16, 20, 26, 34, 44
- **Line height:** 1.15 (display), 1.25 (headings), 1.6 (body)
- **Letter spacing:** 0.02em on display, 0.08em on uppercase labels

### JetBrains Mono — 数值与状态读数。等宽让 HP/MP 与等级在纵向可比。

- **Substitute:** ui-monospace, 'Courier New', monospace
- **Weights:** 400, 700
- **Sizes:** 13, 16, 20
- **Line height:** 1.4 (display), 1.4 (headings), 1.55 (body)
- **Letter spacing:** 0.04em on display, 0.08em on uppercase labels

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|---|---|---|---|---|---|---|
| heading | Inter | 700 | 44px | 1.15 | 0.02em | `--text-heading` |
| subheading | Inter | 700 | 34px | 1.2 | 0.02em | `--text-subheading` |
| body-lg | Inter | 400 | 20px | 1.5 | — | `--text-body-lg` |
| body | Inter | 400 | 16px | 1.6 | — | `--text-body` |
| body-sm | Inter | 400 | 13px | 1.55 | — | `--text-body-sm` |
| label | JetBrains Mono | 700 | 13px | 1.4 | 0.08em | `--text-label` |

## Spacing & Layout

**Base unit:** 8px
**Density:** compact

### Spacing Scale

| Name | Value | Token |
|---|---|---|
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
| cards | 8px |
| buttons | 6px |
| inputs | 6px |
| bars | 999px |

- **Page max-width:** 1120px
- **Section gap:** 48px
- **Card padding:** 20px
- **Element gap:** 12px

## Components

### Bevel Window

**Role:** 斜面菜单窗口（核心组件）

窗口底 #132039、2px 指令蓝描边、外层再加 1px 亮蓝 20% 的环形成双层描边、8px 圆角、内边距 20px，阴影 inset 0 1px 0 白 20% 加 inset 0 -1px 0 黑 35% 做出斜面。外投影 0 8px 24px 黑 55%。标题金色 34px/700，内容窗白 16px。

### Command Button

**Role:** 指令按钮

指令蓝填充、窗白文字、2px 深蓝描边、6px 圆角、16px/700、padding 10px 24px，inset 0 1px 0 白 20% 做出凸起。hover 时填充提亮 6%、文字转金色；按下时内阴影反向（inset 0 2px 6px 黑 45%）并下沉 1px。过渡 90ms linear——硬切。

- **Sizes:** padding 10px 24px; label 16px
- **States:** hover: brighter, gold text; active: inset shadow, sink 1px

### Status Bar

**Role:** HP / MP 状态条

高 16px、全圆角、2px 深蓝描边，内部填充 HP 绿或亮蓝，并用 8px 宽的小格分开（每格间隔 2px），模拟分段血条。绝不用平滑渐变——分段是这个时代的标志。数值用等宽字体放在条右侧，13px 金色。

### Menu List

**Role:** 菜单选项列表

每项高 36px、6px 圆角、左侧 8px 处一个 8px 的金色三角或方块指示选中（未选中时透明）。选中项底填金 18% 并把文字转金。切换只做颜色硬切，不做滑动，时长 90ms。

### Portrait Frame

**Role:** 立绘与头像框

48 到 96px、8px 圆角、2px 金色描边加 1px 深蓝外环，内部填海军的深色或放立绘。四角各放一个 4px 的金色角标。用于角色、物品与队伍成员。

## Do's and Don'ts

### Do

- 2px 边框加内阴影做斜面
- 金色标题与选中项
- 状态条必须分段
- 菜单反馈 75 到 120ms 硬切
- 双层描边（2px 深蓝加 1px 亮蓝）
- 按钮用 inset 白色高光显凸起

### Don't

- 不要用极简扁平（无边框无阴影）
- 不要用平滑缓动做菜单反馈
- 不要用连续渐变的状态条
- 不要用扁平线稿图标
- 不要用超过 8px 的圆角
- 不要让金色承担正文

## Surfaces

| Level | Name | Value | Purpose |
|---|---|---|---|
| 0 | Navy Gradient | `linear-gradient(#1e3a8a, #0f172a)` | 页面与窗口底 |
| 1 | Window | `#132039` | 菜单窗口 |
| 2 | Selected Row | `rgba(251,191,36,0.18)` | 选中行 |

## Elevation

- **Bevel:** `inset 0 1px 0 rgba(255,255,255,0.20), inset 0 -1px 0 rgba(0,0,0,0.35)`
- **Window drop:** `0 8px 24px rgba(0,0,0,0.55)`
- **Pressed:** `inset 0 2px 6px rgba(0,0,0,0.45)`

## Imagery

像素立绘、道具图标、地图与技能特效。图标必须有 2px 描边与内阴影，不能是扁平线稿。允许把照片处理成 32 色调色板。不使用现代插画与扁平图标。

## Layout

上限 1120px、容器内边距 16px，窗口间距 12px，形成密集的菜单排布。允许窗口层叠（主菜单上叠子菜单），每层偏移 8px 并加深阴影。所有尺寸取 4 的倍数。

## Agent Prompt Guide

### Implementation Contract

- 以用户请求中的页面、用户任务和真实内容为依据，只实施指定范围；标明缺失的业务信息，不编造数据或能力。
- 先检查现有项目、技术栈与组件；沿用项目结构、路由和依赖，复用已有组件，不重建未要求的页面或功能。
- 沿用项目断点，调整窄屏与桌面的网格和留白；保留信息层级，避免意外横向溢出。
- 对本次涉及的交互，处理键盘焦点与减少动态效果；补齐适用的禁用、加载、空内容与错误状态。
- 完成后按项目现有脚本检查，仅报告实际运行的测试与视觉检查，并列出未验证项。

QUICK COLOR REFERENCE:

- text: `#f0f9ff`
- background: `#0f172a`
- blue: `#1e40af`
- gold: `#fbbf24`
- green: `#22c55e`
- window: `#132039`

EXAMPLE COMPONENT PROMPTS:

1. 做一个 JRPG 菜单窗口：#132039 底、2px solid #1e40af 边框加外层 1px rgba(96,165,250,0.2) 环、8px 圆角、内边距 20px、box-shadow inset 0 1px 0 rgba(255,255,255,0.2), inset 0 -1px 0 rgba(0,0,0,0.35), 0 8px 24px rgba(0,0,0,0.55)。标题 34px/700 金色 #fbbf24，正文 16px #f0f9ff。下方放一条 16px 高、全圆角、分成 8px 小格的 HP 绿 #22c55e 状态条。按钮 #1e40af 填充、2px 深蓝边、inset 0 1px 0 白色高光，hover 时文字转金，transition 90ms linear。页面底色用 linear-gradient(#1e3a8a, #0f172a)。
