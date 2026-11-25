# 自打字终端演示 — TerminalDemo

制作「自打字终端演示」场景：一张 340×340 的落地页卡片，主体是一扇深色终端窗口——命令 `npx create-solen@latest my-app` 被逐字符手打出来，回车后三行安装步骤依次转菊花变对勾、进度条同步涨到 100%，再打出 "Done · 4.2s"；随后手打第二条命令 `cd my-app && npm run dev`，输出绿色的 "▲ Ready on http://localhost:3000"。点击这个链接会在终端右下角弹出一枚迷你浏览器预览卡，左下角的 Replay 按钮随时重播整段时序。

## 布局与材质

- 340×340px 场景卡，圆角 30px，溢出裁切。背景为表面色叠顶部绿色微光：radial-gradient(90% 70% at 50% 0%, color-mix(in srgb, #22C55E 10%, transparent), transparent 70%)；外圈 1px 线色描边、下方 0 30px 60px -36px 强阴影。
- 终端窗口绝对定位 left 14px、right 14px、top 16px、bottom 62px，圆角 16px，背景 #0B0D12，描边 1px #232733，投影 0 20px 40px -20px rgba(0,0,0,.6)；文字 #D1D5DB，字体栈 ui-monospace、SFMono-Regular、Menlo、monospace，字号 10.5px、行高 1.75。
- 标题栏高 28px、内边距 0 12px、下缘 1px #1E222C 分隔线：三枚 9px 圆点从左到右 #F87171、#FBBF24、#34D399，右侧 "~/projects" 9.5px、#6B7280。正文区内边距 8px 12px，行容器 white-space:pre、溢出裁切。
- 行内配色：提示符 ❯ 与成功标记 ✔/▲ 用 #34D399，暗色输出与百分数用 #6B7280，进度条填充用 #34D399→#A78BFA 的 90° 渐变。进度条 110×6px、圆角 3px、底 #1F2430，宽度过渡 0.25s。打字光标 6×12px、#E5E7EB，以 1s steps(1) 闪烁；菊花字符 #A78BFA、宽 1ch。
- "Ready on" 行末的 localhost 地址是一个下划线按钮，颜色 #60A5FA，落线时播放 1.4s 的一次性辉光（30% 处 text-shadow 0 0 10px）；聚焦时 2px #60A5FA 外圈、偏移 2px。
- 迷你浏览器预览卡绝对定位 right 20px、bottom 74px、宽 150px，圆角 12px，背景表面色，1px 线色描边加 0 20px 40px -14px rgba(0,0,0,.5) 投影；头部是三枚 6px 线色圆点，正文内含 12px/900 标题 "My first page"、两根 5px 高的灰条（宽 90% 与 70%）和墨色胶囊按钮 "Get started"（8.5px/850）。卡片平时缩到 scale(.4) translateY(30px)、透明度 0，出现时以 0.45s cubic-bezier(.3,1.5,.5,1) 弹起（transform-origin 20% 100%）、透明度 0.25s 渐入。
- Replay 按钮绝对定位 left 14px、bottom 16px：高 34px、内边距 0 13px、圆角 11px，背景 surface-2、内描边 1px 线色，文字 11.5px/850 次级墨色，前置 12px 环形箭头 SVG；聚焦时 2px accent 外圈。
- 场景令牌浅色/深色两套（light-dark() 切换：浅色表面 #FFFFFF、墨色 #16151B、accent #6A57F2；深色表面 #13141C、墨色 #F4F0E8、accent #B7A4FF），只作用于场景底色与预览卡、Replay 按钮；终端窗口本体恒为深色。字体栈继承页面，等宽字体仅终端内容使用。

## 数据

- 命令与输出全部写死：第一条命令 `npx create-solen@latest my-app`；三个安装步骤 Downloading template、Installing packages、Writing config；完成行 `  Done · 4.2s`（行首两空格的暗色文本）；第二条命令 `cd my-app && npm run dev`；成功行为绿色 ▲ 加 "Ready on " 加链接文本 http://localhost:3000。
- 菊花字符固定 10 帧循环：⠋⠙⠹⠸⠼⠴⠦⠧⠇⠏。
- 预览卡文案固定：My first page、Get started。
- 进度百分数按步骤序号计算并四舍五入：33%、67%、100%。

## 操作和动效

- 自动开始：IntersectionObserver 首次观测到场景可见时启动整段时序（不支持观察器时立即启动），同一次会话只自动播一次。
- 时序（可用代数计数器守卫，重播会取消上一轮的挂起回调）：空提示符 ❯ 等 300ms 后开始逐字符打出第一条命令（每字 28ms 加 0–50ms 随机抖动，合计 28–78ms），停 250ms；插入进度条行，三个步骤行依次自旋——第 1 步 520ms、第 2 步 680ms、第 3 步 840ms（80ms 一帧菊花），各自完成时换成绿色 ✔ 并把进度条推到 33%/67%/100%；三步结束后进度条行移除、打出 Done · 4.2s；停 350ms 打第二条命令，停 450ms 输出 ▲ Ready 行，链接落位并泛一次辉光。
- 点击 localhost 链接：切换右下角迷你浏览器预览卡的显隐（再点一次收回）。
- 点击 Replay：清空终端正文、收起预览卡，按同一时序重播。
- 实现守卫：每条打字行的行内光标在打完后移除；步骤行插入在进度条行之前以保持输出次序；全部延时经同一代数计数器守卫，重播即作废上一轮所有挂起的打字、步骤与输出回调。
- 键盘与无障碍：终端 role="log"、aria-label "Terminal demo"，标题栏与预览卡装饰 aria-hidden；localhost 与 Replay 都是原生按钮，Tab 可达，Enter/Space 触发；两者均有 focus-visible 外圈。
- prefers-reduced-motion 下：打字改为整行直出、步骤等待压缩为 0ms、菊花直接落成 ✔，光标闪烁与链接辉光动画关闭，预览卡与进度条不再过渡。
- options.height 调整场景高度（默认 340），options.reducedMotion 覆盖系统偏好。支持同页多实例；卸载时清空挂起的打字/步骤计时器与观察器。

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| height | number | 340 | 场景高度，逻辑像素；窄容器整景按比例缩小 |
| reducedMotion | boolean | 跟随系统 | 覆盖系统的减少动态偏好 |

## 独立实现与六框架交付

- 仅凭本文从零生成可运行的实现。尺寸、颜色、文案与时序参数均以上述文字为准；终端、图标全部用 DOM、CSS 与内联 SVG 绘制，不加载远程图片、字体、视频或素材。
- 当前交付重点为 React，组件名称 TerminalDemo。从零创建四个文件：TerminalDemo.tsx、TerminalDemoEngine.js、motion-runtime.ts、TerminalDemoEngine.d.ts；分别实现框架入口、完整交互核心、实例生命周期和类型声明。文件名是需要生成的产物，不假定接收者已经拥有任何文件。
- 同时提供 React、Vue、Svelte、Solid、Preact、Vanilla 原生生命周期入口，共享框架无关核心。DOM 仅在挂载后访问，支持同页多实例；更新时保持状态，销毁时清理动画、计时器、观察器及监听器。不要用 iframe 代替组件实现。
- 依赖安装说明：npm install react react-dom。若使用依赖，只使用其公开 API；组件的布局、样式与算法必须在本次生成的文件中完整实现，不引用现成效果组件。
- 实现 options.height 以调整场景高度，options.reducedMotion 覆盖系统偏好；减少动态时整段流程仍完整走完并停在 Ready 状态。
- 给出每个文件的完整内容、安装和运行步骤、以下使用示例所需的全部实现。不得留省略号、待补素材或"自行补齐核心"的占位。
- 验收：375 / 768 / 1440px 无横向溢出；打字、进度、Ready 输出的时序正确；链接弹预览卡、Replay 重播可用；重播期间打断不残留旧回调；多实例互不干扰，卸载后停止所有任务。

## 使用示例

```tsx
import { TerminalDemo } from "./TerminalDemo";

export default function App() {
  return <TerminalDemo />;
}
```
