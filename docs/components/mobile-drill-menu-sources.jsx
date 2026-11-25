import entrySource from "../../src/components/mobile-drill-menu/MobileDrillMenu.tsx?raw";
import engineSource from "../../src/components/mobile-drill-menu/MobileDrillMenuEngine.js?raw";
import runtimeSource from "../../src/components/mobile-drill-menu/motion-runtime.ts?raw";
import typesSource from "../../src/components/mobile-drill-menu/MobileDrillMenuEngine.d.ts?raw";
import vueSource from "../../src/frameworks/vue/MobileDrillMenu.vue?raw";
import svelteSource from "../../src/frameworks/svelte/MobileDrillMenu.svelte?raw";
import solidSource from "../../src/frameworks/solid/MobileDrillMenu.solid.tsx?raw";
import preactSource from "../../src/frameworks/preact/MobileDrillMenu.preact.tsx?raw";
import vanillaSource from "../../src/frameworks/vanilla/MobileDrillMenu.ts?raw";
import specSource from "../../src/components/mobile-drill-menu/SPEC.md?raw";

const CORE = [
  { name: "MobileDrillMenuEngine.js", code: engineSource },
  { name: "motion-runtime.ts", code: runtimeSource },
  { name: "MobileDrillMenuEngine.d.ts", code: typesSource },
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
      files: [{ name: "MobileDrillMenu.tsx", code: entrySource }, ...CORE],
      api: [
        { name: "options", type: "MobileDrillMenuOptions", default: "—", description: "组件选项" },
        { name: "className", type: "string", default: "—", description: "宿主元素的类名" },
      ],
      usage: [
        {
          file: "App.tsx",
          code: `import { MobileDrillMenu } from "solen-design/react";

export default function App() {
  return <MobileDrillMenu />;
}`,
        },
      ],
    },
    {
      name: "Vue",
      install: "npm install solen-design vue",
      dependencies: deps("vue"),
      files: [{ name: "MobileDrillMenu.vue", code: vueSource }, ...CORE],
      api: [
        { name: "options", type: "MobileDrillMenuOptions", default: "—", description: "组件选项" },
        { name: "class", type: "string", default: "—", description: "宿主元素的类名" },
      ],
      usage: [
        {
          file: "App.vue",
          code: `<script setup>
import { MobileDrillMenu } from "solen-design/vue";
</script>

<template>
  <MobileDrillMenu />
</template>`,
        },
      ],
    },
    {
      name: "Svelte",
      install: "npm install solen-design svelte",
      dependencies: deps("svelte"),
      files: [{ name: "MobileDrillMenu.svelte", code: svelteSource }, ...CORE],
      api: [
        { name: "options", type: "MobileDrillMenuOptions", default: "—", description: "组件选项" },
        { name: "class", type: "string", default: "—", description: "宿主元素的类名" },
      ],
      usage: [
        {
          file: "App.svelte",
          code: `<script>
  import { MobileDrillMenu } from "solen-design/svelte";
</script>

<MobileDrillMenu />`,
        },
      ],
    },
    {
      name: "Solid",
      install: "npm install solen-design solid-js",
      dependencies: deps(`solid-js`),
      files: [{ name: "MobileDrillMenu.solid.tsx", code: solidSource }, ...CORE],
      api: [
        { name: "options", type: "MobileDrillMenuOptions", default: "—", description: "组件选项" },
        { name: "class", type: "string", default: "—", description: "宿主元素的类名" },
      ],
      usage: [
        {
          file: "App.tsx",
          code: `import { MobileDrillMenu } from "solen-design/solid";

export default function App() {
  return <MobileDrillMenu />;
}`,
        },
      ],
    },
    {
      name: "Preact",
      install: "npm install solen-design preact",
      dependencies: deps(`preact`),
      files: [{ name: "MobileDrillMenu.preact.tsx", code: preactSource }, ...CORE],
      api: [
        { name: "options", type: "MobileDrillMenuOptions", default: "—", description: "组件选项" },
        { name: "className", type: "string", default: "—", description: "宿主元素的类名" },
      ],
      usage: [
        {
          file: "App.tsx",
          code: `import { MobileDrillMenu } from "solen-design/preact";

export default function App() {
  return <MobileDrillMenu />;
}`,
        },
      ],
    },
    {
      name: "Vanilla",
      install: "npm install solen-design",
      dependencies: null,
      files: [{ name: "MobileDrillMenu.ts", code: vanillaSource }, ...CORE],
      api: [
        { name: "options", type: "MobileDrillMenuOptions", default: "—", description: "组件选项" },
        { name: "target", type: "HTMLElement", default: "—", description: "挂载的宿主元素" },
        { name: "controller.update", type: "(options) => void", default: "—", description: "更新选项" },
        { name: "controller.destroy", type: "() => void", default: "—", description: "销毁并清理" },
      ],
      usage: [
        {
          file: "main.ts",
          code: `import { mountMobileDrillMenu } from "solen-design/vanilla";

const target = document.querySelector<HTMLElement>("#demo")!;
const component = mountMobileDrillMenu(target);

// 卸载时
// component.destroy();`,
        },
      ],
    },
  ],
  prompt: specSource,
};
