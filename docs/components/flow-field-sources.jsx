import entrySource from "../../src/components/flow-field/FlowField.tsx?raw";
import engineSource from "../../src/components/flow-field/FlowFieldEngine.js?raw";
import runtimeSource from "../../src/components/flow-field/motion-runtime.ts?raw";
import typesSource from "../../src/components/flow-field/FlowFieldEngine.d.ts?raw";
import vueSource from "../../src/frameworks/vue/FlowField.vue?raw";
import svelteSource from "../../src/frameworks/svelte/FlowField.svelte?raw";
import solidSource from "../../src/frameworks/solid/FlowField.solid.tsx?raw";
import preactSource from "../../src/frameworks/preact/FlowField.preact.tsx?raw";
import vanillaSource from "../../src/frameworks/vanilla/FlowField.ts?raw";
import specSource from "../../src/components/flow-field/SPEC.md?raw";

const CORE = [
  { name: "FlowFieldEngine.js", code: engineSource },
  { name: "motion-runtime.ts", code: runtimeSource },
  { name: "FlowFieldEngine.d.ts", code: typesSource },
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
      files: [{ name: "FlowField.tsx", code: entrySource }, ...CORE],
      api: [
        { name: "options", type: "FlowFieldOptions", default: "—", description: "组件选项" },
        { name: "className", type: "string", default: "—", description: "宿主元素的类名" },
      ],
      usage: [
        {
          file: "App.tsx",
          code: `import { FlowField } from "solen-design/react";

export default function App() {
  return <FlowField />;
}`,
        },
      ],
    },
    {
      name: "Vue",
      install: "npm install solen-design vue",
      dependencies: deps("vue"),
      files: [{ name: "FlowField.vue", code: vueSource }, ...CORE],
      api: [
        { name: "options", type: "FlowFieldOptions", default: "—", description: "组件选项" },
        { name: "class", type: "string", default: "—", description: "宿主元素的类名" },
      ],
      usage: [
        {
          file: "App.vue",
          code: `<script setup>
import { FlowField } from "solen-design/vue";
</script>

<template>
  <FlowField />
</template>`,
        },
      ],
    },
    {
      name: "Svelte",
      install: "npm install solen-design svelte",
      dependencies: deps("svelte"),
      files: [{ name: "FlowField.svelte", code: svelteSource }, ...CORE],
      api: [
        { name: "options", type: "FlowFieldOptions", default: "—", description: "组件选项" },
        { name: "class", type: "string", default: "—", description: "宿主元素的类名" },
      ],
      usage: [
        {
          file: "App.svelte",
          code: `<script>
  import { FlowField } from "solen-design/svelte";
</script>

<FlowField />`,
        },
      ],
    },
    {
      name: "Solid",
      install: "npm install solen-design solid-js",
      dependencies: deps(`solid-js`),
      files: [{ name: "FlowField.solid.tsx", code: solidSource }, ...CORE],
      api: [
        { name: "options", type: "FlowFieldOptions", default: "—", description: "组件选项" },
        { name: "class", type: "string", default: "—", description: "宿主元素的类名" },
      ],
      usage: [
        {
          file: "App.tsx",
          code: `import { FlowField } from "solen-design/solid";

export default function App() {
  return <FlowField />;
}`,
        },
      ],
    },
    {
      name: "Preact",
      install: "npm install solen-design preact",
      dependencies: deps(`preact`),
      files: [{ name: "FlowField.preact.tsx", code: preactSource }, ...CORE],
      api: [
        { name: "options", type: "FlowFieldOptions", default: "—", description: "组件选项" },
        { name: "className", type: "string", default: "—", description: "宿主元素的类名" },
      ],
      usage: [
        {
          file: "App.tsx",
          code: `import { FlowField } from "solen-design/preact";

export default function App() {
  return <FlowField />;
}`,
        },
      ],
    },
    {
      name: "Vanilla",
      install: "npm install solen-design",
      dependencies: null,
      files: [{ name: "FlowField.ts", code: vanillaSource }, ...CORE],
      api: [
        { name: "options", type: "FlowFieldOptions", default: "—", description: "组件选项" },
        { name: "target", type: "HTMLElement", default: "—", description: "挂载的宿主元素" },
        { name: "controller.update", type: "(options) => void", default: "—", description: "更新选项" },
        { name: "controller.destroy", type: "() => void", default: "—", description: "销毁并清理" },
      ],
      usage: [
        {
          file: "main.ts",
          code: `import { mountFlowField } from "solen-design/vanilla";

const target = document.querySelector<HTMLElement>("#demo")!;
const component = mountFlowField(target);

// 卸载时
// component.destroy();`,
        },
      ],
    },
  ],
  prompt: specSource,
};
