/* Component metadata only — the live demo and gallery preview live in
   voice-record-button-demo.jsx, the framework source texts and the prompt in
   voice-record-button-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
export default {
  id: "voice-record-button",
  name: "按住录音滑动取消",
  href: "voice-record-button.html",
  title: "按住录音滑动取消",
  description: "340×350 聊天录音：按住麦克风开始录音，计时走动、随音量起伏的波形自右入场；按住并左滑出现「Slide to cancel」，滑过阈值松手取消；松手完成发送。",

  cardDescription: "按住录音波形随音量，左滑取消。",

  demoHint: "按住看录音与波形，左滑取消，松手发送。",



  api: [
  {
    "name": "height",
    "type": "number",
    "default": "350",
    "description": "场景高度，逻辑像素；窄容器整景按比例缩小"
  },
  {
    "name": "reducedMotion",
    "type": "boolean",
    "default": "跟随系统",
    "description": "覆盖系统的减少动态偏好"
  }
],
};
