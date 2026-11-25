# Beta 候位 — WaitlistPosition

制作「Beta 候位」卡片：一张 340×340 的双面候位卡。正面是 Beta waitlist 报名页——琥珀色星光图标、一句话说明、Email 输入框加 Join 按钮；提交后按钮转 650ms 的加载圈，正面淡出上移、候位视图从下方滑入：巨大 tabular-nums 排名数字从 0 快速滚到 1,284，下方一条 18 个刻度点的队伍标出自己的位置，底部是 Copy link 与 Invite a friend 两个按钮；每点一次邀请，排名数字滚降 100 并浮出一枚绿色「−100」，队伍中的琥珀色圆点同步向队首移动。

## 布局与材质

- 场景 340×340px，圆角 30px，溢出裁切。底色为表面色叠加顶部琥珀光晕：radial-gradient(80% 60% at 50% 0%, color-mix(in srgb, #F59E0B 14%, transparent), transparent 70%) 叠 var(--ux-surface)；外圈 1px 线色描边加 0 30px 60px -36px 强阴影；文字色取墨色令牌。场景根是无底色包装层，视觉卡片放在其内部的绝对填充层上。
- 两个视图各绝对填充，内边距 30px 24px，纵向 flex。切换动画：正面 is-in 后 opacity 0、translateY(-14px) scale(.97)、pointer-events none（过渡 opacity .35s、transform .5s cubic-bezier(.3,1.2,.5,1)）；候位视图默认 opacity 0、translateY(16px)，is-in 后回到原位且 transition-delay .15s。两视图均文字居中。
- 正面：图标片 52×52px、圆角 16px、渐变 linear-gradient(135deg, #FBBF24, #F97316)、阴影 0 14px 26px -12px #F97316，内含 26×26 白色五角星 SVG；标题「Beta waitlist」20px/字重 900、字距 -.035em、上边距 14px；说明「Invites go out in the order people join」11px/650、次级墨色、上边距 5px。正面整体垂直居中，padding-bottom 36px 平衡视觉。
- 表单条：flex 间距 6px、上边距 22px、内边距 5px、圆角 15px、背景 surface-2、内嵌 1px 线色描边；focus-within 时描边变 2px #F59E0B。输入框高 38px、左右内边距 10px、字号 12.5px/字重 700，placeholder「Email address」600 次级墨色；Join 按钮最小宽 84px、高 38px、圆角 11px、墨色底表面色字、12px/850，禁用时 opacity .3、cursor not-allowed；busy 态按钮文字隐藏，显示 15×15px 加载圈（2px 边框，顶部一段取表面色实色，.7s linear 无限旋转）。
- 候位视图：「Your position」小标 11px/800 次级墨色，margin-top auto 推到底部按钮之上；排名行 46px/字重 900、字距 -.04em、tabular-nums，「#」前缀 24px、色 #F59E0B；数字用里程表结构——每位数一个高 1.1em、溢出裁切的数位格，格内叠 0–9 纵列，translateY(-数字 × 1.1em)，过渡 transform .55s cubic-bezier(.3,1.2,.5,1)，千分位逗号按字符直接渲染。
- 队伍条：高 16px、上边距 16px、左右边距 6px；18 个 6×6px 刻度点（surface-3 色、top 5px、left 均布 i/17×100%）；自己的位置是一枚 16×16px #F59E0B 圆点，带 0 0 0 4px 的 25% 琥珀光环，left 过渡 .6s cubic-bezier(.3,1.3,.5,1)，位置公式 pos/1284×82+12%、下限 4%、上限 100%。
- 说明行「Move up 100 spots for every friend who joins」10.5px/650 次级墨色、上边距 12px；底部按钮排 flex 间距 6px、margin-top auto：「Copy link」surface-2 底墨色字带 1px 线色内描边，「Invite a friend」墨色底表面色字；两钮各 flex:1、高 42px、圆角 12px、12px/850。
- 「−100」浮动角标：绝对定位在排名行右上（right 30px、top 6px），14px/字重 900、#10B981，动画 1s ease-out forwards 上浮 -24px 并淡出，1s 后移除。
- 场景令牌浅色/深色两套（--ux-surface 浅 #FFFFFF/深 #13141C、墨色 #16151B/#F4F0E8、线色 rgba(22,21,27,.09)/rgba(255,255,255,.08)、阴影 rgba(40,30,80,.3)/rgba(0,0,0,.72)），`prefers-color-scheme: dark` 自动切换。不声明字体栈，继承宿主页面。组件固定 340px 逻辑宽度：容器更窄时整景按 min(1, 容器宽/340) 等比缩放。

## 数据

- 写死初始排名 START = 1284；每邀请一位前进 100 名；队伍刻度 18 个；邀请链接写死为 example.com 域的 /r/minji 路径。无其他外部数据。

## 操作和动效

- 输入框实时校验邮箱格式（正则 ^[^\s@]+@[^\s@]+\.[^\s@]{2,}$），合法时 Join 才解禁；输入框内按 Enter 等价点击 Join。
- 点击 Join：按钮进入 busy 态显示加载圈 650ms（减少动态下为 0ms），随后正面退场、候位视图进场，排名数字从 0 以 rAF 驱动的 900ms 计数动画升到 1284（缓动 1−(1−k)³ 的先快后慢），数位格逐位滚动到位；减少动态下直接绘制最终数字。
- 点击 Invite a friend：排名 ≤ 100 时忽略；否则排名减 100，数位格滚降，位置圆点左移，「−100」角标浮出上飘 1s（减少动态下不生成角标）；可连续点击累计。
- 点击 Copy link：把邀请链接写入剪贴板（navigator.clipboard，失败静默），无任何 UI 反馈。
- 无障碍：排名数字 aria-live="polite"；输入框 aria-label="Email"；队伍条与图标 aria-hidden；切换后候位视图 aria-hidden 置 false、正面置 true；按钮 focus-visible 外圈 2px #F59E0B、偏移 2px。
- `prefers-reduced-motion: reduce`（或 options.reducedMotion）下：视图切换、数位滚动、位置圆点移动的过渡全部关闭，加载圈不旋转，「−100」角标不显示，排名直接以最终值呈现。
- options.height 调整场景高度（默认 340）；options.reducedMotion 覆盖系统偏好。支持同页多实例，更新选项不重挂载；卸载时释放帧回调、计时器与监听器。

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| height | number | 340 | 场景高度，逻辑像素；窄容器整景按比例缩小 |
| reducedMotion | boolean | 跟随系统 | 覆盖系统的减少动态偏好 |

## 独立实现与六框架交付

- 仅凭本文从零生成可运行的实现。尺寸、颜色、文案、图形和运动参数均以上述文字为准；界面全部用 DOM 与 CSS 绘制，不加载远程图片、字体、视频或素材。
- 当前交付重点为 React，组件名称 WaitlistPosition。从零创建四个文件：WaitlistPosition.tsx、WaitlistPositionEngine.js、motion-runtime.ts、WaitlistPositionEngine.d.ts；分别实现框架入口、完整交互核心、实例生命周期和类型声明。文件名是需要生成的产物，不假定接收者已经拥有任何文件。
- 同时提供 React、Vue、Svelte、Solid、Preact、Vanilla 原生生命周期入口，共享框架无关核心。DOM 仅在挂载后访问，支持同页多实例；更新时保持状态，销毁时清理动画、计时器、观察器及监听器。不要用 iframe 代替组件实现。
- 依赖安装说明：npm install react react-dom。若使用依赖，只使用其公开 API；组件的布局、样式、图形和算法必须在本次生成的文件中完整实现，不引用现成效果组件。
- 实现 options.height 以调整场景高度，options.reducedMotion 覆盖系统偏好；减少动态下仍保留报名、计数与邀请的完整状态。
- 给出每个文件的完整内容、安装和运行步骤、以下使用示例所需的全部实现。不得留省略号、待补素材或"自行补齐核心"的占位。
- 验收：375 / 768 / 1440px 无横向溢出；非法邮箱禁用 Join、合法提交翻面、连续邀请计数与圆点位置正确；浅色深色两套令牌正确；多实例互不干扰，卸载后停止所有任务。

## 使用示例

```tsx
import { WaitlistPosition } from "./WaitlistPosition";

export default function App() {
  return <WaitlistPosition />;
}
```
