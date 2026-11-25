# 滚动行程路线 — ScrollDrawRoute

300×500 的可滚动行程场景。顶部是粘性页头，写着 "Autumn Asia loop" 与副题 "5 cities · 14 days"；下方是一张 1180px 高的路线长图，图上画着一条虚线导轨和一条实心紫线，五个站点用空心圆点标出，每个站点旁有一张小卡片写着城市与日期。向下滚动时，紫色实线像被笔尖描出来一样按滚动进度生长，一枚深色小飞机沿线路头滑行并按切线方向转身；飞机经过某个站点时，该站点的圆点由灰转紫、圆心冒出一颗实心紫点，站点卡片同时淡入。

## 布局与材质

- 场景 300×500px，圆角 30px，overflow hidden，底色 --ux-surface。外圈 1px 线色描边加 0 30px 60px -36px 的强阴影。
- 滚动容器铺满场景（position absolute inset 0，overflow-y auto，滚动条隐藏：scrollbar-width none 并隐藏 webkit 滚动条），容器 outline none，tabindex 0，aria-label "Travel route, scroll to follow"，因此键盘用户可用方向键、Page Up/Down 滚动。
- 页头 position sticky、top 0、z-index 3，内边距 18px 20px 14px，背景是一层 linear-gradient(var(--ux-surface) 70%, transparent) 的渐隐遮罩。标题 b 为 20px/880、字距 -0.03em；副题 span 为 12.5px/700、色 --ux-ink-3，文案 "5 cities · 14 days"。
- 路线图容器 position relative、高 1180px、margin-top -30px（顶到页头下方），内部 SVG 绝对铺满、overflow visible，viewBox 0 0 300 1180。
- 线路有两条同源的 path：导轨 path 无填充、描边 --ux-line-2、宽 3、虚线节奏 2 8、圆头；路线 path 无填充、描边 --ux-accent、宽 4、圆头。线路形状由五个站点坐标生成：先从第一站出发，每两站之间用一段三次贝塞尔连接，控制点取两站纵坐标的中点，即 M70 120 → C… 220 340 → C… 80 560 → C… 215 790 → C… 110 1040。
- 站点标记由两个同心圆组成：外圈半径 10，填充 --ux-surface、描边 --ux-line-2、宽 3、过渡 stroke .3s，经过后描边变 --ux-accent；内圈半径 5，填充 --ux-accent，transform-box fill-box、变换原点居中，初始 scale(0)，过渡 transform .45s cubic-bezier(.34,1.56,.64,1)，经过后 scale(1)。
- 飞机是一枚实心深色小箭头 path M12 0L-8 -8L-4 0L-8 8z，填充 --ux-ink，用 transform translate + rotate 摆位。
- 站点卡片 position absolute、宽 132px、内边距 10px 12px、圆角 14px、底色 --ux-surface、阴影 0 0 0 1px var(--ux-line) 加 0 12px 24px -14px var(--ux-shadow-strong)；初始 opacity 0、transform translateY(10px) scale(.9)，过渡 opacity .35s 与 transform .5s cubic-bezier(.34,1.56,.64,1)；到位后 opacity 1、transform none。卡片标题 b 为 15px/850，副文 span 为 11.5px/700、色 --ux-ink-3。卡片贴着站点摆放：纵向 top = 站点 y − 22，横向站点 x 大于 150 时贴左侧 left = x − 160，否则贴右侧 left = x + 22。
- 场景令牌为浅深两套（light-dark()，由宿主页面的 color-scheme 决定，未声明时取浅色）：--ux-spring cubic-bezier(.34,1.56,.64,1)、--ux-surface #FFFFFF/#13141C、--ux-surface-2 #F5F3EF/#1A1B25、--ux-surface-3 #EAE7E1/#252632、--ux-ink #16151B/#F4F0E8、--ux-ink-2 #57535F/rgba(244,240,232,.68)、--ux-ink-3 #8E8A97/rgba(244,240,232,.42)、--ux-line rgba(22,21,27,.09)/rgba(255,255,255,.08)、--ux-line-2 rgba(22,21,27,.17)/rgba(255,255,255,.16)、--ux-accent #6A57F2/#B7A4FF、--ux-accent-2 #2F8FE0/#7DB4FF、--ux-accent-soft、--ux-accent-ink、--ux-mint #119C72/#7EE8C0、--ux-warn #D6731E/#FFB26B、--ux-danger #D93A55/#FF7D8C、--ux-glass、--ux-glass-line、--ux-shadow、--ux-shadow-strong、--ux-grad。
- 响应式：场景按 300×500 逻辑像素排版，容器比 300px 窄时整景等比缩小；内部滚动区域随缩放保持比例。

## 数据

