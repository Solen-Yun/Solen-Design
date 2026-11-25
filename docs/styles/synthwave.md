# 合成波 — 风格参考

> 日落渐变压在网格地平线上，霓虹从内外两侧同时发光。

**Theme:** dark

合成波是 80 年代合成器音乐的视觉：粉紫青霓虹、橙到粉到紫的日落渐变、向地平线汇聚的透视网格、复古科技字体。它有两条标志性动效规则——第一是 Arcade Pulse，霓虹边框与发光元素在 hover 时脉冲或闪烁，像街机的 CRT 被触碰后通电；第二是 Multidimensional Neon，按钮必须同时有内嵌青光的 inset 阴影与外侧粉光的外阴影，两根霓虹灯管从相反方向发光，hover 时一起加强。单方向发光在这里是错的。

## Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Magenta | `#ff00ff` | `--color-magenta` | 第一霓虹色：外发光的粉侧与主按钮。 |
| Cyan | `#00ffff` | `--color-cyan` | 第二霓虹色：内发光的青侧与网格线。 |
| Deep Violet Base | `#1a0b2e` | `--color-deep-violet` | 页面底。深到让两层霓虹都能被看见。 |
| Pink | `#ff6ec7` | `--color-pink` | 日落渐变的中段与次级强调。 |
| Violet | `#7b68ee` | `--color-violet` | 渐变的过渡站，把粉接到深紫。 |
| Sunset Orange | `#f67d50` | `--color-sunset-orange` | 渐变顶端与暖侧高光，落日与地平线的交界。 |

## Typography

### Orbitron — 复古科技感的几何无衬线，全大写并放宽字距。标题 46 到 66px 带 0.04em 字距。

- **Substitute:** 'Arial Black', 'Trebuchet MS', sans-serif
- **Weights:** 700, 900
- **Sizes:** 13, 16, 22, 32, 46, 66
- **Line height:** 1.05 (display), 1.15 (headings), 1.5 (body)
- **Letter spacing:** 0.04em on display, 0.2em on uppercase labels

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|---|---|---|---|---|---|---|
| display | Orbitron | 900 | 66px | 1.05 | 0.04em | `--text-display` |
| heading | Orbitron | 900 | 46px | 1.1 | 0.04em | `--text-heading` |
| subheading | Orbitron | 700 | 32px | 1.2 | — | `--text-subheading` |
| body-lg | Orbitron | 700 | 16px | 1.5 | — | `--text-body-lg` |
| body | Orbitron | 700 | 13px | 1.5 | — | `--text-body` |
| label | Orbitron | 700 | 13px | 1.4 | 0.2em | `--text-label` |

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
| 128 | 128px | `--spacing-128` |

### Border Radius

| Element | Value |
|---|---|
| cards | 8px |
| buttons | 8px |
| inputs | 8px |

- **Page max-width:** 1280px
- **Section gap:** 96px
- **Card padding:** 24px
- **Element gap:** 16px

## Components

### Multidimensional Button

**Role:** 主行动按钮（双向霓虹）

深紫填充、白字、8px 圆角、1px 洋红 60% 描边，13px/700 全大写 0.2em、padding 12px 28px。必须同时带 0 0 15px 洋红 40% 的外发光与 inset 0 0 10px 青 20% 的内发光。hover 时两层一起加强到 30px 与 20px，并触发 Arcade Pulse（动画在 1.2s 内往复一次）。过渡 200ms。

- **Sizes:** padding 12px 28px; label 13px
- **States:** hover: both glows intensify, arcade pulse

### Neon Card

**Role:** 内容卡

深紫 80% 填充、8px 圆角、1px 青 35% 描边、内边距 24px，双向外发光（青 12px、洋红 24px）。标题 32px/700 带 0 0 12px 洋红文字发光，正文 13px 白 80%。hover 时描边升到 70% 并触发一次脉冲。

- **States:** hover: border 70%, pulse once

### Sunset Horizon

**Role:** 日落与地平线（签名）

一条从橙经粉到紫的垂直渐变带，高 240 到 360px，中间放一个 120 到 200px 的圆（橙到粉的径向渐变），圆被 8 到 12 条水平黑线切开形成条纹日落。下方接透视网格（perspective(320px) rotateX(60deg)），网格线用青色 25%。

