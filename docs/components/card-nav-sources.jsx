import { API } from "./card-nav.jsx";
import entrySource from "../../src/components/card-nav/CardNav.jsx?raw";
import cssSource from "../../src/components/card-nav/CardNav.css?raw";
import specSource from "../../src/components/card-nav/SPEC.md?raw";

const DEP_NOTE = "上方安装命令会自动添加这些依赖。如果手动复制源码，请自行安装。";

export default {
  frameworks: [
    {
      name: "React",
      install: "npm install solen-design react react-dom @hugeicons/react @hugeicons/core-free-icons",
      dependencies: {
        note: DEP_NOTE,
        npm: "npm install react react-dom @hugeicons/react @hugeicons/core-free-icons",
        pnpm: "pnpm add react react-dom @hugeicons/react @hugeicons/core-free-icons",
        yarn: "yarn add react react-dom @hugeicons/react @hugeicons/core-free-icons",
        bun: "bun add react react-dom @hugeicons/react @hugeicons/core-free-icons",
      },
      files: [
        { name: "CardNav.jsx", code: entrySource },
        { name: "CardNav.css", code: cssSource },
      ],
      api: API,
      usage: [
        {
          file: "App.jsx",
          code: `import { CardNav } from "solen-design/react";

const items = [
  {
    label: "About",
    description: "The people and the story behind the studio.",
    links: [
      { label: "Company", href: "#" },
      { label: "Careers", href: "#" }
    ]
  },
  {
    label: "Projects",
    description: "Selected work from the last few years.",
    links: [
      { label: "Featured", href: "#" },
      { label: "Case studies", href: "#" }
    ]
  }
];

<CardNav
  items={items}
  logo="/logo.svg"
  logoAlt="Home"
  cta={{ label: "Get started", href: "#" }}
  theme="dark"
  surface="glass"
  openOn="click"
  cardEffect="rise"
  stagger={0.12}
  bounce={0.2}
  speed={1}
  cardHeight={176}
  maxWidth={800}
  accentColor="#f5c453"
  menuLabel={true}
  intro={true}
  onOpenChange={(open) => console.log(open)}
/>`,
        },
      ],
    },
  ],
  prompt: specSource,
};
