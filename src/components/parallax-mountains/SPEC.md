# 层叠山峦视差 — ParallaxMountains

一张 300×500 的登山叙事卡：整卡是一个可纵向滚动的故事区，顶部是 sticky 的山景插画——淡蓝天空、暖黄太阳、三层远近山脊和一条深绿森林线，天正中压着标题「Three days up high / Seorak ridge walk · Autumn 2026」；往下滚，山脊按深度以不同速度错开，太阳沉向地平线，天空由天蓝渐变成暮紫与晚霞橙，标题上浮淡出；再往下是三张白底日记卡（Day one / Day two / Day three），浮在画面之上，随滚动依次经过。

## 布局与材质

- 300×500px 场景卡，圆角 30px，溢出裁切；外圈 1px `var(--ux-line)` 描边加 `0 30px 60px -36px var(--ux-shadow-strong)` 阴影。卡片本身不铺底色，天空由内层场景负责。
- 滚动区：绝对定位 inset 0、overflow-y auto、隐藏滚动条、`outline: none`、tabindex 0、aria-label「Travelogue, scroll to read」。
- 场景层：position sticky、top 0、高 500px、溢出裁切，底色是 `linear-gradient(var(--s1, #7EC4F2), var(--s2, #D7EEFF))`。
  - 太阳：绝对定位 left 50%、top 0、70×70px、margin-left -35px、圆角 50%，底色 `radial-gradient(circle, #FFF4C2, #FFC94D 60%)`，外发光 `0 0 60px 20px rgba(255,200,80,.45)`。
  - 标题块：绝对定位 left/right 0、top 120px、居中、白字、字阴影 `0 2px 14px rgba(0,0,0,.25)`；主标题 30px/880、字距 -.04em，副标题 12.5px/700、opacity .9。
  - 四层山景，每层是一个绝对定位 left -10%、width 120%、bottom 0 的容器，内含一张 width 100%、height auto 的内联 SVG：
    - 第一层（深度系数 0.12）：viewBox 0 0 360 200，折线山脊 `M0 120 L50 70 L95 110 L150 40 L210 100 L260 60 L320 105 L360 80 V200 H0z`，填色 #9DB4D6。
    - 第二层（深度系数 0.28）：viewBox 0 0 360 200，折线 `M0 150 L60 95 L120 140 L175 80 L235 135 L290 100 L360 140 V200 H0z`，填色 #6E86B5。
    - 第三层（深度系数 0.5）：viewBox 0 0 360 200，折线 `M0 170 L45 130 L90 160 L140 120 L200 165 L250 128 L310 160 L360 135 V200 H0z`，填色 #3F5A8A。
    - 第四层（深度系数 0.8）：viewBox 0 0 360 120，由一串波浪峰组成的森林冠线，填色 #1F3B37。
- 日记区：相对定位、margin-top -90px、内边距 0 14px 20px、grid、gap 12px，三张卡片依次叠在场景之上。
  - 卡片：内边距 16px、圆角 20px、底色 `var(--ux-surface)`、阴影 `0 0 0 1px var(--ux-line), 0 18px 30px -18px var(--ux-shadow-strong)`；标题 15px/850；正文 margin 6px 0 0、13.5px/1.6、取 `var(--ux-ink-2)`。
- 场景令牌用 `light-dark()` 写两套（浅色 | 深色，跟随宿主 `prefers-color-scheme`）：`--ux-surface` #FFFFFF | #13141C；`--ux-ink` #16151B | #F4F0E8；`--ux-ink-2` #57535F | rgba(244,240,232,.68)；`--ux-line` rgba(22,21,27,.09) | rgba(255,255,255,.08)；`--ux-shadow-strong` rgba(40,30,80,.3) | rgba(0,0,0,.72)。
- 字体：整卡继承宿主字体栈（根层不声明 font-family）；场景固定 300px 宽，容器变窄时整景按比例缩小，不做自适应重排。

## 数据

