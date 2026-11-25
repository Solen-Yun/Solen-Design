# 新拟物派 — 风格参考

> 元素和背景同色，只有两个方向的阴影在说明它凸起还是凹陷。

**Theme:** light

新拟物派用一束固定的光塑造所有界面：光源在左上，所以每个元素都有左上白色高光与右下冷灰暗影。元素本身与背景同色，一旦换了深浅就立刻失去材质感。凸起用外阴影对，凹陷用 inset 阴影对，按下就是把凸起翻成凹陷。这套系统里没有边框、没有实色填充、没有强烈对比，全部层次由两段模糊值承担，字号与字重必须比常规更保守，否则内容会压过材质。

## Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Base | `#e0e5ec` | `--color-base` | 页面与所有元素的共同颜色。凸起和凹陷都从它出发，不允许任何元素换底色。 |
| Shadow Grey | `#b8bcc2` | `--color-shadow-grey` | 右下阴影色。唯一允许用来表达凹陷的颜色，不用于文字或边框。 |
| Highlight | `#ffffff` | `--color-highlight` | 左上高光色。以模糊阴影形式出现，不直接作为面板填充。 |
| Blurple | `#6d5dfc` | `--color-blurple` | 主行动与选中态。全系统唯一允许压在基底上的饱和色，面积控制在按钮与图标内。 |
| Coral | `#ff6b6b` | `--color-coral` | 警示与删除操作。出现即表示不可逆，不做装饰用途。 |
| Mint | `#4ecdc4` | `--color-mint` | 成功与数据正向变化。与珊瑚同屏时面积不得超过其一。 |

## Typography

### Inter — 全站唯一字体，字重克制。材质已经是主角，字体再加戏会显得廉价。

- **Substitute:** Nunito, system-ui, -apple-system, sans-serif
- **Weights:** 400, 500, 600
- **Sizes:** 12, 14, 16, 20, 28, 36
- **Line height:** 1.15 (display), 1.3 (headings), 1.6 (body)
- **Letter spacing:** -0.01em on display, 0.08em on uppercase labels

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|---|---|---|---|---|---|---|
| display | — | 600 | 36px | 1.15 | -0.01em | `--text-display` |
| heading | — | 600 | 28px | 1.3 | — | `--text-heading` |
| subheading | — | 500 | 20px | 1.4 | — | `--text-subheading` |
| body-lg | — | 400 | 16px | 1.6 | — | `--text-body-lg` |
| body | — | 400 | 14px | 1.6 | — | `--text-body` |
| label | — | 500 | 12px | 1.4 | 0.08em | `--text-label` |

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
| buttons | 16px |
| inputs | 16px |
| pills | 999px |

- **Page max-width:** 1080px
- **Section gap:** 96px
- **Card padding:** 32px
- **Element gap:** 16px

## Components

### Raised Button

**Role:** 主行动按钮

与背景同色 #e0e5ec 填充、无描边、16px 圆角。凸起状态用双阴影：8px 8px 16px #b8bcc2 与 -8px -8px 16px #ffffff。字级 14px、字重 500、深灰字。hover 时两段模糊减半到 4px，模拟手指靠近遮光；按下时整对翻成 inset，位移为 0。过渡 200ms ease-out。

- **States:** hover: blur 8px to 4px; active: inset pair; focus-visible: blurple outline, 3px offset

### Recessed Input

**Role:** 输入框与搜索

与背景同色填充、inset 双阴影（8px 8px 16px #b8bcc2 与 inset -8px -8px 16px #ffffff）、16px 圆角、padding 12px 16px。占位符用中灰。聚焦时保持凹陷，只把阴影色相转向紫罗兰 30% 透明度，不移动元素。

- **States:** focus: recess preserved, blurple-tinted shadow

### Soft Card

**Role:** 内容卡片与统计块

凸起双阴影、24px 圆角、内边距 32px、无描边无换色。卡片之间至少留 32px，否则两套阴影会互相污染。hover 时阴影模糊减半并整体上浮 2px，表示可点击。

### Soft Toggle

**Role:** 开关与分段控件

轨道为凹陷状态（inset 对，16px 圆角，高 32px），旋钮为凸起状态（外阴影对、直径 24px、与轨道同色）。开启时旋钮填紫罗兰，关闭时与基底同色。切换过渡 200ms，只动阴影与位置，不用缩放。

## Do's and Don'ts

### Do

- 所有元素与背景同色，深浅差异只由阴影承担
- 固定单一光源：左上高光、右下暗影，全站一致
- 凸起用外阴影对，凹陷用 inset 对，不混用
- 圆角 16px 起，卡片用 24px
- hover 时减小阴影模糊，模拟手靠近遮光
- 字重不超过 600，让材质当主角

### Don't

- 不要用纯黑阴影，会立刻变成脏灰
- 不要在深色背景上做新拟物，没有可用光
- 不要加实色边框，材质不再连续
- 不要让元素换底色来区分层级
- 不要用锐利描边图标或高对比插画
- 不要把两套阴影的元素放得比阴影模糊半径更近

## Surfaces

| Level | Name | Value | Purpose |
|---|---|---|---|
| 0 | Base | `#e0e5ec` | 页面与元素的共同基底 |
| 1 | Raised | `#e0e5ec` | 凸起面板，靠外阴影区分而非换色 |

## Elevation

- **Raised:** `8px 8px 16px #b8bcc2, -8px -8px 16px #ffffff`
- **Recessed:** `inset 8px 8px 16px #b8bcc2, inset -8px -8px 16px #ffffff`
- **Hover (light dimmed):** `4px 4px 8px #b8bcc2, -4px -4px 8px #ffffff`
- **Pressed:** `inset 4px 4px 8px #b8bcc2, inset -4px -4px 8px #ffffff`

## Imagery

不用摄影。材质本身是内容：可用同色系的柔和图形、极浅的线性图标，或与基底同色的产品渲染。任何强对比、深色背景、纯白图标都会破坏统一光源的假设。

## Layout

上限 1080px，12 栏，容器内边距 24px。区块间距 96px，卡片间距 32px 起。版面必须留白充足，元素之间至少一个阴影的模糊半径的距离，否则阴影互相叠加会显脏。深色文字只出现在内容层，界面层用中灰。

## Agent Prompt Guide

### Implementation Contract

- 以用户请求中的页面、用户任务和真实内容为依据，只实施指定范围；标明缺失的业务信息，不编造数据或能力。
- 先检查现有项目、技术栈与组件；沿用项目结构、路由和依赖，复用已有组件，不重建未要求的页面或功能。
- 沿用项目断点，调整窄屏与桌面的网格和留白；保留信息层级，避免意外横向溢出。
- 对本次涉及的交互，处理键盘焦点与减少动态效果；补齐适用的禁用、加载、空内容与错误状态。
- 完成后按项目现有脚本检查，仅报告实际运行的测试与视觉检查，并列出未验证项。

QUICK COLOR REFERENCE:

- base: `#e0e5ec`
- shadow: `#b8bcc2`
- highlight: `#ffffff`
- text: `#3d4451`
- primary: `#6d5dfc`
- danger: `#ff6b6b`

EXAMPLE COMPONENT PROMPTS:

1. 做一个新拟物按钮：背景 #e0e5ec、无边框、16px 圆角、文字 14px/500 深灰。凸起用 box-shadow: 8px 8px 16px #b8bcc2, -8px -8px 16px #ffffff。hover 时两段模糊减到 4px；按下时改成 inset 8px 8px 16px #b8bcc2、inset -8px -8px 16px #ffffff。页面底色同为 #e0e5ec。
