import entrySource from "../../src/components/ai-brand-cover-cards/AiBrandCoverCards.tsx?raw";
import engineSource from "../../src/components/ai-brand-cover-cards/AiBrandCoverCardsEngine.js?raw";
import runtimeSource from "../../src/components/ai-brand-cover-cards/motion-runtime.ts?raw";
import typesSource from "../../src/components/ai-brand-cover-cards/AiBrandCoverCardsEngine.d.ts?raw";
import vueSource from "../../src/frameworks/vue/AiBrandCoverCards.vue?raw";
import svelteSource from "../../src/frameworks/svelte/AiBrandCoverCards.svelte?raw";
import solidSource from "../../src/frameworks/solid/AiBrandCoverCards.solid.tsx?raw";
import preactSource from "../../src/frameworks/preact/AiBrandCoverCards.preact.tsx?raw";
import vanillaSource from "../../src/frameworks/vanilla/AiBrandCoverCards.ts?raw";
import specSource from "../../src/components/ai-brand-cover-cards/SPEC.md?raw";

const CORE = [
  { name: "AiBrandCoverCardsEngine.js", code: engineSource },
  { name: "motion-runtime.ts", code: runtimeSource },
  { name: "AiBrandCoverCardsEngine.d.ts", code: typesSource },
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
      install: "npm install solen-design react react-dom gsap@3.12.7",
      dependencies: deps("react react-dom gsap@3.12.7"),
      files: [{ name: "AiBrandCoverCards.tsx", code: entrySource }, ...CORE],
      api: [
        { name: "options", type: "AiBrandCoverCardsOptions", default: "—", description: "组件选项" },
        { name: "className", type: "string", default: "—", description: "宿主元素的类名" },
      ],
      usage: [
        {
          file: "App.tsx",
          code: `import { AiBrandCoverCards } from "solen-design/react";

export default function App() {
  return <AiBrandCoverCards />;
}`,
        },
      ],
    },
    {
      name: "Vue",
      install: "npm install solen-design vue gsap@3.12.7",
      dependencies: deps("vue gsap@3.12.7"),
      files: [{ name: "AiBrandCoverCards.vue", code: vueSource }, ...CORE],
      api: [
        { name: "options", type: "AiBrandCoverCardsOptions", default: "—", description: "组件选项" },
        { name: "class", type: "string", default: "—", description: "宿主元素的类名" },
      ],
      usage: [
        {
          file: "App.vue",
          code: `<script setup>
import { AiBrandCoverCards } from "solen-design/vue";
</script>

<template>
  <AiBrandCoverCards />
</template>`,
        },
      ],
    },
    {
      name: "Svelte",
      install: "npm install solen-design svelte gsap@3.12.7",
      dependencies: deps("svelte gsap@3.12.7"),
      files: [{ name: "AiBrandCoverCards.svelte", code: svelteSource }, ...CORE],
      api: [
        { name: "options", type: "AiBrandCoverCardsOptions", default: "—", description: "组件选项" },
        { name: "class", type: "string", default: "—", description: "宿主元素的类名" },
      ],
      usage: [
        {
          file: "App.svelte",
          code: `<script>
  import { AiBrandCoverCards } from "solen-design/svelte";
</script>

<AiBrandCoverCards />`,
        },
      ],
    },
    {
      name: "Solid",
      install: "npm install solen-design solid-js gsap@3.12.7",
      dependencies: deps("solid-js gsap@3.12.7"),
      files: [{ name: "AiBrandCoverCards.solid.tsx", code: solidSource }, ...CORE],
      api: [
        { name: "options", type: "AiBrandCoverCardsOptions", default: "—", description: "组件选项" },
        { name: "class", type: "string", default: "—", description: "宿主元素的类名" },
      ],
      usage: [
        {
          file: "App.tsx",
          code: `import { AiBrandCoverCards } from "solen-design/solid";

export default function App() {
  return <AiBrandCoverCards />;
}`,
        },
      ],
    },
    {
      name: "Preact",
      install: "npm install solen-design preact gsap@3.12.7",
      dependencies: deps("preact gsap@3.12.7"),
      files: [{ name: "AiBrandCoverCards.preact.tsx", code: preactSource }, ...CORE],
      api: [
        { name: "options", type: "AiBrandCoverCardsOptions", default: "—", description: "组件选项" },
        { name: "className", type: "string", default: "—", description: "宿主元素的类名" },
      ],
      usage: [
        {
          file: "App.tsx",
          code: `import { AiBrandCoverCards } from "solen-design/preact";

export default function App() {
  return <AiBrandCoverCards />;
}`,
        },
      ],
    },
    {
      name: "Vanilla",
      install: "npm install solen-design gsap@3.12.7",
      dependencies: deps("gsap@3.12.7"),
      files: [{ name: "AiBrandCoverCards.ts", code: vanillaSource }, ...CORE],
      api: [
        { name: "options", type: "AiBrandCoverCardsOptions", default: "—", description: "组件选项" },
        { name: "target", type: "HTMLElement", default: "—", description: "挂载的宿主元素" },
        { name: "controller.update", type: "(options) => void", default: "—", description: "更新选项" },
        { name: "controller.destroy", type: "() => void", default: "—", description: "销毁并清理" },
      ],
      usage: [
        {
          file: "main.ts",
          code: `import { mountAiBrandCoverCards } from "solen-design/vanilla";

const target = document.querySelector<HTMLElement>("#demo")!;
const component = mountAiBrandCoverCards(target);

// 卸载时
// component.destroy();`,
        },
      ],
    },
  ],
  prompt: specSource,
};
