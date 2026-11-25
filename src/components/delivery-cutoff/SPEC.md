# 截单倒计时配送承诺 — DeliveryCutoff

一张 340×340 的商品页配送承诺卡。上半部是一块圆角面板：第一行是「Ship to」加地址下拉按钮，第二行是 19px 的大字送达标题（前置一枚绿色卡车图标片），第三行是「1 h 23 min 45 s left to order」的截单倒计时，底部一条 6px 的剩余时间条随秒收缩。下半部是一条四节点物流进度线，卡车图标停在「Ships today」之后赶路。核心互动是切换地址：选济州这类岛屿地址时，头部标题整行换成橙色的「Arrives Fri (in 2 days)」、「Ferry（轮渡）」节点插入进度线并把四个节点重新均匀铺开、倒计时行让位给「岛屿需多一天轮渡」的说明、时间条降到 25% 透明度；倒计时每秒递减，到 0 后停在 0。

## 布局与材质

- 场景 340×340px，圆角 30px，溢出裁切。底色为表面色，外圈 1px 线色描边（0 0 0 1px），下方 0 30px 60px -36px 强阴影。窄容器（小于 340px）里整景按容器宽度等比缩小，高度随之收缩。
- 配送面板：绝对定位 left 18px、right 18px、top 20px，内边距 16px，圆角 20px，背景次表面色，内圈 inset 0 0 0 1px 线色描边。
- 「Ship to」行：flex、间距 7px、11px/750、三级墨色。右侧地址按钮高 26px、内边距 0 8px 0 10px、圆角 8px，背景表面色加 inset 1px 线圈，文字 11px/850 主墨色，末尾一枚 10×10 的 V 形箭头（stroke-width 1.6、圆角端点）；下拉打开时箭头旋转 180°（transition transform .25s）。
- 地址下拉：绝对定位 left 62px、top 66px，宽 170px、内边距 5px、圆角 13px，背景表面色，外圈 1px 线色加 0 16px 30px -14px 强阴影。关闭态 scale(.92) translateY(-4px)、transform-origin 20% 0，过渡 transform .22s cubic-bezier(.3,1.5,.5,1)、opacity .15s。选项行高 32px、内边距 0 9px、圆角 8px、11.5px/750，悬停变次表面色；行尾到达标签 9.5px/800——一天到 #059669、两天到 #D97706。
- 送达标题区：高 30px、margin-top 12px、溢出裁切，aria-live="polite"。文案 19px/字重 900、字距 -0.03em，行内前置一枚 22×22px、圆角 7px 的图标片，内嵌 13×13 白色卡车线性图标；非岛屿地址图标片 #10B981，岛屿地址 #F59E0B。
- 倒计时行：高 18px、margin-top 6px、11.5px/700、次级墨色。时长数字部分 900 字重、色 #E11D48、tabular-nums，后缀文案「 s left to order」；岛屿态改为说明「Island addresses take one more day by ferry」。两行互斥，切换为 opacity .3s 加 translateY(5px) 的下移淡入淡出。
- 剩余时间条：高 6px、margin-top 10px、圆角 3px、背景三表面色；填充为 linear-gradient(90deg, #F43F5E, #FB923C)，transform-origin 左端，每秒用 scaleX 更新宽度（transition transform 1s linear）；岛屿态整条降到 opacity .25。
- 物流进度线：绝对定位 left 30px、right 30px、bottom 44px、高 60px。轨道线位于 top 22px、高 3px、圆角 2px、背景三表面色，已走填充为主墨色，宽度过渡 .7s cubic-bezier(.3,1,.4,1)。节点为 15×15px 圆点、top 16px、背景表面色、inset 0 0 0 2.5px 三表面色线圈，完成节点改为 inset 0 0 0 5px 主墨色实心，轮渡节点线圈为 #F59E0B；节点水平位置过渡 left .6s cubic-bezier(.3,1.2,.5,1)，隐藏时 opacity 0 加 scale(.3)（.35s）。节点标签在圆点下方 22px 处、10px/800、三级墨色，轮渡标签色 #D97706。卡车图标 26×20px、viewBox 0 0 26 20（车厢加车头路径，两只 r=2.6 的车轮描边 1.8、轮内填表面色），top -6px、水平居中 margin-left -13px、主墨色，left 过渡 .7s cubic-bezier(.3,1,.4,1)，持续播放 .6s ease-in-out infinite alternate 的上下 2px 浮动动画。
- 场景令牌含浅色与深色两套（随 prefers-color-scheme 切换）：表面 #FFFFFF/#13141C、次表面 #F5F3EF/#1A1B25、三表面 #EAE7E1/#252632、主墨 #16151B/#F4F0E8、次墨 #57535F/rgba(244,240,232,.68)、三墨 #8E8A97/rgba(244,240,232,.42)、线 rgba(22,21,27,.09)/rgba(255,255,255,.08)、accent #6A57F2/#B7A4FF。组件样式不声明字体族，继承宿主页面字体；全部按钮 focus-visible 时外圈 2px accent、偏移 1px。

## 数据

- 地址表写死 3 条：Seoul, Gangnam 与 Busan, Haeundae 均为一天后送达（下拉标签「Tomorrow」，标题「Arrives tomorrow (Thu)」）；Jeju City 为两天后送达（下拉标签「In 2 days」，标题「Arrives Fri (in 2 days)」，标题图标片转橙）。
- 倒计时初始剩余 1 小时 23 分 45 秒（5025 秒），满窗为 6 小时（21600 秒），初始时间条 scaleX 即 5025/21600；倒计时按整秒递减。
- 物流节点写死 4 个：Order、Ships today、Ferry、Delivered；非岛屿地址隐藏 Ferry 只显示 3 个，岛屿地址 4 个全显。前两个节点固定为已完成态。
- 页面文案写死：「Ship to」与下拉到达标签（Tomorrow / In 2 days）之外，本卡只有送达标题、倒计时后缀「 s left to order」、岛屿说明与四个节点名；不发起任何网络请求。

## 操作和动效

- 倒计时循环：挂载后立即渲染一次，之后每 1000ms（setTimeout 链）先渲染再减 1 秒；渲染格式为「{h} h {mm} min {ss}」红色加粗加「 s left to order」，时间条 scaleX(剩余/21600) 线性收缩。减到 0 后停在「0 h 00 min 00」，不切换任何文案；组件从文档移除后（isConnected 检查）循环停止。
- 地址下拉：点击「Ship to」按钮开合下拉，aria-expanded 同步；按 Escape 关闭；点选某条后立即应用并关闭下拉、把焦点还给地址按钮。箭头随开关转 180°（.25s）。
- 选择地址：地址未变化时仅更新选中态；送达天数变化时——标题行播放滑换：旧行 translateY(-100%) 淡出、新行自 translateY(100%) 升入，transform .45s cubic-bezier(.3,1.3,.5,1)、opacity .3s，旧行 460ms 后移除；进度线重排：可见节点按序号 j/(n-1)×100% 均匀分布（3 节点时 0%/50%/100%，4 节点时 0%/33.3%/66.7%/100%），left 过渡 .6s，Ferry 节点以 opacity/scale .35s 进出；卡车与轨道填充移到 1.5/(n-1)×100%（3 节点 75%、4 节点 50%），过渡 .7s；倒计时行与岛屿说明交叉淡换 .3s，岛屿态时间条 opacity .25。
- 卡车持续上下浮动：keyframes 每 .6s ease-in-out 交替上移 2px。
- prefers-reduced-motion 下（或 options.reducedMotion）：全部 transition 与浮动动画关闭；标题切换不再播放滑入，直接整行替换；其余状态（文案、节点布局、时间条比例）完整呈现。
- 键盘与无障碍：全部交互用原生 button，可 Tab 聚焦；地址按钮带 aria-haspopup="listbox"、aria-expanded 与 aria-label「Change address」；下拉 role="listbox"，选项 role="option" 且 aria-selected 同步；送达标题容器 aria-live="polite"；时间条与进度线 aria-hidden。
- options.height 改场景高度（默认 340），options.reducedMotion 覆盖系统偏好；支持同页多实例，更新 options 不重挂载，卸载时清理计时器与监听器。

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| height | number | 340 | 场景高度，逻辑像素；窄容器整景按比例缩小 |
| reducedMotion | boolean | 跟随系统 | 覆盖系统的减少动态偏好 |

## 独立实现与六框架交付

- 仅凭本文从零生成可运行的实现。尺寸、颜色、文案、图形和运动算法均以上述文字为准；所有装饰用 CSS 与内联 SVG 绘制，不加载远程图片、字体、视频或素材。
- 当前交付重点为 React，组件名称 DeliveryCutoff。从零创建四个文件：DeliveryCutoff.tsx、DeliveryCutoffEngine.js、motion-runtime.ts、DeliveryCutoffEngine.d.ts；分别实现框架入口、完整交互核心、实例生命周期和类型声明。文件名是需要生成的产物，不假定接收者已经拥有任何文件。
- 同时提供 React、Vue、Svelte、Solid、Preact、Vanilla 原生生命周期入口，共享框架无关核心。DOM 仅在挂载后访问，支持同页多实例；更新时保持状态，销毁时清理动画、计时器、观察器及监听器。不要用 iframe 代替组件实现。
- 依赖安装说明：npm install react react-dom。若使用依赖，只使用其公开 API；组件的布局、样式、图形和算法必须在本次生成的文件中完整实现，不引用现成效果组件。
- 实现 options.height 以调整场景高度，options.reducedMotion 覆盖系统偏好；减少动态效果仍保留完整状态。
- 给出每个文件的完整内容、安装和运行步骤、以下使用示例所需的全部实现。不得留省略号、待补素材或"自行补齐核心"的占位。
- 验收：375 / 768 / 1440px 无横向溢出；倒计时逐秒递减到 0 停住、地址切换与轮渡重排正确；浅色深色两套令牌正确；多实例互不干扰，卸载后停止所有任务。

## 使用示例

```tsx
import { DeliveryCutoff } from "./DeliveryCutoff";

export default function App() {
  return <DeliveryCutoff />;
}
```
