# 千禧风格 — 风格参考

> 铬金属、透明塑料、彩虹渐变：一个对未来过度乐观的界面。

**Theme:** light

千禧风格来自 1999 到 2003 年的数码美学：一切都要亮、要反光、要像刚从包装盒里拆出来。技术上靠三件事模拟——铬金属用多段线性渐变做出镜面反射，透明塑料用半透明白底加 1px 亮边和顶部高光，气泡用径向渐变加内高光做出球体感。颜色是高饱和的粉、青、品红与天蓝，常常叠在银灰底上。圆角极大（胶囊与球体），排版偏几何无衬线加宽字距，模拟当年的产品名。

## Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Chrome | `#c0c0c0` | `--color-chrome` | 金属面板与按钮底。必须叠多段渐变才有镜面感，单色会变成灰。 |
| Plastic White | `rgba(255,255,255,0.55)` | `--color-plastic` | 透明塑料外壳填充，配 1px 亮边与顶部高光。 |
| Bubblegum | `#ff69b4` | `--color-bubblegum` | 主强调与气泡填充，是千禧审美最典型的颜色。 |
| Electric Cyan | `#00ffff` | `--color-cyan` | 高光、边缘光与数据，与粉形成对比。 |
| Magenta | `#ff00ff` | `--color-magenta` | 彩虹渐变的中段，用于按钮与边框。 |
| Sky | `#87ceeb` | `--color-sky` | 渐变起点与背景，代表那个年代的「科技蓝」。 |

## Typography

### Eurostile — 标题与产品名用的几何无衬线，宽字距、全大写。字形的方与圆是那个年代的签名。

- **Substitute:** 'Trebuchet MS', 'Arial Black', sans-serif
- **Weights:** 400, 700
- **Sizes:** 12, 14, 18, 24, 32, 44
- **Line height:** 1.1 (display), 1.2 (headings), 1.55 (body)
- **Letter spacing:** 0.04em on display, 0.14em on uppercase labels

### Verdana — 正文与说明。选 Verdana 是因为它在 1024×768 时代最常出现。

- **Substitute:** 'Segoe UI', system-ui, sans-serif
- **Weights:** 400, 700
- **Sizes:** 12, 13, 15
- **Line height:** 1.4 (display), 1.4 (headings), 1.55 (body)
- **Letter spacing:** 0 on display, 0.14em on uppercase labels

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|---|---|---|---|---|---|---|
| display | Eurostile | 700 | 44px | 1.1 | 0.04em | `--text-display` |
| heading | Eurostile | 700 | 32px | 1.15 | — | `--text-heading` |
| subheading | Eurostile | 400 | 24px | 1.25 | — | `--text-subheading` |
| body-lg | Verdana | 400 | 15px | 1.55 | — | `--text-body-lg` |
| body | Verdana | 400 | 13px | 1.55 | — | `--text-body` |
| label | Eurostile | 700 | 12px | 1.4 | 0.14em | `--text-label` |

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
| cards | 24px |
| buttons | 999px |
| inputs | 24px |
| bubbles | 999px |

- **Page max-width:** 1120px
- **Section gap:** 80px
- **Card padding:** 24px
- **Element gap:** 16px

## Components

### Chrome Button

**Role:** 主行动按钮

999px 全圆角、多段铬渐变（#f5f5f5 → #c8c8c8 → #9e9e9e → #e6e6e6）、深灰文字、1px #8a8a8a 描边，阴影 0 4px 10px 深蓝 20% 加 inset 0 1px 0 白 95% 与 inset 0 -1px 0 黑 15%。14px/700、0.1em 字距、padding 10px 28px。hover 时渐变整体上移（模拟光源变化）；按下时渐变反向并压暗。过渡 150ms。

- **States:** hover: gradient shifts; active: inverted, darker

### Plastic Card

**Role:** 内容卡与产品卡

55% 白填充、24px 圆角、1px 白 80% 描边、内边距 24px，阴影 0 8px 24px 深蓝 18% 加 inset 0 1px 0 白 90%。hover 时填充升到 70%、阴影扩到 32px。卡片右上角可放一个 96px 的彩虹气泡（径向渐变 + 内高光）。

### Bubble Element

**Role:** 装饰气泡与图标底

