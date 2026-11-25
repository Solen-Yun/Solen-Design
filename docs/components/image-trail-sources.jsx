import { API } from "./image-trail.jsx";
import entrySource from "../../src/components/image-trail/ImageTrail.jsx?raw";
import cssSource from "../../src/components/image-trail/ImageTrail.css?raw";
import specSource from "../../src/components/image-trail/SPEC.md?raw";

const DEP_NOTE = "上方安装命令会自动添加这些依赖。如果手动复制源码，请自行安装。";

export default {
  frameworks: [
    {
      name: "React",
      install: "npm install solen-design react react-dom gsap@^3.13.0",
      dependencies: {
        note: DEP_NOTE,
        npm: "npm install react react-dom gsap@^3.13.0",
        pnpm: "pnpm add react react-dom gsap@^3.13.0",
        yarn: "yarn add react react-dom gsap@^3.13.0",
        bun: "bun add react react-dom gsap@^3.13.0",
      },
      files: [
        { name: "ImageTrail.jsx", code: entrySource },
        { name: "ImageTrail.css", code: cssSource },
      ],
      api: API,
      usage: [
        {
          file: "App.jsx",
          code: `import { ImageTrail } from "solen-design/react";

const items = [
  "/images/trail-1.jpg",
  "/images/trail-2.jpg",
  "/images/trail-3.jpg",
  "/images/trail-4.jpg"
];

<div style={{ position: "relative", width: "100vw", height: "100vh" }}>
  <ImageTrail
    items={items}
    size={190}
    threshold={80}
    rotation={12}
    sizeVariance={0.4}
    drift={0.6}
    zoom={1.2}
    flash={0.25}
  />
</div>`,
        },
      ],
    },
  ],
  prompt: specSource,
};
