/* Component metadata only — the live demo and gallery preview live in
   passkey-signin-demo.jsx, the framework source texts and the prompt in
   passkey-signin-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
export default {
  id: "passkey-signin",
  name: "一键通行密钥登录",
  href: "passkey-signin.html",
  title: "一键通行密钥登录",
  description: "340×340 登录卡：点 Sign in with a passkey 后自底部升起设备确认面板，指纹纹理自外向内逐环点亮，随后显示「Welcome back, Minji」的进入中状态。",

  cardDescription: "指纹环逐环点亮完成通行密钥登录。",

  demoHint: "点通行密钥登录看面板升起与指纹点亮。",



  api: [
  {
    "name": "height",
    "type": "number",
    "default": "340",
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
