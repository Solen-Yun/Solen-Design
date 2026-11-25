# 自适应联系表单 — ConditionalContact

一张 300×480 的联系表单场景。顶部是一行三个胶囊按钮 Sales / Support / Partnership，白色滑块在按钮间平滑横移；下方按类型折叠字段组——Sales 显示「Company」输入框与团队规模三选一，Support 显示问题位置三选一与虚线「Attach screenshot」附件按钮，Partnership 显示「Website」输入框与合作形式三选一。最后是 Message 留言框，右下角有一圈随字数填充的进度环；留言去除首尾空白后满 2 个字符，底部墨色 Send 按钮才可点击。提交后表单缩退淡出，场景换成一屏回执：绿色对勾圆牌、「Request received」、以及一张 Ticket 工单号卡片（形如 `#A-2071`）。

## 布局与材质

- 场景根 300×480px，圆角 32px，溢出裁切，背景表面色，文字墨色；外圈 1px 线色描边（`box-shadow: 0 0 0 1px`），下方 `0 30px 60px -36px` 强阴影。
- 令牌用 CSS `light-dark()` 写在场景根上，浅色 / 深色两套：表面 `#FFFFFF` / `#13141C`；次级表面 `#F5F3EF` / `#1A1B25`；三级表面 `#EAE7E1` / `#252632`；墨色 `#16151B` / `#F4F0E8`；次级墨色 `#57535F` / `rgba(244,240,232,.68)`；三级墨色 `#8E8A97` / `rgba(244,240,232,.42)`；线色 `rgba(22,21,27,.09)` / `rgba(255,255,255,.08)`；强线色 `rgba(22,21,27,.17)` / `rgba(255,255,255,.16)`；强调色 `#6A57F2` / `#B7A4FF`；次强调 `#2F8FE0` / `#7DB4FF`；强调淡色 `rgba(106,87,242,.12)` / `rgba(183,164,255,.15)`；强调字色 `#FFFFFF` / `#0B0C12`；薄荷 `#119C72` / `#7EE8C0`；警示 `#D6731E` / `#FFB26B`；危险 `#D93A55` / `#FF7D8C`；玻璃面 `rgba(255,255,255,.58)` / `rgba(255,255,255,.07)`；玻璃线 `rgba(255,255,255,.85)` / `rgba(255,255,255,.18)`；阴影 `rgba(40,30,80,.14)` / `rgba(0,0,0,.45)`；强阴影 `rgba(40,30,80,.3)` / `rgba(0,0,0,.72)`；渐变 `linear-gradient(120deg,#7B61FF,#3D8BFF 55%,#1FB89A)` / `linear-gradient(120deg,#B7A4FF,#7DB4FF 55%,#A5F2D3)`。组件自身不声明 `color-scheme`，`light-dark()` 跟随宿主的 `color-scheme`。
- 组件 CSS 未声明 `font-family`，字体沿用宿主页继承；只有回执里的工单号改用等宽栈 `ui-monospace, SFMono-Regular, Menlo, monospace`。
- 表单层 `.u295-fm` 绝对定位 inset 0，内边距 `24px 18px 18px`，纵向 flex 布局，过渡 opacity 0.3s 与 transform 0.4s；提交后被加上「缩到 0.97 倍并淡出、停止接收指针事件」。
- 标题「Contact us」20px/900、字距 -0.035em；副标题「We usually reply within a day」上边距 3px、10.5px/650、三级墨色。
- 类型胶囊条：上边距 14px，内边距 3px，圆角 12px，背景次级表面，内嵌 1px 线色描边；内含三个等分按钮（`flex:1`、高 30px、圆角 9px、无底色、11px/850、不换行），未选中为三级墨色、选中为墨色（颜色过渡 0.2s）。白色滑块绝对定位在 left 3 / top 3 / bottom 3，宽 `calc((100% - 6px) / 3)`、圆角 9px、背景表面色，阴影 `0 1px 4px -1px` 强阴影加 1px 线色描边，位移过渡 0.35s `cubic-bezier(.3,1.3,.5,1)`。整组标记 `role="radiogroup"`、`aria-label="Request type"`，三个按钮 `role="radio"`。
- 折叠字段组用 CSS 网格行高动画实现：外层 `grid-template-rows: 0fr`、透明度 0，过渡 `grid-template-rows 0.4s cubic-bezier(.3,1,.4,1)` 与 `opacity 0.25s`；展开时切到 `1fr`、透明度 1，并把过渡延迟 0.12s（先收旧组、再晚一点展新组）。内层容器 `min-height:0; overflow:hidden` 负责裁切。
- 字段标签（`<label>` 与 `.u295-lb` 通用样式）：块级、上边距 12px、10.5px/800、次级墨色。
- 文本输入框：宽 100%、高 38px、上边距 5px、内边距 `0 11px`、圆角 10px、背景次级表面、内嵌 1.5px 线色描边、12px/700；聚焦时描边加粗为 2px 强调色。
- 选项胶囊组：上边距 5px、flex 排列、间距 5px、可换行；每个按钮高 30px、内边距 `0 10px`、圆角 999px、背景次级表面、内嵌 1px 线色描边、11px/800、次级墨色；被选中后翻转为墨色底 + 表面色字并去掉描边，过渡 background/color/box-shadow 各 0.2s。组内为单选：点中一个，其余自动取消。
- 附件按钮：宽 100%、高 38px、上边距 8px、1.5px 虚线线色描边、圆角 10px、11px/800、次级墨色，内含 13×13px 的回形针线性图标（1.3px 描边、圆头）。已附加时该按钮隐藏。
- 附件条目：上边距 8px、内边距 `7px 8px 7px 10px`、圆角 10px、背景次级表面、10.5px/750 flex 居中排布，入场动画 0.35s `cubic-bezier(.3,1.4,.5,1)`（从 0.92 倍缩放 + 透明淡入）。左侧 24×24px 圆角 6px 的缩略图（渐变 `#A5B4FC → #F0ABFC`）；中间是文件名与 9px 的三级墨色容量文字，下方一条高 3px、圆角 2px 的三级表面轨道，轨道内的强调色进度条随上传推进；右侧 22×22px 圆形移除钮（9×9px 对角叉线，1.5px 描边）。
- 留言框：上边距 5px、宽 100%、高 76px、内边距 `9px 40px 9px 11px`、圆角 10px、背景次级表面、内嵌 1.5px 线色描边、12px/650、行高 1.45、不可手动拉伸；聚焦时描边加粗为 2px 强调色。
- 字数环：绝对定位在留言框内右下（right 9px、bottom 9px），22×22px 的双圆 SVG，整体旋转 -90°，描边宽 3px；底环为三级表面，前环为强调色、圆头、虚线周长 56.5（对应半径 9 的圆），随字数缩短。
- Send 按钮：宽 100%、高 46px、外边距顶 auto（始终贴在表单底部）、圆角 13px、墨色底 + 表面色字、13px/850；禁用时透明度 0.3、指针禁用样式，透明度过渡 0.2s。
- 回执层 `.u295-dn` 绝对定位 inset 0，纵向 flex 居中，内边距 `0 28px`，居中对齐；静息时透明度 0、下移 14px、不接收指针，展开时透明度过渡 0.35s、位移过渡 0.45s `cubic-bezier(.3,1.3,.5,1)`，两者都延迟 0.15s。绿色对勾圆牌 64×64px、圆角 20px、渐变 `#34D399 → #059669`、阴影 `0 16px 30px -14px #059669`，内部 12×22px 白色对勾（右边与下边框 4px、旋转 45°）；标题 18px/900，上边距 16px；副文 11px/650、三级墨色、上边距 6px；工单卡片上边距 16px、内边距 `10px 16px`、圆角 12px、次级表面底、11px/750 次级墨色，其中的号码块级显示、上边距 2px、15px 等宽墨色。
- 场景固定 300px 宽，没有媒体查询断点；容器窄于 300px 时由运行时整体等比缩小（缩放比 = min(1, 容器宽 / 300)），320px 以下的窄容器也不会横向溢出。

