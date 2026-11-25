/* Component metadata only — the live demo and gallery preview live in
   reasoning-effort-slider-demo.jsx, the framework source texts and the prompt in
   reasoning-effort-slider-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
export default {
  id: "reasoning-effort-slider",
  name: "模型思考强度滑块",
  href: "reasoning-effort-slider.html",
  title: "模型思考强度滑块",
  description:
    "Deep Agent 模型菜单里独立的 264px「推理强度」三档滑块，轨道填充随位置从深灰蓝流到淡紫并缀柔光带与星点，点轨道、标签或方向键换档，拖动连续预览、松手吸附最近档，提交时发一次 onValueChange 与 thinking-change 事件。",

  cardDescription: "三档推理强度：星场轨道随档位流动变色，拖动带果冻变形与吸附。",

  demoHint: "拖动或点轨道换档，方向键逐档移动，Home/End 直达两端；拖动中连续预览，松手吸附最近档。",



  api: [
    { name: "value", type: '"simple" | "medium" | "deep"', default: '"medium"', description: "受控档位；运行时更新即时生效，取消手势回滚到已提交值" },
    { name: "onValueChange", type: "(value) => void", default: "—", description: "只在提交新档时触发一次" },
    { name: "disabled", type: "boolean", default: "false", description: "禁用所有指针与键盘操作" },
    { name: "height", type: "number", default: "420", description: "场景高度，逻辑像素" },
    { name: "reducedMotion", type: "boolean", default: "跟随系统", description: "覆盖系统的减少动态偏好；静态呈现当前档，不改变交互结果" },
    { name: "thinking-change 事件", type: "CustomEvent", default: "—", description: "提交新档时在根元素派发，detail.value 传递 UI 档位；模型参数映射由调用者实现" },
  ],
};
