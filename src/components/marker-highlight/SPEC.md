# 荧光笔划句 — MarkerHighlight

制作「荧光笔划句」卡片：一张 340×318 的读书笔记卡片。眉标 Design notes · ch. 3 之下是一段 19.5px 的短文，三处短语（can be used without explanation、a quiet way back、moves at a human pace.）会被一支虚拟荧光笔按顺序从左到右扫过——笔触是一条两端斜切的半透明色带，宽度随短语长度给定时长依次展开。底部左侧是黄、薄荷、粉三支笔形色块（36×36 的圆角小卡内斜放一支 12×22 的笔身），点击换色时整段高亮颜色以 0.7s 平滑过渡到新色；右侧一枚墨色 Redraw 胶囊，点击后笔触先整体收回再重划一遍。

## 布局与材质

- 340×318px 场景卡，圆角 28px，溢出裁切，纵向 flex 布局，内边距 22px 22px 18px。底色表面色，外圈 0 0 0 1px 线色描边加 0 30px 60px -36px 强阴影。场景令牌浅色/深色两套（CSS light-dark，`prefers-color-scheme: dark` 切换）：页面底 #FFFFFF/#0B0C12，表面 #FFFFFF/#13141C，次表面 #F5F3EF/#1A1B25，三级表面 #EAE7E1/#252632，墨色 #16151B/#F4F0E8，次级墨 #57535F/rgba(244,240,232,.68)，三级墨 #8E8A97/rgba(244,240,232,.42)，线色 rgba(22,21,27,.09)/rgba(255,255,255,.08)。缓动曲线预置两支：--ux-ease 为 cubic-bezier(.22,1,.36,1)，--ux-spring 为 cubic-bezier(.34,1.56,.64,1)。
- 眉标 Design notes · ch. 3：12px/字重 750、三级墨色、margin 0。
- 正文 margin-top 12px：19.5px、行高 1.62、字重 650、字距 -0.025em、次级墨色。三处 `<mark>` 短语文字用墨色。笔触是 mark 的背景图：`linear-gradient(100deg, transparent .15em, 主色 58% .3em, 主色 52% calc(100% − .3em), transparent calc(100% − .1em))`——两端 .1em–.3em 的透明渐隐模拟笔锋起收，倾斜 100deg，不重复铺排、垂直位置 72%、背景高度 62%，宽度从 0% 展开到 100%，短语圆角 3px。主色是经 `@property` 注册的自定义属性（syntax 为 `<color>`、可继承、初始 #FFD43B），因此颜色本身可以参与过渡。
- 底栏 margin-top auto（贴住卡片底部）、横向排列、间距 8px。左侧笔色组 flex 1、内部间距 6px，role="group"、aria-label 为 Pen color，三枚按钮各 36×36px、圆角 12px、背景次表面、内部居中一支笔身：12×22px、圆角 3px 3px 6px 6px、背景取各自颜色、旋转 30°、内嵌 0 -6px 0 rgba(0,0,0,.18) 的笔尖暗部；三色分别为 #FFD43B（Yellow）、#38D9A9（Mint）、#FF6B9D（Pink）。选中笔 box-shadow 0 0 0 2px 墨色。按钮 transition：transform 0.35s spring、box-shadow 0.25s；按下时缩放 0.9。
- Redraw 按钮高 38px、左右内边距 15px、圆角 999px、背景墨色、文字取页面底色（浅色白/深色 #0B0C12）、13px/字重 750，transform 过渡 0.35s spring，按下缩放 0.93。

## 数据

- 三处高亮短语写死在正文里：can be used without explanation（31 字符）、a quiet way back（16 字符）、moves at a human pace.（22 字符）；眉标 Design notes · ch. 3；三支笔颜色 #FFD43B、#38D9A9、#FF6B9D，默认选中黄色。
- 每处笔触的时长与延迟在初始化时按短语长度算好并写入该 mark 的 CSS 变量：时长 = min(1.4, 0.25 + 字符数 × 0.045) 秒。按上面的字符数，三处时长分别为 1.4s（封顶）、0.97s、1.24s；起点依次为 0.25s、1.77s（0.25 + 1.4 + 0.12）、2.86s（1.77 + 0.97 + 0.12），末处在 2.86 + 1.24 = 4.1s 整划完。
- 无其他写死数据。

