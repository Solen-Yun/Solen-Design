import { API } from "./glass-icons.jsx";
import entrySource from "../../src/components/glass-icons/GlassIcons.jsx?raw";
import cssSource from "../../src/components/glass-icons/GlassIcons.css?raw";
import specSource from "../../src/components/glass-icons/SPEC.md?raw";

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
        { name: "GlassIcons.jsx", code: entrySource },
        { name: "GlassIcons.css", code: cssSource },
      ],
      api: API,
      usage: [
        {
          file: "App.jsx",
          code: `import { GlassIcons } from "solen-design/react";

const items = [
  { label: "Home", icon: <svg>…</svg>, color: "blue" },
  { label: "Search", icon: <svg>…</svg>, color: "teal" },
  { label: "Star", icon: <svg>…</svg>, color: "purple" },
  { label: "Bolt", icon: <svg>…</svg>, color: "orange" },
  { label: "Heart", icon: <svg>…</svg>, color: "red" },
  { label: "Mail", icon: <svg>…</svg>, color: "green" }
];

<GlassIcons
  items={items}
  theme="dark"
  plate="tilt"
  hover="press"
  labels="hover"
  size={82}
  gap={66}
  columns={3}
  roundness={0.6}
  refraction={0.8}
  bevel={0.6}
  dispersion={0}
  frost={0.2}
  shine={0.85}
  tilt={30}
  intro={true}
/>`,
        },
      ],
    },
  ],
  prompt: specSource,
};
