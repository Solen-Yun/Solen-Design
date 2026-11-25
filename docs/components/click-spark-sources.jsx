import { API } from "./click-spark.jsx";
import entrySource from "../../src/components/click-spark/ClickSpark.jsx?raw";
import specSource from "../../src/components/click-spark/SPEC.md?raw";

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
        { name: "ClickSpark.jsx", code: entrySource },
      ],
      api: API,
      usage: [
        {
          file: "App.jsx",
          code: `import { useRef } from "react";
import { ClickSpark } from "solen-design/react";

export default function App() {
  const sparkRef = useRef(null);
  return (
    <ClickSpark
      ref={sparkRef}
      shape="streak"
      sparkColor={["#ffffff", "#fbbf24", "#f472b6"]}
      sparkRadius={34}
      sparkCount={10}
      glow={0.5}
      ring={true}
    >
      <button onClick={() => sparkRef.current?.spark()}>点我溅射</button>
    </ClickSpark>
  );
}`,
        },
      ],
    },
  ],
  prompt: specSource,
};
