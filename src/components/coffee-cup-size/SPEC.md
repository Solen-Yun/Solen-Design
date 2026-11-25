# 咖啡杯点单 — CoffeeCupSize

制作「咖啡杯点单」场景：一块 300×500 的点单卡。头部 Americano 标题与等宽字体的滚动价格（初始 4,300 KRW）；中央一只 SVG 外带杯——梯形杯身、#C9A27A 杯套、两缕循环上升的热气，液面高度、颜色随配置实时变化，换杯型或加 shot 时杯身整体缩放、一股咖啡柱从杯口上方注入、液面以 700ms 缓动升到目标水位；下方 Small/Regular/Large 三段杯型选择（默认 Regular）、Shots 步进器（1–4，默认 2）、Add milk 拨动开关，以及一枚墨色 Add 大按钮。价格数字逐位滚动，shot 越多咖啡越深，加奶则颜色变浅并浮起一层奶泡。

## 布局与材质

- 300×500px 场景卡（宽 300、高 500），圆角 30px，溢出裁切，纵向 flex 布局、内边距 20px。底色表面色，外圈 0 0 0 1px 线色描边加 0 30px 60px -36px 强阴影。场景令牌浅色/深色两套（CSS light-dark，`prefers-color-scheme: dark` 切换）：页面底 #FFFFFF/#0B0C12，表面 #FFFFFF/#13141C，次表面 #F5F3EF/#1A1B25，三级表面 #EAE7E1/#252632，墨色 #16151B/#F4F0E8，次级墨 #57535F/rgba(244,240,232,.68)，三级墨 #8E8A97/rgba(244,240,232,.42)，线色 rgba(22,21,27,.09)/rgba(255,255,255,.08)；弹簧曲线 cubic-bezier(.34,1.56,.64,1)。
- 头部一行两端对齐：标题 Americano，19px/字重 850、字距 -0.03em；价格区 aria-live="polite"，等宽字体栈 ui-monospace、SFMono-Regular、Menlo、monospace，800 16px/22px、tabular-nums——每个数字字符一格（格宽 0.62em、溢出裁切），格内竖排 0–9 列，改变时 translateY(-22 × 数字 px)、过渡 0.5s spring；末尾小字 KRW 为 12px、三级墨色。
- 舞台区 flex 1、底对齐居中、padding-bottom 10px，内嵌 200×220px、溢出可见的 SVG：两缕热气为 x≈86/110 的 S 形路径，描边 2.5px 圆头、三级墨色，透明度 0.5，播放 2.4s ease-in-out 无限循环的升降动画（translateY 8px → −10px、透明度 0 → 0.5 → 0），第二缕延迟 0.8s；注入柱为 x 96、宽 8、高 150、圆角 4 的矩形，平时透明。杯组 transform-origin 定在 (100, 212)（杯底中心），transform 过渡 0.6s cubic-bezier(.3,1.4,.5,1)。杯身梯形路径 M58 64 h84 l-10 146 H68 z：填充墨色 4% 透明、描边次级墨 3px；杯套为 M62 120 h76 l-3 40 H65 z 的 #C9A27A 梯形；咖啡矩形（宽 120）与奶泡条（高 14）被同形 clipPath 裁进杯身，clipPath 的 id 按实例加随机后缀避免多实例串色。
- 杯型选择：三等分网格、间距 4px、内边距 4px、圆角 14px、背景次表面，role="group"、aria-label 为 Size；按钮高 36px、圆角 10px、13px/字重 750、三级墨色，选中（aria-pressed="true"）背景表面色、墨色文字，描边 1px 线色加 0 4px 10px -6px 强阴影；背景/颜色过渡 0.25s。
- Shots 行 margin-top 12px、两端对齐、13.5px/字重 750：左标签 Shots，右侧步进器（间距 10px）——− / + 两枚 32×32px 圆钮（背景次表面、18px 字号、墨色，aria-label 分别为 Remove a shot / Add a shot），中间计数最小宽 14px、居中、tabular-nums。
- Add milk 行 margin-top 12px：开关按钮 13.5px/字重 750，含 aria-hidden 的 38×22px 拨杆胶囊（背景三级表面 → 开时 #C9A27A，过渡 0.3s）与 16×16px 白色圆钮（left/top 3px，阴影 0 1px 3px rgba(0,0,0,.25)），开时圆钮 translateX(16px)、过渡 0.4s spring；按钮文案 Add milk，aria-pressed 表状态。
- Add 按钮：高 46px、margin-top 14px、圆角 15px、背景墨色、文字取页面底色（浅色白/深色 #0B0C12）、14px/字重 800。它只是视觉按钮，代码中未绑定点击行为。