- 三段日记写死：「Day one」——At 4 a.m. we climbed the first slope by headlamp alone. As the sun came up, the ridges revealed themselves one layer at a time.；「Day two」——We ate warm noodles at the shelter while clouds drifted beneath our feet. The wind was so strong I had to grab my hat twice.；「Day three」——The way down was longer than expected, but looking back, the ridges seemed much closer than at the start.
- 标题文案写死：「Three days up high」与「Seorak ridge walk · Autumn 2026」。
- 四层山景的深度系数写死为 0.12、0.28、0.5、0.8，分别对应远山、次远山、近山与前景森林；每层的 SVG 路径与填色写死，颜色从上到下由浅到深（#9DB4D6 → #6E86B5 → #3F5A8A → #1F3B37）。
- 天空两端色写死：天顶 rgb(126,196,242)、地平 rgb(215,238,255)；暮色端天顶 rgb(70,60,130)、地平 rgb(255,160,110)，滚动时按比例逐通道取整插值。
- 无外部数据请求，山景全部用内联 SVG 剪影绘制。

## 操作和动效

- 滚动即驱动：取滚动容器的 scrollTop 记作 y，进度 p = min(1, y / 420)。
- 每层山景按自己的深度系数 s 位移：`translateY(y * (1 - s) * -0.35 + p * 40 * s)` px——深度越大移动越少，形成层间错位；p 的附加项让画面在滚动到位后还有一层额外的视差推进。
- 太阳随滚动下沉：`translateY(60 + p * 230)` px，并放大到 `scale(1 + p * 0.25)`。
- 标题随滚动上浮：`translateY(p * 150)` px，同时透明度降到 `1 - p * 1.1`，因此滚动约九成时标题已完全隐去。
- 天空随进度由天蓝渐变到暮色：顶部色由 rgb(126,196,242) 插值到 rgb(70,60,130)，底部色由 rgb(215,238,255) 插值到 rgb(255,160,110)，每通道取整。
- 滚动监听为 passive，并用一次 requestAnimationFrame 合并多次滚动事件，避免重复重绘。全部计算都是纯函数，反向滚动时画面会原路退回。
- 日记卡片不做额外的淡入或位移，只是被滚动带过。
- 组件没有自动播放与循环动画。
- `prefers-reduced-motion`：组件自身没有降级分支——由运行时把首帧之后的动画帧请求挂起不再派发，因此场景只会在第一次滚动时更新一次，之后不再跟随滚动变化，画面停在首帧更新后的状态。
- 键盘：滚动区是原生可聚焦滚动容器（tabindex 0），可用 Tab 聚焦后用方向键、Page Up / Page Down、Home / End 滚动；容器 `outline: none`，场景内没有额外的焦点环。
- 无障碍：滚动区带 aria-label「Travelogue, scroll to read」；山景与太阳对读屏隐藏（aria-hidden），文字全部由真实的 h/b/p 元素承载。

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| height | number | 500 | 场景高度，逻辑像素；窄容器整景按比例缩小 |
| reducedMotion | boolean | 跟随系统 | 覆盖系统的减少动态偏好 |

## 独立实现与六框架交付

- 仅凭本文从零生成可运行的实现。尺寸、颜色、文案、图形和运动算法均以上述文字为准；所有装饰用 CSS 与内联 SVG 绘制，不加载远程图片、字体、视频或素材。
- 当前交付重点为 React，组件名称 ParallaxMountains。从零创建四个文件：ParallaxMountains.tsx、ParallaxMountainsEngine.js、motion-runtime.ts、ParallaxMountainsEngine.d.ts；分别实现框架入口、完整交互核心、实例生命周期和类型声明。文件名是需要生成的产物，不假定接收者已经拥有任何文件。
- 同时提供 React、Vue、Svelte、Solid、Preact、Vanilla 原生生命周期入口，共享框架无关核心。DOM 仅在挂载后访问，支持同页多实例；更新时保持状态，销毁时清理动画、计时器、观察器及监听器。不要用 iframe 代替组件实现。
- 依赖安装说明：npm install react react-dom。若使用依赖，只使用其公开 API；组件的布局、样式、图形和算法必须在本次生成的文件中完整实现，不引用现成效果组件。
- 实现 options.height 以调整场景高度，options.reducedMotion 覆盖系统偏好；减少动态仍保留完整状态。
- 给出每个文件的完整内容、安装和运行步骤、以下使用示例所需的全部实现。不得留省略号、待补素材或「自行补齐核心」的占位。
- 验收：375 / 768 / 1440px 无横向溢出；四层视差速度互不相同、太阳下沉、天空渐变到暮色、标题淡出都随滚动连续变化且可逆；浅色深色两套令牌正确；多实例互不干扰，卸载后停止所有任务。

## 使用示例

```tsx
import { ParallaxMountains } from "./ParallaxMountains";

export default function App() {
  return <ParallaxMountains />;
}
```
