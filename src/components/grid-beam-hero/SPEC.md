# 网格光束背景 — GridBeamHero

制作「网格光束背景」：一张 340×340 的深色 hero 背景场景，固定底色 #07080F 不随主题变化。34px 白色低透明度网格向中心淡出铺底；Canvas 层上水平与垂直光束沿网格线滑行——每隔 0.42s 补一枚、同时在飞最多 9 枚，速度 110–200px/s、尾长 50–90px，三色（靛蓝 rgb(129,140,248) / 青 rgb(45,212,191) / 粉 rgb(244,114,182)）随机，头端 1.8px 圆点带 8px 辉光；光标移动时一片 90px 径向聚光把附近网格染成 rgba(129,140,248,.55)，离开即熄灭。中央偏上为部署文案：Infrastructure 徽章、"Ship in a tenth of the time" 双行渐变标题、副题 "Push, and it's live worldwide in seconds." 与 "Deploy now"（白底）/ "Read docs"（描边）两枚装饰胶囊。减少动态时光束静止为初始 4 枚，聚光仍跟随。

## 布局与材质

- 场景 340×340px、圆角 30px、溢出裁切；底色 #07080F（写死，不随深浅色切换）、默认文字色 #F2F4FF；外圈 0 0 0 1px 线色描边，加 0 30px 60px -36px 强阴影；自定义属性 --mx / --my 初始 -200px（聚光藏在场景外）。
- 基础网格层（aria-hidden）：两层 1px linear-gradient（rgba(255,255,255,.07)），水平与垂直各一，34px×34px 平铺、位置 -1px -1px；mask radial-gradient(75% 70% at 50% 45%, #000, transparent) 让网格向中心外淡出。
- 聚光网格层（aria-hidden）：同结构，但线色 rgba(129,140,248,.55)；mask radial-gradient(90px 90px at var(--mx) var(--my), #000, transparent)——只照亮光标周围的网格；透明度过渡 .4s。
- Canvas 光束层：绝对填充、pointer-events none、aria-hidden；画布物理尺寸乘以 dpr（取 min(2, devicePixelRatio)）后整体 scale，保证高清。场景内层叠自下而上为：基础网格、聚光网格、Canvas、中央辉光、内容层；前四层均 aria-hidden 且不拦截指针，只有内容层文字可选中。
- 中央椭圆辉光（aria-hidden）：260×180、中心位于 left 50% / top 44%（margin -90px 0 0 -130px）、圆角 50%；背景 radial-gradient(closest-side, rgba(99,102,241,.35), transparent)；blur(10px)；垫在文案下方。
- 内容层（aria-hidden 之外，文字可选中）：绝对定位 left/right 0、top 86px、居中。徽章 "Infrastructure"：inline-block、内边距 3px 9px、圆角 999px、背景 rgba(255,255,255,.06)、内嵌 0 0 0 1px rgba(255,255,255,.12)、10px/字重 800、#A5B4FC、字距 0.06em。标题 "Ship in a tenth<br>of the time"：上边距 12px、27px、行高 1.14、字重 900、字距 -0.04em、180deg #fff→#AEB4D6 渐变 clip text。副题 "Push, and it's live worldwide in seconds."：上边距 10px、11.5px/字重 600、#9AA0C3。按钮排：上边距 18px、间距 8px、居中；两枚高 30px 胶囊（内边距 0 14px、11px/字重 800）：主 "Deploy now" #fff 底 #07080F 字；次 "Read docs" rgba(255,255,255,.06) 底 + 内嵌 0 0 0 1px rgba(255,255,255,.14)。两枚均为装饰 span，不承载点击行为。
- 场景描边线色取全局令牌 line（浅色 rgba(22,21,27,.09) / 深色 rgba(255,255,255,.08)），其余配色为写死常量；内容层对深色底可读性不做浅色适配（场景恒为深色画面）。字体随页面继承无衬线。

## 数据

- 无写死业务数据。光束参数运行时随机生成：方向横竖各半；随机选一条网格线（序号 1 到 边长/34 − 1），坐标 = 序号 × 34 − 1；出发方向 ±1；速度 110 + 随机 ×90 px/s；尾长 50 + 随机 ×40 px；颜色三选一均等。初始预生成 4 枚并摆在边长的 20% / 38% / 56% / 74% 处。

## 操作和动效

- rAF 主循环：每帧 dt = 与上一帧的时间差，夹在 0–0.05s；累计超过 0.42s 且场上少于 9 枚时补生一枚（起点在 -60 或 边长+60，朝随机方向飞行）；每帧 p += 方向 × 速度 × dt；超出边界 70px 的光束移除。挂载时先画一帧初始 4 枚再启动循环，首帧即有光束可见。
- 每帧重绘：尾段从尾到头 linear-gradient rgba(色, 0)→rgba(色, .95)，线宽 1.6、坐标加 0.5px 对齐；头端 1.8px 实心圆、shadowBlur 8 同色辉光，画完清零。
- IntersectionObserver 管可见性：场景离开视口暂停 rAF，回来恢复；rAF 走表面包装层——页面整页隐藏（document.hidden）时回调自动挂起、恢复可见时补发，卸载时统一取消。
- 指针交互：pointermove 把光标坐标换算成场景坐标（除以缩放比）写入 --mx / --my，只有聚光网格层的 mask 消费这两个变量（基础网格不跟随）；pointerleave 把两个变量复位 -200px，聚光熄灭（透明度过渡 .4s）。
- 键盘与无障碍：场景本身无焦点交互；网格、Canvas、辉光、内容层均标 aria-hidden。
- prefers-reduced-motion / options.reducedMotion：rAF 不启动，画布只绘制初始 4 枚静止光束；聚光网格仍随光标移动（纯 CSS mask 实现，无动画）；场景根打上 data-reduced-motion 强制容器内所有 CSS 过渡与动画时长归零。surface 会随容器宽度把整景等比缩小（缩放不超过 1）。

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| height | number | 340 | 场景高度，逻辑像素；窄容器整景按比例缩小 |
| reducedMotion | boolean | 跟随系统 | 覆盖系统的减少动态偏好 |

## 独立实现与六框架交付

- 仅凭本文从零生成可运行的实现。尺寸、颜色、文案、图形与运动参数均以上述文字为准；网格与聚光用 CSS 渐变与 mask 绘制，光束用 Canvas 2D 逐帧绘制，文案层用 DOM 与 CSS，不加载远程图片、字体、视频或素材。
- 当前交付重点为 React，组件名称 GridBeamHero。从零创建四个文件：GridBeamHero.tsx、GridBeamHeroEngine.js、motion-runtime.ts、GridBeamHeroEngine.d.ts；分别实现框架入口、完整交互核心、实例生命周期和类型声明。文件名是需要生成的产物，不假定接收者已经拥有任何文件。
- 同时提供 React、Vue、Svelte、Solid、Preact、Vanilla 原生生命周期入口，共享框架无关核心。DOM 仅在挂载后访问，支持同页多实例；更新时保持状态，销毁时清理动画、计时器、观察器及监听器。不要用 iframe 代替组件实现。
- 依赖安装说明：npm install react react-dom。若使用依赖，只使用其公开 API；组件的布局、样式、图形和算法必须在本次生成的文件中完整实现，不引用现成效果组件。
- 实现 options.height 以调整场景高度，options.reducedMotion 覆盖系统偏好；减少动态下静止光束与聚光仍完整可用。
- 给出每个文件的完整内容、安装和运行步骤、以下使用示例所需的全部实现。不得留省略号、待补素材或"自行补齐核心"的占位。
- 验收：375 / 768 / 1440px 无横向溢出；光束沿网格线持续滑行且数量/速度/尾长符合参数；聚光跟随光标、离开熄灭；减少动态时光束静止、聚光可用；多实例互不干扰，卸载后停止所有任务。

## 使用示例

```tsx
import { GridBeamHero } from "./GridBeamHero";

export default function App() {
  return <GridBeamHero />;
}
```
