# 方案对比表 — PlanCompareTable

一张 300×480 的价格方案对比卡：顶部左侧标题「Compare plans」，右侧一枚「Differences only」开关；下方是可滚动的对比表，表头钉在滚动区顶部，三列方案分别是 Free $0、Pro $9（角标 Popular）、Team $19，各带一枚「Choose」按钮，表体按 Basics、Collaboration、Security、Support 四组列出功能项，单元格写文字（3、Unlimited、5GB）或打勾/横线。指针扫过任意单元格时整列泛出一层淡强调色，并高亮该列表头的「Choose」；打开「Differences only」后，三个方案完全一致的功能行会收起，整组都一致的分组（比如 Support）会整体消失。

## 布局与材质

- 场景卡为 300×480px 的 div，圆角 32px，overflow 裁切，底色表面色，外圈 1px 线色描边（0 0 0 1px），下方 0 30px 60px -36px 强阴影。
- 场景令牌用 `light-dark()` 给浅色与深色两套：表面 #FFFFFF / #13141C，次表面 #F5F3EF / #1A1B25，三级表面 #EAE7E1 / #252632，主墨 #16151B / #F4F0E8，次墨 #57535F / rgba(244,240,232,.68)，弱墨 #8E8A97 / rgba(244,240,232,.42)，线 rgba(22,21,27,.09) / rgba(255,255,255,.08)，强线 rgba(22,21,27,.17) / rgba(255,255,255,.16)，强调色 #6A57F2 / #B7A4FF，次强调 #2F8FE0 / #7DB4FF，强调柔光 rgba(106,87,242,.12) / rgba(183,164,255,.15)，强调字色 #FFFFFF / #0B0C12，薄荷 #119C72 / #7EE8C0，警示 #D6731E / #FFB26B，危险 #D93A55 / #FF7D8C，玻璃 rgba(255,255,255,.58) / rgba(255,255,255,.07)，玻璃线 rgba(255,255,255,.85) / rgba(255,255,255,.18)，阴影 rgba(40,30,80,.14) / rgba(0,0,0,.45)，强阴影 rgba(40,30,80,.3) / rgba(0,0,0,.72)，渐变 120deg 的 #7B61FF→#3D8BFF 55%→#1FB89A（深色为 #B7A4FF→#7DB4FF 55%→#A5F2D3）。字体沿用宿主，组件不声明字体族。
- 顶栏位于左 18px、右 16px、上 20px，一行居中对齐。标题「Compare plans」17px/字重 900/字距 -.03em，并把右侧的开关顶到边上。开关是内联 flex、间距 7px、高 28px、内边距 0 4px 0 10px、圆角 999px、底色次表面色、内描边 1px 线色、文字 10.5px/字重 800/次墨色的原生按钮，文案「Differences only」；右侧是 28×18px、圆角 9px 的滑槽（底色三级表面色，过渡 0.2s），槽内一枚 14px 白色圆钮带 0 1px 2px rgba(0,0,0,.25) 投影，闲置时贴在左侧（left 2px、top 2px），开启后滑到右侧（位移 10px），位移过渡 0.25s cubic-bezier(.3,1.5,.5,1)；开启时滑槽底色换成强调色。聚焦时 2px 强调色外框、偏移 2px。
- 表格区占左 0、右 0、上 62px 到卡底，纵向可滚动（overscroll-behavior 限在自身），滚动条隐藏，内边距 0 10px 20px，聚焦时 2px 强调色外框、偏移 -3px。表格每一行是 1fr + 56px + 56px + 56px 的四列网格，垂直居中：第一列放功能名，其余三列对应 Free、Pro、Team。
- 表头行 position sticky 钉在滚动区顶部（z-index 2），底色表面色，内边距 6px 0 8px，下方一道 1px 线色阴影。三个方案格纵向排列：方案名 12px/字重 900，价格 9.5px/字重 800/弱墨色/等宽数字，再下面是一枚「Choose」按钮（外距 4px、高 22px、内边距 0 9px、圆角 999px、内描边 1px 线色、9.5px/字重 850、行高 22px、次墨色，背景/文字/描边各 0.2s 过渡）。Pro 方案格上方另有一枚角标「Popular」：绝对定位在 top -1px，内边距 1px 6px、圆角 999px、底色强调色、白字、8.5px/字重 850。表头格圆角 12px 12px 0 0。
- 功能分组标题内边距 14px 6px 4px，10px/字重 850/字距 .06em/强调色。功能行最小高 34px，下边框 1px 线色，功能名左内距 6px、11px/字重 700/次墨色。
- 单元格纵向 10.5px/字重 800、内容居中、背景过渡 0.2s。图标为 13×13 的内联 SVG：对勾是折线路径 M3 7.5l2.6 2.6L11 4.5（描边 2.2px，色 #10B981），横线是 M4 7h6（描边 2px，色弱墨色且不透明度 0.6）。文字单元格直接写数值或单位词。
- 列高亮：指针所在列的所有单元格底色换成强调色 9% 混透明；同一列表头的「Choose」按钮底色变主墨色、文字变表面色、内描边去掉。
- 分组与行的收起用 grid 行高过渡：`grid-template-rows` 在 1fr 与 0fr 之间切换，过渡 0.45s cubic-bezier(.3,.8,.3,1)，同时透明度过渡 0.3s；收起后透明度归零并被隐藏。
- 页面容器在窄容器里整景等比缩小，缩放系数为 min(1, 可用宽度 ÷ 场景宽度)。

