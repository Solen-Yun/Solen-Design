import { API } from "./reflective-card.jsx";
import entrySource from "../../src/components/reflective-card/ReflectiveCard.jsx?raw";
import cssSource from "../../src/components/reflective-card/ReflectiveCard.css?raw";
import specSource from "../../src/components/reflective-card/SPEC.md?raw";

const DEP_NOTE = "上方安装命令会自动添加这些依赖。如果手动复制源码，请自行安装。";

export default {
  frameworks: [
    {
      name: "React",
      install: "npm install solen-design react react-dom @hugeicons/react @hugeicons/core-free-icons",
      dependencies: {
        note: DEP_NOTE,
        npm: "npm install react react-dom @hugeicons/react@^1.1.10 @hugeicons/core-free-icons@^4.3.3",
        pnpm: "pnpm add react react-dom @hugeicons/react@^1.1.10 @hugeicons/core-free-icons@^4.3.3",
        yarn: "yarn add react react-dom @hugeicons/react@^1.1.10 @hugeicons/core-free-icons@^4.3.3",
        bun: "bun add react react-dom @hugeicons/react@^1.1.10 @hugeicons/core-free-icons@^4.3.3",
      },
      files: [
        { name: "ReflectiveCard.jsx", code: entrySource },
        { name: "ReflectiveCard.css", code: cssSource },
      ],
      api: API,
      usage: [
        {
          file: "App.jsx",
          code: `import { ReflectiveCard } from "solen-design/react";

<ReflectiveCard
  name="Alexander Doe"
  role="Senior Developer"
  badge="Verified"
  status="Active"
  idLabel="ID number"
  idValue="8901 2345 6789"
  theme="dark"
  tint="#ffffff"
  metalness={1}
  roughness={0.3}
  blurStrength={6}
  grayscale={1}
  warp={0.6}
  shine={1}
  bevel={3}
  glare={0.5}
  enableTilt={true}
  tiltStrength={12}
  intro={true}
  width={320}
  height={500}
  radius={24}
/>`,
        },
      ],
    },
  ],
  prompt: specSource,
};
