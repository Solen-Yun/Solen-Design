/* Component metadata only — the live demo and gallery preview live in
   phone-country-input-demo.jsx, the framework source texts and the prompt in
   phone-country-input-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
export default {
  id: "phone-country-input",
  name: "国旗区号手机号输入",
  href: "phone-country-input.html",
  title: "国旗区号手机号输入",
  description: "340×340 表单场景：手机号输入框左侧的国家按钮点击后弹出国旗与区号列表，选择时旗帜与区号旋转切换，已输入的号码数字按所选国家的格式重新分组。",

  cardDescription: "选择国家后旗帜区号旋转切换，号码自动重排分组。",

  demoHint: "点开左侧国家按钮换一个国家，看旗帜区号旋转切换、号码重新分组。",



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
