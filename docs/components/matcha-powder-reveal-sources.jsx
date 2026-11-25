import entrySource from "../../src/components/matcha-powder-reveal/MatchaPowderReveal.tsx?raw";
import engineSource from "../../src/components/matcha-powder-reveal/MatchaPowderRevealEngine.js?raw";
import runtimeSource from "../../src/components/matcha-powder-reveal/motion-runtime.ts?raw";
import typesSource from "../../src/components/matcha-powder-reveal/MatchaPowderRevealEngine.d.ts?raw";
import vueSource from "../../src/frameworks/vue/MatchaPowderReveal.vue?raw";
import svelteSource from "../../src/frameworks/svelte/MatchaPowderReveal.svelte?raw";
import solidSource from "../../src/frameworks/solid/MatchaPowderReveal.solid.tsx?raw";
import preactSource from "../../src/frameworks/preact/MatchaPowderReveal.preact.tsx?raw";
import vanillaSource from "../../src/frameworks/vanilla/MatchaPowderReveal.ts?raw";
import specSource from "../../src/components/matcha-powder-reveal/SPEC.md?raw";

const CORE = [
  { name: "MatchaPowderRevealEngine.js", code: engineSource },
  { name: "motion-runtime.ts", code: runtimeSource },
  { name: "MatchaPowderRevealEngine.d.ts", code: typesSource },
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
      install: "npm install solen-design react react-dom three@0.185.1",
      dependencies: deps("react react-dom three@0.185.1"),
      files: [{ name: "MatchaPowderReveal.tsx", code: entrySource }, ...CORE],
      api: [
        { name: "options", type: "MatchaPowderRevealOptions", default: "—", description: "组件选项" },
        { name: "className", type: "string", default: "—", description: "宿主元素的类名" },
      ],
      usage: [
        {
          file: "App.tsx",
          code: `import { MatchaPowderReveal } from "solen-design/react";

export default function App() {
  return <MatchaPowderReveal options={{ speed: 1 }} />;
}`,
        },
      ],
    },
    {
      name: "Vue",
      install: "npm install solen-design vue three@0.185.1",
      dependencies: deps("vue three@0.185.1"),
      files: [{ name: "MatchaPowderReveal.vue", code: vueSource }, ...CORE],
      api: [
        { name: "options", type: "MatchaPowderRevealOptions", default: "—", description: "组件选项" },
        { name: "class", type: "string", default: "—", description: "宿主元素的类名" },
      ],
      usage: [
        {
          file: "App.vue",
          code: `<script setup>
import { MatchaPowderReveal } from "solen-design/vue";
</script>

<template>
  <MatchaPowderReveal :options="{ speed: 1 }" />
</template>`,
        },
      ],
    },
    {
      name: "Svelte",
      install: "npm install solen-design svelte three@0.185.1",
      dependencies: deps("svelte three@0.185.1"),
      files: [{ name: "MatchaPowderReveal.svelte", code: svelteSource }, ...CORE],
      api: [
        { name: "options", type: "MatchaPowderRevealOptions", default: "—", description: "组件选项" },
        { name: "class", type: "string", default: "—", description: "宿主元素的类名" },
      ],
      usage: [
        {
          file: "App.svelte",
          code: `<script>
  import { MatchaPowderReveal } from "solen-design/svelte";
</script>

<MatchaPowderReveal options={{ speed: 1 }} />`,
        },
      ],
    },
    {
      name: "Solid",
      install: "npm install solen-design solid-js three@0.185.1",
      dependencies: deps("solid-js three@0.185.1"),
      files: [{ name: "MatchaPowderReveal.solid.tsx", code: solidSource }, ...CORE],
      api: [
        { name: "options", type: "MatchaPowderRevealOptions", default: "—", description: "组件选项" },
        { name: "class", type: "string", default: "—", description: "宿主元素的类名" },
      ],
      usage: [
        {
          file: "App.tsx",
          code: `import { MatchaPowderReveal } from "solen-design/solid";

export default function App() {
  return <MatchaPowderReveal options={{ speed: 1 }} />;
}`,
        },
      ],
    },
    {
      name: "Preact",
      install: "npm install solen-design preact three@0.185.1",
      dependencies: deps("preact three@0.185.1"),
      files: [{ name: "MatchaPowderReveal.preact.tsx", code: preactSource }, ...CORE],
      api: [
        { name: "options", type: "MatchaPowderRevealOptions", default: "—", description: "组件选项" },
        { name: "className", type: "string", default: "—", description: "宿主元素的类名" },
      ],
      usage: [
        {
          file: "App.tsx",
          code: `import { MatchaPowderReveal } from "solen-design/preact";

export default function App() {
  return <MatchaPowderReveal options={{ speed: 1 }} />;
}`,
        },
      ],
    },
    {
      name: "Vanilla",
      install: "npm install solen-design three@0.185.1",
      dependencies: deps("three@0.185.1"),
      files: [{ name: "MatchaPowderReveal.ts", code: vanillaSource }, ...CORE],
      api: [
        { name: "options", type: "MatchaPowderRevealOptions", default: "—", description: "组件选项" },
        { name: "target", type: "HTMLElement", default: "—", description: "挂载的宿主元素" },
        { name: "controller.update", type: "(options) => void", default: "—", description: "更新选项" },
        { name: "controller.destroy", type: "() => void", default: "—", description: "销毁并清理" },
      ],
      usage: [
        {
          file: "main.ts",
          code: `import { mountMatchaPowderReveal } from "solen-design/vanilla";

const target = document.querySelector<HTMLElement>("#demo")!;
const component = mountMatchaPowderReveal(target, { speed: 1 });

// 卸载时
// component.destroy();`,
        },
      ],
    },
  ],
  prompt: specSource,
};
