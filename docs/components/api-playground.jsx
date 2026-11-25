/* Component metadata only — the live demo and gallery preview live in
   api-playground-demo.jsx, the framework source texts and the prompt in
   api-playground-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
export default {
  id: "api-playground",
  name: "API 试用示例",
  href: "api-playground.html",
  title: "API 试用示例",
  description: "340×340 开发文档 API 示例：cURL/JavaScript/Python 页签切换同一请求的语言化代码；Send request 后显示加载与 200 OK JSON 响应。",

  cardDescription: "三语言代码页签，发送请求看响应。",

  demoHint: "切换页签看代码变化，点 Send 看 200 响应。",



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
