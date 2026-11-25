# 韩式极简 — 风格参考

> 暖白、粉彩、大圆角：克制但不冷，像一间光线很好的房间。

**Theme:** light

韩式极简来自 K-beauty 与韩国建筑的双重影响：留白要大（内边距 32 到 64px），底色是暖白而不是纯白，主文字用石板蓝而不是黑，强调色全部是低饱和的粉彩（藕粉、鼠尾草绿、米沙）。圆角偏大（24px），边框极细（10% 透明度），阴影几乎不可见。它有两条很容易被忽略的禁令——不许全大写、不许宽字距，因为这两者在这套语言里被视为强势。

## Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Slate Blue | `#3d4a5c` | `--color-slate-blue` | 主文字与标题。比黑柔，长时间阅读不压迫。 |
| Warm White | `#faf9f7` | `--color-warm-white` | 页面画布。带一点米调的暖白，是整套风格的地基。 |
| Blush | `#d4a5a5` | `--color-blush` | 第一强调，用于标签、情感语义与细节描边。 |
| Sage | `#a8c5b8` | `--color-sage` | 第二强调与成功状态，常以 10% 底出现。 |
| Sand | `#e8d4b8` | `--color-sand` | 暖色区块与图片衬底，用于制造温度差。 |
| Olive | `#b9b08a` | `--color-olive` | 最暗的一支粉彩，用于边框与次级标记。 |

## Typography

### Pretendard — 全站唯一字体，只用 300 到 500。永不全大写、永不宽字距，行高 1.75 保证呼吸。

- **Substitute:** 'Apple SD Gothic Neo', 'PingFang SC', system-ui, sans-serif
- **Weights:** 300, 400, 500
- **Sizes:** 12, 14, 16, 20, 26, 34
- **Line height:** 1.3 (display), 1.4 (headings), 1.75 (body)
- **Letter spacing:** 0 on display, 0.02em on uppercase labels

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|---|---|---|---|---|---|---|
| display | — | 300 | 34px | 1.3 | — | `--text-display` |
| heading | — | 400 | 26px | 1.4 | — | `--text-heading` |
| subheading | — | 500 | 20px | 1.45 | — | `--text-subheading` |
| body-lg | — | 400 | 16px | 1.75 | — | `--text-body-lg` |
| body | — | 400 | 14px | 1.75 | — | `--text-body` |
| label | — | 500 | 12px | 1.5 | 0.02em | `--text-label` |

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
| 128 | 128px | `--spacing-128` |

### Border Radius

| Element | Value |
|---|---|
| cards | 24px |
| buttons | 16px |
| inputs | 16px |
| images | 20px |
| pills | 999px |

- **Page max-width:** 1040px
- **Section gap:** 128px
- **Card padding:** 32px
- **Element gap:** 24px

## Components

### Soft Button

**Role:** 主行动按钮

石板蓝填充、暖白文字、16px 圆角、无描边、无阴影，15px/400、padding 14px 32px。hover 时填充提亮 6%；按下时填充压暗一档并轻微缩到 0.99。过渡 400ms ease-out，慢但不拖。

- **Sizes:** padding 14px 32px; label 15px
- **States:** hover: brighter fill; active: darker, scale 0.99

### Breathing Card

**Role:** 内容卡与作品卡

白底、24px 圆角、1px 石板蓝 10% 描边、内边距 32px，阴影 0 2px 8px 石板蓝 4%。标题 26px/400，正文 14px/400 行高 1.75，色为石板蓝 70%。hover 时阴影扩到 20px、上浮 2px。

### Gentle Input

**Role:** 表单输入

白底、16px 圆角、1px 石板蓝 12% 描边、padding 12px 18px、15px 字。占位符石板蓝 35%。聚焦时描边转石板蓝 40% 并加 3px 的藕粉 15% 外环，不改变尺寸。

### Pastel Chip

**Role:** 分类与筛选标记

999px 全圆角、12% 粉彩底（藕粉、鼠尾草绿或米沙）、无描边、13px/500、padding 6px 14px，文字用石板蓝而非彩色。选中态底升到 22%。

### Photo Bed

**Role:** 图片容器

20px 圆角、衬底用米沙或藕粉 12%、内边距 0、overflow hidden。图片本身不加边框，允许 4:5 或 1:1 比例。hover 时图片放大 1.03，容器阴影加深。

## Do's and Don'ts

### Do

- 暖白底，不用纯白
- 主文字用石板蓝
- 强调只用低饱和粉彩
- 圆角 16 到 24px
- 边框 1px 的 10%
- 永不全大写、永不宽字距

### Don't

- 不要用高饱和纯色
- 不要用 2px 以上边框
- 不要用全大写与宽字距
- 不要用深色或黑色背景
- 不要过度装饰与堆叠元素
- 不要用霓虹或荧光色

## Surfaces

| Level | Name | Value | Purpose |
|---|---|---|---|
| 0 | Warm White | `#faf9f7` | 页面画布 |
| 1 | Soft White | `#ffffff` | 卡片 |
| 2 | Blush Bed | `rgba(212,165,165,0.12)` | 图片衬底与区块 |

## Elevation

- **Card:** `0 2px 8px rgba(61,74,92,0.04)`
- **Card hover:** `0 6px 20px rgba(61,74,92,0.07)`

## Imagery

自然光下的静物与人像，色调偏暖，饱和度低。允许粉彩衬底。不使用高对比摄影、冷光与 UI 插画。

## Layout

上限 1040px、容器内边距 32 到 64px，区块间距 128px。单栏或非对称双栏（5:7），右侧留大片空白。元素间距至少 24px，行宽不超过 34em。

## Agent Prompt Guide

### Implementation Contract

- 以用户请求中的页面、用户任务和真实内容为依据，只实施指定范围；标明缺失的业务信息，不编造数据或能力。
- 先检查现有项目、技术栈与组件；沿用项目结构、路由和依赖，复用已有组件，不重建未要求的页面或功能。
- 沿用项目断点，调整窄屏与桌面的网格和留白；保留信息层级，避免意外横向溢出。
- 对本次涉及的交互，处理键盘焦点与减少动态效果；补齐适用的禁用、加载、空内容与错误状态。
- 完成后按项目现有脚本检查，仅报告实际运行的测试与视觉检查，并列出未验证项。

QUICK COLOR REFERENCE:

- text: `#3d4a5c`
- background: `#faf9f7`
- card: `#ffffff`
- blush: `#d4a5a5`
- sage: `#a8c5b8`
- border: `rgba(61,74,92,0.10)`

EXAMPLE COMPONENT PROMPTS:

1. 做一个韩式极简卡片：白底、24px 圆角、1px rgba(61,74,92,0.1) 描边、内边距 32px、阴影 0 2px 8px rgba(61,74,92,0.04)。标题 26px/400 #3d4a5c，正文 14px/400、行高 1.75、色 rgba(61,74,92,0.7)。卡片上方放一个 12% #d4a5a5 底的小标签（999px 圆角、13px/500）。hover 时阴影扩到 0 6px 20px rgba(61,74,92,0.07)、上浮 2px。页面底色 #faf9f7。
