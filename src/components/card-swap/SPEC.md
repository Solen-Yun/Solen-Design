# 拖甩照片卡片 — CardSwap

制作「拖甩照片卡片」交互组件。四张纵向照片叠成一个向右上方延伸的立体牌组。点击、触屏轻点、键盘激活或甩动最前一张，使它沿直线退到最后，其余三张前移。整个过程中保留四个 DOM 节点和照片身份。

## 画面与素材

- 基准块 360×350 CSS 像素。外部空间大时居中，小于 360px 时等比缩小，拖动距离按缩放还原成设计像素。背景 #f4f4f4，文字用 Inter、system-ui、sans-serif 回退栈。
- 舞台 196×246，放在块内 (31,73)。舞台 perspective:850px，perspective-origin:149px 102px，使用默认 flat。卡片在同一舞台原点绝对定位并填满。5px 暖白 #fdfbf6 边框，15px 圆角，深灰 #343a35 底色，两层阴影 0 2px 4px #211b161c 和 0 9px 18px #211b1630。图片 object-fit:cover，禁止原生图片拖动。
- 依次用 樱花神社、深海巨鲸、极光镜湖、天空浮岛。分别内嵌居中的黄昏山坡神社（石阶延伸至朱红鸟居、樱花盛放、橙金夕阳）、幽蓝深海中发着星点荧光的巨鲸、冬夜雪山环抱的镜面湖与绿紫极光、云海浮岛间少女骑白鸟掠过前景的四张 4:5 插画壁纸（480×600，base64 JPEG data URI）。每张照片独立可替换，默认资源在离线包中可用。卡片底部贴一段从透明到 #101711cc 的渐变，内边距上28、左右12、下11，白色标题14px、字重650、行高1.25。

## 位置和手势

- 队列是唯一排序状态。第 k 个位置用 translate3d(34k px,-26k px,-70k px) skewY(6deg)，绘制层级为 4-k。切换时立刻将队首层级改成 1，使它在其他卡片后方移动，其他位置同步前移。CSS 只过渡 transform，540ms cubic-bezier(.22,.77,.23,1)。不要用 preserve-3d、删除重建节点或交叉淡化代替。
- 仅队首响应输入。主按钮按下捕获当前指针并暂时关闭 transition。跟随移动时对每轴使用 160*tanh(delta/160) 的橡皮筋，追加 translate(x,y) 与 rotate(0.05*x deg)。松手时以设计像素计算距离 d 和从按下起算的速度。d<6、d>70，或 d>24 且速度>0.6px/ms 就换位，否则清除拖动 transform 并平滑回原位。pointercancel、捕获丢失、卸载都结束手势，取消时保持顺序。
- 使用真实按钮，只有队首可 Tab，Enter 和 Space 激活一次。换位后若旧卡有焦点，将焦点交给新的队首。焦点轮廓使用 #225cfa，2px 线宽、4px 外偏移。触屏在卡片内拖动，卡片外保留页面原生滚动。

## 自动切换与交付

- auto 默认 false，every 默认4秒，最小间隔1.5秒。定时器只在可见、未悬停、未拖动、无卡片焦点且未请求减少动态时运行。每次换位或恢复交互重新计时，隐藏和销毁时清除。减少动态时保留手动瞬时换位。cards 可提供恰好四个 {title,src} 对象，省略时使用内嵌图；可更新参数。
- 实现独立 DOM 核心和 React、Vue、Svelte、Solid、Preact、Vanilla 的原生挂载与卸载入口。提供完整源码、安装及使用示例。验收点击一次只换一张、短慢拖复位、长拖与快速甩动换位、移动到舞台外仍能松手、键盘焦点跟随、触屏、自动播放暂停、减少动态、同页两个实例互不影响和卸载后没有残余回调。

## 独立实现与六框架交付

- 仅凭本文从零生成可运行的实现。尺寸、颜色、文案、图形和运动算法均以上述文字为准；所有装饰用 CSS、内嵌 SVG 或 Canvas 绘制，不加载远程图片、字体、视频或素材。
- 当前交付重点为 Vanilla，组件名称 CardSwap。从零创建四个文件：CardSwap.ts、CardSwapEngine.js、motion-runtime.ts、CardSwapEngine.d.ts；分别实现框架入口、完整交互核心、实例生命周期和类型声明。文件名是需要生成的产物，不假定接收者已经拥有任何文件。
- 同时提供 React、Vue、Svelte、Solid、Preact、Vanilla 原生生命周期入口，共享框架无关核心。DOM 仅在挂载后访问，支持同页多实例；更新时保持状态，销毁时清理动画、计时器、观察器及监听器。不要用 iframe 代替组件实现。
- 依赖安装说明：No runtime dependencies. Use TypeScript or a bundler to compile the entry file.。若使用依赖，只使用其公开API；组件的布局、样式、图形和算法必须在本次生成的文件中完整实现，不引用现成效果组件。
- 实现 options.height 以调整场景高度，options.reducedMotion 覆盖系统偏好；减少动态效果仍保留完整交互状态。
- 给出每个文件的完整内容、安装和运行步骤、以下使用示例所需的全部实现。不得留省略号、待补素材或“自行补齐核心”的占位。
- 验收：375 / 768 / 1440px 无横向溢出；鼠标、键盘及相关触屏状态可用；成功、错误、快速中断、复制成功与失败均有反馈；多实例互不干扰，卸载后停止所有任务。

## 使用示例

```ts
import { mount } from "./CardSwap";
const target = document.querySelector<HTMLElement>("#demo")!;
const component = mount(target);
// When your page or route unmounts:
// component.destroy();
```
