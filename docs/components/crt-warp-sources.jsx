import { API } from "./crt-warp.jsx";
import entrySource from "../../src/components/crt-warp/CRTWarp.jsx?raw";
import cssSource from "../../src/components/crt-warp/CRTWarp.css?raw";
import specSource from "../../src/components/crt-warp/SPEC.md?raw";

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
        { name: "CRTWarp.jsx", code: entrySource },
        { name: "CRTWarp.css", code: cssSource },
      ],
      api: API,
      usage: [
        {
          file: "App.jsx",
          code: `import { CRTWarp } from "solen-design/react";

<div style={{ position: "relative", width: "100%", height: 420 }}>
  <CRTWarp
    color="#c755f7"
    backgroundColor="#120f17"
    speed={0.5}
    levels={3}
    columns={80}
    persistence={0.4}
    curvature={0.25}
    mask="aperture"
    bloom={1.5}
    mouseReact={true}
    changeOnClick={true}
  />
</div>`,
        },
      ],
    },
  ],
  prompt: specSource,
};
