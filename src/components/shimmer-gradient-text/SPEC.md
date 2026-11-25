# 流光渐变标题 — ShimmerGradientText

一张 340×340 的问答场景卡：左上角三枚配色胶囊（Light、Rainbow、Gold）切换标题重点词的渐变色，标题「Long meeting notes, / summed up in three lines」里「three lines」用背景裁剪的渐变字绘制，渐变以 5 秒一次的线性循环向左流动；标题下方是一枚 34px 高的 Ask 圆胶囊，按钮文字同样走渐变字；卡片底部是一段问答——右侧紫色气泡是提问「Give me the key points from this week's meetings」，左侧浅色气泡是回答。点 Ask 后回答先变成「Thinking…」并让一道亮泽反复扫过字面，2.4 秒后亮泽停下，换成写好的整句答案。挂载即处于已回答状态，静态截图就能看到完整答案。

## 布局与材质

- 场景卡为 340×340px 的 div，圆角 30px，overflow 裁切。底色是表面色，外圈 1px 线色描边（0 0 0 1px），下方 0 30px 60px -36px 强阴影。场景体内 body 用 grid + place-items 居中。
- 场景令牌用 `light-dark()` 给浅色与深色两套：表面 #FFFFFF / #13141C，次表面 #F5F3EF / #1A1B25，三级表面 #EAE7E1 / #252632，主墨 #16151B / #F4F0E8，次墨 #57535F / rgba(244,240,232,.68)，弱墨 #8E8A97 / rgba(244,240,232,.42)，线 rgba(22,21,27,.09) / rgba(255,255,255,.08)，强线 rgba(22,21,27,.17) / rgba(255,255,255,.16)，强调色 #6A57F2 / #B7A4FF，次强调 #2F8FE0 / #7DB4FF，强调柔光 rgba(106,87,242,.12) / rgba(183,164,255,.15)，强调字色 #FFFFFF / #0B0C12，薄荷 #119C72 / #7EE8C0，警示 #D6731E / #FFB26B，危险 #D93A55 / #FF7D8C，玻璃 rgba(255,255,255,.58) / rgba(255,255,255,.07)，玻璃线 rgba(255,255,255,.85) / rgba(255,255,255,.18)，阴影 rgba(40,30,80,.14) / rgba(0,0,0,.45)，强阴影 rgba(40,30,80,.3) / rgba(0,0,0,.72)，渐变 120deg 的 #7B61FF→#3D8BFF 55%→#1FB89A（深色为 #B7A4FF→#7DB4FF 55%→#A5F2D3）。深浅切换由宿主的 color-scheme 决定，组件自身不写 color-scheme。
- 渐变字用一个额外的 `--g` 变量承载，挂在场景根上，默认 linear-gradient(90deg,#6366F1,#22D3EE,#A855F7,#6366F1)；根节点 data-s="1" 时换成 linear-gradient(90deg,#F43F5E,#F59E0B,#22C55E,#3B82F6,#A855F7,#F43F5E)，data-s="2" 时换成 linear-gradient(90deg,#92400E,#F59E0B,#FDE68A,#D97706,#92400E)。
- 配色胶囊条绝对定位在左 18px、上 16px，横向 flex、间距 5px。胶囊按钮无边框、内边距 5px 10px、圆角 999px、底色次表面色、内嵌 1px 线色描边、文字次墨色、10.5px/字重 800。选中态去掉描边、底色换成主墨色、文字换成表面色。胶囊条整体 role="group"、aria-label="Color set"。
- 标题绝对定位在左 22px、右 22px、上 56px：27px/行高 1.2/字重 900/字距 -.045em，`Long meeting notes,` 后跟一个 `<br>`，第二行是 `summed up in ` 加 `<em>three lines</em>`。em 去掉斜体，字形改用 `--g` 渐变填充：背景裁剪为文字（同时写 -webkit-background-clip）、文字色透明、背景尺寸 300% 100%，以 5s 线性动画从初始位移动到 -300% 0，形成向左流动的彩色带。
- Ask 按钮绝对定位在左 22px、上 140px：高 34px、内边距 0 15px、圆角 999px、底色表面色、内嵌 1.5px 线色描边、外投影 0 6px 16px -10px 强阴影、12px/字重 900。按钮内是一枚 span，span 去掉默认样式后与标题的 em 共用同一套渐变字与 5s 流动动画。
- 问答区绝对定位在左 18px、右 18px、下 18px，纵向 flex、间距 7px。提问气泡靠右（align-self flex-end）、最大宽 80%、内边距 8px 12px、圆角 14px 14px 4px 14px、底色强调色、文字 #fff、11.5px/字重 700。回答气泡靠左（align-self flex-start）、最大宽 88%、内边距 9px 12px、圆角 14px 14px 14px 4px、底色次表面色、11.5px/行高 1.5/字重 650，内部包一枚 span 承载正文与亮泽层。
- 亮泽层 `.u263-sh`：背景为 linear-gradient(90deg,弱墨 0 40%,主墨 50%,弱墨 60% 100%)、背景尺寸 250% 100%、背景裁剪为文字、文字透明、字重 800，1.5s 线性无限循环，背景位置从 100% 0 移到 -150% 0，于是高光从右往左扫过字面。
- 组件不声明字体族，字形继承宿主；问答区整体带 aria-live="polite"。

## 数据

- 三套配色方案各有一个名字与一条渐变：Light（默认，#6366F1→#22D3EE→#A855F7→#6366F1）、Rainbow（#F43F5E→#F59E0B→#22C55E→#3B82F6→#A855F7→#F43F5E）、Gold（#92400E→#F59E0B→#FDE68A→#D97706→#92400E）。方案名同时作为按钮文字。
- 标题文案固定为两行：「Long meeting notes,」与「summed up in three lines」，其中「three lines」是渐变部分。
- 提问固定为「Give me the key points from this week's meetings」。等待文案为「Thinking…」，最终答案为「Launch is set for Nov 3, pricing stays the same, and design review wraps up by Wednesday.」。
- 除上述内容外没有其他写死数据；没有图标与图片，全部图形由 CSS 与内联 SVG 之外的纯文字/渐变绘制。

## 操作和动效

- 挂载后立即把场景根打上 is-chat 类并直接写入最终答案，因此首帧就是「已回答」的静态画面，问答气泡不入场。
- 点 Ask：先清掉未触发的定时器，场景根加上 is-chat（气泡保持可见），把回答 span 的类换成带亮泽的版本、文字改成「Thinking…」；普通情况下 2400ms 后把亮泽类移除并写入最终答案文案，`prefers-reduced-motion` 下这个等待缩短到 300ms。重复点击不会叠加多个定时器。
- 问答气泡默认透明度 0 且下移 6px；场景根带 is-chat 时提问气泡透明度 1、位移归零（过渡 .3s），回答气泡同样归零但延迟 .15s（过渡 .3s .15s）。
- 点配色胶囊：场景根的 data-s 改成对应序号，三个按钮的 is-on 类与 aria-pressed 一起切换，标题重点词与 Ask 按钮文字的渐变随之换成新配色。流动动画不重启，只有渐变内容换掉。
- 标题渐变与按钮渐变共用 5s 线性无限循环动画（背景位移到 -300% 0）；亮泽层是独立的 1.5s 线性无限循环动画（背景位移 100% 0 → -150% 0）。两者都不自动暂停。
- `prefers-reduced-motion` 下：标题与按钮的渐变动画、亮泽扫过动画全部关闭（动画 none），文字仍保留渐变填充与亮泽配色，只是静止不动；等待时间缩到 300ms。
- 键盘操作：三枚配色胶囊与 Ask 都是原生 button，可用 Tab 依次到达、回车/空格触发；焦点可见样式为 2px 强调色实线外框，偏移 2px。
- 无障碍：配色胶囊条 role="group" aria-label="Color set"，每个胶囊带 aria-pressed 表示当前选中；问答区 aria-live="polite"，答案文字替换时会被读屏播报。
- 窄容器时整景按比例缩小：缩放系数为 min(1, 可用宽度 ÷ 340)，画面用 transform 等比缩放并保持居中，场景本身没有布局断点。

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| height | number | 340 | 场景高度，逻辑像素；窄容器整景按比例缩小 |
| reducedMotion | boolean | 跟随系统 | 覆盖系统的减少动态偏好 |

## 独立实现与六框架交付

- 仅凭本文从零生成可运行的实现。尺寸、颜色、文案、图形和运动算法均以上述文字为准；所有装饰用 CSS 与内联 SVG 绘制，不加载远程图片、字体、视频或素材。
- 当前交付重点为 React，组件名称 ShimmerGradientText。从零创建四个文件：ShimmerGradientText.tsx、ShimmerGradientTextEngine.js、motion-runtime.ts、ShimmerGradientTextEngine.d.ts；分别实现框架入口、完整交互核心、实例生命周期和类型声明。文件名是需要生成的产物，不假定接收者已经拥有任何文件。
- 同时提供 React、Vue、Svelte、Solid、Preact、Vanilla 原生生命周期入口，共享框架无关核心。DOM 仅在挂载后访问，支持同页多实例；更新时保持状态，销毁时清理动画、计时器、观察器及监听器。不要用 iframe 代替组件实现。
- 依赖安装说明：npm install react react-dom。若使用依赖，只使用其公开 API；组件的布局、样式、图形和算法必须在本次生成的文件中完整实现，不引用现成效果组件。
- 实现 options.height 以调整场景高度，options.reducedMotion 覆盖系统偏好；减少动态效果仍保留完整的三套配色、全部文案与「等待→回答」的切换过程。
- 给出每个文件的完整内容、安装和运行步骤、以下使用示例所需的全部实现。不得留省略号、待补素材或"自行补齐核心"的占位。
- 验收：375 / 768 / 1440px 无横向溢出；三套配色切换正确；Ask 后先显示「Thinking…」再换成答案；浅色深色两套令牌正确；多实例互不干扰，卸载后停止所有任务。

## 使用示例

```tsx
import { ShimmerGradientText } from "./ShimmerGradientText";

export default function App() {
  return <ShimmerGradientText />;
}
```
