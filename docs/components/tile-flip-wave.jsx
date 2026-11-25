/* Component metadata only — the live demo and gallery preview live in
   tile-flip-wave-demo.jsx, the framework source texts and the prompt in
   tile-flip-wave-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
export default {
  id: "tile-flip-wave",
  name: "波纹翻块画",
  href: "tile-flip-wave.html",
  title: "波纹翻块画",
  description: "340×340 8×8 瓷砖画：按压处为起点、涟漪扩散逐格翻面（3D rotateY），整体换成背面另一幅画；Rearrange 重置；Press a tile 亦可从该格起波。",

  cardDescription: "涟漪扩散逐格翻面换画。",

  demoHint: "点 Flip 看波纹翻块，Press a tile 换起点。",



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
