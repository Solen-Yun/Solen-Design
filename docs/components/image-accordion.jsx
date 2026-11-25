/* Component metadata only — the live demo and gallery preview live in
   image-accordion-demo.jsx, the framework source texts and the prompt in
   image-accordion-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
export default {
  id: "image-accordion",
  name: "弹性图片手风琴",
  href: "image-accordion.html",
  title: "弹性图片手风琴",
  description:
    "五张竖图裁成窄条横排，悬停或聚焦一张以弹簧动效打开、邻图让出宽度而外框始终不变，触屏点按固定再点收起，键盘 Enter/Space 同样可用。",

  cardDescription: "悬停展开窄条竖图，弹簧动效联动邻图，外框始终不变。",

  demoHint: "悬停或 Tab 聚焦展开；触屏点按固定、再点同一张收起；Enter/Space 固定或取消。",



  api: [
    { name: "open", type: "number", default: "50", description: "活动卡片的展开强度，clamp 0–100" },
    { name: "reach", type: "number", default: "35", description: "邻图联动范围（高斯宽度），clamp 0–100" },
    { name: "bounce", type: "number", default: "10", description: "弹簧回弹，clamp 0–100" },
    { name: "gap", type: "number", default: "8", description: "卡片间距（px），clamp 0–20；圆角 = min(gap, 12)" },
    { name: "images", type: "{ name; src }[]", default: "内嵌五图", description: "替换图源，1–5 张 { name, src }，更换后仍是同一 340px 横栏" },
    { name: "height", type: "number", default: "300", description: "场景高度，逻辑像素" },
    { name: "reducedMotion", type: "boolean", default: "跟随系统", description: "覆盖系统的减少动态偏好；开启时立即更新宽度" },
  ],
};
