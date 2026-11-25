# 星级分布筛选 — RatingBreakdown

340×340 的商品评价摘要：左上是一枚 96px 宽的评分块，大号「4.6」下面是一排五星——底下的五颗星是极淡的线色，上面覆盖一层琥珀色进度，铺到 92% 的位置，正好是 4.6 分；再下面写「1,248 reviews」。右侧是 5 到 1 星的五行分布，每行是「5★」、一条 7px 高的圆角琥珀色条和右端的百分比。往下一条分隔标题写着「All reviews」，再下面是评论列表：每条评论左上是琥珀色星级与作者首字母，右上一枚「Helpful 12」小胶囊按钮，正文 11px。点任意一行星级，列表只留该星级的评论，该行高亮、其余行变淡；再点同一行则取消筛选、列表复原。

## 布局与材质

- 场景根 340×340px，圆角 30px，overflow hidden，底色表面色，外圈 1px 线色描边加 `0 30px 60px -36px` 强阴影，文字墨色。场景令牌用 `light-dark()` 写两套，浅色：表面 #FFFFFF、次表面 #F5F3EF、三级表面 #EAE7E1、墨色 #16151B、次墨 #57535F、三级墨 #8E8A97、线 rgba(22,21,27,.09)、强线 rgba(22,21,27,.17)、强调 #6A57F2、强调二 #2F8FE0、强调浅底 rgba(106,87,242,.12)、强调字 #FFFFFF、薄荷 #119C72、警示 #D6731E、危险 #D93A55、玻璃 rgba(255,255,255,.58)、玻璃线 rgba(255,255,255,.85)、投影 rgba(40,30,80,.14)、强投影 rgba(40,30,80,.3)、渐变 linear-gradient(120deg,#7B61FF,#3D8BFF 55%,#1FB89A)；深色：表面 #13141C、次表面 #1A1B25、三级表面 #252632、墨色 #F4F0E8、次墨 rgba(244,240,232,.68)、三级墨 rgba(244,240,232,.42)、线 rgba(255,255,255,.08)、强线 rgba(255,255,255,.16)、强调 #B7A4FF、强调二 #7DB4FF、强调浅底 rgba(183,164,255,.15)、强调字 #0B0C12、薄荷 #7EE8C0、警示 #FFB26B、危险 #FF7D8C、玻璃 rgba(255,255,255,.07)、玻璃线 rgba(255,255,255,.18)、投影 rgba(0,0,0,.45)、强投影 rgba(0,0,0,.72)、渐变 linear-gradient(120deg,#B7A4FF,#7DB4FF 55%,#A5F2D3)。琥珀色 #F59E0B 是评分相关元素的主色，浅深两套一致。场景不声明 font-family，继承宿主页面字体。
- 顶部摘要条绝对定位 left/right 18px、top 18px，flex 居中、间隙 16px。左侧评分块固定宽 96px、居中排版：大数字是块级 36px、行高 1、字重 900、字距 -0.04em、等宽数字，内容「4.6」；五星是行内块、上外边距 5px、14px、字距 1px、行高 1，底下的五颗星用线色绘制，上面再叠一层绝对定位的琥珀色星层（left 0 / top 0、溢出裁剪、不换行、斜体取消），星层宽度从 0 过渡到 92%，过渡 width 1s cubic-bezier(.3,.8,.3,1) 并延迟 .2s；再下面「1,248 reviews」是块级 10px/700、三级墨色、上外边距 5px。
- 右侧分布区弹性占满，纵向 flex、间隙 3px。每一行是按钮：flex 居中、间隙 7px、高 19px、内边距 0 6px、外边距 0 -6px、7px 圆角、透明底、次墨色、10px/800，过渡 opacity .25s 与 background .2s；hover 时底色换次表面。行内左侧是 22px 宽、左对齐、等宽数字的星级标签（形如「5★」），中间是弹性占满的进度槽（7px 高、4px 圆角、三级表面底、溢出裁切），槽里是琥珀色填充条（4px 圆角、初始 `transform:scaleX(0)`、变换原点 0 50%，过渡 transform .8s cubic-bezier(.3,1.1,.4,1)），右侧是 30px 宽、右对齐、等宽数字、三级墨色的百分比。
- 五行的填充条各带 transition-delay：第 1 行 0.15s，之后每行多 0.07s。
- 分布区进入筛选态时（场景加筛选标记），未选中的行降到 opacity .38，选中的行 opacity 归一并把底色换成次表面。
- 分隔标题行绝对定位 left/right 18px、top 132px，flex 居中，父级字号 11.5px/850；里面的标题 span 同时命中通用 span 规则，所以实际呈现为 10px/750、三级墨色、左外边距 6px。初始文案「All reviews」。
- 评论列表绝对定位 left/right 14px、top 156px、bottom 12px，溢出裁切，是 aria-live="polite" 的区域。每条评论：内边距 10px 11px、下外边距 7px、13px 圆角、次表面底、内嵌 1px 线色描边，入场动画 u261-in .4s cubic-bezier(.3,1.2,.5,1) backwards（从 opacity 0、下移 10px 淡入），每条按它在列表中的序号错开 0.06s。
- 评论头 flex 居中、间隙 6px、10px/800、三级墨色：左侧是琥珀色星级字符（斜体取消、字距 -0.5px），中间是作者首字母，右侧的「Helpful」胶囊按钮右推占满（inline-flex 居中、间隙 4px、高 22px、内边距 0 8px、胶囊圆角、表面色底、内嵌 1px 线色描边、次墨色 9.5px/800，过渡 background .2s 与 color .2s）；按下态底色换墨色、文字换表面色并去掉内描边，内含 10×10 的点赞拇指 SVG，过渡 transform .35s cubic-bezier(.3,1.8,.5,1)，按下时旋转 -12° 并放大到 1.2 倍。评论正文 margin 4px 0 0，11px、行高 1.4、字重 650。
- 分布行与 Helpful 按钮 focus-visible：分布行是 2px 强调色描边、offset 1px；Helpful 按钮是 2px 强调色描边、offset 2px。
- 场景按固定 340px 逻辑宽排版，容器窄于 340px 时整景按比例缩小，宽于 340px 时居中留白；组件内部不设断点，只用 `prefers-color-scheme` 切换深浅色令牌。

