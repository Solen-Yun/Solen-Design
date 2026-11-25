# 故障艺术风 — 风格参考

> 画面在出错：RGB 分离、屏幕撕裂、丢帧，全都刻意保留。

**Theme:** dark

故障艺术风把数字错误当成美学：等宽字体全大写加宽字距，文字用 3px 的洋红与青双向 text-shadow 做 RGB 色彩分离，所有状态切换用 transition-none（帧丢失的断裂感），按钮按下时用 skew-x 加 scale-y 制造屏幕撕裂，卡片靠 4 到 8px 的粗左边框标记、hover 时换色。它的禁令同样绝对：不许圆角、不许平滑过渡动画、不许毛玻璃与柔和渐变、不许 CMY 三色以外的装饰色、不许衬线或常规无衬线——只有等宽，阴影只能是纯色块。

## Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Glitch Black | `#0a0a0a` | `--color-glitch-black` | 页面底。纯到让青与洋红的分离显出重影。 |
| Cyan | `#00ffff` | `--color-cyan` | RGB 分离的左侧通道，也是主文字色。 |
| Magenta | `#ff00ff` | `--color-magenta` | RGB 分离的右侧通道与警告色。 |
| Yellow | `#ffff00` | `--color-yellow` | CMY 的第三支，用于高亮与丢帧标记。 |
| White | `#ffffff` | `--color-white` | 只用于文字与实心色块，绝不作底色。 |
| Alarm Red | `#ff0506` | `--color-alarm-red` | 错误与崩溃状态，出现频率最低。 |

## Typography

### JetBrains Mono — 全站唯一等宽字体。标题 900 字重加全大写加 0.06em 字距，正文 400。

- **Substitute:** ui-monospace, 'Courier New', monospace
- **Weights:** 400, 900
- **Sizes:** 12, 14, 18, 26, 40, 64
- **Line height:** 1 (display), 1.1 (headings), 1.5 (body)
- **Letter spacing:** 0.06em on display, 0.16em on uppercase labels

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|---|---|---|---|---|---|---|
| display | — | 900 | 64px | 1 | 0.06em | `--text-display` |
| heading | — | 900 | 40px | 1.05 | 0.06em | `--text-heading` |
| subheading | — | 900 | 26px | 1.15 | — | `--text-subheading` |
| body-lg | — | 400 | 18px | 1.5 | — | `--text-body-lg` |
| body | — | 400 | 14px | 1.5 | — | `--text-body` |
| label | — | 400 | 12px | 1.4 | 0.16em | `--text-label` |

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

- **Page max-width:** 1280px
- **Section gap:** 48px
- **Card padding:** 20px
- **Element gap:** 12px

## Components

### RGB Split Text

**Role:** RGB 分离文字（核心组件）

等宽 900 字重全大写，正常文字为白或青，叠两层伪元素副本：一层偏移 -3px 用洋红、一层偏移 +3px 用青，不透明度 80%。静置时分离量 3px；hover 时分离量硬切到 6px 并加 1px 的垂直抖动（steps(1) 两帧）。绝不用模糊或平滑过渡。

- **States:** hover: split 6px, jitter

### Tear Button

**Role:** 撕裂按钮

青或洋红填充、黑字、零圆角、2px 同色描边、14px/900 全大写 0.16em、padding 10px 24px，硬阴影 4px 4px 0 对色（青配洋红、洋红配青）。hover 时填充硬切到另一色（transition-none）；按下时 skewX(-6deg) 加 scaleY(0.9) 制造屏幕撕裂并位移 2px 2px。所有状态切换 transition-none。

- **Sizes:** padding 10px 24px; label 14px
- **States:** hover: hard color swap; active: skew and squash

### Marked Card

**Role:** 粗左边框卡片

深灰 #111 填充、零圆角、4 到 8px 的左边框（青或洋红）、内边距 20px，无阴影。hover 时左边框换色从青到洋红（硬切），标题文字同步换色。边框宽度不变——变化只在颜色。

- **States:** hover: border color cut

### Scanline Bed

**Role:** 扫描线与噪点底

全页固定覆盖两层：一层 repeating-linear-gradient 画 3px 间隔的白色 4% 横线，另一层用 base64 噪点图或不规则 clip-path 色块做 2% 的错位噪点。pointer-events: none。可选每 4 秒做一次 60ms 的整体位移抖动（丢帧）。

### Error Readout

**Role:** 错误读数与状态码

12px 等宽全大写 0.16em，青色或警报红。格式固定为「ERR // 0x0A4F // FRAME DROP」。放在区块角落，作为环境信息而非真实提示。真正的错误提示必须同时给出可读的自然语言。

## Do's and Don'ts

### Do

- 等宽字体，全大写加宽字距
- 用双向 text-shadow 做 RGB 分离
- 所有状态切换 transition-none
- 按下用 skew-x 加 scale-y 撕裂
- 阴影只能是纯色块
- 装饰色只用 CMY

### Don't

- 不要用任何圆角
- 不要用平滑过渡动画
- 不要用毛玻璃或柔和渐变
- 不要用 CMY 之外的装饰色
- 不要用衬线或常规无衬线
- 不要用柔和模糊阴影

## Surfaces

| Level | Name | Value | Purpose |
|---|---|---|---|
| 0 | Glitch Black | `#0a0a0a` | 页面底 |
| 1 | Panel | `#111111` | 卡片与面板 |

## Elevation

- **Solid block:** `4px 4px 0 #00ffff`
- **Solid block alt:** `4px 4px 0 #ff00ff`
- **Pressed:** `none`

## Imagery

故障图像：像素化的截图、错位的色带、压缩伪影、扫描线。允许把照片做 RGB 通道位移与块状压缩。不使用写实摄影、柔和插画与自然图像。

## Layout

上限 1280px、容器内边距 16px，区块间距 48px。允许元素错位 2 到 8px 制造不稳定的感觉，但信息层级保持清晰。所有状态变化必须瞬时，页面整体可以每 4 秒抖一次。

## Agent Prompt Guide

### Implementation Contract

- 以用户请求中的页面、用户任务和真实内容为依据，只实施指定范围；标明缺失的业务信息，不编造数据或能力。
- 先检查现有项目、技术栈与组件；沿用项目结构、路由和依赖，复用已有组件，不重建未要求的页面或功能。
- 沿用项目断点，调整窄屏与桌面的网格和留白；保留信息层级，避免意外横向溢出。
- 对本次涉及的交互，处理键盘焦点与减少动态效果；补齐适用的禁用、加载、空内容与错误状态。
- 完成后按项目现有脚本检查，仅报告实际运行的测试与视觉检查，并列出未验证项。

QUICK COLOR REFERENCE:

- text: `#00ffff`
- background: `#0a0a0a`
- magenta: `#ff00ff`
- yellow: `#ffff00`
- white: `#ffffff`
- alarm: `#ff0506`

EXAMPLE COMPONENT PROMPTS:

1. 做一个故障艺术风按钮：背景 #00ffff、黑字、零圆角、2px solid #00ffff 边框、900 字重 14px 全大写 0.16em 字距、padding 10px 24px、box-shadow 4px 4px 0 #ff00ff。hover 时背景硬切到 #ff00ff（transition: none）；active 时 skewX(-6deg) scaleY(0.9) translate(2px,2px)。标题用等宽 900 全大写，叠两层伪元素做 RGB 分离：一层 text-shadow 3px 0 #ff00ff、一层 -3px 0 #00ffff。页面底色 #0a0a0a，可叠 3px 间隔的白色 4% 扫描线。全站零圆角、零平滑过渡。
