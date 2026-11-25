# 波浪路径文字 — TextOnWavePath

一张 340×320 的小卡：上半部是一段 150px 高的海面，里面有一条不断起伏的蓝色波浪线，一行文字用 SVG textPath 贴着这条线排布并持续向左漂移；波浪线下方有一片同色系的浅蓝填充，一直铺到海面底部。中间是一个文本输入框，默认写着一句 `drifting along slowly today`，改字立刻生效。底部是两行控制：第一行「Height」滑杆调波峰高度（0 到 40），第二行「Speed」滑杆调文字流动速度（0 到 120）。

## 布局与材质

- 场景根：宽 340px、高 320px、圆角 28px、overflow hidden、position relative，纵向 flex，内边距 16px；底色 `var(--ux-surface)`；外描边 `0 0 0 1px var(--ux-line)`，投影 `0 30px 60px -36px var(--ux-shadow-strong)`。
- 场景令牌（`light-dark()` 随 `color-scheme` 切换，浅 / 深两套）：surface `#FFFFFF` / `#13141C`，surface-2 `#F5F3EF` / `#1A1B25`，surface-3 `#EAE7E1` / `#252632`，ink `#16151B` / `#F4F0E8`，ink-2 `#57535F` / `rgba(244,240,232,.68)`，ink-3 `#8E8A97` / `rgba(244,240,232,.42)`，line `rgba(22,21,27,.09)` / `rgba(255,255,255,.08)`，line-2 `rgba(22,21,27,.17)` / `rgba(255,255,255,.16)`，accent `#6A57F2` / `#B7A4FF`，accent-2 `#2F8FE0` / `#7DB4FF`，accent-soft `rgba(106,87,242,.12)` / `rgba(183,164,255,.15)`，accent-ink `#FFFFFF` / `#0B0C12`，mint `#119C72` / `#7EE8C0`，warn `#D6731E` / `#FFB26B`，danger `#D93A55` / `#FF7D8C`，glass `rgba(255,255,255,.58)` / `rgba(255,255,255,.07)`，glass-line `rgba(255,255,255,.85)` / `rgba(255,255,255,.18)`，shadow `rgba(40,30,80,.14)` / `rgba(0,0,0,.45)`，shadow-strong `rgba(40,30,80,.3)` / `rgba(0,0,0,.72)`。
- 海面：position relative、高 150px、左右外边距 -16px（顶到场景两边）、底色 `linear-gradient(180deg, transparent 40%, color-mix(in srgb, var(--ux-accent-2) 10%, transparent))`；内嵌 SVG 绝对定位 inset 0、宽高各 100%、overflow visible，viewBox `0 0 340 150`。
- 波浪线：无填充，描边 `color-mix(in srgb, var(--ux-accent-2) 45%, transparent)`，线宽 1.5，虚线 `3 5`（短划 3px、间隔 5px，让浪线看起来像断续的泡沫）。填充层是同一条曲线向下闭到 y = 150 的多边形，填 `color-mix(in srgb, var(--ux-accent-2) 9%, transparent)`。
- 文字：SVG 内 21px、字重 850、字距 -0.01em，填 `var(--ux-ink)`；文字挂在波浪线的 textPath 上，所以每个字母自然随路径切线倾斜。
- 输入框：宽 100%、高 42px、上外边距 6px、内边距 0 14px、无边框、圆角 13px、底色 `var(--ux-surface-2)`、内描边 `inset 0 0 0 1px var(--ux-line)`、14.5px、字重 650、色 `var(--ux-ink)`；聚焦时内描边换成 2px `var(--ux-accent)`。
- 控制区：两列 grid（标签列 auto、输入列 1fr），行间距 8px、列间距 12px、上外边距 12px，12px、字重 700、色 `var(--ux-ink-3)`；第一行标签 `Height`，第二行标签 `Speed`；两个 range 输入的 `accent-color` 为 `var(--ux-accent-2)`。
- 场景不引入自定义字体，字体栈继承宿主页面。
- 响应式：固定 340×320，没有布局断点；容器宽度不足 340px 时整景按 `min(1, 容器宽 / 340)` 等比缩小，缩放锚点在左上角，占位高度同步收缩。

## 数据

- 输入框默认文字 `drifting along slowly today`，最大长度 36 个字符；留空时用一个空格占位。
- 文字被复制四份并各接一个「  ·  」分隔（分隔符为两个空格加圆点加两个空格），拼成一条足够长的环形文本，使波浪线上从头到尾都有字。
- Height 滑杆 range 0 到 40，默认 20；Speed 滑杆 range 0 到 120，默认 40。
- 波浪几何写死：61 个采样点，横坐标从 -60 到 420、步长 8；基线 y = 78；纵向由两个正弦叠加——主波幅值为当前波高，副波幅值为当前波高的 0.25 倍、频率更高、方向相反。
- 没有外部数据请求。

