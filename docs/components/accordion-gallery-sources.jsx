import { API } from "./accordion-gallery.jsx";
import entrySource from "../../src/components/accordion-gallery/AccordionGallery.jsx?raw";
import cssSource from "../../src/components/accordion-gallery/AccordionGallery.css?raw";
import specSource from "../../src/components/accordion-gallery/SPEC.md?raw";

const DEP_NOTE = "上方安装命令会自动添加这些依赖。如果手动复制源码，请自行安装。";

export default {
  frameworks: [
    {
      name: "React",
      install: "npm install solen-design react react-dom gsap",
      dependencies: {
        note: DEP_NOTE,
        npm: "npm install react react-dom gsap",
        pnpm: "pnpm add react react-dom gsap",
        yarn: "yarn add react react-dom gsap",
        bun: "bun add react react-dom gsap",
      },
      files: [
        { name: "AccordionGallery.jsx", code: entrySource },
        { name: "AccordionGallery.css", code: cssSource },
      ],
      api: API,
      usage: [
        {
          file: "App.jsx",
          code: `import { AccordionGallery } from "solen-design/react";

const items = [
  { image: "/photos/canyon.jpg", label: "Canyon", link: "#" },
  { image: "/photos/ridge.jpg", label: "Ridgeline", link: "#" },
  { image: "/photos/falls.jpg", label: "Falls", link: "#" },
  { image: "/photos/harbour.jpg", label: "Harbour", link: "#" },
  { image: "/photos/skyline.jpg", label: "Skyline", link: "#" }
];

<AccordionGallery
  items={items}
  defaultIndex={2}
  orientation="horizontal"
  trigger="hover"
  expandRatio={0.52}
  height={460}
  gap={10}
  radius={16}
  duration={0.6}
  tilt={8}
  parallax={0.5}
  grayscale={true}
  showLabels={true}
/>`,
        },
      ],
    },
  ],
  prompt: specSource,
};
