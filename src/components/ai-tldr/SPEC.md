# AI 摘要划线折叠 — AiTldr

制作「AI 摘要划线折叠」场景：一张 340×340 的会议笔记卡。头部是 "Weekly product meeting · Oct 14 · 6 attendees" 和一枚紫色渐变的 Summarize 按钮；正文是七句会议纪要。点击 Summarize 后，一道带紫色辉光的横线沿正文自上而下扫过（1.7 秒），途经的三句关键句被黄色荧光笔逐句点亮；扫读结束后正文以 clip-path 向上折叠消失，取而代之的是一枚渐变描边摘要卡，三条要点逐字符打出（带紫色光标），头部按钮换成 Show original 可在摘要与原文之间来回切换，阅读时长徽章也从 "4 min read" 变 "20 sec read"。

## 布局与材质

- 340×340px 场景卡，圆角 30px，溢出裁切，背景表面色，外圈 1px 线色描边、下方 0 30px 60px -36px 强阴影。窄容器时整景按 min(1, 可用宽/340) 等比缩放。
- 头部绝对定位 left 18px、右 16px、上 18px：标题 "Weekly product meeting" 15px/900、字距 -0.02em；下行元信息 10px/700 三级墨色 "Oct 14 · 6 attendees"，后跟阅读时长徽章（内边距 0 6px、圆角 5px、surface-2 底、tabular-nums）——初始 "4 min read"，摘要态换 #10B981 15% 混色底与 #047857 绿字的 "20 sec read"。
- Summarize 按钮：高 30px、内边距 0 12px、圆角 999px，背景 135deg #8B5CF6→#EC4899 渐变、白字 11.5px/850，前置 12px 四角星 SVG；禁用时透明度 0.45。完成后隐藏，同位置换成切换按钮（高 30px、内边距 0 11px、圆角 999px、surface-2 底、1px 线色内描边、11px/800 次级墨色），文案 "Show original"/"Show summary"。
- 正文区绝对定位 left 14px、右 14px、上 66px、下 14px。原文层内边距 4px 4px 0，文字 11.5px、行高 1.65、字重 600、次级墨色；每句是一个 span，高亮底色为 linear-gradient(transparent 52%, #FACC15 55%) 的下半填充，background-size 从 0 到 100% 过渡 0.5s ease，点亮后文字转主墨色。
- 扫读光束：正文层顶部悬一条全宽 46px 高的渐变带（transparent→#A855F7 22%），下缘 2px #A855F7 实线加 0 6px 14px -4px #A855F7 投影，平时透明。
- 折叠动画：原文层 clip-path 从 inset(0 0 0 0 round 14px) 过渡到 inset(0 0 100% 0 round 14px)（0.55s cubic-bezier(.6,0,.3,1)）并淡出。
- 摘要卡：圆角 16px、内边距 14px 14px 6px，边框用 1.5px 透明边框加 135deg #8B5CF6→#EC4899 渐变描边（border-box 技法）；平时透明度 0、translateY(-10px) scale(.97)，出现时延迟 0.35s、位移 0.45s cubic-bezier(.3,1.3,.5,1)。头部一行 "3 key points"（10px/850、#A855F7）加 12px 星形 SVG；列表三项无序号标记，改用 18×18px 圆角 6px 的序号方块（#A855F7 14% 底、#9333EA 字、10px/900）；条目 12px/750、行高 1.45、左内边距 26px、下缘 1px 线色分隔线。
- 打字光标：2×12px 紫色竖线（#A855F7），以 0.8s steps(1) 闪烁，当前正在打的条目才显示。
- 场景令牌浅色/深色两套（light-dark() 切换：浅色表面 #FFFFFF、墨色 #16151B、accent #6A57F2；深色表面 #13141C、墨色 #F4F0E8、accent #B7A4FF）；#8B5CF6/#EC4899/#A855F7/#FACC15 为固定强调色。字体栈继承页面。

## 数据

- 正文写死七句，每句带是否关键句的标记（1 为关键）：1. "Last week we had 1,284 sign-ups, up 18% from the week before."（关键）2. "Ad spend stayed flat, and most of the new sign-ups came from the new landing page." 3. "However, drop-off at checkout was high at 42%."（关键）4. "The card field getting cut off on mobile looks like the cause." 5. "Design will cut checkout down to a single step this week."（关键）6. "Engineering ships the fix by Friday and shares results at the next meeting." 7. "The next meeting is Oct 21 at 10 AM."
- 三条要点写死："1,284 sign-ups, up 18% (new landing page)"、"42% checkout drop-off · mobile card field cut off"、"Checkout down to one step this week, ship Friday"。
- 头部文案写死：Weekly product meeting、Oct 14 · 6 attendees、4 min read、20 sec read、Summarize、Show original、Show summary、3 key points。

## 操作和动效

- 点击 Summarize：按钮立即禁用；光束点亮后由 requestAnimationFrame 在 1700ms 内匀速扫过整个正文高度，扫过的位置之下所有关键句（按 span 顶部 +8px 阈值判定）依次点亮荧光底；扫完后光束淡出。
- 扫读结束 250ms 后：整卡进入摘要态——原文折叠、摘要卡延迟 0.35s 升起，阅读徽章换 "20 sec read"，按钮切为 "Show original" 并恢复可用。
- 再过 400ms：三条要点开始逐字符打出（每字 22ms，条目间停 160ms），当前条目带紫色闪烁光标。
- 切换按钮：在摘要/原文两个折叠态间往返（clip-path 折叠与展开复用同一过渡），文案与阅读徽章同步互换；Summarize 完成后不再出现，荧光与摘要内容保持。
- 键盘与无障碍：两个按钮均为原生按钮、focus-visible 2px accent 外圈；摘要卡容器 aria-live="polite"；星形 SVG 与光束 aria-hidden。
- prefers-reduced-motion 下：光束跳过（关键句直接全部点亮）、折叠与升起不再过渡、要点整条直出、光标不闪。
- options.height 调整场景高度（默认 340），options.reducedMotion 覆盖系统偏好。支持同页多实例；卸载时取消扫读帧回调与打字计时器。

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| height | number | 340 | 场景高度，逻辑像素；窄容器整景按比例缩小 |
| reducedMotion | boolean | 跟随系统 | 覆盖系统的减少动态偏好 |

## 独立实现与六框架交付

- 仅凭本文从零生成可运行的实现。尺寸、颜色、文案与运动参数均以上述文字为准；荧光、光束与渐变描边全部用 CSS 绘制，不加载远程图片、字体、视频或素材。
- 当前交付重点为 React，组件名称 AiTldr。从零创建四个文件：AiTldr.tsx、AiTldrEngine.js、motion-runtime.ts、AiTldrEngine.d.ts；分别实现框架入口、完整交互核心、实例生命周期和类型声明。文件名是需要生成的产物，不假定接收者已经拥有任何文件。
- 同时提供 React、Vue、Svelte、Solid、Preact、Vanilla 原生生命周期入口，共享框架无关核心。DOM 仅在挂载后访问，支持同页多实例；更新时保持状态，销毁时清理动画、计时器、观察器及监听器。不要用 iframe 代替组件实现。
- 依赖安装说明：npm install react react-dom。若使用依赖，只使用其公开 API；组件的布局、样式与算法必须在本次生成的文件中完整实现，不引用现成效果组件。
- 实现 options.height 以调整场景高度，options.reducedMotion 覆盖系统偏好；减少动态时摘要内容与关键句高亮仍然完整呈现。
- 给出每个文件的完整内容、安装和运行步骤、以下使用示例所需的全部实现。不得留省略号、待补素材或"自行补齐核心"的占位。
- 验收：375 / 768 / 1440px 无横向溢出；扫读点亮、折叠、打出要点、Show original/Show summary 往返四态正确；浅色深色两套令牌正确；多实例互不干扰，卸载后停止所有任务。

## 使用示例

```tsx
import { AiTldr } from "./AiTldr";

export default function App() {
  return <AiTldr />;
}
```
