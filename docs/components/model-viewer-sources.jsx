import { API } from "./model-viewer.jsx";
import entrySource from "../../src/components/model-viewer/ModelViewer.jsx?raw";
import specSource from "../../src/components/model-viewer/SPEC.md?raw";

const DEP_NOTE = "上方安装命令会自动添加这些依赖。如果手动复制源码，请自行安装。";

export default {
  frameworks: [
    {
      name: "React",
      install:
        "npm install solen-design react react-dom three @react-three/fiber @react-three/drei",
      dependencies: {
        note: DEP_NOTE,
        npm: "npm install react react-dom three @react-three/fiber @react-three/drei",
        pnpm: "pnpm add react react-dom three @react-three/fiber @react-three/drei",
        yarn: "yarn add react react-dom three @react-three/fiber @react-three/drei",
        bun: "bun add react react-dom three @react-three/fiber @react-three/drei",
      },
      files: [{ name: "ModelViewer.jsx", code: entrySource }],
      api: API,
      usage: [
        {
          file: "App.jsx",
          code: `import { ModelViewer } from "solen-design/react";

<ModelViewer
  url="/models/shoe.glb"
  width={400}
  height={400}
  environment="studio"
  autoRotate={true}
  autoRotateSpeed={0.4}
  autoRotateDelay={2}
  dragRotate={true}
  zoom={true}
  hoverTilt={0.15}
  float={0.3}
  shadow={true}
  shadowOpacity={0.45}
  intro="rise"
  startAngle={-30}
  tilt={10}
  fit={0.8}
  resetOnDoubleClick={true}
  onModelLoaded={() => console.log("ready")}
/>`,
        },
      ],
    },
  ],
  prompt: specSource,
};
