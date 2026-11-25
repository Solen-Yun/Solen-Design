# 固定侧边栏布局 — 风格参考

> 一条 240px 的常驻侧边栏，主区只负责滚动内容。

**Theme:** light

固定侧边栏是一种结构风格而非视觉风格：导航常驻左侧 240px（收起时 64px），主内容区独立滚动，顶栏只放搜索与账号。视觉上它几乎是中性的——白卡、浅描边、一级阴影、8 到 12px 圆角，全部为结构与可扫描性让路。选中项用主色 10% 底配主色文字，hover 只加深到 6%，150ms 内完成。密度是关键：侧边栏项目高 40px、主区卡片内边距 24px。

## Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Slate Ink | `#1e293b` | `--color-slate-ink` | 侧边栏底色、标题与主按钮。深而不黑，避免长时间使用疲劳。 |
| Paper Grey | `#f8fafc` | `--color-paper-grey` | 主内容区底色。白卡浮在它上面。 |
| Card White | `#ffffff` | `--color-card-white` | 卡片、面板与浮层。全站唯一的高光面。 |
| Primary Blue | `#3b82f6` | `--color-primary-blue` | 选中项、链接与焦点环。不做大面积填充。 |
| Status Green | `#10b981` | `--color-status-green` | 在线与成功状态，小面积圆点或徽标。 |
| Alert Red | `#ef4444` | `--color-alert-red` | 错误与未读数，只用于计数与图标。 |

## Typography

### Inter — 全站唯一字体，字级偏小（13 到 14px 为主），这是应用密度而非网页密度。

- **Substitute:** system-ui, -apple-system, 'Segoe UI', sans-serif
- **Weights:** 400, 500, 600
- **Sizes:** 12, 13, 14, 16, 20, 28
- **Line height:** 1.2 (display), 1.3 (headings), 1.55 (body)
- **Letter spacing:** -0.01em on display, 0.04em on uppercase labels

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|---|---|---|---|---|---|---|
| display | — | 600 | 28px | 1.2 | -0.01em | `--text-display` |
| heading | — | 600 | 20px | 1.3 | — | `--text-heading` |
| body-lg | — | 500 | 16px | 1.5 | — | `--text-body-lg` |
| body | — | 400 | 14px | 1.55 | — | `--text-body` |
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
| 64 | 64px | `--spacing-64` |

### Border Radius

| Element | Value |
|---|---|
| cards | 12px |
| buttons | 8px |
| inputs | 8px |
| nav-items | 8px |

- **Page max-width:** 1440px
- **Section gap:** 32px
- **Card padding:** 24px
- **Element gap:** 8px

## Components

### Sidebar Rail

**Role:** 常驻侧边导航

宽 240px（收起 64px）、石墨蓝填充、白字 70%、固定不随内容滚动。项目高 40px、8px 圆角、水平内边距 12px、图标 18px、图标与文字间距 10px。选中项用白 10% 底配纯白文字，hover 用白 6% 底，过渡 150ms。分区之间留 24px 并加一条 1px 白 8% 分隔线。

- **Sizes:** 240px / 64px collapsed; item 40px
- **States:** hover: 6% white; selected: 10% white + white text

### Content Card

**Role:** 主区内容卡与列表容器

白底、12px 圆角、1px #e4e4e7 描边、内边距 24px、阴影 0 1px 2px。标题 20px/600，正文 14px 灰。hover 上浮 2px、阴影升到 0 8px 20px，过渡 150ms。

### Search Field

**Role:** 顶栏搜索

纸灰底、1px #e4e4e7 描边、8px 圆角、高 36px、左内边距 36px 放 16px 图标、13px 字。聚焦时描边转主蓝并加 2px 主蓝 20% 外环。

### Toolbar

**Role:** 顶栏

高 56px、白底、底部 1px #e4e4e7 描边、无阴影。左侧面包屑 13px，中间搜索框最大 360px，右侧图标按钮 32px 见方、8px 圆角。

## Do's and Don'ts

### Do

- 侧边栏固定，内容区独立滚动
- 侧边栏项目 40px 高，保持应用密度
- 选中态用主色 10% 底而不是实色
- 卡片用 1px 描边加一级阴影
- 顶栏只放搜索、面包屑与账号
- 过渡 150ms，快而不突兀

### Don't

- 不要让侧边栏跟随内容滚动
- 不要把主内容塞进侧边栏
- 不要用超过 12px 的卡片圆角
- 不要在顶栏堆超过三个动作
- 不要用大面积主色填充
- 不要在侧边栏用两套以上图标风格

## Surfaces

| Level | Name | Value | Purpose |
|---|---|---|---|
| 0 | Sidebar Ink | `#1e293b` | 常驻导航栏 |
| 1 | Paper Grey | `#f8fafc` | 内容区底色 |
| 2 | Card White | `#ffffff` | 卡片与面板 |

## Elevation

- **Card:** `0 1px 2px rgba(15,23,42,0.06)`
- **Hover:** `0 8px 20px rgba(15,23,42,0.08)`
- **Sidebar:** `0 0 0 1px rgba(15,23,42,0.06)`

## Imagery

以界面截图、头像与图标为主，几乎不出现摄影。侧边栏允许 18px 线性图标，主区允许产品截图。不使用装饰性插画与大图，它们会挤掉结构感。

## Layout

左侧 240px 固定栏加右侧自适应内容区，顶栏 56px 固定在内容区顶部。内容区最大宽度 1200px、内边距 24px，卡片间距 16px。断点 1024px 以下侧边栏收起为 64px，768px 以下改为抽屉。

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
- rail: `#1e293b`
- accent: `#3b82f6`
- border: `#e4e4e7`

EXAMPLE COMPONENT PROMPTS:

1. 做一个固定侧边栏布局：左侧 240px 石墨蓝 #1e293b 固定栏（白字 70%，项目高 40px、8px 圆角、选中白 10% 底），右侧内容区底色 #f8fafc、顶部 56px 白色工具栏（底部 1px #e4e4e7）。内容区卡片白底、12px 圆角、1px #e4e4e7 描边、内边距 24px、阴影 0 1px 2px rgba(15,23,42,0.06)。所有过渡 150ms。
