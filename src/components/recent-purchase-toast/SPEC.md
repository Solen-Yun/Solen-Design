# 最新购买通知 — RecentPurchaseToast

340×340 的商店场景：背景是「Summer arrivals」新品页，两列各一张商品色块图、图下是商品名与价格；左下角循环弹出一枚购买通知卡——44×44 的商品缩略方块、文本「Kim from Busan just bought a linen shirt」、下面一行「2 min ago · Verified」并带一枚绿色对勾圆点，卡片底部压着一条 3px 紫色计时条，随停留时间从满条线性缩到零。指针悬停或焦点进入卡片时计时冻结、进度条停住；点卡片右上角的叉号，通知向下缩没，换成一条墨色胶囊「Purchase notices off · Undo」，Undo 键同时拿到焦点，点它就恢复循环并在 700ms 后弹出下一条。

## 布局与材质

- 场景根 340×340px，圆角 30px，overflow hidden，背景为表面色，外圈 1px 线色描边加 `0 30px 60px -36px` 强阴影，文字取墨色。场景令牌用 `light-dark()` 写两套，浅色：表面 #FFFFFF、次表面 #F5F3EF、三级表面 #EAE7E1、墨色 #16151B、次墨 #57535F、三级墨 #8E8A97、线 rgba(22,21,27,.09)、强线 rgba(22,21,27,.17)、强调 #6A57F2、强调二 #2F8FE0、强调浅底 rgba(106,87,242,.12)、强调字 #FFFFFF、薄荷 #119C72、警示 #D6731E、危险 #D93A55、玻璃 rgba(255,255,255,.58)、玻璃线 rgba(255,255,255,.85)、投影 rgba(40,30,80,.14)、强投影 rgba(40,30,80,.3)、渐变 linear-gradient(120deg,#7B61FF,#3D8BFF 55%,#1FB89A)；深色：表面 #13141C、次表面 #1A1B25、三级表面 #252632、墨色 #F4F0E8、次墨 rgba(244,240,232,.68)、三级墨 rgba(244,240,232,.42)、线 rgba(255,255,255,.08)、强线 rgba(255,255,255,.16)、强调 #B7A4FF、强调二 #7DB4FF、强调浅底 rgba(183,164,255,.15)、强调字 #0B0C12、薄荷 #7EE8C0、警示 #FFB26B、危险 #FF7D8C、玻璃 rgba(255,255,255,.07)、玻璃线 rgba(255,255,255,.18)、投影 rgba(0,0,0,.45)、强投影 rgba(0,0,0,.72)、渐变 linear-gradient(120deg,#B7A4FF,#7DB4FF 55%,#A5F2D3)。场景不声明 font-family，继承宿主页面字体，也不加载任何远程字体或图片。
- 背景页面层绝对定位铺满，内边距 20px 18px。标题「Summer arrivals」16px、字重 900、字距 -0.03em，下外边距 12px。下方两列网格，列宽均分、间隙 10px；每格先是一块 128px 高、14px 圆角的渐变色块图，下方 7px 处是 11.5px/800 的商品名，再下一行是 11px/850 的次墨色价格。
- 通知卡绝对定位在 left 12px、bottom 12px，宽 268px，圆角 16px，背景为表面色，外圈 1px 线色描边加 `0 18px 36px -14px` 强阴影，变换原点取 20% 100%（贴着左下角弹出），溢出裁切。内边距 10px 30px 13px 10px，横向 flex 居中、间隙 10px。
- 卡内左侧缩略图 44×44px、11px 圆角，底色是 `linear-gradient(150deg, <商品色>, color-mix(in srgb, <商品色> 70%,#000))`；其上叠一块 inset 9px 11px、圆角 6px 6px 3px 3px 的 rgba(255,255,255,.65) 高光块。
- 卡内文字块最小宽度 0，11px、行高 1.4、字重 650、次墨色；商品名用 `<b>` 包住，字重提到 850 并转为墨色。次要行 `<small>` 是 flex、间隙 4px、上外边距 2px、9.5px/750、三级墨色，行首一枚 10×10 圆形 #10B981，内嵌白色对勾路径（内联 SVG data URI，center/100% 铺满）。
- 关闭按钮绝对定位 right 6px、top 6px，22×22px 圆形，无边框、透明底、三级墨色，10×10 的叉号 SVG（stroke-width 1.6、圆头），hover 或聚焦悬停态时底色换次表面、文字换墨色。
- 计时条绝对定位在卡片底边，通栏宽、3px 高，强调色，变换原点 0 50%，不透明度 0.7。
- 关闭后的胶囊绝对定位在 left 12px、bottom 12px，高 40px，圆角 999px，内边距 0 6px 0 14px，背景墨色、文字表面色、11px/750，flex 居中、间隙 10px。内嵌 Undo 按钮高 28px、内边距 0 11px、胶囊圆角，底色为 `color-mix(in srgb, 表面色 18%, transparent)`，文字表面色，10.5px/850。
- 场景按固定 340px 逻辑宽排版：容器窄于 340px 时整景按比例缩小（transform scale），容器宽于 340px 时居中留白；场景根自身带 `min-width:0; overflow:hidden; isolation:isolate`。
- 断点：组件内部不设媒体查询断点，只用 `prefers-color-scheme` 切换深浅色令牌；响应式缩放由宿主容器宽度驱动。

