# 拟物设计 — 风格参考

> 每个控件都是一件实物：皮革、木头、金属，有厚度也有高光。

**Theme:** light

拟物设计把界面做成实物：面板像皮革或木纹，按钮像金属片，纸张像米色信纸。它的技术核心是「双内阴影加一段渐变」——顶部 inset 0 1px 0 白色 70% 是受光面，底部 inset 0 -1px 0 黑色 12% 是转折暗线，外阴影提供离地高度，再叠一层 3% 的纹理点阵作为材质。它在新拟物与扁平之间走了第三条路：不靠单色，而靠光与材质。代价是每个组件都需要精细调光，粗糙实现会立刻显得廉价。

## Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Leather | `#8b7355` | `--color-leather` | 深色面板与主按钮底，模拟做旧皮革。带细微颗粒纹理。 |
| Wood | `#d4c4a8` | `--color-wood` | 卡片与浅色面板，模拟浅木与纸板。比皮革亮两档。 |
| Metal | `#c0c0c0` | `--color-metal` | 按钮与滑块的金属面，必须配纵向渐变才有反射感。 |
| Paper | `#f5f5dc` | `--color-paper` | 页面与信纸底色，模拟米色书写纸。 |
| Brass | `#c9a227` | `--color-brass` | 金属扣件与主强调，用于图标、刻度与选中状态。 |
| Dark Brown | `#5c4033` | `--color-dark-brown` | 深色文字与压印凹槽，模拟烧灼与刻痕。 |
| Forest | `#2e5a3c` | `--color-forest` | 成功与「已启用」状态，像老式仪表的绿色刻度。 |

## Typography

### Georgia — 标题与带刻度的标签。衬线让文字像被印在材质上而不是浮在屏幕上。

- **Substitute:** 'Times New Roman', 'Songti SC', serif
- **Weights:** 400, 700
- **Sizes:** 13, 15, 17, 22, 30, 40
- **Line height:** 1.15 (display), 1.25 (headings), 1.65 (body)
- **Letter spacing:** 0 on display, 0.1em on uppercase labels

### Verdana — 界面文字与数值。略带方正的无衬线像老设备的面板字。

- **Substitute:** 'Segoe UI', system-ui, sans-serif
- **Weights:** 400, 700
- **Sizes:** 12, 14, 16
- **Line height:** 1.4 (display), 1.4 (headings), 1.6 (body)
- **Letter spacing:** 0 on display, 0.1em on uppercase labels

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|---|---|---|---|---|---|---|
| display | Georgia | 700 | 40px | 1.15 | — | `--text-display` |
| heading | Georgia | 700 | 30px | 1.2 | — | `--text-heading` |
| subheading | Georgia | 400 | 22px | 1.3 | — | `--text-subheading` |
| body-lg | Verdana | 400 | 16px | 1.6 | — | `--text-body-lg` |
| body | Verdana | 400 | 14px | 1.6 | — | `--text-body` |
| label | Verdana | 700 | 12px | 1.4 | 0.1em | `--text-label` |

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
| cards | 12px |
| buttons | 8px |
| inputs | 6px |
| knobs | 999px |

- **Page max-width:** 1080px
- **Section gap:** 64px
- **Card padding:** 24px
- **Element gap:** 16px

## Components

### Metal Button

**Role:** 主行动按钮

纵向金属渐变（#d8d8d8 到 #a8a8a8）、深棕文字、8px 圆角、1px #7a7a7a 描边，阴影为 0 3px 6px 黑 25% 加 inset 0 1px 0 白 85%，字级 14px/700、字距 0.1em、padding 10px 24px。hover 时渐变整体提亮 6%、外阴影加深；按下时渐变反向（上暗下亮）并换成 inset 0 2px 6px 黑 30%。过渡 150ms。

- **Sizes:** padding 10px 24px; label 14px
- **States:** hover: brighter gradient; active: inverted gradient, inset shadow

### Leather Panel

**Role:** 深色面板与工具栏

皮革色填充配 3% 点阵纹理（radial-gradient 的 5px 网格）、12px 圆角、内边距 24px，阴影 0 8px 16px 黑 20% 加顶边白 70% 高光与底边黑 12% 暗线。面板内文字用米色，标签 12px/700、0.1em 字距，像刻上去的。

