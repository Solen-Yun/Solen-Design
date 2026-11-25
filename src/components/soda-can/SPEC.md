# 旋转开罐汽水 — SodaCan

一张 340×340 的圆罐标签卡：整个画面由一张 Canvas 画出——一只 124px 宽的银色汽水罐立在浅黄底上，罐身贴着一张随圆柱面弯曲的标签，标签上方是白色横带与深色的「SOLEN」字样，中段是口味名与水果图形，下缘有小字「355 ml · 0 kcal」。用手指或鼠标横向拖动罐身，它就绕轴转起来，标签一列列地从曲面掠过，罐身两侧自动压暗、左上留一道高光。底部一排胶囊按钮切换 Lemon / Cherry / Mint 三种口味并换背景色；点 Open 拉环翻起、罐口冒出白色气泡，按钮随即变成 Reseal。

## 布局与材质

- 场景卡 340×340px，圆角 30px，overflow:hidden，底色 var(--bg, #FFF9DB)，背景切换过渡 0.5s；外圈 0 0 0 1px var(--ux-line) 描边，加 0 30px 60px -36px var(--ux-shadow-strong) 阴影。
- Canvas 铺满卡片（position:absolute; inset:0; width/height:100%; touch-action:none），cursor:grab，按下时 cursor:grabbing；role="img"、aria-label="Soda can, drag sideways to spin"。
- 底部控件条：绝对定位 left:0、right:0、bottom:14px，flex 居中、gap 6px。左侧是一个 role="group"、aria-label="Choose a flavor" 的胶囊组（display:flex、gap 4px），内含三个口味按钮；右侧是开罐按钮。胶囊通用样式：border:0、内边距 6px 12px、圆角 999px、背景 rgba(255,255,255,.75)、色 #343A40、font:inherit、11.5px/字重 750、box-shadow 0 0 0 1px rgba(0,0,0,.06)、背景与文字色各过渡 0.2s；aria-pressed="true" 时背景改为 #343A40、文字改 #fff。开罐按钮背景为 #fff、外边距左 8px。三个按钮的 focus-visible 统一为 outline:2px solid #343A40、outline-offset:2px。
- 罐体几何（逻辑像素）：画布 340×340，中心轴 CXp=170，半径 R=62，罐顶 TOP=62、罐底 BOT=268，标签高度 LH=206，标签周长 LW=round(2π×62)=390。Canvas 像素尺寸按 dpr=min(2, devicePixelRatio||1) 放大后用 ctx.scale(dpr,dpr) 回到逻辑像素。
- 罐体侧影：绘制在地面阴影之上、罐体左右边缘压暗，横向线性渐变覆盖 CXp−62→CXp+62，色标依次为 0% rgba(0,0,0,.42)、18% rgba(0,0,0,.05)、32% rgba(255,255,255,.38)、42% rgba(255,255,255,.04)、80% rgba(0,0,0,.12)、100% rgba(0,0,0,.5)——左侧 32% 处形成竖直高光带。
- 金属上下沿：用 #6C757D → #F1F3F5(30%) → #ADB5BD(55%) → #495057 的横向渐变画梯形，上沿高 12px、左右各内收 6px，下沿高 10px、左右各内收 8px；罐底再补一个 #ADB5BD 的半椭圆（中心 (170,278)、半轴 54×6），罐顶补一枚 #DEE2E6 的椭圆（中心 (170,50)、半轴 56×13）并描一圈 #ADB5BD、线宽 2px 的椭圆（半轴 53×11）。
- 地面阴影：rgba(0,0,0,.13) 的椭圆，中心 (170,284)、半轴 76×12。
- 标签绘制在一张离屏 Canvas 上（尺寸 390×206，按 dpr 放大）：底色是从 th.a 到 th.b 的纵向渐变；再叠 40 个 rgba(255,255,255,.22) 的圆点，半径 2+(序号%5)；y=60 起一条高 46px 的白色横带；带上用 900 字重 30px 的 system-ui 写两次「SOLEN」（x 偏移 18px 与 213px，色 th.b，基线居中）；y=132 处用 800 字重 15px 的白字写口味名加「 SODA」（位于周长的 27% 与 77% 处）；y=150–172 画水果图形——柠檬是 20×15 的 #FFF3BF 椭圆配 2px 深色描边加一片叶子，樱桃是两根 #2B8A3E 藤条与两颗白底红心（外圆 r=11、内圆 r=9、色 #E03131），薄荷是三片 7×15 的白色椭圆；y=196 处用 700 字重 8px 的 rgba(255,255,255,.75) 写「355 ml · 0 kcal」。
- 罐身贴图：把离屏标签按圆柱角度切成竖条——横坐标每 1.5px 取一列，该列对应的圆柱角 θ = asin((x+0.75)/R)，标签上取样位置 u = ((θ + rot)/(2π) mod 1)×LW，每列把标签上宽 1.5px、高 206px 的一条贴到罐体上、绘制宽度 1.6px。整罐共 83 列，覆盖 x 108–232。
- 拉环：罐口椭圆上的开孔（中心 (184,49)、半轴 12×5），未开时填 #CED4DA、开后填 #212529；拉环本体是一组图形：整体平移到 (168,50) 后随开罐进度旋转 −0.5×进度 弧度，画一个 #E9ECEF 填充、#868E96 描边 1.2px 的椭圆（随进度上移 10px、纵向半径 6→10），内嵌一枚 #ADB5BD 的小椭圆（纵向半径 2.4→4）。
- 场景令牌用 CSS light-dark() 双值（浅色在前）：--ux-page #FFFFFF/#0B0C12；--ux-surface #FFFFFF/#13141C；--ux-surface-2 #F5F3EF/#1A1B25；--ux-surface-3 #EAE7E1/#252632；--ux-ink #16151B/#F4F0E8；--ux-ink-2 #57535F/rgba(244,240,232,.68)；--ux-ink-3 #8E8A97/rgba(244,240,232,.42)；--ux-line rgba(22,21,27,.09)/rgba(255,255,255,.08)；--ux-line-2 rgba(22,21,27,.17)/rgba(255,255,255,.16)；--ux-accent #6A57F2/#B7A4FF；--ux-accent-2 #2F8FE0/#7DB4FF；--ux-accent-soft rgba(106,87,242,.12)/rgba(183,164,255,.15)；--ux-accent-ink #FFFFFF/#0B0C12；--ux-mint #119C72/#7EE8C0；--ux-warn #D6731E/#FFB26B；--ux-danger #D93A55/#FF7D8C；--ux-glass rgba(255,255,255,.58)/rgba(255,255,255,.07)；--ux-glass-line rgba(255,255,255,.85)/rgba(255,255,255,.18)；--ux-shadow rgba(40,30,80,.14)/rgba(0,0,0,.45)；--ux-shadow-strong rgba(40,30,80,.3)/rgba(0,0,0,.72)；--ux-grad linear-gradient(120deg,#7B61FF,#3D8BFF 55%,#1FB89A)/linear-gradient(120deg,#B7A4FF,#7DB4FF 55%,#A5F2D3)。
- 罐身标签上的文字用 Canvas 的 system-ui 字体栈（system-ui,-apple-system,sans-serif），界面按钮用 font:inherit 沿用宿主页面字体。
- 响应式：场景固定 340×340 逻辑尺寸；容器更窄时整景按比例缩放（缩放系数 = min(1, 容器宽/340)），不重排、不裁切。options.height 改的是场景外框高度，卡片本身仍按 340×340 绘制并在框内居中。

## 数据

- 无外部数据源，口味与配色写死在引擎里，共 3 组：
  - Lemon（标签主色 #FFD43B → #F59F00，图形绿 #2B8A3E，背景 #FFF9DB，按钮文案 "Lemon"）。
  - Cherry（#FA5252 → #C92A2A，图形绿 #2B8A3E，背景 #FFF0F6，按钮文案 "Cherry"）。
  - Mint（#63E6BE → #0CA678，图形绿 #087F5B，背景 #E6FCF5，按钮文案 "Mint"）。
- 标签上印的大字固定为「SOLEN」，口味行固定为「LEMON SODA」「CHERRY SODA」「MINT SODA」，规格行固定为「355 ml · 0 kcal」。
- 开罐按钮初始文案「Open」，开罐后改为「Reseal」。

## 操作和动效

- 横向拖动：Canvas 上 pointerdown 记录起点与当时的转角，pointermove 里转角按位移换算——rot = 起手转角 −(位移/R)，同时用最近两次采样算出角速度 vel = −(位移/R)/时间差（时间差下限 0.008s）；pointerup / pointercancel 结束时把角速度夹到 −12…12 rad/s。拖动期间画面逐帧重绘。
- 惯性：松手后角速度以每帧 min(1, dt×0.8) 的比例回落到 0.5 rad/s 的怠速，罐身持续缓慢自转；每次切口味额外给 vel 加 3，制造一次甩转。
- 逐帧渲染：requestAnimationFrame 循环里每帧重画地面阴影、83 条罐身标签条、圆柱阴影、上下金属沿、开孔与拉环，最后画气泡；标签与拉环之间用比例插值 tab += (目标 tab − tab)×min(1, dt×9) 过渡。场景进入视口（IntersectionObserver）才开跑循环，离开即停。
- 开罐：点「Open」把开合目标在 0 与 1 之间切换，按钮文案随之互换；开孔颜色变深、拉环翻起。罐口持续冒出气泡——每帧以 dt×30 的概率生成一枚，出生点 (184±8, 48)、半径 2–6px、竖直初速 −60…−150px/s、水平初速 ±20px/s，每帧向上飘并叠加 sin(时间×8 + 半径)×0.3 的横向摆动，透明度每秒衰减 0.7，降到 0 即回收；气泡描边为 rgba(255,255,255, 透明度×0.9)、填充为 rgba(255,255,255, 透明度×0.25)、线宽 1.2px。
- 切口味：点口味胶囊即重建标签贴图、把卡片背景色换成该口味的背景色、更新三个按钮的 aria-pressed，并给罐身一次角速度冲量。
- prefers-reduced-motion：不启动渲染循环，罐身保持转角不变，拖动时按需单帧重绘；开合状态直接跳到目标值。options.reducedMotion 在挂载时读取一次并覆盖系统偏好；减少动态开启时，宿主层把场景内的 CSS 动画与过渡时长归零。
- 键盘与无障碍：三个口味按钮与开罐按钮都是原生 button，可 Tab 聚焦并用空格/回车触发，focus-visible 有明确描边；Canvas 以 role="img" 暴露一句整体描述，拖动是其指针交互，不提供键盘等价操作。

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| height | number | 340 | 场景高度，逻辑像素；窄容器整景按比例缩小 |
| reducedMotion | boolean | 跟随系统 | 覆盖系统的减少动态偏好 |

## 独立实现与六框架交付

- 仅凭本文从零生成可运行的实现。尺寸、颜色、文案、图形和运动算法均以上述文字为准；场景用 Canvas 2D 绘制，界面控件用 DOM 与 CSS，不加载远程图片、字体、视频或素材。
- 当前交付重点为 React，组件名称 SodaCan。从零创建四个文件：SodaCan.tsx、SodaCanEngine.js、motion-runtime.ts、SodaCanEngine.d.ts；分别实现框架入口、完整交互核心、实例生命周期和类型声明。文件名是需要生成的产物，不假定接收者已经拥有任何文件。
- 同时提供 React、Vue、Svelte、Solid、Preact、Vanilla 原生生命周期入口，共享框架无关核心。DOM 仅在挂载后访问，支持同页多实例；更新时保持状态，销毁时清理动画、计时器、观察器及监听器。不要用 iframe 代替组件实现。
- 依赖安装说明：npm install react react-dom。若使用依赖，只使用其公开 API；组件的布局、样式、图形和算法必须在本次生成的文件中完整实现，不引用现成效果组件。
- 实现 options.height 以调整场景高度，options.reducedMotion 覆盖系统偏好；减少动态效果仍保留完整的三种口味、开合状态与罐身姿态。
- 给出每个文件的完整内容、安装和运行步骤、以下使用示例所需的全部实现。不得留省略号、待补素材或"自行补齐核心"的占位。
- 验收：375 / 768 / 1440px 无横向溢出；拖动旋转与圆柱体积感正确；三种口味的标签与背景切换正确；开罐后拉环翻起且气泡涌出；多实例互不干扰，卸载后停止所有任务。

## 使用示例

```tsx
import { SodaCan } from "./SodaCan";

export default function App() {
  return <SodaCan />;
}
```
