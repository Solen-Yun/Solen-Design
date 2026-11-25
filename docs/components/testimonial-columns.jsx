/* Component metadata only — the live demo and gallery preview live in
   testimonial-columns-demo.jsx, the framework source texts and the prompt in
   testimonial-columns-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
export default {
  id: "testimonial-columns",
  name: "双列好评墙",
  href: "testimonial-columns.html",
  title: "双列好评墙",
  description:
    "300×480 落地页好评墙：8 条带五星与作者色块的评论卡分两列反向无限滚动，左列 24s、右列 30s，上下边缘渐隐；金句以荧光笔 mark 高亮。悬停仅暂停所悬停的列并抬起指针下的卡片，键盘焦点同样生效；滚出视口自动暂停，减少动态时改为可纵向翻看的静态墙。",

  cardDescription: "双列评论反向滚动，金句荧光高亮，悬停暂停并抬起所指卡片。",

  demoHint: "两列以不同速度反向滚动；把指针停在某列上看它暂停、卡片抬起，再滚出视口看自动暂停。",



  api: [
    { name: "height", type: "number", default: "480", description: "场景高度，逻辑像素；窄容器整景按比例缩小" },
    { name: "reducedMotion", type: "boolean", default: "跟随系统", description: "覆盖系统的减少动态偏好；两列停止滚动、改为纵向翻看" },
  ],
};
