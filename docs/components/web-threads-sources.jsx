import { API } from "./web-threads.jsx";
import entrySource from "../../src/components/web-threads/WebThreads.jsx?raw";
import cssSource from "../../src/components/web-threads/WebThreads.css?raw";
import specSource from "../../src/components/web-threads/SPEC.md?raw";

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
        { name: "WebThreads.jsx", code: entrySource },
        { name: "WebThreads.css", code: cssSource },
      ],
      api: API,
      usage: [
        {
          file: "App.jsx",
          code: `import { WebThreads } from "solen-design/react";

<div style={{ position: "relative", width: "100%", height: 420 }}>
  <WebThreads
    colors={["#5227FF", "#FF9FFC"]}
    coreColor="#FFFFFF"
    threadCount={6}
    speed={0.2}
    frequency={5}
    spread={0.18}
    taper={1}
    position={0.5}
    pinch={0.5}
    nodes={1}
    glow={0.02}
    thickness={1.1}
    brightness={0.6}
    mirror={true}
    mouseInteraction={true}
    mouseStrength={0.5}
    pulseOnClick={true}
  />
</div>`,
        },
      ],
    },
  ],
  prompt: specSource,
};
