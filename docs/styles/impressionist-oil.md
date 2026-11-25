# 油画印象派风 — 风格参考

> 厚涂的颜料与斑驳的光：界面像一张还没干的画布。

**Theme:** light

油画印象派风借鉴莫奈与雷诺阿：暖画布底（#f5f0e1）、粗笔触纹理、斑驳的光影、点彩式的杂色、以及厚涂的体积感。技术上靠三件事——按钮用线性渐变模拟颜料从管里挤出的走向，卡片用 repeating-linear-gradient 做出笔触方向的纹理，阴影用「实色底加模糊扩散」的双层组合模拟厚涂堆起的高度。它禁止纯平色块、禁止霓虹荧光、禁止等宽字体、禁止全大写，而且按钮按下必须下沉 3px，因为实色阴影不做陷入感就会失真。

## Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Canvas | `#f5f0e1` | `--color-canvas` | 页面底。亚麻画布的暖米色，所有笔触画在它上面。 |
| Warm Ochre | `#e8a87c` | `--color-warm-ochre` | 主色：日落、肤色与主按钮。印象派最常用的暖调。 |
| Vermilion | `#c0392b` | `--color-vermilion` | 强调与花的红，出现在小面积但极醒目。 |
| Deep Blue | `#2c3e50` | `--color-deep-blue` | 文字与阴影。印象派从不用纯黑，用深蓝作暗部。 |
| Teal | `#1abc9c` | `--color-teal` | 水与叶的冷侧，与朱红形成点彩式对比。 |
| Sunlight | `#f5d88a` | `--color-sunlight` | 光斑与高光，是画面里最亮的笔触。 |

## Typography

### Lora — 粗衬线，字重 700 用于标题。绝不用等宽，也绝不用全大写——印象派是柔的。

- **Substitute:** Georgia, 'Songti SC', serif
- **Weights:** 400, 700
- **Sizes:** 15, 18, 22, 30, 40, 54
- **Line height:** 1.2 (display), 1.3 (headings), 1.75 (body)
- **Letter spacing:** 0.01em on display, 0.06em on uppercase labels

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|---|---|---|---|---|---|---|
| display | — | 700 | 54px | 1.2 | 0.01em | `--text-display` |
| heading | — | 700 | 40px | 1.25 | — | `--text-heading` |
| subheading | — | 400 | 30px | 1.35 | — | `--text-subheading` |
| body-lg | — | 400 | 22px | 1.7 | — | `--text-body-lg` |
| body | — | 400 | 18px | 1.75 | — | `--text-body` |
| label | — | 700 | 15px | 1.5 | 0.06em | `--text-label` |

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
| cards | 10px |
| buttons | 8px |
| inputs | 8px |

- **Page max-width:** 1080px
- **Section gap:** 112px
- **Card padding:** 32px
- **Element gap:** 24px

## Components

### Paint Button

**Role:** 行动按钮

暖赭上下渐变（#f0b98f 到 #d99a6d）、画布色文字或深蓝文字、8px 圆角、无描边、18px/700、padding 14px 32px，厚涂阴影 0 4px 0 深蓝 18% 加 0 12px 28px 深蓝 14%。hover 时渐变提亮、阴影扩到 36px；按下时 translateY(3px) 且阴影收到 1px——这是颜料被压下去的感觉。焦点环必须带画布色 offset。

- **Sizes:** padding 14px 32px; label 18px
- **States:** hover: brighter gradient; active: sink 3px, shadow 1px

### Brushstroke Card

**Role:** 笔触卡片（核心组件）

画布色填充并叠一层 repeating-linear-gradient 笔触纹理（8px 间隔、深蓝 3%、角度 -12 度，模拟笔刷方向），10px 圆角、1px 深蓝 12% 描边、内边距 32px，厚涂阴影。标题 40px/700 深蓝，正文 18px 深蓝 75%。hover 时阴影加深加厚。

### Dab Light

**Role:** 光斑与点彩