全圆角球体，径向渐变从左上白 80% 过渡到主色的 100%，再叠一层 inset -8px -8px 16px 的深色内阴影与 inset 8px 8px 16px 的白色内高光，形成玻璃球质感。尺寸 48px 到 160px，可浮动在卡片外。

### Rainbow Border

**Role:** 高亮边框与选中态

用 2px 的 conic 或线性彩虹渐变（天蓝→青→品红→粉→天蓝）作为边框，背景保持白色。实现上用 padding 1px 的渐变层加内层白底覆盖。只允许出现在一个主行动上。

### Pill Input

**Role:** 搜索与表单输入

白 70% 填充、999px 全圆角、1px #b8d8e8 描边、padding 10px 20px、13px 字。聚焦时描边转电子青并加 0 0 0 3px 青色 30% 外环，同时叠一层顶部白色高光。

## Do's and Don'ts

### Do

- 铬金属用多段渐变，单色会变灰
- 透明塑料必须有亮边与顶部高光
- 气泡用径向渐变加双层内阴影
- 圆角大：胶囊与球体
- 彩虹渐变只给一个主行动
- 全大写加宽字距的产品名

### Don't

- 不要用哑光纯色面板
- 不要让铬金属只有单色
- 不要把彩虹渐变用在多处
- 不要用小圆角
- 不要用沉静或极简的语言
- 不要让气泡遮挡正文

## Surfaces

| Level | Name | Value | Purpose |
|---|---|---|---|
| 0 | Sky Gradient | `linear-gradient(#dff4ff, #ffffff)` | 页面底 |
| 1 | Plastic | `rgba(255,255,255,0.55)` | 面板与卡片外壳 |
| 2 | Chrome | `linear-gradient(#f0f0f0, #b8b8b8, #e8e8e8)` | 金属条与按钮 |

## Elevation

- **Plastic shell:** `0 8px 24px rgba(0,80,140,0.18), inset 0 1px 0 rgba(255,255,255,0.90)`
- **Bubble:** `inset -8px -8px 16px rgba(255,105,180,0.45), inset 8px 8px 16px rgba(255,255,255,0.70)`
- **Chrome lip:** `inset 0 1px 0 rgba(255,255,255,0.95), inset 0 -1px 0 rgba(0,0,0,0.15)`

## Imagery

铬金属、透明塑料、彩色气泡、星芒与光线。允许把产品图放进透明塑料壳里。不使用哑光材质、极简摄影与任何沉静的图形。

## Layout

上限 1120px、容器内边距 24px，区块间距 80px。允许元素大范围重叠与浮动，气泡可以溢出容器。首屏常见为居中标题加左右各一个大气泡。整体密度中等，但视觉元素很多。

## Agent Prompt Guide

### Implementation Contract

- 以用户请求中的页面、用户任务和真实内容为依据，只实施指定范围；标明缺失的业务信息，不编造数据或能力。
- 先检查现有项目、技术栈与组件；沿用项目结构、路由和依赖，复用已有组件，不重建未要求的页面或功能。
- 沿用项目断点，调整窄屏与桌面的网格和留白；保留信息层级，避免意外横向溢出。
- 对本次涉及的交互，处理键盘焦点与减少动态效果；补齐适用的禁用、加载、空内容与错误状态。
- 完成后按项目现有脚本检查，仅报告实际运行的测试与视觉检查，并列出未验证项。

QUICK COLOR REFERENCE:

- text: `#3a3a4a`
- background: `#dff4ff`
- chrome: `#c0c0c0`
- pink: `#ff69b4`
- cyan: `#00ffff`
- magenta: `#ff00ff`

EXAMPLE COMPONENT PROMPTS:

1. 做一个月 Y2K 铬金属按钮：border-radius 999px、background linear-gradient(to bottom, #f5f5f5, #c8c8c8, #9e9e9e, #e6e6e6)、1px #8a8a8a 边框、文字 #3a3a4a 700、0.1em 字距、padding 10px 28px、box-shadow 0 4px 10px rgba(0,80,140,0.2), inset 0 1px 0 rgba(255,255,255,0.95), inset 0 -1px 0 rgba(0,0,0,0.15)。页面底色用 linear-gradient(#dff4ff, #ffffff)。
