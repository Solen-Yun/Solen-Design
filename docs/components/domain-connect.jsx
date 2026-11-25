/* Component metadata only — the live demo and gallery preview live in
   domain-connect-demo.jsx, the framework source texts and the prompt in
   domain-connect-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
export default {
  id: "domain-connect",
  name: "域名连接步骤",
  href: "domain-connect.html",
  title: "域名连接步骤",
  description: "340×340 域名连接屏：列出需添加的 DNS 记录（Type/Name/Value），每条值带复制按钮（点击变勾）；Connect 验证时记录行逐条转圈后打勾，完成后显示 SSL 签发成功。",

  cardDescription: "DNS 记录复制与逐条验证打勾。",

  demoHint: "复制一条记录，点 Connect 看逐条验证。",



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
