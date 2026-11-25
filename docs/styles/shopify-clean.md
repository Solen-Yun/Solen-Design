# 清爽电商 — 风格参考

> 产品图说了算：界面只负责让价格和按钮无法被错过。

**Theme:** light

清爽电商是为独立店铺做的转化型界面，规则由商业逻辑倒推：底色必须白或极浅灰，因为任何深色都会影响产品图的色彩还原；产品卡必须固定比例（1:1 或 3:4）以便网格对齐；价格是页面上对比度最高的元素，18px 加粗；原价用 14px 划线灰字放在现价旁；主按钮只用品牌绿 #008060，而且必须足够饱和，因为它是唯一要人点的东西。列表页禁止大面积装饰元素——它们在和商品抢注意力。

## Colors

| Name | Value | Token | Role |
|---|---|---|---|
| White | `#ffffff` | `--color-white` | 产品页与卡片底。必须白，任何色偏都会污染产品图。 |
| Light Grey | `#f7f7f8` | `--color-light-grey` | 列表页底与区块分隔。只差一档，让白卡浮起。 |
| Brand Green | `#008060` | `--color-brand-green` | 唯一的主行动色。购买、加入购物车、结账全部用它。 |
| Ink | `#1a1a1a` | `--color-ink` | 标题与价格。价格必须用最高对比。 |
| Line Grey | `#e3e3e3` | `--color-line-grey` | 卡片描边与分隔线。1px，几乎不参与视觉。 |
| Gold | `#ffd700` | `--color-gold` | 评分星与「热销」标记，面积必须极小。 |

## Typography

### Inter — 全站唯一字体。价格用 18px/700，标题 24 到 32px，辅助文字 12px 灰。

- **Substitute:** system-ui, -apple-system, 'Segoe UI', sans-serif
- **Weights:** 400, 500, 600, 700
- **Sizes:** 11, 12, 14, 16, 18, 24, 32
- **Line height:** 1.2 (display), 1.3 (headings), 1.55 (body)
- **Letter spacing:** -0.01em on display, 0.02em on uppercase labels

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|---|---|---|---|---|---|---|
| display | — | 700 | 32px | 1.2 | -0.01em | `--text-display` |
| heading | — | 600 | 24px | 1.3 | — | `--text-heading` |
| price | — | 700 | 18px | 1.3 | — | `--text-price` |
| body-lg | — | 400 | 16px | 1.55 | — | `--text-body-lg` |
| body | — | 400 | 14px | 1.55 | — | `--text-body` |
| label | — | 500 | 12px | 1.4 | 0.02em | `--text-label` |

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
| cards | 8px |
| buttons | 8px |
| inputs | 8px |
| images | 8px |
| badges | 999px |

- **Page max-width:** 1280px
- **Section gap:** 64px
- **Card padding:** 16px
- **Element gap:** 12px

## Components

### Buy Button

**Role:** 购买与加入购物车

品牌绿填充、白字、8px 圆角、无描边，16px/600、padding 12px 24px，无阴影。hover 时填充加深到 #006b50；按下缩放 0.98。全宽版本用于详情页，固定版本用于移动端底部吸附条。禁止用低饱和绿或描边款式。

- **Sizes:** padding 12px 24px; label 16px
- **States:** hover: #006b50; active: scale 0.98

### Product Card

**Role:** 产品卡

白底、8px 圆角、1px #e3e3e3 描边、内边距 16px。图片区固定 aspect-ratio 1:1 或 3:4、8px 圆角、无滤镜。图片下方 14px 商品名（最多两行）、18px/700 价格与 14px 划线灰原价并排。hover 时阴影升到 0 4px 12px 黑 8%，图片放大 1.02。

- **Sizes:** image aspect 1:1 or 3:4
- **States:** hover: shadow, image scale 1.02

### Price Stack

**Role:** 价格与折扣标记

现价 18px/700 墨色；原价 14px/400 灰（#6b7280）加 line-through，与现价之间留 8px；折扣用 999px 的金色标签（12px/600、墨色文字、padding 2px 8px）。三者必须在同一行且在移动端不换行溢出。

### Trust Row

**Role:** 信任标识条

三个横向排列的 12px 灰字配 16px 线性图标（免运费、30 天退换、正品保障），间距 24px，图标色用品牌绿。放在购买按钮下方或产品图旁边，不加边框。

### Sticky Buy Bar

**Role:** 移动端吸附购买条

顶部 1px #e3e3e3 描边、白底、内边距 12px 16px、阴影 0 -4px 12px 黑 6%。左侧显示 18px/700 价格（可含折扣标签），右侧一个全宽的 Buy Button。始终可见，不随滚动隐藏。

## Do's and Don'ts

### Do

- 白或浅灰底，保证产品图准确
- 图片固定 1:1 或 3:4 比例
- 价格是页面对比最高的元素
- 主按钮只用品牌绿且足够饱和
- 原价划线放在现价旁
- 信任标识用小图标配 12px 文字

### Don't

- 不要用深色主背景
- 不要在列表页加大面积装饰
- 不要用低对比价格色
- 不要让 CTA 低饱和
- 不要给产品图加滤镜或色彩叠加
- 不要用不规则图片比例

## Surfaces

| Level | Name | Value | Purpose |
|---|---|---|---|
| 0 | Light Grey | `#f7f7f8` | 列表页底 |
| 1 | White | `#ffffff` | 产品卡与详情页 |

## Elevation

- **Card rest:** `none — 1px border only`
- **Card hover:** `0 4px 12px rgba(0,0,0,0.08)`
- **Sticky bar:** `0 -4px 12px rgba(0,0,0,0.06)`

## Imagery

产品摄影是唯一图像，必须白底或极浅底、无滤镜无色彩叠加、统一比例。允许同一商品的多角度图与细节特写。不使用场景图作主图、装饰插画与图标墙。

## Layout

上限 1280px、容器内边距 16px，产品网格 2 列（移动）/ 3 列（平板）/ 4 列（桌面），间距 16px。详情页左图右信息（各 50%），信息栏固定在视口内。列表页禁止任何超过 200px 高的装饰区块。

## Agent Prompt Guide

### Implementation Contract

- 以用户请求中的页面、用户任务和真实内容为依据，只实施指定范围；标明缺失的业务信息，不编造数据或能力。
- 先检查现有项目、技术栈与组件；沿用项目结构、路由和依赖，复用已有组件，不重建未要求的页面或功能。
- 沿用项目断点，调整窄屏与桌面的网格和留白；保留信息层级，避免意外横向溢出。
- 对本次涉及的交互，处理键盘焦点与减少动态效果；补齐适用的禁用、加载、空内容与错误状态。
- 完成后按项目现有脚本检查，仅报告实际运行的测试与视觉检查，并列出未验证项。

QUICK COLOR REFERENCE:

- text: `#1a1a1a`
- background: `#ffffff`
- surface: `#f7f7f8`
- primary: `#008060`
- border: `#e3e3e3`
- muted: `#6b7280`

EXAMPLE COMPONENT PROMPTS:

1. 做一个电商产品卡：白底、8px 圆角、1px #e3e3e3 描边、内边距 16px。图片区 aspect-ratio 1/1、8px 圆角、object-fit cover、无滤镜。下方 14px 商品名（最多两行）、18px/700 #1a1a1a 现价与 14px #6b7280 划线原价并排。hover 时阴影 0 4px 12px rgba(0,0,0,0.08)、图片 scale(1.02)。购买按钮用 #008060 填充、8px 圆角、白字 16px/600。
