# 暖色仪表盘 — 风格参考

> 陶土色底配奶油白卡片：数据界面也可以有体温。

**Theme:** light

暖色仪表盘要解决一个矛盾：仪表盘通常冷、硬、蓝，但团队每天要盯八小时。解法是把底色换成陶土（#d4a088），卡片用奶油白，阴影是柔和漫射的而不是硬边，圆角放大到 24px。数据本身用青绿（#4a9d9a）与金黄（#e8b86d）两条序列，避免蓝红这种「系统告警」配色。层次靠卡片提亮与漫射阴影，绝不靠边框加粗——这套风格禁止 2px 以上的边框。

## Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Terracotta | `#d4a088` | `--color-terracotta` | 页面底色。整套风格的体温来源，比任何强调色都重要。 |
| Cream | `#faf8f5` | `--color-cream` | 卡片与面板。比陶土亮很多，靠明度差把内容托起来。 |
| Teal | `#4a9d9a` | `--color-teal` | 主行动与图表第一序列。是暖底上唯一冷静的锚。 |
| Gold | `#e8b86d` | `--color-gold` | 图表第二序列与高亮。与陶土同色系，比它更亮。 |
| Brick | `#c17767` | `--color-brick` | 负向指标与提醒。比纯红温和，仍能传达下降。 |
| Slate Teal | `#6b8e8e` | `--color-slate-teal` | 次要数据与说明，用于不需要被主动读的序列。 |

## Typography

### Inter — 全站唯一字体。数字用 tabular-nums，标题 600、正文 400。

- **Substitute:** system-ui, -apple-system, 'Segoe UI', sans-serif
- **Weights:** 400, 500, 600, 700
- **Sizes:** 12, 13, 15, 18, 24, 32
- **Line height:** 1.2 (display), 1.3 (headings), 1.55 (body)
- **Letter spacing:** -0.01em on display, 0.04em on uppercase labels

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|---|---|---|---|---|---|---|
| display | — | 700 | 32px | 1.2 | -0.01em | `--text-display` |
| heading | — | 600 | 24px | 1.3 | — | `--text-heading` |
| subheading | — | 600 | 18px | 1.35 | — | `--text-subheading` |
| body-lg | — | 500 | 15px | 1.5 | — | `--text-body-lg` |
| body | — | 400 | 13px | 1.55 | — | `--text-body` |
| label | — | 500 | 12px | 1.4 | 0.04em | `--text-label` |

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

### Border Radius

| Element | Value |
|---|---|
| cards | 24px |
| buttons | 12px |
| inputs | 12px |
| dots | 999px |

- **Page max-width:** 1440px
- **Section gap:** 32px
- **Card padding:** 32px
- **Element gap:** 24px

## Components

### Warm Button

**Role:** 主行动按钮

青绿填充、白字、12px 圆角、无描边，15px/500、padding 12px 24px，阴影 0 4px 12px 青绿 20%。hover 时填充加深到 #3d8380、阴影扩到 20px、上浮 2px；按下缩放 0.98 并收阴影。过渡 200ms ease-out。

- **Sizes:** padding 12px 24px; label 15px
- **States:** hover: darker fill, lift 2px; active: scale 0.98

### Cream Card

**Role:** 指标卡与图表容器

奶油白填充、24px 圆角、无描边、内边距 32px，阴影 0 8px 24px 黑 4%。hover 时阴影扩到 40px、上浮 4px、出现 1px 极浅描边。数值 32px/700 用等宽数字，变化率右侧带一个 12px 的青绿圆点（正向）或砖红圆点（负向）。

### Warm Input

**Role:** 筛选与搜索

白 80% 填充、12px 圆角、1px 陶土 25% 描边、padding 10px 16px、13px 字。聚焦时描边转青绿并加 3px 青绿 20% 外环，不改变尺寸。

### Glass Sidebar

**Role:** 侧边导航

白 80% 填充、12px 模糊、右侧 1px 陶土 20% 描边、宽 240px。项目高 40px、12px 圆角、13px 字；选中项用青绿 12% 底配青绿文字，hover 用白 60% 底。

### Series Palette

**Role:** 图表配色规则

第一序列青绿 #4a9d9a、第二金黄 #e8b86d、第三砖红 #c17767、第四灰青 #6b8e8e。只允许这四色，且必须按此顺序使用。网格线用陶土 15%，坐标轴文字用灰青。禁止蓝紫红三原色组合。

## Do's and Don'ts

### Do

- 陶土底、奶油白卡
- 阴影柔和漫射，不用硬边
- 圆角 12 到 24px
- 图表只用四色序列且按序使用
- 数值用等宽数字并对齐
- 边框不超过 1px

### Don't

- 不要用冷色背景（蓝、紫）
- 不要用纯黑文字
- 不要用硬边阴影
- 不要用高饱和霓虹色
- 不要用 2px 及以上的边框
- 不要在图表里用蓝紫红三原色

## Surfaces

| Level | Name | Value | Purpose |
|---|---|---|---|
| 0 | Terracotta | `#d4a088` | 页面底 |
| 1 | Cream | `#faf8f5` | 卡片与面板 |
| 2 | Glass White | `rgba(255,255,255,0.80)` | 侧栏与浮层 |

## Elevation

- **Card:** `0 8px 24px rgba(0,0,0,0.04)`
- **Card hover:** `0 16px 40px rgba(0,0,0,0.08)`
- **Button:** `0 4px 12px rgba(74,157,154,0.20)`

## Imagery

以图表与图标为主，几乎不用照片。允许头像与产品缩略图。图表本身是主要视觉，配色必须取自四色序列。

## Layout

上限 1440px、容器内边距 24px，卡片间距 24px，区块间距 32px。左侧 240px 玻璃侧栏加右侧内容区，顶部一排指标卡（每张最小 240px 宽），下方图表两栏。整体留白比数据密集宽一档。

## Agent Prompt Guide

### Implementation Contract

- 以用户请求中的页面、用户任务和真实内容为依据，只实施指定范围；标明缺失的业务信息，不编造数据或能力。
- 先检查现有项目、技术栈与组件；沿用项目结构、路由和依赖，复用已有组件，不重建未要求的页面或功能。
- 沿用项目断点，调整窄屏与桌面的网格和留白；保留信息层级，避免意外横向溢出。
- 对本次涉及的交互，处理键盘焦点与减少动态效果；补齐适用的禁用、加载、空内容与错误状态。
- 完成后按项目现有脚本检查，仅报告实际运行的测试与视觉检查，并列出未验证项。

QUICK COLOR REFERENCE:

- text: `#3a3330`
- background: `#d4a088`
- card: `#faf8f5`
- primary: `#4a9d9a`
- secondary: `#e8b86d`
- muted: `#6b8e8e`

EXAMPLE COMPONENT PROMPTS:

1. 做一个暖色仪表盘指标卡：奶油白 #faf8f5 填充、24px 圆角、无边框、内边距 32px、阴影 0 8px 24px rgba(0,0,0,0.04)。顶部 12px #6b8e8e 标签，下面 32px/700 数值（tabular-nums），右侧 12px 的青绿圆点表示正向。hover 时阴影扩到 0 16px 40px rgba(0,0,0,0.08)、translateY(-4px)。页面底色 #d4a088。
