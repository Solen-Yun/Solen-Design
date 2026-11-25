# 卡片堆叠布局 — 风格参考

> 三张卡片前后错开叠在一起，用 Z 轴而不是排布说明顺序。

**Theme:** light

卡片堆叠是一个 3D 排布策略：一张主卡在最前，后面两张各向上偏移 12px 与 24px、缩小到 0.96 与 0.92、并降低不透明度。它把「顺序」变成空间关系而不是列表。视觉上必须克制——卡片本身只是白底、16px 圆角、一级阴影，所有表现力都放在层级变换上：切换时前后卡片沿着 Z 轴重新排列，用 400ms 的缓出完成。卡片之间的偏移不能超过 24px，否则会读成散落的纸片而不是一副牌。

## Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Midnight | `#1a1a2e` | `--color-midnight` | 标题、主按钮与深色卡片。堆叠需要一支足够深的颜色来区分主卡。 |
| Fog | `#f0f0f5` | `--color-fog` | 页面底色。带一点蓝的浅灰，让白卡片的边缘清晰。 |
| Card White | `#ffffff` | `--color-card-white` | 主卡与后置卡片的填充。所有卡片同色，只靠变换区分层级。 |
| Indigo | `#6c5ce7` | `--color-indigo` | 主强调与指示器激活态，用于告诉用户当前看到第几张。 |
| Cyan | `#00cec9` | `--color-cyan` | 成功与「已完成」步骤，用于进度语义。 |
| Pink | `#fd79a8` | `--color-pink` | 情感化强调，用于收藏与推荐。 |
| Butter | `#ffeaa7` | `--color-butter` | 高亮与「新」标记，只在小面积出现。 |

## Typography

### Inter — 全站唯一字体。卡片标题 600、正文 400，字级克制以免抢走堆叠的注意力。

- **Substitute:** system-ui, -apple-system, 'Segoe UI', sans-serif
- **Weights:** 400, 500, 600, 700
- **Sizes:** 12, 14, 16, 20, 28, 36
- **Line height:** 1.15 (display), 1.25 (headings), 1.6 (body)
- **Letter spacing:** -0.02em on display, 0.04em on uppercase labels

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|---|---|---|---|---|---|---|
| display | — | 700 | 36px | 1.15 | -0.02em | `--text-display` |
| heading | — | 600 | 28px | 1.25 | — | `--text-heading` |
| subheading | — | 600 | 20px | 1.35 | — | `--text-subheading` |
| body-lg | — | 400 | 16px | 1.6 | — | `--text-body-lg` |
| body | — | 400 | 14px | 1.6 | — | `--text-body` |
| label | — | 500 | 12px | 1.4 | 0.04em | `--text-label` |

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
| buttons | 12px |
| indicators | 999px |

- **Page max-width:** 960px
- **Section gap:** 96px
- **Card padding:** 32px
- **Element gap:** 16px

## Components

### Stack Card

**Role:** 堆叠中的任意一张卡片

白底、16px 圆角、无描边、内边距 32px。前置卡片阴影 0 18px 40px 午夜 12%；后置卡片每层上移 12px、缩放 0.96、不透明度降到 70%，第二层再上移 12px、缩放 0.92、不透明度 40%。切换时用 transform 过渡，400ms cubic-bezier(0.22, 1, 0.36, 1)。

- **Sizes:** padding 32px; radius 16px
- **States:** lead: full opacity; layer 2: 0.96 / 70%; layer 3: 0.92 / 40%

### Deck Controls

**Role:** 切换按钮与拖动提示

圆形按钮 40px、白底、1px #e4e4ec 描边、无阴影，箭头图标 16px。hover 时描边转午夜并加 0 4px 12px 8% 阴影；按下缩放 0.94。左右两个按钮分列卡片两侧，垂直居中。

### Step Indicator

**Role:** 当前进度指示

一排 8px 圆点，间距 8px。当前项填充靛并拉长成 24px 的胶囊，其余为 30% 午夜圆点。切换时宽度与颜色一起过渡，300ms ease-out。

### Stack Container

**Role:** 堆叠容器

最大宽度 640px，高度固定为卡片最高内容的高度加 48px（为后置层留出空间）。用 transform 与 z-index 实现层级，禁止用绝对定位偏移来模拟。容器需支持触摸左右滑动，滑动阈值 80px。

## Do's and Don'ts

### Do

- 偏移不超过 24px，缩放不低于 0.92
- 所有卡片同色，只靠变换分层
- 切换时沿 Z 轴重排，400ms 缓出
- 用指示器告诉用户位置
- 移动端取消重叠，改单卡滑动
- 容器为后置层预留 48px 空间

### Don't

- 不要让偏移超过 24px
- 不要给后置卡片换颜色
- 不要用绝对定位模拟层级
- 不要在卡片里放第二个堆叠
- 不要用超过 500ms 的切换
- 不要在移动端保留重叠

## Surfaces

| Level | Name | Value | Purpose |
|---|---|---|---|
| 0 | Fog | `#f0f0f5` | 页面底色 |
| 1 | Card White | `#ffffff` | 所有堆叠卡片 |

## Elevation

- **Lead card:** `0 18px 40px rgba(26,26,46,0.12)`
- **Trailing card:** `0 8px 20px rgba(26,26,46,0.08)`

## Imagery

卡片内以插图与产品截图为主，每张卡片最多一张图且宽度铺满内容区。不使用全幅摄影与背景纹理，堆叠本身已经足够有存在感。

## Layout

上限 960px、容器内边距 24px，区块间距 96px。堆叠区居中，卡片最大宽度 640px，左右各留 40px 给切换按钮。上下预留 48px 给后置层。移动端改为单卡纵向滑动，取消重叠。

## Agent Prompt Guide

### Implementation Contract

- 以用户请求中的页面、用户任务和真实内容为依据，只实施指定范围；标明缺失的业务信息，不编造数据或能力。
- 先检查现有项目、技术栈与组件；沿用项目结构、路由和依赖，复用已有组件，不重建未要求的页面或功能。
- 沿用项目断点，调整窄屏与桌面的网格和留白；保留信息层级，避免意外横向溢出。
- 对本次涉及的交互，处理键盘焦点与减少动态效果；补齐适用的禁用、加载、空内容与错误状态。
- 完成后按项目现有脚本检查，仅报告实际运行的测试与视觉检查，并列出未验证项。

QUICK COLOR REFERENCE:

- text: `#1a1a2e`
- background: `#f0f0f5`
- card: `#ffffff`
- accent: `#6c5ce7`
- muted: `#8a8a99`
- border: `#e4e4ec`

EXAMPLE COMPONENT PROMPTS:

1. 做一个卡片堆叠：三张白底卡片（16px 圆角、内边距 32px），第一张正常显示并带 0 18px 40px rgba(26,26,46,0.12) 阴影；第二张 translateY(-12px) scale(0.96)、opacity 0.7；第三张 translateY(-24px) scale(0.92)、opacity 0.4。切换时只过渡 transform 与 opacity，400ms cubic-bezier(0.22,1,0.36,1)。下方放三个 8px 圆点作指示器，激活项变 24px 胶囊并填充 #6c5ce7。
