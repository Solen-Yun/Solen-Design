# 邻近加权字母 — ProximityWeight

制作「邻近加权字母」：一张 340×340 的近黑画布，三行 40px 的大字居中排布（"Come closer / and letters / breathe deep"）。每个字母是一枚独立的可变字体字符：光标扫过词面时，以光标为心、110px 为半径，字母按距离做余弦衰减——越近的字重越粗（最高 900）、微微放大到 1.12 倍、颜色越暖亮，隆起像一团光斑随光标滚过；光标离开后字母缓慢回落。点击画布翻转模式：变成越近越细（800 降到 100），底部胶囊在 "Bolder near" 与 "Lighter near" 之间切换。

## 布局与材质

- 340×340px 场景，固定 340px 逻辑宽，圆角 30px，溢出裁切。底色固定深灰 #101014（不随明暗模式变化），文字基色 #F4F1EA。外圈 1px 线色描边（浅色模式令牌 rgba(22,21,27,.09)、深色 rgba(255,255,255,.08)），下方 0 30px 60px -36px 强阴影。窄容器时整景按 transform:scale 等比缩小。
- 文字层铺满场景（absolute inset:0）、纵向 flex 居中、行间距为 0，三行紧凑堆叠，行距只由行高 1.18 决定，逐行水平居中排列；字体栈 system-ui、-apple-system、"Apple SD Gothic Neo"、"Malgun Gothic"、sans-serif。每个字母为 inline-block 的 span：字号 40px、行高 1.18、字距 -0.02em、text-align:center；font-weight 由变量 --w 驱动，transform:scale(--s)（以字母自身中心为原点缩放），颜色 hsl(40 30% calc(60% + var(--k) × 36%))——k 从 0 到 1 时亮度从 60% 升到 96%，色相恒为 40°（暖沙色）。
- 交互层是一块覆盖全场的透明原生按钮（type=button、cursor:crosshair、border-radius 继承场景、无边框无背景），叠在文字上方——点击场景任意位置都能命中：aria-label "Headline that thickens near the cursor, press to flip the mode"，aria-description 为整句标题文案；focus-visible 时 2px 实线 #F4F1EA 外圈、内缩 6px。文字层与胶囊均 pointer-events:none，不挡指针。
- 底部模式胶囊：水平居中、距底 18px，内边距 4px 11px、圆角 999px、背景 rgba(244,241,234,.1)、文字 11px/字重 750、颜色 rgba(244,241,234,.75)，aria-live="polite"。
- 场景令牌仅用于描边与阴影（light-dark() 随 prefers-color-scheme 切换）；画面本体固定深色。

## 数据

- 写死三行标题，逐字符拆分：第 1 行 "Come closer"（11 字符）、第 2 行 "and letters"（11 字符）、第 3 行 "breathe deep"（12 字符），空格也占一格；三行以 DOM 顺序自然换行，不强制断行。
- 模式胶囊写死两档文案：默认 "Bolder near"，翻转后 "Lighter near"，经 aria-live="polite" 播报。
- 每个字母持有独立状态：当前字重、目标字重、颜色系数 k、场景内坐标；坐标在布局后测量一次，并在字体加载完成（document.fonts.ready）后重测一次，避免字体替换导致隆起错位。除以上内容外无其他写死数据。

## 操作和动效

