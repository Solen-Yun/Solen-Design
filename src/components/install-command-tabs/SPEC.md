# 安装命令页签 — InstallCommandTabs

一张 340×340 的快速上手卡：顶部「Quick start」标题与一行副题；中部一块始终深色的终端面板，上沿四个等宽页签 npm / pnpm / yarn / bun，淡紫色下划线滑块随选中项移动，下方命令行显示「$ npm install solen-design」，右侧一枚 32×32 的复制按钮；底部「Next」小节是一块浅色代码卡，两行示例（import 与标签用法）默认半透明左偏，复制成功后才逐行点亮。切页签时只有命令前缀（npm install → pnpm add 等）整体做「模糊上出、下方模糊下入」的替换，包名 solen-design 纹丝不动；复制成功按钮变绿打勾、弹出「Copied」气泡并点亮代码示例，1.6 秒后复原。

## 布局与材质

- 场景 340×340px，圆角 30px，溢出裁切，底色表面色，外圈 1px 线色描边（0 0 0 1px），下方 0 30px 60px -36px 强阴影。窄容器里整景等比缩小。
- 头部：绝对定位 left 20px、right 20px、top 22px。标题「Quick start」17px/900、字距 -0.03em；副题「Install and render your first screen in a minute」margin-top 3px、11px/650、三级墨色。
- 终端面板：绝对定位 left 14px、right 14px、top 82px、圆角 16px，浅色深色主题下都固定深色——背景 #0F1117、外圈 1px #262A36、投影 0 18px 34px -18px rgba(0,0,0,.5)，文字基调 #E5E7EB。
- 页签条：role="tablist" aria-label「Package manager」，flex、间距 2px、内边距 8px 8px 0。下划线滑块绝对定位 left 8px、bottom -1px、高 2px、圆角 1px、色 #A78BFA，宽度与位移都以选中页签实测值设置（translateX(offsetLeft-8)），过渡各 .35s cubic-bezier(.3,1.3,.5,1)。页签按钮高 30px、内边距 0 11px、上圆角 8px、等宽字体 11px/700，未选色 #8B90A3、选中色 #F3F4F6（color 过渡 .2s）；role="tab" + aria-selected，roving tabindex。
- 命令行：role="tabpanel"，flex、间距 8px、内边距 14px 10px 14px 14px、上缘 1px #262A36 分隔线。命令为等宽字体 12.5px/600、单行溢出隐藏——「$」提示符 #6B7280、右距 8px；前缀片段是可替换 span（白字 pre 空白）；包名 b 色 #C4B5FD、600 字重。
- 复制按钮：32×32px、圆角 9px、背景 #1E2230、图标色 #C7CAD6、14×14 双页拷贝图标（stroke-width 1.5）；成功态背景 #064E3B、图标 #6EE7B7、换成 2px 对勾；背景与颜色过渡 .2s。气泡「Copied」绝对定位 right -6px、bottom calc(100% + 6px)、内边距 3px 8px、圆角 7px、背景 #F3F4F6、字色 #0F1117、10px/850，隐藏态透明加 translateY(4px)，出现经 transform .3s cubic-bezier(.3,1.6,.5,1) 弹起。
- Next 小节：绝对定位 left 14px、right 14px、top 206px。标签「Next」10px/850、三级墨色；代码卡 margin-top 6px、内边距 10px 12px、圆角 13px、背景次表面色、inset 1px 线圈，等宽字体 10.5px、行高 1.7、次级墨色。三行内容：注释「// Import it anywhere in your app」（三级墨）、「import { Dock } from 'solen-design/react'」（关键字 #9333EA、字符串 #059669，两种主题一致）、「&lt;Dock /&gt;」。行常态 opacity .25、translateX(-6px)。
- 场景令牌含浅色与深色两套（随 prefers-color-scheme 切换，仅 Next 小节与标题受影响）：表面 #FFFFFF/#13141C、次表面 #F5F3EF/#1A1B25、三表面 #EAE7E1/#252632、主墨 #16151B/#F4F0E8、次墨 #57535F/rgba(244,240,232,.68)、三墨 #8E8A97/rgba(244,240,232,.42)、线 rgba(22,21,27,.09)/rgba(255,255,255,.08)、accent #6A57F2/#B7A4FF。组件样式不声明页面字体族（终端与代码用等宽栈 ui-monospace、SFMono-Regular、Menlo、monospace），其余继承宿主页面字体。

## 数据

