# 手绘批注 — HandAnnotations

一张 340×300 的季度计划备忘卡：上方一行小标题，下面一句 20px 的目标句，其中三个关键词（double、sign-up rate、churn）用更重的字重标出；底栏是四个并排的批注样式按钮——Underline / Circle / Box / Strike，选中哪个，就用红马克笔般的内联 SVG 笔迹给全部三个关键词上批注。每一笔都画两遍：主笔画 2.4 粗，第二遍用 1.6 粗、70% 不透明度再叠一层带随机抖动的细线，看起来像手绘重复描过。换样式时旧笔迹先被"擦掉"（沿线重画回去），擦净了再落新笔迹。

## 布局与材质

- 场景固定 340×300px，`responsive: false`，没有断点；容器窄于 340px 时整景按 `scale = min(1, 可用宽度 / 340)` 等比缩小，frame 宽度取 `max(340, 可用宽度)`。`options.height` 只改 surface 外框高度（写入 `--motion-height`），卡片本体仍为 300px。
- 卡片根 `.u392`：position relative，宽 340px、高 300px，纵向 flex，内边距 22px 22px 16px，圆角 28px，背景 `var(--ux-surface)`，外圈 1px `var(--ux-line)` 描边加 `0 30px 60px -36px var(--ux-shadow-strong)` 阴影，overflow hidden。
- 小标题 `.u392-k`：margin 0，字号 12px，字重 750，颜色 `var(--ux-ink-3)`，文案 `Quarter plan memo`。
- 正文盒 `.u392-bx`：position relative，margin-top 14px。
- 句子 `.u392-p`：position relative、z-index 1，margin 0，字号 20px，行高 1.75，字重 700，字距 -0.03em，颜色 `var(--ux-ink)`；其中的 `<b>` 关键词字重 850。
- 笔迹层 `.u392-svg`：绝对定位 inset 0，宽高 100%，overflow visible，pointer-events none，z-index 2（压在文字之上）。所有 `path` 为 fill none、stroke `var(--ux-danger)`、stroke-width 2.4、stroke-linecap round、stroke-linejoin round；第二遍的 `path.b` 为 stroke-width 1.6、opacity .7。
- 底栏 `.u392-ft`：margin-top auto（推到卡片底部），grid 布局 4 列等宽，gap 4px，内边距 4px，圆角 14px，背景 `var(--ux-surface-2)`，`role="group"`、`aria-label="Mark style"`。
- 样式按钮 `.u392-ty`：高 34px，border 0，圆角 10px，背景 none，字号 12.5px、字重 700，颜色 `var(--ux-ink-3)`，过渡 `background-color .25s, color .25s`。选中态 `[aria-pressed="true"]` 背景 `var(--ux-surface)`、文字 `var(--ux-ink)`，加 `0 0 0 1px var(--ux-line)` 描边与 `0 4px 10px -6px var(--ux-shadow-strong)` 阴影。
- 场景令牌用 `light-dark()` 给浅色与深色两套：surface `#FFFFFF`/`#13141C`，surface-2 `#F5F3EF`/`#1A1B25`，surface-3 `#EAE7E1`/`#252632`，ink `#16151B`/`#F4F0E8`，ink-2 `#57535F`/`rgba(244,240,232,.68)`，ink-3 `#8E8A97`/`rgba(244,240,232,.42)`，line `rgba(22,21,27,.09)`/`rgba(255,255,255,.08)`，line-2 `rgba(22,21,27,.17)`/`rgba(255,255,255,.16)`，accent `#6A57F2`/`#B7A4FF`，accent-2 `#2F8FE0`/`#7DB4FF`，accent-soft `rgba(106,87,242,.12)`/`rgba(183,164,255,.15)`，accent-ink `#FFFFFF`/`#0B0C12`，mint `#119C72`/`#7EE8C0`，warn `#D6731E`/`#FFB26B`，danger `#D93A55`/`#FF7D8C`，glass `rgba(255,255,255,.58)`/`rgba(255,255,255,.07)`，glass-line `rgba(255,255,255,.85)`/`rgba(255,255,255,.18)`，shadow `rgba(40,30,80,.14)`/`rgba(0,0,0,.45)`，shadow-strong `rgba(40,30,80,.3)`/`rgba(0,0,0,.72)`，渐变 `linear-gradient(120deg,#7B61FF,#3D8BFF 55%,#1FB89A)` / `linear-gradient(120deg,#B7A4FF,#7DB4FF 55%,#A5F2D3)`。
- 字体：整体继承宿主页面字体栈。

## 数据

- 句子写死在 markup 里：`This quarter we want to <b>double</b> the <b>sign-up rate</b> and cut first-week <b>churn</b> in half.` 三个加粗关键词依次是 double、sign-up rate、churn，批注只画在这三个 `<b>` 上。
- 四个按钮写死：Underline、Circle、Box、Strike，默认选中 Underline（`aria-pressed="true"`）。
- 笔迹形状由代码现算：随机抖动函数 `j(n)` 在 [-n, n] 之间取随机值；每条笔迹都由关键词的实际排版矩形推导，所以换字体或换行时笔迹仍贴着词。
- 没有外部数据源。

## 操作和动效

