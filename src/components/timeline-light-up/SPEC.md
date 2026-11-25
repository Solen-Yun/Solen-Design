# 时间轴点亮 — TimelineLightUp

制作「时间轴点亮」场景：一块 300×500 的卡片，内部是一个隐藏滚动条的纵向滚动区。标题「How we got here」下方一条居中竖线贯穿五个年份节点（2019–2026），滚动时一条紫→蓝渐变的进度光沿竖线向下生长，线端挂一枚发光圆点作为生长末端；节点被光越过后圆点弹大点亮、左右交替的年份小卡片弹性展开——往回滚则光回缩、节点熄灭、卡片收回，整个过程完全可逆，适合当作「我们的历程」式的时间线叙事块。

## 布局与材质

- 场景 300×500px，圆角 30px，溢出裁切；底色取表面色令牌（浅 #FFFFFF/深 #13141C）；外圈 1px 线色描边加 0 30px 60px -36px 强阴影。场景根是无底色包装层，视觉卡片放在其内部的绝对填充层上。
- 滚动区绝对填充整个卡片，overflow-y auto，滚动条隐藏（scrollbar-width none 与 webkit 伪元素双保险），tabindex="0" 可聚焦，aria-label「History, scroll to view」，无焦点时 outline none。
- 标题「How we got here」padding 22px 20px 0，字号 22px/字重 880、字距 -.04em。
- 时间轴容器上边距 30px，上下内边距 20px/220px——底部 220px 留白保证末段也能滚到光尖之后。
- 中央竖线：绝对定位 left 50%（margin-left -1.5px）、top 0、bottom 180px、宽 3px、圆角 3px，底色线色令牌。线内填充层为 linear-gradient(accent, accent-2)（浅色 #6A57F2→#2F8FE0、深色 #B7A4FF→#7DB4FF），transform-origin 顶部，scaleY(var(--p)) 控制生长比例。
- 光尖：填充层 ::after，12×12px 圆点挂在生长末端下缘 -6px 处，填充 accent-2，辉光 0 0 14px accent-2；用 scaleY(1 / max(var(--p), .02)) 抵消父级缩放保持正圆——p 为 0 时该比值趋近 0，光尖被压扁隐藏，进度一开始生长它才浮现并随光移动。
- 五个事件行依次纵向排列，行高 150px。节点圆点 18×18px，left 50%（margin-left -9px）、top 10px，静态为表面色底加 0 0 0 3px 次级线色外圈；点亮后背景变 accent、外圈变 0 0 0 4px 的 25% accent 光环、scale(1.15)。圆点层压在竖线之上，静止时把线「断」成一节节刻度。
- 年份卡片宽 118px、内边距 10px 12px、圆角 14px、背景次级表面色，绝对定位 top 0：奇数行挂在线右（right: calc(50% + 20px)，初始 translateX(-24px)），偶数行挂在线左（left: calc(50% + 20px)，初始 translateX(24px)），点亮后回正、透明度 1，形成左右交替的蛇形排布。年份文字 18px/1.1、字重 850、等宽字体栈 ui-monospace、SFMono-Regular、Menlo、monospace、accent 色；描述 13px/字重 700、上边距 4px。卡片无描边无阴影，靠表面色差和左右错位与竖线拉开层次。
- 场景令牌浅色/深色两套（`prefers-color-scheme: dark` 切换）：表面 #FFFFFF/#13141C、次级表面 #F5F3EF/#1A1B25、墨色 #16151B/#F4F0E8、次级墨 rgba(22,21,27,.17)/rgba(255,255,255,.16)、accent #6A57F2/#B7A4FF、accent-2 #2F8FE0/#7DB4FF、强阴影 rgba(40,30,80,.3)/rgba(0,0,0,.72)；另定义弹性缓动令牌 cubic-bezier(.34,1.56,.64,1)。不声明正文字体栈，继承宿主页面。组件固定 300px 逻辑宽度：容器更窄时整景按 min(1, 容器宽/300) 等比缩放，滚动区随卡片同步缩放，不产生横向溢出。

## 数据

- 写死 5 条时间线事件（年份/描述依次为）：2019/A two-person studio、2020/First app launched、2022/100,000 users、2024/Our third office、2026/Here and now。无其他数据来源。

