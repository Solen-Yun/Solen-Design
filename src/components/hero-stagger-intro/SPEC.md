# 落地页首屏入场 — HeroStaggerIntro

一张 340×340 的落地页首屏卡：顶部一条导航（Lumen 标志、Product、Pricing、Blog 与一枚「Get started」按钮），下方是「Version 2.0 is out」徽章、两行大标题「Finish your team's work in one place」、一行说明文字、两枚按钮（Start free / Watch demo），底部露出一张产品界面截图（左侧竖条导航 + 右侧「This week」柱状卡）。整屏按菜单 → 徽章 → 标题逐词 → 说明 → 按钮 → 截图的次序错峰入场：标题的每个词被一个裁切框包住，词从框底下方推上来；截图则带着 24deg 的透视倾斜、46px 的下沉与 6px 的模糊一起归位。右下角一枚「Replay」按钮可随时重放整段入场。

## 布局与材质

- 场景卡为 340×340px 的 div，圆角 30px，overflow 裁切，带 700px 透视。背景是 `radial-gradient(120% 70% at 50% 0%, 强调色柔光, transparent 60%)` 叠在表面色上；外圈 1px 线色描边（0 0 0 1px），下方 0 30px 60px -36px 强阴影。卡片另定义一条自定义缓动 `--ux-ease: cubic-bezier(.22,1,.36,1)`，专供入场时的不透明度过渡使用。
- 场景令牌用 `light-dark()` 给浅色与深色两套：表面 #FFFFFF / #13141C，次表面 #F5F3EF / #1A1B25，三级表面 #EAE7E1 / #252632，主墨 #16151B / #F4F0E8，次墨 #57535F / rgba(244,240,232,.68)，弱墨 #8E8A97 / rgba(244,240,232,.42)，线 rgba(22,21,27,.09) / rgba(255,255,255,.08)，强线 rgba(22,21,27,.17) / rgba(255,255,255,.16)，强调色 #6A57F2 / #B7A4FF，次强调 #2F8FE0 / #7DB4FF，强调柔光 rgba(106,87,242,.12) / rgba(183,164,255,.15)，强调字色 #FFFFFF / #0B0C12，薄荷 #119C72 / #7EE8C0，警示 #D6731E / #FFB26B，危险 #D93A55 / #FF7D8C，玻璃 rgba(255,255,255,.58) / rgba(255,255,255,.07)，玻璃线 rgba(255,255,255,.85) / rgba(255,255,255,.18)，阴影 rgba(40,30,80,.14) / rgba(0,0,0,.45)，强阴影 rgba(40,30,80,.3) / rgba(0,0,0,.72)，渐变 120deg 的 #7B61FF→#3D8BFF 55%→#1FB89A（深色为 #B7A4FF→#7DB4FF 55%→#A5F2D3）。字体沿用宿主，组件不声明字体族。
- 导航位于左 16px、右 16px、上 14px，一行 flex 居中对齐、间距 12px、文字 10.5px/字重 700/次墨色。标志块「Lumen」12.5px/字重 900/主墨色，前置一枚 14×14、圆角 5px 的渐变方块并把后面的项顶到右边；其后是「Product」「Pricing」「Blog」；最右是一枚内边距 5px 10px、圆角 999px 的深色药丸按钮「Get started」（字重 800、文字取表面色）。
- 徽章在距顶 56px 处水平居中：内联 flex、间距 6px、内边距 4px 10px、圆角 999px、底色表面色、内描边 1px 线色、文字 10px/字重 800/次墨色，行首一枚 6px 的薄荷色圆点。文字为「Version 2.0 is out」。
- 标题在距顶 82px 处水平居中，25px/行高 1.18/字重 900/字距 -.04em，共两行。每个词被一层 `display:inline-block; overflow:hidden; vertical-align:top; padding:0 .08em` 的裁切框包住，框内是一层 inline-block 的文字。
- 说明文字在距顶 150px 处，左右各留 30px 水平居中，11.5px/行高 1.5/字重 600/次墨色，文案是「From planning to launch, every scattered tool in one place.」。
- 按钮行在距顶 180px 处居中，两枚药丸间距 8px，高 30px、内边距 0 13px、圆角 999px、11px/字重 800：「Start free」底色强调色、白字、投影 0 8px 18px -8px 强调色；「Watch demo」底色表面色、内描边 1px 线色、文字主墨色。两枚都只是静态展示，不响应点击。
- 产品截图在距顶 228px、左右各 28px 处，高 150px，圆角 14px 14px 0 0（上圆下平，像插在屏幕底边），底色表面色，外圈 1px 线色描边，向上投影 0 -10px 40px -18px 强阴影，内容裁切，两列网格 62px + 1fr。左侧栏底色次表面色、内边距 10px 8px，竖排五根 6px 高、圆角 3px 的条（间距 6px），第一根宽 60% 且为强调色。右侧内边距 10px 12px，标题「This week」8.5px/字重 800/弱墨色，下方是六根柱组成的柱状区（间距 5px、高 56px、上距 6px、底部对齐），柱圆角 3px 3px 0 0、底色是强调色 35% 混透明，第 5 根为纯强调色。
- 重播按钮在右 12px、下 12px，内联 flex 居中、间距 5px、高 26px、内边距 0 10px、圆角 999px、底色主墨色、文字取表面色、10.5px/字重 800、不透明度 0.92，内含一枚 11×11 的逆时针回转箭头 SVG；聚焦时 2px 强调色外框、偏移 2px。
- 页面容器在窄容器里整景等比缩小，缩放系数为 min(1, 可用宽度 ÷ 场景宽度)。

