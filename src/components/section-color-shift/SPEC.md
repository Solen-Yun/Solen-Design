# 分段变色滚动 — SectionColorShift

制作「分段变色滚动」场景：一张 300×500 的迷你汽水产品页。内部可上下滚动，四个口味区（西柚、青葡萄、蓝莓、蜜桃）依次排布；视口中央 sticky 钉住一罐 CSS 画的汽水罐和右上角四枚进度圆点。滚动经过每个口味区时，整页背景色按滚动比例在相邻两个口味色之间逐通道插值融合，罐身、罐标文字同步换成当前口味色与口味名，罐子还会在区与区之间轻微倾斜、标签轻微横移，到每个区正中时全部归位。

## 布局与材质

- 300×500px 场景卡，圆角 30px，溢出裁切。场景根是 300×500 的无底色包装层（水平居中），卡片视觉放在其内部的绝对填充层上——文档演示舞台会剥离场景根的背景，卡片底色必须在嵌套层上才能保留。容器窄于 300px 时整景等比缩小（缩放比 = min(1, 可用宽/300)，上限 1）。
- 卡片背景色写在 CSS 变量 --bg 上（JS 滚动时不断改写），初始 #FF8A65；文字基色写死 #1B1B22；外圈 1px 描边取令牌 --ux-line（浅色 rgba(22,21,27,.09) / 深色 rgba(255,255,255,.08)），投影 0 30px 60px -36px 取 --ux-shadow-strong（浅 rgba(40,30,80,.3) / 深 rgba(0,0,0,.72)）。内容颜色不随深色模式翻转（背景由口味插值决定）。
- 滚动容器 absolute inset 0，overflow-y auto，滚动条隐藏（scrollbar-width:none 与 ::-webkit-scrollbar 两种写法），tabindex="0"、aria-label「Flavors, scroll to browse」、outline:none。
- sticky 舞台层：position sticky、top 0、高 500px，flex 顶部对齐居中，padding-top 74px，pointer-events none，整层 aria-hidden。舞台左上角标题「Four sparkling flavors」：absolute 左 20px、上 20px，13px/字重 800、透明度 .75。
- 汽水罐：104×196px，圆角 26px 26px 22px 22px，overflow hidden；背景两层叠加——90deg 明暗渐变（rgba(0,0,0,.25) → rgba(255,255,255,.35) 30% → rgba(255,255,255,.05) 55% → rgba(0,0,0,.28)）盖在变量 --can（初始 #E64A19）上，模拟罐身柱面高光；投影 0 30px 40px -24px rgba(0,0,0,.45)；整罐 transform rotate(var(--r,0deg))。罐顶拉环片用 ::before：左右各缩进 8px、高 14px、圆角 0 0 8px 8px、渐变 #E9ECEF→#ADB5BD。
- 罐标：absolute 左右贴满罐身、top 64px、高 80px，底 rgba(255,255,255,.9)，纵向 flex 居中，transform translateX(var(--lx,0px))；上行 i 标「SPARKLING」9px/字重 800、字距 .2em、色 #555；下行 b 为口味名，16px/字重 900、字距 -.02em、色取 --can（随口味变色）。
- 进度圆点：absolute 右 18px、垂直居中，纵向排列、间距 7px；每枚 6×6px 圆形、底 rgba(0,0,0,.25)；当前枚底色 #1B1B22、scale(1.5)；transition transform .3s、background-color .3s。
- 四个内容区在 sticky 层下方用 margin-top:-500px 叠进滚动流：每区高 420px（第一区 500px），纵向 flex 底对齐，内边距 0 22px 30px；口味名 b 为 30px/字重 900、字距 -.04em，副句 span 14px/字重 700、透明度 .75。内容总高 1760px，可滚动行程 1260px。不加载远程字体，字体继承宿主页面。

## 数据

- 四个口味区写死，依序为：
  1. Grapefruit —「A bright, bittersweet morning」；背景插值色 rgb(255,171,145)，罐身/标签色 #E64A19；
  2. Green grape —「A light, fizzy afternoon」；背景 rgb(192,235,117)，罐色 #5C940D；
  3. Blueberry —「A deep, sweet evening」；背景 rgb(165,180,252)，罐色 #4C3BCF；
  4. Peach —「A soft end to the night」；背景 rgb(255,200,221)，罐色 #D6336C。
