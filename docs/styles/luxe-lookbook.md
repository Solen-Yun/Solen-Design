# 奢华画册 — 风格参考

> 瓷白、墨黑、一点哑光金：奢侈来自删掉的部分。

**Theme:** light

奢华画册是时装屋的数字旗舰：瓷白底（#f7f5f1）配墨黑字（#141210），唯一强调色是哑光金（#9a7b4f），而它只能落在小标签、焦点态与单个 CTA 上。全站方角、1px hairline 分栏、零阴影零渐变——每加一项都会拉低身价。字重绝不用 font-bold 造，粗细由 Didone 衬线本身的笔画对比产生。首屏是全幅丝绸质感的影片，海报帧作 LCP，preload=none，入视才静音自动播，离屏暂停，reduced-motion 与 Save-Data 下只留静帧。

## Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Ink | `#141210` | `--color-ink` | 全部文字与 hairline。带一点暖的黑，像丝绒。 |
| Porcelain | `#f7f5f1` | `--color-porcelain` | 页面底。极浅的暖白，比纯白更有材质。 |
| Matte Gold | `#9a7b4f` | `--color-matte-gold` | 唯一强调色，只出现在小标签、焦点与一个 CTA 上。 |
| Bone | `#e8e3db` | `--color-bone` | 次级区块与图片衬底，用于在不引入对比的前提下分区。 |
| Ash | `#6b6259` | `--color-ash` | 次级文字、价格说明与元数据。 |

## Typography

### Didot — 展示标题用 Didone 衬线，靠笔画粗细对比产生字重感，绝不加粗。100px 以上是常态。

- **Substitute:** 'Playfair Display', Georgia, serif
- **Weights:** 400
- **Sizes:** 22, 32, 48, 72, 104
- **Line height:** 1.02 (display), 1.08 (headings), 1.6 (body)
- **Letter spacing:** -0.02em on display, 0.24em on uppercase labels

### Inter — 界面文字、价格与说明。字级压到 11 到 14px，让衬线标题独占注意力。

- **Substitute:** system-ui, 'Helvetica Neue', sans-serif
- **Weights:** 300, 400
- **Sizes:** 11, 12, 14
- **Line height:** 1.5 (display), 1.5 (headings), 1.75 (body)
- **Letter spacing:** 0.06em on display, 0.24em on uppercase labels

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|---|---|---|---|---|---|---|
| display | Didot | 400 | 104px | 1.02 | -0.02em | `--text-display` |
| heading-lg | Didot | 400 | 72px | 1.05 | -0.02em | `--text-heading-lg` |
| heading | Didot | 400 | 48px | 1.1 | — | `--text-heading` |
| subheading | Didot | 400 | 32px | 1.2 | — | `--text-subheading` |
| body | Inter | 400 | 14px | 1.75 | — | `--text-body` |
| label | Inter | 300 | 11px | 1.6 | 0.24em | `--text-label` |

## Spacing & Layout

**Base unit:** 8px
**Density:** airy

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
| 160 | 160px | `--spacing-160` |

### Border Radius

| Element | Value |
|---|---|
| cards | 0 |
| buttons | 0 |
| inputs | 0 |
| media | 0 |

- **Page max-width:** 1360px
- **Section gap:** 160px
- **Card padding:** 32px
- **Element gap:** 24px

## Components

### Silk Hero

**Role:** 全幅影片首屏（签名组件）

100vh 高、overflow hidden。poster 用 AVIF 先渲染作为 LCP；video 设 muted、loop、playsInline、preload="none"，用 IntersectionObserver 在入视时 load 与 play、离屏时 pause。上覆一层从底部墨黑 40% 到透明的渐变遮罩（唯一允许的渐变）。标题用 104px Didot 白色，左下对齐距边 64px。reduced-motion 与 Save-Data 下完全不播，只留海报静帧。

- **Sizes:** 100vh; poster as LCP

### Lookbook Grid

