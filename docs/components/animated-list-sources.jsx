import { API } from "./animated-list.jsx";
import entrySource from "../../src/components/animated-list/AnimatedList.jsx?raw";
import cssSource from "../../src/components/animated-list/AnimatedList.css?raw";
import specSource from "../../src/components/animated-list/SPEC.md?raw";

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
        { name: "AnimatedList.jsx", code: entrySource },
        { name: "AnimatedList.css", code: cssSource },
      ],
      api: API,
      usage: [
        {
          file: "App.jsx",
          code: `import { AnimatedList } from "solen-design/react";

const items = [
  { icon: <span>📁</span>, title: "Brand assets", description: "24 files", meta: "2m" },
  { icon: <span>🖼️</span>, title: "Launch hero.png", description: "2.4 MB", meta: "18m" },
  { icon: <span>🎬</span>, title: "Product tour.mp4", description: "148 MB", meta: "1h" },
  { icon: <span>📝</span>, title: "Pricing notes", description: "1,240 words", meta: "3h" },
  { icon: <span>💻</span>, title: "landing-page.tsx", description: "12 KB", meta: "5h" }
];

<AnimatedList
  items={items}
  theme="dark"
  animation="pop"
  stagger={0.05}
  fadeSize={56}
  radius={14}
  gap={8}
  width={420}
  maxHeight={440}
  frame={true}
  selectOnHover={true}
  enableArrowNavigation={true}
  onItemSelect={(item, index) => console.log(index, item.title)}
/>`,
        },
      ],
    },
  ],
  prompt: specSource,
};
