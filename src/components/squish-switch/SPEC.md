# 捏压开关 — SquishSwitch

制作「捏压开关」组件：一枚可以捏的开关。滑块被按住拖动时沿运动方向拉长、垂直方向收窄，面积保持不变，看起来像被搓软的一颗糖；松手后由弹簧把它送回轨道端点。轻点直接切换，拖过轨道中线会提前提交状态，拖拽中按 Esc 可以撤销这次拖动。受控与非受控两种用法都支持，鼠标、触屏与键盘都能操作。

## 布局与材质

- 根节点是 `<span class="squish-switch-root">`：`display: inline-flex`、`align-items: center`、`gap: 10px`，把开关和右侧标签并排放。样式表必须整体声明 `@layer sd.components { ... }`，把下面的规则收进这一层，免得压过宿主页面里同名的选择器。
- 开关本体是原生 `<button type="button" class="squish-switch">`：`position: relative`、`display: inline-block`，margin、padding、border 均为 0，`background: none`，`cursor: pointer`，`outline: none`，`touch-action: pan-y`，`user-select: none` 并关掉 `-webkit-tap-highlight-color` 的高亮。它带一个 `::after` 伪元素，`inset: -8px`，把命中区向外扩 8px，小尺寸开关也容易点中。
- 轨道是按钮内的 `<span class="squish-switch__track">`：`position: relative`、`display: block`，宽高取 `--ss-w` / `--ss-h`，圆角取 `--ss-r`，底色 `--ss-track`，`transition: background-color var(--ss-fade) ease`。按钮带 `data-on` 时底色换成 `--ss-track-on`。
- 滑块是轨道内的 `<span class="squish-switch__thumb">`：`position: absolute`、`top: var(--ss-inset)`、`left: 0`，宽高取 `--ss-thumb`，圆角取 `--ss-thumb-r`，底色 `--ss-thumb-color`，同样有 `transition: background-color var(--ss-fade) ease`；按钮带 `data-on` 时换成 `--ss-thumb-on`。滑块是纯装饰，`aria-hidden="true"`，位移与形变由脚本每帧写入它的 transform。
- 几何由尺寸推出来：内缩 `inset = max(3, round(height × 0.11))`，滑块边长 `thumb = height − inset × 2`，可移动区间是 `inset` 到 `width − inset − thumb`，中线取区间中点；轨道圆角 `min(radius, height / 2)`，滑块圆角 `max(2, 轨道圆角 − inset)`。默认 76×38、radius 19 时得到内缩 4px、滑块 30×30、轨道圆角 19px、滑块圆角 15px、行程 4px 到 42px、中线 23px。
- 颜色变量写在按钮的内联 style 上：`--ss-track` 关态轨道色（默认 #27272a）、`--ss-track-on` 开态轨道色（默认 #f5f5f5）、`--ss-thumb-color` 关态滑块色（留空时按 `color-mix(in srgb, 开态轨道色 19%, 关态轨道色)` 自动混色，默认值算出来是 #4e4e51）、`--ss-thumb-on` 开态滑块色（留空时直接用关态轨道色，默认 #27272a）、`--ss-fade` 换色时长（默认 320ms）。轨道与滑块各有一个静态兜底值，写在样式表的变量声明里。
- 禁用态：按钮写 `aria-disabled="true"`，样式为 `cursor: not-allowed` 与 `opacity: 0.5`；此时不响应按下、悬停与点击。
- 拖动中按钮带 `data-held`，光标变为 `grabbing`；普通状态是 `pointer`。
- 标签是 `<label class="squish-switch__label">`，通过 `for` 指向开关按钮的 id，`cursor: pointer`、`user-select: none`。没有 `label` 时整个组件只剩按钮；此时用 `ariaLabel` 给它可访问名称。按钮 id 取 `id` 属性，没有则由框架的 `useId` 生成，保证同一页多个实例的 id 不冲突。
- 组件不声明 `font-family`，标签的字体继承宿主页。
- 没有断点级布局变化：开关与标签始终横排并居中对齐，容器变窄时整体等比留在原位。

## 数据

- 无写死数据。组件内没有写死的文案、数值、图标或配色清单，所有颜色与几何都由传入的 prop 推导。
- 轨道上的开态/关态语义完全由 `checked`（或非受控的内部状态）决定，不含任何预设的默认文案。

## 操作和动效

