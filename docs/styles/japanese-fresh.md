# 日系清新风 — 风格参考

> 「間」是主要设计工具：留白比元素更重要，字重永远不到 400。

**Theme:** light

日系清新风建立在「間」（Ma）这个概念上：元素之间的空，和元素本身一样重要甚至更重要。所以它的首要参数是留白——区块之间 128 到 160px，元素之间 32px 起。第二条是「轻」：所有文字只用 200 与 300 字重，永不使用粗体，永不使用大写，因为大写在这套语言里是冒犯性的。第三条是「细」：边框只有 1px 的 30% 透明度，无可见阴影，元素像浮在纸上没有重量。动效 500ms，慢得像呼吸。

## Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Pale Blue | `#64b5f6` | `--color-pale-blue` | 唯一的彩色强调，用于链接与图标。必须小面积、低饱和地出现。 |
| Paper | `#fafaf8` | `--color-paper` | 页面画布。比纯白更柔和，接近和纸。 |
| Warm Line | `#d4d4cf` | `--color-warm-line` | 所有分隔线。只在 30% 不透明度下使用，绝不用冷灰。 |
| Mint | `#98d8c8` | `--color-mint` | 植物与自然语义，用于图标底与标签。 |
| Sakura | `#ffb7c5` | `--color-sakura` | 季节性的柔和强调，出现频率最低。 |
| Mist Blue | `#b8d4e3` | `--color-mist-blue` | 信息与天空语义，比主色更浅一档。 |

## Typography

### Inter — 全站唯一字体，只用 200 与 300。行高 1.9，字距微开，永不使用大写与粗体。

- **Substitute:** 'Hiragino Sans', 'PingFang SC', system-ui, sans-serif
- **Weights:** 200, 300
- **Sizes:** 12, 14, 16, 20, 26, 32
- **Line height:** 1.3 (display), 1.45 (headings), 1.9 (body)
- **Letter spacing:** 0.02em on display, 0.1em on uppercase labels

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|---|---|---|---|---|---|---|
| display | — | 200 | 32px | 1.3 | 0.02em | `--text-display` |
| heading | — | 300 | 26px | 1.4 | — | `--text-heading` |
| subheading | — | 300 | 20px | 1.5 | — | `--text-subheading` |
| body-lg | — | 300 | 16px | 1.9 | — | `--text-body-lg` |
| body | — | 300 | 14px | 1.9 | — | `--text-body` |
| label | — | 300 | 12px | 1.6 | 0.1em | `--text-label` |

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
| 160 | 160px | `--spacing-160` |

### Border Radius

| Element | Value |
|---|---|
| cards | 12px |
| buttons | 8px |
| inputs | 8px |
| icons | 999px |

- **Page max-width:** 960px
- **Section gap:** 160px
- **Card padding:** 32px
- **Element gap:** 32px

## Components

### Quiet Link

**Role:** 链接与次级行动

无填充、无边框、14px/300、字距 0.02em，文字下方一条 1px 的暖灰线（30% 不透明度）作为唯一提示。hover 时线条升到 60%、文字转淡蓝，过渡 500ms。无位移、无缩放。

- **States:** hover: line 60%, text pale blue

### Ma Card

**Role:** 内容卡与作品卡

纸白填充（与页面几乎同色）、12px 圆角、1px 暖灰线 30%、内边距 32px，无阴影。标题 26px/300，正文 14px/300 行高 1.9。hover 时边框升到 60%，不加阴影不上浮。

### Line Input

**Role:** 表单输入

透明底、仅底部 1px 暖灰线 30%、无左右边框、8px 圆角、padding 8px 4px、14px/300 字。聚焦时底线转淡蓝并保持 1px，不加外环、不改背景。

### Botanical Accent

**Role:** 植物线稿装饰

单线条植物图形（枝叶、茎），stroke 1px、颜色暖灰 40% 或薄荷 50%，尺寸 48px 到 96px。置于卡片角落或区块之间作为呼吸点，绝不覆盖文字。单屏不超过两处。

### Breath Section

**Role:** 区块容器

区块间距 160px，标题与正文之间 32px，正文行宽上限 32em。区块之间不加分隔线，只靠留白；需要分隔时用一条 1px 暖灰线 30%，横跨内容宽而非全宽。

## Do's and Don'ts

### Do

- 字重只用 200 与 300
- 永不使用大写
- 留白占页面的六成以上
- 边框只有 1px 的 30%
- 无可见阴影
- 过渡 500ms，慢如呼吸

### Don't

- 不要用粗体或半粗
- 不要用大写文字
- 不要用 2px 以上边框
- 不要用可见阴影
- 不要用深色背景
- 不要用快于 200ms 的过渡

## Surfaces

| Level | Name | Value | Purpose |
|---|---|---|---|
| 0 | Paper | `#fafaf8` | 页面画布 |
| 1 | Soft White | `#ffffff` | 卡片（几乎与底同色） |

## Elevation

- **None:** `none — a 1px line at 30% separates`
- **Hover line:** `1px solid rgba(212,212,207,0.60)`

## Imagery

自然光下的静物：一枝花、一碗水、和纸纹理、竹影。低饱和、留白极多、可只占画面三分之一。不使用高对比摄影、人物特写与装饰插画。

## Layout

上限 960px、容器内边距 32px，区块间距 160px。单栏偏左或非对称双栏，右侧常留大片空白。元素之间至少 32px，标题上下各 48px。整页的空白占比目标超过 60%。

## Agent Prompt Guide

### Implementation Contract

- 以用户请求中的页面、用户任务和真实内容为依据，只实施指定范围；标明缺失的业务信息，不编造数据或能力。
- 先检查现有项目、技术栈与组件；沿用项目结构、路由和依赖，复用已有组件，不重建未要求的页面或功能。
- 沿用项目断点，调整窄屏与桌面的网格和留白；保留信息层级，避免意外横向溢出。
- 对本次涉及的交互，处理键盘焦点与减少动态效果；补齐适用的禁用、加载、空内容与错误状态。
- 完成后按项目现有脚本检查，仅报告实际运行的测试与视觉检查，并列出未验证项。

QUICK COLOR REFERENCE:

- text: `#4a4a46`
- background: `#fafaf8`
- accent: `#64b5f6`
- mint: `#98d8c8`
- sakura: `#ffb7c5`
- border: `rgba(212,212,207,0.30)`

EXAMPLE COMPONENT PROMPTS:

1. 做一个日系清新卡片：背景 #fafaf8、12px 圆角、1px rgba(212,212,207,0.3) 描边、内边距 32px、无阴影。标题 26px/300 #4a4a46、字距 0.02em；正文 14px/300、行高 1.9。hover 时描边升到 rgba(212,212,207,0.6)，不位移不加阴影，transition 500ms。卡片之间留 160px 空白。
