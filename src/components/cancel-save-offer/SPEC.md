# 退订挽留对话框 — CancelSaveOffer

制作一张 340×340 的订阅退订挽留场景。底层是订阅管理页：标题 "Subscription"，下方一张 Pro plan 卡片（徽标位、价格 $9 /mo、"Next charge Nov 14"、两条灰色骨架占位条），页面底部是一枚下划线的 "Cancel subscription" 链接。点它后遮罩压暗、底层模糊，居中弹出一张 262px 高的模态卡；第一步问 "Why are you leaving?" 并列出四个单选理由，选中后 Next 才可点；第二步按所选理由给出挽留方案（理由是价格 → 五折三个月，其他理由 → 停缴一个月），可接受优惠也可点 "Cancel anyway" 坚持退订；第三步是一个描边打勾的圆，宣布"你留下了"或"退订已安排"；1.5 秒后模态自动关闭，订阅卡片上的圆角徽标翻成 Discounted / Paused / Ends Nov 14，价格在保留优惠时从 $9 改为 $4.50 并把原价划掉。

## 布局与材质

- 340×340px 场景卡，圆角 30px，overflow 裁切。底色为表面色纯色（无纹理），外圈 1px 线色描边（`0 0 0 1px`），下方 `0 30px 60px -36px` 强阴影。
- 底层页面层绝对铺满（inset 0），内边距 22px 20px，过渡 filter 0.3s；模态打开时整层 `filter: blur(2px)`。标题 "Subscription" 为 17px / 字重 900 / 字距 -0.03em。
- 订阅卡片：上外边距 14px，内边距 16px，圆角 18px，背景为表面色 2 号，阴影 `inset 0 0 0 1px` 线色。卡头为 flex、间距 8px，"Pro plan" 14px / 900。徽标为 999px 圆角胶囊，内边距 2px 8px，9.5px / 850，白字，底色 #059669，初始 `transform: scale(0)`，出现时 0.45s cubic-bezier(.3,1.7,.5,1) 弹到 scale(1)；退订场景下改底色 #F59E0B。价格行 flex、基线对齐、间距 6px，上外边距 10px，26px / 900 / 字距 -0.03em / tabular-nums；删除线原价为 13px / 700 / 次级墨色、单位 "/mo" 为 12px / 800 / 次级墨色。卡片脚注 "Next charge Nov 14" 上外边距 6px，10.5px / 700 / 次级墨色。
- 骨架占位区上外边距 14px，grid 间距 7px，两条各 34px 高、11px 圆角、表面色 2 号的横条。取消链接上外边距 16px，11px / 750 / 次级墨色，下划线偏移 3px。
- 遮罩层绝对铺满，背景 rgba(10,10,20,.4)，初始 opacity 0 且不吃指针事件，模态打开时 0.3s 过渡到 opacity 1 并接收点击。
- 模态卡：左右各距 16px、垂直居中（top 50%，margin-top -131px），高 262px，圆角 22px，表面色底，阴影 `0 30px 60px -20px rgba(0,0,0,.45)`，overflow 裁切；初始 `translateY(24px) scale(.95)` + opacity 0，打开时 0.4s cubic-bezier(.3,1.3,.5,1) 归位、透明度 0.25s 过渡到 1。
- 模态内三步面板绝对铺满，内边距 20px 18px 16px，纵向 flex 排列；面板切换 0.45s cubic-bezier(.3,1,.3,1) 位移 + 0.3s 透明度。第 0 步在进入第 1、2 步时向左位移 -40% 并淡出且不吃指针；第 1、2 步未激活时右移 100% 并淡出。
- 第 0 步：标题 15px / 900 / 字距 -0.02em，说明句上外边距 4px、10.5px / 650 / 次级墨色。理由区为两列 grid、间距 6px、上外边距 14px；每个理由按钮高 40px、内边距 0 8px、11px 圆角、表面色 2 号底 + `inset 0 0 0 1px` 线色，文字 10.5px / 800、左对齐；选中态改为表面色底 + `inset 0 0 0 2px` 主色描边，过渡 0.2s。底部按钮条 flex、间距 6px、上外边距 auto；按钮等分、宽高 40px、12px 圆角、12px / 850；次要按钮为表面色 2 号底 + 次级墨色字，主按钮为墨色底 + 表面色字，禁用时 opacity 0.3。
- 第 1 步：挽留卡相对定位、上外边距 2px、内边距 16px、16px 圆角，双层背景——内层 surface 实色 padding-box，外层 `linear-gradient(120deg,#F472B6,#8B5CF6,#38BDF8,#F472B6)` border-box 配 2px 透明描边，背景尺寸 `100% 100%,300% 100%`，以 3s linear 无限循环平移外层渐变形成虹彩流光。小标签 10px / 850 / 主色色，标题 18px / 900 / 字距 -0.03em（上外边距 4px），说明 11px / 行高 1.45 / 650 / 次级墨色（上外边距 6px）。按钮条中确认键占 1.6 份，其余次要键 1 份。
- 第 2 步：整步居中对齐、文本居中。56×56 内联 SVG，圆环 r=24、描边 #10B981、线宽 3，虚线阵列 151，初始偏移 151，展开 0.6s ease、延迟 0.1s；对勾路径描边宽 3.5、线宽圆角端点、阵列 30，展开 0.35s ease、延迟 0.6s；退订场景下两者描边改为 #F59E0B。SVG 下方标题上外边距 12px（15px / 900），再下一句 10.5px / 650 / 次级墨色、上外边距 4px。
- 场景令牌通过 CSS `light-dark()` 随 `color-scheme` 切换，浅色与深色各一套：表面 #FFFFFF / #13141C，表面 2 #F5F3EF / #1A1B25，表面 3 #EAE7E1 / #252632，墨色 #16151B / #F4F0E8，次级墨色 #57535F / rgba(244,240,232,.68)，三级墨色 #8E8A97 / rgba(244,240,232,.42)，线色 rgba(22,21,27,.09) / rgba(255,255,255,.08)，强线 rgba(22,21,27,.17) / rgba(255,255,255,.16)，主色 #6A57F2 / #B7A4FF，主色 2 #2F8FE0 / #7DB4FF，主色淡底 rgba(106,87,242,.12) / rgba(183,164,255,.15)，主色字 #FFFFFF / #0B0C12，薄荷 #119C72 / #7EE8C0，警告 #D6731E / #FFB26B，危险 #D93A55 / #FF7D8C，玻璃 rgba(255,255,255,.58) / rgba(255,255,255,.07)，玻璃线 rgba(255,255,255,.85) / rgba(255,255,255,.18)，阴影 rgba(40,30,80,.14) / rgba(0,0,0,.45)，强阴影 rgba(40,30,80,.3) / rgba(0,0,0,.72)。组件不声明 font-family，继承宿主页面字体；按钮统一 `font: inherit`。
- 组件自身只有 `@media (prefers-reduced-motion: reduce)` 一个媒体查询；场景为固定 340px 宽的等比缩放画布，容器变窄时整景按 `min(1, 可用宽/340)` 比例缩小，不重排内部布局。

