/* Component metadata only — the live demo and gallery preview live in
   card-swap-demo.jsx, the framework source texts and the prompt in
   card-swap-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
export default {
  id: "card-swap",
  name: "拖甩照片卡片",
  href: "card-swap.html",
  title: "拖甩照片卡片",
  description:
    "四张纵向照片叠成向右上延伸的立体牌组，甩动最前一张它沿直线退到最后、其余前移，拖动带橡皮筋阻尼与随位移旋转，全程只保留同一组四个 DOM 节点。",

  cardDescription: "甩动最前一张退到最后，其余卡片前移，橡皮筋阻尼跟手。",

  demoHint: "点击或甩动最前一张换位；短慢拖会弹回原位；Tab 聚焦后 Enter/Space 激活，换位后焦点跟随新队首。",



  api: [
    { name: "auto", type: "boolean", default: "false", description: "定时自动换位；仅在可见、未悬停、未拖动、无焦点且未减少动态时运行" },
    { name: "every", type: "number", default: "4", description: "自动换位间隔（秒），最小 1.5" },
    { name: "cards", type: "{ title; src }[]", default: "内嵌四图", description: "整组替换照片，必须恰好四个对象" },
    { name: "height", type: "number", default: "350", description: "场景高度，逻辑像素" },
    { name: "reducedMotion", type: "boolean", default: "跟随系统", description: "覆盖系统的减少动态偏好；手动换位仍即时生效" },
  ],
};