## 数据

- 总评论数 1248，页面上写「1,248 reviews」，均分 4.6。
- 星级分布计数 5 条，按 5 星到 1 星排列：902、228、62、32、24；各自占比取整后写 72%、18%、5%、3%、2%。条的长度按「该星计数除以最高星计数（902）」计算，因此 5 星条满格、4 星约 0.25、3 星约 0.07、2 星约 0.04、1 星约 0.03——条长按相对比例而不是按百分比。
- 评论 7 条，字段为 [星级, 作者首字母, 正文]：5 星 K.「My second order. The color matches the photos exactly.」、5 星 L.「Lighter than expected and very breathable.」、4 星 P.「Runs a little large. Size down one.」、4 星 C.「Fast shipping and neat packaging.」、3 星 J.「Fine, but it wrinkles a bit easily.」、2 星 H.「Shrank slightly after washing.」、1 星 Y.「Arrived with a missing button.」。
- 每条评论的 Helpful 计数初始为 12、8、21、3、5、9、14；点赞后计数加 1。
- 评论里的星级用「实心星 + 空心星」拼：n 颗实心星加 5 - n 颗空心星，每颗星的 aria-label 是「n/5」。
- 无外部数据请求。

## 操作和动效

- 首次进入视口（IntersectionObserver 命中一次即停止观察）后，琥珀色星层宽度走到 92%（1s cubic-bezier(.3,.8,.3,1)，延迟 .2s），五条分布条按各自延迟从 0 生长到目标比例（0.8s cubic-bezier(.3,1.1,.4,1)）。环境不支持 IntersectionObserver 时直接执行。
- 默认（未筛选）状态列出全部 7 条评论，每条以 0.4s 的淡入上浮依次进场，间隔 0.06s；标题为「All reviews」。
- 点某一行星级：列表重新渲染，只保留该星级的评论（标题换成「3-star reviews」这样的写法）；被点行高亮为次表面底色且不透明，其余四行降到 opacity .38；重新渲染的评论重新播放错开进场动画。再次点同一行则取消筛选，回到全部 7 条、标题变回「All reviews」。筛选状态下点的其它行会直接切到那个星级。
- 点评论里的 Helpful 胶囊：按钮切到按下态（墨色底、拇指图标旋转放大），计数加 1；再点一次取消，计数减 1。按下状态用 aria-pressed 表达。
- 减少动态偏好下：星层与分布条的过渡全部关闭，评论的入场动画不再播放，其余状态与数值照旧。
- 无障碍：五行分布是原生 button，带 aria-pressed 表达选中态；每条评论是语义化 article，头部星级的 aria-label 是「n/5」；Helpful 胶囊是原生 button 带 aria-pressed 与文字计数；评论列表容器是 aria-live="polite" 区域，筛选变化会被读出。
- options.height 调整场景高度，options.reducedMotion 覆盖系统偏好。

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| height | number | 340 | 场景高度，逻辑像素；窄容器整景按比例缩小 |
| reducedMotion | boolean | 跟随系统 | 覆盖系统的减少动态偏好 |

## 独立实现与六框架交付

- 仅凭本文从零生成可运行的实现。尺寸、颜色、文案、图形和运动算法均以上述文字为准；所有装饰用 CSS 与内联 SVG 绘制，不加载远程图片、字体、视频或素材。
- 当前交付重点为 React，组件名称 RatingBreakdown。从零创建四个文件：RatingBreakdown.tsx、RatingBreakdownEngine.js、motion-runtime.ts、RatingBreakdownEngine.d.ts；分别实现框架入口、完整交互核心、实例生命周期和类型声明。文件名是需要生成的产物，不假定接收者已经拥有任何文件。
- 同时提供 React、Vue、Svelte、Solid、Preact、Vanilla 原生生命周期入口，共享框架无关核心。DOM 仅在挂载后访问，支持同页多实例；更新时保持状态，销毁时清理动画、计时器、观察器及监听器。不要用 iframe 代替组件实现。
- 依赖安装说明：npm install react react-dom。若使用依赖，只使用其公开 API；组件的布局、样式、图形和算法必须在本次生成的文件中完整实现，不引用现成效果组件。
- 实现 options.height 以调整场景高度，options.reducedMotion 覆盖系统偏好；减少动态效果仍保留完整流程状态。
- 给出每个文件的完整内容、安装和运行步骤、以下使用示例所需的全部实现。不得留省略号、待补素材或"自行补齐核心"的占位。
- 验收：375 / 768 / 1440px 无横向溢出；星层与分布条生长正确、筛选与复原正确、Helpful 计数正确；浅色深色两套令牌正确；多实例互不干扰，卸载后停止所有任务。

## 使用示例

```tsx
import { RatingBreakdown } from "./RatingBreakdown";

export default function App() {
  return <RatingBreakdown />;
}
```
