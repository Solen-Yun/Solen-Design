/* Component metadata only — the live demo and gallery preview live in
   glass-folder-demo.jsx, the framework source texts and the prompt in
   glass-folder-sources.jsx. Keeps the registry cheap for the sidebar and grid. */
export default {
  id: "glass-folder",
  name: "玻璃文件夹展开",
  href: "glass-folder.html",
  title: "玻璃文件夹展开",
  description:
    "三张玻璃文件夹卡片：fBm 域扭曲生成的 aurora/ember/glacier 纹理被磨砂前板真实模糊，悬停纸张扇形展开，加号新文件落入、更多菜单键盘可用；纹理分帧生成、指针 3D 倾斜、减少动态与多实例齐全。",

  cardDescription: "磨砂玻璃文件夹悬停展开纸张扇，纹理由分形噪声分帧生成。",

  demoHint: "悬停看纸张升起，点击展开成扇形；加号新文件落入，··· 菜单支持键盘；移动指针看玻璃 3D 倾斜与高光。",



  api: [
    { name: "height", type: "number", default: "600", description: "场景高度，逻辑像素；文件夹随容器宽度等比缩放" },
    { name: "reducedMotion", type: "boolean", default: "跟随系统", description: "覆盖系统的减少动态偏好；纹理照常生成，移除长位移与过渡" },
  ],
};
