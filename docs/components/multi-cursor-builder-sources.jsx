import entrySource from "../../src/components/multi-cursor-builder/MultiCursorBuilder.tsx?raw";
import engineSource from "../../src/components/multi-cursor-builder/MultiCursorBuilderEngine.js?raw";
import runtimeSource from "../../src/components/multi-cursor-builder/motion-runtime.ts?raw";
import typesSource from "../../src/components/multi-cursor-builder/MultiCursorBuilderEngine.d.ts?raw";
import vueSource from "../../src/frameworks/vue/MultiCursorBuilder.vue?raw";
import svelteSource from "../../src/frameworks/svelte/MultiCursorBuilder.svelte?raw";
import solidSource from "../../src/frameworks/solid/MultiCursorBuilder.solid.tsx?raw";
import preactSource from "../../src/frameworks/preact/MultiCursorBuilder.preact.tsx?raw";
import vanillaSource from "../../src/frameworks/vanilla/MultiCursorBuilder.ts?raw";
import specSource from "../../src/components/multi-cursor-builder/SPEC.md?raw";

const CORE = [
  { name: "MultiCursorBuilderEngine.js", code: engineSource },
  { name: "motion-runtime.ts", code: runtimeSource },
  { name: "MultiCursorBuilderEngine.d.ts", code: typesSource },
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
      files: [{ name: "MultiCursorBuilder.tsx", code: entrySource }, ...CORE],
      api: [
        { name: "options", type: "MultiCursorBuilderOptions", default: "—", description: "playing / speed / skipIntro / showToolbar / onPhaseChange / onReplay" },
        { name: "className", type: "string", default: "—", description: "宿主元素的类名" },
      ],
      usage: [
        {
          file: "App.tsx",
          code: `import { MultiCursorBuilder } from "solen-design/react";

export default function App() {
  return <MultiCursorBuilder />;
}`,
        },
      ],
    },
    {
      name: "Vue",
      install: "npm install solen-design vue",
      dependencies: deps("vue"),
      files: [{ name: "MultiCursorBuilder.vue", code: vueSource }, ...CORE],
      api: [
        { name: "options", type: "MultiCursorBuilderOptions", default: "—", description: "playing / speed / skipIntro / showToolbar / onPhaseChange / onReplay" },
        { name: "class", type: "string", default: "—", description: "宿主元素的类名" },
      ],
      usage: [
        {
          file: "App.vue",
          code: `<script setup>
import { MultiCursorBuilder } from "solen-design/vue";
</script>

<template>
  <MultiCursorBuilder />
</template>`,
        },
      ],
    },
    {
      name: "Svelte",
      install: "npm install solen-design svelte",
      dependencies: deps("svelte"),
      files: [{ name: "MultiCursorBuilder.svelte", code: svelteSource }, ...CORE],
      api: [
        { name: "options", type: "MultiCursorBuilderOptions", default: "—", description: "playing / speed / skipIntro / showToolbar / onPhaseChange / onReplay" },
        { name: "class", type: "string", default: "—", description: "宿主元素的类名" },
      ],
      usage: [
        {
          file: "App.svelte",
          code: `<script>
  import { MultiCursorBuilder } from "solen-design/svelte";
</script>

<MultiCursorBuilder />`,
        },
      ],
    },
    {
      name: "Solid",
      install: "npm install solen-design solid-js",
      dependencies: deps(`solid-js`),
      files: [{ name: "MultiCursorBuilder.solid.tsx", code: solidSource }, ...CORE],
      api: [
        { name: "options", type: "MultiCursorBuilderOptions", default: "—", description: "playing / speed / skipIntro / showToolbar / onPhaseChange / onReplay" },
        { name: "class", type: "string", default: "—", description: "宿主元素的类名" },
      ],
      usage: [
        {
          file: "App.tsx",
          code: `import { MultiCursorBuilder } from "solen-design/solid";

export default function App() {
  return <MultiCursorBuilder />;
}`,
        },
      ],
    },
    {
      name: "Preact",
      install: "npm install solen-design preact",
      dependencies: deps(`preact`),
      files: [{ name: "MultiCursorBuilder.preact.tsx", code: preactSource }, ...CORE],
      api: [
        { name: "options", type: "MultiCursorBuilderOptions", default: "—", description: "playing / speed / skipIntro / showToolbar / onPhaseChange / onReplay" },
        { name: "className", type: "string", default: "—", description: "宿主元素的类名" },
      ],
      usage: [
        {
          file: "App.tsx",
          code: `import { MultiCursorBuilder } from "solen-design/preact";

export default function App() {
  return <MultiCursorBuilder />;
}`,
        },
      ],
    },
    {
      name: "Vanilla",
      install: "npm install solen-design",
      dependencies: null,
      files: [{ name: "MultiCursorBuilder.ts", code: vanillaSource }, ...CORE],
      api: [
        { name: "options", type: "MultiCursorBuilderOptions", default: "—", description: "playing / speed / skipIntro / showToolbar / onPhaseChange / onReplay" },
        { name: "target", type: "HTMLElement", default: "—", description: "挂载的宿主元素" },
        { name: "controller.update", type: "(options) => void", default: "—", description: "更新选项" },
        { name: "controller.destroy", type: "() => void", default: "—", description: "销毁并清理" },
      ],
      usage: [
        {
          file: "main.ts",
          code: `import { mountMultiCursorBuilder } from "solen-design/vanilla";

const target = document.querySelector<HTMLElement>("#demo")!;
const component = mountMultiCursorBuilder(target);

// 卸载时
// component.destroy();`,
        },
      ],
    },
  ],
  prompt: specSource,
};
