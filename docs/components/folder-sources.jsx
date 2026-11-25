import { API } from "./folder.jsx";
import entrySource from "../../src/components/folder/Folder.jsx?raw";
import cssSource from "../../src/components/folder/Folder.css?raw";
import specSource from "../../src/components/folder/SPEC.md?raw";

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
        { name: "Folder.jsx", code: entrySource },
        { name: "Folder.css", code: cssSource },
      ],
      api: API,
      usage: [
        {
          file: "App.jsx",
          code: `import { Folder } from "solen-design/react";

const items = [
  { title: "Brand guidelines", description: "Colors, type and voice" },
  { title: "Launch plan", description: "Milestones and owners" },
  { title: "Moodboard" }
];

<Folder
  label="Projects"
  items={items}
  mode="flap"
  variant="solid"
  color="#3d8bff"
  paperColor="#ffffff"
  tabPosition="right"
  layout="spread"
  size={1}
  openOn="click"
  peek={true}
  draggable={true}
  zoomOnClick={true}
  intro={true}
  tilt={0.5}
  bounce={0.4}
  speed={1}
  theme="dark"
  onItemClick={(item, index) => console.log(index, item.title)}
  onItemDrop={(item, index, intoFolder) => console.log(index, intoFolder)}
/>`,
        },
      ],
    },
  ],
  prompt: specSource,
};
