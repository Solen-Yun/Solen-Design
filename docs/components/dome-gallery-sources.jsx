import { API } from "./dome-gallery.jsx";
import entrySource from "../../src/components/dome-gallery/DomeGallery.jsx?raw";
import cssSource from "../../src/components/dome-gallery/DomeGallery.css?raw";
import specSource from "../../src/components/dome-gallery/SPEC.md?raw";

const DEP_NOTE = "上方安装命令会自动添加这些依赖。如果手动复制源码，请自行安装。";

export default {
  frameworks: [
    {
      name: "React",
      install: "npm install solen-design react react-dom @use-gesture/react",
      dependencies: {
        note: DEP_NOTE,
        npm: "npm install react react-dom @use-gesture/react",
        pnpm: "pnpm add react react-dom @use-gesture/react",
        yarn: "yarn add react react-dom @use-gesture/react",
        bun: "bun add react react-dom @use-gesture/react",
      },
      files: [
        { name: "DomeGallery.jsx", code: entrySource },
        { name: "DomeGallery.css", code: cssSource },
      ],
      api: API,
      usage: [
        {
          file: "App.jsx",
          code: `import { DomeGallery } from "solen-design/react";

const images = [
  { src: "/images/aurora.jpg", alt: "Aurora" },
  { src: "/images/dune.jpg", alt: "Dune" },
  { src: "/images/ocean.jpg", alt: "Ocean" }
];

<DomeGallery
  images={images}
  fit={0.5}
  fitBasis="auto"
  minRadius={600}
  maxVerticalRotationDeg={5}
  dragSensitivity={20}
  enlargeTransitionMs={300}
  segments={35}
  dragDampening={2}
  openedImageWidth="400px"
  openedImageHeight="400px"
  imageBorderRadius="30px"
  openedImageBorderRadius="30px"
  grayscale={true}
/>`,
        },
      ],
    },
  ],
  prompt: specSource,
};
