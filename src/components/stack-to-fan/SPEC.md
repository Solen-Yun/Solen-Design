# 照片堆展开 — StackToFan

一张 340×330 的拍立得照片堆场景：六张白边照片叠在画面正中，最上面一张略微露出边角，各自带一点随机的倾斜。指针移到照片堆上，整堆就顺势扇形散开一点；点击任意一张，六张照片飞散成 3 列 × 2 行的整齐网格；再点网格里的某一张，其余照片收回成一堆，被点的那张落到最上层并接管焦点。

## 布局与材质

- 场景卡 340×330px，圆角 28px，overflow 裁切，底色 var(--ux-surface-2)，外圈 `box-shadow: 0 0 0 1px var(--ux-line), 0 30px 60px -36px var(--ux-shadow-strong)`。
- 场景令牌分浅色与深色两套（`light-dark()`，由宿主 color-scheme 决定）：浅色 surface #FFFFFF、surface-2 #F5F3EF、ink #16151B、ink-2 #57535F、ink-3 #8E8A97、line rgba(22,21,27,.09)、accent #6A57F2、shadow-strong rgba(40,30,80,.3)；深色 surface #13141C、surface-2 #1A1B25、ink #F4F0E8、ink-2 rgba(244,240,232,.68)、ink-3 rgba(244,240,232,.42)、line rgba(255,255,255,.08)、accent #B7A4FF、shadow-strong rgba(0,0,0,.72)。
- 六张照片各是一个原生 `<button type="button">`：absolute、left 50% top 50%、宽 96px、高 112px、`margin: -56px 0 0 -48px`（以中心对齐）、无边框、内边距 7px 7px 24px、圆角 6px、底色 #fff、`box-shadow: 0 10px 20px -10px rgba(0,0,0,.45), 0 0 0 1px rgba(0,0,0,.05)`，只对 transform 做过渡：`transition: transform .7s cubic-bezier(.3,1.2,.4,1)`，过渡延迟写在 `--dl` 变量上。
- 每张照片内部：照片区是一个 `<i>`，铺满内容盒、圆角 2px，底色由 `--bg` 变量给定的渐变；底部标注是一个 `<span>`，absolute、left/right 0、bottom 5px、居中、字体 600 10.5px/1 的 ui-rounded, -apple-system, sans-serif 栈、色 #555。
- 照片获得焦点时 `outline: 2px solid var(--ux-accent)`、offset 3px。

## 数据

- 六张照片写死「标注 + 照片渐变」：
  1. Sea — `linear-gradient(#74C0FC, #1C7ED6)`
  2. Alley — `linear-gradient(135deg, #FFD8A8, #E8590C)`
  3. Sunset — `linear-gradient(#FFD43B, #F76707 55%, #5F3DC4)`
  4. Forest path — `linear-gradient(#B2F2BB, #2F9E44)`
  5. Snow — `linear-gradient(#F1F3F5, #ADB5BD)`
  6. Flowers — `radial-gradient(circle at 40% 40%, #FFDEEB, #E64980)`
- 堆叠顺序写死为初始数组 [0,1,2,3,4,5]，数组末位是最上层（z-index 最大）。每张照片另有一个随机倾角，生成时在 ±8° 之间随机取一个；重新收堆时所有倾角重新随机，被选中那张的倾角收紧到 ±3°。
- 无其他写死数据；照片内容全部用 CSS 渐变模拟，不加载任何位图。

## 操作和动效

- 堆叠态（未展开）：每张照片按它在顺序数组中的下标 z（0～5）取 k = z - 5（-5～0），位移为 translate(k × 1.5px, k × -1.5px)、旋转为各自的随机倾角；z-index = z + 1，所以最后一张压在最上面。只有最上面那张可被 Tab 聚焦（其余 tabIndex 设为 -1），其 aria-label 为「Photo stack, tap to spread」。逐张的过渡延迟为 (5 - z) × 30ms，靠上的先动、下面依次跟上，形成"抽出"的层次感。
- 悬停展开（指针进入任意一张照片）：整堆切换为扇形——位移放大到 translate(k × 16px, k × -3px)，旋转改成 k × 7° + 2°，于是六张依次向右上方错开并各自歪一点；指针离开后恢复原来的紧凑堆叠与随机倾角。悬停只影响 transform，过渡仍是 0.7s cubic-bezier(.3,1.2,.4,1)。
- 点击展开：任意一张被点击即进入网格态——所有照片 z-index 统一为 1（顺序由位置决定），按 z 取列 col = z % 3、行 row = floor(z / 3)，位移为 translate((col - 1) × 104px, (row - 0.5) × 124px)、旋转 0°；即三列横排、两行纵排，整体以场景中心为基准展开成 3 + 3 的网格。过渡延迟为 z × 40ms，六张依次飞出。网格态下每张照片都可 Tab 聚焦，aria-label 变为「<标注>, tap to gather with this on top」。
- 网格态点击某一张：把这张照片移到顺序数组末尾（即成为堆叠的最上层），重新随机所有倾角（被点的那张倾角收窄到 ±3°），退出网格态收回成堆；收堆后焦点落到被选中的那张照片上（`focus({ preventScroll: true })`），保证键盘用户不会丢失位置。被选中的照片只是落到最上层，不额外放大。
- 无障碍：六张照片都是原生按钮，可键盘聚焦与触发；堆叠态只用最上面一张承接 Tab，进入网格态后全部可聚焦；焦点圈 2px accent + 3px offset。
- `prefers-reduced-motion`（或 options.reducedMotion=true）下：运行时把过渡时长归零，堆叠、扇形、网格之间的切换改为瞬时完成，位置与最终状态完全一致。

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| height | number | 330 | 场景高度，逻辑像素；窄容器整景按比例缩小 |
| reducedMotion | boolean | 跟随系统 | 覆盖系统的减少动态偏好 |

## 独立实现与六框架交付

- 仅凭本文从零生成可运行的实现。尺寸、颜色、文案、图形和运动算法均以上述文字为准；照片用 DOM 与 CSS 渐变模拟，界面不加载远程图片、字体、视频或素材。
- 当前交付重点为 React，组件名称 StackToFan。从零创建四个文件：StackToFan.tsx、StackToFanEngine.js、motion-runtime.ts、StackToFanEngine.d.ts；分别实现框架入口、完整交互核心、实例生命周期和类型声明。文件名是需要生成的产物，不假定接收者已经拥有任何文件。
- 同时提供 React、Vue、Svelte、Preact、Vanilla 原生生命周期入口，共享框架无关核心。DOM 仅在挂载后访问，支持同页多实例；更新时保持状态，销毁时清理动画、计时器、观察器及监听器。不要用 iframe 代替组件实现。
- 依赖安装说明：npm install react react-dom。若使用依赖，只使用其公开 API；组件的布局、样式、图形和算法必须在本次生成的文件中完整实现，不引用现成效果组件。
- 实现 options.height 以调整场景高度，options.reducedMotion 覆盖系统偏好；减少动态时各状态之间直接切换。
- 给出每个文件的完整内容、安装和运行步骤、以下使用示例所需的全部实现。不得留省略号、待补素材或"自行补齐核心"的占位。
- 验收：375 / 768 / 1440px 无横向溢出；悬停出扇形、离开回堆；点击展开为 3 + 3 网格；网格中点击后照片收堆并落到最上层、焦点跟随；键盘可聚焦与触发；多实例互不干扰，卸载后停止所有任务。

## 使用示例

```tsx
import { StackToFan } from "./StackToFan";

export default function App() {
  return <StackToFan />;
}
```
