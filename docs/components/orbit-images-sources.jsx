import { API } from "./orbit-images.jsx";
import entrySource from "../../src/components/orbit-images/OrbitImages.jsx?raw";
import cssSource from "../../src/components/orbit-images/OrbitImages.css?raw";
import specSource from "../../src/components/orbit-images/SPEC.md?raw";

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
        { name: "OrbitImages.jsx", code: entrySource },
        { name: "OrbitImages.css", code: cssSource },
      ],
      api: API,
      usage: [
        {
          file: "App.jsx",
          code: `import { OrbitImages } from "solen-design/react";

const images = ["a.png", "b.png", "c.png", "d.png"];

<OrbitImages
  images={images}
  altPrefix="Orbiting image"
  shape="ellipse"
  rotation={-8}
  duration={40}
  itemSize={64}
  depth={0.5}
  draggable={true}
  clickToFront={true}
  intro={true}
  onItemClick={(index, src) => console.log(index, src)}
/>`,
        },
      ],
    },
  ],
  prompt: specSource,
};
