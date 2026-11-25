# 跟随滚动目录 — ScrollspyToc

制作「跟随滚动目录」场景：一张 340×330 的文档看板，左边是可滚动的正文栏，右边是一条 118px 宽的目录栏。正文依次排着五章，每章一个 16px 粗体标题、一段说明文字，偶数章还配一条 60px 高的条纹占位图。右侧目录栏顶端写着 "On this page"，下面是五章标题，标题左侧有一条 2px 的竖轨。滚动正文时，可见的那一章标题转深色加粗，同时一条 2px 强调色标记条在目录里上下滑动并伸缩，盖住当前可见的章节区间。点目录里的任一章节名，正文平滑滚到该章开头。

## 布局与材质

- 340×330px 场景卡，圆角 28px，溢出裁切。卡片是横向 flex：左边正文栏 `flex:1`，右边目录栏 `flex:none`。底色为表面色，外圈 1px 线色描边，下方 0 30px 60px -36px 强阴影，背景纯色无纹理。
- 场景令牌用 CSS `light-dark()` 写浅色/深色两套，随宿主 `color-scheme` 切换（展示页默认浅色）：表面 `--ux-surface` #FFFFFF / #13141C，次级面 `--ux-surface-2` #F5F3EF / #1A1B25，三级面 `--ux-surface-3` #EAE7E1 / #252632，墨色 `--ux-ink` #16151B / #F4F0E8，次级墨色 `--ux-ink-2` #57535F / rgba(244,240,232,.68)，三级墨色 `--ux-ink-3` #8E8A97 / rgba(244,240,232,.42)，线 `--ux-line` rgba(22,21,27,.09) / rgba(255,255,255,.08)，强线 `--ux-line-2` rgba(22,21,27,.17) / rgba(255,255,255,.16)，强调色 `--ux-accent` #6A57F2 / #B7A4FF，强调浅底 rgba(106,87,242,.12) / rgba(183,164,255,.15)，强调字色 #FFFFFF / #0B0C12，薄荷 #119C72 / #7EE8C0，警告 #D6731E / #FFB26B，危险 #D93A55 / #FF7D8C，玻璃 rgba(255,255,255,.58) / rgba(255,255,255,.07)，玻璃边 rgba(255,255,255,.85) / rgba(255,255,255,.18)，阴影 rgba(40,30,80,.14) / rgba(0,0,0,.45)，强阴影 rgba(40,30,80,.3) / rgba(0,0,0,.72)，渐变 linear-gradient(120deg,#7B61FF,#3D8BFF 55%,#1FB89A) / linear-gradient(120deg,#B7A4FF,#7DB4FF 55%,#A5F2D3)；另有回弹缓动 `--ux-spring` cubic-bezier(.34,1.56,.64,1)。组件不声明 `font-family`，继承宿主字体。
- 正文栏相对定位、纵向可滚动，内边距 14px 12px 120px 18px（下边留 120px 让末章能滚到顶），隐藏滚动条（`scrollbar-width:none` 且 WebKit 滚动条 `display:none`），聚焦时不出外框线。它带 `tabindex="0"`，可用键盘滚动。
- 每个章节块内边距 8px 0 14px：标题 `h4` 无 margin，16px/字重 850、字距 -0.02em；正文段上距 6px，13px、行高 1.65、次级墨色；偶数章额外有一条占位图，块级、高 60px、上距 8px、圆角 10px，底纹是 `repeating-linear-gradient(90deg, var(--ux-surface-2) 0 46%, transparent 46% 50%)` 的竖条纹。
- 目录栏相对定位、宽 118px，内边距 16px 12px 16px 16px，左侧一道 1px 线色竖分隔线。栏内标题 "On this page" 为 11px/750、三级墨色，下距 8px。
- 目录列表相对定位、无 margin、list-style none、左内边距 10px。列表本身画一条 2px 竖轨：伪元素绝对定位在 left 0、top 0、bottom 0、宽 2px、圆角 2px、底色线色。
- 目录项是原生按钮：块级、宽 100%、内边距 6px 0、无边框无底色、左对齐、12.5px/650、三级墨色，颜色过渡 0.25s；当前章加 `.on`，颜色转墨色、字重提到 800。
- 强调色标记条是列表内的绝对定位元素：left 0、top 0、宽 2px、圆角 2px、底色强调色，位移与高度各走 0.35s 回弹缓动。
- 场景没有断点级布局变化：整景按 340×330 固定尺寸绘制，容器变窄时由运行时整体等比缩放，内部不重排；`options.height` 只改场景高度。

## 数据

