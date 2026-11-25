# 国旗区号手机号输入 — PhoneCountryInput

一张 340×340 的手机号验证表单卡：标题「Verify it's you」下面是「Mobile number」标签与一条 48px 高的输入槽，左端是一枚可点开的国家按钮（旗帜 emoji + 区号 + 箭头），右端留出图标位。点开国家按钮会浮出一块 220px 宽的下拉面板，上面是搜索框，下面是四个国家的旗帜、名称与区号；选中后旗帜会翻转着换上新的、区号同步更新，已经敲进去的数字会按新国家的分组规则重新排布。位数填够时输入槽变成绿圈、右侧打钩、"Send code" 按钮点亮；位数不对时槽边转成琥珀色并给出一行提示。

## 布局与材质

- 场景卡 340×340px，圆角 30px，overflow 裁切，底色 var(--ux-surface)、文字 var(--ux-ink)，外圈 `box-shadow: 0 0 0 1px var(--ux-line), 0 30px 60px -36px var(--ux-shadow-strong)`。
- 场景令牌分浅色与深色两套（`light-dark()`，由宿主 color-scheme 决定）：浅色 surface #FFFFFF、surface-2 #F5F3EF、surface-3 #EAE7E1、ink #16151B、ink-2 #57535F、ink-3 #8E8A97、line rgba(22,21,27,.09)、accent #6A57F2、shadow-strong rgba(40,30,80,.3)；深色 surface #13141C、surface-2 #1A1B25、surface-3 #252632、ink #F4F0E8、ink-2 rgba(244,240,232,.68)、ink-3 rgba(244,240,232,.42)、line rgba(255,255,255,.08)、accent #B7A4FF、shadow-strong rgba(0,0,0,.72)。
- 内容包装层 absolute left 22px right 22px top 30px。标题 h3「Verify it's you」20px/900、字距 -0.035em、margin 0；标签「Mobile number」display block、margin-top 22px、11px/800、次级墨色 ink-2。
- 输入槽 `.u209-fd`：relative、flex、margin-top 6px、高 48px、圆角 14px、底色 var(--ux-surface-2)、`box-shadow: inset 0 0 0 1.5px var(--ux-line)`、过渡 box-shadow .2s。槽内获得焦点时描边换 2px var(--ux-accent)；校验通过时换 2px #10B981；校验失败时换 2px #F59E0B。
- 国家按钮 `.u209-cc`：flex none、flex 居中、间距 5px、内边距 0 9px 0 12px、无边框、右侧 1px var(--ux-line) 分隔线、无底色、文字墨色、13px/800、`cursor: pointer`；`aria-haspopup="listbox"`、`aria-expanded` 随开合切换、`aria-label="Choose country"`。内部三块：旗帜 `em` 18px 行内块（过渡 transform .45s cubic-bezier(.3,1.5,.5,1)，翻转时 `rotateY(360deg) scale(1.15)`）、区号 `b` 13px/850、tabular-nums；箭头是 9×9 内联 SVG、颜色 ink-3、过渡 transform .25s，面板打开时旋转 180°。
- 号码输入框 `.u209-in`：flex 1、min-width 0、内边距 0 38px 0 12px、无边框无底色、墨色、14px/750、字距 .02em、tabular-nums、`outline: none`，`type="tel"`、`inputmode="numeric"`、`autocomplete="off"`、`aria-label="Mobile number"`；占位文字颜色 ink-3、字重 600。
- 校验图标 `.u209-ck`：absolute、right 13px top 14px、20×20、pointer-events none。外圈是 #10B981 实心圆，`transform: scale(0)`、transform-origin center、transform-box fill-box，过渡 transform .35s cubic-bezier(.3,1.7,.5,1)；对勾是白色描边路径（stroke-width 2.2、圆头圆角、`stroke-dasharray: 14`、`stroke-dashoffset: 14`，过渡 stroke-dashoffset .3s ease .2s 延迟）。校验通过时圆点弹到原大小、对勾描完并显形。
- 提示行 `.u209-ht`：高 0、overflow hidden、10.5px/750、色 #B45309，过渡 height .25s 与 margin .25s；出错时高度 16px、上外边距 6px；`aria-live="polite"`。
- 国家下拉面板 `.u209-dd`：absolute、left 0、top 122px（相对内容包装层，即场景左侧 22px、顶部 152px）、z-index 3、宽 220px、内边距 6px、圆角 15px、底色 var(--ux-surface)、`box-shadow: 0 0 0 1px var(--ux-line), 0 18px 36px -14px var(--ux-shadow-strong)`、`transform-origin: 20% 0`；收起时 `transform: scale(.94) translateY(-4px)`、opacity 0、pointer-events none，打开时 transform none、opacity 1、pointer-events auto；过渡 transform .22s cubic-bezier(.3,1.5,.5,1) 与 opacity .15s。
- 面板内搜索框 `.u209-sr`：`type="search"`、宽 100%、高 30px、下外边距 4px、内边距 0 10px、无边框、圆角 9px、底色 var(--ux-surface-2)、11.5px/700、`outline: none`，占位文字「Search countries」、`aria-label="Search countries"`。
- 国家选项 `.u209-op`：flex 居中、间距 8px、宽 100%、高 30px、内边距 0 9px、无边框、圆角 8px、无底色、墨色、12px/750、左对齐、`cursor: pointer`、`role="option"`；悬停、命中高亮或 `aria-selected="true"` 时铺 var(--ux-surface-2)。内部是旗帜 `em` 16px、国家名 `span`（flex 1）与区号 `small`（11px/800、ink-3、tabular-nums）。
- 底部按钮 `.u209-go`「Send code」：absolute、left 22px right 22px bottom 24px、高 46px、无边框、圆角 13px、底色 var(--ux-ink)、文字 var(--ux-surface)、13px/850，过渡 opacity .25s；禁用时 opacity .3。
- 所有按钮的 `focus-visible` 为 2px var(--ux-accent) 外圈、offset 2px。

