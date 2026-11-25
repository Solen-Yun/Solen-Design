# 垂直时间线布局 — 风格参考

> 一条贯穿的线，把时间钉在上面：左右交替，节奏由节点控制。

**Theme:** light

垂直时间线是把「先后」变成「上下」的布局：一条 2px 的连接线居中贯穿，节点按时间顺序排列，桌面上左右交替，移动端收成单侧。它有三条技术纪律——连接线不能断、节点尺寸必须一致、移动端必须放弃双侧交替。视觉上连接线要足够弱（板岩 25%），让节点和卡片承担注意力；节点 hover 时圆环放大并填充主色，卡片同时抬升，两者必须联动而不是只有卡片动。

## Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Slate | `#1e293b` | `--color-slate` | 标题与主文字。连接线也用它，但只有 25% 不透明度。 |
| Haze | `#f8fafc` | `--color-haze` | 页面底与交替区块。让白卡片浮起来。 |
| Primary Blue | `#3b82f6` | `--color-primary-blue` | 当前节点、主按钮与链接。时间线里表示「你在这里」。 |
| Done Green | `#10b981` | `--color-done-green` | 已经过去的节点与已完成里程碑。 |
| Pending Amber | `#f59e0b` | `--color-pending-amber` | 即将到来与需要注意的节点。 |
| Alert Red | `#ef4444` | `--color-alert-red` | 延期与失败的节点，出现即表示时间线有断点。 |

## Typography

### Inter — 全站唯一字体。时间与序号用 12px 全大写加宽字距，正文 15px。

- **Substitute:** system-ui, -apple-system, 'Segoe UI', sans-serif
- **Weights:** 400, 500, 600, 700
- **Sizes:** 12, 13, 15, 18, 22, 28
- **Line height:** 1.2 (display), 1.3 (headings), 1.6 (body)
- **Letter spacing:** -0.01em on display, 0.06em on uppercase labels

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|---|---|---|---|---|---|---|
| display | — | 700 | 28px | 1.2 | -0.01em | `--text-display` |
| heading | — | 600 | 22px | 1.3 | — | `--text-heading` |
| subheading | — | 600 | 18px | 1.35 | — | `--text-subheading` |
| body-lg | — | 500 | 15px | 1.5 | — | `--text-body-lg` |
| body | — | 400 | 13px | 1.55 | — | `--text-body` |
| label | — | 600 | 12px | 1.4 | 0.06em | `--text-label` |

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
| cards | 12px |
| buttons | 8px |
| nodes | 999px |

- **Page max-width:** 960px
- **Section gap:** 48px
- **Card padding:** 24px
- **Element gap:** 16px

## Components

### Timeline Node

**Role:** 时间线上的节点圆环

20px 圆、2px 板岩 30% 描边、白底，垂直对齐连接线。当前节点填主蓝并加 4px 的主蓝 20% 外环；过去节点填完成绿；待办保持白底。hover 时圆环放大到 1.25 并填充主色，与卡片联动（卡片同时上浮 2px）。过渡 150ms。

- **Sizes:** 20px diameter
- **States:** hover: scale 1.25, fill primary, card lifts

### Timeline Card

**Role:** 时间节点卡片

白底、12px 圆角、1px #e2e8f0 描边、内边距 24px，阴影 0 2px 8px。卡片宽度占单侧栏的 100%，与节点之间留 24px。上方 12px 全大写时间标签（灰色），下方 18px/600 标题与 13px 正文。hover 时上浮 2px、阴影扩到 24px。

### Connector Line

**Role:** 中央连接线

2px 宽、板岩 25%、居中贯穿整个时间线，用伪元素从第一节点画到最后一个节点，不允许断裂。若两个节点间距超过 96px，说明内容过长，应拆分而不是拉长线。

### Time Filter

**Role:** 时间筛选器

横向一排胶囊按钮，高 32px、padding 0 14px、12px/600。默认白底 1px 描边，选中态主蓝填白字。用于按年或阶段筛选节点，切换时节点列表做 200ms 的错峰淡入。

## Do's and Don'ts

### Do

- 连接线不许断裂或错位
- 节点尺寸全部一致
- 移动端收成单侧
- 每个节点必须有时间或序号
- 节点与卡片交互联动
- 节点间距 48 到 96px

### Don't

- 不要让连接线断开
- 不要用不一致的节点尺寸
- 不要在移动端保留双侧交替
- 不要省略时间标识
- 不要让内容过长拉长连接线
- 不要只让卡片动而节点不动

## Surfaces

| Level | Name | Value | Purpose |
|---|---|---|---|
| 0 | Haze | `#f8fafc` | 页面底 |
| 1 | Card White | `#ffffff` | 节点卡片 |

## Elevation

- **Card:** `0 2px 8px rgba(15,23,42,0.06)`
- **Card hover:** `0 8px 24px rgba(15,23,42,0.10)`
- **Current node:** `0 0 0 4px rgba(59,130,246,0.20)`

## Imagery

以图标与头像为主，允许每个节点配一张 16:10 的小图。不使用全幅背景图，时间线需要干净的纵向空间。

## Layout

上限 960px。桌面为中央线加左右交替（各 44% 宽、间隙 12%），节点在每张卡片靠近中线的一侧。移动端收成单侧左对齐，线移到最左 16px 处。节点之间至少 48px，最多不超过 96px。

## Agent Prompt Guide

### Implementation Contract

- 以用户请求中的页面、用户任务和真实内容为依据，只实施指定范围；标明缺失的业务信息，不编造数据或能力。
- 先检查现有项目、技术栈与组件；沿用项目结构、路由和依赖，复用已有组件，不重建未要求的页面或功能。
- 沿用项目断点，调整窄屏与桌面的网格和留白；保留信息层级，避免意外横向溢出。
- 对本次涉及的交互，处理键盘焦点与减少动态效果；补齐适用的禁用、加载、空内容与错误状态。
- 完成后按项目现有脚本检查，仅报告实际运行的测试与视觉检查，并列出未验证项。

QUICK COLOR REFERENCE:

- text: `#1e293b`
- background: `#f8fafc`
- card: `#ffffff`
- accent: `#3b82f6`
- done: `#10b981`
- border: `#e2e8f0`

EXAMPLE COMPONENT PROMPTS:

1. 做一个垂直时间线：中央 2px rgba(30,41,59,0.25) 连接线贯穿，节点为 20px 圆（2px rgba(30,41,59,0.3) 描边、白底），当前节点填 #3b82f6 并加 4px 的 rgba(59,130,246,0.2) 外环。卡片白底、12px 圆角、1px #e2e8f0 描边、内边距 24px、阴影 0 2px 8px rgba(15,23,42,0.06)。桌面左右交替（各 44% 宽、间隙 12%），移动端单侧左对齐。
