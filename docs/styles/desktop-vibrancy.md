# 桌面毛玻璃 — 风格参考

> 三层深灰、系统级模糊、几乎没有装饰——像一台安静的桌面应用。

**Theme:** dark

这套风格模仿桌面系统的原生材质：窗口是三层深浅不同的深灰（#1c1c1e 最深、#2c2c2e 中间、#3a3a3c 最浅），侧边栏用 80% 不透明的深灰配大半径 backdrop-blur 做出通透感，所有分隔线都是 1px 白色 8% 到 12%，绝不加粗。标题用衬线体（Georgia）与正文的无衬线形成对话，这是它与普通暗色仪表盘的区别。动效只允许变颜色，200ms ease-out；任何位移或缩放都会让人意识到这是网页而不是系统。

## Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Deepest Grey | `#1c1c1e` | `--color-deepest` | 窗口底与侧边栏基色。整页最深的一层，其他灰都压在它上面。 |
| Mid Grey | `#2c2c2e` | `--color-mid` | 内容区与列表行。与最深灰差一档，用来区分侧边栏与主区。 |
| Light Grey | `#3a3a3c` | `--color-light-grey` | 工具栏、悬浮面板与需要再靠近观者一层的表面。 |
| System Blue | `#0a84ff` | `--color-system-blue` | 选中项、链接与主按钮。等同于桌面系统的强调色，只此一支。 |
| System Green | `#30d158` | `--color-system-green` | 成功、在线、已完成。与系统蓝同屏时只做小面积标记。 |
| System Orange | `#ff9f0a` | `--color-system-orange` | 警告与待处理。表示「需要你看一眼」，不表示失败。 |
| System Red | `#ff453a` | `--color-system-red` | 删除与不可逆操作。出现即意味着有代价。 |

## Typography

### Georgia — 窗口标题与大标题。衬线是这套暗色界面唯一的「人味」，缺了它就像普通仪表盘。

- **Substitute:** 'New York', 'Times New Roman', serif
- **Weights:** 400, 700
- **Sizes:** 24, 32, 40
- **Line height:** 1.15 (display), 1.25 (headings), 1.6 (body)
- **Letter spacing:** -0.01em on display, 0.02em on uppercase labels

### SF Pro Text — 正文、控件与菜单。字级偏小（11 到 17px），这是桌面应用的密度，不是网页。

- **Substitute:** -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif
- **Weights:** 400, 500, 600
- **Sizes:** 11, 12, 13, 15, 17
- **Line height:** 1.2 (display), 1.3 (headings), 1.5 (body)
- **Letter spacing:** -0.01em on display, 0.02em on uppercase labels

### SF Mono — 代码块、路径与数值。用于所有等宽内容，不做装饰用途。

- **Substitute:** ui-monospace, SFMono-Regular, Menlo, monospace
- **Weights:** 400, 500
- **Sizes:** 12, 13
- **Line height:** 1.4 (display), 1.4 (headings), 1.6 (body)
- **Letter spacing:** 0 on display, 0.02em on uppercase labels

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|---|---|---|---|---|---|---|
| display | Georgia | 700 | 40px | 1.15 | -0.01em | `--text-display` |
| heading | Georgia | 400 | 32px | 1.25 | — | `--text-heading` |
| subheading | SF Pro Text | 600 | 17px | 1.3 | — | `--text-subheading` |
| body | SF Pro Text | 400 | 15px | 1.5 | — | `--text-body` |
| body-sm | SF Pro Text | 400 | 13px | 1.5 | — | `--text-body-sm` |
| label | SF Pro Text | 500 | 11px | 1.4 | 0.02em | `--text-label` |
| code | SF Mono | 400 | 13px | 1.6 | — | `--text-code` |

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
| cards | 10px |
| buttons | 6px |
| inputs | 6px |
| panels | 14px |
| pills | 999px |

- **Page max-width:** 1280px
- **Section gap:** 48px
- **Card padding:** 16px
- **Element gap:** 8px

## Components

### Vibrancy Sidebar

**Role:** 侧边栏与浮层背景

深灰 80% 不透明填充、backdrop-blur 40px、仅右侧 1px 白色 10% 描边。宽 240px，内边距 12px。选中项用系统蓝 18% 底、圆角 6px；hover 用白色 8% 底。不做位移与缩放。

- **States:** hover: white 8%; selected: blue 18%

### System Button

**Role:** 主按钮与工具栏按钮

