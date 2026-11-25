# 购物车抽屉 — CartDrawer

一个 300×480 的电商购物车场景：底层是商品页（大面积渐变商品图、品名价格、墨色 Add to cart 大按钮），点按后右侧滑入 268px 宽的购物车抽屉并带 40% 暗色遮罩——抽屉含标题与件数徽章、免邮进度条、可增减数量的商品行、小计（数字逐位滚动）与 Checkout 按钮；新加入的商品行以 accent 微光闪烁，移除商品时整行向右滑出并折叠收起。

## 布局与材质

- 300×480px 场景，圆角 32px，溢出裁切，底色表面色，外圈 1px 线色描边加 0 30px 60px -36px 强阴影，文字墨色。响应式行为是整景等比缩放：容器窄于 300px 时按「可用宽度 ÷ 300」缩放（不超过 1 倍），内部不重排。
- 商品页铺满场景：商品图区高 270px，背景 160deg 线性渐变 #F5F5F4 → #D6D3D1；中央偏上（位移 -45%）叠一件 110×130px 的衣片剪影，圆角 30px 30px 10px 10px，背景 #FAFAF9，投影 0 20px 30px -18px rgba(0,0,0,.35)。品名 "Linen shirt" 17px/字重 900，边距 18px 20px 0；价格 "$39" 15px/字重 850、次级墨色，边距 4px 20px 0。Add to cart 按钮距左右 20px、距底 24px，高 48px、圆角 14px，墨色实底、文字取表面色，13.5px/字重 850，按下缩放 0.98（transform .15s）。
- 遮罩铺满场景，背景 rgba(10,10,20,.4)，透明度 0.35s 过渡；抽屉打开时才可点击。
- 抽屉贴右侧上下满高、宽 268px，纵向 flex，背景表面色，左侧投影 -20px 0 40px -20px rgba(0,0,0,.35)，圆角 24px 0 0 24px；平时 translateX(105%) 藏在右外，打开时归位，transform .45s cubic-bezier(.3,1,.3,1)。
- 抽屉头部内边距 22px 14px 10px 18px："Cart" 16px/字重 900，右侧件数徽章最小宽 18px、高 18px、内边距 0 5px、圆角 9px，accent 实底白字 10px/字重 850。关闭按钮 30×30px 圆形，背景次表面色，内嵌 11px 叉号，aria-label "Close cart"。
- 免邮条：外边距 2px 18px 6px、内边距 10px 12px、圆角 12px，背景次表面色，10.5px/字重 750 次级墨色；达标时背景换 #10B981 的 14% 透明度、文字 #047857。进度条高 6px、上边距 7px、圆角 3px，底槽为第三表面色；填充为 accent，宽度 .6s cubic-bezier(.3,1.2,.5,1)、颜色 .3s 过渡，达标后变 #10B981。
- 商品行：内部行 flex、间距 10px、内边距 10px 6px、底部 1px 线色分隔。缩略块 46×52px、圆角 10px，背景是商品色到其 70% 混黑的 150deg 渐变。品名 12px/字重 850，规格 9.5px/字重 650 三级墨色。数量步进器圆角 8px、内嵌 1px 线色描边，减/加按钮各 24×24px、14px/字重 700 次级墨色（文案 − 和 +），数字宽至少 16px、11px/字重 850 等宽数字。右列纵向排布、间距 10px：行小计 11.5px/字重 850 等宽数字，移除按钮 22×22px、圆角 6px，12px 垃圾桶图标，悬停背景变次表面色、图标变 #E11D48。
- 底部：内边距 12px 16px 20px、上缘 1px 线色分隔。"Subtotal" 行 11px/字重 750 次级墨色，金额 18px/字重 900 等宽数字；Checkout 按钮宽 100%、高 44px、圆角 12px，accent 实底白字 13px/字重 850，上边距 10px。
- 小计金额逐位滚动：每位数字是 1.2em 高的取数窗，内叠 0–9 数字列，translateY 按 −1.2em × 位值切换，transform .45s cubic-bezier(.3,1.25,.5,1)；非数字字符（$、逗号）直接落位。
- 场景令牌浅色深色两套（`prefers-color-scheme: dark` 切换）：表面 #FFFFFF/#13141C、次表面 #F5F3EF/#1A1B25、第三表面 #EAE7E1/#252632、墨色 #16151B/#F4F0E8、次级墨色 #57535F/rgba(244,240,232,.68)、线色 rgba(22,21,27,.09)/rgba(255,255,255,.08)、accent #6A57F2/#B7A4FF。场景根继承宿主字体；全部按钮 focus-visible 外圈 2px accent、偏移 2px。

