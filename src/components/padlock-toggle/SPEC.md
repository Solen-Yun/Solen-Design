# 挂锁开合开关 — PadlockToggle

制作「挂锁开合开关」：一张 340×300 的文件隐私卡片。中央是一枚 96×112 的大挂锁（SVG 绘制锁梁、锁体、钥匙孔），下方是文件名 "Q2 budget.pdf"、一枚 Private/Shared 状态胶囊加一句说明，底部压着一排首尾相叠的圆形头像。点击挂锁开锁：钥匙孔像插入钥匙一样转到侧向，锁梁弹起、右腿悬空离开锁体，同时一枚薄荷绿光圈从锁体后方扩散一次，状态胶囊变 Shared、五个头像按次序弹入；再点一次锁梁落回扣紧、锁体被压一下再回弹，状态回到 Private、头像收回。

## 布局与材质

- 340×300px 场景卡，内边距 22px 20px 24px，圆角 28px，垂直居中排列（flex 纵向、align-items:center），溢出裁切。底色为表面色（浅色 #FFFFFF、深色 #13141C），外圈 1px 线色描边（浅色 rgba(22,21,27,.09)、深色 rgba(255,255,255,.08)），下方 0 30px 60px -36px 强阴影（浅色 rgba(40,30,80,.3)、深色 rgba(0,0,0,.72)）。窄容器时整景按 transform:scale 等比缩小。
- 挂锁是一个 96×112px 的原生按钮（无边框、无背景、圆角 20px、cursor:pointer），内含 viewBox 0 0 96 112 的 SVG（overflow:visible）。锁梁为路径 M28 70 V40 a20 20 0 0 1 40 0 V60：fill:none、stroke 9px 圆头，颜色随状态色变量（见下）；锁体为 rect x=12 y=52 宽 72 高 56、rx=16，填充同一状态色；钥匙孔为 cx=48 cy=76 r=7 的圆加 x=45 y=78 宽 6 高 13、rx=3 的杆，填充表面色（挖空效果）。锁体组变换原点 (48,108)，钥匙孔组变换原点 (48,80)。
- 状态色：锁定时整套锁为墨色（浅色 #16151B、深色 #F4F0E8）；开锁后转为薄荷绿 #119C72（深色 #7EE8C0），锁梁与锁体的填充/描边各带 0.35s 颜色过渡。
- 光圈铺在按钮内、卡片坐标系下水平居中、顶部 72% 处：96×96px 的圆（自身再以 margin -48px 居中），background 为径向渐变（薄荷绿 35% → transparent 70%），pointer-events:none，平时 opacity:0，只在脉冲帧播放。
- 文件名在锁下方间距 14px：字号 15px/字重 800，墨色。状态行在文件名下间距 6px：水平排列、间距 6px，整体字号 13px/字重 650、三级墨色（浅色 #8E8A97、深色 rgba(244,240,232,.42)）。行首胶囊内边距 3px 8px、圆角 999px：锁定时背景次级表面色（浅色 #F5F3EF、深色 #1A1B25）、文字 11.5px/字重 800 次级墨色（浅色 #57535F、深色 rgba(244,240,232,.68)）；开锁后背景变为薄荷绿 18% 透明色、文字薄荷绿，颜色过渡 0.3s。
- 底部头像行贴卡片底边（margin-top:auto），高 32px，五个头像各 32×32px 圆形、135deg 双色渐变、2.5px 表面色描边，左移 -8px 首尾相叠（第一个不偏移）。五组渐变色依次：#8E95A8→#5B6275、#FF8A5B→#FFD166、#38D9A9→#3D8BFF、#B49CFF→#FF6B9D、#74C0FC→#5C7CFA。
- 场景令牌浅色深色两套（light-dark() 随 prefers-color-scheme 切换），如上；组件未声明字体栈，文字继承页面字体。

## 数据

- 写死文案：文件名 "Q2 budget.pdf"；锁定时胶囊 "Private"、说明 "Only you can view"；开锁后胶囊 "Shared"、说明 "Anyone with the link can view"。
- 写死 5 个匿名头像（无姓名、无图片，纯渐变圆），颜色见上节。
- 挂锁按钮 aria-label "Document lock"；aria-pressed 表达「锁定」语义：锁定时 "true"，开锁后 "false"。除以上内容外无其他写死数据。

