import entrySource from "../../src/components/deep-agent-composer/DeepAgentComposer.tsx?raw";
import engineSource from "../../src/components/deep-agent-composer/DeepAgentComposerEngine.js?raw";
import runtimeSource from "../../src/components/deep-agent-composer/motion-runtime.ts?raw";
import typesSource from "../../src/components/deep-agent-composer/DeepAgentComposerEngine.d.ts?raw";
import vueSource from "../../src/frameworks/vue/DeepAgentComposer.vue?raw";
import svelteSource from "../../src/frameworks/svelte/DeepAgentComposer.svelte?raw";
import solidSource from "../../src/frameworks/solid/DeepAgentComposer.solid.tsx?raw";
import preactSource from "../../src/frameworks/preact/DeepAgentComposer.preact.tsx?raw";
import vanillaSource from "../../src/frameworks/vanilla/DeepAgentComposer.ts?raw";
import specSource from "../../src/components/deep-agent-composer/SPEC.md?raw";

const CORE = [
  { name: "DeepAgentComposerEngine.js", code: engineSource },
  { name: "motion-runtime.ts", code: runtimeSource },
  { name: "DeepAgentComposerEngine.d.ts", code: typesSource },
];

const DEP_NOTE = "上方安装命令会自动添加这些依赖。如果手动复制源码，请自行安装。";

const ENGINE_DEPS = "gsap@3.12.7";

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
      dependencies: deps(ENGINE_DEPS),
      files: [{ name: "DeepAgentComposer.tsx", code: entrySource }, ...CORE],
      api: [
        { name: "options", type: "DeepAgentComposerOptions", default: "—", description: "组件选项" },
        { name: "className", type: "string", default: "—", description: "宿主元素的类名" },
      ],
      usage: [
        {
          file: "App.tsx",
          code: `import { DeepAgentComposer } from "solen-design/react";

export default function App() {
  return <DeepAgentComposer />;
}`,
        },
      ],
    },
    {
      name: "Vue",
      install: "npm install solen-design vue gsap@3.12.7",
      dependencies: deps(`vue ${ENGINE_DEPS}`),
      files: [{ name: "DeepAgentComposer.vue", code: vueSource }, ...CORE],
      api: [
        { name: "options", type: "DeepAgentComposerOptions", default: "—", description: "组件选项" },
        { name: "class", type: "string", default: "—", description: "宿主元素的类名" },
      ],
      usage: [
        {
          file: "App.vue",
          code: `<script setup>
import { DeepAgentComposer } from "solen-design/vue";
</script>

<template>
  <DeepAgentComposer />
</template>`,
        },
      ],
    },
    {
      name: "Svelte",
      install: "npm install solen-design svelte gsap@3.12.7",
      dependencies: deps(`svelte ${ENGINE_DEPS}`),
      files: [{ name: "DeepAgentComposer.svelte", code: svelteSource }, ...CORE],
      api: [
        { name: "options", type: "DeepAgentComposerOptions", default: "—", description: "组件选项" },
        { name: "class", type: "string", default: "—", description: "宿主元素的类名" },
      ],
      usage: [
        {
          file: "App.svelte",
          code: `<script>
  import { DeepAgentComposer } from "solen-design/svelte";
</script>

<DeepAgentComposer />`,
        },
      ],
    },
    {
      name: "Solid",
      install: "npm install solen-design solid-js gsap@3.12.7",
      dependencies: deps(`solid-js ${ENGINE_DEPS}`),
      files: [{ name: "DeepAgentComposer.solid.tsx", code: solidSource }, ...CORE],
      api: [
        { name: "options", type: "DeepAgentComposerOptions", default: "—", description: "组件选项" },
        { name: "class", type: "string", default: "—", description: "宿主元素的类名" },
      ],
      usage: [
        {
          file: "App.tsx",
          code: `import { DeepAgentComposer } from "solen-design/solid";

export default function App() {
  return <DeepAgentComposer />;
}`,
        },
      ],
    },
    {
      name: "Preact",
      install: "npm install solen-design preact gsap@3.12.7",
      dependencies: deps(`preact ${ENGINE_DEPS}`),
      files: [{ name: "DeepAgentComposer.preact.tsx", code: preactSource }, ...CORE],
      api: [
        { name: "options", type: "DeepAgentComposerOptions", default: "—", description: "组件选项" },
        { name: "className", type: "string", default: "—", description: "宿主元素的类名" },
      ],
      usage: [
        {
          file: "App.tsx",
          code: `import { DeepAgentComposer } from "solen-design/preact";

export default function App() {
  return <DeepAgentComposer />;
}`,
        },
      ],
    },
    {
      name: "Vanilla",
      install: "npm install solen-design gsap@3.12.7",
      dependencies: deps(ENGINE_DEPS),
      files: [{ name: "DeepAgentComposer.ts", code: vanillaSource }, ...CORE],
      api: [
        { name: "options", type: "DeepAgentComposerOptions", default: "—", description: "组件选项" },
        { name: "target", type: "HTMLElement", default: "—", description: "挂载的宿主元素" },
        { name: "controller.update", type: "(options) => void", default: "—", description: "更新选项" },
        { name: "controller.destroy", type: "() => void", default: "—", description: "销毁并清理" },
      ],
      usage: [
        {
          file: "main.ts",
          code: `import { mountDeepAgentComposer } from "solen-design/vanilla";

const target = document.querySelector<HTMLElement>("#demo")!;
const component = mountDeepAgentComposer(target);

// 卸载时
// component.destroy();`,
        },
      ],
    },
  ],
  prompt: specSource,
};
