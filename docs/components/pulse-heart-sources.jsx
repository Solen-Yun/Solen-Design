import { API } from "./pulse-heart.jsx";
import entrySource from "../../src/components/pulse-heart/PulseHeart.jsx?raw";
import cssSource from "../../src/components/pulse-heart/PulseHeart.css?raw";
import specSource from "../../src/components/pulse-heart/SPEC.md?raw";

const DEP_NOTE = "上方安装命令会自动添加这些依赖。如果手动复制源码，请自行安装。";

export default {
  frameworks: [
    {
      name: "React",
      install: "npm install solen-design react react-dom @hugeicons/core-free-icons",
      dependencies: {
        note: DEP_NOTE,
        npm: "npm install react react-dom @hugeicons/core-free-icons",
        pnpm: "pnpm add react react-dom @hugeicons/core-free-icons",
        yarn: "yarn add react react-dom @hugeicons/core-free-icons",
        bun: "bun add react react-dom @hugeicons/core-free-icons",
      },
      files: [
        { name: "PulseHeart.jsx", code: entrySource },
        { name: "PulseHeart.css", code: cssSource },
      ],
      api: API,
      usage: [
        {
          file: "App.jsx",
          code: `import { PulseHeart } from "solen-design/react";

<PulseHeart
  defaultLiked={false}
  count={928}
  icon="heart"
  size={40}
  corner={32}
  likedColor="#ff4d6d"
  idleColor="#8b8b93"
  pillColor="#232326"
  textColor="#f5f5f5"
  duration={560}
  dotSize={0.3}
  overshoot={1.7}
  beat={3}
  rollDuration={350}
  onChange={(liked, count) => console.log(liked, count)}
/>`,
        },
      ],
    },
  ],
  prompt: specSource,
};