## 操作和动效

- 波浪与文字共用一条 requestAnimationFrame 循环。每帧按真实时间差推进相位 `phase += dt × 1.6`（时间差被夹在 0 到 50ms 之间，避免切回标签页时一次跳太远），并让当前波高以 `波高 += (目标波高 - 当前波高) × 0.08` 的方式缓动跟随滑杆，因此拖动 Height 时波峰会平滑地长高或落矮，而不是一帧跳过去。
- 曲线每帧重画：算出 61 个点后拼成 `M` 加 `L` 连接的路径，填充层用同一条路径再接 `L420 150 L-60 150 Z` 闭合。
- 文字沿路径流动：用 `getComputedTextLength()` 量出整条文字长度再除以 4 得到一个循环单元的长度，每帧把偏移量加上 `dt × 速度` 后对循环长度取模，再写进 textPath 的 `startOffset`（取负值），于是文字持续向左漂移且首尾相接、无缝循环。
- 输入框的 `input` 事件只重建文字内容并重置循环单元长度（曲线参数不变）；Height 滑杆改目标波高；Speed 滑杆改流动速度。曲线由两个正弦叠加而成：主波负责大起伏，副波负责让浪线看起来不规则，两者相位相反，因此在波峰处互相抵消、在波谷处互相叠加。
- 键盘：输入框可输入文字；两个 range 滑杆可用方向键微调、PageUp/PageDown 大步长、Home/End 到端点；输入框聚焦时描边变 2px 主色，作为焦点指示。
- 无障碍：输入框带 `aria-label="Text on the wave"`，两个滑杆分别带 `aria-label="Wave height"` 与 `aria-label="Flow speed"`；波浪与文字是纯图形，不作为文本暴露给读屏。
- `prefers-reduced-motion`（或 options.reducedMotion 为 true）：循环只画一帧就停住——波浪保持一条静止曲线，文字不再漂移，Speed 滑杆因此看不出变化；Height 滑杆仍会立即把波高设成目标值并重画这一帧，曲线会更新但不做平滑缓动。

## Props

组件只接受一个 `options` 对象，其内部字段与文档页 API 表一致：

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| height | number | 320 | 场景高度，逻辑像素；窄容器整景按比例缩小 |
| reducedMotion | boolean | 跟随系统 | 覆盖系统的减少动态偏好 |

## 独立实现与六框架交付

- 仅凭本文从零生成可运行的实现。尺寸、颜色、文案、图形和运动算法均以上述文字为准；波浪、文字与填充全部用内联 SVG 路径按帧重绘，输入与滑杆用原生表单控件，不加载远程图片、字体、视频或素材。
- 当前交付重点为 React，组件名称 TextOnWavePath。从零创建四个文件：TextOnWavePath.tsx、TextOnWavePathEngine.js、motion-runtime.ts、TextOnWavePathEngine.d.ts；分别实现框架入口、完整交互核心、实例生命周期和类型声明。文件名是需要生成的产物，不假定接收者已经拥有任何文件。
- 同时提供 React、Vue、Svelte、Solid、Preact、Vanilla 原生生命周期入口，共享框架无关核心。DOM 仅在挂载后访问，支持同页多实例；更新时保持状态，销毁时清理动画、计时器、观察器及监听器。不要用 iframe 代替组件实现。
- 依赖安装说明：npm install react react-dom。若使用依赖，只使用其公开 API；组件的布局、样式、图形和算法必须在本次生成的文件中完整实现，不引用现成效果组件。
- 实现 options.height 以调整场景高度（默认 320），options.reducedMotion 覆盖系统偏好；减少动态效果时仍保留完整的曲线形态与文字内容。
- 给出每个文件的完整内容、安装和运行步骤、以下使用示例所需的全部实现。不得留省略号、待补素材或"自行补齐核心"的占位。
- 验收：375 / 768 / 1440px 无横向溢出；文字沿路径流动且首尾相接；改输入文字立即生效；Height 与 Speed 两个滑杆分别改变波高与流速；多实例互不干扰，卸载后停止所有任务。

## 使用示例

```tsx
import { TextOnWavePath } from "./TextOnWavePath";

export default function App() {
  return <TextOnWavePath />;
}
```
