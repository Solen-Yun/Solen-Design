import { API } from "./holo-mosaic.jsx";
import entrySource from "../../src/components/holo-mosaic/HoloMosaic.jsx?raw";
import cssSource from "../../src/components/holo-mosaic/HoloMosaic.css?raw";
import specSource from "../../src/components/holo-mosaic/SPEC.md?raw";

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
        { name: "HoloMosaic.jsx", code: entrySource },
        { name: "HoloMosaic.css", code: cssSource },
      ],
      api: API,
      usage: [
        {
          file: "App.jsx",
          code: `import { HoloMosaic } from "solen-design/react";

<div style={{ position: "relative", height: 420 }}>
  <HoloMosaic
    spectrum="full"
    tileSize={1}
    gap={0.08}
    glitter={0.85}
    sheen={0.8}
    flipOnClick={true}
  />
</div>`,
        },
      ],
    },
  ],
  prompt: specSource,
};
