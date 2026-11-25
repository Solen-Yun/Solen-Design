# 卷帘页面转场 — PageTransitionCurtain

制作「卷帘页面转场」场景：一张 340×340 的迷你站点卡片，顶部是品牌「Maison」和三枚菜单胶囊（Home / Work / About），下方是当前页面的栏目标签、两行大标题和一张圆角图片块。点击另一枚菜单时，一块珊瑚红色帘幕从底部升起盖住整屏、中央短暂显示目标页名，再向上抬升离场，揭示已切换的新页面——新内容按固定延迟依次上浮入场，菜单滑块同步滑到新按钮下方。

## 布局与材质

- 340×340px 场景卡，圆角 30px，overflow hidden。场景根是 340×340 的无底色包装层（水平居中于容器），卡片视觉放在其内部的绝对填充层上——文档演示舞台会剥离场景根的背景，卡片底色必须在嵌套层上才能保留。容器窄于 340px 时整景等比缩小（缩放比 = min(1, 可用宽/340)，上限 1），宿主元素高度随之收缩。
- 卡片底色写死为 #FBF7F2，文字基色 #22201C；外圈 1px 描边（rgba(22,21,27,.09)）加投影 0 30px 60px -36px（rgba(40,30,80,.3)）。全部颜色均为写死的浅色值，不随 prefers-color-scheme 翻转；场景内声明的 --ux-* 设计令牌（表面 #FFFFFF/#13141C、墨色 #16151B/#F4F0E8、accent #6A57F2/#B7A4FF 等）在本组件的可见样式里未被引用。不加载远程字体，字体继承宿主页面。
- 顶部导航：absolute，左 18px、右 18px、上 16px，z-index 4，flex 单行。左侧品牌 b 标签「Maison」，13px/字重 900、字距 -.02em，margin-right:auto 推开菜单。右侧菜单条：内边距 3px、圆角 999px、底色 rgba(34,32,28,.06)，内部三枚按钮各 padding 5px 11px、圆角 999px、11px/字重 800、色 #5E5850，按钮之间 gap 2px。当前项文字变 #FBF7F2；一枚 #22201C 实底胶囊滑块 absolute 定位在菜单条内（上下各留 3px），left/width 由 JS 写成当前按钮的 offsetLeft/offsetWidth，transition 均为 .45s cubic-bezier(.3,1.3,.5,1)。
- 页面内容层 absolute inset 0，padding 66px 18px 18px：栏目标签 small 为 10px/字重 850、字距 .08em、色 #E2725B；大标题 h3 上边距 6px、26px/行高 1.14/字重 900、字距 -.045em，标题内含 `<br>` 分两行；图片块 absolute，左 18px、右 18px、下 18px、高 118px、圆角 16px，背景为对应页面的 135deg 双色 CSS 渐变。
- 色帘层 absolute inset 0、z-index 3、底色 #E2725B、文字 #FBF7F2、30px/字重 900、字距 -.04em、grid 居中、pointer-events:none。静止时 translateY(101%) 藏在卡片下方；帘中央的页名 span 初始 opacity 0、translateY(10px)。
- 内容入场/退场统一走 [data-s] 规则：transition opacity .5s、transform .7s cubic-bezier(.2,.8,.2,1)，延迟由各元素的 --d 决定（标签 .05s、标题 .12s、图片块 .22s）；退场类 is-hide 下 opacity:0、translateY(18px) 且 transition:none（瞬时下潜，等帘幕遮住后由 JS 挂上）。

## 数据

