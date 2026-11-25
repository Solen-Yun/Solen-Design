# 科幻 HUD — 风格参考

> 深空底上的一层发光数据：面板半透明，角标是 L 形，灯一直在脉冲。

**Theme:** dark

科幻 HUD 模拟星舰驾驶舱与战术指挥台的显示层。它的构成是固定的：深空底（#020617），面板以 85% 不透明叠上去并带 20px 发光边，四角用 L 形 2px 边框做框选标记，文字用等宽大写加宽字距，状态灯持续脉冲，进度条用渐变加一道扫描光。它的关键不是装饰而是「系统活着」的感觉——所有交互都必须让某个部件发光或脉冲，普通阴影加深在这里不够用。

## Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Deep Space | `#020617` | `--color-deep-space` | 页面底。极深的蓝黑，让青光的对比拉到最大。 |
| Primary Cyan | `#06b6d4` | `--color-cyan` | 边框、发光与主强调。所有「系统在线」的信号都由它发出。 |
| Scan Blue | `#0ea5e9` | `--color-scan-blue` | 雷达扫描、数据流与次级高亮。 |
| Bright Cyan | `#22d3ee` | `--color-bright-cyan` | 峰值高光与关键数值，比主青更亮一档。 |
| System Green | `#22c55e` | `--color-system-green` | 正常状态、已锁定与通过检查。是唯一的「安全」色。 |
| Resonance Violet | `#9e74ff` | `--color-violet` | 异常读数与需要人工介入的状态，出现频率最低。 |

## Typography

### JetBrains Mono — 全站唯一字体，全大写、0.08 到 0.16em 字距。等宽让数值列对齐，也让整页像仪表读数。

- **Substitute:** ui-monospace, 'Courier New', monospace
- **Weights:** 400, 700
- **Sizes:** 10, 11, 12, 14, 18, 24
- **Line height:** 1.2 (display), 1.3 (headings), 1.6 (body)
- **Letter spacing:** 0.08em on display, 0.16em on uppercase labels

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|---|---|---|---|---|---|---|
| heading | — | 700 | 24px | 1.2 | 0.08em | `--text-heading` |
| subheading | — | 400 | 18px | 1.3 | 0.08em | `--text-subheading` |
| body-lg | — | 400 | 14px | 1.5 | 0.04em | `--text-body-lg` |
| body | — | 400 | 12px | 1.6 | — | `--text-body` |
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
| cards | 4px |
| buttons | 2px |
| inputs | 2px |
| dials | 999px |

- **Page max-width:** 1600px
- **Section gap:** 24px
- **Card padding:** 20px
- **Element gap:** 8px

## Components

### HUD Panel

**Role:** 主面板与数据块

深板岩 85% 填充、20px 模糊、4px 圆角、1px 主青 30% 描边、内边距 20px，外发光 0 0 20px 青 50%。四角各用两个伪元素画 L 形角标（2px 主青、长 16px）。hover 时描边升到 60%、外发光扩到 32px——这就是「系统激活」。

- **Sizes:** padding 20px; radius 4px
- **States:** hover: border 60%, glow 32px

### Glow Button

**Role:** 主行动按钮

透明底、2px 主青描边、2px 圆角、无填充，12px/700 全大写 0.16em、padding 8px 20px，文字亮青。静态时已有 0 0 12px 的发光。hover 时填充青 12%、发光扩到 24px；按下时发光收到 6px 并把填充升到 20%。过渡 120ms。

- **States:** hover: fill 12%, glow 24px; active: glow 6px

### Status Light

**Role:** 状态指示灯

8px 圆点，正常绿、预警紫、告警橙。必须持续脉冲：0 到 100% 之间把外发光从 4px 扩到 12px 再收回，周期 2 秒，缓动用 ease-in-out。灯旁边永远配 11px 的等宽状态文字，不只靠颜色。

### Scan Bar

**Role:** 进度条与扫描指示

高 6px、2px 圆角，底槽为主青 15%。填充用主青到亮青的横向渐变，并在填充上叠一道 24px 宽的白色 40% 高光，以 3 秒周期从左扫到右。数值以等宽字体放在右侧，单位与数字分开。

### Radar Ring

**Role:** 雷达与环形仪表

直径 160px 到 240px 的圆环，2px 主青 30% 描边，内部十字准线 1px 主青 20%，扫描扇区用 conic-gradient 从主青 40% 渐隐到透明，旋转一周 4 秒、线性。中心显示 18px 等宽读数。

## Do's and Don'ts

### Do

- 面板半透明加深模糊加外发光
- 四角必须有 L 形角标
- 等宽大写，字距 0.08 到 0.16em
- 状态灯持续脉冲
- 交互必须让某处发光变化
- 暖色只用于警告

### Don't

- 不要用浅色或白色背景
- 不要用暖色调（警告除外）
- 不要用衬线字体
- 不要用圆润可爱的语言
- 不要用 8px 以上的圆角
- 不要让状态灯静止

## Surfaces

| Level | Name | Value | Purpose |
|---|---|---|---|
| 0 | Deep Space | `#020617` | 页面底 |
| 1 | Panel | `rgba(15,23,42,0.85)` | 主要面板 |
| 2 | Panel Raised | `rgba(30,41,59,0.90)` | 浮层与弹窗 |

## Elevation

- **Panel glow:** `0 0 20px rgba(6,182,212,0.50)`
- **Active glow:** `0 0 32px rgba(6,182,212,0.70)`
- **Text glow:** `0 0 8px rgba(34,211,238,0.60)`

## Imagery

以网格、雷达、波形与星图为图像语言，不用摄影。允许深空摄影作为面板底层并压到 20% 不透明度。不使用插画、人物与任何暖色图像。

## Layout

上限 1600px、容器内边距 16px，面板间距 8px，形成密集的仪表盘排布。允许面板以 1px 青线拼接成更大的显示区。四角常驻 L 形角标，页面边缘保留 16px 安全区。

## Agent Prompt Guide

### Implementation Contract

- 以用户请求中的页面、用户任务和真实内容为依据，只实施指定范围；标明缺失的业务信息，不编造数据或能力。
- 先检查现有项目、技术栈与组件；沿用项目结构、路由和依赖，复用已有组件，不重建未要求的页面或功能。
- 沿用项目断点，调整窄屏与桌面的网格和留白；保留信息层级，避免意外横向溢出。
- 对本次涉及的交互，处理键盘焦点与减少动态效果；补齐适用的禁用、加载、空内容与错误状态。
- 完成后按项目现有脚本检查，仅报告实际运行的测试与视觉检查，并列出未验证项。

QUICK COLOR REFERENCE:

- text: `#e5f2ff`
- background: `#020617`
- panel: `rgba(15,23,42,0.85)`
- accent: `#06b6d4`
- bright: `#22d3ee`
- ok: `#22c55e`

EXAMPLE COMPONENT PROMPTS:

1. 做一个科幻 HUD 面板：背景 rgba(15,23,42,0.85)、backdrop-blur 20px、4px 圆角、1px rgba(6,182,212,0.3) 描边、box-shadow 0 0 20px rgba(6,182,212,0.5)、内边距 20px。四角用 2px solid #06b6d4 的 L 形角标（长 16px）。标题 14px 等宽全大写 0.16em。面板内放一个高 6px 的进度条：底槽 rgba(6,182,212,0.15)、填充 linear-gradient(to right, #06b6d4, #22d3ee)。页面底色 #020617。
