# 发布会主题 — 风格参考

> 纯黑舞台，产品自己发光，一屏一个主张，滚动即播放。

**Theme:** dark

发布会主题模仿科技产品发布页：舞台是纯黑（#000000），没有边框与纹理，产品图自己发光，留白本身就是张力。整页只有一支强调色——电蓝 #2997FF，其余全是黑白灰。它的签名是滚动擦洗的帧序列：一个 sticky 画布按滚动进度播放预渲染的产品动画，一屏只讲一个产品、一句主张。技术约束比视觉更硬——帧必须用 IntersectionObserver 懒加载而不是一载就全部预载、滚动处理器里绝不能读 offsetTop 或 getBoundingClientRect（会 layout thrash）、关键信息绝不能烘焙进帧图、必须尊重 prefers-reduced-motion 并给 devicePixelRatio 封顶。

## Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Stage Black | `#000000` | `--color-stage-black` | 页面底。纯黑无纹理，让产品图的边缘消失，形成无限深的舞台。 |
| Near White | `#f5f5f7` | `--color-near-white` | 主要文字与高对比元素。比纯白柔，长时间看不刺眼。 |
| Mid Grey | `#86868b` | `--color-mid-grey` | 次级文字、说明与规格。永远是第三层级。 |
| Electric Blue | `#2997ff` | `--color-electric-blue` | 唯一强调色：链接、主 CTA 与关键数字。全页不得出现第二种彩色。 |
| Card Graphite | `#1d1d1f` | `--color-card-graphite` | 卡片与信息块。只比舞台亮一点，用来在不破坏纯黑的前提下分区。 |

## Typography

### SF Pro Display — 全站唯一字体。大标题 56 到 80px 配 -0.035em 的紧字距，小标签 12px 全大写 0.2em 宽字距——两种极端并置是这套风格的声音。

- **Substitute:** -apple-system, 'Helvetica Neue', system-ui, sans-serif
- **Weights:** 400, 500, 600, 700
- **Sizes:** 12, 14, 17, 21, 28, 40, 56, 80
- **Line height:** 1.02 (display), 1.1 (headings), 1.5 (body)
- **Letter spacing:** -0.035em on display, 0.2em on uppercase labels

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|---|---|---|---|---|---|---|
| display | — | 700 | 80px | 1.02 | -0.035em | `--text-display` |
| heading-lg | — | 700 | 56px | 1.05 | -0.03em | `--text-heading-lg` |
| heading | — | 600 | 40px | 1.1 | -0.025em | `--text-heading` |
| subheading | — | 500 | 28px | 1.2 | -0.02em | `--text-subheading` |
| body-lg | — | 400 | 21px | 1.45 | — | `--text-body-lg` |
| body | — | 400 | 17px | 1.5 | — | `--text-body` |
| label | — | 500 | 12px | 1.4 | 0.2em | `--text-label` |

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
| 160 | 160px | `--spacing-160` |
| 240 | 240px | `--spacing-240` |

### Border Radius

| Element | Value |
|---|---|
| cards | 24px |
| buttons | 999px |
| inputs | 12px |
| media | 0 |

- **Page max-width:** 1120px
- **Section gap:** 240px
- **Card padding:** 32px
- **Element gap:** 24px

## Components

### Buy Button

**Role:** 主行动按钮

电蓝填充、白字、999px 全圆角、无描边，17px/500、紧字距、padding 12px 24px。hover 时填充转 #0071e3；按下缩到 0.98。过渡 300ms。全页只有一个这样的按钮。

- **Sizes:** padding 12px 24px; label 17px
- **States:** hover: #0071e3; active: scale 0.98

### Spec Card

**Role:** 规格与特性卡

卡面深灰填充、24px 圆角、无描边、内边距 32px。上方 12px 全大写 0.2em 的电蓝标签，中间 28px/600 白标题，下方 17px 中灰说明。卡片本身不加边框与阴影——纯黑舞台上加边框会毁掉无限深。

### Scrub Stage

**Role:** 滚动擦洗帧序列（签名组件）

