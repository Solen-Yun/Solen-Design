# 故障广播 — 风格参考

> 信号正在断：扫描线在爬，RGB 在抖，色条偶尔扫过。

**Theme:** dark

故障广播是 90 年代电视台台标与 VHS 故障艺术的复活，与合成波不同：它不画日落与网格，而是模拟信号本身坏掉的样子。CRT 近黑底（#0b0b0e）上永远覆着一层缓缓滚动的扫描线，只有三支信号色（故障红 #ff2e4c、CRT 青 #00e5d8、测试卡黄 #f5e000），SMPTE 彩条作签名装饰，所有故障动效用 steps() 硬切（帧跳、VHS 横向撕裂、色条横扫），绝不平滑过渡。它明令禁止合成波的紫粉橙日落与地平线网格——那是另一个风格。

## Colors

| Name | Value | Token | Role |
|---|---|---|---|
| CRT Black | `#0b0b0e` | `--color-crt-black` | 页面底。显像管的黑，永远覆扫描线。 |
| Signal White | `#ededed` | `--color-signal-white` | 正文与彩条里的白。略带灰，像老电视的亮。 |
| Glitch Red | `#ff2e4c` | `--color-glitch-red` | RGB 分离的一侧与警报。取自彩条的红。 |
| CRT Cyan | `#00e5d8` | `--color-crt-cyan` | RGB 分离的另一侧与状态。 |
| Test Card Yellow | `#f5e000` | `--color-test-yellow` | 高亮与彩条的高光段。 |

## Typography

### JetBrains Mono — 等宽字体，全大写。像电视台的字幕机与时间码。

- **Substitute:** ui-monospace, 'Courier New', monospace
- **Weights:** 400, 700
- **Sizes:** 11, 13, 16, 22, 32, 48
- **Line height:** 1.1 (display), 1.2 (headings), 1.5 (body)
- **Letter spacing:** 0.06em on display, 0.16em on uppercase labels

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|---|---|---|---|---|---|---|
| display | — | 700 | 48px | 1.1 | 0.06em | `--text-display` |
| heading | — | 700 | 32px | 1.2 | 0.06em | `--text-heading` |
| subheading | — | 700 | 22px | 1.3 | 0.06em | `--text-subheading` |
| body-lg | — | 400 | 16px | 1.5 | — | `--text-body-lg` |
| body | — | 400 | 13px | 1.5 | — | `--text-body` |
| label | — | 400 | 11px | 1.4 | 0.16em | `--text-label` |

## Spacing & Layout

**Base unit:** 8px
**Density:** compact

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

### Border Radius

| Element | Value |
|---|---|
| cards | 0 |
| buttons | 0 |
| inputs | 0 |

- **Page max-width:** 1240px
- **Section gap:** 64px
- **Card padding:** 24px
- **Element gap:** 16px

## Components

### Scanline Crawl

**Role:** 滚动扫描线（核心）

全页固定覆盖 repeating-linear-gradient（每 4px 一条 1px 黑 50% 横线），再叠一层同样的图案并用 transform: translateY 在 8 秒内从 0 移到 4px（linear 无限循环），形成「信号在爬」的错觉。绝不改 top 或 height。reduced-motion 时静止。

- **Sizes:** 4px pitch; 8s linear loop

### RGB Split Title

**Role:** 通道分离标题

标题叠两层副本：一层偏移 2px 用故障红、一层 -2px 用 CRT 青，混合模式 screen。静置时偏移 2px；每 6 秒触发一次 120ms 的 steps(2) 抖动（偏移跳到 4px 再回）。正文层绝不做通道分离——那会让字不可读。

- **Sizes:** jitter 120ms steps(2), every 6s

### SMPTE Bars

**Role:** SMPTE 彩条（签名）

一条 24 到 48px 高的彩条带，按标准顺序排七段：白、黄、青、绿、品红、红、蓝。它只在页面顶部或区块之间出现，每次恰好一条，用作「信号校准」的装饰。

### Signal Panel

