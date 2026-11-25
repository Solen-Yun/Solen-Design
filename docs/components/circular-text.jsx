/* Component metadata only — the live demo and gallery preview live in
   circular-text-demo.jsx, the framework source texts and the prompt in
   circular-text-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
/* Shared with circular-text-sources.jsx — one copy for both the API table and the frameworks. */
export const API = [
  { name: "text", type: "string", default: "—", description: "环绕圆环排列的文字" },
  { name: "spinDuration", type: "number", default: "20", description: "转一圈的秒数；≤ 0 停止自转" },
  { name: "onHover", type: '"slowDown" | "speedUp" | "pause" | "goBonkers"', default: '"speedUp"', description: "悬停时的转速反应：减速、加速、暂停、疯狂" },
  { name: "direction", type: '"clockwise" | "counterclockwise"', default: '"clockwise"', description: "自转方向" },
  { name: "size", type: "number", default: "200", description: "圆环直径（px）" },
  { name: "fontSize", type: "number", default: "24", description: "字符字号（px）" },
  { name: "fontWeight", type: "number", default: "900", description: "字符字重" },
  { name: "letterSpacing", type: "number", default: "0", description: "字距（fontSize 的倍数，实测布局模式生效）" },
  { name: "color", type: "string", default: '""', description: "字符颜色；留空继承" },
  { name: "startAngle", type: "number", default: "0", description: "首个字符的角度（deg）" },
  { name: "fill", type: "boolean", default: "true", description: "均分整圈布满；false 按实测字宽排弧长" },
  { name: "repeat", type: "number", default: "1", description: "文字绕圈的重复份数" },
  { name: "ring", type: "boolean", default: "false", description: "绘制圆形描边" },
  { name: "ringColor", type: "string", default: '""', description: "描边颜色；留空用 currentColor" },
  { name: "tilt", type: "number", default: "0", description: "平面的静态 X 轴倾角（deg）" },
  { name: "hoverTilt", type: "number", default: "0", description: "指针驱动的 3D 倾斜幅度（deg）" },
  { name: "draggable", type: "boolean", default: "false", description: "可抓住圆环拖转并甩出惯性" },
  { name: "children", type: "ReactNode", default: "—", description: "叠在环心上方的内容，不随环旋转" },
  { name: "className", type: "string", default: '""', description: "根节点附加类名" },
];

export default {
  id: "circular-text",
  name: "环形环绕文字",
  href: "circular-text.html",
  title: "环形环绕文字",
  description:
    "文字沿圆环排列并匀速旋转：fill 模式均分整圈任意文字都首尾闭合，实测模式按真实字宽排弧长并在字体就绪后重排；悬停经弹簧减速 / 加速 / 暂停 / 疯狂（20 倍转速缩到 0.8），可拖住圆环手转并以 ±1440 deg/s 上限的角速度甩出惯性；支持静态 3D 倾角、指针跟随倾斜、圆环描边与居中不旋转的中心内容，滚出视口即停帧。",
  tags: ["React", "CSS", "motion", "文字"],

  cardDescription: "文字绕环匀速旋转，悬停变档，抓住一甩带惯性飞转。",

  demoHint: "悬停看四种转速反应；开拖拽抓住圆环甩一巴掌看惯性衰减，再开倾斜移动指针。",

  api: API,
};
