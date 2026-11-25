import entrySource from "../../src/components/gradient-ring-cards/GradientRingCards.tsx?raw";
import engineSource from "../../src/components/gradient-ring-cards/GradientRingCardsEngine.js?raw";
import runtimeSource from "../../src/components/gradient-ring-cards/motion-runtime.ts?raw";
import typesSource from "../../src/components/gradient-ring-cards/GradientRingCardsEngine.d.ts?raw";
import vueSource from "../../src/frameworks/vue/GradientRingCards.vue?raw";
import svelteSource from "../../src/frameworks/svelte/GradientRingCards.svelte?raw";
import solidSource from "../../src/frameworks/solid/GradientRingCards.solid.tsx?raw";
import preactSource from "../../src/frameworks/preact/GradientRingCards.preact.tsx?raw";
import vanillaSource from "../../src/frameworks/vanilla/GradientRingCards.ts?raw";
import specSource from "../../src/components/gradient-ring-cards/SPEC.md?raw";

const CORE = [
  { name: "GradientRingCardsEngine.js", code: engineSource },
  { name: "motion-runtime.ts", code: runtimeSource },
  { name: "GradientRingCardsEngine.d.ts", code: typesSource },
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
      install: "npm install solen-design react react-dom three@0.185.1 gsap@3.12.7",
      dependencies: deps("react react-dom three@0.185.1 gsap@3.12.7"),
      files: [{ name: "GradientRingCards.tsx", code: entrySource }, ...CORE],
      api: [
        { name: "options", type: "GradientRingCardsOptions", default: "—", description: "组件选项" },
        { name: "className", type: "string", default: "—", description: "宿主元素的类名" },
      ],
      usage: [
        {
          file: "App.tsx",
          code: `import { GradientRingCards } from "solen-design/react";

export default function App() {
  return <GradientRingCards options={{ autoRotate: true }} />;
}`,
        },
      ],
    },
    {
      name: "Vue",
      install: "npm install solen-design vue three@0.185.1 gsap@3.12.7",
      dependencies: deps("vue three@0.185.1 gsap@3.12.7"),
      files: [{ name: "GradientRingCards.vue", code: vueSource }, ...CORE],
      api: [
        { name: "options", type: "GradientRingCardsOptions", default: "—", description: "组件选项" },
        { name: "class", type: "string", default: "—", description: "宿主元素的类名" },
      ],
      usage: [
        {
          file: "App.vue",
          code: `<script setup>
import { GradientRingCards } from "solen-design/vue";
</script>

<template>
  <GradientRingCards :options="{ autoRotate: true }" />
</template>`,
        },
      ],
    },
    {
      name: "Svelte",
      install: "npm install solen-design svelte three@0.185.1 gsap@3.12.7",
      dependencies: deps("svelte three@0.185.1 gsap@3.12.7"),
      files: [{ name: "GradientRingCards.svelte", code: svelteSource }, ...CORE],
      api: [
        { name: "options", type: "GradientRingCardsOptions", default: "—", description: "组件选项" },
        { name: "class", type: "string", default: "—", description: "宿主元素的类名" },
      ],
      usage: [
        {
          file: "App.svelte",
          code: `<script>
  import { GradientRingCards } from "solen-design/svelte";
</script>

<GradientRingCards options={{ autoRotate: true }} />`,
        },
      ],
    },
    {
      name: "Solid",
      install: "npm install solen-design solid-js three@0.185.1 gsap@3.12.7",
      dependencies: deps("solid-js three@0.185.1 gsap@3.12.7"),
      files: [{ name: "GradientRingCards.solid.tsx", code: solidSource }, ...CORE],
      api: [
        { name: "options", type: "GradientRingCardsOptions", default: "—", description: "组件选项" },
        { name: "class", type: "string", default: "—", description: "宿主元素的类名" },
      ],
      usage: [
        {
          file: "App.tsx",
          code: `import { GradientRingCards } from "solen-design/solid";

export default function App() {
  return <GradientRingCards options={{ autoRotate: true }} />;
}`,
        },
      ],
    },
    {
      name: "Preact",
      install: "npm install solen-design preact three@0.185.1 gsap@3.12.7",
      dependencies: deps("preact three@0.185.1 gsap@3.12.7"),
      files: [{ name: "GradientRingCards.preact.tsx", code: preactSource }, ...CORE],
      api: [
        { name: "options", type: "GradientRingCardsOptions", default: "—", description: "组件选项" },
        { name: "className", type: "string", default: "—", description: "宿主元素的类名" },
      ],
      usage: [
        {
          file: "App.tsx",
          code: `import { GradientRingCards } from "solen-design/preact";

export default function App() {
  return <GradientRingCards options={{ autoRotate: true }} />;
}`,
        },
      ],
    },
    {
      name: "Vanilla",
      install: "npm install solen-design three@0.185.1 gsap@3.12.7",
      dependencies: deps("three@0.185.1 gsap@3.12.7"),
      files: [{ name: "GradientRingCards.ts", code: vanillaSource }, ...CORE],
      api: [
        { name: "options", type: "GradientRingCardsOptions", default: "—", description: "组件选项" },
        { name: "target", type: "HTMLElement", default: "—", description: "挂载的宿主元素" },
        { name: "controller.update", type: "(options) => void", default: "—", description: "更新选项" },
        { name: "controller.destroy", type: "() => void", default: "—", description: "销毁并清理" },
      ],
      usage: [
        {
          file: "main.ts",
          code: `import { mountGradientRingCards } from "solen-design/vanilla";

const target = document.querySelector<HTMLElement>("#demo")!;
const component = mountGradientRingCards(target, { autoRotate: true });

// 卸载时
// component.destroy();`,
        },
      ],
    },
  ],
  prompt: specSource,
};
