/* Component metadata only — the live demo and gallery preview live in
   transfer-glow-demo.jsx, the framework source texts and the prompt in
   transfer-glow-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
export default {
  id: "transfer-glow",
  name: "转账光雾确认",
  href: "transfer-glow.html",
  title: "转账光雾确认",
  description:
    "支付确认弹窗确认后文字渐次模糊、粉金光雾与上浮微粒在弹窗内漂移，处理完成后无缝落定为成功态，Done 关闭回到仪表盘。",

  cardDescription: "确认后光雾升起、文字模糊，两步状态提示后落定成功态；Done 关闭回到仪表盘。",

  demoHint: "点击 Confirm & Send 看光雾处理动画；完成后点 Done 关闭，再用 Review transfer 重新打开，Esc 也可关闭。",



  api: [
    { name: "open", type: "boolean", default: "true", description: "是否弹出确认弹窗；false 时显示仪表盘与“Review transfer”按钮" },
    { name: "amount", type: "string", default: '"100,000.00"', description: "转账金额的数字部分" },
    { name: "account", type: "string", default: '"Grain USD account"', description: "From 行的转出账户名" },
    { name: "recipient", type: "string", default: '"Müller Logistik GmbH"', description: "To 行的收款方名称" },
    { name: "receivedAmount", type: "string", default: '"€92,000.00"', description: "Recipient receives 行的到账金额" },
    { name: "duration", type: "number", default: "5200", description: "处理动画时长（毫秒），clamp 1200–15000" },
    { name: "height", type: "number", default: "840", description: "场景高度，逻辑像素" },
    { name: "reducedMotion", type: "boolean", default: "跟随系统", description: "覆盖系统的减少动态偏好；处理进度仍分两步推进并完成" },
    { name: "onComplete", type: "() => void", default: "—", description: "处理完成进入成功态时回调" },
    { name: "onOpenChange", type: "(open: boolean) => void", default: "—", description: "用户操作导致弹窗开合时回调" },
  ],
};
