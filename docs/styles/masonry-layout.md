# 瀑布流布局 — 风格参考

> 高度不一的卡片顺着列往下淌，扫描线永远不是水平的。

**Theme:** light

瀑布流是一种排布策略：卡片宽度固定、高度随内容变化，用多列容器让它自然错落。它的视觉语言必须让位给内容——卡片白底、8 到 16px 圆角、极浅描边，图片占卡片 60% 以上面积。间距必须严格一致（16px），否则错落会变成混乱。hover 时图片以 1.05 倍缓慢放大并叠加一层 4% 的黑，卡片本身不上浮也不加阴影，因为任何位移都会破坏列的稳定。筛选条用胶囊按钮，选中态填主色。

## Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Midnight | `#1a1a2e` | `--color-midnight` | 标题、选中态与深色区块。接近黑但带一点紫，与图片内容更协调。 |
| Mist | `#f5f5f5` | `--color-mist` | 页面底色。比白低一档，让白卡片的边界清晰。 |
| Card White | `#ffffff` | `--color-card-white` | 所有卡片填充。白卡是为了让图片成为唯一的视觉重量，卡片本身不参与竞争。 |
| Rose Red | `#e94560` | `--color-rose-red` | 主强调：喜欢、收藏与选中胶囊。全站唯一的高饱和色。 |
| Mint | `#16c79a` | `--color-mint` | 成功与新内容标记，只用于徽标。 |
| Amber | `#ffd460` | `--color-amber` | 高亮与推荐位，面积不超过一张卡片的 10%。 |
| Indigo | `#7579e7` | `--color-indigo` | 链接与次级动作，与玫红形成冷暖对位。 |

## Typography

### Inter — 全站唯一字体。卡片标题 600、说明 400，字级偏小以便在密集中保持可读。

- **Substitute:** system-ui, -apple-system, 'Segoe UI', sans-serif
- **Weights:** 400, 500, 600, 700
- **Sizes:** 12, 13, 15, 18, 24, 32
- **Line height:** 1.2 (display), 1.3 (headings), 1.55 (body)
- **Letter spacing:** -0.01em on display, 0.03em on uppercase labels

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|---|---|---|---|---|---|---|
| display | — | 700 | 32px | 1.2 | -0.01em | `--text-display` |
| heading | — | 600 | 24px | 1.3 | — | `--text-heading` |
| body-lg | — | 500 | 18px | 1.5 | — | `--text-body-lg` |
| body | — | 400 | 15px | 1.55 | — | `--text-body` |
| label | — | 500 | 12px | 1.4 | 0.03em | `--text-label` |

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

### Border Radius

| Element | Value |
|---|---|
| cards | 16px |
| buttons | 999px |
| inputs | 12px |
| images | 12px |

- **Page max-width:** 1440px
- **Section gap:** 64px
- **Card padding:** 16px
- **Element gap:** 16px

## Components

### Masonry Card

**Role:** 瀑布流中的任意一张卡片

白底、16px 圆角、1px #e8e8e8 描边、无阴影，内边距 16px。图片占卡片高度的 60% 以上，12px 圆角，懒加载。图片下方依次是 15px/600 标题（最多两行）与 13px 灰色说明（最多一行）。hover 时图片放大 1.05 并叠一层 4% 黑，卡片本身不动。过渡 400ms ease-out。

- **Sizes:** image ≥ 60% of height; padding 16px
- **States:** hover: image scale 1.05 + 4% black veil

### Filter Pill

**Role:** 顶部筛选项

全圆角、高 36px、padding 0 16px、13px/500。默认白底 1px 描边；选中态午夜填充白字；hover 只加深描边与文字，不改填充。整条筛选横向滚动，不换行。

- **States:** hover: darker border; selected: midnight fill

### Search Bar

**Role:** 顶部搜索

浅雾底、12px 圆角、1px #e8e8e8 描边、高 40px、左内边距 40px 放 16px 图标、13px 字。聚焦时描边转午夜并加 2px 午夜 12% 外环。

### Column Container

**Role:** 瀑布流容器

桌面 4 到 5 列、平板 3 列、移动 2 列，列间距与行间距都固定 16px。用 CSS columns 或 grid 的 row-span 实现，禁止用绝对定位。卡片高度不做统一，但同一列的相邻卡片间距必须等于行间距。

