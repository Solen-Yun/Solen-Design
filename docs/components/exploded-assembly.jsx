/* Component metadata only — the live demo and gallery preview live in
   exploded-assembly-demo.jsx, the framework source texts and the prompt in
   exploded-assembly-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
export default {
  id: "exploded-assembly",
  name: "滚动组装设备",
  href: "exploded-assembly.html",
  title: "滚动组装设备",
  description: "300×500 滚动场景：手机玻璃屏、显示面板、逻辑板、电池、后壳分层斜置悬浮并以引线连到标签；滚动推进各层归位组装，完成后显示 Assembled 徽标。",

  cardDescription: "分层爆炸图随滚动组装归位。",

  demoHint: "滚动看分层组装成整机。",



  api: [
  {
    "name": "height",
    "type": "number",
    "default": "500",
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
