# 大标题收缩 — CollapsingLargeTitle

制作「大标题收缩」场景：一张 300×500 的邮箱应用卡片。顶栏中央藏着小标题「Inbox」、右侧一枚蓝色「Edit」；内容区从 32px 的大标题 Inbox、胶囊搜索框开始，下面是九封邮件列表。上滚时大标题淡出并微微缩小、搜索框像被压扁一样折叠消失（高度收零、内容纵向压缩），随后顶栏小标题带着 8px 上浮淡入、顶栏变成毛玻璃并浮出一条发丝线；下滚一切反向复原。滚动到顶部继续下拉（橡皮筋）时大标题还会放大最多 12%。

## 布局与材质

- 300×500px 场景卡，圆角 36px，溢出裁切。场景根是 300×500 的无底色包装层（水平居中），卡片视觉放在其内部的绝对填充层上——文档演示舞台会剥离场景根的背景，卡片底色必须在嵌套层上才能保留。容器窄于 300px 时整景等比缩小（缩放比 = min(1, 可用宽/300)，上限 1）。
- 场景令牌浅色/深色两套（`prefers-color-scheme: dark` 自动切换）：卡片底色 --ux-surface 浅 #FFFFFF / 深 #13141C；主墨色 --ux-ink 浅 #16151B / 深 #F4F0E8；次级墨 --ux-ink-2 浅 #57535F / 深 rgba(244,240,232,.68)；三级墨 --ux-ink-3 浅 #8E8A97 / 深 rgba(244,240,232,.42)；线色 --ux-line 浅 rgba(22,21,27,.09) / 深 rgba(255,255,255,.08)；次表面 --ux-surface-2 浅 #F5F3EF / 深 #1A1B25；accent --ux-accent 浅 #6A57F2 / 深 #B7A4FF；强阴影 --ux-shadow-strong 浅 rgba(40,30,80,.3) / 深 rgba(0,0,0,.72)。外圈 1px 线色描边加 0 30px 60px -36px 强阴影。不加载远程字体，字体继承宿主页面。
- 顶栏：absolute 顶部贴满、高 54px、flex 水平居中，z-index 2；transition background-color .25s、box-shadow .25s。滚动超过 20px 挂 is-stuck：底色变 color-mix(in srgb, var(--ux-surface) 78%, transparent) 加 backdrop-filter blur(14px) 毛玻璃，并出现 0 1px 0 线色发丝分隔。
- 小标题「Inbox」：15.5px/字重 800，opacity 由变量 --so 控制、初始 0，出现时带 (1−so)×8px 的上浮位移；aria-hidden（列表已带名称，避免重复朗读）。
- Edit 按钮：absolute 右 18px、上 17px，无边框无底色无内边距，14.5px/字重 650、色 --ux-accent。
- 滚动区：absolute inset 0、overflow-y auto、padding-top 54px 给顶栏让位，滚动条隐藏，tabindex=0、aria-label「Inbox list」。
- 大标题 h3「Inbox」：padding 0 18px，32px/字重 880/字距 -.04em；transform-origin 0 100%（以左下角为基准缩放），scale 与透明度由滚动插值变量 --ls / --lo 驱动。
- 搜索框区：外层 margin 0 16px、高 var(--sh,46px)、overflow hidden（折叠靠高度归零裁切）；内层胶囊高 38px、上边距 8px、内边距 0 12px、圆角 12px、底 --ux-surface-2，内部 16×16 放大镜描边图标（stroke 2、圆头、三级墨色）与 14.5px input 之间 gap 8px；input 无框无 outline、文字色 --ux-ink，placeholder「Search mail」；内层还有自己的透明度 --sop 与 scaleY --ssy（origin 50% 0，顶部固定向下压扁）。
- 邮件列表 ul：margin-top 8px、底部 padding 30px、无圆点符号；每行 flex、gap 12px、padding 12px 18px、底部 1px 线色分隔。行首未读圆点 9×9px、上边距 6px、底色 --ux-accent，第 4 行起（已读）变透明。行内第一行 b 为 flex 两端对齐：发件人 em（font-style 纠正为 normal）14px/字重 800，右侧时间 span 11.5px/字重 650 三级墨色；主题 p 上边距 2px、13px、次级墨色、单行省略。

## 数据