- 章节写死 5 条，每条是 [标题, 说明]：
  1. Getting started — Installing takes a single line. Run the command and the files you need are added to your project along with a default config.
  2. Theming — It uses two sets of color tokens, light and dark. Map them to your project's variables and they follow along.
  3. Components — Common pieces like buttons, inputs and menus are collected here. Take only the ones you need.
  4. Accessibility — Every element works with the keyboard and carries names for screen readers.
  5. Deploying — The build output is static files. Upload them to any host as they are.
- 目录栏固定文案一处："On this page"。
- 目录按钮文字与章节标题完全相同；正文与目录都从同一份章节数组渲染，顺序一致。
- 占位条纹图只出现在第 1、3、5 章（序号为偶数的那些），第 2、4 章没有图。
- 无外部数据源，组件不请求任何接口。

## 操作和动效

- 滚动正文栏时触发重算：每次 scroll 事件都用 requestAnimationFrame 合并成一次绘制。绘制时逐章计算可见比例——取该章顶与正文视口上下边的交集高度，除以该章总高，得到 0 到 1 的比例。
- 当前章判定：取可见比例最高的那一章（并列时取先出现的那章）作为当前章，它的目录按钮加 `.on`（墨色、800 字重），其余恢复三级墨色；当前章按钮同时写入 `aria-current="true"`，其余章节移除该属性。
- 标记条区间：可见比例大于 0.12 的章节算作"在看"，取其中第一与最后一章。标记条的位移目标是区间首章目录项相对列表顶部的偏移，高度是区间末章目录项的底部减去首章顶部；两者各走 0.35s 回弹缓动，形成一条盖住整个可见章节区间的强调色竖条。若一章都不可见，区间退化为可见比例最高的那一章。
- 初始进入时也绘制一次，因此不滚动也能看到第一段标记条与高亮。
- 点目录里的章节名：正文栏滚动到该章 `offsetTop - 6` 的位置，让章节上方留 6px 余量；默认用平滑滚动，减少动态时改为瞬时滚动（behavior 取 auto）。
- 键盘：正文栏可聚焦（`tabindex="0"`）后用方向键滚动，滚动会照常驱动高亮与标记条；目录项是原生按钮，可用 Tab 逐个到达并回车触发跳转。
- 无障碍：目录栏是 `nav` 且带 aria-label "Contents"；正文滚动容器带 aria-label "Document body"；当前章节按钮带 `aria-current="true"`。
- `prefers-reduced-motion: reduce`（或 options.reducedMotion 为真）时：目录跳转改为瞬时滚动；运行时同时给宿主打上 `data-reduced-motion=true`，把内部所有 transition/animation 时长压成 0，标记条的位移与伸缩变为瞬时到位，高亮状态仍完整。

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| height | number | 330 | 场景高度，逻辑像素；窄容器整景按比例缩小 |
| reducedMotion | boolean | 跟随系统 | 覆盖系统的减少动态偏好 |

## 独立实现与六框架交付

- 仅凭本文从零生成可运行的实现。尺寸、颜色、文案、图形和运动算法均以上述文字为准；所有装饰用 CSS 与内联 SVG 绘制，不加载远程图片、字体、视频或素材。
- 当前交付重点为 React，组件名称 ScrollspyToc。从零创建四个文件：ScrollspyToc.tsx、ScrollspyTocEngine.js、motion-runtime.ts、ScrollspyTocEngine.d.ts；分别实现框架入口、完整交互核心、实例生命周期和类型声明。文件名是需要生成的产物，不假定接收者已经拥有任何文件。
- 同时提供 React、Vue、Svelte、Solid、Preact、Vanilla 原生生命周期入口，共享框架无关核心。DOM 仅在挂载后访问，支持同页多实例；更新时保持状态，销毁时清理动画、计时器、观察器及监听器。不要用 iframe 代替组件实现。
- 依赖安装说明：npm install react react-dom。若使用依赖，只使用其公开 API；组件的布局、样式、图形和算法必须在本次生成的文件中完整实现，不引用现成效果组件。
- 实现 options.height 以调整场景高度，options.reducedMotion 覆盖系统偏好；减少动态效果仍保留当前章高亮与标记条区间。
- 给出每个文件的完整内容、安装和运行步骤、以下使用示例所需的全部实现。不得留省略号、待补素材或"自行补齐核心"的占位。
- 验收：375 / 768 / 1440px 无横向溢出；滚动可逆，高亮与标记条始终跟随；点目录能跳到章首；浅色深色两套令牌正确；多实例互不干扰，卸载后停止所有任务。

## 使用示例

```tsx
import { ScrollspyToc } from "./ScrollspyToc";

export default function App() {
  return <ScrollspyToc />;
}
```
