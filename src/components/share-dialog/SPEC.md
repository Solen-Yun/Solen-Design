# 分享权限对话框 — ShareDialog

340×340 的文档分享面板：顶部是标题「Share “Spring campaign plan”」，往下「People with access」列出三位共享人（首字母头像圆片 + 姓名 + 权限），「General access」一行左侧是 34px 的圆形图标槽——默认一枚闭合挂锁，点右侧「Restricted」按钮展开下拉列表，选「Anyone with the link」时挂锁旋进位、地球从缩小转到正面并翻成绿色，说明文字同步换成「Anyone who has the link can view」。面板底部是灰底链接条 `https://example.com/d/9f2k-spring` 与墨色「Copy link」按钮，点它按钮变绿、图标换成对勾、文案变「Copied」，链接条闪一圈强调色描边，同时底部滑出 Email / Message / Embed 三个分享方式按钮；1.8 秒后复制反馈收回。

## 布局与材质

- 场景根 340×340px，圆角 30px，overflow hidden，背景表面色，外圈 1px 线色描边加 `0 30px 60px -36px` 强阴影，文字墨色。场景令牌用 `light-dark()` 写两套，浅色：表面 #FFFFFF、次表面 #F5F3EF、三级表面 #EAE7E1、墨色 #16151B、次墨 #57535F、三级墨 #8E8A97、线 rgba(22,21,27,.09)、强线 rgba(22,21,27,.17)、强调 #6A57F2、强调二 #2F8FE0、强调浅底 rgba(106,87,242,.12)、强调字 #FFFFFF、薄荷 #119C72、警示 #D6731E、危险 #D93A55、玻璃 rgba(255,255,255,.58)、玻璃线 rgba(255,255,255,.85)、投影 rgba(40,30,80,.14)、强投影 rgba(40,30,80,.3)、渐变 linear-gradient(120deg,#7B61FF,#3D8BFF 55%,#1FB89A)；深色：表面 #13141C、次表面 #1A1B25、三级表面 #252632、墨色 #F4F0E8、次墨 rgba(244,240,232,.68)、三级墨 rgba(244,240,232,.42)、线 rgba(255,255,255,.08)、强线 rgba(255,255,255,.16)、强调 #B7A4FF、强调二 #7DB4FF、强调浅底 rgba(183,164,255,.15)、强调字 #0B0C12、薄荷 #7EE8C0、警示 #FFB26B、危险 #FF7D8C、玻璃 rgba(255,255,255,.07)、玻璃线 rgba(255,255,255,.18)、投影 rgba(0,0,0,.45)、强投影 rgba(0,0,0,.72)、渐变 linear-gradient(120deg,#B7A4FF,#7DB4FF 55%,#A5F2D3)。场景不声明 font-family，继承宿主页面字体；链接条里的地址单独用 ui-monospace, SFMono-Regular, Menlo, monospace 等宽栈，10.5px 次墨色。
- 内层面板绝对定位铺满，内边距 18px 18px 16px。标题 15px/900、字距 -0.02em、margin 0；两个小节标题（「People with access」「General access」）上外边距 12px、下外边距 6px，10px/850、三级墨色。
- 共享人行高 32px、flex 居中、间隙 9px：头像圆片 26×26px 圆形，白字 10.5px/850 显示姓名首字母；姓名 `b` 弹性占满，11.5px/800；权限 `small` 10px/750、三级墨色。
- 通用权限行是 flex 居中、间隙 10px 的定位容器：图标槽 34×34px 圆形，底色次表面、文字次墨色，过渡 background .35s 与 color .35s；公开态底色换 `color-mix(in srgb,#10B981 16%,transparent)`、文字换 #059669。槽内两枚 17×17 SVG 绝对叠放，均带 transform .45s cubic-bezier(.3,1.5,.5,1) 与 opacity .25s 过渡：挂锁（圆角矩形锁体 + 锁梁路径，描边 1.7）默认正位；地球（圆 + 经纬路径，描边 1.6 与 1.4）默认 `rotate(-120deg) scale(.4)` 且 opacity 0。切到公开态时挂锁变 `rotate(120deg) scale(.4)`、opacity 0，地球回正、opacity 1。
- 权限按钮 inline-flex 居中、间隙 4px，内边距 3px 6px、左外边距 -6px，无边框、7px 圆角、透明底、墨色文字 12px/850，右侧一枚 9×9 的下箭头 SVG 取三级墨色；hover 时底色换次表面。按钮下方说明文字是块级 10px/650、三级墨色。
- 下拉列表绝对定位 left 38px、top 30px，z-index 3，宽 200px，内边距 5px，13px 圆角，底色表面色，外圈 1px 线色描边加 `0 16px 32px -12px` 强阴影，变换原点 20% 0，初始 `scale(.94) translateY(-4px)`、opacity 0、pointer-events none，过渡 transform .2s cubic-bezier(.3,1.5,.5,1) 与 opacity .15s；展开态 transform none、opacity 1、pointer-events auto。列表项 flex 两端对齐、宽 100%、高 32px、内边距 0 9px、8px 圆角、透明底、墨色 11.5px/750、左对齐，hover 时底色换次表面；右侧 12×12 的对勾 SVG 取强调色，opacity 0，选中项 opacity 1。
- 链接条 flex 居中、间隙 6px，上外边距 14px，内边距 5px 5px 5px 12px，12px 圆角，底色次表面，内嵌 1px 线色描边。地址单行省略（overflow hidden + text-overflow ellipsis）。
- 复制按钮 inline-flex 居中、间隙 5px，高 30px，内边距 0 11px，9px 圆角，墨色底、表面色字，11px/850，background 过渡 .3s；成功态底色换 #059669。按钮内 12×12 的双箭头链条图标，复制成功时换成对勾路径。
- 底部三个分享方式按钮：flex 等分、间隙 6px，上外边距 10px，每个按钮纵向排列、居中、间隙 4px，内边距 8px 0，12px 圆角，次表面底、次墨字 10px/800，内含 17×17 线性 SVG；初始 transform `translateY(8px)`、opacity 0，过渡 transform .4s cubic-bezier(.3,1.6,.5,1) 与 opacity .25s，出现后回位。第 1/2/3 个按钮的 transition-delay 依次为 0.08s / 0.15s / 0.22s。
- 所有按钮 focus-visible 都是 2px 强调色描边、offset 2px。场景按固定 340px 逻辑宽排版，容器窄于 340px 时整景按比例缩小，宽于 340px 时居中留白；组件内部不设断点，只用 `prefers-color-scheme` 切换深浅色令牌。

