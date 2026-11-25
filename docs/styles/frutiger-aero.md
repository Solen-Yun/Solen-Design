# Frutiger Aero — 风格参考

> 天蓝玻璃、水滴与草叶：一个相信科技会让世界更清透的年代。

**Theme:** light

Frutiger Aero 是 2004 到 2012 年的系统美学：那一代桌面系统、早期手机系统与游戏主机的默认皮肤。它的配方固定——天蓝渐变作底（#87CEEB 向 #5FB3CC 过渡），面板是半透明白玻璃配 1px 亮边与顶部高光，圆角大而圆润（16 到 24px），再点缀水滴、气泡、草叶与光晕。按压是要有弹性的：active 时缩到 0.95，像果冻被按了一下，这个「jelly press」是它与后来扁平化最明显的分歧。

## Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Sky | `#87ceeb` | `--color-sky` | 渐变起点与主背景。整套风格的情绪由它决定。 |
| Deep Sky | `#5fb3cc` | `--color-deep-sky` | 渐变终点与按钮底。比天蓝低两档，用来压住画面。 |
| Glass White | `rgba(255,255,255,0.55)` | `--color-glass` | 面板填充。必须配 1px 亮边与顶部高光，否则会显得脏。 |
| Pale Mist | `#e0f2fe` | `--color-pale-mist` | 卡片内层与次级面板，用于在同一玻璃上再分一层。 |
| Grass | `#34d399` | `--color-grass` | 自然语义与成功状态，也是草叶装饰的颜色。 |
| Bright Blue | `#7dd3fc` | `--color-bright-blue` | 高光、链接与光晕，用于让元素显得在发光。 |

## Typography

### Segoe UI — 全站唯一字体，字重偏细（300 到 600）。人文无衬线是这套风格的「清透」来源。

- **Substitute:** Frutiger, 'Helvetica Neue', system-ui, sans-serif
- **Weights:** 300, 400, 600
- **Sizes:** 12, 14, 16, 20, 28, 40
- **Line height:** 1.2 (display), 1.3 (headings), 1.6 (body)
- **Letter spacing:** -0.01em on display, 0.04em on uppercase labels

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|---|---|---|---|---|---|---|
| display | — | 600 | 40px | 1.2 | -0.01em | `--text-display` |
| heading | — | 600 | 28px | 1.3 | — | `--text-heading` |
| subheading | — | 400 | 20px | 1.4 | — | `--text-subheading` |
| body-lg | — | 400 | 16px | 1.6 | — | `--text-body-lg` |
| body | — | 400 | 14px | 1.6 | — | `--text-body` |
| label | — | 300 | 12px | 1.4 | 0.04em | `--text-label` |

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

- **Page max-width:** 1120px
- **Section gap:** 80px
- **Card padding:** 24px
- **Element gap:** 16px

## Components

### Jelly Button

**Role:** 主行动按钮

深天蓝填充、白字、16px 圆角、1px 白 60% 描边，阴影 0 4px 12px 深蓝 30% 加 inset 0 1px 0 白 80%。15px/600、padding 10px 24px。hover 时填充提亮 6%、阴影扩到 16px；按下时缩到 0.95 并压暗填充，这是果冻按压。过渡 200ms ease-out。焦点环用白色 2px 加 2px offset，offset 色取天蓝以在蓝底上可见。

- **Sizes:** padding 10px 24px; label 15px
- **States:** hover: brighter, wider shadow; active: scale 0.95, darker fill

### Aero Panel

**Role:** 卡片与窗口面板

55% 白玻璃填充、24px 圆角、1px 白 60% 描边、内边距 24px，阴影 0 8px 24px 深蓝 22% 加 inset 0 1px 0 白 90%。面板内可再叠一层淡蓝雾色的小卡。hover 时填充升到 65%、阴影扩到 32px。

### Gloss Input

**Role:** 搜索与表单输入

白 70% 填充、16px 圆角、1px 白 70% 描边，内阴影 inset 0 2px 4px 深蓝 15% 制造轻微凹陷，padding 10px 16px、14px 字。聚焦时描边转亮蓝并加 2px 亮蓝 40% 外环。

