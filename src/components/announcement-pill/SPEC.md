# 轮播公告胶囊 — AnnouncementPill

一个 340×340 的产品首页场景：顶部居中一枚 252px 宽的公告胶囊——左侧是三色渐变「New」小徽章，中间一条消息竖向轮播，右端一枚箭头；每隔 4 秒一道斜向高光扫过胶囊、消息上滚换条。点击胶囊在下方展开一张更新日志面板（日期 + 标题 + 一句说明，逐条错峰淡入），同时背后的标语与双按钮虚化退后；再点收回。面板展开或胶囊离开视口时轮播暂停。

## 布局与材质

- 340×340px 场景，圆角 30px，溢出裁切。底色为表面色叠加一枚顶部光晕：radial-gradient（100% 60% 椭圆、圆心 50% 0%，accent 12–15% 透明度渐隐到 65% 处）；外圈 1px 线色描边加 0 30px 60px -36px 强阴影，文字墨色。响应式行为是整景等比缩放：容器窄于 340px 时按「可用宽度 ÷ 340」缩放（不超过 1 倍），内部不重排。
- 胶囊：水平居中、top 46px、宽 252px，层级 2。按钮高 34px、宽 100%、内边距 0 10px 0 4px、圆角 999px、背景表面色、内嵌 1px 线色描边加 0 6px 16px -10px 强投影，元素间距 8px，溢出裁切；悬停时描边变 1.5px（accent 60% 透明度）、投影换 0 8px 22px -10px accent。focus-visible 外圈 2px accent、偏移 3px。
- 高光带：胶囊内一道 60px 宽的斜条（skewX(-18deg)，100deg 渐变 transparent → rgba(255,255,255,.75) → transparent），平时停在左侧场外，播放时 0.9s ease-in-out 扫到右侧 120% 处。
- 「New」徽章：高 26px、内边距 0 9px、圆角 999px，背景 120deg 三色渐变（浅色 #7B61FF → #3D8BFF 55% → #1FB89A；深色 #B7A4FF → #7DB4FF 55% → #A5F2D3），文字取 accent 反色（浅色 #FFFFFF / 深色 #0B0C12），10.5px/字重 900。
- 消息轮播窗：高 18px、溢出裁切；内层每条 18px 行高、11.5px/字重 750、单行省略，整体 translateY 0.5s cubic-bezier(.3,1.2,.5,1) 上滚。右端箭头 14×14px、三级墨色，悬停右移 3px 并变 accent（transform 0.3s cubic-bezier(.3,1.6,.5,1)、颜色 0.25s）；展开态旋转 90° 且为 accent。
- 更新面板：上边距 6px、圆角 18px、背景表面色、描边 0 0 0 1px 线色加 0 18px 40px -18px 强投影；收起时 max-height 0、透明度 0、内边距 0 14px，展开时 max-height 220px、透明度 1、内边距 12px 14px（max-height 0.45s cubic-bezier(.2,.9,.3,1)、透明度 0.25s、内边距 0.35s 过渡）。面板头行两端对齐：「Latest updates」10.5px/字重 850 三级墨色，右侧「View all」链接 accent 色（tabindex -1，点击阻止默认）。条目为 36px + 1fr 两列网格、间距 8px、上下内边距 7px、顶部 1px 线色分隔：日期 9.5px/字重 800 三级墨色（等宽数字），标题 11.5px/字重 850，说明 10px/字重 600 次级墨色；展开时逐条淡入下落 6px 归位（透明度 0.3s、位移 0.4s cubic-bezier(.3,1.3,.5,1)，延迟 0.08s + 序号 × 0.07s）。
- 标语区：铺满宽、top 108px、居中。主标题 "Faster, and lighter"（两行）28px/行高 1.12、字重 900、字距 -0.045em；副题 "Same way of working, just less time spent." 上边距 12px、左右边距 34px、11.5px/行高 1.5、字重 600、次级墨色。面板展开时标语退为透明度 0.25 并叠加 1.5px 模糊（均 0.3s）。
- 底部按钮排：距底 46px、居中、间距 8px。两枚非交互胶囊（span）：高 34px、内边距 0 16px、圆角 999px、12px/字重 800；「Start free」墨色实底文字取表面色，「Learn more」表面色实底内嵌 1px 线色描边；展开时整排透明度 0.25。
- 场景令牌浅色深色两套（`prefers-color-scheme: dark` 切换）：表面 #FFFFFF/#13141C、墨色 #16151B/#F4F0E8、次级墨色 #57535F/rgba(244,240,232,.68)、三级墨色 #8E8A97/rgba(244,240,232,.42)、线色 rgba(22,21,27,.09)/rgba(255,255,255,.08)、accent #6A57F2/#B7A4FF、accent-soft rgba(106,87,242,.12)/rgba(183,164,255,.15)。

