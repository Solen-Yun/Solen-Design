import { API } from "./flying-posters.jsx";
import entrySource from "../../src/components/flying-posters/FlyingPosters.jsx?raw";
import cssSource from "../../src/components/flying-posters/FlyingPosters.css?raw";
import specSource from "../../src/components/flying-posters/SPEC.md?raw";

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
        { name: "FlyingPosters.jsx", code: entrySource },
        { name: "FlyingPosters.css", code: cssSource },
      ],
      api: API,
      usage: [
        {
          file: "App.jsx",
          code: `import { FlyingPosters } from "solen-design/react";

const items = [
  { image: "/posters/one.jpg" },
  { image: "/posters/two.jpg" },
  { image: "/posters/three.jpg" },
  { image: "/posters/four.jpg" }
];

<FlyingPosters
  items={items}
  planeWidth={320}
  planeHeight={320}
  distortion={3}
  scrollEase={0.01}
  cameraFov={45}
  cameraZ={20}
  columns={1}
  columnGap={40}
  alternate={true}
  radius={0}
  rotation={180}
  axis="vertical"
  speed={0}
  lean={0}
  fade={0}
  shading={0}
  wheel={true}
  drag={true}
  pageScroll={0}
  onItemClick={(item, index) => console.log(item, index)}
/>`,
        },
      ],
    },
  ],
  prompt: specSource,
};
