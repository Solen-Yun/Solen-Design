# 可爱极简 — 风格参考

> 圆、粉彩、大留白、一点点弹跳：可爱但不吵。

**Theme:** light

可爱极简把日本 kawaii 文化里的「柔软」与极简主义的「克制」缝在一起：暖白底、粉彩强调、全圆角或 24px 大圆角、柔和阴影、圆润无衬线、极多留白。它允许弹跳——hover 放大到 1.05、按下缩到 0.95，这是它唯一被允许的夸张。禁止深色背景、禁止发光与霓虹、禁止高饱和荧光色、禁止粗黑边框、禁止信息过密。可爱在这里靠比例与温度，不靠堆装饰。

## Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Pink | `#f9a8d4` | `--color-pink` | 主色：主按钮、选中态与图标底。整套风格的可爱感由它承担。 |
| Warm White | `#fff7ed` | `--color-warm-white` | 页面底。带一点橙调的暖白，比纯白更有体温。 |
| Lavender | `#a78bfa` | `--color-lavender` | 第二色，用于次级行动与分类标记。 |
| Sky | `#67e8f9` | `--color-sky` | 信息与「新」标记，是唯一偏冷的粉彩。 |
| Butter | `#fde68a` | `--color-butter` | 高亮与庆祝状态，面积最小。 |
| Deep Pink | `#f47abd` | `--color-deep-pink` | 粉色的加深版，用于需要更高对比的文字与图标。 |

## Typography

### Nunito — 全站唯一字体。圆润无衬线、字重不超过 700，行高 1.7 保证呼吸。

- **Substitute:** 'Segoe UI', 'PingFang SC', system-ui, sans-serif
- **Weights:** 400, 500, 700
- **Sizes:** 13, 15, 17, 20, 26, 34
- **Line height:** 1.25 (display), 1.35 (headings), 1.7 (body)
- **Letter spacing:** 0 on display, 0.04em on uppercase labels

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|---|---|---|---|---|---|---|
| display | — | 700 | 34px | 1.25 | — | `--text-display` |
| heading | — | 700 | 26px | 1.35 | — | `--text-heading` |
| subheading | — | 500 | 20px | 1.45 | — | `--text-subheading` |
| body-lg | — | 400 | 17px | 1.7 | — | `--text-body-lg` |
| body | — | 400 | 15px | 1.7 | — | `--text-body` |
| label | — | 500 | 13px | 1.5 | 0.04em | `--text-label` |

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
| panels | 32px |
| buttons | 999px |
| inputs | 999px |

- **Page max-width:** 960px
- **Section gap:** 128px
- **Card padding:** 32px
- **Element gap:** 24px

## Components

### Bouncy Button

**Role:** 行动按钮

粉色填充、白色文字、999px 全圆角、无描边、17px/700、padding 14px 28px，阴影 0 4px 12px 粉 18%。hover 时放大到 1.05、阴影扩到 24px；按下缩到 0.95。过渡 200ms cubic-bezier(0.34, 1.56, 0.64, 1)，这条带回弹的曲线是这套风格的签名。

- **Sizes:** padding 14px 28px; label 17px
- **States:** hover: scale 1.05; active: scale 0.95

### Soft Card

**Role:** 内容卡

白底、24px 圆角、1px 粉 200（#fbcfe8）描边或无描边、内边距 32px，阴影 0 4px 12px 粉 18%。左上角可放一个 40px 的粉彩图标底（999px 圆角）。hover 时上浮 4px、阴影扩到 24px。

### Pill Input

**Role:** 输入框

白底、999px 全圆角、1px 粉 200 描边、padding 12px 20px、15px 字。占位符粉 400（#f9a8d4）的 60%。聚焦时描边转粉 400 并加 3px 的粉 20% 外环。

### Pastel Chip

**Role:** 分类与状态标签

999px 全圆角、粉彩 15% 底（粉、薰衣草、天蓝或奶油黄）、无描边、13px/500、padding 6px 14px，文字用深粉或深灰而不是白。

### Gentle Avatar

**Role:** 头像与图标容器

999px 全圆、尺寸 32 到 64px、粉彩底加 1px 白 60% 描边，内放 16 到 24px 的白色或深粉图标。hover 时旋转 6 度并放大 1.08。

## Do's and Don'ts

### Do

- 暖白底，不用深色
- 全圆角或 24px 大圆角
- 粉彩强调，每屏不超过两种
- hover 1.05、active 0.95 的弹跳
- 阴影柔和且带粉色
- 留白占五成以上

### Don't

- 不要用深色或黑色背景
- 不要用发光与霓虹
- 不要用高饱和荧光色
- 不要用粗黑边框
- 不要信息过密
- 不要用锐利直角

## Surfaces

| Level | Name | Value | Purpose |
|---|---|---|---|
| 0 | Warm White | `#fff7ed` | 页面底 |
| 1 | White | `#ffffff` | 卡片 |
| 2 | Pink Wash | `rgba(249,168,212,0.14)` | 强调区块 |

## Elevation

- **Soft:** `0 4px 12px rgba(249,168,212,0.18)`
- **Soft hover:** `0 8px 24px rgba(249,168,212,0.28)`

## Imagery

圆润的插画：动物、食物、植物，线条粗而圆、平涂粉彩。允许真实摄影但必须柔和、暖调、高留白。不使用冷硬几何、暗调摄影与写实图标墙。

## Layout

上限 960px、容器内边距 24px，区块间距 128px。单栏或两列卡片，元素间距至少 24px。留白占比目标五成以上，因为「空」是这套风格可爱的一部分。

## Agent Prompt Guide

### Implementation Contract

- 以用户请求中的页面、用户任务和真实内容为依据，只实施指定范围；标明缺失的业务信息，不编造数据或能力。
- 先检查现有项目、技术栈与组件；沿用项目结构、路由和依赖，复用已有组件，不重建未要求的页面或功能。
- 沿用项目断点，调整窄屏与桌面的网格和留白；保留信息层级，避免意外横向溢出。
- 对本次涉及的交互，处理键盘焦点与减少动态效果；补齐适用的禁用、加载、空内容与错误状态。
- 完成后按项目现有脚本检查，仅报告实际运行的测试与视觉检查，并列出未验证项。

QUICK COLOR REFERENCE:

- text: `#57534e`
- background: `#fff7ed`
- card: `#ffffff`
- pink: `#f9a8d4`
- lavender: `#a78bfa`
- sky: `#67e8f9`

EXAMPLE COMPONENT PROMPTS:

1. 做一个可爱极简卡片：白底、24px 圆角、1px #fbcfe8 描边、内边距 32px、阴影 0 4px 12px rgba(249,168,212,0.18)。左上角放一个 40px 的粉彩图标圆（bg rgba(249,168,212,0.15)、999px 圆角）。标题 26px/700 #57534e，正文 15px/400、行高 1.7。hover 时 translateY(-4px)、阴影扩到 0 8px 24px rgba(249,168,212,0.28)。主按钮粉色 #f9a8d4、999px 圆角、白字、hover scale(1.05)、active scale(0.95)，transition 200ms cubic-bezier(0.34,1.56,0.64,1)。页面底色 #fff7ed。
