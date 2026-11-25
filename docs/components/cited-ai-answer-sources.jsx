import entrySource from "../../src/components/cited-ai-answer/CitedAiAnswer.tsx?raw";
import engineSource from "../../src/components/cited-ai-answer/CitedAiAnswerEngine.js?raw";
import runtimeSource from "../../src/components/cited-ai-answer/motion-runtime.ts?raw";
import typesSource from "../../src/components/cited-ai-answer/CitedAiAnswerEngine.d.ts?raw";
import vueSource from "../../src/frameworks/vue/CitedAiAnswer.vue?raw";
import svelteSource from "../../src/frameworks/svelte/CitedAiAnswer.svelte?raw";
import solidSource from "../../src/frameworks/solid/CitedAiAnswer.solid.tsx?raw";
import preactSource from "../../src/frameworks/preact/CitedAiAnswer.preact.tsx?raw";
import vanillaSource from "../../src/frameworks/vanilla/CitedAiAnswer.ts?raw";
import specSource from "../../src/components/cited-ai-answer/SPEC.md?raw";

const CORE = [
  { name: "CitedAiAnswerEngine.js", code: engineSource },
  { name: "motion-runtime.ts", code: runtimeSource },
  { name: "CitedAiAnswerEngine.d.ts", code: typesSource },
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
      files: [{ name: "CitedAiAnswer.tsx", code: entrySource }, ...CORE],
      api: [
        { name: "options", type: "CitedAiAnswerOptions", default: "—", description: "组件选项" },
        { name: "className", type: "string", default: "—", description: "宿主元素的类名" },
      ],
      usage: [
        {
          file: "App.tsx",
          code: `import { CitedAiAnswer } from "solen-design/react";

export default function App() {
  return <CitedAiAnswer />;
}`,
        },
      ],
    },
    {
      name: "Vue",
      install: "npm install solen-design vue",
      dependencies: deps("vue"),
      files: [{ name: "CitedAiAnswer.vue", code: vueSource }, ...CORE],
      api: [
        { name: "options", type: "CitedAiAnswerOptions", default: "—", description: "组件选项" },
        { name: "class", type: "string", default: "—", description: "宿主元素的类名" },
      ],
      usage: [
        {
          file: "App.vue",
          code: `<script setup>
import { CitedAiAnswer } from "solen-design/vue";
</script>

<template>
  <CitedAiAnswer />
</template>`,
        },
      ],
    },
    {
      name: "Svelte",
      install: "npm install solen-design svelte",
      dependencies: deps("svelte"),
      files: [{ name: "CitedAiAnswer.svelte", code: svelteSource }, ...CORE],
      api: [
        { name: "options", type: "CitedAiAnswerOptions", default: "—", description: "组件选项" },
        { name: "class", type: "string", default: "—", description: "宿主元素的类名" },
      ],
      usage: [
        {
          file: "App.svelte",
          code: `<script>
  import { CitedAiAnswer } from "solen-design/svelte";
</script>

<CitedAiAnswer />`,
        },
      ],
    },
    {
      name: "Solid",
      install: "npm install solen-design solid-js",
      dependencies: deps(`solid-js`),
      files: [{ name: "CitedAiAnswer.solid.tsx", code: solidSource }, ...CORE],
      api: [
        { name: "options", type: "CitedAiAnswerOptions", default: "—", description: "组件选项" },
        { name: "class", type: "string", default: "—", description: "宿主元素的类名" },
      ],
      usage: [
        {
          file: "App.tsx",
          code: `import { CitedAiAnswer } from "solen-design/solid";

export default function App() {
  return <CitedAiAnswer />;
}`,
        },
      ],
    },
    {
      name: "Preact",
      install: "npm install solen-design preact",
      dependencies: deps(`preact`),
      files: [{ name: "CitedAiAnswer.preact.tsx", code: preactSource }, ...CORE],
      api: [
        { name: "options", type: "CitedAiAnswerOptions", default: "—", description: "组件选项" },
        { name: "className", type: "string", default: "—", description: "宿主元素的类名" },
      ],
      usage: [
        {
          file: "App.tsx",
          code: `import { CitedAiAnswer } from "solen-design/preact";

export default function App() {
  return <CitedAiAnswer />;
}`,
        },
      ],
    },
    {
      name: "Vanilla",
      install: "npm install solen-design",
      dependencies: null,
      files: [{ name: "CitedAiAnswer.ts", code: vanillaSource }, ...CORE],
      api: [
        { name: "options", type: "CitedAiAnswerOptions", default: "—", description: "组件选项" },
        { name: "target", type: "HTMLElement", default: "—", description: "挂载的宿主元素" },
        { name: "controller.update", type: "(options) => void", default: "—", description: "更新选项" },
        { name: "controller.destroy", type: "() => void", default: "—", description: "销毁并清理" },
      ],
      usage: [
        {
          file: "main.ts",
          code: `import { mountCitedAiAnswer } from "solen-design/vanilla";

const target = document.querySelector<HTMLElement>("#demo")!;
const component = mountCitedAiAnswer(target);

// 卸载时
// component.destroy();`,
        },
      ],
    },
  ],
  prompt: specSource,
};
