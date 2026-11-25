# 语言切换文案互换 — LocaleSwitch

一张 340×340 的站点首页场景：顶部是导航栏——左侧品牌「Sprout」、中间三条菜单项、右侧一枚带地球图标与当前缩写（KO/EN/JA）的语言按钮；下方 hero 区是一行 28px 的大标题、一段描述和一个绿色胶囊按钮。点开语言按钮出现三语下拉（旗帜加语言名，当前项带绿色对勾），选中后整站文案交叉切换：六处文案（三条菜单、标题、描述、按钮）从左到右每处错峰 45ms 依次上移淡出、再从下方升入新语言文案，胶囊按钮宽度按新文案实测宽度平滑过渡，标题的 lang 属性与按钮缩写同步更换。

## 布局与材质

- 场景 340×340px，圆角 30px，溢出裁切。底色为表面色叠加右上角绿色氛围光：radial-gradient(90% 60% at 80% 0%, color-mix(in srgb, #22C55E 14%, transparent), transparent 70%)；外圈 1px 线色描边，下方 0 30px 60px -36px 强阴影。窄容器里整景等比缩小。
- 导航栏：绝对定位 left 18px、right 16px、top 16px，flex、间距 12px、11px/750、次级墨色。品牌「Sprout」margin-right:auto、13px/900、主墨色；三条菜单项为纯文本 span。语言按钮：内联 flex、间距 5px、高 30px、内边距 0 9px、圆角 10px、背景次表面色加 inset 1px 线圈、11px/800 主墨色，内含 14×14 地球线性图标（外圆 r=5.5 加赤道与两条经线，stroke-width 1.3）和当前语言缩写。
- 语言下拉：绝对定位在按钮容器内 right 0、top 36px，宽 150px、内边距 5px、圆角 14px，背景表面色，外圈 1px 线色加 0 16px 34px -14px 强阴影，role="listbox"。关闭态 scale(.9) translateY(-4px)、transform-origin 90% 0，过渡 transform .25s cubic-bezier(.3,1.5,.5,1)、opacity .15s。选项行 flex、间距 8px、高 34px、内边距 0 9px、圆角 9px、12px/750，悬停变次表面色；旗帜 emoji 14px；行尾 13×13 对勾图标色 #16A34A，默认透明，仅当前项显示；每个选项带自己的 lang 属性。
- Hero 区：绝对定位 left 22px、right 22px、top 92px。标题 28px、行高 1.16、字重 900、字距 -0.04em，两行（内含 <br>）；描述 margin-top 12px、12px、行高 1.55、字重 600、次级墨色；按钮 margin-top 18px、内联 flex、高 36px、内边距 0 16px、圆角 999px、背景 #16A34A、白字 12px/850、不换行溢出裁切，宽度过渡 .35s cubic-bezier(.3,1.3,.5,1)。
- 文案交换结构：六处可替换文案都包在 overflow hidden 的内层壳里，壳内 span 先播放退出动画（.26s ease-in forwards，translateY(-100%) 加透明），换文本后播放进入动画（.38s cubic-bezier(.2,.9,.3,1.2)，自 translateY(100%) 升入）。
- 场景令牌含浅色与深色两套（随 prefers-color-scheme 切换）：表面 #FFFFFF/#13141C、次表面 #F5F3EF/#1A1B25、三表面 #EAE7E1/#252632、主墨 #16151B/#F4F0E8、次墨 #57535F/rgba(244,240,232,.68)、三墨 #8E8A97/rgba(244,240,232,.42)、线 rgba(22,21,27,.09)/rgba(255,255,255,.08)、accent #6A57F2/#B7A4FF；绿色按钮与对勾固定 #16A34A。组件样式不声明页面字体族，继承宿主页面字体；语言按钮与选项 focus-visible 外圈 2px accent、偏移 2px。

## 数据

- 三种语言写死在组件内，全部文案如下：
  - 한국어（缩写 KO，旗帜 🇰🇷，lang=ko）：菜单「제품 / 요금 / 고객 사례」；标题「함께 만드는／더 나은 하루」两行；描述「기록하고, 나누고, 함께 자라는 팀을 위한 공간입니다.」；按钮「무료로 시작」。
  - English（缩写 EN，旗帜 🇺🇸，lang=en）：菜单「Product / Pricing / Customers」；标题「A better day,／made together」；描述「A place for teams that write, share and grow together.」；按钮「Start for free」。
  - 日本語（缩写 JA，旗帜 🇯🇵，lang=ja）：菜单「製品 / 料金 / 導入事例」；标题「みんなで作る、／よりよい毎日」；描述「記録し、共有し、ともに成長するチームのための場所です。」；按钮「無料ではじめる」。
- 品牌名「Sprout」写死、不随语言变化；初始选中 KO。可替换文案共 6 处（nav1、nav2、nav3、标题、描述、按钮）。不发起任何网络请求。

## 操作和动效

- 打开/关闭：点击语言按钮开合下拉（is-open 类），aria-expanded 同步；按 Escape 关闭；点选选项后先关下拉再应用语言。箭头无旋转，动效来自下拉自身的缩放淡入。
- 切换语言：同语言重复选择直接返回；不同语言时——六处文案壳从左到右按序号 n×45ms 错峰启动，每处先播 .26s ease-in 的上移淡出，再换入新文本并播 .38s 弹性升入；全部换完的时刻（5×45+260=485ms）按钮做宽度动画：先把宽度钉在旧文案实测宽度，再用隐藏克隆节点测出新文案宽度，随后经 requestAnimationFrame 把宽度过渡到新值（.35s），避免换字瞬间跳变；同时标题容器 lang 属性与按钮缩写同步更新。
- 选中态：当前选项加对勾（opacity 1）并置 aria-selected，语言按钮 aria-label 更新为「{语言名} selected」。
- prefers-reduced-motion 下（或 options.reducedMotion）：交换动画整体关闭（animation:none），六处文案与按钮宽度、缩写直接一次性替换，最终状态完整。
- 键盘与无障碍：语言按钮与选项均为原生 button，可 Tab 与 Enter 操作；下拉容器 role="listbox"、选项 role="option"；每处文案切换发生在带 lang 标记的容器内，利于读屏发音；Escape 为唯一快捷键，下拉不支持方向键导航。
- options.height 改场景高度（默认 340），options.reducedMotion 覆盖系统偏好；支持同页多实例，更新 options 不重挂载，卸载时清理计时器与监听器。

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| height | number | 340 | 场景高度，逻辑像素；窄容器整景按比例缩小 |
| reducedMotion | boolean | 跟随系统 | 覆盖系统的减少动态偏好 |

## 独立实现与六框架交付

- 仅凭本文从零生成可运行的实现。尺寸、颜色、文案、图形和运动算法均以上述文字为准；所有装饰用 CSS 与内联 SVG 绘制，不加载远程图片、字体、视频或素材（旗帜为 Unicode emoji 字符）。
- 当前交付重点为 React，组件名称 LocaleSwitch。从零创建四个文件：LocaleSwitch.tsx、LocaleSwitchEngine.js、motion-runtime.ts、LocaleSwitchEngine.d.ts；分别实现框架入口、完整交互核心、实例生命周期和类型声明。文件名是需要生成的产物，不假定接收者已经拥有任何文件。
- 同时提供 React、Vue、Svelte、Solid、Preact、Vanilla 原生生命周期入口，共享框架无关核心。DOM 仅在挂载后访问，支持同页多实例；更新时保持状态，销毁时清理动画、计时器、观察器及监听器。不要用 iframe 代替组件实现。
- 依赖安装说明：npm install react react-dom。若使用依赖，只使用其公开 API；组件的布局、样式、图形和算法必须在本次生成的文件中完整实现，不引用现成效果组件。
- 实现 options.height 以调整场景高度，options.reducedMotion 覆盖系统偏好；减少动态效果仍保留完整语言切换。
- 给出每个文件的完整内容、安装和运行步骤、以下使用示例所需的全部实现。不得留省略号、待补素材或"自行补齐核心"的占位。
- 验收：375 / 768 / 1440px 无横向溢出；三语言交叉切换、按钮宽度过渡与缩写同步正确；浅色深色两套令牌正确；多实例互不干扰，卸载后停止所有任务。

## 使用示例

```tsx
import { LocaleSwitch } from "./LocaleSwitch";

export default function App() {
  return <LocaleSwitch />;
}
```
