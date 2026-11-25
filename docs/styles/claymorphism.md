# 粘土拟态 — 风格参考

> 像捏出来的一块软糖：超大圆角、内外双阴影、按下去会扁。

**Theme:** light

粘土拟态是新拟物的可爱版本：形状必须圆到近乎球体（按钮 24px、卡片 32px、hero 容器 48px），每个元素同时拥有内外两层阴影——外层负责体积、内层负责高光与暗缘。颜色全部为粉彩（粉、奶油、薄荷、薰衣草、柠檬），饱和度低、明度高，靠色相而不是明度区分层级。交互最特别：按下时不是位移，而是横向拉宽 5%、纵向压扁 10% 并下沉 8px，像真正的粘土被按住。动效使用带回弹的弹簧曲线，让柔软被感知。

## Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Clay Pink | `#f8b4d9` | `--color-clay-pink` | 主行动与主色块。整套系统的基准色相，其他颜色都围绕它取值。 |
| Cream | `#fef3c7` | `--color-cream` | 卡片与分区底。比粉更浅，用来承载内容而不抢戏。 |
| Mint | `#a7f3d0` | `--color-mint` | 成功与「新」语义，用于标签与徽标。 |
| Lavender | `#c4b5fd` | `--color-lavender` | 次级强调与信息块。与粉形成同明度的色相对比。 |
| Lemon | `#fcd34d` | `--color-lemon` | 提醒与数字高亮。出现频率最低，面积最小。 |
| Sky | `#b6e9ff` | `--color-sky` | 链接与可点击标记，是唯一偏冷的粉彩。 |

## Typography

### Nunito — 全站唯一字体。圆润的无衬线（Nunito）是粘土感的一半，换成几何体就垮。

- **Substitute:** Quicksand, 'Segoe UI', system-ui, sans-serif
- **Weights:** 400, 700, 800
- **Sizes:** 13, 15, 18, 24, 34, 48
- **Line height:** 1.15 (display), 1.25 (headings), 1.6 (body)
- **Letter spacing:** -0.01em on display, 0.06em on uppercase labels

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|---|---|---|---|---|---|---|
| display | — | 800 | 48px | 1.15 | -0.01em | `--text-display` |
| heading | — | 700 | 34px | 1.2 | — | `--text-heading` |
| subheading | — | 700 | 24px | 1.3 | — | `--text-subheading` |
| body-lg | — | 400 | 18px | 1.6 | — | `--text-body-lg` |
| body | — | 400 | 15px | 1.6 | — | `--text-body` |
| label | — | 700 | 13px | 1.4 | 0.06em | `--text-label` |

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

### Border Radius

| Element | Value |
|---|---|
| cards | 32px |
| buttons | 24px |
| inputs | 16px |
| hero-panels | 48px |

- **Page max-width:** 1120px
- **Section gap:** 96px
- **Card padding:** 32px
- **Element gap:** 24px

## Components

### Clay Button

**Role:** 主行动按钮

粉色纵向渐变填充、白字、24px 圆角、无描边，字级 18px、字重 700、padding 16px 32px。阴影为四段组合：外阴影 8px 8px 16px 粉 50% 与 -8px -8px 16px 白 80%，内阴影 inset 4px 4px 8px 白 40% 与 inset -4px -4px 8px 深粉 20%。hover 时四段阴影各扩 2px 并上浮 4px；按下时横向缩放 1.05、纵向 0.9、下沉 8px，阴影收缩到 2px 档。过渡 300ms，弹簧缓动 cubic-bezier(0.34, 1.56, 0.64, 1)。

- **Sizes:** padding 16px 32px; label 18px
- **States:** hover: shadows widen, lift 4px; active: scaleX 1.05, scaleY 0.9, sink 8px

### Clay Card

**Role:** 功能卡与内容卡

奶油到琥珀的斜向渐变、32px 圆角、无描边、内边距 32px。阴影为 12px 12px 24px 黑 8% 加两层内阴影（6px 6px 12px 白 60%、-4px -4px 8px 黑 5%）。标题 24px/700 深琥珀色。hover 时阴影各扩 4px、上浮 4px，过渡 300ms 弹簧。

### Clay Input

**Role:** 表单输入

