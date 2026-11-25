import { API } from "./scroll-stack.jsx";
import entrySource from "../../src/components/scroll-stack/ScrollStack.jsx?raw";
import cssSource from "../../src/components/scroll-stack/ScrollStack.css?raw";
import specSource from "../../src/components/scroll-stack/SPEC.md?raw";

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
        { name: "ScrollStack.jsx", code: entrySource },
        { name: "ScrollStack.css", code: cssSource },
      ],
      api: API,
      usage: [
        {
          file: "App.jsx",
          code: `import { ScrollStack, ScrollStackItem } from "solen-design/react";

<ScrollStack
  itemDistance={100}
  itemStackDistance={24}
  stackPosition="15%"
  itemScale={0.05}
  baseScale={0.8}
  dimAmount={0.2}
  blurAmount={0}
  tiltAmount={0}
  rotationAmount={0}
  holdDistance={200}
  smoothScroll={true}
  snap={false}
  useWindowScroll={false}
  onStackComplete={() => console.log("stacked")}
>
  <ScrollStackItem>第一张卡</ScrollStackItem>
  <ScrollStackItem>第二张卡</ScrollStackItem>
  <ScrollStackItem>第三张卡</ScrollStackItem>
</ScrollStack>`,
        },
      ],
    },
  ],
  prompt: specSource,
};
