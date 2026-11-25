# 暖感有机风 — 风格参考

> 陶土红、橄榄绿、暖白纸：一个像被手摸过的界面。

**Theme:** light

暖感有机风是为建筑师、室内与产品设计师、陶艺家服务的作品集语言：暖白纸底（#f5f0eb）、陶土红（#c86a4a）作唯一主强调、橄榄绿（#7a8b5e）作自然元素、所有中性色必须偏暖（正文上限是 #2d2a24 深褐而不是纯黑）。圆角统一用 rounded-lg，像被水磨圆的鹅卵石而不是人工气球。分割线是暖 hairline（#d4bfa5 的 60%），像纸张叠放的自然阴影；装饰用圆形与有机形状配极细橄榄绿点。它禁止冷灰、禁止霓虹与冷蓝、禁止玻璃拟态、禁止纯黑正文。

## Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Warm Umber | `#2d2a24` | `--color-warm-umber` | 正文与标题的上限色。绝不用纯黑。 |
| Warm Paper | `#f5f0eb` | `--color-warm-paper` | 页面底。像纹理纸的暖白。 |
| Terracotta | `#c86a4a` | `--color-terracotta` | 唯一主强调：链接、CTA 与按钮。 |
| Olive | `#7a8b5e` | `--color-olive` | 第二强调与自然元素，用于标签与点缀。 |
| Warm Sand | `#d4bfa5` | `--color-warm-sand` | hairline 分隔线、装饰圆与卡片衬底。 |
| Pale Clay | `#e8ded1` | `--color-pale-clay` | 卡片与面板底，比页面底暖一档。 |

## Typography

### Inter — 正文用无衬线细体、行高 1.75。标题可用衬线或细无衬线并放宽字距。

- **Substitute:** system-ui, -apple-system, 'PingFang SC', sans-serif
- **Weights:** 300, 400, 500
- **Sizes:** 13, 15, 17, 22, 30, 40
- **Line height:** 1.25 (display), 1.35 (headings), 1.75 (body)
- **Letter spacing:** -0.01em on display, 0.02em on uppercase labels

### Lora — 标题可选衬线，字重 400 到 500。它提供手作感的一侧，与细无衬线正文形成对照。

- **Substitute:** Georgia, 'Songti SC', serif
- **Weights:** 400, 500
- **Sizes:** 22, 30, 40
- **Line height:** 1.2 (display), 1.3 (headings), 1.7 (body)
- **Letter spacing:** 0 on display, 0.02em on uppercase labels

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|---|---|---|---|---|---|---|
| display | Lora | 500 | 40px | 1.2 | — | `--text-display` |
| heading | Lora | 500 | 30px | 1.3 | — | `--text-heading` |
| subheading | Inter | 500 | 22px | 1.35 | — | `--text-subheading` |
| body-lg | Inter | 400 | 17px | 1.75 | — | `--text-body-lg` |
| body | Inter | 400 | 15px | 1.75 | — | `--text-body` |
| label | Inter | 500 | 13px | 1.5 | 0.02em | `--text-label` |

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
| cards | 8px |
| buttons | 8px |
| inputs | 8px |
| ornaments | 999px |

- **Page max-width:** 1120px
- **Section gap:** 112px
- **Card padding:** 28px
- **Element gap:** 24px

## Components

### Terracotta Button

**Role:** 主行动按钮

陶土红填充、暖白文字、8px 圆角、无描边，15px/500、padding 12px 28px，阴影 0 6px 20px 深褐 6%。hover 时填充加深到 #b25c3e、阴影扩到 32px；按下缩放 0.98。过渡 300ms ease-out。

- **Sizes:** padding 12px 28px; label 15px
- **States:** hover: deeper fill, wider shadow; active: scale 0.98

### Clay Card

**Role:** 内容卡与作品卡

浅陶填充、8px 圆角、无描边（靠暖色分层）、内边距 28px，阴影 0 6px 20px 深褐 6%。标题用衬线 30px/500 深褐，正文 15px/400 行高 1.75。hover 时阴影扩到 32px、上浮 2px。

