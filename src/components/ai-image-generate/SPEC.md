# AI 生图去噪 — AiImageGenerate

制作「AI 生图去噪」卡片：一张 340×340 的深色生成界面。顶部一条提示词输入栏（预填 A seaside city at sunset, warm tones）与一枚紫粉渐变的 Generate 按钮；中部 2×2 四格画布，点击 Generate 后每格从一层浓噪声与重模糊中逐渐「显影」出一幅海城日落插画——天空渐变、太阳、建筑剪影与虚线海面波纹由种子驱动的内联 SVG 绘出，噪声透明度、模糊量、饱和度、缩放随进度收敛，格内左下角滚动百分比、底部状态行滚动 Step N / 30；点选任意一格出现粉色对勾角标，Vary this one 按钮按所选格的色调重绘其余三格。

## 布局与材质

- 340×340px 场景卡，圆角 30px，溢出裁切。整卡固定深色（不随系统切换）：底色 #0B0C12，文字 #F1F2F8，外圈 0 0 0 1px rgba(255,255,255,.08) 描边加 0 30px 60px -36px rgba(0,0,0,.72) 强阴影。
- 提示词栏绝对定位 left/right/top 12px，横向排列、间距 6px、内边距 5px、圆角 15px，背景 #181A24、内嵌 0 0 0 1px #2A2D3C 描边。输入框高 34px、左右内边距 10px、无边框无底色、11.5px/字重 650、aria-label 为 Prompt、关闭自动填充，预填文案 A seaside city at sunset, warm tones。Generate 按钮高 34px、左右内边距 12px、圆角 10px，背景 `linear-gradient(135deg,#A78BFA,#F472B6)`、白字 11.5px/字重 850，内嵌 12×12px 四角星图标；禁用时透明度 0.45。
- 画布绝对定位 left/right 12px、top 66px、bottom 58px，两列网格、间距 6px。每格圆角 14px、溢出裁切、背景 #181A24；格内 SVG 铺满并施加 `blur(var(--b)) saturate(var(--s))` 滤镜与 `scale(var(--z))` 缩放。选中格 box-shadow 0 0 0 2.5px #F472B6 且缩小到 0.97。空态为居中一枚 28×28px、#3B3F52 描边式图片图标（圆角相框、圆点太阳、折线山景）。
- 噪声层铺满每格：内联 SVG data URI 的 feTurbulence 分形噪声（baseFrequency 0.9、numOctaves 2、平铺拼接）经色彩矩阵调灰，以 120×120px 平铺，mix-blend-mode 为 hard-light，透明度由 --n 驱动、pointer-events 关闭。生成中播放 0.12s steps(2) 无限循环的抖动动画（50% 处背景位移 37px 61px）。
- 进度角标位于格内 left 8px、bottom 7px，内边距 2px 6px、圆角 6px、背景 rgba(0,0,0,.55)、9px/字重 800、tabular-nums，仅生成中可见（透明度过渡 0.25s）。对勾角标位于 right 7px、top 7px，20×20px 圆形、背景 #F472B6，内嵌 4×8px、2px 白描边旋转 45° 的对勾，scale(0)→1 过渡 0.3s cubic-bezier(.3,1.7,.5,1)。
- 底栏绝对定位 left/right 12px、bottom 12px，横向排列、间距 8px：状态行 aria-live="polite"、10.5px/字重 750、#8E93AB、tabular-nums；右侧 Vary this one 按钮高 36px、左右内边距 13px、圆角 11px、背景 #F1F2F8、字色 #0B0C12、11.5px/字重 850，禁用时透明度 0.25。按钮 focus-visible 为 2px #F472B6 描边、偏移 2px。

## 数据

