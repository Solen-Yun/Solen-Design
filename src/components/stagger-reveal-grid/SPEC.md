# 卡片错峰入场栅格 — StaggerRevealGrid

一个 300×480 的营销特性区滚动场景：小号 accent 眉题 Features、大标题「Why teams are switching」带一条会从左向右展开的 accent 下划线、一句副题；往下是两列三行共六张特性卡（彩色图标片 + 标题 + 说明），滚动进入视口时卡片自下淡入上浮、图标从 0.4 倍弹性放大、右列比左列晚 90ms 错峰入场；底部一枚墨色「Get started」胶囊。元素从底部滚出视口后状态复位，再次滚入会重播一遍入场。

## 布局与材质

- 300×480px 场景，圆角 32px，溢出裁切，底色表面色，外圈 1px 线色描边加 0 30px 60px -36px 强阴影，文字墨色。响应式行为是整景等比缩放：容器窄于 300px 时按「可用宽度 ÷ 300」缩放（不超过 1 倍），内部不重排。
- 场景根内是铺满的纵向滚动区：overflow-y 自动、overscroll-behavior contain、滚动条隐藏、可聚焦（tabindex 0，aria-label "Features section"）；聚焦时外圈 2px accent 描边、偏移 -4px、圆角 32px。
- 头部：内边距 36px 20px 6px。眉题 "Features" 10px/字重 850、字距 0.08em、accent 色；主标题 "Why teams are switching" 22px/行高 1.2、字重 900、字距 -0.04em、内联块、上边距 8px，其下 -3px 处压一条高 5px、圆角 3px 的下划线（accent 35% 透明度），入场时从左向右展开（transform .8s cubic-bezier(.2,.8,.2,1)，延迟 0.2s，transform-origin 左中）。副题 "A screen that feels familiar from day one, with features that grow only as needed." 上边距 12px、11.5px/行高 1.55、字重 600、次级墨色。
- 栅格：两列等宽（1fr 1fr）、间距 10px、内边距 14px 16px 0。特性卡：内边距 14px 12px、圆角 18px、背景次表面色、内嵌 1px 线色描边、最小高 118px。入场前透明度 0、translateY(26px) 缩放 0.97；入场过渡透明度 0.5s、位移与缩放 0.7s cubic-bezier(.2,.8,.2,1)，延迟按列错峰——左列 0s、右列 0.09s（CSS 变量 --d 注入）。
- 图标片：34×34px、圆角 11px、白底图标居中（17×17px、约 1.6–1.8 圆头描边的内联 SVG）；入场前缩放 0.4，入场时以 transform 0.55s cubic-bezier(.3,1.7,.5,1) 弹性放大回 1，延迟为所在卡延迟再加 0.18s。卡标题上边距 12px、13px/字重 850；说明上边距 3px、10.5px/行高 1.4、字重 600、三级墨色。
- 底部：内边距 22px 16px 34px、文字居中；「Get started」为纯展示胶囊（span，非按钮）：内边距 10px 20px、圆角 999px、墨色实底、文字取表面色、12px/字重 850，不参与入场。
- 场景令牌浅色深色两套（`prefers-color-scheme: dark` 切换）：表面 #FFFFFF/#13141C、次表面 #F5F3EF/#1A1B25、墨色 #16151B/#F4F0E8、次级墨色 #57535F/rgba(244,240,232,.68)、三级墨色 #8E8A97/rgba(244,240,232,.42)、线色 rgba(22,21,27,.09)/rgba(255,255,255,.08)、accent #6A57F2/#B7A4FF。

## 数据

- 写死六张特性卡（标题、说明、图标片色、图形）：Fast search · Every doc in 0.1 s · #6366F1 · 放大镜；Live editing · Write together, see it instantly · #EC4899 · 铅笔；Auto backup · Undo any mistake · #10B981 · 逆时针恢复箭头；Permissions · Views split by team · #F59E0B · 挂锁；Dark mode · Easy on the eyes at night · #0EA5E9 · 月牙；40 integrations · Keep your tools · #8B5CF6 · 三节点连线图。
- 文案另有眉题 "Features"、主标题 "Why teams are switching"、副题与 "Get started"，全部固定。

## 操作和动效

- 触发：以滚动区为 root 的 IntersectionObserver（threshold 0.18）观察眉题、标题头部与六张卡（共 8 个 data-rv 元素）；可见比例达 18% 即加入入场态。
- 入场编排：卡片淡入上浮（透明度 0.5s、位移缩放 0.7s cubic-bezier(.2,.8,.2,1)）按左右列错峰 90ms；标题下划线在入场 0.2s 后用 0.8s 从左向右展开；图标在卡片入场 0.18s 后以 0.55s cubic-bezier(.3,1.7,.5,1) 弹性放大。
- 重播规则：元素从视口底部离开（其底边低于 root 底缘）时移除入场态，再次滚入即重播；从顶部离开（向上滚过头）则保持已入场状态、不重置。
- 兜底：环境不支持 IntersectionObserver 时所有元素直接进入入场态。
- 键盘与无障碍：滚动区 tabindex 0、aria-label "Features section"，键盘聚焦后可方向键滚动；图标 SVG aria-hidden；「Get started」为非交互文案。
- `prefers-reduced-motion`（或 options.reducedMotion）下：入场态直接一次性加上——卡片、图标、下划线无过渡地呈现最终状态；不挂观察器。

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| height | number | 480 | 场景高度，逻辑像素；窄容器整景按比例缩小 |
| reducedMotion | boolean | 跟随系统 | 覆盖系统的减少动态偏好 |

## 独立实现与六框架交付

- 仅凭本文从零生成可运行的实现。尺寸、颜色、文案、数据与运动参数均以上述文字为准；所有界面用 DOM、CSS 与内联 SVG 绘制，不加载远程图片、字体、视频或素材。
- 当前交付重点为 React，组件名称 StaggerRevealGrid。从零创建四个文件：StaggerRevealGrid.tsx、StaggerRevealGridEngine.js、motion-runtime.ts、StaggerRevealGridEngine.d.ts；分别实现框架入口、完整交互核心、实例生命周期和类型声明。文件名是需要生成的产物，不假定接收者已经拥有任何文件。
- 同时提供 React、Vue、Svelte、Solid、Preact、Vanilla 原生生命周期入口，共享框架无关核心。DOM 仅在挂载后访问，支持同页多实例；更新选项不重挂载、状态保持，销毁时清理动画帧、计时器、观察器及监听器。不要用 iframe 代替组件实现。
- 依赖安装说明：npm install react react-dom。若使用依赖，只使用其公开 API；组件的布局、样式与观察器逻辑必须在本次生成的文件中完整实现，不引用现成效果组件。
- 实现 options.height 以调整场景高度（默认 480），options.reducedMotion 覆盖系统偏好；减少动态时内容完整可见。
- 给出每个文件的完整内容、安装和运行步骤、以下使用示例所需的全部实现。不得留省略号、待补素材或"自行补齐核心"的占位。
- 验收：375 / 768 / 1440px 无横向溢出；入场错峰、下划线展开、底部滚出后重播、顶部滚出不重置均正确；浅色深色两套令牌正确；多实例互不干扰，卸载后停止所有任务。

## 使用示例

```tsx
import { StaggerRevealGrid } from "./StaggerRevealGrid";

export default function App() {
  return <StaggerRevealGrid />;
}
```
