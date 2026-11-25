# 超现实主义风 — 风格参考

> 梦境里的时间：一切都慢，一切都稍微歪着，光从不该来的方向来。

**Theme:** dark

超现实主义借用达利的语汇：午夜蓝与沙漠金的意外配色、不合逻辑的空间关系、融化与变形的形状、以及从不该来的方向打来的光。它有两条独有的时间与位移规则——第一，所有过渡必须是 700 到 1000ms 的 ease-in-out（Timeless Easing），因为梦境的时间是弹性的；第二，hover 绝不允许 scale，只能用 skew 与 rotate 扭曲现实。阴影也不能是黑色，必须用玫瑰或金色的漫射光晕，黑色阴影会瞬间把梦叫醒。

## Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Midnight Blue | `#1a1a3e` | `--color-midnight` | 页面底与主色。深到接近黑，但仍保留蓝的呼吸。 |
| Bone | `#f0ece4` | `--color-bone` | 文字与浅色块。像梦里发灰的骨白。 |
| Desert Gold | `#d4a574` | `--color-desert-gold` | 暖侧强调与光晕色。天上那束不该存在的阳光。 |
| Dusty Rose | `#c38d94` | `--color-dusty-rose` | 第二强调与阴影的替代色。所有投影都用它而不是黑。 |
| Violet | `#4a3f6b` | `--color-violet` | 深紫用于融化的形体与层叠阴影。 |
| Moss | `#90ba6d` | `--color-moss` | 唯一的一抹生机，出现频率最低，用来打破梦的窒息感。 |

## Typography

### Cormorant Garamond — 全站衬线，标题允许斜体。细笔画的衬线在深底上像被手写上去的。

- **Substitute:** 'EB Garamond', Georgia, 'Songti SC', serif
- **Weights:** 300, 400, 600
- **Sizes:** 15, 18, 22, 30, 42, 58
- **Line height:** 1.1 (display), 1.25 (headings), 1.8 (body)
- **Letter spacing:** 0.01em on display, 0.1em on uppercase labels

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|---|---|---|---|---|---|---|
| display | Cormorant Garamond | 300 | 58px | 1.1 | 0.01em | `--text-display` |
| heading | Cormorant Garamond | 400 | 42px | 1.2 | — | `--text-heading` |
| subheading | Cormorant Garamond | 400 | 30px | 1.3 | — | `--text-subheading` |
| body-lg | Cormorant Garamond | 400 | 22px | 1.7 | — | `--text-body-lg` |
| body | Cormorant Garamond | 400 | 18px | 1.8 | — | `--text-body` |
| label | Cormorant Garamond | 600 | 15px | 1.5 | 0.1em | `--text-label` |

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
| 144 | 144px | `--spacing-144` |

### Border Radius

| Element | Value |
|---|---|
| cards | 32px |
| buttons | 999px |
| inputs | 24px |
| orbs | 999px |

- **Page max-width:** 1120px
- **Section gap:** 144px
- **Card padding:** 36px
- **Element gap:** 28px

## Components

### Melting Panel

**Role:** 卡片与内容面板

紫色 40% 填充、32px 圆角、1px 沙漠金 20% 描边、内边距 36px，外加一层玫瑰色漫射光晕（0 24px 60px 玫瑰 22%），绝不使用黑色阴影。默认整体旋转 -1 度并轻微 skewX(-1.5deg)。hover 时旋转到 1 度、skew 归零、光晕扩到 80px，过渡 1000ms ease-in-out。

- **States:** hover: rotate to 1deg, halo 80px

### Distorted Button

**Role:** 行动按钮

沙漠金填充、午夜蓝文字、999px 全圆角、无描边，18px/600、0.1em 字距、padding 14px 36px，光晕 0 12px 40px 金 28%。hover 时 skewX(-6deg) 并 rotate(-2deg)、光晕扩到 60px，绝不允许 scale。按下时 skew 归零并整体下沉 2px。过渡 700ms ease-in-out。

- **States:** hover: skew and rotate, no scale; active: skew 0, sink 2px

### Color Orb

**Role:** 装饰光球