## 数据

- 三个请求类型写死：`Sales`、`Support`、`Partnership`。
- Sales 专属字段：标签 `Company`，输入框占位符 `e.g. Solen Design`；选项标签 `Team size`，三枚按钮 `1–10`、`11–50`、`51+`。
- Support 专属字段：选项标签 `Where’s the problem?`，三枚按钮 `Sign-in`、`Billing`、`Other`；附件按钮文字 `Attach screenshot`；附件条目文件名写死 `screenshot.png`，容量上限写死 240 KB。
- Partnership 专属字段：标签 `Website`，输入框占位符 `https://`；选项标签 `Partnership type`，三枚按钮 `Integration`、`Reseller`、`Co-marketing`。
- 公共字段只有留言区：标签 `Message`，最大长度 200 字（textarea 的 `maxlength` 与进度环的满格基数同为 200）。
- 其余文案写死：标题 `Contact us`、副标题 `We usually reply within a day`、按钮 `Send`、回执标题 `Request received`、回执说明 `We’ll reply by email`、工单标签 `Ticket`。数据全部内置在组件里，没有外部来源。

## 操作和动效

- 初始即选中 Sales（滑块在第 1 档、Sales 按钮 `aria-checked="true"`），三组字段中只有 Sales 组展开，其余两组收起且被标记 `aria-hidden="true"` 与 `inert`（不可聚焦、不可被辅助技术读到）。
- 点击类型胶囊：滑块以 `translateX(档位 × 100%)` 横移到对应位置（0.35s `cubic-bezier(.3,1.3,.5,1)`），三个按钮的 `aria-checked` 重新分配；旧字段组先收起（0.4s 高度过渡 + 0.25s 淡出），新字段组延迟 0.12s 再展开（1fr 行高 + 淡入）。再次点击当前类型不触发任何变化。
- 每组选项胶囊为单选：点击其中一枚，该组其余按钮的 `aria-pressed` 置 false，被点中的置 true，视觉上翻转为墨色底。
- 点击 Attach screenshot：附件按钮隐藏，附件条目出现（0.35s `cubic-bezier(.3,1.4,.5,1)` 从 0.92 倍缩放淡入），文件名固定 `screenshot.png`；容量文字从 `0 / 240 KB` 起，在 1000ms 内按帧推进到 `240 / 240 KB`（`round(240 × 进度)`），同时轨道内的强调色进度条从 0 宽过渡到满宽（1s `cubic-bezier(.3,.8,.3,1)`）。
- 点击附件条目右侧的移除钮：附件条目与附件按钮状态复位，焦点回到 Attach screenshot 按钮（带 `preventScroll`）。
- 在留言框输入：字数环的前环虚线偏移按 `56.5 × (1 - 字数 / 200)` 缩短（过渡 0.2s），填充比例超过 90% 时前环描边改用警示色 `#F59E0B`，低于 90% 时回到强调色；同时按去除首尾空白后的长度判断，留言不足 2 个字符时 Send 保持禁用。
- 点击 Send：先确认按钮未禁用，然后生成工单号——前缀 `#` + 类型字母（Sales → A、Support → B、Partnership → C）+ `-` + 2040 到 2099 之间的随机整数——写入回执卡片；随后场景加上「已提交」状态：表单层淡出并缩到 0.97 倍，回执层延迟 0.15s 后淡入并上移到位。回执层标记 `role="status"`，提交结果会被读屏播报。
- 键盘：所有按钮与输入框都是原生元素，可 Tab 遍历；`focus-visible` 为 2px 强调色描边、偏移 2px；输入框与留言框聚焦时用 2px 强调色内描边代替外轮廓。
- 无自动播放，也没有循环动画；所有动效都由点击或输入触发。
- `prefers-reduced-motion` 下胶囊滑块、字段组折叠、表单与回执的进出、进度条宽度全部取消过渡（瞬时到位），附件条目的入场动画关闭；`options.reducedMotion` 覆盖同一偏好，并让上传计时时长压缩到 1ms，容量文字立刻显示 `240 / 240 KB`。

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| height | number | 480 | 场景高度，逻辑像素；窄容器整景按比例缩小 |
| reducedMotion | boolean | 跟随系统 | 覆盖系统的减少动态偏好 |