### Virtual Grid

**Role:** 虚拟网格（仅在接近时激活）

透视网格铺满区块下缘，默认不透明度 30%、不位移。只有父级 group-hover（或元素进入视口）时才升到 70% 并开始缓慢向前位移（6s linear 循环）。静止状态下网格绝不能有动画——它只在「玩家接近」时激活。

- **States:** group-hover: opacity 70%, forward drift

### Chip Label

**Role:** 霓虹标签

透明底、1px 青描边、8px 圆角、13px/700 全大写 0.2em、padding 4px 10px，文字青色带 0 0 8px 青 60% 发光。hover 时描边转洋红、发光换色。

## Do's and Don'ts

### Do

- 粉紫青霓虹配色
- 橙到粉到紫的日落渐变
- 霓虹必须双向发光（inset 加 outer）
- hover 触发 Arcade Pulse
- 网格只在接近时激活
- 全大写几何科技字体

### Don't

- 不要用明亮白色背景
- 不要做现代简约风
- 不要省略霓虹发光
- 不要用过于正式的字体
- 不要用单向霓虹光
- 不要让网格在静止时移动

## Surfaces

| Level | Name | Value | Purpose |
|---|---|---|---|
| 0 | Deep Violet Base | `#1a0b2e` | 页面底 |
| 1 | Sunset Gradient | `linear-gradient(#f67d50, #ff6ec7, #7b68ee)` | 日落 |
| 2 | Grid Floor | `perspective grid` | 地平线网格 |

## Elevation

- **Multidimensional:** `0 0 15px rgba(255,0,255,0.40), inset 0 0 10px rgba(0,255,255,0.20)`
- **Multidimensional strong:** `0 0 30px rgba(255,0,255,0.70), inset 0 0 20px rgba(0,255,255,0.40)`
- **Text glow:** `0 0 12px rgba(255,0,255,0.70)`

## Imagery

合成器视觉：落日、棕榈剪影、跑车、城市天际线、网格地面、复古科技设备。允许把照片压成粉紫双色调。不使用明亮白底、现代摄影与极简构图。

## Layout

上限 1280px、容器内边距 24px，区块间距 96px。首屏常为居中的大标题压在日落与网格地平线上。允许元素与网格重叠，但文字必须始终在发光之上保持可读。

## Agent Prompt Guide

### Implementation Contract

- 以用户请求中的页面、用户任务和真实内容为依据，只实施指定范围；标明缺失的业务信息，不编造数据或能力。
- 先检查现有项目、技术栈与组件；沿用项目结构、路由和依赖，复用已有组件，不重建未要求的页面或功能。
- 沿用项目断点，调整窄屏与桌面的网格和留白；保留信息层级，避免意外横向溢出。
- 对本次涉及的交互，处理键盘焦点与减少动态效果；补齐适用的禁用、加载、空内容与错误状态。
- 完成后按项目现有脚本检查，仅报告实际运行的测试与视觉检查，并列出未验证项。

QUICK COLOR REFERENCE:

- text: `#ffffff`
- background: `#1a0b2e`
- magenta: `#ff00ff`
- cyan: `#00ffff`
- pink: `#ff6ec7`
- violet: `#7b68ee`

EXAMPLE COMPONENT PROMPTS:

1. 做一个合成波按钮：深紫 #1a0b2e 填充、白字、8px 圆角、1px rgba(255,0,255,0.6) 描边、13px/700 全大写 0.2em 字距、padding 12px 28px、box-shadow 0 0 15px rgba(255,0,255,0.4), inset 0 0 10px rgba(0,255,255,0.2)（双向霓虹）。hover 时两层发光加强到 0 0 30px rgba(255,0,255,0.7), inset 0 0 20px rgba(0,255,255,0.4) 并触发一次脉冲。首屏加一条橙到粉到紫的垂直渐变带与一个被水平黑线切开的圆形落日，下方接 perspective(320px) rotateX(60deg) 的青色网格，仅在 group-hover 时提升不透明度并位移。
