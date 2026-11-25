# 镭射箔 — 风格参考

> 光就是油墨：让银箔按光栅方程响应一盏共享的灯。

**Theme:** dark

镭射箔的虹彩不是一条平移的彩虹渐变，而是刻槽衍射后算出的颜色。1500 nm 光栅在约 300 px 的离屏灯光下产生光谱；法线和灯的相对角度决定波长，银色仍然是大部分表面。第 1、2、3 级按 1、0.5、0.3 加权。用近黑印张和细裁切线衬托浮雕箔片，结构克制，材质负责表达。可交互版本整页共享一个 WebGL2 上下文，并提供跟随同一盏灯的 CSS 平替。

## Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Print Sheet | `#0c0b10` | `--color-print-sheet` | 全页近黑画布；让变化中的银箔和光谱成为视觉焦点。 |
| Panel | `#141319` | `--color-panel` | 暗色卡片与容器底色，配极细白色描边分层。 |
| Dark Silver Foil | `#a3a2af` | `--color-dark-silver` | 暗箔面本身的银灰基底；虹彩只在角度吻合处叠上去。 |
| Light Silver Foil | `#e9e8f0` | `--color-light-silver` | 适合印刷深色油墨字的浅银箔面，不用纯白替代。 |
| Ink | `#16151c` | `--color-foil-ink` | 仅在浅银箔上印标题和按钮文案，避免压在彩虹带上。 |
| Text | `#ececf2` | `--color-text` | 印张和暗面板上的主要文字，高对比但不刺眼。 |
| Secondary Text | `#a9a8b6` | `--color-text-secondary` | 说明、注释和次级内容；退后一级，不缩小到难读。 |
| Focus Silver | `#c9c8d4` | `--color-focus-silver` | 键盘焦点、范围滑杆和克制的行动按钮，保持可见轮廓。 |
| Sampled Spectral Red | `#d2052d` | `--color-spectrum-red-sample` | 1500 nm CSS 光谱条上的一枚红端采样；仅作为动态光谱一部分。 |
| Sampled Spectral Green | `#00d777` | `--color-spectrum-green-sample` | CSS 光谱条上计算出的绿色采样，不是固定组件填色。 |
| Sampled Spectral Violet | `#6600e1` | `--color-spectrum-violet-sample` | CSS 光谱条上计算出的紫色采样；随灯和衍射级次变化。 |

## Typography

### Sans Serif — 全站使用 font-sans；大标题粗而紧凑，次级标记用等宽字体和字距，不引入新字体。

- **Substitute:** system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif
- **Weights:** 400, 500, 600, 700, 800
- **Sizes:** 12, 14, 16, 20, 24, 32, 48, 72
- **Line height:** 1.05 (display), 1.2 (headings), 1.65 (body)
- **Letter spacing:** -0.025em on display, 0.2em on uppercase labels

### Monospace — 用于光栅方程、纳米数值、兑换码和稀疏技术标签，不用于长段正文。

- **Substitute:** ui-monospace, SFMono-Regular, Menlo, Consolas, monospace
- **Weights:** 400, 500, 600
- **Sizes:** 12, 14, 16, 18
- **Line height:** 1.2 (display), 1.4 (headings), 1.65 (body)
- **Letter spacing:** 0.04em on display, 0.2em on uppercase labels

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|---|---|---|---|---|---|---|
| display | — | 800 | 72px | 1.05 | -0.025em | `--text-display` |
| heading-lg | — | 800 | 48px | 1.12 | -0.02em | `--text-heading-lg` |
| heading | — | 800 | 32px | 1.2 | -0.015em | `--text-heading` |
| subheading | — | 600 | 24px | 1.3 | — | `--text-subheading` |
| body-lg | — | 400 | 16px | 1.65 | — | `--text-body-lg` |
| body | — | 400 | 14px | 1.65 | — | `--text-body` |
| label | Monospace | 500 | 12px | 1.4 | 0.2em | `--text-label` |

## Spacing & Layout

**Base unit:** 8px
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
| 40 | 40px | `--spacing-40` |
| 48 | 48px | `--spacing-48` |
| 64 | 64px | `--spacing-64` |
| 96 | 96px | `--spacing-96` |

### Border Radius

