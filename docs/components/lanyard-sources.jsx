import { API } from "./lanyard.jsx";
import entrySource from "../../src/components/lanyard/Lanyard.jsx?raw";
import cssSource from "../../src/components/lanyard/Lanyard.css?raw";
import specSource from "../../src/components/lanyard/SPEC.md?raw";

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
        { name: "Lanyard.jsx", code: entrySource },
        { name: "Lanyard.css", code: cssSource },
      ],
      api: API,
      usage: [
        {
          file: "App.jsx",
          code: `import { Lanyard } from "solen-design/react";

<div style={{ width: 480, height: 480 }}>
  <Lanyard
    frontImage="/badge-front.png"
    backImage="/badge-back.png"
    strapColor="#111111"
    finish="holographic"
    metal="gold"
    orientation="portrait"
    size={0.6}
    anchor="center"
    strapLength={0.5}
    gravity={1}
    damping={0.5}
    elasticity={0.5}
    breeze={0.5}
    interactive={true}
    intro={true}
  />
</div>`,
        },
      ],
    },
  ],
  prompt: specSource,
};
