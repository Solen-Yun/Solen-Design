import { API } from "./bell-toggle.jsx";
import entrySource from "../../src/components/bell-toggle/BellToggle.jsx?raw";
import cssSource from "../../src/components/bell-toggle/BellToggle.css?raw";
import specSource from "../../src/components/bell-toggle/SPEC.md?raw";

const DEP_NOTE = "上方安装命令会自动添加这些依赖。如果手动复制源码，请自行安装。";

export default {
  frameworks: [
    {
      name: "React",
      install: "npm install solen-design react react-dom motion @hugeicons/react @hugeicons/core-free-icons",
      dependencies: {
        note: DEP_NOTE,
        npm: "npm install react react-dom motion @hugeicons/react @hugeicons/core-free-icons",
        pnpm: "pnpm add react react-dom motion @hugeicons/react @hugeicons/core-free-icons",
        yarn: "yarn add react react-dom motion @hugeicons/react @hugeicons/core-free-icons",
        bun: "bun add react react-dom motion @hugeicons/react @hugeicons/core-free-icons",
      },
      files: [
        { name: "BellToggle.jsx", code: entrySource },
        { name: "BellToggle.css", code: cssSource },
      ],
      api: API,
      usage: [
        {
          file: "App.jsx",
          code: `import { BellToggle } from "solen-design/react";

<BellToggle
  offLabel="Notify me"
  onLabel="You'll be notified"
  size="md"
  radius={22}
  ringAmplitude={17}
  ringPasses={5}
  ringDuration={820}
  crossfadeMs={200}
  count={3}
  badge={true}
  waves={true}
  clapper={false}
  defaultPressed={false}
  onChange={(on) => console.log(on)}
/>`,
        },
      ],
    },
  ],
  prompt: specSource,
};
