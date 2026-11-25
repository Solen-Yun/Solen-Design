import { API } from "./circular-carousel.jsx";
import entrySource from "../../src/components/circular-carousel/CircularCarousel.jsx?raw";
import cssSource from "../../src/components/circular-carousel/CircularCarousel.css?raw";
import specSource from "../../src/components/circular-carousel/SPEC.md?raw";

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
        { name: "CircularCarousel.jsx", code: entrySource },
        { name: "CircularCarousel.css", code: cssSource },
      ],
      api: API,
      usage: [
        {
          file: "App.jsx",
          code: `import { CircularCarousel } from "solen-design/react";

const items = [
  { src: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0' y1='0' x2='1' y2='1'%3E%3Cstop offset='0' stop-color='#22d3ee'/%3E%3Cstop offset='1' stop-color='#0ea5e9'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='400' height='300' fill='url(%23g)'/%3E%3C/svg%3E", title: "Valley", subtitle: "Landscape" },
  { src: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0' y1='0' x2='1' y2='1'%3E%3Cstop offset='0' stop-color='#f5d90a'/%3E%3Cstop offset='1' stop-color='#ff8a4c'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='400' height='300' fill='url(%23g)'/%3E%3C/svg%3E", title: "Portrait", subtitle: "Studio" },
  { src: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0' y1='0' x2='1' y2='1'%3E%3Cstop offset='0' stop-color='#8b7cf6'/%3E%3Cstop offset='1' stop-color='#ec4899'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='400' height='300' fill='url(%23g)'/%3E%3C/svg%3E", title: "Towers", subtitle: "Architecture" }
];

<div style={{ width: "100%", height: 480 }}>
  <CircularCarousel
    items={items}
    preset="cylinder"
    intro="rise"
    cardWidth={220}
    aspectRatio={1}
    gap={25}
    autoplay="drift"
    speed={14}
    draggable={true}
    momentum={0.6}
    snap={true}
    pauseOnHover={true}
    focusOnClick={true}
    parallax={0.3}
    stretch={0.5}
    depthFade={0.55}
    fadeColor="#000000"
    innerShade={0.6}
    cornerRadius={12}
    captions={false}
    onChange={(index) => console.log(index)}
    onItemClick={(item, index) => console.log(item.title, index)}
  />
</div>`,
        },
      ],
    },
  ],
  prompt: specSource,
};
