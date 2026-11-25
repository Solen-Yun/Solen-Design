# 伊斯兰几何 — 风格参考

> 无限延展的镶嵌图案、金与深蓝、严格的对称：装饰即秩序。

**Theme:** light

伊斯兰几何来自清真寺与经书的装饰传统：用精确的镶嵌图案（八芒星、六边形、几何交织）构成无限延展的边框与底纹，配色是深蓝（#1a3a5c）、金（#c9a74e）与象牙白（#f5ecd7）的经典组合，辅以墨绿（#2d7d46）与绛红（#8b2332）。布局严格对称并居中，边框用 2px 金线，阴影是极淡的金色扩散。它禁止荧光与霓虹、禁止不对称的混乱布局、禁止极简无装饰（适度装饰才是核心）、禁止手写与卡通字体。

## Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Deep Blue | `#1a3a5c` | `--color-deep-blue` | 主色：深色区块与图案底。瓷砖的蓝。 |
| Ivory | `#f5ecd7` | `--color-ivory` | 页面底与图文的纸色。 |
| Gold | `#c9a74e` | `--color-gold` | 所有描边、图案线与强调。装饰的主要载体。 |
| Forest | `#2d7d46` | `--color-forest` | 第二辅色，用于植物纹样与次级区块。 |
| Crimson | `#8b2332` | `--color-crimson` | 第三辅色，用于强调与需要跳出的细节。 |
| Bright Green | `#6bc15e` | `--color-bright-green` | 最亮的一支，只在图案的小面积出现。 |

## Typography

### Cormorant Garamond — 优雅衬线，标题居中并加宽字距。行高 1.75 让文字也有装饰的从容。

- **Substitute:** 'EB Garamond', Georgia, 'Songti SC', serif
- **Weights:** 400, 600
- **Sizes:** 15, 18, 22, 30, 40, 54
- **Line height:** 1.2 (display), 1.35 (headings), 1.75 (body)
- **Letter spacing:** 0.02em on display, 0.2em on uppercase labels

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|---|---|---|---|---|---|---|
| display | — | 600 | 54px | 1.2 | 0.02em | `--text-display` |
| heading | — | 600 | 40px | 1.3 | — | `--text-heading` |
| subheading | — | 400 | 30px | 1.4 | — | `--text-subheading` |
| body-lg | — | 400 | 22px | 1.7 | — | `--text-body-lg` |
| body | — | 400 | 18px | 1.75 | — | `--text-body` |
| label | — | 600 | 15px | 1.55 | 0.2em | `--text-label` |

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
| cards | 12px |
| buttons | 8px |
| inputs | 8px |
| arches | 50% 50% 0 0 |

- **Page max-width:** 1080px
- **Section gap:** 128px
- **Card padding:** 32px
- **Element gap:** 24px

## Components

### Tessellation Border

**Role:** 镶嵌边框（核心组件）

用 SVG pattern 或重复的 conic-gradient 做出八芒星与六边形的交织图案，线宽 1px、色金 70%，单元尺寸 48px。作为区块边框（宽 24 到 48px）或底纹（不透明度降到 8%）。图案必须严格重复、无缝衔接。

### Arch Frame

**Role:** 拱形框

卡片顶部用 border-radius: 50% 50% 0 0 做出尖拱或半圆拱、2px 金描边、内部填深蓝或象牙、内边距 32px。四角各加一个 12px 的几何角饰（四分之一星）。

### Gold Button

**Role:** 行动按钮

金填充、深蓝文字、8px 圆角、1px 深蓝 30% 描边、15px/600、字距 0.2em、padding 14px 32px，阴影 0 4px 12px 金 20%。hover 时填充提亮 6%、阴影扩到 24px；按下缩放 0.98。四角可加 4px 的几何切角。

- **Sizes:** padding 14px 32px; label 15px
- **States:** hover: brighter, shadow 24px; active: scale 0.98

### Arabesque Divider

**Role:** 植物纹分隔

一条 1px 金线的横线，中央嵌入一个 32px 的对称卷草纹（用 SVG path 画），左右各延伸一段交织的藤蔓。它替代普通分隔线，是版面上最典型的装饰语汇。

### Star Medallion

**Role:** 星形徽章

48 到 120px 的八芒星或十六芒星（两个正方形叠转 45 度），1px 金描边填深蓝或绛红，中心一个 8px 的亮绿或金圆点。放在区块中央或标题上方，单屏 1 到 2 处。

## Do's and Don'ts

### Do

- 深蓝、金、象牙的经典三色
- 镶嵌图案必须无缝且精确重复
- 布局严格对称并居中
- 边框 2px 金线加几何角饰
- 阴影是极淡的金色扩散
- 植物纹用对称卷草

### Don't

- 不要用荧光或霓虹色
- 不要用不对称的混乱布局
- 不要极简无装饰
- 不要用手写或卡通字体
- 不要让图案失准
- 不要在一屏放两处以上镶嵌边框

## Surfaces

| Level | Name | Value | Purpose |
|---|---|---|---|
| 0 | Ivory | `#f5ecd7` | 页面底 |
| 1 | Deep Blue | `#1a3a5c` | 深色区块 |
| 2 | Gold Line | `rgba(201,167,78,0.20)` | 图案线 |

## Elevation

- **Gold soft:** `0 4px 12px rgba(201,167,78,0.20)`
- **Gold stronger:** `0 8px 24px rgba(201,167,78,0.28)`

## Imagery

建筑与装饰摄影：清真寺瓷砖、穹顶、木雕、经书页。必须有图案细节与对称构图。允许把照片处理成深蓝金双色调。不使用写实人物摄影、霓虹图像与不对称构图。

## Layout

上限 1080px、容器内边距 24px，区块间距 128px。严格对称并居中——这是整套风格不可协商的部分。所有区块四边可加镶嵌边框，但同一屏不超过两处，否则会拥挤。

## Agent Prompt Guide

### Implementation Contract

- 以用户请求中的页面、用户任务和真实内容为依据，只实施指定范围；标明缺失的业务信息，不编造数据或能力。
- 先检查现有项目、技术栈与组件；沿用项目结构、路由和依赖，复用已有组件，不重建未要求的页面或功能。
- 沿用项目断点，调整窄屏与桌面的网格和留白；保留信息层级，避免意外横向溢出。
- 对本次涉及的交互，处理键盘焦点与减少动态效果；补齐适用的禁用、加载、空内容与错误状态。
- 完成后按项目现有脚本检查，仅报告实际运行的测试与视觉检查，并列出未验证项。

QUICK COLOR REFERENCE:

- text: `#1a3a5c`
- background: `#f5ecd7`
- gold: `#c9a74e`
- forest: `#2d7d46`
- crimson: `#8b2332`
- blue: `#1a3a5c`

EXAMPLE COMPONENT PROMPTS:

1. 做一个伊斯兰几何卡片：象牙 #f5ecd7 填充、顶部 border-radius 50% 50% 0 0 做出拱形、2px solid #c9a74e 描边、内边距 32px、box-shadow 0 4px 12px rgba(201,167,78,0.2)。上方居中放一个 64px 的八芒星（两个正方形叠转 45 度、1px 金描边、填 #1a3a5c）。标题 40px/600 Cormorant Garamond、居中、字距 0.02em、色 #1a3a5c；正文 18px、行高 1.75。卡片下方用一条 1px 金线加中央 32px 对称卷草纹分隔。全部对称居中，零荧光色。
