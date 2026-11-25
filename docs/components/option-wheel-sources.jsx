import { API } from "./option-wheel.jsx";
import entrySource from "../../src/components/option-wheel/OptionWheel.jsx?raw";
import cssSource from "../../src/components/option-wheel/OptionWheel.css?raw";
import specSource from "../../src/components/option-wheel/SPEC.md?raw";

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
        { name: "OptionWheel.jsx", code: entrySource },
        { name: "OptionWheel.css", code: cssSource },
      ],
      api: API,
      usage: [
        {
          file: "App.jsx",
          code: `import { OptionWheel } from "solen-design/react";

const genres = ["Ambient", "House", "Techno", "Jazz", "Lo-Fi", "Synthwave"];

<div style={{ height: 420 }}>
  <OptionWheel
    items={genres}
    defaultSelected={2}
    side="left"
    fontSize={3}
    spacing={1.4}
    curve={1}
    tilt={6}
    blur={2}
    fade={0.25}
    minOpacity={0.05}
    smoothing={200}
    inset={80}
    loop={false}
    draggable={true}
    textColor="#a6a6a6"
    activeColor="#ffffff"
    onChange={(index, item) => console.log(index, item)}
  />
</div>`,
        },
      ],
    },
  ],
  prompt: specSource,
};
