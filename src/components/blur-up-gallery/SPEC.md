# 模糊加载相册 — BlurUpGallery

340×340 的旅行相册：顶部一栏「Trip photos」，右边是一枚「Slow network」开关（拨杆式）和一枚墨色圆形重载按钮；下方是不对称的四格相册——左上一张竖图占两行，右列上下各一张，右下横跨两列一张。每格先以模糊的小图示加上扫光的斜纹亮带呈现，右上角挂一枚「0 / 212KB」的字数角标，底部有一条 3px 的白色进度条；数据到位后模糊散去、图示放大回正、扫光消失，角标淡出，左下角浮出照片名「Jeju hills」。把「Slow network」拨到开，四格的加载会被拉长成一两秒的慢速演示。

## 布局与材质

- 场景根 340×340px，圆角 30px，overflow hidden，底色表面色，外圈 1px 线色描边加 `0 30px 60px -36px` 强阴影，文字墨色。场景令牌用 `light-dark()` 写两套，浅色：表面 #FFFFFF、次表面 #F5F3EF、三级表面 #EAE7E1、墨色 #16151B、次墨 #57535F、三级墨 #8E8A97、线 rgba(22,21,27,.09)、强线 rgba(22,21,27,.17)、强调 #6A57F2、强调二 #2F8FE0、强调浅底 rgba(106,87,242,.12)、强调字 #FFFFFF、薄荷 #119C72、警示 #D6731E、危险 #D93A55、玻璃 rgba(255,255,255,.58)、玻璃线 rgba(255,255,255,.85)、投影 rgba(40,30,80,.14)、强投影 rgba(40,30,80,.3)、渐变 linear-gradient(120deg,#7B61FF,#3D8BFF 55%,#1FB89A)；深色：表面 #13141C、次表面 #1A1B25、三级表面 #252632、墨色 #F4F0E8、次墨 rgba(244,240,232,.68)、三级墨 rgba(244,240,232,.42)、线 rgba(255,255,255,.08)、强线 rgba(255,255,255,.16)、强调 #B7A4FF、强调二 #7DB4FF、强调浅底 rgba(183,164,255,.15)、强调字 #0B0C12、薄荷 #7EE8C0、警示 #FFB26B、危险 #FF7D8C、玻璃 rgba(255,255,255,.07)、玻璃线 rgba(255,255,255,.18)、投影 rgba(0,0,0,.45)、强投影 rgba(0,0,0,.72)、渐变 linear-gradient(120deg,#B7A4FF,#7DB4FF 55%,#A5F2D3)。场景不声明 font-family，继承宿主页面字体。
- 顶部栏绝对定位 left 20px、right 16px、top 18px，高 32px，flex 居中、间隙 8px。标题 16px/900、字距 -0.03em，右推占满，内容「Trip photos」。
- 「Slow network」开关 inline-flex 居中、间隙 6px，高 30px，内边距 0 10px 0 8px，胶囊圆角、无边框、次表面底、内嵌 1px 线色描边、次墨字 10.5px/800。拨杆是一枚 24×14px、7px 圆角的三级表面圆角条（过渡 background .2s），上面一枚 10×10 白色圆钮带 `0 1px 2px rgba(0,0,0,.25)` 投影，初始位于 left 2px / top 2px，过渡 transform .25s cubic-bezier(.3,1.5,.5,1)；按下态（aria-pressed 为真）时拨杆底色换 #F59E0B、圆钮横向移到 translateX(10px)。
- 重载按钮 30×30px 圆形，墨色底、表面色字、图标居中；内含 14×14 的回转箭头 SVG，过渡 transform .5s cubic-bezier(.3,1.3,.5,1)，旋转态时整枚图标转 360°。两个按钮 focus-visible 都是 2px 强调色描边、offset 2px。
- 相册网格绝对定位 left/right 16px、top 62px、bottom 16px，两列（1.2fr 与 1fr）三行（1fr、1fr、.78fr），间隙 8px。四格这样排：第一格跨两行占满左侧整列，第二格在右上，第三格在右中，第四格横跨两列压在最底一行。
- 每格相对定位、16px 圆角、溢出裁切、底色次表面。内嵌一张铺满的 SVG（preserveAspectRatio 为 xMidYMid slice），初始 transform scale(1)、filter 无，过渡 filter .8s ease 与 transform 1s cubic-bezier(.2,.8,.2,1)；加载态下 filter 变 `blur(12px) saturate(.75)`、transform 变 scale(1.15)，且此时不再有过渡。
- 扫光层是格子的伪元素：铺满整格，底色 linear-gradient(105deg,transparent 35%,rgba(255,255,255,.28) 50%,transparent 65%)，背景尺寸 250% 100%，初始 opacity 0；加载态 opacity 1 并播放 1.4s linear infinite 的扫光动画，背景位置从 130% 0 走到 -30% 0。
- 进度条绝对定位在格内 left/right 10px、bottom 9px，高 3px、2px 圆角，底色 rgba(255,255,255,.35)、溢出裁切，过渡 opacity .3s 并延迟 .3s；条体白色、初始 `transform:scaleX(0)`、变换原点 0 50%。非加载态整条进度条 opacity 0。
- 字数角标绝对定位在格内 right 9px、top 8px，内边距 2px 6px、6px 圆角、底色 rgba(0,0,0,.35)、白字 9px/800、等宽数字，过渡 opacity .3s；非加载态角标 opacity 0。
- 照片名绝对定位在格内 left 11px、bottom 9px，白字 11px/850、带 `0 1px 6px rgba(0,0,0,.4)` 文字投影，初始 opacity 0 且下移 6px，过渡 opacity .4s 与 transform .5s cubic-bezier(.2,.8,.2,1)，两者都延迟 .25s；非加载态时显示为 opacity 1、transform 归零。
- 场景按固定 340px 逻辑宽排版，容器窄于 340px 时整景按比例缩小，宽于 340px 时居中留白；组件内部不设断点，只用 `prefers-color-scheme` 切换深浅色令牌。

