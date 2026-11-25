import { API } from "./ascii-text.jsx";
import entrySource from "../../src/components/ascii-text/ASCIIText.jsx?raw";
import specSource from "../../src/components/ascii-text/SPEC.md?raw";

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
      files: [{ name: "ASCIIText.jsx", code: entrySource }],
      api: API,
      usage: [
        {
          file: "App.jsx",
          code: `import { ASCIIText } from "solen-design/react";

<div style={{ position: "relative", height: 320 }}>
  <ASCIIText
    text="Hey!"
    asciiFontSize={8}
    textColor="#fdf9f3"
    colors={["#ff6188", "#fc9867", "#ffd866"]}
    textScale={1}
    blocks={0.9}
    waves={1}
    waveSpeed={1}
    chroma={1}
    tilt={1}
    hueShift={1}
    scramble={0.6}
    clickRipple={true}
    intro={true}
    idle={true}
    interactive={true}
    theme="dark"
  />
</div>`,
        },
      ],
    },
  ],
  prompt: specSource,
};
