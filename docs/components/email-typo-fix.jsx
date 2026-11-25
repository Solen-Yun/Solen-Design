/* Component metadata only — the live demo and gallery preview live in
   email-typo-fix-demo.jsx, the framework source texts and the prompt in
   email-typo-fix-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
export default {
  id: "email-typo-fix",
  name: "邮箱纠错补全",
  href: "email-typo-fix.html",
  title: "邮箱纠错补全",
  description: "340×340 注册表单：邮箱输入 @ 后展开常见域名胶囊可选；出现 gmial.com 类错拼时行内提示 Did you mean gmail.com? 一键修正。",

  cardDescription: "域名胶囊补全，错拼一键修正。",

  demoHint: "输入 @ 看域名胶囊；输 gmial.com 看纠错提示。",



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