**Role:** 信号面板

#111116 填充、零圆角、1px 信号白 12% 描边、内边距 24px，无阴影。标题 22px/700 带通道分离，正文 13px 信号白 80%。hover 时描边升到 25% 并让一条 2px 高的色条在 200ms 内横扫一遍（steps(4)）。

- **States:** hover: bar sweep on steps(4)

### Broadcast Button

**Role:** 行动按钮

透明底、1px 信号白 30% 描边、零圆角、13px/700 全大写 0.16em、padding 10px 24px。hover 时描边转故障红、文字转测试卡黄；按下时整体横向撕裂——clip-path 切出 3 条水平错位（各偏 2 到 4px），并在 80ms 内复位。transition-none 或 80ms steps(2)。

- **States:** hover: red border; active: horizontal tear

## Do's and Don'ts

### Do

- CRT 黑底加滚动扫描线
- 只用三支信号色
- 故障动效用 steps() 硬切
- SMPTE 彩条作签名，只一条
- 通道分离只做在标题与装饰
- 抖动幅度 2 到 4px、频率极低

### Don't

- 不要用合成波的日落渐变与地平线网格
- 不要用圆角、柔光与柔和阴影
- 不要引入第四种颜色
- 不要满屏持续抖动
- 不要在正文做通道分离
- 不要动画布局属性

## Surfaces

| Level | Name | Value | Purpose |
|---|---|---|---|
| 0 | CRT Black | `#0b0b0e` | 页面底 |
| 1 | Signal Panel | `#111116` | 面板 |
| 2 | Color Bars | `SMPTE bars` | 彩条装饰 |

## Elevation

- **None:** `none — this is hard signal, not soft UI`
- **Channel split:** `2px 0 #ff2e4c, -2px 0 #00e5d8`

## Imagery

VHS 画面、测试卡、色条、电视噪点、监控画面。必须带扫描线与轻微色偏。允许把照片压成 3 色信号调色板。不使用干净摄影、柔和插画与任何合成波日落。

## Layout

上限 1240px、容器内边距 16px，区块间距 64px。零圆角贯穿全站。全屏扫描线覆盖所有内容，色条只在顶部出现一次。允许元素每 6 秒抖一次，幅度 2 到 4px，频率极低。

## Agent Prompt Guide

### Implementation Contract

- 以用户请求中的页面、用户任务和真实内容为依据，只实施指定范围；标明缺失的业务信息，不编造数据或能力。
- 先检查现有项目、技术栈与组件；沿用项目结构、路由和依赖，复用已有组件，不重建未要求的页面或功能。
- 沿用项目断点，调整窄屏与桌面的网格和留白；保留信息层级，避免意外横向溢出。
- 对本次涉及的交互，处理键盘焦点与减少动态效果；补齐适用的禁用、加载、空内容与错误状态。
- 完成后按项目现有脚本检查，仅报告实际运行的测试与视觉检查，并列出未验证项。

QUICK COLOR REFERENCE:

- text: `#ededed`
- background: `#0b0b0e`
- red: `#ff2e4c`
- cyan: `#00e5d8`
- yellow: `#f5e000`
- panel: `#111116`

EXAMPLE COMPONENT PROMPTS:

1. 做一个故障广播面板：CRT 黑 #0b0b0e 填充、零圆角、1px rgba(237,237,237,0.12) 描边、内边距 24px、无阴影。标题 22px/700 等宽全大写，叠两层副本做通道分离（一层 text-shadow 2px 0 #ff2e4c、一层 -2px 0 #00e5d8），每 6 秒抖一次 120ms。全页覆 repeating-linear-gradient（每 4px 一条 1px 黑 50%）并叠一层 translateY 0→4px 的 8s linear 滚动。顶部放一条 32px 高的 SMPTE 七段彩条（白黄青绿品红红蓝）。按钮透明底、1px 描边、hover 时描边转 #ff2e4c，active 时用 clip-path 做横向撕裂。全站只用三支信号色，不用合成波日落。
