# 环绕集成轨道 — IntegrationOrbit

一张 340×340 的集成区插画：顶部是居中的「Integrations」眉标与「Connect the tools you use」标题，下面一行说明文字；画面中心是一枚渐变圆角方块主 logo，两圈虚线轨道围着它转——内圈 4 枚、外圈 6 枚彩色工具图标贴着轨道走，图标始终保持正立。把指针放到任一图标上，整条轨道会停住，那枚图标放大并被自身颜色描边圈住，标题下方的说明换成「工具名 · 一句功能介绍」，同时一道彩色虚线曲线从图标连到中心 logo；移开指针一切复原，再点一次图标则把说明钉住。

## 布局与材质

- 340×340px 场景卡，圆角 30px，溢出裁切；底色是 `radial-gradient(60% 50% at 50% 62%, var(--ux-accent-soft), transparent 75%)` 叠 `var(--ux-surface)`，外圈 1px `var(--ux-line)` 描边加 `0 30px 60px -36px var(--ux-shadow-strong)` 阴影。
- 头部：绝对定位 left/right 0、top 22px、z-index 3、居中对齐。眉标「Integrations」10px/850、字距 .08em、取 `var(--ux-accent)`；标题 h3「Connect the tools you use」margin 4px 0 0、19px/900、字距 -.035em；说明行 display block、高 16px、margin-top 6px、11px/700、取 `var(--ux-ink-2)`，过渡 opacity .2s，默认文案「Connects to 40+ tools in a single click」，选中某个图标时改成「工具名 · 功能介绍」，其中工具名用 `b` 包住（字重 850、取 `var(--ux-ink)`）。
- 连接线：一张铺满场景的 340×340 内联 SVG，`pointer-events: none`；其中的 path 填充 none、描边宽 2、圆头、虚线 `stroke-dasharray: 3 7`，默认 opacity 0，过渡 opacity .25s；连接生效时 opacity 1 并播 `u306-fl .6s linear infinite`（stroke-dashoffset 走到 -10，模拟流动）。路径按图标实时位置计算：从图标中心 (x, y) 出发，控制点 `mx = (x+170)/2 + (y-212)*0.18`、`my = (y+212)/2 - (x-170)*0.18`，终点固定为场景中心 (170, 212)；描边色取该图标自己的颜色。
- 轨道舞台：绝对定位 left 50%、top 212px，宽高 0，以该点为圆心。
  - 每一圈是一个 0×0 的旋转容器 `animation: u306-r var(--t) linear infinite`，方向由 `--dir` 指定，末帧 `transform: rotate(360deg)`。圈的 `::before` 画出半径 `--r` 的虚线圆：left/top 各为 `calc(var(--r) * -1)`、宽高 `calc(var(--r) * 2)`、border-radius 50%、1px 虚线描边 `color-mix(in srgb, var(--ux-ink) 16%, transparent)`。
  - 每个图标位是一个 `rotate(a) translateX(r) rotate(-a)` 的定位盒，把图标推到角度 a、半径 r 处；盒内再套一层反向旋转的 upright 容器（left -19px、top -19px，动画方向与圈相反），抵消掉圈的自转让图标始终正立。
  - 图标按钮：38×38px、grid 居中、padding 0、圆角 12px、底色 `var(--ux-surface)`、阴影 `0 0 0 1px var(--ux-line), 0 8px 16px -8px var(--ux-shadow-strong)`、图标颜色取各自的 `--c`；内联 SVG 为 18×18、描边 currentColor。悬停激活态 transform scale(1.22)，阴影换成 `0 0 0 2px var(--c), 0 10px 22px -8px var(--c)`；过渡 transform .3s `cubic-bezier(.3,1.6,.5,1)` 与 box-shadow .3s。
  - 中心 logo 块：绝对定位 left -30px、top -30px、60×60px、圆角 19px、底色 `var(--ux-grad)`、grid 居中、阴影 `0 14px 30px -10px color-mix(in srgb, var(--ux-accent) 70%, transparent)`、z-index 2，内含 28×28 白色线性图形；`::before` 是 inset -10px、圆角 26px、2px `color-mix(in srgb, var(--ux-accent) 40%, transparent)` 描边的方环，播 `u306-p 2.6s ease-out infinite`（从 scale(.85)、opacity 1 到 scale(1.35)、opacity 0），像一圈扩散的呼吸光。
- 场景令牌用 `light-dark()` 写两套（浅色 | 深色，跟随宿主 `prefers-color-scheme`）：`--ux-surface` #FFFFFF | #13141C；`--ux-ink` #16151B | #F4F0E8；`--ux-ink-2` #57535F | rgba(244,240,232,.68)；`--ux-line` rgba(22,21,27,.09) | rgba(255,255,255,.08)；`--ux-accent` #6A57F2 | #B7A4FF；`--ux-accent-soft` rgba(106,87,242,.12) | rgba(183,164,255,.15)；`--ux-grad` 是 120° 三段渐变，浅色 `linear-gradient(120deg,#7B61FF,#3D8BFF 55%,#1FB89A)`、深色 `linear-gradient(120deg,#B7A4FF,#7DB4FF 55%,#A5F2D3)`；`--ux-shadow-strong` rgba(40,30,80,.3) | rgba(0,0,0,.72)。
- 字体：整卡继承宿主字体栈（根层不声明 font-family）；场景固定 340px 宽，容器变窄时整景按比例缩小，不做自适应重排。

