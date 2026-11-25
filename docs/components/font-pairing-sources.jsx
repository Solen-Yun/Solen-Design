import entrySource from "../../src/components/font-pairing/FontPairing.tsx?raw";
import engineSource from "../../src/components/font-pairing/FontPairingEngine.js?raw";
import runtimeSource from "../../src/components/font-pairing/motion-runtime.ts?raw";
import typesSource from "../../src/components/font-pairing/FontPairingEngine.d.ts?raw";
import vueSource from "../../src/frameworks/vue/FontPairing.vue?raw";
import svelteSource from "../../src/frameworks/svelte/FontPairing.svelte?raw";
import solidSource from "../../src/frameworks/solid/FontPairing.solid.tsx?raw";
import preactSource from "../../src/frameworks/preact/FontPairing.preact.tsx?raw";
import vanillaSource from "../../src/frameworks/vanilla/FontPairing.ts?raw";
import specSource from "../../src/components/font-pairing/SPEC.md?raw";

const CORE = [
  { name: "FontPairingEngine.js", code: engineSource },
  { name: "motion-runtime.ts", code: runtimeSource },
  { name: "FontPairingEngine.d.ts", code: typesSource },
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
      files: [{ name: "FontPairing.tsx", code: entrySource }, ...CORE],
      api: [
        { name: "options", type: "FontPairingOptions", default: "—", description: "组件选项" },
        { name: "className", type: "string", default: "—", description: "宿主元素的类名" },
      ],
      usage: [
        {
          file: "App.tsx",
          code: `import { FontPairing } from "solen-design/react";

export default function App() {
  return <FontPairing />;
}`,
        },
      ],
    },
    {
      name: "Vue",
      install: "npm install solen-design vue",
      dependencies: deps("vue"),
      files: [{ name: "FontPairing.vue", code: vueSource }, ...CORE],
      api: [
        { name: "options", type: "FontPairingOptions", default: "—", description: "组件选项" },
        { name: "class", type: "string", default: "—", description: "宿主元素的类名" },
      ],
      usage: [
        {
          file: "App.vue",
          code: `<script setup>
import { FontPairing } from "solen-design/vue";
</script>

<template>
  <FontPairing />
</template>`,
        },
      ],
    },
    {
      name: "Svelte",
      install: "npm install solen-design svelte",
      dependencies: deps("svelte"),
      files: [{ name: "FontPairing.svelte", code: svelteSource }, ...CORE],
      api: [
        { name: "options", type: "FontPairingOptions", default: "—", description: "组件选项" },
        { name: "class", type: "string", default: "—", description: "宿主元素的类名" },
      ],
      usage: [
        {
          file: "App.svelte",
          code: `<script>
  import { FontPairing } from "solen-design/svelte";
</script>

<FontPairing />`,
        },
      ],
    },
    {
      name: "Solid",
      install: "npm install solen-design solid-js",
      dependencies: deps(`solid-js`),
      files: [{ name: "FontPairing.solid.tsx", code: solidSource }, ...CORE],
      api: [
        { name: "options", type: "FontPairingOptions", default: "—", description: "组件选项" },
        { name: "class", type: "string", default: "—", description: "宿主元素的类名" },
      ],
      usage: [
        {
          file: "App.tsx",
          code: `import { FontPairing } from "solen-design/solid";

export default function App() {
  return <FontPairing />;
}`,
        },
      ],
    },
    {
      name: "Preact",
      install: "npm install solen-design preact",
      dependencies: deps(`preact`),
      files: [{ name: "FontPairing.preact.tsx", code: preactSource }, ...CORE],
      api: [
        { name: "options", type: "FontPairingOptions", default: "—", description: "组件选项" },
        { name: "className", type: "string", default: "—", description: "宿主元素的类名" },
      ],
      usage: [
        {
          file: "App.tsx",
          code: `import { FontPairing } from "solen-design/preact";

export default function App() {
  return <FontPairing />;
}`,
        },
      ],
    },
    {
      name: "Vanilla",
      install: "npm install solen-design",
      dependencies: null,
      files: [{ name: "FontPairing.ts", code: vanillaSource }, ...CORE],
      api: [
        { name: "options", type: "FontPairingOptions", default: "—", description: "组件选项" },
        { name: "target", type: "HTMLElement", default: "—", description: "挂载的宿主元素" },
        { name: "controller.update", type: "(options) => void", default: "—", description: "更新选项" },
        { name: "controller.destroy", type: "() => void", default: "—", description: "销毁并清理" },
      ],
      usage: [
        {
          file: "main.ts",
          code: `import { mountFontPairing } from "solen-design/vanilla";

const target = document.querySelector<HTMLElement>("#demo")!;
const component = mountFontPairing(target);

// 卸载时
// component.destroy();`,
        },
      ],
    },
  ],
  prompt: specSource,
};
