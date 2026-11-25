# 蒸汽朋克 — 风格参考

> 黄铜、铜管、铆钉与齿轮：一台还在冒气的维多利亚机器。

**Theme:** dark

蒸汽朋克来自维多利亚时代的工业机械：深棕底（#3d2b1f 或更深的 #2a1f15）上装黄铜（#b5a642）与铜（#b87333）的金属件，文字用奶油色或黄铜色，衬线字体承担全部排版，边框是铜色半透明细线并配铆钉圆点，按钮用黄铜上下渐变模拟受光的金属面，黄铜光泽靠 0 0 15px 的暖色外发光表现。它禁止纯白背景、禁止现代极简、禁止霓虹与荧光、禁止扁平无质感。

## Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Brass | `#b5a642` | `--color-brass` | 主金属色：按钮、描边与文字高光。 |
| Deep Brown | `#3d2b1f` | `--color-deep-brown` | 页面底与面板。皮革与旧木的颜色。 |
| Copper | `#b87333` | `--color-copper` | 第二金属色：管道、铆钉与边框。 |
| Cream | `#f5f0e1` | `--color-cream` | 主要文字与标签纸色。 |
| Iron | `#4a4a4a` | `--color-iron` | 次级金属件与压印槽。 |
| Verdigris | `#5a9025` | `--color-verdigris` | 铜氧化的绿，用于「已使用」的痕迹与状态。 |

## Typography

### Playfair Display — 全站衬线，标题加宽字距像铭牌，正文行高 1.7。

- **Substitute:** Georgia, 'Songti SC', serif
- **Weights:** 400, 700
- **Sizes:** 15, 18, 22, 30, 40, 54
- **Line height:** 1.15 (display), 1.25 (headings), 1.7 (body)
- **Letter spacing:** 0.02em on display, 0.16em on uppercase labels

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|---|---|---|---|---|---|---|
| display | — | 700 | 54px | 1.15 | 0.02em | `--text-display` |
| heading | — | 700 | 40px | 1.2 | — | `--text-heading` |
| subheading | — | 400 | 30px | 1.3 | — | `--text-subheading` |
| body-lg | — | 400 | 22px | 1.65 | — | `--text-body-lg` |
| body | — | 400 | 18px | 1.7 | — | `--text-body` |
| label | — | 700 | 15px | 1.5 | 0.16em | `--text-label` |

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
| gauges | 999px |

- **Page max-width:** 1080px
- **Section gap:** 112px
- **Card padding:** 32px
- **Element gap:** 24px

## Components

### Brass Button

**Role:** 行动按钮

黄铜上下渐变（#c9b84e 到 #8a7d32）、深棕文字、4px 圆角、1px 铜色 50% 描边、18px/700、字距 0.08em、padding 14px 32px，外发光 0 0 15px 黄铜 30% 加 inset 0 1px 0 白 30% 的顶部高光。hover 时发光扩到 30px、渐变整体提亮；按下时渐变反向并加深内阴影。过渡 200ms。

- **Sizes:** padding 14px 32px; label 18px
- **States:** hover: glow 30px, brighter; active: inverted gradient

### Riveted Panel

**Role:** 铆钉面板（核心组件）

深棕填充、4px 圆角、1px 铜色 50% 描边、内边距 32px，边缘每隔 24px 放一个 6px 的铜色圆点（铆钉），四角各一个 8px 的铆钉。外发光 0 0 15px 黄铜 30%。耳钉必须等距——手工感不等于随意。

### Gear Ornament

**Role:** 齿轮装饰

一个 48 到 120px 的齿轮（12 到 20 个齿，用 clip-path polygon 或 SVG），填黄铜或铜，中心挖一个 20% 直径的孔，缓慢旋转（20s linear 无限）。可两三个咬合排列。单屏不超过三处，旋转必须慢，快转会变成游乐场。

### Pressure Gauge

**Role:** 压力表盘读数

96 到 160px 的圆形表盘：黄铜描边 3px、奶油色盘面、12 个刻度（每 30 度一个，长 8px）、一根铜色指针按数值旋转、中心一个 8px 铆钉。数值用衬线 18px 放在表盘下方。

### Pipe Divider

**Role:** 管道分隔

一条 8px 高的铜色横条，两端各一个 12px 的圆形法兰（带 4 个铆钉），中间可加一个 90 度弯头。它替代普通分隔线，用来表达「这是同一套管路」。

## Do's and Don'ts

### Do

- 深棕底配黄铜与铜
- 衬线字体，宽字距像铭牌
- 面板边缘必须有铆钉
- 按钮用黄铜渐变显受光
- 黄铜光泽用暖色外发光
- 齿轮转动 20s 起，很慢

### Don't

- 不要用纯白背景
- 不要做现代极简
- 不要用霓虹或荧光色
- 不要用扁平无质感的设计
- 不要让整屏都是黄铜
- 不要让齿轮转快

## Surfaces

| Level | Name | Value | Purpose |
|---|---|---|---|
| 0 | Dark Brown | `#2a1f15` | 页面底 |
| 1 | Deep Brown | `#3d2b1f` | 面板 |
| 2 | Brass Plate | `#b5a642` | 金属件 |

## Elevation

- **Brass glow:** `0 0 15px rgba(181,166,66,0.30)`
- **Brass glow strong:** `0 0 30px rgba(181,166,66,0.50)`
- **Metal drop:** `0 6px 16px rgba(0,0,0,0.45)`

## Imagery

工业摄影与机械插画：齿轮、管道、压力表、飞艇、怀表。必须有金属反光与暖调。允许把照片处理成棕褐单色。不使用现代城市、极简产品与冷调摄影。

## Layout

上限 1080px、容器内边距 24px，区块间距 112px。允许面板层叠与铆钉边框。整页保持暗棕，金属件只在需要被注意的地方出现，绝不整屏都是黄铜。

## Agent Prompt Guide

### Implementation Contract

- 以用户请求中的页面、用户任务和真实内容为依据，只实施指定范围；标明缺失的业务信息，不编造数据或能力。
- 先检查现有项目、技术栈与组件；沿用项目结构、路由和依赖，复用已有组件，不重建未要求的页面或功能。
- 沿用项目断点，调整窄屏与桌面的网格和留白；保留信息层级，避免意外横向溢出。
- 对本次涉及的交互，处理键盘焦点与减少动态效果；补齐适用的禁用、加载、空内容与错误状态。
- 完成后按项目现有脚本检查，仅报告实际运行的测试与视觉检查，并列出未验证项。

QUICK COLOR REFERENCE:

- text: `#f5f0e1`
- background: `#2a1f15`
- panel: `#3d2b1f`
- brass: `#b5a642`
- copper: `#b87333`
- cream: `#f5f0e1`

EXAMPLE COMPONENT PROMPTS:

1. 做一个蒸汽朋克按钮：background linear-gradient(to bottom, #c9b84e, #8a7d32)、深棕文字 #2a1f15、4px 圆角、1px rgba(184,115,51,0.5) 描边、18px/700 字距 0.08em、padding 14px 32px、box-shadow 0 0 15px rgba(181,166,66,0.3), inset 0 1px 0 rgba(255,255,255,0.3)。hover 时发光扩到 0 0 30px rgba(181,166,66,0.5)。页面底 #2a1f15，面板 #3d2b1f 带 1px 铜色描边与每 24px 一个 6px 铜色铆钉。标题用 Playfair Display 40px/700、字距 0.16em、色 #f5f0e1。
