import entrySource from "../../src/components/video-text-title/VideoTextTitle.tsx?raw";
import engineSource from "../../src/components/video-text-title/VideoTextTitleEngine.js?raw";
import runtimeSource from "../../src/components/video-text-title/motion-runtime.ts?raw";
import typesSource from "../../src/components/video-text-title/VideoTextTitleEngine.d.ts?raw";
import vueSource from "../../src/frameworks/vue/VideoTextTitle.vue?raw";
import svelteSource from "../../src/frameworks/svelte/VideoTextTitle.svelte?raw";
import solidSource from "../../src/frameworks/solid/VideoTextTitle.solid.tsx?raw";
import preactSource from "../../src/frameworks/preact/VideoTextTitle.preact.tsx?raw";
import vanillaSource from "../../src/frameworks/vanilla/VideoTextTitle.ts?raw";
import specSource from "../../src/components/video-text-title/SPEC.md?raw";

const CORE = [
  { name: "VideoTextTitleEngine.js", code: engineSource },
  { name: "motion-runtime.ts", code: runtimeSource },
  { name: "VideoTextTitleEngine.d.ts", code: typesSource },
];

const DEP_NOTE = "上方安装命令会自动添加这些依赖。如果手动复制源码，请自行安装。";

const deps = (pkg) => ({
  note: DEP_NOTE,
  npm: `npm install ${pkg}`,
  pnpm: `pnpm add ${pkg}`,
  yarn: `yarn add ${pkg}`,
  bun: `bun add ${pkg}`,
});

export default {
  frameworks: [
    {
      name: "React",
      install: "npm install solen-design react react-dom",
      dependencies: deps("react react-dom"),
      files: [{ name: "VideoTextTitle.tsx", code: entrySource }, ...CORE],
      api: [
        { name: "options", type: "VideoTextTitleOptions", default: "—", description: "组件选项" },
        { name: "className", type: "string", default: "—", description: "宿主元素的类名" },
      ],
      usage: [
        {
          file: "App.tsx",
          code: `import { VideoTextTitle } from "solen-design/react";

export default function App() {
  return <VideoTextTitle />;
}`,
        },
      ],
    },
    {
      name: "Vue",
      install: "npm install solen-design vue",
      dependencies: deps("vue"),
      files: [{ name: "VideoTextTitle.vue", code: vueSource }, ...CORE],
      api: [
        { name: "options", type: "VideoTextTitleOptions", default: "—", description: "组件选项" },
        { name: "class", type: "string", default: "—", description: "宿主元素的类名" },
      ],
      usage: [
        {
          file: "App.vue",
          code: `<script setup>
import { VideoTextTitle } from "solen-design/vue";
</script>

<template>
  <VideoTextTitle />
</template>`,
        },
      ],
    },
    {
      name: "Svelte",
      install: "npm install solen-design svelte",
      dependencies: deps("svelte"),
      files: [{ name: "VideoTextTitle.svelte", code: svelteSource }, ...CORE],
      api: [
        { name: "options", type: "VideoTextTitleOptions", default: "—", description: "组件选项" },
        { name: "class", type: "string", default: "—", description: "宿主元素的类名" },
      ],
      usage: [
        {
          file: "App.svelte",
          code: `<script>
  import { VideoTextTitle } from "solen-design/svelte";
</script>

<VideoTextTitle />`,
        },
      ],
    },
    {
      name: "Solid",
      install: "npm install solen-design solid-js",
      dependencies: deps(`solid-js`),
      files: [{ name: "VideoTextTitle.solid.tsx", code: solidSource }, ...CORE],
      api: [
        { name: "options", type: "VideoTextTitleOptions", default: "—", description: "组件选项" },
        { name: "class", type: "string", default: "—", description: "宿主元素的类名" },
      ],
      usage: [
        {
          file: "App.tsx",
          code: `import { VideoTextTitle } from "solen-design/solid";

export default function App() {
  return <VideoTextTitle />;
}`,
        },
      ],
    },
    {
      name: "Preact",
      install: "npm install solen-design preact",
      dependencies: deps(`preact`),
      files: [{ name: "VideoTextTitle.preact.tsx", code: preactSource }, ...CORE],
      api: [
        { name: "options", type: "VideoTextTitleOptions", default: "—", description: "组件选项" },
        { name: "className", type: "string", default: "—", description: "宿主元素的类名" },
      ],
      usage: [
        {
          file: "App.tsx",
          code: `import { VideoTextTitle } from "solen-design/preact";

export default function App() {
  return <VideoTextTitle />;
}`,
        },
      ],
    },
    {
      name: "Vanilla",
      install: "npm install solen-design",
      dependencies: null,
      files: [{ name: "VideoTextTitle.ts", code: vanillaSource }, ...CORE],
      api: [
        { name: "options", type: "VideoTextTitleOptions", default: "—", description: "组件选项" },
        { name: "target", type: "HTMLElement", default: "—", description: "挂载的宿主元素" },
        { name: "controller.update", type: "(options) => void", default: "—", description: "更新选项" },
        { name: "controller.destroy", type: "() => void", default: "—", description: "销毁并清理" },
      ],
      usage: [
        {
          file: "main.ts",
          code: `import { mountVideoTextTitle } from "solen-design/vanilla";

const target = document.querySelector<HTMLElement>("#demo")!;
const component = mountVideoTextTitle(target);

// 卸载时
// component.destroy();`,
        },
      ],
    },
  ],
  prompt: specSource,
};
