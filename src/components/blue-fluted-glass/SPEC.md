创建一个名为 Blue Fluted Glass Background（蓝色棱纹流动背景）的独立实时动效组件。画面只有缓慢形变的蓝白流体、竖向磨砂玻璃棱纹和固定的白色 Solen 矢量标志。不能播放视频或用静态图片交叉淡入代替连续形变，也不要添加宣传标题、导航、卡片或设置面板。以下数值为本实现的完整重建规格。

布局与视觉
- 默认场景 1200×833px，填满容器，position:relative、overflow:hidden、isolation:isolate、背景 #f4f4f4。独立展示时场景填满视口；嵌入时由 height 控制。场景固定比例缩小时内容一起缩放；支持 375 / 768 / 1440px，不出现横向滚动。
- Canvas 绝对铺满底层，CSS filter:blur(1.25px)、transform:scale(1.008) 保持边缘不漏底。实际分辨率等于布局宽高乘 min(devicePixelRatio,1.5)。程序化场景不需要字体、图片或素材下载。
- Logo 水平垂直居中，宽度为场景的22%，宽高比520:180，白色，pointer-events:none，drop-shadow(0 1px 3px #00132e20)。Logo 保持固定，不受棱纹折射、流体移动或鼠标位置影响；保持图标与字标的真实比例，不用普通字体重打品牌名。
- 完整矢量如下，可在生成的组件中内嵌；所有 path 与分组变换均为本规格的一部分：
<svg class="bfg-logo" xmlns="http://www.w3.org/2000/svg" width="520" height="180" viewBox="0 0 520 180" role="img" aria-label="Solen"><title>Solen</title><g fill="currentColor"><g transform="translate(6 16) scale(0.74)"><path d="M 165.3 65.3 L 167.8 70.4 L 169.9 75.8 L 171.6 81.3 L 172.8 86.9 L 173.6 92.6 L 174.0 98.3 L 173.9 104.0 L 173.4 109.7 L 172.4 115.4 L 171.0 120.9 L 169.1 126.4 L 166.9 131.7 L 164.2 136.8 L 161.2 141.6 L 157.8 146.2 L 154.0 150.6 L 149.9 154.6 L 145.6 158.3 L 140.9 161.7 L 136.0 164.7 L 130.9 167.2 L 125.6 169.4 L 120.1 171.2 L 114.5 172.6 L 108.9 173.5 L 103.2 173.9 L 97.4 174.0 L 91.7 173.5 L 86.0 172.7 L 80.4 171.4 L 75.0 169.6 L 69.6 167.5 L 64.5 164.9 L 59.6 162.0 L 54.9 158.7 L 50.5 155.0 L 54.5 150.5 L 59.0 153.4 L 63.6 155.8 L 68.3 157.9 L 73.2 159.6 L 78.1 160.9 L 83.1 161.7 L 88.0 162.2 L 93.0 162.3 L 97.8 162.0 L 102.6 161.3 L 107.3 160.2 L 111.8 158.8 L 116.1 157.1 L 120.3 155.1 L 124.2 152.7 L 127.9 150.1 L 131.3 147.2 L 134.5 144.1 L 137.3 140.8 L 139.9 137.4 L 142.2 133.7 L 144.1 130.0 L 145.7 126.2 L 147.0 122.2 L 148.0 118.3 L 148.6 114.3 L 148.9 110.4 L 148.9 106.5 L 148.6 102.6 L 148.0 98.9 L 147.1 95.2 L 145.9 91.7 L 144.5 88.4 L 142.8 85.2 L 140.9 82.1 L 138.8 79.3 Z"/><path d="M 38.2 132.9 L 36.0 128.3 L 34.1 123.6 L 32.5 118.7 L 31.4 113.8 L 30.5 108.7 L 30.1 103.7 L 30.0 98.6 L 30.3 93.5 L 31.0 88.4 L 32.0 83.5 L 33.4 78.6 L 35.1 73.8 L 37.2 69.1 L 39.6 64.6 L 42.3 60.4 L 45.3 56.3 L 48.7 52.4 L 52.3 48.8 L 56.1 45.5 L 60.2 42.4 L 64.5 39.7 L 68.9 37.3 L 73.6 35.2 L 78.4 33.4 L 83.3 32.0 L 88.2 31.0 L 93.3 30.3 L 98.4 30.0 L 103.5 30.1 L 108.5 30.5 L 113.6 31.3 L 118.5 32.5 L 123.4 34.0 L 128.1 35.9 L 132.7 38.1 L 137.1 40.6 L 133.9 45.7 L 129.6 43.9 L 125.2 42.5 L 120.8 41.4 L 116.3 40.6 L 111.8 40.2 L 107.4 40.1 L 103.0 40.4 L 98.6 40.9 L 94.4 41.8 L 90.3 42.9 L 86.3 44.4 L 82.5 46.1 L 78.9 48.1 L 75.4 50.3 L 72.2 52.8 L 69.2 55.4 L 66.4 58.2 L 63.9 61.2 L 61.6 64.4 L 59.6 67.6 L 57.8 71.0 L 56.4 74.5 L 55.2 78.0 L 54.3 81.5 L 53.6 85.1 L 53.3 88.6 L 53.2 92.2 L 53.3 95.6 L 53.7 99.1 L 54.4 102.4 L 55.3 105.6 L 56.4 108.7 L 57.8 111.7 L 59.3 114.5 L 61.0 117.2 L 62.9 119.7 Z"/><circle cx="52.5" cy="152.8" r="3"/><circle cx="135.5" cy="43.2" r="3"/></g><rect fill="#ff8650" x="137" y="59" width="11" height="3.5" rx="1.75" transform="rotate(-25 142 61)"/><path d="M 180.8 85.8 A 82 82 0 0 1 78.8 179.2" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"/></g><text x="178" y="124" fill="currentColor" font-family="Helvetica Neue, Helvetica, Arial, sans-serif" font-weight="500" font-size="100" textLength="300" lengthAdjust="spacingAndGlyphs">Solen</text></svg>
- 字体回退栈 system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,sans-serif；画面本身没有需要渲染的正文。

连续流体与折射算法
- WebGL 1 渲染全屏矩形：顶点坐标[-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]，顶点着色器只把二维 position 写入 vec4(position,0,1)。上下文 alpha:false、antialias:false、depth:false、preserveDrawingBuffer:true。
- time 单位为秒。相位 time×2π/28，所有低频形变使用相位的整数谐波，使28秒周期边界连续；不是随机重生成的色团。图形包括纵向主脊、顶部蓝色冠部、底部弯曲带、乘性浅色空洞；多层连续高斯密度形成平滑折叠。
- 71根等距竖向棱纹固定在屏幕坐标上。每条棱纹通过fract(x×71)-0.5获得横向局部坐标，真实改变流体采样位置；不能只在渐变上盖透明竖线。包含Canvas的1.008倍边缘放大后，1200px展示宽度下棱纹周期约17.04px，1920px下约27.26px。蓝色区域才出现轻微棱面亮暗。五次竖向采样权重0.40、0.24、0.24、0.06、0.06，偏移0、±0.025、±0.055，得到柔化的玻璃材质。
- 使用以下完整 fragment shader；resolution 为实际Canvas像素宽高，time 为累计有效播放秒数：
precision highp float;
uniform vec2 resolution;
uniform float time;
float blob(vec2 p,vec2 center,vec2 radius,float angle){
  p-=center;float c=cos(angle),s=sin(angle);
  p=mat2(c,-s,s,c)*p/radius;
  return exp(-dot(p,p));
}
vec3 fluid(vec2 p,float t){
  float s=sin(t),c=cos(t);
  p.x+=.025*sin(p.y*7.0+t*2.0);
  float trunk=blob(p,vec2(.52+.15*s-.07*sin(t*2.0),.76),vec2(.235,.46),-.12-.52*s);
  float crown=blob(p,vec2(.77-.55*s,.20-.10*sin(t*2.0)),vec2(.235,.23),-.50+.45*s);
  float baseY=1.045-.17*p.x+.075*sin(p.x*5.0+t*2.0);
  float base=exp(-pow((p.y-baseY)/.092,2.0));
  float hole=blob(p,vec2(.85-.55*s,.59-.13*s),vec2(.19+.025*c,.32),.1+.5*s);
  float density=(trunk+.56*crown+.90*base)*(1.0-.78*hole);
  vec3 color=mix(vec3(.957),vec3(.66,.80,.89),smoothstep(.015,.20,density));
  color=mix(color,vec3(.10,.48,.73),smoothstep(.16,.49,density));
  color=mix(color,vec3(.015,.135,.28),smoothstep(.40,.73,density));
  color=mix(color,vec3(.008,.025,.087),smoothstep(.62,.93,density));
  return color;
}
void main(){
  vec2 uv=vec2(gl_FragCoord.x/resolution.x,1.0-gl_FragCoord.y/resolution.y);
  // The lenses refract the fluid itself; they are not an opacity stripe overlay.
  float rib=fract(uv.x*71.0)-.5;
  vec2 refracted=uv+vec2(rib*.018,(rib*rib-.0833)*.034);
  float t=time*6.28318530718/28.0;
  vec3 color=fluid(refracted,t)*.40;
  color+=fluid(refracted+vec2(0.,.025),t)*.24;
  color+=fluid(refracted-vec2(0.,.025),t)*.24;
  color+=fluid(refracted+vec2(0.,.055),t)*.06;
  color+=fluid(refracted-vec2(0.,.055),t)*.06;
  float edge=pow(abs(rib)*2.0,10.0);
  float blue=(1.0-color.r)*smoothstep(.02,.18,color.b-color.r);
  color+=vec3(.018,.025,.03)*(rib*.65+edge*.24)*blue;
  gl_FragColor=vec4(clamp(color,0.0,1.0),1.0);
}
- 色板由着色器连续混合：#f4f4f4、RGB(168.3,204,226.95)、RGB(25.5,122.4,186.15)、RGB(3.825,34.425,71.4)、RGB(2.04,6.375,22.185)，禁止换成紫色、彩虹、镜面金属或黑色条纹。
- RAF 每帧推进有效时间，dt上限0.05s；暂停、页面隐藏和离屏时不累计时间，恢复时从当前形状继续。第一次挂载立即绘制完整t=0帧，不能先空白。resize改变分辨率时保留播放相位。

操作、可访问性与边界
- 整个场景为可聚焦的本地暂停控件，role=button，tabindex=0。点击、轻触、Enter或Space切换暂停/继续；键盘防止空格滚动。aria-pressed只表达用户暂停状态，aria-label在Pause background animation和Resume background animation间切换，隐藏aria-live文字分别为Animation paused和Animation playing。
- 焦点样式为内缩7px的3px白色轮廓，加9px内阴影#0b3c69；无hover位移，不让Logo或图标运动。
- 背景没有鼠标跟随效果，多个鼠标位置均不改变图案；仅时间使流体连续流动，手动暂停时保持完全同一帧。反复快速切换只保留一条RAF，不跳到初始形状。重新挂载才回到t=0。
- prefers-reduced-motion或options.reducedMotion为true时保留静态完整画面，禁止持续RAF；更新为false或系统取消减少动态效果后恢复。系统偏好变化要立即响应。
- WebGL不可用或着色器失败时显示静态降级：960×666画布先填#f4f4f4，再从(525,520)半径20到440绘制径向渐变，色标0=#020820、.45=#073d69、.7=#378fbe、1=#f4f4f4；保留矢量Logo，不把降级画面声明为实时动画。
- 不请求业务后端。实例DOM、样式与事件封闭在独立容器/ShadowRoot；禁止给宿主body改样式或留下全局ID。至少验证同页两个实例的独立暂停。
- ResizeObserver更新尺寸，IntersectionObserver处理离屏，visibilitychange处理页面隐藏。卸载时取消RAF、解绑点击/键盘/偏好/可见性监听、disconnect观察器，释放WebGL Buffer、Program并通过WEBGL_lose_context释放上下文。重复销毁无副作用。

验收
- 检查t=0、约6秒和约12秒：主蓝脊和浅色凹槽连续迁移，固定竖纹对同一流体产生折射，Logo坐标和路径保持不变。暂停前后实际Canvas像素相同，恢复后实际像素变化。
- 点击、触屏、空格、回车、重复中断、减少动态效果、resize、多实例、卸载与重新挂载均实际运行。封面使用t=0完整绘制帧；等待首帧再展示动画，离开预览后释放实例。

独立实现与六框架交付
- 仅凭本文从零生成可运行的实现。尺寸、颜色、文案、图形和运动算法均以上述文字为准；所有装饰用 CSS、内嵌 SVG 或 Canvas 绘制，不加载远程图片、字体、视频或素材。
- 当前交付重点为 React，组件名称 BlueFlutedGlass。从零创建四个文件：BlueFlutedGlass.tsx、BlueFlutedGlassEngine.js、motion-runtime.ts、BlueFlutedGlassEngine.d.ts；分别实现框架入口、完整交互核心、实例生命周期和类型声明。文件名是需要生成的产物，不假定接收者已经拥有任何文件。
- 同时提供 React、Vue、Svelte、Solid、Preact、Vanilla 原生生命周期入口，共享框架无关核心。DOM 仅在挂载后访问，支持同页多实例；更新时保持状态，销毁时清理动画、计时器、观察器及监听器。不要用 iframe 代替组件实现。
- 依赖安装说明：npm install react react-dom。若使用依赖，只使用其公开API；组件的布局、样式、图形和算法必须在本次生成的文件中完整实现，不引用现成效果组件。
- 实现 options.height 以调整场景高度，options.reducedMotion 覆盖系统偏好；减少动态效果仍保留完整交互状态。
- 给出每个文件的完整内容、安装和运行步骤、以下使用示例所需的全部实现。不得留省略号、待补素材或“自行补齐核心”的占位。
- 验收：375 / 768 / 1440px 无横向溢出；鼠标、键盘及相关触屏状态可用；成功、错误、快速中断、复制成功与失败均有反馈；多实例互不干扰，卸载后停止所有任务。

生成完成后的使用示例
import { BlueFlutedGlass } from "./BlueFlutedGlass";

export default function App() {
  return <BlueFlutedGlass />;
}
