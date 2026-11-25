import { API } from "./slosh-gauge.jsx";
import entrySource from "../../src/components/slosh-gauge/SloshGauge.jsx?raw";
import cssSource from "../../src/components/slosh-gauge/SloshGauge.css?raw";
import specSource from "../../src/components/slosh-gauge/SPEC.md?raw";

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
        { name: "SloshGauge.jsx", code: entrySource },
        { name: "SloshGauge.css", code: cssSource },
      ],
      api: API,
      usage: [
        {
          file: "App.jsx",
          code: `import { SloshGauge } from "solen-design/react";

const [level, setLevel] = useState(60);

<SloshGauge
  value={level}
  onChange={setLevel}
  interactive={true}
  showValue={true}
  liquidColor="#f5f5f5"
  glassColor="#27272a"
  width={88}
  height={180}
  ticks={4}
  viscosity={0.15}
  tilt={0.45}
  splash={0.42}
/>`,
        },
      ],
    },
  ],
  prompt: specSource,
};
