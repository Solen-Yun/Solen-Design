# 霓虹东京 — 风格参考

> 雨后的歌舞伎町：招牌一层压一层，光倒映在湿沥青上。

**Theme:** dark

霓虹东京与赛博朋克霓虹的区别在于「真实城市」而不是科幻：它模拟歌舞伎町的夜景，招牌一层压一层、多色霓虹边框交替、光晕多层叠加、湿沥青反光。底色是深夜蓝黑（#0a0a1a）到紫黑的渐变，主色霓虹粉（#ff1493），辅以青（#00f0ff）、橙（#ff6b00）与紫（#bc13fe），卡片用 80% 半透明加深模糊模拟玻璃反射，粗体无衬线配日文假名作装饰元素，标题可做粉到青的渐变文字。

## Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Neon Pink | `#ff1493` | `--color-neon-pink` | 主色：招牌、主按钮与最主要的发光。 |
| Night Blue Black | `#0a0a1a` | `--color-night-blue` | 页面底。像雨后没有星星的夜空。 |
| Neon Cyan | `#00f0ff` | `--color-neon-cyan` | 第二霓虹色：数据、链接与冷侧光。 |
| Neon Orange | `#ff6b00` | `--color-neon-orange` | 第三霓虹色，模拟暖色招牌与灯笼。 |
| Neon Violet | `#bc13fe` | `--color-neon-violet` | 第四霓虹色，用于让招牌层失去统一色。 |
| Pale Blue | `#97b6ff` | `--color-pale-blue` | 文字的反光与次级高亮，最柔的一支。 |

## Typography

### Inter — 粗无衬线，标题 900 字重压紧字距。可与日文假名混排，假名作装饰用。

- **Substitute:** 'Hiragino Sans', 'Yu Gothic', system-ui, sans-serif
- **Weights:** 700, 900
- **Sizes:** 12, 15, 20, 28, 38, 54
- **Line height:** 1.1 (display), 1.2 (headings), 1.6 (body)
- **Letter spacing:** -0.02em on display, 0.16em on uppercase labels

### JetBrains Mono — 数据与坐标，赛博那一侧的字体。

- **Substitute:** ui-monospace, monospace
- **Weights:** 400
- **Sizes:** 11, 13
- **Line height:** 1.5 (display), 1.5 (headings), 1.6 (body)
- **Letter spacing:** 0.1em on display, 0.16em on uppercase labels

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|---|---|---|---|---|---|---|
| display | Inter | 900 | 54px | 1.1 | -0.02em | `--text-display` |
| heading | Inter | 900 | 38px | 1.15 | -0.02em | `--text-heading` |
| subheading | Inter | 700 | 28px | 1.25 | — | `--text-subheading` |
| body-lg | Inter | 700 | 15px | 1.55 | — | `--text-body-lg` |
| body | Inter | 700 | 13px | 1.6 | — | `--text-body` |
| label | JetBrains Mono | 400 | 11px | 1.5 | 0.16em | `--text-label` |

## Spacing & Layout

**Base unit:** 8px
**Density:** compact

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
| cards | 8px |
| buttons | 4px |
| signs | 2px |

- **Page max-width:** 1240px
- **Section gap:** 64px
- **Card padding:** 24px
- **Element gap:** 16px

## Components

### Sign Card

**Role:** 招牌卡片（核心组件）

深夜蓝黑 80% 填充、8px 模糊、8px 圆角、1px 霓虹粉 50% 描边、内边距 24px，多层光晕（粉 12px、粉 28px）。标题 38px/900 霓虹粉并带 0 0 10px 粉 60% 的文字发光；正文 13px 白 80%。hover 时描边换青、光晕转混色（粉加青加紫）。

- **States:** hover: cyan border, mixed glow

### Gradient Headline

**Role:** 渐变标题

背景为粉到青的横向渐变配 background-clip: text 与透明字色，再加 0 0 10px 粉 40% 的文字发光（用 filter: drop-shadow 而不是 text-shadow，因为文字已透明）。只用于首屏标题，单页最多一处。

### Sign Stack

**Role:** 招牌叠层

3 到 5 块窄长的招牌（各 120 到 200px 宽、40 到 64px 高）垂直叠放，各自不同底色（粉、青、橙、紫之一）、2px 圆角、不同光晕，块与块之间负边距 -4px 让它们挤在一起。每块里放 12px 全大写的短字。它模拟歌舞伎町的招牌墙。

### Wet Reflection

