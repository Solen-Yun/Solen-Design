import { API } from "./wake-slider.jsx";
import entrySource from "../../src/components/wake-slider/WakeSlider.jsx?raw";
import cssSource from "../../src/components/wake-slider/WakeSlider.css?raw";
import specSource from "../../src/components/wake-slider/SPEC.md?raw";

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
        { name: "WakeSlider.jsx", code: entrySource },
        { name: "WakeSlider.css", code: cssSource },
      ],
      api: API,
      usage: [
        {
          file: "App.jsx",
          code: `import { useState } from "react";
import { WakeSlider } from "solen-design/react";

const [volume, setVolume] = useState(50);

<WakeSlider
  value={volume}
  onChange={setVolume}
  min={0}
  max={100}
  step={1}
  bars={32}
  height={56}
  restHeight={12}
  reach={6}
  skew={0.6}
  showValue={true}
  ariaLabel="Volume"
/>`,
        },
      ],
    },
  ],
  prompt: specSource,
};
