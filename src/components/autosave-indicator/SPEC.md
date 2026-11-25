# 云朵自动保存指示 — AutosaveIndicator

一张 340×330 的编辑器场景：顶部是标题输入框和一枚胶囊状的状态徽章，徽章里画着一朵云——保存中时云里三点上下跳动，存好后变成一枚打勾的线稿，等待更久就改写成「Saved 42s ago」；中间是一块大正文输入区，底部左边写着「All saved」，右边是一枚「Work offline」开关。打开开关后状态立刻变成「Saved on this device」，云上多了一道斜杠；关掉开关则先显示「Syncing」的一枚环形箭头，转一圈半后回到已保存。

## 布局与材质

- 场景逻辑尺寸 340×330，内边距 16px，圆角 28px，竖向 flex，溢出裁切。底色 var(--ux-surface)，外圈 1px var(--ux-line) 加 0 30px 60px -36px 强阴影（--ux-shadow-strong）。
- 头部一行横向 flex、居中对齐、间距 8px。标题是一个真实 input：flex 1、min-width 0、高 34px、无边框无底色、18px/字重 850/字距 -0.03em、文字色 var(--ux-ink)、outline none，初始值「Launch meeting」，aria-label="Title"。
- 状态徽章紧跟其后：横向 flex、居中对齐、间距 6px、高 30px、内边距 0 10px 0 6px、圆角 999px、底色 var(--ux-surface-2)、11.5px/750/var(--ux-ink-2)、不换行，底色与文字色各 .3s 过渡；role="status"。徽章里的图标是 24×20 的内联 SVG（overflow visible），内部叠了五段可分别显隐的笔画：云朵轮廓线、三颗小圆点、勾、斜杠、环形箭头。
  - 云轮廓路径描边 currentColor、线宽 1.7、圆角连接，无填充。
  - 三颗圆点半径 1.2、填充 currentColor，常态 opacity 0；保存中时 opacity 1 并各跑一条 0.9s ease-in-out 无限循环的 bob 动画，50% 处 translateY(-2.5px)，三颗的延迟依次是 0、.15s、.3s。
  - 勾线描边 var(--ux-mint)、线宽 2、dasharray 12、dashoffset 12，已保存态补间到 0（.35s，缓动 cubic-bezier(.22,1,.36,1)）。
  - 斜杠描边 var(--ux-warn)、线宽 2、dasharray 30、dashoffset 30，离线态补间到 0（.35s，同一缓动）。
  - 环形箭头描边 var(--ux-accent)、线宽 1.8，同步态 opacity 1 并跑 0.8s linear 无限旋转（transform-origin 落在自身 fill-box 中心）。
- 正文区是一个 textarea：flex 1、宽 100%、上边距 8px、内边距 12px、圆角 14px、底色 var(--ux-surface-2)、14.5px/行高 1.6、文字色 var(--ux-ink)、不可拉伸、outline none，聚焦时加 inset 0 0 0 2px var(--ux-accent) 的内描边。初始内容「Notes for next week’s launch meeting.」，aria-label="Body"。
- 底栏上边距 10px，两端对齐：左侧「All saved」12px/650/var(--ux-ink-3)；右侧是一枚真实 button「Work offline」，透明底、无边框、12.5px/700/var(--ux-ink-2)、内部间距 8px，后面跟一枚 36×22 的开关：圆角 999px、底色 var(--ux-surface-3)、.3s 过渡，白色圆钮 16×16 定位在 left 3 / top 3、带 0 1px 3px rgba(0,0,0,.25) 阴影、位移过渡 .4s cubic-bezier(.34,1.56,.64,1)；aria-pressed="true" 时轨道底色换成 var(--ux-warn)、圆钮向右 translateX(14px)。
- 场景令牌（--ux-*）有浅色与深色两套：表面 #FFFFFF/#13141C，次级表面 #F5F3EF/#1A1B25，三级表面 #EAE7E1/#252632，墨色 #16151B/#F4F0E8，次级墨色 #57535F/rgba(244,240,232,.68)，三级墨色 #8E8A97/rgba(244,240,232,.42)，线 rgba(22,21,27,.09)/rgba(255,255,255,.08) 与 rgba(22,21,27,.17)/rgba(255,255,255,.16)，accent #6A57F2/#B7A4FF，accent-2 #2F8FE0/#7DB4FF，mint #119C72/#7EE8C0，warn #D6731E/#FFB26B，danger #D93A55/#FF7D8C，阴影 rgba(40,30,80,.14)/rgba(0,0,0,.45)，强阴影 rgba(40,30,80,.3)/rgba(0,0,0,.72)。另有两支动效缓动：--ux-ease 为 cubic-bezier(.22,1,.36,1)，--ux-spring 为 cubic-bezier(.34,1.56,.64,1)。
- 组件不声明 font-family，沿用宿主页面默认字体族。逻辑宽度固定 340px，容器更窄时整景等比缩小；options.height 只改场景外壳高度，内部仍按固定逻辑尺寸绘制。