## 操作和动效

- 载入后（双重 requestAnimationFrame）根节点加 is-on，三处笔触依次扫开：时长与延迟按「数据」一节写死的公式逐处排布，处与处之间衔接 0.12s；CSS 里两组变量自带缺省值 --d 0.6s、--w 0s，初始化一旦完成即被逐处覆写；展开曲线 cubic-bezier(.55,.1,.3,1)，只改背景宽度（0% → 100%），短语跨行换行时整段同步铺开，不逐行补色。
- 点击 Redraw：先移除 is-on、加 is-off（此时笔触改用 0.35s ease 的短过渡收回为 0 宽），380ms 后（减少动态时立即）移除 is-off、强制一次回流再重加 is-on 重放整段扫句；连点会先清掉上一轮的定时器再重来，不会出现两套时序打架。
- 点击笔：三枚按钮 aria-pressed 互斥更新（点中的为 true），根节点的笔色变量设为新色；由于颜色经 @property 注册，已划好的高亮以 0.7s cubic-bezier(.22,1,.36,1) 平滑染成新色，划到一半的笔触在展开的同时变色。
- 无障碍：笔与 Redraw 均为原生 button（键盘可达，Tab 顺序为三支笔再到 Redraw，沿用浏览器默认焦点样式）；笔色组带 role="group" 与 aria-label Pen color，每枚笔以 aria-label 标注 Yellow/Mint/Pink；高亮用语义 `<mark>` 元素，正文中划过的部分读屏时仍按原文连读。
- `prefers-reduced-motion` 下：运行时宿主把全部过渡与动画时长压为 0，笔触直接整体呈现，Redraw 的收回等待跳过（立即重置再显示）；换色瞬间完成。
- options.height 调整场景高度（默认 318），窄容器整景按比例缩小；options.reducedMotion 覆盖系统偏好。支持同页多实例，更新选项不重挂载，卸载时清理定时器与监听器。

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| height | number | 318 | 场景高度，逻辑像素；窄容器整景按比例缩小 |
| reducedMotion | boolean | 跟随系统 | 覆盖系统的减少动态偏好 |

## 独立实现与六框架交付

- 仅凭本文从零生成可运行的实现。尺寸、颜色、文案、笔触算法与运动参数均以上述文字为准；界面用 DOM 与 CSS 绘制，不加载远程图片、字体、视频或素材。
- 当前交付重点为 React，组件名称 MarkerHighlight。从零创建四个文件：MarkerHighlight.tsx、MarkerHighlightEngine.js、motion-runtime.ts、MarkerHighlightEngine.d.ts；分别实现框架入口、完整交互核心、实例生命周期和类型声明。文件名是需要生成的产物，不假定接收者已经拥有任何文件。
- 同时提供 React、Vue、Svelte、Solid、Preact、Vanilla 原生生命周期入口，共享框架无关核心。DOM 仅在挂载后访问，支持同页多实例；更新时保持状态，销毁时清理动画、计时器、观察器及监听器。不要用 iframe 代替组件实现。
- 依赖安装说明：npm install react react-dom。若使用依赖，只使用其公开 API；组件的布局、样式与算法必须在本次生成的文件中完整实现，不引用现成效果组件。
- 实现 options.height 以调整场景高度，options.reducedMotion 覆盖系统偏好；减少动态效果仍保留三处高亮与三支可选笔的完整状态。
- 给出每个文件的完整内容、安装和运行步骤、以下使用示例所需的全部实现。不得留省略号、待补素材或「自行补齐核心」的占位。
- 验收：375 / 768 / 1440px 无横向溢出；依次扫句、短语定长定时、换色平滑过渡、Redraw 重划均正确；浅色深色两套令牌正确；多实例互不干扰，卸载后停止所有任务。

## 使用示例

```tsx
import { MarkerHighlight } from "./MarkerHighlight";

export default function App() {
  return <MarkerHighlight />;
}
```
