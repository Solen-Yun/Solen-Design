# 无障碍显示面板 — A11yPanel

制作一张 340×340 的站点场景：右侧下方角落一枚蓝色圆形人形按钮，点它就弹出一张 "Display settings" 面板，面板里可以调文字大小（A− / A+ 加一格百分比读数）、开三个开关（High contrast 高对比、Highlight links 高亮链接、Wider line spacing 加宽行距）、按 Reset 复原。改动立刻作用到背后的示例文章页：标题、正文与链接跟着放大缩小，高对比开关把整页翻成黑底白字、链接转亮黄，加宽行距把正文行距从 1.6 拉到 2.0，高亮链接给链接加双线下划线与一圈描边。面板右上角没有关闭键，按 Escape 或再点一次角落按钮都能收起。

## 布局与材质

- 340×340px 场景卡，圆角 30px，overflow 裁切；底色为表面色纯色，外圈 `0 0 0 1px` 线色描边，下方 `0 30px 60px -36px` 强阴影。根节点上带两个可变变量：`--fs`（字号倍率，初始 1）与 `--lh`（正文行高，初始 1.6）。
- 文章页层绝对铺满、内边距 22px 20px，底色取 `var(--bg, transparent)`、文字取 `var(--fg, 墨色)`，过渡 background 0.3s、color 0.3s。高对比开启时这一层改用 `--bg: #000`、`--fg: #fff`，正文色另用 `--pc: #fff`。
  - 标题 "Spring garden care"：字号 `calc(20px * var(--fs))`、900、字距 -0.03em，字号过渡 0.3s。
  - 正文一段：上外边距 10px、字号 `calc(12px * var(--fs))`、行高 `var(--lh)`、字重 600、色 `var(--pc, 次级墨色)`，字号与行高各 0.3s 过渡。
  - 链接行 flex、间距 14px、上外边距 12px：两个链接 "Watering guide" 与 "Seeds we love"，字号 `calc(12px * var(--fs))`、字重 800、主色色、无下划线、4px 圆角，过渡字号 0.3s 与 box-shadow 0.2s。高对比下链接色改为 #FDE047；高亮链接开启后链接加 2px 下划线、下划线偏移 3px、`0 0 0 2px currentColor` 描边、内边距 1px 4px。
