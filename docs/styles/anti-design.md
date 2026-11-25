# 反设计 — 风格参考

> 把界面设计的所有规矩一次违反掉，但每一条都违反得有意。

**Theme:** light

反设计是故意对抗 UI 常规的实验性野兽派：4 到 8px 的超粗黑边框包住一切，边框不对称（右与下更厚），只用直角，阴影是 8px 的硬偏移，颜色用最高饱和的原色（红蓝黄品红青绿），间距与对齐刻意不一致，字体大小忽大忽小。它的「乱」是有成本核算的——每条违规都必须可复现、可解释，而不是随手乱放。这也是它与普通劣质页面的区别：反设计的混乱是受控的。

## Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Black | `#000000` | `--color-black` | 超粗边框、硬阴影与文字。整套结构的重量来源。 |
| White | `#ffffff` | `--color-white` | 画布。保留纯白，让原色更刺眼。 |
| Red | `#ff0000` | `--color-red` | 第一撞色，常与黑边并存于同一块。 |
| Blue | `#0000ff` | `--color-blue` | 第二撞色与链接色。 |
| Yellow | `#ffff00` | `--color-yellow` | 高亮底，用于让黑字跳出来。 |
| Magenta | `#ff00ff` | `--color-magenta` | 第三撞色，用于打破红蓝黄的三原色秩序。 |
| Cyan | `#00ffff` | `--color-cyan` | 第四撞色，常作背景让其他色块浮起来。 |

## Typography

### Inter — 全站无衬线，但字级刻意不统一——同一个区块里可能同时出现 11px 与 110px。

- **Substitute:** 'Arial Black', Helvetica, sans-serif
- **Weights:** 400, 700, 900
- **Sizes:** 11, 16, 28, 48, 72, 110
- **Line height:** 0.9 (display), 1 (headings), 1.4 (body)
- **Letter spacing:** -0.04em on display, 0 on uppercase labels

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|---|---|---|---|---|---|---|
| display | — | 900 | 110px | 0.9 | -0.04em | `--text-display` |
| heading | — | 900 | 72px | 0.95 | -0.03em | `--text-heading` |
| subheading | — | 700 | 48px | 1 | — | `--text-subheading` |
| body-lg | — | 400 | 28px | 1.3 | — | `--text-body-lg` |
| body | — | 400 | 16px | 1.4 | — | `--text-body` |
| label | — | 700 | 11px | 1.3 | 0 | `--text-label` |

## Spacing & Layout

**Base unit:** 4px
**Density:** compact

### Spacing Scale

| Name | Value | Token |
|---|---|---|
| 0 | 0px | `--spacing-0` |
| 4 | 4px | `--spacing-4` |
| 12 | 12px | `--spacing-12` |
| 20 | 20px | `--spacing-20` |
| 36 | 36px | `--spacing-36` |
| 60 | 60px | `--spacing-60` |
| 92 | 92px | `--spacing-92` |

### Border Radius

| Element | Value |
|---|---|
| cards | 0 |
| buttons | 0 |
| inputs | 0 |

- **Page max-width:** 1440px
- **Section gap:** 36px
- **Card padding:** 20px
- **Element gap:** 12px

## Components

### Asymmetric Frame

**Role:** 不对称粗框（核心组件）

4 到 8px 纯黑边框，四边不等宽（例如上 4、右 8、下 8、左 4），零圆角，内边距 20px，硬阴影 8px 8px 0 黑。填充一支原色。同一屏的所有框必须用同一套不对称规则，否则就只是杂乱。

### Slam Button

**Role:** 行动按钮

原色填充（红或蓝）、白或黑字、4px 黑边、零圆角、28px/900、padding 12px 24px，硬阴影 8px 8px 0 黑。hover 时填充硬切到另一个原色并让阴影扩到 12px；按下时位移 8px 8px 且阴影归零。过渡 80ms linear。

- **Sizes:** padding 12px 24px; label 28px
- **States:** hover: color swap, shadow 12px; active: translate 8px

### Broken Grid

**Role:** 刻意的错位网格

12 栏网格，但元素按规则偏移 1 到 3 栏（不是随机）：每行至少有一个元素越界，且偏移方向交替。间距在 4、12、20、36 之间跳动。偏移规则一旦写定就必须全局一致。

### Oversized Numeral

**Role:** 超大数字与字母

110px/900 的数字或单个字母，填原色或黑，可旋转 0 到 12 度，压在区块角落或跨在边框上。用于章节标记与装饰，它的尺寸与旁边的 11px 标签形成极端对比。

### Raw Marquee

**Role:** 生硬跑马灯

内容复制两份、24s linear 无限循环 translateX 0 到 -50%，字用 48px/900 全大写加原色底。hover 时暂停。不装饰、不淡出，就这么滚过去。

## Do's and Don'ts

### Do

- 4 到 8px 超粗黑边，四边不等宽
- 零圆角，只用直角
- 8px 硬偏移阴影
- 最高饱和的原色
- 间距与对齐刻意不一致
- 混乱必须可复现、有规则

### Don't

- 不要用任何圆角
- 不要用低饱和或柔和的颜色
- 不要用一致的对齐
- 不要用柔和阴影
- 不要用渐变
- 不要随手乱放——违规必须有规则

## Surfaces

| Level | Name | Value | Purpose |
|---|---|---|---|
| 0 | White | `#ffffff` | 画布 |
| 1 | Yellow Block | `#ffff00` | 高亮块 |
| 2 | Cyan Block | `#00ffff` | 反色块 |

## Elevation

- **Hard offset:** `8px 8px 0 #000000`
- **Hard offset sm:** `4px 4px 0 #000000`
- **Pressed:** `none`

## Imagery

图像本身也要反设计：低分辨率截图、被拉伸的照片、贴错位置的图标、ASCII 图形。允许把图像故意压到 20% 质量。不使用精致摄影与柔和插画，因为「精致」在这里是失格。

## Layout

上限 1440px，间距在 4、12、20、36、60、92 之间跳动。元素允许重叠、越界、旋转 0 到 12 度。但偏移与重叠必须服从一套写定的规则，混乱要能复现。

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
- red: `#ff0000`
- blue: `#0000ff`
- yellow: `#ffff00`
- cyan: `#00ffff`

EXAMPLE COMPONENT PROMPTS:

1. 做一个反设计区块：白底、一个红填充的方块、边框上 4px 右 8px 下 8px 左 4px 纯黑、零圆角、box-shadow 8px 8px 0 #000。标题 110px/900 字距 -0.04em 跨在边框上并旋转 -3 度，旁边放一个 11px 的标签形成极端对比。按钮黄填充、4px 黑边、28px/900、硬阴影 8px 8px 0 #000，hover 时填充硬切到青。间距在 4、12、20、36 之间跳动，元素按写定的规则错位 1 到 3 栏。全站零圆角、无渐变。
