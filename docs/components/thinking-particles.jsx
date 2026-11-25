/* Component metadata only — the live demo and gallery preview live in
   thinking-particles-demo.jsx, the framework source texts and the prompt in
   thinking-particles-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
export default {
  id: "thinking-particles",
  name: "思考步骤粒子变形",
  href: "thinking-particles.html",
  title: "思考步骤粒子变形",
  description:
    "浅灰画布上的黑白方格抖色粒子：放大镜、魔方、积木、机械臂、礼盒五种 3D 实体随思考步骤依次弧线变形，魔方分层转动、机械臂关节摆动，20 秒收起并流式输出礼物建议；暂停/重播/真实复制/赞踩与减少动态齐全。",

  cardDescription: "方格抖色粒子依次变五个 3D 实体，20 秒后收起流式出答案。",

  demoHint: "看粒子弧线变形与步骤累计，20 秒后收起并流式显示回答；左右方向键或拖动旋转模型，暂停冻结计时。",



  api: [
    { name: "height", type: "number", default: "810", description: "场景高度，逻辑像素；窄容器整场景等比缩放" },
    { name: "reducedMotion", type: "boolean", default: "跟随系统", description: "覆盖系统的减少动态偏好；直接显示完整回答，最终图形与按钮保留" },
  ],
};
