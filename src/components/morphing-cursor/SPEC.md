# 目标形变光标 — MorphingCursor

340×340 的文章片段场景，场景内的原生指针被隐藏，代之以一枚自绘光标层。顶部一行是三枚圆角图标按钮与一枚 "Follow" 胶囊按钮，中间是一段英文短文，底部左侧是一块渐变占位图、右侧是一条下划线链接 "Learn more"。光标默认是 16px 的深色圆点，移到按钮上就拉伸成包住按钮的圆角矩形，移到正文上收成 3×24 的细竖条，移到图片上变成 64px 白圆并写上 "View"，移到链接上变成 30px 紫色圆并写上 "→"；光标的位置用弹簧插值追随指针，形状则用 CSS 过渡插值。

## 布局与材质

- 场景 340×340px，圆角 30px，overflow hidden，背景 #F7F5F0，正文色 #22201C，内边距 22px，纵向 flex、gap 16px。外圈 1px 线色描边加 0 30px 60px -36px 的强阴影。场景根与所有后代都设 cursor:none，把系统指针完全隐藏。
- 工具行横向 flex，gap 8px，垂直居中。三枚图标按钮各 42×42px、圆角 14px、白底 #fff、0 0 0 1px rgba(34,32,28,.08) 描边，grid 居中，内含 18×18px 线性图标（描边 2px、fill none）：心形、分享上箭头、书签，aria-label 依次为 Like、Share、Save。行尾 "Follow" 胶囊按钮：margin-left auto，高 38px，内边距 0 18px，圆角 999px，底色 #22201C，字色 #F7F5F0，13px/750。
- 段落 margin 0，14px/1.6，字重 550，色 #3B3832，word-break keep-all。文案为 "Motion adds story to a screen. When the cursor takes on the shape of what it points at, your fingertip knows what it can do before you click."
- 底部行横向 flex，gap 14px，底对齐，margin-top auto。占位图 150×104px、圆角 16px、背景 linear-gradient(140deg,#FFB86B,#F06595 60%,#845EF7)。"Learn more" 链接 14px/800、色 #22201C、text-decoration underline、text-underline-offset 4px、内边距 6px 0。
- 光标层 absolute 定位在左上 0，初始 16×16px、圆角 999px、底色 rgba(34,32,28,.85)、白字 12px/800、pointer-events none、z-index 5、opacity 0。过渡为 width .28s cubic-bezier(.3,1.4,.5,1)、height .28s cubic-bezier(.3,1.4,.5,1)、border-radius .28s、background .2s、opacity .2s。层内有一行标签，12px/800、white-space nowrap，默认 opacity 0，过渡 opacity .2s。
- 光标状态色：命中按钮时底色 rgba(34,32,28,.1)，标签仍隐藏；命中正文时底色 #845EF7，标签隐藏；命中图片时底色 rgba(255,255,255,.92)、字色 #22201C、加 0 10px 24px -8px rgba(0,0,0,.4) 阴影，标签淡入；命中链接时底色 #845EF7，标签淡入。
- 焦点样式：图标按钮、Follow 与 Learn more 在 :focus-visible 时描 outline 2px solid #845EF7，outline-offset 3px。
- 场景令牌在根元素上声明浅深两套（用 light-dark()，取哪一套取决于宿主页面的 color-scheme，未声明时按浅色）：--ux-surface #FFFFFF/#13141C、--ux-surface-2 #F5F3EF/#1A1B25、--ux-surface-3 #EAE7E1/#252632、--ux-ink #16151B/#F4F0E8、--ux-ink-2 #57535F/rgba(244,240,232,.68)、--ux-ink-3 #8E8A97/rgba(244,240,232,.42)、--ux-line rgba(22,21,27,.09)/rgba(255,255,255,.08)、--ux-line-2 rgba(22,21,27,.17)/rgba(255,255,255,.16)、--ux-accent #6A57F2/#B7A4FF、--ux-accent-2 #2F8FE0/#7DB4FF、--ux-accent-soft、--ux-accent-ink、--ux-mint #119C72/#7EE8C0、--ux-warn #D6731E/#FFB26B、--ux-danger #D93A55/#FF7D8C、--ux-glass、--ux-glass-line、--ux-shadow、--ux-shadow-strong、--ux-grad。画面里可见的元素用的是上面写死的色值，不随深色方案改变；令牌供内部扩展使用。
- 响应式：场景按 340×340 逻辑像素排版，容器比 340px 窄时整景等比缩小（最小 1 倍缩放，上限为 1），不裁切内容。

## 数据

- 组件不接收外部数据。场景内的文案全部写死：三个图标按钮的 aria-label 为 Like、Share、Save，按钮文字为 Follow，段落为上引的那句英文，图旁链接文字为 Learn more。
- 光标的四类命中目标通过元素上的 data-k 标记区分：btn（三个图标按钮与 Follow）、text（段落）、img（占位图）、link（Learn more）。

## 操作和动效

- 指针进入场景由 pointermove 驱动。每次移动先用 elementFromPoint 拿到指针正下方的元素，再向上找最近的带 data-k 的祖先，判定当前命中类型；若该元素不在场景内则视为无命中。
- 命中类型决定目标形状与标签：无命中时目标为 16×16 的圆，标签为空；命中 btn 时目标框是按钮矩形宽高各加 8px、圆角取按钮自身的计算圆角（图标按钮 14px、Follow 999px），标签为空；命中 text 时目标为 3×24 的竖条、圆角 2px；命中 img 时目标为 64×64 的圆，标签写 "View"；命中 link 时目标为 30×30 的圆，标签写 "→"。
- 命中按钮时目标点会被拉向按钮中心：目标点 = 按钮中心 + (指针位置 − 按钮中心) × 0.15，也就是指针越靠近按钮中心，光标越稳，越靠边就越多地贴向按钮。
- 位置跟随是弹簧积分：每帧 dt 取 0 至 33ms，vel += ((目标 − 位置) × 420 − vel × 30) × dt，位置 += vel × dt。当 |目标x − 位置x| + |目标y − 位置y| ≤ 0.2 且 |vel.x| + |vel.y| ≤ 1 时停止帧循环，直到下一次指针移动重新启动。
- 形状切换交给 CSS 过渡（宽高 280ms、回弹曲线 cubic-bezier(.3,1.4,.5,1)，圆角 280ms），位置则每帧直接写 transform: translate(x, y)，坐标保留 1 位小数，圆心对齐光标中心。
- 光标层初次出现时不做滑入，直接把弹簧位置吸附到指针处再淡入（opacity .2s）。指针移出场景时光标淡出、命中状态清空、按钮框缓存清空。
- 减少动态（系统 prefers-reduced-motion: reduce，或 options.reducedMotion 覆盖为 true）：光标层只保留 opacity .2s 过渡，形状尺寸与圆角不再过渡；位置不做弹簧插值，每帧直接贴到目标点。该状态在挂载时读取一次。
- 键盘操作：三个图标按钮、Follow 与 Learn more 都是原生可聚焦元素，Tab 可依次到达，Enter/Space 触发按钮行为。
- 无障碍：图标按钮带 aria-label，Follow 与 Learn more 有可见文字；Learn more 的默认跳转被阻止，只做视觉反馈；光标层标记 aria-hidden，不进入朗读顺序也不接受焦点。

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| height | number | 340 | 场景高度，逻辑像素；窄容器整景按比例缩小 |
| reducedMotion | boolean | 跟随系统 | 覆盖系统的减少动态偏好 |

## 独立实现与六框架交付

- 仅凭本文从零生成可运行的实现。尺寸、颜色、文案、图形和运动算法均以上述文字为准；所有装饰用 CSS 与内联 SVG 绘制，不加载远程图片、字体、视频或素材。
- 当前交付重点为 React，组件名称 MorphingCursor。从零创建四个文件：MorphingCursor.tsx、MorphingCursorEngine.js、motion-runtime.ts、MorphingCursorEngine.d.ts；分别实现框架入口、完整交互核心、实例生命周期和类型声明。文件名是需要生成的产物，不假定接收者已经拥有任何文件。
- 同时提供 React、Vue、Svelte、Solid、Preact、Vanilla 原生生命周期入口，共享框架无关核心。DOM 仅在挂载后访问，支持同页多实例；更新时保持状态，销毁时清理动画、计时器、观察器及监听器。不要用 iframe 代替组件实现。
- 依赖安装说明：npm install react react-dom。若使用依赖，只使用其公开 API；组件的布局、样式、图形和算法必须在本次生成的文件中完整实现，不引用现成效果组件。
- 实现 options.height 以调整场景高度，options.reducedMotion 覆盖系统偏好；减少动态效果仍保留完整的光标形变与命中状态。
- 给出每个文件的完整内容、安装和运行步骤、以下使用示例所需的全部实现。不得留省略号、待补素材或"自行补齐核心"的占位。
- 验收：375 / 768 / 1440px 无横向溢出；四类命中的形变与标签正确；减少动态直跟无形变；多实例互不干扰，卸载后停止所有任务。

## 使用示例

```tsx
import { MorphingCursor } from "./MorphingCursor";

export default function App() {
  return <MorphingCursor />;
}
```
