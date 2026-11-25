# 材料设计 — 风格参考

> 纸与墨的隐喻：元素有海拔，动效有物理，网格是 8dp。

**Theme:** light

Material Design 的核心不是外观而是两条物理假设：第一，界面由「纸」组成，纸有海拔（elevation），层级靠阴影深度表达而不是靠边框；第二，动效必须遵循同一组曲线——cubic-bezier(0.4, 0, 0.2, 1)，250ms，减速进入。所有尺寸落在 8dp 网格上，主色大胆（紫 #6200ee），次色作为点缀（青 #03dac6）。按钮按下必须缩到 0.98 并加深阴影，这是它认为的「触感真实性」。

## Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Material Violet | `#6200ee` | `--color-violet` | 主行动、选中态与浮动按钮。整套系统的识别色。 |
| Teal | `#03dac6` | `--color-teal` | 次色，用于强调、进度与浮动按钮上的图标。 |
| Pink | `#ff0266` | `--color-pink` | 错误与删除。材料规范里的语义色之一。 |
| Amber | `#ffde03` | `--color-amber` | 警告与需要注意的状态。 |
| Green | `#00c853` | `--color-green` | 成功与完成，通常出现在对勾与进度环上。 |
| Rust | `#c12700` | `--color-rust` | 严肃警告与不可逆操作的确认态。 |

## Typography

### Roboto — 全站唯一字体。按钮与标签用 500 加 0.08em 字距并全大写，标题用 400 的大字号。

- **Substitute:** 'Helvetica Neue', system-ui, sans-serif
- **Weights:** 400, 500, 700
- **Sizes:** 12, 14, 16, 20, 24, 34, 45
- **Line height:** 1.17 (display), 1.25 (headings), 1.5 (body)
- **Letter spacing:** -0.01em on display, 0.08em on uppercase labels

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|---|---|---|---|---|---|---|
| display | — | 400 | 45px | 1.17 | — | `--text-display` |
| heading-lg | — | 400 | 34px | 1.2 | — | `--text-heading-lg` |
| heading | — | 400 | 24px | 1.25 | — | `--text-heading` |
| subheading | — | 500 | 20px | 1.3 | — | `--text-subheading` |
| body-lg | — | 400 | 16px | 1.5 | — | `--text-body-lg` |
| body | — | 400 | 14px | 1.5 | — | `--text-body` |
| label | — | 500 | 12px | 1.4 | 0.08em | `--text-label` |

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
| 40 | 40px | `--spacing-40` |
| 48 | 48px | `--spacing-48` |
| 64 | 64px | `--spacing-64` |
| 80 | 80px | `--spacing-80` |

### Border Radius

| Element | Value |
|---|---|
| cards | 4px |
| buttons | 4px |
| inputs | 4px |
| fab | 999px |

- **Page max-width:** 1200px
- **Section gap:** 40px
- **Card padding:** 16px
- **Element gap:** 8px

## Components

### Contained Button

**Role:** 主行动按钮

材料紫填充、白字、4px 圆角、无描边，14px/500、0.08em 字距、全大写、padding 10px 24px，海拔 2 的三层阴影。hover 时填充提亮到 #7528e5 并升到海拔 4；按下缩到 0.98、海拔降到 8 并加一道中心扩散的白色 20% 涟漪（250ms 内扩散到 2.5 倍半径）。过渡 250ms cubic-bezier(0.4, 0, 0.2, 1)。

- **Sizes:** padding 10px 24px; label 14px
- **States:** hover: elevation 4; active: scale 0.98, ripple

### Elevated Card

**Role:** 内容卡与列表容器

白底、4px 圆角、内边距 16px，海拔 1 的双层阴影，无边框。hover 时海拔升到 4（阴影加深、模糊扩大），卡片位置不变——材料规范里海拔变化本身就是反馈。

- **States:** hover: elevation 1 → 4

### Floating Action

**Role:** 浮动主操作按钮

56px 圆形、材料紫填充、白色 24px 图标、海拔 4，位于视口右下 16dp。hover 时海拔升到 8 并提亮；按下缩到 0.96。图标与边缘间距严格 16px。

### Outlined Field

**Role:** 文本输入

透明底、1px #9e9e9e 描边、4px 圆角、padding 12px 16px、16px 字，标签浮动在描边上。聚焦时描边变 2px 材料紫、标签转紫、加 0 0 0 4px 的紫 12% 光环。错误态描边转粉并显示辅助文字。

### Snackbar

**Role:** 轻提示与撤销

深灰 #323232 填充、白字、4px 圆角、padding 14px 16px、14px 字，海拔 6，出现在视口底部居中、距底 16dp。右侧放一个青绿色文字的动作按钮。显示 4 秒后自动消失，进入用 250ms 的减速曲线。

## Do's and Don'ts

### Do

- 层级靠海拔阴影，不靠边框
- 一切尺寸落在 8dp 网格
- 动效统一 250ms 与标准减速曲线
- 按钮按下缩到 0.98 并加深阴影
- hover 时卡片海拔必须变化
- 主色大胆，次色只作点缀

### Don't

- 不要用不一致的阴影深度
- 不要用过于柔和的配色
- 不要省略交互反馈
- 不要打破 8dp 网格
- 不要用非标准缓动曲线
- 不要让卡片 hover 时阴影不变

## Surfaces

| Level | Name | Value | Purpose |
|---|---|---|---|
| 0 | Surface | `#ffffff` | 页面与卡片 |
| 1 | Elevated 1 | `#ffffff` | 卡片，靠阴影表达海拔 |
| 4 | Elevated 4 | `#ffffff` | 浮动按钮与菜单 |

## Elevation

- **Elevation 1:** `0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)`
- **Elevation 2:** `0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)`
- **Elevation 4:** `0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)`
- **Elevation 8:** `0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)`

## Imagery

以图标、插画与产品截图为主。图标必须是 Material Symbols 风格的实心或线性图形，尺寸落在 8dp 网格上。不使用写实摄影与装饰性大图。

## Layout

上限 1200px，一切尺寸取 8 的倍数（间距 8、16、24、32）。12 栏网格、栏间距 16dp，卡片与列表用 16dp 内边距。内容左对齐，工具栏固定在顶部、浮动按钮固定在右下。

## Agent Prompt Guide

### Implementation Contract

- 以用户请求中的页面、用户任务和真实内容为依据，只实施指定范围；标明缺失的业务信息，不编造数据或能力。
- 先检查现有项目、技术栈与组件；沿用项目结构、路由和依赖，复用已有组件，不重建未要求的页面或功能。
- 沿用项目断点，调整窄屏与桌面的网格和留白；保留信息层级，避免意外横向溢出。
- 对本次涉及的交互，处理键盘焦点与减少动态效果；补齐适用的禁用、加载、空内容与错误状态。
- 完成后按项目现有脚本检查，仅报告实际运行的测试与视觉检查，并列出未验证项。

QUICK COLOR REFERENCE:

- text: `#000000`
- background: `#ffffff`
- primary: `#6200ee`
- secondary: `#03dac6`
- error: `#ff0266`
- surface: `#ffffff`

EXAMPLE COMPONENT PROMPTS:

1. 做一个 Material 主按钮：背景 #6200ee、白字、4px 圆角、14px/500 全大写 0.08em 字距、padding 10px 24px、阴影 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)。hover 时背景 #7528e5、阴影升到 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)。active 时 scale(0.98) 并加深阴影。transition 250ms cubic-bezier(0.4,0,0.2,1)。
