从零实现「分叉导航菜单」组件：左侧一条垂直树干线，二级条目挂在弧形枝杈上；选中谁，谁那条枝被强调色描亮，树干上的标记滑到当前分组标题旁；分组可折叠展开。完整规格如下，不依赖外部网页、视频、图片、字体文件或现成效果组件。

## 视觉与布局

- 纯 React + CSS 实现，只产两个文件：BranchedMenu.jsx（入口与状态机）和 BranchedMenu.css（全部样式）。React >= 18；行图标依赖 @hugeicons/react 的 HugeiconsIcon（size 16、strokeWidth 1.8）与 @hugeicons/core-free-icons 的图标对象；icon 属性也可以直接传 ReactElement，是元素就原样渲染，是图标对象就走 HugeiconsIcon。不用 iframe。
- 根元素是 `<nav>`，display:flex 纵向排列，宽度 fit-content、最大宽度 min(width, 100%)，padding-left 14px，font-family 继承宿主，line-height 1.2。
- 全部视觉旋钮经内联 CSS 变量下发：--bm-w（width px）、--bm-ink（color）、--bm-accent（accentColor）、--bm-line（lineColor）、--bm-font（fontSize px）、--bm-row（rowHeight px）、--bm-indent（indent px）、--bm-line-w（lineWidth）、--bm-draw（drawDuration ms）、--bm-fold（foldDuration ms）。文字闲色统一用 color-mix(in srgb, var(--bm-ink) 55%, transparent)。
- 树干：根元素 ::before，position absolute、left 0、top 8px、bottom 0，宽 2px、圆角 1px，背景为 lineColor 的纵向线性渐变（0% 到 55% 实色，之后渐隐到透明）。
- 分组标题 button：上下 padding 9px、无边框无背景，字号 fontSize+1px、字重 500、左对齐、文字闲色；展开中的分组标题与选中的叶子标题用全墨色；hover（仅 @media (hover: hover) and (pointer: fine)）用全墨色，颜色过渡 200ms ease。标题不缩进。
- 子项 button：display flex、图标与文字 gap 8px、height rowHeight、padding-left indent、无边框无背景、文字闲色；hover 全墨色；选中项用 accentColor 且字重 500；颜色过渡 200ms ease。图标 span aria-hidden、inline-flex。
- 枝杈线条是树体内的绝对定位 SVG：宽 indent、高 = PAD*2 + 子项数*rowHeight（PAD=6），base 线 stroke lineColor、reach 线 stroke accentColor，共同属性 fill none、stroke-width var(--bm-line-w)、圆头圆角；线条默认透明度 0，分组展开后 250ms ease 延迟 100ms 淡入至 1。
- 树干标记 marker：绝对定位 left 0、宽 2px、高 16px（常量 MARK）、圆角 1px、背景 accentColor；top 过渡 220ms、透明度过渡 150ms，缓动 cubic-bezier(0.23, 1, 0.32, 1)；仅当「选中的 value 落在某个分组内且该分组展开」时显示。

## 状态与动效

- 内部状态两个：open（展开分组序号的 Set）与 active（选中 value 字符串）。defaultOpen 接受序号或序号数组，-1 表示全收起；defaultActive 缺省时自动取「第一个展开分组」的第一个子项 value。
- 分组标题点击切换展开（叶子标题点击即 select）；子项点击 select(value, item) 并回调 onSelect；每次开合回调 onToggle(index, isOpen)。回调用 ref 转发，避免闭包过期。
- 折叠展开用 grid 过渡：外层 display:grid、grid-template-rows 0fr↔1fr，内层 min-height:0、overflow:hidden，时长 foldDuration、缓动 cubic-bezier(0.23, 1, 0.32, 1)；树体高度显式设为 PAD*2 + 子项数*rowHeight。
- 选中描线：reach 路径以 stroke-dasharray = 路径总长、stroke-dashoffset = 总长（未选中）呈现，选中时归零完成描线，时长 drawDuration、缓动同上。
- 路径与长度公式（r = min(radius, rowHeight/2 - 2)，endX = indent - 8，rowY(k) = PAD + k*rowHeight + rowHeight/2，k 为子项序号）：
  - 树干 base：M trunk 0 V rowY(最后一个子项) - r
  - 第 k 条枝杈 base：M trunk rowY(k)-r A r r 0 0 0 trunk+r rowY(k) H endX
  - 第 k 条 reach（从树干顶贯通到第 k 行）：M trunk 0 V rowY(k)-r A r r 0 0 0 trunk+r rowY(k) H endX
  - reach 总长：rowY(k) - r + π·r/2 + (endX - trunk - r)
