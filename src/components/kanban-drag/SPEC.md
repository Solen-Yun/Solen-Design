# 拖拽看板卡片 — KanbanDrag

340×340 的三列看板：To do / In progress / Done，每列头部有一枚 7px 的彩色圆点、列名和右侧的计数胶囊，列里排着带彩色标签的卡片。按住卡片拖起来，卡片浮到场景上层并顺时针倾斜 3°、放大 4%，原位留下一块虚线描边的缺口；把指针移到另一列，该列底色泛紫并换 1.5px 紫色内描边，列内卡片实时让出缺口（按指针相对卡片中线的高度决定插入前后），松手后卡片以 0.28s 平滑滑进缺口并归位，两列计数胶囊弹一下。键盘等价：卡片可聚焦，聚焦后按左右方向键把卡片搬到相邻列的顶部。

## 布局与材质

- 场景根 340×340px，圆角 30px，overflow hidden，底色为次表面色，外圈 1px 线色描边加 `0 30px 60px -36px` 强阴影，文字墨色，并设置 `touch-action:none` 与 `user-select:none`（保证触摸拖拽与不被选中文本打断）。场景令牌用 `light-dark()` 写两套，浅色：表面 #FFFFFF、次表面 #F5F3EF、三级表面 #EAE7E1、墨色 #16151B、次墨 #57535F、三级墨 #8E8A97、线 rgba(22,21,27,.09)、强线 rgba(22,21,27,.17)、强调 #6A57F2、强调二 #2F8FE0、强调浅底 rgba(106,87,242,.12)、强调字 #FFFFFF、薄荷 #119C72、警示 #D6731E、危险 #D93A55、玻璃 rgba(255,255,255,.58)、玻璃线 rgba(255,255,255,.85)、投影 rgba(40,30,80,.14)、强投影 rgba(40,30,80,.3)、渐变 linear-gradient(120deg,#7B61FF,#3D8BFF 55%,#1FB89A)；深色：表面 #13141C、次表面 #1A1B25、三级表面 #252632、墨色 #F4F0E8、次墨 rgba(244,240,232,.68)、三级墨 rgba(244,240,232,.42)、线 rgba(255,255,255,.08)、强线 rgba(255,255,255,.16)、强调 #B7A4FF、强调二 #7DB4FF、强调浅底 rgba(183,164,255,.15)、强调字 #0B0C12、薄荷 #7EE8C0、警示 #FFB26B、危险 #FF7D8C、玻璃 rgba(255,255,255,.07)、玻璃线 rgba(255,255,255,.18)、投影 rgba(0,0,0,.45)、强投影 rgba(0,0,0,.72)、渐变 linear-gradient(120deg,#B7A4FF,#7DB4FF 55%,#A5F2D3)。场景不声明 font-family，继承宿主页面字体。
- 看板容器绝对定位 inset 14px，三等分网格、列间隙 6px。
- 列是定位容器，内边距 8px 6px，16px 圆角，底色 `color-mix(in srgb, 表面色 55%, transparent)`，内嵌 1px 线色描边，过渡 background .2s 与 box-shadow .2s。命中态底色换 `color-mix(in srgb, 强调色 9%, 表面色)`，内描边加粗到 1.5px 且取 `color-mix(in srgb, 强调色 45%, transparent)`。
- 列头 flex 居中、间隙 5px，内边距 2px 4px 8px，10.5px/850、次墨色；首枚 7×7 圆形色点，列名紧随其后，右侧计数胶囊最小宽 16px、高 16px、内边距 0 4px、8px 圆角、表面色底，9.5px/850、行高 16px、居中、等宽数字。
- 卡片相对定位，下外边距 6px，内边距 8px，11px 圆角，表面色底，外圈 1px 线色描边加 `0 2px 4px -2px` 强投影，光标 grab，过渡 box-shadow .2s 与 transform .2s。标题是块级 10.5px、行高 1.35、字重 800，下划线厚度 1.5px、下划线颜色取三级墨色。标签是行内块，上外边距 6px、内边距 1px 6px、胶囊圆角、8.5px/850、白字，底色由数据指定。右下角一枚 16×16 的圆形对勾位：底色 #10B981、初始 `transform:scale(0)`，过渡 transform .35s cubic-bezier(.3,1.7,.5,1)；白色对勾用边框描边画出（右侧与下侧 1.6px 的实线边框、旋转 45°，位于 left 5.5px / top 3px、宽 3.5px 高 7px）。
- Done 列（第 3 列）的卡片标题加删除线并转为三级墨色，右下角对勾直接显示（scale 归一）。
- 拖起态：卡片变绝对定位、z-index 10、清掉外边距、光标 grabbing，transform 为 `rotate(3deg) scale(1.04)`，投影换成 `0 18px 30px -12px` 强投影，过渡 transform .2s 与 box-shadow .2s。
- 落位态：卡片保持绝对定位与 z-index 10，left/top/transform 各走 0.28s 的 cubic-bezier(.3,1.2,.5,1) 过渡。
- 缺口占位块：下外边距 6px、11px 圆角，1.5px 虚线边框取 `color-mix(in srgb, 强调色 50%, transparent)`，底色 `color-mix(in srgb, 强调色 6%, transparent)`，高度过渡 0.2s cubic-bezier(.3,1.2,.5,1)。
- 计数胶囊的弹跳动画是 `u255-pop .4s cubic-bezier(.3,1.7,.5,1)`，在 40% 处放大到 1.35 倍。
- 场景按固定 340px 逻辑宽排版，容器窄于 340px 时整景按比例缩小，宽于 340px 时居中留白；组件内部不设断点，只用 `prefers-color-scheme` 切换深浅色令牌。

