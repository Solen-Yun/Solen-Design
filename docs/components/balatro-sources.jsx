import { API } from "./balatro.jsx";
import entrySource from "../../src/components/balatro/Balatro.jsx?raw";
import cssSource from "../../src/components/balatro/Balatro.css?raw";
import specSource from "../../src/components/balatro/SPEC.md?raw";

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
        { name: "Balatro.jsx", code: entrySource },
        { name: "Balatro.css", code: cssSource },
      ],
      api: API,
      usage: [
        {
          file: "App.jsx",
          code: `import { Balatro } from "solen-design/react";

<div style={{ position: "relative", width: "100%", height: "100vh" }}>
  <Balatro
    color1="#DE443B"
    color2="#006BB4"
    color3="#162325"
    contrast={3.5}
    lighting={0.4}
    swirl={0.25}
    speed={1}
    scale={1}
    detail={5}
    pixelSize={1.5}
    crt={0}
    mouseInteraction={true}
    clickSwirl={true}
    intro={true}
  />
</div>`,
        },
      ],
    },
  ],
  prompt: specSource,
};
