# 粉彩哥特 — 风格参考

> 骷髅长在薰衣草色的糖霜里：暗的内核，软的表面。

**Theme:** dark

粉彩哥特把暗色美学与糖果色缝在一起：深紫（#2d1b3d）与近黑（#1a1225）作底，薰衣草紫（#d4a5e3）与粉蓝（#7ec8c8）作主文本，粉（#f5a5b8）与长春花紫（#b8a5f5）作装饰。图形语汇是哥特的（骷髅、十字、星星、蝙蝠）但处理成粉彩、圆润、可爱——反差就是全部。圆角取 12 到 16px「柔和但不过于可爱」，边框是粉彩 30% 半透明，标题可粗但必须配粉彩色柔化。

## Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Deep Violet | `#2d1b3d` | `--color-deep-violet` | 页面主底。紫得刚好，比纯黑柔。 |
| Near Black | `#1a1225` | `--color-near-black` | 最深区块与卡片底。带紫的黑。 |
| Lavender | `#d4a5e3` | `--color-lavender` | 主文本与主描边。整套风格的识别色。 |
| Pastel Blue | `#7ec8c8` | `--color-pastel-blue` | 第二文本色与冷侧强调。 |
| Blush | `#f5a5b8` | `--color-blush` | 情绪化强调与「可爱」那一侧。 |
| Periwinkle | `#b8a5f5` | `--color-periwinkle` | 第三装饰色，用于渐变与图标。 |

## Typography

### Quicksand — 圆润无衬线，标题 700 但字形柔和。硬朗的字体会破坏反差。

- **Substitute:** 'Trebuchet MS', 'Segoe UI', sans-serif
- **Weights:** 500, 700
- **Sizes:** 12, 15, 19, 26, 34, 46
- **Line height:** 1.2 (display), 1.3 (headings), 1.7 (body)
- **Letter spacing:** 0.01em on display, 0.14em on uppercase labels

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|---|---|---|---|---|---|---|
| display | — | 700 | 46px | 1.2 | 0.01em | `--text-display` |
| heading | — | 700 | 34px | 1.3 | — | `--text-heading` |
| subheading | — | 500 | 26px | 1.4 | — | `--text-subheading` |
| body-lg | — | 500 | 19px | 1.65 | — | `--text-body-lg` |
| body | — | 500 | 15px | 1.7 | — | `--text-body` |
| label | — | 700 | 12px | 1.5 | 0.14em | `--text-label` |

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
| inputs | 12px |
| icons | 999px |

- **Page max-width:** 1080px
- **Section gap:** 96px
- **Card padding:** 28px
- **Element gap:** 20px

## Components

### Soft Goth Card

**Role:** 柔和哥特卡片（核心组件）

近黑填充、16px 圆角、1px 薰衣草 30% 描边、内边距 28px，外带 0 0 20px 薰衣草 30% 柔光。标题 34px/700 薰衣草，正文 15px 粉蓝 80%。四角各放一个 12px 的粉彩十字或骷髅线稿（1px 线，不填充）。hover 时描边升到 60%、柔光转粉。

- **States:** hover: border 60%, pink glow

### Candy Button

**Role:** 行动按钮

薰衣草填充、深紫文字、12px 圆角、1px 粉蓝 40% 描边、15px/700、padding 12px 28px，外带 0 0 20px 薰衣草 30% 柔光。hover 时填充转粉、描边转长春花紫；按下缩放 0.98。过渡 200ms。

- **Sizes:** padding 12px 28px; label 15px
- **States:** hover: pink fill; active: scale 0.98

### Skull Motif

**Role:** 骷髅与十字装饰

24 到 64px 的线稿骷髅、十字、蝙蝠或星星，stroke 2px、颜色薰衣草或粉、绝不填充黑色。可填充 15% 的粉彩底。它必须「可爱化」——圆一点的颅骨、胖一点的骨头。单屏 2 到 4 处。

### Pastel Gradient

**Role:** 粉彩渐变带

薰衣草经粉到长春花紫的横向渐变（或粉蓝经薰衣草到粉），高 4 到 8px，用于卡片顶部或分隔。渐变必须柔和且只在粉彩范围内过渡，绝不出现深色站。

### Ghost Field

**Role:** 表单输入

近黑填充、12px 圆角、1px 薰衣草 25% 描边、padding 10px 16px、15px 字。占位符粉蓝 45%。聚焦时描边转薰衣草 60% 并加 3px 的薰衣草 20% 外环。

## Do's and Don'ts

### Do

- 深紫近黑底配粉彩
- 哥特元素但处理成粉彩圆润
- 圆角 12 到 16px
- 边框粉彩 30% 半透明
- 标题可粗但配粉彩色
- 渐变只在粉彩范围内

### Don't

- 不要用写实恐怖图像
- 不要用纯黑填充图形
- 不要用硬朗字体
- 不要在渐变里加深色站
- 不要用锐角
- 不要让元素变成纯可爱

## Surfaces

| Level | Name | Value | Purpose |
|---|---|---|---|
| 0 | Deep Violet | `#2d1b3d` | 页面底 |
| 1 | Near Black | `#1a1225` | 卡片 |
| 2 | Lavender Wash | `rgba(212,165,227,0.10)` | 强调底 |

## Elevation

- **Pastel glow:** `0 0 20px rgba(212,165,227,0.30)`
- **Pink glow:** `0 0 20px rgba(245,165,184,0.28)`

## Imagery

粉彩哥特插画：骷髅、蝙蝠、十字、星星、蜘蛛网，处理成粉彩与柔光。允许把照片压成薰衣草双色调。不使用写实恐怖图像、纯黑图形与高饱和插画。

## Layout

上限 1080px、容器内边距 24px，区块间距 96px。允许装饰轻微旋转（-6 到 6 度）与错位。留白中等，装饰密度中高但必须柔和。

## Agent Prompt Guide

### Implementation Contract

- 以用户请求中的页面、用户任务和真实内容为依据，只实施指定范围；标明缺失的业务信息，不编造数据或能力。
- 先检查现有项目、技术栈与组件；沿用项目结构、路由和依赖，复用已有组件，不重建未要求的页面或功能。
- 沿用项目断点，调整窄屏与桌面的网格和留白；保留信息层级，避免意外横向溢出。
- 对本次涉及的交互，处理键盘焦点与减少动态效果；补齐适用的禁用、加载、空内容与错误状态。
- 完成后按项目现有脚本检查，仅报告实际运行的测试与视觉检查，并列出未验证项。

QUICK COLOR REFERENCE:

- text: `#d4a5e3`
- background: `#2d1b3d`
- lavender: `#d4a5e3`
- blue: `#7ec8c8`
- blush: `#f5a5b8`
- periwinkle: `#b8a5f5`

EXAMPLE COMPONENT PROMPTS:

1. 做一个粉彩哥特卡片：近黑 #1a1225 填充、16px 圆角、1px rgba(212,165,227,0.3) 描边、内边距 28px、box-shadow 0 0 20px rgba(212,165,227,0.3)。标题 34px/700 Quicksand、色 #d4a5e3；正文 15px、色 rgba(126,200,200,0.8)。四角各放一个 12px 的粉彩十字线稿（2px 描边、薰衣草、不填充）。按钮薰衣草 #d4a5e3 填充、深紫文字、12px 圆角、1px 粉蓝描边、padding 12px 28px，hover 时填充转 #f5a5b8。卡片顶部加一条 6px 的粉彩渐变带（#d4a5e3 → #f5a5b8 → #b8a5f5）。页面底色 #2d1b3d，全站零纯黑填充、零锐角。
