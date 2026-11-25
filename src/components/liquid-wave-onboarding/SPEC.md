# 液体波浪引导页 — LiquidWaveOnboarding

一张 300×500 的三步引导页：整块底色是一层浓紫，画面中央浮着一枚 170px 的抽象插画（几个半透明白色圆块拼出的图形），下面是大标题与一段说明文案；右上角挂一枚 `Skip`，左下角是三颗分页圆点、右下角是一颗白色胶囊 `Next` 按钮。按下 `Next` 时，下一页的颜色化成一道起伏的波浪从画面底部涌上来盖满整屏，把旧内容冲走，随后新内容从下方浮起就位；`Skip` 直接跳到第三步，第三步的按钮文案变成 `Get started`。

## 布局与材质

- 场景根：宽 300px、高 500px、圆角 36px、overflow hidden、position relative；底色 `var(--bg, #5F3DC4)`；文字色 `#fff`；外描边 `0 0 0 1px var(--ux-line)`，投影 `0 30px 60px -36px var(--ux-shadow-strong)`。`--bg` 与 `--fg` 随当前页切换，分别是背景色与按钮上的反色文字色。
- 场景令牌（`light-dark()` 随 `color-scheme` 切换，浅 / 深两套）：surface `#FFFFFF` / `#13141C`，surface-2 `#F5F3EF` / `#1A1B25`，surface-3 `#EAE7E1` / `#252632`，ink `#16151B` / `#F4F0E8`，ink-2 `#57535F` / `rgba(244,240,232,.68)`，ink-3 `#8E8A97` / `rgba(244,240,232,.42)`，line `rgba(22,21,27,.09)` / `rgba(255,255,255,.08)`，line-2 `rgba(22,21,27,.17)` / `rgba(255,255,255,.16)`，accent `#6A57F2` / `#B7A4FF`，accent-2 `#2F8FE0` / `#7DB4FF`，accent-soft `rgba(106,87,242,.12)` / `rgba(183,164,255,.15)`，accent-ink `#FFFFFF` / `#0B0C12`，mint `#119C72` / `#7EE8C0`，warn `#D6731E` / `#FFB26B`，danger `#D93A55` / `#FF7D8C`，glass `rgba(255,255,255,.58)` / `rgba(255,255,255,.07)`，glass-line `rgba(255,255,255,.85)` / `rgba(255,255,255,.18)`，shadow `rgba(40,30,80,.14)` / `rgba(0,0,0,.45)`，shadow-strong `rgba(40,30,80,.3)` / `rgba(0,0,0,.72)`；弹簧缓动 `--ux-spring: cubic-bezier(.34,1.56,.64,1)`。
- 波浪层：绝对定位 inset 0、宽高各 100%、pointer-events none、对读屏隐藏的 SVG，viewBox `0 0 300 500`、preserveAspectRatio `none`（拉满不留白），里面只有一条 path，填充色在换页开始时被写成下一页的底色。
- 内容层：绝对定位 inset 0，纵向 flex、水平居中，内边距 `70px 26px 30px`，文字居中；依次是插画、标题、说明三块，整体带 `aria-live="polite"`。
- 插画：position relative、170×170px；内部是若干绝对定位的圆块，底色 `rgba(255,255,255,.9)`，靠透明度递减（1、0.8、0.6……）排出层次。第一页与第三页是圆形，第二页是圆角 10px 的圆角方块，用来跟另外两页拉开区别。
- 标题：24px、字重 880、字距 -0.04em、上外边距 30px；说明：14.5px、行高 1.6、opacity .85、上外边距 10px。
- Skip 按钮：绝对定位 right 18px、top 18px、z-index 2，无边框无底色，色 `rgba(255,255,255,.8)`，13px、字重 700。
- 底栏：绝对定位 left 24px、right 24px、bottom 26px、z-index 2，横向 flex、两端对齐、垂直居中。
- 分页圆点：8×8px、圆角 4px、底色 `rgba(255,255,255,.4)`，当前页那颗拉长成 24px 并变成纯白，宽度过渡 .45s var(--ux-spring)、颜色过渡 .3s；点与点间距 6px。
- Next 按钮：高 46px、内边距 0 22px、胶囊圆角、底色 `#fff`、字色 `var(--fg, #5F3DC4)`、14px、字重 850，transform 过渡 .35s var(--ux-spring)、颜色过渡 .4s；按下时缩到 0.94。
- 场景不引入自定义字体，字体栈继承宿主页面。
- 响应式：固定 300×500，没有布局断点；容器宽度不足 300px 时整景按 `min(1, 容器宽 / 300)` 等比缩小，缩放锚点在左上角，占位高度同步收缩。

## 数据

- 三步引导的文案写死，标题与说明一一对应：
  - `Start calmly` —— Begin with ten minutes a day to catch your breath.
  - `Watch it add up` —— Look back on your mood and sleep at a glance.
  - `Keep going together` —— Share small goals with friends and cheer each other on.