### Warm Hairline

**Role:** 暖分隔线与叠纸阴影

1px、色 #d4bfa5 的 60%，横跨内容宽。它模拟的不是线条而是「两张纸叠在一起时的那道阴影」，所以颜色必须偏暖且半透明。

### Organic Pebble

**Role:** 有机形状装饰

48px 的圆或椭圆（border-radius 取 60% 40% 55% 45% 这类四值），填暖沙 30%，中心放一个 4px 的橄榄绿细点。放在卡片角落或区块之间作为节奏点，单屏最多三处。

### Clay Field

**Role:** 表单输入

浅陶 40% 填充、8px 圆角、1px 暖沙描边、padding 12px 16px、15px 字。聚焦时描边转陶土红并加 1px 的陶土红 20% 外环，不改背景。

## Do's and Don'ts

### Do

- 所有中性色必须偏暖
- 陶土红与橄榄绿是唯二强调色
- 圆角统一 8px，像磨圆的石头
- 分割用暖 hairline
- 正文上限深褐 #2d2a24
- 装饰用圆与有机形状

### Don't

- 不要用冷灰作中性色
- 不要用高饱和霓虹或冷蓝
- 不要用玻璃拟态
- 不要用纯黑正文
- 不要混用不同圆角
- 不要用过冷或过亮的阴影

## Surfaces

| Level | Name | Value | Purpose |
|---|---|---|---|
| 0 | Warm Paper | `#f5f0eb` | 页面底 |
| 1 | Pale Clay | `#e8ded1` | 卡片与面板 |
| 2 | Translucent White | `rgba(255,255,255,0.60)` | 浮层 |

## Elevation

- **Soft:** `0 6px 20px rgba(45,42,36,0.06)`
- **Soft hover:** `0 12px 32px rgba(45,42,36,0.10)`

## Imagery

手作与建筑摄影：陶器、木作、亚麻、水泥墙、自然光下的室内。允许纸质纹理叠加。不使用冷调摄影、玻璃与金属高光、霓虹色图像。

## Layout

上限 1120px、容器内边距 24px，区块间距 112px。允许非对称双栏（5:7）。留白宽松但不空旷，密度中低。圆角统一 8px，绝不出现大小混用。

## Agent Prompt Guide

### Implementation Contract

- 以用户请求中的页面、用户任务和真实内容为依据，只实施指定范围；标明缺失的业务信息，不编造数据或能力。
- 先检查现有项目、技术栈与组件；沿用项目结构、路由和依赖，复用已有组件，不重建未要求的页面或功能。
- 沿用项目断点，调整窄屏与桌面的网格和留白；保留信息层级，避免意外横向溢出。
- 对本次涉及的交互，处理键盘焦点与减少动态效果；补齐适用的禁用、加载、空内容与错误状态。
- 完成后按项目现有脚本检查，仅报告实际运行的测试与视觉检查，并列出未验证项。

QUICK COLOR REFERENCE:

- text: `#2d2a24`
- background: `#f5f0eb`
- card: `#e8ded1`
- terracotta: `#c86a4a`
- olive: `#7a8b5e`
- sand: `#d4bfa5`

EXAMPLE COMPONENT PROMPTS:

1. 做一个暖感有机风卡片：浅陶 #e8ded1 填充、8px 圆角、无边框、内边距 28px、阴影 0 6px 20px rgba(45,42,36,0.06)。标题用衬线 30px/500、色 #2d2a24；正文 15px/400、行高 1.75、色 rgba(45,42,36,0.8)。卡片之间用 1px rgba(212,191,165,0.6) 的暖 hairline 分隔。左上角放一个 48px 的有机形状（border-radius 60% 40% 55% 45%）填 rgba(212,191,165,0.3)、中心一个 4px 橄榄绿 #7a8b5e 点。主按钮陶土红 #c86a4a 填充、暖白文字、8px 圆角。页面底色 #f5f0eb。
