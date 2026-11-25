# Risograph 印刷风 — 风格参考

> 两个墨版印歪了：套印错位加网点，才是 Riso 的样子。

**Theme:** light

Risograph 是一种真实的孔版印刷：每次只上一个色版，纸走一遍印一层，所以会有套印错位、网点、以及三色以内的限制。界面上的还原靠两条硬规则——第一是 Misregistration Offset：hover 时必须用双向硬阴影模拟两个墨版错开，一个往右下（蓝版）、一个往左上（橙版），单方向阴影是错的；第二是 Instant Print：所有过渡 100ms 且必须 ease-linear，因为是机械印刷而不是有机运动，绝不允许 ease-in-out 或用 opacity 过渡来换色。

## Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Riso Pink | `#ff6b9d` | `--color-riso-pink` | 第一个墨版。Riso 的粉墨饱和度极高，是它的签名色。 |
| Riso Blue | `#2563eb` | `--color-riso-blue` | 第二个墨版。与粉叠印后会产出紫，这个混合是 Riso 的核心。 |
| Riso Orange | `#ff8a00` | `--color-riso-orange` | 第三个墨版与套印错位的第二个方向。 |
| Cream Stock | `#faf5eb` | `--color-cream-stock` | 纸张底。Riso 从不印纯白，纸本身是米白的。 |
| Riso Green | `#22c55e` | `--color-riso-green` | 可选墨版，用于第三色或替换橙。 |
| Riso Lavender | `#a38bff` | `--color-riso-lavender` | 粉与蓝叠印后的产物色，也可直接作为墨版使用。 |

## Typography

### Space Mono — 等宽或粗无衬线，字距略开。Riso 印刷的边缘会略微涨墨，所以字形要选笔直有力的。

- **Substitute:** ui-monospace, 'Courier New', monospace
- **Weights:** 400, 700
- **Sizes:** 12, 14, 17, 24, 34, 48
- **Line height:** 1.1 (display), 1.2 (headings), 1.7 (body)
- **Letter spacing:** 0.02em on display, 0.14em on uppercase labels

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|---|---|---|---|---|---|---|
| display | — | 700 | 48px | 1.1 | 0.02em | `--text-display` |
| heading | — | 700 | 34px | 1.2 | — | `--text-heading` |
| subheading | — | 700 | 24px | 1.3 | — | `--text-subheading` |
| body-lg | — | 400 | 17px | 1.65 | — | `--text-body-lg` |
| body | — | 400 | 14px | 1.7 | — | `--text-body` |
| label | — | 700 | 12px | 1.4 | 0.14em | `--text-label` |

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

- **Page max-width:** 1120px
- **Section gap:** 96px
- **Card padding:** 28px
- **Element gap:** 20px

## Components

### Overprint Card

**Role:** 叠印卡片（核心组件）

奶白纸底上叠两层墨版：第一层粉 28%，第二层蓝 22%，两层用 multiply 混合模式并各偏移 2px（一个右下、一个左上）。零圆角、1px 墨蓝 30% 描边、内边距 28px。hover 时双向硬阴影出现：6px 6px 0 蓝 与 -4px -4px 0 橙，过渡 100ms ease-linear。

- **States:** hover: dual-direction hard shadows appear

### Riso Button

**Role:** 行动按钮

荧光粉填充、奶白文字、零圆角、无描边，14px/700、字距 0.14em、padding 12px 28px。hover 时出现双向硬阴影 4px 4px 0 蓝 与 -3px -3px 0 橙，同时填充硬切到橙（不做透明度过渡）；按下时位移 2px 2px 且阴影归零。全程 100ms ease-linear。

- **Sizes:** padding 12px 28px; label 14px
- **States:** hover: dual shadows, hard color cut; active: translate 2px

### Halftone Bed

**Role:** 网点底

用 radial-gradient 做 4px 间距、半径 1px 的网点，颜色取墨蓝 20% 或粉 20%，作为区块背景。网点角度在不同版本间应略有不同（15 度或 45 度），避免出现摩尔纹。

### Registration Mark

**Role:** 套印对位标记

十字加圆的经典对位标：一个 16px 的圆环（1px 墨蓝）叠一个 24px 的十字（1px 橙），中心留空。放在页面四角或卡片角上，作为纯装饰但它证明了这是印刷品。

### Ink Counter

**Role:** 用色计数标记

在页面角落放一行 12px 等宽小字标注本次用了几版墨（如「2 INKS / PINK + BLUE」），颜色取墨黑 50%。这是 Riso 工作流的真实痕迹，也是这套风格最有说服力的细节。

## Do's and Don'ts

### Do

- 只用二到三支墨版色
- hover 必须双向硬阴影
- 过渡 100ms ease-linear
- 阴影零模糊
- 米白纸张底
- 叠印用 multiply 混合

### Don't

- 不要用复杂渐变
- 不要超过四支颜色
- 不要用写实阴影或光照
- 不要用圆角
- 不要用单方向阴影
- 不要用 ease-in-out 或 opacity 过渡

## Surfaces

| Level | Name | Value | Purpose |
|---|---|---|---|
| 0 | Cream Stock | `#faf5eb` | 纸张底 |
| 1 | Pink Layer | `rgba(255,107,157,0.28)` | 第一个墨版层 |
| 2 | Blue Layer | `rgba(37,99,235,0.22)` | 第二个墨版层 |

## Elevation

- **Misregistration:** `6px 6px 0 #2563eb, -4px -4px 0 #ff8a00`
- **Misregistration sm:** `4px 4px 0 #2563eb, -3px -3px 0 #ff8a00`
- **Pressed:** `none`

## Imagery

双色或三色网点图像：把照片分解成两到三块墨版，允许套印错位与边缘涨墨。允许手绘线稿叠印。不使用全彩摄影、写实阴影与渐变图像。

## Layout

上限 1120px、容器内边距 24px，区块间距 96px。零圆角，版式可略微歪斜（0.5 到 1 度）模拟手工对位。所有色块必须来自二到三支墨版，绝不超过四支。

## Agent Prompt Guide

### Implementation Contract

- 以用户请求中的页面、用户任务和真实内容为依据，只实施指定范围；标明缺失的业务信息，不编造数据或能力。
- 先检查现有项目、技术栈与组件；沿用项目结构、路由和依赖，复用已有组件，不重建未要求的页面或功能。
- 沿用项目断点，调整窄屏与桌面的网格和留白；保留信息层级，避免意外横向溢出。
- 对本次涉及的交互，处理键盘焦点与减少动态效果；补齐适用的禁用、加载、空内容与错误状态。
- 完成后按项目现有脚本检查，仅报告实际运行的测试与视觉检查，并列出未验证项。

QUICK COLOR REFERENCE:

- text: `#1a1a1a`
- background: `#faf5eb`
- pink: `#ff6b9d`
- blue: `#2563eb`
- orange: `#ff8a00`
- green: `#22c55e`

EXAMPLE COMPONENT PROMPTS:

1. 做一个 Riso 印刷风按钮：背景 #ff6b9d、奶白文字、零圆角、14px/700 字距 0.14em、padding 12px 28px。hover 时 box-shadow 6px 6px 0 #2563eb, -4px -4px 0 #ff8a00（双向套印错位），同时背景硬切到 #ff8a00；active 时 translate(2px,2px) 且阴影 none。transition: 100ms linear。页面底 #faf5eb，可叠 4px 间距的 #2563eb 20% 网点。全页只用三支墨版色。
