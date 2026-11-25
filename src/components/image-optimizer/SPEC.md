# 图片优化器 — ImageOptimizer

制作「图片优化器」卡片：一张 340×340 的压缩工具面板。顶部是一块 150px 高的原图/优化对比窗：一幅纯 SVG 绘制的紫粉黄昏山景，左右两半各挂 Original/Optimized 黑色小标签，中央一枚可拖动的白色分隔线手柄，右侧画面按质量滑杆实时加模糊、低质量时还会浮出方格失真纹理；下方一行 JPEG/WebP/AVIF 格式分段控件与 Quality 滑杆（10–100，默认 82）；再往下两根 Original（2.4MB 满宽灰条）与 Optimized（绿色渐变条）的体积对比条；底部绿色横幅里一枚 22px 的 −NN% 大数字滚动显示节省比例，后缀 smaller。质量拖到 35 以下时右下角弹出一枚 Visible quality loss 橙色警示胶囊。

## 布局与材质

- 340×340px 场景卡，圆角 30px，溢出裁切。底色表面色，外圈 0 0 0 1px 线色描边加 0 30px 60px -36px 强阴影。场景令牌浅色/深色两套（CSS light-dark，`prefers-color-scheme: dark` 切换）：表面 #FFFFFF/#13141C，次表面 #F5F3EF/#1A1B25，三级表面 #EAE7E1/#252632，墨色 #16151B/#F4F0E8，次级墨 #57535F/rgba(244,240,232,.68)，三级墨 #8E8A97/rgba(244,240,232,.42)，线色 rgba(22,21,27,.09)/rgba(255,255,255,.08)，强调色 #6A57F2/#B7A4FF。数字统一 tabular-nums。
- 对比窗绝对定位 left/right 12px、top 12px、高 150px、圆角 16px、溢出裁切、touch-action none。窗内两层同样的 SVG 山景（渐变 id 按实例加随机后缀避免多实例串色）；上层（优化侧）以 `clip-path: inset(0 0 0 var(--x))` 从分隔位置起显示，SVG 加 `blur(var(--bl))` 滤镜，并以 `repeating-conic-gradient(rgba(0,0,0,.06) 0 25%,transparent 0 50%)`、尺寸 var(--px) 方格、透明度 var(--po) 叠出压缩失真纹理。两枚角标位于 top 8px、left/right 8px：内边距 2px 7px、圆角 6px、背景 rgba(0,0,0,.5)、白字 9.5px/字重 850，文案 Original 与 Optimized。
- 分隔手柄绝对纵贯、left 为 var(--x)、宽 24px（margin-left -12px）、cursor ew-resize：内部一条 left 11px、宽 2px 的白线（阴影 0 0 6px rgba(0,0,0,.3)）加一枚垂直居中的 18×18px 白色圆钮（阴影 0 2px 6px rgba(0,0,0,.3)）；focus-visible 为 2px 白色描边、偏移 -2px。
- 控件行绝对定位 left/right 14px、top 172px、横向居中、间距 10px：左侧格式分段容器内边距 3px、圆角 10px、背景次表面、内嵌 1px 线色描边，三枚按钮 role="radio" 高 26px、左右内边距 9px、圆角 7px、10.5px/字重 850、三级墨色，选中（aria-checked="true"）背景墨色、文字表面色，背景/颜色过渡 0.2s。右侧 Quality 块 flex 1、间距 7px：标签 10px/字重 800、次级墨色；滑轨容器高 22px，轨道 top 9px、高 4px、圆角 2px、三级表面，填充段取强调色；滑块 16×16px 白圆（top 3px、margin-left -8px），阴影 0 0 0 1px rgba(0,0,0,.1) 与 0 2px 5px rgba(0,0,0,.25)；数值 em 最小宽 22px、右对齐、字重 900、墨色。
- 体积条区绝对定位 left/right 14px、top 212px：两行 grid（列宽 42px / 1fr / 56px、间距 8px、行高 24px），行标签 Original、Optimized 为 10px/字重 800、次级墨色；轨道高 10px、圆角 5px、背景次表面；Original 条 100% 宽、三级墨色，Optimized 条背景 `linear-gradient(90deg,#10B981,#34D399)`、宽度按 size/ORIG 百分比、width 过渡 0.5s cubic-bezier(.3,1.1,.4,1)；行尾数值右对齐、字重 900、墨色。
- 节省横幅绝对定位 left/right 14px、bottom 16px：基线对齐、间距 6px、内边距 10px 12px、圆角 13px、背景 #10B981 的 12% 透明色、文字 #047857、11px/字重 800；大数字 22px/字重 900、字距 -0.02em，文案 −NN%；后缀 smaller。警示胶囊位于对比窗 right 8px、bottom 8px：间距 4px、内边距 3px 8px、圆角 7px、背景 #F59E0B、白字 9.5px/字重 850，默认透明度 0、下移 6px，进入过渡 0.25s/0.3s。
- 按钮 focus-visible 为 2px 强调色描边、偏移 2px。

