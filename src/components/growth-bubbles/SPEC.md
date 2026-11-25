# 增长气泡图 — GrowthBubbles

制作「增长气泡图」场景：一张 340×340 的表面色卡片里有一幅 Canvas 散点气泡图——横轴是月活用户（对数刻度 10k→10M），纵轴是 30 日留存率，8 个应用气泡按营收定径、按类别着色，背后衬一个 7% 透明度的超大季度大字（如「2023 Q3」）。图会自己播放：季度从 2021 Q1 前进到 2026 Q4 共 24 档，气泡沿平滑插值的轨迹游动长大，到末尾停留 1.6s 再循环。抓住画面左右拖动可来回擦洗时间（每 8px 一档、可逆），点按某枚气泡开关它的虚线轨迹尾迹，右上角圆形按钮负责播放/暂停，键盘左右方向键逐档步进，悬停气泡显示应用名。

## 布局与材质

- 场景 340×340px，圆角 30px，溢出裁切；底色取表面色令牌（浅 #FFFFFF/深 #13141C），文字取墨色令牌，主题感知；外圈 1px 线色描边加 0 30px 60px -36px 强阴影。场景根是无底色包装层，视觉卡片放在其内部的绝对填充层上。
- Canvas 绝对填充整卡，backing store 按 min(2, devicePixelRatio) 缩放保锐利；默认 cursor: ew-resize（提示可横向拖动），悬停在气泡上时切换为 pointer（is-on 类），touch-action: none；canvas tabindex="0" 可聚焦，role="img"，aria-label「App growth bubble chart, drag sideways to move through time」；focus-visible 外圈 2px accent、偏移 -4px、圆角 30px。
- 绘图区固定边距：左 46、右 318、上 50、下 272。横轴为 log10 刻度，画 10k/100k/1M/10M 四条竖网格线（1px 线色），刻度字 700 9px、次级墨色，首端左对齐、末端右对齐；纵轴映射留存 10–70%，画 20%/40%/60% 三条横网格线，标签贴轴左（PL−5）；轴题「Monthly users →」画在横轴右端下方、「30-day retention」画在纵轴顶端上方。所有网格与文字颜色从场景令牌读取，深浅主题自动适配。
- 背景大字：当前季度名（如 2021 Q1 → 2026 Q4，格式「YYYY Qn」），900 40px 系统字体栈，墨色 7% 透明度，居中画在绘图区中央（y=178）。
- 气泡：半径 = 4 + √营收 × 2.6；填充类别色 85% 不透明度，描边 1.2px rgba(255,255,255,.75)；按半径从大到小绘制，小气泡压在大气泡上。尾迹开启或悬停时在气泡上方 5px 处标注 800 10px 墨色应用名。
- 尾迹：虚线 setLineDash [3,3]、线宽 1.4、60% 透明度、类别色，每 0.25 季采样一个折点；每个整数季度画一枚 1.8px 实心小点。
- 播放/暂停按钮：绝对定位 right 16px、top 14px，30×30 圆形、墨色底表面色图标（12×12：暂停为两根圆角竖条，播放为三角），is-paused 类切换图标；focus-visible 外圈 2px accent、偏移 3px，aria-label 随状态在「Pause」「Play」间切换。
- 图例：绝对定位 bottom 12px 横向居中，间距 11px、10px/字重 750、次级墨色、pointer-events none、aria-hidden；每项 8×8 圆点 + 4px 间距 + 类别名，四类 Productivity #6366F1、Health #10B981、Hobby #F59E0B、Finance #EC4899。
- 组件固定 340px 逻辑宽度：容器更窄时整景按 min(1, 容器宽/340) 等比缩放，指针坐标按缩放比换算。

## 数据

- 写死 8 个应用与类别（类别索引 0–3 依次对应 Productivity/Health/Hobby/Finance）：Notes/Productivity、To-do/Productivity、Walking/Health、Meditation/Health、Photo edit/Hobby、Reading/Hobby、Budget/Finance、Investing/Finance。
- 每个应用 4 个关键季度（第 0、8、16、23 档，即 2021 Q1、2023 Q1、2025 Q1、2026 Q4）的三元组 [月活(万)， 30日留存%， 营收]，写死如下：
  - Notes：[30,42,5]、[60,46,8]、[90,48,10]、[110,50,12]
  - To-do：[8,30,2]、[40,38,6]、[150,44,15]、[300,47,26]
  - Walking：[200,25,4]、[500,22,6]、[420,28,7]、[380,34,9]
  - Meditation：[15,50,6]、[80,55,14]、[60,52,12]、[45,58,13]
  - Photo edit：[120,35,10]、[180,30,12]、[260,33,18]、[600,38,32]
  - Reading：[5,60,3]、[9,62,4]、[20,64,6]、[35,66,8]
  - Budget：[50,28,3]、[70,31,4]、[140,40,9]、[180,45,12]
  - Investing：[2,20,1]、[260,18,10]、[90,24,6]、[70,35,7]
