import { API } from "./glare-hover.jsx";
import entrySource from "../../src/components/glare-hover/GlareHover.jsx?raw";
import cssSource from "../../src/components/glare-hover/GlareHover.css?raw";
import specSource from "../../src/components/glare-hover/SPEC.md?raw";

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
        { name: "GlareHover.jsx", code: entrySource },
        { name: "GlareHover.css", code: cssSource },
      ],
      api: API,
      usage: [
        {
          file: "App.jsx",
          code: `import { GlareHover } from "solen-design/react";

<GlareHover
  width={320}
  height={200}
  background="linear-gradient(135deg, #1e1b4b, #831843)"
  borderRadius="16px"
  glareColor="#ffffff"
  glareOpacity={0.5}
  glareAngle={-45}
  glareSize={30}
  softness={0.6}
  variant="streak"
  blendMode="screen"
  rimGlint={true}
  mode="hover"
  transitionDuration={650}
>
  <div>你的内容</div>
</GlareHover>`,
        },
      ],
    },
  ],
  prompt: specSource,
};
