# 鲜活市集 — 风格参考

> 暖奶油、南瓜橙、菜叶绿：一个让人想买菜的界面。

**Theme:** light

鲜活市集是食品、生鲜与有机品牌的电商语言：暖奶油底（#fef9f0）、南瓜橙主按钮（#e8722a 全圆角）、深绿（#2d5016）承担标题与「有机」语义、类目标签用淡绿（#d4e4bc）的圆药丸、价格用金黄色块（#f5c542）配棕字（#8b4513）、产品卡大圆角（16px）配柔和阴影、图片 12px 圆角柔化边缘。它的信任感来自温度而不是装饰——颜色都偏暖、圆角都偏大、阴影都极轻。

## Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Warm Cream | `#fef9f0` | `--color-warm-cream` | 页面底。偏黄的奶油白，让食材照片显得新鲜。 |
| Leaf Green | `#2d5016` | `--color-leaf-green` | 标题与「有机」语义。整套风格的信任来源。 |
| Pumpkin | `#e8722a` | `--color-pumpkin` | 主按钮与关键强调，是唯一的行动色。 |
| Marigold | `#f5c542` | `--color-marigold` | 价格标签底与促销徽标。 |
| Brown | `#8b4513` | `--color-brown` | 压在金黄上的文字，以及木箱与包装语义。 |
| Pale Green | `#d4e4bc` | `--color-pale-green` | 分类药丸与轻量区块底。 |

## Typography

### Nunito — 圆润无衬线，字重 600 与 700 用在标题，正文 400。字形不能太尖——食物不该有棱角。

- **Substitute:** system-ui, -apple-system, 'PingFang SC', sans-serif
- **Weights:** 400, 600, 700
- **Sizes:** 12, 14, 16, 20, 26, 34
- **Line height:** 1.25 (display), 1.35 (headings), 1.65 (body)
- **Letter spacing:** -0.01em on display, 0.04em on uppercase labels

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|---|---|---|---|---|---|---|
| display | — | 700 | 34px | 1.25 | -0.01em | `--text-display` |
| heading | — | 700 | 26px | 1.3 | — | `--text-heading` |
| subheading | — | 600 | 20px | 1.4 | — | `--text-subheading` |
| body-lg | — | 400 | 16px | 1.6 | — | `--text-body-lg` |
| body | — | 400 | 14px | 1.65 | — | `--text-body` |
| label | — | 700 | 12px | 1.4 | 0.04em | `--text-label` |

## Spacing & Layout

**Base unit:** 4px
**Density:** comfortable

### Spacing Scale

| Name | Value | Token |
|---|---|---|
| 4 | 4px | `--spacing-4` |
| 8 | 8px | `--spacing-8` |
| 12 | 12px | `--spacing-12` |
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
| pills | 999px |

- **Page max-width:** 1200px
- **Section gap:** 64px
- **Card padding:** 16px
- **Element gap:** 12px

## Components

### Pumpkin Button

**Role:** 主行动按钮

南瓜橙填充、白字、999px 全圆角、无描边、16px/700、padding 12px 24px，阴影 0 2px 8px 绿 6%。hover 时填充加深到 #d0621f、阴影扩到 20px；按下缩放 0.98。触控高度不小于 48px。

- **Sizes:** min-height 48px; padding 12px 24px
- **States:** hover: #d0621f; active: scale 0.98

### Produce Card

**Role:** 产品卡

白底、16px 圆角、1px 淡绿 60% 描边、内边距 16px，阴影 0 2px 8px 绿 6%。图片 12px 圆角铺满卡宽、固定 1:1。图片下方 14px 商品名（最多两行）、16px/700 深绿价格配 999px 的金黄 20% 底标签。hover 时阴影扩到 20px、上浮 2px。

### Category Pill

**Role:** 分类药丸标签

淡绿填充、深绿文字、999px 全圆角、无描边、12px/700、字距 0.04em、padding 6px 14px。选中态底升到深绿并把文字转奶油。用于分类筛选与商品属性。

### Price Tag

**Role:** 价格标签

金黄色块、棕色文字、8px 圆角、内边距 2px 8px、16px/700。原价用 12px 划线棕字放在旁边，间距 8px。价格永远是卡片上对比最高的元素。

### Fresh Badge

**Role:** 新鲜度徽标

48px 圆形、淡绿或金黄填充、深绿图标或单字、1px 白 60% 描边。放在产品图左上角，用来标记「当季」「有机」「本地」。必须带文字或图标，不只靠颜色。

## Do's and Don'ts

### Do

- 暖奶油底配南瓜橙与深绿
- 主按钮全圆角，最小 48px 高
- 价格是卡片上对比最高的元素
- 分类用淡绿药丸标签
- 产品图固定 1:1 且 12px 圆角
- 阴影极轻且带绿调

### Don't

- 不要用暗调或冷光摄影
- 不要用小于 8px 的圆角
- 不要用重阴影
- 不要让价格低对比
- 不要用冷灰作中性色
- 不要只靠颜色标记新鲜度

## Surfaces

| Level | Name | Value | Purpose |
|---|---|---|---|
| 0 | Warm Cream | `#fef9f0` | 页面底 |
| 1 | White | `#ffffff` | 产品卡 |
| 2 | Pale Green | `#d4e4bc` | 分类区块 |

## Elevation

- **Soft:** `0 2px 8px rgba(45,80,22,0.06)`
- **Soft hover:** `0 6px 20px rgba(45,80,22,0.10)`

## Imagery

食品与食材摄影：蔬果、面包、乳制品、市场场景。必须自然光、暖调、背景干净。允许俯拍平铺。不使用暗调摄影、加工食品特写与冷光。

## Layout

上限 1200px、容器内边距 16px，产品网格 2 列（移动）到 4 列（桌面）、间距 12 到 16px。区块间距 64px。圆角统一偏好大值，最小 8px。

## Agent Prompt Guide

### Implementation Contract

- 以用户请求中的页面、用户任务和真实内容为依据，只实施指定范围；标明缺失的业务信息，不编造数据或能力。
- 先检查现有项目、技术栈与组件；沿用项目结构、路由和依赖，复用已有组件，不重建未要求的页面或功能。
- 沿用项目断点，调整窄屏与桌面的网格和留白；保留信息层级，避免意外横向溢出。
- 对本次涉及的交互，处理键盘焦点与减少动态效果；补齐适用的禁用、加载、空内容与错误状态。
- 完成后按项目现有脚本检查，仅报告实际运行的测试与视觉检查，并列出未验证项。

QUICK COLOR REFERENCE:

- text: `#2d5016`
- background: `#fef9f0`
- card: `#ffffff`
- pumpkin: `#e8722a`
- marigold: `#f5c542`
- pale: `#d4e4bc`

EXAMPLE COMPONENT PROMPTS:

1. 做一个鲜活市集产品卡：白底、16px 圆角、1px rgba(212,228,188,0.6) 描边、内边距 16px、阴影 0 2px 8px rgba(45,80,22,0.06)。图片 1:1、12px 圆角、铺满卡宽。下方 14px 商品名与一个金黄色 #f5c542 的价格标签（8px 圆角、棕字 #8b4513、16px/700）。左上角放一个 48px 的淡绿 #d4e4bc 圆形徽标。主按钮南瓜橙 #e8722a 填充、白字、999px 全圆角、最小高度 48px。页面底色 #fef9f0，网格 2 到 4 列、间距 12px。