## 数据

- 原图体积写死 2400 KB，显示为 2.4MB；体积换算规则：≥1000 显示 (KB/1000) 保留 1 位小数 + MB，否则取整 + KB。
- 三种格式的满质量压缩比写死：JPEG 0.62、WebP 0.38、AVIF 0.27。结果体积 = 2400 × 格式比 × (0.18 + 0.82 × (质量/100)^2.2)；节省百分比 = round((1 − 体积/2400) × 100)。默认状态为 JPEG、质量 82、分隔线 50%。
- 山景 SVG（viewBox 0 0 316 150，满铺裁切）：天空纵向渐变 #FDBA74 → 55% 处 #F472B6 → #7C3AED；(210,64) 处 r=26 的 #FEF3C7 太阳；紫色山脊 #4C1D95（75% 透明）折线；前景深紫丘陵 #2E1065；四枚 #FDE68A 星点（(40,30) r1.6、(90,18) r1.2、(140,36) r1.4、(280,24) r1.2）。
- 质量低于 35 判定为低质量：模糊 blur = max(0, 60 − 质量)/22 px（任何质量下均按此式），失真格 px = round(4 + (40 − 质量)/4) px、透明度 0.9，并显示警示胶囊。

## 操作和动效

- 质量滑杆：滑块与整条轨道都可拖（pointerdown 捕获指针、pointermove 连续更新），值取整到 10–100；更新即重算体积、条宽、模糊/失真、百分比并同步 aria-valuenow。键盘：ArrowRight +5、ArrowLeft −5，钳制在 10–100。
- 对比分隔线：同样支持拖动与 ArrowLeft/Right ±5，位置钳制在 4%–96%，aria-valuenow 取整。
- 切格式：点按钮即选中并重算全部数值。
- 百分比滚动：每次重算从上一次显示值出发，以 400ms 线性插值滚到新值，文案 −NN%；体积条宽度以 0.5s cubic-bezier(.3,1.1,.4,1) 过渡；低质量警示胶囊淡入上浮。
- 无障碍：格式组 role="radiogroup"（aria-label Format）内三枚 role="radio"；质量滑轨 role="slider"、aria-label Quality、aria-valuemin 10、aria-valuemax 100；分隔线 role="slider"、aria-label Compare divider、aria-valuemin 0、aria-valuemax 100；警示胶囊 role="status"。
- `prefers-reduced-motion` 下：条宽过渡与警示胶囊过渡关闭（直接落位）；百分比计数经运行时帧调度，减少动态时帧回调被挂起、数值待下一次交互或页面恢复时补齐。滑杆与分隔线交互不受影响。
- options.height 调整场景高度（默认 340），窄容器整景按比例缩小；options.reducedMotion 覆盖系统偏好。支持同页多实例（SVG 渐变 id 带实例随机后缀），更新选项不重挂载，卸载时释放帧回调与监听器。

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| height | number | 340 | 场景高度，逻辑像素；窄容器整景按比例缩小 |
| reducedMotion | boolean | 跟随系统 | 覆盖系统的减少动态偏好 |

## 独立实现与六框架交付

- 仅凭本文从零生成可运行的实现。尺寸、颜色、文案、计算公式与运动参数均以上述文字为准；对比图用内联 SVG 绘制、失真纹理用 CSS 渐变，不加载远程图片、字体、视频或素材。
- 当前交付重点为 React，组件名称 ImageOptimizer。从零创建四个文件：ImageOptimizer.tsx、ImageOptimizerEngine.js、motion-runtime.ts、ImageOptimizerEngine.d.ts；分别实现框架入口、完整交互核心、实例生命周期和类型声明。文件名是需要生成的产物，不假定接收者已经拥有任何文件。
- 同时提供 React、Vue、Svelte、Solid、Preact、Vanilla 原生生命周期入口，共享框架无关核心。DOM 仅在挂载后访问，支持同页多实例；更新时保持状态，销毁时清理动画、计时器、观察器及监听器。不要用 iframe 代替组件实现。
- 依赖安装说明：npm install react react-dom。若使用依赖，只使用其公开 API；组件的布局、样式与算法必须在本次生成的文件中完整实现，不引用现成效果组件。
- 实现 options.height 以调整场景高度，options.reducedMotion 覆盖系统偏好；减少动态效果仍保留滑杆、对比分隔与全部计算状态。
- 给出每个文件的完整内容、安装和运行步骤、以下使用示例所需的全部实现。不得留省略号、待补素材或「自行补齐核心」的占位。
- 验收：375 / 768 / 1440px 无横向溢出；三格式 × 全质量区间的体积与节省计算正确、低质量失真与警示正确；浅色深色两套令牌正确；多实例互不干扰，卸载后停止所有任务。

## 使用示例

```tsx
import { ImageOptimizer } from "./ImageOptimizer";

export default function App() {
  return <ImageOptimizer />;
}
```
