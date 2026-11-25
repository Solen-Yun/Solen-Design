# 暗黑学院风 — 风格参考

> 深棕皮革、墨绿书脊、暗金烫印：一间只在夜里开放的图书馆。

**Theme:** dark

暗黑学院风来自古典校园与旧书的质感：深棕、墨绿、暗金三色构成主调，奶白作纸面，衬线字体承担全部文字，字距放开到 0.15em 像烫金。它的节奏极慢——过渡用 700 到 1000ms 的 ease-in-out，因为这套语言的参照是烛光与翻页，不是屏幕。卡片用内阴影制造纸面凹陷的光晕（inset 0 0 35px 暗金 5%），hover 时把光晕扩到 60px。禁止霓虹、禁止现代科技感、禁止花哨动画、禁止冷灰蓝。

## Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Deep Brown | `#3d2b1f` | `--color-deep-brown` | 页头、主按钮与最深区块。皮革书封的颜色。 |
| Forest | `#2d4a3e` | `--color-forest` | 次级区块与对比面。像旧书脊的布面。 |
| Antique Gold | `#8b7355` | `--color-antique-gold` | 描边、烫印与次级强调。所有金属感来自它。 |
| Cream | `#f5f0e1` | `--color-cream` | 纸面与卡片底。略带黄的旧纸色。 |
| Umber | `#5c4033` | `--color-umber` | hover 深化与压印效果，比深棕更暗。 |
| Moss | `#647f53` | `--color-moss` | 成功与「在读」状态，来自旧书页边缘的霉绿。 |

## Typography

### EB Garamond — 全站唯一字体。正文行高 1.8、字距微开，标题加 0.15em 的烫金字距。

- **Substitute:** Garamond, Georgia, 'Songti SC', serif
- **Weights:** 400, 500, 600
- **Sizes:** 14, 16, 19, 24, 32, 44
- **Line height:** 1.15 (display), 1.3 (headings), 1.8 (body)
- **Letter spacing:** 0.02em on display, 0.15em on uppercase labels

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|---|---|---|---|---|---|---|
| display | — | 600 | 44px | 1.15 | 0.02em | `--text-display` |
| heading | — | 600 | 32px | 1.25 | 0.02em | `--text-heading` |
| subheading | — | 400 | 24px | 1.35 | 0.02em | `--text-subheading` |
| body-lg | — | 400 | 19px | 1.8 | — | `--text-body-lg` |
| body | — | 400 | 16px | 1.8 | — | `--text-body` |
| label | — | 500 | 14px | 1.5 | 0.15em | `--text-label` |

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
| 128 | 128px | `--spacing-128` |

### Border Radius

| Element | Value |
|---|---|
| cards | 2px |
| buttons | 2px |
| inputs | 2px |

- **Page max-width:** 1080px
- **Section gap:** 128px
- **Card padding:** 40px
- **Element gap:** 24px

## Components

### Leather Button

**Role:** 主行动按钮

深棕填充、奶白 85% 文字、1px 暗金 45% 描边、2px 圆角、衬线 14px、字距 0.15em、padding 16px 40px，阴影 0 4px 10px 棕 20%。hover 时填充转焦棕、文字升到 100%、描边升到 80%、阴影扩到 18px；按下再暗一档。过渡 700ms ease-in-out。

- **Sizes:** padding 16px 40px; label 14px
- **States:** hover: umber fill, deeper shadow; active: darker still

### Paper Card

**Role:** 内容卡与书页块

奶白填充、2px 圆角、1px 暗金 25% 描边、内边距 40px，内阴影 0 0 35px 暗金 5% 制造纸面光晕。hover 时描边升到 55%、内阴影扩到 60px 且加深到 14%、右上角出现一层 20% 的暖黄径向光（radial-gradient 从右上）。过渡 1000ms ease-in-out。

### Gilt Rule

**Role:** 烫金分隔线

