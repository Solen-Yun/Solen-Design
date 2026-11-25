# 极繁主义 — 风格参考

> 多就是多：撞色、双层边框、多层阴影、图案叠图案。

**Theme:** dark

极繁主义是对极简的正面反抗：深紫底（#1a0a2e）上铺满高饱和撞色（玫红 #d4145a、金黄 #ffbe0b、蓝 #3a86ff、紫 #8338ec、薄荷 #06d6a0），边框用 border-double 或虚线粗边，阴影是多层错位的实色（4px 金黄加 8px 蓝），背景可叠对角渐变，标题用 6xl 以上的全大写加宽字距，元素允许 rotate 与 skew。它禁止灰度中性色作主色——灰在极繁里等于缺席。唯一的克制是「每一层都必须可见且不互相糊掉」。

## Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Rose | `#d4145a` | `--color-rose` | 第一撞色：主区块与最抢眼的标题。 |
| Deep Violet Base | `#1a0a2e` | `--color-deep-violet` | 页面底。深到能让五支撞色同时跳出来。 |
| Gold | `#ffbe0b` | `--color-gold` | 第一层阴影与高亮，是撞色里最亮的一支。 |
| Blue | `#3a86ff` | `--color-blue` | 第二层阴影与冷侧色块。 |
| Violet | `#8338ec` | `--color-violet` | 渐变的中间站与第三撞色。 |
| Mint | `#06d6a0` | `--color-mint` | 第四撞色与成功状态。 |

## Typography

### Inter — 粗无衬线，标题 6xl 以上、全大写、字距 0.24em。大与小之间的落差本身是装饰。

- **Substitute:** 'Arial Black', Helvetica, sans-serif
- **Weights:** 700, 900
- **Sizes:** 14, 20, 28, 40, 60, 88
- **Line height:** 0.95 (display), 1.05 (headings), 1.5 (body)
- **Letter spacing:** -0.02em on display, 0.24em on uppercase labels

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|---|---|---|---|---|---|---|
| display | — | 900 | 88px | 0.95 | -0.02em | `--text-display` |
| heading | — | 900 | 60px | 1 | -0.02em | `--text-heading` |
| subheading | — | 700 | 40px | 1.1 | — | `--text-subheading` |
| body-lg | — | 700 | 28px | 1.35 | — | `--text-body-lg` |
| body | — | 700 | 20px | 1.5 | — | `--text-body` |
| label | — | 900 | 14px | 1.4 | 0.24em | `--text-label` |

## Spacing & Layout

**Base unit:** 8px
**Density:** compact

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
| stickers | 999px |

- **Page max-width:** 1280px
- **Section gap:** 64px
- **Card padding:** 28px
- **Element gap:** 16px

## Components

### Layered Panel

**Role:** 多层面板（核心组件）

撞色填充、零圆角、4px 金与蓝的双层描边（border-double 或两层 box-shadow inset）、内边距 28px，外阴影 4px 金黄加 8px 蓝。整体 rotate(-1deg)。内部再叠一层对角渐变（玫红→紫→蓝，不透明度 25%）与一层图案（点或斜线，不透明度 10%）。hover 时阴影扩到三层（加 12px 紫）。

- **States:** hover: third shadow layer

### Stacked Button

**Role:** 行动按钮

玫红填充、金黄文字、零圆角、3px 虚线金黄描边、20px/900 全大写、字距 0.24em、padding 14px 32px，外阴影 4px 金黄加 8px 蓝。hover 时填充硬切到紫、阴影扩到 12px；按下时位移 8px 8px 且阴影收到 4px。过渡 120ms linear。

- **Sizes:** padding 14px 32px; label 20px
- **States:** hover: violet fill, shadow 12px; active: translate 8px

### Pattern Overlay

**Role:** 图案叠层

用 repeating-linear-gradient（45 度斜线，8px 间隔）或 radial-gradient（6px 点阵）叠在区块上，颜色取一支撞色、不透明度 8% 到 12%。图案层永远不承载内容，它的职责是让平面不平。

