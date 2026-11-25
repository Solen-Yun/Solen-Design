/* Component metadata only — the live demo and gallery preview live in
   folder-demo.jsx, the framework source texts and the prompt in
   folder-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
/* Shared with folder-sources.jsx — one copy for both the API table and the frameworks. */
export const API = [
  { name: "items", type: "{ title?: string; description?: string; image?: string; alt?: string; content?: ReactNode }[]", default: "DEFAULT_ITEMS", description: "页面内容；无 children 时生效，最多 6 页" },
  { name: "label", type: "string", default: "—", description: "文件夹标签上的文字，也决定标签宽度" },
  { name: "mode", type: '"flap" | "book"', default: '"flap"', description: "前盖向上翻开，或像书一样绕书脊旋转打开" },
  { name: "variant", type: '"solid" | "glass" | "matte"', default: '"solid"', description: "前面板材质；glass 会叠加 WebGL 折射玻璃" },
  { name: "color", type: "string", default: '"#3d8bff"', description: "文件夹主色，联动内部色调、标签文字与玻璃染色" },
  { name: "paperColor", type: "string", default: '"#ffffff"', description: "纸张颜色" },
  { name: "tabPosition", type: '"left" | "center" | "right"', default: '"right"', description: "标签在顶边的位置" },
  { name: "layout", type: '"spread" | "row" | "stack"', default: '"spread"', description: "打开后页面的排布方式" },
  { name: "size", type: "number", default: "1", description: "整体缩放倍率（最小 0.3）" },
  { name: "openOn", type: '"click" | "hover"', default: '"click"', description: "什么动作打开文件夹" },
  { name: "open", type: "boolean", default: "—", description: "受控开合状态，传入后组件不再自持状态" },
  { name: "defaultOpen", type: "boolean", default: "false", description: "初始开合状态（非受控模式）" },
  { name: "onOpenChange", type: "(open: boolean) => void", default: "—", description: "开合状态变化时回调" },
  { name: "onItemClick", type: "(item, index) => void", default: "—", description: "页面被点击时回调（同时切换放大）" },
  { name: "onItemDrop", type: "(item, index, intoFolder: boolean) => void", default: "—", description: "拖拽页面落定后回调" },
  { name: "draggable", type: "boolean", default: "true", description: "页面是否可以拖到桌面或拖回夹内" },
  { name: "zoomOnClick", type: "boolean", default: "true", description: "点击打开后的页面是否放大到前景" },
  { name: "peek", type: "boolean", default: "true", description: "悬停时先微微掀开一条缝" },
  { name: "intro", type: "boolean", default: "true", description: "进入视口时播放撒纸入场" },
  { name: "tilt", type: "number", default: "0.5", description: "跟随指针的桌面倾斜量 0–1.5" },
  { name: "bounce", type: "number", default: "0.4", description: "所有运动的弹簧回弹 0–1" },
  { name: "speed", type: "number", default: "1", description: "全局弹簧速度 0.2–3" },
  { name: "frost", type: "number", default: "0.25", description: "玻璃面板的模糊与雾度 0–1" },
  { name: "closeOnOutsideClick", type: "boolean", default: "true", description: "外部按下或 Escape 时关闭" },
  { name: "theme", type: '"dark" | "light"', default: '"dark"', description: "阴影与玻璃染色的明暗基调" },
  { name: "className", type: "string", default: '""', description: "根元素附加类名" },
  { name: "style", type: "CSSProperties", default: "—", description: "根元素内联样式" },
  { name: "children", type: "ReactNode", default: "—", description: "自定义页面内容，优先于 items" },
];

export default {
  id: "folder",
  name: "翻盖文件夹",
  href: "folder.html",
  title: "翻盖文件夹",
  description:
    "桌面文件夹：前盖向上翻开或像书一样绕书脊旋转，悬停先掀缝 peek，纸张逐张弹入夹内；页面可点击放大到前景，也可拖出文件夹甩到桌面上、再拖回去触发接纸动画；glass 材质用 WebGL2 把前面板渲染成真正折射玻璃，24 弹簧引擎 240Hz 积分、稳定自睡，支持 spread/row/stack 三种页排布与任意主题色。",
  tags: ["React", "CSS", "WebGL"],

  cardDescription: "掀盖 peek、纸张弹入，页面可拖到桌面再拖回夹内。",

  demoHint: "悬停看掀缝，点开夹子；拖一张纸到桌面再拖回去看接纸动画；切 book 模式和 glass 材质。",

  api: API,
};
