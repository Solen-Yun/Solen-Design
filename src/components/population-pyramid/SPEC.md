# 人口金字塔逐年 — PopulationPyramid

一张 300×480 的人口金字塔看板：顶部是标题「Population pyramid / Illustrative estimate」和巨大的年份数字，右上角并排两个指标（65 岁以上占比、中位年龄），中间是 21 条五岁年龄组的男女双向条形图——男性条从画面中轴左侧向左伸展，女性条从中轴右侧向右伸展，轴心一列写着年龄；底部是一条可拖动的年份滑轨，播放时年份从 1970 一路推到 2070，金色的「Born 1958」标记跟着那一代人在金字塔里上下移动，整张图由窄变宽、再由宽变窄。

## 布局与材质

- 场景卡 300×480px，圆角 32px，overflow 裁切，底色 var(--ux-surface)、文字 var(--ux-ink)，外圈 `box-shadow: 0 0 0 1px var(--ux-line), 0 30px 60px -36px var(--ux-shadow-strong)`。
- 场景令牌分浅色与深色两套（`light-dark()`，由宿主 color-scheme 决定）：浅色 surface #FFFFFF、surface-2 #F5F3EF、surface-3 #EAE7E1、ink #16151B、ink-2 #57535F、ink-3 #8E8A97、line rgba(22,21,27,.09)、line-2 rgba(22,21,27,.17)、accent #6A57F2、shadow-strong rgba(40,30,80,.3)；深色 surface #13141C、surface-2 #1A1B25、surface-3 #252632、ink #F4F0E8、ink-2 rgba(244,240,232,.68)、ink-3 rgba(244,240,232,.42)、line rgba(255,255,255,.08)、accent #B7A4FF、shadow-strong rgba(0,0,0,.72)。
- 顶部标题行 absolute left 20px right 20px top 18px，flex + space-between + baseline 对齐：左「Population pyramid」14px/900；右「Illustrative estimate」10px/700、次级墨色 ink-3。
- 年份数字 absolute left 18px top 40px：38px/900、字距 -0.04em、tabular-nums（`aria-live="polite"`，数值随年份变化被读屏播报）。
- 指标行 absolute right 20px top 46px，flex、间距 14px、右对齐。每项上行为标签 9.5px/750 ink-3（"Aged 65+"、"Median age"），下行为数值 17px/900、tabular-nums、字距 -0.02em；「65+ 占比」数值用 #F59E0B 强调，「中位年龄」用墨色。
- 图表区 absolute left 0 right 0 top 110px 高 290px，含 21 个年龄组行，每行高 13.8px；行高亮用 `:hover` 铺 var(--ux-surface-2)。行自下而上排列：第 0 组（0～4 岁）在最底，第 20 组（100+）在最顶，行 top = (20 - 组号) × 13.8px。
- 每行三块：男性条 absolute `right: 166px`（即右端固定在 x=134px 处，向左伸展）、`top/bottom: 1.4px`、圆角 3px 0 0 3px（靠外一侧圆角）、底色 #60A5FA；女性条 absolute `left: 166px`（左端固定在 x=166px 处，向右伸展）、圆角 0 3px 3px 0、底色 #F472B6；年龄标签 absolute left 134px 宽 32px、行高 13.8px、居中、8.5px/800 ink-3、tabular-nums，落在两条之间的 32px 空档里，只在偶数组显示（0、10、20…100）。因此男性在画面左半、女性在画面右半。
- 性别标签位于图表区顶部外侧（`top: -16px`）：「Men」10px/850、色 #3B82F6、`right: 172px`；「Women」10px/850、色 #EC4899、`left: 172px`，分别压在各自一侧条形的上方。
- 出生队列标记 `.u367-co`：absolute、z-index 2、内边距 1px 6px、圆角 999px、底色 #FBBF24、文字 #3B2600、9px/900、nowrap、pointer-events none、opacity 过渡 .3s，文案「Born 1958」；定位在队列所在行、女性条外端再外移 6px 处（水平位置上限 240px）。
- 行级提示气泡 `.u367-tip`：absolute、left 50%、top 随行变化、内边距 5px 9px、圆角 9px、底色 var(--ux-ink)、文字 var(--ux-surface)、10.5px/750、nowrap、pointer-events none、z-index 3，`transform: translate(-50%, -110%)`，opacity 0→1 过渡 .15s。
- 底部控制条 absolute left 18px right 18px bottom 16px，flex、垂直居中、间距 12px：左侧播放/暂停按钮 34×34px、无边框、圆形、底色 var(--ux-ink)、图标色 var(--ux-surface)，内含两个 14×14 内联 SVG（暂停图标两枚 3.6×12 圆角竖条，播放图标一个实心三角），默认显示暂停图标，暂停态换显示播放图标；`focus-visible` 为 2px accent 外圈、offset 3px。
- 右侧滑轨 flex 1、高 36px、`touch-action: none`、`cursor: pointer`、圆角 8px，`role="slider"`、`tabindex="0"`、`aria-label="Year"`、`aria-valuemin=1970`、`aria-valuemax=2070`、`aria-valuenow` 跟随当前年份。轨道为 `::before` 伪元素（left 0 right 0 top 12px 高 4px 圆角 2px、底色 var(--ux-line)）；已走过的部分 `.u367-fl` 底色 var(--ux-accent)、宽度按年份进度；滑块 `.u367-th` 直径 16px、top 6px、margin-left -8px、圆形、底色 var(--ux-surface)、`box-shadow: 0 0 0 3px var(--ux-accent), 0 4px 10px -3px var(--ux-shadow-strong)`；轨道下方三个年份刻度 `em`（1970 / 2020 / 2070）8.5px/750 ink-3、`translateX(-50%)` 居中在对应百分比位置。

