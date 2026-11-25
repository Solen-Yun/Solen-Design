import entrySource from "../../src/components/fluid-tooltip/FluidTooltip.tsx?raw";
import engineSource from "../../src/components/fluid-tooltip/FluidTooltipEngine.js?raw";
import runtimeSource from "../../src/components/fluid-tooltip/motion-runtime.ts?raw";
import typesSource from "../../src/components/fluid-tooltip/FluidTooltipEngine.d.ts?raw";
import vueSource from "../../src/frameworks/vue/FluidTooltip.vue?raw";
import svelteSource from "../../src/frameworks/svelte/FluidTooltip.svelte?raw";
import solidSource from "../../src/frameworks/solid/FluidTooltip.solid.tsx?raw";
import preactSource from "../../src/frameworks/preact/FluidTooltip.preact.tsx?raw";
import vanillaSource from "../../src/frameworks/vanilla/FluidTooltip.ts?raw";
import specSource from "../../src/components/fluid-tooltip/SPEC.md?raw";

const CORE = [
  { name: "FluidTooltipEngine.js", code: engineSource },
  { name: "motion-runtime.ts", code: runtimeSource },
  { name: "FluidTooltipEngine.d.ts", code: typesSource },
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
      files: [{ name: "FluidTooltip.tsx", code: entrySource }, ...CORE],
      api: [
        { name: "options", type: "FluidTooltipOptions", default: "—", description: "组件选项" },
        { name: "className", type: "string", default: "—", description: "宿主元素的类名" },
      ],
      usage: [
        {
          file: "App.tsx",
          code: `import { FluidTooltip } from "solen-design/react";

export default function App() {
  return <FluidTooltip />;
}`,
        },
      ],
    },
    {
      name: "Vue",
      install: "npm install solen-design vue gsap@3.12.7",
      dependencies: deps("vue gsap@3.12.7"),
      files: [{ name: "FluidTooltip.vue", code: vueSource }, ...CORE],
      api: [
        { name: "options", type: "FluidTooltipOptions", default: "—", description: "组件选项" },
        { name: "class", type: "string", default: "—", description: "宿主元素的类名" },
      ],
      usage: [
        {
          file: "App.vue",
          code: `<script setup>
import { FluidTooltip } from "solen-design/vue";
</script>

<template>
  <FluidTooltip />
</template>`,
        },
      ],
    },
    {
      name: "Svelte",
      install: "npm install solen-design svelte gsap@3.12.7",
      dependencies: deps("svelte gsap@3.12.7"),
      files: [{ name: "FluidTooltip.svelte", code: svelteSource }, ...CORE],
      api: [
        { name: "options", type: "FluidTooltipOptions", default: "—", description: "组件选项" },
        { name: "class", type: "string", default: "—", description: "宿主元素的类名" },
      ],
      usage: [
        {
          file: "App.svelte",
          code: `<script>
  import { FluidTooltip } from "solen-design/svelte";
</script>

<FluidTooltip />`,
        },
      ],
    },
    {
      name: "Solid",
      install: "npm install solen-design solid-js gsap@3.12.7",
      dependencies: deps("solid-js gsap@3.12.7"),
      files: [{ name: "FluidTooltip.solid.tsx", code: solidSource }, ...CORE],
      api: [
        { name: "options", type: "FluidTooltipOptions", default: "—", description: "组件选项" },
        { name: "class", type: "string", default: "—", description: "宿主元素的类名" },
      ],
      usage: [
        {
          file: "App.tsx",
          code: `import { FluidTooltip } from "solen-design/solid";

export default function App() {
  return <FluidTooltip />;
}`,
        },
      ],
    },
    {
      name: "Preact",
      install: "npm install solen-design preact gsap@3.12.7",
      dependencies: deps("preact gsap@3.12.7"),
      files: [{ name: "FluidTooltip.preact.tsx", code: preactSource }, ...CORE],
      api: [
        { name: "options", type: "FluidTooltipOptions", default: "—", description: "组件选项" },
        { name: "className", type: "string", default: "—", description: "宿主元素的类名" },
      ],
      usage: [
        {
          file: "App.tsx",
          code: `import { FluidTooltip } from "solen-design/preact";

export default function App() {
  return <FluidTooltip />;
}`,
        },
      ],
    },
    {
      name: "Vanilla",
      install: "npm install solen-design gsap@3.12.7",
      dependencies: deps("gsap@3.12.7"),
      files: [{ name: "FluidTooltip.ts", code: vanillaSource }, ...CORE],
      api: [
        { name: "options", type: "FluidTooltipOptions", default: "—", description: "组件选项" },
        { name: "target", type: "HTMLElement", default: "—", description: "挂载的宿主元素" },
        { name: "controller.update", type: "(options) => void", default: "—", description: "更新选项" },
        { name: "controller.destroy", type: "() => void", default: "—", description: "销毁并清理" },
      ],
      usage: [
        {
          file: "main.ts",
          code: `import { mountFluidTooltip } from "solen-design/vanilla";

const target = document.querySelector<HTMLElement>("#demo")!;
const component = mountFluidTooltip(target);

// 卸载时
// component.destroy();`,
        },
      ],
    },
  ],
  prompt: specSource,
};
