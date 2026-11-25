# 滚动收缩卡堆 — StickyStackCards

制作「滚动收缩卡堆」场景组件：一张 300×500 的可滚动叙事卡堆，顶部是标题 `How it works`，下面依次是 4 张全宽渐变特性卡，卡片用 `position: sticky` 吸附在滚动区顶部；每滚到一张新卡，它就盖在旧卡上方，而被压在下面的旧卡按堆叠深度等比缩小、并盖上一层黑色遮罩变暗，向后退成一张小卡片。滚到底部出现一枚 `Get started` 胶囊按钮。

## 布局与材质

- 场景 300×500px，圆角 30px，`overflow: hidden`，底色取 `--ux-surface-2`，盒子阴影为 `0 0 0 1px var(--ux-line)` 加 `0 30px 60px -36px var(--ux-shadow-strong)`。
- 场景令牌写在根层，浅色/深色两套由 `light-dark()` 切换：`--ux-surface` #FFFFFF / #13141C，`--ux-surface-2` #F5F3EF / #1A1B25，`--ux-surface-3` #EAE7E1 / #252632，`--ux-ink` #16151B / #F4F0E8，`--ux-ink-2` #57535F / rgba(244,240,232,.68)，`--ux-ink-3` #8E8A97 / rgba(244,240,232,.42)，`--ux-line` rgba(22,21,27,.09) / rgba(255,255,255,.08)，`--ux-line-2` rgba(22,21,27,.17) / rgba(255,255,255,.16)，`--ux-accent` #6A57F2 / #B7A4FF，`--ux-accent-2` #2F8FE0 / #7DB4FF，`--ux-accent-soft` rgba(106,87,242,.12) / rgba(183,164,255,.15)，`--ux-accent-ink` #FFFFFF / #0B0C12，`--ux-mint` #119C72 / #7EE8C0，`--ux-warn` #D6731E / #FFB26B，`--ux-danger` #D93A55 / #FF7D8C，`--ux-glass` rgba(255,255,255,.58) / rgba(255,255,255,.07)，`--ux-glass-line` rgba(255,255,255,.85) / rgba(255,255,255,.18)，`--ux-shadow` rgba(40,30,80,.14) / rgba(0,0,0,.45)，`--ux-shadow-strong` rgba(40,30,80,.3) / rgba(0,0,0,.72)，`--ux-grad` 为 120° 渐变（浅色 #7B61FF → #3D8BFF 55% → #1FB89A；深色 #B7A4FF → #7DB4FF 55% → #A5F2D3）。
- 滚动区 `.u223-sc`：`position: absolute; inset: 0`，`overflow-y: auto`，内边距 `22px 16px 30px`，隐藏滚动条（`scrollbar-width: none` 与 `::-webkit-scrollbar{display:none}`），`outline: none`；带 `tabindex="0"` 与 `aria-label="Features, scroll to browse"`，可用方向键/PageUp/PageDown 聚焦后原生滚动。
- 标题 `.u223-k`：`margin: 0 4px 14px`，22px、字重 880、字距 -0.04em，文本 `How it works`。
- 卡片 `.u223-c`：`position: sticky`，高 330px，下外边距 24px，内边距 20px，圆角 24px，文字色 #fff，`transform-origin: 50% 0`，`will-change: transform`，阴影 `0 -10px 30px -18px rgba(0,0,0,.35)`，内部为纵向 flex。第 i 张卡的 `top` 写死为 `14 + i × 12` 像素，即 14、26、38、50，越靠后的卡吸附位置越靠下，形成 12px 的层叠错位。
- 卡片内容：编号 `i` 为 `font: 800 12px/1 ui-monospace, SFMono-Regular, Menlo, monospace`、透明度 .7；标题 `b` 用 `margin-top: auto` 顶到卡片下部，26px、行高 1.15、字重 880、字距 -0.04em；说明 `p` 为 `margin: 8px 0 0`、14px、行高 1.5、透明度 .85。
- 卡面装饰 `.u223-art`：绝对定位 right 18px / top 18px，90×90px，圆角 26px，底色 rgba(255,255,255,.18)，`transform: rotate(12deg)`；伪元素 `::after` 为 inset 22px 的圆形，底色 rgba(255,255,255,.35)。
- 变暗遮罩 `.u223-sh`：绝对定位 inset 0，圆角继承卡片，底色 #000，初始透明度 0，`pointer-events: none`；它始终在卡片内容之上，只靠透明度显影。
- 卡片背景为 4 组写死的 150° 渐变，依次是 `linear-gradient(150deg,#7048E8,#4C6EF5)`、`linear-gradient(150deg,#F76707,#F59F00)`、`linear-gradient(150deg,#0CA678,#15AABF)`、`linear-gradient(150deg,#E64980,#BE4BDB)`。
- 收尾区 `.u223-end`：高 120px，`display: grid; place-items: center`；按钮高 44px、内边距 `0 22px`、无边框、圆角 999px、底色 `--ux-ink`、文字色 `--ux-page`、14px、字重 800，文本 `Get started`。
- 组件自身不声明 font-family，字体继承宿主；建议实现时使用 `"Pretendard Variable", Pretendard, -apple-system, BlinkMacSystemFont, "Apple SD Gothic Neo", "Segoe UI", Roboto, "Noto Sans KR", sans-serif`。
- 响应式：`createSurface` 的 `responsive` 为 false，场景固定 300×500 逻辑像素；容器窄于 300px 时整景等比缩放（`min(1, 容器宽 / 300)`），`options.height` 覆盖场景高度。

