# 划词分享提示条 — QuoteShareTooltip

制作「划词分享提示条」：一张 340×340 的博客文章卡。眉标 "Design notes"、标题 "Thinking small-screen first"，一段由四个独立句子组成的英文正文。点按任意一句（或真实拖选片段后松开鼠标）即弹出墨色小工具条——Highlight / Copy / Share 三枚 30×28 图标按钮，浮在句子首行上方、带一枚 5px 下箭头；Highlight 给整句从左到右刷上 #FDE047 荧光笔底（.6s）；Copy 把句子包上弯引号写入剪贴板、图标短暂换成绿色对勾并弹 "Quote copied" 提示条；Share 调系统分享面板，不可用时退化为复制。点文章空白处工具条收回。

## 布局与材质

- 卡片 340×340px、圆角 30px、溢出裁切、表面色底；外圈 0 0 0 1px 线色描边，加 0 30px 60px -36px 强阴影。
- 文章层：绝对填充、内边距 30px 26px。眉标 10px/字重 850、字距 0.08em、accent 色；标题 "Thinking small-screen first" 19px/字重 900、字距 -0.035em、边距 6px 0 14px；正文一段 13px、行高 1.75、字重 600、二级墨色，四个句子各自包在独立 span 中，句间以一个空格分隔。
- 可高亮句 span：cursor text、圆角 3px；荧光底用背景图实现——linear-gradient(#FDE047 75% 透明度，同色) no-repeat，尺寸 0% 42%、位置 0 88%（贴在文字底部）；过渡 background-size .6s cubic-bezier(.3,.9,.3,1)、background-color .2s、color .2s。is-hl（已高亮）时背景尺寸 100% 42%、文字转为墨色；is-sel（当前选中句）时叠加 accent 22% 透明度背景色。
- 工具条：绝对定位，role="toolbar"、aria-label "Quote tools"；flex 布局、间距 2px、内边距 4px、圆角 12px、墨色实底、投影 0 10px 24px -10px 强阴影；默认 translate(-50%,-100%) scale(.85)、透明度 0、不可点，is-on 时 translate(-50%, calc(-100% - 8px)) scale(1)（transform 过渡 .25s cubic-bezier(.3,1.6,.5,1)、透明度 .15s，transform-origin 底部中心）；底部 ::after 画 5px 墨色三角箭头。
- 工具条按钮：30×28px、圆角 8px、无底色、图标色为表面色、15×15 内联 SVG——荧光笔（含 #FDE047 底线 2px）、双层复制框、向上分享箭头；hover 背景 rgba(255,255,255,.14)；focus-visible 2px accent 外圈、偏移 -2px。复制按钮内的绿色对勾 16×16（#4ADE80、描边 2.2px），仅在成功瞬间显示并替换复制图标。
- Toast 提示条：绝对定位 left 50%、bottom 16px，role="status"；胶囊、内边距 8px 14px、墨色实底、表面色文字 11px/字重 800、不换行；默认 translate(-50%, 40px)、透明，is-on 时归位（transform 过渡 .35s cubic-bezier(.3,1.5,.5,1)、透明度 .2s）。
- 场景令牌一套两态（light-dark()）：surface #FFFFFF/#13141C、surface-2 #F5F3EF/#1A1B25、ink #16151B/#F4F0E8、ink-2 #57535F/rgba(244,240,232,.68)、ink-3 #8E8A97/rgba(244,240,232,.42)、line rgba(22,21,27,.09)/rgba(255,255,255,.08)、accent #6A57F2/#B7A4FF、阴影 rgba(40,30,80,.3)/rgba(0,0,0,.72)。字体随页面继承无衬线。

## 数据

- 四句正文逐字固定："The smaller the screen, the more courage it takes to cut." / "Keep only what matters and it looks tidy on big screens too." / "When every button and sentence finds its place, people never get lost." / "Good layout works quietly without drawing attention."
- 其余写死文案：眉标 "Design notes"、标题 "Thinking small-screen first"、工具条 aria-label "Quote tools"、按钮 aria-label "Highlight" / "Copy" / "Share"、toast 文案 "Quote copied"。初始没有任何预置高亮句。

## 操作和动效

- 点按句子：若当前存在未折叠的拖选则忽略；否则在该句第一个行盒上方弹工具条——left 为句子中心并夹在 56–284px 之间、top 为句子顶部且不小于 42px（坐标按场景缩放比换算），句子加 is-sel；再次点按同一句收回。
- 拖选：mouseup 落在正文内且选区非折叠时，工具条定位于选区第一个行盒上方，选区锚点所在句加 is-sel。
- Highlight：切换当前句的 is-hl——荧光底以 .6s cubic-bezier(.3,.9,.3,1) 从 0% 刷到 100%（取消时反向收回），随后收工具条。
- Copy：把当前句文本包上弯引号（“ ”）写入 navigator.clipboard（失败静默）；按钮图标换成绿色对勾；toast 弹 "Quote copied"，1600ms 后自动收回；700ms 后工具条收回。
- Share：navigator.share 可用且当前句存在时调用 share({ text: 当前句 })（用户取消静默）；否则退化为 Copy 的完整流程。
- 点文章空白处（目标不是句子）收工具条；收起时清除 is-sel。
- 键盘：三枚按钮为原生 button、Tab 可达，focus-visible 2px accent 内缩；句子本身不可聚焦。
- prefers-reduced-motion / options.reducedMotion：句底荧光、工具条、toast 的过渡全部关闭（出现与消失瞬时），交互逻辑不变；场景根打上 data-reduced-motion 强制容器内所有 CSS 过渡与动画时长归零。surface 会随容器宽度把整景等比缩小（缩放不超过 1）。

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| height | number | 340 | 场景高度，逻辑像素；窄容器整景按比例缩小 |
| reducedMotion | boolean | 跟随系统 | 覆盖系统的减少动态偏好 |

## 独立实现与六框架交付

- 仅凭本文从零生成可运行的实现。尺寸、颜色、文案与运动参数均以上述文字为准；界面用 DOM 与 CSS，工具条图标用内联 SVG，不加载远程图片、字体、视频或素材。
- 当前交付重点为 React，组件名称 QuoteShareTooltip。从零创建四个文件：QuoteShareTooltip.tsx、QuoteShareTooltipEngine.js、motion-runtime.ts、QuoteShareTooltipEngine.d.ts；分别实现框架入口、完整交互核心、实例生命周期和类型声明。文件名是需要生成的产物，不假定接收者已经拥有任何文件。
- 同时提供 React、Vue、Svelte、Solid、Preact、Vanilla 原生生命周期入口，共享框架无关核心。DOM 仅在挂载后访问，支持同页多实例；更新时保持状态，销毁时清理动画、计时器、观察器及监听器。不要用 iframe 代替组件实现。
- 依赖安装说明：npm install react react-dom。若使用依赖，只使用其公开 API；组件的布局、样式、图形和算法必须在本次生成的文件中完整实现，不引用现成效果组件。
- 实现 options.height 以调整场景高度，options.reducedMotion 覆盖系统偏好；减少动态下划词、高亮、复制、分享仍完整可用。
- 给出每个文件的完整内容、安装和运行步骤、以下使用示例所需的全部实现。不得留省略号、待补素材或"自行补齐核心"的占位。
- 验收：375 / 768 / 1440px 无横向溢出；点句与拖选两种方式都能弹条且定位正确；Highlight 刷色、Copy 剪贴板与 toast、Share 及其退化路径正确；浅色深色两套令牌正确；多实例互不干扰，卸载后停止所有任务。

## 使用示例

```tsx
import { QuoteShareTooltip } from "./QuoteShareTooltip";

export default function App() {
  return <QuoteShareTooltip />;
}
```
