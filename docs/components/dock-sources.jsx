import { API } from "./dock.jsx";
import entrySource from "../../src/components/dock/Dock.jsx?raw";
import cssSource from "../../src/components/dock/Dock.css?raw";
import specSource from "../../src/components/dock/SPEC.md?raw";

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
        { name: "Dock.jsx", code: entrySource },
        { name: "Dock.css", code: cssSource },
      ],
      api: API,
      usage: [
        {
          file: "App.jsx",
          code: `import { Dock } from "solen-design/react";

const items = [
  { icon: "🌐", label: "Browser", onClick: () => console.log("browser") },
  { icon: "✉️", label: "Mail", badge: 3, onClick: () => console.log("mail") },
  { separator: true },
  {
    icon: "⚙️",
    label: "Settings",
    menu: [
      { label: "General", shortcut: "⌘," },
      { label: "Appearance", items: [{ label: "Light" }, { label: "Dark" }] },
      { separator: true },
      { label: "Wi-Fi", checked: true }
    ]
  }
];

<div style={{ position: "relative", height: 400 }}>
  <Dock
    items={items}
    position="bottom"
    theme="dark"
    baseItemSize={50}
    magnification={70}
    distance={200}
    panelHeight={68}
    gap={10}
    roundness={0.5}
    bounce={true}
    autoHide={false}
    showLabels={true}
    showIndicators={true}
    showBadges={true}
    badgeColor="#ff453a"
    accentColor="#0a84ff"
  />
</div>`,
        },
      ],
    },
  ],
  prompt: specSource,
};