1px 暗金 40% 的横线，两端各收进 24px，中央可放一个 8px 的菱形装饰。用于区块之间的分隔，比留白更有书页感。

### Study Input

**Role:** 表单与检索输入

奶白 90% 填充、2px 圆角、1px 暗金 30% 描边、padding 14px 18px、16px 衬线。占位符焦棕 50%。聚焦时描边转暗金 80% 并加上 0 0 0 2px 的暗金 15% 外环。

### Wax Seal

**Role:** 印章式标记与徽标

48px 的圆形印章，填深棕或墨绿，内嵌 24px 的衬线单字母，边缘用 2px 暗金 40% 描边，外带 0 8px 16px 棕 30% 的短阴影。用于章节标记与「已读完」状态。

## Do's and Don'ts

### Do

- 深棕、墨绿、暗金三色主调
- 衬线字体承担全部文字
- 过渡 700 到 1000ms ease-in-out
- 卡片用内阴影做纸面光晕
- 字距放到 0.15em 像烫金
- 奶白作纸面

### Don't

- 不要用鲜艳的霓虹配色
- 不要用现代科技感设计
- 不要用过于花哨的动画
- 不要用冰冷的灰蓝调
- 不要用小圆角以外的夸张弧线
- 不要用快于 700ms 的过渡

## Surfaces

| Level | Name | Value | Purpose |
|---|---|---|---|
| 0 | Deep Brown | `#3d2b1f` | 页面底 |
| 1 | Forest | `#2d4a3e` | 次级区块 |
| 2 | Cream | `#f5f0e1` | 卡片与纸面 |

## Elevation

- **Paper inset:** `inset 0 0 35px rgba(139,115,85,0.05), 0 4px 14px rgba(61,43,31,0.05)`
- **Paper hover:** `inset 0 0 60px rgba(139,115,85,0.14), 0 8px 24px rgba(61,43,31,0.10)`
- **Button:** `0 4px 10px rgba(61,43,31,0.20)`

## Imagery

古典静物与建筑摄影：旧书、烛台、拱窗、石廊。必须暖调、低饱和、有明显的暗部。允许把照片处理成棕褐单色。不使用现代城市、科技产品与高饱和图像。

## Layout

上限 1080px、容器内边距 24px，区块间距 128px。允许非对称两栏（黄金比 1:1.618）与居中对称两种，但同一页只用一种。整页以深棕为底，纸面卡片浮在上面。

## Agent Prompt Guide

### Implementation Contract

- 以用户请求中的页面、用户任务和真实内容为依据，只实施指定范围；标明缺失的业务信息，不编造数据或能力。
- 先检查现有项目、技术栈与组件；沿用项目结构、路由和依赖，复用已有组件，不重建未要求的页面或功能。
- 沿用项目断点，调整窄屏与桌面的网格和留白；保留信息层级，避免意外横向溢出。
- 对本次涉及的交互，处理键盘焦点与减少动态效果；补齐适用的禁用、加载、空内容与错误状态。
- 完成后按项目现有脚本检查，仅报告实际运行的测试与视觉检查，并列出未验证项。

QUICK COLOR REFERENCE:

- text: `#f5f0e1`
- background: `#3d2b1f`
- card: `#f5f0e1`
- accent: `#8b7355`
- forest: `#2d4a3e`
- umber: `#5c4033`

EXAMPLE COMPONENT PROMPTS:

1. 做一个暗黑学院风卡片：奶白 #f5f0e1 填充、2px 圆角、1px rgba(139,115,85,0.25) 描边、内边距 40px、box-shadow inset 0 0 35px rgba(139,115,85,0.05), 0 4px 14px rgba(61,43,31,0.05)。标题 32px 衬线、字距 0.02em、色 #3d2b1f；正文 16px 衬线、行高 1.8。hover 时描边升到 rgba(139,115,85,0.55)、内阴影扩到 60px，transition 1000ms ease-in-out。页面底色 #3d2b1f。
