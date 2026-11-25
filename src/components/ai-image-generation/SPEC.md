创建一个AI图片生成等待动效，完整实现下面的点阵算法和排版。

布局
- 白色场景520×560px，系统无衬线字体；内容居中、纵向间隔20px。标题AI is designing the poster，15px/400、#a1a1aa、字距.3px、左padding4px。文字右侧间距8px放一个4px灰色圆点，opacity在0.3与1之间以1.5s周期呼吸。
- 下方420×420px卡片，底色#f4f4f5、24px圆角、overflow hidden，极浅阴影0 4px 6px -1px rgba(0,0,0,.01)与0 2px 4px -1px rgba(0,0,0,.01)。卡片内居中放360×360px点阵，20行×20列，网格步长18px。
- 每个点为12px圆形，基础RGB=(228,228,231)，基础scale=.333，即可见直径约4px；最活跃scale=.65，直径约7.8px，颜色RGB=(152,152,152)。不要做大圆、粒子喷射或彩色光晕。

逐帧公式
- 第i个点坐标x=(i%20-10)*18，y=(floor(i/20)-10)*18；时间t=timestamp*.0012。
- 焦点A：x=sin(t*.7)*90，y=cos(t*1.1)*70，weight=1。焦点B：x=sin(t*-1.2+2)*70，y=cos(t*.8+1.5)*95，weight=(sin(t*.35)+1)/2。
- 对每个点，分别计算它到两个焦点的距离d；d<110时贡献pow(1-d/110,1.4)*weight，否则贡献0。两者相加后clamp到0—1得到I。
- I>.01时scale=.333+(.65-.333)*I，颜色每通道round(base+(active-base)*I)；其余恢复基础颜色与缩放。用requestAnimationFrame持续更新transform与background-color，点位本身固定，不平移整个网格。
- 画面先绘制再显示，首帧完整可见。离屏或页面隐藏暂停，恢复后继续；卸载取消RAF。减少动态效果时保留一帧静态点阵与标题，停止呼吸和连续循环。
- 窄容器按比例缩小并完整铺背景，不横向溢出。该组件只有本地加载反馈，不接入真实生图接口。

独立实现与六框架交付
- 仅凭本文从零生成可运行的实现。尺寸、颜色、文案、图形和运动算法均以上述文字为准；所有装饰用 CSS、内嵌 SVG 或 Canvas 绘制，不加载远程图片、字体、视频或素材。
- 当前交付重点为 React，组件名称 AiImageGeneration。从零创建四个文件：AiImageGeneration.tsx、AiImageGenerationEngine.js、motion-runtime.ts、AiImageGenerationEngine.d.ts；分别实现框架入口、完整交互核心、实例生命周期和类型声明。文件名是需要生成的产物，不假定接收者已经拥有任何文件。
- 同时提供 React、Vue、Svelte、Solid、Preact、Vanilla 原生生命周期入口，共享框架无关核心。DOM 仅在挂载后访问，支持同页多实例；更新时保持状态，销毁时清理动画、计时器、观察器及监听器。不要用 iframe 代替组件实现。
- 依赖安装说明：npm install react react-dom。若使用依赖，只使用其公开API；组件的布局、样式、图形和算法必须在本次生成的文件中完整实现，不引用现成效果组件。
- 实现 options.height 以调整场景高度，options.reducedMotion 覆盖系统偏好；减少动态效果仍保留完整交互状态。
- 给出每个文件的完整内容、安装和运行步骤、以下使用示例所需的全部实现。不得留省略号、待补素材或"自行补齐核心"的占位。
- 验收：375 / 768 / 1440px 无横向溢出；鼠标、键盘及相关触屏状态可用；成功、错误、快速中断、复制成功与失败均有反馈；多实例互不干扰，卸载后停止所有任务。

生成完成后的使用示例
import { AiImageGeneration } from "./AiImageGeneration";

export default function App() {
  return <AiImageGeneration />;
}
