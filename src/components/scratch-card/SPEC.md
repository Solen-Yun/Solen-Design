# 刮刮乐彩票 — ScratchCard

制作「刮刮乐彩票」卡片：一张 340×340 的暖黄舞台，中央摆着一张 280×230 的白色彩票——顶部橙条纹里印着 Lucky ticket，票身中央是奖项区（大号橙色主奖文案 + 一行副文案），其上覆盖一块 240×150 的 Canvas 银色涂层面板：金属渐变、白色闪点、斜纹和居中的 Scratch here 字样。按住并划动即以 26px 圆头笔刷擦出透明区，笔迹边缘随机凿出小孔，刮落的银屑化作小灰片飘落；底部实时显示 N% scratched，透明像素采样超过 55% 时涂层整体淡出、奖项弹性放大亮相，中奖票还会从票面中央炸开 26 枚彩纸。New ticket 按固定顺序换下一张票；键盘聚焦涂层后按 Enter/Space 可一次性揭底。

## 布局与材质

- 340×340px 场景卡，圆角 30px，溢出裁切。底色为固定暖色（不随系统切换）：`radial-gradient(90% 80% at 50% 30%,#FFF3BF,#FFD8A8)`，文字基调 #3B2A12，外圈 0 0 0 1px 线色描边加 0 30px 60px -36px 强阴影。
- 彩票绝对定位 left 30px、top 44px、280×230px、圆角 20px、背景 #fff、阴影 0 18px 34px -16px rgba(120,70,10,.55)、溢出裁切。顶部条纹为高 44px 的 `repeating-linear-gradient(45deg,#FF922B 0 10px,#FD7E14 10px 20px)` 斜纹；票名 Lucky ticket 居中于 top 12px、白字 14px/字重 900、字距 0.08em。
- 奖项区绝对定位 left/right 20px、top 60px、bottom 20px、圆角 14px、背景 #FFF9DB，纵向居中、间距 4px：主奖文案 34px/字重 900、字距 -0.03em、#E8590C；副文案 14px/字重 750。区域带 aria-live="polite"。揭底时主文案播放 0.6s cubic-bezier(.3,1.8,.5,1) 的弹出动画（从 scale(0.4)）。
- 涂层 Canvas 绝对定位 left 20px、top 60px、240×150px、圆角 14px、cursor grab、touch-action none、透明度过渡 0.5s；揭底后加 is-gone（透明度 0、不接事件）。画布内部分辨率按 devicePixelRatio 渲染（上限 2 倍）。canvas tabindex 0、role="button"、aria-label 为 Scratch area, press Enter to reveal at once。
- 银色涂层绘制：线性渐变 #CED4DA → 45% #F1F3F5 → 55% #ADB5BD → #DEE2E6 铺底；叠 260 枚随机 1.2px、白色 35% 闪点；每 9px 一道 rgba(134,142,150,.35) 的 45° 斜线；正中为 #868E96、字重 800、15px 的系统字体栈（system-ui、-apple-system、Apple SD Gothic Neo、sans-serif）Scratch here 居中字。画布按 CSS 尺寸 240×150 显示、内部按 devicePixelRatio（上限 2）放大背衬，高分屏上笔迹与采样依然清晰。
- 底栏绝对定位 left/right 30px、bottom 22px、两端对齐、11.5px/字重 750、#8A5A1E：左侧进度文案 N% scratched；右侧 New ticket 按钮（内边距 7px 14px、圆角 999px、背景 #3B2A12、文字 #FFF3BF、12px/字重 800）。
- 彩纸为绝对定位的 8×12px、圆角 2px 小片（left 170px、top 150px 起点），播放 1.2s ease-out forwards 的飞散动画：translate(var(--dx), var(--dy)) rotate(var(--r)) 并淡出；银屑为 3×3px、#ADB5BD、圆角 1px 小片，transform 过渡 0.7s ease-in、透明度 0.7s，750ms 后移除。
- New ticket 与 Canvas 的 focus-visible 均为 2px #3B2A12 描边、偏移 2px。

## 数据

- 四张票按固定顺序循环（主奖文案，副文案，是否中奖）：1st / A cup of coffee / 中奖；No luck / Next time / 未中奖；2nd / Cookie set / 中奖；Lucky / 10% off / 中奖。初始为第 1st；每按一次 New ticket 依序推进并在末尾回卷。
- 彩纸五色轮换：#FF6B6B、#FCC419、#51CF66、#4DABF7、#CC5DE8。
- 刮除进度按透明像素采样估算：对画布 alpha 通道每 8×8（乘设备像素比）取一个样本，alpha < 40 记为已刮开，进度 = 已开样本占比。

