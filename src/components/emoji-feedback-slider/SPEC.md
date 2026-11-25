# 变脸满意度滑杆 — EmojiFeedbackSlider

一张 340×350 的订单反馈卡：顶部一句问话，下方是一颗 132px 的 SVG 表情脸——眉毛、眼形、嘴巴、腮红、脸面颜色全部由一个 0 到 100 的数值连续插值。拖动底部滑杆，眉头从紧皱一路松开到眉挑，嘴角从倒撇一路变成大笑，最后嘴角还会裂开露出舌头；脸的底色也同时从浅红经橙黄过渡到草绿。脸下方是随数值滚动切换的五段评价文案（从「Not great」到「Loved it」）。最底下一颗通栏按钮点下去，评价文案的位置换成一句感谢语浮起，同时整张脸轻轻上下弹跳一次。

## 布局与材质

- 场景根：宽 340px、高 350px、圆角 28px、overflow hidden、position relative，纵向 flex、水平居中，内边距 20px；底色 `color-mix(in oklab, var(--bg, #FFD43B) 20%, var(--ux-surface))`，其中 `--bg` 由表情插值实时写入；外描边 `0 0 0 1px var(--ux-line)`，投影 `0 30px 60px -36px var(--ux-shadow-strong)`。
- 场景令牌（`light-dark()` 随 `color-scheme` 切换，浅 / 深两套）：page `#FFFFFF` / `#0B0C12`，surface `#FFFFFF` / `#13141C`，surface-2 `#F5F3EF` / `#1A1B25`，surface-3 `#EAE7E1` / `#252632`，ink `#16151B` / `#F4F0E8`，ink-2 `#57535F` / `rgba(244,240,232,.68)`，ink-3 `#8E8A97` / `rgba(244,240,232,.42)`，line `rgba(22,21,27,.09)` / `rgba(255,255,255,.08)`，line-2 `rgba(22,21,27,.17)` / `rgba(255,255,255,.16)`，accent `#6A57F2` / `#B7A4FF`，accent-2 `#2F8FE0` / `#7DB4FF`，accent-soft `rgba(106,87,242,.12)` / `rgba(183,164,255,.15)`，accent-ink `#FFFFFF` / `#0B0C12`，mint `#119C72` / `#7EE8C0`，warn `#D6731E` / `#FFB26B`，danger `#D93A55` / `#FF7D8C`，glass `rgba(255,255,255,.58)` / `rgba(255,255,255,.07)`，glass-line `rgba(255,255,255,.85)` / `rgba(255,255,255,.18)`，shadow `rgba(40,30,80,.14)` / `rgba(0,0,0,.45)`，shadow-strong `rgba(40,30,80,.3)` / `rgba(0,0,0,.72)`；缓动 `--ux-ease: cubic-bezier(.22,1,.36,1)`、`--ux-spring: cubic-bezier(.34,1.56,.64,1)`。
- 问句：15px、字重 800、字距 -0.02em，外边距归零；文案固定为 `How was this order?`。
- 表情脸：132×132px，上外边距 14px，SVG viewBox `0 0 132 132`、overflow visible。脸盘是半径 62 的圆，填充当前 `--bg`（初始 `#FFD43B`）；眉毛、眼、嘴用 `#2B2118` 的 5px 圆头描边（眼睛与嘴巴本体填 `#2B2118`）；腮红是左右两枚 11×7 的椭圆，填 `#FF6B6B`；舌头是 11×7 的椭圆，填 `#FF8A8A`，并用嘴形路径作为 clipPath 裁切，因此张嘴时舌头只露在嘴里。
- 评价文案槽：高 26px、overflow hidden、上外边距 12px、居中；五个文案 span 叠排，整条位移用 transform，过渡 .5s var(--ux-spring)；文字 19px、行高 26px、字重 850、字距 -0.03em。
- 感谢语：绝对定位 left 0、right 0、top 198px，居中，19px、行高 26px、字重 850、字距 -0.03em、色 `var(--ux-ink)`，默认 opacity 0 且 pointer-events none。
- 滑杆行：宽度 100%、margin-top auto，贴着场景底部。滑杆本体 34px 高、appearance none、透明底、pointer 手型；轨道 10px 高、圆角 10px、底色 `linear-gradient(90deg,#FF6B6B,#FFD43B,#51CF66)` 的连续三段渐变（不是分段色块）；滑块 28×28px、圆形、白色底，外圈 3px 当前 `--bg` 光环加投影 `0 4px 10px rgba(0,0,0,.25)`。
- 提交按钮：通栏、高 44px、上外边距 10px、圆角 14px、无边框，底色 `var(--ux-ink)`、字色 `var(--ux-page)`、14px、字重 800，按下时缩到 0.96（过渡 .35s var(--ux-spring)）。
- 场景不引入自定义字体，字体栈继承宿主页面。
- 响应式：固定 340×350，没有布局断点；容器宽度不足 340px 时整景按 `min(1, 容器宽 / 340)` 等比缩小，缩放锚点在左上角，占位高度同步收缩。

## 数据

- 五段评价文案写死，顺序固定：`Not great`、`Could be better`、`It’s okay`、`Good`、`Loved it`；槽内五段文案是五个独立 span，靠整体位移滚轮式切换。
- 滑杆是原生 range 输入，min 0、max 100、初始值 55；`aria-label` 为 `Satisfaction`。
- 表情几何参数写死：眉基线 y 从 40 起步，右端随值抬高最多 12px；眼椭圆初始 6×8px；嘴初始宽 20px、位于 y 98；舌心初始 y 为嘴形中心。
- 脸面颜色的三段配色写死：起点 `#FF8787`（差评红）、中点 `#FFD43B`（中性黄）、终点 `#69DB7C`（好评绿）。
- 没有外部数据请求。

