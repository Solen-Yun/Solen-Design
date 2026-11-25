import { API } from "./stepper.jsx";
import entrySource from "../../src/components/stepper/Stepper.jsx?raw";
import cssSource from "../../src/components/stepper/Stepper.css?raw";
import specSource from "../../src/components/stepper/SPEC.md?raw";

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
        { name: "Stepper.jsx", code: entrySource },
        { name: "Stepper.css", code: cssSource },
      ],
      api: API,
      usage: [
        {
          file: "App.jsx",
          code: `import { Stepper, Step } from "solen-design/react";

<Stepper
  initialStep={1}
  indicator="numbers"
  orientation="horizontal"
  transition="slide"
  linear={false}
  showFooter={true}
  theme="dark"
  frame={true}
  radius={24}
  width={440}
  accentColor="#0a84ff"
  onStepChange={(step) => console.log(step)}
  onFinalStepCompleted={() => console.log("done")}
  completedContent={<p>All set.</p>}
>
  <Step title="Account" description="Basic info">
    <p>Create your account.</p>
  </Step>
  <Step title="Preferences" description="Your use case">
    <p>Tell us how you work.</p>
  </Step>
  <Step title="Confirm" description="Review">
    <p>Confirm and finish.</p>
  </Step>
</Stepper>`,
        },
      ],
    },
  ],
  prompt: specSource,
};
