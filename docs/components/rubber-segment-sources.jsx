import { API } from "./rubber-segment.jsx";
import entrySource from "../../src/components/rubber-segment/RubberSegment.jsx?raw";
import cssSource from "../../src/components/rubber-segment/RubberSegment.css?raw";
import specSource from "../../src/components/rubber-segment/SPEC.md?raw";

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
      files: [
        { name: "RubberSegment.jsx", code: entrySource },
        { name: "RubberSegment.css", code: cssSource },
      ],
      api: API,
      usage: [
        {
          file: "App.jsx",
          code: `import { RubberSegment } from "solen-design/react";

<RubberSegment
  items={["Day", "Week", "Month", "Year"]}
  defaultValue="Month"
  size="md"
  radius={10}
  inset={3}
  stretch={100}
  squash={3}
  speed={1}
  glide={75}
  draggable={true}
  equalSlots={true}
  onChange={(value) => console.log(value)}
/>`,
        },
      ],
    },
  ],
  prompt: specSource,
};
