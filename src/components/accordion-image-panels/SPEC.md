# 侧展照片条 — AccordionImagePanels

一张 340×320 的横向手风琴：五条窄窄的竖版照片条并排铺满卡片，每条用 CSS 渐变模拟一张风景照（山峰、海面、沙丘、苔林、夜城），底部叠一层由透明到 rgba(0,0,0,.55) 的压暗渐变保证字可读。默认展开第一条，它会横向长到其余条的五倍宽、标题从竖排翻回横排并放大，下方浮出简述与一枚白色 Explore 胶囊；其余四条被挤窄，标题竖排贴在条子左边。把指针移到任意一条、点它、或用方向键走过去，那一条就接管展开，其余退回窄条。

## 布局与材质

- 场景固定 340×320px，`responsive: false`，没有断点；容器窄于 340px 时整景按 `scale = min(1, 可用宽度 / 340)` 等比缩小，frame 宽度取 `max(340, 可用宽度)`。`options.height` 只改 surface 外框高度（写入 `--motion-height`），卡片本体仍为 320px。
- 卡片根 `.u389`：position relative，宽 340px、高 320px，横向 flex，条与条之间 gap 6px，内边距 12px，圆角 28px，背景 `var(--ux-surface)`，外圈 1px `var(--ux-line)` 描边加 `0 30px 60px -36px var(--ux-shadow-strong)` 阴影，overflow hidden。根是 `role="group"`、`aria-label="Trip themes"`。
- 场景令牌用 `light-dark()` 给浅色与深色两套：surface `#FFFFFF`/`#13141C`，surface-2 `#F5F3EF`/`#1A1B25`，surface-3 `#EAE7E1`/`#252632`，ink `#16151B`/`#F4F0E8`，ink-2 `#57535F`/`rgba(244,240,232,.68)`，ink-3 `#8E8A97`/`rgba(244,240,232,.42)`，line `rgba(22,21,27,.09)`/`rgba(255,255,255,.08)`，line-2 `rgba(22,21,27,.17)`/`rgba(255,255,255,.16)`，accent `#6A57F2`/`#B7A4FF`，accent-2 `#2F8FE0`/`#7DB4FF`，accent-soft `rgba(106,87,242,.12)`/`rgba(183,164,255,.15)`，accent-ink `#FFFFFF`/`#0B0C12`，mint `#119C72`/`#7EE8C0`，warn `#D6731E`/`#FFB26B`，danger `#D93A55`/`#FF7D8C`，glass `rgba(255,255,255,.58)`/`rgba(255,255,255,.07)`，glass-line `rgba(255,255,255,.85)`/`rgba(255,255,255,.18)`，shadow `rgba(40,30,80,.14)`/`rgba(0,0,0,.45)`，shadow-strong `rgba(40,30,80,.3)`/`rgba(0,0,0,.72)`，渐变 `linear-gradient(120deg,#7B61FF,#3D8BFF 55%,#1FB89A)` / `linear-gradient(120deg,#B7A4FF,#7DB4FF 55%,#A5F2D3)`；缓动常量 `--ux-spring: cubic-bezier(.34,1.56,.64,1)`。
- 照片条 `.u389-p`：原生 button，position relative，`flex: 1 1 0`，min-width 0，border 0，padding 0，圆角 18px，overflow hidden，背景为内联注入的自定义属性 `var(--bg)`，文字色 `#fff`，左对齐，`transition: flex-grow .6s cubic-bezier(.3,1,.3,1)`。展开态 `.on` 把 flex-grow 提到 5，于是展开条约占 5/9 的可分配宽度（约 162px），其余四条各占 1/9（约 32px）——分配宽度 = 340 − 24（左右内边距）− 24（四道 gap）= 292px。
- 压暗层 `.u389-p::after`：content 空串，绝对定位 inset 0，背景 `linear-gradient(transparent 40%, rgba(0,0,0,.55))`，pointer-events none，压在文字下方。
- 竖排标题 `.u389-lb`：绝对定位 left 50%、bottom 16px，z-index 1，white-space nowrap，字号 14px，字重 850，`transform-origin: 0 0`，`transform: rotate(-90deg) translate(0,-50%)`（旋转成竖排，自下往上读），过渡为 `transform .5s var(--ux-spring), left .5s var(--ux-spring), bottom .5s, font-size .4s`。展开态改为 left 16px、bottom 74px、`transform: none`、字号 22px，即横排贴在照片左下。
- 简述区 `.u389-ds`：绝对定位 left 16px、right 16px、bottom 16px，z-index 1，纵向 flex、左对齐、gap 8px，初始 `opacity: 0`、`transform: translateY(12px)`，过渡 `opacity .2s, transform .4s var(--ux-spring)`；展开态为 `opacity: 1`、`transform: none`，并额外延迟 .25s 才淡入。
- 简述文字 `.u389-ds span`：max-width 100%，字号 12.5px，字重 650，`opacity: .9`，单行不换行，超出用省略号截断。
- 行动胶囊 `.u389-ds i`：flex none，font-style normal，内边距 6px 10px，圆角 999px，背景 `#fff`，文字 `#111`，字号 11.5px，字重 800，文案固定为 Explore。
- 焦点样式 `.u389-p:focus-visible`：`outline: 2px solid var(--ux-accent)`、`outline-offset: 2px`。
- 字体：卡片不声明 font-family，继承宿主页面字体栈。

