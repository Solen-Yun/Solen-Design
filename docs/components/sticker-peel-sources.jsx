import { API } from "./sticker-peel.jsx";
import entrySource from "../../src/components/sticker-peel/StickerPeel.jsx?raw";
import cssSource from "../../src/components/sticker-peel/StickerPeel.css?raw";
import specSource from "../../src/components/sticker-peel/SPEC.md?raw";

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
        { name: "StickerPeel.jsx", code: entrySource },
        { name: "StickerPeel.css", code: cssSource },
      ],
      api: API,
      usage: [
        {
          file: "App.jsx",
          code: `import { StickerPeel } from "solen-design/react";

export default function App() {
  return (
    <section style={{ position: "relative", height: "100vh", overflow: "hidden" }}>
      <StickerPeel
        imageSrc="/sticker.png"
        width={180}
        finish="holo"
        peelBackHoverPct={25}
        peelBackActivePct={40}
        curlRadius={12}
        onDragEnd={() => console.log("released")}
      />
    </section>
  );
}`,
        },
      ],
    },
  ],
  prompt: specSource,
};
