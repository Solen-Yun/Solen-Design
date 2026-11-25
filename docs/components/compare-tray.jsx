/* Component metadata only — the live demo and gallery preview live in
   compare-tray-demo.jsx, the framework source texts and the prompt in
   compare-tray-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
export default {
  id: "compare-tray",
  name: "商品对比托盘",
  href: "compare-tray.html",
  title: "商品对比托盘",
  description: "340×340 商品列表对比：勾选商品对比框后底部托盘升起，选中商品弹入空槽；≥2 件可 Compare 展开规格表；移除收起。",

  cardDescription: "勾选商品入托盘，两件以上展开对比。",

  demoHint: "勾两件商品看托盘与对比表。",



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
