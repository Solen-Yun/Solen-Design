# 田园核风 — 风格参考

> 亚麻、花园、手缝的边：一个想住进去的乡下午后。

**Theme:** light

田园核风来自「向往简单的乡居生活」这一情绪：大地色与花色（绿、米白、麦黄、棕、藕粉）、衬线字体、亚麻或纸张质感背景、圆角与柔和阴影、花卉与蘑菇等刺绣式装饰。它的动效有一个很具体的习惯——hover 时上浮 2px 并旋转 0.8 度，像纸片被风轻轻掀起，而且必须带 motion-reduce 降级。禁令是：不许冷蓝灰、不许锐角与硬边框、不许霓虹与荧光、不许任何科技或工业感元素。

## Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Meadow | `#5a8f5a` | `--color-meadow` | 主色：主按钮、叶子装饰与成功状态。 |
| Cloth | `#faf6f0` | `--color-cloth` | 页面底。像洗过很多次的亚麻布。 |
| Wheat | `#f5d75f` | `--color-wheat` | 阳光与高亮，用于小花蕊与徽标。 |
| Timber | `#8b7355` | `--color-timber` | 木器与文字的第二层，比墨色暖。 |
| Wild Rose | `#d4a0a0` | `--color-wild-rose` | 花朵与情绪化强调，出现频率中等。 |
| Sprout | `#7ff77e` | `--color-sprout` | 最亮的一支，只用于「新增」与春季主题。 |

## Typography

### Lora — 全站唯一字体。衬线带一点手写气质，行高 1.8 让页面显得慢。

- **Substitute:** Georgia, 'Songti SC', serif
- **Weights:** 400, 600
- **Sizes:** 15, 17, 21, 28, 36, 48
- **Line height:** 1.2 (display), 1.35 (headings), 1.8 (body)
- **Letter spacing:** 0.01em on display, 0.12em on uppercase labels

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|---|---|---|---|---|---|---|
| display | — | 600 | 48px | 1.2 | 0.01em | `--text-display` |
| heading | — | 600 | 36px | 1.3 | — | `--text-heading` |
| subheading | — | 400 | 28px | 1.4 | — | `--text-subheading` |
| body-lg | — | 400 | 21px | 1.75 | — | `--text-body-lg` |
| body | — | 400 | 17px | 1.8 | — | `--text-body` |
| label | — | 600 | 15px | 1.6 | 0.12em | `--text-label` |

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
| ornaments | 999px |

- **Page max-width:** 1040px
- **Section gap:** 112px
- **Card padding:** 32px
- **Element gap:** 24px

## Components

### Meadow Button

**Role:** 行动按钮

草甸绿填充、米白文字、999px 全圆角、无描边、衬线 15px、padding 12px 32px，阴影 0 4px 10px 绿 20%。hover 时上浮 2px、旋转 0.8 度、阴影扩到 20px；按下旋转归零、缩到 0.97、阴影收到 6px。过渡 500ms ease-in-out，并带 motion-reduce:transform-none。

- **Sizes:** padding 12px 32px; label 15px
- **States:** hover: lift 2px, rotate 0.8deg; active: rotate 0, scale 0.97

### Linen Card

**Role:** 内容卡

提亮一档的布色填充、24px 圆角、1px 草甸绿 12% 描边、内边距 32px，柔阴影 0 4px 10px 绿 20%。左上角放一个 32px 的花卉或叶片装饰（草甸绿 70%）。hover 时上浮 4px、阴影扩到 20px。

### Fabric Field

**Role:** 输入框

布色填充、16px 圆角、1px 木棕 20% 描边、padding 12px 18px、17px 字。聚焦时描边转草甸绿并加 3px 的绿 15% 外环。占位符木棕 50%。

### Floral Sprig

**Role:** 花卉与蘑菇装饰

手绘式线稿或刺绣感的花朵、麦穗、蘑菇，尺寸 24 到 96px，颜色取野蔷薇、麦黄或草甸绿。放在卡片角落或标题旁，允许轻微旋转 -8 到 8 度。它是这套风格的身份标记，不可省略。

### Stitched Rule

**Role:** 缝线分隔

一条 2px 的虚线（dash 6px、gap 4px），颜色取草甸绿 30% 或木棕 30%，两端各收进 16px。可选在两端加一针「回针」小标记。用于区块之间的分隔，替代直线。

## Do's and Don'ts

### Do

- 大地色与花色，暖调为主
- 衬线字体，行高 1.8
- 圆角 16 到 24px，软阴影
- 必须有花卉或叶片装饰
- hover 上浮 2px 并旋转 0.8 度
- 带 motion-reduce 降级

### Don't

- 不要用冷蓝灰色调
- 不要用锐角与硬边框
- 不要用霓虹或荧光色
- 不要用科技或工业风元素
- 不要省略装饰
- 不要在无降级的情况下做旋转动画

## Surfaces

| Level | Name | Value | Purpose |
|---|---|---|---|
| 0 | Cloth | `#faf6f0` | 页面底（带亚麻纹理） |
| 1 | Lighter Cloth | `#fffdf8` | 卡片 |
| 2 | Meadow Wash | `rgba(90,143,90,0.10)` | 区块底 |

## Elevation

- **Soft:** `0 4px 10px rgba(90,143,90,0.20)`
- **Soft hover:** `0 8px 20px rgba(90,143,90,0.30)`
- **Pressed:** `0 2px 6px rgba(90,143,90,0.20)`

## Imagery

乡居摄影与手绘插画：花园、面包、陶器、亚麻、蘑菇。必须自然光、暖调、有柔焦。允许把照片处理成柔和的胶片色。不使用冷光、工业物件与科技产品。

## Layout

上限 1040px、容器内边距 24px，区块间距 112px。允许卡片轻微错位与旋转（-2 到 2 度）。留白宽松，密度中低。装饰可以溢出容器一点，像藤蔓爬出边框。

## Agent Prompt Guide

### Implementation Contract

- 以用户请求中的页面、用户任务和真实内容为依据，只实施指定范围；标明缺失的业务信息，不编造数据或能力。
- 先检查现有项目、技术栈与组件；沿用项目结构、路由和依赖，复用已有组件，不重建未要求的页面或功能。
- 沿用项目断点，调整窄屏与桌面的网格和留白；保留信息层级，避免意外横向溢出。
- 对本次涉及的交互，处理键盘焦点与减少动态效果；补齐适用的禁用、加载、空内容与错误状态。
- 完成后按项目现有脚本检查，仅报告实际运行的测试与视觉检查，并列出未验证项。

QUICK COLOR REFERENCE:

- text: `#3d3a34`
- background: `#faf6f0`
- card: `#fffdf8`
- green: `#5a8f5a`
- wheat: `#f5d75f`
- rose: `#d4a0a0`

EXAMPLE COMPONENT PROMPTS:

1. 做一个田园风按钮：背景 #5a8f5a、米白文字 #faf6f0、999px 全圆角、衬线 15px、padding 12px 32px、box-shadow 0 4px 10px rgba(90,143,90,0.2)。hover 时 translateY(-2px) rotate(0.8deg)、阴影扩到 0 8px 20px rgba(90,143,90,0.3)；active 时 rotate(0) scale(0.97)、阴影收到 0 2px 6px，transition 500ms ease-in-out 并加 motion-reduce:transform-none。卡片用 #fffdf8 底、24px 圆角、内边距 32px，左上角放一个 32px 的草甸绿叶片装饰。页面底色 #faf6f0，可叠亚麻纹理。
