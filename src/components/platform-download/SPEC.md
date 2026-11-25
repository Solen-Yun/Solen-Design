# 平台感知下载区 — PlatformDownload

制作「平台感知下载区」卡片：一张 340×340 的应用下载面板，顶部是小字标语与大标题，中间一排三个系统页签（macOS / Windows / Linux）带动白色滑块切换，下方是 236×54 的大下载按钮——按钮内图标与文案随页签垂直滚动换装（旧内容上移淡出、新内容自下而上补位），按钮下方的版本行同法滚动更新。挂载时按浏览器 userAgent 猜测当前平台并选中对应页签。点击下载按钮后按钮变绿、内容换成对勾与「Your download has started」，右上角弹出一枚来回飘动的「Open here」箭头，底部三张安装步骤卡按 450ms 间隔依次点亮。切换页签会复位全部已点亮状态。

## 布局与材质

- 340×340px 场景卡，圆角 30px，溢出裁切，文字居中。底色为面令牌 var(--ux-surface) 叠加顶部径向光晕：radial-gradient(70% 50% at 50% 0%, var(--ux-accent-soft), transparent 70%)；外圈 1px 线色描边加 0 30px 60px -36px 强阴影，文字色 var(--ux-ink)。场景根是 340×340 的无底色包装层（水平居中），卡片视觉放在其内部的绝对填充层上——文档演示舞台会剥离场景根的背景，卡片底色必须在嵌套层上才能保留。窄容器下整景按 min(1, 容器宽/340) 等比缩小。
- 场景令牌浅色深色两套（CSS 变量 + `light-dark()`，`prefers-color-scheme` 切换）：面 #FFFFFF（深 #13141C）、面 2 #F5F3EF（深 #1A1B25）、墨 #16151B（深 #F4F0E8）、墨 2 #57535F（深 rgba(244,240,232,.68)）、墨 3 #8E8A97（深 rgba(244,240,232,.42)）、线 rgba(22,21,27,.09)（深 rgba(255,255,255,.08)）、accent #6A57F2（深 #B7A4FF）、accent 柔光 rgba(106,87,242,.12)（深 rgba(183,164,255,.15)）。
- 顶部标题区 padding-top 26px：eyebrow「Desktop app」10px/850、字距 0.08em、accent 色；主标题「The same workspace, anywhere」为 h3，20px/字重 900、字距 -0.035em、上边距 4px。
- 页签组：role="tablist"、aria-label「Operating system」，行内 flex、上边距 16px、内边距 3px、圆角 12px、面 2 底、内嵌 1px 线色描边。滑块绝对定位 left/top/bottom 3px、宽 calc((100% - 6px) / 3)、圆角 9px、面底色，阴影 0 1px 4px -1px 强阴影加 1px 线色外圈，切换时以 0.35s cubic-bezier(.3,1.3,.5,1) 平移 translateX(i×100%)。三个页签按钮各 84×30px、圆角 9px、图标与文字间距 5px，图标 13×13px，文字 11px/字重 800 墨 3 色，选中态变墨色（0.2s 过渡）。
- 下载按钮：236×54px、上边距 18px、圆角 16px、墨色实底、文字取面色、14px/850、图标与文字间距 9px、溢出裁切；过渡 background 0.35s、transform 0.15s，按下时缩放到 0.98。内部换装器高 22px、溢出隐藏：旧行以 0.4s cubic-bezier(.3,1.3,.5,1) 上移 100% 并 0.3s 淡出（420ms 后移除节点），新行从 +100% 处进入且不做进入过渡；行内图标 18×18px。下载成功后按钮底色变 #059669。
- 版本行：高 16px、上边距 9px、10.5px/700 墨 3 色、溢出隐藏，换装动画与按钮相同。
- 步骤行：上边距 16px、左右内边距 18px、三卡等宽间距 8px、文字左对齐。每卡内边距 9px、圆角 12px、面 2 底、内嵌 1px 线色描边；初始 40% 透明度、下移 6px，点亮后恢复不透明、归位，描边加粗为 1.5px accent（过渡透明度 0.35s、位移 0.45s cubic-bezier(.3,1.4,.5,1)、阴影 0.3s）。卡内结构：17×17px accent 圆形序号（白字 9.5px/900）、标题 10.5px/850（上距 5px）、说明 9px/650 行高 1.3 墨 3 色（上距 1px）。
- 右上角箭头：绝对定位右 16px、上 12px，纵向排列右对齐、间距 2px，accent 色 9.5px/850，26×26px 线性箭头 SVG（路径 M5 21L20 6M11 6h9v9，2.4px 圆头）；初始 0% 透明度下移 8px，成功后淡入归位（0.3s/0.4s），SVG 以 0.8s ease-in-out infinite alternate 往右 3px 上 4px 飘动；pointer-events:none。
- 页签、下载按钮 focus-visible 均为 2px accent 外圈、偏移 2px。

