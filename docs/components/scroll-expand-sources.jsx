import { API } from "./scroll-expand.jsx";
import entrySource from "../../src/components/scroll-expand/ScrollExpand.jsx?raw";
import cssSource from "../../src/components/scroll-expand/ScrollExpand.css?raw";
import specSource from "../../src/components/scroll-expand/SPEC.md?raw";

const DEP_NOTE = "上方安装命令会自动添加这些依赖。如果手动复制源码，请自行安装。";

export default {
  frameworks: [
    {
      name: "React",
      install: "npm install solen-design react react-dom",
      dependencies: {
        note: DEP_NOTE,
        npm: "npm install react react-dom",
        pnpm: "pnpm add react react-dom",
        yarn: "yarn add react react-dom",
        bun: "bun add react react-dom",
      },
      files: [
        { name: "ScrollExpand.jsx", code: entrySource },
        { name: "ScrollExpand.css", code: cssSource },
      ],
      api: API,
      usage: [
        {
          file: "App.jsx",
          code: `import { ScrollExpand } from "solen-design/react";

<ScrollExpand
  src="/images/hero.jpg"
  alt="封面"
  mediaType="image"
  title="山与雾"
  scrollHint="向下滚动展开"
  startWidth={42}
  startHeight={58}
  startRadius={24}
  mediaZoom={1.35}
  scrollDistance={1.2}
  holdDistance={0.35}
  smoothing={0.1}
  overlayScrim={0.45}
  style={{ height: "100vh" }}
>
  <strong>全幅之后的覆盖层内容</strong>
</ScrollExpand>`,
        },
      ],
    },
  ],
  prompt: specSource,
};
