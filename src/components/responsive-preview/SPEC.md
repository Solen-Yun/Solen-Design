# 拖拽响应式预览 — ResponsivePreview

340×340 的站点生成器预览工具：顶部一排三枚设备档位按钮（Desktop / Tablet / Mobile）和右侧等宽读数；中间一条刻度尺标着 sm / md / lg / xl 四个断点位置；下方是一块可以横向拉宽的预览框，框里装着一个虚构站点「Orbit」——导航加渐变 Logo 点、标题「A site that looks good anywhere」、一个「Get started」胶囊按钮和三块彩色占位图。拖右缘的手柄，框宽连续变化，读数实时跟着跳；框越窄，里面的站点自动重排：三列图块先变两列、导航文字收起换成汉堡按钮，再窄时图块叠成一列、标题缩小。

## 布局与材质

- 场景根 340×340px，圆角 30px，overflow hidden，底色为次表面色，外圈 1px 线色描边加 `0 30px 60px -36px` 强阴影，文字墨色。场景令牌用 `light-dark()` 写两套，浅色：表面 #FFFFFF、次表面 #F5F3EF、三级表面 #EAE7E1、墨色 #16151B、次墨 #57535F、三级墨 #8E8A97、线 rgba(22,21,27,.09)、强线 rgba(22,21,27,.17)、强调 #6A57F2、强调二 #2F8FE0、强调浅底 rgba(106,87,242,.12)、强调字 #FFFFFF、薄荷 #119C72、警示 #D6731E、危险 #D93A55、玻璃 rgba(255,255,255,.58)、玻璃线 rgba(255,255,255,.85)、投影 rgba(40,30,80,.14)、强投影 rgba(40,30,80,.3)、渐变 linear-gradient(120deg,#7B61FF,#3D8BFF 55%,#1FB89A)；深色：表面 #13141C、次表面 #1A1B25、三级表面 #252632、墨色 #F4F0E8、次墨 rgba(244,240,232,.68)、三级墨 rgba(244,240,232,.42)、线 rgba(255,255,255,.08)、强线 rgba(255,255,255,.16)、强调 #B7A4FF、强调二 #7DB4FF、强调浅底 rgba(183,164,255,.15)、强调字 #0B0C12、薄荷 #7EE8C0、警示 #FFB26B、危险 #FF7D8C、玻璃 rgba(255,255,255,.07)、玻璃线 rgba(255,255,255,.18)、投影 rgba(0,0,0,.45)、强投影 rgba(0,0,0,.72)、渐变 linear-gradient(120deg,#B7A4FF,#7DB4FF 55%,#A5F2D3)。场景不声明 font-family，继承宿主页面字体；顶部读数用 ui-monospace, SFMono-Regular, Menlo, monospace 等宽栈。
- 顶部工具条绝对定位 left/right 14px、top 14px，flex 居中、间隙 6px。档位组是一组按钮，flex 排列、内边距 3px、11px 圆角、表面色底、内嵌 1px 线色描边。单个按钮 36×28px、8px 圆角、透明底、三级墨色、图标居中、15×15 线性 SVG（显示器 / 平板 / 手机三套图形），过渡 background .2s 与 color .2s；按下态（aria-pressed 为真）底色换墨色、文字换表面色。读数块右推到底，内边距 4px 9px、8px 圆角、表面色底、内嵌 1px 线色描边，11px/800、等宽数字，内容形如「1280px」。
- 刻度尺绝对定位 left/right 14px、top 54px，高 16px。每个刻度是一个绝对定位的 `<i>`：左边 1.5px 实线竖线取三级墨色，文字 8.5px/800、三级墨色、左内边距 3px、行高 10px，过渡 color .2s 与 border-color .2s。刻度被穿过时触发 0.7s 的闪动动画：动画在 30% 处把竖线与文字换成强调色并纵向放大到 1.3 倍。
- 预览舞台绝对定位 left 14px、right 14px、top 74px、bottom 14px。预览框相对定位、高 100%、12px 圆角、表面色底、外圈 1px 线色描边加 `0 12px 24px -16px` 强阴影、溢出裁切，并且自身是尺寸容器（container-type: inline-size），宽度的过渡是 0.5s cubic-bezier(.3,1.1,.4,1)；拖动中改为无过渡。
- 框内页面内边距 10px 12px。导航 flex 居中、间隙 8px，9px/800、次墨色；品牌「Orbit」前有一枚 10×10、3px 圆角的渐变方块（取场景的渐变令牌），品牌本身 10px/900、墨色并右推占满；后面三个链接 Features / Pricing / Contact。窄屏用的汉堡按钮默认隐藏，出现时 20×16px、5px 圆角、次表面底，内含两条 1.5px 的横线。
- 主标题 17px、行高 1.2、字重 900、字距 -0.03em，过渡 font-size .3s，内容「A site that looks good anywhere」；下方 8px 处是一枚胶囊按钮，内边距 5px 10px、墨色底、表面色字、9px/850，文案「Get started」。
- 三块占位图在 12px 间隙的三列网格里，每块 64px 高、9px 圆角、次表面底、内嵌 1px 线色描边，过渡 height .3s；三块的底色分别是 linear-gradient(135deg,#C7D2FE,#E0E7FF)、linear-gradient(135deg,#FBCFE8,#FCE7F3)、linear-gradient(135deg,#A7F3D0,#D1FAE5)。
- 容器查询（按预览框自身宽度判定）：
  - 框宽 ≤ 200px 时：三列网格变两列，第三块跨两列且高度降到 40px；导航里三个文字链接隐藏，汉堡按钮出现。
  - 框宽 ≤ 140px 时：网格变单列，每块高度 34px（含跨列的第三块），主标题字号降到 13px。
  - 因为框宽与虚拟预览宽度是线性映射（框宽 108px ↔ 虚拟 320px，框宽 294px ↔ 虚拟 1440px），这两条分别对应虚拟宽度约 874px 与约 513px。
- 拖柄是绝对定位的竖条：top 50%、宽 14px、高 44px、外边距 -22px 0 0 2px（相对框的右缘右移 2px、垂直居中），7px 圆角、表面色底、外圈 1px 线色描边加 `0 2px 6px -2px` 强阴影，光标 ew-resize、touch-action none，内部是两条 1.5px 的竖纹；left 位置的过渡是 0.5s cubic-bezier(.3,1.1,.4,1)，拖动中无过渡。
- 场景按固定 340px 逻辑宽排版，容器窄于 340px 时整景按比例缩小，宽于 340px 时居中留白；组件内部不设媒体查询断点，只用 `prefers-color-scheme` 切换深浅色令牌。

## 数据

- 设备档位 3 档，字段为 [名称, 虚拟宽度]：Desktop 1280、Tablet 768、Mobile 390。档位按钮只写 aria-label，不显示文字。
- 刻度断点 4 个，字段为 [虚拟宽度, 刻度名]：640 → sm、768 → md、1024 → lg、1280 → xl。
- 预览框的像素宽度与虚拟宽度是线性映射：框宽 = 108 + (虚拟宽度 - 320) / (1440 - 320) × 186，反之亦然；框宽最窄 108px、最宽 294px。
- 预览站点内容全部写死：品牌 Orbit、导航 Features / Pricing / Contact、标题「A site that looks good anywhere」、按钮「Get started」、三块渐变占位图。无外部数据请求。

## 操作和动效

- 初始宽度为 1280（Desktop 档），框宽按映射算出约 267px，手柄贴在框右缘，读数显示「1280px」，Desktop 按钮处于按下态。
- 点任一档位按钮：宽度立即设到该档的虚拟宽度，框宽与手柄位置走 0.5s cubic-bezier(.3,1.1,.4,1) 的过渡，读数同步更新；只有当虚拟宽度与某档完全相等时该档按钮才亮起（拖到别的宽度时三档全部熄灭）。
- 拖手柄：按下时记录舞台的横向缩放系数与左边界，手柄与预览框同时切到无过渡态；移动时把指针位置换算成虚拟宽度并实时套用，所以框宽、读数、内容重排三者同步变化；松手或指针取消后恢复过渡。
- 键盘：手柄是 role="slider" 的可聚焦元素（tabIndex 0，aria-label「Preview width」，aria-valuemin 320、aria-valuemax 1440，aria-valuenow 实时跟随），按 ArrowRight 加 40px、ArrowLeft 减 40px，宽度被夹在 320 到 1440 之间。
- 跨越断点时闪动刻度：当虚拟宽度落进的新区间与上一区间不同，就把被跨过的那根刻度重放一次闪动动画（强调色 + 纵向放大 1.3 倍，0.7s 后回落）。初始设定不闪。
- 框内内容随框宽自动重排（容器查询）：变窄时三列图块先折成两列、第三块横跨整行并变矮 40px，导航文字收起换成汉堡按钮；再窄时图块叠成一列、每块 34px 高，标题缩到 13px。标题字号与图块高度的变化都带 0.3s 的过渡。
- 减少动态偏好下：预览框宽度、手柄位置、标题字号、图块高度的过渡全部关闭，刻度闪动动画也不再播放，其余交互与重排照旧。
- 无障碍：三枚档位按钮是原生 button，带 aria-label 与 aria-pressed；读数块是 aria-live="polite" 的区域，宽度变化会被读出；手柄是 role="slider"，带 aria-label 与 aria-valuemin/aria-valuemax/aria-valuenow；所有按钮与手柄 focus-visible 为 2px 强调色描边、offset 2px；刻度尺整体 aria-hidden。
- options.height 调整场景高度，options.reducedMotion 覆盖系统偏好。

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| height | number | 340 | 场景高度，逻辑像素；窄容器整景按比例缩小 |
| reducedMotion | boolean | 跟随系统 | 覆盖系统的减少动态偏好 |

## 独立实现与六框架交付

- 仅凭本文从零生成可运行的实现。尺寸、颜色、文案、图形和运动算法均以上述文字为准；所有装饰用 CSS 与内联 SVG 绘制，不加载远程图片、字体、视频或素材。
- 当前交付重点为 React，组件名称 ResponsivePreview。从零创建四个文件：ResponsivePreview.tsx、ResponsivePreviewEngine.js、motion-runtime.ts、ResponsivePreviewEngine.d.ts；分别实现框架入口、完整交互核心、实例生命周期和类型声明。文件名是需要生成的产物，不假定接收者已经拥有任何文件。
- 同时提供 React、Vue、Svelte、Solid、Preact、Vanilla 原生生命周期入口，共享框架无关核心。DOM 仅在挂载后访问，支持同页多实例；更新时保持状态，销毁时清理动画、计时器、观察器及监听器。不要用 iframe 代替组件实现。
- 依赖安装说明：npm install react react-dom。若使用依赖，只使用其公开 API；组件的布局、样式、图形和算法必须在本次生成的文件中完整实现，不引用现成效果组件。
- 实现 options.height 以调整场景高度，options.reducedMotion 覆盖系统偏好；减少动态效果仍保留完整流程状态。
- 给出每个文件的完整内容、安装和运行步骤、以下使用示例所需的全部实现。不得留省略号、待补素材或"自行补齐核心"的占位。
- 验收：375 / 768 / 1440px 无横向溢出；档位切换、拖柄连续调宽、键盘步进与断点闪动都正确；浅色深色两套令牌正确；多实例互不干扰，卸载后停止所有任务。

## 使用示例

```tsx
import { ResponsivePreview } from "./ResponsivePreview";

export default function App() {
  return <ResponsivePreview />;
}
```
