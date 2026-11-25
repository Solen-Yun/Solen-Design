# Outrun 复古未来 — 风格参考

> 洋红与青的落日、椰树剪影、向地平线冲刺的透视网格。

**Theme:** dark

Outrun 是 80 年代赛车与合成器美学：洋红（#ff006e）与紫（#a020f0）的霓虹、青（#00d4ff）的天空、近黑底、透视网格地面、椰树与跑车剪影。它有两条必须遵守的动效规则——第一，发光必须是双色的（洋红加青），单色发光在它看来是「不够 Outrun」；第二，网格背景绝不能静止，必须用 background-position 的位移制造向地平线冲刺的速度幻觉，缺了它整个风格就失去核心。

## Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Magenta | `#ff006e` | `--color-magenta` | 第一霓虹色：主按钮、地平线与关键强调。 |
| Violet | `#a020f0` | `--color-violet` | 第二霓虹色，用于层叠光晕与天空渐变。 |
| Neon Cyan | `#00d4ff` | `--color-cyan` | 天空、网格线与数据。与洋红构成色散关系。 |
| Near Black | `#0a0a0a` | `--color-near-black` | 页面底与剪影。让霓虹有地方发光。 |
| Sunset Orange | `#ff6b35` | `--color-sunset-orange` | 落日与暖侧高光，用于渐变的中段。 |
| Pale Violet | `#9f9aff` | `--color-pale-violet` | 文字反光与最高光，最亮的一站。 |

## Typography

### Inter — 粗无衬线，标题 900 字重并有紧字距；小标签全大写加 0.22em 宽字距，是 80 年代的做法。

- **Substitute:** 'Arial Black', Helvetica, sans-serif
- **Weights:** 700, 900
- **Sizes:** 14, 18, 24, 34, 48, 68
- **Line height:** 1.05 (display), 1.15 (headings), 1.55 (body)
- **Letter spacing:** -0.02em on display, 0.22em on uppercase labels

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|---|---|---|---|---|---|---|
| display | — | 900 | 68px | 1.05 | -0.02em | `--text-display` |
| heading | — | 900 | 48px | 1.1 | -0.02em | `--text-heading` |
| subheading | — | 700 | 34px | 1.2 | — | `--text-subheading` |
| body-lg | — | 700 | 18px | 1.5 | — | `--text-body-lg` |
| body | — | 700 | 14px | 1.55 | — | `--text-body` |
| label | — | 700 | 14px | 1.4 | 0.22em | `--text-label` |

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
| cards | 4px |
| buttons | 4px |
| inputs | 4px |

- **Page max-width:** 1240px
- **Section gap:** 96px
- **Card padding:** 24px
- **Element gap:** 16px

## Components

### Outrun Button

**Role:** 行动按钮

洋红填充、白字、4px 圆角、无描边、14px/700 全大写 0.22em、padding 12px 28px，静态带 0 0 12px 洋红。hover 时叠加双霓虹光晕 0 0 20px 洋红 与 0 0 40px 青（Dual Neon Glow），并上浮 2px；按下时缩到 0.97 且光晕收到 8px。过渡 200ms。

- **Sizes:** padding 12px 28px; label 14px
- **States:** hover: dual neon glow, lift 2px; active: scale 0.97

### Chrome Card

**Role:** 内容卡

近黑 80% 填充、4px 圆角、1px 洋红 35% 描边、内边距 24px，外发光 0 0 20px 洋红 40%。标题用洋红到淡紫的横向渐变文字（background-clip: text），正文白 75%。hover 时双霓虹光晕启动，过渡 300ms。

### Perspective Grid

**Role:** 透视网格地面（签名组件）

一个 transform: perspective(320px) rotateX(62deg) 的平面，铺 40px 间隔的青 20% 网格线。必须用 background-position 的 Y 轴位移让它向观察者冲来（周期 2s、linear、无限循环），完全静止就失去了风格核心。prefers-reduced-motion 时静止。

- **Sizes:** cell 40px; loop 2s linear

### Sunset Band

**Role:** 落日条带

高 160 到 240px 的横向色带，从近黑经紫到洋红再到落日橙，中间放一个 120px 的圆形落日（洋红到橙的径向渐变）并叠 8 条水平黑线把它切开（模拟 80 年代落日条纹）。无边框无圆角。

### Palm Silhouette

**Role:** 椰树与跑车剪影

纯黑剪影（单色 path），放在地平线两侧，高度 120 到 280px，边缘可以有 1px 的洋红描边作为霓虹轮廓。纯装饰，不承载交互。

## Do's and Don'ts

### Do

- 洋红、紫、青三色霓虹
- 发光必须双色（洋红加青）
- 透视网格必须持续移动
- 粗无衬线加宽字距标签
- 近黑底，不用亮白
- 落日条带带水平切纹

### Don't

- 不要用明亮白色背景
- 不要做现代简约风
- 不要省略霓虹发光
- 不要用柔和低饱和配色
- 不要只用单色发光
- 不要让网格背景完全静止

## Surfaces

| Level | Name | Value | Purpose |
|---|---|---|---|
| 0 | Near Black | `#0a0a0a` | 页面底 |
| 1 | Sky Gradient | `linear-gradient(#0a0a0a, #a020f0, #ff006e)` | 天空 |
| 2 | Grid Floor | `perspective grid` | 透视地面 |

## Elevation

- **Dual neon:** `0 0 20px #ff006e, 0 0 40px #00d4ff`
- **Dual neon strong:** `0 0 28px #ff006e, 0 0 60px #00d4ff`
- **Text glow:** `0 0 10px rgba(255,0,110,0.70)`

## Imagery

80 年代合成器视觉：落日、椰树、跑车、城市天际线、网格地面。允许把照片处理成双色调剪影。不使用明亮白底、现代摄影与柔和渐变。

## Layout

上限 1240px、容器内边距 24px，区块间距 96px。首屏常为透视网格地面加落日加居中的大标题。允许元素与网格重叠，但文字必须始终在光晕之上保持可读。

## Agent Prompt Guide

### Implementation Contract

- 以用户请求中的页面、用户任务和真实内容为依据，只实施指定范围；标明缺失的业务信息，不编造数据或能力。
- 先检查现有项目、技术栈与组件；沿用项目结构、路由和依赖，复用已有组件，不重建未要求的页面或功能。
- 沿用项目断点，调整窄屏与桌面的网格和留白；保留信息层级，避免意外横向溢出。
- 对本次涉及的交互，处理键盘焦点与减少动态效果；补齐适用的禁用、加载、空内容与错误状态。
- 完成后按项目现有脚本检查，仅报告实际运行的测试与视觉检查，并列出未验证项。

QUICK COLOR REFERENCE:

- text: `#ffffff`
- background: `#0a0a0a`
- magenta: `#ff006e`
- violet: `#a020f0`
- cyan: `#00d4ff`
- orange: `#ff6b35`

EXAMPLE COMPONENT PROMPTS:

1. 做一个 Outrun 风格按钮：背景 #ff006e、白字、4px 圆角、14px/700 全大写 0.22em 字距、padding 12px 28px、静态 box-shadow 0 0 12px #ff006e。hover 时叠加双霓虹 0 0 20px #ff006e, 0 0 40px #00d4ff 并 translateY(-2px)；active 时 scale(0.97)、光晕收到 8px，transition 200ms。首屏加一个 perspective(320px) rotateX(62deg) 的网格地面（40px 间隔、1px #00d4ff 20%），用 background-position 每 2s linear 循环位移制造冲刺感。页面底色 #0a0a0a。
