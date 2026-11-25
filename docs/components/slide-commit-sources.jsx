import { API } from "./slide-commit.jsx";
import entrySource from "../../src/components/slide-commit/SlideCommit.jsx?raw";
import cssSource from "../../src/components/slide-commit/SlideCommit.css?raw";
import specSource from "../../src/components/slide-commit/SPEC.md?raw";

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
        { name: "SlideCommit.jsx", code: entrySource },
        { name: "SlideCommit.css", code: cssSource },
      ],
      api: API,
      usage: [
        {
          file: "App.jsx",
          code: `import { SlideCommit } from "solen-design/react";

<SlideCommit
  label="Slide to pay"
  doneLabel="Paid"
  errorLabel="Payment failed"
  width={280}
  height={56}
  radius={28}
  speed={50}
  returnBounce={0.38}
  landingDip={0.026}
  holdMs={1500}
  onConfirm={() => new Promise((resolve) => setTimeout(resolve, 1200))}
  onDone={() => console.log("done")}
  onError={(reason) => console.log(reason)}
/>`,
        },
      ],
    },
  ],
  prompt: specSource,
};
