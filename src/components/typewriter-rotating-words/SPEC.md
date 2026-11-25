# 打字机轮换关键词 — TypewriterRotatingWords

一张 340×272 的 hero 卡片：左上角是等宽小字眉标「SOLEN DESIGN · STUDIO」，下面一行 31px 的大标题「What we build together is <关键词>.」——句末的关键词会被删掉再逐字重打，词库里四个词轮流转；关键词底下压着一条同色高亮条，右侧有一根跟着换色的竖直光标。卡片右上角还挂着一团随当前词颜色变化的柔光。指针悬在标题行上时轮换会停在当前词不再往下走。

## 布局与材质

- 340×272px 场景卡，圆角 28px，display flex、flex-direction column、内边距 24px 22px 18px，溢出裁切；底色 `var(--ux-surface)`，外圈 1px `var(--ux-line)` 描边加 `0 30px 60px -36px var(--ux-shadow-strong)` 阴影。卡片当前主题色记作 `--c`，初始取 `var(--ux-accent)`。
- 右上角装饰柔光：`::after` 绝对定位 right -60px、top -70px、200×200px、圆角 50%，底色 `radial-gradient(circle, color-mix(in srgb, var(--c) 26%, transparent), transparent 70%)`，过渡 background .6s `cubic-bezier(.22,1,.36,1)`，pointer-events none。
- 眉标：相对定位、margin 0，`font: 600 11px/1 ui-monospace, SFMono-Regular, Menlo, monospace`、字距 .14em、取 `var(--ux-ink-3)`，文字「SOLEN DESIGN · STUDIO」。
- 标题行：相对定位、margin 16px 0 0、min-height 100px、31px/1.24、字重 820、字距 -.045em。
  - 前半句「What we build together is」为 display block，取 `var(--ux-ink-2)`。
  - 关键词容器 inline、white-space nowrap；关键词本身相对定位、取 `var(--ux-ink)`，底色是 `linear-gradient(var(--c), var(--c))` 铺成 `0 100% / 100% .14em` 的高亮条，padding-bottom .04em，高亮条尺寸过渡 .3s `cubic-bezier(.22,1,.36,1)`；空字符串时去掉 padding。
  - 光标 inline-block、宽 3px、高 .95em、margin 0 2px 0 3px、vertical-align -.1em、圆角 2px、底色 `var(--c)`，动画 `u307-blink 1s steps(1) infinite`（一半时间 opacity 0），颜色过渡 .4s；正在打字时该动画暂停。
  - 句末句点紧跟光标，取 `var(--ux-ink)`。
  - 另有一个仅供读屏的隐藏 span（1×1px、overflow hidden、`clip-path: inset(50%)`、white-space nowrap），内容是当前关键词。
- 词库胶囊组：role="group"、aria-label「Change the word」，相对定位、margin-top auto、flex、可换行、gap 6px。
  - 每枚胶囊高 34px、内边距 0 13px、圆角 999px、底色 `var(--ux-surface-2)`、13px/700、取 `var(--ux-ink-2)`、`inset 0 0 0 1px var(--ux-line)`，过渡 background-color .3s、color .3s、box-shadow .3s、transform .35s `cubic-bezier(.34,1.56,.64,1)`；悬停时文字取 `var(--ux-ink)`，按下时 transform scale(.93)；选中态（aria-pressed="true"）底色换成该枚自己的 `--k`、文字 #fff、去掉描边。
  - 四枚胶囊的主题色依次是：products 用 `var(--ux-accent)`、experiences 用 `var(--ux-mint)`、brands 用 `var(--ux-warn)`、tomorrow 用 `var(--ux-accent-2)`。
- 场景令牌用 `light-dark()` 写两套（浅色 | 深色，跟随宿主 `prefers-color-scheme`）：`--ux-surface` #FFFFFF | #13141C；`--ux-surface-2` #F5F3EF | #1A1B25；`--ux-ink` #16151B | #F4F0E8；`--ux-ink-2` #57535F | rgba(244,240,232,.68)；`--ux-ink-3` #8E8A97 | rgba(244,240,232,.42)；`--ux-line` rgba(22,21,27,.09) | rgba(255,255,255,.08)；`--ux-accent` #6A57F2 | #B7A4FF；`--ux-accent-2` #2F8FE0 | #7DB4FF；`--ux-mint` #119C72 | #7EE8C0；`--ux-warn` #D6731E | #FFB26B；`--ux-shadow-strong` rgba(40,30,80,.3) | rgba(0,0,0,.72)。
- 字体：标题与胶囊继承宿主字体栈（根层不声明 font-family），眉标单独用等宽栈；场景固定 340px 宽，容器变窄时整景按比例缩小，不做自适应重排。

