# 粉彩应用风 — 风格参考

> 暖奶油底上一层层淡色分组：友好，但每个字都读得清。

**Theme:** light

粉彩应用风是为移动端社区与内容应用设计的：暖奶油底（#fff8f0）承载全部内容，粉彩色（淡紫、薄荷、黄油、珊瑚）只用于分组与状态提示，绝不作为大面积装饰。文字用深紫（#66508f）与深灰（#332d3d）保证对比度，卡片与触控控件统一 16 到 24px 圆角。它把实用性写进规范——收藏、评分与快捷反馈必须放在内容决策点附近，触控目标不能过小，不能出现密集的横向表格，也不能让荧光色或高饱和渐变覆盖整页。

## Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Deep Violet | `#66508f` | `--color-deep-violet` | 主色：主按钮、标签与链接。是粉彩里唯一足够深的颜色。 |
| Cream | `#fff8f0` | `--color-cream` | 页面底。温暖的白，比纯白柔和。 |
| Ink | `#332d3d` | `--color-ink` | 标题与正文。深到保证 4.5:1 以上的对比。 |
| Lilac | `#d9c7ff` | `--color-lilac` | 第一分组色，用于「精选」类区块底。 |
| Mint | `#cbefdf` | `--color-mint` | 第二分组色与成功状态。 |
| Butter | `#ffe49a` | `--color-butter` | 提醒与收藏状态，只在小组件上出现。 |
| Coral | `#ffb5a7` | `--color-coral` | 情感化反馈与聚焦环，出现频率最低。 |

## Typography

### Inter — 全站唯一字体。字级偏移动端（13 到 17px 为主），标签 12px 全大写 0.16em。

- **Substitute:** system-ui, -apple-system, 'PingFang SC', sans-serif
- **Weights:** 400, 600, 700
- **Sizes:** 12, 13, 15, 17, 21, 26
- **Line height:** 1.25 (display), 1.35 (headings), 1.6 (body)
- **Letter spacing:** -0.01em on display, 0.16em on uppercase labels

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|---|---|---|---|---|---|---|
| heading | — | 700 | 26px | 1.3 | -0.01em | `--text-heading` |
| subheading | — | 600 | 21px | 1.35 | — | `--text-subheading` |
| body-lg | — | 600 | 17px | 1.5 | — | `--text-body-lg` |
| body | — | 400 | 15px | 1.6 | — | `--text-body` |
| body-sm | — | 400 | 13px | 1.55 | — | `--text-body-sm` |
| label | — | 600 | 12px | 1.4 | 0.16em | `--text-label` |

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
| 20 | 20px | `--spacing-20` |
| 24 | 24px | `--spacing-24` |
| 32 | 32px | `--spacing-32` |
| 48 | 48px | `--spacing-48` |

### Border Radius

| Element | Value |
|---|---|
| cards | 24px |
| buttons | 16px |
| inputs | 16px |
| pills | 999px |

- **Page max-width:** 480px
- **Section gap:** 32px
- **Card padding:** 20px
- **Element gap:** 12px

## Components

### Pastel Button

**Role:** 主行动按钮

深紫填充、白字、16px 圆角、无描边，15px/600、padding 12px 20px，阴影 0 6px 16px 紫 20%。hover 时上浮 2px；按下缩到 0.98。触控高度不小于 44px。过渡 200ms。

- **Sizes:** min-height 44px; padding 12px 20px
- **States:** hover: lift 2px; active: scale 0.98

### Group Card

**Role:** 内容卡与分组块

粉彩填充（薄荷、淡紫或黄油之一）、24px 圆角、1px 深紫 10% 描边、内边距 20px，阴影 0 4px 12px 紫 10%。上方 12px 全大写 0.16em 的深紫 70% 标签，中间 21px/600 深灰标题，下方 13px 正文深灰 80%。一整块只用一种粉彩。

### Soft Field

**Role:** 搜索与输入

奶油填充、16px 圆角、1px 深紫 20% 描边、padding 12px 16px、15px 字，聚焦时加 4px 的珊瑚 40% 外环。占位符深灰 60%。

### Action Cluster

**Role:** 决策点快捷操作

横向三个 44px 的全圆按钮，间距 12px，分别用淡紫、薄荷、珊瑚的 30% 底配深紫图标。位置固定贴在内容卡的右下角或底部条，保证用户在读完内容时手就在那里。

### Bottom Sheet

**Role:** 移动端底部弹层

奶油底、顶部 24px 圆角、顶部 1px 深紫 10% 描边、阴影 0 -12px 40px 深紫 12%。顶部中央 36px × 4px 的深紫 20% 抓手。内边距 20px，最大高度 88vh。

## Do's and Don'ts

### Do

- 暖奶油底承载全部内容
- 粉彩只用于分组与状态
- 文字用深紫与深灰保证对比
- 触控目标不小于 44px
- 快捷操作贴着决策点
- 圆角 16 到 24px

### Don't

- 不要用荧光色或高饱和渐变覆盖整页
- 不要用过小的触控目标
- 不要用密集的横向表格
- 不要让粉彩承担正文
- 不要在桌面端加宽成多栏
- 不要在同一卡混两种粉彩

## Surfaces

| Level | Name | Value | Purpose |
|---|---|---|---|
| 0 | Cream | `#fff8f0` | 页面底 |
| 1 | Mint Card | `#cbefdf` | 内容卡 |
| 2 | Lilac Block | `#d9c7ff` | 精选区块 |

## Elevation

- **Soft:** `0 4px 12px rgba(102,80,143,0.10)`
- **Button:** `0 6px 16px rgba(102,80,143,0.20)`

## Imagery

以图标、头像与轻量插画为主。允许粉彩几何图形作为分组标识。不使用深色大图与高饱和摄影，移动端的图像只用于识别而非装饰。

## Layout

移动优先：单列、上限 480px、内边距 16px、卡片间距 12px、区块间距 32px。桌面端居中一列不加宽。底部固定操作条 64px，内容区留同等底部内边距。禁止横向表格。

## Agent Prompt Guide

### Implementation Contract

- 以用户请求中的页面、用户任务和真实内容为依据，只实施指定范围；标明缺失的业务信息，不编造数据或能力。
- 先检查现有项目、技术栈与组件；沿用项目结构、路由和依赖，复用已有组件，不重建未要求的页面或功能。
- 沿用项目断点，调整窄屏与桌面的网格和留白；保留信息层级，避免意外横向溢出。
- 对本次涉及的交互，处理键盘焦点与减少动态效果；补齐适用的禁用、加载、空内容与错误状态。
- 完成后按项目现有脚本检查，仅报告实际运行的测试与视觉检查，并列出未验证项。

QUICK COLOR REFERENCE:

- text: `#332d3d`
- background: `#fff8f0`
- primary: `#66508f`
- lilac: `#d9c7ff`
- mint: `#cbefdf`
- coral: `#ffb5a7`

EXAMPLE COMPONENT PROMPTS:

1. 做一个粉彩应用风卡片：背景 #cbefdf、24px 圆角、1px rgba(102,80,143,0.1) 描边、内边距 20px、阴影 0 4px 12px rgba(102,80,143,0.1)。上方 12px 全大写 0.16em 的 rgba(102,80,143,0.7) 标签，中间 21px/600 #332d3d 标题，下方 13px 正文 rgba(51,45,61,0.8)。主按钮深紫 #66508f 填充、白字、16px 圆角、最小高度 44px。页面底色 #fff8f0，单列上限 480px，底部固定 64px 操作条。
