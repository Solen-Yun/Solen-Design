import entrySource from "../../src/components/share-invite/ShareInvite.tsx?raw";
import engineSource from "../../src/components/share-invite/ShareInviteEngine.js?raw";
import motionSource from "../../src/components/share-invite/share-motion.js?raw";
import runtimeSource from "../../src/components/share-invite/motion-runtime.ts?raw";
import typesSource from "../../src/components/share-invite/ShareInviteEngine.d.ts?raw";
import vueSource from "../../src/frameworks/vue/ShareInvite.vue?raw";
import svelteSource from "../../src/frameworks/svelte/ShareInvite.svelte?raw";
import solidSource from "../../src/frameworks/solid/ShareInvite.solid.tsx?raw";
import preactSource from "../../src/frameworks/preact/ShareInvite.preact.tsx?raw";
import vanillaSource from "../../src/frameworks/vanilla/ShareInvite.ts?raw";
import specSource from "../../src/components/share-invite/SPEC.md?raw";

const CORE = [
  { name: "ShareInviteEngine.js", code: engineSource },
  { name: "share-motion.js", code: motionSource },
  { name: "motion-runtime.ts", code: runtimeSource },
  { name: "ShareInviteEngine.d.ts", code: typesSource },
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
      files: [{ name: "ShareInvite.tsx", code: entrySource }, ...CORE],
      api: [
        { name: "options", type: "ShareInviteOptions", default: "—", description: "组件选项" },
        { name: "className", type: "string", default: "—", description: "宿主元素的类名" },
      ],
      usage: [
        {
          file: "App.tsx",
          code: `import { ShareInvite } from "solen-design/react";

export default function App() {
  return <ShareInvite />;
}`,
        },
      ],
    },
    {
      name: "Vue",
      install: "npm install solen-design vue",
      dependencies: deps("vue"),
      files: [{ name: "ShareInvite.vue", code: vueSource }, ...CORE],
      api: [
        { name: "options", type: "ShareInviteOptions", default: "—", description: "组件选项" },
        { name: "class", type: "string", default: "—", description: "宿主元素的类名" },
      ],
      usage: [
        {
          file: "App.vue",
          code: `<script setup>
import { ShareInvite } from "solen-design/vue";
</script>

<template>
  <ShareInvite />
</template>`,
        },
      ],
    },
    {
      name: "Svelte",
      install: "npm install solen-design svelte",
      dependencies: deps("svelte"),
      files: [{ name: "ShareInvite.svelte", code: svelteSource }, ...CORE],
      api: [
        { name: "options", type: "ShareInviteOptions", default: "—", description: "组件选项" },
        { name: "class", type: "string", default: "—", description: "宿主元素的类名" },
      ],
      usage: [
        {
          file: "App.svelte",
          code: `<script>
  import { ShareInvite } from "solen-design/svelte";
</script>

<ShareInvite />`,
        },
      ],
    },
    {
      name: "Solid",
      install: "npm install solen-design solid-js",
      dependencies: deps(`solid-js`),
      files: [{ name: "ShareInvite.solid.tsx", code: solidSource }, ...CORE],
      api: [
        { name: "options", type: "ShareInviteOptions", default: "—", description: "组件选项" },
        { name: "class", type: "string", default: "—", description: "宿主元素的类名" },
      ],
      usage: [
        {
          file: "App.tsx",
          code: `import { ShareInvite } from "solen-design/solid";

export default function App() {
  return <ShareInvite />;
}`,
        },
      ],
    },
    {
      name: "Preact",
      install: "npm install solen-design preact",
      dependencies: deps(`preact`),
      files: [{ name: "ShareInvite.preact.tsx", code: preactSource }, ...CORE],
      api: [
        { name: "options", type: "ShareInviteOptions", default: "—", description: "组件选项" },
        { name: "className", type: "string", default: "—", description: "宿主元素的类名" },
      ],
      usage: [
        {
          file: "App.tsx",
          code: `import { ShareInvite } from "solen-design/preact";

export default function App() {
  return <ShareInvite />;
}`,
        },
      ],
    },
    {
      name: "Vanilla",
      install: "npm install solen-design",
      dependencies: null,
      files: [{ name: "ShareInvite.ts", code: vanillaSource }, ...CORE],
      api: [
        { name: "options", type: "ShareInviteOptions", default: "—", description: "组件选项" },
        { name: "target", type: "HTMLElement", default: "—", description: "挂载的宿主元素" },
        { name: "controller.update", type: "(options) => void", default: "—", description: "更新选项" },
        { name: "controller.destroy", type: "() => void", default: "—", description: "销毁并清理" },
      ],
      usage: [
        {
          file: "main.ts",
          code: `import { mountShareInvite } from "solen-design/vanilla";

const target = document.querySelector<HTMLElement>("#demo")!;
const component = mountShareInvite(target);

// 卸载时
// component.destroy();`,
        },
      ],
    },
  ],
  prompt: specSource,
};
