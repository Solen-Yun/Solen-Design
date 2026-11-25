# 输入项目名确认删除 — TypeToDelete

一张 340×340 的项目设置页危险操作场景：页面上半部是「Project settings」标题和一张项目卡（渐变图标 + 等宽字体项目名 my-landing + 「Deployed 3 min ago · 12k visits」），下半部是红色描边的「Danger zone」区块和一枚 #E11D48 的 Delete 按钮。点 Delete 弹出确认对话框：「Delete this project?」加不可恢复说明、项目名逐字染色条、等宽输入框和 Cancel / Delete forever 双按钮——只有完整输入 my-landing（区分大小写）Delete forever 才解禁，输错时输入框左右摇晃、名称条只把正确前缀染红。确认删除后对话框收起、项目卡碎成 114 片小方块飞散坠落、原地浮现虚线空态「Nothing here yet」，底部滑入「Project deleted」撤销条，6 秒进度条走完自动收回，点 Undo 立即恢复项目卡。

## 布局与材质

- 场景 340×340px，圆角 30px，溢出裁切，底色表面色，外圈 1px 线色描边（0 0 0 1px），下方 0 30px 60px -36px 强阴影。窄容器里整景等比缩小。
- 设置页：绝对填充，内边距 20px 18px。标题 16px/900。项目卡 flex、间距 11px、margin-top 12px、内边距 13px、高 66px、圆角 16px、背景次表面色、inset 1px 线圈；图标 40×40px、圆角 12px、背景 linear-gradient(135deg, #38BDF8, #6366F1)；项目名 ui-monospace、SFMono-Regular、Menlo、monospace、13px/800；副文 margin-top 2px、10px/700、三级墨色。
- 空态占位：绝对定位 left 18px、right 18px、top 52px、高 66px、圆角 16px、1.5px 虚线线圈、11px/750、三级墨色、文本「Nothing here yet」；常态透明，项目删除后（is-gone）以 opacity .4s 且延迟 .5s 淡入。
- 碎片层：绝对定位 left 18px、top 52px、宽 304px、高 66px，按 16×11px 网格平铺小方块（圆角 3px、背景三表面色），仅删除瞬间可见。
- Danger zone：margin-top 16px、内边距 13px、圆角 16px、inset 线圈为 #E11D48 的 35% 混色；区块题「Danger zone」12px/850、#BE123C；说明行 flex、间距 10px、margin-top 6px——文案「Removes the project and every deployment」10.5px、行高 1.4、650 字重、次级墨色；Delete 按钮高 32px、内边距 0 13px、圆角 9px、#E11D48 实底白字、11.5px/850。
- 对话框：role="alertdialog" aria-modal，绝对定位 left 16px、right 16px、垂直居中（top 50%、margin-top -118px）、内边距 18px、圆角 20px、背景表面色、投影 0 30px 60px -20px rgba(0,0,0,.45)；关闭态 translateY(16px) scale(.96) 且透明，打开态归位，过渡 transform .35s cubic-bezier(.3,1.3,.5,1)、opacity .2s。标题行 flex、间距 8px、15px/900「Delete this project?」，行首 24×24px、圆角 8px 的感叹号片（背景 #E11D48 15% 混色、字 13px/900、色 #E11D48）；说明「This can’t be undone. Type the name below to confirm.」margin-top 8px、11px、行高 1.5、650 字重、次级墨色。
- 名称染色条：margin-top 12px、内边距 5px 9px、圆角 8px、背景次表面色，等宽字体 13px/800、三级墨色；项目名逐字拆成 span，已正确输入的前缀字符变为 #E11D48（颜色过渡 .15s）。
- 输入框：宽 100%、高 42px、margin-top 8px、内边距 0 12px、圆角 11px、背景次表面色、inset 1.5px 线圈，等宽字体 13px/700、无轮廓；聚焦时线圈变 inset 0 0 0 2px #E11D48；输错新增字符时播放 .35s 摇晃动画（25%/75% 位移 -4px、50% 位移 +4px）。aria-label「Type the project name」。
- 底部按钮行：flex、间距 6px、margin-top 14px，两钮各 flex:1、高 40px、圆角 11px、12px/850——Cancel 背景次表面色、文字次级墨；「Delete forever」#E11D48 实底白字，禁用态 opacity .3、not-allowed 光标。
- 撤销条：绝对定位 left 14px、right 14px、bottom 14px、高 46px、内边距 0 6px 0 14px、圆角 14px、墨色实底、文字用表面色、11.5px/750、溢出裁切；隐藏态 translateY(140%)，出现态归位，过渡 transform .45s cubic-bezier(.3,1.4,.5,1)。左侧文案「Project deleted」，右侧 Undo 按钮高 34px、内边距 0 12px、圆角 10px、背景表面色 16% 混色、文字表面色、11.5px/850（默认 tabindex -1 不进 Tab 序，出现后置 0）；条底一根 3px 高的 #F43F5E 进度条，origin 在左端。
- 遮罩：绝对填充 rgba(10,10,20,.42)，透明↔不透明过渡 .3s，打开时可点击关闭。
- 场景令牌含浅色与深色两套（随 prefers-color-scheme 切换）：表面 #FFFFFF/#13141C、次表面 #F5F3EF/#1A1B25、三表面 #EAE7E1/#252632、主墨 #16151B/#F4F0E8、次墨 #57535F/rgba(244,240,232,.68)、三墨 #8E8A97/rgba(244,240,232,.42)、线 rgba(22,21,27,.09)/rgba(255,255,255,.08)、accent #6A57F2/#B7A4FF；危险色固定 #E11D48 / #BE123C。组件样式不声明页面字体族（项目名、染色条、输入框为等宽栈），其余继承宿主页面字体；按钮 focus-visible 外圈 2px accent、偏移 2px。

## 数据

- 项目名写死「my-landing」，逐字比对区分大小写；项目卡副文写死「Deployed 3 min ago · 12k visits」。
- 对话框文案写死：「Delete this project?」「This can’t be undone. Type the name below to confirm.」「Cancel」「Delete forever」；空态「Nothing here yet」；撤销条「Project deleted」「Undo」。
- 页面标题「Project settings」与 Danger zone 文案写死。不发起任何网络请求。

## 操作和动效

- 打开对话框：项目未删除时点 Delete；输入框清空并在 200ms 后自动聚焦（reducedMotion 时立即），关闭时把焦点还给 Delete 按钮。Escape、Cancel、点遮罩都会关闭。
- 输入匹配：input 事件实时逐字符与 my-landing 比对——名称条把正确前缀逐字染红（#E11D48）；输入比上次长且出现失配字符时输入框左右摇晃 .35s；「Delete forever」仅在输入与 my-landing 完全相等时解禁，否则禁用。输入框内按 Enter 等价点击已解禁的「Delete forever」。
- 确认删除：关闭对话框后播放碎裂动画——304×66 的项目卡区域生成 19 列 × 6 行共 114 片 16×11px 方块，每片经 Web Animations API 飞散：水平位移 (随机-0.3)×90px、垂直下坠 40+随机×120px、旋转 (随机-0.5)×200deg、缩到 0.4 并淡出，时长 700+随机×300ms，延迟按横向位置 (x/304)×220ms 加 0–80ms 随机、缓动 cubic-bezier(.5,0,.8,.6)、fill forwards，1400ms 后清空碎片层；随后项目卡隐藏、虚线空态延迟 .5s 淡入（opacity .4s）。
- 撤销条：删除同时从底部滑入（.45s 弹性曲线），进度条 scaleX 1→0 匀速走 6000ms；6 秒走完自动滑出并把 Undo 移出 Tab 序。点 Undo 立即取消计时、收回撤销条、移除删除态（项目卡恢复、空态消失），焦点回到 Delete 按钮。
- prefers-reduced-motion 下（或 options.reducedMotion）：对话框、遮罩、撤销条、空态的过渡与摇晃动画关闭，碎裂动画整体跳过（直接呈现删除后状态），聚焦延迟归零；状态流转不变。
- 键盘与无障碍：对话框 role="alertdialog" aria-modal，标题经 aria-labelledby 指向（实例级唯一 id），关闭时 aria-hidden 同步；输入框 aria-label「Type the project name」；Undo 出现时才进入 Tab 序。
- options.height 改场景高度（默认 340），options.reducedMotion 覆盖系统偏好；支持同页多实例（对话框 id 按实例生成），更新 options 不重挂载，卸载时清理计时器与监听器。

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| height | number | 340 | 场景高度，逻辑像素；窄容器整景按比例缩小 |
| reducedMotion | boolean | 跟随系统 | 覆盖系统的减少动态偏好 |

## 独立实现与六框架交付

- 仅凭本文从零生成可运行的实现。尺寸、颜色、文案、图形和运动算法均以上述文字为准；所有装饰用 CSS 与内联 SVG 绘制，不加载远程图片、字体、视频或素材。
- 当前交付重点为 React，组件名称 TypeToDelete。从零创建四个文件：TypeToDelete.tsx、TypeToDeleteEngine.js、motion-runtime.ts、TypeToDeleteEngine.d.ts；分别实现框架入口、完整交互核心、实例生命周期和类型声明。文件名是需要生成的产物，不假定接收者已经拥有任何文件。
- 同时提供 React、Vue、Svelte、Solid、Preact、Vanilla 原生生命周期入口，共享框架无关核心。DOM 仅在挂载后访问，支持同页多实例；更新时保持状态，销毁时清理动画、计时器、观察器及监听器。不要用 iframe 代替组件实现。
- 依赖安装说明：npm install react react-dom。若使用依赖，只使用其公开 API；组件的布局、样式、图形和算法必须在本次生成的文件中完整实现，不引用现成效果组件。
- 实现 options.height 以调整场景高度，options.reducedMotion 覆盖系统偏好；减少动态效果仍保留完整删除与撤销流程。
- 给出每个文件的完整内容、安装和运行步骤、以下使用示例所需的全部实现。不得留省略号、待补素材或"自行补齐核心"的占位。
- 验收：375 / 768 / 1440px 无横向溢出；大小写匹配门控、碎裂删除、6 秒撤销窗口正确；浅色深色两套令牌正确；多实例互不干扰，卸载后停止所有任务。

## 使用示例

```tsx
import { TypeToDelete } from "./TypeToDelete";

export default function App() {
  return <TypeToDelete />;
}
```