## 操作和动效

- 指针：pointerdown 记录起点并在原地擦一小点（线段终点只偏移 0.1px），同时捕获指针保证移出画布仍跟踪；pointermove 沿轨迹连续擦除；每第 4 次 move 采样一次进度并更新文案，超过 55% 即揭底；pointerup/cancel 再采样收尾，防止短促点击漏检。已揭底的票不再响应擦除。笔刷为 destination-out、lineWidth 26、圆头圆角；每一笔额外凿 4 枚半径 2–7px、中心偏移 ±15px 的随机圆孔制造毛边；未减少动态时每笔撒 3 片银屑（随机横移 ±20px、下落 30–70px、旋转 200°）。
- 揭底：涂层 0.5s 淡出、指针事件关闭；进度文案写 100% scratched；主奖文案弹出。若当前票为中奖票且未减少动态，从票面中部炸开 26 枚彩纸——随机角度、距离 60–170px、纵向上抬 40px、旋转 0–720°，1.2s 飞散后 1300ms 移除。未中奖票只有涂层消失与文案亮相。
- New ticket：票号加一（末尾回卷到第一张）、涂层重铺、进度归零写 0% scratched、奖项区撤下弹出态，等待再次刮开；重铺按「渐变 → 闪点 → 斜线 → 文字」的固定顺序重画。
- 键盘：Canvas 可聚焦，Enter 或 Space（均阻止默认）等价直接揭底；New ticket 为原生按钮，Tab 顺序为先涂层后按钮。
- 无障碍：奖项区 aria-live="polite" 让屏幕阅读器读到揭晓结果；Canvas 有明确 aria-label 说明 Enter 即揭底。
- `prefers-reduced-motion` 下：银屑与彩纸完全不再生成，弹出/飞散动画由运行时宿主压为零时长；揭底淡出、刮擦与阈值逻辑照常。
- options.height 调整场景高度（默认 340），窄容器整景按比例缩小；options.reducedMotion 覆盖系统偏好。支持同页多实例，更新选项不重挂载，卸载时清理计时器与监听器。

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| height | number | 340 | 场景高度，逻辑像素；窄容器整景按比例缩小 |
| reducedMotion | boolean | 跟随系统 | 覆盖系统的减少动态偏好 |

## 独立实现与六框架交付

- 仅凭本文从零生成可运行的实现。尺寸、颜色、文案、涂层算法、采样阈值与运动参数均以上述文字为准；涂层用 Canvas 2D 绘制与擦除，票面与彩纸用 DOM 与 CSS，不加载远程图片、字体、视频或素材。
- 当前交付重点为 React，组件名称 ScratchCard。从零创建四个文件：ScratchCard.tsx、ScratchCardEngine.js、motion-runtime.ts、ScratchCardEngine.d.ts；分别实现框架入口、完整交互核心、实例生命周期和类型声明。文件名是需要生成的产物，不假定接收者已经拥有任何文件。
- 同时提供 React、Vue、Svelte、Solid、Preact、Vanilla 原生生命周期入口，共享框架无关核心。DOM 仅在挂载后访问，支持同页多实例；更新时保持状态，销毁时清理动画、计时器、观察器及监听器。不要用 iframe 代替组件实现。
- 依赖安装说明：npm install react react-dom。若使用依赖，只使用其公开 API；组件的布局、样式与算法必须在本次生成的文件中完整实现，不引用现成效果组件。
- 实现 options.height 以调整场景高度，options.reducedMotion 覆盖系统偏好；减少动态效果仍保留刮擦、阈值揭底与换票全流程。
- 给出每个文件的完整内容、安装和运行步骤、以下使用示例所需的全部实现。不得留省略号、待补素材或「自行补齐核心」的占位。
- 验收：375 / 768 / 1440px 无横向溢出；刮擦毛边、进度采样、55% 阈值揭底、中奖彩纸、New ticket 循环均正确；多实例互不干扰，卸载后停止所有任务。

## 使用示例

```tsx
import { ScratchCard } from "./ScratchCard";

export default function App() {
  return <ScratchCard />;
}
```
