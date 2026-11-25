# 像素溶解轮播 — PixelDissolveSlider

制作「像素溶解轮播」：一张 340×330 的照片轮播卡。上半部是一个圆角照片框，画面由四张纯 CSS 渐变模拟的照片轮流呈现；切到下一张时，新图先被切成 12×9 的网格块，每个小块按所选次序在自己的时刻从 scale(0) 弹入、露出新图对应的那一小块，全部铺满后整框换成新图。照片框左下角有一枚玻璃质感的标题胶囊，底部一行是 Prev/Next 两个圆形箭头按钮和 Wave/Ring/Random 三段式次序选择器。

## 布局与材质

- 340×330px 场景卡，内边距 14px，圆角 28px，溢出裁切。底色为表面色（浅色 #FFFFFF、深色 #13141C），外圈 1px 线色描边（浅色 rgba(22,21,27,.09)、深色 rgba(255,255,255,.08)），下方 0 30px 60px -36px 强阴影（浅色 rgba(40,30,80,.3)、深色 rgba(0,0,0,.72)）。场景固定 340px 逻辑宽，窄容器时整景按 transform:scale 等比缩小，不换行不溢出。
- 照片框占卡片剩余全部高度（312×252px），圆角 18px，溢出裁切，背景直接是当前照片的 CSS 渐变。标题胶囊绝对定位在框内左 14px、下 12px：内边距 6px 10px、圆角 999px、背景 rgba(0,0,0,.35)、白字 12.5px/字重 750、backdrop-filter blur(6px)。
- 底部一行与照片框间距 12px，水平排列、垂直居中、项间距 8px。Prev/Next 为 38×38px 圆形按钮，无边框，背景次级表面色（浅色 #F5F3EF、深色 #1A1B25），内部 16×16px 线性箭头（stroke 宽 2.2、圆头圆角、颜色随文字色：浅色 #16151B、深色 #F4F0E8），Prev 箭头朝左、Next 朝右。
- 次序选择器靠右排（margin-left:auto）：外框内边距 3px、圆角 11px、背景次级表面色，内部三个按钮项间距 3px，各高 30px、内边距 0 10px、圆角 8px、字号 12px/字重 750；未选中文字为三级墨色（浅色 #8E8A97、深色 rgba(244,240,232,.42)），选中项背景回到表面色、文字主墨色（浅色 #16151B、深色 #F4F0E8）并加 1px 线色描边。三档文案依次 Wave、Ring、Random。
- 场景令牌浅色深色两套（light-dark() 随 prefers-color-scheme 切换）：浅色表面 #FFFFFF、次级表面 #F5F3EF、墨色 #16151B；深色表面 #13141C、次级表面 #1A1B25、墨色 #F4F0E8。组件未声明字体栈，文字继承页面字体，无全局字距调整。

## 数据

