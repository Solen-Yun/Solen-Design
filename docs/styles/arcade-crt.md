# 街机 CRT — 风格参考

> 一块还亮着的街机显示器：扫描线、曲面、荧光与色散。

**Theme:** dark

街机 CRT 模拟 80 到 90 年代的街机显示器：全屏扫描线覆盖层、桶形曲面（用轻微 scale 与圆角模拟）、高饱和荧光色、以及 RGB 色散造成的边缘彩边。它的技术配方是固定的——所有内容区都必须叠扫描线、字体必须是等宽或像素、只用高饱和荧光色、阴影只能是霓虹光晕、渐变只能是霓虹到暗。禁令同样固定：不许柔和低饱和、不许衬线或常规无衬线正文、不许超过 4px 的圆角、不许细微阴影。

## Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Phosphor Green | `#39ff14` | `--color-phosphor-green` | 主文字与荧光。老式绿磷屏的颜色。 |
| Screen Black | `#050505` | `--color-screen-black` | 显示器底。近纯黑，让荧光层看起来在自发光。 |
| Magenta | `#ff00ff` | `--color-magenta` | RGB 色散的暖侧与「加分」状态。 |
| Cyan | `#00ffff` | `--color-cyan` | RGB 色散的冷侧与数据。 |
| Alert Red | `#ff2a2a` | `--color-alert-red` | 生命值与失败，是屏幕上最刺的颜色。 |
| Coin Yellow | `#ffff00` | `--color-coin-yellow` | 分数、金币与高亮，用于「闪一下」的地方。 |

## Typography

### Press Start 2P — 像素或等宽，行高必须放到 1.9 否则像素字会粘成一团。

- **Substitute:** 'Courier New', ui-monospace, monospace
- **Weights:** 400
- **Sizes:** 10, 12, 14, 18, 26, 36
- **Line height:** 1.3 (display), 1.4 (headings), 1.9 (body)
- **Letter spacing:** 0.05em on display, 0.12em on uppercase labels

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|---|---|---|---|---|---|---|
| display | — | 400 | 36px | 1.35 | 0.05em | `--text-display` |
| heading | — | 400 | 26px | 1.4 | 0.05em | `--text-heading` |
| subheading | — | 400 | 18px | 1.5 | — | `--text-subheading` |
| body-lg | — | 400 | 14px | 1.9 | — | `--text-body-lg` |
| body | — | 400 | 12px | 1.9 | — | `--text-body` |
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
| cards | 4px |
| buttons | 2px |
| inputs | 2px |
| screen | 24px |

- **Page max-width:** 1120px
- **Section gap:** 64px
- **Card padding:** 20px
- **Element gap:** 12px

## Components

### Scanline Overlay

**Role:** 扫描线覆盖层（签名）

全页固定覆盖一层 repeating-linear-gradient，每 3px 一条 1px 的黑色 45% 横线，pointer-events: none。可选再加一条每 3 秒从上到下扫过的亮带（亮 8%、周期 3s、linear）。这层必须覆盖所有内容区，缺了它就不是 CRT。

### Tube Frame

**Role:** 显像管外框

页面最外层容器：24px 圆角、2px 深灰边框、inset 0 0 80px 黑 60%（模拟显像管暗角）加外层 0 0 120px 荧光绿 8% 的溢出光。内部再套一层 scale(0.995) 的轻微桶形错觉。

### Neon Panel

**Role:** 内容面板

屏黑 90% 填充、4px 圆角、1px 荧光绿 40% 描边、内边距 20px，外发光 0 0 20px 荧光绿 60%。标题 26px 带 0 0 8px 文字发光，正文 12px 荧光绿 85%。hover 时描边升到 80%、发光扩到 32px。

### Arcade Button

**Role:** 行动按钮

品红或荧光绿填充、屏黑文字、2px 圆角、12px 全大写 0.12em、padding 10px 20px，外发光 0 0 16px 同色 60%。hover 时发光扩到 28px 并加一道 60ms 的 RGB 色散抖动；按下时位移 1px 且发光收到 8px。过渡 80ms linear。

