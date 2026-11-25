import { API } from "./count-up.jsx";
import entrySource from "../../src/components/count-up/CountUp.jsx?raw";
import specSource from "../../src/components/count-up/SPEC.md?raw";

const DEP_NOTE = "上方安装命令会自动添加这些依赖。如果手动复制源码，请自行安装。";

export default {
  frameworks: [
    {
      name: "React",
      install: "npm install solen-design react react-dom motion",
      dependencies: {
        note: DEP_NOTE,
        npm: "npm install react react-dom motion",
        pnpm: "pnpm add react react-dom motion",
        yarn: "yarn add react react-dom motion",
        bun: "bun add react react-dom motion",
      },
      files: [{ name: "CountUp.jsx", code: entrySource }],
      api: API,
      usage: [
        {
          file: "App.jsx",
          code: `import { CountUp } from "solen-design/react";

<CountUp
  to={4096}
  from={0}
  duration={2}
  delay={0}
  mode="count"
  easing="easeOut"
  format="standard"
  trigger="view"
  separator=","
  replayOnHover={false}
  onEnd={() => console.log("done")}
/>`,
        },
      ],
    },
  ],
  prompt: specSource,
};
