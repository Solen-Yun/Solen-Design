import { API } from "./pill-nav.jsx";
import entrySource from "../../src/components/pill-nav/PillNav.jsx?raw";
import cssSource from "../../src/components/pill-nav/PillNav.css?raw";
import specSource from "../../src/components/pill-nav/SPEC.md?raw";

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
        { name: "PillNav.jsx", code: entrySource },
        { name: "PillNav.css", code: cssSource },
      ],
      api: API,
      usage: [
        {
          file: "App.jsx",
          code: `import { PillNav } from "solen-design/react";

const items = [
  { label: "Home", href: "#" },
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" }
];

<PillNav
  items={items}
  theme="light"
  layout="split"
  size="md"
  surface="glass"
  itemStyle="plain"
  hoverEffect="fill"
  indicator="dot"
  bounce={0.3}
  stretch={0.5}
  intro={true}
  onItemClick={(item, index) => console.log(index, item.label)}
/>`,
        },
      ],
    },
  ],
  prompt: specSource,
};
