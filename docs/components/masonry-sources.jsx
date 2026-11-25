import { API } from "./masonry.jsx";
import entrySource from "../../src/components/masonry/Masonry.jsx?raw";
import cssSource from "../../src/components/masonry/Masonry.css?raw";
import specSource from "../../src/components/masonry/SPEC.md?raw";

const DEP_NOTE = "上方安装命令会自动添加这些依赖。如果手动复制源码，请自行安装。";

export default {
  frameworks: [
    {
      name: "React",
      install: "npm install solen-design react react-dom @hugeicons/react @hugeicons/core-free-icons",
      dependencies: {
        note: DEP_NOTE,
        npm: "npm install react react-dom @hugeicons/react @hugeicons/core-free-icons",
        pnpm: "pnpm add react react-dom @hugeicons/react @hugeicons/core-free-icons",
        yarn: "yarn add react react-dom @hugeicons/react @hugeicons/core-free-icons",
        bun: "bun add react react-dom @hugeicons/react @hugeicons/core-free-icons",
      },
      files: [
        { name: "Masonry.jsx", code: entrySource },
        { name: "Masonry.css", code: cssSource },
      ],
      api: API,
      usage: [
        {
          file: "App.jsx",
          code: `import { Masonry } from "solen-design/react";

const items = [
  { id: "a", img: "/photos/dune.jpg", title: "Dune", width: 800, height: 1000 },
  { id: "b", img: "/photos/ocean.jpg", title: "Ocean", width: 800, height: 560 },
  { id: "wide", img: "/photos/pano.jpg", title: "Pano", span: 2, width: 1600, height: 640 }
];

<Masonry
  items={items}
  columns="auto"
  columnWidth={240}
  gap={12}
  radius={12}
  animateFrom="bottom"
  stagger={0.05}
  duration={0.6}
  bounce={0.15}
  blurToFocus={true}
  revealOnScroll={true}
  hoverEffect="zoom"
  captions="hover"
  parallax={0}
  lightbox={true}
  draggable={true}
  onReorder={(ordered) => console.log(ordered)}
/>`,
        },
      ],
    },
  ],
  prompt: specSource,
};