- **States:** hover: glow 28px, RGB jitter; active: translate 1px

### Score Readout

**Role:** 分数与状态读数

10px 等宽全大写 0.12em，荧光绿或金币黄，带 0 0 8px 文字发光。格式为「SCORE 0012400 / HI 0098000」，数值部分用金币黄。它可以在区块角落常驻，像街机的计分条。

### Chromatic Edge

**Role:** 色散边缘

给标题或按钮叠两层文本副本：一层偏移 -2px 用品红、一层 +2px 用青，混合模式 screen，不透明度 60%。静置时偏移 2px，hover 时硬切到 3px 并抖动一次。

## Do's and Don'ts

### Do

- 全屏叠扫描线
- 等宽或像素字体
- 只用高饱和荧光色
- 阴影只能是霓虹光晕
- 渐变只能霓虹到暗
- 圆角不超过 4px（显像管除外）

### Don't

- 不要用柔和低饱和色
- 不要用衬线或常规无衬线正文
- 不要用超过 4px 的圆角
- 不要用细微阴影
- 不要用非霓虹到暗的渐变
- 不要漏掉扫描线

## Surfaces

| Level | Name | Value | Purpose |
|---|---|---|---|
| 0 | Screen Black | `#050505` | 页面底 |
| 1 | Tube Glass | `rgba(57,255,20,0.04)` | 面板（绿调半透明） |
| 2 | Scanline | `repeating-linear-gradient` | 扫描线覆盖层 |

## Elevation

- **Green glow:** `0 0 20px rgba(57,255,20,0.60)`
- **Magenta glow:** `0 0 20px rgba(255,0,255,0.55)`
- **Text glow:** `0 0 8px rgba(57,255,20,0.70)`

## Imagery

街机与复古游戏的像素图、屏幕截图、低分辨率渲染。图像必须带扫描线与轻微色散。不使用现代高清摄影与平滑插画。

## Layout

上限 1120px、容器内边距 16px，区块间距 64px。整体像一块屏幕内的布局，元素可以贴边。所有内容都在 Tube Frame 之内，外层留出 16 到 24px 的「边框」当作显像管外壳。

## Agent Prompt Guide

### Implementation Contract

- 以用户请求中的页面、用户任务和真实内容为依据，只实施指定范围；标明缺失的业务信息，不编造数据或能力。
- 先检查现有项目、技术栈与组件；沿用项目结构、路由和依赖，复用已有组件，不重建未要求的页面或功能。
- 沿用项目断点，调整窄屏与桌面的网格和留白；保留信息层级，避免意外横向溢出。
- 对本次涉及的交互，处理键盘焦点与减少动态效果；补齐适用的禁用、加载、空内容与错误状态。
- 完成后按项目现有脚本检查，仅报告实际运行的测试与视觉检查，并列出未验证项。

QUICK COLOR REFERENCE:

- text: `#39ff14`
- background: `#050505`
- magenta: `#ff00ff`
- cyan: `#00ffff`
- yellow: `#ffff00`
- alert: `#ff2a2a`

EXAMPLE COMPONENT PROMPTS:

1. 做一个街机 CRT 面板：屏黑 #050505 填充、4px 圆角、1px rgba(57,255,20,0.4) 描边、内边距 20px、box-shadow 0 0 20px rgba(57,255,20,0.6)。标题 26px 像素字体、带 0 0 8px rgba(57,255,20,0.7) 文字发光。全页叠一层每 3px 一条 1px 黑色 45% 的扫描线（pointer-events: none），外层容器加 inset 0 0 80px rgba(0,0,0,0.6) 的暗角。按钮品红 #ff00ff 填充、屏黑文字、2px 圆角、外发光 0 0 16px 同色 60%，hover 时发光扩到 28px 并做一次 60ms 的 RGB 色散抖动。
