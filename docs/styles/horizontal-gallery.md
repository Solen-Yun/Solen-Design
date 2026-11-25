# 横滚画廊 — 风格参考

> 白盒展厅：作品沿一条横向轨道排开，看展变成一次散步。

**Theme:** light

横滚画廊模仿美术馆的白盒展厅：作品沿着一条横向的 snap 滚动轨道排开（overflow-x-auto、snap-x mandatory、每件 shrink-0 snap-start），留白就是展墙，图注用 12px 全大写 0.2em 的灰字放在图外下方并带 No. 01 编号，章节标题作为轨道首格 sticky 在左侧随滚动常驻。它的禁令全部指向「不要让作品被装饰干扰」——不许给作品图加阴影圆角边框、不许把文字压在图上、不许厚重边框、不许花哨背景墙、不许高饱和多色装饰，唯一点缀色是克制的赤陶。

## Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Ink | `#1a1a1a` | `--color-ink` | 标题与主要文字。展签的颜色。 |
| Gallery White | `#fcfcfa` | `--color-gallery-white` | 页面底。略暖的白，像刷过漆的展墙。 |
| Terracotta | `#a85a3a` | `--color-terracotta` | 唯一点缀色，少量出现在编号、链接与选中标记上。 |
| Stone | `#8a8a85` | `--color-stone` | 图注、编号与元信息。级别最低但必须可读。 |
| Hairline | `#e8e6e1` | `--color-hairline` | 所有 1px hairline，永远不超过 1px。 |
| Dark Stone | `#2e2e2c` | `--color-dark-stone` | 反色区块底，用于「关于」与页脚。 |

## Typography

### Cormorant Garamond — 标题用细衬线加宽字距。层级靠字号与字距建立，绝不靠加粗。

- **Substitute:** Georgia, 'Songti SC', serif
- **Weights:** 300, 400
- **Sizes:** 22, 28, 36, 48, 64
- **Line height:** 1.1 (display), 1.2 (headings), 1.6 (body)
- **Letter spacing:** 0.02em on display, 0.2em on uppercase labels

### Inter — 正文与图注用浅色无衬线，字号压到 12 到 15px 让作品独占注意力。

- **Substitute:** system-ui, 'Helvetica Neue', sans-serif
- **Weights:** 300, 400
- **Sizes:** 12, 13, 15
- **Line height:** 1.5 (display), 1.5 (headings), 1.7 (body)
- **Letter spacing:** 0.02em on display, 0.2em on uppercase labels

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|---|---|---|---|---|---|---|
| display | Cormorant Garamond | 300 | 64px | 1.1 | 0.02em | `--text-display` |
| heading | Cormorant Garamond | 300 | 48px | 1.15 | — | `--text-heading` |
| subheading | Cormorant Garamond | 400 | 36px | 1.25 | — | `--text-subheading` |
| body-lg | Inter | 300 | 15px | 1.7 | — | `--text-body-lg` |
| body | Inter | 300 | 13px | 1.7 | — | `--text-body` |
| label | Inter | 400 | 12px | 1.5 | 0.2em | `--text-label` |

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
| 128 | 128px | `--spacing-128` |

### Border Radius

| Element | Value |
|---|---|
| cards | 0 |
| buttons | 0 |
| media | 0 |

- **Page max-width:** 1440px
- **Section gap:** 160px
- **Card padding:** 0px
- **Element gap:** 24px

## Components

### Snap Rail

**Role:** 横滚轨道（核心结构）

容器 overflow-x: auto、scroll-snap-type: x mandatory、隐藏滚动条但保留键盘与触控可滚。每件作品 shrink-0、scroll-snap-align: start、间距 64px。轨道上下各一条 1px hairline。

- **Sizes:** gap 64px between works

### Gallery Cell

**Role:** 作品格

