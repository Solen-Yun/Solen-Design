import { API } from "./gooey-nav.jsx";
import entrySource from "../../src/components/gooey-nav/GooeyNav.jsx?raw";
import cssSource from "../../src/components/gooey-nav/GooeyNav.css?raw";
import specSource from "../../src/components/gooey-nav/SPEC.md?raw";

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
        { name: "GooeyNav.jsx", code: entrySource },
        { name: "GooeyNav.css", code: cssSource },
      ],
      api: API,
      usage: [
        {
          file: "App.jsx",
          code: `import { GooeyNav } from "solen-design/react";

const items = [
  { label: "Home", href: "#" },
  { label: "Work", href: "#" },
  { label: "About", href: "#" },
  { label: "Contact", href: "#" }
];

<GooeyNav
  items={items}
  initialActiveIndex={0}
  theme="light"
  size="md"
  frame={true}
  particleCount={15}
  spread={56}
  animationTime={600}
  timeVariance={300}
  gooeyness={0.5}
  wobble={0.5}
  hoverEffect={true}
  onChange={(index, item) => console.log(index, item.label)}
/>`,
        },
      ],
    },
  ],
  prompt: specSource,
};
