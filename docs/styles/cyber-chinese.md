# 赛博中华风 — 风格参考

> 朱红与金压在霓虹青紫上：灯笼挂在赛博街道。

**Theme:** dark

赛博中华风是两套语言的碰撞：朱红（#d4553a）与金黄（#c9a227）来自传统，霓虹蓝（#00d4ff）与霓虹紫（#a020f0）来自赛博，底是近黑（#0a0a0a）。造型一律直角无圆角，让它显得锐利；霓虹发光绝不可省略，但发光必须与朱红金箔共存而不是取代它们。交互反馈带东方赛博的特质——hover 时一道短促的扫描光带或云纹流光掠过，绝不用弹簧回弹、俏皮抖动或大幅缩放，控件过渡不超过 400ms。

## Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Vermilion | `#d4553a` | `--color-vermilion` | 主色：印章、主按钮与关键强调。传统那一侧的重心。 |
| Gold | `#c9a227` | `--color-gold` | 第二主色：金箔、描边与贵重标记。 |
| Near Black | `#0a0a0a` | `--color-near-black` | 页面底。深到让霓虹与朱红同时发光。 |
| Neon Cyan | `#00d4ff` | `--color-neon-cyan` | 赛博那一侧的主色：扫描光带、数据与链接。 |
| Neon Violet | `#a020f0` | `--color-neon-violet` | 第二霓虹色，用于层叠光晕与云纹流光。 |
| Pale Violet | `#9f9aff` | `--color-pale-violet` | 高光与文字反光，最亮的一站。 |

## Typography

### Noto Serif SC — 标题用粗衬线加宽字距，像匾额；正文同族更细，保证长读。

- **Substitute:** 'Songti SC', Georgia, serif
- **Weights:** 600, 700
- **Sizes:** 16, 20, 26, 34, 46
- **Line height:** 1.2 (display), 1.35 (headings), 1.7 (body)
- **Letter spacing:** 0.04em on display, 0.24em on uppercase labels

### JetBrains Mono — 数据、坐标与状态码，是赛博那一侧的字体。

- **Substitute:** ui-monospace, 'Courier New', monospace
- **Weights:** 400, 700
- **Sizes:** 11, 13, 15
- **Line height:** 1.4 (display), 1.4 (headings), 1.6 (body)
- **Letter spacing:** 0.06em on display, 0.2em on uppercase labels

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|---|---|---|---|---|---|---|
| display | Noto Serif SC | 700 | 46px | 1.2 | 0.04em | `--text-display` |
| heading | Noto Serif SC | 700 | 34px | 1.3 | — | `--text-heading` |
| subheading | Noto Serif SC | 600 | 26px | 1.4 | — | `--text-subheading` |
| body-lg | Noto Serif SC | 600 | 20px | 1.65 | — | `--text-body-lg` |
| body | Noto Serif SC | 600 | 16px | 1.7 | — | `--text-body` |
| label | JetBrains Mono | 400 | 13px | 1.4 | 0.2em | `--text-label` |

## Spacing & Layout

**Base unit:** 4px
**Density:** comfortable

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
- **Section gap:** 64px
- **Card padding:** 24px
- **Element gap:** 16px

## Components

### Lattice Panel

**Role:** 格窗面板（核心组件）

朱红 6% 填充、零圆角、1px 金黄 45% 描边、内边距 24px，双色霓虹外发光（青 16px 加紫 40px）。四角各放一个 12px 的金黄直角角标（像窗棂收头）。hover 时一道 40px 宽、青色 25% 的斜向扫描光带从左掠到右（400ms linear），同时发光 amplify。

- **States:** hover: scan band sweep, glow amplified

### Vermilion Button

**Role:** 主行动按钮

朱红填充、近黑文字、零圆角、1px 金黄 70% 描边，14px/700、字距 0.2em、padding 12px 28px，外发光 0 0 20px 朱红 40%。hover 时描边升到 100% 并加青色扫描光带，发光转青；按下时填充压暗并缩到 0.98。过渡 240ms。

- **Sizes:** padding 12px 28px; label 14px
- **States:** hover: cyan scan, gold border full; active: scale 0.98

### Cloud Motif