图片宽度按视口比例（桌面 42vw、平板 60vw、手机 82vw），高度自适应保持原始比例，零圆角零边框零阴影。图片下方 16px 处放图注：12px 全大写 0.2em 的灰石色编号（No. 01）加作品名与年份。图注绝不出现在图上。

- **Sizes:** 42vw desktop / 60vw tablet / 82vw mobile

### Sticky Title

**Role:** 常驻章节标题（首格）

作为轨道的第一个格子，sticky left-0、与页面同色底、宽 320px、右侧 1px hairline。标题 48px 细衬线，下方 12px 全大写章节编号。它随横滚常驻，指明当前章节。

### Hairline Caption

**Role:** 图注与元信息

12px、字距 0.2em、全大写、灰石 #8a8a85。格式固定为「No. 01 / 作品名 / 年份 / 材质」。编号用赤陶色。它模仿博物馆的展签，绝不加粗也绝不省略编号。

### Wall Rule

**Role:** 展墙分隔线

1px、色 #e8e6e1，横跨内容宽，两端各收进 24px。用于分隔不同章节的轨道。绝对不允许 2px 及以上——粗线会让页面变成表格而不是展墙。

## Do's and Don'ts

### Do

- 用 snap-x mandatory 做横向吸附
- 每件作品带 No. 01 编号与展签
- 一切分割线只有 1px
- 章节标题 sticky 在轨道左侧
- 标题用细衬线，层级靠字距
- 点缀色只有赤陶，少量出现

### Don't

- 不要给作品图加阴影圆角边框
- 不要把文字压在作品图上
- 不要在轨道里混排瀑布流
- 不要用 2px 及以上边框
- 不要用花哨背景墙
- 不要用高饱和多色装饰

## Surfaces

| Level | Name | Value | Purpose |
|---|---|---|---|
| 0 | Gallery White | `#fcfcfa` | 展墙 |
| 1 | Dark Stone | `#2e2e2c` | 反色区块 |

## Elevation

- **None:** `none — a shadow would mount the work on the wall`

## Imagery

作品图是唯一内容，必须高质、精确裁切、无滤镜。允许不同尺寸与比例（这正是画廊的节奏），但每件作品都要有编号与展签。不使用装饰插画、背景纹理与多色图形。

## Layout

上限 1440px，轨道左右内边距 32px，章节间距 160px。垂直方向几乎全是留白，横向承载全部内容。允许轨道在移动端降至 82vw 单件可见。

## Agent Prompt Guide

### Implementation Contract

- 以用户请求中的页面、用户任务和真实内容为依据，只实施指定范围；标明缺失的业务信息，不编造数据或能力。
- 先检查现有项目、技术栈与组件；沿用项目结构、路由和依赖，复用已有组件，不重建未要求的页面或功能。
- 沿用项目断点，调整窄屏与桌面的网格和留白；保留信息层级，避免意外横向溢出。
- 对本次涉及的交互，处理键盘焦点与减少动态效果；补齐适用的禁用、加载、空内容与错误状态。
- 完成后按项目现有脚本检查，仅报告实际运行的测试与视觉检查，并列出未验证项。

QUICK COLOR REFERENCE:

- text: `#1a1a1a`
- background: `#fcfcfa`
- accent: `#a85a3a`
- stone: `#8a8a85`
- hairline: `#e8e6e1`
- dark: `#2e2e2c`

EXAMPLE COMPONENT PROMPTS:

1. 做一个横滚画廊：容器 overflow-x auto、scroll-snap-type x mandatory、上下各一条 1px #e8e6e1 hairline。每件作品 shrink-0、scroll-snap-align start、间距 64px、宽度 42vw（移动端 82vw）、零圆角零边框零阴影。图片下方 16px 放 12px 全大写 0.2em 的图注，格式「No. 01 / 作品名 / 年份」，编号用赤陶 #a85a3a、其余 #8a8a85。章节标题作为首格 sticky left-0、宽 320px、48px 细衬线。页面底色 #fcfcfa。
