# 滚动展开视频 — ScrollExpandVideo

制作「滚动展开视频」场景组件：一张 300×480 的落地页卡片，卡内是一块可纵向滚动的页面。顶部是大标题区，下面是一枚居中的小圆角「视频」——深蓝底色上浮着三团模糊的彩色光斑，左上角一颗胶囊写着 `Paused`，底部是播放键、进度条和时间码。把页面向下滚动，视频在吸顶位置上向两侧展开变高（左右始终留 12px 余量），圆角略微收紧；展开到九成以上时视频自动开始播放——胶囊变成 `Playing` 并亮起红点，字幕淡入，进度条与时间码开始走动。滚回顶部，展开可逆地缩回，播放状态随之暂停。

## 布局与材质

- 场景 300×480px，圆角 32px，overflow 裁切，底色取表面色，文字色取墨色，盒子阴影为 `0 0 0 1px var(--ux-line)` 加 `0 30px 60px -36px var(--ux-shadow-strong)`。
- 场景令牌写在根层，浅色/深色两套由 `light-dark()` 切换：`--ux-surface` #FFFFFF / #13141C，`--ux-surface-2` #F5F3EF / #1A1B25，`--ux-surface-3` #EAE7E1 / #252632，`--ux-ink` #16151B / #F4F0E8，`--ux-ink-2` #57535F / rgba(244,240,232,.68)，`--ux-ink-3` #8E8A97 / rgba(244,240,232,.42)，`--ux-line` rgba(22,21,27,.09) / rgba(255,255,255,.08)，`--ux-line-2` rgba(22,21,27,.17) / rgba(255,255,255,.16)，`--ux-accent` #6A57F2 / #B7A4FF，`--ux-accent-2` #2F8FE0 / #7DB4FF，`--ux-accent-soft` rgba(106,87,242,.12) / rgba(183,164,255,.15)，`--ux-accent-ink` #FFFFFF / #0B0C12，`--ux-mint` #119C72 / #7EE8C0，`--ux-warn` #D6731E / #FFB26B，`--ux-danger` #D93A55 / #FF7D8C，`--ux-glass` rgba(255,255,255,.58) / rgba(255,255,255,.07)，`--ux-glass-line` rgba(255,255,255,.85) / rgba(255,255,255,.18)，`--ux-shadow` rgba(40,30,80,.14) / rgba(0,0,0,.45)，`--ux-shadow-strong` rgba(40,30,80,.3) / rgba(0,0,0,.72)，`--ux-grad` 为 120° 渐变（浅色 #7B61FF → #3D8BFF 55% → #1FB89A；深色 #B7A4FF → #7DB4FF 55% → #A5F2D3）。
- 滚动容器 `.u247-sc`：绝对定位 inset 0，`overflow-y: auto`、`overscroll-behavior: contain`、滚动条隐藏（`scrollbar-width: none` 与 `::-webkit-scrollbar{display:none}`）；可聚焦（`tabindex="0"`），无障碍名为 `Page with an intro video`，聚焦时为 `outline: 2px solid var(--ux-accent)`、`outline-offset: -4px`、圆角 32px。
- 标题区 `.u247-hd`：内边距 112px 24px 24px，居中对齐。眉标 `small` 为 10px、字重 850、字距 .06em、颜色 `--ux-accent`，文案 `One minute is enough`；主标题 `h3` 距上 8px、23px、行高 1.2、字重 900、字距 -0.04em，文案 `See how work flows,` 换行 `in one video`。
- 吸顶区 `.u247-pin` 高 640px；内部 `.u247-st` 用 `position: sticky; top: 126px` 吸在滚动容器上方 126px 处，flex 竖排、水平居中。
- 视频框 `.u247-v`：position relative，宽 `calc(186px + 90px × var(--p, 0))`、高 `calc(132px + 96px × var(--p, 0))`、圆角 `calc(22px - 2px × var(--p, 0))`，overflow 裁切，底色 #0B1026，投影 `0 20px 40px -22px rgba(0,0,0,.6)`；其中 `--p` 是滚动进度 0→1。也就是说未滚动时是 186×132、圆角 22px，展开到底是 276×228、圆角 20px——卡片左右始终各留 12px 余量，圆角始终保留。
- 画面内容 `.u247-sn`：绝对定位 inset -20%（比视频框大一圈，避免模糊边缘露白），底纹是三层 `radial-gradient`——`40% 50% at 30% 40%` 的 #6366F1、`35% 45% at 72% 60%` 的 #EC4899、`40% 40% at 55% 25%` 的 #22D3EE，三层都以 `transparent 70%` 收尾；`filter: blur(6px)`；动画 `u247-m 8s ease-in-out infinite alternate`，默认 `animation-play-state: paused`，场景进入播放态后改为 running。关键帧：50% 为 `translate(6%,-4%) scale(1.08) rotate(6deg)`，100% 为 `translate(-5%,5%) scale(1.02) rotate(-4deg)`。
- 播放控件条 `.u247-ui`：绝对定位 left 10px / right 10px / bottom 10px，flex 居中对齐、间距 8px、白色 10px/字重 800。圆形播放键 `.u247-pb` 为 26×26px、圆形、底色 rgba(255,255,255,.18)、`backdrop-filter: blur(6px)`、grid 居中，内含 10×10 的内联 SVG——播放三角路径 `M2 1v8l7-4z` 填白，暂停图形是两根 2.6×8px、圆角 .6 的竖条；默认显示三角，进入播放态后改显暂停图形。进度轨道 `.u247-tr` 为 flex 1、高 3px、圆角 2px、底色 rgba(255,255,255,.25)、overflow 裁切；内条 `i` 高 100%、宽 0、底色白色，宽度按播放进度写入。时间码 `.u247-tm` 使用等宽数字、透明度 .85，初始为 `0:00`。
- 字幕 `.u247-cap`：绝对定位 left 0 / right 0 / bottom 44px，居中，白色 12px/字重 800、`text-shadow: 0 2px 8px rgba(0,0,0,.4)`，初始 opacity 0、下移 6px，过渡 opacity .4s 与 transform .4s；进入播放态后淡入并归位。文案 `Requests reach the right person instantly`。
- 状态胶囊 `.u247-st2`：绝对定位 left 12px / top 12px，内边距 3px 8px、圆角 999px、底色 rgba(0,0,0,.35)、白色 9.5px/字重 800，flex 居中对齐、间距 5px，带 `aria-live="polite"`。胶囊里的圆点 `i` 为 6×6px 圆形、底色 #94A3B8；进入播放态后变为 #F43F5E 并加 `0 0 0 3px rgba(244,63,94,.3)` 光环。胶囊文字在 `Paused` 与 `Playing` 之间切换。
- 滚动提示 `.u247-hint`：竖排居中、间距 2px、距上 14px、9.5px/字重 800、颜色 `--ux-ink-3`，透明度随滚动进度变化，过渡 opacity .3s；文案 `Scroll down`，下方一枚 10×10 的内联 SVG 箭头（路径 `M2.5 3.5 5 6l2.5-2.5`，`currentColor` 描边、线宽 1.6、圆头圆角连接），播放 `u247-bob 1.4s ease-in-out infinite`（50% 下移 3px）。
- 页脚 `.u247-ft`：内边距 0 24px 40px，居中；标题 `b` 为 15px/字重 900，文案 `What's different`；副句 `span` 为 11px/字重 600、颜色 `--ux-ink-2`，文案 `Work in flows, not alerts.`。
- 组件自身不声明 font-family，字体继承宿主；建议实现时使用 `"Pretendard Variable", Pretendard, -apple-system, BlinkMacSystemFont, "Apple SD Gothic Neo", "Segoe UI", Roboto, "Noto Sans KR", sans-serif`。
- 响应式：`createSurface` 的 `responsive` 为 false，场景固定 300×480 逻辑像素；容器窄于 300px 时整景等比缩放，`options.height` 覆盖场景高度。

