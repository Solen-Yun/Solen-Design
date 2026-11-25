/* Component metadata only — the live demo and gallery preview live in
   inline-text-morph-demo.jsx, the framework source texts and the prompt in
   inline-text-morph-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
export default {
  id: "inline-text-morph",
  name: "内联词组变形",
  href: "inline-text-morph.html",
  title: "内联词组变形",
  description:
    "白色场景里三行英文句子中的浅灰胶囊各自循环换词，相同字母的 DOM 节点按 FLIP 平移到新坐标而不是整词淡入淡出，胶囊宽度弹簧伸缩、整行平滑重新居中，方向键与 Home/End 可切换。",

  cardDescription: "三枚胶囊循环文字与贴纸图标，相同字母保留 DOM 身份连续变形。",

  demoHint: "点三个胶囊循环内容：设计语言、自定义项目、模型；方向键前后切换，Home/End 到首末。",



  api: [
    { name: "height", type: "number", default: "684", description: "场景高度，逻辑像素；窄容器整场景等比缩放" },
    { name: "reducedMotion", type: "boolean", default: "跟随系统", description: "覆盖系统的减少动态偏好；文字、宽度与图标直接到终值，点击与键盘仍可用" },
  ],
};
