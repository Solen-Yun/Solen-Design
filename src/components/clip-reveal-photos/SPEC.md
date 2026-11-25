# 滚动裂缝展开相册 — ClipRevealPhotos

制作「滚动裂缝展开相册」场景：一块 300×500 的竖向画布，标题 A year of scenes 与副题 Four photos 之下纵向排着四张 300px 高的风景照（全部用 CSS 渐变绘制，不加载任何图片）。每张照片初始是一条中缝——画面左右各被裁掉 46%，只留中央 8% 宽的窄条并放大 1.3 倍；随着滚动把照片顶边从视口下部 10% 处推到 42% 高度处，裂缝向两侧匀速张开直到整幅显影，同时内部图像从 1.3 倍缩回 1 倍、图下方的标题字幕从下浮 30px 的半透明状态升入定位。滚动回退时整个过程精确可逆。

## 布局与材质

- 300×500px 场景卡（宽 300、高 500，注意不是 340 见方），圆角 30px，溢出裁切。底色表面色，外圈 0 0 0 1px 线色描边加 0 30px 60px -36px 强阴影。场景令牌浅色/深色两套（CSS light-dark，`prefers-color-scheme: dark` 切换）：表面 #FFFFFF/#13141C，次表面 #F5F3EF/#1A1B25，三级表面 #EAE7E1/#252632，墨色 #16151B/#F4F0E8，三级墨 #8E8A97/rgba(244,240,232,.42)，线色 rgba(22,21,27,.09)/rgba(255,255,255,.08)。
- 内部是一层绝对铺满的滚动容器：overflow-y auto、内边距 22px 16px 80px（底部留大空白保证最后一张也能推到揭示区）、两侧滚动条全部隐藏（scrollbar-width none 与 ::-webkit-scrollbar 隐藏）、outline none；容器 tabindex 0，aria-label 为 Photo set, scroll to view，使键盘焦点落在容器后可直接用方向键翻页。
- 标题 A year of scenes：24px/字重 880、字距 -0.04em。副题 Four photos：12.5px/字重 700、三级墨色，margin 为上 2px、下 220px（把第一张照片推离揭示区，留出「先读题再下滑」的欣赏节奏）。
- 每张照片是一个 figure，margin-bottom 44px。相框高 300px、圆角 20px、溢出裁切，并施加 `clip-path: inset(0 calc(var(--c) × 46%) 0 calc(var(--c) × 46%) round 20px)`——--c 为闭合度 0–1，闭合时左右各内缩 46%，只留中央 8% 宽的缝，展开时为整幅；圆角始终由 inset 的 round 20px 保持；相框带 role="img"，aria-label 取照片标题。
- 相框内的图像层绝对定位 inset -6%（四周多出 6% 供缩放裁切，放大时不露边），transform 为 scale(1 + --c × 0.3)：闭合时 1.3 倍放大、展开后回到 1 倍，缩放与裂缝同用一个 --c，天然同步。图像背景为纯 CSS 渐变（见数据）。
- 字幕在相框下方 margin-top 10px：透明度 1 − --c × 3（裂缝行程过三分之一即完全显影）、位移 translateY(--c × 30px)（闭合时沉在下方 30px）；标题行 16px/字重 850，地点行 12px/字重 700、三级墨色。

## 数据

- 四张照片写死（标题，地点 · 时刻）：Dawn sea，Gangneung · 5:40 AM；Misty forest，Odaesan · 7:10 AM；Sunset bridge，Seoul · 6:25 PM；Field of falling stars，Pyeongchang · 11:50 PM。
- 四幅画面全部用 CSS 渐变合成，无任何位图：① Dawn sea 为 `linear-gradient(#FFD8A8 0,#FFC078 30%,#74C0FC 55%,#1C7ED6 100%)` 的海上晨光；② Misty forest 为 50% 30% 处一枚 60%×40% 白色 80% 透明光斑叠 `linear-gradient(#C3D0C8,#5C7F6B 70%,#2B4B3A)` 的雾林；③ Sunset bridge 为 70% 45% 处 30%×20% 的 #FFE066 落日光斑叠 `linear-gradient(#5F3DC4,#E8590C 55%,#343A40 56%,#212529)` 的桥影黄昏；④ Field of falling stars 为四枚 1–1.5px 白色星点（20% 20%、60% 30%、80% 15%、40% 40%）叠 `linear-gradient(#0B1340,#3B2C7A 60%,#1B4332 61%,#081C15)` 的星雨夜原。
- 揭示区间写死：照片顶边 y 从视口高度（滚动容器 clientHeight）落到 0.42 倍视口高的过程中，闭合度 --c 由 1 线性降为 0，公式 c = clamp((y − 0.42×vh) / (0.48×vh), 0, 1)，vh 为容器高。

