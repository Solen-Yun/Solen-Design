# 滚动驱动大字带 — ScrollMarqueeRows

制作「滚动驱动大字带」卡片：一块 340×330 的墨色底板，三行超长短语横向循环漂移——第一、三行向左，中间一行向右，首行是 52px 特粗标语，中行是 30px accent 色的句子，第三行是描边空心字。卡片本身可纵向滚动（内容区高 2400px、舞台 sticky 钉在视口），滚动的速度与方向实时注入大字带：向下滚动时所有行按滚动方向加速，向上滚动则整体反向；滚动越快，行体按各自运动方向倾斜越明显（skewX 最大 8°），停止滚动后速度与倾斜按帧衰减回基线漂移。底部常驻一行半透明提示「Scroll to change the speed」。

## 布局与材质

- 340×330px 场景卡，圆角 28px，溢出裁切，底色取墨令牌 var(--ux-ink)——即浅色方案下为深墨板 #16151B、深色方案下为浅板 #F4F0E8；文字取页面令牌 var(--ux-page)（浅 #FFFFFF / 深 #0B0C12），形成反色底板。阴影只有 0 30px 60px -36px 强投影，无描边圈。场景根是 340×330 的无底色包装层（水平居中），卡片视觉放在其内部的绝对填充层上——文档演示舞台会剥离场景根的背景，卡片底色必须在嵌套层上才能保留。窄容器下整景按 min(1, 容器宽/340) 等比缩小。
- 场景令牌浅色深色两套（CSS 变量 + `light-dark()`，`prefers-color-scheme` 切换）：页面底 #FFFFFF（深 #0B0C12）、面 #FFFFFF（深 #13141C）、面 2 #F5F3EF（深 #1A1B25）、墨 #16151B（深 #F4F0E8）、墨 2 #57535F（深 rgba(244,240,232,.68)）、墨 3 #8E8A97（深 rgba(244,240,232,.42)）、accent #6A57F2（深 #B7A4FF）。
- 滚动容器绝对铺满整卡（inset 0），overflow-y:auto，滚动条双通道隐藏（scrollbar-width:none 与 ::-webkit-scrollbar），tabindex=0 可聚焦，outline:none，aria-label「Moving text rows, scroll to change their speed」；内部占位层高 2400px 制造滚动行程——纵向滚动本身不产生视觉位移（舞台被 sticky 钉住），只作为速度与方向的输入。舞台 sticky top 0、高 330px，纵向 flex 居中、行间距 8px、横向溢出裁切。
- 三行大字均为横向 flex、不换行、will-change:transform，由脚本在挂载时逐行创建：每行把同一段短语连续重复 4 个 span（span flex:none），span 右侧留 0.3em 字间距式缺口。第一行 52px/行高 1.05/字重 900/字距 -0.04em；第二行 30px/字重 800/accent 色/字距 -0.03em；第三行文字填充 transparent，以 1.5px 的 -webkit-text-stroke 描边，描边色为 color-mix(in srgb, var(--ux-page) 70%, transparent)。三行文字颜色分别命中页面令牌、accent 令牌与页面令牌的混色，深浅方案下自动反色。
- 底部提示：绝对定位左右贴边、下 16px 居中，11.5px/字重 750，色为 color-mix(in srgb, var(--ux-page) 50%, transparent)，文案「Scroll to change the speed」，aria-hidden。三行大字纵向居中排布，行间 8px；行内容横向超出视口的部分被舞台裁切，只露出 340px 视窗内的片段。
- 舞台及行内容器 aria-hidden="true"（JS 会再给舞台设 aria-label，但 aria-hidden 优先生效），滚动副本文本不暴露给读屏；无障碍名称落在滚动容器的 aria-label 上，底部提示同样 aria-hidden，不参与朗读。

## 数据

- 三行短语全部写死：第一行「DESIGN · MOTION · CODE · 」，第二行「Interfaces that speak in motion · 」，第三行「SOLEN DESIGN · 2026 · 」。每段重复 4 份循环使用，无其他写死数据。

## 操作和动效