## 数据

- 无写死的数据集：视频画面是纯 CSS 渐变光斑 + 进度条模拟，不加载任何真实视频、图片或字体。
- 写死文案共六处：眉标 `One minute is enough`，主标题 `See how work flows,` 换行 `in one video`，字幕 `Requests reach the right person instantly`，滚动提示 `Scroll down`，页脚标题 `What's different`，页脚副句 `Work in flows, not alerts.`。
- 写死常量：滚动展开的参考行程 260px（滚动量除以它得到 0→1 的进度）、吸顶偏移 126px、吸顶区高度 640px、视频时长 92 秒（时间码按 分:秒 显示，到点后归零循环）、播放阈值 0.92、提示淡出阈值 0.05。
- 状态胶囊文案只有 `Paused` 与 `Playing` 两种；时间码初始为 `0:00`。

## 操作和动效

- 滚动是唯一入口：在卡内纵向滚动时按 `scrollTop ÷ 260` 得到进度 `p`，夹取在 0 与 1 之间，写进视频框的 `--p`（保留三位小数），视频框的宽、高、圆角随即按上面的公式连续变化；滚回顶部会原路缩回，展开完全可逆。
- 进度超过 0.05 时滚动提示 `Scroll down` 的透明度归 0；回到 0.05 以下时恢复为 1。
- 进度超过 0.92 即进入播放态：根节点加 `.is-play`，状态胶囊文字改为 `Playing`、圆点变红并发光，播放键从三角换成双竖条，字幕淡入上移，画面光斑的位移动画从暂停改为运行。
- 播放进度：帧循环按真实时间推进当前秒数 `t`，每秒更新进度条宽度（`t ÷ 92 × 100%`，两位小数）与时间码（`分:秒`，秒不足两位补零）；`t` 到达 92 后取模归零，循环播放。每帧的步进被限制在最多 0.05 秒，避免切回标签页时跳变。
- 退出播放态（滚回 0.92 以下）时暂停帧循环，暂停后再次触发播放时从当前 `t` 继续而不是从头开始。
- 键盘操作：滚动容器可聚焦（`tabindex="0"`），聚焦后可用方向键与 Page 键滚动；播放键只是画面里的装饰图形，不是可操作按钮。
- 无障碍：滚动容器 `tabindex="0"` 且带 `aria-label="Page with an intro video"`；状态胶囊带 `aria-live="polite"`，播放状态变化会被读屏播报；光斑、播放控件条与滚动提示均标记 `aria-hidden`；聚焦环为 2px accent。
- `prefers-reduced-motion: reduce` 时：光斑的位移动画与提示箭头的上下浮动停止；帧循环不会启动，视频不会播放——展开仍跟随滚动实时变化，但进度条与时间码保持初始值，播放态的字幕与图标切换照常发生。
- 销毁时释放帧回调、定时器、观察器与全部监听器；场景宽高随 `options.height`（默认 480）与容器宽度实时重算。

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| height | number | 480 | 场景高度，逻辑像素；窄容器整景按比例缩小 |
| reducedMotion | boolean | 跟随系统 | 覆盖系统的减少动态偏好 |