## 数据

- 写死 4 张卡片，每条是「编号 / 标题 / 说明」三元组：
  - `01` / `Plan in one place` / `Gather scattered notes and docs onto one board.`
  - `02` / `Refine together` / `Comments and versions stay in the same spot.`
  - `03` / `Share instantly` / `Show it beyond your team with a single link.`
  - `04` / `Check the numbers` / `Get a summary of the response every morning.`
- 写死文案：标题 `How it works`，滚动区无障碍名 `Features, scroll to browse`，收尾按钮 `Get started`。
- 写死的布局常量：卡高 330px、卡间距 24px、第 i 张卡的吸附偏移 `14 + i × 12`、缩放系数 0.06、遮罩最大透明度 0.18。
- 无接口数据、无随机数、无外部素材；卡片装饰全部由 CSS 画成。

## 操作和动效

- 触发方式：滚动区滚动。`scroll` 事件是 `passive` 的，只在当前没有待处理帧时用 `requestAnimationFrame` 排一帧重算，滚动停止后不再有循环。
- 每次重算的算法：取缩放系数 `k = 滚动区.offsetHeight / 滚动区.getBoundingClientRect().height`（未缩放时为 1）；每张卡的纵向位置 `pos[j] = (卡 j 的 top - 滚动区 top) × k`；对第 i 张卡，堆叠深度 `depth = Σ (j = i+1…3) clamp(1 - (pos[j] - (14 + j × 12)) / 330, 0, 1)`——即后面每张卡越接近自己的吸附线，贡献的深度越大，最大为 1。
- 结果映射：`transform: scale(1 - depth × 0.06)`（最深时缩到 0.94），遮罩透明度 `depth × 0.18`。缩放与变暗都由滚动位置直接算出，没有缓动曲线，滚回时反向恢复；卡片的 `transform` 不带 CSS 过渡，因此每帧即时生效。
- 初始状态：四张卡都还没到吸附线，`depth` 全为 0，全部保持原尺寸、无遮罩。
- 自动播放：组件本身不自动滚动，卡堆静止时无动画。
- `prefers-reduced-motion: reduce`（或 `options.reducedMotion` 为 true）时：运行时把该场景内的所有动画与过渡时长强制为 0，并在此之后不再派发滚动重算帧，因此卡片不再缩小变暗，始终停在初始的满尺寸状态；滚动本身仍然可用。
- 键盘操作：滚动区可 Tab 聚焦，聚焦后用方向键、PageUp/PageDown、Home/End 原生滚动；焦点环被 `outline: none` 去掉，只保留滚动行为。
- 无障碍：卡片是 `article` 语义元素；装饰方块与遮罩带 `aria-hidden="true"`；滚动区带 `aria-label`；收尾的 `Get started` 是原生按钮（无点击逻辑，仅作展示）。
- 销毁时释放帧回调、观察器与全部监听器；场景宽高随 `options.height`（默认 500）与容器宽度实时重算。

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| height | number | 500 | 场景高度，逻辑像素；窄容器整景按比例缩小 |
| reducedMotion | boolean | 跟随系统 | 覆盖系统的减少动态偏好 |

## 独立实现与六框架交付

- 仅凭本文从零生成可运行的实现。尺寸、颜色、数据与运动参数均以上述文字为准；界面用 DOM 与 CSS，不加载远程图片、字体、视频或素材。
- 当前交付重点为 React，组件名称 StickyStackCards。从零创建四个文件：StickyStackCards.tsx、StickyStackCardsEngine.js、motion-runtime.ts、StickyStackCardsEngine.d.ts；分别实现框架入口、完整交互核心、实例生命周期和类型声明。文件名是需要生成的产物，不假定接收者已经拥有任何文件。
- 同时提供 React、Vue、Svelte、Solid、Preact、Vanilla 原生生命周期入口，共享框架无关核心。DOM 仅在挂载后访问，支持同页多实例；更新时保持状态，销毁时清理动画、计时器、观察器及监听器。不要用 iframe 代替组件实现。
- 依赖安装说明：npm install react react-dom。组件的布局、样式与算法必须在本次生成的文件中完整实现，不引用现成效果组件。
- 实现 options.height 以调整场景高度（默认 500），options.reducedMotion 覆盖系统偏好；减少动态时仍保留完整的卡片内容、吸附位置与滚动能力。
- 给出每个文件的完整内容、安装和运行步骤、以下使用示例所需的全部实现。不得留省略号、待补素材或"自行补齐核心"的占位。
- 验收：375 / 768 / 1440px 无横向溢出；吸附、缩小与变暗随滚动可逆；浅色深色两套令牌正确；多实例互不干扰，卸载后停止所有任务。

## 使用示例

```tsx
import { StickyStackCards } from "./StickyStackCards";

export default function App() {
  return <StickyStackCards />;
}
```
