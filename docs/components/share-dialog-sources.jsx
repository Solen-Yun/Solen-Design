import entrySource from "../../src/components/share-dialog/ShareDialog.tsx?raw";
import engineSource from "../../src/components/share-dialog/ShareDialogEngine.js?raw";
import runtimeSource from "../../src/components/share-dialog/motion-runtime.ts?raw";
import typesSource from "../../src/components/share-dialog/ShareDialogEngine.d.ts?raw";
import vueSource from "../../src/frameworks/vue/ShareDialog.vue?raw";
import svelteSource from "../../src/frameworks/svelte/ShareDialog.svelte?raw";
import solidSource from "../../src/frameworks/solid/ShareDialog.solid.tsx?raw";
import preactSource from "../../src/frameworks/preact/ShareDialog.preact.tsx?raw";
import vanillaSource from "../../src/frameworks/vanilla/ShareDialog.ts?raw";
import specSource from "../../src/components/share-dialog/SPEC.md?raw";

const CORE = [
  { name: "ShareDialogEngine.js", code: engineSource },
  { name: "motion-runtime.ts", code: runtimeSource },
  { name: "ShareDialogEngine.d.ts", code: typesSource },
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
      files: [{ name: "ShareDialog.tsx", code: entrySource }, ...CORE],
      api: [
        { name: "options", type: "ShareDialogOptions", default: "—", description: "组件选项" },
        { name: "className", type: "string", default: "—", description: "宿主元素的类名" },
      ],
      usage: [
        {
          file: "App.tsx",
          code: `import { ShareDialog } from "solen-design/react";

export default function App() {
  return <ShareDialog />;
}`,
        },
      ],
    },
    {
      name: "Vue",
      install: "npm install solen-design vue",
      dependencies: deps("vue"),
      files: [{ name: "ShareDialog.vue", code: vueSource }, ...CORE],
      api: [
        { name: "options", type: "ShareDialogOptions", default: "—", description: "组件选项" },
        { name: "class", type: "string", default: "—", description: "宿主元素的类名" },
      ],
      usage: [
        {
          file: "App.vue",
          code: `<script setup>
import { ShareDialog } from "solen-design/vue";
</script>

<template>
  <ShareDialog />
</template>`,
        },
      ],
    },
    {
      name: "Svelte",
      install: "npm install solen-design svelte",
      dependencies: deps("svelte"),
      files: [{ name: "ShareDialog.svelte", code: svelteSource }, ...CORE],
      api: [
        { name: "options", type: "ShareDialogOptions", default: "—", description: "组件选项" },
        { name: "class", type: "string", default: "—", description: "宿主元素的类名" },
      ],
      usage: [
        {
          file: "App.svelte",
          code: `<script>
  import { ShareDialog } from "solen-design/svelte";
</script>

<ShareDialog />`,
        },
      ],
    },
    {
      name: "Solid",
      install: "npm install solen-design solid-js",
      dependencies: deps(`solid-js`),
      files: [{ name: "ShareDialog.solid.tsx", code: solidSource }, ...CORE],
      api: [
        { name: "options", type: "ShareDialogOptions", default: "—", description: "组件选项" },
        { name: "class", type: "string", default: "—", description: "宿主元素的类名" },
      ],
      usage: [
        {
          file: "App.tsx",
          code: `import { ShareDialog } from "solen-design/solid";

export default function App() {
  return <ShareDialog />;
}`,
        },
      ],
    },
    {
      name: "Preact",
      install: "npm install solen-design preact",
      dependencies: deps(`preact`),
      files: [{ name: "ShareDialog.preact.tsx", code: preactSource }, ...CORE],
      api: [
        { name: "options", type: "ShareDialogOptions", default: "—", description: "组件选项" },
        { name: "className", type: "string", default: "—", description: "宿主元素的类名" },
      ],
      usage: [
        {
          file: "App.tsx",
          code: `import { ShareDialog } from "solen-design/preact";

export default function App() {
  return <ShareDialog />;
}`,
        },
      ],
    },
    {
      name: "Vanilla",
      install: "npm install solen-design",
      dependencies: null,
      files: [{ name: "ShareDialog.ts", code: vanillaSource }, ...CORE],
      api: [
        { name: "options", type: "ShareDialogOptions", default: "—", description: "组件选项" },
        { name: "target", type: "HTMLElement", default: "—", description: "挂载的宿主元素" },
        { name: "controller.update", type: "(options) => void", default: "—", description: "更新选项" },
        { name: "controller.destroy", type: "() => void", default: "—", description: "销毁并清理" },
      ],
      usage: [
        {
          file: "main.ts",
          code: `import { mountShareDialog } from "solen-design/vanilla";

const target = document.querySelector<HTMLElement>("#demo")!;
const component = mountShareDialog(target);

// 卸载时
// component.destroy();`,
        },
      ],
    },
  ],
  prompt: specSource,
};
