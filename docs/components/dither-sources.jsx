import { API } from "./dither.jsx";
import entrySource from "../../src/components/dither/Dither.jsx?raw";
import cssSource from "../../src/components/dither/Dither.css?raw";
import specSource from "../../src/components/dither/SPEC.md?raw";

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
        { name: "Dither.jsx", code: entrySource },
        { name: "Dither.css", code: cssSource },
      ],
      api: API,
      usage: [
        {
          file: "App.jsx",
          code: `import { Dither } from "solen-design/react";

export default function App() {
  return (
    <div style={{ position: "relative", height: "100vh", background: "#000" }}>
      <Dither
        waveColor={[0.9, 0.9, 0.95]}
        backgroundColor={[0, 0, 0]}
        ditherMode="bayer"
        pixelSize={2}
        colorNum={4}
        waveSpeed={0.05}
        clickRipple={true}
      />
    </div>
  );
}`,
        },
      ],
    },
  ],
  prompt: specSource,
};
