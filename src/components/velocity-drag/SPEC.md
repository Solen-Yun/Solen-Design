创建一个日历卡片速度拖拽组件，完整实现下面的布局、数据与物理运动。

场景与日历
- 场景按 1040×720px 设计。背景叠加两层 radial-gradient：圆心30% 70%、颜色#355f3a到70%透明；圆心70% 30%、颜色#588f62到70%透明；底色#85a98d。
- 白色桌面窗口宽为场景92%、高为88%，12px圆角，阴影0 25px 50px -12px rgba(0,0,0,.4)。顶部工具栏高52px、#f9f9fa底、1px #e5e7eb分隔。左侧12px红黄绿圆点、间距8px，中间300px浅灰地址块写 app.io。它只是界面文字，不导航。
- 第二行高60px，左侧Today按钮、右侧16px/500的Aug 2026。日历有65px时间列和7列等宽日期，最小内容宽800px。日期头高60px，Sun—Sat对应9—15号，Mon的10号为28px红色圆底白字；8AM至2PM七个小时行，每行90px，浅灰网格线，时间字号11px。
- 卡片左右各留4px，圆角8px，内边距8px 10px，时间11px/600，标题12px/500。数据为：周一9点1.5小时粉色"Review Recent Work And Discuss Improvements."；周一12点1.5小时蓝色"Quick Sync On Progress, Blockers, And Priorities."；周二10点1.5小时绿色"Pack Bags And Leave For The Mountains."；周三8点1小时灰色"Pick Up Vegetables, Milk, Coffee..."与9点1.5小时黄色"30-Minute Jog Around The Neighborhood."；周四11点1.5小时紫色"Final Launch Checklist, Announcements, And Deployment."。时间后缀为 - Once，下方两个18px重叠头像圆点。
- 六种背景/文字配色依次为粉#fce7f3/#9f1239，蓝#dbeafe/#1e3a8a，绿#dcfce7/#166534，灰#f3f4f6/#374151，黄#fef08a/#854d0e，紫#f3e8ff/#6b21a8。

拖拽状态与物理
- 鼠标主键按下事件卡片时，记录抓取点相对卡片偏移，隐藏真实卡片，在原位置显示2px #94a3b8虚线占位框，生成一个相同尺寸的浮动副本，始终只有一个可见副本。
- 每帧pos += (pointer-pos)*.45；速度为本帧pos减上一帧pos。目标rotateY=clamp(vx*.8,-25,25)°，rotateX=clamp(-vy*.8,-25,25)°，rotateZ=clamp(vx*.08,-8,8)°，目标scale=1.02。旋转与缩放每帧以.2插值靠近目标，perspective=1200px，变换围绕中心。
- 浮起后底色变同色系70%透明，backdrop-filter blur(16px)，阴影0 30px 60px rgba(0,0,0,.15)。原时间、标题在.5—.6s内opacity降到0、blur到12px、scale到.9；居中目标日期时间以15px/600，在.1s延迟后.5s从blur10px、scale1.05淡入。
- 根据指针相对日历坐标计算目标：day=floor((x-scrollOriginX-65)/dayWidth)，限制0—6；hour=floor((y-scrollOriginY-60+scrollTop)/90)+8，限制8—14。浮动卡实时显示对应Sun—Sat与12小时制时间，正确处理12 PM。移动和滚动时目标都更新。
- 松开时写入新的day/hour，保留事件时长；目标真实卡片在落下期间仍隐藏。每帧重新读取目标卡片坐标：force=(target-pos)*.35，velocity=(velocity+force)*.58，pos+=velocity；旋转归零，scale归1。距离和速度之和都小于.5时隐藏浮动副本、移除占位框、显示真实卡片。
- 落下过程中再次拖动应终止旧过程，不重影、不瞬移到旧坐标。触屏用Pointer Events与pointer capture补全；键盘可选中卡片并用方向键移动日期/小时、Escape取消。无真实日历后端。窄容器统一缩放整个场景，减少动态效果时保留拖放和落点更新，关闭倾斜、模糊与回弹。

独立实现与六框架交付
- 仅凭本文从零生成可运行的实现。尺寸、颜色、文案、图形和运动算法均以上述文字为准；所有装饰用 CSS、内嵌 SVG 或 Canvas 绘制，不加载远程图片、字体、视频或素材。
- 当前交付重点为 React，组件名称 VelocityFocusDrag。从零创建四个文件：VelocityFocusDrag.tsx、VelocityFocusDragEngine.js、motion-runtime.ts、VelocityFocusDragEngine.d.ts；分别实现框架入口、完整交互核心、实例生命周期和类型声明。文件名是需要生成的产物，不假定接收者已经拥有任何文件。
- 同时提供 React、Vue、Svelte、Solid、Preact、Vanilla 原生生命周期入口，共享框架无关核心。DOM 仅在挂载后访问，支持同页多实例；更新时保持状态，销毁时清理动画、计时器、观察器及监听器。不要用 iframe 代替组件实现。
- 依赖安装说明：npm install react react-dom。若使用依赖，只使用其公开API；组件的布局、样式、图形和算法必须在本次生成的文件中完整实现，不引用现成效果组件。
- 实现 options.height 以调整场景高度，options.reducedMotion 覆盖系统偏好；减少动态效果仍保留完整交互状态。
- 给出每个文件的完整内容、安装和运行步骤、以下使用示例所需的全部实现。不得留省略号、待补素材或"自行补齐核心"的占位。
- 验收：375 / 768 / 1440px 无横向溢出；鼠标、键盘及相关触屏状态可用；成功、错误、快速中断、复制成功与失败均有反馈；多实例互不干扰，卸载后停止所有任务。

生成完成后的使用示例
import { VelocityFocusDrag } from "./VelocityFocusDrag";

export default function App() {
  return <VelocityFocusDrag />;
}
