import { REACT_API } from "./infinite-menu.jsx";
import entrySource from "../../src/components/infinite-menu/InfiniteMenu.jsx?raw";
import cssSource from "../../src/components/infinite-menu/InfiniteMenu.css?raw";
import specSource from "../../src/components/infinite-menu/SPEC.md?raw";

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
        { name: "InfiniteMenu.jsx", code: entrySource },
        { name: "InfiniteMenu.css", code: cssSource },
      ],
      api: REACT_API,
      usage: [
        {
          file: "App.jsx",
          code: `import { InfiniteMenu } from "solen-design/react";

const items = [
  { image: "/assets/wallpaper-01.jpg", title: "Neon Crossing", description: "Neon rain doubled in the wet pavement." },
  { image: "/assets/wallpaper-03.jpg", title: "Petals at Dusk", description: "A shrine gate under a sinking sun." },
  { image: "/assets/wallpaper-08.jpg", title: "Aurora Lake", description: "Green light over still water." },
];

<div style={{ height: 600, position: "relative" }}>
  <InfiniteMenu items={items} count={160} autoplay={3} theme="dark" />
</div>`,
        },
      ],
    },
  ],
  prompt: specSource,
};
