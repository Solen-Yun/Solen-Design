# 创意工作室风 — 风格参考

> 字大到撑满屏幕，色块直接切换，直角保持自信。

**Theme:** dark

创意工作室风是设计工作室的作品集语言：hero 标题必须大到自带冲击力（6xl 到 8xl、行高 0.95、紧字距），深色区（#1a1a1a）与浅色区（#f5f5f0）交替，区块之间靠底色切换分隔而不是边框，项目卡零圆角加 hover 放大 1.02，CTA 用一个珊瑚红（#ff6b6b）贯穿全站。它的禁令全部围绕「不许软化」——不许小号 hero、不许圆角、不许衬线、不许细边框分割、不许纯白背景。

## Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Ink | `#1a1a1a` | `--color-ink` | 深色区块底与浅色区上的文字。整套风格的骨架色。 |
| Paper | `#f5f5f0` | `--color-paper` | 浅色区块底。比纯白暖，避免与纯白文字混淆。 |
| Coral | `#ff6b6b` | `--color-coral` | 唯一强调色：CTA、hover 态与 hero 里被高亮的那几个词。 |
| White | `#ffffff` | `--color-white` | 只用于文字，绝不作底色。 |
| Graphite | `#333333` | `--color-graphite` | 深色区里的次级文字与分隔线。 |
| Near Black | `#0d0d0d` | `--color-near-black` | 页头与页脚的更深底，用于在与深色区之间再分一层。 |

## Typography

### Inter — 全站无衬线。标题用 700 到 900 并压到行高 0.95，正文用 300 到 400，两者之间的差距本身就是层级。

- **Substitute:** Helvetica, 'Arial Black', system-ui, sans-serif
- **Weights:** 300, 400, 700, 900
- **Sizes:** 14, 18, 24, 40, 64, 96, 128
- **Line height:** 0.95 (display), 1.05 (headings), 1.55 (body)
- **Letter spacing:** -0.04em on display, 0.06em on uppercase labels

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|---|---|---|---|---|---|---|
| display | — | 900 | 128px | 0.95 | -0.04em | `--text-display` |
| heading-lg | — | 900 | 96px | 0.98 | -0.04em | `--text-heading-lg` |
| heading | — | 700 | 64px | 1.02 | -0.03em | `--text-heading` |
| subheading | — | 700 | 40px | 1.1 | -0.02em | `--text-subheading` |
| body-lg | — | 400 | 18px | 1.5 | — | `--text-body-lg` |
| body | — | 300 | 14px | 1.55 | — | `--text-body` |

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
| cards | 0 |
| buttons | 0 |
| inputs | 0 |
| avatars | 999px |

- **Page max-width:** 1440px
- **Section gap:** 128px
- **Card padding:** 0px
- **Element gap:** 24px

## Components

### Hero Display

**Role:** 超大首屏标题（核心）

96 到 128px、900 字重、行高 0.95、字距 -0.04em，左对齐并可跨行。其中一到两个关键词用珊瑚色，其余白或墨。绝不小于 48px——小于这个尺寸就失去冲击力。

### Coral CTA

**Role:** 主行动按钮

珊瑚填充、白字、零圆角、无描边、18px/700、padding 16px 32px，无静态阴影。hover 时填充加深到 #e55a5a、阴影 0 20px 40px 珊瑚 30%、上浮 2px；按下缩放 0.98。过渡 300ms。

- **Sizes:** padding 16px 32px; label 18px
- **States:** hover: darker fill, lift 2px, shadow; active: scale 0.98

### Project Card

**Role:** 项目卡

浅色纸底、零圆角、overflow hidden、无边框。图片 4:3 或 16:9，文字压在图片下方（不在图上），项目名 24 到 32px/700、客户名 14px/300 灰。hover 时整体放大 1.02 并加 0 25px 50px 阴影，图片再放大 1.04。过渡 300ms。

- **States:** hover: card 1.02, image 1.04, shadow

### Section Switch

**Role:** 区块底色切换（分隔手段）

区块之间不加边框也不加阴影，直接用底色切换：深（#1a1a1a）→ 浅（#f5f5f0）→ 深。切换本身就是分隔符，而且它比线更有力量。整页通常三到五个色块。

### Testimonial Block

**Role:** 客户引文

最大宽度 64rem 居中、内边距 64px 左右 48px、引文 24 到 30px 斜体、行高 1.6、墨色，下方 14px 的姓名与职位。无引号图标、无边框。

## Do's and Don'ts

### Do

- hero 标题不小于 48px，通常 96 到 128px
- 零圆角，头像除外
- 全站无衬线
- 区块靠底色切换分隔
- 珊瑚贯穿全站作唯一强调
- 卡片 hover 放大 1.02

### Don't

- 不要用小号或标准字号做 hero
- 不要用圆角
- 不要用衬线字体
- 不要用细边框分割区块
- 不要用纯白背景
- 不要把文字压在作品图上

## Surfaces

| Level | Name | Value | Purpose |
|---|---|---|---|
| 0 | Ink | `#1a1a1a` | 深色区块 |
| 1 | Paper | `#f5f5f0` | 浅色区块 |
| 2 | Near Black | `#0d0d0d` | 页头与页脚 |

## Elevation

- **None:** `none at rest — blocks do the separating`
- **Card hover:** `0 25px 50px rgba(0,0,0,0.25)`
- **CTA hover:** `0 20px 40px rgba(255,107,107,0.30)`

## Imagery

项目作品图与团队肖像。作品图必须高质、可裁切、不带圆角与边框。允许客户 logo 墙（灰度或单色）。不使用装饰插画与背景纹理。

## Layout

上限 1440px、容器内边距 32px，区块间距 128px。首屏接近满高。允许标题与图片重叠但文字必须在最上层。所有区块零圆角。

## Agent Prompt Guide

### Implementation Contract

- 以用户请求中的页面、用户任务和真实内容为依据，只实施指定范围；标明缺失的业务信息，不编造数据或能力。
- 先检查现有项目、技术栈与组件；沿用项目结构、路由和依赖，复用已有组件，不重建未要求的页面或功能。
- 沿用项目断点，调整窄屏与桌面的网格和留白；保留信息层级，避免意外横向溢出。
- 对本次涉及的交互，处理键盘焦点与减少动态效果；补齐适用的禁用、加载、空内容与错误状态。
- 完成后按项目现有脚本检查，仅报告实际运行的测试与视觉检查，并列出未验证项。

QUICK COLOR REFERENCE:

- text: `#1a1a1a`
- background: `#1a1a1a`
- paper: `#f5f5f0`
- accent: `#ff6b6b`
- muted: `#8a8a85`
- dark: `#0d0d0d`

EXAMPLE COMPONENT PROMPTS:

1. 做一个创意工作室首屏：深色区 #1a1a1a 底、白字。标题 128px/900、行高 0.95、字距 -0.04em、左对齐，其中两个关键词用珊瑚 #ff6b6b。CTA 珊瑚填充、白字、零圆角、18px/700、padding 16px 32px，hover 时加深到 #e55a5a 并加 0 20px 40px rgba(255,107,107,0.3) 阴影、上浮 2px。下一区块直接切换到 #f5f5f0 底（不加边框）。项目卡零圆角、hover 放大 1.02 加阴影。全站无衬线，无纯白背景。
