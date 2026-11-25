# 北欧极简风 — 风格参考

> 暖灰白、细线条、极慢的过渡：把「安静」做成可测量的参数。

**Theme:** light

北欧极简风来自 Hygge 的生活观：少、慢、暖。它的所有参数都比常规更收敛——字重只用 200 与 300，圆角只有 2px，边框是 1px 的 30% 透明度，过渡长达 700ms 且必须 ease-in-out。交互刻意做得极轻：hover 只让边框从 30% 变到 80%，按下只改明暗，绝不位移、绝不弹跳。留白不是装饰而是结构，元素之间至少 40px。配色是暖灰白加木色、苔绿与灰蓝，饱和度全部压在 30% 以下。

## Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Charcoal | `#3d3d3d` | `--color-charcoal` | 标题与主按钮底。深而不黑，长看柔和。 |
| Warm White | `#f5f0eb` | `--color-warm-white` | 页面画布。带木质暖调的米白，比冷白更接近室内墙色。 |
| Wood | `#a89279` | `--color-wood` | 次级文字与装饰。像浅橡木的色调，是这套风格的温度来源。 |
| Moss | `#5a7a6b` | `--color-moss` | hover 高亮与成功状态，取自室内植物的绿。 |
| Grey Blue | `#7ba0b8` | `--color-grey-blue` | 链接与冷色平衡，用在需要后退的信息上。 |
| Sand | `#c9a88c` | `--color-sand` | 分隔线与图块底，用于在不引入对比的前提下分区。 |

## Typography

### Inter — 全站唯一字体，只用极细的 200 与 300。行高 1.8，字距略放开，让文字也「呼吸」。

- **Substitute:** 'Helvetica Neue', system-ui, sans-serif
- **Weights:** 200, 300, 400
- **Sizes:** 12, 14, 16, 20, 26, 34
- **Line height:** 1.2 (display), 1.35 (headings), 1.8 (body)
- **Letter spacing:** 0.01em on display, 0.12em on uppercase labels

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|---|---|---|---|---|---|---|
| display | — | 300 | 34px | 1.2 | 0.01em | `--text-display` |
| heading | — | 300 | 26px | 1.3 | — | `--text-heading` |
| subheading | — | 400 | 20px | 1.4 | — | `--text-subheading` |
| body-lg | — | 300 | 16px | 1.8 | — | `--text-body-lg` |
| body | — | 300 | 14px | 1.8 | — | `--text-body` |
| label | — | 400 | 12px | 1.5 | 0.12em | `--text-label` |

## Spacing & Layout

**Base unit:** 8px
**Density:** airy

### Spacing Scale

| Name | Value | Token |
|---|---|---|
| 8 | 8px | `--spacing-8` |
| 16 | 16px | `--spacing-16` |
| 24 | 24px | `--spacing-24` |
| 40 | 40px | `--spacing-40` |
| 56 | 56px | `--spacing-56` |
| 80 | 80px | `--spacing-80` |
| 120 | 120px | `--spacing-120` |
| 160 | 160px | `--spacing-160` |

### Border Radius

| Element | Value |
|---|---|
| cards | 2px |
| buttons | 2px |
| inputs | 2px |

- **Page max-width:** 1040px
- **Section gap:** 160px
- **Card padding:** 40px
- **Element gap:** 40px

## Components

### Quiet Button

**Role:** 主行动按钮

炭灰填充、暖白文字、2px 圆角、无描边、无阴影。14px/300、0.12em 字距、padding 14px 40px。hover 时填充转苔绿并把亮度降 5%；按下只把填充再压暗一档，绝无缩放与位移。过渡 700ms ease-in-out，这是整套风格的节奏基准。

- **Sizes:** padding 14px 40px; label 14px
- **States:** hover: moss fill, brightness 95%; active: darker fill only

### Hygge Card

**Role:** 内容卡与图块

白 60% 填充、2px 圆角、1px 沙 30% 描边、内边距 40px，无阴影。标题 26px/300 炭灰，正文 14px/300 木色。hover 时描边升到 80%、底色微亮、标题转苔绿，全部在 700ms 内完成。

### Line Input

**Role:** 表单输入

透明底、仅底部 1px 沙 40% 描边、无左右边框、2px 圆角、padding 8px 0、14px/300 字。聚焦时底线转苔绿、宽度不变，不加外环。

### Breathing Section

**Role:** 区块容器

区块之间 160px 间距，标题与内容之间 40px，内容最大行宽 34em。区块间只用 1px 沙 30% 的分隔线，或干脆靠留白分隔。禁止把两个高对比元素并排。

## Do's and Don'ts

### Do

- 字重只用 200 与 300
- 过渡 700ms ease-in-out
- 圆角 2px，近乎直角
- hover 只改边框与底色
- 元素间距至少 40px
- 饱和度全部压在 30% 以下

### Don't

- 不要用高饱和鲜艳色
- 不要用粗边框与强阴影
- 不要密集排列元素
- 不要用装饰字体或超大字号
- 不要用弹跳或快速缩放
- 不要给按下加强烈反馈

## Surfaces

| Level | Name | Value | Purpose |
|---|---|---|---|
| 0 | Warm White | `#f5f0eb` | 页面画布 |
| 1 | Soft White | `rgba(255,255,255,0.60)` | 卡片 |

## Elevation

- **None:** `none — a 1px border at 30% does the work`
- **Hover border:** `1px solid rgba(212,205,197,0.80)`

## Imagery

自然光下的室内摄影：木质家具、亚麻织物、绿植、陶器。低饱和、暖调、大量留白。不使用高对比、冷光与装饰插画。

## Layout

上限 1040px、容器内边距 40px，区块间距 160px。单栏或非对称两栏（5:7），留白占页面一半以上。元素之间至少 40px，宁可减少模块也不压缩间距。

## Agent Prompt Guide

### Implementation Contract

- 以用户请求中的页面、用户任务和真实内容为依据，只实施指定范围；标明缺失的业务信息，不编造数据或能力。
- 先检查现有项目、技术栈与组件；沿用项目结构、路由和依赖，复用已有组件，不重建未要求的页面或功能。
- 沿用项目断点，调整窄屏与桌面的网格和留白；保留信息层级，避免意外横向溢出。
- 对本次涉及的交互，处理键盘焦点与减少动态效果；补齐适用的禁用、加载、空内容与错误状态。
- 完成后按项目现有脚本检查，仅报告实际运行的测试与视觉检查，并列出未验证项。

QUICK COLOR REFERENCE:

- text: `#3d3d3d`
- background: `#f5f0eb`
- card: `rgba(255,255,255,0.60)`
- accent: `#5a7a6b`
- wood: `#a89279`
- border: `rgba(212,205,197,0.40)`

EXAMPLE COMPONENT PROMPTS:

1. 做一个北欧极简卡片：背景 rgba(255,255,255,0.6)、2px 圆角、1px rgba(212,205,197,0.3) 描边、内边距 40px、无阴影。标题 26px/300 #3d3d3d，正文 14px/300 #a89279、行高 1.8。hover 时描边升到 rgba(212,205,197,0.8)、标题转 #5a7a6b，transition 700ms ease-in-out。页面底色 #f5f0eb。