## 数据

- 共享人 3 位，字段为 [姓名, 权限, 头像底色]：Seoyeon Kim / Owner / #6366F1，Junho Lee / Can edit / #0EA5E9，Haeun Park / Can view / #EC4899。头像圆片显示姓名首字母 S / J / H。
- 通用权限 2 档，字段为 [按钮文案, 说明文案]：Restricted / Only people added can open，Anyone with the link / Anyone who has the link can view。默认停在第 1 档。
- 分享方式 3 项：Email、Message、Embed，各配一枚 17×17 内联 SVG（信封、带尾气泡、左右尖括号）。
- 文档标题写死为「Share “Spring campaign plan”」，链接写死为 `https://example.com/d/9f2k-spring`。无外部数据请求。

## 操作和动效

- 点权限按钮开合下拉列表：列表以 scale + 上移淡入展开（transform 0.2s cubic-bezier(.3,1.5,.5,1)，opacity 0.15s），按钮的 aria-expanded 同步翻转；再点按钮收起，列表反向退回。
- 选一项立刻生效：按钮文字换成该档文案、下方说明换成对应一句话；选「Anyone with the link」时根节点加公开态，挂锁旋转缩退、地球自 -120° 旋转放大回正并换绿底绿字，图标槽的底色与文字色用 .35s 过渡互换。选完列表收起，焦点回到权限按钮（preventScroll）。列表项自身的 aria-selected 同步到选中项，未选项对勾隐藏。
- 在面板任意位置按 Esc 收起下拉列表。
- 点「Copy link」：尝试写入剪贴板（失败静默忽略），链接条移除闪动态后强制重排再重新加上，触发 0.8s 的高亮动画——动画在 25% 处给链接条换上 `inset 0 0 0 2px` 的强调色内描边与强调浅底，随后回落；按钮加成功态（底色 #059669）、文案换「Copied」、图标换对勾；同时根节点加上分享方式行的显示态，三个按钮依次弹入。1800ms 后按钮恢复墨色底、文案换回「Copy link」、图标换回链条。分享方式行一旦出现就不再自动隐藏。
- 减少动态偏好下：图标槽的 svg、下拉列表、分享方式按钮的过渡全部关闭，链接条的闪动动画也不再播放，其余状态切换与文案替换照旧。
- 无障碍：下拉列表是 `role="listbox"`，选项是 `role="option"` 并带 aria-selected；权限按钮是原生 button，带 aria-haspopup="listbox"、aria-expanded 与 aria-label「Link access」；所有按钮 focus-visible 有 2px 强调色描边；共享人行、链接地址、图标均为静态展示。
- options.height 调整场景高度，options.reducedMotion 覆盖系统偏好。

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| height | number | 340 | 场景高度，逻辑像素；窄容器整景按比例缩小 |
| reducedMotion | boolean | 跟随系统 | 覆盖系统的减少动态偏好 |

## 独立实现与六框架交付

- 仅凭本文从零生成可运行的实现。尺寸、颜色、文案、图形和运动算法均以上述文字为准；所有装饰用 CSS 与内联 SVG 绘制，不加载远程图片、字体、视频或素材。
- 当前交付重点为 React，组件名称 ShareDialog。从零创建四个文件：ShareDialog.tsx、ShareDialogEngine.js、motion-runtime.ts、ShareDialogEngine.d.ts；分别实现框架入口、完整交互核心、实例生命周期和类型声明。文件名是需要生成的产物，不假定接收者已经拥有任何文件。
- 同时提供 React、Vue、Svelte、Solid、Preact、Vanilla 原生生命周期入口，共享框架无关核心。DOM 仅在挂载后访问，支持同页多实例；更新时保持状态，销毁时清理动画、计时器、观察器及监听器。不要用 iframe 代替组件实现。
- 依赖安装说明：npm install react react-dom。若使用依赖，只使用其公开 API；组件的布局、样式、图形和算法必须在本次生成的文件中完整实现，不引用现成效果组件。
- 实现 options.height 以调整场景高度，options.reducedMotion 覆盖系统偏好；减少动态效果仍保留完整流程状态。
- 给出每个文件的完整内容、安装和运行步骤、以下使用示例所需的全部实现。不得留省略号、待补素材或"自行补齐核心"的占位。
- 验收：375 / 768 / 1440px 无横向溢出；权限切换、图标旋换、复制反馈与 Esc 收起都有正确状态；浅色深色两套令牌正确；多实例互不干扰，卸载后停止所有任务。

## 使用示例

```tsx
import { ShareDialog } from "./ShareDialog";

export default function App() {
  return <ShareDialog />;
}
```
