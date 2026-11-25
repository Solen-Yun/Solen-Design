# 文章会员付费墙 — ArticlePaywall

300×480 的博客文章页：顶部小标「Insights」，大标题「Five habits of small teams that ship faster」，下面是作者头像与「Harin Kim · 6 min read」，再一块 110px 高的渐变封面图。正文读到第二节就开始发虚——下半段被 96px 高的区域裁住、内容带 2.5px 模糊，底部还叠了一层由透明渐变到纸色的遮罩。遮罩下面压着一张墨色会员卡：三条粉色短杠、提示「You've read all your free articles this month」、粗体「Keep reading with membership」、Monthly / Yearly 两种计费切换和价格，底部是粉紫渐变的「Start 7 days free」按钮与「Already a member? Sign in」。点主按钮，按钮变成转圈等待，700ms 后文章解锁——模糊散去、遮罩消失、会员卡向上收起并淡出，同时顶部滑下一条绿色横幅「Welcome! Every article is now open to you」，2.4 秒后横幅收走。

## 布局与材质

- 场景根 300×480px，圆角 32px，overflow hidden，底色表面色，外圈 1px 线色描边加 `0 30px 60px -36px` 强阴影，文字墨色。场景令牌用 `light-dark()` 写两套，浅色：表面 #FFFFFF、次表面 #F5F3EF、三级表面 #EAE7E1、墨色 #16151B、次墨 #57535F、三级墨 #8E8A97、线 rgba(22,21,27,.09)、强线 rgba(22,21,27,.17)、强调 #6A57F2、强调二 #2F8FE0、强调浅底 rgba(106,87,242,.12)、强调字 #FFFFFF、薄荷 #119C72、警示 #D6731E、危险 #D93A55、玻璃 rgba(255,255,255,.58)、玻璃线 rgba(255,255,255,.85)、投影 rgba(40,30,80,.14)、强投影 rgba(40,30,80,.3)、渐变 linear-gradient(120deg,#7B61FF,#3D8BFF 55%,#1FB89A)；深色：表面 #13141C、次表面 #1A1B25、三级表面 #252632、墨色 #F4F0E8、次墨 rgba(244,240,232,.68)、三级墨 rgba(244,240,232,.42)、线 rgba(255,255,255,.08)、强线 rgba(255,255,255,.16)、强调 #B7A4FF、强调二 #7DB4FF、强调浅底 rgba(183,164,255,.15)、强调字 #0B0C12、薄荷 #7EE8C0、警示 #FFB26B、危险 #FF7D8C、玻璃 rgba(255,255,255,.07)、玻璃线 rgba(255,255,255,.18)、投影 rgba(0,0,0,.45)、强投影 rgba(0,0,0,.72)、渐变 linear-gradient(120deg,#B7A4FF,#7DB4FF 55%,#A5F2D3)。场景不声明 font-family，继承宿主页面字体。
- 正文容器绝对定位铺满，纵向可滚动（滚动条隐藏、overscroll-behavior 为 contain），内边距 26px 20px 30px；它可聚焦（tabIndex 0），focus-visible 是 2px 强调色描边、offset -4px、32px 圆角。
- 栏目标签 10px/850、强调色；标题 margin 6px 0 0，19px、行高 1.3、字重 900、字距 -0.035em；作者行 flex 居中、间隙 7px、上外边距 10px，10.5px/700、三级墨色，头像是 20×20 圆形、底色 linear-gradient(135deg,#F9A8D4,#A78BFA)；封面图高 110px、上外边距 14px、14px 圆角、底色 linear-gradient(135deg,#C7D2FE,#FBCFE8)；正文段落 margin 12px 0 0，12px、行高 1.7、字重 550、次墨色；小节标题 margin 16px 0 0，13.5px/850。
- 被锁定的区域是一个相对定位的容器：最大高度 96px、溢出裁切，过渡 max-height .9s cubic-bezier(.3,.8,.3,1)；内部内容整体 filter blur(2.5px)，过渡 filter .7s；容器底部盖一层 96px 高的渐变遮罩（linear-gradient(transparent, 表面色 92%)），过渡 opacity .5s。解锁态下容器最大高度放到 520px、内部模糊取消、遮罩淡出。
- 会员卡所在的外层是网格容器，初始 grid-template-rows 为 1fr，过渡 grid-template-rows .55s cubic-bezier(.3,.8,.3,1) 与 opacity .35s、transform .45s，上外边距 4px；内层 min-height 0、溢出裁切。解锁态外层收成 grid-template-rows 0fr、opacity 0、transform scale(.96)。
- 卡片本身内边距 16px、18px 圆角、墨色底、表面色字、居中排版。顶部三条短杠 20×4px、2px 圆角、#F472B6，横向居中、间隙 4px。提示行是块级 10px/700、不透明度 .7、上外边距 8px；主标语是块级 15px/900、上外边距 4px。
- 计费切换是一枚 170px 宽的胶囊：相对定位、flex、内边距 3px、999px 圆角、底色 `color-mix(in srgb, 表面色 14%, transparent)`、上外边距 12px 并水平居中。内含一枚滑块伪元素（left 3 / top 3 / bottom 3 / 宽 calc(50% - 3px)、999px 圆角、表面色底），过渡 transform .35s cubic-bezier(.3,1.3,.5,1)；切到 Yearly 时滑块 translateX(100%) 移到右侧。两个选项按钮相对定位、弹性占满、高 26px、胶囊圆角、透明底、文字取 `color-mix(in srgb, 表面色 70%, transparent)`、11px/850、过渡 color .2s，选中项文字换回墨色。
- 价格行相对定位、高 30px、上外边距 10px、溢出裁切。价格文本绝对定位铺满、flex 基线对齐居中、间隙 3px、22px/900、字距 -0.02em，过渡 transform .4s cubic-bezier(.3,1.3,.5,1) 与 opacity .3s；单位小字行内 10.5px/750、不透明度 .7、字距 0。换价时旧价打上 is-out（translateY(-100%)、opacity 0）并在 420ms 后移除，新价先以 is-in（translateY(100%)、opacity 0）入场再复位。
- 主按钮 flex 居中、间隙 7px、宽 100%、高 44px、上外边距 10px、12px 圆角、无边框、底色 linear-gradient(135deg,#F472B6,#8B5CF6)、白字 13px/850。按钮里有一枚 15×15 的白色转圈指示器（2px rgba(255,255,255,.4) 边框、顶边改白，0.7s linear 无限旋转），默认隐藏，等待时显示并把文字藏起来。按钮下方一句 10px/700、不透明度 .6 的提示「Already a member? Sign in」。
- 顶部横幅绝对定位 left/right 14px、top 14px、z-index 2，flex 居中、间隙 8px、内边距 11px 13px、14px 圆角、底色 #059669、白字 11px/800，初始 translateY(-140%)，过渡 transform .5s cubic-bezier(.3,1.4,.5,1)；出现时归零。
- 所有按钮 focus-visible 为 2px 强调色描边、offset 2px。场景按固定 300px 逻辑宽排版，容器窄于 300px 时整景按比例缩小，宽于 300px 时居中留白；组件内部不设断点，只用 `prefers-color-scheme` 切换深浅色令牌。

## 数据

- 文章内容全部写死：栏目标签「Insights」；标题「Five habits of small teams that ship faster」；作者行「Harin Kim · 6 min read」；正文为一段引言「Teams that ship fast do less. More precisely, they spend more time choosing what to do.」，随后小节「1. Set the launch date first」与段落「Cut scope to fit the date. Do it the other way round and the date always slips.」；被锁区域里是小节「2. Write short notes instead of meetings」与段落「A three-line decision log outlives a 30-minute meeting. Anyone can read it later and know why.」、小节「3. Break failures into small pieces」与段落「Instead of big changes, ship often in pieces small enough to roll back.」、小节「4. Hear from customers every week」（这一节的正文本身就没写，等解锁后仍是标题收尾）。
- 会员卡文案：提示「You've read all your free articles this month」，标语「Keep reading with membership」，按钮「Start 7 days free」，脚注「Already a member? Sign in」。
- 价格两档，字段为 [金额, 单位]：$4.90 / `/mo`，$49 / `/yr · 2 months free`。默认选中 Monthly。
- 计费选项两个：Monthly、Yearly。横幅文案：Welcome! Every article is now open to you。
- 无外部数据请求。

## 操作和动效

- 初始状态：被锁区域处于 96px 上限并带模糊与渐变遮罩，同时被标记为 aria-hidden（对读屏不可见）；计费切换停在 Monthly，价格显示 $4.90 /mo。
- 切到 Yearly：滑块向右平移 100%，Yearly 按钮的 aria-checked 变为真、Monthly 变为假；价格行做纵向换页——旧价向上滑出并淡出（0.4s），420ms 后被移除，新价从下方滑入（0.4s cubic-bezier(.3,1.3,.5,1)）并淡入。切回 Monthly 同理，方向相反。
- 点「Start 7 days free」：按钮进入等待态（转圈指示器出现、文字隐藏），700ms 后按钮恢复、场景加上解锁态——被锁区域最大高度放到 520px 并解除模糊、渐变遮罩淡出（0.9s / 0.7s / 0.5s）；同时会员卡所在的外层网格收成 0fr 并淡出缩小（0.55s），绿色横幅从顶部滑入（0.5s），2.4 秒后横幅收回。等待期间按钮不可重复点击，已解锁时也不再响应。
- 解锁后被锁区域移除 aria-hidden，里面的三条小节与两段文字变得可读、可被读屏朗读；正文容器可继续滚动到底。
- 减少动态偏好下：被锁区域与其内容的模糊、会员卡网格收放、滑块移动、价格换页、横幅滑入的过渡全部关闭，绿色转圈动画也停掉；解锁等待从 700ms 缩短为 0ms，其余状态切换照旧。
- 无障碍：正文容器是 role 无关的可聚焦滚动区，带 aria-label「Article」；计费切换是 role="radiogroup"、aria-label「Billing period」，两个选项是 role="radio" 并带 aria-checked；顶部横幅是 role="status"；主按钮是原生 button；所有按钮 focus-visible 有 2px 强调色描边。
- options.height 调整场景高度，options.reducedMotion 覆盖系统偏好。

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| height | number | 480 | 场景高度，逻辑像素；窄容器整景按比例缩小 |
| reducedMotion | boolean | 跟随系统 | 覆盖系统的减少动态偏好 |

## 独立实现与六框架交付

- 仅凭本文从零生成可运行的实现。尺寸、颜色、文案、图形和运动算法均以上述文字为准；所有装饰用 CSS 与内联 SVG 绘制，不加载远程图片、字体、视频或素材。
- 当前交付重点为 React，组件名称 ArticlePaywall。从零创建四个文件：ArticlePaywall.tsx、ArticlePaywallEngine.js、motion-runtime.ts、ArticlePaywallEngine.d.ts；分别实现框架入口、完整交互核心、实例生命周期和类型声明。文件名是需要生成的产物，不假定接收者已经拥有任何文件。
- 同时提供 React、Vue、Svelte、Solid、Preact、Vanilla 原生生命周期入口，共享框架无关核心。DOM 仅在挂载后访问，支持同页多实例；更新时保持状态，销毁时清理动画、计时器、观察器及监听器。不要用 iframe 代替组件实现。
- 依赖安装说明：npm install react react-dom。若使用依赖，只使用其公开 API；组件的布局、样式、图形和算法必须在本次生成的文件中完整实现，不引用现成效果组件。
- 实现 options.height 以调整场景高度，options.reducedMotion 覆盖系统偏好；减少动态效果仍保留完整流程状态。
- 给出每个文件的完整内容、安装和运行步骤、以下使用示例所需的全部实现。不得留省略号、待补素材或"自行补齐核心"的占位。
- 验收：375 / 768 / 1440px 无横向溢出；截断与解锁、计费切换与价格换页、顶部横幅都正确；浅色深色两套令牌正确；多实例互不干扰，卸载后停止所有任务。

## 使用示例

```tsx
import { ArticlePaywall } from "./ArticlePaywall";

export default function App() {
  return <ArticlePaywall />;
}
```
