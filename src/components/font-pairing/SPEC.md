# 字体配对与字阶 — FontPairing

一张 340×340 的字体设置面板：顶部一排四枚配对胶囊（Modern / Editorial / Tech / Classic），第二排是字阶比例单选，主体是一张实时排版预览卡（标题 + 小标题 + 正文三段），预览卡右侧立着一根三档字阶标尺，把当前比例换算成真实 px 标出来；底栏左侧是一行可复制的 CSS 变量，右侧是「Copy CSS」按钮。切换配对时整块预览先模糊一下再随新字族锐化出来，切换字阶时标题、小标题和标尺色条一起缩放。

## 布局与材质

- 340×340px 场景卡，圆角 30px，溢出裁切；底色 `var(--ux-surface)`，外圈 1px `var(--ux-line)` 描边加 `0 30px 60px -36px var(--ux-shadow-strong)` 阴影。
- 四枚配对胶囊：绝对定位 left/right 12px、top 12px，四列网格、gap 5px。单枚 50px 高、圆角 12px、底色 `var(--ux-surface-2)`、`inset 0 0 0 1px var(--ux-line)`、文字 9.5px/800 取 `var(--ux-ink-2)`；胶囊上半是「Aa」样张，17px/1.1 取 `var(--ux-ink)`，字族与字重按配对逐项内联设置；下半是配对名称。选中态底色换成 `var(--ux-surface)`，描边加粗成 `inset 0 0 0 2px var(--ux-ink)`。
- 字阶行：绝对定位 left/right 12px、top 70px，flex 垂直居中、gap 4px、10px/800 取 `var(--ux-ink-3)`；行首可见文字「Scale ratio」占位把后面的比例按钮推到右端。四个比例按钮 24px 高、内边距 0 8px、圆角 7px、无底色，等宽 `ui-monospace, SFMono-Regular, Menlo, monospace` 10px/800。选中态底色 `var(--ux-ink)`、文字 `var(--ux-surface)`。
- 预览卡：绝对定位 left/right 12px、top 102px、bottom 56px，flex、gap 10px、内边距 14px、圆角 16px、底色 `var(--ux-surface-2)`、溢出裁切。
  - 文本块 flex:1、min-width:0，过渡 `filter .2s, opacity .2s`；模糊态为 `filter: blur(4px)` 加 `opacity: .3`。
  - 标题 h3：margin 0，字族 `var(--hf)`、字重 `var(--hw)`、字号 `calc(11.5px * var(--r) * var(--r) * var(--r))`、行高 1.15、字距 -.02em。
  - 小标题 h4：margin 10px 0 0，字族 `var(--hf)`、字重 `var(--hw)`、字号 `calc(11.5px * var(--r))`、行高 1.25、取 `var(--ux-ink-2)`。
  - 正文 p：margin 6px 0 0，字族 `var(--bf)`、11.5px/1.55、字重 500、取 `var(--ux-ink-2)`。
  - 标尺列：flex none、宽 44px、左侧 1px 虚线 `var(--ux-line)`、内边距 8px 0 0 8px、等宽 9px/800 取 `var(--ux-ink-3)`；三行都是「色条 + 数字」，色条 3px 高、圆角 2px、底色 `var(--ux-accent)`。
- 底栏：绝对定位 left/right 12px、bottom 12px，flex 垂直居中、gap 8px。左侧 CSS 变量条 flex:1、min-width:0、内边距 9px 10px、圆角 10px、底色 `var(--ux-surface-2)`、等宽 9.5px 取 `var(--ux-ink-2)`、单行省略；右侧按钮 34px 高、内边距 0 12px、圆角 10px、底色 `var(--ux-ink)`、文字 `var(--ux-surface)`、11px/850。
- 场景令牌用 `light-dark()` 写两套（浅色 | 深色，跟随宿主 `prefers-color-scheme`）：`--ux-surface` #FFFFFF | #13141C；`--ux-surface-2` #F5F3EF | #1A1B25；`--ux-ink` #16151B | #F4F0E8；`--ux-ink-2` #57535F | rgba(244,240,232,.68)；`--ux-ink-3` #8E8A97 | rgba(244,240,232,.42)；`--ux-line` rgba(22,21,27,.09) | rgba(255,255,255,.08)；`--ux-accent` #6A57F2 | #B7A4FF；`--ux-shadow-strong` rgba(40,30,80,.3) | rgba(0,0,0,.72)。
- 字体：正文继承宿主字体栈（组件根层不声明 font-family）；比例按钮、标尺和 CSS 变量条用 `ui-monospace, SFMono-Regular, Menlo, monospace`；预览区字族由 `--hf` / `--bf` 两个变量控制。场景固定 340px 宽，不做自适应重排，容器变窄时整景按比例缩小。

## 数据

