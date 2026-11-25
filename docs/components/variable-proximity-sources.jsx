import { API } from "./variable-proximity.jsx";
import entrySource from "../../src/components/variable-proximity/VariableProximity.jsx?raw";
import cssSource from "../../src/components/variable-proximity/VariableProximity.css?raw";
import specSource from "../../src/components/variable-proximity/SPEC.md?raw";

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
        { name: "VariableProximity.jsx", code: entrySource },
        { name: "VariableProximity.css", code: cssSource },
      ],
      api: API,
      usage: [
        {
          file: "App.jsx",
          code: `import { useRef } from "react";
import { VariableProximity } from "solen-design/react";

const boxRef = useRef(null);

<div ref={boxRef} style={{ width: "100%", height: "40vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
  <VariableProximity
    label="Proximity"
    containerRef={boxRef}
    radius={50}
    falloff="linear"
    smoothing={0.2}
    fontSize={72}
  />
</div>`,
        },
      ],
    },
  ],
  prompt: specSource,
};
