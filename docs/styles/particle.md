# 粒子系统 — 风格参考

> 深空里漂浮的点与连线：数据在流动，界面只是玻璃。

**Theme:** dark

粒子系统用一层漂浮的点与连接线表达「数据在流动」：深蓝黑底（#0a0e1a）、冷调强调色（蓝、青绿、紫）、粒子之间按距离阈值连线、靠近时脉冲加亮。界面本身要退到玻璃卡后面——半透明白加背景模糊，让粒子从卡片后面透出来。它的禁令很具体：不用暖色与土色、不用粗边框、不用与粒子动画抢视觉的图案、不用常规投影（阴影改用光晕）。粒子层必须尊重 reduced-motion 并在离屏时暂停。

## Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Blue Black | `#0a0e1a` | `--color-blue-black` | 页面底。带的略偏蓝，让粒子与连线在暗处仍有层次。 |
| Ink Teal | `#0f1419` | `--color-ink-teal` | 次级区块与玻璃卡的衬底，比底色再深一点。 |
| Mist | `#e0e8ff` | `--color-mist` | 主文字与最亮的粒子。带蓝调的近白。 |
| Data Blue | `#64c8ff` | `--color-data-blue` | 连接线与粒子主色，是「数据流动」的视觉主体。 |
| Pulse Teal | `#64ffc8` | `--color-pulse-teal` | 脉冲与「命中」反馈，比数据蓝更亮一档。 |
| Nebula Violet | `#a78bfa` | `--color-nebula-violet` | 远层粒子与次级强调，制造纵深。 |

## Typography

### Inter — 全站唯一字体。界面文字要保持克制，因为视觉主体是粒子层。

- **Substitute:** -apple-system, 'Helvetica Neue', system-ui, sans-serif
- **Weights:** 400, 500, 600
- **Sizes:** 12, 14, 17, 24, 36, 48
- **Line height:** 1.1 (display), 1.2 (headings), 1.6 (body)
- **Letter spacing:** -0.02em on display, 0.14em on uppercase labels

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|---|---|---|---|---|---|---|
| display | — | 600 | 48px | 1.1 | -0.02em | `--text-display` |
| heading | — | 600 | 36px | 1.2 | — | `--text-heading` |
| subheading | — | 500 | 24px | 1.3 | — | `--text-subheading` |
| body-lg | — | 400 | 17px | 1.55 | — | `--text-body-lg` |
| body | — | 400 | 14px | 1.6 | — | `--text-body` |
| label | — | 500 | 12px | 1.4 | 0.14em | `--text-label` |

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
| cards | 16px |
| buttons | 12px |
| inputs | 12px |
| particles | 999px |

- **Page max-width:** 1200px
- **Section gap:** 112px
- **Card padding:** 24px
- **Element gap:** 16px

## Components

### Particle Canvas

**Role:** 粒子层（签名组件）

一个满幅 canvas 固定在内容之后、页面底之上。粒子数按面积计算（每 10000px² 一个，上限 120 个），半径 1 到 3px，颜色取数据蓝或星云紫并带 8px 光晕。两粒子距离小于 140px 时连线，线宽 1px、不透明度按距离线性衰减到 0。靠近指针的粒子在 200px 半径内轻微外推。所有绘制在 requestAnimationFrame 内完成，离屏时用 IntersectionObserver 暂停，prefers-reduced-motion 时画一帧静态分布。

- **Sizes:** density 1 / 10000px², max 120

### Glass Card

**Role:** 内容卡与数据面板

雾白 6% 填充、16px 圆角、1px 雾白 12% 描边、内边距 24px，20px 背景模糊，外发光 0 0 40px 数据蓝 25%——绝不用常规投影。标题 24px/600 雾白，正文 14px 雾白 70%。hover 时填充升到 10%、发光扩到 60px。

### Glow Button

**Role:** 主行动按钮