- 选样式：点击某个样式按钮即把它设为当前样式（其余按钮的 `aria-pressed` 置 false），并触发一次重绘——同一种样式可以重复点击，每次都重新走一遍「擦旧 → 画新」。
- 关键词矩形 `rectOf(b)`：取 `<b>` 的第一个 client rect，用正文盒的 offsetWidth 与 getBoundingClientRect().width 之比把被 surface 缩放的坐标换算回本地像素，得到 `{x, y, w, h}`；y 额外下移 4px、h 减去 8px，让笔迹略微内缩在词的上下沿之内。
- 四种笔迹的画法：
  - Underline：一条二次贝塞尔，从词左下 (x−2, y+h−1) 起笔，控制点落在 (x+w/2, y+h+3s)，收在 (x+w+3, y+h−2) 附近，s 在第二遍时放大到 1.6，曲线因此更弯。
  - Strike：一条横穿词腰的二次贝塞尔，从 (x−3, y+h×0.55) 起笔，控制点 (x+w/2, y+h×0.45)，收在 (x+w+3, y+h×0.52)，同样带随机抖动。
  - Box：五个顶点连成的多边形——左上、右上、右下、左下、再回左上，每个顶点各带 ±1.5px 的随机偏移，描成略微歪斜的手绘方框。
  - Circle：以词中心为心、长短轴分别为 w/2+9 与 h/2+5 的椭圆轨迹，起始角 −2.2 弧度并带 ±0.3 的抖动，沿 27 个点走完 2π+0.6 弧度（比整圈多 0.6 弧度，形成收笔交叠），每个点的半径再乘一个随抖动与序号递增的系数（1 + 抖动 + 序号×0.004×s），轮廓因此微微起伏。
- 每个词画两遍：第一遍是主笔画（2.4 宽），第二遍是 1.6 宽、70% 不透明的复描（class `b`），抖动幅度按 1.6 倍放大，看起来像手绘重复描过。
- 描线方式：每条 path 先用 `getTotalLength()` 取全长，设 `stroke-dasharray` 为「全长 全长」，再把 `strokeDashoffset` 从全长动画到 0，笔画就沿线生长出来。时长 `380 + 全长×1.4` 毫秒，缓动 `cubic-bezier(.55,.1,.35,1)`，fill both；第 k 个词的第一遍延迟 k×420 毫秒，第二遍再延后 200 毫秒，所以三个词错峰落笔。
- 擦除：切样式时，旧的每条 path 从 0 描回全长（strokeDashoffset 0 → 全长），时长 260 毫秒，延迟 0；全部旧笔迹擦完后清空画布再画新的。旧笔迹的擦除回调会检查本次绘制的编号是否仍是最新，避免快速连点时互相打架。
- 初始化：挂载后第一帧自动以 Underline 样式给三个关键词画一遍批注。
- 没有自动播放与循环。
- `prefers-reduced-motion`（或 `options.reducedMotion` 为真）：宿主属性 `data-reduced-motion="true"` 把所有 transition-duration 归零；同时引擎不做描线动画，直接把 strokeDashoffset 置为终点（笔画立即完整出现），擦除也立即完成。该判定在挂载时读取一次。
- 无障碍：底栏是 `role="group"`、`aria-label="Mark style"`，四个按钮是原生 button，用 `aria-pressed` 表示当前选中的样式；笔迹层 SVG 整体 aria-hidden；句子里的 `<b>` 只是加粗，不是语义标记。组件没有自定义 `:focus-visible` 样式，键盘焦点沿用浏览器默认焦点环。

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| height | number | 300 | 场景高度，逻辑像素；窄容器整景按比例缩小 |
| reducedMotion | boolean | 跟随系统 | 覆盖系统的减少动态偏好 |

## 独立实现与六框架交付

- 仅凭本文从零生成可运行的实现。尺寸、颜色、数据、文案、图形和运动算法均以上述文字为准；批注用内联 SVG path 绘制，不加载远程图片、字体、视频或素材。
- 当前交付重点为 React，组件名称 HandAnnotations。从零创建四个文件：HandAnnotations.tsx、HandAnnotationsEngine.js、motion-runtime.ts、HandAnnotationsEngine.d.ts；分别实现框架入口、完整交互核心、实例生命周期和类型声明。文件名是需要生成的产物，不假定接收者已经拥有任何文件。
- 同时提供 React、Vue、Svelte、Solid、Preact、Vanilla 原生生命周期入口，共享框架无关核心。DOM 仅在挂载后访问，支持同页多实例；更新时保持状态，销毁时清理动画、计时器、观察器及监听器。不要用 iframe 代替组件实现。
- 依赖安装说明：npm install react react-dom。若使用依赖，只使用其公开 API；组件的布局、样式、图形和算法必须在本次生成的文件中完整实现，不引用现成效果组件。
- 实现 options.height 以调整场景高度，options.reducedMotion 覆盖系统偏好；减少动态效果仍保留完整句子的四种批注样式。
- 给出每个文件的完整内容、安装和运行步骤、以下使用示例所需的全部实现。不得留省略号、待补素材或“自行补齐核心”的占位。
- 验收：375 / 768 / 1440px 无横向溢出；四种笔迹形状正确且贴合关键词；切换样式先擦后画；浅色深色两套令牌正确；多实例互不干扰，卸载后停止所有任务。

## 使用示例

```tsx
import { HandAnnotations } from "./HandAnnotations";

export default function App() {
  return <HandAnnotations />;
}
```
