import entrySource from "../../src/components/timeline-light-up/TimelineLightUp.tsx?raw";
import engineSource from "../../src/components/timeline-light-up/TimelineLightUpEngine.js?raw";
import runtimeSource from "../../src/components/timeline-light-up/motion-runtime.ts?raw";
import typesSource from "../../src/components/timeline-light-up/TimelineLightUpEngine.d.ts?raw";
import vueSource from "../../src/frameworks/vue/TimelineLightUp.vue?raw";
import svelteSource from "../../src/frameworks/svelte/TimelineLightUp.svelte?raw";
import solidSource from "../../src/frameworks/solid/TimelineLightUp.solid.tsx?raw";
import preactSource from "../../src/frameworks/preact/TimelineLightUp.preact.tsx?raw";
import vanillaSource from "../../src/frameworks/vanilla/TimelineLightUp.ts?raw";
import specSource from "../../src/components/timeline-light-up/SPEC.md?raw";

const CORE = [
  { name: "TimelineLightUpEngine.js", code: engineSource },
  { name: "motion-runtime.ts", code: runtimeSource },
  { name: "TimelineLightUpEngine.d.ts", code: typesSource },
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
      files: [{ name: "TimelineLightUp.tsx", code: entrySource }, ...CORE],
      api: [
        { name: "options", type: "TimelineLightUpOptions", default: "—", description: "组件选项" },
        { name: "className", type: "string", default: "—", description: "宿主元素的类名" },
      ],
      usage: [
        {
          file: "App.tsx",
          code: `import { TimelineLightUp } from "solen-design/react";

export default function App() {
  return <TimelineLightUp />;
}`,
        },
      ],
    },
    {
      name: "Vue",
      install: "npm install solen-design vue",
      dependencies: deps("vue"),
      files: [{ name: "TimelineLightUp.vue", code: vueSource }, ...CORE],
      api: [
        { name: "options", type: "TimelineLightUpOptions", default: "—", description: "组件选项" },
        { name: "class", type: "string", default: "—", description: "宿主元素的类名" },
      ],
      usage: [
        {
          file: "App.vue",
          code: `<script setup>
import { TimelineLightUp } from "solen-design/vue";
</script>

<template>
  <TimelineLightUp />
</template>`,
        },
      ],
    },
    {
      name: "Svelte",
      install: "npm install solen-design svelte",
      dependencies: deps("svelte"),
      files: [{ name: "TimelineLightUp.svelte", code: svelteSource }, ...CORE],
      api: [
        { name: "options", type: "TimelineLightUpOptions", default: "—", description: "组件选项" },
        { name: "class", type: "string", default: "—", description: "宿主元素的类名" },
      ],
      usage: [
        {
          file: "App.svelte",
          code: `<script>
  import { TimelineLightUp } from "solen-design/svelte";
</script>

<TimelineLightUp />`,
        },
      ],
    },
    {
      name: "Solid",
      install: "npm install solen-design solid-js",
      dependencies: deps(`solid-js`),
      files: [{ name: "TimelineLightUp.solid.tsx", code: solidSource }, ...CORE],
      api: [
        { name: "options", type: "TimelineLightUpOptions", default: "—", description: "组件选项" },
        { name: "class", type: "string", default: "—", description: "宿主元素的类名" },
      ],
      usage: [
        {
          file: "App.tsx",
          code: `import { TimelineLightUp } from "solen-design/solid";

export default function App() {
  return <TimelineLightUp />;
}`,
        },
      ],
    },
    {
      name: "Preact",
      install: "npm install solen-design preact",
      dependencies: deps(`preact`),
      files: [{ name: "TimelineLightUp.preact.tsx", code: preactSource }, ...CORE],
      api: [
        { name: "options", type: "TimelineLightUpOptions", default: "—", description: "组件选项" },
        { name: "className", type: "string", default: "—", description: "宿主元素的类名" },
      ],
      usage: [
        {
          file: "App.tsx",
          code: `import { TimelineLightUp } from "solen-design/preact";

export default function App() {
  return <TimelineLightUp />;
}`,
        },
      ],
    },
    {
      name: "Vanilla",
      install: "npm install solen-design",
      dependencies: null,
      files: [{ name: "TimelineLightUp.ts", code: vanillaSource }, ...CORE],
      api: [
        { name: "options", type: "TimelineLightUpOptions", default: "—", description: "组件选项" },
        { name: "target", type: "HTMLElement", default: "—", description: "挂载的宿主元素" },
        { name: "controller.update", type: "(options) => void", default: "—", description: "更新选项" },
        { name: "controller.destroy", type: "() => void", default: "—", description: "销毁并清理" },
      ],
      usage: [
        {
          file: "main.ts",
          code: `import { mountTimelineLightUp } from "solen-design/vanilla";

const target = document.querySelector<HTMLElement>("#demo")!;
const component = mountTimelineLightUp(target);

// 卸载时
// component.destroy();`,
        },
      ],
    },
  ],
  prompt: specSource,
};