## 数据

- 四个退订理由，顺序固定："It costs too much"、"I rarely use it"、"Missing a feature I need"、"Switching to another tool"。
- 两套挽留方案（标题、说明、按钮文案、事后徽标文案）：
  - 价格方案："50% off for 3 months" / "Keep going at $4.50 instead of $9 a month." / 按钮 "Take the discount" / 徽标 "Discounted"；
  - 停缴方案："Take a month off" / "Pause billing for a month; your data stays put." / 按钮 "Pause for a month" / 徽标 "Paused"。
  - 规则：理由序号为 0（价格太贵）走价格方案，其余三个理由走停缴方案。
- 两句结束语："Great! Glad you’re staying"（留下）与 "Your cancellation is scheduled"（退订）。
- 价格三元组：原价 "$9"、优惠价 "$4.50"、单位 "/mo"。初始渲染无优惠价。
- 页面写死文案：标题 "Subscription"、卡片名 "Pro plan"、脚注 "Next charge Nov 14"、链接 "Cancel subscription"、第 0 步标题 "Why are you leaving?" 与说明 "It helps us build a better product."、按钮 "Back" 与 "Next"、坚持退订按钮 "Cancel anyway"、第 2 步说明 "You can keep using it until the period ends"。
- 徽标初始为空文本（缩放为 0 不可见），只有结束流程后才写入 "Discounted" / "Paused" / "Ends Nov 14"。
- 骨架占位条 2 条，无文案。

## 操作和动效