**Role:** 画册网格

两列或三列、gap 为 0、图块之间用 1px 墨黑 20% 的 hairline 分隔。每块为 3:4 竖构图，hover 时叠上第二张图（交叉淡入 600ms）并在底部浮出 11px 全大写 0.24em 的系列名。图片零圆角零阴影。

- **States:** hover: second image cross-fade, collection label appears

### Gold CTA

**Role:** 唯一的主行动

哑光金填充或透明底配 1px 金描边、零圆角、白字或金字、11px/300 全大写 0.24em、padding 16px 40px，无阴影。hover 时填充金 10%；按下时填充 18%。全页只有一个。

### Hairline Column

**Role:** hairline 分栏

1px、墨黑 20%，纵贯或横跨，用于分栏与分区。绝不用阴影或底色分区——一条线就够。

### Numeral Display

**Role:** 数字排版（价格与尺码）

价格与尺码用 Didot 48 到 72px，字距 -0.02em，不用币种符号缩写而写出全称。数字本身即装饰，不加底色不加边框。

## Do's and Don'ts

### Do

- 瓷白底配墨黑字，唯一哑光金
- 全站方角，hairline 分栏
- 字重来自 Didone 笔画对比
- 海报作 LCP，视频入视才播
- 留白占六成以上
- 动效像丝绸垂落，600ms 起

### Don't

- 不要用圆角、阴影、渐变
- 不要把金色用在多处
- 不要用 font-bold 造字重
- 不要拥挤排版
- 不要让视频成为 LCP 依赖
- 不要用快速跳变的动效

## Surfaces

| Level | Name | Value | Purpose |
|---|---|---|---|
| 0 | Porcelain | `#f7f5f1` | 页面底 |
| 1 | Bone | `#e8e3db` | 次级区块 |
| 2 | Film | `full-bleed video` | 首屏影片 |

## Elevation

- **None:** `none — a shadow cheapens it`

## Imagery

时装摄影：丝绸、皮革、雕塑感的布光，统一 3:4 竖构图。允许全幅影片与静帧交替。不使用插画、图形装饰与任何图标墙。

## Layout

上限 1360px、容器内边距 32px，区块间距 160px。留白占页面六成以上。标题可以极大（104px 以上）并与图片重叠。全站方角，任何一处圆角都被视为降级。

## Agent Prompt Guide

### Implementation Contract

- 以用户请求中的页面、用户任务和真实内容为依据，只实施指定范围；标明缺失的业务信息，不编造数据或能力。
- 先检查现有项目、技术栈与组件；沿用项目结构、路由和依赖，复用已有组件，不重建未要求的页面或功能。
- 沿用项目断点，调整窄屏与桌面的网格和留白；保留信息层级，避免意外横向溢出。
- 对本次涉及的交互，处理键盘焦点与减少动态效果；补齐适用的禁用、加载、空内容与错误状态。
- 完成后按项目现有脚本检查，仅报告实际运行的测试与视觉检查，并列出未验证项。

QUICK COLOR REFERENCE:

- text: `#141210`
- background: `#f7f5f1`
- gold: `#9a7b4f`
- bone: `#e8e3db`
- ash: `#6b6259`
- border: `rgba(20,18,16,0.20)`

EXAMPLE COMPONENT PROMPTS:

1. 做一个奢华画册版面：瓷白底 #f7f5f1、墨黑字 #141210、唯一强调色哑光金 #9a7b4f。全站零圆角零阴影。展示标题用 Didot 104px、字距 -0.02em、不加粗；界面文字 11 到 14px、字距 0.24em 全大写。画册网格两列 gap 0，图块用 1px rgba(20,18,16,0.2) hairline 分隔、3:4 竖构图。首屏全幅影片：poster 作 LCP、video preload="none"、muted 静音、入视才播、离屏暂停、reduced-motion 只留静帧。金色只出现在一个小标签和一个 CTA 上。区块间距 160px。
