/* Component metadata only — the live demo and gallery preview live in
   streak-flame-demo.jsx, the framework source texts and the prompt in
   streak-flame-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
export default {
  id: "streak-flame",
  name: "连续打卡火苗",
  href: "streak-flame.html",
  title: "连续打卡火苗",
  description: "340×340 习惯打卡周卡：点亮今天的格子后勾跳入位、中央火苗窜起并稳定为更大火苗洒出火星；一周连续显示 A week in a row!。",

  cardDescription: "勾跳入位火苗窜起变大。",

  demoHint: "点今天的格子看火苗。",



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
