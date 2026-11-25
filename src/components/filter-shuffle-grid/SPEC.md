# 筛选重排画廊 — FilterShuffleGrid

制作一张 340×350 的画廊筛选场景。顶部是一排胶囊按钮 All / Circle / Square / Triangle，按下的一枚为墨色底；下面一行小字显示当前可见数量（"12 showing"）；再下面是一块 4 列 × 3 行、共 12 枚彩色瓷砖，每枚 68×68px、16px 圆角，底色各不相同，中心是一枚 30×30px 的白色半透明几何图形——圆、方或三角。切换分类时：不匹配的瓷砖在原位缩小并淡出，匹配的瓷砖依次滑向前面补位；从 All 切到某个具体形状时，重新出现的瓷砖先以 scale(0) 落在新位置再弹开。计数文字与按钮高亮同步更新。

## 布局与材质

- 340×350px 场景卡，圆角 28px，overflow 裁切；整体为纵向 flex 布局，内边距 16px；底色为表面色纯色，外圈 `0 0 0 1px` 线色描边，下方 `0 30px 60px -36px` 强阴影。
- 筛选行 flex、间距 5px、允许换行（flex-wrap），带 `role="group"` 与无障碍名 "Shape filter"。每枚胶囊高 32px、内边距 0 12px、无边框、999px 圆角、表面色 2 号底、12.5px / 750、次级墨色，底色与字色各 0.25s 过渡；按下态（`aria-pressed="true"`）改为墨色底、字色取页面底色令牌（浅色 #FFFFFF，深色 #0B0C12）。
- 计数行上外边距 8px、11.5px / 700、三级墨色、等宽数字，文案形如 "12 showing"。
- 网格区相对定位、flex 1、上外边距 8px。瓷砖绝对定位 left 0 / top 0、68×68px、16px 圆角、grid 居中，底色取各自的 `--bg` 变量，过渡 transform 0.6s cubic-bezier(.3,1.25,.4,1) 与 opacity 0.35s。内含 30×30px 的 SVG，填充 rgba(255,255,255,.9)：圆形 `circle cx=15 cy=15 r=12`，方形 `rect x=4 y=4 w=22 h=22 rx=4`，三角 `path M15 3 l13 23 H2 z`。每枚瓷砖带 `role="img"` 与形状名作为无障碍名；被隐藏的瓷砖加 `aria-hidden="true"`。
- 场景令牌用 CSS `light-dark()` 随 `color-scheme` 切换，浅色 / 深色两套：页面底色 #FFFFFF / #0B0C12，表面 #FFFFFF / #13141C，表面 2 #F5F3EF / #1A1B25，表面 3 #EAE7E1 / #252632，墨色 #16151B / #F4F0E8，次级墨色 #57535F / rgba(244,240,232,.68)，三级墨色 #8E8A97 / rgba(244,240,232,.42)，线色 rgba(22,21,27,.09) / rgba(255,255,255,.08)，强线 rgba(22,21,27,.17) / rgba(255,255,255,.16)，主色 #6A57F2 / #B7A4FF，主色 2 #2F8FE0 / #7DB4FF，主色淡底 rgba(106,87,242,.12) / rgba(183,164,255,.15)，主色字 #FFFFFF / #0B0C12，薄荷 #119C72 / #7EE8C0，警告 #D6731E / #FFB26B，危险 #D93A55 / #FF7D8C，玻璃 rgba(255,255,255,.58) / rgba(255,255,255,.07)，玻璃线 rgba(255,255,255,.85) / rgba(255,255,255,.18)，阴影 rgba(40,30,80,.14) / rgba(0,0,0,.45)，强阴影 rgba(40,30,80,.3) / rgba(0,0,0,.72)。十二枚瓷砖的底色是固定值，不随深色令牌变化：#FF8787、#FFA94D、#FFD43B、#69DB7C、#38D9A9、#4DABF7、#748FFC、#DA77F2、#F783AC、#A9E34B、#3BC9DB、#9775FA；组件不声明字体族，继承宿主页面字体。
- 组件只有 `@media (prefers-reduced-motion: reduce)` 这一个可声明的降级点；场景是固定 340px 宽的等比缩放画布，容器变窄时整景按 `min(1, 可用宽/340)` 缩小，网格内部用绝对定位，不做响应式重排。

## 数据

