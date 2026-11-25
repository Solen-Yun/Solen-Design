# 光标放大程序坞 — MagnifyDock

一张 340×340 的桌面场景，底色是从桃粉过渡到丁香紫的柔光渐变，底部居中浮着一排毛玻璃程序坞：八个彩色圆角应用图标挤在一条半透明胶囊里。指针扫过程序坞时，离光标最近的图标被明显放大并向上抬起，周围的图标按距离平滑地依次让开一圈，像一排向中间挤的按钮；点击图标它会连跳两下并在下方点出一枚小圆点，图标上方浮出该应用的名字气泡；键盘 Tab 聚焦某个图标时，它同样被放大并显示名字。

## 布局与材质

- 场景卡 340×340px，圆角 30px，overflow 裁切，底色为三层叠加的柔光渐变：`radial-gradient(90% 70% at 20% 10%, #FFC6A8, transparent 60%)`、`radial-gradient(80% 70% at 90% 30%, #A5B4FC, transparent 60%)`、`linear-gradient(160deg, #FDE2E4, #C3B1E1)`；外圈 `box-shadow: 0 0 0 1px var(--ux-line), 0 30px 60px -36px var(--ux-shadow-strong)`。
- 场景令牌分浅色与深色两套（`light-dark()`，由宿主 color-scheme 决定）：浅色 surface #FFFFFF、surface-2 #F5F3EF、ink #16151B、line rgba(22,21,27,.09)、accent #6A57F2、shadow-strong rgba(40,30,80,.3)；深色 surface #13141C、surface-2 #1A1B25、ink #F4F0E8、line rgba(255,255,255,.08)、accent #B7A4FF、shadow-strong rgba(0,0,0,.72)。本场景的底色与程序坞是固定色值，不随方案切换。
- 程序坞 `.u208-dk`：absolute、left 50% bottom 16px、`translateX(-50%)`、flex、`align-items: flex-end`、间距 3px、内边距 6px 8px、圆角 18px、高 40px、底色 rgba(255,255,255,.38)、`box-shadow: inset 0 0 0 1px rgba(255,255,255,.55), 0 10px 30px -12px rgba(60,40,90,.45)`、`backdrop-filter: blur(14px)`（含 -webkit- 前缀）；`role="toolbar"`、`aria-label="App dock"`。
- 图标按钮 `.u208-a`：relative、flex none、宽高由 `--s` 变量控制（默认 28px）、下外边距由 `--lift` 变量控制（默认 0）、无边框、无底色、圆角 24%、`cursor: pointer`。内部一块 SVG 铺满按钮、圆角 24%、`box-shadow: 0 4px 10px -4px rgba(0,0,0,.35)`。
- 图标下方的小圆点：按钮的 `::after`，absolute、left 50%、bottom -6px、4×4px、圆形、底色 #3B3355、opacity 0，点亮时（is-run）opacity 1，过渡 .2s。
- 跳跃动画 `.u208-a.is-hop`：`animation: u208-hop .9s cubic-bezier(.3,.6,.4,1) 2`（执行两次），关键帧 30% 时 `translateY(-22px)`、55% 回到 0、72% 再抬到 -6px。
- 图标获得焦点时 `outline: 2px solid #3B3355`、offset 2px。
- 名字气泡 `.u208-tip`：absolute、left 与 bottom 由脚本计算、内边距 4px 10px、圆角 8px、底色 rgba(40,32,60,.85)、文字 #fff、11.5px/700、nowrap、pointer-events none、`transform: translate(-50%, 0)`、opacity 0→1 过渡 .15s（加 is-on 显示）。

## 数据

- 八个应用图标写死「名称 / 底色渐变起止 / 图形」：SVG 统一用 46×46 视口，背景是一层竖向线性渐变（起色在上、止色在下），上面再画各自的图形：
  1. Finder — #74C0FC→#1C7ED6，白色线性笑脸（一条竖笔、两枚圆点眼、一道弧形嘴，描边宽 2.4、圆头）；
  2. Messages — #8CE99A→#2B8A3E，白色对话气泡；
  3. Mail — #A5D8FF→#339AF0，白色信封（圆角矩形 30×20）与蓝色封口折线；
  4. Maps — #C3FAE8→#20C997，白色山峦多边形加一枚 #FA5252 红色定位针（圆 r=5 与竖线）；
  5. Photos — #FFFFFF→#F1F3F5，八片彩色花瓣（椭圆 rx 5 ry 10）绕中心旋转 0°、45°…315°，颜色依次 #FA5252、#FD7E14、#FAB005、#40C057、#15AABF、#4C6EF5、#7950F2、#E64980，透明度 .85；
  6. Music — #FF8787→#E03131，白色音符（符干折线加两个 r=4 的圆头）；
  7. Calendar — #FFFFFF→#F8F9FA，顶部 13px 高的 #FA5252 红色条内写 "OCT"，下方居中写深色 "15"；
  8. Notes — #FFF3BF→#FCC419，白色圆角便签（26×30）与三条 #FAB005 横线。
