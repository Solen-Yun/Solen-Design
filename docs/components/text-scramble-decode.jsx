/* Component metadata only — the live demo and gallery preview live in
   text-scramble-decode-demo.jsx, the framework source texts and the prompt in
   text-scramble-decode-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
export default {
  id: "text-scramble-decode",
  name: "乱码解码标题",
  href: "text-scramble-decode.html",
  title: "乱码解码标题",
  description: "340×296 标题解码场景：行内每个字母槽旋转随机符号后从左到右逐位落定；悬停标题重新乱码解码；三档速度切换按钮可选。",

  cardDescription: "字母乱码旋转后逐位落定，悬停重放。",

  demoHint: "点 Switch 或悬停标题看解码，切换速度。",



  api: [
  {
    "name": "height",
    "type": "number",
    "default": "296",
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
