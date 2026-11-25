# 报错跳转表单 — FormErrorJump

制作「报错跳转表单」场景组件：一张 300×480 的注册表单卡，卡内是一张可纵向滚动的表单——标题「Sign up」、一句「Takes about a minute」，然后是姓名、邮箱、密码、可选电话四个输入框，一行条款勾选和一枚 48px 高的提交按钮。点击提交后校验全部字段：不合格的输入框套上红色描边并左右摇头，顶部展开一条红色摘要条，写明还有几项需要处理，条内逐条列出问题项；随后表单自动滚动到第一处错误并把光标放进那个输入框。点摘要里的任一条目，同样滚动并聚焦到对应字段；把字段改对之后，问题条目立刻被划掉置灰。

## 布局与材质

- 场景 300×480px，圆角 32px，overflow 裁切，底色取表面色，盒子阴影为 `0 0 0 1px var(--ux-line)` 加 `0 30px 60px -36px var(--ux-shadow-strong)`。
- 场景令牌写在根层，浅色/深色两套由 `light-dark()` 切换：`--ux-surface` #FFFFFF / #13141C，`--ux-surface-2` #F5F3EF / #1A1B25，`--ux-surface-3` #EAE7E1 / #252632，`--ux-ink` #16151B / #F4F0E8，`--ux-ink-2` #57535F / rgba(244,240,232,.68)，`--ux-ink-3` #8E8A97 / rgba(244,240,232,.42)，`--ux-line` rgba(22,21,27,.09) / rgba(255,255,255,.08)，`--ux-line-2` rgba(22,21,27,.17) / rgba(255,255,255,.16)，`--ux-accent` #6A57F2 / #B7A4FF，`--ux-accent-2` #2F8FE0 / #7DB4FF，`--ux-accent-soft` rgba(106,87,242,.12) / rgba(183,164,255,.15)，`--ux-accent-ink` #FFFFFF / #0B0C12，`--ux-mint` #119C72 / #7EE8C0，`--ux-warn` #D6731E / #FFB26B，`--ux-danger` #D93A55 / #FF7D8C，`--ux-glass` rgba(255,255,255,.58) / rgba(255,255,255,.07)，`--ux-glass-line` rgba(255,255,255,.85) / rgba(255,255,255,.18)，`--ux-shadow` rgba(40,30,80,.14) / rgba(0,0,0,.45)，`--ux-shadow-strong` rgba(40,30,80,.3) / rgba(0,0,0,.72)，`--ux-grad` 为 120° 渐变（浅色 #7B61FF → #3D8BFF 55% → #1FB89A；深色 #B7A4FF → #7DB4FF 55% → #A5F2D3）。
- 表单 `.u244-sc` 绝对定位 inset 0，`overflow-y: auto`、`overscroll-behavior: contain`、滚动条隐藏（`scrollbar-width: none` 且 `::-webkit-scrollbar{display:none}`），内边距 24px 20px 26px；表单带 `novalidate` 与 `aria-label="Sign-up form"`，自身内容超长时可滚动。
- 标题 `h3`：`margin: 0`，20px、字重 900、字距 -0.035em。副标题 `p`：`margin: 3px 0 0`，11px、字重 650、颜色 `--ux-ink-3`。
- 摘要容器 `.u244-sm` 用 grid 行高动画：`grid-template-rows: 0fr` → 出错时（根节点带 `.is-err`）变成 `1fr` 并 `margin-top: 14px`；过渡为 `grid-template-rows .4s cubic-bezier(.3,1,.4,1), margin .4s`；内层容器 `min-height: 0; overflow: hidden`，靠 0fr→1fr 展开高度。摘要容器带 `role="alert"`。
- 摘要面板 `.u244-sb`：内边距 11px 13px，圆角 13px，底色 `color-mix(in srgb, #E11D48 10%, transparent)`，外圈 `inset 0 0 0 1px color-mix(in srgb, #E11D48 30%, transparent)`。标题行 `b` 为 flex、间距 6px、12px、字重 850、颜色 #BE123C；行首圆标 `i` 为 16×16px 圆形、底色 #E11D48、文字 #fff、10px/900，grid 居中，内容是感叹号「!」。问题列表 `ul`：`margin: 6px 0 0; padding: 0 0 0 22px`，11px、字重 700；每项 `li` 距上 2px，过渡 opacity .25s，已修好的项加 `.is-fixed`（透明度 .4 并加删除线）；列表里的链接 `a` 为 #BE123C、下划线偏移 2px、光标 pointer。
- 字段块 `.u244-fd` 距上 14px；`label` 为块级 11px、字重 800、颜色 `--ux-ink-2`；输入框容器 `.u244-bx` 距上 6px、position relative。输入框 `.u244-in`：宽 100%、高 44px、内边距 0 38px 0 13px、无边框、圆角 12px、底色 `--ux-surface-2`、`inset 0 0 0 1.5px var(--ux-line)` 描边、13px/字重 700、`outline: none`，过渡 box-shadow .2s；聚焦时描边变 `inset 0 0 0 2px var(--ux-accent)`；字段出错（`.is-bad`）时描边为 `inset 0 0 0 2px #E11D48`；字段通过（`.is-good`）时描边为 `inset 0 0 0 1.5px color-mix(in srgb, #10B981 60%, transparent)`。
- 正确标记 `.u244-ok`：绝对定位 right 12px / top 12px，20×20px 圆形、底色 #10B981，初始 `transform: scale(0)`，过渡 transform .35s cubic-bezier(.3,1.7,.5,1)；`::after` 是白色对勾（left 7px / top 4px、4×8px、边框 `0 2px 2px 0`、旋转 45deg）。只有字段处于 `.is-good` 时标记才展开（`transform: none`）。
- 字段错误文案 `.u244-ms`：同样是 grid 行高动画 0fr→1fr，过渡 .3s cubic-bezier(.3,1,.4,1)，内层 `min-height: 0; overflow: hidden`，10.5px、字重 750、颜色 #BE123C；文案 `span` 为块级、上内边距 5px；只有 `.is-bad` 时文案区才展开。
- 条款行 `.u244-ag`：flex、居中对齐、间距 9px、距上 16px、无边框无底色、11.5px/字重 700、左对齐、光标 pointer；方框 `i` 为 20×20px、圆角 6px、`inset 0 0 0 1.5px var(--ux-line)`、grid 居中，过渡 background .2s 与 box-shadow .2s；勾选后（`aria-checked="true"`）底色变 `--ux-accent`、描边消失，并用 `::after` 画白色对勾（4×8px、边框 `0 2px 2px 0`、旋转 45deg、上移 2px）；出错时描边为 `inset 0 0 0 2px #E11D48`。
- 提交按钮 `.u244-go`：flex 居中、间距 7px、宽 100%、高 48px、距上 20px、无边框、圆角 13px、底色 `--ux-ink`、文字色 `--ux-surface`、13px/字重 850，过渡 background .3s；成功态 `.is-done` 底色改为 #059669。
- 焦点样式：场景内所有按钮与链接 `focus-visible` 时为 `outline: 2px solid var(--ux-accent)`、`outline-offset: 2px`。
- 组件自身不声明 font-family，字体继承宿主；建议实现时使用 `"Pretendard Variable", Pretendard, -apple-system, BlinkMacSystemFont, "Apple SD Gothic Neo", "Segoe UI", Roboto, "Noto Sans KR", sans-serif`。
- 响应式：`createSurface` 的 `responsive` 为 false，场景固定 300×480 逻辑像素；容器窄于 300px 时整景等比缩放，`options.height` 覆盖场景高度。

