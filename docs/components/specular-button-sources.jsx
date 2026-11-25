import { API } from "./specular-button.jsx";
import entrySource from "../../src/components/specular-button/SpecularButton.jsx?raw";
import cssSource from "../../src/components/specular-button/SpecularButton.css?raw";
import specSource from "../../src/components/specular-button/SPEC.md?raw";

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
        { name: "SpecularButton.jsx", code: entrySource },
        { name: "SpecularButton.css", code: cssSource },
      ],
      api: API,
      usage: [
        {
          file: "App.jsx",
          code: `import { SpecularButton } from "solen-design/react";

<SpecularButton
  size="lg"
  radius={18}
  tint="#18181b"
  tintOpacity={1}
  textColor="#fafafa"
  lineColor="#ffffff"
  baseColor="#3f3f46"
  intensity={1}
  idleIntensity={0.35}
  shineSize={10}
  shineFade={34}
  thickness={1.2}
  glow={1}
  followMouse
  proximity={250}
  onClick={() => console.log('clicked')}
>
  Get Started
</SpecularButton>`,
        },
      ],
    },
  ],
  prompt: specSource,
};
