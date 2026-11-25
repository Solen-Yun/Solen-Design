import { API } from "./shredder.jsx";
import entrySource from "../../src/components/shredder/Shredder.jsx?raw";
import cssSource from "../../src/components/shredder/Shredder.css?raw";
import specSource from "../../src/components/shredder/SPEC.md?raw";

const DEP_NOTE = "上方安装命令会自动添加这些依赖。如果手动复制源码，请自行安装。";

export default {
  frameworks: [
    {
      name: "React",
      install: "npm install solen-design react react-dom@^19.0.0",
      dependencies: {
        note: DEP_NOTE,
        npm: "npm install react react-dom@^19.0.0",
        pnpm: "pnpm add react react-dom@^19.0.0",
        yarn: "yarn add react react-dom@^19.0.0",
        bun: "bun add react react-dom@^19.0.0",
      },
      files: [
        { name: "Shredder.jsx", code: entrySource },
        { name: "Shredder.css", code: cssSource },
      ],
      api: API,
      usage: [
        {
          file: "App.jsx",
          code: `import { Shredder } from "solen-design/react";

const docs = [
  { id: "a", emoji: "📄", title: "合同草案" },
  { id: "b", emoji: "🧾", title: "报销单据" },
  { id: "c", emoji: "📊", title: "季度报表" }
];

<Shredder
  items={docs}
  width={340}
  height={460}
  color="#f5f5f5"
  slitColor="#3f3f46"
  stripWidth={10}
  curl={1}
  renderItem={(item, index) => (
    <div style={{ background: "#27272a", color: "#f5f5f5", padding: "12px 14px", borderRadius: 12 }}>
      {item.emoji} {item.title} #{index + 1}
    </div>
  )}
  onShred={(item) => console.log("shredded", item.id)}
  onReorder={(items) => console.log("order", items)}
/>`,
        },
      ],
    },
  ],
  prompt: specSource,
};
