# 月度弦图 — ChordDiagram

一张 340×340 的团队消息弦图：六条彩色弧带沿圆周排开，每条弧的长度等于该团队发出的消息总量，弧与弧之间留 0.06 弧度的缝；弧与弧之间的 15 条弦带用二次贝塞尔收拢到圆心，弦的粗细就是那对团队之间的消息量，弦色取发得更多的一方。右侧顶部有 Last mo. / This mo. 两个胶囊页签，切过去整张图在 800ms 内插值重排；指针悬停某条弧或某条弦时，其余弦带降到 .07 不透明度，相关弦带提到 .8，圆弧提到满不透明，底部胶囊同步播报这组数据。入场时弧从零长到满圈，用 1100ms。

## 布局与材质

- 场景固定 340×340px，`responsive: false`，没有断点；容器窄于 340px 时整景按 `scale = min(1, 可用宽度 / 340)` 等比缩小，frame 宽度取 `max(340, 可用宽度)`。`options.height` 只改 surface 外框高度（写入 `--motion-height`），卡片本体仍为 340px。
- 卡片根 `.u391`：position relative，宽 340px、高 340px，圆角 30px，overflow hidden，背景 `var(--ux-surface)`，文字色 `var(--ux-ink)`，外圈 1px `var(--ux-line)` 描边加 `0 30px 60px -36px var(--ux-shadow-strong)` 阴影。
- 场景令牌用 `light-dark()` 给浅色与深色两套：surface `#FFFFFF`/`#13141C`，surface-2 `#F5F3EF`/`#1A1B25`，surface-3 `#EAE7E1`/`#252632`，ink `#16151B`/`#F4F0E8`，ink-2 `#57535F`/`rgba(244,240,232,.68)`，ink-3 `#8E8A97`/`rgba(244,240,232,.42)`，line `rgba(22,21,27,.09)`/`rgba(255,255,255,.08)`，line-2 `rgba(22,21,27,.17)`/`rgba(255,255,255,.16)`，accent `#6A57F2`/`#B7A4FF`，accent-2 `#2F8FE0`/`#7DB4FF`，accent-soft `rgba(106,87,242,.12)`/`rgba(183,164,255,.15)`，accent-ink `#FFFFFF`/`#0B0C12`，mint `#119C72`/`#7EE8C0`，warn `#D6731E`/`#FFB26B`，danger `#D93A55`/`#FF7D8C`，glass `rgba(255,255,255,.58)`/`rgba(255,255,255,.07)`，glass-line `rgba(255,255,255,.85)`/`rgba(255,255,255,.18)`，shadow `rgba(40,30,80,.14)`/`rgba(0,0,0,.45)`，shadow-strong `rgba(40,30,80,.3)`/`rgba(0,0,0,.72)`，渐变 `linear-gradient(120deg,#7B61FF,#3D8BFF 55%,#1FB89A)` / `linear-gradient(120deg,#B7A4FF,#7DB4FF 55%,#A5F2D3)`。
- 顶栏 `.u391-hd`：绝对定位 left 20px、right 16px、top 16px，flex、space-between、居中对齐，z-index 1。标题 `b` 字号 13.5px、字重 900、不换行，文案 `Team messages`。
- 页签组 `.u391-sg`：flex，内边距 3px，圆角 999px，背景 `var(--ux-surface-2)`，`box-shadow: inset 0 0 0 1px var(--ux-line)`，`role="group"`、`aria-label="Period"`。
- 页签按钮 `.u391-mo`：border 0，内边距 4px 10px，不换行，圆角 999px，背景 none，文字 `var(--ux-ink-2)`，font inherit 但字号 11px、字重 800，cursor pointer，过渡 `background .2s, color .2s`。选中态 `.is-on` 背景 `var(--ux-ink)`、文字 `var(--ux-surface)`。`:focus-visible` 为 2px accent 描边、偏移 2px。两个文案分别是 `Last mo.` 与 `This mo.`。
- 画布 `.u391-sv`：绝对定位 left 0、top 0，340×340 的内联 SVG，viewBox `0 0 340 340`，内含三组：`.u391-rbs` 弦带、`.u391-ars` 圆弧、`.u391-txs` 文字（整组 aria-hidden）。
- 弦带 `.u391-rb`：fill-opacity .55，描边 `var(--ux-surface)`、stroke-width .6，cursor pointer，过渡 fill-opacity .25s。
- 圆弧 `.u391-ar`：cursor pointer，过渡 opacity .25s。
- 标签 `.u391-tx`：字号 10.5px、字重 850、填充 `var(--ux-ink)`、pointer-events none。
- 悬停态（根节点加 `.is-f`）：所有弦带 fill-opacity 降到 .07，被点亮（`.is-hl`）的弦带回到 .8；所有圆弧 opacity 降到 .35，被点亮的圆弧回到 1。
- 底部信息胶囊 `.u391-in`：绝对定位 left 50%、bottom 12px，`translateX(-50%)`，内边距 6px 12px，圆角 999px，背景 `var(--ux-surface-2)`，`box-shadow: inset 0 0 0 1px var(--ux-line)`，字号 10.5px、字重 800、不换行，`font-variant-numeric: tabular-nums`，`aria-live="polite"`。
- 圆心 CX=170、CY=173，内弧半径 R0=91、外弧半径 R1=102，弧间缝隙 PAD=0.06 弧度。角度 0 指向 12 点方向，顺时针增长，点坐标为 `(CX + r·sin a, CY − r·cos a)`。
- 字体：除内联 SVG 的 `<text>` 外全部继承宿主页面字体栈。

## 数据