- 名字同时用于气泡文案与按钮的 aria-label（形式为「<名称>, open」），写死的名称为：Finder、Messages、Mail、Maps、Photos、Music、Calendar、Notes。
- 每个实例生成一个随机后缀（如 5 位 base36 字符）拼到 SVG 渐变 id 上，保证同页多实例的渐变定义互不冲突。
- 无其他写死数据；全部图形为内联 SVG，不加载任何位图。

## 操作和动效

- 指针位置换算：以舞台中心为横坐标原点（程序坞宽度会随图标放大而变化，所以用舞台中心而不是坞的中心做基准）。指针进入程序坞的作用区时才生效——作用区是坞底边往上 130px 到往下 10px 之间（换算时按舞台缩放比例还原）；离开作用区则所有图标回到基础尺寸。
- 放大算法：每个图标在基础尺寸下的中心 c = (序号 - 3.5) × 31px（基础尺寸 28px 加间距 3px）；指针与中心的水平距离归一化 d = (指针横坐标 - c) / 58；目标尺寸 tg = 28 + 26 × exp(-d² × 1.6)——高斯形状，离得越近越接近 54px，邻居按距离平滑衰减。键盘聚焦时该图标的目标尺寸为 54 × 0.8 = 43.2px。
- 尺寸缓动：每帧按 `当前 += (目标 - 当前) × 0.28` 逼近，差值小于 0.1px 时直接吸附；图标尺寸写入 `--s`，同时按 (尺寸 - 28) × 0.25 计算抬升量写入 `--lift`（作为下外边距，图标随放大向上抬起）。动画由 requestAnimationFrame 驱动，尺寸都稳定后自动停帧；焦点变化或指针移动会重新唤醒。
- 名字气泡：当处于放大状态（指针在作用区内或某个图标获得焦点）且当前最大的图标超过 36px 时显示，内容为该图标的名称；气泡水平定位到该图标中心，垂直定位在图标顶边上方 10px。
- 点击图标：先移除跳跃类、强制一次重排、再重新加上跳跃类，于是播放两遍 0.9s 的弹跳；同时加上 is-run，让下方小圆点点亮（表示"已打开"），圆点保持常亮。
- 键盘：图标是原生按钮，聚焦时放大到 43.2px 并显示名字气泡，失焦后恢复基础尺寸；按钮可回车/空格触发点击，从而播放跳跃并点亮圆点。
- 无障碍：程序坞是 `role="toolbar"`、`aria-label="App dock"`；每个图标按钮都有 aria-label；焦点可见时套 2px #3B3355 轮廓、offset 2px；状态不只靠颜色传达——放大、抬起、跳跃与圆点点亮是并行的视觉线索。
- `prefers-reduced-motion`（或 options.reducedMotion=true）下：尺寸缓动系数由 0.28 改为 1，图标直接跳到目标尺寸；跳跃动画被关闭（CSS 里 reduced-motion 时 `animation: none`）。

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| height | number | 340 | 场景高度，逻辑像素；窄容器整景按比例缩小 |
| reducedMotion | boolean | 跟随系统 | 覆盖系统的减少动态偏好 |

## 独立实现与六框架交付

- 仅凭本文从零生成可运行的实现。尺寸、颜色、文案、图形和运动算法均以上述文字为准；图标全部用内联 SVG 与 CSS 渐变绘制，不加载远程图片、字体、视频或素材。
- 当前交付重点为 React，组件名称 MagnifyDock。从零创建四个文件：MagnifyDock.tsx、MagnifyDockEngine.js、motion-runtime.ts、MagnifyDockEngine.d.ts；分别实现框架入口、完整交互核心、实例生命周期和类型声明。文件名是需要生成的产物，不假定接收者已经拥有任何文件。
- 同时提供 React、Vue、Svelte、Preact、Vanilla 原生生命周期入口，共享框架无关核心。DOM 仅在挂载后访问，支持同页多实例；更新时保持状态，销毁时清理动画、计时器、观察器及监听器。不要用 iframe 代替组件实现。
- 依赖安装说明：npm install react react-dom。若使用依赖，只使用其公开 API；组件的布局、样式、图形和算法必须在本次生成的文件中完整实现，不引用现成效果组件。
- 实现 options.height 以调整场景高度，options.reducedMotion 覆盖系统偏好；减少动态时图标直接跳到目标尺寸。
- 给出每个文件的完整内容、安装和运行步骤、以下使用示例所需的全部实现。不得留省略号、待补素材或"自行补齐核心"的占位。
- 验收：375 / 768 / 1440px 无横向溢出；指针横向扫过程序坞时图标连续放大、抬升并让位；移开后恢复原尺寸；点击有跳跃并点亮圆点、名字气泡出现；键盘聚焦同样放大并显示气泡；多实例互不干扰，卸载后停止所有任务。

## 使用示例

```tsx
import { MagnifyDock } from "./MagnifyDock";

export default function App() {
  return <MagnifyDock />;
}
```
