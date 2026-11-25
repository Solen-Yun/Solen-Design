# 赛博和风 — 风格参考

> 青海波与电路同源，金缮的裂纹成了发光的边框。

**Theme:** dark

赛博和风让传统日本纹样被技术「黑」进来：青海波（seigaiha）与电路走线合流，麻叶纹（asanoha）作网格，障子（shoji）格栅作卡片边框，鸟居作导航框架，金缮（kintsugi）的金色裂纹作描边与强调。底是深靛（#080814），主色是藏青（#1e3a5f），辅以朱红（#c41e3a）、金（#c9a227）与电路青（#38bdf8）。交互极克制——hover 只上浮 1 到 2px 并让光晕增强，绝不夸张。

## Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Deep Indigo | `#080814` | `--color-deep-indigo` | 页面底。深到让金线与电路青同时发光。 |
| Navy | `#1e3a5f` | `--color-navy` | 主色：面板、按钮与障子格栅。 |
| Vermilion | `#c41e3a` | `--color-vermilion` | 鸟居与印章的红，是画面里唯一的暖重音。 |
| Kintsugi Gold | `#c9a227` | `--color-kintsugi-gold` | 金缮裂纹与描边，让「修补」成为装饰。 |
| Circuit Cyan | `#38bdf8` | `--color-circuit-cyan` | 走线、hover 光晕与数据。技术那一侧的颜色。 |
| Ochre | `#7c3e00` | `--color-ochre` | 压在金上的文字色，也是旧木的暗调。 |

## Typography

### Inter — 无衬线，标题加 0.04em 字距，小标签 11px 全大写 0.18em。

- **Substitute:** 'Hiragino Sans', 'PingFang SC', system-ui, sans-serif
- **Weights:** 400, 600, 700
- **Sizes:** 11, 13, 16, 22, 30, 42
- **Line height:** 1.2 (display), 1.3 (headings), 1.65 (body)
- **Letter spacing:** 0.04em on display, 0.18em on uppercase labels

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|---|---|---|---|---|---|---|
| display | — | 700 | 42px | 1.2 | 0.04em | `--text-display` |
| heading | — | 700 | 30px | 1.3 | 0.04em | `--text-heading` |
| subheading | — | 600 | 22px | 1.4 | — | `--text-subheading` |
| body-lg | — | 400 | 16px | 1.6 | — | `--text-body-lg` |
| body | — | 400 | 13px | 1.65 | — | `--text-body` |
| label | — | 600 | 11px | 1.45 | 0.18em | `--text-label` |

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
| cards | 0 |
| buttons | 0 |
| inputs | 0 |
| seals | 4px |

- **Page max-width:** 1240px
- **Section gap:** 96px
- **Card padding:** 32px
- **Element gap:** 16px

## Components

### Shoji Card

**Role:** 障子格栅卡片（核心组件）

深靛填充、零圆角、1px 藏青 30% 描边、内边距 32px。内部用 1px 藏青 20% 的线画出障子格栅（横 2 条、竖 2 到 3 条，等分），格栅线穿过内容但 opacity 低到不干扰阅读。左上或右下叠一条 2px 的金缮裂纹（折线 path，带 0 0 12px 金 40% 的发光）。hover 时上浮 2px、光晕转电路青加金双色。

- **States:** hover: lift 2px, dual glow

### Torii Nav

**Role:** 鸟居导航框

页面顶部一条横梁（高 12px、朱红填充、两端各外伸 24px）加两根立柱（各 8px 宽、从横梁垂到内容区顶部），形成鸟居的轮廓。导航项放在横梁下方。鸟居本身就是容器边界，绝不与其它边框重复。

### Kintsugi Border

**Role:** 金缮裂纹边框

用 SVG 折线沿着容器的一边（或四边）画一条不规则的裂纹，2px 金描边、带 0 0 12px 金 40% 发光，转折处角度 100 到 140 度。它替代普通描边，并暗示这件东西是被修好的。同一屏最多三处。

### Seigaiha Ground

**Role:** 青海波底纹