## Do's and Don'ts

### Do

- 列间距与行间距必须是同一个值
- 卡片高度由内容决定，不做统一裁切
- 图片占卡片 60% 以上
- hover 只动图片，不动卡片
- 筛选条横向滚动不换行
- 用 CSS columns 或 grid，不用绝对定位

### Don't

- 不要用绝对定位模拟瀑布流
- 不要让卡片上浮，会打乱列的对齐
- 不要混用两种间距
- 不要把标题写成三行以上
- 不要给卡片加阴影
- 不要用统一裁剪比例

## Surfaces

| Level | Name | Value | Purpose |
|---|---|---|---|
| 0 | Mist | `#f5f5f5` | 页面底色 |
| 1 | Card White | `#ffffff` | 卡片 |

## Elevation

- **Card:** `none — the border separates it`
- **Card hover:** `none — only the image moves`

## Imagery

图片是主体，占卡片 60% 以上。风格可以混杂（摄影、插画、截图），但尺寸比例必须由内容决定，不做裁切统一。不使用大面积纯色占位与装饰图形。

## Layout

上限 1440px、容器内边距 16px，页码滚动加载。列数随断点变化：≥1280 五列、≥1024 四列、≥768 三列、移动两列。所有间距固定 16px，筛选条固定在顶部下方 8px。

## Agent Prompt Guide

### Implementation Contract

- 以用户请求中的页面、用户任务和真实内容为依据，只实施指定范围；标明缺失的业务信息，不编造数据或能力。
- 先检查现有项目、技术栈与组件；沿用项目结构、路由和依赖，复用已有组件，不重建未要求的页面或功能。
- 沿用项目断点，调整窄屏与桌面的网格和留白；保留信息层级，避免意外横向溢出。
- 对本次涉及的交互，处理键盘焦点与减少动态效果；补齐适用的禁用、加载、空内容与错误状态。
- 完成后按项目现有脚本检查，仅报告实际运行的测试与视觉检查，并列出未验证项。

QUICK COLOR REFERENCE:

- text: `#1a1a2e`
- background: `#f5f5f5`
- card: `#ffffff`
- accent: `#e94560`
- muted: `#8a8a94`
- border: `#e8e8e8`

EXAMPLE COMPONENT PROMPTS:

1. 做一个瀑布流画廊：CSS columns 四列、列间距与行间距都是 16px。卡片白底、16px 圆角、1px #e8e8e8 描边、无阴影、内边距 16px。图片 12px 圆角、占卡片高度 60% 以上，下面 15px/600 标题（两行截断）与 13px #8a8a94 说明。hover 时图片 scale(1.05) 并叠一层 4% 黑，卡片不动，过渡 400ms ease-out。

## Quick Start

```css

:root {
  /* Colors */
  --color-midnight: #1a1a2e;
  --color-mist: #f5f5f5;
  --color-card-white: #ffffff;
  --color-rose-red: #e94560;
  --color-mint: #16c79a;
  --color-amber: #ffd460;
  --color-indigo: #7579e7;

  /* Typography — Font Families */
  --font-sans: 'Inter', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;

  /* Typography — Scale */
  --text-display: 32px;
  --leading-display: 1.2;
  --tracking-display: -0.01em;
  --text-heading: 24px;
  --leading-heading: 1.3;
  --text-body-lg: 18px;
  --leading-body-lg: 1.5;
  --text-body: 15px;
  --leading-body: 1.55;
  --text-label: 12px;
  --leading-label: 1.4;
  --tracking-label: 0.03em;

  /* Typography — Weights */
  --font-weight-regular: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;

  /* Spacing */
  --spacing-unit: 8px;
  --spacing-8: 8px;
  --spacing-16: 16px;
  --spacing-24: 24px;
  --spacing-32: 32px;
  --spacing-48: 48px;
  --spacing-64: 64px;

  /* Layout */
  --page-max-width: 1440px;
  --section-gap: 64px;
  --card-padding: 16px;
  --element-gap: 16px;
  --density: comfortable;

  /* Border Radius */
  --radius-cards: 16px;
  --radius-buttons: 999px;
  --radius-inputs: 12px;
  --radius-images: 12px;

  /* Surfaces */
  --surface-mist: #f5f5f5;
  --surface-card-white: #ffffff;
}

```
