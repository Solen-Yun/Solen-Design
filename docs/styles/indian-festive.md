# 印度节庆 — 风格参考

> 朱红、藏红花橙、金线曼陀罗：排灯节的一盏灯。

**Theme:** light

印度节庆来自排灯节与洒红节的视觉：象牙白底（#fff8e7）、朱红（#e63946）与藏红花橙（#ff9f1c）作主强调、金（#d4af37）大量用于装饰线与光晕、皇家紫（#7b2d8e）与孔雀绿（#2a9d8f）作辅色。曼陀罗、油灯（diya）、花瓣与珠宝纹样是主要图形，圆角取 12px 传达柔和，标题粗体加宽字距。与伊斯兰几何的精密不同，这里允许铺满与重叠——节庆本身就是密的。

## Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Vermilion | `#e63946` | `--color-vermilion` | 主色：主按钮、纱丽红与最抢眼的区块。 |
| Ivory | `#fff8e7` | `--color-ivory` | 页面底。暖白，像节日里的灯光照在墙上。 |
| Saffron | `#ff9f1c` | `--color-saffron` | 第二强调：花瓣、油灯火与渐变的一极。 |
| Gold | `#d4af37` | `--color-gold` | 装饰线、描边与光晕。节庆感的来源，可大量使用。 |
| Royal Violet | `#7b2d8e` | `--color-royal-violet` | 辅色与深色区块，用于压低整体的暖度。 |
| Peacock Teal | `#2a9d8f` | `--color-peacock-teal` | 辅色与「成功」语义，是画面里唯一偏冷的色。 |

## Typography

### Cormorant Garamond — 衬线体，标题 700 加宽字距。装饰性来自字形而不是额外的字族。

- **Substitute:** Georgia, 'Songti SC', serif
- **Weights:** 400, 700
- **Sizes:** 14, 17, 22, 30, 40, 54
- **Line height:** 1.2 (display), 1.3 (headings), 1.7 (body)
- **Letter spacing:** 0.02em on display, 0.16em on uppercase labels

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|---|---|---|---|---|---|---|
| display | — | 700 | 54px | 1.2 | 0.02em | `--text-display` |
| heading | — | 700 | 40px | 1.3 | — | `--text-heading` |
| subheading | — | 400 | 30px | 1.4 | — | `--text-subheading` |
| body-lg | — | 400 | 22px | 1.65 | — | `--text-body-lg` |
| body | — | 400 | 17px | 1.7 | — | `--text-body` |
| label | — | 700 | 14px | 1.5 | 0.16em | `--text-label` |

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
| buttons | 12px |
| inputs | 12px |
| medallions | 999px |

- **Page max-width:** 1120px
- **Section gap:** 96px
- **Card padding:** 32px
- **Element gap:** 24px

## Components

### Mandala Card

**Role:** 曼陀罗卡片（核心组件）

白或象牙填充、12px 圆角、1px 金 50% 描边、内边距 32px，外带 0 0 20px 金 35% 的柔光。顶部中央放一个 96 到 160px 的曼陀罗（同心圆加 8 到 16 片对称花瓣，1px 金线绘制，中心一个朱红点）。标题 40px/700 朱红，正文 17px 暖灰。

### Festive Button

**Role:** 行动按钮

朱红填充、象牙文字、12px 圆角、1px 金 60% 描边、17px/700、字距 0.16em、padding 14px 32px，外带 0 0 20px 金 35% 柔光。hover 时填充转藏红花橙、描边升到 100%；按下缩放 0.98。过渡 250ms ease-out。

- **Sizes:** padding 14px 32px; label 17px
- **States:** hover: saffron fill, gold border full; active: scale 0.98

### Diya Lamp

**Role:** 油灯装饰

一个 32 到 64px 的陶碗形（border-radius 40% 40% 50% 50%），填朱红或金，碗口上方放一个 16px 的水滴形火焰（藏红花橙到黄的径向渐变）并带 0 0 16px 橙 60% 的柔光。它是最能标识节庆的元素，单屏 2 到 4 盏。