数据蓝 12% 填充、1px 数据蓝 40% 描边、12px 圆角、雾白文字 15px/500、padding 12px 24px，外发光 0 0 24px 数据蓝 30%。hover 时填充升到 20%、发光扩到 40px、文字转纯白。过渡 200ms。

- **States:** hover: fill 20%, glow 40px

### Pulse Ring

**Role:** 脉冲指示与选中反馈

以元素中心为原点，扩散一圈 1px 的脉冲青环：半径从 8px 扩到 48px、不透明度从 100% 降到 0，时长 1.2s ease-out，循环或在点击时触发一次。同一屏最多三处同时脉冲。

### Nebula Field

**Role:** 远层星云背景

在粒子层之后再叠一层径向渐变（星云紫 8% 与数据蓝 6% 各一团，模糊 120px），位置随机但固定在首次渲染时，不随滚动移动。它提供纵深，不与粒子抢运动。

## Do's and Don'ts

### Do

- 深蓝黑底配冷调强调
- 粒子层离屏时暂停
- 连线透明度按距离衰减
- 纵深用光晕，不用常规阴影
- 内容压在玻璃卡上
- 尊重 reduced-motion

### Don't

- 不要用暖色或土色作主调
- 不要用粗边框
- 不要用与粒子竞争的图案
- 不要用浅色背景
- 不要用常规投影
- 不要超过三个同时脉冲

## Surfaces

| Level | Name | Value | Purpose |
|---|---|---|---|
| 0 | Blue Black | `#0a0e1a` | 页面底 |
| 1 | Glass | `rgba(224,232,255,0.06)` | 卡片与面板 |
| 2 | Glass Raised | `rgba(224,232,255,0.10)` | hover 与浮层 |

## Elevation

- **Glow:** `0 0 40px rgba(100,200,255,0.25)`
- **Glow strong:** `0 0 60px rgba(100,200,255,0.40)`
- **Never:** `conventional box shadows are forbidden`

## Imagery

图像即粒子层本身，不用摄影与插画。允许数据可视化（网络图、流向图）作为卡片内容。不使用静态背景图与几何装饰，它们会与粒子抢注意力。

## Layout

上限 1200px、容器内边距 24px，区块间距 112px。内容全部压在玻璃卡上，卡与卡之间留出 64px 让粒子层可见。首屏常为左文右空，让粒子在空白处流动。

## Agent Prompt Guide

### Implementation Contract

- 以用户请求中的页面、用户任务和真实内容为依据，只实施指定范围；标明缺失的业务信息，不编造数据或能力。
- 先检查现有项目、技术栈与组件；沿用项目结构、路由和依赖，复用已有组件，不重建未要求的页面或功能。
- 沿用项目断点，调整窄屏与桌面的网格和留白；保留信息层级，避免意外横向溢出。
- 对本次涉及的交互，处理键盘焦点与减少动态效果；补齐适用的禁用、加载、空内容与错误状态。
- 完成后按项目现有脚本检查，仅报告实际运行的测试与视觉检查，并列出未验证项。

QUICK COLOR REFERENCE:

- text: `#e0e8ff`
- background: `#0a0e1a`
- glass: `rgba(224,232,255,0.06)`
- blue: `#64c8ff`
- teal: `#64ffc8`
- violet: `#a78bfa`

EXAMPLE COMPONENT PROMPTS:

1. 做一个粒子系统首屏：页面底 #0a0e1a，底层一个满幅 canvas 画漂浮粒子（半径 1-3px、色 #64c8ff 带 8px 光晕），两粒子距离小于 140px 时连 1px 线并按距离衰减透明度，用 requestAnimationFrame 绘制、离屏时暂停、reduced-motion 时只画一帧。上层放一块玻璃卡：rgba(224,232,255,0.06) 填充、16px 圆角、1px rgba(224,232,255,0.12) 描边、24px 模糊、内边距 24px、box-shadow 0 0 40px rgba(100,200,255,0.25)。
