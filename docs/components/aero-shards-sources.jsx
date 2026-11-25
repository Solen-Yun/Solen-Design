import { API } from "./aero-shards.jsx";
import entrySource from "../../src/components/aero-shards/AeroShards.jsx?raw";
import cssSource from "../../src/components/aero-shards/AeroShards.css?raw";
import specSource from "../../src/components/aero-shards/SPEC.md?raw";

const DEP_NOTE = "上方安装命令会自动添加这些依赖。如果手动复制源码，请自行安装。";

export default {
  frameworks: [
    {
      name: "React",
      install: "npm install solen-design react react-dom vgpu@^0.3.1",
      dependencies: {
        note: DEP_NOTE,
        npm: "npm install react react-dom vgpu@^0.3.1",
        pnpm: "pnpm add react react-dom vgpu@^0.3.1",
        yarn: "yarn add react react-dom vgpu@^0.3.1",
        bun: "bun add react react-dom vgpu@^0.3.1",
      },
      files: [
        { name: "AeroShards.jsx", code: entrySource },
        { name: "AeroShards.css", code: cssSource },
      ],
      api: API,
      usage: [
        {
          file: "App.jsx",
          code: `import { AeroShards } from "solen-design/react";

<div style={{ position: "relative", width: "100%", height: "100vh" }}>
  <AeroShards
    shardColor="#896ABD"
    accentColor="#A855F7"
    placement="full"
    material="glass"
    count={1300}
    speed={1}
    depthOfField={0.75}
    glow={0.35}
    markers="plus"
    pulseOnClick={true}
    holdToGather={true}
    onError={(error) => console.error(error)}
  />
</div>`,
        },
      ],
    },
  ],
  prompt: specSource,
};
