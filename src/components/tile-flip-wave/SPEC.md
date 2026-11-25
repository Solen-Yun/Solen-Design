# 波纹翻块画 — TileFlipWave

制作「波纹翻块画」卡片：一块 340×340 的深色底板，中央是一幅 296×296 的 8×8 瓷砖拼图——64 块小方砖各自承载同一幅画中自己位置的那一小块，拼合成完整的「晨海日出」图。按在图上任意位置，翻面像涟漪一样从按压点向四周扩散：每块砖按与爆心的距离延迟 55ms/格，各自绕 Y 轴翻转 180°，靠右的砖向右翻、靠左的砖向左翻，全部翻完后整幅画换成背面另一幅「星脊月夜」图；再按一次又翻回来。Flip 按钮固定以画面中心（3.5, 3.5 格）为爆心起波。鼠标在图上移动时，光标 2.2 格半径内的砖会按距离向前浮起（最高 26px），移开后落回。底部左侧胶囊实时显示当前画面名。

## 布局与材质

- 340×340px 场景卡，圆角 30px，溢出裁切，底色固定 #11131C（浅色深色方案下不变）、文字白色；外圈 1px 线色描边加 0 30px 60px -36px 强阴影。场景根是 340×340 的无底色包装层（水平居中），卡片视觉放在其内部的绝对填充层上——文档演示舞台会剥离场景根的背景，卡片底色必须在嵌套层上才能保留。窄容器下整景按 min(1, 容器宽/340) 等比缩小。
- 根元素声明整套场景令牌（CSS 变量 + `light-dark()`：面 #FFFFFF/#13141C、墨 #16151B/#F4F0E8、线 rgba(22,21,27,.09)/rgba(255,255,255,.08)、accent #6A57F2/#B7A4FF 等）；本卡片的底板、拼图与按钮用固定色值，观感在两种方案下一致。
- 拼图容器：绝对定位左 22px、上 22px，296×296px，八等列网格、间隙 1px——砖缝露出深色底板形成细网格线；perspective:700px，cursor:pointer，touch-action:manipulation（抑制双击缩放，保证连按起波顺滑）；整体 role="img"、aria-label「Tile picture, press to flip」。单砖逻辑尺寸 S=37px（296/8）。
- 每块砖：transform-style:preserve-3d，翻转过渡 0.7s cubic-bezier(.3,1.5,.5,1)；正反两片绝对填充、backface-visibility:hidden（含 -webkit 前缀）、圆角 2px，背景图 background-size 固定 296px 296px、background-position 按 (列×-37px, 行×-37px) 偏移——即整幅画跨砖连续、不随砖裁碎；背面片预置 rotateY(180deg)。两幅画均为内联 SVG 文本经 encodeURIComponent 编码成 data:image/svg+xml 的背景图，无任何远程请求。
- 底栏：左 30px、右 30px、下 30px，两端对齐，pointer-events:none。左侧画面名胶囊：内边距 5px 10px、圆角 999px、底色 rgba(17,19,28,.6)、backdrop-filter blur(6px)、11.5px/字重 750，aria-live="polite"。右侧 Flip 按钮：恢复 pointer-events，内边距 6px 12px、圆角 999px、底色 rgba(255,255,255,.92)、字色 #11131C、11.5px/字重 800，focus-visible 为 2px #FFD43B 外圈、偏移 2px。

## 数据

- 两幅画写死。正面「Dawn sea」：竖向渐变天空 #FF9A8B → #FFD3A5（0–55% 处硬切到海面渐变 #3A6EA5 → #1B3A5C 至底）；太阳为圆心 (148,164)、半径 44 的 #FFF1C9 圆；海面矩形自 y=164 高 132px 填 #2B5584；海面七道加宽的暖光带（高 4px、圆角 2px、色 #FFE3A3，第 i 道 x=110-i×9、y=172+i×16、宽 76+i×18、不透明度 0.85-i×0.1）；一道白色 3px 波浪地平线（二次贝塞尔起伏，50% 透明度）；两枚 #5A3D5C 的 2.5px 海鸥 V 形笔画。
- 背面「Starry ridge」：竖向渐变 #0B1036 → #3B2A6B 夜空；46 颗星按 (i×73 mod 296, i×41 mod 170) 伪随机布点，半径 1px（每第 5 颗 1.8px），不透明度 0.4+(i mod 3)×0.2；月牙由 (222,66) r26 的 #FFF6D8 圆叠 (212,58) r24 的 90% 夜空色圆切出；两层 #241A4A 与 #160F33 山脊剪影多边形；峰顶附近一枚 #E6E2FF 四角星光。正面地平线波浪路径为 M0 120 Q40 108 80 118 T150 112 T230 122 T296 110，海鸥笔画为 M60 70 l10 6 l10 -6 与 M200 52 l8 5 l8 -5。
- 画面名写死两枚：Dawn sea（初始）/ Starry ridge（首次翻面后）。

