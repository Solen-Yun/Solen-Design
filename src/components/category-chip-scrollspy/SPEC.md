# 吸顶分类跟滚菜单 — CategoryChipScrollspy

一个 300×480 的外卖菜单场景：绿色渐变头图压一只奶黄碗形，下方店铺信息与评分，再往下一排分类胶囊吸顶——纵向滚动菜单正文时，当前分类胶囊自动点亮，一枚药丸底座在胶囊间滑动跟随，胶囊行自身也会把激活项滚到居中；点任一胶囊则整页平滑滚到对应区块并短暂锁定跟滚判定，避免中途高亮乱跳。

## 布局与材质

- 300×480px 场景，圆角 32px，溢出裁切，底色表面色，外圈 1px 线色描边加 0 30px 60px -36px 强阴影，文字墨色。响应式行为是整景等比缩放：容器窄于 300px 时按「可用宽度 ÷ 300」缩放（不超过 1 倍），内部不重排。
- 场景根内是铺满的纵向滚动区：overflow-y 自动、overscroll-behavior contain、滚动条隐藏、可聚焦（tabindex 0，aria-label "Menu"）；聚焦时外圈 2px accent 描边、偏移 -4px、圆角 32px。
- 头图高 150px，背景 150deg 线性渐变 #86EFAC → #22C55E；中央偏上（top 44%）压一只 96×56px 的碗形：背景 #FEFCE8、圆角 0 0 48px 48px、内嵌底部 10px 高的 #FDE68A 色带，水平居中。头图对辅助技术隐藏。
- 店铺信息块内边距 14px 18px 10px：店名 "Neighborhood Salad Bar" 18px/字重 900、字距 -0.03em；下一行 "★ 4.9 · Delivery 20–30 min · $12 minimum" 10.5px/字重 700、三级墨色、上边距 4px。
- 分类胶囊条 sticky 吸顶（top 0、z-index 2、背景表面色），吸住瞬间叠加 0 8px 16px -12px 强阴影，box-shadow 0.25s 过渡。内部胶囊行 flex、间距 4px、内边距 8px 14px 9px、横向可滚（滚动条隐藏）、底部 1px 线色分隔。胶囊高 32px、内边距 0 12px、圆角 999px、无底色、12px/字重 850、文字三级墨色、不换行，颜色 0.2s 过渡；当前项文字变墨色。药丸底座：绝对定位 bottom 6px、高 32px、圆角 999px，背景次表面色、内嵌 1px 线色描边，层级 -1（胶囊为 1），transform 与宽度各 0.35s cubic-bezier(.3,1.2,.5,1) 过渡——滑动跟随当前胶囊的位置与宽度。
- 菜单区块：内边距 14px 18px 4px；区块标题 14px/字重 900、下边距 6px。菜品行 flex、间距 12px、上下内边距 10px、底部 1px 线色分隔：左侧名称 12.5px/字重 800、价格 11.5px/字重 850 次级墨色（等宽数字、上边距 2px），右侧 58×58px 缩略块、圆角 14px，背景为分类色到其 60% 混白的 135deg 渐变。正文之后留 160px 空尾垫高。
- 场景令牌浅色深色两套（`prefers-color-scheme: dark` 切换）：表面 #FFFFFF/#13141C、次表面 #F5F3EF/#1A1B25、墨色 #16151B/#F4F0E8、次级墨色 #57535F/rgba(244,240,232,.68)、三级墨色 #8E8A97/rgba(244,240,232,.42)、线色 rgba(22,21,27,.09)/rgba(255,255,255,.08)、accent #6A57F2/#B7A4FF。胶囊 focus-visible 外圈 2px accent、偏移 -2px。

## 数据

- 写死 6 个分类、12 道菜（分类色依次 #FDBA74、#86EFAC、#FCA5A5、#FDE68A、#93C5FD、#F9A8D4）：Popular——Salmon poke $14.90、Chicken salad $11.90；Salads——Caesar salad $10.90、Cobb salad $12.50、Greek salad $11.50；Poke——Tuna poke $15.90、Tofu poke $12.90；Wraps——Chicken wrap $9.90、Avocado sandwich $10.50；Drinks——Lemonade $4.50、Kombucha $5.00；Desserts——Greek yogurt $4.90、Oat cookie $2.50。
- 店铺文案固定："Neighborhood Salad Bar" 与 "★ 4.9 · Delivery 20–30 min · $12 minimum"。分类胶囊不带计数。