外层高度为视口的 3 到 4 倍，内层 sticky top-0、高 100vh，内含一个 canvas。帧以 WebP 存放，用 IntersectionObserver 在区块接近视口时才加载（绝不首次渲染就预载全部 96 帧），画布尺寸按 devicePixelRatio 封顶 2 倍。滚动进度用 requestAnimationFrame 读取 window.scrollY 一次并缓存，绝不在处理器里读 getBoundingClientRect 或 offsetTop。prefers-reduced-motion 时只画关键帧。所有关键文字必须叠在 canvas 之外的 DOM 里。

- **Sizes:** outer 3–4 × 100vh; sticky 100vh

### Glass Nav

**Role:** 顶部导航

固定顶部、高 48px、黑 70% 底加 24px 模糊、底部 1px 白 10% 描边。左侧 17px/600 近白字标，右侧链接 14px 近白 80%，购买链接用电蓝。hover 时链接转纯白。

### Dark Field

**Role:** 邮箱与表单输入

卡面深灰填充、1px 白 10% 描边、12px 圆角、padding 12px 20px、17px 字。占位符中灰。聚焦时描边转电蓝，不加外环、不加光晕。

## Do's and Don'ts

### Do

- 纯黑舞台，无边框无纹理
- 只用一支电蓝强调色
- 帧用 IntersectionObserver 懒加载
- 滚动进度在 rAF 里读一次并缓存
- 关键文字放在 DOM，不放帧图
- 尊重 reduced-motion，给 DPR 封顶

### Don't

- 不要用多彩渐变或第二个强调色
- 不要在滚动处理器里读布局属性
- 不要在首屏预载全部帧
- 不要把关键信息烘焙进帧图
- 不要堆砌边框与圆角装饰
- 不要忽略 reduced-motion 与 DPR 封顶

## Surfaces

| Level | Name | Value | Purpose |
|---|---|---|---|
| 0 | Stage Black | `#000000` | 页面舞台 |
| 1 | Card Graphite | `#1d1d1f` | 卡片与信息块 |
| 2 | Glass Nav | `rgba(0,0,0,0.70)` | 顶部导航（带模糊） |

## Elevation

- **None:** `none — the stage has no depth cues`
- **Card:** `0 24px 60px rgba(0,0,0,0.60)`

## Imagery

产品渲染图是唯一图像，且必须自带光源、边缘融入纯黑。允许产品特写、内部结构剖视与帧序列动画。不使用人物摄影、多彩渐变与背景纹理。

## Layout

上限 1120px，一屏一个产品一句主张。区块间距 240px，几乎全部居中。文字块宽度不超过 20 个汉字或 40 个字符，因为短句才配得上这么大的留白。帧序列区块占 3 到 4 屏滚动高度。

## Agent Prompt Guide

### Implementation Contract

- 以用户请求中的页面、用户任务和真实内容为依据，只实施指定范围；标明缺失的业务信息，不编造数据或能力。
- 先检查现有项目、技术栈与组件；沿用项目结构、路由和依赖，复用已有组件，不重建未要求的页面或功能。
- 沿用项目断点，调整窄屏与桌面的网格和留白；保留信息层级，避免意外横向溢出。
- 对本次涉及的交互，处理键盘焦点与减少动态效果；补齐适用的禁用、加载、空内容与错误状态。
- 完成后按项目现有脚本检查，仅报告实际运行的测试与视觉检查，并列出未验证项。

QUICK COLOR REFERENCE:

- text: `#f5f5f7`
- background: `#000000`
- card: `#1d1d1f`
- accent: `#2997ff`
- muted: `#86868b`
- border: `rgba(255,255,255,0.10)`

EXAMPLE COMPONENT PROMPTS:

1. 做一个发布会风格的产品区块：纯黑 #000000 舞台、居中 56px/700 标题（字距 -0.03em、色 #f5f5f7）、下方 17px #86868b 一行说明、一个 999px 全圆角电蓝按钮（#2997ff 填充、白字、padding 12px 24px）。区块上下留 240px 空白。若需要滚动动画，用 sticky 100vh 的 canvas 播放帧序列：帧以 WebP 存放、用 IntersectionObserver 懒加载、DPR 封顶 2 倍、滚动进度在 requestAnimationFrame 内读一次 window.scrollY。
