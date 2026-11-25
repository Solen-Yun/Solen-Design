import { API } from "./drift-wall.jsx";
import entrySource from "../../src/components/drift-wall/DriftWall.jsx?raw";
import cssSource from "../../src/components/drift-wall/DriftWall.css?raw";
import specSource from "../../src/components/drift-wall/SPEC.md?raw";

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
        { name: "DriftWall.jsx", code: entrySource },
        { name: "DriftWall.css", code: cssSource },
      ],
      api: API,
      usage: [
        {
          file: "App.jsx",
          code: `import { DriftWall } from "solen-design/react";

const items = [
  { image: "/tiles/aurora.jpg", title: "Aurora" },
  { image: "/tiles/dune.jpg", title: "Dune" },
  { image: "/tiles/ocean.jpg", title: "Ocean" },
  { image: "/tiles/forest.jpg", title: "Forest" }
];

<DriftWall
  items={items}
  columns={5}
  tileWidth={200}
  tileHeight={132}
  gap={18}
  tilt={16}
  turn={-14}
  perspective={1200}
  speed={42}
  direction="up"
  variance={0.45}
  parallax={0.6}
  lift={64}
  fade={0.6}
  dim={0.55}
  grayscale={false}
/>`,
        },
      ],
    },
  ],
  prompt: specSource,
};
