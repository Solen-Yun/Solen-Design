/* Component metadata only — the live demo and gallery preview live in
   tactile-push-button-demo.jsx, the framework source texts and the prompt in
   tactile-push-button-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
export default {
  id: "tactile-push-button",
  name: "立体按压按钮",
  href: "tactile-push-button.html",
  title: "立体按压按钮",
  description:
    "一枚纯 CSS 雕刻的胶囊立体按钮，悬停时表面沿四边下沉露出深色底座、按下时整体压缩回弹，阴影与裁剪全由 CSS 过渡完成，尺寸随字号等比缩放。",

  cardDescription: "悬停下沉、按下压缩的立体按钮，状态切换全部由内阴影和裁剪路径的过渡完成。",

  demoHint: "悬停观察下沉，按住观察压缩；键盘聚焦后出现绿色焦点轮廓。",



  api: [
    { name: "height", type: "number", default: "540", description: "场景高度，逻辑像素" },
    { name: "reducedMotion", type: "boolean", default: "跟随系统", description: "覆盖系统的减少动态偏好" },
    { name: "label", type: "string", default: '"button"', description: "按钮文字，支持换行与空格" },
    { name: "fontSize", type: "number | string", default: "48", description: "按钮字号（数字按 px），全部尺寸随它等比缩放" },
    { name: "pressScale", type: "number", default: "0.93", description: "按下时表面层的缩放倍率，clamp 0.8～1.05" },
    { name: "hoverTextScale", type: "number", default: "0.975", description: "悬停时文字层的缩放倍率，clamp 0.8～1.05" },
    { name: "motionSpeed", type: "number", default: "1", description: "动画速度倍率，越大越快，clamp 0.25～3" },
    { name: "surfaceStart / surfaceEnd", type: "string", default: "#e6e6e6 / #b4b4b4", description: "表面渐变的起止色" },
    { name: "textStart / textEnd", type: "string", default: "#191919 / #4b4b4b", description: "文字渐变的起止色" },
  ],
};
