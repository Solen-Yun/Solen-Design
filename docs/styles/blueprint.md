# 工程蓝图 — 风格参考

> 蓝底白线：网格、坐标、标注、尺寸线，一张还没施工的图。

**Theme:** dark

工程蓝图模仿技术制图：蓝图蓝底（#1e3a5f）上铺 1px 的白色或浅蓝网格，所有线条与文字都是白色或浅蓝，标注和尺寸线用橙色高亮，字体必须是等宽以维持制图感。元素的边框都是 1px 半透明白，辅助线用虚线，卡片是半透明的同色蓝加轻微模糊（像描图纸叠在图上）。它禁止暖色背景、禁止圆润柔和元素、禁止渐变填充——线条与色块必须纯色。

## Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Blueprint Blue | `#1e3a5f` | `--color-blueprint-blue` | 页面底。制图纸的蓝，所有白线与网格铺在它上面。 |
| White | `#ffffff` | `--color-white` | 主线条与主要文字。制图的白线。 |
| Pale Blue | `#a0c4e8` | `--color-pale-blue` | 次级线条、网格与辅助文字，比白色弱一档。 |
| Mid Blue | `#4a90d9` | `--color-mid-blue` | 链接与选中态，是画面里最饱和的蓝。 |
| Callout Orange | `#ff6b35` | `--color-callout-orange` | 唯一暖色，只用于标注、尺寸线与需要被指出的问题。 |
| Revision Violet | `#b071e4` | `--color-revision-violet` | 修订标记与版本注记，出现频率最低。 |

## Typography

### JetBrains Mono — 全站唯一等宽字体。制图里的每个字都是标注，字距必须放开。

- **Substitute:** ui-monospace, 'Courier New', monospace
- **Weights:** 400, 700
- **Sizes:** 10, 11, 13, 16, 22, 32
- **Line height:** 1.2 (display), 1.3 (headings), 1.65 (body)
- **Letter spacing:** 0.08em on display, 0.16em on uppercase labels

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|---|---|---|---|---|---|---|
| heading | — | 700 | 32px | 1.2 | 0.08em | `--text-heading` |
| subheading | — | 700 | 22px | 1.3 | 0.08em | `--text-subheading` |
| body-lg | — | 400 | 16px | 1.6 | — | `--text-body-lg` |
| body | — | 400 | 13px | 1.65 | — | `--text-body` |
| body-sm | — | 400 | 11px | 1.6 | — | `--text-body-sm` |
| label | — | 700 | 10px | 1.4 | 0.16em | `--text-label` |

## Spacing & Layout

**Base unit:** 4px
**Density:** comfortable

### Spacing Scale

| Name | Value | Token |
|---|---|---|
| 4 | 4px | `--spacing-4` |
| 8 | 8px | `--spacing-8` |
| 12 | 12px | `--spacing-12` |
| 16 | 16px | `--spacing-16` |
| 24 | 24px | `--spacing-24` |
| 32 | 32px | `--spacing-32` |
| 48 | 48px | `--spacing-48` |
| 64 | 64px | `--spacing-64` |

### Border Radius

| Element | Value |
|---|---|
| cards | 0 |
| buttons | 0 |
| inputs | 0 |

- **Page max-width:** 1280px
- **Section gap:** 48px
- **Card padding:** 20px
- **Element gap:** 12px

## Components

### Grid Bed

**Role:** 网格底（核心结构）

两层 repeating-linear-gradient 叠出 8px 小格与 80px 大格的白色网格：小格 1px 白 5%，大格 1px 白 10%。全页固定覆盖，pointer-events: none。它让整页读起来像一张图纸。

### Drafting Card

**Role:** 内容卡与图块

蓝图蓝 60% 填充、12px 模糊、零圆角、1px 白 30% 描边、内边距 20px。左上角放 12px 等宽全大写的图块编号（如 FIG. 01），右上角放尺寸标记。hover 时描边升到 60%。

### Dimension Line

**Role:** 尺寸线与标注

一条 1px 白 50% 的直线，两端各一个 4px 的短垂线作为端点标记，中间放 10px 等宽标注文字（如 2400）。关键标注用橙色 #ff6b35。用于说明间距与尺寸。

### Draft Button

**Role:** 行动按钮

透明底、1px 白 40% 描边、零圆角、11px 等宽全大写 0.16em、padding 10px 20px。hover 时填充白 12%、描边转白、文字保持白；按下时填充升到 20%。过渡 120ms linear。

- **Sizes:** padding 10px 20px; label 11px
- **States:** hover: fill 12%, border white; active: fill 20%

### Auxiliary Rule

**Role:** 辅助虚线

1px 虚线（dash 4px、gap 4px），颜色白 25% 或浅蓝 40%，用于引出标注、连接图块与说明。它绝不用于装饰，只用于表示「这条线与那个对象有关」。

## Do's and Don'ts

### Do

- 蓝底白线，铺 8px 与 80px 双层网格
- 全站等宽字体
- 标注用橙色高亮
- 辅助线用虚线
- 零圆角、纯色填充
- 图块带编号与尺寸标记

### Don't

- 不要用暖色背景
- 不要用圆润柔和元素
- 不要用渐变填充
- 不要用彩色摄影
- 不要用衬线或无衬线字体
- 不要让辅助线变成装饰

## Surfaces

| Level | Name | Value | Purpose |
|---|---|---|---|
| 0 | Blueprint Blue | `#1e3a5f` | 页面底（带网格） |
| 1 | Tracing Paper | `rgba(30,58,95,0.60)` | 卡片（半透明） |

## Elevation

- **None:** `none — the drawing is flat`
- **Card focus:** `0 0 0 1px rgba(255,255,255,0.30)`

## Imagery

技术插图：剖面图、平面图、爆炸图、流程图与结构示意，全部白线绘制。允许把照片处理成蓝底白线的线稿。不使用彩色摄影、柔和插画与装饰图形。

## Layout

上限 1280px、容器内边距 16px，图块间距 12px，形成图纸式的密集排布。允许图块以 1px 白线拼接成大图。所有尺寸取 4 的倍数，与网格对齐。

## Agent Prompt Guide

### Implementation Contract

- 以用户请求中的页面、用户任务和真实内容为依据，只实施指定范围；标明缺失的业务信息，不编造数据或能力。
- 先检查现有项目、技术栈与组件；沿用项目结构、路由和依赖，复用已有组件，不重建未要求的页面或功能。
- 沿用项目断点，调整窄屏与桌面的网格和留白；保留信息层级，避免意外横向溢出。
- 对本次涉及的交互，处理键盘焦点与减少动态效果；补齐适用的禁用、加载、空内容与错误状态。
- 完成后按项目现有脚本检查，仅报告实际运行的测试与视觉检查，并列出未验证项。

QUICK COLOR REFERENCE:

- text: `#ffffff`
- background: `#1e3a5f`
- pale: `#a0c4e8`
- accent: `#4a90d9`
- callout: `#ff6b35`
- card: `rgba(30,58,95,0.60)`

EXAMPLE COMPONENT PROMPTS:

1. 做一个工程蓝图卡片：背景 rgba(30,58,95,0.6)、backdrop-blur 12px、零圆角、1px rgba(255,255,255,0.3) 描边、内边距 20px。左上角 12px 等宽全大写图块编号（FIG. 01），右上角尺寸标记。页面底 #1e3a5f 上铺双层网格：8px 小格用 1px 白 5%、80px 大格用 1px 白 10%。关键标注用橙色 #ff6b35，辅助线用 1px 虚线（dash 4px、gap 4px、白 25%）。全站等宽字体。
