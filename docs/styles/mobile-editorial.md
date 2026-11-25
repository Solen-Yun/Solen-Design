# 移动编辑风 — 风格参考

> 把杂志的节奏压进手机：衬线标题、暖纸面、单列流。

**Theme:** light

移动编辑风把杂志的排版节奏移植到手机屏：衬线标题承担性格、无衬线正文保证易读、暖纸底（#fffdf8）提供印刷感、单列纵向流加横向专题卡加底部导航。它的配色纪律非常克制——珊瑚色 #e97b61 是唯一的强行动色，其余全部是纸色、墨色与三支低饱和辅色。任何多余的强调色都会破坏编辑节奏，所以在它的规范里「少一个颜色」永远优于「多一个」。

## Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Ink | `#24211f` | `--color-ink` | 标题与正文。带暖调的近黑，印刷感由此而来。 |
| Paper | `#fffdf8` | `--color-paper` | 页面底。微暖的白，比纯白更像纸张。 |
| Coral | `#e97b61` | `--color-coral` | 唯一的强行动色：主按钮、栏目标签与链接。 |
| Sage | `#c5d8c1` | `--color-sage` | 生活与自然栏目的标记色，只作底不作字。 |
| Sand Gold | `#e9d7a9` | `--color-sand-gold` | 引文底与文化栏目，是第二支底色。 |
| Lilac | `#d7c4e8` | `--color-lilac` | 观点与评论栏目，出现频率最低。 |

## Typography

### Playfair Display — 标题用衬线，24 到 30px 为主。在手机上大字号反而挤压，所以克制。

- **Substitute:** Georgia, 'Songti SC', serif
- **Weights:** 400, 700
- **Sizes:** 20, 24, 30, 38
- **Line height:** 1.1 (display), 1.2 (headings), 1.6 (body)
- **Letter spacing:** -0.01em on display, 0.18em on uppercase labels

### Inter — 正文与标签用无衬线。正文 15px、行高 1.75，适合拇指滑动阅读。

- **Substitute:** system-ui, -apple-system, sans-serif
- **Weights:** 400, 500, 600
- **Sizes:** 12, 14, 15
- **Line height:** 1.4 (display), 1.4 (headings), 1.75 (body)
- **Letter spacing:** 0 on display, 0.18em on uppercase labels

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|---|---|---|---|---|---|---|
| display | Playfair Display | 700 | 38px | 1.1 | -0.01em | `--text-display` |
| heading | Playfair Display | 700 | 30px | 1.2 | — | `--text-heading` |
| subheading | Playfair Display | 400 | 24px | 1.3 | — | `--text-subheading` |
| body-lg | Inter | 400 | 15px | 1.75 | — | `--text-body-lg` |
| body | Inter | 400 | 14px | 1.75 | — | `--text-body` |
| label | Inter | 600 | 12px | 1.4 | 0.18em | `--text-label` |

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
| cards | 16px |
| buttons | 999px |
| inputs | 12px |
| images | 12px |

- **Page max-width:** 480px
- **Section gap:** 32px
- **Card padding:** 20px
- **Element gap:** 12px

## Components

### Coral Button

**Role:** 主行动按钮

珊瑚填充、白字、999px 全圆角、无描边，15px/500、padding 12px 20px。hover 时填充加深到 #d9644e；按下缩放 0.98。过渡只改颜色，200ms。

- **Sizes:** padding 12px 20px; label 15px
- **States:** hover: #d9644e; active: scale 0.98

### Story Card

**Role:** 故事卡（纵向列表项）

纸色底、上下各 1px 墨色 15% 描边（无左右边）、内边距 20px 0。上方 12px 全大写 0.18em 的珊瑚栏目标签加阅读时长，中间 24px 衬线标题（最多两行），下方 14px 正文（最多三行，色墨 65%）。卡片之间无间距，靠描边分隔。

### Feature Strip

**Role:** 横向专题卡条

横向滚动的卡片条，每张宽 280px、12px 圆角、左侧图片 4:3、下方 20px 衬线标题。卡片间距 12px，容器左右内边距 16px 并允许最后一张露出边缘 24px 作为可滑动的暗示。

### Archive Field

**Role:** 搜索与订阅输入

纸色底、仅底部 1px 墨色 25% 描边（无边框包裹）、padding 12px 4px、14px 字。占位符墨 45%。聚焦时底线转珊瑚并保持 1px。

### Bottom Nav

**Role:** 底部导航

固定底部、高 56px、纸色底加 16px 模糊、顶部 1px 墨色 10% 描边，四个等宽项，每项 12px 标签加 20px 图标。当前项用珊瑚，其余墨 50%。

## Do's and Don'ts

### Do

- 衬线标题配无衬线正文
- 珊瑚是唯一的强行动色
- 单列流、上限 480px
- 用横向条承载专题
- 行高 1.75 便于拇指阅读
- 底部固定导航

### Don't

- 不要用过多种强调色
- 不要打破编辑节奏
- 不要在桌面端扩成多栏
- 不要让标题超过两行
- 不要用冷调摄影
- 不要用全幅大图

## Surfaces

| Level | Name | Value | Purpose |
|---|---|---|---|
| 0 | Paper | `#fffdf8` | 页面底 |
| 1 | White | `#ffffff` | 浮层与卡内卡 |
| 2 | Sage Bed | `rgba(197,216,193,0.35)` | 栏目底 |

## Elevation

- **None:** `none — hairline rules separate`
- **Sheet:** `0 -12px 40px rgba(36,33,31,0.10)`

## Imagery

编辑类摄影：人物、场所、物件，统一 4:3 或 3:2 裁切，暖调。允许小幅面缩略图配长标题。不使用全幅大图、装饰插画与冷调摄影。

## Layout

移动优先：单列、上限 480px、内边距 16px、区块间距 32px。桌面端居中为 480px 一列，不扩展成多栏。底部固定 56px 导航，内容区留出同等底部内边距。

## Agent Prompt Guide

### Implementation Contract

- 以用户请求中的页面、用户任务和真实内容为依据，只实施指定范围；标明缺失的业务信息，不编造数据或能力。
- 先检查现有项目、技术栈与组件；沿用项目结构、路由和依赖，复用已有组件，不重建未要求的页面或功能。
- 沿用项目断点，调整窄屏与桌面的网格和留白；保留信息层级，避免意外横向溢出。
- 对本次涉及的交互，处理键盘焦点与减少动态效果；补齐适用的禁用、加载、空内容与错误状态。
- 完成后按项目现有脚本检查，仅报告实际运行的测试与视觉检查，并列出未验证项。

QUICK COLOR REFERENCE:

- text: `#24211f`
- background: `#fffdf8`
- accent: `#e97b61`
- sage: `#c5d8c1`
- gold: `#e9d7a9`
- muted: `#6b6560`

EXAMPLE COMPONENT PROMPTS:

1. 做一个移动编辑风故事卡：纸色 #fffdf8 底、上下各 1px rgba(36,33,31,0.15) 描边、无左右边框、内边距 20px 0。上方 12px 全大写 0.18em 的 #e97b61 栏目标签加阅读时长，中间 Playfair Display 24px 标题（最多两行），下方 14px 正文（最多三行、色 rgba(36,33,31,0.65)、行高 1.75）。主按钮珊瑚 #e97b61、999px 圆角、白字 15px/500。页面底色 #fffdf8，单列上限 480px，底部固定 56px 导航。
