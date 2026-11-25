/* Component metadata only — the live demo and gallery preview live in
   bounding-box-resize-demo.jsx, the framework source texts and the prompt in
   bounding-box-resize-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
export default {
  id: "bounding-box-resize",
  name: "选框拖拽缩放",
  href: "bounding-box-resize.html",
  title: "选框拖拽缩放",
  description:
    "浅灰画面里的蓝色虚线选框带八个控制点，悬停或聚焦时同一条 SVG 路径从白方块连续变形为方向箭头，拖动实时改宽高并给出可编辑的尺寸胶囊，方向键 1px、Shift 10px，Escape 撤销。",

  cardDescription: "八个方块控制点连续变形成方向箭头，拖动时实时显示并可编辑宽高。",

  demoHint: "拖动四角或四边中点改尺寸；hover 控制点看它变成箭头；点开胶囊里的数字可以直接输入宽高。",



  api: [
    { name: "height", type: "number", default: "600", description: "场景高度，逻辑像素；窄容器整场景等比缩放，不重置选框尺寸" },
    { name: "reducedMotion", type: "boolean", default: "跟随系统", description: "覆盖系统的减少动态偏好；形状、尺寸与标签立即到位，拖动、键盘与输入仍可操作" },
  ],
};
