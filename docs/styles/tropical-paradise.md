# 热带天堂 — 风格参考

> 棕榈叶、芒果黄、珊瑚红：一张度假村的海报。

**Theme:** light

热带天堂来自度假村的视觉：暖黄底（#fffde7）、蓝绿主色（#00897b）、珊瑚红（#ff6f61）与芒果黄（#ffc107）作强调、叶绿（#4caf50）作植物。圆角放大到 16 至 24px 甚至全圆，传达柔和的度假感；阴影带颜色（蓝绿 20%）而不是灰；标题用圆润的大字并压紧字距；hover 用明快的亮色变化。棕榈叶与花瓣是主要图形，允许大面积遮挡构图。

## Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Teal | `#00897b` | `--color-teal` | 主色：主按钮、文字与海水的语义。 |
| Warm Yellow | `#fffde7` | `--color-warm-yellow` | 页面底。像阳光下的沙地。 |
| Coral | `#ff6f61` | `--color-coral` | 第一强调：主 CTA 与花。 |
| Mango | `#ffc107` | `--color-mango` | 第二强调与高亮，像果肉与阳光。 |
| Leaf | `#4caf50` | `--color-leaf` | 棕榈叶与植物语义。 |
| Olive | `#a09314` | `--color-olive` | 压在黄上的文字，也是沙的暗部。 |

## Typography

### Nunito — 圆润无衬线，标题用 800 并压紧字距到 -0.02em。字形不能尖，度假不该有棱角。

- **Substitute:** 'Trebuchet MS', 'PingFang SC', system-ui, sans-serif
- **Weights:** 400, 700, 800
- **Sizes:** 13, 16, 20, 28, 38, 52
- **Line height:** 1.2 (display), 1.3 (headings), 1.65 (body)
- **Letter spacing:** -0.02em on display, 0.06em on uppercase labels

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|---|---|---|---|---|---|---|
| display | — | 800 | 52px | 1.2 | -0.02em | `--text-display` |
| heading | — | 800 | 38px | 1.25 | -0.02em | `--text-heading` |
| subheading | — | 700 | 28px | 1.35 | — | `--text-subheading` |
| body-lg | — | 400 | 20px | 1.6 | — | `--text-body-lg` |
| body | — | 400 | 16px | 1.65 | — | `--text-body` |
| label | — | 700 | 13px | 1.45 | 0.06em | `--text-label` |

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
| cards | 24px |
| buttons | 999px |
| inputs | 16px |
| images | 24px |

- **Page max-width:** 1160px
- **Section gap:** 96px
- **Card padding:** 28px
- **Element gap:** 20px

## Components

### Island Button

**Role:** 行动按钮

珊瑚红填充、白字、999px 全圆角、无描边、16px/700、padding 14px 32px，彩色阴影 0 4px 20px 蓝绿 20%。hover 时填充转芒果黄、文字转橄榄、阴影扩到 32px；按下缩放 0.97。过渡 180ms ease-out。

- **Sizes:** padding 14px 32px; label 16px
- **States:** hover: mango fill, wider shadow; active: scale 0.97

### Resort Card

**Role:** 内容卡与行程卡

白底、24px 圆角、无描边、内边距 28px，彩色阴影 0 4px 20px 蓝绿 20%。标题 28px/700 蓝绿，正文 16px 行高 1.65。图片 24px 圆角铺满卡宽、4:3。hover 时阴影扩到 32px、上浮 4px，图片放大 1.03。

### Palm Frond

**Role:** 棕榈叶装饰（签名）

一片 160 到 400px 的棕榈叶（用 SVG path 画 8 到 12 片羽状小叶），填叶绿的 60% 到 100%，允许从页面角上斜插进来并遮挡部分内容。它是最能标识这套风格的图形，单屏 1 到 2 片。

### Sun Circle

**Role:** 太阳与光斑

一个 120 到 240px 的圆，填芒果黄到珊瑚红的径向渐变，不透明度 70%，配 3 到 5 个更小的光斑（各 24 到 48px、20% 不透明度）。放在区块角落作为氛围，不做动画或只做极慢的明暗呼吸。

### Pill Field

**Role:** 表单输入

白底、999px 全圆角、1px 蓝绿 25% 描边、padding 12px 22px、16px 字。占位符蓝绿 50%。聚焦时描边转蓝绿 80% 并加 3px 的蓝绿 15% 外环。

## Do's and Don'ts

### Do

- 暖黄底配蓝绿与珊瑚红
- 圆角 16 到 24px 或全圆
- 阴影带蓝绿颜色而不是灰
- 棕榈叶大面积遮挡构图
- 标题圆润大字并压紧字距
- hover 用明快亮色变化

### Don't

- 不要用暗调或冷色摄影
- 不要用锐利直角
- 不要用灰黑阴影
- 不要用小于 12px 的圆角
- 不要用衬线字体
- 不要超过两片棕榈叶

## Surfaces

| Level | Name | Value | Purpose |
|---|---|---|---|
| 0 | Warm Yellow | `#fffde7` | 页面底 |
| 1 | White | `#ffffff` | 卡片 |
| 2 | Teal Wash | `rgba(0,137,123,0.10)` | 区块底 |

## Elevation

- **Teal soft:** `0 4px 20px rgba(0,137,123,0.20)`
- **Teal hover:** `0 10px 32px rgba(0,137,123,0.28)`

## Imagery

度假场景摄影：海滩、棕榈、水果、泳池、热带植物。必须高亮、暖调、饱和。允许俯拍平铺。不使用暗调摄影、冷色图像与写实人物特写。

## Layout

上限 1160px、容器内边距 24px，区块间距 96px。允许棕榈叶与光斑大面积遮挡构图。圆角统一偏好大值（16 到 24px 或全圆），绝不低于 12px。

## Agent Prompt Guide

### Implementation Contract

- 以用户请求中的页面、用户任务和真实内容为依据，只实施指定范围；标明缺失的业务信息，不编造数据或能力。
- 先检查现有项目、技术栈与组件；沿用项目结构、路由和依赖，复用已有组件，不重建未要求的页面或功能。
- 沿用项目断点，调整窄屏与桌面的网格和留白；保留信息层级，避免意外横向溢出。
- 对本次涉及的交互，处理键盘焦点与减少动态效果；补齐适用的禁用、加载、空内容与错误状态。
- 完成后按项目现有脚本检查，仅报告实际运行的测试与视觉检查，并列出未验证项。

QUICK COLOR REFERENCE:

- text: `#00897b`
- background: `#fffde7`
- coral: `#ff6f61`
- mango: `#ffc107`
- leaf: `#4caf50`
- olive: `#a09314`

EXAMPLE COMPONENT PROMPTS:

1. 做一个热带天堂卡片：白底、24px 圆角、无边框、内边距 28px、box-shadow 0 4px 20px rgba(0,137,123,0.2)。标题 28px/700 Nunito、色 #00897b、字距 -0.02em；正文 16px、行高 1.65、色 #2f3e3c。图片 4:3、24px 圆角。左上角斜插一片 240px 的棕榈叶（SVG path、填 #4caf50、不透明度 80%），可遮挡部分内容。主按钮 #ff6f61 填充、白字、999px 全圆角、padding 14px 32px、彩色阴影，hover 时填充转 #ffc107、文字转 #a09314。页面底色 #fffde7，全站圆角不小于 12px。
