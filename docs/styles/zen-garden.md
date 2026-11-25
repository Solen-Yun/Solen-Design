# 枯山水 — 风格参考

> 白砂、苔石、耙纹：留白不是空的，是被梳理过的。

**Theme:** light

枯山水用白砂、苔藓与石头三种材料构成一个没有水的庭园：界面上就是沙白底（#f5f3ee）、苔绿点缀（#8a9a7b）、纤细到几乎看不见的边框（1px 的 30%），以及大量被「梳理过」的留白——留白在这里是核心结构而不是余量。它的时间感极慢：过渡 1000ms ease-in-out，因为耙纹与苔藓的变化以年为单位。禁令是：不许明亮鲜艳的色彩、不许厚重边框与粗线条、不许快速动画与弹跳、不许密集排列。

## Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Stone | `#4a5548` | `--color-stone` | 文字与石头。带绿的深灰，是庭园里唯一的重量。 |
| Sand | `#f5f3ee` | `--color-sand` | 页面底。白砂的颜色，所有内容铺在它上面。 |
| Moss | `#8a9a7b` | `--color-moss` | 唯一强调色：hover 态、选中与「生长」语义。 |
| Gravel | `#c4bba8` | `--color-gravel` | 边框与分隔，永远只有 1px 的 30%。 |
| Rock | `#7a7062` | `--color-rock` | 次级文字与元数据。 |
| Pond Teal | `#799d91` | `--color-pond-teal` | 冷侧的一笔，用于「水」的暗示，出现频率极低。 |

## Typography

### Noto Serif SC — 全站衬线，行高 1.9，字距放到 0.28em。字与字、行与行之间的空隙和内容一样重要。

- **Substitute:** 'Songti SC', Georgia, serif
- **Weights:** 300, 400
- **Sizes:** 15, 18, 22, 28, 38, 50
- **Line height:** 1.2 (display), 1.4 (headings), 1.9 (body)
- **Letter spacing:** 0.04em on display, 0.28em on uppercase labels

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|---|---|---|---|---|---|---|
| display | — | 300 | 50px | 1.2 | 0.04em | `--text-display` |
| heading | — | 300 | 38px | 1.35 | — | `--text-heading` |
| subheading | — | 400 | 28px | 1.45 | — | `--text-subheading` |
| body-lg | — | 400 | 22px | 1.8 | — | `--text-body-lg` |
| body | — | 300 | 18px | 1.9 | — | `--text-body` |
| label | — | 400 | 15px | 1.7 | 0.28em | `--text-label` |

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
| cards | 0 |
| buttons | 0 |
| stones | 999px |

- **Page max-width:** 960px
- **Section gap:** 240px
- **Card padding:** 40px
- **Element gap:** 40px

## Components

### Quiet Button

**Role:** 行动按钮

透明底、无描边（默认 border-color: transparent）、零圆角、衬线 15px、字距 0.28em、padding 12px 32px，文字为石色 70%。hover 时描边转苔绿 30%、文字升到 100%、背景加苔绿 5%、并加一层几乎看不见的苔绿光晕（0 0 20px 苔 5%）。过渡 1000ms ease-in-out。

- **Sizes:** padding 12px 32px; label 15px
- **States:** hover: moss border 30%, text 100%; no motion

### Stone Card

**Role:** 内容卡与石组

沙色填充（与底同色，靠边框区分）、零圆角、1px 砂砾 30% 描边、内边距 40px，无阴影。hover 时描边升到 55%，其余完全不变。卡片之间可错位 16 到 48px，像石头不按网格摆放。

### Raked Line

**Role:** 耙纹装饰

用 repeating-linear-gradient 画 24px 间隔的 1px 沙色 40% 或砂砾 25% 的平行线，覆盖在一个区块上（不透明度 50%），模拟砂纹。线必须是等距的同心弧或直线，绝不杂乱。

### Moss Cluster

**Role:** 苔与石的点缀

由两到三个不同尺寸的圆或不规则块组成（16 到 64px），苔绿或岩色，不透明度 60% 到 80%，紧挨着放在卡片角落或标题旁，像一组石头旁长了苔。单屏最多两处。

### Silence Gap

**Role:** 留白区块

240px 到 320px 高的空区块，作为真实元素存在。枯山水的核心就是它——没有这块空白，庭园只是几堆石头。

## Do's and Don'ts

### Do

- 沙白底，苔绿点缀
- 边框 1px 且只有 30%
- 留白到 240px，它是核心
- 过渡 1000ms，元素不动
- 行高 1.9、字距 0.28em
- 用耙纹做装饰

### Don't

- 不要用明亮鲜艳色彩
- 不要用厚重边框与粗线条
- 不要用快速动画与弹跳
- 不要密集排列元素
- 不要用阴影
- 不要把耙纹画得杂乱

## Surfaces

| Level | Name | Value | Purpose |
|---|---|---|---|
| 0 | Sand | `#f5f3ee` | 页面底 |
| 1 | Moss Bed | `rgba(138,154,123,0.08)` | 苔区块 |

## Elevation

- **None:** `none — the garden is flat`

## Imagery

枯山水摄影与极简线稿：砂纹、石组、苔、竹篱、远处山影。必须有大量留白，色调压在灰绿与沙之间。不使用鲜艳色彩、密集图案与彩色插画。

## Layout

上限 960px、容器内边距 32px，区块间距 240px。构图像庭园：内容偏一侧、另一侧留白，元素不必对齐网格。禁止密集排列，一屏最多三个元素。

## Agent Prompt Guide

### Implementation Contract

- 以用户请求中的页面、用户任务和真实内容为依据，只实施指定范围；标明缺失的业务信息，不编造数据或能力。
- 先检查现有项目、技术栈与组件；沿用项目结构、路由和依赖，复用已有组件，不重建未要求的页面或功能。
- 沿用项目断点，调整窄屏与桌面的网格和留白；保留信息层级，避免意外横向溢出。
- 对本次涉及的交互，处理键盘焦点与减少动态效果；补齐适用的禁用、加载、空内容与错误状态。
- 完成后按项目现有脚本检查，仅报告实际运行的测试与视觉检查，并列出未验证项。

QUICK COLOR REFERENCE:

- text: `#4a5548`
- background: `#f5f3ee`
- moss: `#8a9a7b`
- gravel: `#c4bba8`
- rock: `#7a7062`
- teal: `#799d91`

EXAMPLE COMPONENT PROMPTS:

1. 做一个枯山水风格卡片：沙色 #f5f3ee 填充、零圆角、1px rgba(196,187,168,0.3) 描边、内边距 40px、无阴影。标题 38px Noto Serif SC 300、字距 0.04em；正文 18px/300、行高 1.9。卡片之间留 240px 空白。hover 时描边升到 rgba(196,187,168,0.55)，其余不变，transition 1000ms ease-in-out。区块上可叠 24px 间隔的 1px 砂纹（不透明度 50%）。页面底色 #f5f3ee。
