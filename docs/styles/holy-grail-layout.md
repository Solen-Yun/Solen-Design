# 圣杯布局 — 风格参考

> 页头、三栏、页脚：网页布局的原型，二十五年没过时。

**Theme:** light

圣杯布局是最早被讨论的网页结构：固定页头、等高的三栏中段（左导航、中间主内容、右侧边栏）、固定页脚。它的价值不在视觉而在分配——中间列用弹性宽度吃掉剩余空间，两侧列固定宽度，页头页脚不随内容滚动。视觉必须保持中性：白卡、1px 描边、一级阴影、8 到 12px 圆角，全部为可读性让路。中段三列高度必须相等，靠 grid 的 stretch 而不是 min-height 硬撑。

## Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Slate Ink | `#1e293b` | `--color-slate-ink` | 标题、主按钮与页头文字。结构型布局需要一支足够稳的深色。 |
| Haze | `#f1f5f9` | `--color-haze` | 中段三列的共同底色。白卡浮在它上面。 |
| Card White | `#ffffff` | `--color-card-white` | 页头、页脚、卡片与侧栏面板的填充。 |
| Primary Blue | `#3b82f6` | `--color-primary-blue` | 主行动、链接与焦点环。三栏里唯一允许的强调色。 |
| Success | `#10b981` | `--color-success` | 状态与完成标记，只用于徽标。 |
| Warning | `#f59e0b` | `--color-warning` | 提醒与待办，用于侧栏的计数与提示。 |
| Danger | `#ef4444` | `--color-danger` | 错误与删除，出现即表示代价。 |

## Typography

### Inter — 全站唯一字体，字级偏应用化（13 到 14px 为主）。三栏并存时字太大反而难读。

- **Substitute:** system-ui, -apple-system, 'Segoe UI', sans-serif
- **Weights:** 400, 500, 600
- **Sizes:** 12, 13, 14, 16, 20, 28
- **Line height:** 1.2 (display), 1.3 (headings), 1.6 (body)
- **Letter spacing:** -0.01em on display, 0.04em on uppercase labels

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|---|---|---|---|---|---|---|
| display | — | 600 | 28px | 1.2 | -0.01em | `--text-display` |
| heading | — | 600 | 20px | 1.3 | — | `--text-heading` |
| body-lg | — | 500 | 16px | 1.5 | — | `--text-body-lg` |
| body | — | 400 | 14px | 1.6 | — | `--text-body` |
| body-sm | — | 400 | 13px | 1.55 | — | `--text-body-sm` |
| label | — | 500 | 12px | 1.4 | 0.04em | `--text-label` |

## Spacing & Layout

**Base unit:** 4px
**Density:** compact

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

### Border Radius

| Element | Value |
|---|---|
| cards | 12px |
| buttons | 8px |
| inputs | 8px |
| panels | 12px |

- **Page max-width:** 1440px
- **Section gap:** 24px
- **Card padding:** 20px
- **Element gap:** 12px

## Components

### Three Column Grid

**Role:** 中段三列容器

grid-template-columns: 240px minmax(0, 1fr) 280px；列间距 24px；三列高度由 grid 的 stretch 拉齐，禁止用 min-height 硬撑。窄于 1024px 时右栏折叠到主内容下方，窄于 768px 时左栏变为抽屉。

- **Sizes:** 240px / fluid / 280px

### Content Card

**Role:** 主内容卡

白底、12px 圆角、1px #f1f5f9 描边、内边距 20px、阴影 0 1px 2px。标题 20px/600，正文 14px。hover 上浮 2px、阴影升到 0 4px 12px，过渡 150ms ease-out。

### Rail Panel

**Role:** 侧栏面板（左导航与右信息栏）

白底、12px 圆角、无描边（靠底色差区分）、内边距 16px。分组标签 12px 全大写 0.04em 灰字，项目高 32px、8px 圆角、hover 浅雾底。选中项用主蓝 8% 底配主蓝文字。

### Sticky Header

**Role:** 页头

高 56px、白底、底部 1px #e2e8f0 描边、阴影 0 1px 2px，sticky 固定在顶部。左侧字标 16px/600，中间导航 13px、间距 24px，右侧一个主按钮与一个头像。

### Fixed Footer

**Role:** 页脚

高 48px、白底、顶部 1px #e2e8f0 描边、12px 灰字。左侧版本号，右侧三到四条链接，与主内容同为 1440px 上限对齐。

## Do's and Don'ts

### Do

- 中列弹性、两侧固定
- 三列等高用 grid stretch
- 页头页脚固定，不随内容滚动
- 焦点环 2px 带 offset
- 动效不超过 200ms
- 窄屏折叠右栏，再窄转抽屉

### Don't

- 不要用 min-height 硬撑三列高度
- 不要在主内容列加大幅位移动画
- 不要让三列各自滚动加页面滚动
- 不要在三栏里塞第四栏
- 不要省略页头的 sticky
- 不要用超过 12px 的面板圆角

## Surfaces

| Level | Name | Value | Purpose |
|---|---|---|---|
| 0 | Haze | `#f1f5f9` | 中段底色 |
| 1 | Card White | `#ffffff` | 卡片、侧栏面板 |
| 2 | Header White | `#ffffff` | 页头与页脚（带下边框） |

## Elevation

- **Card:** `0 1px 2px rgba(15,23,42,0.06)`
- **Card hover:** `0 4px 12px rgba(15,23,42,0.08)`
- **Header:** `0 1px 2px rgba(15,23,42,0.04)`

## Imagery

以图标、头像与产品截图为主，几乎没有大图。允许在主内容列放一张宽度铺满的截图。不使用全幅摄影、背景纹理与插画，它们会挤压三栏的可用宽度。

## Layout

页头 56px、中段三栏（240px / 弹性 / 280px）、页脚 48px，整页上限 1440px、内边距 24px。中段最小高度为视口高度减去页头页脚。三栏各自独立滚动是可选项，但默认整页滚动。

## Agent Prompt Guide

### Implementation Contract

- 以用户请求中的页面、用户任务和真实内容为依据，只实施指定范围；标明缺失的业务信息，不编造数据或能力。
- 先检查现有项目、技术栈与组件；沿用项目结构、路由和依赖，复用已有组件，不重建未要求的页面或功能。
- 沿用项目断点，调整窄屏与桌面的网格和留白；保留信息层级，避免意外横向溢出。
- 对本次涉及的交互，处理键盘焦点与减少动态效果；补齐适用的禁用、加载、空内容与错误状态。
- 完成后按项目现有脚本检查，仅报告实际运行的测试与视觉检查，并列出未验证项。

QUICK COLOR REFERENCE:

- text: `#1e293b`
- background: `#f1f5f9`
- card: `#ffffff`
- accent: `#3b82f6`
- muted: `#64748b`
- border: `#e2e8f0`

EXAMPLE COMPONENT PROMPTS:

1. 做一个圣杯布局：外层 min-h-screen flex-col。页头 56px sticky top-0 白底、底部 1px #e2e8f0。中段 grid-template-columns: 240px minmax(0,1fr) 280px、gap 24px、flex-1。三列都用 grid 的 stretch 等高。页脚 48px 白底、顶部 1px #e2e8f0。卡片白底、12px 圆角、内边距 20px、阴影 0 1px 2px rgba(15,23,42,0.06)。
