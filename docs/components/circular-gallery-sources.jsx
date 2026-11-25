import { API } from "./circular-gallery.jsx";
import entrySource from "../../src/components/circular-gallery/CircularGallery.jsx?raw";
import cssSource from "../../src/components/circular-gallery/CircularGallery.css?raw";
import specSource from "../../src/components/circular-gallery/SPEC.md?raw";

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
        { name: "CircularGallery.jsx", code: entrySource },
        { name: "CircularGallery.css", code: cssSource },
      ],
      api: API,
      usage: [
        {
          file: "App.jsx",
          code: `import { CircularGallery } from "solen-design/react";

const items = [
  { image: "/photos/bridge.jpg", text: "Bridge", description: "清晨的拱桥。", alt: "拱桥" },
  { image: "/photos/coast.jpg", text: "Coastline", description: "傍晚的海岸线。", alt: "海岸" },
  { image: "/photos/palms.jpg", text: "Palm Trees", description: "椰林与风。", alt: "椰林" }
];

<CircularGallery
  items={items}
  bend={3}
  textColor="#ffffff"
  borderRadius={0.05}
  scrollSpeed={2}
  scrollEase={0.05}
  itemSize={1}
  itemAspect={0.78}
  gap={0.26}
  wave={1}
  fadeEdges={0.12}
  shadow={0.25}
  grayscale={false}
  showTitles={true}
  snap={true}
  autoScroll={0}
  openOnClick={true}
  intro={true}
  onItemClick={(item, index) => console.log(index, item.text)}
  onActiveChange={(index) => console.log(index)}
/>`,
        },
      ],
    },
  ],
  prompt: specSource,
};