**Role:** 云纹流光装饰

用重复的回纹或云纹 path（stroke 1px、金黄 40%），沿区块边缘流动：用 background-position 或 clip-path 上的遮罩从左到右扫过，周期 3 秒、linear。仅用于装饰，单屏不超过两处。

### Seal Stamp

**Role:** 印章标记

32px 见方朱红方块、零圆角、内嵌 20px 近黑衬线单字，外带 0 0 12px 朱红 50% 的发光。边缘做 1px 残缺（mask 切角）。用于标记章节与「已核」。

### Neon Data Row

**Role:** 霓虹数据行

等宽 13px、字距 0.06em，左侧标签用金黄、右侧数值用霓虹青并带文字发光 0 0 8px 青 50%。行高 32px，行间 1px 金黄 15% 分隔。数值必须以静态文本存在。

## Do's and Don'ts

### Do

- 朱红与金黄配霓虹青紫
- 直角无圆角，造型锐利
- 霓虹发光不可省略
- hover 用扫描光带或云纹流光
- 控件过渡不超过 400ms
- 数值用等宽并带文字发光

### Don't

- 不要用明亮白色背景
- 不要用柔和圆润造型
- 不要省略霓虹发光
- 不要用纯西式装饰元素
- 不要用弹簧回弹或俏皮抖动
- 不要用超过 400ms 的控件过渡

## Surfaces

| Level | Name | Value | Purpose |
|---|---|---|---|
| 0 | Near Black | `#0a0a0a` | 页面底 |
| 1 | Panel | `rgba(212,85,58,0.06)` | 面板（朱红调半透明） |
| 2 | Gold Frame | `rgba(201,162,39,0.12)` | 金框区块 |

## Elevation

- **Dual neon:** `0 0 16px rgba(0,212,255,0.45), 0 0 40px rgba(160,32,240,0.30)`
- **Gold rim:** `inset 0 0 0 1px rgba(201,162,39,0.60)`
- **Amplified:** `0 0 24px rgba(0,212,255,0.65), 0 0 64px rgba(160,32,240,0.45)`

## Imagery

东方赛博插画：龙纹与电路混合、霓虹灯笼、飞檐上的广告屏、印章与全息投影。允许把传统纹样（云纹、回纹）叠加在发光层下。不使用明亮白底、柔和插画与纯西式装饰。

## Layout

上限 1280px、容器内边距 16px，面板间距 12px。允许面板以 1px 金线拼接成格窗式大屏。零圆角贯穿全站，控件过渡不超过 400ms。

## Agent Prompt Guide

### Implementation Contract

- 以用户请求中的页面、用户任务和真实内容为依据，只实施指定范围；标明缺失的业务信息，不编造数据或能力。
- 先检查现有项目、技术栈与组件；沿用项目结构、路由和依赖，复用已有组件，不重建未要求的页面或功能。
- 沿用项目断点，调整窄屏与桌面的网格和留白；保留信息层级，避免意外横向溢出。
- 对本次涉及的交互，处理键盘焦点与减少动态效果；补齐适用的禁用、加载、空内容与错误状态。
- 完成后按项目现有脚本检查，仅报告实际运行的测试与视觉检查，并列出未验证项。

QUICK COLOR REFERENCE:

- text: `#f5f0e1`
- background: `#0a0a0a`
- vermilion: `#d4553a`
- gold: `#c9a227`
- cyan: `#00d4ff`
- violet: `#a020f0`

EXAMPLE COMPONENT PROMPTS:

1. 做一个赛博中华风面板：背景 rgba(212,85,58,0.06)、零圆角、1px rgba(201,162,39,0.45) 描边、内边距 24px、box-shadow 0 0 16px rgba(0,212,255,0.45), 0 0 40px rgba(160,32,240,0.3)。标题 34px 粗衬线、字距 0.04em、色 #f5f0e1；标签用 13px 等宽金黄 0.2em。hover 时一道 40px 宽、rgba(0,212,255,0.25) 的斜向光带从左掠到右（400ms linear），发光 amplify 到 24px/64px。主按钮朱红填充、近黑文字、零圆角、1px 金黄描边。页面底色 #0a0a0a。