- 点 "Cancel subscription" 打开模态：遮罩淡入、底层 blur(2px)、模态卡片上浮缩放归位，同时把根节点状态切到第 0 步，并把三个面板的 `aria-hidden` 同步为「当前步可见、其余隐藏」。300ms 后（减少动态时 0ms）焦点落到第一个理由按钮上。
- 选理由：点击任一理由按钮即选中该条（同组互斥），对应按钮 `aria-checked="true"` 并换上 2px 主色描边，"Next" 由禁用变为可用（初始禁用）。
- 点 "Next" 进入第 1 步：第 0 步向左滑出 40% 并淡出，第 1 步从右侧滑入；挽留卡的标签写成所选理由原文，标题、说明与按钮文案按上面的规则填入。400ms 后（减少动态时 0ms）焦点落到接受优惠的主按钮上。
- 点接受优惠主按钮 → 走"留下"分支：打勾圆以 #10B981 描边依次画出（先环后勾），标题写成 "Great! Glad you’re staying"，第二句说明隐藏。
- 点 "Cancel anyway" → 走"退订"分支：圆环与对勾描边改为 #F59E0B，标题写成 "Your cancellation is scheduled"，第二句 "You can keep using it until the period ends" 重新显示。
- 两条分支都在 1.5 秒后（减少动态时 900ms）自动关闭模态、焦点回到 "Cancel subscription" 链接，并回写订阅卡片：徽标加 `is-on` 弹出（0.45s cubic-bezier(.3,1.7,.5,1) 从 scale(0) 到 1），文案为留下时的方案徽标（"Discounted" 或 "Paused"）或退订时的 "Ends Nov 14"（底色改为 #F59E0B）；价格重绘——仅在「留下且理由是价格」时显示 $4.50 并把 $9 以删除线并列，其余情况仍显示 $9。
- 关闭路径有三条：点 "Back"、点遮罩空白处、按 Escape（键监听挂在根节点上，仅在模态打开时生效），三条都直接关闭模态而不改变任何订阅状态，焦点回到触发链接。
- 流程状态保存在根节点的 `data-st` 属性上（0/1/2），可重复走完整流程；每次重新打开都回到第 0 步并清空选中态（Next 重新禁用、理由全部取消勾选）。
- 无障碍：模态容器 `role="dialog"`、`aria-modal="true"`，面板用 `aria-hidden` 区分可见步；理由组容器 `role="radiogroup"`，每个理由按钮 `role="radio"` 且带 `aria-checked`；打勾圆为 `aria-hidden` 的 SVG；所有按钮 focus-visible 时 2px 主色描边、外偏移 2px。
- `prefers-reduced-motion: reduce`（或 `options.reducedMotion` 为真）时：面板切换、模态出入、徽标弹入、打勾圆描边推进的过渡全部关闭，挽留卡的 3s 无限流光动画停止（保留静态渐变描边），聚焦延时与自动关闭延时分别压到 0ms 与 900ms，功能流程与最终状态完全保留。
- 支持同页多实例：所有查询都限定在各自 ShadowRoot 内，不使用全局 id；卸载时清理计时器、事件监听与观察器。

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| height | number | 340 | 场景高度，逻辑像素；窄容器整景按比例缩小 |
| reducedMotion | boolean | 跟随系统 | 覆盖系统的减少动态偏好 |

## 独立实现与六框架交付

- 仅凭本文从零生成可运行的实现。尺寸、颜色、文案、图形和运动算法均以上述文字为准；所有装饰用 CSS 与内联 SVG 绘制，不加载远程图片、字体、视频或素材。
- 当前交付重点为 React，组件名称 CancelSaveOffer。从零创建四个文件：CancelSaveOffer.tsx、CancelSaveOfferEngine.js、motion-runtime.ts、CancelSaveOfferEngine.d.ts；分别实现框架入口、完整交互核心、实例生命周期和类型声明。文件名是需要生成的产物，不假定接收者已经拥有任何文件。
- 同时提供 React、Vue、Svelte、Solid、Preact、Vanilla 原生生命周期入口，共享框架无关核心。DOM 仅在挂载后访问，支持同页多实例；更新时保持状态，销毁时清理动画、计时器、观察器及监听器。不要用 iframe 代替组件实现。
- 依赖安装说明：npm install react react-dom。若使用依赖，只使用其公开 API；组件的布局、样式、图形和算法必须在本次生成的文件中完整实现，不引用现成效果组件。
- 实现 options.height 以调整场景高度，options.reducedMotion 覆盖系统偏好；减少动态效果仍保留完整流程状态。
- 给出每个文件的完整内容、安装和运行步骤、以下使用示例所需的全部实现。不得留省略号、待补素材或"自行补齐核心"的占位。
- 验收：375 / 768 / 1440px 无横向溢出；开对话框、三步流转、Back / 遮罩 / Escape 三条关闭路径、回写徽标与价格均正确；浅色深色两套令牌正确；多实例互不干扰，卸载后停止所有任务。

## 使用示例

```tsx
import { CancelSaveOffer } from "./CancelSaveOffer";

export default function App() {
  return <CancelSaveOffer />;
}
```