## 独立实现与六框架交付

- 仅凭本文从零生成可运行的实现。尺寸、颜色、数据与运动参数均以上述文字为准；界面用 DOM 与 CSS，装饰用内联 SVG，滚动插值驱动，不加载远程图片、字体、视频或素材。
- 当前交付重点为 React，组件名称 ScrollExpandVideo。从零创建四个文件：ScrollExpandVideo.tsx、ScrollExpandVideoEngine.js、motion-runtime.ts、ScrollExpandVideoEngine.d.ts；分别实现框架入口、完整交互核心、实例生命周期和类型声明。文件名是需要生成的产物，不假定接收者已经拥有任何文件。
- 同时提供 React、Vue、Svelte、Solid、Preact、Vanilla 原生生命周期入口，共享框架无关核心。DOM 仅在挂载后访问，支持同页多实例；更新时保持状态，销毁时清理动画、计时器、观察器及监听器。不要用 iframe 代替组件实现。
- 依赖安装说明：npm install react react-dom。组件的布局、样式与算法必须在本次生成的文件中完整实现，不引用现成效果组件。
- 实现 options.height 以调整场景高度（默认 480），options.reducedMotion 覆盖系统偏好；减少动态时仍保留展开状态与播放态的文案。
- 给出每个文件的完整内容、安装和运行步骤、以下使用示例所需的全部实现。不得留省略号、待补素材或"自行补齐核心"的占位。
- 验收：375 / 768 / 1440px 无横向溢出；滚动展开与回缩可逆、吸顶正确、播放态切换与进度走动正确；浅色深色两套令牌正确；多实例互不干扰，卸载后停止所有任务。

## 使用示例

```tsx
import { ScrollExpandVideo } from "./ScrollExpandVideo";

export default function App() {
  return <ScrollExpandVideo />;
}
```
