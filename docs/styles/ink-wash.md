# 水墨画风 — 风格参考

> 墨分五色，纸留大片空白：气韵在没画的地方。

**Theme:** light

水墨画风来自传统水墨：墨色的浓淡干湿是唯一的表达手段，纸的大片空白是构图的主体（计白当黑）。落到界面上，纪律很明确——衬线字体呼应书法、边框必须像毛笔一样细（1px 且只有 20% 墨色）、颜色全部压在灰调里、阴影一律不许有。交互也照此收紧：hover 只让墨色加深、边框稍微渗开，绝不做位移、绝不用 spring 或 bounce，因为任何机械弹性都会破坏「静谧」。

## Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Ink | `#2c2c2c` | `--color-ink` | 全部文字与线条。不是纯黑，留出「浓墨」与「焦墨」的余地。 |
| Xuan Paper | `#f8f5f0` | `--color-xuan` | 页面底。略带暖黄的纸色，是所有留白的载体。 |
| Grey Green | `#6b7b6e` | `--color-grey-green` | 第一辅色，用于远景山色与次级强调。 |
| Ochre | `#a89279` | `--color-ochre` | 温暖的一笔，用于需要人气的元素，出现频率低。 |
| Pale Sand | `#c4b9a8` | `--color-pale-sand` | 淡墨层，用于区块底色与分隔。 |
| Slate Blue | `#697a7c` | `--color-slate-blue` | 冷侧的一笔，用于水与天空。 |

## Typography

### Noto Serif SC — 全站衬线。行高 1.9 是水墨的必要条件——字距与行距都要空出来，像纸上未落笔的部分。

- **Substitute:** 'Songti SC', 'STSong', Georgia, serif
- **Weights:** 300, 400, 500
- **Sizes:** 15, 18, 22, 28, 38, 52
- **Line height:** 1.2 (display), 1.4 (headings), 1.9 (body)
- **Letter spacing:** 0.02em on display, 0.3em on uppercase labels

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|---|---|---|---|---|---|---|
| display | Noto Serif SC | 300 | 52px | 1.2 | 0.02em | `--text-display` |
| heading | Noto Serif SC | 400 | 38px | 1.35 | — | `--text-heading` |
| subheading | Noto Serif SC | 400 | 28px | 1.45 | — | `--text-subheading` |
| body-lg | Noto Serif SC | 400 | 22px | 1.8 | — | `--text-body-lg` |
| body | Noto Serif SC | 300 | 18px | 1.9 | — | `--text-body` |
| label | Noto Serif SC | 500 | 15px | 1.7 | 0.3em | `--text-label` |

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
| 192 | 192px | `--spacing-192` |

### Border Radius

| Element | Value |
|---|---|
| cards | 0 |
| buttons | 0 |
| seals | 4px |

- **Page max-width:** 1000px
- **Section gap:** 192px
- **Card padding:** 40px
- **Element gap:** 32px

## Components

### Ink Rule

**Role:** 墨线分隔（核心结构）

1px、墨色 20%、横跨内容宽但并不贯穿全宽（左右各收进 15%），两端可以渐隐到透明。整条线必须足够细，像毛笔的收笔。

### Quiet Button

**Role:** 行动按钮

透明底、1px 墨色 30% 描边、零圆角、衬线 15px、字距 0.3em、padding 14px 36px，无阴影。hover 时描边升到 60%、文字从 70% 升到 100%、并出现一层极淡的墨晕（0 0 12px 墨 8%，这是唯一允许的「阴影」）。过渡 600ms ease-out，绝不做位移。

- **States:** hover: border 60%, ink bloom; no displacement

### Rice Paper Card

**Role:** 内容卡与画卷块

宣纸色填充、零圆角、1px 墨色 15% 描边、内边距 40px，无阴影。标题 38px/400，正文 18px/300 行高 1.9。hover 时描边升到 35% 并向外渗开 2px（用 outline-offset 或第二层描边模拟墨在纸上洇开）。

### Seal Stamp

**Role:** 印章

32px 见方、4px 圆角、朱红或赭石填充（唯一的非灰颜色，只在此处出现）、内嵌 20px 的白色衬线单字，边缘做 1px 的残缺处理（用 mask 或伪元素切掉几个像素）。用于标记章节与「已读」。

### Emptiness Block

**Role:** 留白区块

一个不承载任何内容的区块，高度 128px 到 320px，仅用于让前后的内容呼吸。在文档结构里它是真实存在的（不是 margin），因为在这套风格里留白本身就是内容。

## Do's and Don'ts

### Do

- 墨色为主，颜色全在灰调里
- 边框 1px 且只有 20% 墨色
- 留白是结构，不是余量
- 衬线字体，行高 1.9
- 交互只加深墨色与渗开边框
- 印章是唯一允许的彩色

### Don't

- 不要用鲜艳饱和色彩
- 不要用厚重阴影
- 不要用粗边框
- 不要用装饰性动画与弹跳
- 不要用 spring 或 bounce 曲线
- 不要在 hover 位移元素

## Surfaces

| Level | Name | Value | Purpose |
|---|---|---|---|
| 0 | Xuan Paper | `#f8f5f0` | 页面底 |
| 1 | Pale Ink | `rgba(196,185,168,0.30)` | 淡墨区块 |

## Elevation

- **None:** `none — shadows break the ethereal mood`

## Imagery

水墨画：远山、枯枝、孤舟、云气。必须有大量留白，墨色分层但不许鲜艳。允许书法题字。不使用照片、几何插画与饱和色彩。

## Layout

上限 1000px、容器内边距 32px，区块间距 192px。构图借鉴卷轴：内容偏一侧，另一侧大面积留白，标题常竖排或偏上。禁止居中的密集排版。

## Agent Prompt Guide

### Implementation Contract

- 以用户请求中的页面、用户任务和真实内容为依据，只实施指定范围；标明缺失的业务信息，不编造数据或能力。
- 先检查现有项目、技术栈与组件；沿用项目结构、路由和依赖，复用已有组件，不重建未要求的页面或功能。
- 沿用项目断点，调整窄屏与桌面的网格和留白；保留信息层级，避免意外横向溢出。
- 对本次涉及的交互，处理键盘焦点与减少动态效果；补齐适用的禁用、加载、空内容与错误状态。
- 完成后按项目现有脚本检查，仅报告实际运行的测试与视觉检查，并列出未验证项。

QUICK COLOR REFERENCE:

- text: `#2c2c2c`
- background: `#f8f5f0`
- accent: `#6b7b6e`
- ochre: `#a89279`
- pale: `#c4b9a8`
- border: `rgba(44,44,44,0.20)`

EXAMPLE COMPONENT PROMPTS:

1. 做一个水墨风卡片：宣纸色 #f8f5f0 填充、零圆角、1px rgba(44,44,44,0.15) 描边、内边距 40px、无阴影。标题 38px Noto Serif SC 400、色 #2c2c2c；正文 18px/300、行高 1.9。卡片下方放一条 1px rgba(44,44,44,0.2) 的墨线，左右各收进 15%。hover 时描边升到 rgba(44,44,44,0.35)、并向外渗开 2px，transition 600ms ease-out，元素不位移。页面底色 #f8f5f0，区块间距 192px 留白。
