import { API } from "./scanner.jsx";
import entrySource from "../../src/components/scanner/Scanner.jsx?raw";
import cssSource from "../../src/components/scanner/Scanner.css?raw";
import specSource from "../../src/components/scanner/SPEC.md?raw";

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
        { name: "Scanner.jsx", code: entrySource },
        { name: "Scanner.css", code: cssSource },
      ],
      api: API,
      usage: [
        {
          file: "App.jsx",
          code: `import { Scanner } from "solen-design/react";

<div style={{ width: "100%", height: 520, position: "relative" }}>
  <Scanner
    color1="#5227FF"
    color2="#FF9FFC"
    color3="#FFFFFF"
    speed={0.5}
    sweepSpeed={0.25}
    sweepWidth={1.6}
    trail={0.5}
    scale={1.5}
    frequency={2}
    ripple={0.22}
    bandDensity={11}
    lineWidth={1.2}
    glow={0.6}
    scanDirection="vertical"
    colorSpread={0.7}
    mouseMode="repel"
    clickEffect="ping"
  />
</div>`,
        },
      ],
    },
  ],
  prompt: specSource,
};
