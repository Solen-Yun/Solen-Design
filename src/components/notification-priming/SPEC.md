# 先问后开通知 — NotificationPriming

制作一张 340×340 的通知授权引导场景。场景底色是浅一档的表面色，中间浮着一张白色引导卡：顶部一枚琥珀色圆角方块里嵌着 28px 的铃铛线稿，铃铛持续轻微摆动；卡片标题问 "Want a heads-up when someone replies?"，下面一行说明，下面并排两枚按钮——左 "Later" 是浅灰底，右 "Turn on" 是墨色底。点 "Turn on" 后，浏览器风格的权限条从屏幕上方滑入（白底、深灰字、带一个灰方块站点图标、文案 "example.com wants to show notifications"，右端 Block / Allow 两枚按钮），同时一枚主色描边的箭头在权限条下方指向 Allow。点 Allow：权限条滑走，引导卡的铃铛换成对勾、方块转绿、按钮区换成一行绿色文字 "Notifications are on"，随后一条通知卡片从右侧滑入（渐变方块图标 + "Junho replied" + 一句引文），2.6 秒后自动退场。点 Later 或权限条上的 Block，引导卡缩成一团消失，右下角弹出一枚带红点的圆形铃铛按钮，再点它可以重新回到引导卡。

## 布局与材质

