# 域名连接步骤 — DomainConnect

制作一张 340×340 的域名连接屏。顶部标题 "Connect domain"，下方是一条等宽字体的地址栏：锁形图标 + `https://` 协议前缀 + 域名 `mybrand.com`，右端一枚胶囊徽标写 "Pending"。中部是一张三列 DNS 记录表，表头 Type / Name / Value，列出两条待添加的记录，每条 Value 右侧带一枚复制按钮，点它图标变成对勾、底色转绿，1.6 秒后复原。再往下是三行验证状态：Finding DNS records / Propagating worldwide / Issuing SSL certificate，每行左侧一枚 16px 圆形指示灯。底部是通栏的 Verify 按钮。点下 Verify 后三行状态依次转圈、逐条变绿打勾，第二行右侧还会亮起一串代表全球节点的小圆点；全部通过后整卡转入完成态——`https://` 前缀从宽度 0 展开、锁图标与徽标转绿、徽标文案改成 "SSL"，Verify 按钮底色转为 #059669 且文字变成 "Connected"。

## 布局与材质

- 340×340px 场景卡，圆角 30px，overflow 裁切；底色为表面色纯色，外圈 `0 0 0 1px` 线色描边，下方 `0 30px 60px -36px` 强阴影。
- 头部绝对定位 left 18px / right 18px / top 18px。标题 "Connect domain" 为 15px / 字重 900。地址栏上外边距 8px、高 32px、内边距 0 10px、10px 圆角、表面色 2 号底，横向 flex、垂直居中、间距 5px，字体用等宽栈 ui-monospace, SFMono-Regular, Menlo, monospace，字号 12px / 字重 700。
- 地址栏内的锁形图标 13×13：`rect x=2.5 y=6 w=8 h=5.5 rx=1.4` 加 `path M4.3 6 V4.4 a2.2 2.2 0 0 1 4.4 0 V6`，均无填充、描边 1.4；默认取三级墨色，完成态转 #059669，0.3s 过渡。
- `https://` 是一枚行内块，最大宽度初始为 0（完全收起），颜色 #059669；完成态最大宽度放到 70px，0.5s cubic-bezier(.3,1,.4,1) 展开。域名文字紧跟其后。
- 徽标 `em` 用 margin-left auto 靠右，无衬线继承、9.5px / 850、内边距 2px 7px、999px 圆角；底色 color-mix(in srgb,#F59E0B 16%,transparent)、字色 #B45309，完成态换为 color-mix(in srgb,#10B981 16%,transparent) 与 #047857，底色字色各 0.3s 过渡。
- 记录表绝对定位 left 18px / right 18px / top 88px，整表 10px。每行是 `44px 30px 1fr 28px` 的四列网格、间距 6px、垂直居中、行高 30px，下边框 1px 线色；表头行高 22px、字重 850、三级墨色。Type 列文字 10px / 850，Value 列用等宽栈 10px、次级墨色、nowrap 并在超宽时省略号截断。
- 复制按钮 26×24px、7px 圆角、表面色 2 号底、次级墨色，grid 居中；内含 12×12 内联 SVG：副本图形为 `rect x=3.5 y=3.5 w=6.5 h=6.5 rx=1.5` 加 `path M2 8 V2.8 C2 2.4 2.4 2 2.8 2 H8`，描边 1.3、线宽圆头。成功态底色换成 color-mix(in srgb,#10B981 16%,transparent)、字色 #059669，图标换成 12×12 对勾路径 `M2.5 6.3 l2.3 2.3 L9.5 3.8`（描边 1.8、圆头圆角连接）。
- 验证状态区绝对定位 left 18px / right 18px / top 182px。每行 flex、间距 8px、行高 24px、11px / 750，三级墨色，0.25s 过渡。指示灯 16×16px 圆形，默认 `inset 0 0 0 1.5px` 线色描边；运行态为 2px 边框、边框色 color-mix(in srgb,主色 25%,transparent)、顶边改主色色，0.7s linear 无限旋转；完成态填 #10B981，0.35s cubic-bezier(.3,1.7,.5,1) 从 scale(.4) 弹入，并用 `::after` 画白色对勾（左侧 5.5px、上 3px、3.5×7px、边框 0 1.6px 1.6px 0、旋转 45°）。
- 第二行「Propagating worldwide」右端挂一块 96×30px 的小地图面板（margin-left auto），面板内 7 个 6×6px 圆点，默认表面色 3 号底；点亮后变 #10B981 并加 `0 0 0 3px` color-mix(in srgb,#10B981 25%,transparent) 光圈，0.3s 过渡。
- Verify 按钮绝对定位 left 18px / right 18px / bottom 18px，高 44px、13px 圆角、无边框，底色墨色、字色表面色，12.5px / 850；禁用时 opacity 0.6；完成态底色转 #059669 且恢复不透明。
- 场景令牌用 CSS `light-dark()` 随 `color-scheme` 切换，浅色 / 深色两套：表面 #FFFFFF / #13141C，表面 2 #F5F3EF / #1A1B25，表面 3 #EAE7E1 / #252632，墨色 #16151B / #F4F0E8，次级墨色 #57535F / rgba(244,240,232,.68)，三级墨色 #8E8A97 / rgba(244,240,232,.42)，线色 rgba(22,21,27,.09) / rgba(255,255,255,.08)，强线 rgba(22,21,27,.17) / rgba(255,255,255,.16)，主色 #6A57F2 / #B7A4FF，主色 2 #2F8FE0 / #7DB4FF，主色淡底 rgba(106,87,242,.12) / rgba(183,164,255,.15)，主色字 #FFFFFF / #0B0C12，薄荷 #119C72 / #7EE8C0，警告 #D6731E / #FFB26B，危险 #D93A55 / #FF7D8C，玻璃 rgba(255,255,255,.58) / rgba(255,255,255,.07)，玻璃线 rgba(255,255,255,.85) / rgba(255,255,255,.18)，阴影 rgba(40,30,80,.14) / rgba(0,0,0,.45)，强阴影 rgba(40,30,80,.3) / rgba(0,0,0,.72)。除地址栏与记录值外不声明字体族，继承宿主页面字体；按钮统一 `font: inherit`。
- 组件只有 `@media (prefers-reduced-motion: reduce)` 一个媒体查询；场景是固定 340px 宽的等比缩放画布，容器变窄时整景按 `min(1, 可用宽/340)` 缩小，内部用绝对定位不重排。

## 数据

- 两条 DNS 记录（Type、Name、Value）：`A` / `@` / `76.76.21.21`；`CNAME` / `www` / `cname.hostly.app`（演示用的占位主机名）。
- 三条验证状态文案，顺序固定："Finding DNS records"、"Propagating worldwide"、"Issuing SSL certificate"。
- 小地图面板上 7 个圆点的坐标（相对面板左上，单位 px）：(14,10)、(22,18)、(44,8)、(50,16)、(70,12)、(80,20)、(88,9)。
- 表头文案：Type、Name、Value；地址栏域名 `mybrand.com`、协议前缀 `https://`。
- 按钮与徽标文案：初始徽标 "Pending"，初始按钮 "Verify"，验证中按钮 "Checking…"，完成后按钮 "Connected"、徽标 "SSL"。
- 复制按钮的无障碍名称为「<该条记录的 Value> copy」。

## 操作和动效

- 点复制按钮：尝试调用 `navigator.clipboard.writeText(该条 Value)`（失败静默忽略），按钮图标立即换成对勾并转绿，1600ms 后换回副本图标并恢复底色。两次点击互不排队，各自独立计时复位。
- 点 Verify（仅在未完成态生效，已完成时点击直接忽略）：按钮置灰禁用、文案改为 "Checking…"，三行状态按固定时序推进——
  - 第 1 行在 0ms 转为转圈，1000ms 时转完成态（转圈停止、指示灯填 #10B981 并弹出对勾）；
  - 第 2 行在 1000ms 转为转圈，同时小地图圆点从第 200ms 起每隔 240ms 依次点亮一个（共 7 个，最后一个在 1400ms 点亮），第 2 行在 2900ms 转完成态；
  - 第 3 行在 2900ms 转为转圈，3900ms 时转完成态；
  - 4150ms 时整卡进入完成态：`https://` 前缀展开、锁图标转绿、徽标底色字色转绿且文案改为 "SSL"，按钮解除禁用、底色转 #059669、文案改为 "Connected"。
- 每一步的延时都带「代次」校验：一旦有新的 Verify 触发，旧代次的待执行回调全部作废，避免状态错乱；元素卸载后回调同样不再执行。
- 完成态后 Verify 按钮保持 "Connected" 绿底，不再重新触发验证。
- 无障碍：验证状态区容器带 `aria-live="polite"`，三行状态文本变化可被读屏播报；指示灯为 `aria-hidden` 的装饰元素；复制按钮是原生按钮并带 "… copy" 标签；所有按钮 focus-visible 时 2px 主色描边、外偏移 2px。
- `prefers-reduced-motion: reduce`（或 `options.reducedMotion` 为真）时：所有延时压缩到 0ms，三行状态直接落到完成态、`https://` 前缀直接展开，旋转与弹入动画关闭；功能结果与最终画面完全保留。
- 支持同页多实例：查询限定在各自 ShadowRoot 内，不使用全局 id；卸载时清理计时器、事件监听与观察器。

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| height | number | 340 | 场景高度，逻辑像素；窄容器整景按比例缩小 |
| reducedMotion | boolean | 跟随系统 | 覆盖系统的减少动态偏好 |

## 独立实现与六框架交付

- 仅凭本文从零生成可运行的实现。尺寸、颜色、文案、图形和运动算法均以上述文字为准；所有装饰用 CSS 与内联 SVG 绘制，不加载远程图片、字体、视频或素材。
- 当前交付重点为 React，组件名称 DomainConnect。从零创建四个文件：DomainConnect.tsx、DomainConnectEngine.js、motion-runtime.ts、DomainConnectEngine.d.ts；分别实现框架入口、完整交互核心、实例生命周期和类型声明。文件名是需要生成的产物，不假定接收者已经拥有任何文件。
- 同时提供 React、Vue、Svelte、Solid、Preact、Vanilla 原生生命周期入口，共享框架无关核心。DOM 仅在挂载后访问，支持同页多实例；更新时保持状态，销毁时清理动画、计时器、观察器及监听器。不要用 iframe 代替组件实现。
- 依赖安装说明：npm install react react-dom。若使用依赖，只使用其公开 API；组件的布局、样式、图形和算法必须在本次生成的文件中完整实现，不引用现成效果组件。
- 实现 options.height 以调整场景高度，options.reducedMotion 覆盖系统偏好；减少动态效果仍保留完整流程状态。
- 给出每个文件的完整内容、安装和运行步骤、以下使用示例所需的全部实现。不得留省略号、待补素材或"自行补齐核心"的占位。
- 验收：375 / 768 / 1440px 无横向溢出；复制反馈、逐条验证、地图点亮、完成态四件事都正确；浅色深色两套令牌正确；多实例互不干扰，卸载后停止所有任务。

## 使用示例

```tsx
import { DomainConnect } from "./DomainConnect";

export default function App() {
  return <DomainConnect />;
}