| Element | Value |
|---|---|
| Cards and foil panels | 16px–24px |
| Buttons and input fields | 12px |
| Pills and star seals | 999px |
| Section dividers | 0px; 1px border |

- **Page max-width:** 1280px
- **Section gap:** 64px
- **Card padding:** 24px
- **Element gap:** 16px

## Components

### Foil Trading Card

**Role:** 收藏展示主体：深色卡框承托宽幅烫印箔面。

用 #141319 卡框、白色 10% 细描边和 24px 左右圆角；中央箔面纵横比 1.8:1。标题字靠底边印在浅色位置；说明与编号用 #a9a8b6 和等宽字。边缘可以有深色投影，箔面本身不叠重阴影。

- **Sizes:** foil face 1.8:1; frame padding 20px–24px
- **States:** spectrum follows the shared lamp; non-foil card frame remains still

### Light Foil Button

**Role:** 浅银箔上的主要行动，压下时材质弯曲而版面位置不动。

用亮银多层银色底、screen 高光与 overlay 光谱；深色 #16151c 油墨字，12px 圆角，min-height 44px，水平 padding 24px，字体 14px/600。内侧加细白高光与深色落影；键盘操作保留 2px 的 #c9c8d4 外轮廓。

- **Sizes:** minimum height 44px; 12px radius
- **States:** press: bend shading normal up to 14° and spring back; never translate the button

### Grating Controls

**Role:** 让读者直接观察入射角和刻槽间距怎样改变衍射级次。

深色面板内使用两条水平范围控件：灯角度 0°–70°，间距 800–2200 nm、步长 50 nm；实时显示数值和 1–3 级衍射位置。滑轨使用 #c9c8d4 作银色强调，标签 14px，数值等宽显示。

- **Sizes:** panel padding 24px–32px; two 44px-high controls
- **States:** changing angle or period updates computed wavelength markers and spectral strip

### Foil Material Samples

**Role:** 并列展示彩虹膜、同心星芒和碎钻的刻槽差异。

用统一尺寸、12px 圆角和 #141319 卡底；图形依次使用交叉光栅、圆形刻槽和随机晶面。拉丝光栅与薄膜干涉需要 WebGL2 的逐像素效果，使用明确的 WebGL 示例链接，不以假静态色块代替。

### Redeem-Code Field

**Role:** 收藏卡或包装上用于兑换的短码。

面板底 #141319，1px rgba(255,255,255,0.15) 描边，12px 圆角，padding 12px 16px；占位格式 XXXX-XXXX-XXXX，使用等宽大写字、0.2em 字距和 #6c6b78 占位文字。聚焦描边切换为 #c9c8d4，保留可见焦点环。

- **Sizes:** 14px monospace; 12px 16px padding; 12px radius
- **States:** input uppercases characters and announces incomplete/valid format; validation does not depend on color alone

### Collector Navigation

**Role:** 作为纸面边缘的一行轻导航，而非厚重应用栏。

近黑底、底部 1px rgba(255,255,255,0.1) 细线、24px 水平 padding；字标可使用油墨彩箔字，普通链接保持 #a9a8b6。右侧仅放短行动按钮，桌面可提供下载 HTML 的文字链接。

- **Sizes:** roughly 56px high; 24px horizontal padding
- **States:** hover raises text contrast; keyboard links keep the silver offset outline

## Do's and Don'ts

### Do

- 用 λ = d × |dot(h, k)| / m 计算颜色，d 默认 1500 nm；1、2、3 级分别按 1、0.5、0.3 加权。
- 使用离屏 300px 的共享指针灯；颜色与方向角相关，银底在未衍射处显露。
- 把紫、蓝、绿、黄、红的变化视为计算得到的动态光谱，而不是固定配色。
- 整页互动效果共用一个 WebGL2 上下文，逐项绘制并复制到元素画布。
- 为不支持或关闭 WebGL 的用户提供跟随同一盏灯的 CSS 平替。
- 把操作反馈落在法线与光照上，按压最多倾斜 14°，弹簧参数采用刚度 320、阻尼比 0.32。
- 把深色油墨限制在亮银箔上；暗印张正文使用 #ececf2，次要文字使用 #a9a8b6。
- 尊重减少动态偏好：固定灯的位置，停止轨道运动和弹簧过冲。

### Don't

