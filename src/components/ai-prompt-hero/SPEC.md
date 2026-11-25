# 轮换示例 AI 输入框 — AiPromptHero

340×340 的 AI 产品首屏场景。卡片上方是居中的大标题「What should we build?」和副题「Describe it and it becomes a screen」，中间是一枚会呼吸的辉光输入框；输入框空着时，占位示例逐字打出、停顿、退格删除，再轮换到下一句示例。输入框下方有三枚建议胶囊，点一下就把整句请求逐字写进输入框。按下发送后标题与输入区整体上抬、芯片条淡出，下方滑出一块结果面板，先显示 Building 与三条流光骨架行，完成后变成「Done! Open preview」并回显用户写的原文，右下角浮出一枚 New prompt 按钮可整体复位。

## 布局与材质

- 340×340px 场景卡，圆角 30px，溢出裁切。底色为表面色叠一层顶部径向高光：`radial-gradient(90% 60% at 50% 0%, color-mix(in srgb, accent 16%, transparent), transparent 70%)`；外圈 1px 线色描边，投影 `0 30px 60px -36px` 深色阴影。
- 场景内层是绝对定位的整屏包裹层：初始 `transform: translateY(46px)`，随 `transform .6s cubic-bezier(.3,1,.3,1)`；进入生成态或完成态时归位为 `translateY(0)`，让结果面板的位置腾出来。
- 标题 `What should we build?` 绝对定位在 top 30px，左右铺满居中，22px、字重 900、字距 -0.035em；副题 `Describe it and it becomes a screen` 在 top 62px，11.5px、字重 650、三级墨色。
- 输入框外框绝对定位 left 18px / right 18px / top 92px，高 92px，圆角 20px，内衬 1.5px；外框背景是锥形渐变 `conic-gradient(from var(--u233-a,0deg), accent, #22D3EE, #F472B6, accent)`，配合 `@property --u233-a`（syntax `<angle>`，initial 0deg）以 `u233-spin` 6s linear infinite 匀速转一圈。外框内部是同一张卡的表面色面板，圆角 18.5px，内边距 12px 14px。
- 文本域铺满面板：宽 100%、高 46px、无边框无背景、不可拉伸，13px、行高 1.45、字重 650、墨色。占位层是一枚绝对定位的 span，left 14px / top 12px / right 56px，13px、字重 600、三级墨色、不接收指针事件；它末尾的 `::after` 画一根 1.5px 宽、1.05em 高的 accent 色光标，`u233-cur` 1s steps(2) 无限闪烁（50% 处透明度归零）。
- 发送按钮是面板右下角的 32×32 圆形按钮（right 10px / bottom 10px），底色墨色、图标取表面色，内含一枚 14×14 的向上箭头内联 SVG（路径 `M7 12V2M2.5 6.5 7 2l4.5 4.5`，描边 1.9、圆头圆角连接）。禁用时透明度 0.35。生成态时箭头隐藏，换成 14×14 的描边转圈（2px 边框、右侧透明，`u233-rot` 0.7s linear infinite）。
- 建议胶囊行绝对定位 left 18px / right 18px / top 194px，横向居中排列、间距 6px，过渡 opacity 0.3s 与 transform 0.3s。胶囊本身：内边距 6px 11px、圆角 999px、底色次级表面色、inset 0 0 0 1px 线色描边、11px、字重 750、二级墨色；悬停时底色换成 accent 淡色（12%）、文字变主墨色。生成态与完成态下整行淡出并下移 6px、不可点。
- 结果面板绝对定位 left 18px / right 18px / top 196px、高 124px、圆角 16px、内边距 12px 14px，底色次级表面色、inset 0 0 0 1px 线色描边；初始 opacity 0、`translateY(14px) scale(.97)`，过渡 opacity 0.35s 与 transform 0.45s `cubic-bezier(.2,.9,.3,1.1)`，生成态另加 0.18s 延迟；出现时恢复不透明与原位并接管指针。
- 结果面板头部一行：8px 的 accent 圆点（`u233-pl` 1.2s ease-out 无限外扩一圈 7px 的透明光晕，完成态改为薄荷绿并停掉动画）＋ 11px、字重 850 的状态词。状态词下方是 10px、字重 650、三级墨色的副行。再往下三条骨架线，每条高 9px、圆角 5px、上间距 7px，底色为 `linear-gradient(90deg, line 0 30%, accent 混表面 50%, line 70%)`、尺寸 300% 100%，`u233-sh` 1.4s linear infinite 左右流动；三条宽度分别写死为 92%、74%、84%；完成态停掉流动并铺成 accent 混表面 22% 的实色。
- New prompt 按钮绝对定位在结果面板右下（right 12px / bottom 10px），内边距 5px 10px、圆角 999px、墨色底、文字取表面色、10px、字重 800，完成态才淡入并接管指针。
- 场景令牌用 `light-dark()` 同时给出浅色与深色两套（系统深色时自动切换）：表面 #FFFFFF / #13141C，次级表面 #F5F3EF / #1A1B25，三级表面 #EAE7E1 / #252632，墨色 #16151B / #F4F0E8，二级墨色 #57535F / rgba(244,240,232,.68)，三级墨色 #8E8A97 / rgba(244,240,232,.42)，线色 rgba(22,21,27,.09) / rgba(255,255,255,.08)，强线色 rgba(22,21,27,.17) / rgba(255,255,255,.16)，强调色 #6A57F2 / #B7A4FF，强调色二 #2F8FE0 / #7DB4FF，强调淡色 rgba(106,87,242,.12) / rgba(183,164,255,.15)，强调底字色 #FFFFFF / #0B0C12，薄荷 #119C72 / #7EE8C0，警示 #D6731E / #FFB26B，危险 #D93A55 / #FF7D8C，玻璃 rgba(255,255,255,.58) / rgba(255,255,255,.07)，玻璃描边 rgba(255,255,255,.85) / rgba(255,255,255,.18)，阴影 rgba(40,30,80,.14) / rgba(0,0,0,.45)，强阴影 rgba(40,30,80,.3) / rgba(0,0,0,.72)，品牌渐变 `linear-gradient(120deg,#7B61FF,#3D8BFF 55%,#1FB89A)` / `linear-gradient(120deg,#B7A4FF,#7DB4FF 55%,#A5F2D3)`。
- 组件不自带字体族，沿用宿主页正文栈（system-ui、-apple-system、Segoe UI、Roboto、Helvetica Neue、Arial、PingFang SC、Hiragino Sans GB、Microsoft YaHei、Noto Sans SC、sans-serif），文字元素统一 `font: inherit`。场景宽度固定 340px，容器不够宽时整景按比例缩放，不会横向溢出；没有额外的响应式断点。

