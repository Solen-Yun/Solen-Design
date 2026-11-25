# 未保存更改提示条 — UnsavedChangesBar

一个 340×340 的后台设置页场景：顶部一排 General / Orders / Products 导航链接，表单区有店名输入框、库存提醒开关和四枚品牌色圆点；一旦任何字段偏离已保存基线，屏幕顶端落下一根墨色提示条——「Unsaved changes: N」加 Discard 与 Save 两枚按钮。试图在未保存时点其他导航，提示条变红摇晃并改成「Save or discard first」同时聚焦 Save；保存走 750ms 转圈后短暂变绿显示 Saved 再收回；放弃则回滚各字段并让被还原的控件闪一圈琥珀描边。

## 布局与材质

- 340×340px 场景，圆角 30px，溢出裁切，底色表面色，外圈 1px 线色描边加 0 30px 60px -36px 强阴影，文字墨色。响应式行为是整景等比缩放：容器窄于 340px 时按「可用宽度 ÷ 340」缩放（不超过 1 倍），内部不重排。
- 顶部导航：铺满宽、高 54px、flex 间距 4px、内边距 0 16px、底部 1px 线色分隔。链接内边距 7px 11px、圆角 9px、12px/字重 800、三级墨色、无下划线；带 aria-current 的当前项背景次表面色、文字墨色。三项文案：General（当前）、Orders、Products。
- 表单区：绝对定位 left/right 18px、top 70px。字段标签 11px/字重 800 次级墨色。店名输入框：高 40px、宽 100%、上边距 6px、内边距 0 12px、圆角 11px、背景次表面色、内嵌 1.5px 线色描边、12.5px/字重 700、无外框；聚焦时内嵌描边变 2px accent。
- 开关行：上边距 16px、内边距 12px、圆角 13px、背景次表面色、flex 居中间距 10px。左侧标题 "Low stock alerts" 12px/字重 850，说明 "Notify me when 5 or fewer are left" 上边距 1px、10px/字重 650 三级墨色。开关按钮 40×24px、圆角 12px，背景第三表面色（0.2s 过渡）；18px 白色圆钮停在 left 3px、top 3px，投影 0 1px 3px rgba(0,0,0,.25)，位移 0.25s cubic-bezier(.3,1.5,.5,1)；选中态背景变 accent、圆钮右移 16px。
- 品牌色：标签 "Brand color" 上边距 16px；色板行 flex 间距 8px、上边距 7px。四枚 30×30px 圆点（#E11D48、#F59E0B、#10B981、#6366F1），内嵌 2px rgba(255,255,255,.4) 描边；选中态放大 1.1 倍并换描边为 0 0 0 2px 表面色加 0 0 0 4px 墨色，缩放 0.2s cubic-bezier(.3,1.6,.5,1)、描边 0.2s 过渡。
- 提示条：绝对定位 left/right 8px、top 8px、层级 3，高 44px、内边距 0 6px 0 14px、圆角 14px，墨色实底、文字取表面色、11.5px/字重 800，flex 居中间距 6px；平时 translateY(-140%) 藏在场外，出现时归位（transform 0.45s cubic-bezier(.3,1.3,.5,1)、背景 0.3s 过渡）。文案 span 占满剩余宽度、单行省略。Discard 按钮：高 32px、内边距 0 12px、圆角 9px，背景为表面色 14% 透明度、文字取表面色。Save 按钮：最小宽 52px、表面色实底、墨色文字，内含 13px 圆形转圈（2px 描边，墨色 25% 透明度、顶边实墨色，0.7s linear 无限旋转）与文字二选一显示。告警态背景 #BE123C 并左右摇晃（0.45s，20%/60% 处 −6px、40%/80% 处 +6px）；成功态背景 #059669 且两枚按钮 visibility 隐藏。
- 场景令牌浅色深色两套（`prefers-color-scheme: dark` 切换）：表面 #FFFFFF/#13141C、次表面 #F5F3EF/#1A1B25、第三表面 #EAE7E1/#252632、墨色 #16151B/#F4F0E8、次级墨色 #57535F/rgba(244,240,232,.68)、三级墨色 #8E8A97/rgba(244,240,232,.42)、线色 rgba(22,21,27,.09)/rgba(255,255,255,.08)、accent #6A57F2/#B7A4FF。全部按钮与链接 focus-visible 外圈 2px accent、偏移 2px。

