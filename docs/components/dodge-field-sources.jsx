import { API } from "./dodge-field.jsx";
import entrySource from "../../src/components/dodge-field/DodgeField.jsx?raw";
import cssSource from "../../src/components/dodge-field/DodgeField.css?raw";
import specSource from "../../src/components/dodge-field/SPEC.md?raw";

const DEP_NOTE = "上方安装命令会自动添加这些依赖。如果手动复制源码，请自行安装。";

export default {
  frameworks: [
    {
      name: "React",
      install: "npm install solen-design react react-dom motion@^12.23.12",
      dependencies: {
        note: DEP_NOTE,
        npm: "npm install react react-dom motion@^12.23.12",
        pnpm: "pnpm add react react-dom motion@^12.23.12",
        yarn: "yarn add react react-dom motion@^12.23.12",
        bun: "bun add react react-dom motion@^12.23.12",
      },
      files: [
        { name: "DodgeField.jsx", code: entrySource },
        { name: "DodgeField.css", code: cssSource },
      ],
      api: API,
      usage: [
        {
          file: "App.jsx",
          code: `import { DodgeField } from "solen-design/react";

<DodgeField
  fieldHeight={240}
  reach={72}
  radius={120}
  falloff={2}
  fleeDuration={130}
  returnDuration={620}
  returnBounce={0.1}
  axis="both"
  wall="clamp"
  patience={4}
  onDodge={(dodges) => console.log("dodge", dodges)}
  onRelent={() => console.log("relented")}
  onCatch={() => console.log("caught")}
/>`,
        },
      ],
    },
  ],
  prompt: specSource,
};