- 角落按钮绝对定位 right 14px / bottom 14px、z-index 3，46×46px 圆形、无边框、底色 #2563EB、白色图标、grid 居中，阴影 `0 10px 22px -10px #2563EB`。内含 24×24 人形 SVG：头是 `circle cx=12 cy=4.5 r=2.2` 实心填色，身体是 `path M4.5 8.5 l7.5 1.5 7.5-1.5 M12 10 v5 m0 0 l-3.5 6.5 M12 15 l3.5 6.5`，无填充、描边 2.2、圆头圆角连接。按钮无障碍名 "Open display settings"，并带 `aria-expanded`。
- 设置面板绝对定位 right 14px / bottom 70px、z-index 3，宽 212px、内边距 12px、18px 圆角、表面色底、墨色字，阴影 `0 0 0 1px` 线色加 `0 22px 44px -16px rgba(0,0,0,.4)`；变换原点为面板自身右下角外侧 `calc(100% - 23px) calc(100% + 34px)`，收起时 scale(.5) + opacity 0 且不吃指针事件，展开时 transform 归零、opacity 1、恢复指针事件，过渡 transform 0.35s cubic-bezier(.3,1.4,.5,1)、opacity 0.2s。面板容器带 `role="dialog"`，`aria-hidden` 随开合同步。
- 面板标题 "Display settings" 为 12.5px / 900。
- 字号行 flex、间距 6px、上外边距 10px、内边距 6px、11px 圆角、表面色 2 号底：标签 "Text size" 占满剩余空间、11px / 800；减号按钮 28×28px、8px 圆角、无边框、表面色底 + `inset 0 0 0 1px` 线色、墨色字、字重 900，字号 10px，无障碍名 "Smaller text"；读数 10.5px / 850、三级墨色、等宽数字、最小宽 34px、居中；加号按钮同尺寸、字号 14px，无障碍名 "Larger text"。按钮禁用时 opacity 0.35、光标 default。
- 开关行 flex、上下居中、左右分布、上外边距 6px、内边距 6px 6px 6px 8px、11px / 800。开关本体 34×20px、无边框、10px 圆角、表面色 3 号底、背景过渡 0.2s；滑块是伪元素，16×16px 白圆、`0 1px 2px rgba(0,0,0,.25)` 阴影、初始 left 2px / top 2px，开启时右移 14px，过渡 transform 0.25s cubic-bezier(.3,1.5,.5,1)；开启时轨道底色改为 #2563EB。开关是 `role="switch"` 的按钮，带 `aria-checked` 与以开关名为内容的无障碍名。
- Reset 按钮通栏、高 30px、上外边距 6px、9px 圆角、透明底、三级墨色、10.5px / 800。
- 场景令牌用 CSS `light-dark()` 随 `color-scheme` 切换，浅色 / 深色两套：表面 #FFFFFF / #13141C，表面 2 #F5F3EF / #1A1B25，表面 3 #EAE7E1 / #252632，墨色 #16151B / #F4F0E8，次级墨色 #57535F / rgba(244,240,232,.68)，三级墨色 #8E8A97 / rgba(244,240,232,.42)，线色 rgba(22,21,27,.09) / rgba(255,255,255,.08)，强线 rgba(22,21,27,.17) / rgba(255,255,255,.16)，主色 #6A57F2 / #B7A4FF，主色 2 #2F8FE0 / #7DB4FF，主色淡底 rgba(106,87,242,.12) / rgba(183,164,255,.15)，主色字 #FFFFFF / #0B0C12，薄荷 #119C72 / #7EE8C0，警告 #D6731E / #FFB26B，危险 #D93A55 / #FF7D8C，玻璃 rgba(255,255,255,.58) / rgba(255,255,255,.07)，玻璃线 rgba(255,255,255,.85) / rgba(255,255,255,.18)，阴影 rgba(40,30,80,.14) / rgba(0,0,0,.45)，强阴影 rgba(40,30,80,.3) / rgba(0,0,0,.72)。高对比配色（#000 / #fff / #FDE047）与开关蓝 #2563EB 是固定值，不随深色令牌变化；组件不声明字体族，继承宿主页面字体；按钮统一 `font: inherit`。
- 组件只有 `@media (prefers-reduced-motion: reduce)` 一个媒体查询；场景是固定 340px 宽的等比缩放画布，容器变窄时整景按 `min(1, 可用宽/340)` 缩小，内部用绝对定位，不做响应式重排。

## 数据

- 示例文章：标题 "Spring garden care"；正文一段 "Once it warms up, check the soil first. Loosening soil packed down over winter lets the roots breathe."；两个链接 "Watering guide" 与 "Seeds we love"。
- 面板标题 "Display settings"，字号行标签 "Text size"，按钮无障碍名 "Smaller text" 与 "Larger text"，Reset 按钮文案 "Reset"，角落按钮无障碍名 "Open display settings"。
- 三个开关文案与对应标记类，顺序固定：High contrast（标记类 is-hc）、Highlight links（标记类 is-ln）、Wider line spacing（标记类 is-lh）。
- 字号档位共 4 档，倍率与读数一一对应：0.9 → 90%、1 → 100%、1.15 → 115%、1.3 → 130%，初始停在 100% 一档（第二档）。读数是倍率乘 100 后四舍五入的整数加百分号。
- 行高只有两档：默认 1.6，开启 "Wider line spacing" 后为 2.0。

## 操作和动效

