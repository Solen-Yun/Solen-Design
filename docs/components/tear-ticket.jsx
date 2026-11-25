/* Component metadata only — the live demo and gallery preview live in
   tear-ticket-demo.jsx, the framework source texts and the prompt in
   tear-ticket-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
/* Shared with tear-ticket-sources.jsx — one copy for both the API table and the frameworks. */
export const API = [
  { name: "children", type: "ReactNode", default: "null", description: "票身内容：撕完留下的部分" },
  { name: "stub", type: "ReactNode", default: "null", description: "副券内容：会被撕走的部分" },
  { name: "image", type: "string", default: '""', description: "票身插图地址，画在圆角图窗里" },
  { name: "imageAlt", type: "string", default: '""', description: "插图替代文本" },
  { name: "scrim", type: "boolean", default: "true", description: "插图上的渐变遮罩，向票底色过渡" },
  { name: "imageRadius", type: "number", default: "8", description: "图窗圆角（px）" },
  { name: "orientation", type: '"horizontal" | "vertical"', default: '"horizontal"', description: "副券在右侧或在底部" },
  { name: "torn", type: "boolean", default: "—", description: "受控已撕状态；不传则组件自持状态" },
  { name: "defaultTorn", type: "boolean", default: "false", description: "非受控时的初始状态" },
  { name: "onTear", type: "() => void", default: "—", description: "副券撕落完成时回调" },
  { name: "width", type: "number", default: "460", description: "设计宽度（px），容器更窄时整体等比缩小" },
  { name: "height", type: "number", default: "250", description: "设计高度（px）" },
  { name: "stubSize", type: "number", default: "150", description: "副券宽度（或高度）（px）" },
  { name: "radius", type: "number", default: "16", description: "票据圆角（px）" },
  { name: "holes", type: "number", default: "12", description: "撕裂线上的打孔数" },
  { name: "holeSize", type: "number", default: "6", description: "每个打孔的直径（px）" },
  { name: "notch", type: "number", default: "3", description: "撕裂线两端的圆肩内缩（px）" },
  { name: "roughness", type: "number", default: "0", description: "撕裂线抖动幅度（px），0 为整齐切口" },
  { name: "tearAngle", type: "number", default: "30", description: "撕断前的最大翻折角（度）" },
  { name: "stretch", type: "number", default: "30", description: "纸纤维断裂前的拉伸上限（px）" },
  { name: "resistance", type: "number", default: "0.45", description: "完好纤维对拉拽的阻尼 0–0.95" },
  { name: "rotate", type: "number", default: "4", description: "悬停透视面的基础旋转（度）" },
  { name: "tilt", type: "boolean", default: "true", description: "启用悬停视差倾斜" },
  { name: "tiltMax", type: "number", default: "9", description: "倾斜幅度（度）" },
  { name: "tiltReach", type: "number", default: "260", description: "指针距中心多远达到满倾斜（px）" },
  { name: "parallax", type: "number", default: "6", description: "插图在图窗内的视差位移（px）" },
  { name: "perspective", type: "number", default: "1000", description: "透视面 CSS perspective（px）" },
  { name: "background", type: "string", default: '"#27272a"', description: "票纸底色" },
  { name: "color", type: "string", default: '"#f5f5f5"', description: "墨色：文字、描边混色" },
  { name: "border", type: "boolean", default: "true", description: "沿两块纸形绘制描边轮廓" },
  { name: "borderColor", type: "string", default: '""', description: "描边颜色；留空用 16% 墨色混合" },
  { name: "borderWidth", type: "number", default: "1", description: "描边宽度" },
  { name: "stubBackground", type: "string", default: '""', description: "副券纸色；留空同票身" },
  { name: "recenter", type: "boolean", default: "true", description: "撕完后舞台平移半张副券重新居中" },
  { name: "disabled", type: "boolean", default: "false", description: "禁用撕取并置灰" },
  { name: "ariaLabel", type: "string", default: '"Tear off the stub"', description: "副券的可访问名称" },
  { name: "className", type: "string", default: '""', description: "根元素附加类名" },
];

export default {
  id: "tear-ticket",
  name: "撕副券票据",
  href: "tear-ticket.html",
  title: "撕副券票据",
  description:
    "一张能动手撕的票：副券沿打孔线被捏住后绕最近一端翻折，桥接的纸纤维以二次贝塞尔拉伸、变细、逐根崩断回缩；最后一根断开后副券跟手摆动，松手带重力自旋坠落淡出，票身平移补位并压暗、插图褪成灰调。撕线几何（孔数、孔径、圆肩、毛边抖动）按 props 确定性生成，两块纸形用 clip-path path 裁剪，另有悬停透视视差、键盘瞬间撕取与 reduced-motion 降级。",
  tags: ["React", "CSS", "Motion", "图形"],

  cardDescription: "捏住副券撕下去，纤维逐根崩断，副券坠落实票身补位。",

  demoHint: "按住副券向外撕，慢撕看纤维逐根断、快撕看整片坠落；撕完用 Reset 复原；调 roughness 做毛边。",

  api: API,
};