## 数据

- 杯型表写死（横向缩放，纵向缩放，基础价）：Small (0.82, 0.74, 3800)、Regular (1, 1, 4300)、Large (1.12, 1.22, 4800)。默认 Regular。
- Shots 范围 1–4，默认 2；价格公式：杯型基础价 + max(0, shots − 2) × 500 +（加奶 500）。默认 4,300；金额用 en-US 千分位渲染并追加后缀 KRW。
- 咖啡颜色按 shots 取五档：1 杯 #B07A4A、2 杯 #8E5A30、3 杯 #6E4222、4 杯 #4E2C15（索引上限第五档 #3A1F0E）；加奶时用 color-mix 把当前色 70% 与 #F4EBDD 混合变浅，同时显示 #F4EBDD 奶泡条。
- 液面目标 y = 210 − (34 + shots × 12 +（奶 28)) × 1.2，下限 78（数值越小液面越高）。默认 Regular/2 shots/无奶时 y ≈ 140.4。

## 操作和动效

- 切杯型：杯组以 0.6s cubic-bezier(.3,1.4,.5,1) 缩放到新倍率（origin 在杯底），随后整段液面动画带注入播放。
- 加 shot（+，上限 4）：液面动画带注入；减 shot（−，下限 1）：只动画、不注入。加奶切换：液面动画带注入；咖啡色 fill 过渡 0.5s，奶泡条透明度过渡 0.4s（无奶时隐藏）。
- 注入柱动画 0.7s ease：从 scaleY(0) 透明展开、20%–70% 间完全可见、结尾下坠淡出（translateY 40px、scaleY 0.2）；每次注入前强制回流以重放。液面用 requestAnimationFrame 驱动：700ms 内以 e = 1 − (1 − k)³ 缓动从上一水位插到目标水位（奶泡条随 y − 2 同步移动）；挂载时立即播放一次注入与升液。
- 价格逐位滚动：位数变化时重建格列，数字变化时各格滚到新数字（0.5s spring）。
- 无障碍：价格区 aria-live="polite" 播报；杯型为 role="group" + aria-pressed；步进钮与奶开关各有明确 aria-label / aria-pressed。
- `prefers-reduced-motion` 下：液面动画时长压为 1ms 直接落位，注入柱不播放；热气等 CSS 动画由运行时宿主压为零时长。
- options.height 调整场景高度（默认 500），窄容器整景按比例缩小；options.reducedMotion 覆盖系统偏好。支持同页多实例（clipPath id 随机化），更新选项不重挂载，卸载时释放帧回调与监听器。

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| height | number | 500 | 场景高度，逻辑像素；窄容器整景按比例缩小 |
| reducedMotion | boolean | 跟随系统 | 覆盖系统的减少动态偏好 |

## 独立实现与六框架交付

- 仅凭本文从零生成可运行的实现。尺寸、颜色、文案、杯型/液面/价格数据与运动参数均以上述文字为准；杯子、热气、注入柱全部用内联 SVG 绘制，不加载远程图片、字体、视频或素材。
- 当前交付重点为 React，组件名称 CoffeeCupSize。从零创建四个文件：CoffeeCupSize.tsx、CoffeeCupSizeEngine.js、motion-runtime.ts、CoffeeCupSizeEngine.d.ts；分别实现框架入口、完整交互核心、实例生命周期和类型声明。文件名是需要生成的产物，不假定接收者已经拥有任何文件。
- 同时提供 React、Vue、Svelte、Solid、Preact、Vanilla 原生生命周期入口，共享框架无关核心。DOM 仅在挂载后访问，支持同页多实例；更新时保持状态，销毁时清理动画、计时器、观察器及监听器。不要用 iframe 代替组件实现。
- 依赖安装说明：npm install react react-dom。若使用依赖，只使用其公开 API；组件的布局、样式与算法必须在本次生成的文件中完整实现，不引用现成效果组件。
- 实现 options.height 以调整场景高度，options.reducedMotion 覆盖系统偏好；减少动态效果仍保留杯型、液位与价格的完整联动结果。
- 给出每个文件的完整内容、安装和运行步骤、以下使用示例所需的全部实现。不得留省略号、待补素材或「自行补齐核心」的占位。
- 验收：375 / 768 / 1440px 无横向溢出；三杯型缩放、1–4 shots 液位与颜色、加奶奶泡、价格逐位滚动与计价正确；浅色深色两套令牌正确；多实例互不干扰，卸载后停止所有任务。

## 使用示例

```tsx
import { CoffeeCupSize } from "./CoffeeCupSize";

export default function App() {
  return <CoffeeCupSize />;
}
```