## 操作和动效

- 唯一交互是滚动（鼠标滚轮、触摸或聚焦后用方向键翻页）。滚动监听为 passive，绘制经 requestAnimationFrame 合帧。
- 进度计算：生长末端位置 = scrollTop + 视口高 × 0.6 − 时间轴容器偏移 − 竖线偏移；进度 p = 末端 ÷ 竖线总高，clamp 到 0–1，以 4 位小数写入 CSS 变量 --p。插值随滚动可逆：向上滚光回缩，已越过 p 的节点熄灭、卡片收回，反复滚动状态始终与滚动位置严格一致。
- 滚动事件按 passive 监听，每帧最多合并绘制一次（无未完成帧回调时才排新帧），避免高频滚动重复布局计算。
- 节点点亮条件：事件行 offsetTop + 18 ≤ 生长末端，逐帧对五个节点做类名切换。点亮时圆点过渡 background-color .3s、box-shadow .3s、transform .45s 弹性曲线；卡片过渡 opacity .4s、transform .6s 同一弹性曲线，带回弹感；熄灭走同一条过渡路径原路收回。
- 挂载后先画一帧初始状态（按 scrollTop 0 渲染，光为 0、全部熄灭）。滚到底部 220px 留白处，光尖越过最后一个节点，2026 一格点亮；进度 p 在满滚时接近但不到 1，符合「末端跟随视口 60% 高度」的算法。
- `prefers-reduced-motion: reduce`（或 options.reducedMotion）下：场景根标记 data-reduced-motion，圆点与卡片的过渡时长全部归零——点亮与展开即时完成、无回弹；初始帧仍按当前滚动位置画出光与节点状态。
- 无障碍：滚动区可聚焦（tabindex 0）带 aria-label「History, scroll to view」，聚焦后可用方向键、PageUp/PageDown 滚动；竖线与圆点 aria-hidden；卡片年份与描述为普通文本节点，可直接选中复制。
- options.height 调整场景高度（默认 500）；options.reducedMotion 覆盖系统偏好。支持同页多实例，更新选项不重挂载；卸载时释放帧回调与监听器。

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| height | number | 500 | 场景高度，逻辑像素；窄容器整景按比例缩小 |
| reducedMotion | boolean | 跟随系统 | 覆盖系统的减少动态偏好 |

## 独立实现与六框架交付

- 仅凭本文从零生成可运行的实现。尺寸、颜色、文案、图形和滚动插值算法均以上述文字为准；界面全部用 DOM 与 CSS 绘制，不加载远程图片、字体、视频或素材。
- 当前交付重点为 React，组件名称 TimelineLightUp。从零创建四个文件：TimelineLightUp.tsx、TimelineLightUpEngine.js、motion-runtime.ts、TimelineLightUpEngine.d.ts；分别实现框架入口、完整交互核心、实例生命周期和类型声明。文件名是需要生成的产物，不假定接收者已经拥有任何文件。
- 同时提供 React、Vue、Svelte、Solid、Preact、Vanilla 原生生命周期入口，共享框架无关核心。DOM 仅在挂载后访问，支持同页多实例；更新时保持状态，销毁时清理动画、计时器、观察器及监听器。不要用 iframe 代替组件实现。
- 依赖安装说明：npm install react react-dom。若使用依赖，只使用其公开 API；组件的布局、样式、图形和算法必须在本次生成的文件中完整实现，不引用现成效果组件。
- 实现 options.height 以调整场景高度，options.reducedMotion 覆盖系统偏好；减少动态下滚动点亮的最终状态完整保留。
- 给出每个文件的完整内容、安装和运行步骤、以下使用示例所需的全部实现。不得留省略号、待补素材或"自行补齐核心"的占位。
- 验收：375 / 768 / 1440px 无横向溢出；下滚点亮、上滚熄灭可逆；减少动态即时切换且状态完整；浅色深色两套令牌正确；多实例互不干扰，卸载后停止所有任务。

## 使用示例

```tsx
import { TimelineLightUp } from "./TimelineLightUp";

export default function App() {
  return <TimelineLightUp />;
}
```