- 九封邮件写死，依序为（发件人 / 主题 / 时间）：
  1. Design team / Sharing the Friday review deck / 9:12 AM（未读）
  2. Bank alerts / This month's card statement / 8:40 AM（未读）
  3. Jiyun / Free this weekend? / Yesterday（未读）
  4. Bookstore / Your book order has shipped / Yesterday（已读）
  5. Minho / I tidied up the minutes / Tuesday（已读）
  6. Yoga studio / Next week's class schedule / Tuesday（已读）
  7. Sua / Sending the photos! / Monday（已读）
  8. Airline / Your boarding pass is ready / Monday（已读）
  9. Newsletter / 5 reads for this week / Sunday（已读）
- 标题「Inbox」、按钮「Edit」、搜索占位「Search mail」均为写死文案。

## 操作和动效

- 唯一驱动是滚动区内的用户滚动（滚轮、触摸、键盘方向键）；scroll 监听 passive，回调用 requestAnimationFrame 合帧；初始即执行一次对齐状态。全部插值可逆，下滚原路恢复。
- 搜索框折叠：s = clamp(scrollTop ÷ 46, 0, 1)。外层高度从 46px 线性收到 0；内层透明度按 1 − s×1.6 加速淡出（约前六成行程消失）；内层 scaleY 从 1 压到 0.5（顶部固定向下压扁），像被顶栏挤瘪。
- 大标题退场：透明度在 scrollTop 2–24px 区间从 1 降到 0；缩放在 y>0 时按 1 − min(0.08, y÷300) 收到最小 0.92（左下角为锚点，近似 iOS 大标题滑入顶栏的手感）；y<0 的橡皮筋回拉时按 1 + min(0.12, −y÷400) 放大到最大 1.12。
- 小标题进场：透明度在 scrollTop 26–44px 区间从 0 升到 1，同时从下方 8px 浮上；大标题完全消失（24px 处）之后才开始出现（26px 起），两者不相叠。
- 顶栏材质：scrollTop > 20 挂 is-stuck，毛玻璃底与发丝线以 .25s 过渡浮现；回到顶部即撤下。
- 无自动播放、无循环；一切状态由滚动位置唯一决定。
- 键盘与无障碍：滚动区 tabindex=0、aria-label「Inbox list」，聚焦后方向键翻滚；Edit 为原生 button；搜索为 type=search 原生输入，aria-label「Search mail」；未读圆点 aria-hidden；小标题 aria-hidden 防止与列表标签重复朗读。
- 减少动态：本组件无自主动画，所有形变随滚动逐帧更新；options.reducedMotion 或系统偏好通过运行时把顶栏背景等 CSS 过渡压为瞬时，其余表现不变。
- options.height 调整场景高度（默认 500）；options.reducedMotion 覆盖系统偏好；更新选项就地合并、不重挂载；卸载时取消帧回调、解绑监听。样式在 Shadow DOM 内，同页多实例互不干扰。

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| height | number | 500 | 场景高度，逻辑像素；窄容器整景按比例缩小 |
| reducedMotion | boolean | 跟随系统 | 覆盖系统的减少动态偏好 |

## 独立实现与六框架交付

- 仅凭本文从零生成可运行的实现。尺寸、颜色、文案与运动算法均以上述文字为准；界面用 DOM 与 CSS 完成，不加载远程图片、字体、视频或素材。
- 当前交付重点为 React，组件名称 CollapsingLargeTitle。从零创建四个文件：CollapsingLargeTitle.tsx、CollapsingLargeTitleEngine.js、motion-runtime.ts、CollapsingLargeTitleEngine.d.ts；分别实现框架入口、完整交互核心、实例生命周期和类型声明。文件名是需要生成的产物，不假定接收者已经拥有任何文件。
- 同时提供 React、Vue、Svelte、Solid、Preact、Vanilla 原生生命周期入口，共享框架无关核心。DOM 仅在挂载后访问，支持同页多实例；更新时保持状态，销毁时清理动画、计时器、观察器及监听器。不要用 iframe 代替组件实现。
- 依赖安装说明：npm install react react-dom。若使用依赖，只使用其公开 API；组件的布局、样式、图形和算法必须在本次生成的文件中完整实现，不引用现成效果组件。
- 实现 options.height 以调整场景高度，options.reducedMotion 覆盖系统偏好；滚动浏览在减少动态下仍完整可用。
- 给出每个文件的完整内容、安装和运行步骤、以下使用示例所需的全部实现。不得留省略号、待补素材或「自行补齐核心」的占位。
- 验收：375 / 768 / 1440px 无横向溢出；收缩/展开随滚动可逆且两标题不相叠；顶栏毛玻璃与发丝线正确；浅色深色两套令牌正确；多实例互不干扰，卸载后停止所有任务。

## 使用示例

```tsx
import { CollapsingLargeTitle } from "./CollapsingLargeTitle";

export default function App() {
  return <CollapsingLargeTitle />;
}
```