24px 到 160px 的圆形，径向渐变从沙漠金或玫瑰的中心渐隐到透明，无边框，绝对定位在卡片边缘并允许溢出 20% 到 40%。颜色在 2000ms 内缓慢扩散与收缩（Color Melting），绝不允许 transition-none。单屏最多四个。

### Soft Field

**Role:** 输入框

午夜蓝 60% 填充、24px 圆角、1px 紫罗兰 40% 描边、padding 14px 20px、18px 衬线。聚焦时描边转沙漠金 60% 并加 0 0 0 3px 的金 15% 外环，过渡 700ms。

### Floating Epoch

**Role:** 漂浮的层级错位

把同一内容复制成两到三层，每层偏移 8 到 16px、各自不同透明度（100%、45%、20%）与不同角度（-3、0、+4 度）。仅用于标题或首屏主视觉，营造「同一个东西在时间里被看见三次」的错觉。

## Do's and Don'ts

### Do

- 所有过渡 700 到 1000ms ease-in-out
- hover 用 skew 与 rotate，不用 scale
- 阴影一律用玫瑰或金色光晕
- 午夜蓝配沙漠金的反常配色
- 形状允许融化与变形
- 标题可用斜体衬线

### Don't

- 不要用过于明亮的纯色
- 不要用严格对称的网格
- 不要做现代极简的无装饰设计
- 不要用刺眼的霓虹
- 不要用 hover:scale-105
- 不要用黑色投影

## Surfaces

| Level | Name | Value | Purpose |
|---|---|---|---|
| 0 | Midnight | `#1a1a3e` | 页面底 |
| 1 | Melting Panel | `rgba(74,63,107,0.40)` | 卡片（半透明紫） |
| 2 | Bone Patch | `#f0ece4` | 浅色反差点 |

## Elevation

- **Abyssal glow:** `0 24px 60px rgba(195,141,148,0.22)`
- **Gold halo:** `0 12px 40px rgba(212,165,116,0.28)`
- **Never:** `black shadows are forbidden`

## Imagery

融化的钟表、漂浮的石头、室内长出的海、比例错位的物体。图像必须带不合逻辑的空间关系与来自错误方向的投影。不使用写实纪实摄影与扁平图标。

## Layout

上限 1120px、容器内边距 24px，区块间距 144px。严禁严格对称网格：允许元素偏离网格 16 到 48px、允许重叠、允许旋转 -3 到 3 度。但阅读顺序必须仍然清晰——梦境可以歪，不能读不懂。

## Agent Prompt Guide

### Implementation Contract

- 以用户请求中的页面、用户任务和真实内容为依据，只实施指定范围；标明缺失的业务信息，不编造数据或能力。
- 先检查现有项目、技术栈与组件；沿用项目结构、路由和依赖，复用已有组件，不重建未要求的页面或功能。
- 沿用项目断点，调整窄屏与桌面的网格和留白；保留信息层级，避免意外横向溢出。
- 对本次涉及的交互，处理键盘焦点与减少动态效果；补齐适用的禁用、加载、空内容与错误状态。
- 完成后按项目现有脚本检查，仅报告实际运行的测试与视觉检查，并列出未验证项。

QUICK COLOR REFERENCE:

- text: `#f0ece4`
- background: `#1a1a3e`
- panel: `rgba(74,63,107,0.40)`
- gold: `#d4a574`
- rose: `#c38d94`
- moss: `#90ba6d`

EXAMPLE COMPONENT PROMPTS:

1. 做一个超现实主义卡片：背景 rgba(74,63,107,0.4)、32px 圆角、1px rgba(212,165,116,0.2) 描边、内边距 36px、box-shadow 0 24px 60px rgba(195,141,148,0.22)（绝不用黑色阴影）。整卡 rotate(-1deg) skewX(-1.5deg)。标题 42px 衬线 300 字重、色 #f0ece4；正文 18px 衬线、行高 1.8。hover 时 rotate(1deg) skewX(0)、光晕扩到 80px，transition 1000ms ease-in-out。页面底色 #1a1a3e，可在边缘放两个径向渐变的沙漠金光球，颜色在 2000ms 内缓慢扩散。
