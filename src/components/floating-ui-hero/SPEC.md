# 视差浮动产品看板 — FloatingUiHero

一张 340×340 的产品 hero 拼贴：中央一块 196×184 的「Today」任务面板（三行任务，第一行已打勾划线），四周浮着四张小卡——右上 #10B981 徽标的收款通知（金额每 3.2 秒在四个值间轮换）、左侧一枚粉色协作光标加「Minji」名牌、右下 82×30 的营收折线迷你图、左下五星「2,140 reviews」评分卡。五块碎片各自以不同周期上下缓浮，深度系数 0.35 到 1.6 不等；鼠标在场景内移动时各层按深度反向视差漂移（乘数最大 ±8px/±9.6px），移出后缓慢归位。整体是纯展示场景，唯一持续变化的是收款金额与浮动动画。

## 布局与材质

- 场景 340×340px，圆角 30px，溢出裁切。底色为次表面色叠加中央紫色氛围光：radial-gradient(90% 70% at 50% 40%, accent 12% 混色, transparent 70%)；外圈 1px 线色描边，下方 0 30px 60px -36px 强阴影。窄容器里整景等比缩小。
- 通用小卡样式：圆角 14px、背景表面色、外圈 1px 线色加 0 16px 30px -16px 强阴影、内边距 9px 11px、字号 10.5px/字重 700、不换行。
- 五个浮动层（left/top、尺寸、深度系数 data-z、浮动周期 --t、相位 --dl）：
  - 中央任务面板：left 72px、top 78px、196×184px、圆角 16px、背景表面色、外圈 1px 线色加 0 24px 50px -24px 强阴影、内边距 14px、基准字号 11px；深度 0.35、周期 5s（默认值）。标题「Today」12px/900。任务行 flex、间距 8px、margin-top 9px、内边距 7px 8px、圆角 9px、背景次表面色、700 字重、次级墨色；行首 12×12px、圆角 4px 的复选方块（inset 1.6px 三级墨线圈）。三条任务：Design review（完成态：方块填充 accent、文字加删除线转三级墨）、Launch prep、Customer interview（未完成态）。
  - 收款通知：left 176px、top 40px；深度 1.2、周期 4.2s。内容 flex、间距 8px——22×22px、圆角 7px 的 #10B981 实底徽标，白色 ₩ 12px/900；右侧两行：small「Payment received · 」加动态时间词 9px、三级墨色，金额 b 12px、tabular-nums。
  - 协作光标：left 28px、top 150px；深度 1.6（最远层）、周期 3.6s、相位 -1s。无卡片底——16×16 粉色 #EC4899 光标箭头 SVG（路径 M2 1l11 6-5 1.4L6 14z）叠一枚名牌（margin-top 12px、内边距 3px 8px、圆角 999px、#EC4899 实底、白字 10px/800）写「Minji」。
  - 营收迷你图：left 220px、top 196px；深度 0.9、周期 5.4s、相位 -2s。卡宽 104px，small「Revenue this month」9px、三级墨色；下方 82×30 内联 SVG 折线（路径 M1 26 L14 20 L26 23 L39 13 L52 16 L66 7 L81 3，描边 #6366F1、2.2px、圆角端点转折）。
  - 评分卡：left 42px、top 258px；深度 1.4、周期 4.8s、相位 -0.5s。内容 flex、间距 6px——五颗星「★★★★★」色 #F59E0B、字距 1px；「2,140 reviews」。
- 浮动动画：每层外壳用 transition transform .5s cubic-bezier(.2,.8,.3,1) 承载视差位移，内层 div 播 keyframes（目标 translateY(-7px)），周期 ease-in-out infinite alternate，负延迟错开相位。
- 场景令牌含浅色与深色两套（随 prefers-color-scheme 切换）：表面 #FFFFFF/#13141C、次表面 #F5F3EF/#1A1B25、三表面 #EAE7E1/#252632、主墨 #16151B/#F4F0E8、次墨 #57535F/rgba(244,240,232,.68)、三墨 #8E8A97/rgba(244,240,232,.42)、线 rgba(22,21,27,.09)/rgba(255,255,255,.08)、accent #6A57F2/#B7A4FF（氛围光取 accent 12% 混色）；品牌点缀色固定 #10B981、#EC4899、#6366F1、#F59E0B。组件样式不声明页面字体族，继承宿主页面字体；场景无按钮、无焦点目标，全部小卡 aria-hidden，仅收款通知 aria-live="polite"。

