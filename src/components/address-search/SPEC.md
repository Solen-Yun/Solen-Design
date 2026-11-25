# 地址搜索填单 — AddressSearch

一张 340×340 的配送地址表单卡：顶部是「Add shipping address」标题，标题下是「Address」标签与一个带放大镜图标的搜索框；输入街名或楼名时，输入框下方会浮出一张结果列表，命中片段加粗、邮编做成小徽章；点中一条结果后列表收起、地址行自动填好并展开「Apt, suite, floor」补全区，250ms 后焦点自动落进补全框，填了内容「Save」才可点。整卡右下角始终压着一个 44px 高的 Save 按钮。

## 布局与材质

- 340×340px 场景卡，圆角 30px，溢出裁切；底色 `var(--ux-surface)`，外圈 1px `var(--ux-line)` 描边加 `0 30px 60px -36px var(--ux-shadow-strong)` 阴影。
- 表单主体：绝对定位 left/right 20px、top 24px。
  - 标题 h3「Add shipping address」：margin 0、18px/900、字距 -.03em。
  - 标签「Address」：display block、margin-top 16px、11px/800、取 `var(--ux-ink-2)`。
  - 搜索框容器相对定位、margin-top 6px；放大镜是 16×16 的内联 SVG（圆 cx 7 cy 7 r 4.8、描边 1.8，握柄 `M10.6 10.6l3.4 3.4` 描边 1.8 圆头），绝对定位 left 12px、top 13px，取 `var(--ux-ink-3)`。
  - 搜索输入框：type=search、占位文字「Search by street or building」、aria-label「Search address」、autocomplete off；高 42px、内边距 0 12px 0 36px、圆角 12px、底色 `var(--ux-surface-2)`、`inset 0 0 0 1.5px var(--ux-line)`、文字 12.5px/700 取 `var(--ux-ink)`；聚焦时描边换成 `inset 0 0 0 2px var(--ux-accent)`。
- 补全区 `.is-pick` 容器：`display: grid`、`grid-template-rows: 0fr`、过渡 `grid-template-rows .45s cubic-bezier(.3,1,.4,1)`，内部格子 min-height 0、溢出隐藏；选中地址后切成 `grid-template-rows: 1fr`，区段高度展开。
  - 已选地址条：flex 垂直居中、gap 8px、margin-top 8px、内边距 10px 12px、圆角 12px、底色 `color-mix(in srgb, var(--ux-accent) 8%, transparent)`、12px/800，入场动画 `u304-in .45s cubic-bezier(.3,1.3,.5,1)`（从 opacity 0、translateX(-16px) 滑入）。
    - 邮编徽章：flex none、内边距 2px 6px、圆角 6px、底色 `var(--ux-accent)`、白字 10px/850、tabular-nums。
    - 街道地址文本：紧随其后的一段普通文字。
  - 补全标签「Apt, suite, floor」：margin-top 10px、11px/800、取 `var(--ux-ink-2)`，用 `for` 指向补全输入框（id 在挂载时随机生成后互相绑定）。
  - 补全输入框：占位文字「Apt, suite, floor」、autocomplete off、初始 tabindex -1，内边距左 12px，其余尺寸、底色与描边同搜索框。
- 结果浮层：绝对定位 left/right 20px、top 120px、z-index 2、`max-height: 0`、溢出隐藏、圆角 14px、底色 `var(--ux-surface)`、阴影 `0 0 0 1px var(--ux-line), 0 18px 34px -16px var(--ux-shadow-strong)`、opacity 0，过渡 `max-height .4s cubic-bezier(.3,1,.4,1), opacity .2s`；浮层打开时 `max-height: 200px`、opacity 1。
  - 计数行 `small`：display block、内边距 9px 12px 3px、10px/800、取 `var(--ux-ink-3)`，文案为「N results」。
  - 结果行：display block、宽 100%、内边距 8px 12px、border 0、上边框 1px `var(--ux-line)`、无底色、11.5px/650 取 `var(--ux-ink-2)`、左对齐；悬停底色换成 `var(--ux-surface-2)`。
    - 邮编徽章 `em`：margin-right 6px、内边距 1px 5px、圆角 4px、底色 `var(--ux-accent-soft)`、文字 `var(--ux-accent)`、9.5px/850。
    - 命中片段 `b`：字重 900、取 `var(--ux-ink)`。
    - 楼名 `span`：display block、margin-top 2px、10px、取 `var(--ux-ink-3)`。
  - 无命中时浮层里放一行普通文本「No results」。
