# 推入导航栈 — PushNavigationStack

一部 300×500 的手机机身：屏幕里是一套设置项的层级导航。最外层是「Settings」列表，四行设置（General、Notifications、Privacy、Battery）各带一枚彩色圆角图标片；点任意一行，新一层从右侧滑入占据全屏，下层列表向左退到 -30% 并压暗 12%；再点一次会钻到更深一层——每一层再往里是三行子选项，其中一行还能继续展开成三选一的单选列表。每层左上角有一个带上一级标题文字的返回按钮，也可以从屏幕左缘 18px 宽的窄条往右拖拽，把当前层甩回上一层。

## 布局与材质

- 手机机身 300×500px，圆角 36px，溢出裁切；外圈 6px 实色边框 #22232E，下方 0 30px 60px -36px var(--ux-shadow-strong) 投影（浅色 rgba(40,30,80,.3)，深色 rgba(0,0,0,.72)）；机身底色取 var(--ux-surface-2)（浅色 #F5F3EF，深色 #1A1B25），屏幕内容底色同样是 var(--ux-surface-2)。
- 场景根用 light-dark() 声明整套 --ux-* 令牌，跟随所在页面的 color-scheme 在浅色/深色间切换：--ux-surface #FFFFFF/#13141C、--ux-surface-2 #F5F3EF/#1A1B25、--ux-surface-3 #EAE7E1/#252632、--ux-ink #16151B/#F4F0E8、--ux-ink-2 #57535F/rgba(244,240,232,.68)、--ux-ink-3 #8E8A97/rgba(244,240,232,.42)、--ux-line rgba(22,21,27,.09)/rgba(255,255,255,.08)、--ux-line-2 rgba(22,21,27,.17)/rgba(255,255,255,.16)、--ux-accent #6A57F2/#B7A4FF、--ux-accent-2 #2F8FE0/#7DB4FF、--ux-accent-soft rgba(106,87,242,.12)/rgba(183,164,255,.15)、--ux-accent-ink #FFFFFF/#0B0C12、--ux-mint #119C72/#7EE8C0、--ux-warn #D6731E/#FFB26B、--ux-danger #D93A55/#FF7D8C、--ux-glass rgba(255,255,255,.58)/rgba(255,255,255,.07)、--ux-glass-line rgba(255,255,255,.85)/rgba(255,255,255,.18)、--ux-shadow rgba(40,30,80,.14)/rgba(0,0,0,.45)、--ux-shadow-strong、--ux-grad linear-gradient(120deg,#7B61FF,#3D8BFF 55%,#1FB89A)/linear-gradient(120deg,#B7A4FF,#7DB4FF 55%,#A5F2D3)。
- 每一层是一个绝对定位铺满屏幕的 section，底色 var(--ux-surface-2)，带 0.5s 的 transform 过渡（cubic-bezier(.3,.9,.3,1)）与 0.5s 的 filter 过渡，will-change: transform；压暗用一层 ::after 覆盖，背景纯黑 #000，透明度由 --dim 控制（同样 0.5s 过渡）。拖拽进行中的两层临时加 .drag 类关掉过渡，让画面完全跟手。
- 顶栏高 52px，左右各 10px 内边距，flex 居中，字号 15px / 字重 800。顶栏左侧是返回按钮：绝对定位 left 6px、top 11px，高 30px，内边距 0 6px，无边框无底色，字号 15px / 字重 600，颜色 var(--ux-accent)；内含一枚 18×18 的描边箭头 SVG（viewBox 0 0 18 18，路径 M11 3 L5 9 l6 6，描边 currentColor、线宽 2.4、圆头圆角），后面跟上一级标题文字。顶栏中央是当前层标题，元素带 0.35s 透明度过渡；最外层没有返回按钮，标题位留空。
- 大标题是一块 h3：内边距 2px 18px 12px，字号 30px / 字重 880 / 字距 -0.04em，transform-origin 0 50%；文案就是该层标题。
- 列表组：外边距 0 14px，圆角 14px，底色 var(--ux-surface)（浅色 #FFFFFF，深色 #13141C），溢出裁切。每行是一个原生 button：flex 居中、行内间距 12px、宽 100% 高 48px、内边距 0 14px、无边框无底色、左对齐、字号 14.5px / 字重 600、文字色 var(--ux-ink)，行下有 1px var(--ux-line) 分隔线，末行无分隔线。
  - 四行一级菜单左端各有一枚 28×28、圆角 8px 的纯色图标片，颜色依次为 #868E96、#FA5252、#4C6EF5、#40C057。
  - 行尾是一枚 14×14 的描边箭头 SVG（viewBox 0 0 14 14，路径 M5 3 l4 4 -4 4），描边 var(--ux-ink-3)、线宽 2.2。
  - 子选项行的行尾是一段 13px 的次级文字（var(--ux-ink-3），斜体已去除），第一行写 "Always"，其余写 "On"。
  - 单选列表行的行尾是一枚 13px、字重 800、颜色 var(--ux-accent) 的对勾 ✓，未选中时 visibility 隐藏但仍占位。
- 左侧边缘条：绝对定位 left 0、top 52px、bottom 0、宽 18px，无边框无底色，z-index 9，touch-action none，光标 ew-resize；它是一条原生 button，aria-label "Drag from the edge to go back"。
- 场景挂在 Shadow DOM 宿主里：容器窄于 300px 时整景按 min(1, 容器宽 / 300) 等比缩小；options.height 只改变场景画布高度，手机机身仍固定 300×500——调高会在机身下方留白，调低会裁掉机身底部。

## 数据

- 一级菜单四项，顺序固定：General、Notifications、Privacy、Battery，对应图标片颜色 #868E96、#FA5252、#4C6EF5、#40C057。
- 任意一级项点开后进入的子选项三项，顺序固定：Show previews、Notification sound、Show badges。
- 再点子选项后展开的三选一列表，顺序固定：Always、잠금 해제했을 때、안 함。
- 最外层标题 "Settings"；每一层的顶栏标题与返回按钮文字都取该层标题。
- 其余元素（箭头图标、对勾、单选状态）由代码按位置生成，没有写死图标资源，也不请求网络。

## 操作和动效

- 推入：新建一层，先摆到 translateX(100%)，强制回流一次，再摆到 translateX(0)，靠 0.5s cubic-bezier(.3,.9,.3,1) 滑入；同时把下层摆到 translateX(-30%)、--dim 设为 0.12，下层因此左移并压暗 12%。
- 返回（点左上角返回按钮）：当前层滑到 translateX(100%) 退出，下层回到 translateX(0)、--dim 归 0，同样 0.5s 缓动；退出的层在 500ms 计时后从 DOM 移除。
- 边缘拖拽返回：在左缘 18px 窄条上按下指针即开始拖拽（层级不足两层时不启动），记录起点横坐标与机身宽度。按住期间两层都关掉过渡：当前层跟随手指横向移动（位移 = 拖拽比例 × 100%），下层从 -30% 同步回到 0%，压暗从 0.12 线性减到 0。松手时若拖拽比例超过 0.4 就按返回处理，否则两层弹回原位（当前层 0、下层 -30% 且压暗 0.12）。
- 拖拽比例 = (当前指针横坐标 - 起点横坐标) / 机身宽度，钳制在 0 到 1 之间。
- 单选列表：初始选中第一项（aria-pressed 为 true，对勾可见）。点某一项时，该项 aria-pressed 置 true、其余置 false，对勾移动到被点的那一项。
- 减少动态：媒体查询命中后，退出层的移除计时改为 0ms，同时运行时把宿主标记为减少动态，场景内所有过渡时长归零——推入与返回变为瞬时切换，交互流程不变。
- 无障碍：所有列表行、返回按钮与边缘条都是原生 button，可 Tab 聚焦并用 Enter/Space 激活；边缘条被键盘激活时（click 事件 detail 为 0）执行一次返回。边缘条的 aria-label 说明其用途。单选行用 aria-pressed 表达选中态，图标与箭头均为 SVG 并带 aria-hidden。

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| height | number | 500 | 场景高度，逻辑像素；窄容器整景按比例缩小 |
| reducedMotion | boolean | 跟随系统 | 覆盖系统的减少动态偏好 |

## 独立实现与六框架交付

- 仅凭本文从零生成可运行的实现。尺寸、颜色、文案、图形和运动算法均以上述文字为准；所有装饰用 CSS 与内联 SVG 绘制，不加载远程图片、字体、视频或素材。
- 当前交付重点为 React，组件名称 PushNavigationStack。从零创建四个文件：PushNavigationStack.tsx、PushNavigationStackEngine.js、motion-runtime.ts、PushNavigationStackEngine.d.ts；分别实现框架入口、完整交互核心、实例生命周期和类型声明。文件名是需要生成的产物，不假定接收者已经拥有任何文件。
- 同时提供 React、Vue、Svelte、Solid、Preact、Vanilla 原生生命周期入口，共享框架无关核心。DOM 仅在挂载后访问，支持同页多实例；更新时保持状态，销毁时清理动画、计时器、观察器及监听器。不要用 iframe 代替组件实现。
- 依赖安装说明：npm install react react-dom。若使用依赖，只使用其公开 API；组件的布局、样式、图形和算法必须在本次生成的文件中完整实现，不引用现成效果组件。
- 实现 options.height 以调整场景画布高度，options.reducedMotion 覆盖系统偏好；减少动态时推入与返回直接切换，导航层级逻辑不变。
- 给出每个文件的完整内容、安装和运行步骤、以下使用示例所需的全部实现。不得留省略号、待补素材或“自行补齐核心”的占位。
- 验收：375 / 768 / 1440px 无横向溢出；点列表推入、点返回键退出、左缘拖拽跟手与阈值判定都正确；浅色深色两套令牌正确；多实例互不干扰，卸载后停止所有任务。

## 使用示例

```tsx
import { PushNavigationStack } from "./PushNavigationStack";

export default function App() {
  return <PushNavigationStack />;
}
```
