创建一个可独立运行的 OTP Verification 六位验证码胶囊，完整实现下面的视觉与状态机。

布局与视觉
- 场景高度 510px，背景 #f6f4f0，组件居中；字体栈 Inter, system-ui, sans-serif，不请求网络字体。白色外壳、1px #e5e3df 边框，底部柔和阴影，内衬 #ecebe4，主文字 #22221d。
- idle：胶囊 202×74px，37px 圆角，内边距 7px；居中显示 20px 字号、600 字重的 Enter code，左边 20px 锁图标。锁是内嵌 24×24 SVG：圆角锁体 x=5,y=10,width=14,height=11,rx=2；上部锁扣 M8 10V7a4 4 0 0 1 8 0v3；2px 圆端描边。
- input：外壳宽 374px、高 74px，六格水平排列，每格 54×58px，间距 7px，数字 26px/600。数字区域下方仍保留胶囊底色。用一个共享黑色圆角描边框标记活动格，不要分别闪烁六个边框。
- verifying：收回 202px 宽，显示 Verifying 与 18px 未闭合圆环，圆环 0.8s 线性循环旋转；禁止继续输入。
- error：再次展开六格，底色 #fae3e4，数字 #d32e4d，横向轻摇；约 680ms 后逐位清空，恢复米灰输入状态并重新聚焦。
- success：收为宽 174px、高 74px 的绿色 #26bc4e 胶囊，显示白色勾选和 Verified；勾选 24×24 viewBox，折线路径 M5 12l4 4L19 6、2px 圆端描边。点击成功胶囊回到 idle。

输入与状态机
- 用一个真实原生输入承接焦点与原生编辑行为，以六个可视格显示内容；inputMode=numeric，autocomplete=one-time-code，最多六位，过滤所有非数字。
- 点击初始胶囊进入 input；支持数字键、退格、左右方向键、点击格定位、整码粘贴，Escape 重置；屏幕阅读器能读到输入标签、错误和验证结果。
- 输入六位立刻进入 verifying，1550ms 后进行本地判断：123456 正确，其余为错误。验证和成功期间不接受输入，不调用任何认证服务，不存储验证码。
- 错误过程：输入 213212 → verifying → 红色六格与摇动 → 从右向左清空 → input；成功过程：输入 123456 → verifying → 绿色 Verified → 点击重置。
- autoPlay 可播放上述两条过程：展开后在 1000/1250/1500/1750/2000/2250ms 依次输入 2/21/213/2132/21321/213212；4850/5100/5350/5600/5850/6100ms 依次输入 1/12/123/1234/12345/123456；约 8883ms 调用 onReplayComplete。关闭 autoPlay、重置或卸载取消未执行的任务。

动效参数
- 展开 0.58s，宽度用 back.out(1.15)；提交收拢 0.42s；焦点框平移 0.2s，从当前格中心连续移动到下一格。
- 数字入场 opacity 0→1、translateY 8→0px、blur 3→0px，时长约 0.18s；内容收拢用轻微模糊与淡出。错误摇动 x=0,-5,5,-4,4,0px，总长约 0.3s。
- 同一个外壳连续改变宽度、背景与内容，快速重置从当前视觉值过渡，不能堆叠多个状态副本。按钮 hover 不产生位移。
- 容器窄于 420px 时对整个胶囊统一缩放，保留格子比例且不横向溢出；减少动态效果时保留输入、等待、错误及成功状态，去掉位移、摇动和无限旋转。

独立实现与六框架交付
- 仅凭本文从零生成可运行的实现。尺寸、颜色、文案、图形和运动算法均以上述文字为准；所有装饰用 CSS、内嵌 SVG 或 Canvas 绘制，不加载远程图片、字体、视频或素材。
- 当前交付重点为 React，组件名称 OtpVerification。从零创建四个文件：OtpVerification.tsx、OtpVerificationEngine.js、motion-runtime.ts、OtpVerificationEngine.d.ts；分别实现框架入口、完整交互核心、实例生命周期和类型声明。文件名是需要生成的产物，不假定接收者已经拥有任何文件。
- 同时提供 React、Vue、Svelte、Solid、Preact、Vanilla 原生生命周期入口，共享框架无关核心。DOM 仅在挂载后访问，支持同页多实例；更新时保持状态，销毁时清理动画、计时器、观察器及监听器。不要用 iframe 代替组件实现。
- 依赖安装说明：npm install react react-dom gsap@3.12.7。若使用依赖，只使用其公开API；组件的布局、样式、图形和算法必须在本次生成的文件中完整实现，不引用现成效果组件。
- 实现 options.height 以调整场景高度，options.reducedMotion 覆盖系统偏好；减少动态效果仍保留完整交互状态。options.autoPlay 控制自动演示，options.onReplayComplete 在演示完成时回调。
- 给出每个文件的完整内容、安装和运行步骤、以下使用示例所需的全部实现。不得留省略号、待补素材或"自行补齐核心"的占位。
- 验收：375 / 768 / 1440px 无横向溢出；鼠标、键盘及相关触屏状态可用；成功、错误、快速中断、复制成功与失败均有反馈；多实例互不干扰，卸载后停止所有任务。

生成完成后的使用示例
import { OtpVerification } from "./OtpVerification";

export default function App() {
  return <OtpVerification />;
}
