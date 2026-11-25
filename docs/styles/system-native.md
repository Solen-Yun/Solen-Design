# 系统原生风 — 风格参考

> 大量留白、一颗系统蓝、慢到刚好的动效：让产品自己说话。

**Theme:** light

系统原生风的核心不是元素，而是比例：内容占的面积远小于留白，产品图是唯一的主角。底色用偏冷的浅灰（#f5f5f7）代替纯白，卡片比它白一档浮起来。颜色只允许一支系统蓝（#0071e3）用于行动，其余全是灰阶。圆角克制而统一，按钮全圆角、卡片 24px、输入框 12px。动效是这套风格的签名：500ms 与一段缓入缓出的曲线，hover 时轻微上浮、阴影扩散，快一点就变成普通网页，慢一点就拖沓。

## Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Native Black | `#000000` | `--color-native-black` | 正文、标题与深色满屏区块。深色区块用来把产品图推到最前。 |
| Native Grey | `#f5f5f7` | `--color-native-grey` | 页面画布。比纯白柔一档，让白色卡片有依托。 |
| Card White | `#ffffff` | `--color-card-white` | 卡片与浮层填充。只在灰底之上出现。 |
| System Blue | `#0071e3` | `--color-system-blue` | 唯一强调色：主 CTA、链接与选中态。一屏只允许一处。 |
| Success Green | `#34c759` | `--color-success-green` | 成功与在线状态，小面积标记。 |
| Alert Red | `#ff3b30` | `--color-alert-red` | 错误与删除，出现即代表不可撤销。 |

## Typography

### SF Pro Display — 全站唯一字体。大标题用 600 与紧字距，正文 400 保持中性，字级偏大（17px 起）。

- **Substitute:** -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif
- **Weights:** 400, 500, 600, 700
- **Sizes:** 12, 14, 17, 24, 40, 56, 80
- **Line height:** 1.05 (display), 1.15 (headings), 1.55 (body)
- **Letter spacing:** -0.025em on display, 0.01em on uppercase labels

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|---|---|---|---|---|---|---|
| display | — | 600 | 80px | 1.05 | -0.025em | `--text-display` |
| heading-lg | — | 600 | 56px | 1.1 | -0.02em | `--text-heading-lg` |
| heading | — | 600 | 40px | 1.15 | -0.015em | `--text-heading` |
| subheading | — | 500 | 24px | 1.3 | — | `--text-subheading` |
| body-lg | — | 400 | 17px | 1.55 | — | `--text-body-lg` |
| body | — | 400 | 14px | 1.5 | — | `--text-body` |
| label | — | 400 | 12px | 1.4 | 0.01em | `--text-label` |

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
| 192 | 192px | `--spacing-192` |

### Border Radius

| Element | Value |
|---|---|
| cards | 24px |
| buttons | 999px |
| inputs | 12px |
| product-media | 18px |

- **Page max-width:** 1080px
- **Section gap:** 128px
- **Card padding:** 32px
- **Element gap:** 24px

## Components

### Pill Button

**Role:** 主行动，例：Buy、Learn more

系统蓝填充、白字、999px 全圆角、无描边。字级 17px、字重 500、padding 12px 24px，阴影 0 4px 14px 蓝 30%。hover 时填充提亮到 #0077ed、上浮 2px、阴影扩到 20px 40%；按下缩放 0.96。过渡 500ms，缓动 cubic-bezier(0.25, 0.1, 0.25, 1)。

- **Sizes:** padding 12px 24px; label 17px
- **States:** hover: lift 2px, brighter fill; active: scale 0.96

### Product Card

**Role:** 产品卡与功能卡

白底、24px 圆角、内边距 32px、阴影 0 4px 12px 4%。内容居中：上方 192px 见方的产品图（18px 圆角、原生灰底），下面 24px/600 标题与 14px 灰字。hover 时上浮 4px、阴影扩到 0 20px 40px 8%、产品图放大 1.05，过渡 500ms。

### Search Field

**Role:** 搜索与输入

原生灰底、12px 圆角、无描边、padding 12px 16px、17px 字。聚焦时加 2px 系统蓝焦点环，不改变尺寸。

- **States:** focus: 2px blue ring

### Vibrancy Nav

**Role:** 顶部导航

高 48px、白色 80% 不透明、backdrop-blur 20px、底部 1px 灰 50% 描边。链接 12px、字重 400、间距 32px，hover 转 50% 灰。右侧最多一个纯文字 CTA。

## Do's and Don'ts

### Do

- 留白优先，元素稀疏到近乎空
- 只用一支系统蓝，#0071e3
- 动效 500ms，缓入缓出
- 按钮全圆角、卡片 24px、输入 12px
- 标题 600 字重配紧字距
- 背景用原生灰而不是纯白

### Don't

- 不要用多个强调色
- 不要用渐变背景
- 不要用重阴影
- 不要把内容挤在一起
- 不要用装饰性插画或图标墙
- 不要让圆角混用超过三档

## Surfaces

| Level | Name | Value | Purpose |
|---|---|---|---|
| 0 | Native Grey | `#f5f5f7` | 页面画布 |
| 1 | Card White | `#ffffff` | 卡片与浮层 |
| 2 | Black Stage | `#000000` | 产品满屏区 |

## Elevation

- **Card rest:** `0 4px 12px rgba(0,0,0,0.04)`
- **Card hover:** `0 20px 40px rgba(0,0,0,0.08)`
- **Button glow:** `0 4px 14px rgba(0,113,227,0.30)`

## Imagery

产品渲染与实拍是唯一的主角：满屏、居中、背景纯净（黑、白或原生灰）。允许缓慢的视差与缩放。不使用插画、图标墙、渐变背景或人物特写。

## Layout

上限 1080px，容器内边距 24px。区块间距 128px 起，留白至少是内容高度的一半。每屏只讲一件事：一个标题、一句副标题、两个链接。产品区可满屏且反色。

## Agent Prompt Guide

### Implementation Contract

- 以用户请求中的页面、用户任务和真实内容为依据，只实施指定范围；标明缺失的业务信息，不编造数据或能力。
- 先检查现有项目、技术栈与组件；沿用项目结构、路由和依赖，复用已有组件，不重建未要求的页面或功能。
- 沿用项目断点，调整窄屏与桌面的网格和留白；保留信息层级，避免意外横向溢出。
- 对本次涉及的交互，处理键盘焦点与减少动态效果；补齐适用的禁用、加载、空内容与错误状态。
- 完成后按项目现有脚本检查，仅报告实际运行的测试与视觉检查，并列出未验证项。

QUICK COLOR REFERENCE:

- text: `#1d1d1f`
- background: `#f5f5f7`
- card: `#ffffff`
- accent: `#0071e3`
- muted: `#86868b`
- dark: `#000000`

EXAMPLE COMPONENT PROMPTS:

1. 做一个产品卡：白底、24px 圆角、内边距 32px、阴影 0 4px 12px rgba(0,0,0,0.04)。上方放 192px 见方产品图（18px 圆角、#f5f5f7 底），下面 24px/600 标题 #1d1d1f 与 14px #86868b 说明，再下面一个 #0071e3 全圆角按钮（17px/500、padding 12px 24px）。hover 时卡片上浮 4px、阴影扩到 0 20px 40px rgba(0,0,0,0.08)、产品图放大 1.05，过渡 500ms cubic-bezier(0.25,0.1,0.25,1)。
