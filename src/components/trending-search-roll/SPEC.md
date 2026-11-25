# 滚动热搜榜 — TrendingSearchRoll

制作「滚动热搜榜」卡片：一张 340×340 的商店搜索场景。顶部是加粗描边的搜索框，下方一枚「Trending」行内嵌一条 36px 高的单行窗口，每 2 秒向上滚动换到下一条实时热搜，行内带排名数字与 ▲/▼/NEW/– 涨跌标记。点击这行会展开一张完整热搜面板：双列十条带排名的词条按钮，1.3 秒后榜单刷新一次、名次变动的词条闪一下；点面板里的词条会把词「打字」填回搜索框。

## 布局与材质

- 340×340px 场景卡，圆角 30px，溢出裁切。场景根是 340×340 的无底色包装层（水平居中），卡片视觉放在其内部的绝对填充层上——文档演示舞台会剥离场景根的背景，卡片底色必须在嵌套层上才能保留。容器窄于 340px 时整景等比缩小（缩放比 = min(1, 可用宽/340)，上限 1）。
- 场景令牌浅色/深色两套（`prefers-color-scheme: dark` 自动切换）：表面 var(--ux-surface) 浅 #FFFFFF / 深 #13141C；次表面 --ux-surface-2 浅 #F5F3EF / 深 #1A1B25；墨色 --ux-ink 浅 #16151B / 深 #F4F0E8；次级墨 --ux-ink-2 浅 #57535F / 深 rgba(244,240,232,.68)；三级墨 --ux-ink-3 浅 #8E8A97 / 深 rgba(244,240,232,.42)；线色 --ux-line 浅 rgba(22,21,27,.09) / 深 rgba(255,255,255,.08)；accent --ux-accent 浅 #6A57F2 / 深 #B7A4FF；强阴影 --ux-shadow-strong 浅 rgba(40,30,80,.3) / 深 rgba(0,0,0,.72)。卡片底色取 --ux-surface、文字取 --ux-ink，外圈 1px 线色描边加 0 30px 60px -36px 强阴影。不加载远程字体，字体继承宿主页面。
- 搜索框：absolute 左 16px、右 16px、上 20px，高 44px，内边距 0 6px 0 14px，圆角 14px，底色 --ux-surface-2，内描边 inset 0 0 0 1.5px --ux-ink（加粗实线框）；内部放大镜图标（16×16 内联 SVG：circle cx7 cy7 r4.8 加手柄线，stroke-width 1.8、currentColor，色 --ux-ink-2）与 input 之间 gap 8px。input 13px/字重 700，无外框无 outline，placeholder 文字「What are you looking for?」为 --ux-ink-3、字重 600。
- Trending 触发行：absolute 左 16px、右 16px、上 74px，高 36px，内边距 0 10px 0 12px，圆角 12px，无边框无底色，hover 底色变 --ux-surface-2（.2s）；内部依序为「Trending」小标（10px/850、写死色 #E11D48）、单行滚动窗口（flex:1、高 36px、overflow hidden）、一枚 12×12 下折线箭头 SVG（stroke-width 1.8、色 --ux-ink-3，面板展开时 rotate 180°，.3s）。
- 滚动行：高 36px、flex、gap 8px、12.5px/800。排名数字 b 最小宽 18px、居中、字距 -.02em、900、色 --ux-accent、tabular-nums；词条 span 单行省略；涨跌标记 em 最小宽 22px、9.5px/850、tabular-nums、右对齐，四态色：up #E11D48、dn #2563EB、nw #F59E0B、eq --ux-ink-3。
- 展开面板：absolute 左 16px、右 16px、上 116px，收起时 height 0、opacity 0，展开时 height 206px、opacity 1；transition height .45s cubic-bezier(.3,1,.4,1)、opacity .25s。圆角 16px，底色 --ux-surface，描边 0 0 0 1px --ux-line 加投影 0 16px 34px -18px 强阴影。面板头 padding 12px 14px 6px、10px/750、三级墨色：左侧 b「Trending」12px/900 主墨色，右侧时间文字「14:00 update」样式（小时数动态）。列表区高 160px、左右 margin 8px。
- 面板词条按钮：absolute 双列布局，宽 calc(50% - 4px)，第 1–5 名 left 0、第 6–10 名 left 50%，top = (名次减 1 取模 5) × 32px；高 30px、内边距 0 6px、圆角 8px、11.5px/750、gap 7px；位移 transition top/left 各 .55s cubic-bezier(.3,1.2,.5,1)。排名 b 宽 18px、900、字距 -.04em、三级墨色（前 3 名由 JS 内联改为 --ux-accent）；hover 底色 --ux-surface-2。

## 数据

