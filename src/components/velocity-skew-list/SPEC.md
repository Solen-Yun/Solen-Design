# 速度倾斜列表 — VelocitySkewList

制作「速度倾斜列表」：一张 340×340 的周末计划清单卡片。标题右侧有一枚指针式速度表（弧形刻度加一根红色指针），下面是一列 68px 高的行程卡片，可在隐藏滚动条的区域内上下滚动。滚动越快，整列卡片朝滚动方向 skewY 倾斜得越多并轻微纵向拉伸；停手瞬间列表以弹簧姿态回正、指针摆回原位；慢速滚动几乎不倾斜。

## 布局与材质

- 340×340px 场景卡，纵向 flex，圆角 28px，溢出裁切。底色表面色（浅色 #FFFFFF、深色 #13141C），外圈 1px 线色描边（浅色 rgba(22,21,27,.09)、深色 rgba(255,255,255,.08)），下方 0 30px 60px -36px 强阴影（浅色 rgba(40,30,80,.3)、深色 rgba(0,0,0,.72)）。窄容器时整景按 transform:scale 等比缩小。
- 头部一行两端对齐，内边距 16px 18px 10px：左侧标题 17px/字重 850 "Weekend plans"；右侧速度表为一组水平排列、间距 8px 的 11px/750 三级墨色（浅色 #8E8A97、深色 rgba(244,240,232,.42)）文字 "Scroll speed" 与 44×26px SVG 表盘（overflow:visible，指针可扫出弧外）。表盘弧线为路径 M4 24 a18 18 0 0 1 36 0：fill:none、线色加深一档（浅色 rgba(22,21,27,.17)、深色 rgba(255,255,255,.16)）、线宽 4、圆头；指针是从 (22,24) 到 (22,9) 的直线，红 #D93A55（深色 #FF7D8C）、线宽 2.5、圆头，transform-origin 定在表盘底部 (22,24)（transform-box:view-box），静止时 rotate(-88deg)。
- 列表区占剩余全部高度（340 减头部后的 flex:1 视口），overflow-y:auto，内边距 4px 16px 16px，滚动条完全隐藏（scrollbar-width:none 与 ::-webkit-scrollbar 双写），tabindex=0 可聚焦、outline:none。
- 卡片列表为纵向网格、间距 10px，transform-origin 50% 50%、will-change:transform（倾斜施加在整个列表容器上）。每张卡片高 68px、水平 flex、间距 12px、内边距 0 14px、圆角 18px、背景次级表面色（浅色 #F5F3EF、深色 #1A1B25）、内描边 1px 线色（box-shadow inset）。左侧行程图标 42×42px、圆角 13px、135deg 双色渐变；右侧文案两行：标题 14.5px/字重 780 墨色（块级），副标 12px/字重 650 三级墨色。
- 场景令牌浅色深色两套（light-dark() 随 prefers-color-scheme 切换），如上；组件未声明字体栈，文字继承页面字体。

## 数据

- 写死 10 条行程，标题与副标（距离 · 用时）依次为：
  1. Seoul Forest walk — 1.0 km · 30 min
  2. Euljiro film lab — 3.3 km · 45 min
  3. Mangwon market tteokbokki — 5.5 km · 60 min
  4. Seongsu studio visit — 2.1 km · 75 min
  5. Han River sunset ride — 4.4 km · 90 min
  6. Tea in Ikseon-dong — 1.5 km · 105 min
  7. Bukchon alley photos — 3.8 km · 120 min
  8. Yeonnam park picnic — 5.1 km · 135 min
  9. Seochon bookshop tour — 2.4 km · 150 min
  10. Namsan night walk — 4.7 km · 165 min
- 五组图标渐变色循环取用（第 i 条用第 i mod 5 组，135deg）：#FF8787→#FFD43B、#74C0FC→#B197FC、#63E6BE→#4DABF7、#FFA94D→#F783AC、#A9E34B→#38D9A9。
- 除列表与表盘文案外无其他写死数据。

## 操作和动效

