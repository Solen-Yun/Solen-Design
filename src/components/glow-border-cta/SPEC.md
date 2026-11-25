# 光边注册号召 — GlowBorderCta

制作「光边注册号召」：一张 340×340 的落地页收尾号召区。26px 淡网格向按钮方向聚拢，一道靛蓝/青色 conic 光束以 9s 一圈在按钮背后旋转扫动；五星徽标胶囊显示 "1,284 teams on board"，主标语第一行 "Start today," 为纯色、第二行 "free for 14 days" 以五色流动光带填充文字；主按钮外圈是四色 conic 渐变旋转描边，点击后先三点加载 1300ms，再进入绿色成功态 "Check your inbox"、按钮扩散一圈绿色波纹、注意事项换成发送提示，右下角淡入 Reset 按钮可复位重来。

## 布局与材质

- 卡片 340×340px、圆角 30px、溢出裁切，flex 纵向、水平居中、垂直居中并补偿 padding-bottom 6px。底色为表面色叠底部辉光：radial-gradient(80% 60% at 50% 100%, accent 20% 透明度色, transparent 70%)；外圈 0 0 0 1px 线色描边，加 0 30px 60px -36px 强阴影；文字居中。
- 背景网格（::before 伪元素）：两层 1px 线（水平 + 垂直、线色）以 26px×26px 平铺、居中对齐，透明度 0.7，mask radial-gradient(60% 50% at 50% 70%, #000, transparent 75%)，即网格只在按钮附近可见。
- 光束层：300×300 圆形，中心位于 left 50%、top 68%；背景 conic-gradient(from 自定义角度, transparent 0 70%, #6366F1 45% 透明度 80%, #22D3EE 40% 透明度 86%, transparent 92%)，filter blur(22px)、透明度 0.55；角度属性由 CSS @property 注册并随动画转到 360deg。该层不响应指针。
- 五星徽标胶囊：高 24px、内边距 0 10px 0 8px、圆角 999px、表面色实底、内嵌 1px 线色描边加 0 4px 12px -8px 弱阴影；五颗 ★ 为 #F59E0B、10px、字距 -1px；后接 10.5px/字重 750 二级墨色文字 " teams on board"，其中计数为 14px 高的逐位滚动数字（字重 900、墨色、tabular-nums、行高 14px，切换时旧数字与新数字一起 translateY(-14px)，过渡 .45s cubic-bezier(.3,1.4,.5,1)，460ms 后清理）。
- 标题两行：28px、行高 1.14、字重 900、字距 -0.045em、上边距 14px。第一行 "Start today,"；第二行 "free for 14 days" 以 linear-gradient(90deg, #6366F1, #22D3EE, #F472B6, #F59E0B, #6366F1) 填充文字（background-size 200% 100%、background-clip text、文字透明），6s linear 无限把背景位置推到 -200% 0，形成流动光带。
- 说明文字 "Your whole team can start right away. Setup takes three minutes."：上边距 10px、左右边距 34px、11.5px、行高 1.5、字重 600、二级墨色。
- 按钮排：上边距 20px、间距 8px、自身隔离层叠上下文。主按钮高 44px、最小宽 166px、圆角 999px、无边框，底色 conic-gradient(from 自定义角度, #6366F1, #22D3EE, #F472B6, #F59E0B, #6366F1)，角度 4s linear 无限旋转；投影 0 10px 26px -14px #6366F1；transform 过渡 .3s cubic-bezier(.3,1.6,.5,1)。按钮背后一圈同底色辉光：inset -6px、blur(14px)、透明度 0.35、z-index -1。内衬 inset 2px、圆角同外圈、#0F1020 实底、白字 13px/字重 850，含 14×14 白描边箭头与 16×16 白色对勾（对勾 stroke-dasharray 20，成功时 dashoffset 20→0，过渡 .45s 延迟 .1s）。旁边一枚 "Talk to sales" 幽灵胶囊：高 44px、内边距 0 16px、圆角 999px、表面色实底加内嵌 1px 线色描边、12px/字重 800，无交互。
- 成功态：按钮底色与辉光变 #10B981、旋转动画停止、cursor default；内衬变 #0B3B2C；箭头隐藏、对勾显示；标题第二行光带改为 linear-gradient(90deg, #10B981, #34D399, #10B981) 并停止流动；注意事项行文字变 #10B981。
- Reset 按钮：绝对定位 right 14px、bottom 14px、内边距 5px 10px、圆角 999px、表面二级色实底、10px/字重 800、二级墨色；默认透明度 0 且不可点，仅成功态淡入（透明度过渡 .25s）。focus-visible 2px accent 外圈偏移 2px。
- focus-visible：主按钮为 2px 墨色外圈偏移 4px。
- 场景令牌一套两态（light-dark()）：surface #FFFFFF/#13141C、surface-2 #F5F3EF/#1A1B25、ink #16151B/#F4F0E8、ink-2 #57535F/rgba(244,240,232,.68)、ink-3 #8E8A97/rgba(244,240,232,.42)、line rgba(22,21,27,.09)/rgba(255,255,255,.08)、accent #6A57F2/#B7A4FF、阴影 rgba(40,30,80,.14)/rgba(0,0,0,.45) 与 rgba(40,30,80,.3)/rgba(0,0,0,.72)。字体随页面继承无衬线。

## 数据

- 团队计数固定基数 1,284（en-US 千分位），注册成功后 +1。
- 注意事项两条固定："No card required"、"Cancel anytime"，各带一枚 11×11 的 #10B981 对勾（描边 1.8px）。
- 其余文案写死：五星行、两行标题、说明文字、按钮 "Start for free"（成功后 "Check your inbox"）、"Talk to sales"、成功提示 "Sign-up link sent · Arrives within a minute"、复位按钮 "Reset"。无写死数据列表、无远程数据、无图片素材。

## 操作和动效

- 三条 CSS 循环并行：光束 9s linear 无限旋转；标题光带 6s linear 无限流动；按钮描边 4s linear 无限旋转。悬停主按钮（或程序化加同名类）：上浮 2px、辉光透明度 0.35→0.75、旋转加速为 1.4s 一圈；内衬箭头右移 4px（.3s cubic-bezier(.3,1.6,.5,1)）。
- 点击主按钮：加载/成功态中重复点击无效。进入加载态（显示三枚 6px 白点，以 .9s ease-in-out 无限跳动、依次延迟 0 / .12s / .24s，40% 处上移 5px、透明度 0.6；文字与箭头隐藏）；1300ms 后（减少动态 200ms）进入成功态：标签换 "Check your inbox"、注意事项整行替换为 "Sign-up link sent · Arrives within a minute"（容器 aria-live="polite"）、团队计数 +1 且数字向上滚动、按钮扩散一圈波纹——300×300 圆环、1.5px #10B981 70% 透明度描边加 12px 辉光，1.2s cubic-bezier(.2,.6,.3,1) 延迟 .1s，从 scale 0.15 扩到 1，透明度 0→0.55（12% 处）→0，播放一次。
- 点击 Reset：清空加载/成功态，标签回 "Start for free"、注意事项恢复两条带对勾的原文、计数无动画回到 1,284，并把焦点移回主按钮（preventScroll）。
- 键盘：主按钮与 Reset 均为原生 button，Tab 可达，焦点样式见上；光束层 pointer-events none。
- prefers-reduced-motion / options.reducedMotion：光束旋转、光带流动、按钮描边旋转、加载点跳动、波纹全部停用，数字滚动无过渡，成功态直接完整呈现；场景根打上 data-reduced-motion 强制容器内所有过渡与动画时长归零。

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| height | number | 340 | 场景高度，逻辑像素；窄容器整景按比例缩小 |
| reducedMotion | boolean | 跟随系统 | 覆盖系统的减少动态偏好 |

## 独立实现与六框架交付

- 仅凭本文从零生成可运行的实现。尺寸、颜色、文案、数据与运动参数均以上述文字为准；界面用 DOM 与 CSS，光效全部走 CSS 渐变与 keyframes（角度用 CSS 自定义属性注册实现），对勾与注意事项图标用内联 SVG，不加载远程图片、字体、视频或素材。
- 当前交付重点为 React，组件名称 GlowBorderCta。从零创建四个文件：GlowBorderCta.tsx、GlowBorderCtaEngine.js、motion-runtime.ts、GlowBorderCtaEngine.d.ts；分别实现框架入口、完整交互核心、实例生命周期和类型声明。文件名是需要生成的产物，不假定接收者已经拥有任何文件。
- 同时提供 React、Vue、Svelte、Solid、Preact、Vanilla 原生生命周期入口，共享框架无关核心。DOM 仅在挂载后访问，支持同页多实例；更新时保持状态，销毁时清理动画、计时器、观察器及监听器。不要用 iframe 代替组件实现。
- 依赖安装说明：npm install react react-dom。若使用依赖，只使用其公开 API；组件的布局、样式、图形和算法必须在本次生成的文件中完整实现，不引用现成效果组件。
- 实现 options.height 以调整场景高度，options.reducedMotion 覆盖系统偏好；减少动态下注册流程与成功态仍完整可用。
- 给出每个文件的完整内容、安装和运行步骤、以下使用示例所需的全部实现。不得留省略号、待补素材或"自行补齐核心"的占位。
- 验收：375 / 768 / 1440px 无横向溢出；三条光效循环持续运行且悬停加速正确；点击后加载、成功、波纹、计数 +1、Reset 复位全部正确；浅色深色两套令牌正确；多实例互不干扰，卸载后停止所有任务。

## 使用示例

```tsx
import { GlowBorderCta } from "./GlowBorderCta";

export default function App() {
  return <GlowBorderCta />;
}
```
