import { API } from "./threads.jsx";
import entrySource from "../../src/components/threads/Threads.jsx?raw";
import cssSource from "../../src/components/threads/Threads.css?raw";
import specSource from "../../src/components/threads/SPEC.md?raw";

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
        { name: "Threads.jsx", code: entrySource },
        { name: "Threads.css", code: cssSource },
      ],
      api: API,
      usage: [
        {
          file: "App.jsx",
          code: `import { Threads } from "solen-design/react";

<div style={{ position: "relative", width: "100%", height: 420, overflow: "hidden" }}>
  <Threads
    color={[0.78, 0.85, 1]}
    accentColor={[0.36, 0.55, 1]}
    lineCount={90}
    thickness={0.6}
    softness={1.3}
    speed={0.6}
    amplitude={1.7}
    distance={0.4}
    waves={1.05}
    split={0.04}
    fray={0.5}
    angle={25}
    seed={0}
    parting={0.6}
    taper={0.85}
    brightness={1.4}
    enableMouseInteraction={true}
  />
</div>`,
        },
      ],
    },
  ],
  prompt: specSource,
};