系统蓝填充、白字、6px 圆角、无描边、字级 13px/500、padding 6px 14px。hover 只把填充亮度提高 8%，按下降低 10%，过渡 200ms 且只动颜色。禁用态用白色 12% 填充配 40% 文字。

- **States:** hover: +8% brightness; active: -10%; disabled: 12% white fill

### List Row

**Role:** 设置项、文件列表与消息列表

高 44px、水平内边距 12px、圆角 6px、无背景。行与行之间用 1px 白色 8% 分隔线。hover 填充白色 6%，选中填充系统蓝 18%。左侧图标 16px、右侧说明文字 13px 白色 60%。

### Segmented Control

**Role:** 视图切换与筛选

轨道为白色 6% 填充、8px 圆角、高 28px；选中段为浅灰 #3a3a3c 填充、6px 圆角、内阴影 0 1px 0 白色 6%。字体 11px/500。切换只做颜色与位置过渡，200ms。

### Vibrancy Toolbar

**Role:** 窗口工具栏

高 52px、浅灰 #3a3a3c 填充、底部 1px 白色 10% 描边、无阴影。左侧窗口控件三个 12px 圆点（红黄绿），中间标题用衬线 13px，右侧放工具按钮。标题居中而非左对齐。

## Do's and Don'ts

### Do

- 只用三层深灰，层级靠明度差而不是描边
- 侧边栏与浮层用 80% 不透明加深模糊做通透
- 所有分隔线都是 1px 白色 8% 到 12%
- 标题用衬线，正文用系统无衬线
- 动效 200ms，只改颜色
- 密度按桌面应用设定：行高 44px、字级 11 到 17px

### Don't

- 不要用超过 1px 的描边
- 不要在动效里加位移或缩放
- 不要用玻璃拟态那种高饱和光斑，这里是系统材质不是装饰
- 不要把强调色用于大面积填充
- 不要用网页级的大字号破坏桌面密度
- 不要给面板加圆角超过 14px

## Surfaces

| Level | Name | Value | Purpose |
|---|---|---|---|
| 0 | Deepest | `#1c1c1e` | 窗口底与侧边栏 |
| 1 | Mid | `#2c2c2e` | 内容区与列表行 |
| 2 | Light Grey | `#3a3a3c` | 工具栏与浮动面板 |
| 3 | Vibrancy | `rgba(28,28,30,0.8)` | 配 backdrop-blur 的通透层 |

## Elevation

- **Panel:** `0 1px 0 rgba(255,255,255,0.08) inset, 0 20px 48px rgba(0,0,0,0.5)`
- **Popover:** `0 12px 32px rgba(0,0,0,0.55)`

## Imagery

以应用截图与窗口截图为主，浅色壁纸做窗口背景时才有通透感。允许网格与列表的真实密度。不使用插画、卡通图标或高饱和摄影。

## Layout

上限 1280px，左侧 240px 固定侧边栏加右侧内容区。行高 44px、区块间距 48px、内边距 16px，密度明显高于网页。工具栏固定顶部，内容区可独立滚动，侧边栏不随内容滚动。

## Agent Prompt Guide

### Implementation Contract

- 以用户请求中的页面、用户任务和真实内容为依据，只实施指定范围；标明缺失的业务信息，不编造数据或能力。
- 先检查现有项目、技术栈与组件；沿用项目结构、路由和依赖，复用已有组件，不重建未要求的页面或功能。
- 沿用项目断点，调整窄屏与桌面的网格和留白；保留信息层级，避免意外横向溢出。
- 对本次涉及的交互，处理键盘焦点与减少动态效果；补齐适用的禁用、加载、空内容与错误状态。
- 完成后按项目现有脚本检查，仅报告实际运行的测试与视觉检查，并列出未验证项。

QUICK COLOR REFERENCE:

- text: `rgba(255,255,255,0.92)`
- background: `#1c1c1e`
- panel: `#2c2c2e`
- toolbar: `#3a3a3c`
- accent: `#0a84ff`
- border: `rgba(255,255,255,0.10)`

EXAMPLE COMPONENT PROMPTS:

1. 做一个桌面毛玻璃风侧边栏：宽 240px，背景 rgba(28,28,30,0.8)，backdrop-filter: blur(40px)，右侧 1px rgba(255,255,255,0.10) 描边。列表行高 44px、圆角 6px、内边距 12px，hover 填充 rgba(255,255,255,0.08)，选中填充 rgba(10,132,255,0.18)。所有过渡 200ms 且只改颜色。
