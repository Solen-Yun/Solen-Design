import entrySource from "../../src/components/voice-record-button/VoiceRecordButton.tsx?raw";
import engineSource from "../../src/components/voice-record-button/VoiceRecordButtonEngine.js?raw";
import runtimeSource from "../../src/components/voice-record-button/motion-runtime.ts?raw";
import typesSource from "../../src/components/voice-record-button/VoiceRecordButtonEngine.d.ts?raw";
import vueSource from "../../src/frameworks/vue/VoiceRecordButton.vue?raw";
import svelteSource from "../../src/frameworks/svelte/VoiceRecordButton.svelte?raw";
import solidSource from "../../src/frameworks/solid/VoiceRecordButton.solid.tsx?raw";
import preactSource from "../../src/frameworks/preact/VoiceRecordButton.preact.tsx?raw";
import vanillaSource from "../../src/frameworks/vanilla/VoiceRecordButton.ts?raw";
import specSource from "../../src/components/voice-record-button/SPEC.md?raw";

const CORE = [
  { name: "VoiceRecordButtonEngine.js", code: engineSource },
  { name: "motion-runtime.ts", code: runtimeSource },
  { name: "VoiceRecordButtonEngine.d.ts", code: typesSource },
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
      files: [{ name: "VoiceRecordButton.tsx", code: entrySource }, ...CORE],
      api: [
        { name: "options", type: "VoiceRecordButtonOptions", default: "—", description: "组件选项" },
        { name: "className", type: "string", default: "—", description: "宿主元素的类名" },
      ],
      usage: [
        {
          file: "App.tsx",
          code: `import { VoiceRecordButton } from "solen-design/react";

export default function App() {
  return <VoiceRecordButton />;
}`,
        },
      ],
    },
    {
      name: "Vue",
      install: "npm install solen-design vue",
      dependencies: deps("vue"),
      files: [{ name: "VoiceRecordButton.vue", code: vueSource }, ...CORE],
      api: [
        { name: "options", type: "VoiceRecordButtonOptions", default: "—", description: "组件选项" },
        { name: "class", type: "string", default: "—", description: "宿主元素的类名" },
      ],
      usage: [
        {
          file: "App.vue",
          code: `<script setup>
import { VoiceRecordButton } from "solen-design/vue";
</script>

<template>
  <VoiceRecordButton />
</template>`,
        },
      ],
    },
    {
      name: "Svelte",
      install: "npm install solen-design svelte",
      dependencies: deps("svelte"),
      files: [{ name: "VoiceRecordButton.svelte", code: svelteSource }, ...CORE],
      api: [
        { name: "options", type: "VoiceRecordButtonOptions", default: "—", description: "组件选项" },
        { name: "class", type: "string", default: "—", description: "宿主元素的类名" },
      ],
      usage: [
        {
          file: "App.svelte",
          code: `<script>
  import { VoiceRecordButton } from "solen-design/svelte";
</script>

<VoiceRecordButton />`,
        },
      ],
    },
    {
      name: "Solid",
      install: "npm install solen-design solid-js",
      dependencies: deps(`solid-js`),
      files: [{ name: "VoiceRecordButton.solid.tsx", code: solidSource }, ...CORE],
      api: [
        { name: "options", type: "VoiceRecordButtonOptions", default: "—", description: "组件选项" },
        { name: "class", type: "string", default: "—", description: "宿主元素的类名" },
      ],
      usage: [
        {
          file: "App.tsx",
          code: `import { VoiceRecordButton } from "solen-design/solid";

export default function App() {
  return <VoiceRecordButton />;
}`,
        },
      ],
    },
    {
      name: "Preact",
      install: "npm install solen-design preact",
      dependencies: deps(`preact`),
      files: [{ name: "VoiceRecordButton.preact.tsx", code: preactSource }, ...CORE],
      api: [
        { name: "options", type: "VoiceRecordButtonOptions", default: "—", description: "组件选项" },
        { name: "className", type: "string", default: "—", description: "宿主元素的类名" },
      ],
      usage: [
        {
          file: "App.tsx",
          code: `import { VoiceRecordButton } from "solen-design/preact";

export default function App() {
  return <VoiceRecordButton />;
}`,
        },
      ],
    },
    {
      name: "Vanilla",
      install: "npm install solen-design",
      dependencies: null,
      files: [{ name: "VoiceRecordButton.ts", code: vanillaSource }, ...CORE],
      api: [
        { name: "options", type: "VoiceRecordButtonOptions", default: "—", description: "组件选项" },
        { name: "target", type: "HTMLElement", default: "—", description: "挂载的宿主元素" },
        { name: "controller.update", type: "(options) => void", default: "—", description: "更新选项" },
        { name: "controller.destroy", type: "() => void", default: "—", description: "销毁并清理" },
      ],
      usage: [
        {
          file: "main.ts",
          code: `import { mountVoiceRecordButton } from "solen-design/vanilla";

const target = document.querySelector<HTMLElement>("#demo")!;
const component = mountVoiceRecordButton(target);

// 卸载时
// component.destroy();`,
        },
      ],
    },
  ],
  prompt: specSource,
};