- 点角落按钮开合面板：根节点切换 `is-open` 类，面板从右下角放大到原位并淡入（transform 0.35s cubic-bezier(.3,1.4,.5,1)、opacity 0.2s），角落按钮的 `aria-expanded` 同步，面板的 `aria-hidden` 同步。打开 200ms 后焦点移到面板里的加号按钮；关闭时焦点回到角落按钮。
- 按 Escape：若面板处于打开状态则收起并把焦点还给角落按钮（键监听挂在根节点上）。
- 调字号：点加号往上一档、点减号往下一档，到达两端时对应按钮禁用。倍率写进根节点的 `--fs`，标题、正文、链接三处字号同时按倍率变化，读数同步刷新。倍率变化带 0.3s 的字号过渡，是平滑放大缩小而不是瞬跳。
- 三个开关各自独立：切一个就立刻同步一次——根节点切换对应标记类，开关的 `aria-checked` 更新，页面随之变化：
  - High contrast：文章页变黑底白字，正文色改纯白，链接色改为亮黄 #FDE047。
  - Highlight links：两个链接加 2px 下划线、下划线偏移 3px，外加一圈 `0 0 0 2px currentColor` 的描边（颜色即链接色），并补 1px 4px 内边距。
  - Wider line spacing：正文行高从 1.6 变为 2.0（通过 `--lh` 变量实现，同时给根节点加上 is-lh 标记类）。
- 点 Reset：字号回到 100%、三个开关全部关闭、页面恢复原样（高对比、高亮链接、行距三处一起复原）。
- 示例文章里的两个链接会被拦截，点了不跳转、也不改变任何状态。
- 无障碍：面板容器 `role="dialog"` 并带 `aria-hidden`；三个开关是 `role="switch"` 的按钮，带 `aria-checked` 与自身文案作为无障碍名；字号按钮带 "Smaller text" / "Larger text" 无障碍名；所有按钮 focus-visible 时 2px #2563EB 描边、外偏移 2px。
- `prefers-reduced-motion: reduce`（或 `options.reducedMotion` 为真）时：面板出入、页面底色与文字变色、字号与行高变化三组过渡全部关闭，改动直接生效；功能与最终画面完全保留。
- 支持同页多实例：查询限定在各自 ShadowRoot 内，不使用全局 id；卸载时清理计时器、事件监听与观察器。

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| height | number | 340 | 场景高度，逻辑像素；窄容器整景按比例缩小 |
| reducedMotion | boolean | 跟随系统 | 覆盖系统的减少动态偏好 |

## 独立实现与六框架交付

- 仅凭本文从零生成可运行的实现。尺寸、颜色、文案、图形和运动算法均以上述文字为准；所有装饰用 CSS 与内联 SVG 绘制，不加载远程图片、字体、视频或素材。
- 当前交付重点为 React，组件名称 A11yPanel。从零创建四个文件：A11yPanel.tsx、A11yPanelEngine.js、motion-runtime.ts、A11yPanelEngine.d.ts；分别实现框架入口、完整交互核心、实例生命周期和类型声明。文件名是需要生成的产物，不假定接收者已经拥有任何文件。
- 同时提供 React、Vue、Svelte、Solid、Preact、Vanilla 原生生命周期入口，共享框架无关核心。DOM 仅在挂载后访问，支持同页多实例；更新时保持状态，销毁时清理动画、计时器、观察器及监听器。不要用 iframe 代替组件实现。
- 依赖安装说明：npm install react react-dom。若使用依赖，只使用其公开 API；组件的布局、样式、图形和算法必须在本次生成的文件中完整实现，不引用现成效果组件。
- 实现 options.height 以调整场景高度，options.reducedMotion 覆盖系统偏好；减少动态效果仍保留完整流程状态。
- 给出每个文件的完整内容、安装和运行步骤、以下使用示例所需的全部实现。不得留省略号、待补素材或"自行补齐核心"的占位。
- 验收：375 / 768 / 1440px 无横向溢出；字号四档、三个开关、Reset 复原、Escape 收起都正确；浅色深色两套令牌正确；多实例互不干扰，卸载后停止所有任务。

## 使用示例

```tsx
import { A11yPanel } from "./A11yPanel";

export default function App() {
  return <A11yPanel />;
}
