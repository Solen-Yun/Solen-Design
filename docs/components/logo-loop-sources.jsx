import { API } from "./logo-loop.jsx";
import entrySource from "../../src/components/logo-loop/LogoLoop.jsx?raw";
import cssSource from "../../src/components/logo-loop/LogoLoop.css?raw";
import specSource from "../../src/components/logo-loop/SPEC.md?raw";

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
        { name: "LogoLoop.jsx", code: entrySource },
        { name: "LogoLoop.css", code: cssSource },
      ],
      api: API,
      usage: [
        {
          file: "App.jsx",
          code: `import { LogoLoop } from "solen-design/react";

const logos = [
  { src: "/logos/aurora.svg", alt: "Aurora", title: "Aurora" },
  { src: "/logos/meridian.svg", alt: "Meridian", title: "Meridian" },
  { src: "/logos/polaris.svg", alt: "Polaris", title: "Polaris" },
  { node: <span style={{ fontWeight: 700 }}>✦ 星澜</span>, title: "星澜" }
];

<LogoLoop
  logos={logos}
  speed={120}
  direction="left"
  logoHeight={28}
  gap={32}
  fadeOut={true}
  pauseOnHover={true}
  ariaLabel="合作伙伴"
/>`,
        },
      ],
    },
  ],
  prompt: specSource,
};
