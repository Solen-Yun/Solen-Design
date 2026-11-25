# Cookie 同意横幅 — CookieConsent

制作「Cookie 同意横幅」：一张 340×340 的网页底部场景。背景是五条灰色骨架条模拟页面内容，底部悬浮一张 20px 圆角横幅：左侧 44px 手绘曲奇图标（#F2B866 饼底、#D97706 描边、四粒 #78350F 巧克力豆），右侧标题 "Can we use cookies?" 与副文案 "Only to make the site easier to use."，以及 Settings / Save choices / Accept all 三枚按钮。挂载 600ms 后横幅从底部弹入；点 Settings 向上长出三行分类开关（Essential 恒开且禁用并标 "Always on"、Analytics、Marketing，36×22 滑动开关），Settings 自身换成 Save choices；保存或全部允许后曲奇被咬掉一口（SVG mask 三圆放大）+ 三粒面包屑坠落旋转消失，横幅在 .55s 延迟后下滑退场，左下角弹出 44px 圆形曲奇小按钮，可点击重新打开横幅并直接落在展开态。

## 布局与材质

- 卡片 340×340px、圆角 30px、溢出裁切、表面色底；外圈 0 0 0 1px 线色描边，加 0 30px 60px -36px 强阴影。
- 背景骨架条（aria-hidden）：绝对填充、内边距 22px 20px；五条块均为圆角 8px、surface-2 底、下边距 9px，尺寸依次：高 22px 宽 40%、高 120px 全宽、高 12px 宽 90%、高 12px 宽 76%、高 12px 宽 84%。
- 横幅：绝对定位 left 12px / right 12px / bottom 12px、内边距 14px、圆角 20px、表面色底；阴影 0 0 0 1px 线色 + 0 20px 40px -14px 强阴影；role="dialog"、aria-label "Cookie consent"。默认 translateY(130%)，入场过渡 .5s cubic-bezier(.3,1.25,.5,1)；退场态 translateY(130%) 且过渡为 .45s cubic-bezier(.5,0,.75,0) 延迟 .55s。
- 曲奇图标：44×44 内联 SVG——r19 圆 #F2B866 实底 + 同圆 #D97706 2px 描边；四粒巧克力豆 #78350F（r3 于 (15,16)、r3.2 于 (26,27)、r2.2 于 (14,29)、r2 于 (29,15)）。咬口由 SVG mask 内三个圆实现：(38,7) r9、(42,17) r6、(30,2) r6，默认 scale 0，咬合时以 .25s cubic-bezier(.3,1.6,.5,1) 放大到 1（transform-box fill-box、origin center）。旁边三粒面包屑 #B45309：4px 与 3px、3px，圆角 1px，默认透明；坠落动画 .7s ease-in forwards——透明度 1→0、translate(6px, 34px)、rotate 160°，依次延迟 0 / .05s / .1s。
- 文案区：标题 "Can we use cookies?" 13px/字重 900；副文案 10.5px、行高 1.4、字重 650、三级墨色、上边距 2px。
- 展开区：grid-template-rows 0fr ↔ 1fr（子层 min-height 0 + overflow hidden），过渡 .45s cubic-bezier(.3,1,.4,1)，实现高度生长/收拢。三行分类行：上内边距 10px（首行）、行内边距 9px 2px、底部 1px 线色分隔；名称 11.5px/字重 850；说明 9.5px/字重 650 三级墨色；"Always on" 标记 9.5px/字重 800 三级墨色。
- 开关：36×22、圆角 11px、surface-3 底；旋钮 16px 白圆（left 3px、top 3px、0 1px 3px 阴影），选中时 translateX(14px)（.25s cubic-bezier(.3,1.5,.5,1)）；选中轨道 #10B981（.2s）；role="switch"、aria-label 为分类名；禁用态透明度 0.55、not-allowed 光标。
- 按钮排：上边距 12px、间距 6px；三枚均 flex 1、高 38px、圆角 11px、12px/字重 850。Settings 与 Save choices：surface-2 底 + 内嵌 1px 线色描边、墨色字（展开前只显 Settings，展开后互换）；Accept all：墨色实底、表面色字。
- 重开按钮（FAB）：绝对定位 left 14px、bottom 14px、44×44 圆形、表面色底；阴影 0 0 0 1px 线色 + 0 10px 20px -10px 强阴影；内容为无咬口的同款曲奇 SVG（26×26）；aria-label "Reopen cookie settings"；默认 scale(0)，弹出过渡 .4s cubic-bezier(.3,1.7,.5,1)；tabIndex 初始 -1，弹出后置 0 并聚焦。所有按钮 focus-visible 2px accent 外圈偏移 2px。
- 场景令牌一套两态（light-dark()）：surface #FFFFFF/#13141C、surface-2 #F5F3EF/#1A1B25、surface-3 #EAE7E1/#252632、ink #16151B/#F4F0E8、ink-3 #8E8A97/rgba(244,240,232,.42)、line rgba(22,21,27,.09)/rgba(255,255,255,.08)、accent #6A57F2/#B7A4FF、阴影 rgba(40,30,80,.3)/rgba(0,0,0,.72)。字体随页面继承无衬线。

