import entrySource from "../../src/components/folded-emoji-scroll/FoldedEmojiScroll.tsx?raw";
import engineSource from "../../src/components/folded-emoji-scroll/FoldedEmojiScrollEngine.js?raw";
import runtimeSource from "../../src/components/folded-emoji-scroll/motion-runtime.ts?raw";
import typesSource from "../../src/components/folded-emoji-scroll/FoldedEmojiScrollEngine.d.ts?raw";
import vueSource from "../../src/frameworks/vue/FoldedEmojiScroll.vue?raw";
import svelteSource from "../../src/frameworks/svelte/FoldedEmojiScroll.svelte?raw";
import solidSource from "../../src/frameworks/solid/FoldedEmojiScroll.solid.tsx?raw";
import preactSource from "../../src/frameworks/preact/FoldedEmojiScroll.preact.tsx?raw";
import vanillaSource from "../../src/frameworks/vanilla/FoldedEmojiScroll.ts?raw";
import specSource from "../../src/components/folded-emoji-scroll/SPEC.md?raw";

const CORE = [
  { name: "FoldedEmojiScrollEngine.js", code: engineSource },
  { name: "motion-runtime.ts", code: runtimeSource },
  { name: "FoldedEmojiScrollEngine.d.ts", code: typesSource },
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
      files: [{ name: "FoldedEmojiScroll.tsx", code: entrySource }, ...CORE],
      api: [
        { name: "options", type: "FoldedEmojiScrollOptions", default: "—", description: "组件选项" },
        { name: "className", type: "string", default: "—", description: "宿主元素的类名" },
      ],
      usage: [
        {
          file: "App.tsx",
          code: `import { FoldedEmojiScroll } from "solen-design/react";

export default function App() {
  return <FoldedEmojiScroll options={{ foldSize: 42 }} />;
}`,
        },
      ],
    },
    {
      name: "Vue",
      install: "npm install solen-design vue",
      dependencies: deps("vue"),
      files: [{ name: "FoldedEmojiScroll.vue", code: vueSource }, ...CORE],
      api: [
        { name: "options", type: "FoldedEmojiScrollOptions", default: "—", description: "组件选项" },
        { name: "class", type: "string", default: "—", description: "宿主元素的类名" },
      ],
      usage: [
        {
          file: "App.vue",
          code: `<script setup>
import { FoldedEmojiScroll } from "solen-design/vue";
</script>

<template>
  <FoldedEmojiScroll :options="{ foldSize: 42 }" />
</template>`,
        },
      ],
    },
    {
      name: "Svelte",
      install: "npm install solen-design svelte",
      dependencies: deps("svelte"),
      files: [{ name: "FoldedEmojiScroll.svelte", code: svelteSource }, ...CORE],
      api: [
        { name: "options", type: "FoldedEmojiScrollOptions", default: "—", description: "组件选项" },
        { name: "class", type: "string", default: "—", description: "宿主元素的类名" },
      ],
      usage: [
        {
          file: "App.svelte",
          code: `<script>
  import { FoldedEmojiScroll } from "solen-design/svelte";
</script>

<FoldedEmojiScroll options={{ foldSize: 42 }} />`,
        },
      ],
    },
    {
      name: "Solid",
      install: "npm install solen-design solid-js",
      dependencies: deps("solid-js"),
      files: [{ name: "FoldedEmojiScroll.solid.tsx", code: solidSource }, ...CORE],
      api: [
        { name: "options", type: "FoldedEmojiScrollOptions", default: "—", description: "组件选项" },
        { name: "class", type: "string", default: "—", description: "宿主元素的类名" },
      ],
      usage: [
        {
          file: "App.tsx",
          code: `import { FoldedEmojiScroll } from "solen-design/solid";

export default function App() {
  return <FoldedEmojiScroll options={{ foldSize: 42 }} />;
}`,
        },
      ],
    },
    {
      name: "Preact",
      install: "npm install solen-design preact",
      dependencies: deps("preact"),
      files: [{ name: "FoldedEmojiScroll.preact.tsx", code: preactSource }, ...CORE],
      api: [
        { name: "options", type: "FoldedEmojiScrollOptions", default: "—", description: "组件选项" },
        { name: "className", type: "string", default: "—", description: "宿主元素的类名" },
      ],
      usage: [
        {
          file: "App.tsx",
          code: `import { FoldedEmojiScroll } from "solen-design/preact";

export default function App() {
  return <FoldedEmojiScroll options={{ foldSize: 42 }} />;
}`,
        },
      ],
    },
    {
      name: "Vanilla",
      install: "npm install solen-design",
      dependencies: null,
      files: [{ name: "FoldedEmojiScroll.ts", code: vanillaSource }, ...CORE],
      api: [
        { name: "options", type: "FoldedEmojiScrollOptions", default: "—", description: "组件选项" },
        { name: "target", type: "HTMLElement", default: "—", description: "挂载的宿主元素" },
        { name: "controller.update", type: "(options) => void", default: "—", description: "更新选项" },
        { name: "controller.destroy", type: "() => void", default: "—", description: "销毁并清理" },
      ],
      usage: [
        {
          file: "main.ts",
          code: `import { mountFoldedEmojiScroll } from "solen-design/vanilla";

const target = document.querySelector<HTMLElement>("#demo")!;
const component = mountFoldedEmojiScroll(target, { foldSize: 42 });

// 卸载时
// component.destroy();`,
        },
      ],
    },
  ],
  prompt: specSource,
};