## 数据

- 列 3 个，字段为 [列名, 列头圆点色]：To do / #94A3B8，In progress / #6366F1，Done / #10B981。列名同时作为列的 aria-label。
- 卡片 6 张，字段为 [所属列, 标题, 标签, 标签底色]：第 0 列 Pricing page draft / Design / #EC4899、Onboarding email copy / Marketing / #F59E0B、Checkout error logs / Dev / #0EA5E9；第 1 列 Landing hero / Design / #EC4899、Speed up the API / Dev / #0EA5E9；第 2 列 Connect domain / Dev / #0EA5E9。初始计数依次为 3、2、1。
- 计数口径是「该列内不处于拖起/落位态的卡片数 + 缺口占位块数」，所以拖动过程中目标列的计数会先加 1，落下后再落回实际值。
- 无外部数据请求。

## 操作和动效

- 指针按下卡片：在卡片原位插入一块缺口占位块，高度等于卡片高度按场景缩放比例换算后的像素值；卡片本身改为绝对定位并钉在场景根上，记录指针相对卡片左上角的偏移、来源列号与卡片宽度；随后给卡片加拖起态（倾斜放大、投影加深），并尝试接管指针捕获，同时阻止默认行为避免页面滚动。
- 拖动中：卡片跟随指针移动（按场景缩放比例换算坐标），同时判断指针落在哪一列的横向范围内；命中且不是来源列时，目标列加命中态（底色泛紫、内描边加粗），其余列清掉命中态。命中列内，按指针纵坐标与该列其它卡片垂直中线比较，决定缺口块插到哪张卡之前；插好位置后刷新各列计数，来源列少 1、目标列多 1。
- 松手（pointerup 或 pointercancel）：卡片退出拖起态进入落位态，位置对齐到缺口块的绝对坐标，所有列清掉命中态；290ms 后卡片被插回缺口块所在位置（插在缺口块之前），缺口块移除，落位态与行内定位样式清空，两列的计数胶囊重新计算，若数值变化则弹跳提示。
- 键盘：每张卡片可聚焦（tabIndex 0）。按 ArrowRight 或 ArrowLeft 把卡片搬到相邻列——卡片插到目标列列头之后（即该列顶部），焦点保持在卡片上，两列计数胶囊弹跳。已是最左/最右列时不做任何事；上下方向键不支持。
- 减少动态偏好下：卡片、落位态、缺口占位块、对勾圆形的过渡全部关闭，计数胶囊的弹跳动画也不再播放，交互与计数逻辑完全保留。
- 无障碍：三列都是 `role="list"` 并带列名的 aria-label，卡片是 `role="listitem"` 且 tabIndex 0；卡片 focus-visible 为 2px 强调色描边、offset 2px；缺口占位块纯装饰。
- options.height 调整场景高度，options.reducedMotion 覆盖系统偏好。

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| height | number | 340 | 场景高度，逻辑像素；窄容器整景按比例缩小 |
| reducedMotion | boolean | 跟随系统 | 覆盖系统的减少动态偏好 |

## 独立实现与六框架交付

- 仅凭本文从零生成可运行的实现。尺寸、颜色、文案、图形和运动算法均以上述文字为准；所有装饰用 CSS 与内联 SVG 绘制，不加载远程图片、字体、视频或素材。
- 当前交付重点为 React，组件名称 KanbanDrag。从零创建四个文件：KanbanDrag.tsx、KanbanDragEngine.js、motion-runtime.ts、KanbanDragEngine.d.ts；分别实现框架入口、完整交互核心、实例生命周期和类型声明。文件名是需要生成的产物，不假定接收者已经拥有任何文件。
- 同时提供 React、Vue、Svelte、Solid、Preact、Vanilla 原生生命周期入口，共享框架无关核心。DOM 仅在挂载后访问，支持同页多实例；更新时保持状态，销毁时清理动画、计时器、观察器及监听器。不要用 iframe 代替组件实现。
- 依赖安装说明：npm install react react-dom。若使用依赖，只使用其公开 API；组件的布局、样式、图形和算法必须在本次生成的文件中完整实现，不引用现成效果组件。
- 实现 options.height 以调整场景高度，options.reducedMotion 覆盖系统偏好；减少动态效果仍保留完整流程状态。
- 给出每个文件的完整内容、安装和运行步骤、以下使用示例所需的全部实现。不得留省略号、待补素材或"自行补齐核心"的占位。
- 验收：375 / 768 / 1440px 无横向溢出；拖拽跨列的让位、落位与计数正确，键盘跨列移动等价；浅色深色两套令牌正确；多实例互不干扰，卸载后停止所有任务。

## 使用示例

```tsx
import { KanbanDrag } from "./KanbanDrag";

export default function App() {
  return <KanbanDrag />;
}
```
