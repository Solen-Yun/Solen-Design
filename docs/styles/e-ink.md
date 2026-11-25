# 电子纸 — 风格参考

> 暖纸白承载墨色信息，灰阶和点阵只在需要分组的地方出现。

**Theme:** light

电子纸风格把读屏、列表和简单数据面板当作一张克制的印刷页来排：暖纸白为底，墨色文字作主层级，四档中性灰负责分区、标注与图表。重点是数字列对齐、短标签、细规则与阅读顺序。局部点阵可以提示选中区或呈现灰阶图表，但正文一直保持纯色和高对比度。配色只有一个色相端点以外的温暖纸底；状态使用文字和形状共同表达。布局对窄屏、键盘焦点和减少动态效果有明确规则。它是一种面向浏览器UI的视觉风格参考，不是电子纸硬件模拟，也不代表某种屏幕刷新率或位深已经验证。

## Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Ink | `#20211e` | `--e-ink-text` | 正文、标题、主要操作和焦点轮廓。最重的线与字。 |
| Warm Paper | `#f5f3ea` | `--e-ink-paper` | 页面底色和输入框填充。它不是泛黄滤镜，所有正文都要在这里保持清楚。 |
| Graphite | `#555750` | `--e-ink-muted` | 次级正文、图表线、元数据和简短标签。它仍须有足够对比度。 |
| Rule Gray | `#bab9b0` | `--e-ink-rule` | 卡片边框、分隔线和非关键网格。不用它写正文。 |
| Reading Surface | `#e6e4da` | `--e-ink-panel` | 列表分组、表格行或被选中的阅读卡片。 |

## Typography

### Public Sans — 沿用系统里已有的无衬线字体，正文保持常规字重，标题最多到 700，不引入专有屏幕字体。

- **Substitute:** Inter, system-ui, sans-serif
- **Weights:** 400, 500, 600, 700
- **Sizes:** 12, 13, 16, 20, 28, 36
- **Line height:** 1.2 (display), 1.3 (headings), 1.55 (body)
- **Letter spacing:** -0.02em on display, 0.06em on uppercase labels

### System Mono — 日期、时间、数值、单位和简短状态。只在需要对齐的字段使用。

- **Substitute:** ui-monospace, SFMono-Regular, Consolas, monospace
- **Weights:** 400, 600
- **Sizes:** 11, 12, 14, 16, 24
- **Line height:** 1.2 (display), 1.35 (headings), 1.45 (body)
- **Letter spacing:** 0 on display, 0.04em on uppercase labels

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|---|---|---|---|---|---|---|
| display | sans | 600 | 36px | 1.2 | -0.02em | `--text-display` |
| heading | sans | 600 | 28px | 1.3 | -0.01em | `--text-heading` |
| subheading | sans | 500 | 20px | 1.35 | — | `--text-subheading` |
| body | sans | 400 | 16px | 1.55 | — | `--text-body` |
| body-compact | sans | 400 | 13px | 1.5 | — | `--text-body-compact` |
| data | mono | 600 | 16px | 1.35 | 0 | `--text-data` |
| label | sans | 600 | 12px | 1.4 | 0.06em | `--text-label` |

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
| 20 | 20px | `--spacing-20` |
| 24 | 24px | `--spacing-24` |
| 32 | 32px | `--spacing-32` |
| 48 | 48px | `--spacing-48` |

### Border Radius

| Element | Value |
|---|---|
| cards | 0 |
| buttons | 0 |
| inputs | 0 |
| badges | 0 |

- **Page max-width:** 1120px
- **Section gap:** 40px
- **Card padding:** 20px
- **Element gap:** 8px

## Components

### Ink Action

**Role:** 页面的单一主要行动

纸底上的墨色填充，零圆角，12–16px 内边距。标签用 14px/600；键盘焦点用 2px 墨色轮廓并与边缘保留 2px 间隔。不要加入图标当作唯一提示。

- **Sizes:** min-height 44px; horizontal padding 12–24px
- **States:** default: ink on paper; hover: panel gray; active: pressed gray; disabled: 60% opacity plus disabled semantics; focus-visible: 2px ink outline

### Reading Row

**Role:** 书目、列表和摘要项

每行用一条 1px 细线分隔，序号与数字用等宽字体；次级描述换行，不缩到 12px 以下。选中行同时显示“当前”标签和左侧墨色条。

- **States:** default: paper surface; selected: reading gray, ink rule and label; offline: explicit text plus a hollow marker

### Paper Field

**Role:** 搜索、筛选和短文本输入

暖纸填充，1px 中性边框，最小高度 44px；占位文字仍用可读灰度，不能把提示做成近乎消失的浅灰。提供可见 label 和 2px 键盘焦点轮廓。

