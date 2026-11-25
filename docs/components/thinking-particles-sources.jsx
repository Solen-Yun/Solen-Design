import entrySource from "../../src/components/thinking-particles/ThinkingParticles.tsx?raw";
import engineSource from "../../src/components/thinking-particles/ThinkingParticlesEngine.js?raw";
import runtimeSource from "../../src/components/thinking-particles/motion-runtime.ts?raw";
import typesSource from "../../src/components/thinking-particles/ThinkingParticlesEngine.d.ts?raw";
import vueSource from "../../src/frameworks/vue/ThinkingParticles.vue?raw";
import svelteSource from "../../src/frameworks/svelte/ThinkingParticles.svelte?raw";
import solidSource from "../../src/frameworks/solid/ThinkingParticles.solid.tsx?raw";
import preactSource from "../../src/frameworks/preact/ThinkingParticles.preact.tsx?raw";
import vanillaSource from "../../src/frameworks/vanilla/ThinkingParticles.ts?raw";
import specSource from "../../src/components/thinking-particles/SPEC.md?raw";

const CORE = [
  { name: "ThinkingParticlesEngine.js", code: engineSource },
  { name: "motion-runtime.ts", code: runtimeSource },
  { name: "ThinkingParticlesEngine.d.ts", code: typesSource },
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
      files: [{ name: "ThinkingParticles.tsx", code: entrySource }, ...CORE],
      api: [
        { name: "options", type: "ThinkingParticlesOptions", default: "—", description: "组件选项" },
        { name: "className", type: "string", default: "—", description: "宿主元素的类名" },
      ],
      usage: [
        {
          file: "App.tsx",
          code: `import { ThinkingParticles } from "solen-design/react";

export default function App() {
  return <ThinkingParticles />;
}`,
        },
      ],
    },
    {
      name: "Vue",
      install: "npm install solen-design vue",
      dependencies: deps("vue"),
      files: [{ name: "ThinkingParticles.vue", code: vueSource }, ...CORE],
      api: [
        { name: "options", type: "ThinkingParticlesOptions", default: "—", description: "组件选项" },
        { name: "class", type: "string", default: "—", description: "宿主元素的类名" },
      ],
      usage: [
        {
          file: "App.vue",
          code: `<script setup>
import { ThinkingParticles } from "solen-design/vue";
</script>

<template>
  <ThinkingParticles />
</template>`,
        },
      ],
    },
    {
      name: "Svelte",
      install: "npm install solen-design svelte",
      dependencies: deps("svelte"),
      files: [{ name: "ThinkingParticles.svelte", code: svelteSource }, ...CORE],
      api: [
        { name: "options", type: "ThinkingParticlesOptions", default: "—", description: "组件选项" },
        { name: "class", type: "string", default: "—", description: "宿主元素的类名" },
      ],
      usage: [
        {
          file: "App.svelte",
          code: `<script>
  import { ThinkingParticles } from "solen-design/svelte";
</script>

<ThinkingParticles />`,
        },
      ],
    },
    {
      name: "Solid",
      install: "npm install solen-design solid-js",
      dependencies: deps(`solid-js`),
      files: [{ name: "ThinkingParticles.solid.tsx", code: solidSource }, ...CORE],
      api: [
        { name: "options", type: "ThinkingParticlesOptions", default: "—", description: "组件选项" },
        { name: "class", type: "string", default: "—", description: "宿主元素的类名" },
      ],
      usage: [
        {
          file: "App.tsx",
          code: `import { ThinkingParticles } from "solen-design/solid";

export default function App() {
  return <ThinkingParticles />;
}`,
        },
      ],
    },
    {
      name: "Preact",
      install: "npm install solen-design preact",
      dependencies: deps(`preact`),
      files: [{ name: "ThinkingParticles.preact.tsx", code: preactSource }, ...CORE],
      api: [
        { name: "options", type: "ThinkingParticlesOptions", default: "—", description: "组件选项" },
        { name: "className", type: "string", default: "—", description: "宿主元素的类名" },
      ],
      usage: [
        {
          file: "App.tsx",
          code: `import { ThinkingParticles } from "solen-design/preact";

export default function App() {
  return <ThinkingParticles />;
}`,
        },
      ],
    },
    {
      name: "Vanilla",
      install: "npm install solen-design",
      dependencies: null,
      files: [{ name: "ThinkingParticles.ts", code: vanillaSource }, ...CORE],
      api: [
        { name: "options", type: "ThinkingParticlesOptions", default: "—", description: "组件选项" },
        { name: "target", type: "HTMLElement", default: "—", description: "挂载的宿主元素" },
        { name: "controller.update", type: "(options) => void", default: "—", description: "更新选项" },
        { name: "controller.destroy", type: "() => void", default: "—", description: "销毁并清理" },
      ],
      usage: [
        {
          file: "main.ts",
          code: `import { mountThinkingParticles } from "solen-design/vanilla";

const target = document.querySelector<HTMLElement>("#demo")!;
const component = mountThinkingParticles(target);

// 卸载时
// component.destroy();`,
        },
      ],
    },
  ],
  prompt: specSource,
};
