# 网格列表形变 — GridListFlip

一张 340×350 的相册视图卡：顶部「Albums」标题与右上角一枚两段式切换（四个小方块＝网格、三条横线＝列表），下面是三列方形照片格，每格是渐变色块加相册名与照片数。点「List」时照片不会消失，而是各自平移到新的位置与尺寸——方块缩成 38px 的小图排成一列，标题与张数从照片右侧淡入；点回「Grid」再反向长回去。全程用 FLIP 手法做形变，照片元素从头到尾没被重建。

## 布局与材质

- 340×350px 场景卡，圆角 28px，display flex、flex-direction column、内边距 16px，溢出裁切；底色 `var(--ux-surface)`，外圈 1px `var(--ux-line)` 描边加 `0 30px 60px -36px var(--ux-shadow-strong)` 阴影。
- 头部：flex 垂直居中、两端对齐、margin-bottom 12px。标题「Albums」18px/850。
  - 切换器：flex、gap 2px、内边距 3px、圆角 11px、底色 `var(--ux-surface-2)`，`role="group"`、aria-label「View」。两枚按钮 34×28px、border 0、圆角 8px、grid 居中、无底色、取 `var(--ux-ink-3)`；选中态（aria-pressed="true"）底色 `var(--ux-surface)`、文字 `var(--ux-ink)`、外圈 1px `var(--ux-line)` 阴影。
  - 图标为 16×16 内联 SVG，`fill: none`、`stroke: currentColor`、线宽 2、圆头：网格是四枚 5×5、圆角 1px 的方块，位于 (2,2)、(9,2)、(2,9)、(9,9)；列表是三条横线 `M2 4h12 M2 8h12 M2 12h12`。
- 内容网格：`display: grid`、三列、gap 8px；列表态改为一列、gap 6px。
  - 每条目 flex column、min-width 0；列表态改为 flex row、垂直居中、gap 12px。
  - 照片块 aspect-ratio 1、圆角 14px、底色 `var(--bg)`（各自一条 CSS 渐变）、`transform-origin: 0 0`，role="img" 并以相册名作 aria-label；列表态固定 38×38px、取消 aspect-ratio、圆角 10px、flex none。
  - 文字块默认 display none，列表态改为 block：标题 14px/780、单行省略；张数 12px/650、取 `var(--ux-ink-3)`。
- 场景令牌用 `light-dark()` 写两套（浅色 | 深色，跟随宿主 `prefers-color-scheme`）：`--ux-surface` #FFFFFF | #13141C；`--ux-surface-2` #F5F3EF | #1A1B25；`--ux-ink` #16151B | #F4F0E8；`--ux-ink-3` #8E8A97 | rgba(244,240,232,.42)；`--ux-line` rgba(22,21,27,.09) | rgba(255,255,255,.08)；`--ux-shadow-strong` rgba(40,30,80,.3) | rgba(0,0,0,.72)。
- 字体：整卡继承宿主字体栈（根层不声明 font-family）；场景固定 340px 宽，容器变窄时整景按比例缩小，不做自适应重排。

## 数据

- 六张相册写死，每个是「相册名 / 照片数」：`Jeju sea` 12 photos、`Kyoto alleys` 24 photos、`Seorak autumn` 18 photos、`Busan at night` 9 photos、`Paris morning` 31 photos、`Namhae sunset` 15 photos。
- 每张照片块用一条 CSS 渐变当画面，依次为：`linear-gradient(#74C0FC,#1C7ED6)`、`linear-gradient(135deg,#FFD8A8,#E8590C)`、`linear-gradient(135deg,#FFA94D,#C92A2A)`、`linear-gradient(#364FC7,#0B0C12)`、`linear-gradient(135deg,#FFDEEB,#BAC8FF)`、`linear-gradient(#FFD43B,#F76707 60%,#5F3DC4)`。
- 文案写死：标题「Albums」、切换器的 aria-label「View」、按钮 aria-label 分别是「Grid view」「List view」。
- 无外部数据请求，无图片素材。

## 操作和动效

- 点切换按钮触发一次视图切换：先量下每张照片此刻相对卡片的 x、y、宽、高（测量时按卡片实际宽度与视觉宽度之比换算，消除整体缩放带来的误差），再切换布局类并量下新位置，最后用 Web Animations API 让照片从旧位形变到新位形变。
- 照片的形变关键帧：从 `translate(旧x-新x, 旧y-新y) scale(旧宽/新宽, 旧高/新高)` 到 `transform: none`；圆角在动画里用「目标圆角 ÷ 缩放比」表示，保证视觉圆角恒定（网格态 14px、列表态 10px）。时长 560ms、缓动 `cubic-bezier(.3,1.15,.4,1)`，每个条目按顺序延迟 25ms，`fill: backwards` 保证延迟期间元素就位在起始形变上。
- 切到列表态时，文字块额外从 opacity 0、translateX(-10px) 淡入到原位，时长 320ms、延迟 300ms 再按条目递增 30ms，`fill: backwards`。
- 切回网格态时文字块直接隐藏，照片按同一套 FLIP 规则长回原位。
- 点当前已经生效的那枚按钮不会触发任何动画。
- 组件没有自动播放与循环动画。
- `prefers-reduced-motion`：切换时跳过 FLIP 动画，照片直接就位（布局与状态照常变化），场景内的过渡归零。
- 键盘：两枚切换按钮是原生 button，可用 Tab 聚焦、回车或空格触发；focus-visible 为 2px `var(--ux-accent)` 外圈、偏移 2px。
- 无障碍：切换器是 role="group" 并带 aria-label「View」，两枚按钮用 aria-pressed 标记当前视图；每个照片块是 role="img"、aria-label 为相册名。

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| height | number | 350 | 场景高度，逻辑像素；窄容器整景按比例缩小 |
| reducedMotion | boolean | 跟随系统 | 覆盖系统的减少动态偏好 |

## 独立实现与六框架交付

- 仅凭本文从零生成可运行的实现。尺寸、颜色、文案、图形和运动算法均以上述文字为准；所有装饰用 CSS 与内联 SVG 绘制，不加载远程图片、字体、视频或素材。
- 当前交付重点为 React，组件名称 GridListFlip。从零创建四个文件：GridListFlip.tsx、GridListFlipEngine.js、motion-runtime.ts、GridListFlipEngine.d.ts；分别实现框架入口、完整交互核心、实例生命周期和类型声明。文件名是需要生成的产物，不假定接收者已经拥有任何文件。
- 同时提供 React、Vue、Svelte、Solid、Preact、Vanilla 原生生命周期入口，共享框架无关核心。DOM 仅在挂载后访问，支持同页多实例；更新时保持状态，销毁时清理动画、计时器、观察器及监听器。不要用 iframe 代替组件实现。
- 依赖安装说明：npm install react react-dom。若使用依赖，只使用其公开 API；组件的布局、样式、图形和算法必须在本次生成的文件中完整实现，不引用现成效果组件。
- 实现 options.height 以调整场景高度，options.reducedMotion 覆盖系统偏好；减少动态仍保留完整状态。
- 给出每个文件的完整内容、安装和运行步骤、以下使用示例所需的全部实现。不得留省略号、待补素材或「自行补齐核心」的占位。
- 验收：375 / 768 / 1440px 无横向溢出；网格与列表互相切换时照片连续形变不闪烁、圆角保持一致、文字块在列表态出现；浅色深色两套令牌正确；多实例互不干扰，卸载后停止所有任务。

## 使用示例

```tsx
import { GridListFlip } from "./GridListFlip";

export default function App() {
  return <GridListFlip />;
}
```