## 数据

- 三个方案写死：Free $0、Pro $9、Team $19；Pro 带角标「Popular」；三列的按钮文字统一是「Choose」。
- 四个分组共十二行功能项，数值列依次对应 Free / Pro / Team：
  - Basics：Projects = 3 / Unlimited / Unlimited；Storage = 5GB / 100GB / 1TB；File uploads = 含 / 含 / 含。
  - Collaboration：Live editing = 含 / 含 / 含；Comments & mentions = 含 / 含 / 含；Guest invites = 无 / 含 / 含；Team spaces = 无 / 无 / 含。
  - Security：Two-factor auth = 含 / 含 / 含；SSO sign-in = 无 / 无 / 含；Audit logs = 无 / 无 / 含。
  - Support：Help center = 含 / 含 / 含；Email support = 含 / 含 / 含。
- 三方案取值完全一致（三个打勾）的行有六条：File uploads、Live editing、Comments & mentions、Two-factor auth、Help center、Email support。Support 组两行都属于这一类，因此开启「Differences only」后该组整组消失。
- 对勾与横线各有一份内联 SVG 定义，共用同一尺寸与描边规格。

## 操作和动效

- 指针在表格上移动（pointermove）或划过（pointerover）时，取事件目标最近的功能格，解析出它是第 1、2、3 列，把列号写到根节点上：对应列整列泛淡强调色、该列表头的「Choose」反白成深色实心。指针移出滚动区后清空高亮。
- 点击「Differences only」开关：开关在关闭与开启之间切换并同步 aria-checked。开启时，三方案取值完全一致的功能行逐行收起（高度过渡 + 透明度淡出），收完后如果某个分组一行都没剩下，这个分组整体收起；关闭时全部恢复。行与分组在收起状态下同时被标记为对辅助技术隐藏。
- 表头始终钉在滚动区顶部，滚动时方案名与价格始终可见。
- `prefers-reduced-motion` 下：分组与行的收起过渡关闭，切换开关时行与分组直接出现或消失；列高亮与「Choose」反白仍然生效。
- 无障碍：开关是 `role="switch"` 的按钮并带 aria-checked；表格滚动区可聚焦（tabindex 0）并带 aria-label「Plan feature comparison」；打勾与横线图标各带 `role="img"` 与 aria-label（分别为 Included、Not included），文字单元格直接朗读；收起的行与分组带 aria-hidden。

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| height | number | 480 | 场景高度，逻辑像素；窄容器整景按比例缩小 |
| reducedMotion | boolean | 跟随系统 | 覆盖系统的减少动态偏好 |

## 独立实现与六框架交付

- 仅凭本文从零生成可运行的实现。尺寸、颜色、文案、图形和运动算法均以上述文字为准；所有装饰用 CSS 与内联 SVG 绘制，不加载远程图片、字体、视频或素材。
- 当前交付重点为 React，组件名称 PlanCompareTable。从零创建四个文件：PlanCompareTable.tsx、PlanCompareTableEngine.js、motion-runtime.ts、PlanCompareTableEngine.d.ts；分别实现框架入口、完整交互核心、实例生命周期和类型声明。文件名是需要生成的产物，不假定接收者已经拥有任何文件。
- 同时提供 React、Vue、Svelte、Preact、Vanilla 原生生命周期入口，共享框架无关核心。DOM 仅在挂载后访问，支持同页多实例；更新时保持状态，销毁时清理动画、计时器、观察器及监听器。不要用 iframe 代替组件实现。
- 依赖安装说明：npm install react react-dom。若使用依赖，只使用其公开 API；组件的布局、样式、图形和算法必须在本次生成的文件中完整实现，不引用现成效果组件。
- 实现 options.height 以调整场景高度，options.reducedMotion 覆盖系统偏好；减少动态效果仍保留完整的功能项、方案与过滤结果。
- 给出每个文件的完整内容、安装和运行步骤、以下使用示例所需的全部实现。不得留省略号、待补素材或"自行补齐核心"的占位。
- 验收：375 / 768 / 1440px 无横向溢出；表头钉住随滚动；列高亮与表头反白正确；「Differences only」过滤后一致的行与整组都收起；浅色深色两套令牌正确；多实例互不干扰，卸载后停止所有任务。

## 使用示例

```tsx
import { PlanCompareTable } from "./PlanCompareTable";

export default function App() {
  return <PlanCompareTable />;
}
```
