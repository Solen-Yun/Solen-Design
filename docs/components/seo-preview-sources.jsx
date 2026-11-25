import entrySource from "../../src/components/seo-preview/SeoPreview.tsx?raw";
import engineSource from "../../src/components/seo-preview/SeoPreviewEngine.js?raw";
import runtimeSource from "../../src/components/seo-preview/motion-runtime.ts?raw";
import typesSource from "../../src/components/seo-preview/SeoPreviewEngine.d.ts?raw";
import vueSource from "../../src/frameworks/vue/SeoPreview.vue?raw";
import svelteSource from "../../src/frameworks/svelte/SeoPreview.svelte?raw";
import solidSource from "../../src/frameworks/solid/SeoPreview.solid.tsx?raw";
import preactSource from "../../src/frameworks/preact/SeoPreview.preact.tsx?raw";
import vanillaSource from "../../src/frameworks/vanilla/SeoPreview.ts?raw";
import specSource from "../../src/components/seo-preview/SPEC.md?raw";

const CORE = [
  { name: "SeoPreviewEngine.js", code: engineSource },
  { name: "motion-runtime.ts", code: runtimeSource },
  { name: "SeoPreviewEngine.d.ts", code: typesSource },
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
      files: [{ name: "SeoPreview.tsx", code: entrySource }, ...CORE],
      api: [
        { name: "options", type: "SeoPreviewOptions", default: "—", description: "组件选项" },
        { name: "className", type: "string", default: "—", description: "宿主元素的类名" },
      ],
      usage: [
        {
          file: "App.tsx",
          code: `import { SeoPreview } from "solen-design/react";

export default function App() {
  return <SeoPreview />;
}`,
        },
      ],
    },
    {
      name: "Vue",
      install: "npm install solen-design vue",
      dependencies: deps("vue"),
      files: [{ name: "SeoPreview.vue", code: vueSource }, ...CORE],
      api: [
        { name: "options", type: "SeoPreviewOptions", default: "—", description: "组件选项" },
        { name: "class", type: "string", default: "—", description: "宿主元素的类名" },
      ],
      usage: [
        {
          file: "App.vue",
          code: `<script setup>
import { SeoPreview } from "solen-design/vue";
</script>

<template>
  <SeoPreview />
</template>`,
        },
      ],
    },
    {
      name: "Svelte",
      install: "npm install solen-design svelte",
      dependencies: deps("svelte"),
      files: [{ name: "SeoPreview.svelte", code: svelteSource }, ...CORE],
      api: [
        { name: "options", type: "SeoPreviewOptions", default: "—", description: "组件选项" },
        { name: "class", type: "string", default: "—", description: "宿主元素的类名" },
      ],
      usage: [
        {
          file: "App.svelte",
          code: `<script>
  import { SeoPreview } from "solen-design/svelte";
</script>

<SeoPreview />`,
        },
      ],
    },
    {
      name: "Solid",
      install: "npm install solen-design solid-js",
      dependencies: deps(`solid-js`),
      files: [{ name: "SeoPreview.solid.tsx", code: solidSource }, ...CORE],
      api: [
        { name: "options", type: "SeoPreviewOptions", default: "—", description: "组件选项" },
        { name: "class", type: "string", default: "—", description: "宿主元素的类名" },
      ],
      usage: [
        {
          file: "App.tsx",
          code: `import { SeoPreview } from "solen-design/solid";

export default function App() {
  return <SeoPreview />;
}`,
        },
      ],
    },
    {
      name: "Preact",
      install: "npm install solen-design preact",
      dependencies: deps(`preact`),
      files: [{ name: "SeoPreview.preact.tsx", code: preactSource }, ...CORE],
      api: [
        { name: "options", type: "SeoPreviewOptions", default: "—", description: "组件选项" },
        { name: "className", type: "string", default: "—", description: "宿主元素的类名" },
      ],
      usage: [
        {
          file: "App.tsx",
          code: `import { SeoPreview } from "solen-design/preact";

export default function App() {
  return <SeoPreview />;
}`,
        },
      ],
    },
    {
      name: "Vanilla",
      install: "npm install solen-design",
      dependencies: null,
      files: [{ name: "SeoPreview.ts", code: vanillaSource }, ...CORE],
      api: [
        { name: "options", type: "SeoPreviewOptions", default: "—", description: "组件选项" },
        { name: "target", type: "HTMLElement", default: "—", description: "挂载的宿主元素" },
        { name: "controller.update", type: "(options) => void", default: "—", description: "更新选项" },
        { name: "controller.destroy", type: "() => void", default: "—", description: "销毁并清理" },
      ],
      usage: [
        {
          file: "main.ts",
          code: `import { mountSeoPreview } from "solen-design/vanilla";

const target = document.querySelector<HTMLElement>("#demo")!;
const component = mountSeoPreview(target);

// 卸载时
// component.destroy();`,
        },
      ],
    },
  ],
  prompt: specSource,
};
