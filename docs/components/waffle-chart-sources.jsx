import entrySource from "../../src/components/waffle-chart/WaffleChart.tsx?raw";
import engineSource from "../../src/components/waffle-chart/WaffleChartEngine.js?raw";
import runtimeSource from "../../src/components/waffle-chart/motion-runtime.ts?raw";
import typesSource from "../../src/components/waffle-chart/WaffleChartEngine.d.ts?raw";
import vueSource from "../../src/frameworks/vue/WaffleChart.vue?raw";
import svelteSource from "../../src/frameworks/svelte/WaffleChart.svelte?raw";
import solidSource from "../../src/frameworks/solid/WaffleChart.solid.tsx?raw";
import preactSource from "../../src/frameworks/preact/WaffleChart.preact.tsx?raw";
import vanillaSource from "../../src/frameworks/vanilla/WaffleChart.ts?raw";
import specSource from "../../src/components/waffle-chart/SPEC.md?raw";

const CORE = [
  { name: "WaffleChartEngine.js", code: engineSource },
  { name: "motion-runtime.ts", code: runtimeSource },
  { name: "WaffleChartEngine.d.ts", code: typesSource },
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
      files: [{ name: "WaffleChart.tsx", code: entrySource }, ...CORE],
      api: [
        { name: "options", type: "WaffleChartOptions", default: "—", description: "组件选项" },
        { name: "className", type: "string", default: "—", description: "宿主元素的类名" },
      ],
      usage: [
        {
          file: "App.tsx",
          code: `import { WaffleChart } from "solen-design/react";

export default function App() {
  return <WaffleChart />;
}`,
        },
      ],
    },
    {
      name: "Vue",
      install: "npm install solen-design vue",
      dependencies: deps("vue"),
      files: [{ name: "WaffleChart.vue", code: vueSource }, ...CORE],
      api: [
        { name: "options", type: "WaffleChartOptions", default: "—", description: "组件选项" },
        { name: "class", type: "string", default: "—", description: "宿主元素的类名" },
      ],
      usage: [
        {
          file: "App.vue",
          code: `<script setup>
import { WaffleChart } from "solen-design/vue";
</script>

<template>
  <WaffleChart />
</template>`,
        },
      ],
    },
    {
      name: "Svelte",
      install: "npm install solen-design svelte",
      dependencies: deps("svelte"),
      files: [{ name: "WaffleChart.svelte", code: svelteSource }, ...CORE],
      api: [
        { name: "options", type: "WaffleChartOptions", default: "—", description: "组件选项" },
        { name: "class", type: "string", default: "—", description: "宿主元素的类名" },
      ],
      usage: [
        {
          file: "App.svelte",
          code: `<script>
  import { WaffleChart } from "solen-design/svelte";
</script>

<WaffleChart />`,
        },
      ],
    },
    {
      name: "Solid",
      install: "npm install solen-design solid-js",
      dependencies: deps(`solid-js`),
      files: [{ name: "WaffleChart.solid.tsx", code: solidSource }, ...CORE],
      api: [
        { name: "options", type: "WaffleChartOptions", default: "—", description: "组件选项" },
        { name: "class", type: "string", default: "—", description: "宿主元素的类名" },
      ],
      usage: [
        {
          file: "App.tsx",
          code: `import { WaffleChart } from "solen-design/solid";

export default function App() {
  return <WaffleChart />;
}`,
        },
      ],
    },
    {
      name: "Preact",
      install: "npm install solen-design preact",
      dependencies: deps(`preact`),
      files: [{ name: "WaffleChart.preact.tsx", code: preactSource }, ...CORE],
      api: [
        { name: "options", type: "WaffleChartOptions", default: "—", description: "组件选项" },
        { name: "className", type: "string", default: "—", description: "宿主元素的类名" },
      ],
      usage: [
        {
          file: "App.tsx",
          code: `import { WaffleChart } from "solen-design/preact";

export default function App() {
  return <WaffleChart />;
}`,
        },
      ],
    },
    {
      name: "Vanilla",
      install: "npm install solen-design",
      dependencies: null,
      files: [{ name: "WaffleChart.ts", code: vanillaSource }, ...CORE],
      api: [
        { name: "options", type: "WaffleChartOptions", default: "—", description: "组件选项" },
        { name: "target", type: "HTMLElement", default: "—", description: "挂载的宿主元素" },
        { name: "controller.update", type: "(options) => void", default: "—", description: "更新选项" },
        { name: "controller.destroy", type: "() => void", default: "—", description: "销毁并清理" },
      ],
      usage: [
        {
          file: "main.ts",
          code: `import { mountWaffleChart } from "solen-design/vanilla";

const target = document.querySelector<HTMLElement>("#demo")!;
const component = mountWaffleChart(target);

// 卸载时
// component.destroy();`,
        },
      ],
    },
  ],
  prompt: specSource,
};