灰到浅灰的纵向渐变、16px 圆角、无描边、内边距 16px 24px、15px 字。基础状态就是凹陷的：inset 4px 4px 8px 黑 10% 与 inset -4px -4px 8px 白 90%。聚焦时内阴影加深到 6px 12px，并外扩一圈 4px 粉 30% 的光环。过渡 300ms 弹簧。

### Clay Badge

**Role:** 标签与状态徽标

全圆角、粉彩填充（薄荷、薰衣草或柠檬之一）、内部用一层 2px 内高光与 2px 内暗缘，字级 13px/700、padding 6px 14px。不描边、不加外阴影，靠内阴影保持粘土感。

## Do's and Don'ts

### Do

- 圆角从 16px 起，卡片 32px，容器 48px
- 每个元素同时有外阴影与内阴影
- 全部使用粉彩，靠色相区分层级
- 按下时横向拉宽纵向压扁
- 动效用带回弹的弹簧曲线
- 元素间距至少 24px

### Don't

- 不要用锐利直角或小圆角
- 不要用单层阴影
- 不要用深色背景
- 不要用高饱和或纯色填充
- 不要把元素挤在 16px 以内
- 不要用线性缓动，柔软需要回弹

## Surfaces

| Level | Name | Value | Purpose |
|---|---|---|---|
| 0 | Cream Page | `#fef3c7` | 页面底色 |
| 1 | Clay Card | `#ffffff` | 卡片（配渐变到粉彩） |

## Elevation

- **Clay raised:** `8px 8px 16px rgba(255,182,193,0.50), -8px -8px 16px rgba(255,255,255,0.80), inset 4px 4px 8px rgba(255,255,255,0.40), inset -4px -4px 8px rgba(219,112,147,0.20)`
- **Clay card:** `12px 12px 24px rgba(0,0,0,0.08), inset 6px 6px 12px rgba(255,255,255,0.60), inset -4px -4px 8px rgba(0,0,0,0.05)`
- **Clay pressed:** `2px 2px 4px rgba(255,182,193,0.30), -2px -2px 4px rgba(255,255,255,0.90), inset 4px 4px 8px rgba(219,112,147,0.25)`

## Imagery

3D 渲染的软质物体、圆润插画、粉彩渐变背景。允许把界面元素做成「实物」——按钮像糖果、卡片像积木。不使用锐利摄影、深色背景与几何线稿。

## Layout

上限 1120px、容器内边距 24px，区块间距 96px，卡片间距 24px。元素之间至少留 24px，因为四段阴影会互相侵占。允许卡片轻微旋转（±2 度）增加手工感，但同屏不超过两张。

## Agent Prompt Guide

### Implementation Contract

- 以用户请求中的页面、用户任务和真实内容为依据，只实施指定范围；标明缺失的业务信息，不编造数据或能力。
- 先检查现有项目、技术栈与组件；沿用项目结构、路由和依赖，复用已有组件，不重建未要求的页面或功能。
- 沿用项目断点，调整窄屏与桌面的网格和留白；保留信息层级，避免意外横向溢出。
- 对本次涉及的交互，处理键盘焦点与减少动态效果；补齐适用的禁用、加载、空内容与错误状态。
- 完成后按项目现有脚本检查，仅报告实际运行的测试与视觉检查，并列出未验证项。

QUICK COLOR REFERENCE:

- text: `#7c3f58`
- background: `#fef3c7`
- card: `#ffffff`
- primary: `#f8b4d9`
- secondary: `#c4b5fd`
- accent: `#a7f3d0`

EXAMPLE COMPONENT PROMPTS:

1. 做一个粘土按钮：粉色纵向渐变、白字、24px 圆角、700 字重、padding 16px 32px。box-shadow 四段：8px 8px 16px rgba(255,182,193,0.5), -8px -8px 16px rgba(255,255,255,0.8), inset 4px 4px 8px rgba(255,255,255,0.4), inset -4px -4px 8px rgba(219,112,147,0.2)。hover 时四段各扩 2px 并 translateY(-4px)；active 时 scaleX(1.05) scaleY(0.9) translateY(8px)。过渡 300ms cubic-bezier(0.34,1.56,0.64,1)。