- 包管理器写死 4 组（页签名 / 命令前缀 / 包名）：npm ·「npm install 」· solen-design；pnpm ·「pnpm add 」· solen-design；yarn ·「yarn add 」· solen-design；bun ·「bun add 」· solen-design。完整命令形如「npm install solen-design」。
- 页面文案写死：「Quick start」「Install and render your first screen in a minute」「Next」「Copied」「// Import it anywhere in your app」及示例代码两行（含「{ Dock }」与「'solen-design/react'」）。
- 页签选择持久化：写入 localStorage 键「u272-pm」（0–3），下次挂载读取并夹取到合法区间；读写失败静默。复制走 navigator.clipboard，失败静默。不发起任何网络请求。

## 操作和动效

- 页签切换：点击或左右方向键在四个页签间循环（preventDefault 后 pick 并移动焦点）；下划线滑块滑到新页签（宽与位移各 .35s 弹性曲线）。命令替换只动前缀 span：先加 is-out（透明 + 3px 模糊 + 上移 4px，过渡 .2s/.25s），180ms 后写入新前缀并播 is-in 入场（.3s ease，自下方 4px 模糊淡入）；包名保持不变；首次挂载与 reducedMotion 时直接写入不播动画。挂载后下一帧重测滑块尺寸防止初绘测量失准。
- 复制：点击按钮把当前完整命令写入剪贴板，按钮进入成功态（变绿打勾、气泡「Copied」弹起），同时给场景加 is-next——Next 代码卡三行按 0.15s + 0.12s×序号的延迟逐行从半透明左偏点亮到位；1600ms 后按钮复原（延迟期间重复点击会重置计时）。代码示例一旦点亮保持可见。
- prefers-reduced-motion 下（或 options.reducedMotion）：滑块、命令前后缀、代码行、气泡的全部过渡与入场动画关闭，状态直接落位；切换与复制行为不变。
- 键盘与无障碍：页签 role="tab"、命令区 role="tabpanel"、页签组 aria-label「Package manager」；roving tabindex 选中项才进 Tab 序；复制按钮 aria-label「Copy command」、气泡 aria-hidden；页签与复制钮 focus-visible 外圈 2px #A78BFA（页签偏移 -2px、复制钮偏移 2px）。
- options.height 改场景高度（默认 340），options.reducedMotion 覆盖系统偏好；支持同页多实例（localStorage 键共用、值取最后写入），更新 options 不重挂载，卸载时清理计时器与监听器。

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| height | number | 340 | 场景高度，逻辑像素；窄容器整景按比例缩小 |
| reducedMotion | boolean | 跟随系统 | 覆盖系统的减少动态偏好 |

## 独立实现与六框架交付

- 仅凭本文从零生成可运行的实现。尺寸、颜色、文案、图形和运动算法均以上述文字为准；所有装饰用 CSS 与内联 SVG 绘制，不加载远程图片、字体、视频或素材。
- 当前交付重点为 React，组件名称 InstallCommandTabs。从零创建四个文件：InstallCommandTabs.tsx、InstallCommandTabsEngine.js、motion-runtime.ts、InstallCommandTabsEngine.d.ts；分别实现框架入口、完整交互核心、实例生命周期和类型声明。文件名是需要生成的产物，不假定接收者已经拥有任何文件。
- 同时提供 React、Vue、Svelte、Solid、Preact、Vanilla 原生生命周期入口，共享框架无关核心。DOM 仅在挂载后访问，支持同页多实例；更新时保持状态，销毁时清理动画、计时器、观察器及监听器。不要用 iframe 代替组件实现。
- 依赖安装说明：npm install react react-dom。若使用依赖，只使用其公开 API；组件的布局、样式、图形和算法必须在本次生成的文件中完整实现，不引用现成效果组件。
- 实现 options.height 以调整场景高度，options.reducedMotion 覆盖系统偏好；减少动态效果仍保留完整切换与复制流程。
- 给出每个文件的完整内容、安装和运行步骤、以下使用示例所需的全部实现。不得留省略号、待补素材或"自行补齐核心"的占位。
- 验收：375 / 768 / 1440px 无横向溢出；页签切换只替换前缀、复制反馈与代码点亮正确；浅色深色两套令牌正确（终端恒为深色）；多实例互不干扰，卸载后停止所有任务。

## 使用示例

```tsx
import { InstallCommandTabs } from "./InstallCommandTabs";

export default function App() {
  return <InstallCommandTabs />;
}
```
