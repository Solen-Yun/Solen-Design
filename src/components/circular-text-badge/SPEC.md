# 旋转圆形文字徽章 — CircularTextBadge

制作「旋转圆形文字徽章」场景：一张 340×330 的浅色卡片，中央是一枚 218×218 的圆形徽章——大写等宽字沿半径 86px 的圆形路径排满一圈（textLength 532 撑满整圆），围绕中心一枚深色圆盘上的箭头缓慢自转。默认角速度 18°/s；悬停徽章时目标速度升到 150°/s，离开后惯性缓降回 18。点击徽章：短语切换到下一条（逐字符按 22ms 间隔依次点亮浮现）、中心圆盘做一次回弹 pop、并即时获得 120°/s 的转速加成。底部左右两行小字：左侧「Each press changes the text」，右侧等宽读数实时显示当前角速度。

## 布局与材质

- 340×330px 场景卡，圆角 28px，溢出裁切，纵向 flex、水平居中、内边距 18px。场景根是 340×330 的无底色包装层（水平居中），卡片视觉放在其内部的绝对填充层上——文档演示舞台会剥离场景根的背景，卡片底色必须在嵌套层上才能保留。容器窄于 340px 时整景等比缩小（缩放比 = min(1, 可用宽/340)，上限 1）。
- 场景令牌浅色/深色两套（`prefers-color-scheme: dark` 自动切换）：卡片底色 --ux-surface 浅 #FFFFFF / 深 #13141C；墨色 --ux-ink 浅 #16151B / 深 #F4F0E8；三级墨 --ux-ink-3 浅 #8E8A97 / 深 rgba(244,240,232,.42)；线色 --ux-line 浅 rgba(22,21,27,.09) / 深 rgba(255,255,255,.08)；次表面 --ux-surface-2 浅 #F5F3EF / 深 #1A1B25；页面底色 --ux-page 浅 #FFFFFF / 深 #0B0C12；弹性曲线 --ux-spring = cubic-bezier(.34,1.56,.64,1)。外圈 1px 线色描边加 0 30px 60px -36px 强阴影（--ux-shadow-strong 浅 rgba(40,30,80,.3) / 深 rgba(0,0,0,.72)）。
- 徽章按钮：218×218px 正圆，上边距 6px，无边框无内边距；底色 radial-gradient(circle, var(--ux-surface) 40%, var(--ux-surface-2) 41%)——40% 与 41% 之间形成一圈细环；再叠 inset 0 0 0 1px 线色描边。内部 SVG viewBox 0 0 220 220 铺满、overflow visible。
- 环形文字：defs 内一条圆形路径（圆心 110,110、半径 86，自最左点起笔），id 在挂载时追加随机后缀避免同页多实例冲突；textPath 沿路径排字，textLength 532、lengthAdjust spacing 撑满整圆；字体 800 15.5px/1 ui-monospace、SFMono-Regular、Menlo、monospace、字距 .2em、填充 --ux-ink。每个字符包一层 tspan，fill-opacity 0→1（transition .25s）实现逐字浮现。
- 中心圆盘：78×78px 正圆，绝对居中，底色 --ux-ink、图标色 --ux-page，grid 居中；transition transform .5s 弹性曲线、background-color .4s。内含 30×30 箭头 SVG（path「M5 12h14M13 6l6 6-6 6」的右向箭头，stroke currentColor 宽 2.2 圆头），常态 rotate(-45deg)（指向右上）；悬停时圆盘放大 1.06 倍、箭头转回 0°（指向右）。点击 pop 动画：.6s 弹性曲线，30% 处 scale(.78) 回缩再弹回。
- 底部读数行：margin-top auto、flex 两端对齐、左右 padding 4px，12px/字重 700、三级墨色；右侧数值 b 为 700 13px 等宽字体、主墨色、tabular-nums。不加载远程字体（等宽栈均为系统字体）。

## 数据

- 短语共 3 条写死，点击循环切换：1.「SCROLL TO EXPLORE • SCROLL TO EXPLORE • 」；2.「OPEN FOR PROJECTS • 2026 • OPEN • 」；3.「MADE WITH CARE • SOLEN DESIGN • 」。初始显示第 1 条（无浮现动画，直接点亮）。
- 速度常量写死：默认角速度 18°/s、悬停目标 150°/s、点击加成 120°/s；读数格式「{整数}°/s」，标记文案「Each press changes the text」与「Spin speed」固定。

