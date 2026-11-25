import { API } from "./elastic-slider.jsx";
import entrySource from "../../src/components/elastic-slider/ElasticSlider.jsx?raw";
import cssSource from "../../src/components/elastic-slider/ElasticSlider.css?raw";
import specSource from "../../src/components/elastic-slider/SPEC.md?raw";

const DEP_NOTE = "上方安装命令会自动添加这些依赖。如果手动复制源码，请自行安装。";

export default {
  frameworks: [
    {
      name: "React",
      install: "npm install solen-design react react-dom @hugeicons/react @hugeicons/core-free-icons",
      dependencies: {
        note: DEP_NOTE,
        npm: "npm install react react-dom @hugeicons/react @hugeicons/core-free-icons",
        pnpm: "pnpm add react react-dom @hugeicons/react @hugeicons/core-free-icons",
        yarn: "yarn add react react-dom @hugeicons/react @hugeicons/core-free-icons",
        bun: "bun add react react-dom @hugeicons/react @hugeicons/core-free-icons",
      },
      files: [
        { name: "ElasticSlider.jsx", code: entrySource },
        { name: "ElasticSlider.css", code: cssSource },
      ],
      api: API,
      usage: [
        {
          file: "App.jsx",
          code: `import { ElasticSlider } from "solen-design/react";

<ElasticSlider
  defaultValue={50}
  startingValue={0}
  maxValue={100}
  isStepped={false}
  orientation="horizontal"
  iconPlacement="outside"
  valuePosition="top"
  ticks={false}
  thumb={false}
  thickness={6}
  activeThickness={12}
  maxStretch={50}
  bounce={0.5}
  jumpToClick={true}
  wheel={false}
  rangeColor="#0a84ff"
  thumbColor="#ffffff"
  onChange={(value) => console.log(value)}
  onChangeEnd={(value) => console.log("settled", value)}
/>`,
        },
      ],
    },
  ],
  prompt: specSource,
};
