import { API } from "./flowing-menu.jsx";
import entrySource from "../../src/components/flowing-menu/FlowingMenu.jsx?raw";
import cssSource from "../../src/components/flowing-menu/FlowingMenu.css?raw";
import specSource from "../../src/components/flowing-menu/SPEC.md?raw";

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
        { name: "FlowingMenu.jsx", code: entrySource },
        { name: "FlowingMenu.css", code: cssSource },
      ],
      api: API,
      usage: [
        {
          file: "App.jsx",
          code: `import { FlowingMenu } from "solen-design/react";

const items = [
  { text: "Work", marquee: "Work", image: "/work.png", link: "/work" },
  { text: "Studio", marquee: "Studio", image: "/studio.png" },
  { text: "Journal", marquee: "Journal", link: "/journal", meta: "2025" }
];

<div style={{ height: "70vh" }}>
  <FlowingMenu
    items={items}
    speed={60}
    direction="left"
    followCursor={0.4}
    duration={0.5}
    stretch={0.6}
    magnet={0.25}
    bandInset={0}
    bandRadius={0}
    carryContent={false}
    dividers={true}
    dimInactive={false}
    align="center"
    showIndex={false}
    showArrow={false}
    imageShape="pill"
    intro={true}
    onItemClick={(item, index) => console.log(item, index)}
  />
</div>`,
        },
      ],
    },
  ],
  prompt: specSource,
};
