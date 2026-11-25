import entrySource from "../../src/components/sort-flip-list/SortFlipList.tsx?raw";
import engineSource from "../../src/components/sort-flip-list/SortFlipListEngine.js?raw";
import runtimeSource from "../../src/components/sort-flip-list/motion-runtime.ts?raw";
import typesSource from "../../src/components/sort-flip-list/SortFlipListEngine.d.ts?raw";
import vueSource from "../../src/frameworks/vue/SortFlipList.vue?raw";
import svelteSource from "../../src/frameworks/svelte/SortFlipList.svelte?raw";
import solidSource from "../../src/frameworks/solid/SortFlipList.solid.tsx?raw";
import preactSource from "../../src/frameworks/preact/SortFlipList.preact.tsx?raw";
import vanillaSource from "../../src/frameworks/vanilla/SortFlipList.ts?raw";
import specSource from "../../src/components/sort-flip-list/SPEC.md?raw";

const CORE = [
  { name: "SortFlipListEngine.js", code: engineSource },
  { name: "motion-runtime.ts", code: runtimeSource },
  { name: "SortFlipListEngine.d.ts", code: typesSource },
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
      files: [{ name: "SortFlipList.tsx", code: entrySource }, ...CORE],
      api: [
        { name: "options", type: "SortFlipListOptions", default: "—", description: "组件选项" },
        { name: "className", type: "string", default: "—", description: "宿主元素的类名" },
      ],
      usage: [
        {
          file: "App.tsx",
          code: `import { SortFlipList } from "solen-design/react";

export default function App() {
  return <SortFlipList />;
}`,
        },
      ],
    },
    {
      name: "Vue",
      install: "npm install solen-design vue",
      dependencies: deps("vue"),
      files: [{ name: "SortFlipList.vue", code: vueSource }, ...CORE],
      api: [
        { name: "options", type: "SortFlipListOptions", default: "—", description: "组件选项" },
        { name: "class", type: "string", default: "—", description: "宿主元素的类名" },
      ],
      usage: [
        {
          file: "App.vue",
          code: `<script setup>
import { SortFlipList } from "solen-design/vue";
</script>

<template>
  <SortFlipList />
</template>`,
        },
      ],
    },
    {
      name: "Svelte",
      install: "npm install solen-design svelte",
      dependencies: deps("svelte"),
      files: [{ name: "SortFlipList.svelte", code: svelteSource }, ...CORE],
      api: [
        { name: "options", type: "SortFlipListOptions", default: "—", description: "组件选项" },
        { name: "class", type: "string", default: "—", description: "宿主元素的类名" },
      ],
      usage: [
        {
          file: "App.svelte",
          code: `<script>
  import { SortFlipList } from "solen-design/svelte";
</script>

<SortFlipList />`,
        },
      ],
    },
    {
      name: "Solid",
      install: "npm install solen-design solid-js",
      dependencies: deps(`solid-js`),
      files: [{ name: "SortFlipList.solid.tsx", code: solidSource }, ...CORE],
      api: [
        { name: "options", type: "SortFlipListOptions", default: "—", description: "组件选项" },
        { name: "class", type: "string", default: "—", description: "宿主元素的类名" },
      ],
      usage: [
        {
          file: "App.tsx",
          code: `import { SortFlipList } from "solen-design/solid";

export default function App() {
  return <SortFlipList />;
}`,
        },
      ],
    },
    {
      name: "Preact",
      install: "npm install solen-design preact",
      dependencies: deps(`preact`),
      files: [{ name: "SortFlipList.preact.tsx", code: preactSource }, ...CORE],
      api: [
        { name: "options", type: "SortFlipListOptions", default: "—", description: "组件选项" },
        { name: "className", type: "string", default: "—", description: "宿主元素的类名" },
      ],
      usage: [
        {
          file: "App.tsx",
          code: `import { SortFlipList } from "solen-design/preact";

export default function App() {
  return <SortFlipList />;
}`,
        },
      ],
    },
    {
      name: "Vanilla",
      install: "npm install solen-design",
      dependencies: null,
      files: [{ name: "SortFlipList.ts", code: vanillaSource }, ...CORE],
      api: [
        { name: "options", type: "SortFlipListOptions", default: "—", description: "组件选项" },
        { name: "target", type: "HTMLElement", default: "—", description: "挂载的宿主元素" },
        { name: "controller.update", type: "(options) => void", default: "—", description: "更新选项" },
        { name: "controller.destroy", type: "() => void", default: "—", description: "销毁并清理" },
      ],
      usage: [
        {
          file: "main.ts",
          code: `import { mountSortFlipList } from "solen-design/vanilla";

const target = document.querySelector<HTMLElement>("#demo")!;
const component = mountSortFlipList(target);

// 卸载时
// component.destroy();`,
        },
      ],
    },
  ],
  prompt: specSource,
};