## 操作和动效

- 跟滚高亮：scroll 监听（passive）实时计算——判定线取「吸顶条底缘 + 剩余可视高度 × 30%」处，激活最后一个顶边不超过该线的区块；滚到距底部 2px 以内时强制激活最后一组。吸顶判定：吸顶条顶边与滚动距离之差 ≤ 0.5px 即加吸住态。
- 药丸跟随：激活变化时把 aria-current 写到对应胶囊，药丸底座以 transform + 宽度两个 0.35s cubic-bezier(.3,1.2,.5,1) 过渡滑到该胶囊下方；同时胶囊行把激活项滚向居中——目标 scrollLeft = 胶囊 offsetLeft − (行宽 − 胶囊宽) ÷ 2，钳制在 [0, scrollWidth − 行宽]，用 320ms、缓出曲线 1−(1−k)³ 逐帧插值。
- 点击胶囊：先立即切换高亮与药丸，再锁定跟滚判定 700ms（防止平滑滚动途中乱跳），整页以 600ms easeInOutQuad 平滑滚到「区块顶边 − 吸顶条高 + 2px」处。
- 初始：挂载后先按 0 号分类布好药丸，再在下一帧重测布局并执行一次跟滚判定，保证图片级布局完成后位置正确。
- 键盘与无障碍：滚动区 tabindex 0、aria-label "Menu"；胶囊为原生 button，nav aria-label "Menu categories"，每个胶囊 aria-controls 指向对应区块的唯一 id，当前项 aria-current="true"；头图、空尾与药丸底座 aria-hidden。
- `prefers-reduced-motion` 下：药丸与吸顶阴影的过渡移除，点击后的平滑滚动与胶囊行居中插值压缩为瞬时跳位，锁定时间归零；高亮、跳转与吸顶行为全部保留。

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| height | number | 480 | 场景高度，逻辑像素；窄容器整景按比例缩小 |
| reducedMotion | boolean | 跟随系统 | 覆盖系统的减少动态偏好 |

## 独立实现与六框架交付

- 仅凭本文从零生成可运行的实现。尺寸、颜色、文案、数据与运动参数均以上述文字为准；所有界面用 DOM 与 CSS 绘制，不加载远程图片、字体、视频或素材（缩略图为纯渐变色块）。
- 当前交付重点为 React，组件名称 CategoryChipScrollspy。从零创建四个文件：CategoryChipScrollspy.tsx、CategoryChipScrollspyEngine.js、motion-runtime.ts、CategoryChipScrollspyEngine.d.ts；分别实现框架入口、完整交互核心、实例生命周期和类型声明。文件名是需要生成的产物，不假定接收者已经拥有任何文件。
- 同时提供 React、Vue、Svelte、Solid、Preact、Vanilla 原生生命周期入口，共享框架无关核心。DOM 仅在挂载后访问，支持同页多实例；更新选项不重挂载、状态保持，销毁时清理动画帧、计时器、观察器及监听器。不要用 iframe 代替组件实现。
- 依赖安装说明：npm install react react-dom。若使用依赖，只使用其公开 API；组件的布局、样式、跟滚算法必须在本次生成的文件中完整实现，不引用现成效果组件。
- 实现 options.height 以调整场景高度（默认 480），options.reducedMotion 覆盖系统偏好；减少动态时高亮与跳转仍然正确。
- 给出每个文件的完整内容、安装和运行步骤、以下使用示例所需的全部实现。不得留省略号、待补素材或"自行补齐核心"的占位。
- 验收：375 / 768 / 1440px 无横向溢出；跟滚高亮、点击跳转、吸顶阴影、滚底强制末组均正确；浅色深色两套令牌正确；多实例互不干扰，卸载后停止所有任务。

## 使用示例

```tsx
import { CategoryChipScrollspy } from "./CategoryChipScrollspy";

export default function App() {
  return <CategoryChipScrollspy />;
}
```
