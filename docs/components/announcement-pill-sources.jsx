import entrySource from "../../src/components/announcement-pill/AnnouncementPill.tsx?raw";
import engineSource from "../../src/components/announcement-pill/AnnouncementPillEngine.js?raw";
import runtimeSource from "../../src/components/announcement-pill/motion-runtime.ts?raw";
import typesSource from "../../src/components/announcement-pill/AnnouncementPillEngine.d.ts?raw";
import vueSource from "../../src/frameworks/vue/AnnouncementPill.vue?raw";
import svelteSource from "../../src/frameworks/svelte/AnnouncementPill.svelte?raw";
import solidSource from "../../src/frameworks/solid/AnnouncementPill.solid.tsx?raw";
import preactSource from "../../src/frameworks/preact/AnnouncementPill.preact.tsx?raw";
import vanillaSource from "../../src/frameworks/vanilla/AnnouncementPill.ts?raw";
import specSource from "../../src/components/announcement-pill/SPEC.md?raw";

const CORE = [
  { name: "AnnouncementPillEngine.js", code: engineSource },
  { name: "motion-runtime.ts", code: runtimeSource },
  { name: "AnnouncementPillEngine.d.ts", code: typesSource },
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
      files: [{ name: "AnnouncementPill.tsx", code: entrySource }, ...CORE],
      api: [
        { name: "options", type: "AnnouncementPillOptions", default: "—", description: "组件选项" },
        { name: "className", type: "string", default: "—", description: "宿主元素的类名" },
      ],
      usage: [
        {
          file: "App.tsx",
          code: `import { AnnouncementPill } from "solen-design/react";

export default function App() {
  return <AnnouncementPill />;
}`,
        },
      ],
    },
    {
      name: "Vue",
      install: "npm install solen-design vue",
      dependencies: deps("vue"),
      files: [{ name: "AnnouncementPill.vue", code: vueSource }, ...CORE],
      api: [
        { name: "options", type: "AnnouncementPillOptions", default: "—", description: "组件选项" },
        { name: "class", type: "string", default: "—", description: "宿主元素的类名" },
      ],
      usage: [
        {
          file: "App.vue",
          code: `<script setup>
import { AnnouncementPill } from "solen-design/vue";
</script>

<template>
  <AnnouncementPill />
</template>`,
        },
      ],
    },
    {
      name: "Svelte",
      install: "npm install solen-design svelte",
      dependencies: deps("svelte"),
      files: [{ name: "AnnouncementPill.svelte", code: svelteSource }, ...CORE],
      api: [
        { name: "options", type: "AnnouncementPillOptions", default: "—", description: "组件选项" },
        { name: "class", type: "string", default: "—", description: "宿主元素的类名" },
      ],
      usage: [
        {
          file: "App.svelte",
          code: `<script>
  import { AnnouncementPill } from "solen-design/svelte";
</script>

<AnnouncementPill />`,
        },
      ],
    },
    {
      name: "Solid",
      install: "npm install solen-design solid-js",
      dependencies: deps(`solid-js`),
      files: [{ name: "AnnouncementPill.solid.tsx", code: solidSource }, ...CORE],
      api: [
        { name: "options", type: "AnnouncementPillOptions", default: "—", description: "组件选项" },
        { name: "class", type: "string", default: "—", description: "宿主元素的类名" },
      ],
      usage: [
        {
          file: "App.tsx",
          code: `import { AnnouncementPill } from "solen-design/solid";

export default function App() {
  return <AnnouncementPill />;
}`,
        },
      ],
    },
    {
      name: "Preact",
      install: "npm install solen-design preact",
      dependencies: deps(`preact`),
      files: [{ name: "AnnouncementPill.preact.tsx", code: preactSource }, ...CORE],
      api: [
        { name: "options", type: "AnnouncementPillOptions", default: "—", description: "组件选项" },
        { name: "className", type: "string", default: "—", description: "宿主元素的类名" },
      ],
      usage: [
        {
          file: "App.tsx",
          code: `import { AnnouncementPill } from "solen-design/preact";

export default function App() {
  return <AnnouncementPill />;
}`,
        },
      ],
    },
    {
      name: "Vanilla",
      install: "npm install solen-design",
      dependencies: null,
      files: [{ name: "AnnouncementPill.ts", code: vanillaSource }, ...CORE],
      api: [
        { name: "options", type: "AnnouncementPillOptions", default: "—", description: "组件选项" },
        { name: "target", type: "HTMLElement", default: "—", description: "挂载的宿主元素" },
        { name: "controller.update", type: "(options) => void", default: "—", description: "更新选项" },
        { name: "controller.destroy", type: "() => void", default: "—", description: "销毁并清理" },
      ],
      usage: [
        {
          file: "main.ts",
          code: `import { mountAnnouncementPill } from "solen-design/vanilla";

const target = document.querySelector<HTMLElement>("#demo")!;
const component = mountAnnouncementPill(target);

// 卸载时
// component.destroy();`,
        },
      ],
    },
  ],
  prompt: specSource,
};
