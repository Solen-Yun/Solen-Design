从零实现「玻璃导航条」组件：一条悬浮的磨砂玻璃导航栏，品牌居左、链接靠右，整条圆角浮在内容上方；向下滚动时从通栏平滑收短为一枚居中胶囊，向上滚回再展开。完整规格如下，不依赖外部网页、视频、图片、字体文件或现成效果组件。

## 视觉与布局

- 纯 React + CSS 实现，只产两个文件：GlassNavbar.jsx（入口与状态）和 GlassNavbar.css（全部样式）。React >= 18，无其他依赖，不用 iframe。
- 全部视觉旋钮经内联 CSS 变量下发：--gnb-bar（barColor）、--gnb-ink（textColor）、--gnb-opacity（glassOpacity，0–1）、--gnb-blur（blurRadius px）、--gnb-compact（compactWidth px）。
- 根元素是 `<nav>`，flex 横向排列、align-items center、gap 0.5rem。
- 默认 pinned 形态：position fixed、top 1rem、left 50% 加 transform translateX(-50%) 水平居中、z-index 50；高 52px、水平内边距 12px、宽 calc(100% - 40px)、圆角 22px。
- 玻璃底：背景为 barColor 按 glassOpacity 比例与透明色 color-mix 混合；backdrop-filter: blur(blurRadius)（带 -webkit- 前缀）；边框 1px 实线，颜色为墨色 14% 与透明的 color-mix；圆角 22px；投影 0 8px 24px rgb(0 0 0 / 0.08)；宽度过渡 0.35s ease。
- 品牌链接 a：水平 padding 8px、字号 15px、字重 600、字距 -0.01em、墨色、不换行、无下划线；点击 preventDefault，不跳转。
- 链接区在品牌右侧：中间放一个 flex:1 1 0 的 spacer 撑开；链接 ul 无边距无列表样式、flex 横向、间距 4px。
- 链接按钮：inline-flex 垂直居中、高 36px、水平 padding 16px、全圆角胶囊（999px）、无边框无背景、字号 14px、不换行；闲色为墨色 60% 与透明的 color-mix；hover 变全墨色并加墨色 6% 背景；选中（is-active）全墨色、墨色 8% 背景、字重 500；颜色与背景过渡 0.15s。

## 状态与动效

- 内部状态两个：active（选中链接序号）与 compact（是否已收短）。defaultActive 指定初始选中序号；点击链接 setActive(index) 并回调 onItemSelect(index, label)。
- 收短逻辑（shrink=true 时启用）：滚动位置超过 compactAt（默认 40px）置 compact=true，回滚到阈值以内置回 false。监听目标分两种——pinned=true 跟随 window.scrollY；pinned=false 跟随根元素父容器（最近的滚动容器）的 scrollTop。监听为 passive，卸载时移除；shrink=false 时恒为通栏，不挂监听。
- 收短呈现：compact 状态把宽度从通栏变为 min(compactWidth, calc(100% - 32px))，仅宽度变化，靠 0.35s ease 过渡完成收短与展开；位置、高度、圆角都不变。
- pinned=false 的内嵌形态（--embedded）：position sticky、left 重置为 auto、transform 移除、宽 calc(100% - 32px)、margin-inline auto 居中。sticky 下 left 是滚动约束而不是偏移，必须重置 fixed 模式的 left: 50%，否则整条会被推向一侧。内嵌模式跟随所在滚动容器的滚动收短，适合预览与演示。
- 不修改宿主 body 或全局 URL；同页多实例独立；卸载时移除滚动监听。

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| items | string[] | ["首页", "产品", "文档", "关于"] | 导航链接标签，靠右排列 |
| brand | string | "Solenio" | 左侧品牌文字 |
| defaultActive | number | 0 | 挂载时选中的链接序号 |
| onItemSelect | (index, label) => void | - | 点击链接时回调，该链接同时成为选中态 |
| pinned | boolean | true | true 固定于视口跟随窗口滚动；false 在最近的滚动容器内 sticky |
| shrink | boolean | true | 滚动超过阈值时从通栏收短为居中胶囊 |
| compactAt | number | 40 | 触发收短的滚动位置（px） |
| compactWidth | number | 608 | 收短后的胶囊宽度（px） |
| glassOpacity | number | 0.72 | 玻璃底色的不透明度，0–1 |
| blurRadius | number | 14 | 背景模糊半径（px） |
| barColor | string | "#ffffff" | 玻璃底色，边框由文字色推导 |
| textColor | string | "#17181a" | 品牌与链接的墨色，未选中链接为其 60% |
| className | string | "" | 根节点附加类名 |

## 交付及验证

- 交付 GlassNavbar.jsx 与 GlassNavbar.css 两个文件的完整内容、安装说明与使用示例；不得留省略号或「自行补齐核心」的占位。
- 验证：窗口滚动时通栏平滑收短为居中胶囊、回滚展开；pinned=false 在滚动容器内 sticky 并随容器滚动收短；compactAt、compactWidth、glassOpacity、blurRadius 全部生效；选中态、hover 态、闲态三层文字与底色分明；375 / 768 / 1440 无横向溢出；亮暗主题下玻璃可读；卸载后无残留监听。
