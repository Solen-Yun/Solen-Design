import entrySource from "../../src/components/gift-box/GiftBox.tsx?raw";
import engineSource from "../../src/components/gift-box/GiftBoxEngine.js?raw";
import runtimeSource from "../../src/components/gift-box/motion-runtime.ts?raw";
import typesSource from "../../src/components/gift-box/GiftBoxEngine.d.ts?raw";
import vueSource from "../../src/frameworks/vue/GiftBox.vue?raw";
import svelteSource from "../../src/frameworks/svelte/GiftBox.svelte?raw";
import solidSource from "../../src/frameworks/solid/GiftBox.solid.tsx?raw";
import preactSource from "../../src/frameworks/preact/GiftBox.preact.tsx?raw";
import vanillaSource from "../../src/frameworks/vanilla/GiftBox.ts?raw";
import specSource from "../../src/components/gift-box/SPEC.md?raw";

const CORE = [
  { name: "GiftBoxEngine.js", code: engineSource },
  { name: "motion-runtime.ts", code: runtimeSource },
  { name: "GiftBoxEngine.d.ts", code: typesSource },
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
      files: [{ name: "GiftBox.tsx", code: entrySource }, ...CORE],
      api: [
        { name: "options", type: "GiftBoxOptions", default: "—", description: "组件选项" },
        { name: "className", type: "string", default: "—", description: "宿主元素的类名" },
      ],
      usage: [
        {
          file: "App.tsx",
          code: `import { GiftBox } from "solen-design/react";

export default function App() {
  return <GiftBox />;
}`,
        },
      ],
    },
    {
      name: "Vue",
      install: "npm install solen-design vue",
      dependencies: deps("vue"),
      files: [{ name: "GiftBox.vue", code: vueSource }, ...CORE],
      api: [
        { name: "options", type: "GiftBoxOptions", default: "—", description: "组件选项" },
        { name: "class", type: "string", default: "—", description: "宿主元素的类名" },
      ],
      usage: [
        {
          file: "App.vue",
          code: `<script setup>
import { GiftBox } from "solen-design/vue";
</script>

<template>
  <GiftBox />
</template>`,
        },
      ],
    },
    {
      name: "Svelte",
      install: "npm install solen-design svelte",
      dependencies: deps("svelte"),
      files: [{ name: "GiftBox.svelte", code: svelteSource }, ...CORE],
      api: [
        { name: "options", type: "GiftBoxOptions", default: "—", description: "组件选项" },
        { name: "class", type: "string", default: "—", description: "宿主元素的类名" },
      ],
      usage: [
        {
          file: "App.svelte",
          code: `<script>
  import { GiftBox } from "solen-design/svelte";
</script>

<GiftBox />`,
        },
      ],
    },
    {
      name: "Solid",
      install: "npm install solen-design solid-js",
      dependencies: deps(`solid-js`),
      files: [{ name: "GiftBox.solid.tsx", code: solidSource }, ...CORE],
      api: [
        { name: "options", type: "GiftBoxOptions", default: "—", description: "组件选项" },
        { name: "class", type: "string", default: "—", description: "宿主元素的类名" },
      ],
      usage: [
        {
          file: "App.tsx",
          code: `import { GiftBox } from "solen-design/solid";

export default function App() {
  return <GiftBox />;
}`,
        },
      ],
    },
    {
      name: "Preact",
      install: "npm install solen-design preact",
      dependencies: deps(`preact`),
      files: [{ name: "GiftBox.preact.tsx", code: preactSource }, ...CORE],
      api: [
        { name: "options", type: "GiftBoxOptions", default: "—", description: "组件选项" },
        { name: "className", type: "string", default: "—", description: "宿主元素的类名" },
      ],
      usage: [
        {
          file: "App.tsx",
          code: `import { GiftBox } from "solen-design/preact";

export default function App() {
  return <GiftBox />;
}`,
        },
      ],
    },
    {
      name: "Vanilla",
      install: "npm install solen-design",
      dependencies: null,
      files: [{ name: "GiftBox.ts", code: vanillaSource }, ...CORE],
      api: [
        { name: "options", type: "GiftBoxOptions", default: "—", description: "组件选项" },
        { name: "target", type: "HTMLElement", default: "—", description: "挂载的宿主元素" },
        { name: "controller.update", type: "(options) => void", default: "—", description: "更新选项" },
        { name: "controller.destroy", type: "() => void", default: "—", description: "销毁并清理" },
      ],
      usage: [
        {
          file: "main.ts",
          code: `import { mountGiftBox } from "solen-design/vanilla";

const target = document.querySelector<HTMLElement>("#demo")!;
const component = mountGiftBox(target);

// 卸载时
// component.destroy();`,
        },
      ],
    },
  ],
  prompt: specSource,
};
