import { API } from "./tear-ticket.jsx";
import entrySource from "../../src/components/tear-ticket/TearTicket.jsx?raw";
import cssSource from "../../src/components/tear-ticket/TearTicket.css?raw";
import specSource from "../../src/components/tear-ticket/SPEC.md?raw";

const DEP_NOTE = "上方安装命令会自动添加这些依赖。如果手动复制源码，请自行安装。";

export default {
  frameworks: [
    {
      name: "React",
      install: "npm install solen-design react react-dom motion",
      dependencies: {
        note: DEP_NOTE,
        npm: "npm install react react-dom motion",
        pnpm: "pnpm add react react-dom motion",
        yarn: "yarn add react react-dom motion",
        bun: "bun add react react-dom motion",
      },
      files: [
        { name: "TearTicket.jsx", code: entrySource },
        { name: "TearTicket.css", code: cssSource },
      ],
      api: API,
      usage: [
        {
          file: "App.jsx",
          code: `import { useState } from "react";
import { TearTicket } from "solen-design/react";

const [torn, setTorn] = useState(false);

<TearTicket
  width={460}
  height={250}
  stubSize={150}
  holes={12}
  holeSize={6}
  roughness={2}
  tearAngle={30}
  stretch={30}
  resistance={0.45}
  torn={torn}
  onTear={() => setTorn(true)}
  ariaLabel="Tear off the stub"
  stub={<strong>ADMIT ONE</strong>}
>
  <h3>Solen Live</h3>
  <p>2026-11-21 19:30 · Gate 4</p>
</TearTicket>`,
        },
      ],
    },
  ],
  prompt: specSource,
};
