# 视差滚动 — 风格参考

> 每一屏都是一张定住的背景，内容从上面滑过去。

**Theme:** dark

视差滚动把页面切成若干个 100vh 的区块，每个区块有自己的固定背景（bg-fixed），内容在其上滚动，于是前景与背景产生速度差，深景被模拟出来。可读性靠两层处理：区块内铺一层从深海军蓝 80% 到底部透明的渐变遮罩，内容本身再包一层 90% 白色的半透明卡片。表现力集中在「景深」而不是位移——交互优先改变不透明度与模糊，避免大幅度平移导致眩晕。过渡区块用渐变把两块背景缝起来。

## Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Deep Navy | `#1e3a5f` | `--color-deep-navy` | 遮罩与深色区块的基调。视差区块的暗部全靠它。 |
| Snow | `#f8fafc` | `--color-snow` | 内容卡填充与亮色区块底。以 90% 不透明度叠在背景上。 |
| Primary Blue | `#3b82f6` | `--color-primary-blue` | 主行动与链接，在暗色背景上要提到这一档才够亮。 |
| Pale Blue | `#93c5fd` | `--color-pale-blue` | 次级强调与图标，用于深蓝底上的细节。 |
| Sky | `#0ea5e9` | `--color-sky` | 渐变末端与高亮，用于区块之间的过渡带。 |
| Violet | `#c559f0` | `--color-violet` | 唯一暖偏色，用于区分相邻区块的情绪，出现频率最低。 |

## Typography

### Inter — 全站唯一字体。区块标题 80px 配紧字距，正文 16px 配 1.65 行高，全屏区块里读起来才不费劲。

- **Substitute:** -apple-system, 'Segoe UI', system-ui, sans-serif
- **Weights:** 400, 500, 600, 700
- **Sizes:** 12, 14, 16, 20, 32, 56, 80
- **Line height:** 1.02 (display), 1.15 (headings), 1.65 (body)
- **Letter spacing:** -0.03em on display, 0.08em on uppercase labels

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|---|---|---|---|---|---|---|
| display | — | 700 | 80px | 1.02 | -0.03em | `--text-display` |
| heading-lg | — | 700 | 56px | 1.05 | -0.025em | `--text-heading-lg` |
| heading | — | 600 | 32px | 1.15 | — | `--text-heading` |
| subheading | — | 500 | 20px | 1.35 | — | `--text-subheading` |
| body-lg | — | 400 | 18px | 1.65 | — | `--text-body-lg` |
| body | — | 400 | 16px | 1.65 | — | `--text-body` |
| label | — | 500 | 12px | 1.4 | 0.08em | `--text-label` |

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

### Border Radius

| Element | Value |
|---|---|
| cards | 24px |
| buttons | 999px |
| inputs | 12px |
| media | 0 |

- **Page max-width:** 1120px
- **Section gap:** 0px
- **Card padding:** 48px
- **Element gap:** 24px

## Components

### Parallax Section

**Role:** 全屏区块容器

min-height: 100vh、背景图使用 background-attachment: fixed、background-size: cover、background-position: center。上覆一层从深海军蓝 80% 到底部透明的线性渐变。内容垂直居中，最大宽度 1120px、左右内边距 32px。移动端关闭 fixed（性能与视觉都会崩），改为普通滚动。

- **Sizes:** 100vh per section

### Content Card

**Role:** 区块内的内容容器

雪白 90% 填充、12px 模糊、24px 圆角、内边距 48px，阴影 0 24px 60px 黑 18%。标题与正文都压在这张卡上以保证可读。hover 时阴影扩到 80px、上浮 4px，过渡 400ms ease-out。

### Transition Band

**Role:** 区块之间的缝

高 160px 的纯渐变带，从上一区块的末端色过渡到下一区块的起始色，中间可加一层 40px 模糊。它不承载内容，唯一职责是让两块固定背景不出现硬边。

### Scroll Cue

**Role:** 首屏滚动提示

首屏底部居中放一条 1px 白色 50% 的竖线，高 48px，下方配 12px 全大写 0.08em 的白 70% 文字。线与文字做 2.4 秒的往复淡入淡出，只改不透明度，不做位移。

## Do's and Don'ts

### Do

- 每屏 100vh，背景 fixed
- 遮罩从 80% 渐变到透明
- 内容包在 90% 白卡里保证可读
- 区块之间用 160px 渐变带缝合
- 交互优先改不透明度与模糊
- 移动端关闭 fixed

### Don't

- 不要让背景与内容以相同速度滚动
- 不要用超过 0.5 的视差比
- 不要在大幅位移上做动效
- 不要在移动端保留 fixed
- 不要在一屏里放两个背景
- 不要让文字直接压在图上

## Surfaces

| Level | Name | Value | Purpose |
|---|---|---|---|
| 0 | Fixed backdrop | `image, bg-fixed` | 每屏的固定背景 |
| 1 | Navy veil | `rgba(30,58,95,0.80)` | 压在背景上的渐变遮罩 |
| 2 | Snow card | `rgba(248,250,252,0.90)` | 内容卡 |

## Elevation

- **Card:** `0 24px 60px rgba(15,23,42,0.18)`
- **Card hover:** `0 32px 80px rgba(15,23,42,0.24)`

## Imagery

每屏一张全幅背景：风景、建筑、产品特写。背景必须有明确的暗部来承载遮罩与文字，而且要能自然衔接下一屏。不使用白底图与插画。

## Layout

页面由若干 100vh 区块纵向串起，区块之间用 160px 渐变带缝合。内容宽度上限 1120px，垂直居中。每屏只讲一件事，标题加一段正文加一个行动，不超过三个元素。

## Agent Prompt Guide

### Implementation Contract

- 以用户请求中的页面、用户任务和真实内容为依据，只实施指定范围；标明缺失的业务信息，不编造数据或能力。
- 先检查现有项目、技术栈与组件；沿用项目结构、路由和依赖，复用已有组件，不重建未要求的页面或功能。
- 沿用项目断点，调整窄屏与桌面的网格和留白；保留信息层级，避免意外横向溢出。
- 对本次涉及的交互，处理键盘焦点与减少动态效果；补齐适用的禁用、加载、空内容与错误状态。
- 完成后按项目现有脚本检查，仅报告实际运行的测试与视觉检查，并列出未验证项。

QUICK COLOR REFERENCE:

- text: `#1e293b`
- backdrop: `#1e3a5f`
- veil: `rgba(30,58,95,0.80)`
- card: `rgba(248,250,252,0.90)`
- accent: `#3b82f6`
- secondary: `#93c5fd`

EXAMPLE COMPONENT PROMPTS:

1. 做一个视差区块：min-height 100vh、background-image 用 background-attachment: fixed、background-size: cover、background-position: center。上覆一层 linear-gradient(to bottom, rgba(30,58,95,0.8), transparent)。内容放在一张 90% 白卡里（24px 圆角、内边距 48px、backdrop-blur 12px、阴影 0 24px 60px rgba(15,23,42,0.18)），垂直居中，最大宽度 1120px。