- 四套配对写死在代码里：Modern = 标题 `system-ui,sans-serif` / 800 + 正文 `system-ui,sans-serif`；Editorial = 标题 `Georgia,serif` / 700 + 正文 `system-ui,sans-serif`；Tech = 标题 `ui-monospace,Menlo,monospace` / 700 + 正文 `system-ui,sans-serif`；Classic = 标题 `Georgia,serif` / 700 + 正文 `Georgia,serif`。胶囊里的「Aa」样张直接用该套的标题字族与字重渲染。
- 四个字阶比例：1.125、1.25、1.333、1.5，按钮上原样印这三个数字；初始选中第二个（1.25），配对初始选中 Modern。
- 预览三段文案写死：标题「Big stories from small shops」；小标题「A neighborhood bakery goes online」；正文「The bread we bake every morning now comes to your door. Order by 9 PM the night before.」
- 标尺以 16px 为基准字号，三行依次对应 r³、r、1 的实际 px：r=1.125 时 23 / 18 / 16；r=1.25 时 31 / 20 / 16；r=1.333 时 38 / 21 / 16；r=1.5 时 54 / 24 / 16。每行色条宽度 = 该 px × 0.6，最大 28px。
- 底部 CSS 变量条常驻内容 `--font-head:<标题字族首项>; --scale:<当前比例>;`。
- 无外部数据请求，无图片、图标或字体素材。

## 操作和动效

- 点击配对胶囊：若与当前项相同则忽略；否则预览文本块立刻进入模糊态（blur 4px、opacity .3），190ms 后换上新字族、字重与当前比例并解除模糊，字号在 0.45s `cubic-bezier(.3,1.1,.4,1)` 内过渡到位。
- 点击字阶按钮：立即重算 `--r`，标题与小标题字号、标尺色条宽度各自 0.45s `cubic-bezier(.3,1.1,.4,1)` 过渡；字阶切换不经过模糊过程。
- 点「Copy CSS」：把 `:root { --font-head: …; --font-body: …; --scale: …; }` 交给 `navigator.clipboard.writeText`（写入失败静默忽略），按钮底色变 #059669、文字改为「Copied」，1500ms 后恢复原底色与「Copy CSS」。
- 组件没有自动播放和循环动画，全部状态由交互驱动。
- `prefers-reduced-motion`：预览块、标题、小标题与标尺色条的过渡全部归零；切配对时跳过模糊过程直接换字族。
- 键盘：两排控件都是原生 button，可 Tab 逐个聚焦、回车或空格触发；focus-visible 为 2px `var(--ux-accent)` 外圈、偏移 2px。
- 无障碍：配对排为 `role="radiogroup"`（aria-label「Font pairing」），字阶排为 `role="radiogroup"`（可见文字「Scale ratio」），每个按钮 `role="radio"` 并用 `aria-checked` 标记选中态；样张与标尺为纯展示。

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| height | number | 340 | 场景高度，逻辑像素；窄容器整景按比例缩小 |
| reducedMotion | boolean | 跟随系统 | 覆盖系统的减少动态偏好 |

## 独立实现与六框架交付

- 仅凭本文从零生成可运行的实现。尺寸、颜色、文案、图形和运动算法均以上述文字为准；所有装饰用 CSS 与内联 SVG 绘制，不加载远程图片、字体、视频或素材。
- 当前交付重点为 React，组件名称 FontPairing。从零创建四个文件：FontPairing.tsx、FontPairingEngine.js、motion-runtime.ts、FontPairingEngine.d.ts；分别实现框架入口、完整交互核心、实例生命周期和类型声明。文件名是需要生成的产物，不假定接收者已经拥有任何文件。
- 同时提供 React、Vue、Svelte、Solid、Preact、Vanilla 原生生命周期入口，共享框架无关核心。DOM 仅在挂载后访问，支持同页多实例；更新时保持状态，销毁时清理动画、计时器、观察器及监听器。不要用 iframe 代替组件实现。
- 依赖安装说明：npm install react react-dom。若使用依赖，只使用其公开 API；组件的布局、样式、图形和算法必须在本次生成的文件中完整实现，不引用现成效果组件。
- 实现 options.height 以调整场景高度，options.reducedMotion 覆盖系统偏好；减少动态仍保留完整状态。
- 给出每个文件的完整内容、安装和运行步骤、以下使用示例所需的全部实现。不得留省略号、待补素材或「自行补齐核心」的占位。
- 验收：375 / 768 / 1440px 无横向溢出；四套配对与四档字阶切换正确、模糊与锐化可辨；标尺数字与 CSS 变量条同步；复制按钮反馈正确；浅色深色两套令牌正确；多实例互不干扰，卸载后停止所有任务。

## 使用示例

```tsx
import { FontPairing } from "./FontPairing";

export default function App() {
  return <FontPairing />;
}
```