- 初始尾迹开关写死为只有 Reading 开启，其余 7 个关闭。无随机种子、无外部数据。

## 操作和动效

- 自动播放：季度推进速度 2.4 档/秒，关键帧之间用 smoothstep（f³(3−2f)）插值——月活按对数空间插值、留存与营收线性插值，气泡位置与半径随每帧连续变化；到第 23 档后停留 1.6s，再跳回第 0 档循环。离屏（IntersectionObserver）时循环暂停，回屏恢复；重绘按 rAF 驱动，帧间隔 clamp 0.05s。
- 擦洗：pointerdown 记录起点并暂停播放（setPointerCapture），横向拖动每 8px 折算一档，可来回可逆；位移超过 4px 判定为拖动。松手时若几乎没有移动且落点在某枚气泡上（命中半径 +3px、优先最上层小气泡），则切换该气泡的尾迹开关。
- 悬停：pointermove 命中检测气泡，命中时指针变 pointer 并在该气泡上方显示应用名；pointerleave 清除。
- 键盘：canvas 聚焦后 ArrowRight/ArrowLeft 逐档步进（取整季度），preventDefault 并暂停播放。
- 播放/暂停按钮：点击切换播放态；若正停在末档则先回到第 0 档再播放。
- `prefers-reduced-motion: reduce`（或 options.reducedMotion）下：不自动播放，直接呈现第 23 档的完整终态（所有气泡到达最后位置、Reading 尾迹完整）；拖动、点按、方向键、播放按钮全部照常工作，按需重绘。
- 无障碍：canvas role="img" + aria-label 说明「左右拖动以穿越时间」；图例 aria-hidden（信息在图内文字已给出）；播放按钮 aria-label 动态切换；气泡名标签为绘制文本。
- options.height 调整场景高度（默认 340）；options.reducedMotion 覆盖系统偏好。支持同页多实例，更新选项不重挂载；卸载时停止帧循环、断开观察器并移除监听。

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| height | number | 340 | 场景高度，逻辑像素；窄容器整景按比例缩小 |
| reducedMotion | boolean | 跟随系统 | 覆盖系统的减少动态偏好 |

## 独立实现与六框架交付

- 仅凭本文从零生成可运行的实现。尺寸、颜色、数据、插值与运动参数均以上述文字为准；图形全部用 Canvas 2D 绘制，不加载远程图片、字体、视频或素材。
- 当前交付重点为 React，组件名称 GrowthBubbles。从零创建四个文件：GrowthBubbles.tsx、GrowthBubblesEngine.js、motion-runtime.ts、GrowthBubblesEngine.d.ts；分别实现框架入口、完整交互核心、实例生命周期和类型声明。文件名是需要生成的产物，不假定接收者已经拥有任何文件。
- 同时提供 React、Vue、Svelte、Solid、Preact、Vanilla 原生生命周期入口，共享框架无关核心。DOM 仅在挂载后访问，支持同页多实例；更新时保持状态，销毁时清理动画、计时器、观察器及监听器。不要用 iframe 代替组件实现。
- 依赖安装说明：npm install react react-dom。若使用依赖，只使用其公开 API；组件的布局、样式、图形和算法必须在本次生成的文件中完整实现，不引用现成效果组件。
- 实现 options.height 以调整场景高度，options.reducedMotion 覆盖系统偏好；减少动态下仍可拖动擦洗与查看任意季度。
- 给出每个文件的完整内容、安装和运行步骤、以下使用示例所需的全部实现。不得留省略号、待补素材或"自行补齐核心"的占位。
- 验收：375 / 768 / 1440px 无横向溢出；播放循环、拖动擦洗可逆、点按开关尾迹、方向键步进均正确；深浅主题适配；减少动态呈现终态且交互有效；多实例互不干扰，卸载后停止所有任务。

## 使用示例

```tsx
import { GrowthBubbles } from "./GrowthBubbles";

export default function App() {
  return <GrowthBubbles />;
}
```