## 数据

- 年份范围 1970→2070，21 个五岁年龄组，行高 13.8px，条形最大长度 120px，播放速度每秒推进 8 年，队列出生年 1958。
- 出生人口写死 17 个锚点（值单位为万人）：1880→40、1920→50、1945→60、1955→85、1960→100、1971→102、1975→88、1984→68、1990→65、1995→71、2002→50、2012→48、2017→36、2020→27、2023→23、2030→25、2070→22；两点之间线性插值，1880 之前取 40、2070 之后取 22。
- 存活比例按年龄 a 与年份 y 计算：期望寿命 M = 42 + (min(y, 2040) - 1970) × 0.42，女性再加 5；存活率 = exp(-((max(0, a - M)) / 18)²)。
- 每组人口 = 组内 5 个年龄点（a = 组号×5 + k + 0.5，k 取 0～4）各取「该年份之前该年龄的出生量的一半」乘以各自存活率后求和，男女各一份。
- 条长比例的基准 MAX 是 1970～2070 每 5 年采样一次、所有组所有性别的最大人口值。
- 指标：65 岁以上占比 = 第 13 组及以后（65 岁以上）的人数之和 ÷ 总人数，保留 1 位小数；中位年龄 = 自最年轻组向上累加，累计数首次达到总数一半时，取该组起始年龄加组内插值，四舍五入成整数。
- 悬停气泡文案：年龄带（最上组写「100+」，其余写「0~4」「5~9」这样的起止值）+「· men N0k · women N0k」，数值先四舍五入到整数再拼上「0k」。

## 操作和动效

- 自动播放：挂载后从 1970 年开始，每秒推进 8 年（帧间隔按 dt 计算，单帧上限 0.05s）；推进到 2070 后停留 1.6 秒，再回到 1970 重新循环。年份、条长、指标、队列标记、刻度进度随每帧刷新，条长直接改 width（没有宽度补间），指标数值直接改文本（没有数字滚动）。
- 场景离开视口时（IntersectionObserver 判定不可见）暂停动画循环，回到视口继续。
- 拖动滑轨：pointerdown 即暂停播放并按指针横坐标换算年份（x 相对轨道左边界，夹到 0～1 后线性映射到 1970～2070），pointermove 持续跟拖，pointerup / pointercancel 结束拖动但保持暂停。键盘操作滑轨：←/↓ 减 1 年、→/↑ 加 1 年，按住 Shift 步长为 10 年，Home 跳到 1970、End 跳到 2070；键盘操作同样会暂停播放。滑轨获得焦点时 2px accent 外圈、offset 2px。
- 播放/暂停按钮：点击切换播放状态并更新 aria-label（Pause / Play）；若当前处于暂停且年份已在 2070，先回到 1970 再开始播放。
- 悬停某一行：整行铺 var(--ux-surface-2) 底色，同时气泡淡入显示该年龄带的男女人数；离开该行气泡淡出。气泡在每次重绘后按当前悬停行重新定位。
- 队列标记：当 (年份 - 1958) 落在某个五岁年龄组内时，该组男女两条同时变为 #FBBF24（`transition: background .3s`），并显示「Born 1958」标记；年份早于 1958 时标记隐藏（opacity 0）。
- 无障碍：年份数字区是 `aria-live="polite"`；滑轨是标准 slider 语义并带 `aria-valuenow`；播放按钮是原生按钮并有 Pause / Play 的 aria-label；颜色不是唯一区分手段，队列高亮同时配文字标记。
- `prefers-reduced-motion`（或 options.reducedMotion=true）下：不自动播放，年份停在 2024 年；条长与指标仍按该年份正确计算。其余过渡（条形变色、气泡淡入淡出）保持原时长。

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| height | number | 480 | 场景高度，逻辑像素；窄容器整景按比例缩小 |
| reducedMotion | boolean | 跟随系统 | 覆盖系统的减少动态偏好 |

## 独立实现与六框架交付

- 仅凭本文从零生成可运行的实现。尺寸、颜色、文案、图形和运动算法均以上述文字为准；条形、轴、标记与控件全部用 DOM 与 CSS 绘制（图标用内联 SVG），不加载远程图片、字体、视频或素材。
- 当前交付重点为 React，组件名称 PopulationPyramid。从零创建四个文件：PopulationPyramid.tsx、PopulationPyramidEngine.js、motion-runtime.ts、PopulationPyramidEngine.d.ts；分别实现框架入口、完整交互核心、实例生命周期和类型声明。文件名是需要生成的产物，不假定接收者已经拥有任何文件。
- 同时提供 React、Vue、Svelte、Preact、Vanilla 原生生命周期入口，共享框架无关核心。DOM 仅在挂载后访问，支持同页多实例；更新时保持状态，销毁时清理动画、计时器、观察器及监听器。不要用 iframe 代替组件实现。
- 依赖安装说明：npm install react react-dom。若使用依赖，只使用其公开 API；组件的布局、样式、图形和算法必须在本次生成的文件中完整实现，不引用现成效果组件。
- 实现 options.height 以调整场景高度，options.reducedMotion 覆盖系统偏好；减少动态时不自动播放，停在 2024 年的正确形态。
- 给出每个文件的完整内容、安装和运行步骤、以下使用示例所需的全部实现。不得留省略号、待补素材或"自行补齐核心"的占位。
- 验收：375 / 768 / 1440px 无横向溢出；自动播放时年份连续推进、条形与两个指标同步正确；拖轨与键盘都能定位年份且暂停播放；悬停出气泡；「Born 1958」标记随年份移动；多实例互不干扰，卸载后停止所有任务。

## 使用示例

```tsx
import { PopulationPyramid } from "./PopulationPyramid";

export default function App() {
  return <PopulationPyramid />;
}
```
