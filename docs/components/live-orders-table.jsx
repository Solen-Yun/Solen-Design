/* Component metadata only — the live demo and gallery preview live in
   live-orders-table-demo.jsx, the framework source texts and the prompt in
   live-orders-table-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
export default {
  id: "live-orders-table",
  name: "实时订单表格",
  href: "live-orders-table.html",
  title: "实时订单表格",
  description: "340×340 数据看板场景：新订单每隔几秒从表格顶部滑入并短暂发光，下方行顺次下滑；点 Amount 或 Time 表头按该列排序并带行位飞换动画。",

  cardDescription: "新订单滑入发光，表头点击排序飞换。",

  demoHint: "看新订单滑入；点表头排序看行飞换。",



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