## 数据

- 占位示例句三条，固定顺序循环：`Build a landing page for café bookings`、`Switch my to-do app to dark mode`、`Add a project gallery to my portfolio`。
- 建议胶囊三条：`Landing page`、`Pricing table`、`Sign-in screen`；每条胶囊对应一句写入输入框的请求句：`Make a startup landing page, starting with the hero`、`Make a pricing table with three plans`、`Make a sign-in screen with social login`。
- 结果面板的三条骨架线宽度写死在标记里（92%、74%、84%），其余文案全部来自用户输入。

## 操作和动效

- 占位轮换：每 55ms 推进一个字符（逐字符按码点切分，避免拆散重音字母）；打完一句后停 1500ms 转为退格，退格每 22ms 退一个字符；退到 0 时换到下一句示例，停 350ms 后重新打出。占位只在输入框为空且不在生成态时出现；一旦用户开始输入，占位立刻清空并停止轮换。
- 点击胶囊：先清掉占位与轮换，把对应的请求句以每字 28ms 逐字写进输入框，过程中发送按钮保持可用，写完后再同步一次按钮状态。
- 点击发送（按钮或输入框内回车，Shift+回车不触发）：场景进入生成态——包裹层上抬归位、芯片条淡出、结果面板滑入并延迟 0.18s 才出现，按钮换成转圈并禁用，状态词写 `Building`、副行写 `Laying out the screen…`。2400ms 后进入完成态：转圈换回箭头、状态词写 `Done! Open preview`、副行回显输入框里的原文、三条骨架线停流动并铺成实色、New prompt 按钮淡入。
- 点击 New prompt：撤掉生成态与完成态、清空输入框、重新开始占位轮换，并把焦点还给输入框。
- 发送按钮的可用状态由「输入框去空格后非空」且「不在生成态」共同决定。
- `prefers-reduced-motion` 下：占位轮换改成整句直接显示，每 2600ms 换一句；胶囊点击直接把整句写进输入框；生成等待缩短到 300ms；辉光旋转、滚动骨架、光标闪烁全部关掉，包裹层与结果面板的过渡也一并取消，动画直接落到终态。
- 键盘与无障碍：输入框是原生文本域（aria-label「Describe the screen you want」），发送按钮是原生 button（aria-label「Send」），胶囊组是 `role="group"`、aria-label「Suggested prompts」，占位层与状态圆点 aria-hidden，结果面板 `aria-live="polite"`。发送按钮、胶囊、New prompt 三类可聚焦元素的 focus-visible 统一为 2px accent 实线描边、偏移 2px。

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| height | number | 340 | 场景高度，逻辑像素；窄容器整景按比例缩小 |
| reducedMotion | boolean | 跟随系统 | 覆盖系统的减少动态偏好 |

## 独立实现与六框架交付

- 仅凭本文从零生成可运行的实现。尺寸、颜色、文案、图形和运动算法均以上述文字为准；所有装饰用 CSS 与内联 SVG 绘制，不加载远程图片、字体、视频或素材。
- 当前交付重点为 React，组件名称 AiPromptHero。从零创建四个文件：AiPromptHero.tsx、AiPromptHeroEngine.js、motion-runtime.ts、AiPromptHeroEngine.d.ts；分别实现框架入口、完整交互核心、实例生命周期和类型声明。文件名是需要生成的产物，不假定接收者已经拥有任何文件。
- 同时提供 React、Vue、Svelte、Solid、Preact、Vanilla 原生生命周期入口，共享框架无关核心。DOM 仅在挂载后访问，支持同页多实例；更新时保持状态，销毁时清理动画、计时器、观察器及监听器。不要用 iframe 代替组件实现。
- 依赖安装说明：npm install react react-dom。若使用依赖，只使用其公开 API；组件的布局、样式、图形和算法必须在本次生成的文件中完整实现，不引用现成效果组件。
- 实现 options.height 以调整场景高度，options.reducedMotion 覆盖系统偏好；减少动态效果仍保留完整流程状态。
- 给出每个文件的完整内容、安装和运行步骤、以下使用示例所需的全部实现。不得留省略号、待补素材或"自行补齐核心"的占位。
- 验收：375 / 768 / 1440px 无横向溢出；占位轮换、胶囊写入、发送与复位四段流程正确；浅色深色两套令牌正确；多实例互不干扰，卸载后停止所有任务。

## 使用示例

```tsx
import { AiPromptHero } from "./AiPromptHero";

export default function App() {
  return <AiPromptHero />;
}
```
