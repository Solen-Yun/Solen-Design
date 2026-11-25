import { API } from "./carousel.jsx";
import entrySource from "../../src/components/carousel/Carousel.jsx?raw";
import cssSource from "../../src/components/carousel/Carousel.css?raw";
import specSource from "../../src/components/carousel/SPEC.md?raw";

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
        { name: "Carousel.jsx", code: entrySource },
        { name: "Carousel.css", code: cssSource },
      ],
      api: API,
      usage: [
        {
          file: "App.jsx",
          code: `import { Carousel } from "solen-design/react";

const items = [
  {
    image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0' y1='0' x2='1' y2='1'%3E%3Cstop offset='0' stop-color='#7c5cff'/%3E%3Cstop offset='1' stop-color='#22d3ee'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='400' height='300' fill='url(%23g)'/%3E%3C/svg%3E",
    title: "First card",
    description: "A photo card with a caption."
  },
  { image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0' y1='0' x2='1' y2='1'%3E%3Cstop offset='0' stop-color='#ff8a4c'/%3E%3Cstop offset='1' stop-color='#f5d90a'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='400' height='300' fill='url(%23g)'/%3E%3C/svg%3E" },
  { title: "Text tile", description: "No photo, just words." }
];

<Carousel
  items={items}
  baseWidth={300}
  aspectRatio={1.25}
  gap={16}
  radius={12}
  frame={true}
  effect="tilt"
  indicator="dots"
  arrows={false}
  autoplay={false}
  autoplayDelay={3000}
  pauseOnHover={false}
  loop={false}
  draggable={true}
  round={false}
  theme="dark"
  onChange={(index) => console.log(index)}
/>`,
        },
      ],
    },
  ],
  prompt: specSource,
};