## 数据

- 10 个集成工具写死，每个是「名称 / 功能介绍 / 主题色」：Mail「Turn inquiries into tasks」#EF4444；Calendar「Events stay in sync both ways」#3B82F6；Payments「Payments flow into revenue」#8B5CF6；Chat「Updates land in team channels」#10B981；Drive「Import whole folders of files」#F59E0B；Code repo「Link deploys to issues」#334155；Spreadsheets「Two-way table sync」#16A34A；Video calls「Meeting notes saved for you」#0EA5E9；Forms「Responses go to your contacts」#EC4899；Webhooks「Send events anywhere」#F97316。
- 每个工具配一枚 18×18 的内联线性 SVG（邮箱、日历、卡片、对话气泡、文件盘、代码分支、表格、摄像机、表单、节点连线），描边 currentColor、线宽 1.3–1.7。
- 两圈轨道参数：内圈半径 62px、周期 36s、顺时针，承载 Mail、Calendar、Payments、Chat 四个，起始角 20°、逐个 90° 分布；外圈半径 112px、周期 56s、逆时针，承载 Drive、Code repo、Spreadsheets、Video calls、Forms、Webhooks 六个，起始角 0°、逐个 60° 分布。
- 中心 logo 图形固定：一条 3px 白色圆头弧线加一个白色圆点。
- 页面文案写死：「Integrations」「Connect the tools you use」「Connects to 40+ tools in a single click」。
- 无外部数据请求，不加载任何图片或图标字体。

## 操作和动效

- 轨道常驻自动旋转：内圈 36s 一圈、外圈 56s 一圈，均为 linear 无限循环；图标自转由反向的 upright 容器抵消，视觉上始终正立。中心 logo 的呼吸光每 2.6s 一轮。
- 指针移入某个图标：整圈轨道与 upright 动画一起 `animation-play-state: paused` 停住（不是减速），该图标放大并被自身颜色描边，说明行换成「工具名 · 功能介绍」，一道彩色虚线曲线从图标连到中心 logo。
- 指针移出：恢复旋转、说明行回到默认文案、连接线淡出。
- 键盘聚焦某个图标按钮同样触发这套暂停与连线；失焦恢复。
- 点击图标：把说明钉住（再次点击同一个图标则取消钉住并复位）。点击不改变轨道转速状态之外的任何数据。
- 场景滚出视口时用 IntersectionObserver 把所有轨道与 upright 元素的 `animationPlayState` 设为 paused，回到视口再清空该属性。
- 组件没有其它自动播放或循环逻辑。
- `prefers-reduced-motion`：轨道旋转、upright 反转、logo 呼吸光、连接线流动全部关闭动画；此时轨道静止，但悬停、聚焦、点击仍然给出说明文案与连接线。
- 键盘：10 个图标都是原生 button，可用 Tab 逐个聚焦、回车或空格触发钉住；focus-visible 为 2px `var(--ux-accent)` 外圈、偏移 3px。
- 无障碍：每个图标按钮带 aria-label 为工具名；说明行是 `aria-live="polite"` 区域，读屏能听到工具名与介绍；中心 logo 与连接线图形对读屏隐藏。

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| height | number | 340 | 场景高度，逻辑像素；窄容器整景按比例缩小 |
| reducedMotion | boolean | 跟随系统 | 覆盖系统的减少动态偏好 |

## 独立实现与六框架交付

- 仅凭本文从零生成可运行的实现。尺寸、颜色、文案、图形和运动算法均以上述文字为准；所有装饰用 CSS 与内联 SVG 绘制，不加载远程图片、字体、视频或素材。
- 当前交付重点为 React，组件名称 IntegrationOrbit。从零创建四个文件：IntegrationOrbit.tsx、IntegrationOrbitEngine.js、motion-runtime.ts、IntegrationOrbitEngine.d.ts；分别实现框架入口、完整交互核心、实例生命周期和类型声明。文件名是需要生成的产物，不假定接收者已经拥有任何文件。
- 同时提供 React、Vue、Svelte、Solid、Preact、Vanilla 原生生命周期入口，共享框架无关核心。DOM 仅在挂载后访问，支持同页多实例；更新时保持状态，销毁时清理动画、计时器、观察器及监听器。不要用 iframe 代替组件实现。
- 依赖安装说明：npm install react react-dom。若使用依赖，只使用其公开 API；组件的布局、样式、图形和算法必须在本次生成的文件中完整实现，不引用现成效果组件。
- 实现 options.height 以调整场景高度，options.reducedMotion 覆盖系统偏好；减少动态仍保留完整状态。
- 给出每个文件的完整内容、安装和运行步骤、以下使用示例所需的全部实现。不得留省略号、待补素材或「自行补齐核心」的占位。
- 验收：375 / 768 / 1440px 无横向溢出；两圈反向环绕、图标保持正立、悬停暂停并连线、点击钉住、移出复位均正确；浅色深色两套令牌正确；多实例互不干扰，卸载后停止所有任务。

## 使用示例

```tsx
import { IntegrationOrbit } from "./IntegrationOrbit";

export default function App() {
  return <IntegrationOrbit />;
}
```
