# 文字透景视频标题 — VideoTextTitle

一张 340×340 的主视觉卡：正中是一行 92px 的超大标题「Summer / is here」，字本身透明，背景被裁进字形里——于是海浪、日落、森林三种画面只在字母内部流动，字外仍是干净的底色。标题上方是眉标「2026 season collection」，底部一排胶囊切换场景（Ocean / Sunset / Forest），最右是一枚圆形播放/暂停按钮。把指针移到标题上，画面会跟着指针在字母里游走；点胶囊换场景时，整卡先被底色盖住一瞬再翻开新画面。

## 布局与材质

- 340×340px 场景卡，圆角 30px，溢出裁切；底色 `var(--ux-surface)`，外圈 1px `var(--ux-line)` 描边加 `0 30px 60px -36px var(--ux-shadow-strong)` 阴影。
- 眉标：绝对定位 left/right 0、top 34px、居中、10.5px/850、字距 .14em、取 `var(--ux-ink-3)`，文字「2026 season collection」。
- 大标题：绝对定位 left/right 0、top 58px、margin 0、居中、92px/0.92、字重 950、字距 -.06em，`color: transparent` 并用 `background-clip: text` 把背景裁进字形。背景尺寸 240% 240%，位置由 `--bx`（默认 30%）与 `--by`（默认 40%）控制，过渡 background-position .6s `cubic-bezier(.2,.8,.3,1)`。三套场景各自一组 background-image：
  - Ocean（data-s="0"）：`radial-gradient(30% 40% at 30% 30%, #E0F2FE, transparent 70%)`、`repeating-linear-gradient(170deg, #0EA5E9 0 14px, #0284C7 14px 30px, #38BDF8 30px 40px)`、`linear-gradient(#7DD3FC, #0369A1)`——层叠的横向波纹就是海面。
  - Sunset（data-s="1"）：`radial-gradient(22% 28% at 60% 62%, #FEF3C7, #FB923C 40%, transparent 70%)`、`linear-gradient(180deg, #7C3AED, #EC4899 45%, #F97316 70%, #7C2D12)`——一枚低垂的落日压在紫到橙的竖向渐变上。
  - Forest（data-s="2"）：`radial-gradient(20% 30% at 70% 20%, #FEF9C3, transparent 70%)`、`repeating-linear-gradient(80deg, #14532D 0 10px, #166534 10px 22px, #22C55E 22px 26px)`、`linear-gradient(#86EFAC, #14532D)`——斜向的深浅条纹就是树冠与穿过林间的光。
- 换场遮罩：绝对定位 inset 0、底色 `var(--ux-surface)`、opacity 0、pointer-events none，过渡 opacity .25s；换场期间升到 .85，把画面压成一瞬的白再翻开。
- 底栏：绝对定位 left/right 18px、bottom 22px、flex 垂直居中、gap 6px。
  - 胶囊组 role="group"、aria-label「Choose scene」，flex、gap 6px。胶囊 border 0、内边距 7px 12px、圆角 999px、底色 `var(--ux-surface-2)`、`inset 0 0 0 1px var(--ux-line)`、11.5px/800、取 `var(--ux-ink-2)`，inline-flex 垂直居中、gap 6px，过渡 background .2s、color .2s；前面一枚 10×10px 圆点，取该场景的主题色。选中态底色 `var(--ux-ink)`、文字 `var(--ux-surface)`、去掉描边。
  - 播放/暂停按钮 margin-left auto、34×34px、圆角 50%、底色 `var(--ux-surface-2)`、`inset 0 0 0 1px var(--ux-line)`、取 `var(--ux-ink)`、grid 居中；内含两枚 12×12 内联 SVG，暂停是两根竖条（rect x2 / x7，宽 3、高 9、圆角 .8），播放是一个三角（`M3 1.5v9l7.5-4.5z`），播放中显示暂停图标、暂停时显示播放图标。
- 场景令牌用 `light-dark()` 写两套（浅色 | 深色，跟随宿主 `prefers-color-scheme`）：`--ux-surface` #FFFFFF | #13141C；`--ux-surface-2` #F5F3EF | #1A1B25；`--ux-ink` #16151B | #F4F0E8；`--ux-ink-2` #57535F | rgba(244,240,232,.68)；`--ux-ink-3` #8E8A97 | rgba(244,240,232,.42)；`--ux-line` rgba(22,21,27,.09) | rgba(255,255,255,.08)；`--ux-accent` #6A57F2 | #B7A4FF；`--ux-shadow-strong` rgba(40,30,80,.3) | rgba(0,0,0,.72)。
- 字体：整卡继承宿主字体栈（根层不声明 font-family）；场景固定 340px 宽，容器变窄时整景按比例缩小，不做自适应重排。