### Sticker Badge

**Role:** 贴纸徽章

48 到 72px 的全圆或星形，填一支撞色、2px 金黄描边、旋转 -8 到 8 度，压在卡片边缘并跨出 12px。里面放 11px 全大写的两行字（如「NEW / 2026」）。单屏 3 到 5 个。

### Mixed Type Block

**Role:** 混合字体块

同一区块内故意混用尺寸与朝向：88px 的标题、28px 的副标、14px 的标签，各自带不同的旋转（-3、0、+2 度）与不同底色条。文字不是被排版，而是被贴上墙。

## Do's and Don'ts

### Do

- 五支高饱和撞色并用
- 双层或虚线粗边框
- 多层错位实色阴影
- 图案叠图案
- 标题 6xl 以上全大写
- 允许 rotate 与 skew

### Don't

- 不要用灰度中性色作主色
- 不要让层与层糊在一起
- 不要用极简留白
- 不要用单层阴影
- 不要用圆角
- 不要只用一个强调色

## Surfaces

| Level | Name | Value | Purpose |
|---|---|---|---|
| 0 | Deep Violet | `#1a0a2e` | 页面底 |
| 1 | Gradient | `linear-gradient rose→violet→blue` | 渐变区块 |
| 2 | Rose Solid | `#d4145a` | 撞色块 |

## Elevation

- **Double stack:** `4px 4px 0 #ffbe0b, 8px 8px 0 #3a86ff`
- **Triple stack:** `4px 4px 0 #ffbe0b, 8px 8px 0 #3a86ff, 12px 12px 0 #8338ec`
- **Pressed:** `none`

## Imagery

高饱和拼贴：图案、插画、照片、贴纸全部混用，且必须互相重叠。允许把照片压成高饱和双色调再叠图案。不使用灰度摄影、极简构图与留白式的图像。

## Layout

上限 1280px、容器内边距 24px，区块间距 64px。允许大量重叠、旋转与溢出。混乱必须有节奏：大块撞色与小贴纸交替出现，视线不至于无处可落。

## Agent Prompt Guide

### Implementation Contract

- 以用户请求中的页面、用户任务和真实内容为依据，只实施指定范围；标明缺失的业务信息，不编造数据或能力。
- 先检查现有项目、技术栈与组件；沿用项目结构、路由和依赖，复用已有组件，不重建未要求的页面或功能。
- 沿用项目断点，调整窄屏与桌面的网格和留白；保留信息层级，避免意外横向溢出。
- 对本次涉及的交互，处理键盘焦点与减少动态效果；补齐适用的禁用、加载、空内容与错误状态。
- 完成后按项目现有脚本检查，仅报告实际运行的测试与视觉检查，并列出未验证项。

QUICK COLOR REFERENCE:

- text: `#ffbe0b`
- background: `#1a0a2e`
- rose: `#d4145a`
- blue: `#3a86ff`
- violet: `#8338ec`
- mint: `#06d6a0`

EXAMPLE COMPONENT PROMPTS:

1. 做一个极繁主义面板：深紫 #1a0a2e 底、玫红 #d4145a 填充的区块、零圆角、border: 4px double #ffbe0b、box-shadow 4px 4px 0 #ffbe0b, 8px 8px 0 #3a86ff、transform rotate(-1deg)、内边距 28px。内部叠一层对角渐变 linear-gradient(135deg, rgba(212,20,90,0.25), rgba(131,56,236,0.25), rgba(58,134,255,0.25)) 与一层 45 度斜线图案（rgba(6,214,160,0.10)）。标题 88px/900 全大写、字距 -0.02em；标签 14px 全大写 0.24em 金黄。按钮玫红填充、金字、3px dashed #ffbe0b 描边、双层阴影，hover 时填充硬切到 #8338ec、阴影扩到 12px。