## 数据

- 页签数据写死三组（名称 / 按钮文案 / 版本行）：macOS / Download for Mac / v2.4.1 · 128MB · macOS 12+；Windows / Download for Windows / v2.4.1 · 142MB · Windows 10+；Linux / Download for Linux / v2.4.1 · .deb · .AppImage。
- 页签图标为中性设备图形（非品牌标志）：macOS 一台翻开笔记本（13×9 圆角 1.5 外框加 16px 底座横线）、Windows 四格田字窗格（四个象限实心块）、Linux 终端窗口（14×12 圆角 2 外框加「> _」提示符笔画）。
- 步骤卡三张写死：1 Open the file / Open the installer you downloaded；2 Install / A few clicks and you're done；3 Sign in / Pick up right where you left off。
- 平台猜测：读 navigator.userAgent——含 Win 判为 Windows（第 2 个页签），含 Linux 或 X11 且不含 Android 判为 Linux（第 3 个），否则 macOS（第 1 个）。初始选中即按此结果。

## 操作和动效

- 点击页签：复位成功态（按钮退出绿色、箭头隐藏、清掉步骤卡计时器与点亮态），更新 aria-selected 与焦点顺序（选中的 tabIndex=0、其余 -1），滑块平移，按钮图标与文案、版本行执行垂直换装。
- 点击下载按钮（已成功则忽略）：按钮变 #059669，内容换装为对勾图标加「Your download has started」；根元素加 is-got 让右上箭头淡入并持续飘动；三张步骤卡按 350 + k×450ms（k=0,1,2）依次点亮。换装动画用 requestAnimationFrame 强制回流后改类名触发。
- `prefers-reduced-motion: reduce` 下：滑块与换装、步骤卡、箭头的过渡全部关闭，换装直接替换内容，步骤卡点亮延时压缩为 0ms，箭头飘动动画停止；options.reducedMotion 为 true 时等价生效。
- 键盘：页签为原生按钮，Tab 只停在选择页（roving tabindex），回车/空格即切换；下载按钮为原生按钮。页签组无方向键循环（代码未实现，照实保留）。箭头、图标均 aria-hidden。
- 更新 options 不重挂载；卸载时清理计时器与监听器。

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| height | number | 340 | 场景高度，逻辑像素；窄容器整景按比例缩小 |
| reducedMotion | boolean | 跟随系统 | 覆盖系统的减少动态偏好 |

## 独立实现与六框架交付

- 仅凭本文从零生成可运行的实现。尺寸、颜色、文案和运动参数均以上述文字为准；界面用 DOM 与 CSS，图标与箭头用内联 SVG 绘制，不加载远程图片、字体、视频或素材。
- 当前交付重点为 React，组件名称 PlatformDownload。从零创建四个文件：PlatformDownload.tsx、PlatformDownloadEngine.js、motion-runtime.ts、PlatformDownloadEngine.d.ts；分别实现框架入口、完整交互核心、实例生命周期和类型声明。文件名是需要生成的产物，不假定接收者已经拥有任何文件。
- 同时提供 React、Vue、Svelte、Solid、Preact、Vanilla 原生生命周期入口，共享框架无关核心。DOM 仅在挂载后访问，支持同页多实例；更新时保持状态，销毁时清理动画、计时器、观察器及监听器。不要用 iframe 代替组件实现。
- 依赖安装说明：npm install react react-dom。若使用依赖，只使用其公开 API；组件的布局、样式、图形和算法必须在本次生成的文件中完整实现，不引用现成效果组件。
- 实现 options.height 以调整场景高度，options.reducedMotion 覆盖系统偏好；减少动态仍保留完整下载状态。
- 给出每个文件的完整内容、安装和运行步骤、以下使用示例所需的全部实现。不得留省略号、待补素材或"自行补齐核心"的占位。
- 验收：375 / 768 / 1440px 无横向溢出；平台初选、页签换装、下载成功态与复位均正确；浅色深色两套令牌正确；多实例互不干扰，卸载后停止所有任务。

## 使用示例

```tsx
import { PlatformDownload } from "./PlatformDownload";

export default function App() {
  return <PlatformDownload />;
}
```