## 数据

- 轮播消息固定 3 条（另克隆首条用于无缝循环）："AI summaries are here"、"Team plan 20% off"、"Mobile app 2.0 is out"。
- 更新面板固定 3 条（日期、标题、说明）：10.14 · AI summaries · Shrinks long docs to three lines；10.02 · Share links · Create view-only links；09.21 · Dark mode · Follows your system setting。
- 其余固定文案：徽章 "New"、面板头 "Latest updates" / "View all"、标语与副题、按钮 "Start free" / "Learn more"。胶囊的 aria-label 随轮播更新为「当前消息 · expand」。

## 操作和动效

- 自动轮播：页面加载 1600ms 后首次触发，之后每 4000ms 一轮——重播高光扫过（0.9s ease-in-out），消息窗上滚一行（translateY −18px × 序号，0.5s cubic-bezier(.3,1.2,.5,1)）；滚完第 3 条后 560ms 关闭过渡瞬回第 1 条，循环往复。aria-label 同步换新。
- 暂停条件：面板展开期间、胶囊不在视口内（IntersectionObserver 检测）、或减少动态生效时，轮播与高光都跳过；回到可见状态后按原节奏继续。
- 点击胶囊：切换展开态——面板按上述过渡落下展开、箭头旋转 90°、标语与底部按钮退为 0.25 透明度并模糊；再次点击全部收回。aria-expanded 同步。
- 无障碍：胶囊为原生 button（aria-expanded + 动态 aria-label）；面板内装饰与高光带 aria-hidden；「View all」与底部两枚胶囊为非跳转占位（阻止默认或纯 span）。
- `prefers-reduced-motion`（或 options.reducedMotion）下：高光不扫、消息瞬换、面板与条目无过渡直出；展开/收起仍可点击切换，日志内容完整可见。

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| height | number | 340 | 场景高度，逻辑像素；窄容器整景按比例缩小 |
| reducedMotion | boolean | 跟随系统 | 覆盖系统的减少动态偏好 |

## 独立实现与六框架交付

- 仅凭本文从零生成可运行的实现。尺寸、颜色、文案、数据与运动参数均以上述文字为准；所有界面用 DOM 与 CSS 绘制，不加载远程图片、字体、视频或素材。
- 当前交付重点为 React，组件名称 AnnouncementPill。从零创建四个文件：AnnouncementPill.tsx、AnnouncementPillEngine.js、motion-runtime.ts、AnnouncementPillEngine.d.ts；分别实现框架入口、完整交互核心、实例生命周期和类型声明。文件名是需要生成的产物，不假定接收者已经拥有任何文件。
- 同时提供 React、Vue、Svelte、Solid、Preact、Vanilla 原生生命周期入口，共享框架无关核心。DOM 仅在挂载后访问，支持同页多实例；更新选项不重挂载、状态保持，销毁时清理动画帧、计时器、观察器及监听器。不要用 iframe 代替组件实现。
- 依赖安装说明：npm install react react-dom。若使用依赖，只使用其公开 API；组件的布局、样式与轮播算法必须在本次生成的文件中完整实现，不引用现成效果组件。
- 实现 options.height 以调整场景高度（默认 340），options.reducedMotion 覆盖系统偏好；减少动态时展开态与全部文案可见。
- 给出每个文件的完整内容、安装和运行步骤、以下使用示例所需的全部实现。不得留省略号、待补素材或"自行补齐核心"的占位。
- 验收：375 / 768 / 1440px 无横向溢出；轮播与无缝回卷、展开/收起、展开期间轮播暂停、滚出视口暂停均正确；浅色深色两套令牌正确；多实例互不干扰，卸载后停止所有任务。

## 使用示例

```tsx
import { AnnouncementPill } from "./AnnouncementPill";

export default function App() {
  return <AnnouncementPill />;
}
```