## 数据

- 标题初始值「Launch meeting」，正文初始值「Notes for next week’s launch meeting.」，底栏提示「All saved」，开关文字「Work offline」。
- 状态文案共五种：Saving、Saved just now、Saved Ns ago、Saved N min ago、Saved on this device、Syncing（其中 Saved 一族由时间推算，不是固定文案）。
- 无外部数据请求，所有文案与图标写死在组件内。

## 操作和动效

- 根节点上有一个 data-s 属性表示状态机，取值 saved / saving / local / sync，图标与徽章配色全部由它驱动。初始状态就是 saved，文字「Saved just now」，记录一次保存时刻。
- 在标题框或正文区输入：先清掉尚未触发的两个计时器，状态立刻切到 saving、文字「Saving」；停手 500ms 后再等 900ms（共 1.4s）才判定存好，把保存时刻记为当下并切到 saved、文字写成「Saved just now」。也就是说连续打字不会一直重置成保存中，而是最后一次输入之后统一走完整条时间线。
- 相对时间每秒刷新一次：距保存不足 10 秒写「Saved just now」，10 到 59 秒写「Saved Ns ago」，60 秒以上写「Saved N min ago」（分钟数向下取整）。刷新只发生在状态为 saved 时。
- 「Work offline」开关：按下后清掉计时器，状态切到 local、文字「Saved on this device」，云上出现一道橙色斜杠，徽章底色变成 warn 与透明混合 14% 的淡橙，文字也变成 warn 色；再按一次则状态切到 sync、文字「Syncing」，出现一枚 accent 色的环形箭头持续旋转，1300ms 后标记为已同步并切回 saved。
- 离线状态下继续输入不会进入 saving 流程，直接停留在 local 文案上。
- 减少动态偏好下（系统 prefers-reduced-motion 或 options.reducedMotion 为真）由共享运行时把容器内所有元素的 animation-duration 归零、animation-iteration-count 归 1、transition-duration 归零：三点仍会出现但停在原位不再跳动，勾线与斜杠一次性画出，同步箭头出现但不再旋转。状态切换、文案与计时完全照常。
- 无障碍：状态徽章是 role="status"，文字变化会被读屏播报；标题与正文分别带 aria-label="Title" 与 aria-label="Body"；离线开关是原生 button，用 aria-pressed 表达开关状态；焦点样式由浏览器默认焦点环给出（组件未自定义 focus-visible 规则）。
- 没有自动播放的动画循环；唯一常驻的定时器是每秒一次的文案刷新。

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| height | number | 330 | 场景高度，逻辑像素；窄容器整景按比例缩小 |
| reducedMotion | boolean | 跟随系统 | 覆盖系统的减少动态偏好 |

## 独立实现与六框架交付

- 仅凭本文从零生成可运行的实现。尺寸、颜色、文案、图形和运动算法均以上述文字为准；所有装饰用 CSS 与内联 SVG 绘制，不加载远程图片、字体、视频或素材。
- 当前交付重点为 React，组件名称 AutosaveIndicator。从零创建四个文件：AutosaveIndicator.tsx、AutosaveIndicatorEngine.js、motion-runtime.ts、AutosaveIndicatorEngine.d.ts；分别实现框架入口、完整交互核心、实例生命周期和类型声明。文件名是需要生成的产物，不假定接收者已经拥有任何文件。
- 同时提供 React、Vue、Svelte、Solid、Preact、Vanilla 原生生命周期入口，共享框架无关核心。DOM 仅在挂载后访问，支持同页多实例；更新时保持状态，销毁时清理动画、计时器、观察器及监听器。不要用 iframe 代替组件实现。
- 依赖安装说明：npm install react react-dom。若使用依赖，只使用其公开 API；组件的布局、样式、图形和算法必须在本次生成的文件中完整实现，不引用现成效果组件。
- 实现 options.height 以调整场景高度，options.reducedMotion 覆盖系统偏好；减少动态效果仍保留完整交互状态。
- 给出每个文件的完整内容、安装和运行步骤、以下使用示例所需的全部实现。不得留省略号、待补素材或"自行补齐核心"的占位。
- 验收：375 / 768 / 1440px 无横向溢出；输入后 saving→saved 的时间线正确、相对时间逐秒刷新、离线与回连两条分支正确；浅色深色两套令牌正确；多实例互不干扰，卸载后停止所有任务。

## 使用示例

```tsx
import { AutosaveIndicator } from "./AutosaveIndicator";

export default function App() {
  return <AutosaveIndicator />;
}
```
