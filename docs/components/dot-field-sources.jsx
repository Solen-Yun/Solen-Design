import { API } from "./dot-field.jsx";
import entrySource from "../../src/components/dot-field/DotField.jsx?raw";
import cssSource from "../../src/components/dot-field/DotField.css?raw";
import specSource from "../../src/components/dot-field/SPEC.md?raw";

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
        { name: "DotField.jsx", code: entrySource },
        { name: "DotField.css", code: cssSource },
      ],
      api: API,
      usage: [
        {
          file: "App.jsx",
          code: `import { DotField } from "solen-design/react";

export default function App() {
  return (
    <div style={{ position: "relative", height: "100vh", background: "#0a0a0f" }}>
      <DotField
        pattern="grid"
        gradientFrom="#5227FF"
        gradientTo="#FF9FFC"
        gradientAngle={135}
        cursorRadius={240}
        bulgeStrength={0.6}
        glowColor="#ffffff"
        glowIntensity={0.8}
        sparkle={true}
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
