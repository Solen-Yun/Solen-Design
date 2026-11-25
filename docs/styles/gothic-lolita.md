# 哥特萝莉风 — 风格参考

> 黑缎带、蕾丝边、十字与玫瑰：暗色浪漫的精细装饰。

**Theme:** dark

哥特萝莉风把哥特建筑装饰与洛丽塔的精致细节缝在一起：黑底（#1a1a1a）上装深紫（#4a1a4a）与血红（#8b1a2a），文字用浅灰白（#e5e5e5），衬线字体带装饰性，图案必须是严格对称的哥特花纹、十字架与玫瑰，边框用蕾丝扇边或缎带。它的禁令是：不许明亮鲜艳的颜色、不许可爱卡通元素、不许现代极简、不许过于圆润的形状——圆润会把它推向甜系，而它要的是暗。

## Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Deep Violet | `#4a1a4a` | `--color-deep-violet` | 主色：缎带、边框与强调区块。黑与血红之间的过渡。 |
| Blood Red | `#8b1a2a` | `--color-blood-red` | 第二主色：玫瑰、十字与关键强调。 |
| Black | `#1a1a1a` | `--color-black` | 页面底与主体裁。整套风格的暗色基础。 |
| Pale Silver | `#e5e5e5` | `--color-pale-silver` | 文字与蕾丝。不是纯白，带一点灰的缎面光。 |
| Mid Violet | `#6b2d5b` | `--color-mid-violet` | 抬升面与次级装饰，比主紫亮一档。 |

## Typography

### Cormorant Garamond — 装饰性衬线，标题加 0.22em 的宽字距像蕾丝边，正文行高 1.75。

- **Substitute:** 'EB Garamond', Georgia, 'Songti SC', serif
- **Weights:** 400, 600
- **Sizes:** 14, 17, 21, 28, 38, 52
- **Line height:** 1.15 (display), 1.3 (headings), 1.75 (body)
- **Letter spacing:** 0.03em on display, 0.22em on uppercase labels

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|---|---|---|---|---|---|---|
| display | — | 600 | 52px | 1.15 | 0.03em | `--text-display` |
| heading | — | 600 | 38px | 1.25 | 0.03em | `--text-heading` |
| subheading | — | 400 | 28px | 1.35 | — | `--text-subheading` |
| body-lg | — | 400 | 21px | 1.7 | — | `--text-body-lg` |
| body | — | 400 | 17px | 1.75 | — | `--text-body` |
| label | — | 600 | 14px | 1.55 | 0.22em | `--text-label` |

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
| cards | 4px |
| buttons | 2px |
| stamps | 999px |
| frames | 50% 50% 0 0 |

- **Page max-width:** 1040px
- **Section gap:** 112px
- **Card padding:** 32px
- **Element gap:** 24px

## Components

### Lace Frame

**Role:** 蕾丝扇边框架（核心组件）

深紫填充、4px 圆角、1px 浅灰白 25% 描边、内边距 32px。四边用 radial-gradient 做 8px 半径的扇贝边（间隔 16px），四角各放一个 16px 的对称哥特纹（十字或卷草，用 1px 浅灰白线画）。

### Ribbon Button

**Role:** 行动按钮

深紫填充、浅灰白文字、2px 圆角、1px 浅灰白 30% 描边、14px/600、字距 0.22em、padding 14px 32px。两端用 clip-path 切出缎带的燕尾（各 10px），外发光 0 0 20px 深紫 60%。hover 时描边升到 60%、文字转血红、发光扩到 32px；按下时缩到 0.98。过渡 300ms。

- **Sizes:** padding 14px 32px; label 14px
- **States:** hover: blood red text, wider glow; active: scale 0.98

### Rose Motif

**Role:** 玫瑰与十字装饰

48 到 96px 的对称玫瑰（8 到 12 片花瓣，双层）或十字，用 1px 线稿或平涂血红。必须严格左右对称——哥特萝莉的装饰不允不对称。放在框架四角或标题两侧，单屏 2 到 3 处。

### Cameo Portrait

**Role:** 浮雕头像框

96 到 160px 的椭圆框、2px 浅灰白 40% 描边、内部填深紫或放灰度肖像、外圈再加一层 4px 的深紫描边。它模仿维多利亚时代的浮雕胸针，用于角色与作者头像。

### Cross Divider

**Role:** 十字分隔线

一条 1px 浅灰白 30% 的横线，中央嵌一个 16px 的血红十字，两侧各有一个 4px 的菱形。用于区块之间，替代普通分隔线。

## Do's and Don'ts

### Do

- 黑底配深紫与血红
- 装饰必须严格对称
- 用蕾丝扇边与缎带
- 装饰性衬线加宽字距
- 文字用浅灰白而非纯白
- 玫瑰与十字作标记

### Don't

- 不要用明亮鲜艳的颜色
- 不要用可爱卡通元素
- 不要现代极简
- 不要用过于圆润的形状
- 不要用不对称装饰
- 不要用纯白

## Surfaces

| Level | Name | Value | Purpose |
|---|---|---|---|
| 0 | Black | `#1a1a1a` | 页面底 |
| 1 | Deep Violet | `#4a1a4a` | 卡片 |
| 2 | Blood Red | `#8b1a2a` | 强调块 |

## Elevation

- **None:** `none — depth comes from ornament`
- **Violet glow:** `0 0 20px rgba(74,26,74,0.60)`

## Imagery

暗调摄影与插画：蕾丝、缎带、玫瑰、烛台、十字架、哥特建筑细节。必须低饱和、暗部丰富，允许棕黑单色。不使用明亮摄影、可爱插画与彩色卡通。

## Layout

上限 1040px、容器内边距 32px，区块间距 112px。以严格对称为主（与哥特一致），允许元素居中堆叠。留白宽松，装饰密度高于常规但必须对称。

## Agent Prompt Guide

### Implementation Contract

- 以用户请求中的页面、用户任务和真实内容为依据，只实施指定范围；标明缺失的业务信息，不编造数据或能力。
- 先检查现有项目、技术栈与组件；沿用项目结构、路由和依赖，复用已有组件，不重建未要求的页面或功能。
- 沿用项目断点，调整窄屏与桌面的网格和留白；保留信息层级，避免意外横向溢出。
- 对本次涉及的交互，处理键盘焦点与减少动态效果；补齐适用的禁用、加载、空内容与错误状态。
- 完成后按项目现有脚本检查，仅报告实际运行的测试与视觉检查，并列出未验证项。

QUICK COLOR REFERENCE:

- text: `#e5e5e5`
- background: `#1a1a1a`
- violet: `#4a1a4a`
- red: `#8b1a2a`
- mid: `#6b2d5b`
- lace: `#e5e5e5`

EXAMPLE COMPONENT PROMPTS:

1. 做一个哥特萝莉卡片：深紫 #4a1a4a 填充、4px 圆角、1px rgba(229,229,229,0.25) 描边、内边距 32px。四边用 radial-gradient 做 8px 蕾丝扇边（间隔 16px），四角各一个 16px 的对称哥特十字（1px 浅灰白线）。标题 38px/600 Cormorant Garamond、字距 0.22em、色 #e5e5e5；正文 17px、行高 1.75。按钮深紫填充、浅灰白文字、2px 圆角、两端 clip-path 切缎带燕尾、外发光 0 0 20px rgba(74,26,74,0.6)，hover 时文字转血红 #8b1a2a。页面底色 #1a1a1a。
