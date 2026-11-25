# 非洲纺织 — 风格参考

> 肯特布的经纬、阿迪雷的染痕：颜色与结构一起织出来。

**Theme:** dark

非洲纺织来自西非的肯特布（Kente）与阿迪雷扎染（Adire）：深木色底（#2c1810）传达厚重感，肯特橙（#c4501f）与金（#f0c75e）作强调，沙（#e8d5b5）作卡片与辅助底，森林绿（#1a5632）作文字与装饰。核心图形是几何织纹——条纹、棋盘与菱形的交替重复，像布上的经纬；边框用 2 到 4px 的粗线传达织物结构；圆角保持 8px，手工但不粗糙；标题粗体全大写加宽字距，有庄重感。

## Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Kente Orange | `#c4501f` | `--color-kente-orange` | 第一主色：主按钮、条纹与最抢眼的织纹带。 |
| Dark Wood | `#2c1810` | `--color-dark-wood` | 页面底。深到让橙与金都显暖。 |
| Gold | `#f0c75e` | `--color-gold` | 第二主色：织纹里的亮线、高光与徽标。 |
| Forest | `#1a5632` | `--color-forest` | 文字与装饰色，也是织纹的第三支。 |
| Sand | `#e8d5b5` | `--color-sand` | 卡片与浅色区块底。对深木的平衡。 |
| Sprout | `#80e671` | `--color-sprout` | 最亮的一支，只在极小面积出现作点缀。 |

## Typography

### Inter — 粗无衬线，标题 900 字重、全大写、字距 0.24em。宽字距像织物的经线间距。

- **Substitute:** 'Arial Black', Helvetica, sans-serif
- **Weights:** 700, 900
- **Sizes:** 13, 16, 21, 28, 36, 48
- **Line height:** 1.15 (display), 1.25 (headings), 1.6 (body)
- **Letter spacing:** 0.02em on display, 0.24em on uppercase labels

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|---|---|---|---|---|---|---|
| display | — | 900 | 48px | 1.15 | 0.02em | `--text-display` |
| heading | — | 900 | 36px | 1.2 | 0.02em | `--text-heading` |
| subheading | — | 700 | 28px | 1.3 | — | `--text-subheading` |
| body-lg | — | 700 | 21px | 1.5 | — | `--text-body-lg` |
| body | — | 700 | 16px | 1.6 | — | `--text-body` |
| label | — | 900 | 13px | 1.4 | 0.24em | `--text-label` |

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
| cards | 8px |
| buttons | 6px |
| inputs | 6px |

- **Page max-width:** 1160px
- **Section gap:** 96px
- **Card padding:** 28px
- **Element gap:** 20px

## Components

### Kente Band

**Role:** 肯特织纹带（签名）

一条 24 到 64px 高的织纹带，用 repeating-linear-gradient 交替排列四种色（橙、金、森林绿、沙）的竖条纹，条纹宽 8 到 16px 且不均匀（宽窄交替）。带内每 3 条加一个菱形或棋盘小格。它出现在页头、区块之间或卡片顶部。

### Woven Card

**Role:** 织物卡片（核心组件）

沙色填充、8px 圆角、4px 深木描边、内边距 28px，顶部接一条 12px 的肯特织纹带。标题 36px/900 全大写森林绿、字距 0.02em，正文 16px 深木 85%。hover 时描边换肯特橙、整体上浮 2px。

- **States:** hover: orange border, lift 2px

### Weave Button

**Role:** 行动按钮

肯特橙填充、金色文字、6px 圆角、2px 深木描边、13px/900 全大写、字距 0.24em、padding 14px 32px，硬阴影 0 4px 0 深木 60%。hover 时填充转金、文字转深木；按下时位移 4px 4px 且阴影归零。过渡 120ms linear。

- **Sizes:** padding 14px 32px; label 13px
- **States:** hover: inverted; active: translate 4px

### Adire Wash

**Role:** 扎染纹理底

用多层 radial-gradient（8 到 16px 的圆、随机错位）在底色上叠出扎染的不规则圆斑，色取金或橙、不透明度 8% 到 15%。它必须是「不均匀的重复」，规则的点阵会立刻看起来像 UI 而不是布。

### Diamond Motif

**Role:** 菱形与棋盘装饰

24 到 48px 的实心菱形（rotate 45 度的方块）或 2×2 棋盘，填金、橙或森林绿，成组排列（2 到 4 个）。它们模拟织物上的符号纹样，放在卡片角落或分区之间，单屏 2 到 3 组。

## Do's and Don'ts

### Do

- 深木底配肯特橙与金
- 织纹带用交替条纹加小格
- 边框 2 到 4px 传达织物结构
- 标题全大写加宽字距
- 圆角 8px，手工但不粗糙
- 扎染纹理必须不均匀

### Don't

- 不要用冷调摄影
- 不要用规则点阵冒充织纹
- 不要用细边框
- 不要用大圆角
- 不要用现代极简
- 不要让织纹抢过内容

## Surfaces

| Level | Name | Value | Purpose |
|---|---|---|---|
| 0 | Dark Wood | `#2c1810` | 页面底 |
| 1 | Sand Card | `#e8d5b5` | 卡片 |
| 2 | Woven Band | `#c4501f` | 织纹带 |

## Elevation

- **Cloth lift:** `0 4px 0 rgba(44,24,16,0.60)`
- **Cloth depth:** `0 8px 24px rgba(44,24,16,0.50)`

## Imagery

织物与手工艺摄影：肯特布、扎染、编织篮、陶罐、市场场景。必须暖调、高对比、可见织纹。允许把照片裁成条带嵌入织纹结构。不使用冷调摄影、现代极简与无织纹的图像。

## Layout

上限 1160px、容器内边距 24px，区块间距 96px。织纹带作为分区手段（替代普通分隔线）。允许卡片以不同宽度错落排列，像布的拼缝。

## Agent Prompt Guide

### Implementation Contract

- 以用户请求中的页面、用户任务和真实内容为依据，只实施指定范围；标明缺失的业务信息，不编造数据或能力。
- 先检查现有项目、技术栈与组件；沿用项目结构、路由和依赖，复用已有组件，不重建未要求的页面或功能。
- 沿用项目断点，调整窄屏与桌面的网格和留白；保留信息层级，避免意外横向溢出。
- 对本次涉及的交互，处理键盘焦点与减少动态效果；补齐适用的禁用、加载、空内容与错误状态。
- 完成后按项目现有脚本检查，仅报告实际运行的测试与视觉检查，并列出未验证项。

QUICK COLOR REFERENCE:

- text: `#1a5632`
- background: `#2c1810`
- orange: `#c4501f`
- gold: `#f0c75e`
- sand: `#e8d5b5`
- forest: `#1a5632`

EXAMPLE COMPONENT PROMPTS:

1. 做一个非洲纺织卡片：沙色 #e8d5b5 填充、8px 圆角、4px solid #2c1810 描边、内边距 28px。顶部接一条 12px 高的肯特织纹带：用 repeating-linear-gradient 交替 #c4501f、#f0c75e、#1a5632、#e8d5b5 的竖条纹，条纹宽窄交替（8px 与 16px），每三条加一个菱形小格。标题 36px/900 Inter 全大写、字距 0.02em、色 #1a5632；正文 16px、色 rgba(44,24,16,0.85)。按钮 #c4501f 填充、金色文字、6px 圆角、2px 深木描边、硬阴影 0 4px 0 rgba(44,24,16,0.6)，hover 时填充转 #f0c75e、文字转深木。页面底色 #2c1810。
