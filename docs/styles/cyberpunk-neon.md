# 赛博朋克霓虹 — 风格参考

> 近黑底上的霓虹光管：只有发光，没有阴影。

**Theme:** dark

赛博朋克霓虹的第一条规则是「禁止普通阴影」——所有纵深都由发光表达，用 0 0 20px 的彩色光晕代替投影。底色近黑（#0a0a0f），扫描线以 4px 间隔叠在上面，暗示 CRT。颜色是高饱和的青、品红、黄、绿，其中青色是主色（界面骨架），品红用于对抗性强调。圆角必须小（不超过 8px），因为霓虹灯管是硬的。字体用等宽加全大写，像终端输出。

## Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Near Black | `#0a0a0f` | `--color-near-black` | 页面底。带一点蓝的极深色，让青光看起来是在发亮而不是发灰。 |
| Neon Cyan | `#00ffff` | `--color-neon-cyan` | 主色：边框、主按钮与标题发光。界面骨架全部由它勾出。 |
| Neon Magenta | `#ff00ff` | `--color-neon-magenta` | 对抗性强调：危险、敌对与第二层级。与青形成经典对位。 |
| Neon Yellow | `#ffff00` | `--color-neon-yellow` | 警告与数据高亮，用于需要穿透暗底的信息。 |
| Neon Green | `#00ff00` | `--color-neon-green` | 终端成功输出与在线状态，像老式荧光屏。 |
| Alarm Red | `#ff0506` | `--color-alarm-red` | 错误与过载，是唯一允许的暖色。 |

## Typography

### JetBrains Mono — 全站唯一字体，全大写、宽字距。等宽字体是「这是机器界面」的第一信号。

- **Substitute:** ui-monospace, 'Courier New', monospace
- **Weights:** 400, 700
- **Sizes:** 11, 12, 14, 18, 24, 40
- **Line height:** 1.1 (display), 1.2 (headings), 1.6 (body)
- **Letter spacing:** 0.05em on display, 0.14em on uppercase labels

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|---|---|---|---|---|---|---|
| display | — | 700 | 40px | 1.1 | 0.05em | `--text-display` |
| heading | — | 700 | 24px | 1.2 | 0.05em | `--text-heading` |
| subheading | — | 400 | 18px | 1.3 | 0.05em | `--text-subheading` |
| body | — | 400 | 14px | 1.6 | 0.02em | `--text-body` |
| body-sm | — | 400 | 12px | 1.55 | — | `--text-body-sm` |
| label | — | 700 | 11px | 1.4 | 0.14em | `--text-label` |

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
| panels | 8px |

- **Page max-width:** 1280px
- **Section gap:** 64px
- **Card padding:** 20px
- **Element gap:** 12px

## Components

### Neon Button

**Role:** 主行动按钮

透明底、2px 霓虹青描边、2px 圆角、无阴影色块。字级 12px、700 字重、全大写、0.14em 字距、padding 10px 24px，颜色霓虹青。静态时带 0 0 12px 青色光晕。hover 时填充青 12%、光晕扩到 24px；按下时光晕收到 6px 并让填充升到 20%。过渡 150ms。

- **Sizes:** padding 10px 24px; label 12px
- **States:** hover: fill 12%, glow 24px; active: glow 6px, fill 20%

### Data Panel

**Role:** 卡片与数据面板

青 4% 填充、1px 青 30% 描边、4px 圆角、内边距 20px、无阴影。标题 18px 青色带 0 0 8px 文字光晕，正文 14px 白 70%。左上角可加 8px 的直角切角（clip-path）制造硬件感。hover 时描边升到 60%、填充升到 8%、光晕 0 0 16px。

- **States:** hover: border 60%, fill 8%, glow 16px

### Terminal Input

**Role:** 输入与命令行