一组 6 到 14 个半径 12 到 32px 的圆形，颜色取日黄、青绿或朱红并降到 20% 到 35%，绝对定位在区块上，允许互相重叠、互相柔化。它们模拟穿过树叶的光斑，单屏 2 到 3 组。

### Mixed Hue Edge

**Role:** 混色边缘

边框不用单一颜色，而用两层错开的描边：底层朱红 25%、上层青绿 20%，各偏移 1px，读起来像颜料在边界处混在了一起。它替代纯色描边。

### Canvas Field

**Role:** 暗场输入

画布色填充、8px 圆角、1px 深蓝 20% 描边、padding 12px 16px、18px 衬线。聚焦时描边转暖赭并加 2px 的暖赭 25% 外环，外环 offset 取画布色。

## Do's and Don'ts

### Do

- 暖画布底加亚麻纹理
- 按钮用渐变模拟颜料挤出
- 卡片叠笔触方向的纹理
- 阴影用实色底加模糊扩散
- 按下必须下沉 3px
- 焦点环带画布色 offset

### Don't

- 不要用纯平色块
- 不要用霓虹或荧光色
- 不要用等宽字体
- 不要用全大写文字
- 不要让按钮按下不下沉
- 不要让焦点环贴住元素

## Surfaces

| Level | Name | Value | Purpose |
|---|---|---|---|
| 0 | Canvas | `#f5f0e1` | 页面底（带亚麻纹理） |
| 1 | Warm Wash | `rgba(232,168,124,0.14)` | 暖色区块 |
| 2 | Cool Wash | `rgba(26,188,156,0.10)` | 冷色区块 |

## Elevation

- **Impasto:** `0 4px 0 rgba(44,62,80,0.18), 0 12px 28px rgba(44,62,80,0.14)`
- **Impasto hover:** `0 6px 0 rgba(44,62,80,0.20), 0 18px 36px rgba(44,62,80,0.18)`
- **Pressed:** `0 1px 0 rgba(44,62,80,0.18)`

## Imagery

印象派油画：风景、花园、水面、人物小景。必须可见笔触与混色，暖调、柔光。允许把照片处理成油画笔触。不使用纯平色块、霓虹图像与高清写实摄影。

## Layout

上限 1080px、容器内边距 24px，区块间距 112px。允许元素重叠与柔化边缘。整页保留画布纹理，色块像薄涂一样半透明。

## Agent Prompt Guide

### Implementation Contract

- 以用户请求中的页面、用户任务和真实内容为依据，只实施指定范围；标明缺失的业务信息，不编造数据或能力。
- 先检查现有项目、技术栈与组件；沿用项目结构、路由和依赖，复用已有组件，不重建未要求的页面或功能。
- 沿用项目断点，调整窄屏与桌面的网格和留白；保留信息层级，避免意外横向溢出。
- 对本次涉及的交互，处理键盘焦点与减少动态效果；补齐适用的禁用、加载、空内容与错误状态。
- 完成后按项目现有脚本检查，仅报告实际运行的测试与视觉检查，并列出未验证项。

QUICK COLOR REFERENCE:

- text: `#2c3e50`
- background: `#f5f0e1`
- ochre: `#e8a87c`
- vermilion: `#c0392b`
- teal: `#1abc9c`
- sunlight: `#f5d88a`

EXAMPLE COMPONENT PROMPTS:

1. 做一个油画印象派卡片：画布色 #f5f0e1 填充、叠一层 repeating-linear-gradient 笔触纹理（8px 间隔、rgba(44,62,80,0.03)、角度 -12deg）、10px 圆角、1px rgba(44,62,80,0.12) 描边、内边距 32px、box-shadow 0 4px 0 rgba(44,62,80,0.18), 0 12px 28px rgba(44,62,80,0.14)。标题 40px/700 Lora、色 #2c3e50；正文 18px、行高 1.75。按钮暖赭渐变 linear-gradient(#f0b98f, #d99a6d)、8px 圆角、18px/700、padding 14px 32px，hover 提亮，active 时 translateY(3px) 且阴影收到 1px。页面底色 #f5f0e1。