- 基线漂移：每帧（以 16.7ms 归一化的 dt，帧差钳制在 0–50ms）位移 = 行方向 × 滚动符号 × (0.5 + boost) × dt px，0.5px/帧约每秒 30px；无滚动时 boost=0，三行保持匀速漂移。行方向第一、三行为 -1（向左），第二行为 +1（向右）。初始相位随机：每行起点 x 为 -random()×200px。循环接缝按单个短语的实测宽度（首 span 的 offsetWidth，首次帧测量后缓存）取模回绕，x<-w 时加 w、x>0 时减 w，重复 4 份保证 340px 视口内无空档。
- 滚动注入：scroll 监听以 passive 方式挂载，事件里取滚动增量 dy，boost = min(40, boost + |dy| × 0.25)，最后一次滚动的方向记为 sign（向下 +1 / 向上 -1）。逐帧 boost 乘 0.92^dt 衰减；倾斜目标值为 boost>1 时 sign × min(8, boost × 0.35) 度、否则 0 度，实际 skew 以每帧 0.15×dt 的比例逼近目标。每行变换为 translateX(x) skewX(-skew × 行方向)——同向滚动的两行斜向一致，反向行自动镜像，整体呈现顺运动方向的甩尾感。行元素带 will-change:transform 提示合成层。
- 帧循环只在有可见性时运行：IntersectionObserver 监听场景，滚出视口即停帧，重新进入视口时从上一帧时间续跑；帧差超过 50ms 时按 50ms 计，避免后台标签页切回后速度跳变。options 更新不重挂载，卸载时取消帧回调并断开观察器。
- 键盘：滚动容器可聚焦（tabindex=0，outline:none 无可见焦点环），方向键、空格、PageUp/PageDown 等原生滚动键直接驱动同一 scroll 采样路径，加速与倾斜与鼠标滚轮完全一致。
- `prefers-reduced-motion: reduce` 下：帧循环不启动（首帧之后不再排下一帧），三行静止在各自的随机初始相位（不漂移、无倾斜），滚动只移动占位层不注入速度、不更新倾斜；options.reducedMotion 为 true 时等价生效。静止画面仍完整呈现三行大字与提示。

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| height | number | 330 | 场景高度，逻辑像素；窄容器整景按比例缩小 |
| reducedMotion | boolean | 跟随系统 | 覆盖系统的减少动态偏好 |

## 独立实现与六框架交付

- 仅凭本文从零生成可运行的实现。尺寸、颜色、文案和运动参数均以上述文字为准；界面用 DOM 与 CSS，速度与倾斜用逐帧插值实现，不加载远程图片、字体、视频或素材。
- 当前交付重点为 React，组件名称 ScrollMarqueeRows。从零创建四个文件：ScrollMarqueeRows.tsx、ScrollMarqueeRowsEngine.js、motion-runtime.ts、ScrollMarqueeRowsEngine.d.ts；分别实现框架入口、完整交互核心、实例生命周期和类型声明。文件名是需要生成的产物，不假定接收者已经拥有任何文件。
- 同时提供 React、Vue、Svelte、Solid、Preact、Vanilla 原生生命周期入口，共享框架无关核心。DOM 仅在挂载后访问，支持同页多实例；更新时保持状态，销毁时清理动画、计时器、观察器及监听器。不要用 iframe 代替组件实现。
- 依赖安装说明：npm install react react-dom。若使用依赖，只使用其公开 API；组件的布局、样式、图形和算法必须在本次生成的文件中完整实现，不引用现成效果组件。
- 实现 options.height 以调整场景高度，options.reducedMotion 覆盖系统偏好；减少动态仍保留完整画面内容。
- 给出每个文件的完整内容、安装和运行步骤、以下使用示例所需的全部实现。不得留省略号、待补素材或"自行补齐核心"的占位。
- 验收：375 / 768 / 1440px 无横向溢出；正反两个滚动方向的加速、倾斜与回基线衰减均正确；循环接缝无跳变；浅色深色两套令牌正确；多实例互不干扰，卸载后停止所有任务。

## 使用示例

```tsx
import { ScrollMarqueeRows } from "./ScrollMarqueeRows";

export default function App() {
  return <ScrollMarqueeRows />;
}
```