- 四套固定调色板（各含 [天空主色, 顶部色, 剪影/海色, 亮部色]）：[#F97316,#DB2777,#4C1D95,#FDE68A]、[#FB7185,#7C3AED,#1E1B4B,#FECACA]、[#F59E0B,#EF4444,#312E81,#FEF3C7]、[#FDBA74,#C026D3,#0F172A,#FFF7ED]。首轮随机取起点 base，四格依次用 (base+i) mod 4 套配色。
- 每格插画由随机种子（seed×9301+49297 mod 233280 的伪随机序列）生成：100×100 viewBox 满铺裁切；天空为纵向三段渐变（顶 0 处 p1、60% 处 p0、100% 处 p3）；太阳为 p3 色圆，圆心 x 20–80、y 30–48、半径 9–15、透明度 0.9；建筑剪影从 y 62 向上，单栋宽 6–18px、高 10–36px、间隙 0–2px、p2 色、透明度 0.75–1；海面为 y 62–100 的 p2 色矩形叠 25% 透明 p0；三条虚线波纹位于 y 70/78/86，p3 色、宽 0.8、透明度 0.35、dash 4–10 与 3–8。种子每次生成都重新随机。
- 步数上限 30；每格时长 = 2200 + 行内序号×380 + 0–300ms 随机。

## 操作和动效

- 点击 Generate：清空选中态，busy 期间 Generate 与四格全部禁用；四格同时开跑，各自以 `e = 1−(1−q)^2.2` 的缓动收敛四项变量——噪声透明度 (1−e)×1.1、模糊 (1−e)×14px、饱和度 0.4+0.6e、缩放 1.12−0.12e；格内角标实时显示 round(q×100)%，首格驱动状态行显示 Step max(1, round(q×30)) / 30。全部完成后恢复点击，状态行清空。
- 点击格子切换选中（再点取消）：选中格出现粉色描边、缩小与对勾角标，aria-pressed 同步；每格 aria-label 为 Option N — pick image。
- 点击 Vary this one：未选中或忙碌时禁用；保留选中格，其余三格以选中格的调色板各自换新种子重跑，进度文案逻辑同上；完成后 Generate 复原、Vary 依选中态复原。
- 无障碍：进度角标与图形均为纯装饰；状态行 aria-live 播报步进；输入框 aria-label Prompt。
- `prefers-reduced-motion` 下：格噪声抖动动画关闭，格子与对勾的过渡关闭，去噪时长压为 1ms 直接显影成品；界面状态照常流转。
- options.height 调整场景高度（默认 340），窄容器整景按比例缩小；options.reducedMotion 覆盖系统偏好。支持同页多实例，更新选项不重挂载，卸载时释放帧回调与监听器（生成循环检测实例存活，中断后不再写 DOM）。

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| height | number | 340 | 场景高度，逻辑像素；窄容器整景按比例缩小 |
| reducedMotion | boolean | 跟随系统 | 覆盖系统的减少动态偏好 |

## 独立实现与六框架交付

- 仅凭本文从零生成可运行的实现。尺寸、颜色、文案、生成算法与运动参数均以上述文字为准；插画用种子驱动的内联 SVG 绘制、噪声用 data URI 的 SVG 滤镜，全部界面用 DOM 与 CSS，不加载远程图片、字体、视频或素材，不调用任何外部生成服务。
- 当前交付重点为 React，组件名称 AiImageGenerate。从零创建四个文件：AiImageGenerate.tsx、AiImageGenerateEngine.js、motion-runtime.ts、AiImageGenerateEngine.d.ts；分别实现框架入口、完整交互核心、实例生命周期和类型声明。文件名是需要生成的产物，不假定接收者已经拥有任何文件。
- 同时提供 React、Vue、Svelte、Solid、Preact、Vanilla 原生生命周期入口，共享框架无关核心。DOM 仅在挂载后访问，支持同页多实例；更新时保持状态，销毁时清理动画、计时器、观察器及监听器。不要用 iframe 代替组件实现。
- 依赖安装说明：npm install react react-dom。若使用依赖，只使用其公开 API；组件的布局、样式与算法必须在本次生成的文件中完整实现，不引用现成效果组件。
- 实现 options.height 以调整场景高度，options.reducedMotion 覆盖系统偏好；减少动态效果仍保留生成完成后的完整画面。
- 给出每个文件的完整内容、安装和运行步骤、以下使用示例所需的全部实现。不得留省略号、待补素材或「自行补齐核心」的占位。
- 验收：375 / 768 / 1440px 无横向溢出；生成、选中、变体重绘、忙碌期禁用逻辑正确；深色令牌固定；多实例互不干扰，卸载后停止所有任务。

## 使用示例

```tsx
import { AiImageGenerate } from "./AiImageGenerate";

export default function App() {
  return <AiImageGenerate />;
}
```
