/* Component metadata only — the live demo and gallery preview live in
   slot-booking-demo.jsx, the framework source texts and the prompt in
   slot-booking-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
export default {
  id: "slot-booking",
  name: "预约时段拆分确认",
  href: "slot-booking.html",
  title: "预约时段拆分确认",
  description: "340×340 预约组件：选日期条上的一天，该日可用时段自下依次升起；点某时段按钮分裂成时长与确认两段，确认后显示预约成功（邮件与日历提示）。",

  cardDescription: "时段升起，点选分裂确认。",

  demoHint: "选日期看时段升起，点时段确认。",



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
