# 侘寂风 — 风格参考

> 不完美、不恒常、不完整：让材质和时间替设计说话。

**Theme:** light

侘寂是日本美学里对「不完美」的接纳：器物的缺口、纸的泛黄、墙的斑驳都被视为价值而不是缺陷。落到界面上，它表现为暖纸底（#f2ede4）、墨色文字（#3a3a3a）、衬线字体、极细的分隔线（1px 且只有 30% 不透明度），以及大量到近乎奢侈的留白。它禁止鲜艳与高饱和、禁止厚重阴影与粗边框、禁止密集排列、禁止装饰性动画与弹跳——任何「表现欲」都是对它的冒犯。

## Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Ink | `#3a3a3a` | `--color-ink` | 全部文字。中深灰而非纯黑，长时间看更松。 |
| Paper | `#f2ede4` | `--color-paper` | 页面底。泛黄的暖米色，像放了很久的和纸。 |
| Moss | `#8a9a7b` | `--color-moss` | 第一辅色，像石阶上的苔，用于次级强调。 |
| Sand | `#b5a78c` | `--color-sand` | 区块底与分隔，用于不引入对比地分区。 |
| Tea | `#8b6f4e` | `--color-tea` | 温暖的棕，用于需要人气的元素与木器语义。 |
| Slate Teal | `#799d91` | `--color-slate-teal` | 冷侧的一笔，用于水、陶釉与安静状态。 |

## Typography

### Noto Serif SC — 全站衬线，只用 300 与 400。行高 1.9，字距微开，让字与字之间也有空隙。

- **Substitute:** 'Songti SC', Georgia, serif
- **Weights:** 300, 400
- **Sizes:** 14, 16, 19, 24, 32, 42
- **Line height:** 1.25 (display), 1.4 (headings), 1.9 (body)
- **Letter spacing:** 0.02em on display, 0.24em on uppercase labels

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|---|---|---|---|---|---|---|
| display | Noto Serif SC | 300 | 42px | 1.25 | 0.02em | `--text-display` |
| heading | Noto Serif SC | 400 | 32px | 1.35 | — | `--text-heading` |
| subheading | Noto Serif SC | 400 | 24px | 1.45 | — | `--text-subheading` |
| body-lg | Noto Serif SC | 400 | 19px | 1.85 | — | `--text-body-lg` |
| body | Noto Serif SC | 300 | 16px | 1.9 | — | `--text-body` |
| label | Noto Serif SC | 400 | 14px | 1.7 | 0.24em | `--text-label` |

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
| 144 | 144px | `--spacing-144` |
| 192 | 192px | `--spacing-192` |

### Border Radius

| Element | Value |
|---|---|
| cards | 2px |
| buttons | 2px |
| images | 0 |

- **Page max-width:** 980px
- **Section gap:** 192px
- **Card padding:** 40px
- **Element gap:** 36px

## Components

### Hairline Rule

**Role:** 极细分隔线（核心结构）

1px、色 #d4cdc5 的 30%、横跨内容宽并在两端各收进 10%。整条线必须弱到「几乎看不见但又能感觉到」，它是这套风格唯一的结构工具。

### Quiet Button

**Role:** 行动按钮

透明底、1px 墨色 25% 描边、2px 圆角、衬线 14px、字距 0.24em、padding 14px 36px，无阴影。hover 时描边升到 45%、文字从 80% 升到 100%，元素完全不动。过渡 600ms ease-out。

- **States:** hover: border 45%, text 100%; no motion

### Paper Card

**Role:** 内容卡

提亮一档的纸色填充、2px 圆角、1px 沙 30% 描边、内边距 40px，无阴影。标题 32px/400，正文 16px/300 行高 1.9。hover 时只把描边升到 50% 与填充提亮 2%，过渡 800ms。

### Object Image

**Role:** 器物图片容器

零圆角、无边框、无阴影。图片可以是不规则的器物（陶碗、旧木、石），允许边缘不齐。图片与文字之间 36px。不叠加任何滤镜或遮罩，让材质自己呈现。

### Silence Block

**Role:** 留白区块

一个 192px 到 320px 高的空区块，不含任何内容，作为真实元素存在。在侘寂里「什么都没有」本身就是一种内容，用来把前后的东西隔开并放大。

## Do's and Don'ts

### Do

- 暖纸底，不用纯白
- 衬线字体，行高 1.9
- 分隔线 1px 且只有 30%
- 留白到近乎奢侈
- 允许不完美与不对称
- 过渡 600 到 800ms，元素不动

### Don't

- 不要用鲜艳高饱和色
- 不要用厚重阴影或粗边框
- 不要密集排列元素
- 不要用装饰性动画与弹跳
- 不要用纯白背景
- 不要加滤镜与遮罩破坏材质

## Surfaces

| Level | Name | Value | Purpose |
|---|---|---|---|
| 0 | Paper | `#f2ede4` | 页面底 |
| 1 | Lifted Paper | `#f7f3ec` | 卡片 |
| 2 | Sand Block | `rgba(181,167,140,0.22)` | 次级区块 |

## Elevation

- **None:** `none — shadows break the quiet`
- **Max allowed:** `0 1px 2px rgba(58,58,58,0.04)`

## Imagery

器物摄影：陶器、旧木、石、枯枝、麻布。必须自然光、低饱和、有磨损痕迹。允许不对称与不完整构图。不使用高饱和、棚拍打光与装饰插画。

## Layout

上限 980px、容器内边距 32px，区块间距 192px。版面允许不完整与偏置：元素不必贴齐网格，留白可以不对称。禁止密集排列，一屏原则上不超过三个信息块。

## Agent Prompt Guide

### Implementation Contract

- 以用户请求中的页面、用户任务和真实内容为依据，只实施指定范围；标明缺失的业务信息，不编造数据或能力。
- 先检查现有项目、技术栈与组件；沿用项目结构、路由和依赖，复用已有组件，不重建未要求的页面或功能。
- 沿用项目断点，调整窄屏与桌面的网格和留白；保留信息层级，避免意外横向溢出。
- 对本次涉及的交互，处理键盘焦点与减少动态效果；补齐适用的禁用、加载、空内容与错误状态。
- 完成后按项目现有脚本检查，仅报告实际运行的测试与视觉检查，并列出未验证项。

QUICK COLOR REFERENCE:

- text: `#3a3a3a`
- background: `#f2ede4`
- card: `#f7f3ec`
- moss: `#8a9a7b`
- sand: `#b5a78c`
- tea: `#8b6f4e`

EXAMPLE COMPONENT PROMPTS:

1. 做一个侘寂风卡片：背景 #f7f3ec（提亮一档的纸色）、2px 圆角、1px rgba(181,167,140,0.3) 描边、内边距 40px、无阴影。标题 32px Noto Serif SC 400、色 #3a3a3a；正文 16px/300、行高 1.9。卡片之间留 192px 空白。hover 时描边升到 rgba(181,167,140,0.5)、transition 800ms ease-out，元素不位移。页面底色 #f2ede4。