## 数据

- 三个场景写死：Ocean、Sunset、Forest，对应圆点色 #0EA5E9、#F97316、#22C55E，默认选中 Ocean。
- 三套场景的背景层写死（见上），逐层写死色标与尺寸：Ocean 的波纹为 170° 方向、条纹周期 40px（14px 浅蓝、16px 深蓝、10px 天蓝）；Sunset 为 180° 的四段竖向渐变（#7C3AED → #EC4899 45% → #F97316 70% → #7C2D12）；Forest 的条纹为 80° 方向、周期 26px（10px #14532D、12px #166534、4px #22C55E）。
- 标题文案写死：「Summer」与「is here」两行；眉标写死「2026 season collection」。
- 无外部数据请求，无图片与视频文件——所谓「视频」完全由 CSS 渐变与动画模拟。

## 操作和动效

- 播放中标题的背景以 9s 一轮的 linear 无限关键帧流动：background-position 从 0% 30% 走到 100% 70%，再回到 0% 30%，于是字里的画面持续横向推移。场景根节点带 is-play 时启动该动画。
- 点播放/暂停按钮在 is-play 之间切换，按钮的 aria-label 随之在「Pause」与「Play」之间切换；暂停时背景停在当前位置。
- 指针移到标题上：标题加 is-hov，流动动画暂停，背景停在当前帧；指针在标题范围内移动时，背景视口位置 `--bx` / `--by` 按指针相对标题的位置在 20%–80% 之间取值（横向 20 + 60×比例，纵向 20 + 60×比例），因此字里的画面跟着指针走；移出标题后恢复流动动画，位置停在最后取值。
- 点场景胶囊：先把该枚胶囊置为选中（同时更新 aria-pressed），然后盖上一层 85% 的底色遮罩，230ms 后换成新场景的 background-image 并撤去遮罩，遮罩自身 0.25s 淡出，于是观感是先被底色吞掉再翻出新画面。
- 组件没有自动播放之外的其它逻辑；场景切换不自动循环。
- `prefers-reduced-motion`：流动动画关闭、遮罩过渡归零，场景切换直接换 background-image 而不经过遮罩；播放按钮保持暂停状态（不会有流动画面）。
- 键盘：三枚胶囊与播放按钮都是原生 button，可用 Tab 聚焦、回车或空格触发；focus-visible 为 2px `var(--ux-accent)` 外圈、偏移 2px。
- 无障碍：胶囊组是 role="group" 并带 aria-label「Choose scene」，每枚胶囊用 aria-pressed 标记当前场景；播放按钮带「Play」「Pause」两态的 aria-label。

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| height | number | 340 | 场景高度，逻辑像素；窄容器整景按比例缩小 |
| reducedMotion | boolean | 跟随系统 | 覆盖系统的减少动态偏好 |

## 独立实现与六框架交付

- 仅凭本文从零生成可运行的实现。尺寸、颜色、文案、图形和运动算法均以上述文字为准；所有装饰用 CSS 与内联 SVG 绘制，不加载远程图片、字体、视频或素材。
- 当前交付重点为 React，组件名称 VideoTextTitle。从零创建四个文件：VideoTextTitle.tsx、VideoTextTitleEngine.js、motion-runtime.ts、VideoTextTitleEngine.d.ts；分别实现框架入口、完整交互核心、实例生命周期和类型声明。文件名是需要生成的产物，不假定接收者已经拥有任何文件。
- 同时提供 React、Vue、Svelte、Solid、Preact、Vanilla 原生生命周期入口，共享框架无关核心。DOM 仅在挂载后访问，支持同页多实例；更新时保持状态，销毁时清理动画、计时器、观察器及监听器。不要用 iframe 代替组件实现。
- 依赖安装说明：npm install react react-dom。若使用依赖，只使用其公开 API；组件的布局、样式、图形和算法必须在本次生成的文件中完整实现，不引用现成效果组件。
- 实现 options.height 以调整场景高度，options.reducedMotion 覆盖系统偏好；减少动态仍保留完整状态。
- 给出每个文件的完整内容、安装和运行步骤、以下使用示例所需的全部实现。不得留省略号、待补素材或「自行补齐核心」的占位。
- 验收：375 / 768 / 1440px 无横向溢出；背景只在字形内可见、三套场景正确、流动动画与指针跟随正常、播放暂停可切、换场遮罩时序正确；浅色深色两套令牌正确；多实例互不干扰，卸载后停止所有任务。

## 使用示例

```tsx
import { VideoTextTitle } from "./VideoTextTitle";

export default function App() {
  return <VideoTextTitle />;
}
```
