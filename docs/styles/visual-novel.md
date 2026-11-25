# 视觉小说风 — 风格参考

> 半透明的对话框浮在场景上，一切为「读下去」让路。

**Theme:** dark

视觉小说风来自 ADV 游戏界面：场景是一张插画，对话框是压在下方的一块 85% 不透明的深色面板，角色名在面板左上角用渐变名牌标出，选项是纵向排列的分支按钮，hover 时有一道高光从左扫过。它的排版纪律很清楚——叙事文本用衬线、UI 标签用无衬线，正文行高拉到 1.8，因为玩家要连续读几百字。装饰要克制：只在面板角落放 L 形线，绝不用粗边框、RGB 分离与像素字体。

## Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Night Slate | `#1a202c` | `--color-night-slate` | 对话框与选项面板的底色，以 85% 不透明度压住场景。 |
| Mist White | `#f7fafc` | `--color-mist` | 信息卡与存档界面。以 70% 不透明度出现，保持通透。 |
| Narrative Indigo | `#6366f1` | `--color-indigo` | 角色名牌、选中项与关键按钮。对话里表示「这是重要的一句」。 |
| Heart Pink | `#ec4899` | `--color-heart-pink` | 好感度、情感选项与关键转折。 |
| Trust Green | `#10b981` | `--color-trust-green` | 已解锁、已存档与正向反馈。 |
| Magenta | `#d948bb` | `--color-magenta` | 隐藏路线与特殊事件，全屏最多一处。 |

## Typography

### Lora — 叙事与对话正文。衬线让长文本读起来像小说，行高 1.8 是硬指标。

- **Substitute:** Georgia, 'Songti SC', serif
- **Weights:** 400, 500
- **Sizes:** 16, 18, 20, 24, 32, 44
- **Line height:** 1.3 (display), 1.4 (headings), 1.8 (body)
- **Letter spacing:** 0 on display, 0.06em on uppercase labels

### Inter — UI 标签、按钮与数值。永远与衬线叙事文本分工明确。

- **Substitute:** system-ui, -apple-system, sans-serif
- **Weights:** 400, 500, 700
- **Sizes:** 12, 13, 15, 18
- **Line height:** 1.3 (display), 1.4 (headings), 1.6 (body)
- **Letter spacing:** 0 on display, 0.08em on uppercase labels

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|---|---|---|---|---|---|---|
| display | Lora | 500 | 44px | 1.3 | — | `--text-display` |
| heading | Lora | 500 | 32px | 1.35 | — | `--text-heading` |
| subheading | Lora | 400 | 24px | 1.4 | — | `--text-subheading` |
| body-lg | Lora | 400 | 20px | 1.8 | — | `--text-body-lg` |
| body | Lora | 400 | 16px | 1.8 | — | `--text-body` |
| label | Inter | 700 | 13px | 1.4 | 0.08em | `--text-label` |

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
| cards | 12px |
| buttons | 8px |
| nameplates | 6px |
| pills | 999px |

- **Page max-width:** 1120px
- **Section gap:** 64px
- **Card padding:** 32px
- **Element gap:** 16px

## Components

### Dialogue Panel

**Role:** 对话框（核心组件）

夜板岩 85% 填充、20px 模糊、12px 圆角、1px 叙事靛 20% 描边、内边距 32px（顶部 40px 留给名牌），阴影 0 8px 32px 黑 50%。叙事文字 16px 衬线、行高 1.8、白色。左上角用两条 1px 叙事靛 40% 的线做 L 形装饰（各 24px）。hover 时描边升到 40%、面板上浮 2px。

- **Sizes:** padding 32px; narration 16px
- **States:** hover: border 40%, lift 2px

### Nameplate

**Role:** 角色名牌

压在对话框左上角、向上偏移 16px，横向内边距 24px、纵向 6px，叙事靛到深靛的横向渐变填充，圆角只有上两角与右下角（模拟标签），白字 13px/700、字距 0.08em，阴影 0 4px 10px 靛蓝 30%。名牌宽度随名字自适应，不留空。

### Choice Button

**Role:** 分支选项按钮

