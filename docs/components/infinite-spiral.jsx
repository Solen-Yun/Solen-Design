/* Component metadata only — the live demo and gallery preview live in
   infinite-spiral-demo.jsx, the framework source texts and the prompt in
   infinite-spiral-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
export default {
  id: "infinite-spiral",
  name: "无限螺旋画廊",
  href: "infinite-spiral.html",
  title: "无限螺旋画廊",
  description:
    "3D 螺旋排列的图片卡片沿纵轴无限行进：每 7 张卡绕一整圈，近处的卡片透视放大、中心卡额外提亮放大，边缘渐隐加模糊。自动行进时悬停平滑停驻，滚动页面或垂直拖拽也能驱动螺旋（三种交互可任意组合），进度全部走指数混合、无跳变；滚出视口自动暂停，减少动态落成完整静帧。",

  cardDescription: "图片卡片绕纵轴螺旋行进，悬停平滑停驻，可拖拽可联动滚动。",

  demoHint: "画廊自动向上行进；悬停会平滑停驻，按住垂直拖拽或滚动页面都能驱动螺旋。",



  api: [
    { name: "items", type: "(string | SpiralItem)[]", default: "[]", description: "螺旋中的图片：src 必填，可选 alt/href/target/label/id；更新时重建卡片" },
    { name: "animationMode", type: '"auto" | "drag" | "scroll" | "all"', default: '"auto"', description: "自动行进 / 指针拖拽 / 页面滚动联动 / 三者同时启用" },
    { name: "speed", type: "number", default: "0.55", description: "自动行进速度（张/秒），也是滚动联动的灵敏度系数" },
    { name: "direction", type: '"up" | "down"', default: '"up"', description: "行进方向" },
    { name: "pauseOnHover", type: "boolean", default: "true", description: "悬停时自动行进平滑减速到 0，离开后平滑恢复" },
    { name: "radius", type: "number", default: "170", description: "螺旋的深度半径（px）" },
    { name: "cardWidth / cardHeight", type: "number", default: "100 / 100", description: "卡片尺寸（px），窄容器整景等比缩小" },
    { name: "verticalSpacing", type: "number", default: "60", description: "相邻卡片在行进轴上的间距（px）" },
    { name: "perspective", type: "number", default: "1000", description: "3D 舞台的 CSS 透视（px）" },
    { name: "cardsPerTurn", type: "number", default: "7", description: "绕一整圈使用的卡片数" },
    { name: "rotation / cardTilt", type: "number", default: "0 / 0", description: "全局角度偏移 / 附加顺时针倾斜（度）" },
    { name: "cardRadius", type: "number", default: "10", description: "卡片圆角（px）" },
    { name: "centerScale", type: "number", default: "1.2", description: "中心附近卡片的放大倍数" },
    { name: "edgeFade / edgeBlur", type: "number", default: "0.3 / 6", description: "边缘渐隐区间占比 / 边缘最大模糊（px）" },
    { name: "imageFit / grayscale", type: '"cover" | "contain" / number', default: '"cover" / 0', description: "图片填充方式 / 整组置灰（0–1）" },
    { name: "height", type: "number", default: "480", description: "场景高度，逻辑像素；窄容器整景按比例缩小" },
    { name: "reducedMotion", type: "boolean", default: "跟随系统", description: "覆盖系统的减少动态偏好；自动行进停用，滚动与拖拽仍即时重绘" },
  ],
};