- 标题「Four sparkling flavors」、罐标上行的「SPARKLING」字样均为写死文案；初始状态停在第一区（背景 #FF8A65 只是 --bg 的 CSS 兜底值，首次绘制即被插值结果覆盖）。

## 操作和动效

- 唯一驱动是滚动容器内的用户滚动（滚轮、触摸或键盘方向键）；scroll 监听为 passive，回调用 requestAnimationFrame 合帧（每帧最多算一次）。
- 滚动进度 f = scrollTop ÷ 可滚动行程 × 3（四个区共 3 段区间）。背景色按 f 的小数部分 t 在相邻两区的 RGB 三通道间线性插值并取整，写入 --bg——渐变完全可逆，来回滚动背景同步往复。
- 区间内的附属动效：设 d = f − round(f)（-0.5 ~ 0.5），罐身旋转 --r = d×24°（最大 ±12°），标签横移 --lx = d×(−60px)（最大 ±30px）；到每区正中（f 为整数）时两者都归 0。
- 当前区序号 = round(f)：变化时把 --can 换成对应罐色、罐标 b 文字换成对应口味名、对应进度圆点挂 on 类（其余摘除）。
- 无自动播放、无循环；不动即静止，状态完全由滚动位置决定。
- 键盘与无障碍：滚动容器 tabindex=0，聚焦后可用方向键翻滚浏览，aria-label 说明用途；sticky 舞台（罐、标签、标题）与圆点均 aria-hidden，辅助技术只读四个内容区文本。
- 减少动态：本组件没有 JS 级的减少动态分支——所有状态由用户滚动直接驱动、无自主动画；运行时在 options.reducedMotion 或系统偏好下给宿主打 data-reduced-motion 标记，把圆点等 CSS 过渡压到 0，滚动插值结果即时呈现。
- options.height 调整场景高度（默认 500，即视口与 sticky 层高度，内容区高度不变）；options.reducedMotion 覆盖系统偏好；更新选项就地合并、不重挂载；卸载时取消帧回调、解绑监听。样式在 Shadow DOM 内，同页多实例互不干扰。

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| height | number | 500 | 场景高度，逻辑像素；窄容器整景按比例缩小 |
| reducedMotion | boolean | 跟随系统 | 覆盖系统的减少动态偏好 |

## 独立实现与六框架交付

- 仅凭本文从零生成可运行的实现。尺寸、颜色、文案、图形和运动算法均以上述文字为准；罐体与所有装饰用 CSS 绘制，不加载远程图片、字体、视频或素材。
- 当前交付重点为 React，组件名称 SectionColorShift。从零创建四个文件：SectionColorShift.tsx、SectionColorShiftEngine.js、motion-runtime.ts、SectionColorShiftEngine.d.ts；分别实现框架入口、完整交互核心、实例生命周期和类型声明。文件名是需要生成的产物，不假定接收者已经拥有任何文件。
- 同时提供 React、Vue、Svelte、Solid、Preact、Vanilla 原生生命周期入口，共享框架无关核心。DOM 仅在挂载后访问，支持同页多实例；更新时保持状态，销毁时清理动画、计时器、观察器及监听器。不要用 iframe 代替组件实现。
- 依赖安装说明：npm install react react-dom。若使用依赖，只使用其公开 API；组件的布局、样式、图形和算法必须在本次生成的文件中完整实现，不引用现成效果组件。
- 实现 options.height 以调整场景高度，options.reducedMotion 覆盖系统偏好；减少动态下滚动浏览与状态切换仍完整可用。
- 给出每个文件的完整内容、安装和运行步骤、以下使用示例所需的全部实现。不得留省略号、待补素材或「自行补齐核心」的占位。
- 验收：375 / 768 / 1440px 无横向溢出；背景插值随滚动可逆往返；区正中处罐色/罐名/圆点一致；多实例互不干扰，卸载后停止所有任务。

## 使用示例

```tsx
import { SectionColorShift } from "./SectionColorShift";

export default function App() {
  return <SectionColorShift />;
}
```