- 树干标记定位：top 滑到「选中子项所在分组的标题按钮」的纵向中心（el.offsetTop + (el.offsetHeight - MARK)/2）。挂载与依赖变化时无过渡直接落位（先移除 transition、强制读一次 offsetHeight、再恢复），尺寸变化经 ResizeObserver 重新定位且跳过首次回调；无选中分组时标记隐藏。
- 可访问性：分组标题 aria-expanded；选中的子项与叶子 aria-current="true"；分组收起时子项 tabIndex=-1 不可 Tab；船与线条类装饰 aria-hidden；@media (prefers-reduced-motion: reduce) 时 body 折叠与 reach 描线过渡关闭，marker 仅保留 opacity 过渡。
- 不修改宿主 body 或全局 URL；同页多实例状态独立；卸载时断开 ResizeObserver 与所有监听。

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| items | BranchedMenuItem[] | DEFAULT_ITEMS | Sections: label plus children (value, label, icon), or a leaf with a value. A section with children folds; a leaf selects. |
| defaultOpen | number \| number[] | 0 | The section, or sections, open at first. -1 for none. |
| defaultActive | string | "" | Value selected at first. Empty picks the open section's first child. |
| onSelect | (value, item) => void | - | A child or a leaf was picked. |
| onToggle | (index, open) => void | - | A section folded or unfolded. |
| color | string | "#f5f5f5" | The ink. Lines and idle text are mixes of it. |
| accentColor | string | "#f5f5f5" | The active line, the active label and the marker. |
| lineColor | string | "#3f3f46" | The rail, trunk and branches. A solid colour, so joints never darken. |
| width | number | 240 | The widest the menu may be, in px. It shrinks to its content. |
| rowHeight | number | 36 | Height of a child row in px. |
| indent | number | 40 | Where child rows start, in px. Branches end just before it. |
| trunk | number | 14 | The trunk line's x position, in px. |
| radius | number | 10 | The curve of each branch, in px. |
| lineWidth | number | 1.5 | Stroke width of the lines. |
| fontSize | number | 14 | Child text size in px. Headers are 1px larger. |
| drawDuration | number | 400 | The accent line's travel, in ms. |
| foldDuration | number | 300 | A section's fold and unfold, in ms. |
| className | string | "" | Extra classes for the nav. |

## 默认条目

DEFAULT_ITEMS 两组、各四个子项，value 与 label 严格用下面的英文文案；icon 依次为 Download04Icon、Rocket01Icon、Settings02Icon、PaintBoardIcon 与 CursorPointer01Icon、TextFontIcon、Layers01Icon、Notification03Icon（全部来自 @hugeicons/core-free-icons）：

1. Getting started — Installation(install)、Quick start(quick)、Configuration(config)、Theming(theming)
2. Components — Buttons(buttons)、Typography(typography)、Overlays(overlays)、Toasts(toasts)

## 交付及验证

- 交付 BranchedMenu.jsx 与 BranchedMenu.css 两个文件的完整内容、安装说明与使用示例；不得留省略号或「自行补齐核心」的占位。
- 验证：分组折叠展开的 grid 过渡与枝杈线条延迟淡入；点子项的 reach 描线与树干标记滑动；width、rowHeight、indent、trunk、radius、lineWidth、fontSize、drawDuration、foldDuration 全部生效；叶子条目可选中；折叠态子项不可聚焦；键盘 Tab 与 aria-expanded / aria-current 正确；prefers-reduced-motion 下过渡关闭但导航可用；375 / 768 / 1440 无横向溢出；同页多实例互不干扰；卸载后无残留观察器与监听。
