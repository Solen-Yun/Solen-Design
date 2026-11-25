/* Component metadata only — the live demo and gallery preview live in
   tech-text-demo.jsx, the framework source texts and the prompt in
   tech-text-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
export default {
  id: "tech-text",
  name: "工程文字特效",
  href: "tech-text.html",
  title: "工程文字特效",
  description:
    "把一行字标画成工程图纸：指针所到之处字母变成虚线轮廓、选中框滑过并标出字符尺寸，字母可拖离基线由弹簧送回，点击传递冲击波，空闲自动巡游。",

  cardDescription: "字母在指针下变虚线轮廓，选中框滑过并标注尺寸，可拖拽弹回。",

  demoHint: "指针划过字母看轮廓化与选中框；拖一个字母松手看弹簧回位；点击字母看弹跳涟漪；切换入场动画重播。",



  api: [
    { name: "text", type: "string", default: '"Solen"', description: "要渲染的字标" },
    { name: "fontFamily", type: "string", default: '""', description: "字体族；留空继承容器字体" },
    { name: "fontWeight", type: "number", default: "600", description: "字标字重" },
    { name: "fontSize", type: "number", default: "150", description: "最大字号（px），自动缩小适配窄容器" },
    { name: "letterSpacing", type: "number", default: "-0.05", description: "字距（em）" },
    { name: "align", type: '"left" | "center" | "right"', default: '"center"', description: "水平对齐" },
    { name: "color", type: "string", default: '"currentColor"', description: "字母与轮廓颜色" },
    { name: "accentColor", type: "string", default: '"currentColor"', description: "选中框 / 标注 / 碎屑颜色" },
    { name: "reveal", type: '"area" | "letter" | "off"', default: '"letter"', description: "轮廓化方式" },
    { name: "reach", type: "number", default: "200", description: "轮廓化半径（px）" },
    { name: "softness", type: "number", default: "0.7", description: "过渡柔和度（0 硬边）" },
    { name: "dashLength", type: "number", default: "4", description: "虚线段长（px）" },
    { name: "dashGap", type: "number", default: "2", description: "虚线间隔（px）" },
    { name: "lineStyle", type: '"dashed" | "solid"', default: '"dashed"', description: "轮廓线型" },
    { name: "strokeWidth", type: "number", default: "1.5", description: "描边粗细（px）" },
    { name: "specks", type: "number", default: "15", description: "像素碎屑数量，0 关闭" },
    { name: "selection", type: "boolean", default: "true", description: "选中框" },
    { name: "labels", type: "boolean", default: "true", description: "框上标注" },
    { name: "draggable", type: "boolean", default: "true", description: "字母可拖拽" },
    { name: "bounce", type: "number", default: "0.4", description: "回弹过冲量（0–1）" },
    { name: "clickKick", type: "boolean", default: "true", description: "点击弹跳涟漪" },
    { name: "intro", type: '"none" | "type" | "assemble" | "metrics"', default: '"none"', description: "入场动画" },
    { name: "introDuration", type: "number", default: "2", description: "入场时长（秒）" },
    { name: "guides", type: "boolean", default: "false", description: "字体度量标线" },
    { name: "sweep", type: "boolean", default: "true", description: "空闲自动巡游" },
    { name: "speed", type: "number", default: "1", description: "巡游速度倍率" },
    { name: "className", type: "string", default: '""', description: "容器附加类名" },
    { name: "style", type: "CSSProperties", default: "—", description: "容器内联样式" },
  ],
};