### Jewel Gradient

**Role:** 珠宝色渐变带

一条横向渐变带（朱红经藏红花到金，或紫经孔雀绿到金），高 8 到 16px，用于区块之间或卡片顶部。渐变必须平滑且只有三站，越界会变成浑浊。

### Petal Scatter

**Role:** 花瓣散落装饰

8 到 20 片小的花瓣或圆形（各 8 到 16px），颜色取藏红花、朱红或金，不透明度 40% 到 80%，随机散布在区块上并各自旋转 0 到 90 度。它模拟洒红节的彩粉与花瓣，单屏 1 到 2 组。

## Do's and Don'ts

### Do

- 象牙底配朱红与藏红花橙
- 金可大量用于装饰线与光晕
- 曼陀罗与油灯作图形语汇
- 圆角 12px
- 渐变带恰好三站
- 允许装饰铺满与重叠

### Don't

- 不要用冷调摄影
- 不要用极简构图
- 不要让渐变超过三站
- 不要用锐角
- 不要让装饰压过文字
- 不要混用两套圆角

## Surfaces

| Level | Name | Value | Purpose |
|---|---|---|---|
| 0 | Ivory | `#fff8e7` | 页面底 |
| 1 | White Card | `#ffffff` | 卡片 |
| 2 | Gold Ground | `rgba(212,175,55,0.16)` | 金色装饰底 |

## Elevation

- **Gold glow:** `0 0 20px rgba(212,175,55,0.35)`
- **Warm lift:** `0 8px 24px rgba(230,57,70,0.14)`

## Imagery

节庆摄影与装饰图：油灯、花瓣、纱丽纹样、珠宝、曼陀罗、彩粉。必须暖调、饱和、可见金色。允许把照片处理成暖金调。不使用冷调摄影、极简构图与无装饰图像。

## Layout

上限 1120px、容器内边距 24px，区块间距 96px。允许装饰铺满与重叠——节庆的密度是内容的一部分。标题常居中，正文可左对齐。

## Agent Prompt Guide

### Implementation Contract

- 以用户请求中的页面、用户任务和真实内容为依据，只实施指定范围；标明缺失的业务信息，不编造数据或能力。
- 先检查现有项目、技术栈与组件；沿用项目结构、路由和依赖，复用已有组件，不重建未要求的页面或功能。
- 沿用项目断点，调整窄屏与桌面的网格和留白；保留信息层级，避免意外横向溢出。
- 对本次涉及的交互，处理键盘焦点与减少动态效果；补齐适用的禁用、加载、空内容与错误状态。
- 完成后按项目现有脚本检查，仅报告实际运行的测试与视觉检查，并列出未验证项。

QUICK COLOR REFERENCE:

- text: `#e63946`
- background: `#fff8e7`
- saffron: `#ff9f1c`
- gold: `#d4af37`
- violet: `#7b2d8e`
- teal: `#2a9d8f`

EXAMPLE COMPONENT PROMPTS:

1. 做一个印度节庆卡片：白或象牙 #fff8e7 填充、12px 圆角、1px rgba(212,175,55,0.5) 描边、内边距 32px、box-shadow 0 0 20px rgba(212,175,55,0.35)。顶部居中放一个 120px 的曼陀罗（同心圆加 12 片对称花瓣、1px 金线、中心一个朱红 #e63946 点）。标题 40px/700 Cormorant Garamond、色 #e63946、字距 0.02em；正文 17px、色 #5a4a3a。按钮 #e63946 填充、象牙文字、12px 圆角、1px 金描边、padding 14px 32px、金柔光，hover 时填充转 #ff9f1c。区块顶部加一条 12px 的三站渐变带（#e63946 → #ff9f1c → #d4af37）。页面底色 #fff8e7。
