import { API } from "./warm-tooltip.jsx";
import entrySource from "../../src/components/warm-tooltip/WarmTooltip.jsx?raw";
import cssSource from "../../src/components/warm-tooltip/WarmTooltip.css?raw";
import specSource from "../../src/components/warm-tooltip/SPEC.md?raw";

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
        { name: "WarmTooltip.jsx", code: entrySource },
        { name: "WarmTooltip.css", code: cssSource },
      ],
      api: API,
      usage: [
        {
          file: "App.jsx",
          code: `import { WarmTooltip, WarmTooltipGroup } from "solen-design/react";

<WarmTooltipGroup delay={400} warmWindow={300} travel={320} lean={6}>
  <WarmTooltip content="加粗选中文本" shortcut="⌘ B" side="top">
    <button>Bold</button>
  </WarmTooltip>
  <WarmTooltip content="插入链接" shortcut="⌘ K" side="bottom" size="lg">
    <button>Link</button>
  </WarmTooltip>
</WarmTooltipGroup>`,
        },
      ],
    },
  ],
  prompt: specSource,
};
