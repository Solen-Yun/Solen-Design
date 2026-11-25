import { API } from "./glide-select.jsx";
import entrySource from "../../src/components/glide-select/GlideSelect.jsx?raw";
import cssSource from "../../src/components/glide-select/GlideSelect.css?raw";
import specSource from "../../src/components/glide-select/SPEC.md?raw";

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
        { name: "GlideSelect.jsx", code: entrySource },
        { name: "GlideSelect.css", code: cssSource },
      ],
      api: API,
      usage: [
        {
          file: "App.jsx",
          code: `import { GlideSelect } from "solen-design/react";

const options = [
  { value: "linear", label: "Linear" },
  { value: "softmax", label: "Softmax", tag: "推荐" },
  { value: "beam", label: "Beam" }
];

<GlideSelect
  options={options}
  defaultValue="softmax"
  size="md"
  placement="bottom"
  align="left"
  menuWidth={176}
  popDuration={180}
  glideDuration={220}
  rememberPosition={true}
  onChange={(value, item) => console.log(value, item)}
/>`,
        },
      ],
    },
  ],
  prompt: specSource,
};
