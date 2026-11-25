# 长按消息预览 — LongPressPeek

制作「长按消息预览」：一张 300×500 的消息应用界面。顶部 "Messages" 标题加 "Edit"，下面是 6 行会话列表（彩色首字母圆头像、姓名、摘要、时间与未读蓝点）。按住任意会话行 480ms：该行缩到 0.95 倍微微下沉，整个列表被毛玻璃虚化，一张 268×204 的预览卡从被按行的位置和尺寸原地放大弹出，里面是这段对话的两条气泡和 Reply / Pin / Mark as read / Delete 四条快捷操作；按住不放、直接滑到某条操作上松手即执行。轻点会话行则整屏展开成完整对话页，可从返回键退回。

## 布局与材质

- 300×500px 场景，圆角 36px，溢出裁切。底色表面色（浅色 #FFFFFF、深色 #13141C），外圈 1px 线色描边（浅色 rgba(22,21,27,.09)、深色 rgba(255,255,255,.08)），下方 0 30px 60px -36px 强阴影。窄容器时整景按 transform:scale 等比缩小。
- 头部高 64px、内边距 0 18px 8px、底部对齐两端分布：标题 "Messages" 24px/字重 880、字距 -0.04em；右侧 "Edit" 13px/700、accent 色（浅色 #6A57F2、深色 #B7A4FF）。
- 会话列表左右内边距 8px。每行是一个 66px 高的原生按钮：水平 flex、间距 11px、内边距 0 10px、圆角 16px；悬停背景次级表面色（浅色 #F5F3EF、深色 #1A1B25）；按住时 scale(.95)（transform 过渡 0.45s cubic-bezier(.2,.8,.2,1)）；focus-visible 时 2px accent 外圈、内缩 2px。头像 44×44 圆、纯色底、白色首字母 16px/850；姓名 14px/800，置顶时名字旁出现 13×13 图钉描边图标（1.8px 圆头、三级墨色）；摘要 12.5px 次级墨色、单行省略；右侧时间列 11px 三级墨色，未读点 9px 圆、accent 实底（已读缩为 0，弹性过渡 cubic-bezier(.34,1.56,.64,1)）。
- 预览卡：绝对定位 left 16px、top 58px，268×204px、内边距 14px、圆角 22px、背景表面色、阴影 0 24px 50px -16px rgba(0,0,0,.45)，transform-origin 左上角。头部：32×32 头像（首字母 13px）+ 姓名 14px/850，底 1px 线色分隔；气泡列间距 7px、上距 12px，每条最大宽 80%、内边距 8px 11px、圆角 15px（收信气泡左下收成 5px、背景次级表面色；偶数序发信气泡右对齐、accent 底白字、右下收成 5px）、字号 12.5px/行高 1.35。
- 操作菜单：left 16px、top 274px、宽 210px、圆角 16px、背景表面色 92% 透明混合、阴影 0 18px 40px -14px rgba(0,0,0,.4)。四条操作各高 44px、内边距 0 14px、字号 13.5px/650，行间 1px 线色分隔（首条无），右侧 18×18 线性图标（1.8px 圆头）；Delete 文字与图标红 #E03131；悬停或拖入高亮背景次级表面色。
- 毛玻璃遮罩铺满场景：背景表面色 35% 透明混合，backdrop-filter blur(14px) saturate(1.2)，透明度 0.3s 过渡。
- 完整对话页铺满场景：头部 64px（返回键 34×34、圆角 10px、背景次级表面色、内容 "‹" 18px/800），气泡列 flex:1、内边距 6px 16px、底部对齐，输入条为高 42px 的胶囊（margin 10px 14px 16px、内边距 0 16px、背景次级表面色、占位文字 "Message" 13px 三级墨色）。
- 提示胶囊：水平居中、距底 22px，内边距 9px 14px、圆角 999px、背景墨色、文字表面色 12.5px/750，浮现带 cubic-bezier(.34,1.56,.64,1) 弹性上移。
- 场景令牌浅色深色两套（light-dark() 随 prefers-color-scheme 切换），如上；组件未声明字体栈。

## 数据

- 写死 6 条会话（姓名 / 摘要 / 时间 / 头像色 / 是否未读 / 气泡两条）：
  1. Seoyeon — Shared the slides for tomorrow — 9:41 AM — #20C997 — 未读 — "Shared the slides for tomorrow"、"Just check the chart on page 3!"
  2. Minho — The photo came out so well lol — 8:12 AM — #339AF0 — 未读 — 原句 + "Can you send me the original?"
  3. Jisoo — Hiking this weekend? — Yesterday — #F06595 — 已读 — 原句 + "How about Saturday at 7?"
  4. Hajun — Got the package, thank you — Yesterday — #FAB005 — 已读 — 原句 + "It was packed so carefully 🙏"
  5. Yuna — Dinner ideas for tonight? — Tuesday — #7950F2 — 未读 — 原句 + "Nothing spicy!"
  6. Doyun — Left a code review — Monday — #FD7E14 — 已读 — 原句 + "Just two spots to fix, I think"