用重复的同心半圆（radial-gradient 或 SVG pattern）画青海波，单元 32px、线宽 1px、色电路青 10% 或金 8%。它可与电路走线叠加（走线用直线折角 90 度），形成「传统纹样被电路穿过」的效果。

### Execute Button

**Role:** 行动按钮

藏青填充、银灰文字、零圆角、1px 藏青 60% 描边、13px/600、字距 0.18em、padding 12px 24px，外发光 0 0 12px 藏青 40%。hover 时上浮 1px、描边转电路青 60%、光晕转电路青加金；按下时下沉 1px 且光晕收回。过渡 250ms ease-out。

- **Sizes:** padding 12px 24px; label 13px
- **States:** hover: lift 1px, cyan glow; active: sink 1px

## Do's and Don'ts

### Do

- 青海波与电路合流
- 障子格栅作卡片结构
- 金缮裂纹作边框与强调
- 鸟居作导航框架，只一次
- hover 只上浮 1 到 2px
- 零圆角，全站直角

### Don't

- 不要用明亮或高饱和图像
- 不要用圆角
- 不要让纹样抢过内容
- 不要重复鸟居框架
- 不要用夸张的位移动效
- 不要在一屏放三处以上金缮

## Surfaces

| Level | Name | Value | Purpose |
|---|---|---|---|
| 0 | Deep Indigo | `#080814` | 页面底 |
| 1 | Navy Panel | `rgba(30,58,95,0.30)` | 面板 |
| 2 | Circuit Trace | `rgba(56,189,248,0.20)` | 走线层 |

## Elevation

- **Navy glow:** `0 0 15px rgba(30,58,95,0.20)`
- **Dual amp:** `0 0 24px rgba(56,189,248,0.35), 0 0 36px rgba(201,162,39,0.16)`
- **Pressed:** `0 0 12px rgba(56,189,248,0.28)`

## Imagery

和风影像与纹样：障子门、鸟居、枯山水、金缮陶器、青海波织物。必须暗调、可叠电路纹理。允许把照片处理成靛蓝双色调。不使用明亮摄影、卡通插画与高饱和图像。

## Layout

上限 1240px、容器内边距 24px，区块间距 96px。零圆角贯穿全站。允许面板以 1px 藏青线拼接，形成障子式的格栅分区。鸟居只在页头出现一次。

## Agent Prompt Guide

### Implementation Contract

- 以用户请求中的页面、用户任务和真实内容为依据，只实施指定范围；标明缺失的业务信息，不编造数据或能力。
- 先检查现有项目、技术栈与组件；沿用项目结构、路由和依赖，复用已有组件，不重建未要求的页面或功能。
- 沿用项目断点，调整窄屏与桌面的网格和留白；保留信息层级，避免意外横向溢出。
- 对本次涉及的交互，处理键盘焦点与减少动态效果；补齐适用的禁用、加载、空内容与错误状态。
- 完成后按项目现有脚本检查，仅报告实际运行的测试与视觉检查，并列出未验证项。

QUICK COLOR REFERENCE:

- text: `#e2e8f0`
- background: `#080814`
- navy: `#1e3a5f`
- vermilion: `#c41e3a`
- gold: `#c9a227`
- cyan: `#38bdf8`

EXAMPLE COMPONENT PROMPTS:

1. 做一个赛博和风卡片：深靛 #080814 填充、零圆角、1px rgba(30,58,95,0.3) 描边、内边距 32px、box-shadow 0 0 15px rgba(30,58,95,0.2)。内部用 1px rgba(30,58,95,0.2) 画障子格栅（横 2 条竖 3 条等分）。右下叠一条 2px 金 #c9a227 的折线裂纹（带 0 0 12px rgba(201,162,39,0.4) 发光）。背景可叠 32px 单元的青海波（1px 电路青 #38bdf8 10%）与 90 度折角的电路走线。hover 时上浮 2px、光晕转 0 0 24px rgba(56,189,248,0.35), 0 0 36px rgba(201,162,39,0.16)。页面底色 #080814。