- 测量与防抖：两遍测量——先清空各字母的固定宽度、把字重变量临时置 900，量出每个字母最粗时的宽度，再把格宽锁为该值的 94%（向上取整像素）并回写当前字重；之后无论字重怎么变，行宽与折行都不抖动，相邻字母也不会因隆起互相挤开。最后逐字母记录中心点坐标（按整景缩放比换算进逻辑坐标）。初始每个字母落在基线字重 300。
- 邻近计算：pointermove 时把指针坐标换算进场景逻辑坐标（整景被缩放摆放时隆起仍对准指针）；每个字母到指针的距离 d = √((x差)² + ((y差)×1.3)²)（纵向权重 1.3 倍，隆起呈扁圆）；影响半径 110px，衰减系数 f = d<110 ? 0.5 + 0.5×cos(d÷110×π) : 0，即正中 1、边缘 0 的余弦缓坡。指针监听绑在整张场景（pointermove/pointerleave），不只限文字区域——光标从卡片任意角落扫过隆起都会随距离反应；pointerleave 把指针置空，所有字母目标回到各自基线。
- 目标值（默认加粗模式）：字重 = 300 + f×600（最粗 900）、k = f、scale = 1 + f×0.12；翻转模式（越近越细）：字重 = 800 − f×700（最细 100）、k = 1 − f、scale = 1 + (1−f)×0.12。字重写入 CSS 变量时取整到 10 的倍数，避免可变字体轴上无意义的抖动。
- 回弹节奏：requestAnimationFrame 循环逐字母逼近目标——逼近系数 a = min(1, 帧间隔秒 × (指针在场 ? 14 : 4))，即指针在场时每帧吞掉剩余差值的约 1/4（跟手），离开后降为每帧约 1/30（缓慢回落）；指数逼近不会过冲，快速划过也不抖。所有字母与目标差都小于 1 即停帧，指针再动、离开或点击时重新唤起。
- 挂载完成后主动跑一帧，把初始基线字重与颜色落位；此后帧循环按需启停。
- 点击（全场的透明按钮，Enter/Space 等价；无论点击点在场景何处，模式都整体翻转）并更新胶囊文案；若此刻无指针在场，所有字母立即落到新模式基线（800 或 300）；有指针在场则就地平滑过渡到新目标。
- prefers-reduced-motion 下逼近系数取 1，即所有变化一步到位、翻回默认同样即时，不再有渐进过渡（隆起仍随光标位置即时改变）。options.reducedMotion 覆盖系统偏好。
- 无障碍：文字层 aria-hidden，语义经按钮的 aria-label 与 aria-description 提供；模式变化经胶囊 aria-live="polite" 播报。场景内可聚焦元素只有这块透明按钮，Tab 一次即达；初始无指针，全部字母停在基线字重 300、颜色亮度 60%。
- 更新 options 不重挂载组件，支持同页多实例互不干扰；卸载时停止帧循环并移除监听。

## Props

| Prop | Type | Default | Description |
| height | number | 340 | 场景高度，逻辑像素；窄容器整景按比例缩小 |
| reducedMotion | boolean | 跟随系统 | 覆盖系统的减少动态偏好 |

## 独立实现与六框架交付

- 仅凭本文从零生成可运行的实现。尺寸、颜色、文案与运动参数均以上述文字为准；可变字体用系统字体栈的能力（font-weight 轴 100–900）实现，界面全部用 DOM 与 CSS，不加载远程图片、字体、视频或素材。
- 当前交付重点为 React，组件名称 ProximityWeight。从零创建四个文件：ProximityWeight.tsx、ProximityWeightEngine.js、motion-runtime.ts、ProximityWeightEngine.d.ts；分别实现框架入口、完整交互核心、实例生命周期和类型声明。文件名是需要生成的产物，不假定接收者已经拥有任何文件。
- 同时提供 React、Vue、Svelte、Solid、Preact、Vanilla 原生生命周期入口，共享框架无关核心。DOM 仅在挂载后访问，支持同页多实例；更新时保持状态，销毁时清理动画、计时器、观察器及监听器。不要用 iframe 代替组件实现。
- 依赖安装说明：npm install react react-dom。若使用依赖，只使用其公开 API；组件的布局、样式、图形和算法必须在本次生成的文件中完整实现，不引用现成效果组件。
- 实现 options.height 以调整场景高度，options.reducedMotion 覆盖系统偏好；减少动态下切换仍即时正确。
- 给出每个文件的完整内容、安装和运行步骤、以下使用示例所需的全部实现。不得留省略号、待补素材或"自行补齐核心"的占位。
- 验收：375 / 768 / 1440px 无横向溢出；字重变化时行宽不抖动、相邻字母不被挤开；光标扫过隆起连续跟手、正对处达 900 字重可辨、离开缓慢回落；点击翻转粗细模式即时正确、两种基线 300/800 落位准确；浅色深色两套令牌正确；多实例互不干扰，卸载后停止所有任务。

## 使用示例

```tsx
import { ProximityWeight } from "./ProximityWeight";

export default function App() {
  return <ProximityWeight />;
}
```