## 数据

- 任务面板写死 3 条：Design review（已完成）、Launch prep、Customer interview；标题「Today」。
- 收款通知写死 4 个轮换金额：₩29,000 → ₩54,000 → ₩12,500 → ₩88,000，初始 ₩29,000；时间词写死「just now」，前缀「Payment received · 」。
- 协作光标名字写死「Minji」；迷你图标签「Revenue this month」与 7 个折点坐标写死；评分写死五星与「2,140 reviews」。
- 深度系数写死 5 档：任务面板 0.35、营收图 0.9、收款 1.2、评分 1.4、光标 1.6。不发起任何网络请求。

## 操作和动效

- 持续缓浮：五层各自以 3.6s–5.4s 的周期上下 7px 往返（ease-in-out infinite alternate），负相位（-2s、-1s、-0.5s）让各层错拍，不做同步弹跳。
- 视差跟随：pointermove 把光标位置归一化为 -0.5…+0.5 的偏移，每层位移 = (−偏移×16px×深度, −偏移×12px×深度)，即最浅层最多 ±2.8px/±2.1px、最深层（1.6）最多 ±8px/±9.6px；经 .5s cubic-bezier(.2,.8,.3,1) 过渡形成带惯性的跟随；pointerleave 时全部归零。
- 金额轮换：每 3200ms 换下一个金额（循环），新金额自下方 6px 淡入（translateY(6px)+opacity 0 → 归位，350ms ease-out，Web Animations API）；场景用 IntersectionObserver 监听可见性，不在视口内时跳过换值但计时继续，组件移除后停止。
- prefers-reduced-motion 下（或 options.reducedMotion）：缓浮动画与视差位移全部关闭（move 直接返回、animation:none），拼贴静止呈现完整内容；金额轮换照常但切换不再播入场动画。
- 无障碍：装饰层 aria-hidden，收款卡 aria-live="polite" 让金额变化可被读屏播报；场景无交互控件，不拦截键盘。
- options.height 改场景高度（默认 340），options.reducedMotion 覆盖系统偏好；支持同页多实例，更新 options 不重挂载，卸载时清理计时器、帧回调、观察器及监听器。

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| height | number | 340 | 场景高度，逻辑像素；窄容器整景按比例缩小 |
| reducedMotion | boolean | 跟随系统 | 覆盖系统的减少动态偏好 |

## 独立实现与六框架交付

- 仅凭本文从零生成可运行的实现。尺寸、颜色、文案、图形和运动算法均以上述文字为准；所有装饰用 CSS 与内联 SVG 绘制，不加载远程图片、字体、视频或素材。
- 当前交付重点为 React，组件名称 FloatingUiHero。从零创建四个文件：FloatingUiHero.tsx、FloatingUiHeroEngine.js、motion-runtime.ts、FloatingUiHeroEngine.d.ts；分别实现框架入口、完整交互核心、实例生命周期和类型声明。文件名是需要生成的产物，不假定接收者已经拥有任何文件。
- 同时提供 React、Vue、Svelte、Solid、Preact、Vanilla 原生生命周期入口，共享框架无关核心。DOM 仅在挂载后访问，支持同页多实例；更新时保持状态，销毁时清理动画、计时器、观察器及监听器。不要用 iframe 代替组件实现。
- 依赖安装说明：npm install react react-dom。若使用依赖，只使用其公开 API；组件的布局、样式、图形和算法必须在本次生成的文件中完整实现，不引用现成效果组件。
- 实现 options.height 以调整场景高度，options.reducedMotion 覆盖系统偏好；减少动态效果仍保留完整拼贴与金额轮换。
- 给出每个文件的完整内容、安装和运行步骤、以下使用示例所需的全部实现。不得留省略号、待补素材或"自行补齐核心"的占位。
- 验收：375 / 768 / 1440px 无横向溢出；五层视差方向与幅度正确、离开归位、金额轮换不停；浅色深色两套令牌正确；多实例互不干扰，卸载后停止所有任务。

## 使用示例

```tsx
import { FloatingUiHero } from "./FloatingUiHero";

export default function App() {
  return <FloatingUiHero />;
}
```