- 340×340px 场景卡，圆角 30px，overflow 裁切；底色为表面色 2 号（比常规场景卡浅一档），外圈 `0 0 0 1px` 线色描边，下方 `0 30px 60px -36px` 强阴影。
- 引导卡绝对定位 left 20px / right 20px / top 90px，内边距 22px 20px 18px、22px 圆角、表面色底，阴影 `0 0 0 1px` 线色加 `0 20px 40px -24px` 强阴影，文本居中；变换原点为卡片自身右下角外侧 `calc(100% - 26px) calc(100% + 60px)`，被收起时 scale(.1) + opacity 0 且不吃指针事件，过渡 transform 0.5s cubic-bezier(.6,0,.3,1)、opacity 0.35s。
- 铃铛方块：56×56px、水平居中、18px 圆角、底色 color-mix(in srgb,#F59E0B 16%,transparent)、图标色 #D97706、grid 居中。开启通知后底色换成 color-mix(in srgb,#10B981 16%,transparent)、图标色 #059669。内含 28×28 的铃铛线稿 SVG（viewBox 0 0 28 28），路径 `M7 19 v-7 a7 7 0 0 1 14 0 v7 l2 2.5 H5 z M11.5 24 a2.6 2.6 0 0 0 5 0`，无填充、描边 2.2、圆角连接、圆头端点；变换原点设在 50% 15%（即铃铛顶部），摆动动画 2.4s ease-in-out 无限循环，0%–60% 与 100% 不动，64% 转到 16°、70% 转到 -14°、76% 转到 10°、82% 转到 -6°、88° 转到 2°。
- 卡片标题上外边距 14px、16px / 900 / 字距 -0.025em；说明句上外边距 6px、11px / 行高 1.5 / 650、三级墨色。
- 按钮行 flex、间距 6px、上外边距 16px；按钮等分、高 40px、12px 圆角、12px / 850。左边 "Later" 为表面色 2 号底 + 次级墨色字，右边 "Turn on" 为墨色底 + 表面色字。通知开启后整行按钮隐藏。
- 开启后的确认行：上外边距 16px、高 40px、flex 居中、12px / 850、色 #059669，文案 "Notifications are on"，平时 display none，开启后 display flex；容器带 `role="status"`。
- 浏览器权限条绝对定位 left 12px / top 12px、宽 236px、内边距 12px、12px 圆角、纯白底 #FFF、文字 #1F2937，阴影 `0 0 0 1px rgba(0,0,0,.08)` 加 `0 16px 32px -10px rgba(0,0,0,.35)`，11px / 650；初始 `translateY(-130%)` 完全在画面外，出现时归位，过渡 transform 0.45s cubic-bezier(.3,1.25,.5,1)。容器带 `role="dialog"` 与 `aria-hidden`。
  - 条内文案行 flex、垂直居中、间距 7px：前面一枚 16×16px、4px 圆角的灰方块 #E5E7EB，里面嵌一枚 6×6px 的 #6B7280 小圆点；文字 "example.com wants to show notifications"。
  - 按钮行 flex、右对齐、间距 6px、上外边距 10px；按钮高 26px、内边距 0 12px、6px 圆角、11px / 750。"Block" 是 #F3F4F6 底 + #374151 字，"Allow" 是 #2563EB 底 + 白字。
- 指向箭头绝对定位 left 220px / top 104px、34×40px、主色描边，初始 opacity 0，出现时 0.3s 淡入并延迟 0.3s；内含 34×40 的箭头 SVG（viewBox 0 0 34 40，路径 `M26 36 C14 34 8 24 10 8 M4 14 l6-7 6 7`，无填充、描边 2.6、圆头圆角连接），动画 0.8s ease-in-out 无限交替，位移到 translate(-3px,-5px)。
- 通知卡片绝对定位 right 12px / top 12px、宽 224px、flex、间距 9px、内边距 11px、14px 圆角、表面色底，阴影 `0 0 0 1px` 线色加 `0 18px 34px -12px` 强阴影；初始 `translateX(120%)` 在画面外，入场时归位，过渡 transform 0.5s cubic-bezier(.3,1.3,.5,1)。容器带 `role="status"`。左侧 30×30px、9px 圆角的主色渐变方块，右侧标题 11.5px / 850，正文上外边距 2px、10.5px / 650、次级墨色。
- 角落铃铛按钮绝对定位 right 16px / bottom 16px、48×48px 圆形、无边框、表面色底，阴影 `0 0 0 1px` 线色加 `0 12px 24px -12px` 强阴影，图标色 #D97706，grid 居中；初始 scale(0) 完全收起，引出后 scale(1) 弹入，过渡 transform 0.4s cubic-bezier(.3,1.7,.5,1)，并带 0.35s 的过渡延迟。内含 22×22 铃铛 SVG（与卡片内同款路径）；右上角伪元素是一枚 8×8px 的 #EF4444 红点，带 `0 0 0 2px` 表面色光圈。按钮无障碍名 "Open notification settings"，初始不在焦点顺序里。
- 场景令牌用 CSS `light-dark()` 随 `color-scheme` 切换，浅色 / 深色两套：表面 #FFFFFF / #13141C，表面 2 #F5F3EF / #1A1B25，表面 3 #EAE7E1 / #252632，墨色 #16151B / #F4F0E8，次级墨色 #57535F / rgba(244,240,232,.68)，三级墨色 #8E8A97 / rgba(244,240,232,.42)，线色 rgba(22,21,27,.09) / rgba(255,255,255,.08)，强线 rgba(22,21,27,.17) / rgba(255,255,255,.16)，主色 #6A57F2 / #B7A4FF，主色 2 #2F8FE0 / #7DB4FF，主色淡底 rgba(106,87,242,.12) / rgba(183,164,255,.15)，主色字 #FFFFFF / #0B0C12，薄荷 #119C72 / #7EE8C0，警告 #D6731E / #FFB26B，危险 #D93A55 / #FF7D8C，玻璃 rgba(255,255,255,.58) / rgba(255,255,255,.07)，玻璃线 rgba(255,255,255,.85) / rgba(255,255,255,.18)，阴影 rgba(40,30,80,.14) / rgba(0,0,0,.45)，强阴影 rgba(40,30,80,.3) / rgba(0,0,0,.72)。权限条的白底与灰字、Allow 的 #2563EB、红点 #EF4444、铃铛橙 #D97706 与绿 #059669 都是固定值，不随深色令牌变化；组件不声明字体族，继承宿主页面字体；按钮统一 `font: inherit`。
- 组件只有 `@media (prefers-reduced-motion: reduce)` 一个媒体查询；场景是固定 340px 宽的等比缩放画布，容器变窄时整景按 `min(1, 可用宽/340)` 缩小，内部用绝对定位，不做响应式重排。

## 数据

- 引导卡文案：标题 "Want a heads-up when someone replies?"；说明 "Only the important stuff. Turn it off anytime in settings."；按钮 "Later" 与 "Turn on"；开启后的确认文案 "Notifications are on"。
- 权限条文案："example.com wants to show notifications"；按钮 "Block" 与 "Allow"。
- 通知卡片文案：标题 "Junho replied"；正文 “Sounds good, I’ll ship it today!”（带直角引号）。
- 权限条里的站点域名用占位符 example.com。
- 角落按钮无障碍名 "Open notification settings"。

## 操作和动效

- 初始状态：引导卡在画面中央，铃铛持续摆动；权限条藏在画面上方之外；通知卡片藏在画面右侧之外；角落铃铛按钮 scale(0) 且不可聚焦。
- 点 "Turn on"：权限条从上方滑入（0.45s cubic-bezier(.3,1.25,.5,1)），主色箭头同时淡入并指向 Allow，权限条的两个按钮进入焦点顺序。400ms 后（减少动态时 0ms）焦点移到 Allow 按钮上。
- 点 Allow：权限条收回画面上方、箭头淡出、权限条的两个按钮退出焦点顺序；引导卡的铃铛图标换成一枚对勾（路径换成 `M6 14.5 l5 5 L22 8.5`）、方块底色转绿、摆动停止；卡片按钮区隐藏，露出绿色确认行 "Notifications are on"。600ms 后（减少动态时 0ms）通知卡片从右侧滑入，2.6 秒后自动滑出画面。
- 点权限条上的 Block：权限条收回、箭头淡出，引导卡整张缩到 scale(.1) 并淡出（0.5s cubic-bezier(.6,0,.3,1) + 0.35s 透明度），右下角弹出带红点的圆形铃铛按钮（scale 0 → 1，0.4s cubic-bezier(.3,1.7,.5,1)，延迟 0.35s），该按钮进入焦点顺序。
- 点引导卡上的 "Later"：效果同 Block——卡片收起、角落铃铛按钮弹出，并立即把焦点移到它上面。
- 点角落铃铛按钮：移除收起标记、按钮退出焦点顺序，焦点回到 "Turn on" 按钮上，引导卡重新出现（铃铛恢复摆动）。点击角落按钮不会再次触发权限条。
- 无障碍：权限条容器带 `role="dialog"` 与 `aria-hidden`；确认行与通知卡片都带 `role="status"`，状态变化可被读屏播报；通知卡片的渐变方块与角落按钮图标对读屏隐藏，角落按钮另有明确的文字无障碍名；所有按钮 focus-visible 时 2px 主色描边、外偏移 2px。
- `prefers-reduced-motion: reduce`（或 `options.reducedMotion` 为真）时：铃铛摆动与箭头浮动动画停止，引导卡、权限条、通知卡片、角落按钮的过渡全部关闭；聚焦延时与通知延时分别压到 0ms，通知卡片仍然出现并在 2.6 秒后退场；功能与最终画面完全保留。
- 支持同页多实例：查询限定在各自 ShadowRoot 内，不使用全局 id；卸载时清理计时器、事件监听与观察器。

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| height | number | 340 | 场景高度，逻辑像素；窄容器整景按比例缩小 |
| reducedMotion | boolean | 跟随系统 | 覆盖系统的减少动态偏好 |

## 独立实现与六框架交付

- 仅凭本文从零生成可运行的实现。尺寸、颜色、文案、图形和运动算法均以上述文字为准；所有装饰用 CSS 与内联 SVG 绘制，不加载远程图片、字体、视频或素材。
- 当前交付重点为 React，组件名称 NotificationPriming。从零创建四个文件：NotificationPriming.tsx、NotificationPrimingEngine.js、motion-runtime.ts、NotificationPrimingEngine.d.ts；分别实现框架入口、完整交互核心、实例生命周期和类型声明。文件名是需要生成的产物，不假定接收者已经拥有任何文件。
- 同时提供 React、Vue、Svelte、Solid、Preact、Vanilla 原生生命周期入口，共享框架无关核心。DOM 仅在挂载后访问，支持同页多实例；更新时保持状态，销毁时清理动画、计时器、观察器及监听器。不要用 iframe 代替组件实现。
- 依赖安装说明：npm install react react-dom。若使用依赖，只使用其公开 API；组件的布局、样式、图形和算法必须在本次生成的文件中完整实现，不引用现成效果组件。
- 实现 options.height 以调整场景高度，options.reducedMotion 覆盖系统偏好；减少动态效果仍保留完整流程状态。
- 给出每个文件的完整内容、安装和运行步骤、以下使用示例所需的全部实现。不得留省略号、待补素材或"自行补齐核心"的占位。
- 验收：375 / 768 / 1440px 无横向溢出；引导卡、权限条、通知三条支线以及 Later / Block / 角落按钮回路都正确；浅色深色两套令牌正确；多实例互不干扰，卸载后停止所有任务。

## 使用示例

```tsx
import { NotificationPriming } from "./NotificationPriming";

export default function App() {
  return <NotificationPriming />;
}