- 不要用静态虹彩渐变或 background-position 平移冒充光栅衍射。
- 不要把彩虹铺满箔面；多数区域必须读作银色。
- 不要让油墨文字压在高饱和光谱上；需要时把文字放到亮银区。
- 不要给每个元素新建 WebGL 上下文，也不要逐元素重复昂贵着色器。
- 不要靠循环 hue-rotate 改色；这会让箔面失去可解释的光栅与灯光关系。
- 不要为 WebGL-only 的拉丝或幻彩样式生成假的 CSS 色块预览。
- 不要交错读取布局和写入样式；先测量，再统一绘制或写变量。
- 不要在减少动态模式下保留自动绕行、弹跳或过冲。

## Surfaces

| Level | Name | Value | Purpose |
|---|---|---|---|
| 0 | Print Sheet | `#0c0b10` | Near-black page ground supporting the foil. |
| 1 | Raised Panel | `#141319` | Content cards use a 10% white hairline. |
| 2 | Dark Silver Foil | `linear-gradient(#4f4e59, #a3a2af 28%, #5e5d68 50%, #adacb9 76%, #575661)` | Grey metal under a spectrum blended with screen. |
| 2 | Light Silver Foil | `linear-gradient(#b4b3bf, #e9e8f0 30%, #bdbcc8 52%, #ecebf2 78%, #b6b5c1)` | Light metal uses overlay to preserve ink contrast. |
| 3 | Diffracted Spectrum | `1500 nm grating; orders 1:0.5:0.3 over silver` | Computed from lamp angle, never a static RGB fill. |

## Elevation

- **Trading card:** `0 24px 48px -28px rgba(0,0,0,0.9)`
- **Light-foil top rim:** `inset 0 1px 0 rgba(255,255,255,0.6)`
- **Dark panel:** `1px solid rgba(255,255,255,0.1); no broad glow`
- **Lamp highlight:** `radial highlight within 150px of shared lamp`

## Imagery

展示真实光谱箔面、藏品或包装的宏观细节，保留能辨认金属基底的区域。静态展示用预计算光谱条加银底和方向性高光；避免照片噪点淹没细槽。WebGL-only 拉丝与幻彩需使用实际 shader 预览。

## Layout

印张主容器上限 1280px，移动端 padding 24px，桌面端 40px；区块上方细线、48px 移动端/64px 桌面端垂直节奏。亮面采用 1.8:1 宽卡，可并排布局一个主卡和两个方形材质样片；阅读区留白足够区分印张、面板与箔片。

## Agent Prompt Guide

### Implementation Contract

- 以用户请求中的页面、用户任务和真实内容为依据，只实施指定范围；标明缺失的业务信息，不编造数据或能力。
- 先检查现有项目、技术栈与组件；沿用项目结构、路由和依赖，复用已有组件，不重建未要求的页面或功能。
- 沿用项目断点，调整窄屏与桌面的网格和留白；保留信息层级，避免意外横向溢出。
- 对本次涉及的交互，处理键盘焦点与减少动态效果；补齐适用的禁用、加载、空内容与错误状态。
- 完成后按项目现有脚本检查，仅报告实际运行的测试与视觉检查，并列出未验证项。

QUICK COLOR REFERENCE:

- background: `#0c0b10`
- panel: `#141319`
- text: `#ececf2`
- secondaryText: `#a9a8b6`
- inkOnLightFoil: `#16151c`
- silver: `#c9c8d4`
- brightSilver: `#e9e8f0`

EXAMPLE COMPONENT PROMPTS:

1. 做一张可交互的烫印收藏卡。画布 #0c0b10，卡框 #141319、白色 10% 细描边，里面放一块 1.8:1 的银箔面。按 λ = d × |dot(h, k)| / m 计算光栅波长，d = 1500 nm，第 1/2/3 级权重为 1/0.5/0.3；一盏距屏幕 300px 的共享指针灯控制整页，银底应露出大部分面积。亮箔用 overlay、暗箔用 screen 混合。全页只用一个 WebGL2 上下文，并提供由同一光谱条和光源控制的 CSS 平替；按压只弯法线，不移动布局。偏好减少动态时停住光源。请验收：颜色随灯角度变化、大部分表面读作银、卡片尺寸稳定、焦点环清晰、CSS 平替可用。