- 四个分类，顺序固定："All"、"Circle"、"Square"、"Triangle"，All 表示不限形状。
- 12 枚瓷砖的形状序列固定为：Circle、Square、Triangle、Circle、Triangle、Square、Square、Circle、Triangle、Circle、Square、Triangle——即每种形状各 4 枚。
- 12 枚瓷砖的底色按序号固定分配（与形状无关）：#FF8787、#FFA94D、#FFD43B、#69DB7C、#38D9A9、#4DABF7、#748FFC、#DA77F2、#F783AC、#A9E34B、#3BC9DB、#9775FA。
- 初始状态下 12 枚瓷砖全部可见，计数为 "12 showing"，按下的是 All。
- 网格为 4 列布局，列距 76px（68px 瓷砖 + 8px 间隔）；第 i 枚瓷砖的初始位置为 x = (i % 4) × 76、y = floor(i / 4) × 76，即 4 列 3 行。
- 形状 SVG 三种：圆形 `circle cx=15 cy=15 r=12`、方形 `rect x=4 y=4 width=22 height=22 rx=4`、三角 `path d="M15 3l13 23H2z"`，viewBox 0 0 30 30。

## 操作和动效

- 点任一枚分类胶囊（点当前已选中的那一枚不做任何事）：切换当前分类，被按下的胶囊 `aria-pressed` 变为 true、其余为 false，按钮底色与字色 0.25s 过渡。
- 筛选过程按「重新排布」执行——先从前往后给每枚仍要显示的瓷砖分配新的槽位号，新槽位按 4 列 76px 步进从左上角开始：
  - 留下的瓷砖解除消失态，transform 改为新槽位坐标，位置过渡 0.6s cubic-bezier(.3,1.25,.4,1)，每枚按新序号附加 35ms 的延迟，形成依次滑到位的效果。
  - 从某个具体分类回到 All 时，原本隐藏的瓷砖会先以「无过渡 + 新坐标 + scale(0)」落位，强制回流后恢复过渡，再把 scale 归 1，形成在目标位置弹开的观感。
  - 要隐藏的瓷砖保持当前坐标不变，在其上追加 scale(.2)，同时透明度归 0（0.35s），过渡延迟清零；并被标记为 `aria-hidden`。
- 每次筛选结束后计数行更新为「<可见数量> showing」：All 为 12 showing，任一具体形状为 4 showing。
- 无障碍：筛选行是 `role="group"`，无障碍名 "Shape filter"；每枚胶囊是原生按钮并带 `aria-pressed`；每枚瓷砖是 `role="img"`、无障碍名为对应形状名，隐藏时追加 `aria-hidden="true"`；计数行带 `aria-live="polite"`，数量变化会被读屏播报。
- `prefers-reduced-motion: reduce`（或 `options.reducedMotion` 为真）时，位移、缩放与淡出过渡关闭，瓷砖直接就位或直接消失；功能与最终画面完全保留。
- 支持同页多实例：查询限定在各自 ShadowRoot 内，不使用全局 id；卸载时清理计时器、事件监听与观察器。

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| height | number | 350 | 场景高度，逻辑像素；窄容器整景按比例缩小 |
| reducedMotion | boolean | 跟随系统 | 覆盖系统的减少动态偏好 |

## 独立实现与六框架交付

- 仅凭本文从零生成可运行的实现。尺寸、颜色、文案、图形和运动算法均以上述文字为准；所有装饰用 CSS 与内联 SVG 绘制，不加载远程图片、字体、视频或素材。
- 当前交付重点为 React，组件名称 FilterShuffleGrid。从零创建四个文件：FilterShuffleGrid.tsx、FilterShuffleGridEngine.js、motion-runtime.ts、FilterShuffleGridEngine.d.ts；分别实现框架入口、完整交互核心、实例生命周期和类型声明。文件名是需要生成的产物，不假定接收者已经拥有任何文件。
- 同时提供 React、Vue、Svelte、Solid、Preact、Vanilla 原生生命周期入口，共享框架无关核心。DOM 仅在挂载后访问，支持同页多实例；更新时保持状态，销毁时清理动画、计时器、观察器及监听器。不要用 iframe 代替组件实现。
- 依赖安装说明：npm install react react-dom。若使用依赖，只使用其公开 API；组件的布局、样式、图形和算法必须在本次生成的文件中完整实现，不引用现成效果组件。
- 实现 options.height 以调整场景高度，options.reducedMotion 覆盖系统偏好；减少动态效果仍保留完整流程状态。
- 给出每个文件的完整内容、安装和运行步骤、以下使用示例所需的全部实现。不得留省略号、待补素材或"自行补齐核心"的占位。
- 验收：375 / 768 / 1440px 无横向溢出；四个分类的筛选、消失、补位、弹回与计数都正确；浅色深色两套令牌正确；多实例互不干扰，卸载后停止所有任务。

## 使用示例

```tsx
import { FilterShuffleGrid } from "./FilterShuffleGrid";

export default function App() {
  return <FilterShuffleGrid />;
}