### Gloss Nav

**Role:** 顶部导航

高 64px、白 45% 玻璃、16px 模糊、底部 1px 白 40% 描边、无阴影。字标 16px/600，链接 14px、间距 24px，hover 时链接下方出现 2px 亮蓝下划线。右侧放一个果冻按钮。

### Bubble Ornament

**Role:** 水滴与气泡装饰

24px 到 96px 的圆，径向渐变从左上白 90% 到亮蓝 20%，加 inset 0 -3px 6px 深蓝 25% 与 inset 0 3px 6px 白 90%，形成透明水泡。斜向置于面板角落，可半透出背景。单屏不超过五个。

## Do's and Don'ts

### Do

- 天蓝渐变铺满整个页面
- 玻璃必须配亮边与顶部高光
- 圆角 16 到 24px
- 按压用 0.95 的果冻缩放
- 焦点环 offset 取底色，保证可见
- 用气泡与草叶点缀自然感

### Don't

- 不要用深色或黑色背景
- 不要用锐角与硬边几何
- 不要用霓虹或刺眼色
- 不要用等宽字体
- 不要用无玻璃效果的哑光面
- 不要用 0.98 的轻按压，果冻要更明显

## Surfaces

| Level | Name | Value | Purpose |
|---|---|---|---|
| 0 | Sky Gradient | `linear-gradient(#a8dcf0, #87ceeb, #5fb3cc)` | 页面底 |
| 1 | Glass | `rgba(255,255,255,0.55)` | 面板与卡片 |
| 2 | Pale Mist | `#e0f2fe` | 内层卡片 |

## Elevation

- **Glass panel:** `0 8px 24px rgba(60,130,170,0.22), inset 0 1px 0 rgba(255,255,255,0.90)`
- **Glass hover:** `0 12px 32px rgba(60,130,170,0.28), inset 0 1px 0 rgba(255,255,255,0.95)`
- **Button:** `0 4px 12px rgba(60,130,170,0.30), inset 0 1px 0 rgba(255,255,255,0.80)`

## Imagery

天空、水面、草叶、玻璃与水滴的高清照片或渲染。允许 40% 到 60% 的不透明度叠在渐变上。不使用深色照片、噪点纹理与扁平插画。

## Layout

上限 1120px、容器内边距 24px，区块间距 80px。整页以天蓝渐变铺底，面板浮在上面，允许面板重叠 8px 制造窗口层次。图标与按钮都带光泽，没有纯平的区域。

## Agent Prompt Guide

### Implementation Contract

- 以用户请求中的页面、用户任务和真实内容为依据，只实施指定范围；标明缺失的业务信息，不编造数据或能力。
- 先检查现有项目、技术栈与组件；沿用项目结构、路由和依赖，复用已有组件，不重建未要求的页面或功能。
- 沿用项目断点，调整窄屏与桌面的网格和留白；保留信息层级，避免意外横向溢出。
- 对本次涉及的交互，处理键盘焦点与减少动态效果；补齐适用的禁用、加载、空内容与错误状态。
- 完成后按项目现有脚本检查，仅报告实际运行的测试与视觉检查，并列出未验证项。

QUICK COLOR REFERENCE:

- text: `#1a4a5e`
- background: `#87ceeb`
- glass: `rgba(255,255,255,0.55)`
- accent: `#34d399`
- highlight: `#7dd3fc`
- border: `rgba(255,255,255,0.60)`

EXAMPLE COMPONENT PROMPTS:

1. 做一个 Frutiger Aero 玻璃面板：背景 rgba(255,255,255,0.55)、24px 圆角、1px rgba(255,255,255,0.6) 描边、内边距 24px、box-shadow 0 8px 24px rgba(60,130,170,0.22), inset 0 1px 0 rgba(255,255,255,0.9)、backdrop-filter blur(12px)。页面底色用 linear-gradient(#a8dcf0, #87ceeb, #5fb3cc)。按钮 active 时 scale(0.95) 做出果冻按压。
