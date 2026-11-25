# 锁孔穿越 — KeyholeZoom

制作「锁孔穿越」场景：一张 340×330 的夜色卡片。初始是一扇盖满全屏的木门，门板上用 fill-rule 镂出一个锁孔形（圆孔加下展梯形），透过锁孔能看见门后的夜——月亮、星星和远山。内部隐藏一条 1000px 的滚动轨道：往下滚动时锁孔以平方缓动不断放大（最终放大到 25 倍），孔越撑越大，门板随之模糊后退并在最后三成行程淡出，露出完整的星空展讯画面——「The night beyond the door / Winter exhibition 2026」大标题在最后 35% 行程从下方 20px 处浮入。全程可逆。

## 布局与材质

- 340×330px 场景卡，圆角 28px，溢出裁切。场景根是 340×330 的无底色包装层（水平居中），卡片视觉放在其内部的绝对填充层上——文档演示舞台会剥离场景根的背景，卡片底色必须在嵌套层上才能保留。容器窄于 340px 时整景等比缩小（缩放比 = min(1, 可用宽/340)，上限 1）。
- 外圈 1px 描边取令牌 --ux-line（浅 rgba(22,21,27,.09) / 深 rgba(255,255,255,.08)），投影 0 30px 60px -36px 取 --ux-shadow-strong（浅 rgba(40,30,80,.3) / 深 rgba(0,0,0,.72)）。画面颜色全部写死为夜景色板，不随深色模式翻转。
- 滚动容器 absolute inset 0、overflow-y auto、滚动条隐藏、tabindex=0、aria-label「Exhibition intro, scroll to enter」；内部滚动轨道高 1000px（可滚动行程 = 1000 − 330 = 670px）。
- sticky 舞台：top 0、高 330px、overflow hidden，底色为夜空径向渐变 radial-gradient(80% 60% at 50% 100%, #3B2C7A, #0B0B24 70%)（地平线附近偏紫、天顶深蓝黑）。
- 月亮：absolute 右 70px、上 60px，46×46px 正圆，底色 #FFF3C4，辉光 box-shadow 0 0 30px #FFE58A。
- 星星：JS 生成 26 枚 span，各 3×3px 白色圆点，随机撒在横向 0–100%、纵向 0–60% 的天区，各自带 0–2s 随机延时的 u340-tw 动画（2s ease-in-out infinite alternate，透明度从 .25 到 1 往复）闪烁；全部 aria-hidden。
- 远山：absolute 左右各外扩 20px、底部下沉 40px、高 120px、圆角 50% 50% 0 0 的椭圆弧，底色 #151135，压在地平线上。
- 门板：一张铺满 340×330 的 SVG（viewBox 0 0 340 330），单条 path 填充 #8C5A3C 木色、fill-rule evenodd——外框矩形（M-400 -400 H740 V730 H-400 Z，大于场景保证盖满）减去锁孔形；锁孔初始几何（k=1）为：圆孔圆心 (170,140)、半径 22px，梯形上沿半宽 9px（在圆心下方 13.2px 处，即 r×0.6）、下沿半宽 20px、再往下延伸 52px；k 由滚动驱动（见动效），每帧按新 k 重算整条 path 的 d 并以 setAttribute 写回同一节点，不重建 DOM。门板整体 filter blur(var(--bl,0px))、opacity var(--do,1)。
- 展讯标题块：absolute 左右贴满、top 120px、居中、白色；主标 b「The night beyond the door」30px/字重 880/字距 -.04em 独占一行，副标 span「Winter exhibition 2026」12.5px/字重 700、透明度 .75；整块透明度由 --o 控制，初始 0，位移 (1−o)×20px。
- 引导文案：absolute 底部 18px 居中，12px/字重 800、色 #FFE8CC，内容「Scroll down to peek inside」，透明度由 --ho 控制、初始 1；它在 DOM 序上位于门板之后，始终压在门板之上、滚动初期即可读。不加载远程字体。

## 数据

- 文案写死：主标「The night beyond the door」、副标「Winter exhibition 2026」、引导「Scroll down to peek inside」。
- 26 颗星星的位置与闪烁延时由 Math.random 在挂载时生成（每实例不同）；锁孔几何、月亮、远山均按上述固定参数绘制。

## 操作和动效

- 唯一驱动是滚动容器内的用户滚动；scroll 监听 passive，回调用 requestAnimationFrame 合帧；初始执行一次对齐。全部插值可逆，上滚原路退回门后视角。
- 进度 p = scrollTop ÷ 可滚动行程（上限夹 1）；缓动 e = p²（平方曲线，孔先慢后快地撑开）。
- 锁孔缩放：k = 1 + e×24，即锁孔整体尺寸从 1 倍放大到 25 倍——圆孔半径 22 → 528（远超 340×330 画面，等效全屏穿越），梯形与孔深同步放大（下沿半宽 9 → 225、孔深 52 → 1248）；平方缓动让前半行程（p=0.5）只放大到 7 倍，后段才加速撑满。
- 门板退化：模糊 blur 从 0 增到 6px（p×6）；透明度在 p ≤ 0.7 时保持 1，0.7–1 区间线性淡出到 0（门整个消失）。
- 展讯浮现：标题透明度在 p 0.65–1 区间从 0 升到 1，同时从下方 (1−o)×20px 处浮上归位。标题在 DOM 序上位于门板 SVG 之前，被门板完全盖住，门板淡出（锁孔已撑满全屏）时才显露，两者衔接自然。
- 引导淡出：引导文案透明度 = max(0, 1 − p×5)，即滚动前 20% 行程内消失。
- 无自动播放、无循环（星星闪烁除外，为常驻氛围动画）；其余状态由滚动位置唯一决定。
- 键盘与无障碍：滚动容器 tabindex=0、聚焦后方向键翻滚；门板 SVG、月亮、星星、远山、引导文案均 aria-hidden，辅助技术读到的是滚动容器的 aria-label 说明。
- prefers-reduced-motion: reduce（或 options.reducedMotion=true）下：星星闪烁动画被运行时压为静态（动画时长归零）；缩放与淡入淡出本身由用户滚动驱动、无自主动画，逐帧即时呈现。
- options.height 调整场景高度（默认 330）；options.reducedMotion 覆盖系统偏好；更新选项就地合并、不重挂载；卸载时取消帧回调、解绑监听。样式在 Shadow DOM 内，同页多实例互不干扰。

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| height | number | 330 | 场景高度，逻辑像素；窄容器整景按比例缩小 |
| reducedMotion | boolean | 跟随系统 | 覆盖系统的减少动态偏好 |

## 独立实现与六框架交付

- 仅凭本文从零生成可运行的实现。尺寸、颜色、文案、图形和运动算法均以上述文字为准；门板与锁孔用内联 SVG path 镂空绘制，其余用 DOM 与 CSS，不加载远程图片、字体、视频或素材。
- 当前交付重点为 React，组件名称 KeyholeZoom。从零创建四个文件：KeyholeZoom.tsx、KeyholeZoomEngine.js、motion-runtime.ts、KeyholeZoomEngine.d.ts；分别实现框架入口、完整交互核心、实例生命周期和类型声明。文件名是需要生成的产物，不假定接收者已经拥有任何文件。
- 同时提供 React、Vue、Svelte、Solid、Preact、Vanilla 原生生命周期入口，共享框架无关核心。DOM 仅在挂载后访问，支持同页多实例；更新时保持状态，销毁时清理动画、计时器、观察器及监听器。不要用 iframe 代替组件实现。
- 依赖安装说明：npm install react react-dom。若使用依赖，只使用其公开 API；组件的布局、样式、图形和算法必须在本次生成的文件中完整实现，不引用现成效果组件。
- 实现 options.height 以调整场景高度，options.reducedMotion 覆盖系统偏好；滚动浏览在减少动态下仍完整可用。
- 给出每个文件的完整内容、安装和运行步骤、以下使用示例所需的全部实现。不得留省略号、待补素材或「自行补齐核心」的占位。
- 验收：375 / 768 / 1440px 无横向溢出；锁孔放大、门虚化淡出、展讯浮现随滚动可逆；星星闪烁正常且减少动态下静止；多实例互不干扰，卸载后停止所有任务。

## 使用示例

```tsx
import { KeyholeZoom } from "./KeyholeZoom";

export default function App() {
  return <KeyholeZoom />;
}
```