## 数据

- 写死 4 个字段，每个字段四段：名称、input 类型、初始值、错误提示。
  1. `Name` / `text` / 空 / `Please enter your name`
  2. `Email` / `email` / `minji@` / `That doesn’t look like an email (e.g. name@site.com)`
  3. `Password` / `password` / `abc` / `Use 8+ characters with at least one number`
  4. `Phone (optional)` / `tel` / 空 / 无提示
- 校验规则逐字段写死：姓名去空白后长度大于 0；邮箱匹配正则 `^[^\s@]+@[^\s@]+\.[^\s@]{2,}$`；密码长度不小于 8 且至少含一个数字；电话恒为真（可选字段永远通过）。条款勾选未勾选时同样算作一处错误，计入错误总数。
- 写死文案：标题 `Sign up`，副标题 `Takes about a minute`，条款文字 `I agree to the terms and privacy policy`，按钮文字 `Sign up`；提交成功后按钮文字改为 `You’re in! Welcome`；摘要标题为「错误项数 + ` fields need attention」逐字拼接（不做单复数处理）；摘要列表中字段条目用字段名去掉括号后缀（`Phone (optional)` 显示为 `Phone`），条款条目显示 `Terms`。
- 输入框 id 与错误文案 id 由一个 8 位随机串派生（形如 `u244` + 5 位 base36 随机数再拼序号），输入框通过 `aria-describedby` 指向自己的错误文案。输入框一律 `autocomplete="off"`。
- 无写死的接口数据；表单不会向任何后端发送请求。

## 操作和动效

- 提交（点击 `Sign up` 按钮或表单回车）：先阻止默认提交并忽略原生校验；标记「已尝试过」，随后重新跑一遍全量校验，逐字段刷新状态——出错的加 `.is-bad`（红描边 + 展开红色提示文案），非空且通过的加 `.is-good`（绿描边 + 圆内对勾弹出），输入框同步写 `aria-invalid`。摘要标题文字即时更新为当前错误项数，根节点加/去 `.is-err` 控制摘要条的展开。
- 摘要列表在每次提交后重建：按错误顺序逐条生成列表项，字段项是可点链接、条款项同样可点。点条目会阻止默认跳转，滚动到对应字段并把焦点移过去（`focus({ preventScroll: true })`，滚动另行处理，避免二次跳动）。
- 字段出错时触发摇头：先移除 `.is-shake`、强制重排（读取一次 `offsetWidth`）再重新加上，动画为 `u244-sh .4s`，关键帧 20%/60% 左移 5px、40%/80% 右移 5px；条款行同样抖动。所有出错的字段同时抖动。
- 自动跳转：提交后 200ms（减少动态时为 0ms）展开摘要条，再滚动到第一处错误并聚焦它。滚动目标是 `max(0, 元素 offsetTop - 70)`，用 requestAnimationFrame 逐帧插值，时长 520ms，缓动为三次方 ease-out（`1 - (1 - k)^3`）；减少动态时直接跳到目标位置。
- 修正反馈：第一次提交之后，用户在输入框里每敲一个字符都会重新校验——该字段红描边消失、绿色对勾弹出、摘要列表中对应条目被划掉并降到 40% 透明度，摘要计数与标题同步更新。
- 全部通过时：提交按钮加 `.is-done`（底色转 #059669），文字换成 `You’re in! Welcome`，摘要条收起；再次点击该按钮不再触发任何动作。
- 条款勾选行是 `role="checkbox"`、`aria-checked` 在 "false"/"true" 间切换的按钮；点击后若已经提交过则立即重新校验。
- 无障碍：摘要容器 `role="alert"`，输入框与标签用 `htmlFor`/`id` 关联并通过 `aria-describedby` 指向自己的错误文案，出错时写 `aria-invalid`；条款为 `role="checkbox"` + `aria-checked`；焦点环统一 2px accent、偏移 2px。
- `prefers-reduced-motion: reduce` 时：摘要条、字段文案、对勾标记的过渡全部关闭，摇头动画停止，跳转改为瞬时定位，自动跳转前的等待由 200ms 压到 0ms；校验逻辑、文案与最终状态完全一致。
- 销毁时释放帧回调、定时器、观察器与全部监听器；场景宽高随 `options.height`（默认 480）与容器宽度实时重算。

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| height | number | 480 | 场景高度，逻辑像素；窄容器整景按比例缩小 |
| reducedMotion | boolean | 跟随系统 | 覆盖系统的减少动态偏好 |

## 独立实现与六框架交付

- 仅凭本文从零生成可运行的实现。尺寸、颜色、数据与运动参数均以上述文字为准；界面用 DOM 与 CSS，不加载远程图片、字体、视频或素材。
- 当前交付重点为 React，组件名称 FormErrorJump。从零创建四个文件：FormErrorJump.tsx、FormErrorJumpEngine.js、motion-runtime.ts、FormErrorJumpEngine.d.ts；分别实现框架入口、完整交互核心、实例生命周期和类型声明。文件名是需要生成的产物，不假定接收者已经拥有任何文件。
- 同时提供 React、Vue、Svelte、Solid、Preact、Vanilla 原生生命周期入口，共享框架无关核心。DOM 仅在挂载后访问，支持同页多实例；更新时保持状态，销毁时清理动画、计时器、观察器及监听器。不要用 iframe 代替组件实现。
- 依赖安装说明：npm install react react-dom。组件的布局、样式与算法必须在本次生成的文件中完整实现，不引用现成效果组件。
- 实现 options.height 以调整场景高度（默认 480），options.reducedMotion 覆盖系统偏好；减少动态时仍保留完整的校验状态与跳转结果。
- 给出每个文件的完整内容、安装和运行步骤、以下使用示例所需的全部实现。不得留省略号、待补素材或"自行补齐核心"的占位。
- 验收：375 / 768 / 1440px 无横向溢出；校验判定、摘要计数、摘要条目、滚动聚焦、修正后置灰、成功态均正确；浅色深色两套令牌正确；多实例互不干扰，卸载后停止所有任务。

## 使用示例

```tsx
import { FormErrorJump } from "./FormErrorJump";

export default function App() {
  return <FormErrorJump />;
}
```
