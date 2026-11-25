# 工程文字特效 — TechText

制作「工程文字特效」组件：把一行字标画成一张工程图纸。Canvas 2D 逐字测量字标并为每个字母预渲染实心与虚线轮廓两张精灵图；指针所到之处字母在镜头里变成虚线轮廓，一枚工程选中框滑到该字母四周并标注字符与实测尺寸；字母可拖离基线由弹簧送回，点击时向上弹起并把冲击波逐级传给邻居；指针离开后镜头沿字标自动巡游。全部交互绘制在与容器等大的一张 canvas 上，渲染停稳即停帧。

## 布局与材质

- 根节点 div.tech-text：position relative、width 与 height 100%、touch-action pan-y、user-select none，role="img"、aria-label 取完整字标文本；内部一张 .tech-text-canvas 铺满（display block，100%×100%）。组件必须放进有明确尺寸的容器，画布尺寸跟随容器，devicePixelRatio 封顶 2。两条类规则都包在 `@layer sd.components` 层内，样式表必须带这层声明。
- 字标排版：先以 prop 字号实测整行墨迹宽高，按 min(1, 容器宽×0.9÷墨迹宽, 容器高×0.66÷墨迹高) 缩放实际字号，因此 fontSize 是上限、窄容器自动缩小；letterSpacing（em）按实际字号换算成 px，测量与绘制都用同一字距。align left 时左边距为容器宽 5%，right 对称，center 居中；基线按墨迹高度垂直居中。字体族取 fontFamily，留空继承容器 computed fontFamily，兜底 sans-serif；64px 版本的测量字体会经 document.fonts.load 预载，document.fonts.ready 后整版重排，字号变化重画精灵图。
- 每个字母两张离屏精灵图：实心填充图与轮廓图，四周留 ceil(strokeWidth×2+4)px 余量。轮廓图先用 strokeText 描边（lineWidth 取 strokeWidth×2、lineJoin round、lineCap butt；lineStyle dashed 时 setLineDash([max(1,dashLength), max(1,dashGap)])，solid 时不设虚线），再用 destination-out 填充同一字符掏空内部，所以 dashed 与 solid 都只留下厚度等于 strokeWidth 的外轮廓。颜色：字母与轮廓用 color，选中框、连接线、碎屑、标注用 accentColor；两者默认 currentColor，即读容器 computed color 跟随周围文字与主题，无独立深浅两套令牌，主题切换由监听唤醒后按新色重排。
- 选中框：命中字母的包围盒（含位移）外扩 6px 的 1px 直角矩形，线透明度 0.5；四角各一枚 5×5px 实心角块，透明度 0.95。字母离位超过 1px 时，从原位中心画一条 [3,4] 虚线连到当前位置（透明度 0.45）并在原位落一颗 4×4px 点（透明度 0.7）。labels 开启时框上标注用 10px ui-monospace、SFMono-Regular、Menlo、Consolas 栈：静止为「字符 宽×高」，拖动为「x, y」偏移量（正带 +、负用 −，y 向上为正），透明度 0.62，画在框左上角上方 7px。
- 度量标线（guides）：横贯字标、左右各外扩 max(12, 实际字号×0.12)px 的 1px 水平线，线体透明度 0.4，两端 3×3px 方块端点透明度 0.9；labels 开启时在线端外侧 8px 标英文字符串 baseline / x-height / cap height / ascender / descender（透明度 0.62，右侧空间不足改标左侧）。ascender 线仅当它与 cap 高度差超过 max(11px, 字号×0.06) 时出现。
- 像素碎屑（specks）：沿选中框周长外侧按 3px 网格取整摆放，尺寸按噪声从 2/3/5/8/11px 五档取（阈值 0.46/0.7/0.84/0.94）；每颗周期 0.5–1.7s，只显示周期前 70%，头尾各有一次降为 0.35 的闪烁；大块（≥8px）画空心描边框、部分再补 2×2px 中心点，小块实心，透明度按噪声 0.3–0.9。另有两条沿周长行进的拖尾点列（相位差半周），头部 3px、后随三颗 2px、间隔 6px，透明度 0.95/0.55/0.32/0.16，行进速度乘 speed。

