/* Component metadata only — the live demo and gallery preview live in
   cookie-consent-demo.jsx, the framework source texts and the prompt in
   cookie-consent-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
export default {
  id: "cookie-consent",
  name: "Cookie 同意横幅",
  href: "cookie-consent.html",
  title: "Cookie 同意横幅",
  description: "340×340 网站底部 Cookie 同意横幅：按 Settings 向上长出 Essential/Analytics/Marketing 三组开关，保存或全部允许后横幅咬掉一口并滑出屏幕。",

  cardDescription: "设置长出三组开关，保存后咬一口滑走。",

  demoHint: "点 Settings 看开关长出，保存看咬一口退场。",



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