- 六个团队写死在引擎里，名称与颜色一一对应：Eng `#6366F1`、Design `#EC4899`、Product `#F59E0B`、Mktg `#10B981`、Sales `#0EA5E9`、Ops `#8B5CF6`。
- 两份 6×6 消息矩阵：行是发送方、列是接收方，对角线恒为 0，合计分别是上月 1422、本月 1582 条。
  - Last mo.（索引 0）：`[[0,60,70,15,10,80],[55,0,60,40,8,10],[80,50,0,45,50,25],[20,45,50,0,140,25],[12,10,40,130,0,85],[70,12,30,20,75,0]]`
  - This mo.（索引 1）：`[[0,120,90,20,15,60],[110,0,80,70,10,15],[95,85,0,60,40,30],[25,75,55,0,90,20],[10,12,45,95,0,70],[55,18,25,22,65,0]]`
- 组件自带两份矩阵，没有外部数据源；初始展示的是本月（索引 1）那一份。

## 操作和动效

- 布局算法：把所有数值求和得 tot，角宽系数 `k = (2π − n×PAD) / tot × grow`；沿圆周依次给每个团队的 5 条出向连线（发送方 i 到 (i+t) mod 6，t=1..5）分配弧长 `cur[i][j]×k`，该团队在圆周上占的区间就是它发出的总量；两个团队之间各留 PAD 的缝。弦带从发送方的那段弧起笔，用二次贝塞尔收向圆心，再从接收方的那段弧折回。
- 弦带颜色取发得更多的一方：`cur[i][j] >= cur[j][i]` 用 i 的颜色，否则用 j 的颜色。
- 入场生长：非减少动态且环境支持 IntersectionObserver 时，先以 grow=0 画一帧（弧长为零、标签透明度 0）；元素首次进入视口后，在 1100ms 内让 `grow` 按 `1 − (1 − k)³` 的三次缓出从 0 涨到 1，弧与弦随周长一起长开，标签透明度同步升起。若已开启减少动态或环境没有 IntersectionObserver，则 grow 直接为 1。
- 月份切换：点击页签时该按钮加 `.is-on`、其余移除，并写入 `aria-pressed`；随后启动 morph——从当前矩阵逐元素插值到目标矩阵，时长 800ms，缓动为手动实现的三次贝塞尔（前半段 `4k³`，后半段 `1 − (−2k+2)³/2`），每帧重算布局并重绘，因此弧长、弦宽与颜色归属一起平滑重排。morph 期间再次点击会取消上一段动画并从当前值重新插值。
- 悬停：指针进入某条圆弧时高亮该团队——它自己的弧与所有含它的弦带点亮；指针进入某条弦带时高亮那一对团队——两条弧与这条弦带点亮。移出即取消高亮。数据胶囊文案随之变化：悬停弧时为 `团队名 · sent N · received M`（N 是它发出的总量，M 是它收到的总量，取自当前插值矩阵并四舍五入）；悬停弦时为 `A → B 数量 · B → A 数量`；没有悬停时显示 `Hover an arc or a ribbon`。
- 没有自动轮播与循环。
- `prefers-reduced-motion`（或 `options.reducedMotion` 为真）：宿主属性 `data-reduced-motion="true"` 把所有 transition-duration 归零；同时引擎不做入场生长（grow 直接为 1）也不做月份插值（morph 的缓动系数直接取 1，图形瞬时切换）。该判定在挂载时读取一次。
- 无障碍：顶栏页签是原生 button，带 `aria-pressed`，`:focus-visible` 为 2px accent 描边、偏移 2px；信息胶囊 `aria-live="polite"`，悬停数据变化会被朗读；SVG 文字组整体 aria-hidden；弧与弦虽可被指针命中，但都是纯图形，没有各自的 role 或 aria-label。

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| height | number | 340 | 场景高度，逻辑像素；窄容器整景按比例缩小 |
| reducedMotion | boolean | 跟随系统 | 覆盖系统的减少动态偏好 |

## 独立实现与六框架交付

- 仅凭本文从零生成可运行的实现。尺寸、颜色、数据、文案、图形和运动算法均以上述文字为准；整张图用内联 SVG 绘制，不加载远程图片、字体、视频或素材。
- 当前交付重点为 React，组件名称 ChordDiagram。从零创建四个文件：ChordDiagram.tsx、ChordDiagramEngine.js、motion-runtime.ts、ChordDiagramEngine.d.ts；分别实现框架入口、完整交互核心、实例生命周期和类型声明。文件名是需要生成的产物，不假定接收者已经拥有任何文件。
- 同时提供 React、Vue、Svelte、Solid、Preact、Vanilla 原生生命周期入口，共享框架无关核心。DOM 仅在挂载后访问，支持同页多实例；更新时保持状态，销毁时清理动画、计时器、观察器及监听器。不要用 iframe 代替组件实现。
- 依赖安装说明：npm install react react-dom。若使用依赖，只使用其公开 API；组件的布局、样式、图形和算法必须在本次生成的文件中完整实现，不引用现成效果组件。
- 实现 options.height 以调整场景高度，options.reducedMotion 覆盖系统偏好；减少动态效果仍保留完整的两套数据与切换能力。
- 给出每个文件的完整内容、安装和运行步骤、以下使用示例所需的全部实现。不得留省略号、待补素材或“自行补齐核心”的占位。
- 验收：375 / 768 / 1440px 无横向溢出；弧长与弦宽按数据正确排布；入场生长、月份切换、悬停高亮都正确；浅色深色两套令牌正确；多实例互不干扰，卸载后停止所有任务。

## 使用示例

```tsx
import { ChordDiagram } from "./ChordDiagram";

export default function App() {
  return <ChordDiagram />;
}
```
