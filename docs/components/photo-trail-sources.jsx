import entrySource from "../../src/components/photo-trail/PhotoTrail.tsx?raw";
import engineSource from "../../src/components/photo-trail/PhotoTrailEngine.js?raw";
import runtimeSource from "../../src/components/photo-trail/motion-runtime.ts?raw";
import typesSource from "../../src/components/photo-trail/PhotoTrailEngine.d.ts?raw";
import vueSource from "../../src/frameworks/vue/PhotoTrail.vue?raw";
import svelteSource from "../../src/frameworks/svelte/PhotoTrail.svelte?raw";
import solidSource from "../../src/frameworks/solid/PhotoTrail.solid.tsx?raw";
import preactSource from "../../src/frameworks/preact/PhotoTrail.preact.tsx?raw";
import vanillaSource from "../../src/frameworks/vanilla/PhotoTrail.ts?raw";
import specSource from "../../src/components/photo-trail/SPEC.md?raw";

const CORE = [
  { name: "PhotoTrailEngine.js", code: engineSource },
  { name: "motion-runtime.ts", code: runtimeSource },
  { name: "PhotoTrailEngine.d.ts", code: typesSource },
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
      files: [{ name: "PhotoTrail.tsx", code: entrySource }, ...CORE],
      api: [
        { name: "options", type: "PhotoTrailOptions", default: "—", description: "组件选项" },
        { name: "className", type: "string", default: "—", description: "宿主元素的类名" },
      ],
      usage: [
        {
          file: "App.tsx",
          code: `import { PhotoTrail } from "solen-design/react";

export default function App() {
  return <PhotoTrail />;
}`,
        },
      ],
    },
    {
      name: "Vue",
      install: "npm install solen-design vue",
      dependencies: deps("vue"),
      files: [{ name: "PhotoTrail.vue", code: vueSource }, ...CORE],
      api: [
        { name: "options", type: "PhotoTrailOptions", default: "—", description: "组件选项" },
        { name: "class", type: "string", default: "—", description: "宿主元素的类名" },
      ],
      usage: [
        {
          file: "App.vue",
          code: `<script setup>
import { PhotoTrail } from "solen-design/vue";
</script>

<template>
  <PhotoTrail />
</template>`,
        },
      ],
    },
    {
      name: "Svelte",
      install: "npm install solen-design svelte",
      dependencies: deps("svelte"),
      files: [{ name: "PhotoTrail.svelte", code: svelteSource }, ...CORE],
      api: [
        { name: "options", type: "PhotoTrailOptions", default: "—", description: "组件选项" },
        { name: "class", type: "string", default: "—", description: "宿主元素的类名" },
      ],
      usage: [
        {
          file: "App.svelte",
          code: `<script>
  import { PhotoTrail } from "solen-design/svelte";
</script>

<PhotoTrail />`,
        },
      ],
    },
    {
      name: "Solid",
      install: "npm install solen-design solid-js",
      dependencies: deps(`solid-js`),
      files: [{ name: "PhotoTrail.solid.tsx", code: solidSource }, ...CORE],
      api: [
        { name: "options", type: "PhotoTrailOptions", default: "—", description: "组件选项" },
        { name: "class", type: "string", default: "—", description: "宿主元素的类名" },
      ],
      usage: [
        {
          file: "App.tsx",
          code: `import { PhotoTrail } from "solen-design/solid";

export default function App() {
  return <PhotoTrail />;
}`,
        },
      ],
    },
    {
      name: "Preact",
      install: "npm install solen-design preact",
      dependencies: deps(`preact`),
      files: [{ name: "PhotoTrail.preact.tsx", code: preactSource }, ...CORE],
      api: [
        { name: "options", type: "PhotoTrailOptions", default: "—", description: "组件选项" },
        { name: "className", type: "string", default: "—", description: "宿主元素的类名" },
      ],
      usage: [
        {
          file: "App.tsx",
          code: `import { PhotoTrail } from "solen-design/preact";

export default function App() {
  return <PhotoTrail />;
}`,
        },
      ],
    },
    {
      name: "Vanilla",
      install: "npm install solen-design",
      dependencies: null,
      files: [{ name: "PhotoTrail.ts", code: vanillaSource }, ...CORE],
      api: [
        { name: "options", type: "PhotoTrailOptions", default: "—", description: "组件选项" },
        { name: "target", type: "HTMLElement", default: "—", description: "挂载的宿主元素" },
        { name: "controller.update", type: "(options) => void", default: "—", description: "更新选项" },
        { name: "controller.destroy", type: "() => void", default: "—", description: "销毁并清理" },
      ],
      usage: [
        {
          file: "main.ts",
          code: `import { mountPhotoTrail } from "solen-design/vanilla";

const target = document.querySelector<HTMLElement>("#demo")!;
const component = mountPhotoTrail(target);

// 卸载时
// component.destroy();`,
        },
      ],
    },
  ],
  prompt: specSource,
};
