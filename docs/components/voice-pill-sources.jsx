import { API } from "./voice-pill.jsx";
import entrySource from "../../src/components/voice-pill/VoicePill.jsx?raw";
import cssSource from "../../src/components/voice-pill/VoicePill.css?raw";
import specSource from "../../src/components/voice-pill/SPEC.md?raw";

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
        { name: "VoicePill.jsx", code: entrySource },
        { name: "VoicePill.css", code: cssSource },
      ],
      api: API,
      usage: [
        {
          file: "App.jsx",
          code: `import { VoicePill } from "solen-design/react";

<VoicePill
  size={28}
  shape="pill"
  reach={8}
  showTime={true}
  waveform={true}
  slideToCancel={true}
  cancelDistance={64}
  mode="auto"
  reactive="simulated"
  ariaLabel="Dictate"
  onStart={() => console.log("recording")}
  onStop={(info) => console.log(info.reason, info.duration)}
/>`,
        },
      ],
    },
  ],
  prompt: specSource,
};