## 操作和动效

- 旋转：requestAnimationFrame 逐帧积分。每帧角速度向目标值指数逼近——上升时系数 0.06（快加速，约 0.5s 内逼近 150），回落时系数 0.025（慢衰减，惯性滑行约 2–3s 回到 18）；角度按 vel×dt 累加并对 360 取模（dt 取帧间隔，夹 0–50ms），以 transform rotate 写回文字环（绕 110,110）。
- 悬停/离开：pointerenter 把目标角速度设为 150，pointerleave 设回 18；同时触发 CSS 悬停态（圆盘放大、箭头回正）。
- 点击徽章：短语序号 +1 取模循环；新短语的每个字符以 120ms + 序号×22ms 的延迟依次点亮（配合 .25s 的 fill-opacity 过渡形成波浪式浮现）；中心圆盘重放 pop 回弹动画；角速度立即 +120°/s 后按惯性规律回落，形成「点一下甩一下」的手感。
- 读数刷新：每 120ms 最多更新一次，显示四舍五入后的当前角速度。
- 键盘与无障碍：徽章为原生 button，可 Tab、Enter/Space 触发点击；SVG 与中心箭头 aria-hidden，按钮的 aria-label 固定为「Text badge, press to change the text」；focus-visible 走浏览器默认按钮样式。
- 无自动切换、无循环播放；旋转常驻但仅由悬停与点击改变速度。
- prefers-reduced-motion: reduce（或 options.reducedMotion=true）下：不启动旋转帧循环，徽章静止、读数保持 18°/s；点击仍切换短语但逐字浮现退化为整串直出；运行时同时把悬停缩放、pop 动画等 CSS 过渡压为瞬时。
- options.height 调整场景高度（默认 330）；options.reducedMotion 覆盖系统偏好；更新选项就地合并、不重挂载；卸载时取消帧回调。路径 id 已做随机化，样式在 Shadow DOM 内，同页多实例互不干扰。

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| height | number | 330 | 场景高度，逻辑像素；窄容器整景按比例缩小 |
| reducedMotion | boolean | 跟随系统 | 覆盖系统的减少动态偏好 |

## 独立实现与六框架交付

- 仅凭本文从零生成可运行的实现。尺寸、颜色、文案与运动算法均以上述文字为准；环形文字用 SVG textPath 实现，惯性插值在 JS 内完成，不加载远程图片、字体、视频或素材。
- 当前交付重点为 React，组件名称 CircularTextBadge。从零创建四个文件：CircularTextBadge.tsx、CircularTextBadgeEngine.js、motion-runtime.ts、CircularTextBadgeEngine.d.ts；分别实现框架入口、完整交互核心、实例生命周期和类型声明。文件名是需要生成的产物，不假定接收者已经拥有任何文件。
- 同时提供 React、Vue、Svelte、Solid、Preact、Vanilla 原生生命周期入口，共享框架无关核心。DOM 仅在挂载后访问，支持同页多实例；更新时保持状态，销毁时清理动画、计时器、观察器及监听器。不要用 iframe 代替组件实现。
- 依赖安装说明：npm install react react-dom。若使用依赖，只使用其公开 API；组件的布局、样式、图形和算法必须在本次生成的文件中完整实现，不引用现成效果组件。
- 实现 options.height 以调整场景高度，options.reducedMotion 覆盖系统偏好；减少动态下文字切换仍完整可用。
- 给出每个文件的完整内容、安装和运行步骤、以下使用示例所需的全部实现。不得留省略号、待补素材或「自行补齐核心」的占位。
- 验收：375 / 768 / 1440px 无横向溢出；悬停加速、离开惯性回落、点击短语轮换与转速加成均正确；多实例路径 id 不冲突、卸载后停止所有任务。

## 使用示例

```tsx
import { CircularTextBadge } from "./CircularTextBadge";

export default function App() {
  return <CircularTextBadge />;
}
```
