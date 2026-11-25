# 形变巨型菜单 — MegaMenuMorph

一张 340×330 的顶导航场景：顶部是一枚胶囊形的导航条，三个页签「Products / Developers / Company」并排居中；鼠标滑到任意一页签，下方就浮出一张白色面板，面板标题栏旁的小箭头会挪到该页签正下方。面板不是简单开合——在两个页签之间移动时，面板不关闭，而是横向滑到新页签下方，同时宽高跟着新内容一起变形，旧内容向左退场、新内容从右侧进场。鼠标移出整块场景后面板收起。

## 布局与材质

- 场景逻辑尺寸 340×330，内边距 14px，圆角 28px，溢出裁切。底色是 linear-gradient(160deg, color-mix(in srgb, var(--ux-accent) 12%, var(--ux-surface)), var(--ux-surface) 60%)：左上角带一点紫色晕开，其余是纯表面色。外圈 1px 细线（--ux-line）加 0 30px 60px -36px 强阴影（--ux-shadow-strong）。
- 导航条 position relative，横向 flex、居中、间隙 2px，内边距 4px，圆角 999px，底色 var(--ux-surface)，外圈 0 0 0 1px var(--ux-line)。三个页签是真实 button：高 36px、内边距 0 14px、圆角 999px、无边框无底色、13.5px/字重 750、文字色 var(--ux-ink-2)，颜色与底色各 .2s 过渡；aria-expanded="true" 时文字变 var(--ux-ink)、底色换成 var(--ux-surface-2)。整条导航 aria-label="Main menu"。
- 下拉面板 position absolute，left 0、top 64px，圆角 18px，底色 var(--ux-surface)，外圈 1px var(--ux-line) 加 0 24px 40px -18px 强阴影；宽高由内容测量后写入 --w、--h，水平位置写入 --x 并以 translateX 生效。位移、宽度、高度各 .45s cubic-bezier(.3,1.1,.4,1)，透明度 .25s；关闭态 opacity 0 且 pointer-events none，is-open 时 opacity 1、pointer-events auto。
- 面板内是一层裁切容器（inset 0、圆角 18px、overflow hidden），三张「页」绝对叠在左上角、padding 10px、grid 布局、行间距 2px；非当前页分别带 .l（translateX(-40px)、opacity 0）或 .r（translateX(40px)、opacity 0），位移 .45s cubic-bezier(.3,1.1,.4,1)、透明度 .3s。
- 面板内每一条菜单项是真实 button：横向 flex、居中对齐、间距 10px、内边距 8px、圆角 12px、无边框、透明底、左对齐、不换行；hover 时底色 var(--ux-surface-2)。左侧 30×30 的方块图标，圆角 9px，底色 linear-gradient(135deg, var(--a), var(--b))；主标题 13.5px/780，副标题 11.5px/600/var(--ux-ink-3)。
- 指示箭头是 14×14 的小方块，position absolute、top 58px、left 0，底色 var(--ux-surface)，投影 -1px -1px 0 var(--ux-line)（左上的两片描边被遮住，只露出右下两条边），圆角 3px 0 0 0，rotate 45deg，水平位置由 --cx 驱动，位移 .45s cubic-bezier(.3,1.1,.4,1)、透明度 .25s，z-index 2，is-open 时 opacity 1。
- 场景令牌（--ux-*）有浅色与深色两套：表面 #FFFFFF/#13141C，次级表面 #F5F3EF/#1A1B25，三级表面 #EAE7E1/#252632，墨色 #16151B/#F4F0E8，次级墨色 #57535F/rgba(244,240,232,.68)，三级墨色 #8E8A97/rgba(244,240,232,.42)，线 rgba(22,21,27,.09)/rgba(255,255,255,.08) 与 rgba(22,21,27,.17)/rgba(255,255,255,.16)，accent #6A57F2/#B7A4FF，accent-2 #2F8FE0/#7DB4FF，accent-soft rgba(106,87,242,.12)/rgba(183,164,255,.15)，accent-ink #FFFFFF/#0B0C12，mint #119C72/#7EE8C0，warn #D6731E/#FFB26B，danger #D93A55/#FF7D8C，阴影 rgba(40,30,80,.14)/rgba(0,0,0,.45)，强阴影 rgba(40,30,80,.3)/rgba(0,0,0,.72)。
- 组件不声明 font-family，沿用宿主页面默认字体族。逻辑宽度固定 340px，容器更窄时整景等比缩小；options.height 只改场景外壳高度，导航与面板仍按固定逻辑尺寸绘制。

## 数据

- 三个页签文字固定为「Products」「Developers」「Company」。
- 三组菜单内容固定，共 9 条：
  - Products（4 条）：Payments / Online checkout in one line；Settlement / Reconciled automatically every day；Subscriptions / Recurring billing and invoices；Analytics / Revenue flow at a glance。
  - Developers（3 条）：Docs / Getting started and API；Examples / Ready-to-use code；Status / Live service status。
  - Company（2 条）：About / How we work；Careers / Come work with us。
