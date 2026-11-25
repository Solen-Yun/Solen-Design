import { API } from "./swipe-row.jsx";
import entrySource from "../../src/components/swipe-row/SwipeRow.jsx?raw";
import cssSource from "../../src/components/swipe-row/SwipeRow.css?raw";
import specSource from "../../src/components/swipe-row/SPEC.md?raw";

const DEP_NOTE = "上方安装命令会自动添加这些依赖。如果手动复制源码，请自行安装。";

export default {
  frameworks: [
    {
      name: "React",
      install:
        "npm install solen-design react react-dom motion@^12.23.12 @hugeicons/react@^1.1.10 @hugeicons/core-free-icons@^4.3.3",
      dependencies: {
        note: DEP_NOTE,
        npm: "npm install react react-dom motion@^12.23.12 @hugeicons/react@^1.1.10 @hugeicons/core-free-icons@^4.3.3",
        pnpm: "pnpm add react react-dom motion@^12.23.12 @hugeicons/react@^1.1.10 @hugeicons/core-free-icons@^4.3.3",
        yarn: "yarn add react react-dom motion@^12.23.12 @hugeicons/react@^1.1.10 @hugeicons/core-free-icons@^4.3.3",
        bun: "bun add react react-dom motion@^12.23.12 @hugeicons/react@^1.1.10 @hugeicons/core-free-icons@^4.3.3",
      },
      files: [
        { name: "SwipeRow.jsx", code: entrySource },
        { name: "SwipeRow.css", code: cssSource },
      ],
      api: API,
      usage: [
        {
          file: "App.jsx",
          code: `import { SwipeRow } from "solen-design/react";

const actions = [
  { id: "delete", label: "删除" },
  { id: "pin", label: "置顶" },
  { id: "mute", label: "静音", dismiss: true }
];

<SwipeRow
  actions={actions}
  direction="left"
  height={64}
  radius={16}
  actionWidth={80}
  commitAt={0.6}
  fullSwipe={true}
  onCommit={(action) => console.log("commit", action.id)}
  onOpenChange={(open) => console.log("open", open)}
>
  <strong style={{ fontWeight: 600 }}>阿达 · 陈</strong>
  <span style={{ opacity: 0.55 }}>刚转发了一份合同</span>
</SwipeRow>`,
        },
      ],
    },
  ],
  prompt: specSource,
};
