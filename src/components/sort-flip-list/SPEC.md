# 排序飞行列表 — SortFlipList

340×350 的商品列表场景：顶部是一条分段控件，三段分别是 Name、Price、Rating，选中的那段亮起并带一个向上箭头（再次点击同一段则转为倒序，箭头翻转 180°）。下方是一列 6 行商品，每行左侧一枚渐变缩略图、中间是名称、右侧是价格与评分，最右边留一格显示这一行在本次排序里上移或下移了几位。点击任意一段，列表立刻按该维度重排：升上去的行抬到前面并带阴影，降下去的行沉到后面并略微变暗，每行末尾闪出一个 ▲n 或 ▼n 的位移标记。

## 布局与材质

- 场景 340×350px，纵向 flex，内边距 16px，圆角 28px，overflow hidden，底色 --ux-surface。外圈 1px 线色描边加 0 30px 60px -36px 的强阴影。
- 分段控件横向 flex、gap 4px、内边距 4px、圆角 13px、底色 --ux-surface-2，外层 role="group"、aria-label "Sort by"。三枚按钮各 flex 1、高 32px、圆角 10px、底色 none、居中排布、gap 4px、12.5px/750、字色 --ux-ink-3。选中态（aria-pressed="true"）底色 --ux-surface、字色 --ux-ink，并加 0 0 0 1px var(--ux-line) 的描边。按钮内是 10×10px 的向上箭头（viewBox 0 0 10 10，路径 M5 8V2M2 5l3-3 3 3，fill none、描边 currentColor、宽 2、圆头），默认 opacity 0、选中时 opacity 1，过渡 transform .35s cubic-bezier(.34,1.56,.64,1)；倒序时整支箭头旋转 180°。
- 列表容器 position relative，margin-top 10px，list-style none，高度按行数 × 48px 计算（本例 6 行共 288px），带 aria-live="polite" 以便读屏感知顺序变化。
- 每行是绝对定位的列表项：left 0、right 0、top 0，高 44px，横向 flex 垂直居中、gap 8px、内边距 0 8px、圆角 12px、底色 --ux-surface，过渡 transform .6s cubic-bezier(.3,1.1,.4,1) 与 box-shadow .3s。相邻行之间靠 48px 的行距留出 4px 缝隙。
- 行内元素：左端缩略图 28×28px、圆角 9px、底色 linear-gradient(135deg, var(--a), var(--b))，每行一组专属渐变；名称 b 元素 flex 1、min-width 0、13px/750、单行省略号截断；价格 span 宽 66px、右对齐、650 12px/1 等宽字（ui-monospace, SFMono-Regular, Menlo, monospace）、色 --ux-ink-3、tabular-nums；评分 span 宽 40px，同样等宽字与 tabular-nums，文字形如 "★ 4.6"。当前排序依据对应的数值列会换成 --ux-ink 色并加粗到 800（价格列在 Price 模式下、评分列在 Rating 模式下）。
- 位移标记 em 宽 26px、11px/700 等宽字、右对齐、初始 opacity 0，加 .show 后 opacity 1，过渡 opacity .3s；上移为 --ux-mint 的 "▲n"，下移为 --ux-danger 的 "▼n"。
- 行在前后的层次：上移的行加 .up（z-index 2、阴影 0 10px 22px -12px var(--ux-shadow-strong)），下移的行加 .dn（z-index 0、opacity .9）。
- 场景令牌为浅深两套（light-dark()，由宿主页面的 color-scheme 决定，未声明时取浅色）：--ux-spring cubic-bezier(.34,1.56,.64,1)、--ux-surface #FFFFFF/#13141C、--ux-surface-2 #F5F3EF/#1A1B25、--ux-surface-3 #EAE7E1/#252632、--ux-ink #16151B/#F4F0E8、--ux-ink-2 #57535F/rgba(244,240,232,.68)、--ux-ink-3 #8E8A97/rgba(244,240,232,.42)、--ux-line rgba(22,21,27,.09)/rgba(255,255,255,.08)、--ux-line-2 rgba(22,21,27,.17)/rgba(255,255,255,.16)、--ux-accent #6A57F2/#B7A4FF、--ux-accent-2 #2F8FE0/#7DB4FF、--ux-accent-soft、--ux-accent-ink、--ux-mint #119C72/#7EE8C0、--ux-warn #D6731E/#FFB26B、--ux-danger #D93A55/#FF7D8C、--ux-glass、--ux-glass-line、--ux-shadow、--ux-shadow-strong、--ux-grad。
- 响应式：场景按 340×350 逻辑像素排版，容器比 340px 窄时整景等比缩小。

## 数据

