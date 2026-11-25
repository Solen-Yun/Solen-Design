import { API } from "./staggered-menu.jsx";
import entrySource from "../../src/components/staggered-menu/StaggeredMenu.jsx?raw";
import cssSource from "../../src/components/staggered-menu/StaggeredMenu.css?raw";
import specSource from "../../src/components/staggered-menu/SPEC.md?raw";

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
        { name: "StaggeredMenu.jsx", code: entrySource },
        { name: "StaggeredMenu.css", code: cssSource },
      ],
      api: API,
      usage: [
        {
          file: "App.jsx",
          code: `import { StaggeredMenu } from "solen-design/react";

const items = [
  { label: "Home", link: "#", ariaLabel: "Home" },
  { label: "Work", link: "#", ariaLabel: "Work" },
  { label: "About", link: "#", ariaLabel: "About" },
  { label: "Contact", link: "#", ariaLabel: "Contact" }
];

const socials = [
  { label: "Email", link: "#" },
  { label: "Blog", link: "#" }
];

<StaggeredMenu
  position="right"
  items={items}
  socialItems={socials}
  colors={["#B497CF", "#5227FF"]}
  accentColor="#5227FF"
  menuButtonColor="#fff"
  openMenuButtonColor="#fff"
  displayItemNumbering={true}
  displaySocials={true}
  changeMenuColorOnOpen={true}
  closeOnClickAway={true}
  onMenuOpen={() => console.log("open")}
  onMenuClose={() => console.log("close")}
/>`,
        },
      ],
    },
  ],
  prompt: specSource,
};
