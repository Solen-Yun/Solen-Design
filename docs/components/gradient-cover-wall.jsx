/* Component metadata only — the live demo and gallery preview live in
   gradient-cover-wall-demo.jsx, the framework source texts and the prompt in
   gradient-cover-wall-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
export default {
  id: "gradient-cover-wall",
  name: "渐变卡片跟随",
  href: "gradient-cover-wall.html",
  title: "渐变卡片跟随",
  description:
    "3×2 渐变卡片墙：每卡线性渐变叠加四个缓慢漂移的径向色团与程序化噪点，五张卡带程序化 SVG 纹样（放射线、等高线、声波、圆点、透镜）；指针位置经欠阻尼弹簧驱动色团偏移与柔光跟随，键盘方向键调光源、Escape 复位，减少动态与多实例齐全。",

  cardDescription: "六张噪点渐变卡，指针弹簧驱动色团偏移与柔光跟随。",

  demoHint: "移动指针看色团偏移与柔光跟随；Tab 聚焦后方向键调光源、Escape 复位；色团始终缓慢漂移。",



  api: [
    { name: "height", type: "number", default: "750", description: "场景高度，逻辑像素；窄容器整场景等比缩放" },
    { name: "reducedMotion", type: "boolean", default: "跟随系统", description: "覆盖系统的减少动态偏好；停止漂移、弹簧与柔光，保留内容与焦点" },
  ],
};