## 数据

- 背景商品 2 条：第 1 条色块 `linear-gradient(160deg,#F5F5F4,#D6D3D1)`，名称「Linen shirt」，价格「$39」；第 2 条色块 `linear-gradient(160deg,#DBEAFE,#93C5FD)`，名称「Half pants」，价格「$32」。
- 购买者 4 条，字段为 [城市, 姓名, 商品, 距今分钟, 缩略图基色]：Busan / Kim / a linen shirt / 2 / #E7E5E4，Seoul / Lee / half pants / 5 / #BFDBFE，Daegu / Park / a canvas tote / 1 / #FDE68A，Gwangju / Choi / a bucket hat / 8 / #BBF7D0。四条按数组顺序循环使用。
- 通知正文模板为「%n from %c just bought 」，把姓名与城市替换进去，再接商品名；副行文本为「<分钟数> min ago · Verified」。
- 无写死数据之外的数据来源：全部内容都来自上面这 2 + 4 条常量，没有任何网络请求或运行时数据。

## 操作和动效

- 首次进入后等 900ms 弹出第一张通知卡：移除收起态、加上出现态，transform 由 `translateY(130%) scale(.9)` 变为 none（0.5s，cubic-bezier(.3,1.4,.5,1)），不透明度由 0 到 1（0.3s）。
- 通知停留 4200ms。停留期间计时条以 scaleX 从 1 线性缩到 0（每帧按剩余时间除以 4200 计算，保留三位小数），时间耗尽后通知收回消失态（transform none、opacity 0，仍走 0.5s/0.3s 过渡），再等 1300ms 弹出下一条，四条数据依次轮转。
- 指针进入通知卡（pointerenter）或焦点进入（focusin）时置为暂停，计时条与消失倒计时都停住；pointerleave / focusout 恢复计时。场景离开视口（IntersectionObserver 判定不可见）时同样停住，回到视口继续。
- 点右上角叉号：立即关闭循环（off 标记），通知切到 `is-shut`（transform `translateY(20px) scale(.85)`，0.35s，cubic-bezier(.5,0,.75,0)，opacity 0 用 0.3s），280ms 后底部胶囊滑入（transform 从 `translateY(140%)` 变为 none，0.45s，cubic-bezier(.3,1.4,.5,1)），Undo 按钮 tabIndex 由 -1 改为 0 并立即获得焦点（preventScroll）。
- 点 Undo：胶囊收回（去掉出现态），Undo 按钮 tabIndex 改回 -1，关闭标记解除，700ms 后弹出下一条通知（队列位置接着上一次继续，即被关闭时也会消耗一条数据的下标）。
- 减少动态偏好下：通知卡、通知卡的收起态、底部胶囊的过渡全部压缩为只做 `opacity .2s`，其余时长与顺序不变。
- 无障碍：通知卡与底部胶囊都是 `role="status"`；关闭按钮是原生 button，aria-label 为「Close notice」，叉号 SVG aria-hidden；焦点样式为 2px 强调色描边、offset 1px（关闭按钮与 Undo 按钮都适用）；计时条 aria-hidden。
- options.height 调整场景高度，options.reducedMotion 覆盖系统偏好；组件内部不读系统媒体查询的动画偏好，只按自身开关决定。

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| height | number | 340 | 场景高度，逻辑像素；窄容器整景按比例缩小 |
| reducedMotion | boolean | 跟随系统 | 覆盖系统的减少动态偏好 |

## 独立实现与六框架交付

- 仅凭本文从零生成可运行的实现。尺寸、颜色、文案、图形和运动算法均以上述文字为准；所有装饰用 CSS 与内联 SVG 绘制，不加载远程图片、字体、视频或素材。
- 当前交付重点为 React，组件名称 RecentPurchaseToast。从零创建四个文件：RecentPurchaseToast.tsx、RecentPurchaseToastEngine.js、motion-runtime.ts、RecentPurchaseToastEngine.d.ts；分别实现框架入口、完整交互核心、实例生命周期和类型声明。文件名是需要生成的产物，不假定接收者已经拥有任何文件。
- 同时提供 React、Vue、Svelte、Solid、Preact、Vanilla 原生生命周期入口，共享框架无关核心。DOM 仅在挂载后访问，支持同页多实例；更新时保持状态，销毁时清理动画、计时器、观察器及监听器。不要用 iframe 代替组件实现。
- 依赖安装说明：npm install react react-dom。若使用依赖，只使用其公开 API；组件的布局、样式、图形和算法必须在本次生成的文件中完整实现，不引用现成效果组件。
- 实现 options.height 以调整场景高度，options.reducedMotion 覆盖系统偏好；减少动态效果仍保留完整流程状态。
- 给出每个文件的完整内容、安装和运行步骤、以下使用示例所需的全部实现。不得留省略号、待补素材或"自行补齐核心"的占位。
- 验收：375 / 768 / 1440px 无横向溢出；通知的弹出、计时、暂停、关闭与撤销都有正确状态；浅色深色两套令牌正确；多实例互不干扰，卸载后停止所有任务。

## 使用示例

```tsx
import { RecentPurchaseToast } from "./RecentPurchaseToast";

export default function App() {
  return <RecentPurchaseToast />;
}
```