- 6 行商品写死：Wireless earbuds（129000，4.6）、Mechanical keyboard（89000，4.8）、Smartwatch（299000，4.3）、Portable speaker（59000，4.1）、Laptop stand（39000，4.7）、Power bank（45000，4.4）。价格以千分位加 " KRW" 显示，形如 "129,000 KRW"；评分显示为 "★ 4.6"（一位小数）。
- 每行的缩略图渐变写死：#FFA8A8→#FFD43B、#A5D8FF→#B197FC、#96F2D7→#4DABF7、#FFC078→#F783AC、#C0EB75→#38D9A9、#D0BFFF→#74C0FC，按数据顺序一一对应。
- 三个排序维度固定为 Name、Price、Rating，文本写死在分段按钮上。

## 操作和动效

- 点击分段按钮触发排序。点当前选中的那一段就在升序与降序之间来回切换（降序时该段箭头翻转 180°）；点另一段则切换维度，并按维度决定初始方向：Name 从升序开始，Price 与 Rating 从降序开始。切换维度时按 aria-pressed 更新三枚按钮的选中态。
- 重排采用绝对定位 + transform 的方式：每一行的新位置由 transform translateY(序号 × 48px) 给出，行本身在 0.6s 内以 cubic-bezier(.3,1.1,.4,1) 滑到新位置，因此视觉上是一次连续的位移动画而不是重绘列表。
- 前后景：与上一版顺序相比位置上移的行加 .up（抬到前面、带阴影），下移的行加 .dn（沉到后面、透明度 .9），当前位置没变的行既不上也不下。
- 位移标记：上移行末尾写 "▲" 加移动的行数，下移行末尾写 "▼" 加移动的行数，同时用 --ux-mint / --ux-danger 区分方向，标记淡入 0.3s。1300ms 后清掉 .up / .dn 与 .show 状态，行恢复平铺。
- Name 维度按字符串做本地化比较（localeCompare，英文区域），Price 与 Rating 按数值比较，再按当前方向取正负。
- 初始进入时列表已按 Name 升序排好并直接落到各自位置（无位移动画）。
- 键盘操作：三枚分段按钮是原生按钮，Tab 可依次到达，Enter/Space 触发对应排序；分段容器有 role="group" 与说明性 aria-label，当前选中项用 aria-pressed 表达。
- 减少动态（系统 prefers-reduced-motion: reduce，或 options.reducedMotion 覆盖为 true）：行的 transform 过渡被关掉，行直接落到新位置，其余状态（选中态、位移标记、当前列高亮）照常更新。该状态在挂载时读取一次。
- 无障碍：列表容器 aria-live="polite"，排序后读屏可感知条目顺序变化；行内文字都是真实文本（名称、价格、评分），缩略图是纯装饰。

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| height | number | 350 | 场景高度，逻辑像素；窄容器整景按比例缩小 |
| reducedMotion | boolean | 跟随系统 | 覆盖系统的减少动态偏好 |

## 独立实现与六框架交付

- 仅凭本文从零生成可运行的实现。尺寸、颜色、文案、图形和运动算法均以上述文字为准；界面全部用 DOM 与 CSS 绘制，箭头用内联 SVG，不加载远程图片、字体、视频或素材。
- 当前交付重点为 React，组件名称 SortFlipList。从零创建四个文件：SortFlipList.tsx、SortFlipListEngine.js、motion-runtime.ts、SortFlipListEngine.d.ts；分别实现框架入口、完整交互核心、实例生命周期和类型声明。文件名是需要生成的产物，不假定接收者已经拥有任何文件。
- 同时提供 React、Vue、Svelte、Solid、Preact、Vanilla 原生生命周期入口，共享框架无关核心。DOM 仅在挂载后访问，支持同页多实例；更新时保持状态，销毁时清理动画、计时器、观察器及监听器。不要用 iframe 代替组件实现。
- 依赖安装说明：npm install react react-dom。若使用依赖，只使用其公开 API；组件的布局、样式、图形和算法必须在本次生成的文件中完整实现，不引用现成效果组件。
- 实现 options.height 以调整场景高度，options.reducedMotion 覆盖系统偏好；减少动态效果仍保留完整的排序结果与标记状态。
- 给出每个文件的完整内容、安装和运行步骤、以下使用示例所需的全部实现。不得留省略号、待补素材或"自行补齐核心"的占位。
- 验收：375 / 768 / 1440px 无横向溢出；三种排序与升降序切换正确、前后景与位移标记正确；浅色深色两套令牌正确；多实例互不干扰，卸载后停止所有任务。

## 使用示例

```tsx
import { SortFlipList } from "./SortFlipList";

export default function App() {
  return <SortFlipList />;
}
```
