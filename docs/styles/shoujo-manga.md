# 少女漫画风 — 风格参考

> 樱花粉、网点、花瓣边框、缎带标题：每一格都在心动。

**Theme:** light

少女漫画风把日本少女漫画的视觉语汇搬到界面上：樱花粉主调、网点（screentone）纹理作背景、花瓣与蕾丝扇边作边框、缎带横幅作章节标题、金色多角星作闪光点缀。它的密度比其它风格高——装饰不是可选项而是身份，边角必须有花或星。圆角一律放大（按钮全圆、卡片 16px、面板 24px），底色保持珍珠白。禁止深色背景、禁止冷硬几何、禁止无装饰的裸卡片。

## Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Sakura | `#ffb7c5` | `--color-sakura` | 主色：缎带、边框与主行动。整套风格的第一语言。 |
| Pearl White | `#fff5f7` | `--color-pearl` | 页面底。带一丝粉的暖白，比纯白更接近少女漫画的纸张。 |
| Lavender | `#c4b5fd` | `--color-lavender` | 第二色，用于梦境与幻想场景的强调。 |
| Starlight | `#fde68a` | `--color-starlight` | 闪光与点缀。必须带 4px 的柔光，否则不像星星。 |
| Petal | `#fecdd3` | `--color-petal` | 大面积柔和区块与网点底色。 |
| Peach Rose | `#f8a9d7` | `--color-peach-rose` | 情绪最强的一支，用于「心动」时刻的关键按钮。 |

## Typography

### Quicksand — 标题与按钮。圆润的几何无衬线自带柔软感，是这套风格的基础语气。

- **Substitute:** 'Comic Sans MS', 'Trebuchet MS', sans-serif
- **Weights:** 400, 600, 700
- **Sizes:** 13, 15, 18, 24, 32, 44
- **Line height:** 1.15 (display), 1.25 (headings), 1.7 (body)
- **Letter spacing:** 0.02em on display, 0.1em on uppercase labels

### Nunito — 正文与对白。行高 1.75，读起来像漫画的旁白框。

- **Substitute:** 'Segoe UI', system-ui, sans-serif
- **Weights:** 400, 600
- **Sizes:** 13, 15, 17
- **Line height:** 1.4 (display), 1.4 (headings), 1.75 (body)
- **Letter spacing:** 0 on display, 0.1em on uppercase labels

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|---|---|---|---|---|---|---|
| display | Quicksand | 700 | 44px | 1.15 | 0.02em | `--text-display` |
| heading | Quicksand | 700 | 32px | 1.2 | — | `--text-heading` |
| subheading | Quicksand | 600 | 24px | 1.3 | — | `--text-subheading` |
| body-lg | Nunito | 400 | 17px | 1.75 | — | `--text-body-lg` |
| body | Nunito | 400 | 15px | 1.75 | — | `--text-body` |
| label | Quicksand | 600 | 13px | 1.45 | 0.1em | `--text-label` |

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
| cards | 16px |
| panels | 24px |
| buttons | 999px |
| inputs | 999px |

- **Page max-width:** 1080px
- **Section gap:** 96px
- **Card padding:** 32px
- **Element gap:** 20px

## Components

### Ribbon Banner

**Role:** 缎带标题（识别核心）

樱花粉填充、零描边，主体高 40px、左右内边距 32px，两端各用 clip-path 切出 V 形燕尾（各 16px 宽）。文字用 Quicksand 700、18px、珍珠白、字距 0.1em。缎带下方可加一条 1px 的粉色投影线增加厚度。

### Lace Card

**Role:** 内容卡（带蕾丝扇边）

白底、16px 圆角、1px 樱花粉 40% 描边、内边距 32px、阴影 0 8px 24px 粉 35%。顶部或四边用 radial-gradient 做 8px 半径的波浪扇边（间隔 16px）。左上角放一个 14px 的樱花粉花朵图标作为角饰。

### Sparkle

