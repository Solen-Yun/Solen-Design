/* Component metadata only — the live demo and gallery preview live in
   seat-price-calculator-demo.jsx, the framework source texts and the prompt in
   seat-price-calculator-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
export default {
  id: "seat-price-calculator",
  name: "席位价格计算器",
  href: "seat-price-calculator.html",
  title: "席位价格计算器",
  description: "340×340 定价页：拖动 Team size 滑杆，数字气泡跟随滑动、总价逐位滚动；越过 10/30 席位门槛时折扣徽标出现、单价变化，Monthly/Yearly 切换（年付送 2 个月）。",

  cardDescription: "滑杆席位计价，门槛折扣徽标。",

  demoHint: "拖席位滑杆看气泡与总价，切月付年付。",



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