## 数据

- 四个国家写死「代码 / 旗帜 / 名称 / 区号 / 数字分组 / 示例号码」：
  1. KR / 🇰🇷 / South Korea / +82 / [3,4,4] / 010-1234-5678
  2. US / 🇺🇸 / United States / +1 / [3,3,4] / (415) 555-0132
  3. JP / 🇯🇵 / Japan / +81 / [3,4,4] / 090-1234-5678
  4. GB / 🇬🇧 / United Kingdom / +44 / [5,6] / 07700 900123
- 旗帜用 emoji 字形渲染（选项里 16px，国家按钮里 18px）。
- 每国要求的位数由分组之和得出：KR 11 位、US 10 位、JP 11 位、GB 11 位。
- 默认选中第一个国家（韩国）：区号 +82、占位号码 010-1234-5678。
- 无其他写死数据；图标（箭头与对勾）都是内联 SVG。

## 操作和动效

- 点击国家按钮：面板展开或收起，按钮上的箭头同步旋转 180°，`aria-expanded` 跟着变。展开时清空搜索框、重新过滤，并在 60ms 后把焦点送进搜索框，让键盘用户可以直接打字搜索。
- 搜索：输入时按「国家名 + 国家代码 + 区号」做不区分大小写的包含匹配，不匹配的选项隐藏（`hidden` 属性），面板高度随结果收缩。
- 选择某个国家：旗帜 emoji 换成新的、区号文字换新、输入框占位号码换成该国示例；同时把已输入的数字按新分组重新排布；选中项在列表里标记 `aria-selected="true"`。旗帜翻转动画的做法是移除动画类、强制一次重排、再重新加上动画类，动画本身是 `rotateY(360deg) scale(1.15)` 的 0.45s 弹性曲线（cubic-bezier(.3,1.5,.5,1)），460ms 后移除动画类。
- 号码输入：只保留数字并按当前国家的分组重新插入分隔符——韩国/日本用短横线（010-1234-5678），英国用空格（07700 900123），美国在超过 3 位数字时用括号加短横线（(415) 555-0132）；位数不足时多出的数字并入最后一组。
- 校验：位数恰好等于要求即为通过，槽边变绿、右侧打钩、"Send code" 按钮解除禁用；位数超过要求、或已经离开输入框（blur）后位数不足，才判定为失败，槽边变琥珀色并显示提示「<国家名> numbers have <位数> digits」。每次输入都会先清掉"已失焦"标记再校验，失焦时打上该标记并重新校验。
- 键盘：面板打开时按 Esc 关闭并把焦点交回国家按钮；输入框与所有按钮都可 Tab 聚焦并带 accent 焦点圈。
- 无障碍：国家按钮用 `aria-haspopup="listbox"` + `aria-expanded` 表达展开态，选项列表 `role="listbox"`、每项 `role="option"` 并用 `aria-selected` 标出当前项，提示行 `aria-live="polite"`，校验状态除颜色外还有对勾图形与提示文字。
- `prefers-reduced-motion`（或 options.reducedMotion=true）下：旗帜翻转、面板展开、提示行高度与对勾描边等过渡全部关闭（CSS 中 reduced-motion 时这些属性 transition 为 none），状态直接到位；此时选择国家也不会播放旗帜翻转。

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| height | number | 340 | 场景高度，逻辑像素；窄容器整景按比例缩小 |
| reducedMotion | boolean | 跟随系统 | 覆盖系统的减少动态偏好 |

## 独立实现与六框架交付

- 仅凭本文从零生成可运行的实现。尺寸、颜色、文案、图形和运动算法均以上述文字为准；界面用 DOM 与 CSS 绘制（箭头与对勾用内联 SVG，旗帜用 emoji 字形），不加载远程图片、字体、视频或素材。
- 当前交付重点为 React，组件名称 PhoneCountryInput。从零创建四个文件：PhoneCountryInput.tsx、PhoneCountryInputEngine.js、motion-runtime.ts、PhoneCountryInputEngine.d.ts；分别实现框架入口、完整交互核心、实例生命周期和类型声明。文件名是需要生成的产物，不假定接收者已经拥有任何文件。
- 同时提供 React、Vue、Svelte、Preact、Vanilla 原生生命周期入口，共享框架无关核心。DOM 仅在挂载后访问，支持同页多实例；更新时保持状态，销毁时清理动画、计时器、观察器及监听器。不要用 iframe 代替组件实现。
- 依赖安装说明：npm install react react-dom。若使用依赖，只使用其公开 API；组件的布局、样式、图形和算法必须在本次生成的文件中完整实现，不引用现成效果组件。
- 实现 options.height 以调整场景高度，options.reducedMotion 覆盖系统偏好；减少动态时各状态直接切换到位。
- 给出每个文件的完整内容、安装和运行步骤、以下使用示例所需的全部实现。不得留省略号、待补素材或"自行补齐核心"的占位。
- 验收：375 / 768 / 1440px 无横向溢出；面板能开合、搜索能过滤、选中后旗标区号更新且号码重排；位数正确时按钮可用、位数不对时有提示；Esc 可关闭面板；多实例互不干扰，卸载后停止所有任务。

## 使用示例

```tsx
import { PhoneCountryInput } from "./PhoneCountryInput";

export default function App() {
  return <PhoneCountryInput />;
}
```
