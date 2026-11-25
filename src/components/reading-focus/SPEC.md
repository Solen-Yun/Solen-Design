# 阅读聚焦句 — ReadingFocus

一张 340×340 的阅读卡片：顶部一行「Reading mode · 1 / 5」的进度读数（数字像机械计数器一样竖向滚动），右侧一枚「Focus off」小开关；下面是一段五句话的连续正文，当前那句话保持全黑清晰，其余句子褪成 25% 透明并带 1.2px 模糊；正文左缘贴着一枚 4px 宽的紫色竖条，它跟着当前句滑到对应位置，并按那句所占的行数自动伸缩。鼠标掠过某句话或用 ↑/↓ 键即可换焦点，关掉开关后全文恢复清晰、竖条隐去。

## 布局与材质

- 场景卡 340×340px，圆角 28px，overflow 裁切，纵向 flex 布局，内边距 18px 18px 16px，底色 var(--ux-surface)、文字 var(--ux-ink)，外圈 `box-shadow: 0 0 0 1px var(--ux-line), 0 30px 60px -36px var(--ux-shadow-strong)`。
- 场景令牌分浅色与深色两套（`light-dark()`，由宿主 color-scheme 决定）：浅色 surface #FFFFFF、surface-2 #F5F3EF、ink #16151B、ink-2 #57535F、ink-3 #8E8A97、line rgba(22,21,27,.09)、accent #6A57F2、shadow-strong rgba(40,30,80,.3)；深色 surface #13141C、surface-2 #1A1B25、ink #F4F0E8、ink-2 rgba(244,240,232,.68)、ink-3 rgba(244,240,232,.42)、line rgba(255,255,255,.08)、accent #B7A4FF、shadow-strong rgba(0,0,0,.72)。
- 组件自定义两条缓动令牌：`--ux-ease: cubic-bezier(.22, 1, .36, 1)`（句子明暗过渡）、`--ux-spring: cubic-bezier(.34, 1.56, .64, 1)`（数字滚动与竖条移动）。
- 顶部行 `.u368-hd`：flex、垂直居中、两端对齐。左侧是「Reading mode · 」加一个数字窗再加「/ 5」，整行文字 12px/750、次级墨色 ink-3。数字窗 `.u368-n` 是 inline-flex、高 16px、overflow hidden，内含一个 `i` 元素，`i` 里竖排五个数字块（1～5，各占一行 16px），靠 `translateY(-16px × 当前序号)` 上下滚动切换；数字用等宽字体栈 ui-monospace, SFMono-Regular, Menlo, monospace，行高 16px。
- 右侧开关按钮 `.u368-off`：高 30px、内边距 0 11px、无边框、圆角 999px、底色 var(--ux-surface-2)、文字 12px/700、次级墨色 ink-2；初始文案「Focus off」（表示"点击可关掉聚焦"），`aria-pressed="false"`。
- 正文段落 `.u368-p`：relative、margin 12px 0 0、padding-left 16px、字号 16.5px、行高 1.66、字重 620、字距 -0.02em、墨色 var(--ux-ink)、圆角 8px、`outline: none`；获得焦点时 `box-shadow: 0 0 0 2px var(--ux-accent)`。段落 `tabindex="0"`，`aria-label` 为「Paragraph, use the up and down arrows to move between sentences」。
- 五句话是段落内的行内 span（句子之间用一个空格文本节点相连，因此整段是一段连续文字，句子可跨行折行），span 类名统一为 `.u368-s`；聚焦竖条 `.u368-bar` 是段落内的绝对定位元素：left 0 top 0、宽 4px、高 0、圆角 4px、底色 var(--ux-accent)、opacity 0、pointer-events 默认，切换聚焦时由父级类名控制显隐。

## 数据

- 五句写死的英文正文，依次为：
  1. When reading long text, the eye loses its way more often than you think.
  2. Keeping just one sentence sharp makes it clear where to read next.
  3. Blurring the rest is not about hiding it but about showing the order.
  4. The focus follows your hand smoothly.
  5. Once you are done, you can see the whole thing again at any time.
- 数字窗里的 1～5 由这五句派生，初始序号为 0（显示 1）。
- 无其他写死数据；不含图片、图标与远程素材。

## 操作和动效