- 四组方块图标渐变色写死：#748FFC→#B197FC、#38D9A9→#4DABF7、#FFA94D→#F783AC、#FFD43B→#69DB7C。第 m 组菜单的第 k 条取第 (k+m) mod 4 组色。无外部数据请求。

## 操作和动效

- 指针进入某个页签即打开该组菜单；点击页签则在「再次点击关闭」与「切换到该组」之间取舍；指针移出整个场景根节点时收起，移回面板内会取消正在等待的收起计时。
- 打开第 i 组时先做几何换算：页签中心 cx = 导航条自身左偏移 + 页签左偏移 + 页签宽的一半（量出来的是相对场景内边距盒的横坐标）；目标面板宽 w、高 h 取自该页内容的 scrollWidth / scrollHeight；面板横向落点 x = clamp(0, 场景内容宽 - 28 - w, cx - 14 - w/2)，因此面板始终居中于页签且左右至少留出 14px，贴边时被夹住；箭头落点取 cx - 7。
- 三张页重新分配状态类：当前页不带位移类，序号更小的页带 .l、更大的页带 .r；被替换掉的旧页另外按切换方向补上 .l（向右切）或 .r（向左切），于是旧内容朝切换的反方向退场、新内容从切换方向进场。
- 首次打开时根节点临时加 no-t 类，把面板与箭头的过渡降级为「只有 opacity .25s」，位移与尺寸直接落位；下一帧移除 no-t，过渡恢复为 .45s 的位移加尺寸。之后在页签之间切换时，面板会一边横向滑动、一边把宽高补间到新内容的尺寸。
- 面板内的菜单项 tabIndex 随当前页切换：当前页条目为 0，其余为 -1，因此 Tab 键只会进入当前可见的一组。
- 页签的 aria-expanded 随当前页实时更新；面板收起时全部复位为 false。收起有 220ms 延迟，避免指针在页签与面板之间往返时闪烁。
- 键盘：Escape 收起当前面板并把焦点送回触发它的页签；页签是原生 button，可 Tab 聚焦，焦点样式由浏览器默认焦点环给出（组件未自定义 focus-visible 规则）。
- 减少动态偏好下（系统 prefers-reduced-motion 或 options.reducedMotion 为真）由共享运行时把容器内所有元素的 transition-duration 与 animation-duration 归零，于是面板的滑移、尺寸变形与内容交叉淡入淡出全部直接跳到终态；面板内容仍会正确切换，交互与键盘行为不变。
- 没有自动播放与循环动画；面板的进出场完全由指针与键盘驱动。

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| height | number | 330 | 场景高度，逻辑像素；窄容器整景按比例缩小 |
| reducedMotion | boolean | 跟随系统 | 覆盖系统的减少动态偏好 |

## 独立实现与六框架交付

- 仅凭本文从零生成可运行的实现。尺寸、颜色、文案、图形和运动算法均以上述文字为准；所有装饰用 CSS 与内联 SVG 绘制，不加载远程图片、字体、视频或素材。
- 当前交付重点为 React，组件名称 MegaMenuMorph。从零创建四个文件：MegaMenuMorph.tsx、MegaMenuMorphEngine.js、motion-runtime.ts、MegaMenuMorphEngine.d.ts；分别实现框架入口、完整交互核心、实例生命周期和类型声明。文件名是需要生成的产物，不假定接收者已经拥有任何文件。
- 同时提供 React、Vue、Svelte、Solid、Preact、Vanilla 原生生命周期入口，共享框架无关核心。DOM 仅在挂载后访问，支持同页多实例；更新时保持状态，销毁时清理动画、计时器、观察器及监听器。不要用 iframe 代替组件实现。
- 依赖安装说明：npm install react react-dom。若使用依赖，只使用其公开 API；组件的布局、样式、图形和算法必须在本次生成的文件中完整实现，不引用现成效果组件。
- 实现 options.height 以调整场景高度，options.reducedMotion 覆盖系统偏好；减少动态效果仍保留完整交互状态。
- 给出每个文件的完整内容、安装和运行步骤、以下使用示例所需的全部实现。不得留省略号、待补素材或"自行补齐核心"的占位。
- 验收：375 / 768 / 1440px 无横向溢出；页签悬停开合、跨页签滑移变形、面板不越出卡内、Escape 收起并还焦点都正确；浅色深色两套令牌正确；多实例互不干扰，卸载后停止所有任务。

## 使用示例

```tsx
import { MegaMenuMorph } from "./MegaMenuMorph";

export default function App() {
  return <MegaMenuMorph />;
}
```
