import entrySource from "../../src/components/card-swap/CardSwap.tsx?raw";
import vanillaSource from "../../src/frameworks/vanilla/CardSwap.ts?raw";
import engineSource from "../../src/components/card-swap/CardSwapEngine.js?raw";
import runtimeSource from "../../src/components/card-swap/motion-runtime.ts?raw";
import typesSource from "../../src/components/card-swap/CardSwapEngine.d.ts?raw";
import vueSource from "../../src/frameworks/vue/CardSwap.vue?raw";
import svelteSource from "../../src/frameworks/svelte/CardSwap.svelte?raw";
import solidSource from "../../src/frameworks/solid/CardSwap.solid.tsx?raw";
import preactSource from "../../src/frameworks/preact/CardSwap.preact.tsx?raw";
import specSource from "../../src/components/card-swap/SPEC.md?raw";

const CORE = [
  { name: "CardSwapEngine.js", code: engineSource },
  { name: "motion-runtime.ts", code: runtimeSource },
  { name: "CardSwapEngine.d.ts", code: typesSource },
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
      files: [{ name: "CardSwap.tsx", code: entrySource }, ...CORE],
      api: [
        { name: "options", type: "CardSwapOptions", default: "—", description: "组件选项" },
        { name: "className", type: "string", default: "—", description: "宿主元素的类名" },
      ],
      usage: [
        {
          file: "App.tsx",
          code: `import { CardSwap } from "solen-design/react";

export default function App() {
  return <CardSwap />;
}`,
        },
      ],
    },
    {
      name: "Vue",
      install: "npm install solen-design vue",
      dependencies: deps("vue"),
      files: [{ name: "CardSwap.vue", code: vueSource }, ...CORE],
      api: [
        { name: "options", type: "CardSwapOptions", default: "—", description: "组件选项" },
        { name: "class", type: "string", default: "—", description: "宿主元素的类名" },
      ],
      usage: [
        {
          file: "App.vue",
          code: `<script setup>
import { CardSwap } from "solen-design/vue";
</script>

<template>
  <CardSwap />
</template>`,
        },
      ],
    },
    {
      name: "Svelte",
      install: "npm install solen-design svelte",
      dependencies: deps("svelte"),
      files: [{ name: "CardSwap.svelte", code: svelteSource }, ...CORE],
      api: [
        { name: "options", type: "CardSwapOptions", default: "—", description: "组件选项" },
        { name: "class", type: "string", default: "—", description: "宿主元素的类名" },

      ],
      usage: [
        {
          file: "App.svelte",
          code: `<script>
  import { CardSwap } from "solen-design/svelte";
</script>

<CardSwap />`,
        },
      ],
    },
    {
      name: "Solid",
      install: "npm install solen-design solid-js",
      dependencies: deps("solid-js"),
      files: [{ name: "CardSwap.solid.tsx", code: solidSource }, ...CORE],
      api: [
        { name: "options", type: "CardSwapOptions", default: "—", description: "组件选项" },
        { name: "class", type: "string", default: "—", description: "宿主元素的类名" },
      ],
      usage: [
        {
          file: "App.tsx",
          code: `import { CardSwap } from "solen-design/solid";

export default function App() {
  return <CardSwap />;
}`,
        },
      ],
    },
    {
      name: "Preact",
      install: "npm install solen-design preact",
      dependencies: deps("preact"),
      files: [{ name: "CardSwap.preact.tsx", code: preactSource }, ...CORE],
      api: [
        { name: "options", type: "CardSwapOptions", default: "—", description: "组件选项" },
        { name: "className", type: "string", default: "—", description: "宿主元素的类名" },
      ],
      usage: [
        {
          file: "App.tsx",
          code: `import { CardSwap } from "solen-design/preact";

export default function App() {
  return <CardSwap />;
}`,
        },
      ],
    },
    {
      name: "Vanilla",
      install: "npm install solen-design",
      dependencies: null,
      files: [{ name: "CardSwap.ts", code: vanillaSource }, ...CORE],
      api: [
        { name: "options", type: "CardSwapOptions", default: "—", description: "组件选项" },
        { name: "target", type: "HTMLElement", default: "—", description: "挂载的宿主元素" },
        { name: "controller.update", type: "(options) => void", default: "—", description: "更新选项" },
        { name: "controller.destroy", type: "() => void", default: "—", description: "销毁并清理" },
      ],
      usage: [
        {
          file: "main.ts",
          code: `import { mountCardSwap } from "solen-design/vanilla";

const target = document.querySelector<HTMLElement>("#demo")!;
const component = mountCardSwap(target);

// 卸载时
// component.destroy();`,
        },
      ],
    },
  ],
  prompt: specSource,
};
