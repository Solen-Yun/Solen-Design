/* Component metadata only — the live demo and gallery preview live in
   seo-preview-demo.jsx, the framework source texts and the prompt in
   seo-preview-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
export default {
  id: "seo-preview",
  name: "搜索预览实时跟随",
  href: "seo-preview.html",
  title: "搜索预览实时跟随",
  description: "340×340 站点设置场景：输入标题与描述，下方搜索引擎结果预览逐键跟随，两字段下的用量条按字符数充填并在超限时变色。",

  cardDescription: "SEO 预览逐键跟随，用量条提示长度。",

  demoHint: "输入标题描述看预览与用量条。",



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
