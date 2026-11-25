import entrySource from "../../src/components/particle-texture-trio/ParticleTextureTrio.tsx?raw";
import engineSource from "../../src/components/particle-texture-trio/ParticleTextureTrioEngine.js?raw";
import runtimeSource from "../../src/components/particle-texture-trio/motion-runtime.ts?raw";
import typesSource from "../../src/components/particle-texture-trio/ParticleTextureTrioEngine.d.ts?raw";
import vueSource from "../../src/frameworks/vue/ParticleTextureTrio.vue?raw";
import svelteSource from "../../src/frameworks/svelte/ParticleTextureTrio.svelte?raw";
import solidSource from "../../src/frameworks/solid/ParticleTextureTrio.solid.tsx?raw";
import preactSource from "../../src/frameworks/preact/ParticleTextureTrio.preact.tsx?raw";
import vanillaSource from "../../src/frameworks/vanilla/ParticleTextureTrio.ts?raw";
import specSource from "../../src/components/particle-texture-trio/SPEC.md?raw";

const CORE = [
  { name: "ParticleTextureTrioEngine.js", code: engineSource },
  { name: "motion-runtime.ts", code: runtimeSource },
  { name: "ParticleTextureTrioEngine.d.ts", code: typesSource },
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
      files: [{ name: "ParticleTextureTrio.tsx", code: entrySource }, ...CORE],
      api: [
        { name: "options", type: "ParticleTextureTrioOptions", default: "—", description: "组件选项" },
        { name: "className", type: "string", default: "—", description: "宿主元素的类名" },
      ],
      usage: [
        {
          file: "App.tsx",
          code: `import { ParticleTextureTrio } from "solen-design/react";

export default function App() {
  return <ParticleTextureTrio options={{ speed: 1 }} />;
}`,
        },
      ],
    },
    {
      name: "Vue",
      install: "npm install solen-design vue",
      dependencies: deps("vue"),
      files: [{ name: "ParticleTextureTrio.vue", code: vueSource }, ...CORE],
      api: [
        { name: "options", type: "ParticleTextureTrioOptions", default: "—", description: "组件选项" },
        { name: "class", type: "string", default: "—", description: "宿主元素的类名" },
      ],
      usage: [
        {
          file: "App.vue",
          code: `<script setup>
import { ParticleTextureTrio } from "solen-design/vue";
</script>

<template>
  <ParticleTextureTrio :options="{ speed: 1 }" />
</template>`,
        },
      ],
    },
    {
      name: "Svelte",
      install: "npm install solen-design svelte",
      dependencies: deps("svelte"),
      files: [{ name: "ParticleTextureTrio.svelte", code: svelteSource }, ...CORE],
      api: [
        { name: "options", type: "ParticleTextureTrioOptions", default: "—", description: "组件选项" },
        { name: "class", type: "string", default: "—", description: "宿主元素的类名" },
      ],
      usage: [
        {
          file: "App.svelte",
          code: `<script>
  import { ParticleTextureTrio } from "solen-design/svelte";
</script>

<ParticleTextureTrio options={{ speed: 1 }} />`,
        },
      ],
    },
    {
      name: "Solid",
      install: "npm install solen-design solid-js",
      dependencies: deps("solid-js"),
      files: [{ name: "ParticleTextureTrio.solid.tsx", code: solidSource }, ...CORE],
      api: [
        { name: "options", type: "ParticleTextureTrioOptions", default: "—", description: "组件选项" },
        { name: "class", type: "string", default: "—", description: "宿主元素的类名" },
      ],
      usage: [
        {
          file: "App.tsx",
          code: `import { ParticleTextureTrio } from "solen-design/solid";

export default function App() {
  return <ParticleTextureTrio options={{ speed: 1 }} />;
}`,
        },
      ],
    },
    {
      name: "Preact",
      install: "npm install solen-design preact",
      dependencies: deps("preact"),
      files: [{ name: "ParticleTextureTrio.preact.tsx", code: preactSource }, ...CORE],
      api: [
        { name: "options", type: "ParticleTextureTrioOptions", default: "—", description: "组件选项" },
        { name: "className", type: "string", default: "—", description: "宿主元素的类名" },
      ],
      usage: [
        {
          file: "App.tsx",
          code: `import { ParticleTextureTrio } from "solen-design/preact";

export default function App() {
  return <ParticleTextureTrio options={{ speed: 1 }} />;
}`,
        },
      ],
    },
    {
      name: "Vanilla",
      install: "npm install solen-design",
      dependencies: null,
      files: [{ name: "ParticleTextureTrio.ts", code: vanillaSource }, ...CORE],
      api: [
        { name: "options", type: "ParticleTextureTrioOptions", default: "—", description: "组件选项" },
        { name: "target", type: "HTMLElement", default: "—", description: "挂载的宿主元素" },
        { name: "controller.update", type: "(options) => void", default: "—", description: "更新选项" },
        { name: "controller.destroy", type: "() => void", default: "—", description: "销毁并清理" },
      ],
      usage: [
        {
          file: "main.ts",
          code: `import { mountParticleTextureTrio } from "solen-design/vanilla";

const target = document.querySelector<HTMLElement>("#demo")!;
const component = mountParticleTextureTrio(target, { speed: 1 });

// 卸载时
// component.destroy();`,
        },
      ],
    },
  ],
  prompt: specSource,
};
