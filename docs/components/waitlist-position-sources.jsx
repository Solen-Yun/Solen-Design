import entrySource from "../../src/components/waitlist-position/WaitlistPosition.tsx?raw";
import engineSource from "../../src/components/waitlist-position/WaitlistPositionEngine.js?raw";
import runtimeSource from "../../src/components/waitlist-position/motion-runtime.ts?raw";
import typesSource from "../../src/components/waitlist-position/WaitlistPositionEngine.d.ts?raw";
import vueSource from "../../src/frameworks/vue/WaitlistPosition.vue?raw";
import svelteSource from "../../src/frameworks/svelte/WaitlistPosition.svelte?raw";
import solidSource from "../../src/frameworks/solid/WaitlistPosition.solid.tsx?raw";
import preactSource from "../../src/frameworks/preact/WaitlistPosition.preact.tsx?raw";
import vanillaSource from "../../src/frameworks/vanilla/WaitlistPosition.ts?raw";
import specSource from "../../src/components/waitlist-position/SPEC.md?raw";

const CORE = [
  { name: "WaitlistPositionEngine.js", code: engineSource },
  { name: "motion-runtime.ts", code: runtimeSource },
  { name: "WaitlistPositionEngine.d.ts", code: typesSource },
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
      files: [{ name: "WaitlistPosition.tsx", code: entrySource }, ...CORE],
      api: [
        { name: "options", type: "WaitlistPositionOptions", default: "—", description: "组件选项" },
        { name: "className", type: "string", default: "—", description: "宿主元素的类名" },
      ],
      usage: [
        {
          file: "App.tsx",
          code: `import { WaitlistPosition } from "solen-design/react";

export default function App() {
  return <WaitlistPosition />;
}`,
        },
      ],
    },
    {
      name: "Vue",
      install: "npm install solen-design vue",
      dependencies: deps("vue"),
      files: [{ name: "WaitlistPosition.vue", code: vueSource }, ...CORE],
      api: [
        { name: "options", type: "WaitlistPositionOptions", default: "—", description: "组件选项" },
        { name: "class", type: "string", default: "—", description: "宿主元素的类名" },
      ],
      usage: [
        {
          file: "App.vue",
          code: `<script setup>
import { WaitlistPosition } from "solen-design/vue";
</script>

<template>
  <WaitlistPosition />
</template>`,
        },
      ],
    },
    {
      name: "Svelte",
      install: "npm install solen-design svelte",
      dependencies: deps("svelte"),
      files: [{ name: "WaitlistPosition.svelte", code: svelteSource }, ...CORE],
      api: [
        { name: "options", type: "WaitlistPositionOptions", default: "—", description: "组件选项" },
        { name: "class", type: "string", default: "—", description: "宿主元素的类名" },
      ],
      usage: [
        {
          file: "App.svelte",
          code: `<script>
  import { WaitlistPosition } from "solen-design/svelte";
</script>

<WaitlistPosition />`,
        },
      ],
    },
    {
      name: "Solid",
      install: "npm install solen-design solid-js",
      dependencies: deps(`solid-js`),
      files: [{ name: "WaitlistPosition.solid.tsx", code: solidSource }, ...CORE],
      api: [
        { name: "options", type: "WaitlistPositionOptions", default: "—", description: "组件选项" },
        { name: "class", type: "string", default: "—", description: "宿主元素的类名" },
      ],
      usage: [
        {
          file: "App.tsx",
          code: `import { WaitlistPosition } from "solen-design/solid";

export default function App() {
  return <WaitlistPosition />;
}`,
        },
      ],
    },
    {
      name: "Preact",
      install: "npm install solen-design preact",
      dependencies: deps(`preact`),
      files: [{ name: "WaitlistPosition.preact.tsx", code: preactSource }, ...CORE],
      api: [
        { name: "options", type: "WaitlistPositionOptions", default: "—", description: "组件选项" },
        { name: "className", type: "string", default: "—", description: "宿主元素的类名" },
      ],
      usage: [
        {
          file: "App.tsx",
          code: `import { WaitlistPosition } from "solen-design/preact";

export default function App() {
  return <WaitlistPosition />;
}`,
        },
      ],
    },
    {
      name: "Vanilla",
      install: "npm install solen-design",
      dependencies: null,
      files: [{ name: "WaitlistPosition.ts", code: vanillaSource }, ...CORE],
      api: [
        { name: "options", type: "WaitlistPositionOptions", default: "—", description: "组件选项" },
        { name: "target", type: "HTMLElement", default: "—", description: "挂载的宿主元素" },
        { name: "controller.update", type: "(options) => void", default: "—", description: "更新选项" },
        { name: "controller.destroy", type: "() => void", default: "—", description: "销毁并清理" },
      ],
      usage: [
        {
          file: "main.ts",
          code: `import { mountWaitlistPosition } from "solen-design/vanilla";

const target = document.querySelector<HTMLElement>("#demo")!;
const component = mountWaitlistPosition(target);

// 卸载时
// component.destroy();`,
        },
      ],
    },
  ],
  prompt: specSource,
};