- 五个站点写死：Seoul（Depart 10.03）、Tokyo（10.05 · 2 nights）、Taipei（10.08 · 3 nights）、Bangkok（10.12 · 4 nights）、Bali（Arrive 10.16）。
- 五个站点的图上坐标写死：(70,120)、(220,340)、(80,560)、(215,790)、(110,1040)，画布坐标系为 300×1180。
- 页头标题 "Autumn Asia loop" 与副题 "5 cities · 14 days" 写死。无外部数据源。

## 操作和动效

- 滚动即驱动：监听滚动容器 scroll 事件（passive），用 requestAnimationFrame 合并成每帧最多一次的重绘。读取位置 y = 滚动量 + 视口高度的 55% − 路线图上边距 + 30px，即"飞机读数线"落在视口偏上一点。
- 长度查表：挂载时把整条线路按 201 份采样，记录每个采样点的纵坐标与对应的弧长，因此可以由纵坐标反查弧长（线性插值，超出两端时取 0 或全长）。每个站点也预先记住自己对应的弧长。
- 描画：把线路 path 的 stroke-dasharray 设成 "全长 全长"，再用 stroke-dashoffset = 全长 − 当前弧长，让紫线按弧长逐段显现；offset 保留 1 位小数。
- 飞机：取当前弧长处的路径点 p，再取前进 2px 处的点 q，用 atan2(q − p) 换算成角度（度），把飞机 transform 写成 translate(p.x, p.y) rotate(角度)，于是机头始终指向行进方向；坐标保留 1 位小数。
- 站点到位判定：当前弧长 ≥ 该站弧长 − 2px 时，认为飞机已越过（带一点提前量），给该站的外圈圆点、内圈圆点和卡片都加上 .on；圆点描边 0.3s 内转紫，内圈 0.45s 内弹到 scale(1)，卡片 0.35s 淡入并放大到位。整个过程完全可逆：向上滚回去，弧长缩短，圆点与卡片会跟着退回未点亮的状态。
- 初始状态：进入时按未滚动的位置绘制一次，线路基本未显现。
- 减少动态（系统 prefers-reduced-motion: reduce，或 options.reducedMotion 覆盖为 true）：所有过渡（卡片淡入放大、圆点变色、内圈弹入）都被关掉，改为瞬时到位；描画与飞机位置仍随滚动实时更新，不做补间动画。
- 键盘操作：滚动容器可聚焦（tabindex 0），方向键与翻页键可滚动，从而驱动同样的描画与站点点亮；aria-label 说明这是可滚动的行程路线。
- 无障碍：SVG 整体 aria-hidden，路线与飞机不进入朗读顺序；信息以站点卡片的真实文本呈现（城市名与日期），容器带说明性 aria-label。

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| height | number | 500 | 场景高度，逻辑像素；窄容器整景按比例缩小 |
| reducedMotion | boolean | 跟随系统 | 覆盖系统的减少动态偏好 |

## 独立实现与六框架交付

- 仅凭本文从零生成可运行的实现。尺寸、颜色、文案、图形和运动算法均以上述文字为准；路线、站点与飞机用内联 SVG 绘制，滚动插值自行实现，不加载远程图片、字体、视频或素材。
- 当前交付重点为 React，组件名称 ScrollDrawRoute。从零创建四个文件：ScrollDrawRoute.tsx、ScrollDrawRouteEngine.js、motion-runtime.ts、ScrollDrawRouteEngine.d.ts；分别实现框架入口、完整交互核心、实例生命周期和类型声明。文件名是需要生成的产物，不假定接收者已经拥有任何文件。
- 同时提供 React、Vue、Svelte、Solid、Preact、Vanilla 原生生命周期入口，共享框架无关核心。DOM 仅在挂载后访问，支持同页多实例；更新时保持状态，销毁时清理动画、计时器、观察器及监听器。不要用 iframe 代替组件实现。
- 依赖安装说明：npm install react react-dom。若使用依赖，只使用其公开 API；组件的布局、样式、图形和算法必须在本次生成的文件中完整实现，不引用现成效果组件。
- 实现 options.height 以调整场景高度，options.reducedMotion 覆盖系统偏好；减少动态效果仍保留完整的描画进度与站点点亮状态。
- 给出每个文件的完整内容、安装和运行步骤、以下使用示例所需的全部实现。不得留省略号、待补素材或"自行补齐核心"的占位。
- 验收：375 / 768 / 1440px 无横向溢出；描画进度、飞机朝向、站点点亮正确且可逆；浅色深色两套令牌正确；多实例互不干扰，卸载后停止所有任务。

## 使用示例

```tsx
import { ScrollDrawRoute } from "./ScrollDrawRoute";

export default function App() {
  return <ScrollDrawRoute />;
}
```
