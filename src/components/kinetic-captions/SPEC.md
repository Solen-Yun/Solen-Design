# 动态字幕 — KineticCaptions

制作「动态字幕」场景：一张 340×340 的卡片，上半部是一块深夜渐变的「视频画面」——左上角圆形角标写「Design retro · 02」，中下部一个紫色人形剪影，左下角逐词弹出的白色大字幕，关键词以 #FFE066 金黄强调并放大旋转出场；下半部是迷你播放条：圆形播放/暂停按钮、26 根随说话起伏的声浪条、重播按钮。按下播放，字幕按预排节拍逐词蹦出（首词延迟 0.3s，普通词每 0.36s 一个，强调词多 0.12s 停顿与 0.22s 占位，另带 0–0.08s 随机抖动），人形剪影同步轻轻晃动，声浪条大起大伏；三句播完自动停下，重播按钮回到开头重新播放。

## 布局与材质

- 场景 340×340px，圆角 28px，内边距 12px，纵向 flex，溢出裁切；底色取表面色令牌（浅 #FFFFFF/深 #13141C）；外圈 1px 线色描边加 0 30px 60px -36px 强阴影。场景根是无底色包装层，视觉卡片放在其内部的绝对填充层上。
- 「画面」是整个上半部的原生 button（flex:1、圆角 18px、溢出裁切、cursor pointer、文字左对齐），背景三层叠加：radial-gradient(60% 70% at 30% 30%, #3A2F7A, transparent 70%) + radial-gradient(60% 60% at 80% 80%, #0E6B63, transparent 70%) 压在 #0B0C12 上；aria-label「Video, tap to play or pause」，点击等效播放/暂停。
- 角标「Design retro · 02」：绝对定位 left 12px、top 12px，padding 5px 9px、圆角 999px、底 rgba(0,0,0,.35)、11px/字重 700、rgba(255,255,255,.8)。
- 人形剪影：绝对定位水平居中（left 50%、margin-left -75px）、bottom -30px，150×170px、圆角 75px 75px 30px 30px（半圆头、圆角底座），渐变 linear-gradient(#5B4FA8, #2E2867)、不透明度 .9；头部是 ::before 画的 62×62px 圆（left 44px、top -56px），渐变 linear-gradient(#7C6FD0, #4A3F96)。播放中剪影跑 u375-talk 0.5s ease-in-out 无限往复（位移 -2px、旋转 0.6deg）模拟说话；剪影 aria-hidden。
- 字幕容器：绝对定位 left/right 12px、bottom 16px、最小高 70px，内容贴底居中。每句是一个绝对贴底的 span 行：flex 换行居中、基线对齐、词距 7px 行距 2px，字号 23px/行高 1.15、字重 900、字距 -.03em、白色，带 0 2px 0 rgba(0,0,0,.45) 与 0 0 18px rgba(0,0,0,.4) 双重阴影。
- 词的进场：初始 opacity 0、translateY(12px) scale(.6)；点亮后 0.35s cubic-bezier(.3,1.6,.5,1) 弹到位（透明度 0.15s）。强调词（.em）色 #FFE066，点亮时播放 0.6s cubic-bezier(.3,1.4,.5,1) 的 pop 动画：从 scale(.4) 白色冲到 45% 处的 scale(1.45) rotate(-3deg) 再落回常态，落定后保持金黄色。
- 换句：旧句加 .out——translateY(-26px) rotateX(70deg)、透明度 0（过渡 transform .45s cubic-bezier(.6,0,.3,1)、opacity .35s），500ms 后从 DOM 移除；新句同时建好，词等待各自节拍点亮。
- 播放条：flex 垂直居中、间距 10px、padding 10px 4px 2px。播放/暂停按钮 40×40 圆形、墨色底、图标取页面底色（17×17 填充式播放三角/双暂停条），按下 scale(.9)，transform 过渡 0.35s 弹性曲线；重播按钮同尺寸、次级表面底墨色描边图标（2.2px 圆头回转箭头）。图标切换由 is-play 类控制；aria-label 在「Play」「Pause」间切换，重播为「From the start」。
- 声浪条：flex:1、高 30px、26 根竖条、间距 3px，每根 flex:1、高 calc(var(--v)×100%)、最小高 3px、圆角 3px、accent 色、不透明度 .75、高度过渡 0.09s linear；静默时 --v = 0.08。
- 场景令牌浅色/深色两套（另定义 --ux-page 与弹性曲线令牌 cubic-bezier(.34,1.56,.64,1)）。组件固定 340px 逻辑宽度：容器更窄时整景按 min(1, 容器宽/340) 等比缩放。

## 数据

- 写死三句台词（星号包裹的为强调词）：「Today we fixed *just one* button」「And sign-ups went *up twice*」「Small motion makes *a big difference*」。
- 节拍参数写死：首句 0.3s 起，词间隔基准 0.36s，强调词额外 +0.12s 前置停顿与 +0.22s 占位，每词叠加 0–0.08s 随机抖动；句与句的起始间隔 1.0s，句末词结束后 0.6s 句子离场。声浪条 26 根。无外部数据来源。

## 操作和动效

- 播放/暂停：点击画面或底部播放按钮切换；播放时 rAF 推进时间轴（帧步长 clamp 0.05s），到点的词逐个点亮，强调词播 pop 动画；人形剪影开始晃动，声浪条每 90ms 刷新一次高度——正在说话（句窗口内）时 --v = 0.25 + random×0.75×sin((k+2)/28×π)（中间高两端低），静默段回落到 0.08 + random×0.06。
- 三句全部播完：时间轴归零、自动暂停、字幕清空，回到初始待机态（不自动循环）；再次按下播放从头开始。
- 重播按钮：时间轴归零、清空字幕并立即开始播放。
- `prefers-reduced-motion: reduce`（或 options.reducedMotion）下：词不再逐个蹦出——句子一出现整句同时点亮；pop、剪影晃动、声浪过渡全部关闭；播放/暂停/重播逻辑照常，声浪条高度直接跳变。
- 无障碍：画面按钮与两个控制钮均为原生 button，aria-label 完整；字幕容器 aria-live="off"（避免朗读器被逐词打断）；角标、剪影、声浪、图标 aria-hidden。
- options.height 调整场景高度（默认 340）；options.reducedMotion 覆盖系统偏好。支持同页多实例，更新选项不重挂载；卸载时停止 rAF 循环、清掉计时器并移除监听。

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| height | number | 340 | 场景高度，逻辑像素；窄容器整景按比例缩小 |
| reducedMotion | boolean | 跟随系统 | 覆盖系统的减少动态偏好 |

## 独立实现与六框架交付

- 仅凭本文从零生成可运行的实现。尺寸、颜色、台词、节拍与运动参数均以上述文字为准；画面、剪影、声浪全部用 DOM 与 CSS 绘制，不加载远程图片、字体、视频或素材。
- 当前交付重点为 React，组件名称 KineticCaptions。从零创建四个文件：KineticCaptions.tsx、KineticCaptionsEngine.js、motion-runtime.ts、KineticCaptionsEngine.d.ts；分别实现框架入口、完整交互核心、实例生命周期和类型声明。文件名是需要生成的产物，不假定接收者已经拥有任何文件。
- 同时提供 React、Vue、Svelte、Solid、Preact、Vanilla 原生生命周期入口，共享框架无关核心。DOM 仅在挂载后访问，支持同页多实例；更新时保持状态，销毁时清理动画、计时器、观察器及监听器。不要用 iframe 代替组件实现。
- 依赖安装说明：npm install react react-dom。若使用依赖，只使用其公开 API；组件的布局、样式、图形和算法必须在本次生成的文件中完整实现，不引用现成效果组件。
- 实现 options.height 以调整场景高度，options.reducedMotion 覆盖系统偏好；减少动态下整句直显且控制逻辑完整。
- 给出每个文件的完整内容、安装和运行步骤、以下使用示例所需的全部实现。不得留省略号、待补素材或"自行补齐核心"的占位。
- 验收：375 / 768 / 1440px 无横向溢出；逐词节拍、强调 pop、换句退场、播完自停、重播均正确；减少动态整句直显；多实例互不干扰，卸载后停止所有任务。

## 使用示例

```tsx
import { KineticCaptions } from "./KineticCaptions";

export default function App() {
  return <KineticCaptions />;
}
```
