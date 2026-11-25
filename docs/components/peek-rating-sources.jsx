import { API } from "./peek-rating.jsx";
import entrySource from "../../src/components/peek-rating/PeekRating.jsx?raw";
import cssSource from "../../src/components/peek-rating/PeekRating.css?raw";
import specSource from "../../src/components/peek-rating/SPEC.md?raw";

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
        { name: "PeekRating.jsx", code: entrySource },
        { name: "PeekRating.css", code: cssSource },
      ],
      api: API,
      usage: [
        {
          file: "App.jsx",
          code: `import { PeekRating } from "solen-design/react";

<PeekRating
  defaultValue={3}
  shape="star"
  count={5}
  size={28}
  activeColor="#f5b400"
  idleColor="#52525b"
  lift={6}
  magnify={1.15}
  riseDuration={320}
  popScale={1.3}
  showTip={true}
  allowClear={true}
  labels={["Bad", "Meh", "Fine", "Good", "Great"]}
  onChange={(value) => console.log(value)}
/>`,
        },
      ],
    },
  ],
  prompt: specSource,
};
