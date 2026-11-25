/* Component metadata only — the live demo and gallery preview live in
   otp-verification-demo.jsx, the framework source texts and the prompt in
   otp-verification-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
export default {
  id: "otp-verification",
  name: "验证码输入验证",
  href: "otp-verification.html",
  title: "验证码输入验证",
  description:
    "六位验证码胶囊：米白胶囊点开后展开成六格输入（真实原生输入承接光标、退格、方向键与整码粘贴），填满自动收起验证——123456 变绿色 Verified 胶囊，其余红格轻摇逐位清空；Escape 重置、自动演示播放错误与成功两条过程，减少动态保留全部状态。",

  cardDescription: "六位验证码胶囊：展开输入、验证、摇动报错或绿色通过。",

  demoHint: "点胶囊输入六位数字（123456 通过，其余报错摇动）；开启自动演示看错误与成功两条完整过程；Escape 重置。",



  api: [
    { name: "height", type: "number", default: "510", description: "场景高度，逻辑像素；窄容器整胶囊统一缩放" },
    { name: "autoPlay", type: "boolean", default: "false", description: "自动演示错误与成功两条完整过程" },
    { name: "onReplayComplete", type: "() => void", default: "—", description: "自动演示完成时回调" },
    { name: "reducedMotion", type: "boolean", default: "跟随系统", description: "覆盖系统的减少动态偏好；保留全部状态，去掉位移摇动与旋转" },
  ],
};