近黑底、1px 青 40% 描边、2px 圆角、padding 8px 12px、14px 等宽。左侧加一个闪烁的青色方块光标（1 Hz、steps 缓动）。聚焦时描边升到 100% 并加 0 0 12px 光晕。

### Scanline Overlay

**Role:** 全屏 CRT 纹理

固定覆盖层，repeating-linear-gradient 每 4px 一条 1px 的青色 4% 横线，pointer-events: none，z-index 在内容之下或之上均可但不能影响点击。整个覆盖层不透明度 60%。

### Glitch Heading

**Role:** 故障效果标题

标题文字用青色，叠两个伪元素副本：一个偏移 -2px 用红色、一个偏移 2px 用青色，混合模式 screen，不透明度 70%。仅在 hover 或每 6 秒一次做 60ms 的位移抖动，其余时间静止。

## Do's and Don'ts

### Do

- 用发光表达纵深，禁用普通阴影
- 近黑底，不用纯黑
- 圆角不超过 8px
- 青色为主，品红为对抗
- 叠一层 4px 扫描线
- 全大写等宽，宽字距

### Don't

- 不要用浅色或白色背景
- 不要用低饱和色
- 不要用普通投影（shadow-md 一类）
- 不要用暖色，除警报红外
- 不要用大圆角
- 不要用柔和温暖的设计语言

## Surfaces

| Level | Name | Value | Purpose |
|---|---|---|---|
| 0 | Near Black | `#0a0a0f` | 页面底 |
| 1 | Panel | `rgba(0,255,255,0.04)` | 卡片与面板（青色调） |
| 2 | Scanline Overlay | `repeating-linear-gradient(0deg, rgba(0,255,255,0.04) 0 1px, transparent 1px 4px)` | 全屏扫描线 |

## Elevation

- **Cyan glow:** `0 0 20px rgba(0,255,255,0.50)`
- **Magenta glow:** `0 0 20px rgba(255,0,255,0.45)`
- **Text glow:** `0 0 8px rgba(0,255,255,0.60)`

## Imagery

夜景城市、电路纹理、扫描线与全息投影。允许把照片压成高对比双色调后叠青色光晕。不使用白天摄影、柔和渐变与暖色插画。

## Layout

上限 1280px、容器内边距 16px，区块间距 64px。允许全宽数据条与边框网格：用 1px 青 20% 的线把页面切成仪表盘式分区。密集度接近 HUD，信息可以挤，但每条都要有发光层级。

## Agent Prompt Guide

### Implementation Contract

- 以用户请求中的页面、用户任务和真实内容为依据，只实施指定范围；标明缺失的业务信息，不编造数据或能力。
- 先检查现有项目、技术栈与组件；沿用项目结构、路由和依赖，复用已有组件，不重建未要求的页面或功能。
- 沿用项目断点，调整窄屏与桌面的网格和留白；保留信息层级，避免意外横向溢出。
- 对本次涉及的交互，处理键盘焦点与减少动态效果；补齐适用的禁用、加载、空内容与错误状态。
- 完成后按项目现有脚本检查，仅报告实际运行的测试与视觉检查，并列出未验证项。

QUICK COLOR REFERENCE:

- text: `#e0ffff`
- background: `#0a0a0f`
- cyan: `#00ffff`
- magenta: `#ff00ff`
- yellow: `#ffff00`
- border: `rgba(0,255,255,0.30)`

EXAMPLE COMPONENT PROMPTS:

1. 做一个霓虹按钮：透明底、2px solid #00ffff 描边、border-radius 2px、12px 700 全大写 0.14em 字距、padding 10px 24px、文字 #00ffff、box-shadow 0 0 12px rgba(0,255,255,0.5)。hover 时背景 rgba(0,255,255,0.12)、box-shadow 扩到 0 0 24px rgba(0,255,255,0.5)；active 时 box-shadow 收到 0 0 6px。页面底色 #0a0a0f，可叠一层 4px 间隔的青色 4% 扫描线。
