import { API } from "./chroma-grid.jsx";
import entrySource from "../../src/components/chroma-grid/ChromaGrid.jsx?raw";
import cssSource from "../../src/components/chroma-grid/ChromaGrid.css?raw";
import specSource from "../../src/components/chroma-grid/SPEC.md?raw";

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
        { name: "ChromaGrid.jsx", code: entrySource },
        { name: "ChromaGrid.css", code: cssSource },
      ],
      api: API,
      usage: [
        {
          file: "App.jsx",
          code: `import { ChromaGrid } from "solen-design/react";

const items = [
  {
    image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0' y1='0' x2='1' y2='1'%3E%3Cstop offset='0' stop-color='#ff8a4c'/%3E%3Cstop offset='1' stop-color='#f5d90a'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='400' height='300' fill='url(%23g)'/%3E%3C/svg%3E",
    title: "Golden Hour",
    subtitle: "Sky study",
    accent: "#ff8a4c"
  },
  {
    image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0' y1='0' x2='1' y2='1'%3E%3Cstop offset='0' stop-color='#8b7cf6'/%3E%3Cstop offset='1' stop-color='#22d3ee'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='400' height='300' fill='url(%23g)'/%3E%3C/svg%3E",
    title: "Black Beach",
    subtitle: "Landscape",
    accent: "#a98bff",
    url: "#story"
  }
];

<ChromaGrid
  items={items}
  columns={3}
  minCardWidth={180}
  gap={12}
  radius={260}
  softness={0.6}
  damping={0.45}
  fadeOut={0.6}
  grayscale={1}
  dim={0.12}
  glow={0.5}
  borderGlow={1}
  reveal="spotlight"
  aspectRatio="3 / 2"
  cardRadius={22}
  showInfo={true}
  frame={false}
  theme="dark"
/>`,
        },
      ],
    },
  ],
  prompt: specSource,
};
