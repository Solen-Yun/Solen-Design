import entrySource from "../../src/components/sticky-stack-cards/StickyStackCards.tsx?raw";
import engineSource from "../../src/components/sticky-stack-cards/StickyStackCardsEngine.js?raw";
import runtimeSource from "../../src/components/sticky-stack-cards/motion-runtime.ts?raw";
import typesSource from "../../src/components/sticky-stack-cards/StickyStackCardsEngine.d.ts?raw";
import vueSource from "../../src/frameworks/vue/StickyStackCards.vue?raw";
import svelteSource from "../../src/frameworks/svelte/StickyStackCards.svelte?raw";
import solidSource from "../../src/frameworks/solid/StickyStackCards.solid.tsx?raw";
import preactSource from "../../src/frameworks/preact/StickyStackCards.preact.tsx?raw";
import vanillaSource from "../../src/frameworks/vanilla/StickyStackCards.ts?raw";
import specSource from "../../src/components/sticky-stack-cards/SPEC.md?raw";

const CORE = [
  { name: "StickyStackCardsEngine.js", code: engineSource },
  { name: "motion-runtime.ts", code: runtimeSource },
  { name: "StickyStackCardsEngine.d.ts", code: typesSource },
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
      files: [{ name: "StickyStackCards.tsx", code: entrySource }, ...CORE],
      api: [
        { name: "options", type: "StickyStackCardsOptions", default: "—", description: "组件选项" },
        { name: "className", type: "string", default: "—", description: "宿主元素的类名" },
      ],
      usage: [
        {
          file: "App.tsx",
          code: `import { StickyStackCards } from "solen-design/react";

export default function App() {
  return <StickyStackCards />;
}`,
        },
      ],
    },
    {
      name: "Vue",
      install: "npm install solen-design vue",
      dependencies: deps("vue"),
      files: [{ name: "StickyStackCards.vue", code: vueSource }, ...CORE],
      api: [
        { name: "options", type: "StickyStackCardsOptions", default: "—", description: "组件选项" },
        { name: "class", type: "string", default: "—", description: "宿主元素的类名" },
      ],
      usage: [
        {
          file: "App.vue",
          code: `<script setup>
import { StickyStackCards } from "solen-design/vue";
</script>

<template>
  <StickyStackCards />
</template>`,
        },
      ],
    },
    {
      name: "Svelte",
      install: "npm install solen-design svelte",
      dependencies: deps("svelte"),
      files: [{ name: "StickyStackCards.svelte", code: svelteSource }, ...CORE],
      api: [
        { name: "options", type: "StickyStackCardsOptions", default: "—", description: "组件选项" },
        { name: "class", type: "string", default: "—", description: "宿主元素的类名" },
      ],
      usage: [
        {
          file: "App.svelte",
          code: `<script>
  import { StickyStackCards } from "solen-design/svelte";
</script>

<StickyStackCards />`,
        },
      ],
    },
    {
      name: "Solid",
      install: "npm install solen-design solid-js",
      dependencies: deps(`solid-js`),
      files: [{ name: "StickyStackCards.solid.tsx", code: solidSource }, ...CORE],
      api: [
        { name: "options", type: "StickyStackCardsOptions", default: "—", description: "组件选项" },
        { name: "class", type: "string", default: "—", description: "宿主元素的类名" },
      ],
      usage: [
        {
          file: "App.tsx",
          code: `import { StickyStackCards } from "solen-design/solid";

export default function App() {
  return <StickyStackCards />;
}`,
        },
      ],
    },
    {
      name: "Preact",
      install: "npm install solen-design preact",
      dependencies: deps(`preact`),
      files: [{ name: "StickyStackCards.preact.tsx", code: preactSource }, ...CORE],
      api: [
        { name: "options", type: "StickyStackCardsOptions", default: "—", description: "组件选项" },
        { name: "className", type: "string", default: "—", description: "宿主元素的类名" },
      ],
      usage: [
        {
          file: "App.tsx",
          code: `import { StickyStackCards } from "solen-design/preact";

export default function App() {
  return <StickyStackCards />;
}`,
        },
      ],
    },
    {
      name: "Vanilla",
      install: "npm install solen-design",
      dependencies: null,
      files: [{ name: "StickyStackCards.ts", code: vanillaSource }, ...CORE],
      api: [
        { name: "options", type: "StickyStackCardsOptions", default: "—", description: "组件选项" },
        { name: "target", type: "HTMLElement", default: "—", description: "挂载的宿主元素" },
        { name: "controller.update", type: "(options) => void", default: "—", description: "更新选项" },
        { name: "controller.destroy", type: "() => void", default: "—", description: "销毁并清理" },
      ],
      usage: [
        {
          file: "main.ts",
          code: `import { mountStickyStackCards } from "solen-design/vanilla";

const target = document.querySelector<HTMLElement>("#demo")!;
const component = mountStickyStackCards(target);

// 卸载时
// component.destroy();`,
        },
      ],
    },
  ],
  prompt: specSource,
};
