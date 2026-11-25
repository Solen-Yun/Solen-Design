import { API } from "./flex-carousel.jsx";
import entrySource from "../../src/components/flex-carousel/FlexCarousel.jsx?raw";
import cssSource from "../../src/components/flex-carousel/FlexCarousel.css?raw";
import specSource from "../../src/components/flex-carousel/SPEC.md?raw";

const DEP_NOTE = "上方安装命令会自动添加这些依赖。如果手动复制源码，请自行安装。";

export default {
  frameworks: [
    {
      name: "React",
      install: "npm install solen-design react react-dom ogl",
      dependencies: {
        note: DEP_NOTE,
        npm: "npm install react react-dom ogl",
        pnpm: "pnpm add react react-dom ogl",
        yarn: "yarn add react react-dom ogl",
        bun: "bun add react react-dom ogl",
      },
      files: [
        { name: "FlexCarousel.jsx", code: entrySource },
        { name: "FlexCarousel.css", code: cssSource },
      ],
      api: API,
      usage: [
        {
          file: "App.jsx",
          code: `import { FlexCarousel } from "solen-design/react";

const items = [
  { src: "/photos/form-01.jpg", alt: "Chrome form", title: "Iridescence" },
  { src: "/photos/form-02.jpg", alt: "Clay bust", title: "Clay Study" },
  { src: "/photos/form-03.jpg", alt: "Plaster bust", title: "Plaster" }
];

<FlexCarousel
  items={items}
  preset="liquid"
  intro="rise"
  cardHeight={0.5}
  gap={12}
  radius={0}
  fit="natural"
  squeeze={0.2}
  focusOnClick={true}
  autoplay={false}
  interval={4}
  captions={true}
  captureWheel={true}
  onChange={(index, item) => console.log(index, item.title)}
/>`,
        },
      ],
    },
  ],
  prompt: specSource,
};
