# 开发者平台风 — 风格参考

> 灰度做结构，蓝只做交互，颜色永远带语义。

**Theme:** light

开发者平台风是开发者工具的默认语言：绝大部分界面由灰阶组成（白、#f6f8fa、#d0d7de、#656d76、#1f2328 五档），蓝色 #0969da 只用于可点击的东西，绿黄红三色只有语义（通过、警告、失败）。圆角统一 6px，边框统一 1px #d0d7de，阴影几乎为零。代码块用等宽字体加浅灰底，是它最重要的识别元素。它禁止渐变、禁止重阴影、禁止非语义的装饰色、禁止衬线字体、也禁止动感十足的动画。

## Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Link Blue | `#0969da` | `--color-link-blue` | 唯一的主色，只用于链接、主按钮与选中状态。 |
| White | `#ffffff` | `--color-white` | 卡片与内容区底。与浅灰底形成唯一的分层手段。 |
| Canvas Grey | `#f6f8fa` | `--color-canvas-grey` | 页面底与代码块底。整套界面的地基。 |
| Border Grey | `#d0d7de` | `--color-border-grey` | 所有 1px 边框与分隔线，统一只用这一个值。 |
| Muted Grey | `#656d76` | `--color-muted-grey` | 元数据、时间戳与说明文字。 |
| Ink | `#1f2328` | `--color-ink` | 标题与正文。带一点蓝的深灰，比纯黑柔和。 |
| Success | `#1f883d` | `--color-success` | 通过、已合并、成功，语义专用。 |
| Warning | `#9a6700` | `--color-warning` | 待处理与需要注意，语义专用。 |
| Danger | `#cf222e` | `--color-danger` | 失败、删除与冲突，语义专用。 |

## Typography

### Inter — 界面文字，字级偏小（12 到 16px 为主），极少超过 24px。

- **Substitute:** -apple-system, 'Segoe UI', system-ui, sans-serif
- **Weights:** 400, 500, 600
- **Sizes:** 12, 13, 14, 16, 20, 24
- **Line height:** 1.25 (display), 1.3 (headings), 1.5 (body)
- **Letter spacing:** -0.01em on display, 0.02em on uppercase labels

### JetBrains Mono — 代码块、分支名、commit hash 与命令行。等宽是这套风格的识别核心。

- **Substitute:** ui-monospace, SFMono-Regular, Menlo, monospace
- **Weights:** 400, 500
- **Sizes:** 12, 13, 14
- **Line height:** 1.4 (display), 1.4 (headings), 1.5 (body)
- **Letter spacing:** 0 on display, 0.02em on uppercase labels

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|---|---|---|---|---|---|---|
| heading-lg | — | 600 | 24px | 1.25 | — | `--text-heading-lg` |
| heading | — | 600 | 20px | 1.3 | — | `--text-heading` |
| subheading | — | 600 | 16px | 1.4 | — | `--text-subheading` |
| body | — | 400 | 14px | 1.5 | — | `--text-body` |
| body-sm | — | 400 | 13px | 1.5 | — | `--text-body-sm` |
| label | — | 500 | 12px | 1.4 | 0.02em | `--text-label` |

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
| cards | 6px |
| buttons | 6px |
| inputs | 6px |
| pills | 999px |

- **Page max-width:** 1280px
- **Section gap:** 24px
- **Card padding:** 16px
- **Element gap:** 8px

## Components

### Primary Button

**Role:** 主行动按钮

通过绿 #1f883d 填充、白字、6px 圆角、1px rgba(31,35,40,0.15) 描边、无阴影，14px/500、padding 5px 16px。hover 时填充加深到 #1a7f37；按下内阴影 inset 0 1px 0 rgba(31,35,40,0.10)。过渡 80ms。注意主按钮是绿色而链接是蓝色，两者分工不混。

- **Sizes:** padding 5px 16px; label 14px
- **States:** hover: darker fill; active: inset shadow

