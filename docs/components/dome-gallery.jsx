/* Component metadata only — the live demo and gallery preview live in
   dome-gallery-demo.jsx, the framework source texts and the prompt in
   dome-gallery-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
/* Shared with dome-gallery-sources.jsx — one copy for both the API table and the frameworks. */
export const API = [
  { name: "images", type: "(string | { src: string; alt?: string })[]", default: "内置 7 张摄影图", description: "铺满穹顶瓦片的图片池，循环复用填满所有瓦片；精确默认素材以代码内嵌为准" },
  { name: "fit", type: "number", default: "0.5", description: "穹顶半径占所选基准尺寸的比例" },
  { name: "fitBasis", type: '"auto" | "min" | "max" | "width" | "height"', default: '"auto"', description: "半径取哪个容器尺寸；auto 在宽扁容器取宽度，否则取短边" },
  { name: "minRadius", type: "number", default: "600", description: "计算半径的下限（px）" },
  { name: "maxRadius", type: "number", default: "Infinity", description: "计算半径的上限（px）" },
  { name: "padFactor", type: "number", default: "0.25", description: "放大查看器四周留白占容器短边的比例" },
  { name: "overlayBlurColor", type: "string", default: '"#120F17"', description: "穹顶边缘融入的背景色，也是主背景色" },
  { name: "maxVerticalRotationDeg", type: "number", default: "5", description: "穹顶可上下俯仰的角度上限" },
  { name: "dragSensitivity", type: "number", default: "20", description: "每度旋转需要的拖拽像素数，越大越迟钝" },
  { name: "enlargeTransitionMs", type: "number", default: "300", description: "瓦片放大/收回的过渡时长（ms）" },
  { name: "segments", type: "number", default: "35", description: "穹顶一圈的瓦片列数，也决定单块瓦片的角尺寸" },
  { name: "dragDampening", type: "number", default: "2", description: "惯性手感 0–1：越大摩擦越强、滑行越久" },
  { name: "openedImageWidth", type: "string", default: '"400px"', description: "放大层落到取景框后的宽度，任意 CSS 尺寸" },
  { name: "openedImageHeight", type: "string", default: '"400px"', description: "放大层落到取景框后的高度，任意 CSS 尺寸" },
  { name: "imageBorderRadius", type: "string", default: '"30px"', description: "穹顶瓦片的圆角" },
  { name: "openedImageBorderRadius", type: "string", default: '"30px"', description: "放大层的圆角" },
  { name: "grayscale", type: "boolean", default: "true", description: "所有图片以灰度渲染" },
];

export default {
  id: "dome-gallery",
  name: "半球穹顶画廊",
  href: "dome-gallery.html",
  title: "半球穹顶画廊",
  description:
    "把一整圈图片瓦片贴在内半球面上的沉浸式画廊：CSS 3D 透视把瓦片投影到穹顶内侧，拖拽横向旋转、纵向小角度俯仰，松手带惯性滑行；图片池循环铺满瓦片且相邻不重复。点击瓦片时先反向旋转把瓦片摆正，再用 FLIP 过渡把图放大到中央取景框并二次缩放到设定尺寸，遮罩点击或 Esc 收回；边缘径向渐变与模糊把穹顶融进背景，容器缩放时实时重算半径。",
  tags: ["React", "CSS 3D", "拖拽交互"],

  cardDescription: "图片贴在内半球面上，拖拽旋转穹顶，点击瓦片飞出到中央放大。",

  demoHint: "按住拖拽转穹顶、快速甩动看惯性滑行；点击任意瓦片看放大飞出，Esc 或点遮罩收回。",

  api: API,
};