- 三页的底色写死：第一步 `#5F3DC4`（紫）、第二步 `#0C8599`（青）、第三步 `#E8590C`（橙）。按钮上的反色文字色与背景色同色。
- 每页的插画由写死的色块坐标拼出（每个色块记录 left、top、width、height）：
  - 第一步 3 块：`(60,60,50,50)`、`(20,30,24,24)`、`(118,110,30,30)`。
  - 第二步 4 块：`(20,100,26,50)`、`(56,70,26,80)`、`(92,40,26,110)`、`(128,86,26,64)`，这一页全部是圆角 10px 的方块。
  - 第三步 3 块：`(30,50,60,60)`、`(80,50,60,60)`、`(62,112,46,46)`。
- 波浪几何写死：横向从 0 到 300、步长 10 共 31 个采样点，纵向为两个正弦叠加——主波 `sin(x/38 + t×9)`、副波 `sin(x/17 - t×6)` 且幅值为主波的 0.35 倍；波峰整体在 y = 520 到 y = -80 之间移动。
- 没有外部数据请求。

## 操作和动效

- 按 `Next` 进入下一页（第三页按 `Next` 会回到第一页，循环播放）；按 `Skip` 直接进入第三页。换页期间有一把「忙碌」锁，连点无效。
- 换页分三段：
  1. 旧内容整体淡出并上移——opacity 用 .45s 线性过渡，transform 用 .7s var(--ux-spring) 走到 `translateY(-20px)`；插画、标题、说明依次延迟 0s、0.06s、0.12s，形成错落感。同时波浪 path 的填充被写成下一页的底色。
  2. 波浪涌起：1100ms 内，波峰的基准 y 用二次缓动（前半段 2k²、后半段 1-(-2k+2)²/2）从 520 走到 -80，也就是从画面底部一直涨到画面顶端之外；波幅同时按 `26 × sin(k × π)` 变化，起初和收尾都是平缓的，中途起伏最大，所以看起来像一道有呼吸感的液体墙。
  3. 波浪落定后：内容层先被打上「入场」态（透明并下移 30px、无过渡），同帧写入新的一页内容（背景色、反色、标题、说明、插画、分页点、按钮文案），再强制重排一次以让入场态生效，随后立刻移除入场态——于是新内容从下方浮起就位；同时把波浪 path 的路径清空，画面恢复干净。
- 换页时底栏始终可见（z-index 2，压在波浪之上），分页点随着当前页切换拉长。
- 按钮文案：前两页是 `Next`，第三页是 `Get started`。
- 键盘：Skip 与 Next 都是原生按钮，可 Tab 聚焦、Enter 或空格触发；按钮按下时缩到 0.94，是唯一的按压反馈。
- 无障碍：内容层带 `aria-live="polite"`，换页后新标题与说明会被朗读；波浪层与插画对读屏隐藏；底栏与按钮保持原生语义。
- `prefers-reduced-motion`（或 options.reducedMotion 为 true）：换页时长压缩为 0 毫秒，波浪瞬间盖满再瞬间清空，内容直接切换到位，不播波浪上涨与内容浮起的过程；运行时还会把所有元素的 transition 与 animation 时长归零，最终内容与分页状态保持正确。

## Props

组件只接受一个 `options` 对象，其内部字段与文档页 API 表一致：

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| height | number | 500 | 场景高度，逻辑像素；窄容器整景按比例缩小 |
| reducedMotion | boolean | 跟随系统 | 覆盖系统的减少动态偏好 |

## 独立实现与六框架交付

- 仅凭本文从零生成可运行的实现。尺寸、颜色、文案、图形和运动算法均以上述文字为准；波浪用内联 SVG 路径逐帧重绘，插画用绝对定位的圆块，其余用 DOM 与 CSS，不加载远程图片、字体、视频或素材。
- 当前交付重点为 React，组件名称 LiquidWaveOnboarding。从零创建四个文件：LiquidWaveOnboarding.tsx、LiquidWaveOnboardingEngine.js、motion-runtime.ts、LiquidWaveOnboardingEngine.d.ts；分别实现框架入口、完整交互核心、实例生命周期和类型声明。文件名是需要生成的产物，不假定接收者已经拥有任何文件。
- 同时提供 React、Vue、Svelte、Solid、Preact、Vanilla 原生生命周期入口，共享框架无关核心。DOM 仅在挂载后访问，支持同页多实例；更新时保持状态，销毁时清理动画、计时器、观察器及监听器。不要用 iframe 代替组件实现。
- 依赖安装说明：npm install react react-dom。若使用依赖，只使用其公开 API；组件的布局、样式、图形和算法必须在本次生成的文件中完整实现，不引用现成效果组件。
- 实现 options.height 以调整场景高度（默认 500），options.reducedMotion 覆盖系统偏好；减少动态效果时仍保留完整的三页内容、当前页与分页点状态。
- 给出每个文件的完整内容、安装和运行步骤、以下使用示例所需的全部实现。不得留省略号、待补素材或"自行补齐核心"的占位。
- 验收：375 / 768 / 1440px 无横向溢出；Next 与 Skip 都能正确换页，波浪涌起并盖满；分页点与按钮文案同步；连点不会打断正在进行的换页；多实例互不干扰，卸载后停止所有任务。

## 使用示例

```tsx
import { LiquidWaveOnboarding } from "./LiquidWaveOnboarding";

export default function App() {
  return <LiquidWaveOnboarding />;
}
```
