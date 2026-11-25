import { API } from "./paper-crumple.jsx";
import entrySource from "../../src/components/paper-crumple/PaperCrumple.jsx?raw";
import cssSource from "../../src/components/paper-crumple/PaperCrumple.css?raw";
import specSource from "../../src/components/paper-crumple/SPEC.md?raw";

const DEP_NOTE = "上方安装命令会自动添加这些依赖。如果手动复制源码，请自行安装。";

export default {
  frameworks: [
    {
      name: "React",
      install: "npm install solen-design react react-dom three",
      dependencies: {
        note: DEP_NOTE,
        npm: "npm install react react-dom three",
        pnpm: "pnpm add react react-dom three",
        yarn: "yarn add react react-dom three",
        bun: "bun add react react-dom three",
      },
      files: [
        { name: "PaperCrumple.jsx", code: entrySource },
        { name: "PaperCrumple.css", code: cssSource },
      ],
      api: API,
      usage: [
        {
          file: "App.jsx",
          code: `import { PaperCrumple } from "solen-design/react";

<PaperCrumple
  src="./poster.jpg"
  alt="Crumplable poster"
  width={320}
  height={400}
  sceneHeight={560}
  crumpleAmount={0.85}
  releaseBehavior="creased"
  creaseStrength={0.18}
  foldCount={6}
  foldSharpness={0.6}
  draggable={true}
  dragRadius={180}
  seed={7}
  detail={64}
  onStateChange={(state) => console.log(state)}
/>`,
        },
      ],
    },
  ],
  prompt: specSource,
};
