创建一个可独立运行的无限螺旋画廊组件（3D 螺旋排列的图片卡片沿纵轴无限行进），完整实现下面列出的画面、交互和动效。

画面与排版
- 场景根元素撑满容器（高度由 options.height 决定，默认 480px，最小 320px），overflow hidden，isolation isolate。内部一个绝对定位铺满的 3D 舞台（transform-style: preserve-3d），透视为 1000px。
- 图片卡片：100×100px、圆角 10px、1px 半透白描边（rgb(255 255 255/.24)）、白色 8% 填充、阴影 0 14px 38px rgb(8 6 18/.2)，backface-visibility hidden，will-change transform/opacity/filter；图片以 object-fit cover 填满卡片。所有卡片绝对定位在舞台中心（top/left 50%），由脚本逐帧写入 transform。
- 卡片沿一条竖直螺旋带排布：序号相差 1 的相邻卡片在行进轴上相距 60px，同时绕纵轴旋转——每 7 张卡绕完一整圈（每张相隔 360/7 度），旋转半径 170px。前方（z 靠近观众）的卡片按透视公式 perspective/(perspective-z) 放大（上限 1.45、下限 0.72），最靠近中心的卡片额外放大到 1.2 倍。
- 边缘衰减：行程后半段（可调，默认最后 30% 区间）卡片透明度经 smoothstep 渐隐至 0，边缘模糊最大 6px（smoothstep(0.35,1,edge) 插值）；zIndex 按深度排序。
- 行进是无限的：卡片序号对总数取模环绕，任一时刻总有一张卡位于螺旋中心附近。
- 场景内图片由 items 传入（src 必填，可选 alt/href/target/label/id），items 不足时场景留空不报错。所有素材由使用方提供，组件本身不加载任何远程资源。

运动模型（逐帧）
- 每帧以 rAF 驱动：自动行进速度向目标速度指数混合（每秒 7 的混合率，delta 上限 0.05s），实际进度向目标进度指数靠拢（每秒 11 的混合率，拖拽中 22）——所有运动都平滑加减速，无跳变。
- 自动模式默认以 0.55 张/秒沿「向上」方向行进；direction 为 down 时反向。悬停画廊（pauseOnHover 默认开）时目标速度指数衰减到 0，离开后平滑恢复——是缓动停住，不是瞬间定格。
- 交叉观察器在画廊滚出视口时暂停自动行进，回到视口恢复。ResizeObserver 跟踪容器尺寸：fit = min(1, 宽/(卡宽×2.8), 高/(卡高×2.35)) 乘进半径、纵向间距与卡片缩放，窄容器整景等比缩小不裁切。
- prefers-reduced-motion 或 options.reducedMotion 为真时：自动行进速度恒为 0，画廊静止悬停在一帧静帧上；滚动与拖拽仍可用（每次输入后立即重绘一次最终位置），边缘渐隐、中心放大等静态呈现完整保留。

交互模式（animationMode）
- "auto"：仅自动行进 + 悬停暂停。
- "drag"：仅指针拖拽——按住后垂直拖动卡片带（grab 光标，按下变 grabbing，pointer capture 跟手），拖动距离除以纵向间距换算为进度位移；拖过后抬起的点击被拦截（不触发卡片链接）；松手后进度以拖拽混合率平滑收敛到目标。
- "scroll"：随页面滚动行进——滚动位移乘以速度系数除以 (纵向间距×2) 累加到目标进度，单次钳制 ±1.5，passive 监听。
- "all"：三者同时启用。
- 拖拽/滚动只在对应模式开启；非拖拽模式下光标为 default，touchAction 相应切换（pan-x / auto），拖拽模式下禁用文本选择。

可访问性
- 舞台 role="list"，aria-label 描述为无限螺旋画廊；每张卡 role="listitem"，aria-label 取 item.label 或 alt；带 href 的卡片渲染为链接（target 为 _blank 时自动补 rel="noreferrer"）。
- 场景高度可经 options.height 调整；options.items 更新时重建卡片（图片全部由使用方提供，组件不内嵌任何图片数据）。

独立实现与六框架交付
- 仅凭本文从零生成可运行的实现。尺寸、运动参数与交互行为均以上述文字为准；卡片与舞台用 DOM + CSS 3D 实现，不加载远程图片、字体、视频或素材。
- 当前交付重点为 React，组件名称 InfiniteSpiral。从零创建四个文件：InfiniteSpiral.tsx、InfiniteSpiralEngine.js、motion-runtime.ts、InfiniteSpiralEngine.d.ts；分别实现框架入口、完整交互核心、实例生命周期和类型声明。文件名是需要生成的产物，不假定接收者已经拥有任何文件。
- 同时提供 React、Vue、Svelte、Solid、Preact、Vanilla 原生生命周期入口，共享框架无关核心。DOM 仅在挂载后访问，支持同页多实例；更新时保持状态，销毁时清理动画、计时器、观察器及监听器。不要用 iframe 代替组件实现。
- 依赖安装说明：npm install react react-dom。组件的布局、样式、3D 排布和运动算法必须在本次生成的文件中完整实现，不引用现成效果组件。
- options.height 调整场景高度（默认 480）；options.reducedMotion 覆盖系统偏好。以下参数全部可经 options 实时调整（更新不重建运动状态）：items（图片列表）、speed（0.55，张/秒与滚动灵敏度）、direction（"up"/"down"）、animationMode（"auto"/"drag"/"scroll"/"all"）、pauseOnHover（true）、radius（170，螺旋半径）、cardWidth/cardHeight（100/100，卡片尺寸）、verticalSpacing（60，相邻卡片间距）、perspective（1000，CSS 透视）、cardsPerTurn（7，每圈卡数）、rotation（0，全局角度偏移）、cardTilt（0，附加顺时针倾斜）、cardRadius（10，卡片圆角）、centerScale（1.2，中心放大）、edgeFade（0.3，边缘渐隐区间）、edgeBlur（6，边缘最大模糊）、imageFit（"cover"/"contain"）、grayscale（0–1，整组置灰）。
- 给出每个文件的完整内容、安装和运行步骤、以下使用示例所需的全部实现。不得留省略号、待补素材或"自行补齐核心"的占位。
- 验收：375 / 768 / 1440px 无横向溢出（窄容器整景等比缩小）；鼠标、触摸与键盘（卡片链接可聚焦）可用；减少动态下静帧完整；动画在滚出视口后暂停；多实例互不干扰，卸载后停止所有任务。

生成完成后的使用示例
import { InfiniteSpiral } from "./InfiniteSpiral";

const images = [
  { src: "/images/landscape-1.jpg", alt: "Mountain lake" },
  { src: "/images/landscape-2.jpg", alt: "Forest path" },
  { src: "/images/landscape-3.jpg", alt: "Rocky summit" },
];

export default function App() {
  return (
    <div style={{ height: 600 }}>
      <InfiniteSpiral items={images} animationMode="all" />
    </div>
  );
}