## 数据

- 组件无写死内容数据：字标文本、字体、颜色全部来自 props，不带演示文案，也不加载远程图片、字体或素材。
- 代码内写死的只有标注字符串与运动常数：五条度量线的英文标签、帧率无关的弹簧刚度 320、冲击衰减 0.62 每级、入场前置延时 0.15s、镜头跟随时间常数（指针 0.05s、巡游 0.22s）、字母命中半径 28px、径向渐变 8 档色标。

## 操作和动效

- 指针跟随与轮廓化：镜头点以 0.05s 时间常数逼近指针。reveal="area" 时在 reach 半径内用 8 档 smoothstep 径向渐变把实心填充擦成透明，再把虚线轮廓按同一渐变裁剪回镜头内，过渡柔和度由 softness 决定（1−softness 为内圈全变比例），整体浓度以 0.16s 时间常数随指针进出淡入淡出，拖拽时不擦除；reveal="letter" 时只有命中字母的轮廓以 0.09s 时间常数淡入，其余保持实心；"off" 全实心。命中判定：指针 y 在字标上缘−24px 到下缘+24px 之间，取到字母盒水平距离小于 28px 的最近字母。
- 选中框滑行：selection 开启时框以 0.08s 时间常数连续滑向目标字母（拖动中的字母为 0.02s），整框透明度以 0.1s 时间常数淡入淡出；intro="type" 时框压住打字光标字母。
- 拖拽：draggable 开启时在字母上按下即开始拖拽并捕获指针，位移以 0.03s 时间常数跟手；松手后弹簧回位——刚度 320，阻尼 = 2×√320×(1−bounce×0.96)，bounce 从 0 到 1 由无过冲到大幅震荡。字母离位超过 1px 时原地留下虚线轮廓残影，透明度 min(1, 位移÷24)×0.55，回位即消失。
- 点击冲击波：按下抬起间隔小于 450ms、位移小于 6px、clickKick 开启且非减少动态时触发；被点字母瞬间获得向上速度（实际字号×11），第 d 级邻居延迟 d×0.055s、强度乘 0.62^d（低于 30 截止），一串字母依次弹起并在运动中各自露出轮廓。
- 入场动画（intro，进入视口且字体就绪后播一次，前置 0.15s，时长 max(0.3, introDuration) 秒）：type 逐字落位，光标步进 0.86÷字母数，光标处字母在 0.3×步长内浮现并显虚线轮廓、光标推进后转回实心，进度 0.93 后光标消失；assemble 把每个字母的填充像素按透明度采样切成 max(3, 字号÷26)px 方格，格子按随机方向从最远 0.85 倍字号外飞入，水平随字母在字标中的位置错峰，单格缓动 1−(1−u)^4、尺寸 0.4→1、落定部分裁切贴回真实填充；metrics 先让度量线逐条生长（每条错开 0.04，收尾前 0.84–1 淡出），字母先显轮廓，填充按 x 高度→大写高度→上缘→下降部四个区带错峰灌注（上三带自下缘向上生长，下降部带自基线向下），每字母按水平位置再错开 0.28 收尾。
- 空闲巡游（sweep）：指针离开、无拖拽、非入场、非减少动态时，镜头点沿 x = 左+宽×(0.5−0.5×cos(t×0.45))、y = 上+高×(0.45+0.1×sin(t×0.8)) 的轨道巡游，时钟按 speed 倍速推进，跟随时间常数放宽到 0.22s，途经字母照常轮廓化。
- guides 常显：开启后在有命中或 area 镜头活跃时以 0.14s 时间常数淡入，绘制透明度乘 0.6。
- 光标反馈：拖拽 grabbing，悬停字母且可拖 grab，仅可点击时 pointer，由组件直接写容器 style.cursor。
- 休眠与唤醒：无交互且弹簧、透明度、入场、冲击队列全部落定后停帧；ResizeObserver、window resize、IntersectionObserver（离屏停帧）、html/body 的 class/style/data-theme 变化、prefers-color-scheme 切换、字体加载完成都会唤醒重排。props 每次渲染同步进设置 ref，下一帧生效，不重挂载。
- `prefers-reduced-motion`：巡游、入场动画与点击冲击波全部关闭，area 擦除不生效；拖拽与弹簧回位等直接操作保留，最终状态完整可见。
- 无障碍：根节点 role="img"、aria-label 为完整字标，整体按一张图朗读；无键盘交互，全部交互是指针直接操作。

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| text | string | "Solen" | 要渲染的字标 |
| fontFamily | string | "" | 字体族；留空继承容器字体 |
| fontWeight | number | 600 | 字标字重 |
| fontSize | number | 150 | 最大字号（px），自动缩小适配窄容器 |
| letterSpacing | number | -0.05 | 字距（em） |
| align | "left" \| "center" \| "right" | "center" | 水平对齐 |
| color | string | "currentColor" | 字母与轮廓颜色 |
| accentColor | string | "currentColor" | 选中框 / 标注 / 碎屑颜色 |
| reveal | "area" \| "letter" \| "off" | "letter" | 轮廓化方式 |
| reach | number | 200 | 轮廓化半径（px） |
| softness | number | 0.7 | 过渡柔和度（0 硬边） |
| dashLength | number | 4 | 虚线段长（px） |
| dashGap | number | 2 | 虚线间隔（px） |
| lineStyle | "dashed" \| "solid" | "dashed" | 轮廓线型 |
| strokeWidth | number | 1.5 | 描边粗细（px） |
| specks | number | 15 | 像素碎屑数量，0 关闭 |
| selection | boolean | true | 选中框 |
| labels | boolean | true | 框上标注 |
| draggable | boolean | true | 字母可拖拽 |
| bounce | number | 0.4 | 回弹过冲量（0–1） |
| clickKick | boolean | true | 点击弹跳涟漪 |
| intro | "none" \| "type" \| "assemble" \| "metrics" | "none" | 入场动画 |
| introDuration | number | 2 | 入场时长（秒） |
| guides | boolean | false | 字体度量标线 |
| sweep | boolean | true | 空闲自动巡游 |
| speed | number | 1 | 巡游速度倍率 |
| className | string | "" | 容器附加类名 |
| style | CSSProperties | — | 容器内联样式 |

