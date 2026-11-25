/* Component metadata only — the live demo and gallery preview live in
   velocity-skew-list-demo.jsx, the framework source texts and the prompt in
   velocity-skew-list-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
export default {
  id: "velocity-skew-list",
  name: "速度倾斜列表",
  href: "velocity-skew-list.html",
  title: "速度倾斜列表",
  description: "340×340 列表场景：滚动越快卡片朝滚动方向倾斜越多并轻微拉伸，停止瞬间弹簧回正；慢速滚动不倾斜；底部显示当前滚动速度读数。",

  cardDescription: "列表随滚动速度倾斜回弹。",

  demoHint: "快速滚动看倾斜回弹与速度读数。",



  api: [
  {
    "name": "height",
    "type": "number",
    "default": "340",
    "description": "场景高度，逻辑像素；窄容器整景按比例缩小"
  },
  {
    "name": "reducedMotion",
    "type": "boolean",
    "default": "跟随系统",
    "description": "覆盖系统的减少动态偏好"
  }
],
};
