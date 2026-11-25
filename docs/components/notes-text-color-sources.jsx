import entrySource from "../../src/components/notes-text-color/NotesTextColor.tsx?raw";
import engineSource from "../../src/components/notes-text-color/NotesTextColorEngine.js?raw";
import runtimeSource from "../../src/components/notes-text-color/motion-runtime.ts?raw";
import typesSource from "../../src/components/notes-text-color/NotesTextColorEngine.d.ts?raw";
import vueSource from "../../src/frameworks/vue/NotesTextColor.vue?raw";
import svelteSource from "../../src/frameworks/svelte/NotesTextColor.svelte?raw";
import solidSource from "../../src/frameworks/solid/NotesTextColor.solid.tsx?raw";
import preactSource from "../../src/frameworks/preact/NotesTextColor.preact.tsx?raw";
import vanillaSource from "../../src/frameworks/vanilla/NotesTextColor.ts?raw";
import specSource from "../../src/components/notes-text-color/SPEC.md?raw";

const CORE = [
  { name: "NotesTextColorEngine.js", code: engineSource },
  { name: "motion-runtime.ts", code: runtimeSource },
  { name: "NotesTextColorEngine.d.ts", code: typesSource },
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
      files: [{ name: "NotesTextColor.tsx", code: entrySource }, ...CORE],
      api: [
        { name: "options", type: "NotesTextColorOptions", default: "—", description: "组件选项" },
        { name: "className", type: "string", default: "—", description: "宿主元素的类名" },
      ],
      usage: [
        {
          file: "App.tsx",
          code: `import { NotesTextColor } from "solen-design/react";

export default function App() {
  return <NotesTextColor />;
}`,
        },
      ],
    },
    {
      name: "Vue",
      install: "npm install solen-design vue gsap@3.12.7",
      dependencies: deps("vue gsap@3.12.7"),
      files: [{ name: "NotesTextColor.vue", code: vueSource }, ...CORE],
      api: [
        { name: "options", type: "NotesTextColorOptions", default: "—", description: "组件选项" },
        { name: "class", type: "string", default: "—", description: "宿主元素的类名" },
      ],
      usage: [
        {
          file: "App.vue",
          code: `<script setup>
import { NotesTextColor } from "solen-design/vue";
</script>

<template>
  <NotesTextColor />
</template>`,
        },
      ],
    },
    {
      name: "Svelte",
      install: "npm install solen-design svelte gsap@3.12.7",
      dependencies: deps("svelte gsap@3.12.7"),
      files: [{ name: "NotesTextColor.svelte", code: svelteSource }, ...CORE],
      api: [
        { name: "options", type: "NotesTextColorOptions", default: "—", description: "组件选项" },
        { name: "class", type: "string", default: "—", description: "宿主元素的类名" },
      ],
      usage: [
        {
          file: "App.svelte",
          code: `<script>
  import { NotesTextColor } from "solen-design/svelte";
</script>

<NotesTextColor />`,
        },
      ],
    },
    {
      name: "Solid",
      install: "npm install solen-design solid-js gsap@3.12.7",
      dependencies: deps("solid-js gsap@3.12.7"),
      files: [{ name: "NotesTextColor.solid.tsx", code: solidSource }, ...CORE],
      api: [
        { name: "options", type: "NotesTextColorOptions", default: "—", description: "组件选项" },
        { name: "class", type: "string", default: "—", description: "宿主元素的类名" },
      ],
      usage: [
        {
          file: "App.tsx",
          code: `import { NotesTextColor } from "solen-design/solid";

export default function App() {
  return <NotesTextColor />;
}`,
        },
      ],
    },
    {
      name: "Preact",
      install: "npm install solen-design preact gsap@3.12.7",
      dependencies: deps("preact gsap@3.12.7"),
      files: [{ name: "NotesTextColor.preact.tsx", code: preactSource }, ...CORE],
      api: [
        { name: "options", type: "NotesTextColorOptions", default: "—", description: "组件选项" },
        { name: "className", type: "string", default: "—", description: "宿主元素的类名" },
      ],
      usage: [
        {
          file: "App.tsx",
          code: `import { NotesTextColor } from "solen-design/preact";

export default function App() {
  return <NotesTextColor />;
}`,
        },
      ],
    },
    {
      name: "Vanilla",
      install: "npm install solen-design gsap@3.12.7",
      dependencies: deps("gsap@3.12.7"),
      files: [{ name: "NotesTextColor.ts", code: vanillaSource }, ...CORE],
      api: [
        { name: "options", type: "NotesTextColorOptions", default: "—", description: "组件选项" },
        { name: "target", type: "HTMLElement", default: "—", description: "挂载的宿主元素" },
        { name: "controller.update", type: "(options) => void", default: "—", description: "更新选项" },
        { name: "controller.destroy", type: "() => void", default: "—", description: "销毁并清理" },
      ],
      usage: [
        {
          file: "main.ts",
          code: `import { mountNotesTextColor } from "solen-design/vanilla";

const target = document.querySelector<HTMLElement>("#demo")!;
const component = mountNotesTextColor(target);

// 卸载时
// component.destroy();`,
        },
      ],
    },
  ],
  prompt: specSource,
};