## 数据

- 初始已保存基线：店名 "Daily Florist"、库存提醒关、品牌色第 0 枚（#E11D48）。可改字段共三个：店名文本、开关布尔、色板下标。
- 固定文案："Unsaved changes: N"（N 为偏离字段数）、拦截提示 "Save or discard first"、成功提示 "Saved"；导航 General / Orders / Products；开关说明 "Notify me when 5 or fewer are left"。

## 操作和动效

- 改动检测：输入框 input 事件、开关点击、色板点击都会更新「当前值」并与基线逐字段比对；偏离字段数 > 0 时提示条落下、Discard 与 Save 的 tabIndex 从 -1 放开为 0，归零时收回并重新禁入 tab 序。文案实时改为 "Unsaved changes: N"。
- 导航拦截：点击任意导航链接一律 preventDefault（页面从不切换）；若无未保存更改则静默返回，否则文案换成 "Save or discard first"、提示条重播摇晃动画并变 #BE123C，同时把焦点移到 Save 按钮；1600ms 后若仍是告警态则恢复计数文案与墨色底。
- 放弃：把当前值整体回滚为基线并重绘控件；刚才偏离过的每个控件（输入框 / 开关 / 原选中色板）重播 0.8s ease 的琥珀闪烁动画（25% 处描边 0 0 0 3px、#F59E0B 60% 透明度），随后恢复计数判断。
- 保存：点击后按钮进入忙碌态（文字隐藏、转圈显示）持续 750ms，期间重复点击无效；结束后基线更新为当前值、提示条变绿显示 "Saved"，再过 900ms 提示条收回、两按钮 tabIndex 回 -1。
- 无障碍：提示条 role="status"；开关 role="switch" aria-checked aria-label "Low stock alerts"；色板 role="radiogroup" 内四个 role="radio"（aria-label 为「色值 color」）；导航 aria-current="page"。
- `prefers-reduced-motion` 下：提示条升降、开关圆钮、色板缩放的过渡移除，摇晃与琥珀闪烁动画不播；计数、拦截聚焦、保存/放弃的状态流转完全一致。

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| height | number | 340 | 场景高度，逻辑像素；窄容器整景按比例缩小 |
| reducedMotion | boolean | 跟随系统 | 覆盖系统的减少动态偏好 |

## 独立实现与六框架交付

- 仅凭本文从零生成可运行的实现。尺寸、颜色、文案、数据与运动参数均以上述文字为准；所有界面用 DOM 与 CSS 绘制，不加载远程图片、字体、视频或素材。
- 当前交付重点为 React，组件名称 UnsavedChangesBar。从零创建四个文件：UnsavedChangesBar.tsx、UnsavedChangesBarEngine.js、motion-runtime.ts、UnsavedChangesBarEngine.d.ts；分别实现框架入口、完整交互核心、实例生命周期和类型声明。文件名是需要生成的产物，不假定接收者已经拥有任何文件。
- 同时提供 React、Vue、Svelte、Solid、Preact、Vanilla 原生生命周期入口，共享框架无关核心。DOM 仅在挂载后访问，支持同页多实例；更新选项不重挂载、状态保持，销毁时清理动画帧、计时器、观察器及监听器。不要用 iframe 代替组件实现。
- 依赖安装说明：npm install react react-dom。若使用依赖，只使用其公开 API；组件的布局、样式与脏状态算法必须在本次生成的文件中完整实现，不引用现成效果组件。
- 实现 options.height 以调整场景高度（默认 340），options.reducedMotion 覆盖系统偏好；减少动态时保存、拦截、放弃流程不变。
- 给出每个文件的完整内容、安装和运行步骤、以下使用示例所需的全部实现。不得留省略号、待补素材或"自行补齐核心"的占位。
- 验收：375 / 768 / 1440px 无横向溢出；计数、导航拦截与聚焦、保存忙碌与成功态、放弃还原与闪烁均正确；浅色深色两套令牌正确；多实例互不干扰，卸载后停止所有任务。

## 使用示例

```tsx
import { UnsavedChangesBar } from "./UnsavedChangesBar";

export default function App() {
  return <UnsavedChangesBar />;
}
```
