/* Component metadata only — the live demo and gallery preview live in
   infinite-menu-demo.jsx, the framework source texts and the prompt in
   infinite-menu-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
/* Shared with infinite-menu-sources.jsx — one copy for both the API table and the frameworks. */
export const REACT_API = [
  { name: "items", type: "{ image, title?, description?, link? }[]", default: "[]", description: "条目数组；少于瓦片数时在球面循环复用，相邻瓦片不重复同一条目" },
  { name: "count", type: "number", default: "160", description: "球面瓦片数量，clamp 6–400" },
  { name: "tileSize", type: "number", default: "0.63", description: "瓦片相对间距的大小，低值间隙更宽，0.2–1.2" },
  { name: "roundness", type: "number", default: "0.2", description: "瓦片形状，0 方形到 1 圆形" },
  { name: "zoom", type: "number", default: "1.65", description: "静止时相机贴近活动瓦片的程度，0.2–4" },
  { name: "pullBack", type: "number", default: "1", description: "拖动时相机后撤距离，0 不动，0–3" },
  { name: "stretch", type: "number", default: "0.6", description: "快速运动时瓦片的拉伸量，0–3" },
  { name: "inertia", type: "number", default: "0.6", description: "松手后球体延续旋转的时长，0–1" },
  { name: "autoplay", type: "number", default: "3", description: "自动步进到下一瓦的间隔秒数，0 关闭；悬停和聚焦暂停" },
  { name: "grayscale", type: "boolean", default: "true", description: "非活动瓦片显示为灰阶" },
  { name: "dim", type: "number", default: "0.5", description: "停稳后周围瓦片向背景色压暗的程度，0–1" },
  { name: "intro", type: "boolean", default: "true", description: "加载时球体旋转入场" },
  { name: "showInfo", type: "boolean", default: "true", description: "显示活动条目的标题、描述与动作按钮" },
  { name: "renderInfo", type: "(item, index, moving) => ReactNode", default: "—", description: "替换默认标题/描述/按钮的自定义浮层" },
  { name: "theme", type: '"dark" | "light"', default: '"dark"', description: "文字、按钮与占位瓦片的配色" },
  { name: "accentColor", type: "string", default: "—", description: "动作按钮底色；省略时跟随文字色" },
  { name: "backgroundColor", type: "string", default: "—", description: "球体背后的背景色；默认透明" },
  { name: "onActiveChange", type: "(item, index) => void", default: "—", description: "新条目停稳到正前方时回调" },
  { name: "onItemClick", type: "(item, index) => void", default: "—", description: "点击活动瓦片或按钮、按 Enter 时回调；未提供且条目带 link 则打开链接" },
  { name: "className", type: "string", default: '""', description: "容器附加类名" },
  { name: "style", type: "CSSProperties", default: "—", description: "容器内联样式" },
];


export default {
  id: "infinite-menu",
  name: "无限菜单球",
  href: "infinite-menu.html",
  title: "无限菜单球",
  description:
    "图片瓦片贴满三维球面，拖动带惯性旋转，松手后最近瓦片停到正前方放大对焦、其余去色压暗，方向键逐瓦导航、Enter 激活，单个 WebGL2 程序实例化绘制、静止即停帧。",

  cardDescription: "图片瓦片贴满球面，拖动带惯性旋转，最近瓦片对焦在正前方。",

  demoHint: "拖动甩动球体看惯性与后撤，短按拾取瓦片；方向键逐瓦导航，Enter 激活；悬停暂停自动播放。",



  api: REACT_API,
};