- 轻点：按下与抬起之间位移不超过阈值（鼠标 4px、触屏 8px）时视为轻点，状态取反并回调 `onChange(next)`。轻点后浏览器还会补发一次 click，实现用一个「跳过本次 click」的标记在紧随其后的 0ms 定时器里复位，避免切换两次。
- 拖动：按下时记下指针位置与按下瞬间的状态，并捕获指针。第一次移动只记录「指针相对滑块中心的偏移」；之后一旦水平位移超过阈值就判定为拖动，滑块位置按 `clamp(指针位置 − 偏移, 行程下限, 行程上限)` 逐帧写入，滑过中线（位置 > 中线）时立刻提交状态并回调 `onChange`，拖回中线另一侧再提交回来。
- 松手：若滑块被拖动过，滑块按当前速度冲一段再由弹簧送回行程端点；若是被判定的轻点，则直接取反。抬起时的点击若带 `pointercancel`（系统中断），状态回到按下瞬间的值。
- 拖动中按 Esc：取消这次拖动，状态回到按下瞬间的值，滑块弹回端点。
- 落定弹簧：位置由一个弹性动画值驱动，参数是 `stiffness = 170 − (50 − clamp(speed, 0, 100)) × 1.1`、`damping: 21.5`、`mass: 0.9`、静止判定 `restDelta: 0.001` / `restSpeed: 0.01`。也就是说 `speed` 越大刚度越低、落定越绵长，`speed` 越小刚度越高、越干脆；`speed` 取 50 时刚度正好 170。
- 速度形变：滑块的位移速度喂给一条弹簧（`stiffness: 320`、`damping: 40`、`mass: 0.6`），其值换算成拉伸倍率 `1 + min(0.4, |速度| / 600) × gain`，`gain` 取 `clamp(stretch, 0, 100) / 100`——拉伸量上限 40%，参考速度 600px/s。横向取该倍率、纵向取它的倒数，因此拉伸时面积守恒；滑动越快越扁越长，停住即回到正圆。
- 悬停胀大：鼠标移入且未禁用时，滑块按 `stiffness: 520`、`damping: 34`、`mass: 0.6` 的弹簧胀到 `hoverScale`（默认 1.035），移开弹回 1。触屏不触发悬停。
- 换色：轨道与滑块的底色用 `background-color` 的 CSS 过渡交叉淡入，时长由 `colorDuration` 控制（默认 320ms）。
- 键盘：按钮是原生 `button`，可 Tab 到达，回车或空格触发 click 走轻点路径完成切换；拖动中按 Esc 取消拖动。
- 无障碍：按钮带 `role="switch"` 与 `aria-checked`（随开关状态更新），禁用时写 `aria-disabled="true"`；`ariaLabel` 给出可访问名称，有可见标签时两者可并存但要保证不重复朗读。
- `prefers-reduced-motion: reduce` 下：滑块位置不再跑弹性动画，直接跳到目标端点；速度拉伸量整体归零，滑块不再变形；轨道与滑块的换色过渡时长压到 1ms。悬停胀大仍在，但幅度很小。
- 卸载时停止进行中的动画，撤掉指针捕获，不留遗留的定时器。

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| checked | boolean | undefined | 受控状态；不传则自持 |
| defaultChecked | boolean | false | 非受控初始状态 |
| onChange | (checked: boolean) => void | — | 轻点 / 拖过中线 / 键盘激活时回调 |
| label | string | "" | 开关旁标签 |
| disabled | boolean | false | 禁用 |
| trackColor | string | "#27272a" | 关态轨道色 |
| trackOnColor | string | "#f5f5f5" | 开态轨道色 |
| thumbColor | string | "" | 关态滑块色；留空自动混色 |
| thumbOnColor | string | "" | 开态滑块色；留空用关态轨道色 |
| width | number | 76 | 轨道宽度（px） |
| height | number | 38 | 轨道高度（px） |
| radius | number | 19 | 轨道圆角（px） |
| speed | number | 50 | 落定弹簧刚度（0–100） |
| stretch | number | 36 | 速度拉伸量（0–100） |
| hoverScale | number | 1.035 | 悬停胀大倍率 |
| colorDuration | number | 320 | 换色时长（ms） |
| ariaLabel | string | — | 无标签时的可访问名称 |
| className | string | "" | 根元素附加类名 |
| id | string | — | 开关按钮 id |

## 独立实现与六框架交付

- 仅凭本文从零生成可运行的实现。尺寸、颜色、文案和运动算法均以上述文字为准；装饰全部用 CSS 绘制，箭头一类的小图形用内联 SVG，不加载远程图片、字体、视频或素材。
- 当前交付重点为 React，组件名称 SquishSwitch。从零创建四个文件：SquishSwitch.tsx、SquishSwitchEngine.js、motion-runtime.ts、SquishSwitchEngine.d.ts；分别实现框架入口、完整交互核心、实例生命周期和类型声明。文件名是需要生成的产物，不假定接收者已经拥有任何文件。
- 同时提供 React、Vue、Svelte、Solid、Preact、Vanilla 原生生命周期入口，共享框架无关核心。DOM 仅在挂载后访问，支持同页多实例；更新时保持状态，销毁时清理动画、计时器、观察器及监听器。不要用 iframe 代替组件实现。
- 依赖安装说明：npm install react react-dom motion。若使用依赖，只使用其公开 API；组件的布局、样式、图形与算法必须在本次生成的文件中完整实现，不引用现成效果组件。
- 样式表按 `@layer sd.components` 包裹；每个实例的开关状态独立保存，多个开关同页时互不影响。
- 给出每个文件的完整内容、安装和运行步骤、以下使用示例所需的全部实现。不得留省略号、待补素材或"自行补齐核心"的占位。
- 验收：375 / 768 / 1440px 无横向溢出；轻点切换、拖动拉伸、拖过中线提前提交、Esc 取消、悬停胀大、禁用态各自正确；受控与非受控都可用；减少动态效果下不出现形变与长动画；多实例互不干扰，卸载后不再有动画。

## 使用示例

```tsx
import { SquishSwitch } from "./SquishSwitch";

export default function App() {
  return <SquishSwitch />;
}
```