## 操作和动效

- 拖动滑杆触发 `input`，目标值取滑杆当前值；随后每帧把显示值向目标逼近 `shown += (target - shown) × 0.25`，差值小于 0.2 时直接吸附到目标值并停止循环，形成约 0.3 秒的跟手感。整套表情在每帧按显示值重画。
- 表情插值规则（t = 值 / 100）：眉毛在 t < 0.5 时左端压低 9px、右端抬起 9px 呈皱眉，t 到 0.5 后眉形展平；眉形整体 y 坐标在 t > 0.5 后再上移最多 12px，形成挑眉。眼睛在 t 从 0.6 到 0.8 之间由 6×8 的圆眼收成 7.5×2.2 的细缝；t 到 0.8 之后细眼淡出，换成两条向上弯的弧线笑眼。嘴巴：曲率从 -16（倒撇）线性走到 14（微笑）后转正，再由 t = 0.68 起张开，张开量让下唇曲率从 6 增到 46、半宽再额外加 3，嘴形随之变成张开的大笑；舌头随张开量放大并淡入。腮红透明度为 `max(0, (t - 0.5) × 1.6)`。
- 脸面底色随值在红—黄—绿三色之间线性插值后写入 `--bg`；因为场景底色也混入了这个 `--bg`（20% 混入表面色），整张卡片的底色会跟着表情一起变暖或变冷。
- 评价文案按 `step = min(4, floor(t × 5))` 分档，档位变化时整条文案位移 `-26 × step` 像素（切换时可见 26px 的滚动），同时滑杆的 `aria-valuetext` 被改写成当前档位的文案，屏幕阅读器读到的就是评价词而不是数字。
- 点提交按钮：感谢语 `Thanks for the feedback!` 写入并触发一条 1.9s 的 `u380-ty` 动画（0% 透明并下移 12px，15% 到 82% 完全显形，100% 淡出并上移 8px，缓动 cubic-bezier(.22,1,.36,1)）；与此同时评价文案槽播一条同长的 `u380-lh` 动画：0% 到 12% 保持可见，12% 到 86% 淡出，86% 后淡回，等于把位置腾给感谢语。若浏览器支持 Web Animations API，脸还会额外播一段 900ms 的 ease-in-out 位移序列：静止 → 30% 处下移 8px 并转 -3° → 60% 处上移 4px → 80% 处下移 6px → 归位。
- 键盘：滑杆是原生 range，可用左右方向键微调（步长 1）、PageUp/PageDown 大步长、Home/End 到两端，每次都会触发同一套插值；提交按钮是原生按钮，可 Tab 聚焦、Enter 或空格触发。
- 无障碍：问句、脸与评价槽为常规文本与图形（脸标记为对读屏隐藏，评价槽标记为装饰）；感谢语是 `role="status"` 的实时区域；滑杆带 `aria-label` 并同步 `aria-valuetext`。
- `prefers-reduced-motion`（或 options.reducedMotion 为 true）：滑杆值直接跳到目标并立刻重画表情（没有跟手缓动），提交后不播飘字动画与脸部弹跳（样式表里把这两条动画置为 none），感谢语文案仍然出现并停在屏幕中央。

## Props

组件只接受一个 `options` 对象，其内部字段与文档页 API 表一致：

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| height | number | 350 | 场景高度，逻辑像素；窄容器整景按比例缩小 |
| reducedMotion | boolean | 跟随系统 | 覆盖系统的减少动态偏好 |

## 独立实现与六框架交付

- 仅凭本文从零生成可运行的实现。尺寸、颜色、文案、图形和运动算法均以上述文字为准；表情用内联 SVG 路径与椭圆按帧重绘，其余用 DOM 与 CSS，不加载远程图片、字体、视频或素材。
- 当前交付重点为 React，组件名称 EmojiFeedbackSlider。从零创建四个文件：EmojiFeedbackSlider.tsx、EmojiFeedbackSliderEngine.js、motion-runtime.ts、EmojiFeedbackSliderEngine.d.ts；分别实现框架入口、完整交互核心、实例生命周期和类型声明。文件名是需要生成的产物，不假定接收者已经拥有任何文件。
- 同时提供 React、Vue、Svelte、Solid、Preact、Vanilla 原生生命周期入口，共享框架无关核心。DOM 仅在挂载后访问，支持同页多实例；更新时保持状态，销毁时清理动画、计时器、观察器及监听器。不要用 iframe 代替组件实现。
- 依赖安装说明：npm install react react-dom。若使用依赖，只使用其公开 API；组件的布局、样式、图形和算法必须在本次生成的文件中完整实现，不引用现成效果组件。
- 实现 options.height 以调整场景高度（默认 350），options.reducedMotion 覆盖系统偏好；减少动态效果时仍保留完整的表情形态与提交后的感谢文案。
- 给出每个文件的完整内容、安装和运行步骤、以下使用示例所需的全部实现。不得留省略号、待补素材或"自行补齐核心"的占位。
- 验收：375 / 768 / 1440px 无横向溢出；滑杆从 0 到 100 时眉头、眼睛、嘴形、舌头、腮红与脸面颜色全程连续变化；评价文案按五档切换且 aria-valuetext 同步；提交后感谢语出现；多实例互不干扰，卸载后停止所有任务。

## 使用示例

```tsx
import { EmojiFeedbackSlider } from "./EmojiFeedbackSlider";

export default function App() {
  return <EmojiFeedbackSlider />;
}
```