## 数据

- 三组分类开关（名称 / 说明 / 初始态）：Essential / "Keeps you signed in and your cart" / 开且禁用（附 "Always on"）；Analytics / "Shows which pages help" / 关；Marketing / "Shows news you may like" / 关。
- 写死文案：横幅标题与副文案、三枚按钮 Settings / Save choices / Accept all、FAB aria-label。无远程数据、无图片素材（曲奇与骨架条均为绘制）。

## 操作和动效

- 入场：挂载 600ms 后（减少动态 0ms）横幅从 translateY(130%) 弹入归位。
- Settings：展开三行开关（0fr→1fr 生长），Settings 按钮隐藏、Save choices 显示，并把焦点移到 Analytics 开关（preventScroll）。
- 开关点击切换 aria-checked；Essential 禁用不可点。选中轨道 #10B981、旋钮右移 14px。
- Save choices：以当前选择保存并退场。Accept all：先把三组全部置为选中再退场。退场流程：重置并重放咬合——mask 三圆放大咬出缺口、三粒面包屑坠落旋转消失；横幅在 .55s 延迟后以 .45s cubic-bezier(.5,0,.75,0) 下滑出屏；1050ms 后（减少动态 0ms）清除横幅各状态、弹出 FAB（scale 0→1）并把其 tabIndex 置 0、移入焦点。
- FAB 点击：FAB 隐藏、咬口复位，横幅重新弹入并直接展开设置区，300ms 后聚焦 Analytics 开关。
- 键盘与无障碍：横幅 role="dialog"；开关 role="switch" 且带分类名 aria-label；全部按钮可 Tab，焦点样式见上。
- prefers-reduced-motion / options.reducedMotion：横幅出入场、展开生长、FAB、咬合的过渡与面包屑坠落动画全部关闭（状态瞬时切换），流程时序压缩不变；场景根打上 data-reduced-motion 强制容器内所有 CSS 过渡与动画时长归零。surface 会随容器宽度把整景等比缩小（缩放不超过 1）。

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| height | number | 340 | 场景高度，逻辑像素；窄容器整景按比例缩小 |
| reducedMotion | boolean | 跟随系统 | 覆盖系统的减少动态偏好 |

## 独立实现与六框架交付

- 仅凭本文从零生成可运行的实现。尺寸、颜色、文案、数据与运动参数均以上述文字为准；界面用 DOM 与 CSS，曲奇、咬口 mask、面包屑均为内联 SVG 与色块绘制，不加载远程图片、字体、视频或素材。
- 当前交付重点为 React，组件名称 CookieConsent。从零创建四个文件：CookieConsent.tsx、CookieConsentEngine.js、motion-runtime.ts、CookieConsentEngine.d.ts；分别实现框架入口、完整交互核心、实例生命周期和类型声明。文件名是需要生成的产物，不假定接收者已经拥有任何文件。
- 同时提供 React、Vue、Svelte、Solid、Preact、Vanilla 原生生命周期入口，共享框架无关核心。DOM 仅在挂载后访问，支持同页多实例；更新时保持状态，销毁时清理动画、计时器、观察器及监听器。不要用 iframe 代替组件实现。
- 依赖安装说明：npm install react react-dom。若使用依赖，只使用其公开 API；组件的布局、样式、图形和算法必须在本次生成的文件中完整实现，不引用现成效果组件。
- 实现 options.height 以调整场景高度，options.reducedMotion 覆盖系统偏好；减少动态下展开、保存、重开流程仍完整可用。
- 给出每个文件的完整内容、安装和运行步骤、以下使用示例所需的全部实现。不得留省略号、待补素材或"自行补齐核心"的占位。
- 验收：375 / 768 / 1440px 无横向溢出；延迟弹入、Settings 生长开关、开关切换、保存/全部允许的咬口退场、FAB 重开全部正确；浅色深色两套令牌正确；多实例互不干扰，卸载后停止所有任务。

## 使用示例

```tsx
import { CookieConsent } from "./CookieConsent";

export default function App() {
  return <CookieConsent />;
}
```