- 写死 12 条搜索词：linen shirt、summer dress、sandals、sunscreen、bucket hat、camping chair、cooling blanket、handheld fan、rattan bag、iced tumbler、rain boots、knit tee。
- 初始排名为数组 [0..9]（第 1–10 条上榜，第 11、12 条不上榜）；初始「上一期排名」prev = [2,0,1,4,3,6,5,11,7,8]（用于计算涨跌）；面板标题时间从「14:00 update」开始。
- 两次预置榜单轮换 NEXT，交替使用：第一次变为 [1,0,2,4,3,5,10,6,7,8]（rain boots 升到第 7，iced tumbler 进榜，knit tee 仍在榜外）；第二次变为 [1,0,4,2,3,10,5,11,6,7]（handheld fan 升至第 4，rain boots 第 6，knit tee 进榜第 8）。
- 涨跌标记按与上一期名次比较计算：未上榜过显示「NEW」（nw 色）；名次相同显示「–」（eq 色）；名次上升显示「▲」加上升位数（up 色）；下降显示「▼」加下降位数（dn 色）。

## 操作和动效

- 单行自动轮换：每 2000ms 把窗口滚到下一条（在当前前 10 名内循环）。旧行加 is-up 上移出窗（translateY(-100%)、opacity 0，transition transform .5s cubic-bezier(.3,1.2,.5,1)、opacity .35s），520ms 后移除；新行先以 is-dn 瞬时置于下方（translateY(100%)、transition:none），强制重排后摘掉类，让它从下方滑入。标签页不可见（IntersectionObserver 追踪）、面板展开、或减少动态时不轮换；计时器用 setTimeout 链驱动。
- 点击 Trending 触发行：展开/收起面板。展开时 aria-expanded 变 true、aria-label 变「Hide trending list」（收起反之「Show trending list」），箭头旋转；布局落位后 1300ms 触发一次榜单刷新（减少动态时立即），刷新把当前排名存为上一期、套用下一组 NEXT 榜、小时数加一（23 点后回 0 点），名次有变化的词条重放 is-fl 闪烁动画（0.9s ease，30% 处背景为 accent 14% 透明混色）。
- 点击面板词条：收起面板、清空并聚焦搜索框（preventScroll），然后逐字打入词条，每字 55ms；减少动态时直接赋值。再次点击触发行或按 Escape（监听在场景根上）收起面板，Escape 收起后焦点回到触发行。
- 键盘与无障碍：触发行与面板词条都是原生 button，可 Tab、Enter/Space 触发；触发行 focus-visible 外圈 2px accent、offset 1px，词条 offset -1px；触发行 aria-expanded/aria-controls 指向面板（随机 id）；滚动窗口 aria-live="off"；装饰 SVG aria-hidden。
- prefers-reduced-motion: reduce（或 options.reducedMotion=true）下：滚动行、面板、词条、箭头的 transition 全关，闪烁动画取消；自动轮换停止；榜单刷新立即完成、打字改为直接填入，最终状态完整可见。
- options.height 调整场景高度（默认 340）；options.reducedMotion 覆盖系统偏好；更新选项就地合并、不重挂载；卸载时清理计时器、帧回调、观察器与监听。样式在 Shadow DOM 内，同页多实例互不干扰。

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| height | number | 340 | 场景高度，逻辑像素；窄容器整景按比例缩小 |
| reducedMotion | boolean | 跟随系统 | 覆盖系统的减少动态偏好 |

## 独立实现与六框架交付

- 仅凭本文从零生成可运行的实现。尺寸、颜色、文案、图形和运动参数均以上述文字为准；所有装饰用 CSS 与内联 SVG 绘制，不加载远程图片、字体、视频或素材。
- 当前交付重点为 React，组件名称 TrendingSearchRoll。从零创建四个文件：TrendingSearchRoll.tsx、TrendingSearchRollEngine.js、motion-runtime.ts、TrendingSearchRollEngine.d.ts；分别实现框架入口、完整交互核心、实例生命周期和类型声明。文件名是需要生成的产物，不假定接收者已经拥有任何文件。
- 同时提供 React、Vue、Svelte、Solid、Preact、Vanilla 原生生命周期入口，共享框架无关核心。DOM 仅在挂载后访问，支持同页多实例；更新时保持状态，销毁时清理动画、计时器、观察器及监听器。不要用 iframe 代替组件实现。
- 依赖安装说明：npm install react react-dom。若使用依赖，只使用其公开 API；组件的布局、样式、图形和算法必须在本次生成的文件中完整实现，不引用现成效果组件。
- 实现 options.height 以调整场景高度，options.reducedMotion 覆盖系统偏好；减少动态下搜索、展开、选词仍全部可用。
- 给出每个文件的完整内容、安装和运行步骤、以下使用示例所需的全部实现。不得留省略号、待补素材或「自行补齐核心」的占位。
- 验收：375 / 768 / 1440px 无横向溢出；单行每 2 秒轮换、展开面板 1.3 秒后刷新、点词条打字填入均正确；浅色深色两套令牌正确；多实例互不干扰，卸载后停止所有任务。

## 使用示例

```tsx
import { TrendingSearchRoll } from "./TrendingSearchRoll";

export default function App() {
  return <TrendingSearchRoll />;
}
```
