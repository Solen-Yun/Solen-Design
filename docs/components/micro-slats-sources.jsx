import { API } from "./micro-slats.jsx";
import entrySource from "../../src/components/micro-slats/MicroSlats.jsx?raw";
import cssSource from "../../src/components/micro-slats/MicroSlats.css?raw";
import specSource from "../../src/components/micro-slats/SPEC.md?raw";

const DEP_NOTE = "上方安装命令会自动添加这些依赖。如果手动复制源码，请自行安装。";

export default {
  frameworks: [
    {
      name: "React",
      install: "npm install solen-design react react-dom ogl@^1.0.11",
      dependencies: {
        note: DEP_NOTE,
        npm: "npm install react react-dom ogl@^1.0.11",
        pnpm: "pnpm add react react-dom ogl@^1.0.11",
        yarn: "yarn add react react-dom ogl@^1.0.11",
        bun: "bun add react react-dom ogl@^1.0.11",
      },
      files: [
        { name: "MicroSlats.jsx", code: entrySource },
        { name: "MicroSlats.css", code: cssSource },
      ],
      api: API,
      usage: [
        {
          file: "App.jsx",
          code: `import { MicroSlats } from "solen-design/react";

<div style={{ position: "relative", height: 340 }}>
  <MicroSlats
    preset="swell"
    color="#A855F7"
    glintColor="#ffffff"
    slatWidth={10}
    slatHeight={25}
    gap={3}
    roundness={0.75}
    interactive={true}
    cursorSize={40}
    trail={1.4}
  />
</div>`,
        },
      ],
    },
  ],
  prompt: specSource,
};