## 操作和动效

- 点按拼图（含 Flip 按钮）：先按整景缩放比把点击坐标换算回逻辑坐标并折算成格坐标（x/S-0.5，可为小数，距离按列、行坐标与爆心的欧氏距离计算）；Flip 按钮固定爆心 (3.5, 3.5)。翻面时先切换画面名胶囊，然后 64 块砖统一处理：每砖延迟 = 与爆心的欧氏距离 × 55ms（涟漪扩散），累计角 ry += 180°×方向——列号 ≥ 爆心列的砖 +180°（向右翻）、否则 -180°（向左翻），变换为 translateZ(浮起量) rotateY(累计角)。翻满一圈即呈现另一幅画，再翻则还原；画面名初始即写「Dawn sea」。
- 光标浮起：pointermove 时（减少动态下禁用）计算光标格坐标，距离 2.2 格内的砖按 (1-d/2.2)×26px 取整为 translateZ 浮起量，且浮起期间把该砖的 transitionDelay 临时清零以保证跟手；pointerleave 把所有浮起砖落回。浮起与翻转共用同一变换通道（translateZ 后接 rotateY），浮起中的砖被翻转时保持浮起高度，二者叠加自然。
- `prefers-reduced-motion: reduce` 下：所有砖延迟置 0s（整幅同时翻面），光标浮起停用；过渡时长由运行时统一关断，翻面即时完成、最终画面完整可见。options.reducedMotion 为 true 时等价生效。
- 键盘：Flip 为原生按钮（Tab 可达、回车/空格触发）；拼图本体为 role="img" 不可聚焦，翻面交互经按钮完成。
- 更新 options 不重挂载；卸载时清理监听器。坐标换算含缩放补偿，整景被缩小后爆心与涟漪次序依然准确。

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| height | number | 340 | 场景高度，逻辑像素；窄容器整景按比例缩小 |
| reducedMotion | boolean | 跟随系统 | 覆盖系统的减少动态偏好 |

## 独立实现与六框架交付

- 仅凭本文从零生成可运行的实现。尺寸、颜色、文案和运动参数均以上述文字为准；两幅画以内联 SVG 生成 data URI 背景，砖块翻面用 CSS 3D 变换，不加载远程图片、字体、视频或素材。
- 当前交付重点为 React，组件名称 TileFlipWave。从零创建四个文件：TileFlipWave.tsx、TileFlipWaveEngine.js、motion-runtime.ts、TileFlipWaveEngine.d.ts；分别实现框架入口、完整交互核心、实例生命周期和类型声明。文件名是需要生成的产物，不假定接收者已经拥有任何文件。
- 同时提供 React、Vue、Svelte、Solid、Preact、Vanilla 原生生命周期入口，共享框架无关核心。DOM 仅在挂载后访问，支持同页多实例；更新时保持状态，销毁时清理动画、计时器、观察器及监听器。不要用 iframe 代替组件实现。
- 依赖安装说明：npm install react react-dom。若使用依赖，只使用其公开 API；组件的布局、样式、图形和算法必须在本次生成的文件中完整实现，不引用现成效果组件。
- 实现 options.height 以调整场景高度，options.reducedMotion 覆盖系统偏好；减少动态仍保留完整翻面功能与最终画面。
- 给出每个文件的完整内容、安装和运行步骤、以下使用示例所需的全部实现。不得留省略号、待补素材或"自行补齐核心"的占位。
- 验收：375 / 768 / 1440px 无横向溢出；任意点起波、Flip 中心起波、双画面来回翻面均正确；拼图接缝对齐无错位；多实例互不干扰，卸载后停止所有任务。

## 使用示例

```tsx
import { TileFlipWave } from "./TileFlipWave";

export default function App() {
  return <TileFlipWave />;
}
```
