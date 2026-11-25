/* Component metadata only — the live demo and gallery preview live in
   morph-slider-demo.jsx, the framework source texts and the prompt in
   morph-slider-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
/* Shared with morph-slider-sources.jsx — one copy for both the API table and the frameworks. */
export const API = [
  { name: "items", type: "{ image: string; caption?: string }[]", default: "内置 4 张摄影图", description: "轮播的幻灯片；caption 显示在左下交叉淡入块；精确默认素材以代码内嵌为准" },
  { name: "startIndex", type: "number", default: "0", description: "起始幻灯片（变化时重置引擎）" },
  { name: "transition", type: '"melt" | "ripple" | "shear" | "swirl"', default: '"melt"', description: "位移场：噪声熔接 / 指针涟漪 / 切片错位 / 角向旋涡" },
  { name: "duration", type: "number", default: "1.1", description: "熔接时长（秒），也缩放字幕与圆点过渡" },
  { name: "ease", type: "string", default: '"power2.inOut"', description: "程序切换的补间缓动名" },
  { name: "intensity", type: "number", default: "0.55", description: "当前过渡的位移强度" },
  { name: "scale", type: "number", default: "2.4", description: "melt 过渡的噪声频率" },
  { name: "aberration", type: "number", default: "0.35", description: "过渡峰值处的色散强度" },
  { name: "drift", type: "number", default: "0.4", description: "静置时 UV 的呼吸漂移，0 关闭" },
  { name: "autoplay", type: "boolean", default: "false", description: "每 autoplayDelay 秒自动切下一张" },
  { name: "autoplayDelay", type: "number", default: "4", description: "自动播放间隔（秒，最小 1）" },
  { name: "loop", type: "boolean", default: "true", description: "首尾循环；false 则在两端停住" },
  { name: "radius", type: "number", default: "16", description: "根元素圆角（px）" },
  { name: "overlayColor", type: "string", default: '"#000000"', description: "边缘渐晕混入的颜色" },
  { name: "showCaptions", type: "boolean", default: "true", description: "渲染字幕交叉淡入块" },
  { name: "showControls", type: "boolean", default: "true", description: "渲染前后玻璃按钮" },
  { name: "showIndicators", type: "boolean", default: "true", description: "渲染圆点指示器" },
  { name: "className", type: "string", default: '""', description: "根元素附加类名" },
  { name: "...props", type: "—", default: "—", description: "其余属性透传到根元素" },
];

export default {
  id: "morph-slider",
  name: "位移熔接图轮播",
  href: "morph-slider.html",
  title: "位移熔接图轮播",
  description:
    "两张图之间不是淡入淡出而是「熔接」：WebGL 片元着色器提供四种位移场——分形噪声熔接、以指针为圆心的涟漪、切片错位擦除、角向旋涡——切换峰值处叠加 RGB 色散，静置时 UV 以噪声呼吸保持画面微动。拖拽舞台可直接搓动熔接进度（超过 40% 提交、否则回弹），玻璃前后按钮、可变宽圆点指示器、悬停暂停的自动播放与键盘方向键齐备，字幕以模糊交叉淡入跟随切换，reduced-motion 退化为纯交叉淡化。",
  tags: ["React", "WebGL", "补间动画", "轮播"],

  cardDescription: "图片经噪声位移互相熔化，拖拽可直接搓动过渡。",

  demoHint: "按住拖动搓熔接，换四种过渡场，拖快看色散峰值。",

  api: API,
};
