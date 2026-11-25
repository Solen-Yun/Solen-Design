# 功能投票排序板 — FeatureVoteBoard

一块 340×340 的需求投票看板：标题区写「What we build next / We build in order of votes」，右侧一枚墨色「+ Suggest」胶囊；下方五条需求行按票数降序排布，每行左侧是一枚带箭头与票数的投票按钮，中部是需求名与彩色状态徽章（圆点 + 文案），行尾是当前排名 #1–#5。点击投票按钮即切换投票态：票数上下滑换、箭头小跳、一枚 accent 色「+1」向上飘散，260ms 后整列按新票数用 FLIP 重排，被超过的行带着投影下沉让位。

## 布局与材质

- 340×340px 场景，圆角 30px，溢出裁切，底色表面色，外圈 1px 线色描边加 0 30px 60px -36px 强阴影，文字墨色。响应式行为是整景等比缩放：容器窄于 340px 时按「可用宽度 ÷ 340」缩放（不超过 1 倍），内部不重排。
- 头部：绝对定位 left 20px、right 18px、top 20px。左侧标题 "What we build next" 16px/字重 900、字距 -0.03em；副题 "We build in order of votes" 上边距 3px、10.5px/字重 650、三级墨色。右侧「+ Suggest」胶囊：高 28px、内边距 0 11px、圆角 999px、墨色实底、文字取表面色、10.5px/字重 850，不可点击（纯展示）。
- 列表：有序列表，绝对定位 left/right 14px、top 74px，无内边距与行标数字样式。
- 需求行：高 46px、下边距 6px、内边距 0 10px 0 6px、圆角 14px，背景次表面色、内嵌 1px 线色描边，行内 flex 居中、间距 11px。换位中的行临时抬层级并叠加 0 12px 24px -12px 强投影。
- 投票按钮：40×36px、圆角 10px、背景表面色、内嵌 1px 线色描边、文字次级墨色，纵向 flex 居中：一枚 11px 的上箭头（2px 圆头描边）压着一个 13px 高的票数取数窗（11px/字重 900、行高 13px、等宽数字、溢出裁切）。背景、文字、描边均 0.2s 过渡；已投票态：背景 accent 实底、白字、描边消失，箭头整体上移 1px。
- 需求名 12.5px/字重 850，单行溢出省略；下方状态徽章：内联 flex、间距 4px、上边距 3px、9.5px/字重 800，行首一枚 6×6px 圆点，文字与圆点同色。
- 排名角标：10px/字重 850、三级墨色、等宽数字，文案 #1–#5。
- 场景令牌浅色深色两套（`prefers-color-scheme: dark` 切换）：表面 #FFFFFF/#13141C、次表面 #F5F3EF/#1A1B25、墨色 #16151B/#F4F0E8、次级墨色 #57535F/rgba(244,240,232,.68)、三级墨色 #8E8A97/rgba(244,240,232,.42)、线色 rgba(22,21,27,.09)/rgba(255,255,255,.08)、accent #6A57F2/#B7A4FF。投票按钮 focus-visible 外圈 2px accent、偏移 2px。

## 数据

- 写死五条需求（名称、初始票数、状态）：Google Calendar sync · 42 · In progress (#2563EB)；Dark mode calendar · 39 · Planned (#7C3AED)；Home screen widget · 37 · Under review (#D97706)；Export to CSV · 37 · Under review (#D97706)；Per-team permissions · 22 · Received (#64748B)。状态共四种颜色。
- 并列票数按初始顺序稳定排序：Home screen widget 在 Export to CSV 之前。排名角标按当前序位写 #1–#5。无新增需求入口。

## 操作和动效

- 投票（切换语义）：点击投票按钮在「投/撤」之间切换——已投时票数回到初始值、按钮退出 accent 态；未投时票数 = 初始值 + 1。aria-pressed 与 aria-label（"<名称>, N votes, vote / remove vote"）同步。
- 票数滚动：换数时旧数字向对侧滑出、新数字滑入（各位移 ±100%，transform 0.35s cubic-bezier(.3,1.4,.5,1)），360ms 后清理旧节点；投上时新数自下滑入、旧数向上滑出，撤票反向。
- 投票反馈：仅「投上」且未减动态时——箭头播 0.45s cubic-bezier(.3,1.6,.5,1) 的小跳（40% 处上移 5px），按钮顶缘（上边 -4px、水平居中）浮出一枚 accent 色 "+1"（10px/字重 900），0.8s ease-out 内上飘 18px 并淡出，820ms 后移除，aria-hidden。
- FLIP 重排：投票后延迟 260ms 重排——按票数降序（并列保持原序）重挂列表，换位前先测各行 offsetTop，挂完后把每行 translateY 反向回置原视觉位，强制重排后以 transform 0.55s cubic-bezier(.3,1.25,.5,1) 归位；向下移动的行在动画期间带投影（560ms 后摘除）；排名角标即时更新。
- 无障碍：列表为 ol 语义；投票按钮为原生 button，带 aria-pressed 与动态 aria-label；"+1" 飘字与箭头 aria-hidden。
- `prefers-reduced-motion` 下：行换位、票数滚动、箭头跳动的过渡与动画全部移除——票数直接换文本、顺序直接重挂、无 "+1" 飘字；排序结果与排名与正常模式完全一致。

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| height | number | 340 | 场景高度，逻辑像素；窄容器整景按比例缩小 |
| reducedMotion | boolean | 跟随系统 | 覆盖系统的减少动态偏好 |

## 独立实现与六框架交付

- 仅凭本文从零生成可运行的实现。尺寸、颜色、文案、数据与运动参数均以上述文字为准；所有界面用 DOM 与 CSS 绘制，不加载远程图片、字体、视频或素材。
- 当前交付重点为 React，组件名称 FeatureVoteBoard。从零创建四个文件：FeatureVoteBoard.tsx、FeatureVoteBoardEngine.js、motion-runtime.ts、FeatureVoteBoardEngine.d.ts；分别实现框架入口、完整交互核心、实例生命周期和类型声明。文件名是需要生成的产物，不假定接收者已经拥有任何文件。
- 同时提供 React、Vue、Svelte、Solid、Preact、Vanilla 原生生命周期入口，共享框架无关核心。DOM 仅在挂载后访问，支持同页多实例；更新选项不重挂载、状态保持，销毁时清理动画帧、计时器、观察器及监听器。不要用 iframe 代替组件实现。
- 依赖安装说明：npm install react react-dom。若使用依赖，只使用其公开 API；组件的布局、样式、FLIP 算法必须在本次生成的文件中完整实现，不引用现成效果组件。
- 实现 options.height 以调整场景高度（默认 340），options.reducedMotion 覆盖系统偏好；减少动态时排序与投票状态不变。
- 给出每个文件的完整内容、安装和运行步骤、以下使用示例所需的全部实现。不得留省略号、待补素材或"自行补齐核心"的占位。
- 验收：375 / 768 / 1440px 无横向溢出；投票与撤票、并列排序稳定性、FLIP 换位与排名更新均正确；浅色深色两套令牌正确；多实例互不干扰，卸载后停止所有任务。

## 使用示例

```tsx
import { FeatureVoteBoard } from "./FeatureVoteBoard";

export default function App() {
  return <FeatureVoteBoard />;
}
```
