# 降临节日历 — AdventDoors

制作「降临节日历」场景：一块 340×340 的冬夜卡片，深蓝夜空底上飘着两层细雪，标题「Little doors of December」下方以 4 列 × 3 行排着 12 扇编号小门。场景把「今天」写死为 12 月 7 日：1–7 号的门可以点开，门绕左铰链翻开 -112°，露出格子里的礼物图标与礼物名，底部胶囊同步报出礼物名，右上角计数同步减少；8–12 号的门带着小锁，点击只会左右摇头并提示还差几天。

## 布局与材质

- 场景 340×340px，圆角 30px，溢出裁切。底色固定为夜空渐变 linear-gradient(170deg, #1B3A5C, #0E2238)，不随浅色/深色主题变化；文字基色 #F1F7FF；外圈 1px 线色描边（box-shadow 0 0 0 1px var(--ux-line)）加 0 30px 60px -36px 强阴影。场景根是无底色包装层，视觉卡片放在其内部的绝对填充层上（文档演示舞台会剥离场景根背景，卡片底色必须在嵌套层上才能保留）。
- 雪用两层 CSS radial-gradient 点阵绘制：第一层白色 70% 透明度的 1px 圆点、平铺周期 60×60px；第二层 45% 透明度的 1px 圆点、周期 37×37px；整层跑 u364-snow 关键帧，9s linear 无限循环，背景位移终点为 (20px, 60px) 与 (-10px, 74px)，形成缓慢斜落的雪。雪层 pointer-events: none 且 aria-hidden。
- 头部绝对定位 left/right 20px、top 16px，两端对齐：左侧标题 12.5px/字重 850「Little doors of December」；右侧剩余计数 11px、色 #A5D8FF、tabular-nums，aria-live="polite"，初始文案「7 doors left」。
- 门格网格绝对定位 left/right 18px、top 44px、bottom 44px：grid 4 列 × 3 行、间距 8px，容器带 perspective 700px 供 3D 翻门使用。
- 每个格子（门背后的格子）圆角 10px、底色 #FFF9DB、内阴影 inset 0 3px 8px rgba(0,0,0,.25)，内容纵向居中、间距 2px：上为 30×30px 的内联 SVG 图标（viewBox 32×32，12 枚与礼物一一对应：热可可杯、黄色五角星 #FCC419、三只橘子 #FD7E14/#FF922B/#F76707、红白礼物、饼干盒、雪人挂饰、蜡烛、明信片、蓝袜、拐杖糖、绿树、礼盒），下为礼物名 8.5px/字重 800、色 #7A4E2D、行高 1.15、左右内边距 3px。
- 门本身是格内绝对填充的原生 button：圆角 10px，编号 20px/字重 900 白字，带 0 2px 0 rgba(0,0,0,.2) 文字阴影与内嵌 2px rgba(255,255,255,.25) 白圈；底色为 145° 线性渐变，从六色循环 ['#E03131','#2B8A3E','#1971C2','#C2255C','#E8590C','#5F3DC4'] 取第 i 个到第 (i+2)%6 个；右缘中央一枚 5×5px 的 #FFD43B 圆点门钮（right 7px、垂直居中）；transform-origin 为左缘中点（0 50%），backface-visibility hidden。
- 锁定门（8–12 号）：cursor not-allowed，右上角 (right 6px, top 6px) 画一把 10×8px、圆角 2px 的 rgba(255,255,255,.8) 锁体，用 0 -5px 0 -2px 的同色阴影勾出锁梁。
- 底部提示胶囊：绝对定位 left/right 18px、bottom 12px、高 24px，圆角 999px，背景 rgba(255,255,255,.1)，文字 11.5px/字重 750，默认 opacity 0 且 translateY(6px)，显示时过渡 opacity .25s、transform .35s cubic-bezier(.3,1.5,.5,1)，aria-live="polite"。
- 不声明字体栈，继承宿主页面字体。场景令牌（--ux-surface/--ux-ink/--ux-accent 等）带浅色与深色两套 light-dark 定义，但卡片视觉全部使用上述固定色值，两种主题下外观一致。
- 组件固定 340px 逻辑宽度、responsive 关闭：容器窄于 340px 时整景按 min(1, 容器宽/340) 等比缩放，高度同步压缩，不产生横向溢出。

## 数据

- 写死 12 条门内容（编号 1–12 依次为）：Hot cocoa、Glitter stickers、Three tangerines、Wool mittens、A box of cookies、Snowman keyring、A candle、A postcard、A pair of socks、A candy cane、A tiny tree、A gift box。
- 写死「今天 = 7 号」：1–7 号可开，8–12 号锁定；剩余计数初始为 7；门面渐变六色与 12 枚图标按索引写死。无外部数据来源。

## 操作和动效

- 点击可开的关闭门：门加 is-open，绕左铰链 rotateY(-112deg)，过渡 transform .7s cubic-bezier(.3,1.25,.5,1)；门面翻走后露出格子里的图标与礼物名；按钮 aria-expanded 置 true，剩余计数减一并更新「N doors left」，底部胶囊显示礼物名，1.8s 后自动收起。已开的门再次点击无动作（开门是单向的，不能再关上）。
- 点击锁定门：门重放 0.45s 摇头动画（关键帧 20%/60% rotate(-4deg)、40%/80% rotate(4deg)），胶囊显示「Not yet · N days to go」（N = 门号 − 7），同样 1.8s 后收起。
- 雪常驻循环飘落，不依赖任何交互。
- 键盘与无障碍：每扇门是原生 button，Enter/Space 可触发；focus-visible 时 2px #FFD43B 外圈、偏移 2px；aria-label 为「N door, open」或「N door, still locked」；计数与提示胶囊均为 aria-live="polite"；雪层与图标 aria-hidden。
- `prefers-reduced-motion: reduce`（或 options.reducedMotion 为 true）下：雪层动画、门的翻转过渡与摇头动画全部关闭——门瞬时切换到翻开状态、雪静止，计数、提示与锁定行为完整保留。
- options.height 调整场景高度（默认 340）；options.reducedMotion 覆盖系统偏好。支持同页多实例，更新选项不重挂载；卸载时释放帧回调、计时器与监听器。

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| height | number | 340 | 场景高度，逻辑像素；窄容器整景按比例缩小 |
| reducedMotion | boolean | 跟随系统 | 覆盖系统的减少动态偏好 |

## 独立实现与六框架交付

- 仅凭本文从零生成可运行的实现。尺寸、颜色、文案、图形和运动参数均以上述文字为准；雪与门全部用 CSS 与内联 SVG 绘制，不加载远程图片、字体、视频或素材。
- 当前交付重点为 React，组件名称 AdventDoors。从零创建四个文件：AdventDoors.tsx、AdventDoorsEngine.js、motion-runtime.ts、AdventDoorsEngine.d.ts；分别实现框架入口、完整交互核心、实例生命周期和类型声明。文件名是需要生成的产物，不假定接收者已经拥有任何文件。
- 同时提供 React、Vue、Svelte、Solid、Preact、Vanilla 原生生命周期入口，共享框架无关核心。DOM 仅在挂载后访问，支持同页多实例；更新时保持状态，销毁时清理动画、计时器、观察器及监听器。不要用 iframe 代替组件实现。
- 依赖安装说明：npm install react react-dom。若使用依赖，只使用其公开 API；组件的布局、样式、图形和算法必须在本次生成的文件中完整实现，不引用现成效果组件。
- 实现 options.height 以调整场景高度，options.reducedMotion 覆盖系统偏好；减少动态下仍保留完整的开门、计数与锁定状态。
- 给出每个文件的完整内容、安装和运行步骤、以下使用示例所需的全部实现。不得留省略号、待补素材或"自行补齐核心"的占位。
- 验收：375 / 768 / 1440px 无横向溢出；开门、重复点击已开门、点击锁定门均有正确反馈；浅色深色两套令牌正确；多实例互不干扰，卸载后停止所有任务。

## 使用示例

```tsx
import { AdventDoors } from "./AdventDoors";

export default function App() {
  return <AdventDoors />;
}
```
