# VHS 美学 — 风格参考

> 一盘看了二十年的录像带：色偏、噪点、时间码在闪。

**Theme:** dark

VHS 美学模拟 80 到 90 年代录像带的画面缺陷：文字用洋红与青的双向偏移做 RGB 分离，全站等宽字体，深黑或深紫底（#000000 或 #1a0a2e），标签全大写加宽字距，画面叠扫描线与噪点，右下角常驻一个闪烁的时间码。它与故障艺术的区别在于「这不是故障而是介质」——VHS 的失真是一贯的、温柔的、整体的，而不是突发撕裂。它禁止干净锐利的排版，因为那正是 VHS 没有的东西。

## Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Magenta | `#ff00ff` | `--color-magenta` | RGB 分离的暖侧，也是主文字色。 |
| Black | `#000000` | `--color-black` | 页面底。录像带的黑场。 |
| Cyan | `#00ffff` | `--color-cyan` | RGB 分离的冷侧。与洋红永远成对。 |
| Yellow | `#ffff00` | `--color-yellow` | 时间码、录制标记与高亮。 |
| Green | `#00ff00` | `--color-green` | 「PLAY」指示与状态，出现频率较低。 |
| Deep Violet | `#1a0a2e` | `--color-deep-violet` | 次级底与渐变的一端，让黑不那么死。 |

## Typography

### JetBrains Mono — 全站等宽。标签全大写加 0.18em 字距，像录像机的屏幕字符。

- **Substitute:** ui-monospace, 'Courier New', monospace
- **Weights:** 400, 700
- **Sizes:** 11, 13, 16, 22, 32, 44
- **Line height:** 1.15 (display), 1.25 (headings), 1.55 (body)
- **Letter spacing:** 0.06em on display, 0.18em on uppercase labels

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|---|---|---|---|---|---|---|
| display | — | 700 | 44px | 1.15 | 0.06em | `--text-display` |
| heading | — | 700 | 32px | 1.2 | 0.06em | `--text-heading` |
| subheading | — | 700 | 22px | 1.3 | 0.06em | `--text-subheading` |
| body-lg | — | 400 | 16px | 1.5 | — | `--text-body-lg` |
| body | — | 400 | 13px | 1.55 | — | `--text-body` |
| label | — | 400 | 11px | 1.45 | 0.18em | `--text-label` |

## Spacing & Layout

**Base unit:** 8px
**Density:** comfortable

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
| cards | 4px |
| buttons | 2px |
| inputs | 2px |

- **Page max-width:** 1160px
- **Section gap:** 80px
- **Card padding:** 24px
- **Element gap:** 16px

## Components

### Split Title

**Role:** RGB 分离标题（核心）

等宽 700 全大写，主色洋红，叠两层文本副本：一层偏移 2px 用青、一层偏移 -2px 用洋红，混合模式 screen。静置时偏移 2px，每 8 秒触发一次 200ms 的步进抖动（steps(3)）让偏移跳到 4px 再回。正文绝不做分离。

- **Sizes:** jitter 200ms steps(3), every 8s

### Tape Panel

**Role:** 录像面板

深紫填充、4px 圆角、1px 洋红 25% 描边、内边距 24px。标题 22px/700 带分离，正文 13px 白 80%。左上角放「● REC」指示（绿点带 1s 闪烁），右下角放时间码（黄，如 00:12:47）。hover 时描边升到 50% 并加一条 2px 高的白 30% 横线扫过（180ms steps(3)）。

- **States:** hover: border 50%, tracking bar sweep

### Scanline Bed

**Role:** 扫描线与噪点底

固定覆盖两层：一层 repeating-linear-gradient（每 3px 一条 1px 黑 40% 横线），一层噪点（base64 颗粒或 feTurbulence，不透明度 6%）。再叠一层极缓的垂直滚动（每 12 秒偏移 3px，linear）。pointer-events: none。

### Play Button

