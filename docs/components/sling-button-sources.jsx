import { API } from "./sling-button.jsx";
import entrySource from "../../src/components/sling-button/SlingButton.jsx?raw";
import cssSource from "../../src/components/sling-button/SlingButton.css?raw";
import specSource from "../../src/components/sling-button/SPEC.md?raw";

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
        { name: "SlingButton.jsx", code: entrySource },
        { name: "SlingButton.css", code: cssSource },
      ],
      api: API,
      usage: [
        {
          file: "App.jsx",
          code: `import { SlingButton } from "solen-design/react";

<SlingButton
  size={56}
  armAt={48}
  maxPull={160}
  launchSpeed={2600}
  recoil={0.2}
  flight={120}
  particles={14}
  spread={60}
  axis="any"
  tapSends={true}
  onSend={() => console.log("sent")}
/>`,
        },
      ],
    },
  ],
  prompt: specSource,
};
