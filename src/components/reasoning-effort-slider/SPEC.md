制作一个可独立嵌入的模型思考强度滑块

外观
- 采用模型菜单中独立的264px「推理强度」区块，左右内边距12px，保留该区块的字体与连续圆角，不添加卡片说明、档位徽章或额外文案
- 标题「推理强度」为12px，下方轨道高30px、胶囊圆角，浅灰背景，白色滑块26px，顶部2px，起点左边3px，1px浅灰边和轻微阴影
- 三档文案「简单」「中度」「深度」，分别对应 simple / medium / deep，默认 medium。轨道下6px显示11px标签，当前档加粗并随蓝紫色相变化
- 轨道填充随位置从深灰蓝流动到淡紫。Canvas绘制七条对角柔光带与64个细微星点，色相为210+ratio²×63。最低档保留32px填充，最高档隐藏三个定位圆点

交互与运动
- 点轨道、点档位标签、键盘方向键和Home/End都可切换。拖动中连续预览，松手吸附最近档，只在提交新档时发出一次 onValueChange(value)，取消手势回到已提交值
- GSAP驱动位置500ms不超调滑行；按下80ms缩至0.96，松手320ms恢复
- 速度驱动滑块身体拉伸、偏移和倾斜，速度上限3.5，变形上限0.46，90ms跟随；停顿后用stiffness400/damping23/时长720ms的弹簧归位，反向拖动连续过渡
- 星点速度随强度和拖速提高，通过积分相位维持连续。GSAP ticker绘制，后台不绘制；卸载移除ticker、监听器和ResizeObserver
- 禁用状态不能操作。支持运行时受控value更新与回滚、reducedMotion更新；减少动态效果时静态呈现当前档，不改变交互结果
- role=slider，aria-valuemin=0，aria-valuemax=2，aria-valuenow和aria-valuetext与当前预览一致，键盘焦点清晰可见。支持触屏和多实例

接口
- options.value: simple | medium | deep，options.onValueChange(value)，options.disabled，options.height，options.reducedMotion
- thinking-change事件detail.value传递UI档位。模型参数映射由调用者实现，不假定每个模型都支持同一推理协议
- 手势与绘制在组件内自实现：指针拖动、键盘与触屏都作用在同一条轨道上，GSAP负责位置滑行、按压、变形与星场绘制，不依赖现成滑块或效果组件
- 六框架入口共享同一套交互核心；样式与交互代码完整交付，不请求桌面应用、服务端或远程素材

独立实现与六框架交付
- 仅凭本文从零生成可运行的实现。尺寸、颜色、文案、图形和运动算法均以上述文字为准；所有装饰用 CSS、内嵌 SVG 或 Canvas 绘制，不加载远程图片、字体、视频或素材。
- 当前交付重点为 React，组件名称 ReasoningEffortSlider。从零创建四个文件：ReasoningEffortSlider.tsx、ReasoningEffortSliderEngine.js、motion-runtime.ts、ReasoningEffortSliderEngine.d.ts；分别实现框架入口、完整交互核心、实例生命周期和类型声明。文件名是需要生成的产物，不假定接收者已经拥有任何文件。
- 同时提供 React、Vue、Svelte、Solid、Preact、Vanilla 原生生命周期入口，共享同一套 React UI 核心。DOM 仅在挂载后访问，支持同页多实例；更新时保持状态，销毁时清理动画、计时器、观察器及监听器。不要用 iframe 代替组件实现。
- 依赖安装说明：引擎只依赖 gsap@3.12.7；React 入口另需 react react-dom，其余框架入口各需对应框架包。组件的布局、样式、图形和算法必须在本次生成的文件中完整实现，不引用现成效果组件。
- 实现 options.height 以调整场景高度，options.reducedMotion 覆盖系统偏好；减少动态效果仍保留完整交互状态。
- 给出每个文件的完整内容、安装和运行步骤、以下使用示例所需的全部实现。不得留省略号、待补素材或"自行补齐核心"的占位。
- 验收：375 / 768 / 1440px 无横向溢出；鼠标、键盘及相关触屏状态可用；成功、错误、快速中断、复制成功与失败均有反馈；多实例互不干扰，卸载后停止所有任务。

生成完成后的使用示例
import { ReasoningEffortSlider } from "./ReasoningEffortSlider";

export default function App() {
  return <ReasoningEffortSlider />;
}