## 数据

- 照片 4 张，每张由一段内联 SVG 矢量图示充当，字段为 [标题, 体积 KB, 图形]：
  - Jeju hills / 212KB / 竖幅（viewBox 0 0 100 160）：天色从 #FB923C 经 #F472B6 到 #7C3AED 的竖向渐变，一枚 r15 的 #FEF3C7 太阳（cx 62 / cy 62，不透明度 .95），三层山脊 #4C1D95（不透明度 .75）、#2E1065、#1E1B4B。
  - Gangneung sea / 168KB / 方形（viewBox 0 0 100 100）：天色 #7DD3FC 到 #E0F2FE 渐变，r9 白日（cx 76 / cy 24），海面 #0284C7，两道浪线 #0369A1 与 #075985，一叶白帆三角与 #7C2D12 的船身。
  - Seoul at night / 194KB / 方形：底色 #0F172A，r6 的 #FDE68A 月亮（cx 80 / cy 18），五栋 #1E293B 的楼体，十二扇 3×3 的 #FBBF24 窗，底部 #1D4ED8 半透明地面。
  - Seorak valley / 151KB / 方形：天色 #BBF7D0 到 #F0FDF4 渐变，两层山脊 #15803D 与 #166534，湖泊 #38BDF8，两道 #E0F2FE 的白色细横线。
- 体积数值在加载过程中以「<已收> / <总量>KB」的文本实时显示，已收量按进度取整。
- 四张图的渐变 id 带实例前缀（随机 5 位字符拼在 u258 之后），保证同页多实例时 id 不冲突。
- 无外部数据请求，不加载任何图片文件。

## 操作和动效

