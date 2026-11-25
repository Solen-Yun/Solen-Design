# 实时订单表格 — LiveOrdersTable

制作「实时订单表格」卡片：一张 340×340 的数据看板场景。顶部是带红色呼吸圆点的 "Live orders" 标题与一枚 Pause 胶囊按钮，下方圆角表格里滚动着实时订单：新订单每隔 2.3 秒从表格顶部滑入并带一次 accent 辉光，其余行以 transform 过渡顺次下滑；点 Time 或 Amount 表头按该列升/降排序，行位平滑飞换；暂停期间新订单入队、按钮变 Resume 并亮出排队计数，恢复后逐条补入。

## 布局与材质

- 340×340px 场景卡，圆角 30px，溢出裁切。底色为表面色，外圈 1px 线色描边，下方 0 30px 60px -36px 强阴影。窄容器时整景按 min(1, 可用宽/340) 等比缩放、高度同步压缩；更宽的容器里卡片水平居中。
- 头部绝对定位在左 18px、右 14px、上 16px，横向排列、间距 8px。左侧标题 "Live orders" 14.5px/字重 900，行首一枚 8px 的 #E11D48 圆点，外圈 3px 同色 25% 透明光环，以 1.4s ease-in-out 循环呼吸（50% 处透明度降到 0.35）；暂停时圆点换成三级墨色静态、无光环。右侧 Pause 按钮：高 28px、内边距 0 10px 的胶囊，背景 surface-2、内描边 1px 线色、文字 10.5px/800 次级墨色；按钮内末尾有一枚徽标（accent 实底、白字 9.5px/900、内边距 1px 6px、圆角 999px），文本为空时整体隐藏，仅暂停且有排队订单时显示 "New orders: N"。
- 表格容器绝对定位 left 10px、right 10px、top 56px、bottom 10px，圆角 16px，背景 surface-2，溢出裁切。表头行高 32px、下缘 1px 线色分隔线，文字 10px/850 三级墨色；网格三列 1.25fr / 0.9fr / 1fr，左右内边距 12px，列名依次 Time、Amount、Status。
- Time 与 Amount 列头是原生按钮，内含 9×9 的下拉箭头 SVG（路径 M2 3.5l2.5 2.5L7 3.5，描边 1.6px）。箭头默认 35% 透明度；descending 时不透明、ascending 时再旋转 180°，旋转过渡 0.35s cubic-bezier(.3,1.6,.5,1)、透明度过渡 0.2s。列头聚焦时 2px accent 外圈、偏移 2px、圆角 4px。
- 订单行绝对定位、高 42px、下缘 1px 线色分隔线；位移用 0.45s cubic-bezier(.3,1.1,.4,1) 的 transform 过渡，透明度过渡 0.35s；整行 11px/700。第一列纵向放客户名（11.5px/850 单行省略）与相对时间（9.5px/700 三级墨色、tabular-nums）；第二列金额 900 字重、tabular-nums；第三列状态 10px/800，行首一枚 6px 圆点，颜色由行内 --c 变量注入。
- 场景令牌含浅色与深色两套（light-dark() 配合 prefers-color-scheme: dark 切换）：浅色下表面 #FFFFFF、surface-2 #F5F3EF、墨色 #16151B、次级墨 #57535F、三级墨 #8E8A97、线 rgba(22,21,27,.09)、accent #6A57F2；深色下表面 #13141C、surface-2 #1A1B25、墨色 #F4F0E8、线 rgba(255,255,255,.08)、accent #B7A4FF。字体栈继承页面（font:inherit），数字统一 tabular-nums。

## 数据

- 无写死的订单表：订单由运行时生成——客户名按序号循环取自固定 8 人名单 Seoyeon K.、Junho L.、Haeun P.、Minjun C.、Yuna J.、Jiho H.、Jia Y.、Taemin O.；金额为 12–242 的随机整数（Math.round(12 + Math.random()×230)），以 "$" 加千分位英文格式显示；状态随机取 Paid（#10B981）、Packing（#0EA5E9）、Reviewing（#F59E0B）之一，同一色值同时用于状态圆点与状态文字。
- 初始 5 行在挂载时立即生成，时间戳分别回拨 7/14/21/28/35 秒，直接落位、不带辉光。相对时间 3 秒内显示 "now"，之后显示 "Ns ago"，并在每次重排时刷新。
- 列头固定为 Time、Amount、Status；表格没有 Order ID 列，首列内容是客户名加相对时间。