### Inset Well

**Role:** 输入框与凹槽区域

木色填充、6px 圆角、1px #b8a88c 描边，阴影全部朝内：inset 0 2px 6px 黑 25% 加 inset 0 -1px 0 白 45%，形成凹陷。padding 8px 12px、14px 字。聚焦时内阴影加深到 8px 并加 2px 黄铜外环。

### Brass Knob

**Role:** 滑块与旋钮控件

24px 圆形、镜像径变（linear-gradient 135deg，#e8d48a 到 #9a7a1e）、1px #7a5f14 描边，阴影 0 2px 4px 黑 30% 加 inset 0 1px 1px 白 80% 加 inset 0 -1px 2px 黑 25%。hover 时旋转 8 度；按下时内阴影加深。

### Ribbon Header

**Role:** 页头与分区标题条

深棕填充、底部 3px 黄铜边线、无圆角、内边距 12px 24px，顶部 1px 白 15% 高光。标题 22px 衬线、米色、字距 0.1em，左对齐并带 24px 的图标位。

## Do's and Don'ts

### Do

- 每个控件都要有顶高光与底暗线
- 用材质纹理，但不超过 8% 不透明度
- 凸起用外阴影，凹陷用内阴影
- 金属面必须有纵向渐变
- 文字用衬线，像刻进材质
- 控件间距至少 12px

### Don't

- 不要用纯扁平色块
- 不要省略阴影与高光
- 不要用过简的线条图标
- 不要用现代渐变与玻璃态
- 不要让纹理超过 8%
- 不要把凹陷与凸起的阴影混用

## Surfaces

| Level | Name | Value | Purpose |
|---|---|---|---|
| 0 | Paper | `#f5f5dc` | 页面底 |
| 1 | Wood Panel | `#d4c4a8` | 卡片与面板 |
| 2 | Leather | `#8b7355` | 深色面板与工具栏 |

## Elevation

- **Raised panel:** `0 8px 16px rgba(0,0,0,0.20), inset 0 1px 0 rgba(255,255,255,0.70), inset 0 -1px 0 rgba(0,0,0,0.12)`
- **Recessed well:** `inset 0 2px 6px rgba(0,0,0,0.25), inset 0 -1px 0 rgba(255,255,255,0.45)`
- **Metal button:** `0 3px 6px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.85)`

## Imagery

真实材质照片：皮革纹理、木纹、金属拉丝、装订线。允许把纹理以 3% 到 8% 的不透明度叠在面板上。不使用扁平插画与现代渐变，它们会毁掉材质假设。

## Layout

上限 1080px、容器内边距 24px，区块间距 64px。整体像一台设备的面板：分区用凹槽与凸起代替留白，工具栏可带皮革底，内容区像纸张。控件之间至少 12px，保证阴影不互相污染。

## Agent Prompt Guide

### Implementation Contract

- 以用户请求中的页面、用户任务和真实内容为依据，只实施指定范围；标明缺失的业务信息，不编造数据或能力。
- 先检查现有项目、技术栈与组件；沿用项目结构、路由和依赖，复用已有组件，不重建未要求的页面或功能。
- 沿用项目断点，调整窄屏与桌面的网格和留白；保留信息层级，避免意外横向溢出。
- 对本次涉及的交互，处理键盘焦点与减少动态效果；补齐适用的禁用、加载、空内容与错误状态。
- 完成后按项目现有脚本检查，仅报告实际运行的测试与视觉检查，并列出未验证项。

QUICK COLOR REFERENCE:

- text: `#5c4033`
- background: `#f5f5dc`
- panel: `#d4c4a8`
- dark: `#8b7355`
- accent: `#c9a227`
- border: `#b8a88c`

EXAMPLE COMPONENT PROMPTS:

1. 做一个拟物金属按钮：background linear-gradient(to bottom, #d8d8d8, #a8a8a8)、文字 #5c4033、8px 圆角、1px #7a7a7a 边框、padding 10px 24px、box-shadow 0 3px 6px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.85)。hover 时渐变提亮 6%；active 时渐变反向并换成 inset 0 2px 6px rgba(0,0,0,0.3)。页面底色 #f5f5dc。