## 数据

- 导航写死：标志「Lumen」与三项「Product」「Pricing」「Blog」，按钮「Get started」。
- 徽章写死：「Version 2.0 is out」。
- 标题分两行共七个词：第一行「Finish」「your」「team's」，第二行「work」「in」「one」「place」。
- 说明文字写死：「From planning to launch, every scattered tool in one place.」。
- 按钮写死：「Start free」「Watch demo」。
- 截图写死：左侧五根占位条（第一根 60% 宽），右侧小标题「This week」与六根柱，柱高依次 40%、62%、48%、74%、92%、58%。
- 标题词的首个延迟为 300ms，之后每个词加 70ms，七个词的延迟依次是 300、370、440、510、580、650、720ms。

## 操作和动效

- 入场由根节点上的 `is-in` 类驱动。参与入场的元素预先带一个 `data-s` 属性和 `--d` 毫秒延迟：导航 0ms、徽章 180ms、说明 620ms、按钮 760ms、截图 900ms。
- 通用入场：元素从透明度 0、下移 14px 走到不透明且归位，透明度过渡 0.55s cubic-bezier(.22,1,.36,1)，位移过渡 0.7s cubic-bezier(.2,.8,.2,1)。导航是特例，从上移 12px 落到原位。
- 标题逐词入场：每个词的内层 span 初始位移 105%（完全藏在裁切框下方），过渡 0.75s cubic-bezier(.2,.8,.2,1)，延迟按各自 `--d` 递增，于是词是一个一个从下往上顶出来的。
- 截图入场：从透明度 0、下移 46px、绕 X 轴倾斜 24deg、缩放 0.94 且模糊 6px 走到完全清晰，透明度过渡 0.6s、位移过渡 1.1s cubic-bezier(.2,.8,.2,1)、模糊过渡 0.9s。
- 重播：先加一个 `is-snap` 类把过渡彻底关掉、同时撤掉 `is-in`，强制读取一次布局以立刻回到初始态，再摘掉 `is-snap`，在下一帧补回 `is-in`，整段入场从头再来一遍。
- 首次进入视口（IntersectionObserver 阈值 0.35）自动播放一次入场，观察器随即断开，不重复触发；浏览器不支持 IntersectionObserver 时直接进入终态。
- `prefers-reduced-motion` 下：所有入场过渡关闭，元素直接出现在最终位置——文字按行完整排好、截图不再带倾斜与模糊、逐词的推上效果变成直接显示；重播按钮仍然可用，点击后状态不变。
- 无障碍：标题是一级标题并带 aria-label「Finish your team's work in one place」，朗读时不会逐词拆读；导航标志方块、徽章圆点等装饰元素 aria-hidden；「Replay」是原生按钮且有可见焦点框。

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| height | number | 340 | 场景高度，逻辑像素；窄容器整景按比例缩小 |
| reducedMotion | boolean | 跟随系统 | 覆盖系统的减少动态偏好 |

## 独立实现与六框架交付

- 仅凭本文从零生成可运行的实现。尺寸、颜色、文案、图形和运动算法均以上述文字为准；所有装饰用 CSS 与内联 SVG 绘制，不加载远程图片、字体、视频或素材。
- 当前交付重点为 React，组件名称 HeroStaggerIntro。从零创建四个文件：HeroStaggerIntro.tsx、HeroStaggerIntroEngine.js、motion-runtime.ts、HeroStaggerIntroEngine.d.ts；分别实现框架入口、完整交互核心、实例生命周期和类型声明。文件名是需要生成的产物，不假定接收者已经拥有任何文件。
- 同时提供 React、Vue、Svelte、Preact、Vanilla 原生生命周期入口，共享框架无关核心。DOM 仅在挂载后访问，支持同页多实例；更新时保持状态，销毁时清理动画、计时器、观察器及监听器。不要用 iframe 代替组件实现。
- 依赖安装说明：npm install react react-dom。若使用依赖，只使用其公开 API；组件的布局、样式、图形和算法必须在本次生成的文件中完整实现，不引用现成效果组件。
- 实现 options.height 以调整场景高度，options.reducedMotion 覆盖系统偏好；减少动态效果仍保留完整的首屏布局与全部文案。
- 给出每个文件的完整内容、安装和运行步骤、以下使用示例所需的全部实现。不得留省略号、待补素材或"自行补齐核心"的占位。
- 验收：375 / 768 / 1440px 无横向溢出；入场次序为菜单 → 徽章 → 标题逐词 → 说明 → 按钮 → 截图；重播可重复触发；浅色深色两套令牌正确；多实例互不干扰，卸载后停止所有任务。

## 使用示例

```tsx
import { HeroStaggerIntro } from "./HeroStaggerIntro";

export default function App() {
  return <HeroStaggerIntro />;
}
```
