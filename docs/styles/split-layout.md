# 分屏布局 — 风格参考

> 两块内容各占一半，靠对比产生张力，靠平衡避免刺眼。

**Theme:** light

分屏布局用一条中缝把视口切成两半，两侧放互相映照的内容：图与文、旧与新、问题与答案。它的规则全是平衡问题——两侧内容绝不能完全相同（那是无意义分屏），视觉重量不能严重失衡（一边满页面一边空白），阅读顺序不能被中缝切断，分割线不能突兀到抢戏。移动端必须放弃分屏转为上下堆叠，否则每侧只有 180px 宽。允许非对称分屏（如 40:60）来表达主次。

## Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Ink | `#0f0f0f` | `--color-ink` | 深色一侧的底与文字。用于制造两侧的最大对比。 |
| White | `#ffffff` | `--color-white` | 浅色一侧的底。与墨成对，构成整页的基本张力。 |
| Red | `#ff4757` | `--color-red` | 「之后」「新」这一侧的强调，与蓝形成对立。 |
| Green | `#2ed573` | `--color-green` | 正向结果与成功对比项。 |
| Blue | `#1e90ff` | `--color-blue` | 「之前」「旧」这一侧的强调，与红形成对立。 |
| Amber | `#ffa502` | `--color-amber` | 需要注意的差异项与高亮。 |

## Typography

### Inter — 全站唯一字体。两侧标题必须同级同字号，否则视觉重量会失衡。

- **Substitute:** system-ui, -apple-system, 'Segoe UI', sans-serif
- **Weights:** 400, 500, 700
- **Sizes:** 12, 14, 16, 22, 32, 44
- **Line height:** 1.1 (display), 1.2 (headings), 1.55 (body)
- **Letter spacing:** -0.02em on display, 0.08em on uppercase labels

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|---|---|---|---|---|---|---|
| display | — | 700 | 44px | 1.1 | -0.02em | `--text-display` |
| heading | — | 700 | 32px | 1.2 | — | `--text-heading` |
| subheading | — | 500 | 22px | 1.3 | — | `--text-subheading` |
| body-lg | — | 400 | 16px | 1.55 | — | `--text-body-lg` |
| body | — | 400 | 14px | 1.55 | — | `--text-body` |
| label | — | 500 | 12px | 1.4 | 0.08em | `--text-label` |

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
| buttons | 8px |
| inputs | 8px |

- **Page max-width:** 1440px
- **Section gap:** 0px
- **Card padding:** 48px
- **Element gap:** 24px

## Components

### Split Panel

**Role:** 分屏容器

grid-template-columns 取 1fr 1fr（对称）或 0.8fr 1.2fr（非对称），最小高度 100vh（首屏）或 600px（内容区）。每侧内边距 48px、内容垂直居中、单列、行宽不超过 34em。中缝用 1px 深色 10% 的线或干脆留 48px 空白。

- **Sizes:** 100vh hero; 600px content

### Contrast Pair

**Role:** 两侧的成对内容

两侧必须构成对照而不是重复：一图一文、一暗一亮、一问题一答案。标签（如「之前」「之后」）用 12px 全大写 0.08em，分别取蓝与红。两侧标题字号必须相同。

### Split CTA

**Role:** 每侧的独立行动

8px 圆角、16px/500、padding 12px 24px。深色侧用白底墨字，浅色侧用墨底白字——按钮必须与所在侧反色，否则会失去分离感。hover 时只改亮度，不做位移。

### Seam Divider

**Role:** 中缝分隔

优先用留白（48px 间隙）而不是线。需要线时用 1px 深色 10%，不贯穿全高（上下各留 15%），避免把版面切成两块互不相关的图。

### Compare Row

**Role:** 对比行（移动端保留的对照结构）

移动端放弃左右分屏，改为上下堆叠，但对照关系必须保留：每项上方用 12px 标签标明「之前」「之后」，并保持颜色对应（蓝对红）。堆叠顺序与阅读顺序一致。

## Do's and Don'ts

### Do

- 两侧内容必须构成对照
- 两侧标题同字号
- 允许 40:60 非对称分屏
- 中缝优先用留白
- 按钮与所在侧反色
- 移动端转单列堆叠并保留标签

### Don't