- 写死 4 条操作：Reply、Pin、Mark as read、Delete，各自配 20×20 viewBox 的线性图标路径；Delete 为红色。
- 写死提示文案：Reply 后 "Opened a reply"；Pin 后 "<姓名> pinned to the top" / "<姓名> unpinned"；删除后 "<姓名> deleted"。

## 操作和动效

- 长按预览：pointerdown 起按下 480ms 计时（同时 setPointerCapture、行加 press 态缩到 0.95）；期间位移超过 8px 视为滚动意图，取消计时与按压态；计时到点弹出预览——毛玻璃淡入（0.3s），预览卡从被按行的位置与尺寸（按行宽/268、行高/204 缩放）起飞到目标位，440ms cubic-bezier(.3,1.3,.5,1)、透明度 0.6→1。触屏长按的原生右键菜单被 contextmenu 拦截。
- 菜单入场：四条操作从 opacity 0、translateY(-8px) scale(.96) 依次落位（transform 0.35s 弹性曲线），第 2/3/4 条分别延迟 0.04s/0.08s/0.12s。
- 拖选与快捷执行：预览打开期间按住不放、指针滑到某条操作上会即时高亮，此时松手直接执行该操作（不清焦点）；普通松手则保持预览，点击毛玻璃遮罩或按 Escape 收回，焦点回到来源行。
- 菜单项行为：Reply 弹提示 "Opened a reply"；Pin 切换置顶（名字旁图钉出现/消失），置顶时该行以 FLIP 动画移到列表顶部——其余行按位移差用 420ms cubic-bezier(.3,1.2,.4,1) 滑让，提示 "<姓名> pinned to the top"；Mark as read 切换未读蓝点（已读后菜单文案变 "Mark as unread"）；Delete 把行高动画压到 0、透明度归零（行过渡 0.35s），360ms 后移除节点，提示 "<姓名> deleted"。提示胶囊 1.6s 后自动收回。
- 轻点会话行直接展开完整对话页：从该行位置整屏放大（scale 至 300/500 画布比例、圆角 40px→36px），480ms cubic-bezier(.3,1.1,.4,1)、透明度 0.4→1；该行未读点清除。点预览卡也走同一展开（从卡片位置起飞）。返回键把整页向右滑出 60px 同时淡出（260ms ease-in），焦点回到来源行。
- 键盘与焦点：行是原生按钮可 Tab 聚焦，Enter/Space 触发展开；ContextMenu 键或 Shift+F10 等价长按弹出预览；预览打开后焦点自动落到第一条操作，Tab 可在四条操作与预览卡间循环（收起后 tabIndex 复位为 -1）；各控件 focus-visible 均有 2px accent 外圈；菜单 role="menu"、操作 role="menuitem"、列表 aria-label "Conversations"、菜单 aria-label "Quick actions"，每行 aria-label 形如 "<姓名>: <摘要>, long-press to preview"；提示胶囊 aria-live="polite"。
- prefers-reduced-motion 下：长按仍需 480ms（计时不变），但预览/整页/FLIP/删除等所有位移动画直跳终态，删除立即移除节点。options.reducedMotion 覆盖系统偏好。
- 更新 options 不重挂载组件，支持同页多实例互不干扰；卸载时清掉长按计时器、提示计时器与全部监听。

## Props

| Prop | Type | Default | Description |
| height | number | 500 | 场景高度，逻辑像素；窄容器整景按比例缩小 |
| reducedMotion | boolean | 跟随系统 | 覆盖系统的减少动态偏好 |

## 独立实现与六框架交付

- 仅凭本文从零生成可运行的实现。尺寸、颜色、文案与关键帧均以上述文字为准；头像用纯色圆与首字母，图标全部内联 SVG，不加载远程图片、字体、视频或素材。
- 当前交付重点为 React，组件名称 LongPressPeek。从零创建四个文件：LongPressPeek.tsx、LongPressPeekEngine.js、motion-runtime.ts、LongPressPeekEngine.d.ts；分别实现框架入口、完整交互核心、实例生命周期和类型声明。文件名是需要生成的产物，不假定接收者已经拥有任何文件。
- 同时提供 React、Vue、Svelte、Solid、Preact、Vanilla 原生生命周期入口，共享框架无关核心。DOM 仅在挂载后访问，支持同页多实例；更新时保持状态，销毁时清理动画、计时器、观察器及监听器。不要用 iframe 代替组件实现。
- 依赖安装说明：npm install react react-dom。若使用依赖，只使用其公开 API；组件的布局、样式、图形和算法必须在本次生成的文件中完整实现，不引用现成效果组件。
- 实现 options.height 以调整场景高度，options.reducedMotion 覆盖系统偏好；减少动态下所有动作仍可达且状态正确。
- 给出每个文件的完整内容、安装和运行步骤、以下使用示例所需的全部实现。不得留省略号、待补素材或"自行补齐核心"的占位。
- 验收：375 / 768 / 1440px 无横向溢出；长按 480ms 弹出、移动 8px 内取消、拖到操作上松手即执行；轻点展开、返回退回、Escape 收回均正确；浅色深色两套令牌正确；多实例互不干扰，卸载后停止所有任务。

## 使用示例

```tsx
import { LongPressPeek } from "./LongPressPeek";

export default function App() {
  return <LongPressPeek />;
}
```