### Repo Card

**Role:** 仓库卡与内容卡

白底、6px 圆角、1px #d0d7de 描边、内边距 16px、无阴影。标题 16px/600 用交互蓝（可点击），描述 14px 主文字，底部一行 12px 次灰放语言色点、star 数与更新时间。hover 时描边颜色不变，只让标题加下划线。

### Code Block

**Role:** 代码块（识别核心）

浅灰 #f6f8fa 底、6px 圆角、1px #d0d7de 描边、内边距 16px，字体 JetBrains Mono 13px、行高 1.5、可横向滚动。语法高亮只用五到六种色，且不改变字重。右上角可放一个复制按钮（12px、次灰）。

### State Label

**Role:** 状态标签与徽标

999px 全圆角、语义色 10% 底、语义色文字、1px 同色 25% 描边、12px/500、padding 2px 10px。通过用绿、待处理用黄、失败用红、信息用蓝。每个标签必须带文字，颜色只是辅助。

### Side Nav

**Role:** 侧边导航与筛选

白底或透明、宽 240px、无右边框。项目高 32px、6px 圆角、14px 字，选中项用 #f6f8fa 底加 2px 交互蓝左边条。分组标题 12px/600 次灰，上方间距 16px。

## Do's and Don'ts

### Do

- 五档灰阶承担结构
- 蓝色只用于可点击元素
- 绿黄红只表达语义
- 圆角统一 6px，边框统一 #d0d7de
- 代码块用等宽加浅灰底
- 动效 80ms 以内，无弹跳

### Don't

- 不要用渐变背景或彩色装饰
- 不要用重阴影
- 不要用非语义的装饰色
- 不要用衬线字体
- 不要用过大字号或过宽间距
- 不要用动感十足的动画

## Surfaces

| Level | Name | Value | Purpose |
|---|---|---|---|
| 0 | Canvas Grey | `#f6f8fa` | 页面底 |
| 1 | White | `#ffffff` | 卡片与列表容器 |

## Elevation

- **None:** `none — 1px #d0d7de borders only`
- **Overlay:** `0 8px 24px rgba(31,35,40,0.12)`

## Imagery

几乎没有图像。允许头像 20 到 40px、图标 16px、语言色点 8px。不使用插画、摄影与背景图，界面本身就是内容。

## Layout

上限 1280px、容器内边距 16px，区块间距 24px，卡片间距 16px。典型结构是左侧 240px 导航加右侧内容区，内容区里列表项行高 56px。密度接近桌面应用，留白只出现在区块之间。

## Agent Prompt Guide

### Implementation Contract

- 以用户请求中的页面、用户任务和真实内容为依据，只实施指定范围；标明缺失的业务信息，不编造数据或能力。
- 先检查现有项目、技术栈与组件；沿用项目结构、路由和依赖，复用已有组件，不重建未要求的页面或功能。
- 沿用项目断点，调整窄屏与桌面的网格和留白；保留信息层级，避免意外横向溢出。
- 对本次涉及的交互，处理键盘焦点与减少动态效果；补齐适用的禁用、加载、空内容与错误状态。
- 完成后按项目现有脚本检查，仅报告实际运行的测试与视觉检查，并列出未验证项。

QUICK COLOR REFERENCE:

- text: `#1f2328`
- background: `#f6f8fa`
- card: `#ffffff`
- primary: `#0969da`
- border: `#d0d7de`
- muted: `#656d76`

EXAMPLE COMPONENT PROMPTS:

1. 做一个开发者平台风仓库卡：白底、6px 圆角、1px #d0d7de 描边、内边距 16px、无阴影。标题 16px/600 #0969da，描述 14px #1f2328，底部一行 12px #656d76 放语言色点、star 数与更新时间。hover 时只给标题加下划线。页面底色 #f6f8fa。代码块用 #f6f8fa 底、13px 等宽字体、1px #d0d7de 描边、6px 圆角。