- 不要让两侧内容完全相同
- 不要在移动端保持分屏
- 不要让视觉重量严重失衡
- 不要切断阅读顺序
- 不要让分割线突兀
- 不要在 hover 时位移按钮

## Surfaces

| Level | Name | Value | Purpose |
|---|---|---|---|
| 0 | Ink Half | `#0f0f0f` | 深色一侧 |
| 1 | White Half | `#ffffff` | 浅色一侧 |
| 2 | Image Half | `full-bleed photo` | 图像一侧 |

## Elevation

- **Panel:** `0 12px 32px rgba(15,15,15,0.10)`
- **Button:** `0 4px 12px rgba(15,15,15,0.15)`

## Imagery

一张对比性强的照片或截图占一侧，另一侧是文字或纯色块。图像比例固定（1:1 或 4:5），允许裁切但不允许拉伸。不使用两侧都放图像的对称布局，除非两张图构成明确对照。

## Layout

上限 1440px，首屏 100vh 分两半。内容区可用 40:60 的非对称比例表达主次。中缝对齐整页网格。移动端（小于 768px）转为单列堆叠，每侧内边距降到 24px。

## Agent Prompt Guide

### Implementation Contract

- 以用户请求中的页面、用户任务和真实内容为依据，只实施指定范围；标明缺失的业务信息，不编造数据或能力。
- 先检查现有项目、技术栈与组件；沿用项目结构、路由和依赖，复用已有组件，不重建未要求的页面或功能。
- 沿用项目断点，调整窄屏与桌面的网格和留白；保留信息层级，避免意外横向溢出。
- 对本次涉及的交互，处理键盘焦点与减少动态效果；补齐适用的禁用、加载、空内容与错误状态。
- 完成后按项目现有脚本检查，仅报告实际运行的测试与视觉检查，并列出未验证项。

QUICK COLOR REFERENCE:

- text: `#0f0f0f`
- dark: `#0f0f0f`
- light: `#ffffff`
- before: `#1e90ff`
- after: `#ff4757`
- muted: `#6b7280`

EXAMPLE COMPONENT PROMPTS:

1. 做一个分屏首屏：外层 grid grid-cols-2、min-height 100vh。左半深色 #0f0f0f，内含 12px 全大写 0.08em 的 #1e90ff 标签（BEFORE）、44px/700 白色标题与一段 16px 说明，底部一个白底墨字按钮。右半白色，标签用 #ff4757（AFTER），标题同字号但墨色，按钮墨底白字。两侧各内边距 48px、内容垂直居中。移动端改为单列堆叠，顺序与阅读一致。

## Quick Start

```css

:root {
  /* Colors */
  --color-ink: #0f0f0f;
  --color-white: #ffffff;
  --color-red: #ff4757;
  --color-green: #2ed573;
  --color-blue: #1e90ff;
  --color-amber: #ffa502;

  /* Typography — Font Families */
  --font-sans: 'Inter', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;

  /* Typography — Scale */
  --text-display: 44px;
  --leading-display: 1.1;
  --tracking-display: -0.02em;
  --text-heading: 32px;
  --leading-heading: 1.2;
  --text-subheading: 22px;
  --leading-subheading: 1.3;
  --text-body-lg: 16px;
  --leading-body-lg: 1.55;
  --text-body: 14px;
  --leading-body: 1.55;
  --text-label: 12px;
  --leading-label: 1.4;
  --tracking-label: 0.08em;

  /* Typography — Weights */
  --font-weight-regular: 400;
  --font-weight-medium: 500;
  --font-weight-bold: 700;

  /* Spacing */
  --spacing-unit: 8px;
  --spacing-8: 8px;
  --spacing-16: 16px;
  --spacing-24: 24px;
  --spacing-32: 32px;
  --spacing-48: 48px;
  --spacing-64: 64px;
  --spacing-96: 96px;

  /* Layout */
  --page-max-width: 1440px;
  --section-gap: 0px;
  --card-padding: 48px;
  --element-gap: 24px;
  --density: comfortable;

  /* Border Radius */
  --radius-cards: 16px;
  --radius-buttons: 8px;
  --radius-inputs: 8px;

  /* Surfaces */
  --surface-ink-half: #0f0f0f;
  --surface-white-half: #ffffff;
  --surface-image-half: full-bleed photo;
}

```
