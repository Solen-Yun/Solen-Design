/* Component metadata only — the live demo and gallery preview live in
   padlock-toggle-demo.jsx, the framework source texts and the prompt in
   padlock-toggle-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
export default {
  id: "padlock-toggle",
  name: "挂锁开合开关",
  href: "padlock-toggle.html",
  title: "挂锁开合开关",
  description: "340×300 文件隐私开关：点挂锁锁孔转侧如钥匙插入，锁梁弹起一腿悬空打开；再点锁梁落回扣紧。文件状态 Private/Public 联动。",

  cardDescription: "锁孔转侧锁梁弹开，状态联动。",

  demoHint: "点挂锁看开合与状态切换。",



  api: [
  {
    "name": "height",
    "type": "number",
    "default": "300",
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
