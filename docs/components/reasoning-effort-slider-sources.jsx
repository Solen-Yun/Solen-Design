import entrySource from "../../src/components/reasoning-effort-slider/ReasoningEffortSlider.tsx?raw";
import engineSource from "../../src/components/reasoning-effort-slider/ReasoningEffortSliderEngine.js?raw";
import runtimeSource from "../../src/components/reasoning-effort-slider/motion-runtime.ts?raw";
import typesSource from "../../src/components/reasoning-effort-slider/ReasoningEffortSliderEngine.d.ts?raw";
import vueSource from "../../src/frameworks/vue/ReasoningEffortSlider.vue?raw";
import svelteSource from "../../src/frameworks/svelte/ReasoningEffortSlider.svelte?raw";
import solidSource from "../../src/frameworks/solid/ReasoningEffortSlider.solid.tsx?raw";
import preactSource from "../../src/frameworks/preact/ReasoningEffortSlider.preact.tsx?raw";
import vanillaSource from "../../src/frameworks/vanilla/ReasoningEffortSlider.ts?raw";
import specSource from "../../src/components/reasoning-effort-slider/SPEC.md?raw";

const CORE = [
  { name: "ReasoningEffortSliderEngine.js", code: engineSource },
  { name: "motion-runtime.ts", code: runtimeSource },
  { name: "ReasoningEffortSliderEngine.d.ts", code: typesSource },
];

const DEP_NOTE = "上方安装命令会自动添加这些依赖。如果手动复制源码，请自行安装。";

const ENGINE_DEPS = "gsap@3.12.7";

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
      dependencies: deps(ENGINE_DEPS),
      files: [{ name: "ReasoningEffortSlider.tsx", code: entrySource }, ...CORE],
      api: [
        { name: "options", type: "ReasoningEffortSliderOptions", default: "—", description: "组件选项" },
        { name: "className", type: "string", default: "—", description: "宿主元素的类名" },
      ],
      usage: [
        {
          file: "App.tsx",
          code: `import { ReasoningEffortSlider } from "solen-design/react";

export default function App() {
  return <ReasoningEffortSlider />;
}`,
        },
      ],
    },
    {
      name: "Vue",
      install: "npm install solen-design vue gsap@3.12.7",
      dependencies: deps(`vue ${ENGINE_DEPS}`),
      files: [{ name: "ReasoningEffortSlider.vue", code: vueSource }, ...CORE],
      api: [
        { name: "options", type: "ReasoningEffortSliderOptions", default: "—", description: "组件选项" },
        { name: "class", type: "string", default: "—", description: "宿主元素的类名" },
      ],
      usage: [
        {
          file: "App.vue",
          code: `<script setup>
import { ReasoningEffortSlider } from "solen-design/vue";
</script>

<template>
  <ReasoningEffortSlider />
</template>`,
        },
      ],
    },
    {
      name: "Svelte",
      install: "npm install solen-design svelte gsap@3.12.7",
      dependencies: deps(`svelte ${ENGINE_DEPS}`),
      files: [{ name: "ReasoningEffortSlider.svelte", code: svelteSource }, ...CORE],
      api: [
        { name: "options", type: "ReasoningEffortSliderOptions", default: "—", description: "组件选项" },
        { name: "class", type: "string", default: "—", description: "宿主元素的类名" },
      ],
      usage: [
        {
          file: "App.svelte",
          code: `<script>
  import { ReasoningEffortSlider } from "solen-design/svelte";
</script>

<ReasoningEffortSlider />`,
        },
      ],
    },
    {
      name: "Solid",
      install: "npm install solen-design solid-js gsap@3.12.7",
      dependencies: deps(`solid-js ${ENGINE_DEPS}`),
      files: [{ name: "ReasoningEffortSlider.solid.tsx", code: solidSource }, ...CORE],
      api: [
        { name: "options", type: "ReasoningEffortSliderOptions", default: "—", description: "组件选项" },
        { name: "class", type: "string", default: "—", description: "宿主元素的类名" },
      ],
      usage: [
        {
          file: "App.tsx",
          code: `import { ReasoningEffortSlider } from "solen-design/solid";

export default function App() {
  return <ReasoningEffortSlider />;
}`,
        },
      ],
    },
    {
      name: "Preact",
      install: "npm install solen-design preact gsap@3.12.7",
      dependencies: deps(`preact ${ENGINE_DEPS}`),
      files: [{ name: "ReasoningEffortSlider.preact.tsx", code: preactSource }, ...CORE],
      api: [
        { name: "options", type: "ReasoningEffortSliderOptions", default: "—", description: "组件选项" },
        { name: "className", type: "string", default: "—", description: "宿主元素的类名" },
      ],
      usage: [
        {
          file: "App.tsx",
          code: `import { ReasoningEffortSlider } from "solen-design/preact";

export default function App() {
  return <ReasoningEffortSlider />;
}`,
        },
      ],
    },
    {
      name: "Vanilla",
      install: "npm install solen-design gsap@3.12.7",
      dependencies: deps(ENGINE_DEPS),
      files: [{ name: "ReasoningEffortSlider.ts", code: vanillaSource }, ...CORE],
      api: [
        { name: "options", type: "ReasoningEffortSliderOptions", default: "—", description: "组件选项" },
        { name: "target", type: "HTMLElement", default: "—", description: "挂载的宿主元素" },
        { name: "controller.update", type: "(options) => void", default: "—", description: "更新选项" },
        { name: "controller.destroy", type: "() => void", default: "—", description: "销毁并清理" },
      ],
      usage: [
        {
          file: "main.ts",
          code: `import { mountReasoningEffortSlider } from "solen-design/vanilla";

const target = document.querySelector<HTMLElement>("#demo")!;
const component = mountReasoningEffortSlider(target);

// 卸载时
// component.destroy();`,
        },
      ],
    },
  ],
  prompt: specSource,
};
