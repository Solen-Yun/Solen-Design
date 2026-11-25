import { API } from "./bubble-menu.jsx";
import entrySource from "../../src/components/bubble-menu/BubbleMenu.jsx?raw";
import cssSource from "../../src/components/bubble-menu/BubbleMenu.css?raw";
import specSource from "../../src/components/bubble-menu/SPEC.md?raw";

const DEP_NOTE = "上方安装命令会自动添加这些依赖。如果手动复制源码，请自行安装。";

export default {
  frameworks: [
    {
      name: "React",
      install: "npm install solen-design react react-dom gsap",
      dependencies: {
        note: DEP_NOTE,
        npm: "npm install react react-dom gsap",
        pnpm: "pnpm add react react-dom gsap",
        yarn: "yarn add react react-dom gsap",
        bun: "bun add react react-dom gsap",
      },
      files: [
        { name: "BubbleMenu.jsx", code: entrySource },
        { name: "BubbleMenu.css", code: cssSource },
      ],
      api: API,
      usage: [
        {
          file: "App.jsx",
          code: `import { BubbleMenu } from "solen-design/react";

const items = [
  { label: "home", href: "#", ariaLabel: "Home", rotation: -8, hoverStyles: { bgColor: "#3b82f6", textColor: "#ffffff" } },
  { label: "about", href: "#", ariaLabel: "About", rotation: 8, hoverStyles: { bgColor: "#10b981", textColor: "#ffffff" } },
  { label: "projects", href: "#", ariaLabel: "Work", rotation: 8, hoverStyles: { bgColor: "#f59e0b", textColor: "#ffffff" } },
  { label: "blog", href: "#", ariaLabel: "Blog", rotation: -8, hoverStyles: { bgColor: "#ef4444", textColor: "#ffffff" } },
  { label: "contact", href: "#", ariaLabel: "Contact", rotation: 8, hoverStyles: { bgColor: "#8b5cf6", textColor: "#ffffff" } }
];

<BubbleMenu
  logo={<span style={{ fontWeight: 700 }}>◐ studio</span>}
  items={items}
  menuBg="#fff"
  menuContentColor="#111"
  animationEase="back.out(1.5)"
  animationDuration={0.5}
  staggerDelay={0.12}
  onMenuClick={(open) => console.log(open)}
/>`,
        },
      ],
    },
  ],
  prompt: specSource,
};