## 操作和动效

- 揭示区间的精确行为：闭合度 --c 保持 1（全闭）直到照片顶边越过滚动视口高度的 90% 处；随后顶边继续上移，越过的行程按 (y − 0.42×vh) / (0.48×vh) 线性换算为开度，顶边到达 42% 视口高时裂缝完全张开、--c 归 0。四张照片各自独立按自己的顶边位置计算，互不影响。
- 全部动效由滚动位置插值驱动、无时间动画：scroll 监听为 passive，回调经 requestAnimationFrame 合帧（每帧至多一次重算，帧号复用避免堆积），开度写入时保留三位小数；初始挂载即计算一次，保证首帧状态正确。向上或向下滚动均即时更新 --c，裂缝开合、图像缩放与字幕位移完全可逆。
- 键盘：滚动容器可聚焦（tabindex 0、自身 outline 关闭、无可见焦点框），聚焦后方向键与 PageUp/PageDown 按浏览器原生滚动行为翻阅；鼠标滚轮、触摸滑动同路径。
- 无障碍：相框 role="img" 且 aria-label 为照片名，字幕为 figcaption，标题/副题按正文段落语义输出；两枚装饰渐变不额外声明角色。
- `prefers-reduced-motion`：本组件没有自主时间动画，动效完全跟随滚动位置，减少动态偏好不改变视觉结果（运行时宿主关闭的过渡在此不存在，无需降级分支）。
- options.height 调整场景高度（默认 500），窄容器整景按比例缩小（运行时按容器宽与 300 的比例整体缩放）；options.reducedMotion 覆盖系统偏好。支持同页多实例，更新选项不重挂载，卸载时移除滚动监听并取消帧回调。

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| height | number | 500 | 场景高度，逻辑像素；窄容器整景按比例缩小 |
| reducedMotion | boolean | 跟随系统 | 覆盖系统的减少动态偏好 |

## 独立实现与六框架交付

- 仅凭本文从零生成可运行的实现。尺寸、颜色、文案、渐变配方与插值算法均以上述文字为准；四幅「照片」必须用纯 CSS 渐变绘制，不加载远程图片、字体、视频或素材。
- 当前交付重点为 React，组件名称 ClipRevealPhotos。从零创建四个文件：ClipRevealPhotos.tsx、ClipRevealPhotosEngine.js、motion-runtime.ts、ClipRevealPhotosEngine.d.ts；分别实现框架入口、完整交互核心、实例生命周期和类型声明。文件名是需要生成的产物，不假定接收者已经拥有任何文件。
- 同时提供 React、Vue、Svelte、Solid、Preact、Vanilla 原生生命周期入口，共享框架无关核心。DOM 仅在挂载后访问，支持同页多实例；更新时保持状态，销毁时清理动画、计时器、观察器及监听器。不要用 iframe 代替组件实现。
- 依赖安装说明：npm install react react-dom。若使用依赖，只使用其公开 API；组件的布局、样式与算法必须在本次生成的文件中完整实现，不引用现成效果组件。
- 实现 options.height 以调整场景高度，options.reducedMotion 覆盖系统偏好；滚动插值保持可逆。
- 给出每个文件的完整内容、安装和运行步骤、以下使用示例所需的全部实现。不得留省略号、待补素材或「自行补齐核心」的占位。
- 验收：375 / 768 / 1440px 无横向溢出；裂缝随滚动开合可逆、字幕随程浮现；浅色深色两套令牌正确；多实例互不干扰，卸载后停止所有任务。

## 使用示例

```tsx
import { ClipRevealPhotos } from "./ClipRevealPhotos";

export default function App() {
  return <ClipRevealPhotos />;
}
```
