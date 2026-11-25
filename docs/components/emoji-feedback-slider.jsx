/* Component metadata only — the live demo and gallery preview live in
   emoji-feedback-slider-demo.jsx, the framework source texts and the prompt in
   emoji-feedback-slider-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
export default {
  id: "emoji-feedback-slider",
  name: "变脸满意度滑杆",
  href: "emoji-feedback-slider.html",
  title: "变脸满意度滑杆",
  description: "340×350 订单反馈：拖动滑杆表情连续变化——最左皱眉眉压、中间放松平嘴、最右笑开眉挑，滑杆轨按表情区段着色；Send 提交反馈。",

  cardDescription: "表情随滑杆连续变脸。",

  demoHint: "拖滑杆看变脸，提交。",



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