## 操作和动效

- 唯一交互是点击挂锁按钮（原生 button，Enter/Space 等价；focus-visible 时 2px accent 外圈、外扩 6px）。每次点击先提交并取消上一轮未完动画，再按新状态播放一轮 Web Animations。
- 开锁时序：钥匙孔先从当前角度转到 -90deg（220ms，cubic-bezier(.4,0,.2,1)）；200ms 后锁梁三段弹起——0 到 55% 处升到 translateY(-19px)、最终停在 translateY(-15px)，总时长 480ms、缓动 cubic-bezier(.2,.9,.3,1)，右腿随之脱离锁体形成缺口（锁梁路径左腿延长到 y=70，始终留在锁体内）；同期锁体在 30% 处被轻微下压（translateY(2px) scale(1.02,.97)）后复原，时长 360ms、ease-out。锁体背后 96×96 的径向光圈（薄荷绿 35% → transparent 70%）以 0.8s ease-out 关键帧从 opacity 1、scale(.6) 扩散到 opacity 0、scale(1.7)，播放到 animationend 后移除 is-pulse 触发类，可反复触发（每次先移除类、强制回流再加回）。
- 关锁时序：锁梁从 -15px 先上探 -21px（25% 处）再下落，75% 处砸到 +1.5px，最后归位，总时长 440ms、cubic-bezier(.5,0,.4,1)；锁体在 62% 之后被压下（translateY(2px) scale(1.04,.94)）再弹回，总时长 560ms；钥匙孔延迟 380ms 转回 0deg（220ms，cubic-bezier(.4,0,.2,1)）。
- 头像随状态联动：锁定时仅第 1 个可见，其余 opacity:0、translateX(-10px) scale(.5)；开锁后五个依序显现，第 i 个延迟 calc(i×70ms + 350ms)，位移用弹性曲线 cubic-bezier(.34,1.56,.64,1)（时长 0.5s），透明度 0.3s。
- prefers-reduced-motion 下：开合各步骤不播动画，直接跳到最终形态（锁梁 -15px / 归位、钥匙孔转角）；光圈不扩散；头像与颜色过渡全部关闭，状态瞬时切换。options.reducedMotion 可覆盖系统偏好。
- 更新 options 不重挂载组件，支持同页多实例互不干扰，卸载时取消所有进行中的动画并清理监听。

## Props

| Prop | Type | Default | Description |
| height | number | 300 | 场景高度，逻辑像素；窄容器整景按比例缩小 |
| reducedMotion | boolean | 跟随系统 | 覆盖系统的减少动态偏好 |

## 独立实现与六框架交付

- 仅凭本文从零生成可运行的实现。尺寸、颜色、文案与关键帧均以上述文字为准；挂锁与头像全部用内联 SVG 与 CSS 渐变绘制，不加载远程图片、字体、视频或素材。
- 当前交付重点为 React，组件名称 PadlockToggle。从零创建四个文件：PadlockToggle.tsx、PadlockToggleEngine.js、motion-runtime.ts、PadlockToggleEngine.d.ts；分别实现框架入口、完整交互核心、实例生命周期和类型声明。文件名是需要生成的产物，不假定接收者已经拥有任何文件。
- 同时提供 React、Vue、Svelte、Solid、Preact、Vanilla 原生生命周期入口，共享框架无关核心。DOM 仅在挂载后访问，支持同页多实例；更新时保持状态，销毁时清理动画、计时器、观察器及监听器。不要用 iframe 代替组件实现。
- 依赖安装说明：npm install react react-dom。若使用依赖，只使用其公开 API；组件的布局、样式、图形和算法必须在本次生成的文件中完整实现，不引用现成效果组件。
- 实现 options.height 以调整场景高度，options.reducedMotion 覆盖系统偏好；减少动态下开合结果仍正确。
- 给出每个文件的完整内容、安装和运行步骤、以下使用示例所需的全部实现。不得留省略号、待补素材或"自行补齐核心"的占位。
- 验收：375 / 768 / 1440px 无横向溢出；连续快速点击状态与形态始终一致；开/关两条动画时序与上述参数一致；浅色深色两套令牌正确；多实例互不干扰，卸载后停止所有任务。

## 使用示例

```tsx
import { PadlockToggle } from "./PadlockToggle";

export default function App() {
  return <PadlockToggle />;
}
```
