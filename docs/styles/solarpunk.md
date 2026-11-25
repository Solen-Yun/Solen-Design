# 太阳朋克 — 风格参考

> 乐观的生态未来：植物与技术不是对立，而是长在一起。

**Theme:** light

太阳朋克是对赛博朋克的正面回答：不要霓虹废土，要阳光、植物与共居的技术。视觉上它靠三件事——温暖浅色的底（#fef3c7 或薄荷绿的白）、叶绿与金黄这对主色、以及大圆角与有机曲线（没有一条边是完全直的）。渐变在这里是合法的，而且必须是从绿到金的暖向渐变。它禁止纯黑背景、尖锐直角、冷工业元素与霓虹发光，也禁止任何废土或反乌托邦的暗示。

## Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Leaf | `#4ade80` | `--color-leaf` | 主色：生长、行动与植物元素。整套风格的乐观感来自它。 |
| Golden | `#fbbf24` | `--color-golden` | 阳光与能量，几乎总与叶绿同现，形成暖向渐变。 |
| Cream Light | `#fef3c7` | `--color-cream-light` | 页面底。暖金色调的浅底，让绿与蓝都显得温和。 |
| Sky | `#38bdf8` | `--color-sky` | 水与清洁能源，用于数据与次级元素。 |
| Ochre | `#a16207` | `--color-ochre` | 文字与描边。深赭代替黑，避免任何冷硬感。 |
| Lavender | `#b692ff` | `--color-lavender` | 科技与社区语义，出现频率最低，用于区分机械部件。 |

## Typography

### Nunito — 全站唯一字体。圆润无衬线的字形与有机曲线同源，行高 1.7 让长文易读。

- **Substitute:** 'Segoe UI', 'PingFang SC', system-ui, sans-serif
- **Weights:** 400, 600, 700
- **Sizes:** 13, 15, 18, 24, 32, 44
- **Line height:** 1.2 (display), 1.3 (headings), 1.7 (body)
- **Letter spacing:** -0.01em on display, 0.04em on uppercase labels

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|---|---|---|---|---|---|---|
| display | — | 700 | 44px | 1.2 | -0.01em | `--text-display` |
| heading | — | 700 | 32px | 1.3 | — | `--text-heading` |
| subheading | — | 600 | 24px | 1.35 | — | `--text-subheading` |
| body-lg | — | 400 | 18px | 1.65 | — | `--text-body-lg` |
| body | — | 400 | 15px | 1.7 | — | `--text-body` |
| label | — | 600 | 13px | 1.45 | 0.04em | `--text-label` |

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
| 128 | 128px | `--spacing-128` |

### Border Radius

| Element | Value |
|---|---|
| cards | 24px |
| buttons | 999px |
| inputs | 16px |
| media | 32px |

- **Page max-width:** 1160px
- **Section gap:** 112px
- **Card padding:** 28px
- **Element gap:** 20px

## Components

### Sun Button

**Role:** 主行动按钮

叶绿到金黄的 135 度渐变填充、白字、999px 全圆角、无描边，15px/700、padding 12px 28px，阴影 0 8px 20px 金黄 30%。hover 时渐变角度转 180 度（模拟光线移动）、阴影扩到 28px、上浮 2px；按下缩放 0.98。过渡 300ms ease-out。

- **Sizes:** padding 12px 28px; label 15px
- **States:** hover: gradient rotates, lift 2px; active: scale 0.98

### Organic Card

**Role:** 内容卡与项目卡

薄荷白填充、24px 圆角、1px 叶绿 15% 描边、内边距 28px，阴影 0 12px 32px 叶绿 18%。左上角配一个 48px 的圆形图标底（叶绿 12%）。hover 时上浮 4px、阴影扩到 48px。圆角不对称也是允许的（如 24px 与 32px 混用），但同一卡片内保持一致。

### Soft Input

**Role:** 表单输入

薄荷白填充、16px 圆角、1px 叶绿 20% 描边、padding 12px 18px、15px 字，聚焦时描边转叶绿并加 4px 的叶绿 20% 外环。占位符赭石 45%。

### Plant Motif

**Role:** 植物与有机装饰

单线条植物图形（藤蔓、叶片、太阳能板叶片混合），stroke 2px、颜色叶绿或赭石、尺寸 64px 到 160px。可沿卡片边缘或区块之间蜿蜒，允许超出容器 16px。单屏不超过三处。

### Warm Gradient Band

**Role:** 渐变区块与分隔

从叶绿到金黄的 120 度渐变，高度 120px 到 200px，圆角 32px 或全宽无圆角。用于区块之间的过渡，替代留白。渐变上可叠一层 8% 的叶脉纹理。

## Do's and Don'ts

### Do

- 暖浅底，不用黑或深色
- 叶绿与金黄成对，用暖向渐变
- 大圆角与有机曲线
- 植物元素与技术并置
- 文字用深赭代替黑
- 阴影带绿调而不是灰调

### Don't

- 不要用纯黑或暗色主题
- 不要用尖锐直角
- 不要用冷工业风元素
- 不要用高对比霓虹发光
- 不要出现废土或反乌托邦元素
- 不要用灰暗压抑的配色

## Surfaces

| Level | Name | Value | Purpose |
|---|---|---|---|
| 0 | Cream Light | `#fef3c7` | 页面底 |
| 1 | Mint White | `#f0fdf4` | 卡片与区块 |
| 2 | Leaf Wash | `rgba(74,222,128,0.12)` | 高亮区块 |

## Elevation

- **Card:** `0 12px 32px rgba(74,222,128,0.18)`
- **Card hover:** `0 20px 48px rgba(74,222,128,0.26)`
- **Button:** `0 8px 20px rgba(251,191,36,0.30)`

## Imagery

植物与技术的混合插画：太阳能板长成叶片形状、楼顶有花园、藤蔓绕着结构。允许自然光摄影并加暖色调。不使用冷工业摄影、废土场景与霓虹灯效。

## Layout

上限 1160px、容器内边距 24px，区块间距 112px。允许非对称与曲线边界（区块底部可以用弧形切出），元素沿轻微弧线排列。卡片之间 20px，整体密度中等偏松。

## Agent Prompt Guide

### Implementation Contract

- 以用户请求中的页面、用户任务和真实内容为依据，只实施指定范围；标明缺失的业务信息，不编造数据或能力。
- 先检查现有项目、技术栈与组件；沿用项目结构、路由和依赖，复用已有组件，不重建未要求的页面或功能。
- 沿用项目断点，调整窄屏与桌面的网格和留白；保留信息层级，避免意外横向溢出。
- 对本次涉及的交互，处理键盘焦点与减少动态效果；补齐适用的禁用、加载、空内容与错误状态。
- 完成后按项目现有脚本检查，仅报告实际运行的测试与视觉检查，并列出未验证项。

QUICK COLOR REFERENCE:

- text: `#a16207`
- background: `#fef3c7`
- card: `#f0fdf4`
- leaf: `#4ade80`
- golden: `#fbbf24`
- sky: `#38bdf8`

EXAMPLE COMPONENT PROMPTS:

1. 做一个太阳朋克卡片：背景 #f0fdf4、24px 圆角、1px rgba(74,222,128,0.15) 描边、内边距 28px、阴影 0 12px 32px rgba(74,222,128,0.18)。左上角 48px 圆形图标底（rgba(74,222,128,0.12)）。标题 24px/600 #a16207，正文 15px/400、行高 1.7。主按钮用 linear-gradient(135deg, #4ade80, #fbbf24)、999px 圆角、白字、阴影 0 8px 20px rgba(251,191,36,0.3)。页面底色 #fef3c7。
