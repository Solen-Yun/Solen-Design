/* Component metadata only — the live demo and gallery preview live in
   deep-agent-composer-demo.jsx, the framework source texts and the prompt in
   deep-agent-composer-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
export default {
  id: "deep-agent-composer",
  name: "Agent 对话输入框",
  href: "deep-agent-composer.html",
  title: "Agent 对话输入框",
  description:
    "Agent 对话输入框：自动增高的透明 textarea 配附件、权限菜单、上下文容量与模型/思考胶囊，点模型胶囊弹出连续变形菜单换模型和推理强度，Enter 经 onSubmit 提交。",

  cardDescription: "对话输入框：附件、权限、模型与思考强度菜单，Enter 提交。",

  demoHint: "输入文字试附件、@候选与权限菜单；点模型胶囊换模型和推理强度；Enter 提交看 onSubmit 输出，生成中开关试停止态。",



  api: [
    { name: "models", type: "string[]", default: '["标准模型", "推理模型"]', description: "模型菜单条目，仅用于界面演示" },
    { name: "selectedModel", type: "string", default: "第一个模型", description: "受控选中模型" },
    { name: "onModelChange", type: "(model) => void", default: "—", description: "选择模型时触发" },
    { name: "value / onValueChange", type: '"simple" | "medium" | "deep"', default: '"medium"', description: "推理强度档位与提交回调" },
    { name: "busy / stopping / onStop", type: "boolean / () => void", default: "false", description: "发送与停止状态；busy 且未传 onStop 时按钮禁用" },
    { name: "onSubmit", type: "(message) => void", default: "—", description: "Enter 提交，交出 text/model/thinking/attachments/skills/mentions/permission；接入方接真实 Agent" },
    { name: "onPermissionChange", type: "(permission) => void", default: "—", description: "权限预设变更时触发" },
    { name: "disabled", type: "boolean", default: "false", description: "把场景根设为 inert，停掉全部交互" },
    { name: "height", type: "number", default: "600", description: "场景高度，逻辑像素" },
    { name: "reducedMotion", type: "boolean", default: "跟随系统", description: "覆盖系统的减少动态偏好；保留完整交互状态" },
    { name: "thinking-change / model-change / permission-change 事件", type: "CustomEvent", default: "—", description: "在根元素派发，detail 携带对应值" },
  ],
};