## 独立实现与六框架交付

- 仅凭本文从零生成可运行的实现。尺寸、颜色、文案、图形和运动算法均以上述文字为准；所有绘制由 Canvas 2D 与 CSS 完成，不加载远程图片、字体、视频或素材。
- 当前交付重点为 React，组件名称 TechText。从零创建四个文件：TechText.tsx、TechTextEngine.js、motion-runtime.ts、TechTextEngine.d.ts；分别实现框架入口、完整交互核心、实例生命周期和类型声明。文件名是需要生成的产物，不假定接收者已经拥有任何文件。
- 同时提供 React、Vue、Svelte、Solid、Preact、Vanilla 原生生命周期入口，共享框架无关核心。DOM 仅在挂载后访问，支持同页多实例；更新时保持状态，销毁时清理动画帧、计时器、观察器及监听器并还原容器光标。不要用 iframe 代替组件实现。
- 依赖安装说明：npm install react react-dom，无需其他运行时依赖。若使用依赖，只使用其公开 API；布局、测量、绘制与运动算法必须在本次生成的文件中完整实现，不引用现成效果组件。
- 组件铺满使用方给定的容器，无尺寸参数；options.reducedMotion 覆盖系统偏好；减少动态效果仍保留完整交互状态。
- 给出每个文件的完整内容、安装和运行步骤、以下使用示例所需的全部实现。不得留省略号、待补素材或"自行补齐核心"的占位。
- 验收：375 / 768 / 1440px 无横向溢出；指针轮廓化、选中框滑行与标注、拖拽弹回、点击涟漪、空闲巡游与四种入场都正确；props 更新不重挂载、下一帧生效；浅色深色页面下随文字色正确；多实例互不干扰，卸载后停止所有任务。

## 使用示例

```tsx
import { TechText } from "./TechText";

export default function App() {
  return <TechText />;
}
```
