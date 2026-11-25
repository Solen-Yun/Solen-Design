# 霓虹武士风 — 风格参考

> 一刀的斜线、朱红鸟居、霓虹发光：浮世绘撞进了霓虹街。

**Theme:** dark

霓虹武士把武士美学与赛博霓虹缝在一起：深海军底（#080818）上，朱红（#dc2626）作主色，紫（#a020f0）与天蓝（#38bdf8）作双色霓虹，金（#fbbf24）作刀光高光。图形语汇是固定的四件——刀的斜斩线（一条 2 到 4px 的斜向长线，末端收细）、鸟居作区块框架、甲片式的多边角卡片、书法笔触作分隔线（带霓虹发光）。它禁止常规投影，纵深只能靠发光表达。

## Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Vermilion | `#dc2626` | `--color-vermilion` | 主色：鸟居、斩击线与主按钮。武士的赤。 |
| Deep Navy | `#080818` | `--color-deep-navy` | 页面底。深到让朱红与双色霓虹同时发亮。 |
| Neon Violet | `#a020f0` | `--color-neon-violet` | 第一霓虹色：甲片边缘与 hover 光晕。 |
| Sky | `#38bdf8` | `--color-sky` | 第二霓虹色：数据、刀光冷侧与链接。 |
| Gold | `#fbbf24` | `--color-gold` | 刀光与高光，是画面里唯一的暖光。 |
| Neon Pink | `#ff1253` | `--color-neon-pink` | 警示与溅射特效，出现频率最低。 |

## Typography

### Cinzel — 纪念碑式衬线，标题加 0.06em 字距、标签 0.22em。字形带刀锋般的锐利感。

- **Substitute:** 'Noto Serif SC', Georgia, serif
- **Weights:** 400, 700
- **Sizes:** 12, 15, 20, 28, 38, 52
- **Line height:** 1.15 (display), 1.25 (headings), 1.65 (body)
- **Letter spacing:** 0.06em on display, 0.22em on uppercase labels

### JetBrains Mono — 数据与坐标。赛博那一侧的字体。

- **Substitute:** ui-monospace, 'Courier New', monospace
- **Weights:** 400
- **Sizes:** 11, 13
- **Line height:** 1.4 (display), 1.4 (headings), 1.5 (body)
- **Letter spacing:** 0.08em on display, 0.22em on uppercase labels

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|---|---|---|---|---|---|---|
| display | Cinzel | 700 | 52px | 1.15 | 0.06em | `--text-display` |
| heading | Cinzel | 700 | 38px | 1.2 | 0.06em | `--text-heading` |
| subheading | Cinzel | 400 | 28px | 1.3 | 0.04em | `--text-subheading` |
| body | Cinzel | 400 | 15px | 1.65 | — | `--text-body` |
| body-sm | Cinzel | 400 | 13px | 1.6 | — | `--text-body-sm` |
| label | JetBrains Mono | 400 | 12px | 1.4 | 0.22em | `--text-label` |

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
| cards | 0 |
| buttons | 0 |
| inputs | 0 |

- **Page max-width:** 1240px
- **Section gap:** 96px
- **Card padding:** 28px
- **Element gap:** 20px

## Components

### Slash Line

**Role:** 斩击线（签名图形）

一条 2 到 4px 的斜向长线（角度 -20 到 -35 度），从 4px 收细到 1px，颜色朱红或金并带 0 0 16px 发光。横跨区块并允许溢出容器。它是最能标识这套风格的元素，单屏一到两条，绝不多。

### Armor Card

**Role:** 甲片卡片（核心组件）

赤 8% 填充、零圆角、1px 朱红 40% 描边、内边距 28px，四角用 clip-path 切出不等边的斜角（右上 16px、左下 16px），外带双色霓虹发光（赤 20px 加紫 40px）。hover 时发光扩到 32/64px 并让溅射墨点爆发一次（8 个 4px 的赤色圆点在 300ms 内散开并淡出）。

- **States:** hover: glow widens, ink splatter burst

### Torii Frame

**Role:** 鸟居框架