- 初始状态：场景根节点自带聚焦类名（聚焦开启），第一句话是当前句；首个动画帧执行一次定位，把竖条放到第一句上。
- 鼠标移入任意一句（pointerenter）：该句成为当前句——当前句 opacity 1、不加模糊，其余句 opacity .25 并加 1.2px 模糊；数字窗滚到对应数字（translateY(-16px × 序号)，0.5s 弹性曲线）；竖条滑到该句所在位置。整段没有 click 监听，指针掠过即切换，不需要点击。
- 竖条定位算法：用当前句的 getClientRects() 取首行 rect 的 top 与末行 rect 的 bottom，相对段落 getBoundingClientRect() 换算；再乘以缩放修正系数 k = 段落 offsetHeight ÷ 段落 rect 高度（场景整体缩放时修正），最后 `translateY(top + 3)`、高度取 max(8, bottom - top - 6)px。竖条过渡 0.55s、弹性曲线 cubic-bezier(.34,1.56,.64,1)，同时过渡 transform 与 height；显隐过渡 opacity 0.3s。
- 句子明暗过渡 0.45s、缓动 cubic-bezier(.22,1,.36,1)，同时过渡 opacity、filter 与 color。
- 键盘：正文段落获得焦点后按 ↑/↓，当前句序号 ±1（夹在 0～4 之间），阻止默认行为；焦点在正文上时显示 2px accent 焦点圈。
- 「Focus off」按钮：点击切换聚焦开关——开启聚焦时按钮显示「Focus off」、aria-pressed 为 false；关闭聚焦后根节点去掉聚焦类名，全文恢复为正常墨色（不再有透明与模糊）、竖条淡出，按钮文案变为「Focus on」、aria-pressed 变为 true。聚焦关闭后指针仍会更新内部当前句，但画面上看不出差别。
- 无障碍：段落是可聚焦区域并带说明性 aria-label；开关是原生 button 且用 aria-pressed 表达开合状态；当前句同时靠"清晰"与"其余模糊"两重视觉区分，不只依赖颜色。
- `prefers-reduced-motion`（或 options.reducedMotion=true）下：运行时把过渡时长统一归零，句子明暗切换、数字滚动与竖条移动改为瞬时完成，功能与最终状态不变。

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| height | number | 340 | 场景高度，逻辑像素；窄容器整景按比例缩小 |
| reducedMotion | boolean | 跟随系统 | 覆盖系统的减少动态偏好 |

## 独立实现与六框架交付

- 仅凭本文从零生成可运行的实现。尺寸、颜色、文案、图形和运动算法均以上述文字为准；界面全部用 DOM 与 CSS 绘制（文字节点与行内 span 组合），不加载远程图片、字体、视频或素材。
- 当前交付重点为 React，组件名称 ReadingFocus。从零创建四个文件：ReadingFocus.tsx、ReadingFocusEngine.js、motion-runtime.ts、ReadingFocusEngine.d.ts；分别实现框架入口、完整交互核心、实例生命周期和类型声明。文件名是需要生成的产物，不假定接收者已经拥有任何文件。
- 同时提供 React、Vue、Svelte、Preact、Vanilla 原生生命周期入口，共享框架无关核心。DOM 仅在挂载后访问，支持同页多实例；更新时保持状态，销毁时清理动画、计时器、观察器及监听器。不要用 iframe 代替组件实现。
- 依赖安装说明：npm install react react-dom。若使用依赖，只使用其公开 API；组件的布局、样式、图形和算法必须在本次生成的文件中完整实现，不引用现成效果组件。
- 实现 options.height 以调整场景高度，options.reducedMotion 覆盖系统偏好；减少动态时过渡归零、状态一步到位。
- 给出每个文件的完整内容、安装和运行步骤、以下使用示例所需的全部实现。不得留省略号、待补素材或"自行补齐核心"的占位。
- 验收：375 / 768 / 1440px 无横向溢出；指针掠过句子即换焦点、明暗与数字窗同步；竖条位置与高度贴合当前句且能跨多行；↑/↓ 可换句；开关能开合并正确切换文案与 aria-pressed；多实例互不干扰，卸载后停止所有任务。

## 使用示例

```tsx
import { ReadingFocus } from "./ReadingFocus";

export default function App() {
  return <ReadingFocus />;
}
```