## 数据

- 写死三件商品（名称、规格、单价、数量、缩略色）：Linen shirt · Ivory · L · $39 · #E7E5E4；Half pants · Navy · M · $32 · #BFDBFE；Bucket hat · Beige · One size · $19 · #FDE68A。金额格式为 $ 加 en-US 千分位。
- 免邮门槛 $100：小计 ≥ $100 显示 "You've unlocked free shipping!"，否则显示 "$X more for free shipping"（金额加粗）。初始购物车已含 Half pants 与 Bucket hat 各 1 件；Linen shirt 通过 Add to cart 进入列表顶部。
- 数量范围 1–9：减到 1 后不再减，加到 9 后不再加；件数徽章等于所有行数量之和。

## 操作和动效

- Add to cart：首次点击把 Linen shirt 插到列表最顶并触发 1.2s ease 的闪烁动画（20% 进度处背景叠加 accent 12% 透明度）；再次点击改为把 Linen shirt 数量加 1（上限 9）并重播同一闪烁；两种情况都同时打开抽屉并刷新合计。
- 打开/关闭：抽屉 0.45s cubic-bezier(.3,1,.3,1) 自右滑入，遮罩 0.35s 淡入；打开后 300ms 把焦点移到关闭按钮，关闭时焦点归还 Add to cart。点遮罩、点关闭按钮或按 Escape 都会关闭；aria-hidden 同步切换。
- 数量步进：加减即时更新行内数字、行小计、件数徽章与小计。
- 移除：点击后行加入收起态——内行向右滑出 110%（transform .3s cubic-bezier(.5,0,.75,0)）、外层网格行高从 1fr 折到 0fr（.4s cubic-bezier(.3,.8,.3,1)，延迟 0.15s）并淡出（opacity .25s），600ms 后从 DOM 移除；合计同步刷新。
- 合计刷新：进度条宽度按 小计 ÷ $100 变化（封顶 100%），小计金额逐位滚动到新值，aria-label 同步为完整金额。
- 无障碍：抽屉 role="dialog" aria-modal="true"；免邮条 aria-live="polite"；步进与移除按钮带 "Decrease quantity" / "Increase quantity" / "<品名> remove" aria-label；遮罩与图标 aria-hidden。
- `prefers-reduced-motion` 下：抽屉、遮罩、行折叠、进度条、数字滚动的过渡全部移除，闪烁动画不播，移除立即生效、焦点切换无延迟；购物车内容与合计完全一致。

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| height | number | 480 | 场景高度，逻辑像素；窄容器整景按比例缩小 |
| reducedMotion | boolean | 跟随系统 | 覆盖系统的减少动态偏好 |

## 独立实现与六框架交付

- 仅凭本文从零生成可运行的实现。尺寸、颜色、文案、数据与运动参数均以上述文字为准；所有界面用 DOM 与 CSS 绘制，不加载远程图片、字体、视频或素材（商品图为纯渐变与剪影）。
- 当前交付重点为 React，组件名称 CartDrawer。从零创建四个文件：CartDrawer.tsx、CartDrawerEngine.js、motion-runtime.ts、CartDrawerEngine.d.ts；分别实现框架入口、完整交互核心、实例生命周期和类型声明。文件名是需要生成的产物，不假定接收者已经拥有任何文件。
- 同时提供 React、Vue、Svelte、Solid、Preact、Vanilla 原生生命周期入口，共享框架无关核心。DOM 仅在挂载后访问，支持同页多实例；更新选项不重挂载、状态保持，销毁时清理动画帧、计时器、观察器及监听器。不要用 iframe 代替组件实现。
- 依赖安装说明：npm install react react-dom。若使用依赖，只使用其公开 API；组件的布局、样式与算法必须在本次生成的文件中完整实现，不引用现成效果组件。
- 实现 options.height 以调整场景高度（默认 480），options.reducedMotion 覆盖系统偏好；减少动态时保留完整购物车状态与焦点管理。
- 给出每个文件的完整内容、安装和运行步骤、以下使用示例所需的全部实现。不得留省略号、待补素材或"自行补齐核心"的占位。
- 验收：375 / 768 / 1440px 无横向溢出；滑入、免邮达标与未达标、步进边界 1 与 9、移除、Escape 与遮罩关闭均正确；浅色深色两套令牌正确；多实例互不干扰，卸载后停止所有任务。

## 使用示例

```tsx
import { CartDrawer } from "./CartDrawer";

export default function App() {
  return <CartDrawer />;
}
```