## 独立实现与六框架交付

- 仅凭本文从零生成可运行的实现。尺寸、颜色、文案、图形和运动算法均以上述文字为准；界面用 DOM 与 CSS 绘制，不加载远程图片、字体、视频或素材。
- 当前交付重点为 React，组件名称 ConditionalContact。从零创建四个文件：ConditionalContact.tsx、ConditionalContactEngine.js、motion-runtime.ts、ConditionalContactEngine.d.ts；分别实现框架入口、完整交互核心、实例生命周期和类型声明。文件名是需要生成的产物，不假定接收者已经拥有任何文件。
- 同时提供 React、Vue、Svelte、Solid、Preact、Vanilla 原生生命周期入口，共享框架无关核心。DOM 仅在挂载后访问，支持同页多实例；更新时保持状态，销毁时清理动画、计时器、观察器及监听器。不要用 iframe 代替组件实现。
- 依赖安装说明：npm install react react-dom。若使用依赖，只使用其公开 API；组件的布局、样式、图形和算法必须在本次生成的文件中完整实现，不引用现成效果组件。
- 实现 options.height 以调整场景高度，options.reducedMotion 覆盖系统偏好；减少动态效果仍保留完整的类型切换、字数环、附件与回执状态，只是过渡改为瞬时。
- 给出每个文件的完整内容、安装和运行步骤、以下使用示例所需的全部实现。不得留省略号、待补素材或"自行补齐核心"的占位。
- 验收：375 / 768 / 1440px 无横向溢出；三种类型的字段切换、单选胶囊、字数环、附件上传与移除、提交回执与工单号均正确；浅色深色两套令牌正确；多实例互不干扰，卸载后停止所有任务。

## 使用示例

```tsx
import { ConditionalContact } from "./ConditionalContact";

export default function App() {
  return <ConditionalContact />;
}
```