## 数据

- 词库写死四个：products、experiences、brands、tomorrow，与四枚胶囊一一对应，初始显示第一个。
- 每个词对应一个主题色变量，顺序为 `var(--ux-accent)`、`var(--ux-mint)`、`var(--ux-warn)`、`var(--ux-accent-2)`；当前主题色同时驱动关键词高亮条、光标与右上角柔光。
- 固定文案写死：眉标「SOLEN DESIGN · STUDIO」、句子前半「What we build together is」、句末句点「.」。
- 无外部数据请求，无图片或图标素材。

## 操作和动效

- 关键词按「先删后打」的节奏轮换：切到新词时先把当前显示的文字从末尾逐字符删掉，每 55ms 删一个字符，删空后停 220ms；随后把新词逐帧写进文本区，帧间隔 70ms 加 0–70ms 的随机抖动（即 70–140ms），写完即完成。
- 写词时把每个字拆成可组合的帧：英文单词一字一帧；韩文字符按输入法的组合过程拆成「初声字母」「初声+中声」「加终声（若有）」三帧，每帧都带上此前已写好的前缀，因此看到的是音节被拼起来的样子。用到的 19 个初声字母表为 ㄱㄲㄴㄷㄸㄹㅁㅂㅃㅅㅆㅇㅈㅉㅊㅋㅌㅍㅎ。
- 打字期间光标停止闪烁（根节点加 is-typing），写完恢复闪烁，并把当前主题色、读屏用的隐藏文本一并更新。
- 单词写完后停留 2300ms，然后自动轮换到下一个词（四个词循环）。若这 2300ms 到点时指针仍停在标题行上，则不换词、重新计时等待，指针移开后才继续轮换。
- 点任意一枚胶囊立即切到该词：若点的不是当前词，或当前正在打字，则重置当前流程重新开始打这个词；主题色、高亮条、光标与柔光同步换成该词的颜色，胶囊的选中态跟着移动。
- 组件的自动播放就是上面这条轮换循环，除此之外没有其它动画。
- `prefers-reduced-motion`：不做删除与逐字输入，整词直接出现；轮换节奏、胶囊点击与主题色切换照旧，光标不闪、过渡归零。
- 键盘：四枚胶囊都是原生 button，可用 Tab 聚焦、回车或空格触发切换；焦点样式沿用场景内的通用 focus-visible 规则。
- 无障碍：胶囊组是 role="group" 并带 aria-label「Change the word」，每枚胶囊用 aria-pressed 标记选中态；当前关键词另外写入一个仅供读屏的隐藏文本。

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| height | number | 272 | 场景高度，逻辑像素；窄容器整景按比例缩小 |
| reducedMotion | boolean | 跟随系统 | 覆盖系统的减少动态偏好 |

## 独立实现与六框架交付

- 仅凭本文从零生成可运行的实现。尺寸、颜色、文案、图形和运动算法均以上述文字为准；所有装饰用 CSS 与内联 SVG 绘制，不加载远程图片、字体、视频或素材。
- 当前交付重点为 React，组件名称 TypewriterRotatingWords。从零创建四个文件：TypewriterRotatingWords.tsx、TypewriterRotatingWordsEngine.js、motion-runtime.ts、TypewriterRotatingWordsEngine.d.ts；分别实现框架入口、完整交互核心、实例生命周期和类型声明。文件名是需要生成的产物，不假定接收者已经拥有任何文件。
- 同时提供 React、Vue、Svelte、Solid、Preact、Vanilla 原生生命周期入口，共享框架无关核心。DOM 仅在挂载后访问，支持同页多实例；更新时保持状态，销毁时清理动画、计时器、观察器及监听器。不要用 iframe 代替组件实现。
- 依赖安装说明：npm install react react-dom。若使用依赖，只使用其公开 API；组件的布局、样式、图形和算法必须在本次生成的文件中完整实现，不引用现成效果组件。
- 实现 options.height 以调整场景高度，options.reducedMotion 覆盖系统偏好；减少动态仍保留完整状态。
- 给出每个文件的完整内容、安装和运行步骤、以下使用示例所需的全部实现。不得留省略号、待补素材或「自行补齐核心」的占位。
- 验收：375 / 768 / 1440px 无横向溢出；删除—停顿—逐字输入的节奏与随机抖动正确；悬停暂停轮换、点击胶囊立即切换正确；浅色深色两套令牌正确；多实例互不干扰，卸载后停止所有任务。

## 使用示例

```tsx
import { TypewriterRotatingWords } from "./TypewriterRotatingWords";

export default function App() {
  return <TypewriterRotatingWords />;
}
```
