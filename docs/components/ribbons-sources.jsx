import { API } from "./ribbons.jsx";
import entrySource from "../../src/components/ribbons/Ribbons.jsx?raw";
import cssSource from "../../src/components/ribbons/Ribbons.css?raw";
import specSource from "../../src/components/ribbons/SPEC.md?raw";

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
        { name: "Ribbons.jsx", code: entrySource },
        { name: "Ribbons.css", code: cssSource },
      ],
      api: API,
      usage: [
        {
          file: "App.jsx",
          code: `import { Ribbons } from "solen-design/react";

export default function App() {
  return (
    <div style={{ width: "100%", height: "100vh", position: "relative" }}>
      <Ribbons colors={["#3847ff", "#7c84ff", "#c7cbff"]} thickness={30} bounce={0.5} wave={0.3} />
      <div style={{ position: "relative", padding: "30vh 10vw" }}>
        <h1>Chase the ribbons</h1>
      </div>
    </div>
  );
}`,
        },
      ],
    },
  ],
  prompt: specSource,
};
