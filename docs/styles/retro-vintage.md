# 复古怀旧风 — 风格参考

> 旧纸张不会浮起：一切安静地待着，只有颜色在缓慢氧化。

**Theme:** light

复古怀旧风模拟的是印刷品的年代感：棕褐主色、奶油纸底、粗边框、老式排版（全大写加宽字距的衬线标题）。它有两条几乎所有其它风格都没有的禁令——第一，任何元素都不做 scale 或 translate-y，因为旧纸张不会浮起（Antique Stillness）；第二，过渡时长不得快于 150ms，因为氧化是地质过程（Slow Passage）。颜色全部低饱和、偏黄，四支辅色（砖红、深绿、沙、橄榄）来自 70 年代的印刷油墨。

## Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Sepia | `#8b4513` | `--color-sepia` | 标题、边框与主强调。整套系统的年代感全部来自这支棕。 |
| Cream | `#f5e6d3` | `--color-cream` | 页面画布。模拟泛黄的纸，比纯白暖两档。 |
| Brick | `#c94c4c` | `--color-brick` | 警示与重点标记，用印刷红而非屏幕红。 |
| Forest | `#2e4a3f` | `--color-forest` | 次级强调与深色区块。七十年代常见的包装绿。 |
| Sand | `#d4a373` | `--color-sand` | 暖色区块与分隔，用于让层次不依赖对比。 |
| Olive | `#816904` | `--color-olive` | 标签与邮戳式装饰，出现频率最低。 |

## Typography

### Playfair Display — 标题与字标，多用全大写与 0.16em 宽字距。衬线的笔画对比是复古印刷的关键。

- **Substitute:** Georgia, 'Songti SC', serif
- **Weights:** 400, 700, 900
- **Sizes:** 16, 20, 28, 40, 56
- **Line height:** 1.1 (display), 1.2 (headings), 1.65 (body)
- **Letter spacing:** 0.01em on display, 0.16em on uppercase labels

### Inter — 正文与说明，保持中性。行高拉高，模拟旧书的排字。

- **Substitute:** 'Courier New', system-ui, sans-serif
- **Weights:** 400, 500
- **Sizes:** 13, 15, 17
- **Line height:** 1.4 (display), 1.4 (headings), 1.65 (body)
- **Letter spacing:** 0 on display, 0.16em on uppercase labels

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|---|---|---|---|---|---|---|
| display | Playfair Display | 900 | 56px | 1.1 | 0.01em | `--text-display` |
| heading | Playfair Display | 700 | 40px | 1.15 | 0.01em | `--text-heading` |
| subheading | Playfair Display | 400 | 28px | 1.25 | — | `--text-subheading` |
| body-lg | Inter | 400 | 17px | 1.65 | — | `--text-body-lg` |
| body | Inter | 400 | 15px | 1.65 | — | `--text-body` |
| label | Inter | 500 | 13px | 1.4 | 0.16em | `--text-label` |

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
| cards | 4px |
| buttons | 4px |
| inputs | 4px |
| stamps | 999px |

- **Page max-width:** 1120px
- **Section gap:** 96px
- **Card padding:** 32px
- **Element gap:** 24px

## Components

### Letterpress Button

**Role:** 行动按钮

棕褐填充、奶油文字、2px 同色描边、4px 圆角、无阴影。15px/500、全大写、0.16em 字距、padding 14px 28px。hover 时填充换成深一档的棕并保持位置不变（不位移不缩放）；按下时改为 2px 描边的透明按钮。过渡 300ms ease-out，绝不快于 150ms。

- **Sizes:** padding 14px 28px; label 15px
- **States:** hover: deeper fill, no movement; active: outlined

### Paper Card

**Role:** 内容卡与菜单卡

奶油底提亮一档、2px 棕褐 25% 描边、4px 圆角、内边距 32px。内部可加 1px 的虚线分隔（模拟票券）。标题用衬线 28px 全大写 0.16em，正文 15px、行高 1.65。hover 只加深描边到 40%，元素不动。

### Stamp Badge

**Role:** 标签与邮戳式标记

橄榄或砖红填充、奶油文字、999px 全圆角、无描边，12px/500、全大写、0.16em 字距、padding 4px 12px。可叠一层内阴影模拟压印（inset 0 1px 0 白 30%）。

### Ticker Rule

**Role:** 分隔与装饰横条

高 32px，棕褐底上重复小花纹（圆点或斜线），或 2px 纯棕褐实线。用于区块之间，替代大片留白，页边宽度 24px。不做滚动动画。

## Do's and Don'ts

### Do

- 所有元素保持静止，不做位移与缩放
- 过渡不短于 150ms
- 标题全大写、0.16em 宽字距
- 边框 2px 起，用棕色系
- 配色全部低饱和偏黄
- 用纸纹与压印暗示年代

### Don't

- 不要用任何 scale 或 translate-y
- 不要用快于 150ms 的过渡
- 不要用现代渐变与玻璃态
- 不要用霓虹或高饱和色
- 不要用极简扁平语言
- 不要用大圆角

## Surfaces

| Level | Name | Value | Purpose |
|---|---|---|---|
| 0 | Cream | `#f5e6d3` | 页面画布 |
| 1 | Lifted Cream | `#faf0e2` | 卡片与面板 |
| 2 | Forest Block | `#2e4a3f` | 深色区块与页脚 |

## Elevation

- **None:** `none — everything sits flat on the paper`
- **Inset rule:** `inset 0 0 0 1px rgba(139,69,19,0.25)`

## Imagery

老照片、印刷品扫描、木刻版画。允许叠一层纸纹与 5% 的泛黄。图像边缘可以是粗描边框或邮票齿孔。不使用现代摄影、3D 渲染与高饱和色。

## Layout

上限 1120px、容器内边距 32px，区块间距 96px。允许居中的老式对称版面（这与现代左对齐不同），标题常与细线装饰成组。信息可以密，但每块之间用装饰横条隔开。

## Agent Prompt Guide

### Implementation Contract

- 以用户请求中的页面、用户任务和真实内容为依据，只实施指定范围；标明缺失的业务信息，不编造数据或能力。
- 先检查现有项目、技术栈与组件；沿用项目结构、路由和依赖，复用已有组件，不重建未要求的页面或功能。
- 沿用项目断点，调整窄屏与桌面的网格和留白；保留信息层级，避免意外横向溢出。
- 对本次涉及的交互，处理键盘焦点与减少动态效果；补齐适用的禁用、加载、空内容与错误状态。
- 完成后按项目现有脚本检查，仅报告实际运行的测试与视觉检查，并列出未验证项。

QUICK COLOR REFERENCE:

- text: `#8b4513`
- background: `#f5e6d3`
- card: `#faf0e2`
- brick: `#c94c4c`
- forest: `#2e4a3f`
- olive: `#816904`

EXAMPLE COMPONENT PROMPTS:

1. 做一个复古风格卡片：背景 #faf0e2、2px solid rgba(139,69,19,0.25) 描边、4px 圆角、内边距 32px、无阴影。标题用衬线 28px 全大写 0.16em 字距、色 #8b4513；正文 15px、行高 1.65。hover 时只把描边加深到 rgba(139,69,19,0.4)，transition 300ms ease-out，不位移不缩放。页面底色 #f5e6d3。
