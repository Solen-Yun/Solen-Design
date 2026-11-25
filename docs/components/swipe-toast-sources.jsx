import { API } from "./swipe-toast.jsx";
import entrySource from "../../src/components/swipe-toast/SwipeToast.jsx?raw";
import cssSource from "../../src/components/swipe-toast/SwipeToast.css?raw";
import specSource from "../../src/components/swipe-toast/SPEC.md?raw";

const DEP_NOTE = "上方安装命令会自动添加这些依赖。如果手动复制源码，请自行安装。";

export default {
  frameworks: [
    {
      name: "React",
      install: "npm install solen-design react react-dom motion @hugeicons/react @hugeicons/core-free-icons",
      dependencies: {
        note: DEP_NOTE,
        npm: "npm install react react-dom motion @hugeicons/react @hugeicons/core-free-icons",
        pnpm: "pnpm add react react-dom motion @hugeicons/react @hugeicons/core-free-icons",
        yarn: "yarn add react react-dom motion @hugeicons/react @hugeicons/core-free-icons",
        bun: "bun add react react-dom motion @hugeicons/react @hugeicons/core-free-icons",
      },
      files: [
        { name: "SwipeToast.jsx", code: entrySource },
        { name: "SwipeToast.css", code: cssSource },
      ],
      api: API,
      usage: [
        {
          file: "App.jsx",
          code: `import { SwipeToast } from "solen-design/react";

const [open, setOpen] = useState(true);

<SwipeToast
  title="File archived"
  description="Drag the card down to dismiss it"
  open={open}
  onClose={() => setOpen(false)}
  actionLabel="Undo"
  onAction={() => console.log("undo")}
  background="#27272a"
  fuseColor="#f5a524"
  duration={4000}
  fuse="bottom"
  swipeDistance={40}
  settleBounce={0.2}
  slideMs={400}
  pauseOnHover={true}
/>`,
        },
      ],
    },
  ],
  prompt: specSource,
};
