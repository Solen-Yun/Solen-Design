import { API } from "./pixel-blast.jsx";
import entrySource from "../../src/components/pixel-blast/PixelBlast.jsx?raw";
import cssSource from "../../src/components/pixel-blast/PixelBlast.css?raw";
import specSource from "../../src/components/pixel-blast/SPEC.md?raw";

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
        { name: "PixelBlast.jsx", code: entrySource },
        { name: "PixelBlast.css", code: cssSource },
      ],
      api: API,
      usage: [
        {
          file: "App.jsx",
          code: `import { PixelBlast } from "solen-design/react";

<div style={{ position: "relative", height: 340 }}>
  <PixelBlast
    variant="square"
    pixelSize={3}
    color="#B497CF"
    patternScale={2}
    patternDensity={1}
    speed={0.5}
    edgeFade={0.5}
    softness={0.6}
    glow={0.4}
    twinkle={0.25}
    hoverEffect="reveal"
    enableRipples={true}
  />
</div>`,
        },
      ],
    },
  ],
  prompt: specSource,
};
