/* Component metadata only — the live demo and gallery preview live in
   bouncy-access-request-demo.jsx, the framework source texts and the prompt in
   bouncy-access-request-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
export default {
  id: "bouncy-access-request",
  name: "访问申请展开",
  href: "bouncy-access-request.html",
  title: "访问申请展开",
  description:
    "深色胶囊访问申请：收起时两枚头像叠放与申请文案，点开弹性长高成四行成员列表（程序化 SVG 人脸头像、Approve / Reject 按钮、红点计数徽章），同一头像节点从堆叠连续落位；展开与收起双缓动、快速切换可平滑反向，减少动态直接落位。",

  cardDescription: "深色胶囊点开弹性展开成员列表，头像从堆叠连续落位。",

  demoHint: "点胶囊或折线按钮展开成员列表，Approve / Reject 是视觉演示；再点折线收起，快速切换可平滑反向。",



  api: [
    { name: "height", type: "number", default: "460", description: "场景高度，逻辑像素；窄容器整景按比例缩小" },
    { name: "reducedMotion", type: "boolean", default: "跟随系统", description: "覆盖系统的减少动态偏好；直接切换最终坐标" },
  ],
};
