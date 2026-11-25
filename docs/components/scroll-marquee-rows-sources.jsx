import entrySource from "../../src/components/scroll-marquee-rows/ScrollMarqueeRows.tsx?raw";
import engineSource from "../../src/components/scroll-marquee-rows/ScrollMarqueeRowsEngine.js?raw";
import runtimeSource from "../../src/components/scroll-marquee-rows/motion-runtime.ts?raw";
import typesSource from "../../src/components/scroll-marquee-rows/ScrollMarqueeRowsEngine.d.ts?raw";
import vueSource from "../../src/frameworks/vue/ScrollMarqueeRows.vue?raw";
import svelteSource from "../../src/frameworks/svelte/ScrollMarqueeRows.svelte?raw";
import solidSource from "../../src/frameworks/solid/ScrollMarqueeRows.solid.tsx?raw";
import preactSource from "../../src/frameworks/preact/ScrollMarqueeRows.preact.tsx?raw";
import vanillaSource from "../../src/frameworks/vanilla/ScrollMarqueeRows.ts?raw";
import specSource from "../../src/components/scroll-marquee-rows/SPEC.md?raw";

const CORE = [
  { name: "ScrollMarqueeRowsEngine.js", code: engineSource },
  { name: "motion-runtime.ts", code: runtimeSource },
  { name: "ScrollMarqueeRowsEngine.d.ts", code: typesSource },
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
      files: [{ name: "ScrollMarqueeRows.tsx", code: entrySource }, ...CORE],
      api: [
        { name: "options", type: "ScrollMarqueeRowsOptions", default: "—", description: "组件选项" },
        { name: "className", type: "string", default: "—", description: "宿主元素的类名" },
      ],
      usage: [
        {
          file: "App.tsx",
          code: `import { ScrollMarqueeRows } from "solen-design/react";

export default function App() {
  return <ScrollMarqueeRows />;
}`,
        },
      ],
    },
    {
      name: "Vue",
      install: "npm install solen-design vue",
      dependencies: deps("vue"),
      files: [{ name: "ScrollMarqueeRows.vue", code: vueSource }, ...CORE],
      api: [
        { name: "options", type: "ScrollMarqueeRowsOptions", default: "—", description: "组件选项" },
        { name: "class", type: "string", default: "—", description: "宿主元素的类名" },
      ],
      usage: [
        {
          file: "App.vue",
          code: `<script setup>
import { ScrollMarqueeRows } from "solen-design/vue";
</script>

<template>
  <ScrollMarqueeRows />
</template>`,
        },
      ],
    },
    {
      name: "Svelte",
      install: "npm install solen-design svelte",
      dependencies: deps("svelte"),
      files: [{ name: "ScrollMarqueeRows.svelte", code: svelteSource }, ...CORE],
      api: [
        { name: "options", type: "ScrollMarqueeRowsOptions", default: "—", description: "组件选项" },
        { name: "class", type: "string", default: "—", description: "宿主元素的类名" },
      ],
      usage: [
        {
          file: "App.svelte",
          code: `<script>
  import { ScrollMarqueeRows } from "solen-design/svelte";
</script>

<ScrollMarqueeRows />`,
        },
      ],
    },
    {
      name: "Solid",
      install: "npm install solen-design solid-js",
      dependencies: deps(`solid-js`),
      files: [{ name: "ScrollMarqueeRows.solid.tsx", code: solidSource }, ...CORE],
      api: [
        { name: "options", type: "ScrollMarqueeRowsOptions", default: "—", description: "组件选项" },
        { name: "class", type: "string", default: "—", description: "宿主元素的类名" },
      ],
      usage: [
        {
          file: "App.tsx",
          code: `import { ScrollMarqueeRows } from "solen-design/solid";

export default function App() {
  return <ScrollMarqueeRows />;
}`,
        },
      ],
    },
    {
      name: "Preact",
      install: "npm install solen-design preact",
      dependencies: deps(`preact`),
      files: [{ name: "ScrollMarqueeRows.preact.tsx", code: preactSource }, ...CORE],
      api: [
        { name: "options", type: "ScrollMarqueeRowsOptions", default: "—", description: "组件选项" },
        { name: "className", type: "string", default: "—", description: "宿主元素的类名" },
      ],
      usage: [
        {
          file: "App.tsx",
          code: `import { ScrollMarqueeRows } from "solen-design/preact";

export default function App() {
  return <ScrollMarqueeRows />;
}`,
        },
      ],
    },
    {
      name: "Vanilla",
      install: "npm install solen-design",
      dependencies: null,
      files: [{ name: "ScrollMarqueeRows.ts", code: vanillaSource }, ...CORE],
      api: [
        { name: "options", type: "ScrollMarqueeRowsOptions", default: "—", description: "组件选项" },
        { name: "target", type: "HTMLElement", default: "—", description: "挂载的宿主元素" },
        { name: "controller.update", type: "(options) => void", default: "—", description: "更新选项" },
        { name: "controller.destroy", type: "() => void", default: "—", description: "销毁并清理" },
      ],
      usage: [
        {
          file: "main.ts",
          code: `import { mountScrollMarqueeRows } from "solen-design/vanilla";

const target = document.querySelector<HTMLElement>("#demo")!;
const component = mountScrollMarqueeRows(target);

// 卸载时
// component.destroy();`,
        },
      ],
    },
  ],
  prompt: specSource,
};
