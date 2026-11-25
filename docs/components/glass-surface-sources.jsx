import { API } from "./glass-surface.jsx";
import entrySource from "../../src/components/glass-surface/GlassSurface.jsx?raw";
import cssSource from "../../src/components/glass-surface/GlassSurface.css?raw";
import specSource from "../../src/components/glass-surface/SPEC.md?raw";

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
        { name: "GlassSurface.jsx", code: entrySource },
        { name: "GlassSurface.css", code: cssSource },
      ],
      api: API,
      usage: [
        {
          file: "App.jsx",
          code: `import { GlassSurface } from "solen-design/react";

<GlassSurface
  width={340}
  height={150}
  borderRadius={28}
  borderWidth={0.07}
  brightness={50}
  opacity={0.93}
  blur={11}
  displace={0}
  backgroundOpacity={0}
  saturation={1}
  distortionScale={-180}
  redOffset={0}
  greenOffset={10}
  blueOffset={20}
  xChannel="R"
  yChannel="G"
  mixBlendMode="difference"
  refraction={true}
  renderer="auto"
>
  <span>液态玻璃</span>
</GlassSurface>`,
        },
      ],
    },
  ],
  prompt: specSource,
};
