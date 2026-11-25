import { API } from "./branched-menu.jsx";
import entrySource from "../../src/components/branched-menu/BranchedMenu.jsx?raw";
import cssSource from "../../src/components/branched-menu/BranchedMenu.css?raw";
import specSource from "../../src/components/branched-menu/SPEC.md?raw";

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
        { name: "BranchedMenu.jsx", code: entrySource },
        { name: "BranchedMenu.css", code: cssSource },
      ],
      api: API,
      usage: [
        {
          file: "App.jsx",
          code: `import { BranchedMenu } from "solen-design/react";

<BranchedMenu
  items={[
    { label: "开始使用", children: [{ value: "install", label: "安装" }, { value: "quick", label: "快速上手" }] },
    { label: "组件", children: [{ value: "buttons", label: "按钮" }] }
  ]}
  defaultOpen={[0]}
  defaultActive="quick"
  onSelect={(value, item) => navigate(value)}
/>`,
        },
      ],
    },
  ],
  prompt: specSource,
};
