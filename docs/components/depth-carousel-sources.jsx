import { API } from "./depth-carousel.jsx";
import entrySource from "../../src/components/depth-carousel/DepthCarousel.jsx?raw";
import cssSource from "../../src/components/depth-carousel/DepthCarousel.css?raw";
import specSource from "../../src/components/depth-carousel/SPEC.md?raw";

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
        { name: "DepthCarousel.jsx", code: entrySource },
        { name: "DepthCarousel.css", code: cssSource },
      ],
      api: API,
      usage: [
        {
          file: "App.jsx",
          code: `import { DepthCarousel } from "solen-design/react";

const items = [
  "/photos/one.jpg",
  { image: "/photos/two.jpg", alt: "Second slide" },
  "/photos/three.jpg",
  "/photos/four.jpg",
  "/photos/five.jpg",
  "/photos/six.jpg"
];

<DepthCarousel
  items={items}
  cardWidth={300}
  cardHeight={380}
  radius={18}
  tint="#05060a"
  depth={220}
  spread={90}
  tilt={22}
  tiltDirection="right"
  perspective={1400}
  visibleCards={4}
  falloff={0.2}
  blur={6}
  duration={700}
  autoplay={false}
  autoplayDelay={3200}
  loop={true}
  showControls={true}
  showIndicators={true}
  onChange={(index, item) => console.log(index, item)}
/>`,
        },
      ],
    },
  ],
  prompt: specSource,
};
