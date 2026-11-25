/* Component metadata only — the live demo and gallery preview live in
   sort-flip-list-demo.jsx, the framework source texts and the prompt in
   sort-flip-list-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
export default {
  id: "sort-flip-list",
  name: "排序飞行行",
  href: "sort-flip-list.html",
  title: "排序飞行行",
  description: "340×350 列表排序：切 Name/Price/Rating 排序时各行不是整体跳位，而是各自滑到新位置——上移的行轻微朝观者抬起、下移的行后退沉入。",

  cardDescription: "排序行各自飞行换位带前后景。",

  demoHint: "切三种排序看飞行换位。",



  api: [
  {
    "name": "height",
    "type": "number",
    "default": "350",
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
