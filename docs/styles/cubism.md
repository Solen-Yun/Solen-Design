# 立体主义 — 风格参考

> 把同一件东西从三个角度看，再压回一个平面。

**Theme:** light

立体主义来自毕加索与布拉克：把对象拆成棱角分明的几何块，从多个视角同时呈现，再用 skew 与 rotate 把这些碎片压回画面。配色是低饱和的大地色（棕 #5c4033、米 #e8dcc8、赭 #8b7355、灰蓝 #3d5c6e、砖红 #9b3d25、苔绿 #647f53），边框 2px 粗线、圆角只有 2 到 4px、布局刻意不对称并带倾斜，文字用粗体全大写字强调几何感。它禁止柔和渐变与模糊——立体主义是硬的。

## Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Umber | `#5c4033` | `--color-umber` | 主色：文字、粗边框与最深色块。 |
| Cream | `#e8dcc8` | `--color-cream` | 页面底与浅色面。像旧画布的米色。 |
| Ochre | `#8b7355` | `--color-ochre` | 中间调色面，用于制造第三个明度层。 |
| Slate Blue | `#3d5c6e` | `--color-slate-blue` | 冷侧的碎面，与棕形成分析立体主义的冷暖交错。 |
| Brick | `#9b3d25` | `--color-brick` | 最暖的碎面，用于强调与关键块。 |
| Moss | `#647f53` | `--color-moss` | 第四碎面色，出现频率最低。 |

## Typography

### Inter — 粗无衬线、全大写。字形必须方正，因为立体主义的文字也是被切的块。

- **Substitute:** 'Arial Black', Georgia, sans-serif
- **Weights:** 700, 900
- **Sizes:** 14, 18, 24, 32, 44, 60
- **Line height:** 1 (display), 1.1 (headings), 1.55 (body)
- **Letter spacing:** -0.02em on display, 0.06em on uppercase labels

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|---|---|---|---|---|---|---|
| display | — | 900 | 60px | 1 | -0.02em | `--text-display` |
| heading | — | 900 | 44px | 1.05 | -0.02em | `--text-heading` |
| subheading | — | 700 | 32px | 1.15 | — | `--text-subheading` |
| body-lg | — | 700 | 24px | 1.45 | — | `--text-body-lg` |
| body | — | 700 | 18px | 1.55 | — | `--text-body` |
| label | — | 900 | 14px | 1.4 | 0.06em | `--text-label` |

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
| cards | 4px |
| buttons | 2px |
| inputs | 2px |

- **Page max-width:** 1120px
- **Section gap:** 96px
- **Card padding:** 28px
- **Element gap:** 20px

## Components

### Fragmented Panel

**Role:** 碎片化面板（核心组件）

一个容器被 clip-path 切成 3 到 5 个不规则多边形，每块填不同的大地色，块与块之间留 2px 的米色缝（模拟画布的底色透出）。整块 rotate(-2deg) 或 skewX(-4deg)。零阴影。

### Multi-View Block

**Role:** 多视角叠加

同一内容的副本叠两层：一层正常、一层偏移 8px 并 skewX(-8deg)、不透明度 45%，形成「同时从两个角度看」的错觉。仅用于标题与图像，正文绝不叠加。

### Angular Button

**Role:** 行动按钮

棕填充、米色文字、2px 圆角、2px 棕描边、14px/900 全大写、字距 0.06em、padding 14px 28px，无阴影。用 clip-path 切掉右上角 12px。hover 时填充换砖红；按下时位移 2px 2px。过渡 150ms linear。

- **Sizes:** padding 14px 28px; label 14px
- **States:** hover: brick fill; active: translate 2px

### Skewed Card

**Role:** 倾斜卡片

米色或大地色填充、4px 圆角、2px 棕描边、内边距 28px。整张卡 skewX(-3deg) 并 rotate(1deg)，相邻卡片角度不同（-3、+2、-1 度），刻意不对称。内容在内层反向 skew 以保持文字直立。

### Fragmented Edge

**Role:** 碎片边缘

用 clip-path 的一个不规则多边形让图像的边缘像被打碎，或沿边缘叠 3 到 4 个小的三角与梯形色块。它替代圆角与装饰边框。

## Do's and Don'ts

### Do

- 大地色系，低饱和
- 用 clip-path 把面切成碎片
- 多视角叠加同一内容
- 2px 粗边框、2 到 4px 圆角
- 布局不对称并倾斜
- 粗体全大写字

### Don't

- 不要用柔和渐变与模糊
- 不要用对称居中布局
- 不要用大圆角
- 不要用过亮的饱和色
- 不要把完整照片直接放上
- 不要给碎面加阴影

## Surfaces

| Level | Name | Value | Purpose |
|---|---|---|---|
| 0 | Cream | `#e8dcc8` | 页面底 |
| 1 | Ochre Plane | `#8b7355` | 中间调面 |
| 2 | Umber Plane | `#5c4033` | 最深面 |

## Elevation

- **None:** `none — planes stack by overlap, not shadow`

## Imagery

图像必须被切碎：把照片用 clip-path 分成多块并各自偏移、或转成大地色的多面体构成。允许同一张脸的三个角度并置。不使用完整清晰的照片、柔和插画与渐变图像。

## Layout

上限 1120px、容器内边距 24px，区块间距 96px。允许元素重叠、倾斜与错位，角度只用 -3、-1.5、+2 三档。布局必须不对称——居中对称会立刻失去立体主义。

## Agent Prompt Guide

### Implementation Contract

- 以用户请求中的页面、用户任务和真实内容为依据，只实施指定范围；标明缺失的业务信息，不编造数据或能力。
- 先检查现有项目、技术栈与组件；沿用项目结构、路由和依赖，复用已有组件，不重建未要求的页面或功能。
- 沿用项目断点，调整窄屏与桌面的网格和留白；保留信息层级，避免意外横向溢出。
- 对本次涉及的交互，处理键盘焦点与减少动态效果；补齐适用的禁用、加载、空内容与错误状态。
- 完成后按项目现有脚本检查，仅报告实际运行的测试与视觉检查，并列出未验证项。

QUICK COLOR REFERENCE:

- text: `#5c4033`
- background: `#e8dcc8`
- ochre: `#8b7355`
- slate: `#3d5c6e`
- brick: `#9b3d25`
- moss: `#647f53`

EXAMPLE COMPONENT PROMPTS:

1. 做一个立体主义面板：米色 #e8dcc8 为底，用 clip-path 把一个矩形切成 4 个不规则多边形，分别填 #5c4033、#8b7355、#3d5c6e、#9b3d25，块间留 2px 米色缝，整块 rotate(-2deg) skewX(-4deg)、零阴影。标题 44px/900 全大写，叠一层偏移 8px、skewX(-8deg)、45% 不透明度的副本。按钮 #5c4033 填充、米色文字、2px 圆角、2px 描边、padding 14px 28px、clip-path 切掉右上角 12px，hover 时填充换 #9b3d25。布局不对称，全站无渐变无阴影。
