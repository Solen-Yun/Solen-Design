# 滚动填色长句 — WordFillParagraph

340×330 的叙事阅读场景：顶部一小行灰色标签「Why we work」，下面是一句 23px 的大话，整句默认是极淡的灰，逐词随着滚动被填成墨色——其中「complex things」和「save someone’s afternoon」两段是强调词，填的是紫色；词填满的瞬间会浮起一层紫色的柔光。句子钉在视口里不动，底下铺着 900px 的空白供滚动推进；右侧有一根 3×90 的细进度条随滚动纵向生长。滚到底，句子全部填实，左下角弹出一枚墨色「Next story →」胶囊按钮。

## 布局与材质

- 场景根 340×330px，圆角 28px，溢出裁切，底色表面色，外圈 1px 线色描边加 `0 30px 60px -36px` 强阴影。场景令牌用 `light-dark()` 写两套，浅色：页面 #FFFFFF、表面 #FFFFFF、次表面 #F5F3EF、三级表面 #EAE7E1、墨色 #16151B、次墨 #57535F、三级墨 #8E8A97、线 rgba(22,21,27,.09)、强线 rgba(22,21,27,.17)、强调 #6A57F2、强调二 #2F8FE0、强调浅底 rgba(106,87,242,.12)、强调字 #FFFFFF、薄荷 #119C72、警示 #D6731E、危险 #D93A55、玻璃 rgba(255,255,255,.58)、玻璃线 rgba(255,255,255,.85)、投影 rgba(40,30,80,.14)、强投影 rgba(40,30,80,.3)、渐变 linear-gradient(120deg,#7B61FF,#3D8BFF 55%,#1FB89A)；深色：页面 #0B0C12、表面 #13141C、次表面 #1A1B25、三级表面 #252632、墨色 #F4F0E8、次墨 rgba(244,240,232,.68)、三级墨 rgba(244,240,232,.42)、线 rgba(255,255,255,.08)、强线 rgba(255,255,255,.16)、强调 #B7A4FF、强调二 #7DB4FF、强调浅底 rgba(183,164,255,.15)、强调字 #0B0C12、薄荷 #7EE8C0、警示 #FFB26B、危险 #FF7D8C、玻璃 rgba(255,255,255,.07)、玻璃线 rgba(255,255,255,.18)、投影 rgba(0,0,0,.45)、强投影 rgba(0,0,0,.72)、渐变 linear-gradient(120deg,#B7A4FF,#7DB4FF 55%,#A5F2D3)。另有一条弹簧缓动常量 cubic-bezier(.34,1.56,.64,1)，专供结尾按钮出场使用。场景不声明 font-family，继承宿主页面字体。
- 滚动容器绝对定位铺满，纵向可滚动（滚动条隐藏），无描边轮廓；它可聚焦（tabIndex 0），带 aria-label「Intro text, scroll to read」。容器内铺一段 900px 高的滚动行程，句子面板用 position sticky 钉在 top 0、高 330px，纵向 flex 排列，内边距 22px 22px 18px。
- 面板顶部小标签 margin 0，12px/750、三级墨色，内容「Why we work」。下面的大句 margin 10px 0 0，23px、行高 1.38、字重 820、字距 -0.04em。
- 大句由 20 个词级 `<span>` 拼成，相邻词之间插入一个空格文本节点。每个词的底色是「墨色与强线色按填充比例在 oklab 空间混合」：`color-mix(in oklab, 墨色 calc(var(--f, 0) * 100%), 强线色)`，过渡 color .15s。填充比例 0 时颜色就是强线色（浅色下 rgba(22,21,27,.17)、深色下 rgba(255,255,255,.16)），比例 1 时是纯墨色。
- 强调词的混合目标换成强调色：`color-mix(in oklab, 强调色 calc(var(--f, 0) * 100%), 强线色)`。强调词被完全填满时额外加 `text-shadow: 0 0 18px color-mix(in srgb, 强调色 45%, transparent)`，形成一层紫光晕。
- 结尾按钮 margin-top auto、左对齐（align-self flex-start），高 38px、内边距 0 16px、胶囊圆角、墨色底、页面色字（浅色 #FFFFFF / 深色 #0B0C12）、13px/750，初始 opacity 0 且下移 12px、不可点，过渡 opacity .35s 与 transform .5s 的弹簧曲线；场景进入完成态后 opacity 1、归位、可点。
- 右侧进度条绝对定位 right 14px、top 24px，宽 3px、高 90px、3px 圆角、轨道色取线色；填充块通栏、墨色底、3px 圆角，变换原点 50% 0，初始 `scaleY(0)`，按滚动进度纵向拉伸。
- 场景按固定 340px 逻辑宽排版，容器窄于 340px 时整景按比例缩小，宽于 340px 时居中留白；组件内部不设媒体查询断点，只用 `prefers-color-scheme` 切换深浅色令牌。

