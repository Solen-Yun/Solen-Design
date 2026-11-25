import { API } from "./elastic-mesh.jsx";
import entrySource from "../../src/components/elastic-mesh/ElasticMesh.jsx?raw";
import cssSource from "../../src/components/elastic-mesh/ElasticMesh.css?raw";
import specSource from "../../src/components/elastic-mesh/SPEC.md?raw";

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
        { name: "ElasticMesh.jsx", code: entrySource },
        { name: "ElasticMesh.css", code: cssSource },
      ],
      api: API,
      usage: [
        {
          file: "App.jsx",
          code: `import { ElasticMesh } from "solen-design/react";

<div style={{ width: "100%", height: 320 }}>
  <ElasticMesh
    text="Squish"
    color="#3b5bff"
    material="balloon"
    inflate={1}
    stiffness={0.5}
    wobble={0.6}
    grabRadius={70}
    stretch={0.5}
    press={0.5}
    shadow={0.5}
    intro={true}
    theme="dark"
  />
</div>`,
        },
      ],
    },
  ],
  prompt: specSource,
};
