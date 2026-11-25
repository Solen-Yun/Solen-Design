# 酸性平面设计 — 风格参考

> 荧光绿压在纯黑上，字被拉扯变形，一切都在高频振动。

**Theme:** dark

酸性平面设计来自锐舞文化与地下俱乐部视觉：纯黑底（#0a0a0a）上铺荧光绿（#39ff14）、荧光黄（#e6ff00）、紫（#a020f0）与粉（#ff6ec7），颜色必须是纯平面的荧光色而不是渐变，字体用等宽并做 skew 与 rotate 的扭曲，阴影是硬边偏移。它的动效语言反抛光——禁止 ease-in-out 与缓慢微交互，一切反馈都在 100ms 内完成，像设备在跳帧。禁令还有：不许柔和粉彩与低饱和、不许圆角、不许衬线、不许白色或浅色背景。

## Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Acid Green | `#39ff14` | `--color-acid-green` | 第一主色。在纯黑上几乎在振动，是整套风格的标志。 |
| Pure Black | `#0a0a0a` | `--color-pure-black` | 页面底。必须近乎纯黑，让荧光色刺眼。 |
| Acid Yellow | `#e6ff00` | `--color-acid-yellow` | 第二荧光色，与绿形成最近的频率冲突。 |
| Electric Violet | `#a020f0` | `--color-electric-violet` | 第三荧光色，用于拉开冷暖。 |
| Hot Pink | `#ff6ec7` | `--color-hot-pink` | 第四荧光色，用于情绪化强调与故障感。 |
| Electric Cyan | `#00ffff` | `--color-electric-cyan` | 第五荧光色，出现频率最低，用于数据与刻度。 |

## Typography

### JetBrains Mono — 全站等宽，标题用 700 并压到行高 0.95，允许 skew 与 rotate 变形。

- **Substitute:** ui-monospace, 'Courier New', monospace
- **Weights:** 400, 700
- **Sizes:** 12, 14, 18, 26, 40, 64
- **Line height:** 0.95 (display), 1.05 (headings), 1.45 (body)
- **Letter spacing:** -0.02em on display, 0.08em on uppercase labels

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|---|---|---|---|---|---|---|
| display | — | 700 | 64px | 0.95 | -0.02em | `--text-display` |
| heading | — | 700 | 40px | 1 | -0.02em | `--text-heading` |
| subheading | — | 700 | 26px | 1.1 | — | `--text-subheading` |
| body-lg | — | 400 | 18px | 1.45 | — | `--text-body-lg` |
| body | — | 400 | 14px | 1.45 | — | `--text-body` |
| label | — | 400 | 12px | 1.4 | 0.08em | `--text-label` |

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

- **Page max-width:** 1360px
- **Section gap:** 48px
- **Card padding:** 20px
- **Element gap:** 12px

## Components

### Skewed Headline

**Role:** 扭曲标题（核心组件）

等宽 700、行高 0.95、字距 -0.02em，整块 skewX(-8deg) 并 rotate(-2deg)，颜色用荧光绿或黄。允许与色块重叠、允许超出容器边缘。hover 时 skew 量硬切到 -14 度（抖一下），transition-none 或 80ms linear。

- **States:** hover: skew to -14deg, instant

### Acid Button

**Role:** 行动按钮

荧光绿填充、黑字、零圆角、2px 黑描边、14px/700、字距 0.08em、padding 10px 24px，硬阴影 6px 6px 0 电紫。hover 时填充硬切到荧光黄、阴影换到电紫→黑；按下时位移 6px 6px 且阴影归零。transition-none 或 80ms linear。

- **Sizes:** padding 10px 24px; label 14px
- **States:** hover: hard color cut; active: translate 6px

### Liquid Form

**Role:** 液态流动形状

用 SVG 的 feTurbulence 加 feDisplacementMap（baseFrequency 0.015、scale 30）让一个纯色块或粗描边图形的边缘流动。填充用一支荧光色，每秒或每帧位移噪声种子形成蠕动。只作用于装饰块，绝不作用于文字。

### Acid Card

**Role:** 内容卡

纯黑 90% 填充、零圆角、2px 荧光绿描边、内边距 20px，硬阴影 6px 6px 0 电紫。标题 26px/700 荧光绿，正文 14px 白 80%。hover 时描边硬切到荧光黄、阴影转绿，transition-none。

- **States:** hover: hard color swap

### Tick Rail

**Role:** 刻度与数据条

高 32px 的一段，用 repeating-linear-gradient 每 8px 画一条 2px 的荧光青或荧光绿竖线，模拟音频电平表。数值用等宽荧光色叠加在右侧。用于装饰与数据可视化，单屏不超过三处。

## Do's and Don'ts

### Do

- 纯黑底配荧光色
- 颜色必须是平面荧光，不用渐变
- 用 skew 与 rotate 扭曲字
- 硬边偏移阴影
- 反馈在 100ms 内完成
- 等宽字体

### Don't

- 不要用柔和粉彩与低饱和色
- 不要用圆角
- 不要用衬线字体
- 不要用白色或浅色背景
- 不要用渐变
- 不要用 ease-in-out 与缓慢微交互

## Surfaces

| Level | Name | Value | Purpose |
|---|---|---|---|
| 0 | Pure Black | `#0a0a0a` | 页面底 |
| 1 | Panel | `#141414` | 卡片与面板 |

## Elevation

- **Acid offset:** `6px 6px 0 #39ff14`
- **Violet offset:** `6px 6px 0 #a020f0`
- **Pressed:** `none`

## Imagery

锐舞传单式图像：扭曲的金属质感图形、液态色块、故障条纹、ASCII 与栅格化照片。允许把照片压成 8 色荧光调色板。不使用精致摄影、柔和插画与低饱和图像。

## Layout

上限 1360px、容器内边距 16px，区块间距 48px。允许元素大量重叠、倾斜 -8 到 8 度、溢出容器。混乱必须有节奏：每屏至少一个元素与其他元素角度不同。

## Agent Prompt Guide

### Implementation Contract

- 以用户请求中的页面、用户任务和真实内容为依据，只实施指定范围；标明缺失的业务信息，不编造数据或能力。
- 先检查现有项目、技术栈与组件；沿用项目结构、路由和依赖，复用已有组件，不重建未要求的页面或功能。
- 沿用项目断点，调整窄屏与桌面的网格和留白；保留信息层级，避免意外横向溢出。
- 对本次涉及的交互，处理键盘焦点与减少动态效果；补齐适用的禁用、加载、空内容与错误状态。
- 完成后按项目现有脚本检查，仅报告实际运行的测试与视觉检查，并列出未验证项。

QUICK COLOR REFERENCE:

- text: `#39ff14`
- background: `#0a0a0a`
- yellow: `#e6ff00`
- violet: `#a020f0`
- pink: `#ff6ec7`
- cyan: `#00ffff`

EXAMPLE COMPONENT PROMPTS:

1. 做一个酸性平面设计按钮：荧光绿 #39ff14 填充、黑字、零圆角、2px solid #0a0a0a 边框、14px/700 字距 0.08em、padding 10px 24px、box-shadow 6px 6px 0 #a020f0。hover 时背景硬切到 #e6ff00、阴影换色，transition: none；active 时 translate(6px,6px) 且阴影 none。标题用等宽 700、行高 0.95、skewX(-8deg) rotate(-2deg)、色 #39ff14。页面底色 #0a0a0a，全站零圆角、无渐变、无柔和过渡。
