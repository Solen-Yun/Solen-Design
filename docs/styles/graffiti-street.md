# 涂鸦街头 — 风格参考

> 喷漆罐在砖墙上：撞色、粗边、随手歪着的字。

**Theme:** dark

涂鸦街头模拟砖墙与沥青墙面上的喷漆：深灰近黑底（#1c1c1e）、高饱和撞色（#ff2d55 玫红、#00e5ff 青、#ffea00 黄、#b620e0 紫、#ff6d00 橙）、文字用 900 字重全大写并随机旋转 -3 到 3 度、喷漆扩散靠多层 drop-shadow 模拟、按钮与标签用 4px 粗边框加硬偏移阴影、下划线用对比色当作喷漆划线。它的规则是「乱但可读」——每个元素都歪，但文字始终清楚。

## Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Spray Rose | `#ff2d55` | `--color-spray-rose` | 主色：主按钮、主标签与最抢眼的字。 |
| Asphalt | `#1c1c1e` | `--color-asphalt` | 页面底。模拟夜里的砖墙与沥青。 |
| Spray Cyan | `#00e5ff` | `--color-spray-cyan` | 第二撞色，与玫红形成最强对比。 |
| Spray Yellow | `#ffea00` | `--color-spray-yellow` | 高亮与描边，像荧光喷漆。 |
| Spray Violet | `#b620e0` | `--color-spray-violet` | 第三撞色，用于让画面失去统一色。 |
| Spray Orange | `#ff6d00` | `--color-spray-orange` | 第四撞色与警示，出现频率中等。 |

## Typography

### Inter — 只有 900 一个字重，全大写。标题压到行高 1.0 并带随机旋转，像手喷上去的。

- **Substitute:** 'Arial Black', Impact, sans-serif
- **Weights:** 900
- **Sizes:** 14, 18, 24, 34, 46, 64
- **Line height:** 1 (display), 1.1 (headings), 1.5 (body)
- **Letter spacing:** -0.02em on display, 0.04em on uppercase labels

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|---|---|---|---|---|---|---|
| display | — | 900 | 64px | 1 | -0.02em | `--text-display` |
| heading | — | 900 | 46px | 1.05 | -0.02em | `--text-heading` |
| subheading | — | 900 | 34px | 1.1 | — | `--text-subheading` |
| body-lg | — | 900 | 24px | 1.35 | — | `--text-body-lg` |
| body | — | 900 | 18px | 1.5 | — | `--text-body` |
| label | — | 900 | 14px | 1.4 | 0.04em | `--text-label` |

## Spacing & Layout

**Base unit:** 8px
**Density:** compact

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
| tags | 0 |

- **Page max-width:** 1200px
- **Section gap:** 64px
- **Card padding:** 24px
- **Element gap:** 16px

## Components

### Spray Tag

**Role:** 喷漆标签（核心组件）

透明底、4px 撞色描边、零圆角、14px/900 全大写、字距 0.04em、padding 6px 14px，带随机旋转 -3 到 3 度与 6px 6px 0 的硬阴影。文字用 2 到 3 层 drop-shadow（同色、偏移 1px、模糊 0）模拟喷漆的边晕。

### Brick Wall

**Role:** 砖墙底纹

用 repeating-linear-gradient 画错位的砖块（砖 64×24px、缝 4px、缝色更深），整体不透明度 40%。它必须错位（第二行砖从 32px 处开始），否则会看起来像地砖而不是砖墙。

### Thick Button

**Role:** 行动按钮

玫红填充、黑字、零圆角、4px 黑描边、18px/900 全大写、padding 12px 28px，硬阴影 6px 6px 0 青。hover 时填充硬切到黄、阴影换紫；按下时位移 6px 6px 且阴影归零。过渡 80ms linear。

- **Sizes:** padding 12px 28px; label 18px
- **States:** hover: yellow fill, violet shadow; active: translate 6px

### Spray Underline

