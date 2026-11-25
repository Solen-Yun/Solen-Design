/* Component metadata only — the live demo and gallery preview live in
   galaxy-effort-slider-demo.jsx, the framework source texts and the prompt in
   galaxy-effort-slider-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
export default {
  id: "galaxy-effort-slider",
  name: "脑形滑块粒子增强",
  href: "galaxy-effort-slider.html",
  title: "脑形滑块粒子增强",
  description:
    "深灰设置卡片里的粉红脑形滑块经过 Low 到 Galaxy 六档，思考强度越高脑形褶皱逐层生长，Galaxy 档轨道化为紫蓝像素网格并放射粒子，提交时派发 effort-change 事件。",

  cardDescription: "六档思考强度：脑形褶皱逐层长出，Galaxy 档轨道化为像素流。",

  demoHint: "拖动脑形或轨道换档，方向键逐档移动，End 直接到 Galaxy；右上问号有说明气泡。",



  api: [
    { name: "height", type: "number", default: "516", description: "场景高度，逻辑像素；窄容器整场景等比缩放" },
    { name: "reducedMotion", type: "boolean", default: "跟随系统", description: "覆盖系统的减少动态偏好；六档与静态像素保留，取消震动与放射流动" },
  ],
};
