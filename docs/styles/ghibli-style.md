# 吉卜力风格 — 风格参考

> 手绘的天空与草地，暖到发甜的绿，一切都慢半拍。

**Theme:** light

吉卜力风格来自动画场景美术：天空从浅蓝渐变到奶油，云是几块模糊的白，地面是带纹理的鼠尾草绿。它的核心不是配色而是「手作痕迹」——圆角一律很大，边界带 2px 半透明描边，卡片与按钮在 hover 时会轻微倾斜（0.8 度），像被人拿起来看了一眼。颜色全部低饱和、偏暖，最深的文字用暖棕（#5a4a3a）而不是黑。动效慢，500 到 700ms，缓入缓出，允许缩放与旋转这种「有机」的位移，而不是机械的上下平移。

## Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Sage | `#7cb9a8` | `--color-sage` | 主行动与自然语义。草地的绿，也是整套系统的主色。 |
| Cream | `#f4e4bc` | `--color-cream` | 卡片与地平线。让画面有「被夕阳照过」的暖度。 |
| Warm Brown | `#5a4a3a` | `--color-warm-brown` | 全部文字与标题。替代黑色，避免破坏画面的暖调。 |
| Coral | `#e8a87c` | `--color-coral` | 夕阳与暖色强调，用于徽标、价格与高亮。 |
| Sky Teal | `#85cdca` | `--color-sky-teal` | 天空与水面，是渐变的上半段。 |
| Rose Grey | `#c38d94` | `--color-rose-grey` | 情感强调与角色肤色，只在小面积出现。 |

## Typography

### Quicksand — 全站唯一字体。圆润无衬线配宽松行高（1.75），让文字像画面里的旁白。

- **Substitute:** 'Hiragino Maru Gothic ProN', 'Segoe UI', system-ui, sans-serif
- **Weights:** 400, 500, 600
- **Sizes:** 13, 15, 18, 24, 32, 48
- **Line height:** 1.15 (display), 1.3 (headings), 1.75 (body)
- **Letter spacing:** -0.01em on display, 0.08em on uppercase labels

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|---|---|---|---|---|---|---|
| display | — | 600 | 48px | 1.15 | -0.01em | `--text-display` |
| heading | — | 600 | 32px | 1.25 | — | `--text-heading` |
| subheading | — | 500 | 24px | 1.35 | — | `--text-subheading` |
| body-lg | — | 400 | 18px | 1.75 | — | `--text-body-lg` |
| body | — | 400 | 15px | 1.75 | — | `--text-body` |
| label | — | 500 | 13px | 1.5 | 0.08em | `--text-label` |

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

### Border Radius

| Element | Value |
|---|---|
| cards | 24px |
| buttons | 999px |
| inputs | 16px |
| icons | 999px |

- **Page max-width:** 1120px
- **Section gap:** 112px
- **Card padding:** 32px
- **Element gap:** 24px

## Components

### Journey Button

**Role:** 主行动按钮

天青到鼠尾草的纵向渐变、白字、999px 全圆角、2px 描边（主色 25% 不透明度）。字级 18px、字重 500、padding 16px 32px，阴影 0 8px 20px 绿 30%。hover 时上浮 4px、放大 1.01、旋转 0.8 度、阴影扩到 30px；按下时缩放 0.98 且角度归零。过渡 500ms ease-in-out。

- **Sizes:** padding 16px 32px; label 18px
- **States:** hover: lift 4px, scale 1.01, rotate 0.8deg; active: scale 0.98, rotate 0

### Story Card

**Role:** 内容卡与场景卡

奶油到浅琥珀的斜向渐变（90% 不透明）、24px 圆角、1px 描边（#d4c49a 45%）、内边距 32px、10px 模糊。图标块 64px 圆形、天青到鼠尾草渐变、内部阴影。hover 时上浮 6px、反向旋转 0.8 度、放大 1.01、阴影转绿 18%，图标放大 1.05 并旋转 6 度。过渡 700ms ease-in-out。

### Story Input

**Role:** 表单与写作输入

奶油 60% 填充、2px 描边（#d4c49a 40%）、16px 圆角、padding 16px 20px、15px 字、暖棕文字。聚焦时描边转鼠尾草、填充升到 80%，过渡 300ms。

### Cloud Layer

**Role:** 首屏云层与背景装饰

三到五块白色 40% 到 60% 的椭圆（宽高比 2:1），模糊 4px，分布在天空渐变的上三分之一，位置错落不重叠。不做动画或只做极慢的横向漂移（60 秒以上一个循环）。

## Do's and Don'ts

### Do

- 用暖棕替代黑色文字
- 圆角大：按钮全圆角、卡片 24px
- hover 允许 0.8 度旋转与 1.01 放大
- 动效 500 到 700ms，缓入缓出
- 用天空渐变与云层建立场景
- 正文行高 1.75，读起来像旁白

### Don't

- 不要用纯黑与高饱和色
- 不要用锐利直角
- 不要用快速过渡或线性缓动
- 不要让云层重叠成一大块
- 不要在画面里加科技感元素
- 不要用阴影做主要分层手段

## Surfaces

| Level | Name | Value | Purpose |
|---|---|---|---|
| 0 | Sky to Cream | `linear-gradient(#87ceeb, #b4e4f5, #f4e4bc)` | 首屏天空 |
| 1 | Cream Card | `#f4e4bc` | 卡片与面板 |

## Elevation

- **Card:** `0 8px 30px rgba(90,74,58,0.06)`
- **Card hover:** `0 16px 40px rgba(124,185,168,0.18)`
- **Button:** `0 8px 20px rgba(124,185,168,0.30)`

## Imagery

手绘感插画与动画场景美术：天空、草地、小屋、云。允许纸张或水彩纹理叠加 5% 到 10%。不使用锐利摄影、3D 渲染与高饱和色块。

## Layout

上限 1120px、容器内边距 24px，区块间距 112px。首屏为满幅天空渐变，标题居中偏上，下方留出大片天空。内容区用两栏或三栏卡片，卡片允许错落 8px 的高度差以增加手工感。

## Agent Prompt Guide

### Implementation Contract

- 以用户请求中的页面、用户任务和真实内容为依据，只实施指定范围；标明缺失的业务信息，不编造数据或能力。
- 先检查现有项目、技术栈与组件；沿用项目结构、路由和依赖，复用已有组件，不重建未要求的页面或功能。
- 沿用项目断点，调整窄屏与桌面的网格和留白；保留信息层级，避免意外横向溢出。
- 对本次涉及的交互，处理键盘焦点与减少动态效果；补齐适用的禁用、加载、空内容与错误状态。
- 完成后按项目现有脚本检查，仅报告实际运行的测试与视觉检查，并列出未验证项。

QUICK COLOR REFERENCE:

- text: `#5a4a3a`
- background: `#f4e4bc`
- card: `rgba(244,228,188,0.9)`
- primary: `#7cb9a8`
- sky: `#85cdca`
- accent: `#e8a87c`

EXAMPLE COMPONENT PROMPTS:

1. 做一个吉卜力风格卡片：奶油到浅琥珀 135 度渐变（90% 不透明）、24px 圆角、1px rgba(212,196,154,0.45) 描边、内边距 32px、backdrop-blur 10px、阴影 0 8px 30px rgba(90,74,58,0.06)。左上 64px 圆形图标块（天青到鼠尾草渐变）。hover 时 translateY(-6px) rotate(-0.8deg) scale(1.01)、阴影转 rgba(124,185,168,0.18)，过渡 700ms ease-in-out。
