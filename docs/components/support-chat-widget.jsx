/* Component metadata only — the live demo and gallery preview live in
   support-chat-widget-demo.jsx, the framework source texts and the prompt in
   support-chat-widget-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
export default {
  id: "support-chat-widget",
  name: "客服气泡聊天窗",
  href: "support-chat-widget.html",
  title: "客服气泡聊天窗",
  description: "300×480 网站右下角客服场景：点按 launcher 气泡，支持窗口从按钮位置生长而出，展示团队面孔与「We usually reply in a few minutes」，常用问题胶囊与输入条可交互。",

  cardDescription: "聊天窗从气泡位置生长而出，问题胶囊可点选。",

  demoHint: "点击右下气泡看窗口长出；点问题胶囊看回复。",



  api: [
  {
    "name": "height",
    "type": "number",
    "default": "480",
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
