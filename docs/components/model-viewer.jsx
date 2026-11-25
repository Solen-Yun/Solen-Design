/* Component metadata only — the live demo and gallery preview live in
   model-viewer-demo.jsx, the framework source texts and the prompt in
   model-viewer-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
/* Shared with model-viewer-sources.jsx — one copy for both the API table and the frameworks. */
export const API = [
  { name: "url", type: "string", default: "—", description: "模型地址；按扩展名自动选择 .glb/.gltf/.fbx/.obj 加载器" },
  { name: "width", type: "number", default: "400", description: "展台宽度（px）" },
  { name: "height", type: "number", default: "400", description: "展台高度（px）" },
  { name: "environment", type: '"studio" | "city" | "sunset" | "dawn" | "night" | "warehouse" | "forest" | "apartment" | "park" | "lobby" | "none"', default: '"studio"', description: "HDRI 环境预设；none 只用灯光" },
  { name: "environmentIntensity", type: "number", default: "1", description: "环境贴图亮度" },
  { name: "exposure", type: "number", default: "1", description: "色调映射曝光" },
  { name: "autoRotate", type: "boolean", default: "true", description: "空闲时缓慢自转" },
  { name: "autoRotateSpeed", type: "number", default: "0.4", description: "自转角速度（rad/s）" },
  { name: "autoRotateDelay", type: "number", default: "2", description: "停止交互多少秒后开始自转" },
  { name: "dragRotate", type: "boolean", default: "true", description: "拖拽旋转模型" },
  { name: "turntable", type: "boolean", default: "false", description: "转台模式：锁定俯仰角，只水平旋转" },
  { name: "zoom", type: "boolean", default: "true", description: "双指捏合 / ctrl+滚轮缩放" },
  { name: "minZoom", type: "number", default: "0.7", description: "缩放下限" },
  { name: "maxZoom", type: "number", default: "2", description: "缩放上限" },
  { name: "hoverTilt", type: "number", default: "0.15", description: "光标悬停时模型朝向光标的倾角（rad）" },
  { name: "float", type: "number", default: "0.3", description: "待机上下悬浮的幅度，0 关闭" },
  { name: "shadow", type: "boolean", default: "true", description: "模型底部的柔和接触阴影" },
  { name: "shadowOpacity", type: "number", default: "0.45", description: "接触阴影不透明度" },
  { name: "intro", type: '"rise" | "spin" | "none"', default: '"rise"', description: "入场动画：升起 / 旋入 / 关闭" },
  { name: "startAngle", type: "number", default: "-30", description: "初始水平角度（deg）" },
  { name: "tilt", type: "number", default: "10", description: "初始俯仰角（deg），转台模式下锁定" },
  { name: "offsetX", type: "number", default: "0", description: "水平偏移（半视高比例）" },
  { name: "offsetY", type: "number", default: "0", description: "竖直偏移（半视高比例）" },
  { name: "fit", type: "number", default: "0.8", description: "模型占画面比例，越小留白越多" },
  { name: "resetOnDoubleClick", type: "boolean", default: "true", description: "双击回到初始姿态（yaw 就近回正，不倒转）" },
  { name: "className", type: "string", default: '""', description: "容器附加类名" },
  { name: "style", type: "CSSProperties", default: "—", description: "容器内联样式" },
  { name: "onModelLoaded", type: "() => void", default: "—", description: "模型首次上台时回调" },
];

export default {
  id: "model-viewer",
  name: "模型展台",
  href: "model-viewer.html",
  title: "模型展台",
  description:
    "产品级的 3D 模型展台：自动量取模型包围盒归一化取景，悬浮在柔和接触阴影上方；支持拖拽惯性旋转、捏合/ctrl 滚轮缩放、光标倾斜、空闲自转、双击回正和升起/旋入两种入场。基于 React Three Fiber 的 demand 渲染，静止即停帧，离屏暂停。",
  tags: ["React", "three.js", "React Three Fiber", "3D"],

  cardDescription: "自动取景的 3D 模型展台，悬浮旋转、拖拽甩动、双击回正。",

  demoHint: "拖住模型甩一圈看惯性衰减；双击回正，把 intro 换成 spin 看旋入入场。",

  api: API,
};