## 数据

- 整句文案写死为：`We spend our days making *complex things* simple. Because we believe one button, one sentence can *save someone’s afternoon*.`
- 星号是强调标记：文案按星号切分成 5 段，奇数段（第 2 段与第 4 段）是强调段。逐词切分（按空格）后共 20 个词，依次是 We / spend / our / days / making / complex / things / simple. / Because / we / believe / one / button, / one / sentence / can / save / someone’s / afternoon / .；其中第 6、7 个词（complex、things）与第 17、18、19 个词（save、someone’s、afternoon）是强调词。
- 标签文案写死为「Why we work」，结尾按钮文案写死为「Next story →」。无外部数据请求。

## 操作和动效

- 滚动容器实际可滚动距离是 900px 行程减 330px 面板，等于 570px。滚动进度 t 取 scrollTop 除以 570，范围 0 到 1。
- 每次滚动（监听 scroll，passive）通过 requestAnimationFrame 合并为一次重绘：一共 20 个词，填充游标 f = t × 1.15 × 20；第 i 个词的填充比例是 clamp(f - i, 0, 1)，写入该词的自定义属性 --f（保留两位小数），颜色随之在灰与墨（或灰与紫）之间插值；比例到 1 的词加上完成类，点亮紫光。
- 因为填充系数是 1.15 倍进度，整句填满发生在 t ≈ 0.87 处（scrollTop 约 496px）；进度条自身按 min(1, t × 1.15) 纵向拉伸。
- 当 t × 1.15 ≥ 1 时，场景加上完成类，左下角的「Next story →」按钮淡入并弹到原位、变为可点。往回滚，完成类移除、按钮收回并再次不可点，词的填充比例同步回退——整个过程完全由滚动位置驱动、可逆。
- 组件没有专门的减少动态分支：样式里没有 prefers-reduced-motion 媒体查询，滚动填色始终按实际滚动位置实时插值（颜色过渡本身只有 .15s）。
- 无障碍：滚动容器是可聚焦区域，带 aria-label「Intro text, scroll to read」；词级 span 只是纯文本，不额外拆分语义；结尾按钮是原生 button。
- options.height 调整场景高度，options.reducedMotion 覆盖系统偏好。

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| height | number | 330 | 场景高度，逻辑像素；窄容器整景按比例缩小 |
| reducedMotion | boolean | 跟随系统 | 覆盖系统的减少动态偏好 |

## 独立实现与六框架交付

- 仅凭本文从零生成可运行的实现。尺寸、颜色、文案、图形和运动算法均以上述文字为准；所有装饰用 CSS 与内联 SVG 绘制，不加载远程图片、字体、视频或素材。
- 当前交付重点为 React，组件名称 WordFillParagraph。从零创建四个文件：WordFillParagraph.tsx、WordFillParagraphEngine.js、motion-runtime.ts、WordFillParagraphEngine.d.ts；分别实现框架入口、完整交互核心、实例生命周期和类型声明。文件名是需要生成的产物，不假定接收者已经拥有任何文件。
- 同时提供 React、Vue、Svelte、Solid、Preact、Vanilla 原生生命周期入口，共享框架无关核心。DOM 仅在挂载后访问，支持同页多实例；更新时保持状态，销毁时清理动画、计时器、观察器及监听器。不要用 iframe 代替组件实现。
- 依赖安装说明：npm install react react-dom。若使用依赖，只使用其公开 API；组件的布局、样式、图形和算法必须在本次生成的文件中完整实现，不引用现成效果组件。
- 实现 options.height 以调整场景高度，options.reducedMotion 覆盖系统偏好；减少动态效果仍保留完整流程状态。
- 给出每个文件的完整内容、安装和运行步骤、以下使用示例所需的全部实现。不得留省略号、待补素材或"自行补齐核心"的占位。
- 验收：375 / 768 / 1440px 无横向溢出；逐词填色与强调词亮光正确、滚动可逆、结尾按钮按时出现；浅色深色两套令牌正确；多实例互不干扰，卸载后停止所有任务。

## 使用示例

```tsx
import { WordFillParagraph } from "./WordFillParagraph";

export default function App() {
  return <WordFillParagraph />;
}
```
