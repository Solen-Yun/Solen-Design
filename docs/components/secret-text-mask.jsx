/* Component metadata only — the live demo and gallery preview live in
   secret-text-mask-demo.jsx, the framework source texts and the prompt in
   secret-text-mask-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
export default {
  id: "secret-text-mask",
  name: "光标藏句",
  href: "secret-text-mask.html",
  title: "光标藏句",
  description: "340×340 排版场景：大句浅灰铺底，圆形窗口跟随光标——窗内同一位置显示反色的另一句话；点击切换成对句子，focus 等价。",

  cardDescription: "圆形窗口内反色藏另一句。",

  demoHint: "移动光标看窗内句子，点击换对。",



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