**Role:** 多角星闪光

四角星形状（两个交叉的 2px 细长菱形或用 SVG），尺寸 8px 到 20px，填星光金并带 4px 柔光。散布在卡片角落与标题旁，单屏 3 到 6 个，不做动画或只做 4 秒的缓慢明暗呼吸。

### Pill Button

**Role:** 行动按钮

桃红或樱花粉填充、珍珠白文字、999px 全圆角、无描边、15px/700、padding 12px 28px，阴影 0 6px 16px 粉 40%。hover 时填充提亮并放大到 1.03；按下缩到 0.97。过渡 250ms ease-out。

### Screentone Bed

**Role:** 网点背景层

在区块背景上叠一层 4px 间隔、半径 0.8px 的花瓣粉网点（radial-gradient），整体不透明度 25% 到 35%。它是漫画印刷的暗示，不可超过这个强度，否则文字会糊。

## Do's and Don'ts

### Do

- 樱花粉为主调
- 边角必须有花或星
- 章节标题用缎带横幅
- 叠一层 25% 到 35% 的网点
- 圆角放大：按钮全圆、卡片 16px
- 闪光必须带柔光

### Don't

- 不要用深色或暗调背景
- 不要用冷硬几何
- 不要做无装饰的裸卡片
- 不要让网点超过 35%
- 不要用小圆角
- 不要用写实摄影

## Surfaces

| Level | Name | Value | Purpose |
|---|---|---|---|
| 0 | Pearl White | `#fff5f7` | 页面底 |
| 1 | White | `#ffffff` | 卡片 |
| 2 | Screentone | `radial-gradient dot pattern` | 网点纹理层 |

## Elevation

- **Card:** `0 8px 24px rgba(255,183,197,0.35)`
- **Sparkle:** `0 0 4px rgba(253,230,138,0.90)`

## Imagery

漫画风插画：人物特写、花瓣、缎带、闪光与网点阴影。允许把照片处理成网点单色后作为回忆场景。不使用写实摄影、冷色几何与暗调图像。

## Layout

上限 1080px、容器内边距 24px，区块间距 96px。允许卡片轻微旋转（-2 到 2 度）与错位堆叠。标题区常为居中缎带，内容以两列或三列卡片展开。装饰密度高于常规，但正文行宽不超过 34em。

## Agent Prompt Guide

### Implementation Contract

- 以用户请求中的页面、用户任务和真实内容为依据，只实施指定范围；标明缺失的业务信息，不编造数据或能力。
- 先检查现有项目、技术栈与组件；沿用项目结构、路由和依赖，复用已有组件，不重建未要求的页面或功能。
- 沿用项目断点，调整窄屏与桌面的网格和留白；保留信息层级，避免意外横向溢出。
- 对本次涉及的交互，处理键盘焦点与减少动态效果；补齐适用的禁用、加载、空内容与错误状态。
- 完成后按项目现有脚本检查，仅报告实际运行的测试与视觉检查，并列出未验证项。

QUICK COLOR REFERENCE:

- text: `#5a4a52`
- background: `#fff5f7`
- card: `#ffffff`
- sakura: `#ffb7c5`
- starlight: `#fde68a`
- lavender: `#c4b5fd`

EXAMPLE COMPONENT PROMPTS:

1. 做一个少女漫画风卡片：白底、16px 圆角、1px rgba(255,183,197,0.4) 描边、内边距 32px、阴影 0 8px 24px rgba(255,183,197,0.35)。顶部用 radial-gradient 做 8px 蕾丝扇边（间隔 16px）。左上角放一个 14px 樱花粉花朵图标，右下角放两个 12px 星光金四角星（带 0 0 4px rgba(253,230,138,0.9) 柔光）。标题用 Quicksand 700 24px，正文 Nunito 15px/1.75。区块背景可叠 4px 间隔的 #fecdd3 网点（30% 不透明度）。页面底色 #fff5f7。
