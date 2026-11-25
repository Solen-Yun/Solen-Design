import { createRoot } from "react-dom/client";

/* 封面截图台 —— 只给 scripts/shoot-covers.mjs 用，不进构建产物。

   驱动脚本按 id 调用 window.showCover(id)：页面渲染该组件的画廊卡预览
   （CardPreview，跟画廊里原来挂的是同一个），脚本随即把这块截成 PNG。
   一次只挂一个组件：WebGL 上下文有数量上限，一口气全挂会丢上下文。 */

const demos = import.meta.glob("./components/*-demo.jsx");
const root = createRoot(document.getElementById("stage"));

window.showCover = async (id) => {
  const importer = demos[`./components/${id}-demo.jsx`];
  if (!importer) throw new Error(`没有这个组件的演示文件：${id}`);
  const mod = await importer();
  if (!mod.CardPreview) throw new Error(`${id} 的演示文件没有导出 CardPreview`);
  root.render(<mod.CardPreview />);
  /* 等两帧，让入场动画和首帧布局落定再截图。 */
  await new Promise((resolve) =>
    requestAnimationFrame(() => requestAnimationFrame(resolve)),
  );
};
