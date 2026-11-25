/* Component metadata only — the live demo and gallery preview live in
   blur-in-quote-demo.jsx, the framework source texts and the prompt in
   blur-in-quote-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
export default {
  id: "blur-in-quote",
  name: "逐词聚焦引言",
  href: "blur-in-quote.html",
  title: "逐词聚焦引言",
  description: "340×330 引言场景：引言的词先失焦浮起，再按次序逐词聚焦落定；切下一条时当前词重新失焦散开。引言作者行与 Next 控件可用。",

  cardDescription: "引言词逐个失焦到聚焦。",

  demoHint: "看逐词聚焦，Next 换条。",



  api: [
  {
    "name": "height",
    "type": "number",
    "default": "330",
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