- 写死 4 张照片，标题与渐变（背景 Image 逐字如下）为：
  1. Dawn lake：radial-gradient(30% 22% at 70% 35%,#FFF3BF,transparent 70%) 叠 linear-gradient(#A5D8FF 0,#FFD8A8 45%,#4DABF7 46%,#1864AB 100%)。
  2. Desert afternoon：radial-gradient(22% 18% at 25% 30%,#FFF9DB,transparent 70%) 叠 linear-gradient(#FFA94D,#F76707 50%,#E8590C 51%,#C2410C 75%,#9A3412)。
  3. Violet night：两粒 1.5px×1.5px 白色星点（radial-gradient(1.5px 1.5px at 30% 30%,#fff,transparent) 与 at 70% 20%）叠 radial-gradient(40% 30% at 50% 100%,#E64980,transparent 70%) 再叠 linear-gradient(#1B1035,#5F3DC4 70%,#9C36B5)。
  4. Green forest：radial-gradient(50% 30% at 50% 10%,#D3F9D8,transparent 70%) 叠 linear-gradient(#69DB7C,#2F9E44 55%,#1B4332)。
- 网格固定 12 列 × 9 行 = 108 块。每块以新图为背景图、background-size 1200% 900%、background-position 取 (x/11×100%, y/8×100%)，108 块恰好无缝拼出新图整幅。初始显示第 0 张 Dawn lake，标题胶囊与 aria-label 同步为其标题。除照片外无其他写死数据。

## 操作和动效

- 点击 Next/Prev 切到 当前索引 ±1（对 4 取模循环）。若上一次溶解尚未结束（busy 锁），点击被忽略。切换时新图先作为变量下发给全部 108 块，旧图仍留在照片框背景上；每块写入自己的 animation-delay 后整体播放 0.38s cubic-bezier(.3,1.5,.5,1) 的弹入关键帧：0% scale(0)、圆角 50%；70% scale(1.12)；100% scale(1.02)、圆角 0。
- 三种次序决定每块延时（均另加随机抖动）：Wave 为 x×45ms + y×12ms + 随机 0–60ms，自左上向右下斜扫；Ring 为 √((x−5.5)² + ((y−4)×1.2)²)×70ms + 随机 0–40ms，自中心向外扩散；Random 为随机 0–650ms。全部结束后（计时 1080ms；减少动态 50ms）照片框背景一次性换成新图、标题同步更新、网格块撤下 .go 复位回 scale(0) 隐藏。
- 点击次序按钮即时切换模式并同步 aria-pressed，下一次切图立即按新次序错峰。
- 无障碍：照片框 role="img"、aria-label 为当前照片标题，网格与标题胶囊 aria-hidden；Prev/Next 为原生按钮，aria-label 分别为 "Previous photo"/"Next photo"，可获得焦点、Enter/Space 触发；次序组 role="group"、aria-label "Spread pattern"，成员为原生按钮并以 aria-pressed 表达选中。
- prefers-reduced-motion 下组件根标记 data-reduced-motion，全部 animation/transition 时长归零，弹入动画直出终态；完成判定从 1080ms 压缩到 50ms，表现为直接换图。页面隐藏期间动画帧挂起，恢复可见后继续；options.reducedMotion 可覆盖系统偏好。
- 通过 options 传入以上两项；更新 options 不重挂载组件，支持同页多实例互不干扰，卸载时清理计时器与事件监听。

## Props

| Prop | Type | Default | Description |
| height | number | 330 | 场景高度，逻辑像素；窄容器整景按比例缩小 |
| reducedMotion | boolean | 跟随系统 | 覆盖系统的减少动态偏好 |

## 独立实现与六框架交付

- 仅凭本文从零生成可运行的实现。尺寸、颜色、文案、渐变和运动参数均以上述文字为准；四张照片全部用 CSS 渐变绘制，不加载远程图片、字体、视频或素材。
- 当前交付重点为 React，组件名称 PixelDissolveSlider。从零创建四个文件：PixelDissolveSlider.tsx、PixelDissolveSliderEngine.js、motion-runtime.ts、PixelDissolveSliderEngine.d.ts；分别实现框架入口、完整交互核心、实例生命周期和类型声明。文件名是需要生成的产物，不假定接收者已经拥有任何文件。
- 同时提供 React、Vue、Svelte、Solid、Preact、Vanilla 原生生命周期入口，共享框架无关核心。DOM 仅在挂载后访问，支持同页多实例；更新时保持状态，销毁时清理动画、计时器、观察器及监听器。不要用 iframe 代替组件实现。
- 依赖安装说明：npm install react react-dom。若使用依赖，只使用其公开 API；组件的布局、样式、图形和算法必须在本次生成的文件中完整实现，不引用现成效果组件。
- 实现 options.height 以调整场景高度，options.reducedMotion 覆盖系统偏好；减少动态下仍保证换图结果正确。
- 给出每个文件的完整内容、安装和运行步骤、以下使用示例所需的全部实现。不得留省略号、待补素材或"自行补齐核心"的占位。
- 验收：375 / 768 / 1440px 无横向溢出；Next/Prev 对 4 取模循环正确、busy 期间连点不叠帧；Wave/Ring/Random 三种错峰次序肉眼可辨；浅色深色两套令牌正确；多实例互不干扰，卸载后停止所有任务。

## 使用示例

```tsx
import { PixelDissolveSlider } from "./PixelDissolveSlider";

export default function App() {
  return <PixelDissolveSlider />;
}
```