- 三页数据写死在实现里，初始停在第一页：
  - Home：栏目标签「Living magazine」，标题「How to use good<br>things for longer」，图片块渐变 linear-gradient(135deg,#F1D3B3,#C98F6A)；
  - Work：栏目标签「Portfolio」，标题「Twelve things<br>we made this year」，渐变 linear-gradient(135deg,#B9D4C8,#4F7F6B)；
  - About：栏目标签「About the studio」，标题「A small team<br>making slowly」，渐变 linear-gradient(135deg,#D6D0F0,#7C6FB8)。
- 品牌名「Maison」与三枚菜单文字 Home / Work / About 均为写死文案，色帘中央显示的页名即菜单文字本身。

## 操作和动效

- 点击一枚菜单触发转场；点击当前页或转场进行中（busy 锁）时直接忽略。固定时序：
  1. 菜单滑块以 .45s cubic-bezier(.3,1.3,.5,1) 滑到新按钮下方，当前类与 aria-current 同步切换；色帘挂 is-cover 类，transform 过渡 .5s cubic-bezier(.7,0,.2,1) 从底部升至盖屏；帘中页名在 .25s 延迟后淡入并上浮归位（opacity .3s、transform .4s）。
  2. 520ms 后（帘幕已遮屏），切换页面文案与图片渐变，并挂 is-hide 让旧内容瞬时潜下。
  3. 再过 380ms（累计 900ms），摘 is-cover、挂 is-lift，色帘以 .55s cubic-bezier(.7,0,.2,1) 向上抬升离场；同一帧摘 is-hide，新内容按 .05s/.12s/.22s 延迟依次上浮入场。
  4. 帘幕抬升开始 600ms 后摘 is-lift 并释放 busy，允许下一次转场。多次转场互不叠加，中间状态由 is-cover/is-lift/is-hide 三个类的组合表达。
- 无自动播放、无循环，转场仅由点击驱动。
- 键盘与无障碍：菜单为原生 button，可 Tab 聚焦、Enter/Space 触发；focus-visible 外圈 2px solid #E2725B、offset 2px。菜单容器 role="navigation"、aria-label「Site menu」，当前按钮带 aria-current="page"，滑块 aria-hidden；页面内容层 aria-live="polite"，切页后辅助技术朗读新内容；色帘整体 aria-hidden。
- prefers-reduced-motion: reduce（或 options.reducedMotion=true）下：色帘 display:none，点击菜单直接切换内容、无帘幕动画，内容入场过渡也全部关闭。
- options.height 调整场景高度（默认 340）；options.reducedMotion 覆盖系统偏好。更新选项就地合并并重算尺寸，不重挂载；卸载时清理计时器、帧回调与事件监听。样式在 Shadow DOM 内，同页多实例互不干扰。

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| height | number | 340 | 场景高度，逻辑像素；窄容器整景按比例缩小 |
| reducedMotion | boolean | 跟随系统 | 覆盖系统的减少动态偏好 |

## 独立实现与六框架交付

- 仅凭本文从零生成可运行的实现。尺寸、颜色、文案、图形和运动参数均以上述文字为准；所有装饰用 CSS 与渐变绘制，不加载远程图片、字体、视频或素材。
- 当前交付重点为 React，组件名称 PageTransitionCurtain。从零创建四个文件：PageTransitionCurtain.tsx、PageTransitionCurtainEngine.js、motion-runtime.ts、PageTransitionCurtainEngine.d.ts；分别实现框架入口、完整交互核心、实例生命周期和类型声明。文件名是需要生成的产物，不假定接收者已经拥有任何文件。
- 同时提供 React、Vue、Svelte、Solid、Preact、Vanilla 原生生命周期入口，共享框架无关核心。DOM 仅在挂载后访问，支持同页多实例；更新时保持状态，销毁时清理动画、计时器、观察器及监听器。不要用 iframe 代替组件实现。
- 依赖安装说明：npm install react react-dom。若使用依赖，只使用其公开 API；组件的布局、样式、图形和算法必须在本次生成的文件中完整实现，不引用现成效果组件。
- 实现 options.height 以调整场景高度，options.reducedMotion 覆盖系统偏好；减少动态下仍能正确切换页面内容。
- 给出每个文件的完整内容、安装和运行步骤、以下使用示例所需的全部实现。不得留省略号、待补素材或「自行补齐核心」的占位。
- 验收：375 / 768 / 1440px 无横向溢出；点击菜单的转场次序（升起→换页→抬升）完整正确；转场中重复点击被忽略；减少动态直切；多实例互不干扰，卸载后停止所有任务。

## 使用示例

```tsx
import { PageTransitionCurtain } from "./PageTransitionCurtain";

export default function App() {
  return <PageTransitionCurtain />;
}
```