- **States:** default: paper fill; focus-visible: 2px ink outline; disabled: explicit disabled semantics and 60% opacity

### Halftone Mark

**Role:** 示例背景纹理或有限灰阶图表填充

只把小点阵用于装饰性图块或图表区域，点距至少 5px；文字与可交互元素保持纯色，避免灰点破坏字符边缘。需要深浅层次时，应同时保留标注和图例。

### Status Marker

**Role:** 进度、在线状态与提醒

灰阶色块与实心/空心几何标记配合，旁边有“完成”“离线”等文字。圆点不是唯一状态载体，错误或警告不借用未定义的颜色。

## Do's and Don'ts

### Do

- 先写屏幕目的，再选最少的卡片、状态或数据。
- 数字列、单位和日期保持对齐；数字标清单位。
- 每个状态同时给出形状或文字，不靠颜色。
- 用细规则和局部点阵分组，把纹理留在正文之外。
- 为交互控件保留至少 44px 触控高度和明显键盘焦点。
- 在窄屏按阅读顺序合并列并保留可读字号。
- 数据示例、占位图和硬件信息明确标注来源或示例状态。

### Don't

- 不要把屏幕截图、传感器数值或演示内容说成实时硬件数据。
- 不要把重要文字放进点阵、背景纹理或低对比度灰色。
- 不要只用灰阶深浅表示错误、警告、离线或已选状态。
- 不要使用发光、玻璃模糊、连续闪烁或大范围渐变。
- 不要假定 1-bit 量化、文字锐化或屏幕刷新已经完成。
- 不要引入未确认许可证的像素字体、图标或设备品牌图。

## Surfaces

| Level | Name | Value | Purpose |
|---|---|---|---|
| 0 | Warm Paper | `#f5f3ea` | Page background, long-form reading surface. |
| 1 | Reading Surface | `#e6e4da` | Grouped list rows, static cards and table cells. |
| 2 | Pressed Area | `#bab9b0` | Pressed state, chart marker and secondary rule, with a text or shape cue. |

## Elevation

- **Flat:** `none; use a single divider or offset hatch.`
- **Selected:** `none; use a 2px ink outline and a text marker.`

## Imagery

优先使用留白、可读数据表与少量线性图形。点阵只用于局部图表，不复制他人品牌标识、字体、设备外壳或宣传图像。需要预览真实图像时，提示代理先确认许可，并保留原始来源。

## Layout

常规桌面内容上限 1120px；读屏数据面板按示例 800×480 比例组织，窄屏切为单列和明确的阅读顺序。优先一至两列对齐网格，关键数字用等宽字体；表格提供窄屏卡片/滚动策略，而不是挤压正文。

## Agent Prompt Guide

### Implementation Contract

- 以用户请求中的页面、用户任务和真实内容为依据，只实施指定范围；标明缺失的业务信息，不编造数据或能力。
- 先检查现有项目、技术栈与组件；沿用项目结构、路由和依赖，复用已有组件，不重建未要求的页面或功能。
- 沿用项目断点，调整窄屏与桌面的网格和留白；保留信息层级，避免意外横向溢出。
- 对本次涉及的交互，处理键盘焦点与减少动态效果；补齐适用的禁用、加载、空内容与错误状态。
- 完成后按项目现有脚本检查，仅报告实际运行的测试与视觉检查，并列出未验证项。

QUICK COLOR REFERENCE:

- ink: `#20211e`
- paper: `#f5f3ea`
- graphite: `#555750`
- rule: `#bab9b0`
- readingSurface: `#e6e4da`

EXAMPLE COMPONENT PROMPTS:

1. 先读取仓库现有组件与 design.md，再为目标页面挑选必要的数据行。使用暖纸 #f5f3ea、墨色 #20211e 和规范中定义的灰阶，不加新依赖或假传感器数据；要示例时清楚标注 SAMPLE。以 800×480 面板作为设计参考，但实际网页仍须桌面分列、手机单列。将数字、单位、日期对齐，把纹理只留给图表底纹；离线、警告和选中状态同时显示文字或几何标记。给交互提供 44px 触控高度、键盘焦点样式和 prefers-reduced-motion 降级。除非接入真实设备并测试，不声称电子纸、1-bit 阈值或刷新能力已验证。
2. 实现样例设备状态时，请提供纯 HTML 示例数据而不是运行中硬件 API。添加“数据示例”标记；每列包含名称、数值、单位、状态和更新时间；一条细规则分组；仪表不能只用颜色或点阵表示。验证 390px 窄屏、键盘顺序和减弱动态效果偏好，不覆盖已有仓库组件。
