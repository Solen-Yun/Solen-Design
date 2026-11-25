# 金融科技风 — 风格参考

> 紫、深海军蓝与一层网格底纹：把金融基础设施画成工程图纸。

**Theme:** light

金融科技风的可信感来自克制与精度的组合：主色紫（#635bff）只出现在行动与链接上，正文用深海军蓝（#0a2540）而不是黑，底色是带一点蓝的浅灰（#f6f9fc）。标志性手法是 40px 网格底纹——它把页面变成图纸，暗示严谨。卡片用两段叠加的柔和阴影制造浮起（而不是单层），hover 时上浮并让阴影扩散。按钮带内高光，按下时换成内阴影，形成实体按压感。

## Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Fintech Violet | `#635bff` | `--color-violet` | 主行动、链接与选中态。全站唯一的品牌色，一屏只出现两到三处。 |
| Deep Navy | `#0a2540` | `--color-navy` | 正文、标题与深色区块。比黑柔和，读起来像印刷油墨。 |
| Haze | `#f6f9fc` | `--color-haze` | 页面画布，上面叠 40px 网格线。白色卡片在它之上形成第二层。 |
| Card White | `#ffffff` | `--color-card-white` | 卡片、表单与浮层。 |
| Electric Cyan | `#00d4ff` | `--color-cyan` | 渐变与图表第二序列。只与紫搭配，不单独作为主色。 |
| Lilac | `#7a73ff` | `--color-lilac` | 渐变末端与 hover 态。与主紫同一色相，只提高明度。 |

## Typography

### Inter — 全站唯一字体。标题用 700 与紧字距，正文 400，与深海军蓝搭配形成印刷感。

- **Substitute:** -apple-system, 'Segoe UI', system-ui, sans-serif
- **Weights:** 400, 500, 600, 700
- **Sizes:** 12, 14, 16, 20, 28, 44, 64
- **Line height:** 1.1 (display), 1.25 (headings), 1.6 (body)
- **Letter spacing:** -0.03em on display, 0.02em on uppercase labels

### JetBrains Mono — 代码示例与 API 片段。是面向开发者的一半语言。

- **Substitute:** ui-monospace, SFMono-Regular, Menlo, monospace
- **Weights:** 400
- **Sizes:** 13
- **Line height:** 1.5 (display), 1.5 (headings), 1.7 (body)
- **Letter spacing:** 0 on display, 0 on uppercase labels

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|---|---|---|---|---|---|---|
| display | — | 700 | 64px | 1.1 | -0.03em | `--text-display` |
| heading-lg | — | 700 | 44px | 1.15 | -0.02em | `--text-heading-lg` |
| heading | — | 600 | 28px | 1.25 | — | `--text-heading` |
| subheading | — | 600 | 20px | 1.35 | — | `--text-subheading` |
| body-lg | — | 400 | 16px | 1.6 | — | `--text-body-lg` |
| body | — | 400 | 14px | 1.6 | — | `--text-body` |
| label | — | 500 | 12px | 1.4 | 0.02em | `--text-label` |

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
| code-blocks | 12px |

- **Page max-width:** 1120px
- **Section gap:** 112px
- **Card padding:** 24px
- **Element gap:** 16px

## Components

### Primary Button

**Role:** 主行动按钮

条纹紫填充、白字、8px 圆角、无描边。字级 14px、字重 500、padding 10px 24px。阴影为外阴影 0 2px 5px 紫 40% 加内高光 inset 0 1px 0 白 20%。hover 时填充转深紫 #5851ea、上浮 2px、外阴影扩到 10px；按下缩放 0.98 并换成内阴影 inset 0 2px 4px 黑 20%。过渡 300ms ease-out。

- **States:** hover: lift 2px, deeper fill; active: inset shadow, scale 0.98

### Floating Card

**Role:** 功能卡与产品卡