**Role:** 行动按钮

透明底、1px 洋红 40% 描边、2px 圆角、11px 等宽全大写 0.18em、padding 10px 24px，文字洋红带 0 0 8px 微光。hover 时描边升到 100%、文字转黄；按下时整体横向位移 2px 并做一次 60ms 的色偏。过渡 80ms linear。

- **Sizes:** padding 10px 24px; label 11px
- **States:** hover: yellow text; active: shift 2px, color drift

### OSD Label

**Role:** 屏幕字符标签

11px 等宽全大写 0.18em，色黄或绿，可带 1px 黑描边保证在亮画面上可读。格式固定为「SP · 00:12:47」或「PLAY」。它是录像机叠加在画面上的信息，常驻角落。

## Do's and Don'ts

### Do

- 文字用洋红青双向偏移
- 全站等宽字体
- 深黑或深紫底
- 叠扫描线与噪点
- 常驻时间码与 REC 指示
- 抖动幅度 2 到 4px、每 8 秒一次

### Don't

- 不要用干净锐利的排版
- 不要在正文做 RGB 分离
- 不要用高清干净摄影
- 不要用大圆角
- 不要用标准投影
- 不要让噪点压过文字

## Surfaces

| Level | Name | Value | Purpose |
|---|---|---|---|
| 0 | Black | `#000000` | 页面底 |
| 1 | Deep Violet | `#1a0a2e` | 面板 |
| 2 | Noise Overlay | `grain + scanlines` | 噪点层 |

## Elevation

- **RGB split:** `2px 0 #ff00ff, -2px 0 #00ffff`
- **Text glow:** `0 0 8px rgba(255,0,255,0.55)`
- **Never:** `no standard drop shadows`

## Imagery

录像带画面：家庭录像、老广告、监控、低分辨率素材。必须带扫描线、色偏与噪点。允许把现代照片做 VHS 化处理（色度位移、降采样、加噪）。不使用高清干净摄影与现代插画。

## Layout

上限 1160px、容器内边距 16px，区块间距 80px。允许画面轻微偏移与整体抖动（每 8 秒 2 到 4px）。小圆角（2 到 4px）贯穿全站。所有文字都在 OSD 层之上保持可读。

## Agent Prompt Guide

### Implementation Contract

- 以用户请求中的页面、用户任务和真实内容为依据，只实施指定范围；标明缺失的业务信息，不编造数据或能力。
- 先检查现有项目、技术栈与组件；沿用项目结构、路由和依赖，复用已有组件，不重建未要求的页面或功能。
- 沿用项目断点，调整窄屏与桌面的网格和留白；保留信息层级，避免意外横向溢出。
- 对本次涉及的交互，处理键盘焦点与减少动态效果；补齐适用的禁用、加载、空内容与错误状态。
- 完成后按项目现有脚本检查，仅报告实际运行的测试与视觉检查，并列出未验证项。

QUICK COLOR REFERENCE:

- text: `#ff00ff`
- background: `#000000`
- cyan: `#00ffff`
- yellow: `#ffff00`
- green: `#00ff00`
- violet: `#1a0a2e`

EXAMPLE COMPONENT PROMPTS:

1. 做一个 VHS 美学面板：深紫 #1a0a2e 填充、4px 圆角、1px rgba(255,0,255,0.25) 描边、内边距 24px。标题 22px/700 等宽全大写，叠两层文本副本做 RGB 分离（一层 text-shadow 2px 0 #00ffff、一层 -2px 0 #ff00ff），每 8 秒抖一次 200ms。左上角「● REC」绿点（#00ff00、1s 闪烁），右下角黄色时间码「00:12:47」（11px 等宽 0.18em）。全页覆 repeating-linear-gradient（每 3px 一条 1px 黑 40%）加 6% 噪点。按钮透明底、1px 洋红描边、11px 等宽全大写 0.18em，hover 时文字转黄。页面底色 #000000。
