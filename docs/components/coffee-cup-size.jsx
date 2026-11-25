/* Component metadata only — the live demo and gallery preview live in
   coffee-cup-size-demo.jsx, the framework source texts and the prompt in
   coffee-cup-size-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
export default {
  id: "coffee-cup-size",
  name: "随杯型变化的咖啡杯",
  href: "coffee-cup-size.html",
  title: "随杯型变化的咖啡杯",
  description: "300×500 点单场景：选 Small/Regular/Large，咖啡杯平滑伸缩到新杯型，咖啡液以水流注入并停在对应液位；每加一份 shot 液色加深，价格与 Milk 开关联动。",

  cardDescription: "杯型伸缩水流注入液位联动。",

  demoHint: "切杯型看水流注入，加 shot 看色深与价格。",



  api: [
  {
    "name": "height",
    "type": "number",
    "default": "500",
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
