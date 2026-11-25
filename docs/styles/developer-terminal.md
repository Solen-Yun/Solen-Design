# 终端风 — 风格参考

> 整个网站就是一次终端会话：命令、输出、注释、状态栏。

**Theme:** dark

终端风把界面完全按 shell 会话组织：荧光绿等宽文字压在近黑底上，内容永远是「命令 + 输出」的成对结构，注释行以 # 开头并用蓝灰，列表按 ls -la 对齐，表格带 ps aux 式表头，页面底部有 tmux 状态栏，输入位有闪烁光标块。它的禁令非常彻底——不允许任何无衬线或衬线字体、不允许浅底、不允许渐变与玻璃态、不允许摄影与插画、不允许超过四种强调色、不允许厚阴影。终端里只有字符。

## Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Phosphor Green | `#4af626` | `--color-phosphor` | 主文字与光标。整套风格唯一的识别色，像老 CRT 的磷光。 |
| Terminal Black | `#0a0e12` | `--color-terminal-black` | 页面底。极深的蓝黑，让绿色看起来在发光而不是在反光。 |
| Cyan | `#8be9fd` | `--color-cyan` | 第一强调：路径、链接与关键词。语法高亮里的字符串色。 |
| Magenta | `#ff79c6` | `--color-magenta` | 第二强调：函数名与命令。 |
| Amber | `#ffb86c` | `--color-amber` | 第三强调：警告与参数。终端里最多用到这一档。 |
| Comment Grey | `#6272a4` | `--color-comment-grey` | 注释、元数据与禁用状态。永远比正文暗一档。 |

## Typography

### JetBrains Mono — 全站唯一字体，无一例外。所有层级靠字号与颜色区分，不靠字族。

- **Substitute:** ui-monospace, 'SF Mono', Menlo, monospace
- **Weights:** 400, 700
- **Sizes:** 12, 13, 14, 16, 20, 28
- **Line height:** 1.2 (display), 1.3 (headings), 1.6 (body)
- **Letter spacing:** 0 on display, 0.08em on uppercase labels

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|---|---|---|---|---|---|---|
| heading | — | 700 | 28px | 1.25 | — | `--text-heading` |
| subheading | — | 700 | 20px | 1.3 | — | `--text-subheading` |
| body-lg | — | 400 | 16px | 1.55 | — | `--text-body-lg` |
| body | — | 400 | 14px | 1.6 | — | `--text-body` |
| body-sm | — | 400 | 13px | 1.55 | — | `--text-body-sm` |
| label | — | 400 | 12px | 1.4 | 0.08em | `--text-label` |

## Spacing & Layout

**Base unit:** 4px
**Density:** compact

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

### Border Radius

| Element | Value |
|---|---|
| cards | 2px |
| buttons | 2px |
| inputs | 2px |

- **Page max-width:** 1100px
- **Section gap:** 32px
- **Card padding:** 16px
- **Element gap:** 8px

## Components

### Command Block

**Role:** 命令与输出的成对结构（核心组件）

命令行以 $ 开头，$ 与命令之间 8px，命令用白色或荧光绿；输出行缩进 16px、颜色稍暗。命令与输出之间无空行，两组之间空 16px。整块用 13px 等宽、行高 1.6，无需边框与背景。

### Terminal Panel

**Role:** 面板与分区块

#0f141a 填充、2px 圆角、1px #1f2937 描边、内边距 16px，无阴影。面板顶部可放一行 12px 蓝灰的路径标头（如 ~/projects）。面板之间 16px。

### Cursor Block

**Role:** 闪烁光标

8px × 16px 的荧光绿实体块，跟在标题末尾或输入位的文字之后，每 1 秒以 steps(1) 硬切显示与隐藏（不做淡入淡出）。同一屏最多出现一个。

### Status Bar

**Role:** tmux 式状态栏

固定在视口底部、高 24px、荧光绿 15% 底、顶部 1px #1f2937 描边。左侧显示会话名与分支（12px 全大写 0.08em），右侧显示时间与 CPU 占位。整条不加圆角。

### Aligned List

**Role:** ls 式对齐列表与表格

列表用等宽对齐成三到四列（权限/大小/时间/名称），列间用 8px 稳定间隔，不靠 tab 而是靠固定列宽。表头用蓝灰全大写 12px，下方一条 1px #1f2937 分隔线。行高 24px。

## Do's and Don'ts

### Do

- 全站等宽字体，无例外
- 近黑底配荧光绿文字
- 内容是命令加输出的成对结构
- 注释以 # 开头并用蓝灰
- 列表按列宽对齐
- 光标用 steps(1) 硬切闪烁

### Don't

- 不要用无衬线或衬线字体
- 不要用白色或浅色背景
- 不要用渐变与玻璃态
- 不要用摄影与插画
- 不要超过四种强调色
- 不要用厚阴影

## Surfaces

| Level | Name | Value | Purpose |
|---|---|---|---|
| 0 | Terminal Black | `#0a0e12` | 页面底 |
| 1 | Panel | `#0f141a` | 面板与卡片 |

## Elevation

- **None:** `none — the terminal is flat`
- **Focus glow:** `0 0 0 1px #4af626`

## Imagery

没有图像。只有字符、ASCII 图形与块字符进度条。允许把进度条做成 ███░░ 式的字符画。不使用图标（会破坏纯字符假设），需要指示时用 → 与 » 这类字符。

## Layout

上限 1100px、容器内边距 16px，区块间距 32px。整页像一次滚动的会话记录：从 $ 命令开始，向下是输出、注释、下一组命令。行宽控制在 100 字符以内，保持终端阅读习惯。

## Agent Prompt Guide

### Implementation Contract

- 以用户请求中的页面、用户任务和真实内容为依据，只实施指定范围；标明缺失的业务信息，不编造数据或能力。
- 先检查现有项目、技术栈与组件；沿用项目结构、路由和依赖，复用已有组件，不重建未要求的页面或功能。
- 沿用项目断点，调整窄屏与桌面的网格和留白；保留信息层级，避免意外横向溢出。
- 对本次涉及的交互，处理键盘焦点与减少动态效果；补齐适用的禁用、加载、空内容与错误状态。
- 完成后按项目现有脚本检查，仅报告实际运行的测试与视觉检查，并列出未验证项。

QUICK COLOR REFERENCE:

- text: `#4af626`
- background: `#0a0e12`
- panel: `#0f141a`
- cyan: `#8be9fd`
- magenta: `#ff79c6`
- comment: `#6272a4`

EXAMPLE COMPONENT PROMPTS:

1. 做一个终端风面板：背景 #0f141a、2px 圆角、1px #1f2937 描边、内边距 16px、无阴影。顶部一行 12px #6272a4 的路径标头（如 ~/projects）。内容用 13px 等宽字体、行高 1.6：命令行以 $ 开头、色 #4af626，输出行缩进 16px、色 rgba(74,246,38,0.8)，注释行以 # 开头、色 #6272a4。页面底色 #0a0e12，底部固定一条 24px 高、荧光绿 15% 底的状态栏。