**Role:** 湿地反光

在区块底部放一条 60 到 120px 高的区域，把上方的霓虹色以 10% 到 20% 不透明度垂直翻转模糊地重复一次（用 transform: scaleY(-1) 加 blur 8px 与线性渐变遮罩淡出）。它让页面像刚下过雨。

### Neon Button

**Role:** 行动按钮

透明底、1px 霓虹粉 60% 描边、4px 圆角、11px 等宽全大写 0.16em、padding 10px 24px，光晕 0 0 12px 粉 60%。hover 时填充粉 12%、描边升到 100%、光晕扩到 28px；按下时位移 1px 且光晕收到 6px。过渡 120ms linear。

- **Sizes:** padding 10px 24px; label 11px
- **States:** hover: fill 12%, glow 28px; active: translate 1px

## Do's and Don'ts

### Do

- 深夜蓝黑到紫黑的渐变底
- 多色霓虹边框交替
- 光晕多层叠加
- 招牌叠层模拟招牌墙
- 卡片 80% 半透明加深模糊
- 湿沥青反光

### Don't

- 不要用白天摄影与自然风景
- 不要用大圆角
- 不要用柔和插画
- 不要只用单色霓虹
- 不要让光晕盖过文字
- 不要做科幻感的界面元素

## Surfaces

| Level | Name | Value | Purpose |
|---|---|---|---|
| 0 | Night Gradient | `linear-gradient(#0a0a1a, #12041e)` | 页面底 |
| 1 | Glass Sign | `rgba(10,10,26,0.80)` | 卡片与招牌 |
| 2 | Wet Reflection | `rgba(255,20,147,0.10)` | 反光层 |

## Elevation

- **Sign glow:** `0 0 12px rgba(255,20,147,0.60), 0 0 28px rgba(255,20,147,0.30)`
- **Cyan glow:** `0 0 12px rgba(0,240,255,0.60), 0 0 28px rgba(0,240,255,0.30)`
- **Mixed glow:** `0 0 16px rgba(255,20,147,0.50), 0 0 32px rgba(0,240,255,0.30), 0 0 48px rgba(188,19,254,0.20)`

## Imagery

城市夜景摄影：招牌、巷道、雨后的路面、自动贩卖机、霓虹倒影。必须高对比、多色光源。允许把照片压成粉青双色调。不使用白天摄影、自然风景与柔和插画。

## Layout

上限 1240px、容器内边距 16px，区块间距 64px。允许招牌叠层与元素重叠，圆角保持小值（2 到 8px）。整页保持暗场，霓虹只在需要被看到的地方亮。

## Agent Prompt Guide

### Implementation Contract

- 以用户请求中的页面、用户任务和真实内容为依据，只实施指定范围；标明缺失的业务信息，不编造数据或能力。
- 先检查现有项目、技术栈与组件；沿用项目结构、路由和依赖，复用已有组件，不重建未要求的页面或功能。
- 沿用项目断点，调整窄屏与桌面的网格和留白；保留信息层级，避免意外横向溢出。
- 对本次涉及的交互，处理键盘焦点与减少动态效果；补齐适用的禁用、加载、空内容与错误状态。
- 完成后按项目现有脚本检查，仅报告实际运行的测试与视觉检查，并列出未验证项。

QUICK COLOR REFERENCE:

- text: `#ffffff`
- background: `#0a0a1a`
- pink: `#ff1493`
- cyan: `#00f0ff`
- orange: `#ff6b00`
- violet: `#bc13fe`

EXAMPLE COMPONENT PROMPTS:

1. 做一个霓虹东京招牌卡片：背景 rgba(10,10,26,0.8) 加 8px 模糊、8px 圆角、1px rgba(255,20,147,0.5) 描边、内边距 24px、多层光晕 0 0 12px rgba(255,20,147,0.6), 0 0 28px rgba(255,20,147,0.3)。标题 38px/900、色 #ff1493、text-shadow 0 0 10px rgba(255,20,147,0.6)；正文 13px、色 rgba(255,255,255,0.8)。旁边叠 4 块窄长招牌（各 160×48px、2px 圆角、负边距 -4px、分别填 #ff1493/#00f0ff/#ff6b00/#bc13fe、各带光晕）。区块底部加 80px 高的湿地反光层（上方内容 scaleY(-1) + blur 8px + 15% 不透明度 + 渐变遮罩）。页面底色 linear-gradient(#0a0a1a, #12041e)。
