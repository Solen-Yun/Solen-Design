/* Component metadata only — the live demo and gallery preview live in
   unsaved-changes-bar-demo.jsx, the framework source texts and the prompt in
   unsaved-changes-bar-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
export default {
  id: "unsaved-changes-bar",
  name: "未保存更改条",
  href: "unsaved-changes-bar.html",
  title: "未保存更改条",
  description: "340×340 店铺设置场景：任意改动后顶部落下「2 unsaved changes」计数条（数字滚动），尝试切换菜单时提示保存；Cancel 复位、Save 成功收起。",

  cardDescription: "改动计数条落下，切换菜单拦截提醒。",

  demoHint: "改设置看计数条，点菜单看拦截，保存看收起。",



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