**Role:** 喷漆划线

文字下方一条 4px 的撞色横线（text-decoration 或伪元素），长度比文字宽 4%，略微倾斜 1 到 2 度，颜色取与文字对比的撞色。它是这套风格最常用的强调手段。

### Sticker Blob

**Role:** 喷漆圆斑

一个 24 到 96px 的圆或不规则块，用 radial-gradient 从实色渐隐到透明，边缘不锐利（模糊 6 到 12px），像喷漆的扩散。颜色取一支撞色，不透明度 40% 到 70%，放在文字背后或角落。单屏 3 到 6 处。

## Do's and Don'ts

### Do

- 深灰底加四支高饱和撞色
- 文字 900 全大写并随机旋转
- 喷漆晕边用零模糊的 drop-shadow
- 4px 粗边框加硬偏移阴影
- 砖墙纹理必须错位
- 乱但可读

### Don't

- 不要用棚拍产品与干净影像
- 不要用圆角
- 不要给喷漆加真实模糊光晕
- 不要让旋转超过 3 度
- 不要让纹理变成地砖
- 不要牺牲可读性

## Surfaces

| Level | Name | Value | Purpose |
|---|---|---|---|
| 0 | Asphalt | `#1c1c1e` | 页面底 |
| 1 | Wall Panel | `#242427` | 面板 |
| 2 | Brick Pattern | `repeating gradient` | 砖墙纹理 |

## Elevation

- **Hard offset:** `6px 6px 0 #ff2d55`
- **Hard offset alt:** `6px 6px 0 #00e5ff`
- **Pressed:** `none`

## Imagery

街头摄影与涂鸦作品：砖墙、卷帘门、地铁车厢、手绘 tag。必须高对比、有街头痕迹。允许把照片压成高饱和双色调再叠喷漆效果。不使用棚拍产品、柔和插画与无痕迹的干净图像。

## Layout

上限 1200px、容器内边距 16px，区块间距 64px。允许元素重叠、旋转与溢出。零圆角贯穿全站。混乱必须有节奏：大 tag 与小贴纸交替，文字始终可读。

## Agent Prompt Guide

### Implementation Contract

- 以用户请求中的页面、用户任务和真实内容为依据，只实施指定范围；标明缺失的业务信息，不编造数据或能力。
- 先检查现有项目、技术栈与组件；沿用项目结构、路由和依赖，复用已有组件，不重建未要求的页面或功能。
- 沿用项目断点，调整窄屏与桌面的网格和留白；保留信息层级，避免意外横向溢出。
- 对本次涉及的交互，处理键盘焦点与减少动态效果；补齐适用的禁用、加载、空内容与错误状态。
- 完成后按项目现有脚本检查，仅报告实际运行的测试与视觉检查，并列出未验证项。

QUICK COLOR REFERENCE:

- text: `#ff2d55`
- background: `#1c1c1e`
- cyan: `#00e5ff`
- yellow: `#ffea00`
- violet: `#b620e0`
- orange: `#ff6d00`

EXAMPLE COMPONENT PROMPTS:

1. 做一个涂鸦街头版面：沥青黑 #1c1c1e 底、叠错位砖墙纹理（砖 64×24px、缝 4px、不透明度 40%、第二行从 32px 起）。标题 64px/900 全大写、字距 -0.02em、色 #ff2d55、rotate(-2deg)、叠 2 层同色 drop-shadow（偏移 1px、模糊 0）做喷漆边晕。按钮玫红 #ff2d55 填充、黑字、零圆角、4px 黑描边、硬阴影 6px 6px 0 #00e5ff，hover 时填充硬切到 #ffea00、阴影换 #b620e0。文字下加一条 4px 的 #00e5ff 划线并倾斜 1.5 度。角落放几个 24-96px 的喷漆圆斑（radial-gradient 渐隐、模糊 8px、不透明度 60%）。全站零圆角、旋转不超过 3 度。
