/* Component metadata only — the live demo and gallery preview live in
   stepper-demo.jsx, the framework source texts and the prompt in
   stepper-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
/* Shared with stepper-sources.jsx — one copy for both the API table and the frameworks. */
export const API = [
  { name: "children", type: "ReactNode", default: "—", description: "每一步一个 <Step>；title/description/icon 装饰指示器" },
  { name: "step", type: "number", default: "—", description: "受控当前步（1..总步数，超过即完成态）" },
  { name: "initialStep", type: "number", default: "1", description: "非受控模式的起始步" },
  { name: "onStepChange", type: "(step: number) => void", default: "() => {}", description: "每步变化时回调" },
  { name: "onFinalStepCompleted", type: "() => void", default: "() => {}", description: "越过最后一步时回调" },
  { name: "indicator", type: '"numbers" | "dots" | "bars"', default: '"numbers"', description: "指示器样式；竖向布局固定用数字块" },
  { name: "orientation", type: '"horizontal" | "vertical"', default: '"horizontal"', description: "布局方向；竖向是左侧轨" },
  { name: "transition", type: '"slide" | "fade" | "none"', default: '"slide"', description: "步骤内容切换动画" },
  { name: "linear", type: "boolean", default: "false", description: "线性模式：只能跳到已到达过的步骤" },
  { name: "disableStepIndicators", type: "boolean", default: "false", description: "禁用指示器的点击跳转" },
  { name: "renderStepIndicator", type: "({ step, currentStep, onStepClick }) => ReactNode", default: "—", description: "自定义每格指示器的内容" },
  { name: "showFooter", type: "boolean", default: "true", description: "显示 Back/Continue 底栏" },
  { name: "backButtonText", type: "string", default: '"Back"', description: "返回按钮文字" },
  { name: "nextButtonText", type: "string", default: '"Continue"', description: "前进按钮文字" },
  { name: "completeButtonText", type: "string", default: '"Complete"', description: "最后一步的前进按钮文字" },
  { name: "backButtonProps", type: "object", default: "{}", description: "合并到返回按钮上的 props（preventDefault 可接管导航）" },
  { name: "nextButtonProps", type: "object", default: "{}", description: "合并到前进按钮上的 props" },
  { name: "completedContent", type: "ReactNode", default: "—", description: "完成后替换步骤内容" },
  { name: "theme", type: '"dark" | "light"', default: '"dark"', description: "外框与文字的明暗主题" },
  { name: "accentColor", type: "string", default: "—", description: "主按钮/徽标的强调色，文字按对比度自动取" },
  { name: "frame", type: "boolean", default: "true", description: "毛玻璃外框与描边" },
  { name: "radius", type: "number", default: "24", description: "外框圆角（px）" },
  { name: "width", type: "number | string", default: "440", description: "首选宽度；数字按 px 处理" },
  { name: "className", type: "string", default: '""', description: "根元素附加类名" },
  { name: "stepCircleContainerClassName", type: "string", default: '""', description: "头部容器附加类名" },
  { name: "stepContainerClassName", type: "string", default: '""', description: "头部容器附加类名" },
  { name: "contentClassName", type: "string", default: '""', description: "内容视口附加类名" },
  { name: "footerClassName", type: "string", default: '""', description: "底栏附加类名" },
  { name: "style", type: "CSSProperties", default: "—", description: "根元素内联样式" },
];

export default {
  id: "stepper",
  name: "弹性分步器",
  href: "stepper.html",
  title: "弹性分步器",
  description:
    "毛玻璃外框里的多步流程：指示器轨道上有一块会滑行回弹的磁贴高亮，步骤内容按方向滑入滑出并带高度动画，徽标完成时描画对勾；支持数字 / 圆点 / 进度条三种指示器、横竖两种布局（竖向为带描述的左轨）、线性可达性限制、受控用法与完成态收起底栏。",
  tags: ["React", "CSS", "弹簧动画", "流程"],

  cardDescription: "指示器高亮在步骤间滑行回弹，内容滑动切换，完成时自动收起。",

  demoHint: "点不同步骤看高亮滑行与内容换向；打开 linear 限制跳跃顺序，切竖向看左轨布局。",

  api: API,
};