- Save 按钮：绝对定位 left/right 20px、bottom 20px、高 44px、圆角 13px、底色 `var(--ux-ink)`、文字 `var(--ux-surface)`、13px/850，过渡 opacity .25s；禁用时 opacity .3。
- 场景令牌用 `light-dark()` 写两套（浅色 | 深色，跟随宿主 `prefers-color-scheme`）：`--ux-surface` #FFFFFF | #13141C；`--ux-surface-2` #F5F3EF | #1A1B25；`--ux-ink` #16151B | #F4F0E8；`--ux-ink-2` #57535F | rgba(244,240,232,.68)；`--ux-ink-3` #8E8A97 | rgba(244,240,232,.42)；`--ux-line` rgba(22,21,27,.09) | rgba(255,255,255,.08)；`--ux-accent` #6A57F2 | #B7A4FF；`--ux-accent-soft` rgba(106,87,242,.12) | rgba(183,164,255,.15)；`--ux-shadow-strong` rgba(40,30,80,.3) | rgba(0,0,0,.72)。
- 字体：整卡继承宿主字体栈（根层不声明 font-family）；场景固定 340px 宽，容器变窄时整景按比例缩小，不做自适应重排。

## 数据

- 地址库写死 4 条，每条是「邮编 / 街道地址 / 楼名」三元组：`94103 / 1355 Market St, San Francisco, CA / Market Square`；`94102 / 1 Market St, San Francisco, CA / Spear Tower`；`94105 / 101 Market St, San Francisco, CA / One Market Plaza`；`10001 / 20 W 34th St, New York, NY / Empire State Building`。
- 过滤规则：把「街道地址 + 楼名」拼起来做不区分大小写的子串匹配，查询词同样不区分大小写；少于 2 个字符不搜索。
- 命中高亮只加粗每条文本里第一处出现的查询词，找不到就整段普通文字。
- 表单文案写死：标题「Add shipping address」、标签「Address」、搜索占位「Search by street or building」、补全占位「Apt, suite, floor」、按钮「Save」、空结果提示「No results」。
- 无外部数据请求，无图片或图标素材（放大镜为内联 SVG）。

## 操作和动效

- 搜索框输入即搜：每次 input 都清空并重建结果浮层。输入不足 2 个字符时浮层收起；否则写入计数行、逐条渲染结果行并让浮层展开。
- 点结果行：浮层收起、邮编与街道地址写入已选地址条（该条重新播一次滑入动画）、补全区展开、搜索框内容改写为该条楼名、补全输入框获得 tabindex，250ms 后把焦点移到补全输入框（`preventScroll`）。
- 补全输入框 input 即校验：只有「已选地址」和「补全内容非空」同时成立时 Save 才解除禁用，初始状态即禁用。
- 按 Escape（焦点在卡片任意处）收起结果浮层，不清空已选内容。
- 组件没有自动播放和循环动画。
- `prefers-reduced-motion`：浮层的 max-height/opacity 过渡与补全区展开过渡归零，已选地址条的滑入动画关闭。
- 键盘：搜索框与补全框是原生输入框，可用 Tab 切换；结果行是原生 button，可 Tab 到并回车选择；按钮 focus-visible 为 2px `var(--ux-accent)` 外圈、偏移 2px，输入框聚焦用内描边 accent 表示。未实现方向键在结果列表内移动。
- 无障碍：结果浮层 `role="listbox"`、aria-label「Search results」，每条结果 `role="option"`；计数行与补全区靠真实标签绑定输入框。

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| height | number | 340 | 场景高度，逻辑像素；窄容器整景按比例缩小 |
| reducedMotion | boolean | 跟随系统 | 覆盖系统的减少动态偏好 |

## 独立实现与六框架交付

- 仅凭本文从零生成可运行的实现。尺寸、颜色、文案、图形和运动算法均以上述文字为准；所有装饰用 CSS 与内联 SVG 绘制，不加载远程图片、字体、视频或素材。
- 当前交付重点为 React，组件名称 AddressSearch。从零创建四个文件：AddressSearch.tsx、AddressSearchEngine.js、motion-runtime.ts、AddressSearchEngine.d.ts；分别实现框架入口、完整交互核心、实例生命周期和类型声明。文件名是需要生成的产物，不假定接收者已经拥有任何文件。
- 同时提供 React、Vue、Svelte、Solid、Preact、Vanilla 原生生命周期入口，共享框架无关核心。DOM 仅在挂载后访问，支持同页多实例；更新时保持状态，销毁时清理动画、计时器、观察器及监听器。不要用 iframe 代替组件实现。
- 依赖安装说明：npm install react react-dom。若使用依赖，只使用其公开 API；组件的布局、样式、图形和算法必须在本次生成的文件中完整实现，不引用现成效果组件。
- 实现 options.height 以调整场景高度，options.reducedMotion 覆盖系统偏好；减少动态仍保留完整状态。
- 给出每个文件的完整内容、安装和运行步骤、以下使用示例所需的全部实现。不得留省略号、待补素材或「自行补齐核心」的占位。
- 验收：375 / 768 / 1440px 无横向溢出；过滤、加粗高亮、邮编徽章、选后填单与焦点转移正确；Save 的启用条件正确；浅色深色两套令牌正确；多实例互不干扰，卸载后停止所有任务。

## 使用示例

```tsx
import { AddressSearch } from "./AddressSearch";

export default function App() {
  return <AddressSearch />;
}
```
