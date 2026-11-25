# 漫画风格 — 风格参考

> 粗墨线、硬阴影、对话气泡与爆炸字：屏幕上的一本漫画分镜。

**Theme:** light

漫画风格把印刷漫画的语汇搬到界面上：4px 纯黑墨线包围每个元素，4px 零模糊阴影模拟套印偏移，网点（halftone）作为背景纹理，信息装在对话气泡里而不是卡片里。字体必须粗、必须全大写、字距放宽，像标题框。动效要夸张但短：hover 时元素放大 1.05 并旋转 1 度，时长不超过 100ms，像分镜之间的跳切。圆角只允许给气泡，其它一律直角。

## Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Ink | `#1a1a1a` | `--color-ink` | 所有边框、阴影、正文与气泡描边。墨线是这套风格唯一的结构语言。 |
| Paper | `#ffffff` | `--color-paper` | 分镜底色。保持印刷纸的干净，网点才显得出来。 |
| Comic Red | `#ff3333` | `--color-comic-red` | 动作、警告与冲击字。用来标记「这一格很重要」。 |
| Comic Yellow | `#ffcc00` | `--color-comic-yellow` | 高亮与爆炸效果，通常配红色使用。 |
| Comic Blue | `#3366ff` | `--color-comic-blue` | 链接、信息气泡与「系统」语义。 |
| Comic Green | `#33cc33` | `--color-comic-green` | 成功与「过关」状态，出现频率最低。 |

## Typography

### Bangers — 标题与冲击字。漫画字体带手绘的不规则，是这套风格的语气。

- **Substitute:** 'Impact', 'Arial Black', sans-serif
- **Weights:** 400
- **Sizes:** 20, 28, 40, 56
- **Line height:** 1 (display), 1.05 (headings), 1.5 (body)
- **Letter spacing:** 0.02em on display, 0.08em on uppercase labels

### Comic Neue — 气泡内文字与正文。必须可读，且保持手写感。

- **Substitute:** 'Comic Sans MS', 'Segoe UI', sans-serif
- **Weights:** 400, 700
- **Sizes:** 13, 15, 18
- **Line height:** 1.4 (display), 1.4 (headings), 1.55 (body)
- **Letter spacing:** 0.01em on display, 0.08em on uppercase labels

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|---|---|---|---|---|---|---|
| display | Bangers | 400 | 56px | 1 | 0.02em | `--text-display` |
| heading | Bangers | 400 | 40px | 1.05 | — | `--text-heading` |
| subheading | Bangers | 400 | 28px | 1.1 | — | `--text-subheading` |
| body-lg | Comic Neue | 700 | 18px | 1.45 | — | `--text-body-lg` |
| body | Comic Neue | 400 | 15px | 1.55 | — | `--text-body` |
| label | Comic Neue | 700 | 13px | 1.3 | 0.08em | `--text-label` |

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

### Border Radius

| Element | Value |
|---|---|
| cards | 0 |
| buttons | 0 |
| bubbles | 24px |
| pills | 999px |

- **Page max-width:** 1120px
- **Section gap:** 96px
- **Card padding:** 24px
- **Element gap:** 16px

## Components

### Ink Button

**Role:** 主行动按钮

纸白填充、4px 墨黑边框、零圆角、4px 硬阴影、18px 全大写粗体、字距 0.08em、padding 14px 28px。hover 时填充硬切到漫画黄、放大 1.05、旋转 1 度、时长 100ms；按下时位移 4px 4px 且阴影归零。

- **Sizes:** padding 14px 28px; label 18px
- **States:** hover: yellow fill, scale 1.05, rotate 1deg; active: translate 4px, shadow none

### Speech Bubble

**Role:** 信息容器（替代卡片）

纸白填充、3px 墨黑描边、24px 圆角（唯一允许圆角的元素）、内边距 20px、4px 硬阴影。用两个伪元素画尾巴：一个 3px 描边的三角，一个盖住描边的白色三角，形成中空的对话尖端。文字 15px，行高 1.55。

### Halftone Panel

**Role:** 背景分镜块

白底上叠一层 6px 间距的径向网点（半径 1px、墨黑），整体不透明度 12%。用于给一块区域加印刷质感，面积不超过一屏的 40%。块本身可加 4px 墨线边框，形成分镜格。

### Burst Lettering

**Role:** 冲击字与强调标题

漫画字体 40 到 56px、全大写、填充漫画红或黄、2px 墨黑描边（-webkit-text-stroke）、4px 4px 的墨黑偏移阴影。允许旋转 -3 到 3 度。一屏最多一处。

### Panel Grid

**Role:** 分镜格容器

2 到 3 列网格、12px 间隙、每格 4px 墨线边框、零圆角。格子高度可以不同，允许一格跨两列作为主镜头。网格外留 48px 白边，模拟印刷页的页边距。

## Do's and Don'ts

### Do

- 4px 墨线包住每个元素
- 硬阴影模拟套印偏移
- 圆角只给对话气泡
- 网点作为背景纹理
- 动效不超过 100ms，动作要夸张
- 标题用漫画体，全大写

### Don't

- 不要用 2px 以下的细边框
- 不要用柔和阴影
- 不要把渐变当主要视觉
- 不要给卡片加圆角
- 不要用超过 100ms 的动效
- 不要用正式的无衬线体做标题

## Surfaces

| Level | Name | Value | Purpose |
|---|---|---|---|
| 0 | Paper | `#ffffff` | 分镜底色 |
| 1 | Halftone | `radial-gradient(#1a1a1a 1px, transparent 1px) 6px` | 网点纹理层 |

## Elevation

- **Print offset:** `4px 4px 0 #1a1a1a`
- **Offset red:** `4px 4px 0 #ff3333`
- **Pressed:** `none`

## Imagery

漫画分镜与原稿风格的插画：粗描边、平涂、网点阴影。允许把照片处理成网点单色后放入分镜格。不使用写实摄影、渐变与柔和阴影。

## Layout

上限 1120px、2 到 3 列分镜格、12px 间隙，页面外留 48px 白边。区块之间用一条贯穿的 4px 墨线分隔，像翻页。首屏通常是一整格全幅标题加一个对话气泡。

## Agent Prompt Guide

### Implementation Contract

- 以用户请求中的页面、用户任务和真实内容为依据，只实施指定范围；标明缺失的业务信息，不编造数据或能力。
- 先检查现有项目、技术栈与组件；沿用项目结构、路由和依赖，复用已有组件，不重建未要求的页面或功能。
- 沿用项目断点，调整窄屏与桌面的网格和留白；保留信息层级，避免意外横向溢出。
- 对本次涉及的交互，处理键盘焦点与减少动态效果；补齐适用的禁用、加载、空内容与错误状态。
- 完成后按项目现有脚本检查，仅报告实际运行的测试与视觉检查，并列出未验证项。

QUICK COLOR REFERENCE:

- text: `#1a1a1a`
- background: `#ffffff`
- red: `#ff3333`
- yellow: `#ffcc00`
- blue: `#3366ff`
- green: `#33cc33`

EXAMPLE COMPONENT PROMPTS:

1. 做一个漫画风按钮：白底、4px solid #1a1a1a 边框、border-radius 0、box-shadow 4px 4px 0 #1a1a1a、18px 粗体全大写 0.08em 字距、padding 14px 28px。hover 时背景硬切到 #ffcc00、transform scale(1.05) rotate(1deg)、transition 100ms；active 时 translate(4px,4px)、box-shadow none。
