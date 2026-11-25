# 极简扁平风 — 风格参考

> 黑白两色、零阴影、大量留白，一切装饰都被删掉。

**Theme:** light

极简扁平风靠删减工作：不用阴影、不用渐变、不混用圆角，层次只由色块与留白建立。黑白是主结构，四支高饱和强调色各自承担一类动作（主色粉用于按下态，青用于数据，黄用于高亮，赭用于次级）。交互同样不用阴影，hover 时直接反转前景与背景，200ms 内完成；按下态换成强调色，给出明确的一次性反馈。圆角必须统一——要么全部直角，要么全部全圆角，混用会立刻散掉。

## Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Black | `#000000` | `--color-black` | 文字、描边与深色区块。允许纯黑，因为这套风格就是要最高的对比。 |
| White | `#ffffff` | `--color-white` | 页面画布与反转区块的填充。与纯黑成对使用，没有中间灰。 |
| Signal Pink | `#ff3366` | `--color-signal-pink` | 按下态与主强调。全站最强的视觉信号，只出现在一次交互的瞬间。 |
| Mint | `#00d4aa` | `--color-mint` | 数据、成功与图表。用于需要被读出来的数字，不做背景。 |
| Bright Yellow | `#ffcc00` | `--color-yellow` | 高亮与标记。用于强调一段文字或一个标签，面积不超过一行。 |
| Ochre | `#b45700` | `--color-ochre` | 次级强调与警示。出现频率最低，用于需要区分于信号粉的场合。 |

## Typography

### Inter — 全站唯一字体。标题用 900 与紧字距制造版面张力，正文 400 保持中性。

- **Substitute:** Helvetica Neue, Arial, system-ui, sans-serif
- **Weights:** 400, 700, 900
- **Sizes:** 12, 14, 16, 24, 40, 64
- **Line height:** 1.05 (display), 1.15 (headings), 1.6 (body)
- **Letter spacing:** -0.03em on display, 0.12em on uppercase labels

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|---|---|---|---|---|---|---|
| display | — | 900 | 64px | 1.05 | -0.03em | `--text-display` |
| heading-lg | — | 900 | 40px | 1.1 | -0.02em | `--text-heading-lg` |
| heading | — | 700 | 24px | 1.2 | -0.01em | `--text-heading` |
| body-lg | — | 400 | 18px | 1.6 | — | `--text-body-lg` |
| body | — | 400 | 16px | 1.6 | — | `--text-body` |
| label | — | 700 | 12px | 1.4 | 0.12em | `--text-label` |

## Spacing & Layout

**Base unit:** 8px
**Density:** airy

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
| 192 | 192px | `--spacing-192` |

### Border Radius

| Element | Value |
|---|---|
| cards | 0 |
| buttons | 0 |
| inputs | 0 |
| buttons-pill | 999px |

- **Page max-width:** 1280px
- **Section gap:** 128px
- **Card padding:** 32px
- **Element gap:** 16px

## Components

### Filled Button

**Role:** 主行动按钮

纯黑填充、白字、2px 纯黑描边、直角、无阴影。字级 16px、字重 700、padding 16px 32px。hover 时填充与文字互换（白底黑字、保留描边）；按下时填充换成信号粉、文字白、描边同色。过渡只变颜色，200ms。

- **Sizes:** padding 16px 32px; label 16px
- **States:** hover: inverted; active: pink fill; no shadow at any state

### Outlined Button

**Role:** 次级行动

白底、纯黑文字、2px 纯黑描边、直角。padding 16px 32px、16px/700。hover 反转为黑底白字；按下换成信号粉，与主按钮保持同一套状态逻辑。

### Flat Card

**Role:** 内容块与作品卡

白底、2px 纯黑描边、直角、无阴影、无圆角，内边距 32px。hover 时背景整体转黑、文字转白，不做位移。图像必须与卡片同宽、直角裁切。

### Accent Label

**Role:** 分类、标签与状态

无描边、直角、无圆角，12px 字、700 字重、0.12em 字距、padding 4px 8px。默认黑底白字；用于高亮时换亮黄底黑字；用于数据时用薄荷青底白字。三种变体不混用。

## Do's and Don'ts

### Do

- 只用纯黑白做主结构，强调色各自承担一类动作
- 零阴影，层级靠色块与留白
- 圆角必须统一，要么全直角要么全圆角
- hover 反转前景与背景，不用阴影
- 按下态换强调色，一次性明确反馈
- 区块间距 128px 起，宁可减少模块

### Don't

- 不要使用任何阴影
- 不要使用渐变
- 不要混用直角与小圆角
- 不要用低于 50% 透明度的元素
- 不要用灰色文字替代黑色层级
- 不要用图案或纹理背景

## Surfaces

| Level | Name | Value | Purpose |
|---|---|---|---|
| 0 | White | `#ffffff` | 页面画布 |
| 1 | Black Block | `#000000` | 反转区块与页脚 |

## Elevation

- **None:** `none`
- **Rule:** `2px solid #000000`

## Imagery

两色摄影、几何构图、大面积纯色块。图像必须是直角裁切、强对比、无柔和过渡。允许把照片压成单色作为区块背景。不使用阴影、渐变、柔光与装饰性插画。

## Layout

12 栏、上限 1280px、容器内边距 24px。区块间距 128px 到 192px，比常规大得多，留白本身就是版面的主要材料。区块全部左对齐或贴边，标题不居中。允许整块反转为黑底白字，但一页不超过两次。

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
- accent: `#ff3366`
- data: `#00d4aa`
- highlight: `#ffcc00`
- border: `#000000`

EXAMPLE COMPONENT PROMPTS:

1. 做一个极简扁平按钮：纯黑填充、白字、2px 纯黑描边、直角、无阴影，16px/700，padding 16px 32px。hover 时反转为白底黑字；按下时填充 #ff3366、文字白色。只用 transition-colors 200ms，不加任何位移或阴影。