- 唯一交互为列表区滚动（触摸板、鼠标滚轮或聚焦后的方向键；列表区 tabindex=0 且 aria-label "Weekend plans"，为原生按钮语义外的可聚焦滚动容器）。
- 滚动时以 scroll 事件（passive 监听，不阻塞滚动）采样速度：dt 取 max(8ms, 距上次采样间隔)，瞬时速度 v = 纵向位移 ÷ dt（px/ms），再按 0.6/0.4 比例与上一帧速度混合成平滑速度 vel；有速度才启动帧循环，循环中 |skew| > 0.02、角速度 > 0.02 或 |vel| > 0.01 任一满足就继续下一帧。
- 每帧（requestAnimationFrame）：距最后一次滚动超过 60ms 时 vel 衰减为 60%；目标倾角 = clamp(−vel×3.2, −10°, +10°)（减少动态时恒为 0°）；倾角与角速度用弹簧逼近——sv += (target−skew)×0.2、sv×=0.72、skew+=sv，因此停手后会越过 0° 荡一下再稳住。列表变换为 skewY(skew deg) 配 scaleY(1 + min(0.06, |skew|×0.006))，即最多拉长 6%。
- 速度表指针与滚动同步：角度 = clamp(−88° + min(1, |vel|÷3)×176°, −80°, +80°)，从左端 −88° 随速度扫向右端；挂载时即把指针摆到 rotate(-88deg)。静止判定（|skew|、角速度、vel 均低于 0.02/0.02/0.01）后列表内联变换清空为空串、指针回 rotate(-88deg)，帧循环停止，直到下次滚动再启动。
- prefers-reduced-motion 下目标倾角恒为 0°，列表始终不倾斜不拉伸，但表盘指针仍随滚动摆动、停稳后回正；options.reducedMotion 覆盖系统偏好。
- 无障碍：标题可读、速度表装饰性 SVG aria-hidden；滚动容器可键盘聚焦并使用方向键滚动（原生滚动容器行为，PageUp/PageDown 等同样可用）；无焦点环（outline:none）。
- 更新 options 不重挂载组件，支持同页多实例互不干扰；卸载时停止帧循环并移除滚动监听。

## Props

| Prop | Type | Default | Description |
| height | number | 340 | 场景高度，逻辑像素；窄容器整景按比例缩小 |
| reducedMotion | boolean | 跟随系统 | 覆盖系统的减少动态偏好 |

## 独立实现与六框架交付

- 仅凭本文从零生成可运行的实现。尺寸、颜色、文案与运动参数均以上述文字为准；界面全部用 DOM 与 CSS 绘制，速度插值与弹簧回正自行实现，不加载远程图片、字体、视频或素材。
- 当前交付重点为 React，组件名称 VelocitySkewList。从零创建四个文件：VelocitySkewList.tsx、VelocitySkewListEngine.js、motion-runtime.ts、VelocitySkewListEngine.d.ts；分别实现框架入口、完整交互核心、实例生命周期和类型声明。文件名是需要生成的产物，不假定接收者已经拥有任何文件。
- 同时提供 React、Vue、Svelte、Solid、Preact、Vanilla 原生生命周期入口，共享框架无关核心。DOM 仅在挂载后访问，支持同页多实例；更新时保持状态，销毁时清理动画、计时器、观察器及监听器。不要用 iframe 代替组件实现。
- 依赖安装说明：npm install react react-dom。若使用依赖，只使用其公开 API；组件的布局、样式、图形和算法必须在本次生成的文件中完整实现，不引用现成效果组件。
- 实现 options.height 以调整场景高度，options.reducedMotion 覆盖系统偏好；减少动态下列表不倾斜、滚动仍可用。
- 给出每个文件的完整内容、安装和运行步骤、以下使用示例所需的全部实现。不得留省略号、待补素材或"自行补齐核心"的占位。
- 验收：375 / 768 / 1440px 无横向溢出；快速滚动倾斜方向与滚动方向一致、停手弹簧回正；慢速滚动几乎不倾斜；浅色深色两套令牌正确；多实例互不干扰，卸载后停止所有任务。

## 使用示例

```tsx
import { VelocitySkewList } from "./VelocitySkewList";

export default function App() {
  return <VelocitySkewList />;
}
```