## 数据

- 五个项目写死在引擎里，每项是「名称 / 简述」二元组，组件不带外部数据源：Peaks — Sunrise hike on the ridge；Ocean — Surfing with the sound of waves；Desert — Stargazing on the dunes；Forest — Walking mossy trails；City — A night walk through the lights。
- 五张“照片”全部用 CSS 渐变合成，按顺序注入到各条的 `--bg`：
  1. `linear-gradient(#FFC078, #E8590C 40%, #5C3D2E 70%, #2B2118)`
  2. `linear-gradient(#A5D8FF, #1C7ED6 55%, #0B7285)`
  3. `radial-gradient(30% 20% at 70% 25%, #FFF3BF, transparent 70%)` 叠 `linear-gradient(#FFD8A8, #F59F00 55%, #C2410C)`
  4. `radial-gradient(60% 40% at 50% 20%, #D3F9D8, transparent 70%)` 叠 `linear-gradient(#2F9E44, #1B4332)`
  5. `radial-gradient(2px 2px at 30% 30%, #FFE066, transparent)` 与 `radial-gradient(2px 2px at 60% 50%, #FFE066, transparent)` 叠 `linear-gradient(#1B1035, #364FC7 70%, #0B0C12)`，两个 2px 光点充当星。
- 每条内部结构固定为：竖排标题 + 简述区（简述文字 + Explore 胶囊）。

## 操作和动效

- 展开：指针进入某条（`pointerenter`）、该条获得焦点（`focus`）或被点击（`click`）都会调用 `open(i)`，把 `.on` 类移到该条，其余条移走，同时给每条写 `aria-expanded="true"/"false"`。初始状态就是 `open(0)`，第一条默认展开。
- 展开动画：宽度靠 flex-grow 过渡，0.6s，曲线 `cubic-bezier(.3,1,.3,1)`；标题从竖排转回横排、字号 14px 涨到 22px、位置从 bottom 16px 移到 74px，用 .5s 的 `--ux-spring`（字号 .4s、位置 .5s 线性）；简述区上移 12px 并淡入，用 .4s 的 `--ux-spring` 与 .2s 线性透明度，并延迟 .25s 启动。
- 键盘：在任一条上按 ArrowRight 或 ArrowLeft，当前序号加减 1 并夹在 0–4 之间，随即展开目标条并把焦点移到它身上；事件被 `preventDefault()`，不发生页面滚动。其余按键不处理。
- 没有自动播放与循环，展开态完全由用户输入决定。
- `prefers-reduced-motion`（或 `options.reducedMotion` 为真）：宿主属性 `data-reduced-motion="true"` 把场景内所有 transition-duration 与 animation-duration 归零，于是展开变成瞬时切换；组件自身没有另外的动效分支。
- 无障碍：外层 `role="group"`、`aria-label="Trip themes"`；每条是原生 button，带 `aria-expanded` 表示展开与否；焦点环为 2px accent 描边、偏移 2px；文字与胶囊都在压暗层之上，颜色为白字与白底黑字，对比清晰。
- 卸载时销毁按钮事件与 surface，移除 DOM。

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| height | number | 320 | 场景高度，逻辑像素；窄容器整景按比例缩小 |
| reducedMotion | boolean | 跟随系统 | 覆盖系统的减少动态偏好 |

## 独立实现与六框架交付

- 仅凭本文从零生成可运行的实现。尺寸、颜色、数据、文案、图形和运动算法均以上述文字为准；所有“照片”用 CSS 渐变绘制，不加载远程图片、字体、视频或素材。
- 当前交付重点为 React，组件名称 AccordionImagePanels。从零创建四个文件：AccordionImagePanels.tsx、AccordionImagePanelsEngine.js、motion-runtime.ts、AccordionImagePanelsEngine.d.ts；分别实现框架入口、完整交互核心、实例生命周期和类型声明。文件名是需要生成的产物，不假定接收者已经拥有任何文件。
- 同时提供 React、Vue、Svelte、Solid、Preact、Vanilla 原生生命周期入口，共享框架无关核心。DOM 仅在挂载后访问，支持同页多实例；更新时保持状态，销毁时清理动画、计时器、观察器及监听器。不要用 iframe 代替组件实现。
- 依赖安装说明：npm install react react-dom。若使用依赖，只使用其公开 API；组件的布局、样式、图形和算法必须在本次生成的文件中完整实现，不引用现成效果组件。
- 实现 options.height 以调整场景高度，options.reducedMotion 覆盖系统偏好；减少动态效果仍保留完整的展开、悬停与键盘切换能力。
- 给出每个文件的完整内容、安装和运行步骤、以下使用示例所需的全部实现。不得留省略号、待补素材或“自行补齐核心”的占位。
- 验收：375 / 768 / 1440px 无横向溢出；悬停、点击、方向键三种方式都能正确展开；展开条宽度与竖排/横排标题状态正确；浅色深色两套令牌正确；多实例互不干扰，卸载后停止所有任务。

## 使用示例

```tsx
import { AccordionImagePanels } from "./AccordionImagePanels";

export default function App() {
  return <AccordionImagePanels />;
}
```