- 首屏进入视口（IntersectionObserver 命中一次即停止观察）后开始加载；环境不支持 IntersectionObserver 时立即加载。加载时四格同时进入加载态：加模糊、起扫光、进度条归零、角标显示「0 / 212KB」这类起始值，同时给格子加 aria-busy="true" 和「<标题> loading」的 aria-label。
- 正常速度下每格的加载时长依次是 420ms、660ms、900ms、1140ms（每格比前一格多 240ms），启动时刻依次错开 60ms；慢速模式下时长依次是 1800ms、2700ms、3600ms、4500ms（每格多 900ms），启动时刻错开 150ms。
- 每格用 requestAnimationFrame 推进：进度按线性时间算，慢速模式下改用缓出曲线 `1 - (1 - k)^1.6`（开头慢、末尾快），普通模式用线性值。进度条按进度缩放，角标数字同步取整更新。
- 每格进度到 1 后：移除加载态（模糊散去、图形从 1.15 倍回到原大，过渡 filter .8s ease 与 transform 1s cubic-bezier(.2,.8,.2,1)），扫光层淡出，角标淡出，进度条淡出，照片名延迟 .25s 后淡入上浮，aria-busy 与 aria-label 一并移除。
- 「Slow network」开关拨动即切换加载速度档（只影响下一次加载），开关本体用 aria-pressed 表达状态。
- 点重载按钮：图标先转 360°（520ms 后复位），随后四格全部回到加载态重新走一遍；新一轮会作废上一轮尚未完成的进度（用世代号判定），不会两轮叠加。
- 减少动态偏好下：图形、照片名、重载图标的过渡全部关闭，扫光动画停掉；普通速度的加载时长压到 1ms 立刻完成，慢速档仍保留 1800ms 起的慢速演示。
- 无障碍：加载中的格子带 aria-busy="true" 与「<标题> loading」的 aria-label，加载完成后移除；开关是原生 button 带 aria-pressed；重载按钮是原生 button 带 aria-label「Reload」；四个格子的图形 SVG 全部 aria-hidden；两个按钮 focus-visible 有 2px 强调色描边。
- options.height 调整场景高度，options.reducedMotion 覆盖系统偏好。

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| height | number | 340 | 场景高度，逻辑像素；窄容器整景按比例缩小 |
| reducedMotion | boolean | 跟随系统 | 覆盖系统的减少动态偏好 |

## 独立实现与六框架交付

- 仅凭本文从零生成可运行的实现。尺寸、颜色、文案、图形和运动算法均以上述文字为准；所有装饰用 CSS 与内联 SVG 绘制，不加载远程图片、字体、视频或素材。
- 当前交付重点为 React，组件名称 BlurUpGallery。从零创建四个文件：BlurUpGallery.tsx、BlurUpGalleryEngine.js、motion-runtime.ts、BlurUpGalleryEngine.d.ts；分别实现框架入口、完整交互核心、实例生命周期和类型声明。文件名是需要生成的产物，不假定接收者已经拥有任何文件。
- 同时提供 React、Vue、Svelte、Solid、Preact、Vanilla 原生生命周期入口，共享框架无关核心。DOM 仅在挂载后访问，支持同页多实例；更新时保持状态，销毁时清理动画、计时器、观察器及监听器。不要用 iframe 代替组件实现。
- 依赖安装说明：npm install react react-dom。若使用依赖，只使用其公开 API；组件的布局、样式、图形和算法必须在本次生成的文件中完整实现，不引用现成效果组件。
- 实现 options.height 以调整场景高度，options.reducedMotion 覆盖系统偏好；减少动态效果仍保留完整流程状态。
- 给出每个文件的完整内容、安装和运行步骤、以下使用示例所需的全部实现。不得留省略号、待补素材或"自行补齐核心"的占位。
- 验收：375 / 768 / 1440px 无横向溢出；四格的加载、清晰化与照片名淡入正确、慢速档与重载可用；浅色深色两套令牌正确；多实例互不干扰，卸载后停止所有任务。

## 使用示例

```tsx
import { BlurUpGallery } from "./BlurUpGallery";

export default function App() {
  return <BlurUpGallery />;
}
```