## 操作和动效

- 自动插入：可见时每 2300ms 生成并插入一条新订单（减少动态时 5000ms）。默认按 Time 降序（最新在上），新行先摆到 -42px 处滑入并播放一次 1.4s ease 的辉光（背景从 accent 22% 透明渐回透明），旧行顺次下滑；当排序不是 Time 降序时，新行改从底部（252px 处）滑入。
- 排序：点 Time/Amount 表头按该列排序，首次点击为降序，再点同列反转方向；排序键 Time 用创建时间戳、Amount 用金额，同值订单按序号新者优先；行按新次序以 transform 过渡飞到 translateY(行号×42px) 的新位置，列头 aria-sort 同步刷新；排在可见区（6 行）之外的行透明度归 0，DOM 内最多保留 8 行，多余行延迟 450ms 移除。
- 暂停/恢复：点 Pause 暂停生成，标题红点停住；期间新订单进入队列，按钮文字变 Resume、徽标显示 "New orders: N"；点 Resume 后队列以 90ms 间隔逐条补入（减少动态时 0ms 间隔，立即齐发）。
- 离屏省流：IntersectionObserver 监听可见性，不可见时不生成新订单，重新可见后继续。
- 无障碍：表格容器 role="table"，表头行 role="row"，排序列头 role="columnheader" 并以 aria-sort="ascending"/"descending"/"none" 标注方向（Status 列头为普通文本），行 role="row"，单元格 role="cell"；标题圆点与箭头图标 aria-hidden；Pause 为原生按钮，键盘可聚焦触发。
- prefers-reduced-motion 下：行位移与透明度过渡、辉光动画、红点呼吸全部关闭，新行直接就位；插入周期放宽到 5000ms。
- options.height 调整场景高度（默认 340），options.reducedMotion 覆盖系统偏好。支持同页多实例；卸载时停止生成循环，清理计时器与观察器。

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| height | number | 340 | 场景高度，逻辑像素；窄容器整景按比例缩小 |
| reducedMotion | boolean | 跟随系统 | 覆盖系统的减少动态偏好 |

## 独立实现与六框架交付

- 仅凭本文从零生成可运行的实现。尺寸、颜色、数据规则与运动参数均以上述文字为准；所有装饰用 CSS 绘制，不加载远程图片、字体、视频或素材。
- 当前交付重点为 React，组件名称 LiveOrdersTable。从零创建四个文件：LiveOrdersTable.tsx、LiveOrdersTableEngine.js、motion-runtime.ts、LiveOrdersTableEngine.d.ts；分别实现框架入口、完整交互核心、实例生命周期和类型声明。文件名是需要生成的产物，不假定接收者已经拥有任何文件。
- 同时提供 React、Vue、Svelte、Solid、Preact、Vanilla 原生生命周期入口，共享框架无关核心。DOM 仅在挂载后访问，支持同页多实例；更新时保持状态，销毁时清理动画、计时器、观察器及监听器。不要用 iframe 代替组件实现。
- 依赖安装说明：npm install react react-dom。若使用依赖，只使用其公开 API；组件的布局、样式与算法必须在本次生成的文件中完整实现，不引用现成效果组件。
- 实现 options.height 以调整场景高度，options.reducedMotion 覆盖系统偏好；减少动态时行直接就位、无辉光、无红点呼吸。
- 给出每个文件的完整内容、安装和运行步骤、以下使用示例所需的全部实现。不得留省略号、待补素材或"自行补齐核心"的占位。
- 验收：375 / 768 / 1440px 无横向溢出；新行滑入发光、排序飞换、暂停补单与 "New orders: N" 徽标正确；浅色深色两套令牌正确；多实例互不干扰，卸载后停止所有任务。

## 使用示例

```tsx
import { LiveOrdersTable } from "./LiveOrdersTable";

export default function App() {
  return <LiveOrdersTable />;
}
```
