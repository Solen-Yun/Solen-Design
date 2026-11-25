# 生成艺术 — 风格参考

> 一切由函数画出来：噪声、参数与缓动生成一个不重复的界面。

**Theme:** dark

生成艺术用算法而非手绘来构图：近黑底（#0a0a0a）上，SVG 或 canvas 用数学函数绘出圆、线与曲网格，色板由 HSL 旋转从基准紫（#7c3aed）派生，文字一律等宽，动效由数学缓动函数（而非固定 cubic-bezier）驱动，卡片是暗色玻璃（neutral-900 80% 加模糊），交互元素带 0 0 20px 的紫光。它的核心原则是「参数可复现」——同一个种子必须画出同一张图，随机不等于不可控。

## Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Near Black | `#0a0a0a` | `--color-near-black` | 页面底。让算法绘出的线条与光晕成为唯一光源。 |
| Base Violet | `#7c3aed` | `--color-base-violet` | 色板的基准色，HSL 旋转由它派生整族颜色。 |
| Algorithm Blue | `#3b82f6` | `--color-algorithm-blue` | 旋转 +30 度的派生色，用于数据与线条。 |
| Algorithm Teal | `#14b8a6` | `--color-algorithm-teal` | 旋转 +90 度的派生色，用于第二序列。 |
| Algorithm Rose | `#f43f5e` | `--color-algorithm-rose` | 旋转 -60 度的派生色，用于异常与对比。 |
| Algorithm Amber | `#f59e0b` | `--color-algorithm-amber` | 旋转 -120 度的派生色，用于高亮。 |

## Typography

### JetBrains Mono — 全站等宽。参数、坐标与数值必须等宽，因为它们是这套界面的内容。

- **Substitute:** ui-monospace, 'Courier New', monospace
- **Weights:** 400, 700
- **Sizes:** 11, 13, 16, 22, 32, 44
- **Line height:** 1.15 (display), 1.25 (headings), 1.6 (body)
- **Letter spacing:** 0.02em on display, 0.14em on uppercase labels

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|---|---|---|---|---|---|---|
| display | — | 700 | 44px | 1.15 | 0.02em | `--text-display` |
| heading | — | 700 | 32px | 1.2 | 0.02em | `--text-heading` |
| subheading | — | 700 | 22px | 1.3 | — | `--text-subheading` |
| body-lg | — | 400 | 16px | 1.55 | — | `--text-body-lg` |
| body | — | 400 | 13px | 1.6 | — | `--text-body` |
| label | — | 400 | 11px | 1.45 | 0.14em | `--text-label` |

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
| cards | 12px |
| buttons | 8px |
| inputs | 8px |
| dots | 999px |

- **Page max-width:** 1280px
- **Section gap:** 96px
- **Card padding:** 24px
- **Element gap:** 16px

## Components

### Plotted Field

**Role:** 算法绘图区（核心组件）

一个 canvas 或 SVG，用数学函数绘制：圆族（半径按 sin 序列）、曲网格（参数方程）、或噪声场（simplex noise 转等高线）。线宽 1px、颜色从 HSL 派生（每次递增 30 度）、不透明度按层递减。所有参数由种子生成，同种子必须重现同一图。

### Glass Card

**Role:** 玻璃面板

neutral-900 80% 填充、12px 圆角、1px 白 10% 描边、内边距 24px、20px 背景模糊，外发光 0 0 20px 紫 40%。标题 22px/700 紫白，正文 13px 白 75%。hover 时发光扩到 36px 并让绘图区重新生成一次（新种子）。

### Parameter Input

**Role:** 参数输入

近黑填充、8px 圆角、1px 白 15% 描边、padding 10px 14px、13px 等宽。左侧放 11px 全大写的参数名（如 SEED / FREQ），右侧可放一个 4px 宽的紫滑块。聚焦时描边转紫并加 0 0 0 2px 紫 25% 环。

### Easing Preview

**Role:** 缓动可视化

一条小的曲线图（120×80px），画出当前缓动函数的形状（如 cubic-bezier 或指数衰减），线宽 2px 紫色，网格 1px 白 8%。旁边用等宽小字显示函数名与参数。动效由该曲线实际驱动，预览即真实。

### Glow Node

**Role:** 发光节点

8px 实心圆（紫或派生色）带 0 0 20px 同色 60% 光晕，放在标签左端或绘图区的数据点上。hover 时光晕扩到 36px 并弹出 11px 的等宽数值提示。

## Do's and Don'ts

### Do

- 一切由函数与种子生成
- 同种子必须复现同图
- 色板由 HSL 旋转从基准紫派生
- 全站等宽字体
- 动效由数学缓动函数驱动
- 卡片是暗色玻璃加紫光

### Don't

- 不要用不可复现的纯随机
- 不要用非等宽字体作正文
- 不要用亮底
- 不要用固定 cubic-bezier 敷衍缓动
- 不要让绘图区压过文字
- 不要用柔和阴影

## Surfaces

| Level | Name | Value | Purpose |
|---|---|---|---|
| 0 | Near Black | `#0a0a0a` | 页面底 |
| 1 | Dark Glass | `rgba(23,23,23,0.80)` | 卡片 |
| 2 | Plotted Field | `canvas / SVG` | 算法绘图区 |

## Elevation

- **Violet glow:** `0 0 20px rgba(124,58,237,0.40)`
- **Violet glow strong:** `0 0 36px rgba(124,58,237,0.60)`

## Imagery

图像即算法输出：噪声场、参数曲线、点阵、网格、粒子轨迹。允许把照片按像素采样后重绘为几何图元。不使用摄影原图、柔和插画与手工装饰。

## Layout

上限 1280px、容器内边距 24px，区块间距 96px。允许绘图区溢出容器。参数栏可固定在侧边。整页保持黑底，所有亮色都来自绘制物与光晕。

## Agent Prompt Guide

### Implementation Contract

- 以用户请求中的页面、用户任务和真实内容为依据，只实施指定范围；标明缺失的业务信息，不编造数据或能力。
- 先检查现有项目、技术栈与组件；沿用项目结构、路由和依赖，复用已有组件，不重建未要求的页面或功能。
- 沿用项目断点，调整窄屏与桌面的网格和留白；保留信息层级，避免意外横向溢出。
- 对本次涉及的交互，处理键盘焦点与减少动态效果；补齐适用的禁用、加载、空内容与错误状态。
- 完成后按项目现有脚本检查，仅报告实际运行的测试与视觉检查，并列出未验证项。

QUICK COLOR REFERENCE:

- text: `#e5e5e5`
- background: `#0a0a0a`
- violet: `#7c3aed`
- blue: `#3b82f6`
- teal: `#14b8a6`
- rose: `#f43f5e`

EXAMPLE COMPONENT PROMPTS:

1. 做一个生成艺术面板：近黑 #0a0a0a 底，一个 canvas 用参数方程绘制曲网格（线宽 1px、颜色从 #7c3aed 起按 HSL 每次 +30 度派生、不透明度逐层递减），所有参数由固定种子生成。上层放一块玻璃卡 rgba(23,23,23,0.8) 填充、12px 圆角、1px rgba(255,255,255,0.1) 描边、20px 背景模糊、内边距 24px、box-shadow 0 0 20px rgba(124,58,237,0.4)。文字全部等宽，标题 22px/700、正文 13px。参数输入用 11px 全大写标签，聚焦时描边转 #7c3aed 加 2px 环。
