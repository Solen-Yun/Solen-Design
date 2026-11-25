import entrySource from "../../src/components/infinite-spiral/InfiniteSpiral.tsx?raw";
import engineSource from "../../src/components/infinite-spiral/InfiniteSpiralEngine.js?raw";
import runtimeSource from "../../src/components/infinite-spiral/motion-runtime.ts?raw";
import typesSource from "../../src/components/infinite-spiral/InfiniteSpiralEngine.d.ts?raw";
import vueSource from "../../src/frameworks/vue/InfiniteSpiral.vue?raw";
import svelteSource from "../../src/frameworks/svelte/InfiniteSpiral.svelte?raw";
import solidSource from "../../src/frameworks/solid/InfiniteSpiral.solid.tsx?raw";
import preactSource from "../../src/frameworks/preact/InfiniteSpiral.preact.tsx?raw";
import vanillaSource from "../../src/frameworks/vanilla/InfiniteSpiral.ts?raw";
import specSource from "../../src/components/infinite-spiral/SPEC.md?raw";

const CORE = [
  { name: "InfiniteSpiralEngine.js", code: engineSource },
  { name: "motion-runtime.ts", code: runtimeSource },
  { name: "InfiniteSpiralEngine.d.ts", code: typesSource },
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
      files: [{ name: "InfiniteSpiral.tsx", code: entrySource }, ...CORE],
      api: [
        { name: "options", type: "InfiniteSpiralOptions", default: "—", description: "组件选项" },
        { name: "className", type: "string", default: "—", description: "宿主元素的类名" },
      ],
      usage: [
        {
          file: "App.tsx",
          code: `import { InfiniteSpiral } from "solen-design/react";

const images = [
  { src: "/images/landscape-1.jpg", alt: "Mountain lake" },
  { src: "/images/landscape-2.jpg", alt: "Forest path" },
];

export default function App() {
  return (
    <div style={{ height: 600 }}>
      <InfiniteSpiral items={images} animationMode="all" />
    </div>
  );
}`,
        },
      ],
    },
    {
      name: "Vue",
      install: "npm install solen-design vue",
      dependencies: deps("vue"),
      files: [{ name: "InfiniteSpiral.vue", code: vueSource }, ...CORE],
      api: [
        { name: "options", type: "InfiniteSpiralOptions", default: "—", description: "组件选项" },
        { name: "class", type: "string", default: "—", description: "宿主元素的类名" },
      ],
      usage: [
        {
          file: "App.vue",
          code: `<script setup>
import { InfiniteSpiral } from "solen-design/vue";
</script>

<template>
  <div style="height: 600px">
    <InfiniteSpiral :items="images" animation-mode="all" />
  </div>
</template>`,
        },
      ],
    },
    {
      name: "Svelte",
      install: "npm install solen-design svelte",
      dependencies: deps("svelte"),
      files: [{ name: "InfiniteSpiral.svelte", code: svelteSource }, ...CORE],
      api: [
        { name: "options", type: "InfiniteSpiralOptions", default: "—", description: "组件选项" },
        { name: "class", type: "string", default: "—", description: "宿主元素的类名" },
      ],
      usage: [
        {
          file: "App.svelte",
          code: `<script>
  import { InfiniteSpiral } from "solen-design/svelte";
</script>

<div style="height: 600px">
  <InfiniteSpiral {items} animationMode="all" />
</div>`,
        },
      ],
    },
    {
      name: "Solid",
      install: "npm install solen-design solid-js",
      dependencies: deps(`solid-js`),
      files: [{ name: "InfiniteSpiral.solid.tsx", code: solidSource }, ...CORE],
      api: [
        { name: "options", type: "InfiniteSpiralOptions", default: "—", description: "组件选项" },
        { name: "class", type: "string", default: "—", description: "宿主元素的类名" },
      ],
      usage: [
        {
          file: "App.tsx",
          code: `import { InfiniteSpiral } from "solen-design/solid";

export default function App() {
  return (
    <div style={{ height: "600px" }}>
      <InfiniteSpiral items={images} animationMode="all" />
    </div>
  );
}`,
        },
      ],
    },
    {
      name: "Preact",
      install: "npm install solen-design preact",
      dependencies: deps(`preact`),
      files: [{ name: "InfiniteSpiral.preact.tsx", code: preactSource }, ...CORE],
      api: [
        { name: "options", type: "InfiniteSpiralOptions", default: "—", description: "组件选项" },
        { name: "className", type: "string", default: "—", description: "宿主元素的类名" },
      ],
      usage: [
        {
          file: "App.tsx",
          code: `import { InfiniteSpiral } from "solen-design/preact";

export default function App() {
  return (
    <div style={{ height: 600 }}>
      <InfiniteSpiral items={images} animationMode="all" />
    </div>
  );
}`,
        },
      ],
    },
    {
      name: "Vanilla",
      install: "npm install solen-design",
      dependencies: null,
      files: [{ name: "InfiniteSpiral.ts", code: vanillaSource }, ...CORE],
      api: [
        { name: "options", type: "InfiniteSpiralOptions", default: "—", description: "组件选项" },
        { name: "target", type: "HTMLElement", default: "—", description: "挂载的宿主元素" },
        { name: "controller.update", type: "(options) => void", default: "—", description: "更新选项" },
        { name: "controller.destroy", type: "() => void", default: "—", description: "销毁并清理" },
      ],
      usage: [
        {
          file: "main.ts",
          code: `import { mountInfiniteSpiral } from "solen-design/vanilla";

const target = document.querySelector<HTMLElement>("#demo")!;
const component = mountInfiniteSpiral(target, { items: images, animationMode: "all" });

// 卸载时
// component.destroy();`,
        },
      ],
    },
  ],
  prompt: specSource,
};
