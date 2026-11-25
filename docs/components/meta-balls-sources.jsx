import { API } from "./meta-balls.jsx";
import entrySource from "../../src/components/meta-balls/MetaBalls.jsx?raw";
import cssSource from "../../src/components/meta-balls/MetaBalls.css?raw";
import specSource from "../../src/components/meta-balls/SPEC.md?raw";

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
        { name: "MetaBalls.jsx", code: entrySource },
        { name: "MetaBalls.css", code: cssSource },
      ],
      api: API,
      usage: [
        {
          file: "App.jsx",
          code: `import { MetaBalls } from "solen-design/react";

export default function App() {
  return (
    <section style={{ position: "relative", height: "100vh" }}>
      <MetaBalls
        color="#ffffff"
        cursorBallColor="#8ee6f2"
        speed={0.3}
        ballCount={15}
        animationSize={30}
        cursorBallSize={3}
        gooeyness={0.5}
        stickiness={0.5}
        variant="solid"
        motion="orbit"
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