夜板岩 60% 填充、8px 模糊、8px 圆角、1px 叙事靛 30% 描边，左对齐、18px 无衬线、padding 16px 32px，全宽。hover 时填充转靛 20%、描边到 60%、上浮 2px，同时一道白色 5% 的高光从左扫到右（700ms）。按下时整体右移 8px 并回落。

- **States:** hover: highlight sweep, lift 2px; active: shift right 8px

### Save Slot

**Role:** 存档与章节列表

雾白 70% 填充、12px 圆角、内边距 16px，左侧放 16:9 的截图缩略图，右侧 15px 章节名与 12px 时间戳。hover 时填充升到 85%、缩略图放大 1.03。空档位用虚线边框并显示「空」字样。

### Scene Stage

**Role:** 场景区域

占视口 85% 高度，背景是一张渐变插画（天空由上到下过渡），角色以底部对齐的半透明剪影出现（宽度 160px、120% 高度的圆顶形、不透明度 8%）。对话框叠在底部 24px 处，不遮挡中心视觉。

## Do's and Don'ts

### Do

- 叙事用衬线、UI 用无衬线
- 对话框 85% 不透明加深模糊
- 正文行高 1.8
- 名牌只圆三角，做成标签形
- 选项 hover 用高光扫过
- 装饰只用角落的 L 形线

### Don't

- 不要用 4px 以上的粗边框
- 不要用 RGB 分离的重影
- 不要用像素风或等宽字体做正文
- 不要用纯黑背景
- 不要用全大写宽字距的终端风文本
- 不要让对话框遮住场景中心

## Surfaces

| Level | Name | Value | Purpose |
|---|---|---|---|
| 0 | Scene | `scene illustration` | 背景插画 |
| 1 | Dialogue Panel | `rgba(26,32,44,0.85)` | 对话框 |
| 2 | Info Card | `rgba(247,250,252,0.70)` | 信息卡与存档 |

## Elevation

- **Dialogue:** `0 8px 32px rgba(0,0,0,0.50)`
- **Nameplate:** `0 4px 10px rgba(99,102,241,0.30)`
- **Card:** `0 6px 20px rgba(0,0,0,0.30)`

## Imagery

场景插画是主体：天空渐变、室内、夜景，配半透明角色剪影。允许 CG 立绘与表情差分。不使用写实摄影、UI 截图与扁平几何。

## Layout

上限 1120px，场景占 85vh，对话框固定在底部 24px、最大宽度 960px、居中。选项纵向排列、宽度与对话框一致、间距 8px。信息卡与存档界面用两列网格。

## Agent Prompt Guide

### Implementation Contract

- 以用户请求中的页面、用户任务和真实内容为依据，只实施指定范围；标明缺失的业务信息，不编造数据或能力。
- 先检查现有项目、技术栈与组件；沿用项目结构、路由和依赖，复用已有组件，不重建未要求的页面或功能。
- 沿用项目断点，调整窄屏与桌面的网格和留白；保留信息层级，避免意外横向溢出。
- 对本次涉及的交互，处理键盘焦点与减少动态效果；补齐适用的禁用、加载、空内容与错误状态。
- 完成后按项目现有脚本检查，仅报告实际运行的测试与视觉检查，并列出未验证项。

QUICK COLOR REFERENCE:

- text: `#f7fafc`
- panel: `rgba(26,32,44,0.85)`
- accent: `#6366f1`
- heart: `#ec4899`
- trust: `#10b981`
- border: `rgba(99,102,241,0.20)`

EXAMPLE COMPONENT PROMPTS:

1. 做一个视觉小说对话框：背景 rgba(26,32,44,0.85)、backdrop-blur 20px、12px 圆角、1px rgba(99,102,241,0.2) 描边、内边距 32px、阴影 0 8px 32px rgba(0,0,0,0.5)。叙事文字 16px 衬线、行高 1.8、白色。左上角放一个渐变名牌（linear-gradient(to right, #6366f1, #4f46e5)、白字 13px/700、只圆上两角与右下角）。下方竖排三个选项按钮，各占全宽、8px 圆角、hover 时一道白色 5% 的高光从左扫过。