白底、12px 圆角、无描边、内边距 24px。阴影用两段叠加：0 2px 10px 6% 加 0 4px 20px 4%。图标块 40px 见方、10px 圆角、紫 10% 底、图标紫。hover 时上浮 4px、阴影扩到 0 12px 30px 8%、图标块放大 1.1，过渡 400ms ease-out。

### Grid Backdrop

**Role:** 页面底纹与 hero 背景

两层 40px 线性渐变网格交叉，颜色为紫 10%，叠在浅雾底上，整体不透明度 40%。只出现在首屏与少数区块，不做全页铺满，否则会盖过内容。

### Code Block

**Role:** API 示例与配置片段

深海军蓝底、白字 90%、12px 圆角、内边距 20px、等宽 13px、行高 1.7。左上角允许一个圆点行（三个 8px 圆点）。不描边、不加阴影。

## Do's and Don'ts

### Do

- 紫只给行动与链接，一屏两到三处
- 正文用深海军蓝而不是黑
- 卡片用两段叠加阴影
- 网格底纹只铺首屏
- 按钮带内高光，按下换内阴影
- 代码块用深海军蓝底

### Don't

- 不要把紫用于大面积背景
- 不要让网格铺满全页
- 不要用单层阴影，会失去浮起感
- 不要引入第二支独立强调色
- 不要用纯黑正文
- 不要用超过 12px 的卡片圆角

## Surfaces

| Level | Name | Value | Purpose |
|---|---|---|---|
| 0 | Haze | `#f6f9fc` | 画布，叠 40px 网格 |
| 1 | Card White | `#ffffff` | 卡片与表单 |
| 2 | Navy Stage | `#0a2540` | 深色区块与页脚 |

## Elevation

- **Card:** `0 2px 10px rgba(0,0,0,0.06), 0 4px 20px rgba(0,0,0,0.04)`
- **Card hover:** `0 12px 30px rgba(0,0,0,0.08), 0 4px 10px rgba(0,0,0,0.04)`
- **Button:** `0 2px 5px rgba(99,91,255,0.40), inset 0 1px 0 rgba(255,255,255,0.20)`

## Imagery

以界面截图、抽象几何图解与代码为主。允许紫色到青色的渐变作为图像替代，但只出现在一张卡片上。不使用人物摄影与装饰插画。

## Layout

上限 1120px、12 栏、容器内边距 24px。区块间距 112px。hero 常见为左文右图或居中大字配下方产品截图。网格底纹铺满首屏，往下逐渐淡出。

## Agent Prompt Guide

### Implementation Contract

- 以用户请求中的页面、用户任务和真实内容为依据，只实施指定范围；标明缺失的业务信息，不编造数据或能力。
- 先检查现有项目、技术栈与组件；沿用项目结构、路由和依赖，复用已有组件，不重建未要求的页面或功能。
- 沿用项目断点，调整窄屏与桌面的网格和留白；保留信息层级，避免意外横向溢出。
- 对本次涉及的交互，处理键盘焦点与减少动态效果；补齐适用的禁用、加载、空内容与错误状态。
- 完成后按项目现有脚本检查，仅报告实际运行的测试与视觉检查，并列出未验证项。

QUICK COLOR REFERENCE:

- text: `#0a2540`
- background: `#f6f9fc`
- card: `#ffffff`
- accent: `#635bff`
- secondary: `#00d4ff`
- grid: `rgba(99,91,255,0.10)`

EXAMPLE COMPONENT PROMPTS:

1. 做一个金融科技风卡片：白底、12px 圆角、内边距 24px、阴影 0 2px 10px rgba(0,0,0,0.06) 与 0 4px 20px rgba(0,0,0,0.04) 叠加。左上 40px 见方图标块（10px 圆角、#635bff 10% 底）。标题 20px/600 #0a2540。hover 时上浮 4px、阴影扩到 0 12px 30px rgba(0,0,0,0.08)。页面底色 #f6f9fc，并叠一层 40px 紫色 10% 网格。