区块顶部一条水平朱红梁（高 10px、两端各外伸 32px、带 0 0 20px 发光）加两根立柱（各 6px 宽、向下延伸 40 到 64px），构成鸟居轮廓。它作为区块的框架边界，每屏最多两处。

### Brush Divider

**Role:** 书法分隔线

一条 2 到 6px 的横向不规则笔触（用 clip-path 或 SVG path 做出起笔粗、收笔细的效果），颜色朱红或金并带霓虹发光。它替代普通分隔线，暗示书法的一横。

### Neon Button

**Role:** 行动按钮

深海军填充、朱红文字、零圆角、1px 朱红 60% 描边、12px 等宽全大写 0.22em、padding 12px 28px，双色外发光。hover 时描边升到 100%、发光转紫加天蓝；按下时位移 1px 并让光晕收到 8px。过渡 200ms。

- **Sizes:** padding 12px 28px; label 12px
- **States:** hover: violet-sky glow; active: translate 1px

## Do's and Don'ts

### Do

- 朱红配深海军与双色霓虹
- 斩击线单屏一到两条
- 鸟居作区块框架，最多两处
- 甲片用 16px 不等边切角
- 书法笔触作分隔线
- 纵深只用发光，不用投影

### Don't

- 不要用常规投影
- 不要用圆角
- 不要让斩击线超过两条
- 不要用西方肖像
- 不要让发光失去克制
- 不要混用两种切角尺寸

## Surfaces

| Level | Name | Value | Purpose |
|---|---|---|---|
| 0 | Deep Navy | `#080818` | 页面底 |
| 1 | Armor Plate | `rgba(220,38,38,0.08)` | 卡片（赤调半透明） |
| 2 | Blade Edge | `rgba(251,191,36,0.20)` | 刀光层 |

## Elevation

- **Dual neon:** `0 0 20px rgba(220,38,38,0.45), 0 0 40px rgba(160,32,240,0.25)`
- **Blade glow:** `0 0 16px rgba(251,191,36,0.50)`
- **Never:** `standard drop shadows are forbidden`

## Imagery

武士与刀、鸟居、甲片、书法笔触、霓虹街景。允许把浮世绘或书法扫描件叠霓虹发光。不使用西方肖像、柔和插画与无发光的写实摄影。

## Layout

上限 1240px、容器内边距 24px，区块间距 96px。允许斩击线溢出容器、鸟居框架跨区块。零圆角贯穿全站，切角固定 16px。所有纵深由发光提供，绝不用常规投影。

## Agent Prompt Guide

### Implementation Contract

- 以用户请求中的页面、用户任务和真实内容为依据，只实施指定范围；标明缺失的业务信息，不编造数据或能力。
- 先检查现有项目、技术栈与组件；沿用项目结构、路由和依赖，复用已有组件，不重建未要求的页面或功能。
- 沿用项目断点，调整窄屏与桌面的网格和留白；保留信息层级，避免意外横向溢出。
- 对本次涉及的交互，处理键盘焦点与减少动态效果；补齐适用的禁用、加载、空内容与错误状态。
- 完成后按项目现有脚本检查，仅报告实际运行的测试与视觉检查，并列出未验证项。

QUICK COLOR REFERENCE:

- text: `#dc2626`
- background: `#080818`
- vermilion: `#dc2626`
- violet: `#a020f0`
- sky: `#38bdf8`
- gold: `#fbbf24`

EXAMPLE COMPONENT PROMPTS:

1. 做一个霓虹武士卡片：深海军 #080818 底、赤 8% 填充、零圆角、1px rgba(220,38,38,0.4) 描边、内边距 28px、clip-path 切右上与左下各 16px、box-shadow 0 0 20px rgba(220,38,38,0.45), 0 0 40px rgba(160,32,240,0.25)。标题 38px/700 Cinzel、字距 0.06em、赤红。一条 3px 的斩击线（角度 -28 度、从 4px 收细到 1px、金色 #fbbf24、带 0 0 16px 发光）斜穿区块并溢出容器。区块顶部放鸟居横梁（10px 高、两端外伸 32px、赤红、带发光）。全站零圆角、零常规投影，纵深只用霓虹发光。
