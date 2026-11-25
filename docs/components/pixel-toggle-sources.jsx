import entrySource from "../../src/components/pixel-toggle/PixelToggle.tsx?raw";
import engineSource from "../../src/components/pixel-toggle/PixelToggleEngine.js?raw";
import runtimeSource from "../../src/components/pixel-toggle/motion-runtime.ts?raw";
import typesSource from "../../src/components/pixel-toggle/PixelToggleEngine.d.ts?raw";
import vueSource from "../../src/frameworks/vue/PixelToggle.vue?raw";
import svelteSource from "../../src/frameworks/svelte/PixelToggle.svelte?raw";
import solidSource from "../../src/frameworks/solid/PixelToggle.solid.tsx?raw";
import preactSource from "../../src/frameworks/preact/PixelToggle.preact.tsx?raw";
import vanillaSource from "../../src/frameworks/vanilla/PixelToggle.ts?raw";
import specSource from "../../src/components/pixel-toggle/SPEC.md?raw";

const CORE = [
  { name: "PixelToggleEngine.js", code: engineSource },
  { name: "motion-runtime.ts", code: runtimeSource },
  { name: "PixelToggleEngine.d.ts", code: typesSource },
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
      files: [{ name: "PixelToggle.tsx", code: entrySource }, ...CORE],
      api: [
        { name: "options", type: "PixelToggleOptions", default: "—", description: "组件选项" },
        { name: "className", type: "string", default: "—", description: "宿主元素的类名" },
      ],
      usage: [
        {
          file: "App.tsx",
          code: `import { PixelToggle } from "solen-design/react";

export default function App() {
  return <PixelToggle options={{ checked: day, onCheckedChange: setDay }} />;
}`,
        },
      ],
    },
    {
      name: "Vue",
      install: "npm install solen-design vue",
      dependencies: deps("vue"),
      files: [{ name: "PixelToggle.vue", code: vueSource }, ...CORE],
      api: [
        { name: "options", type: "PixelToggleOptions", default: "—", description: "组件选项" },
        { name: "class", type: "string", default: "—", description: "宿主元素的类名" },
      ],
      usage: [
        {
          file: "App.vue",
          code: `<script setup>
import { PixelToggle } from "solen-design/vue";
</script>

<template>
  <PixelToggle :options="{ checked: day, onCheckedChange: setDay }" />
</template>`,
        },
      ],
    },
    {
      name: "Svelte",
      install: "npm install solen-design svelte",
      dependencies: deps("svelte"),
      files: [{ name: "PixelToggle.svelte", code: svelteSource }, ...CORE],
      api: [
        { name: "options", type: "PixelToggleOptions", default: "—", description: "组件选项" },
        { name: "class", type: "string", default: "—", description: "宿主元素的类名" },

      ],
      usage: [
        {
          file: "App.svelte",
          code: `<script>
  import { PixelToggle } from "solen-design/svelte";
</script>

<PixelToggle options={{ checked: day, onCheckedChange: setDay }} />`,
        },
      ],
    },
    {
      name: "Solid",
      install: "npm install solen-design solid-js",
      dependencies: deps("solid-js"),
      files: [{ name: "PixelToggle.solid.tsx", code: solidSource }, ...CORE],
      api: [
        { name: "options", type: "PixelToggleOptions", default: "—", description: "组件选项" },
        { name: "class", type: "string", default: "—", description: "宿主元素的类名" },
      ],
      usage: [
        {
          file: "App.tsx",
          code: `import { PixelToggle } from "solen-design/solid";

export default function App() {
  return <PixelToggle options={{ checked: day(), onCheckedChange: setDay }} />;
}`,
        },
      ],
    },
    {
      name: "Preact",
      install: "npm install solen-design preact",
      dependencies: deps("preact"),
      files: [{ name: "PixelToggle.preact.tsx", code: preactSource }, ...CORE],
      api: [
        { name: "options", type: "PixelToggleOptions", default: "—", description: "组件选项" },
        { name: "className", type: "string", default: "—", description: "宿主元素的类名" },
      ],
      usage: [
        {
          file: "App.tsx",
          code: `import { PixelToggle } from "solen-design/preact";

export default function App() {
  return <PixelToggle options={{ checked: day, onCheckedChange: setDay }} />;
}`,
        },
      ],
    },
    {
      name: "Vanilla",
      install: "npm install solen-design",
      dependencies: null,
      files: [{ name: "PixelToggle.ts", code: vanillaSource }, ...CORE],
      api: [
        { name: "options", type: "PixelToggleOptions", default: "—", description: "组件选项" },
        { name: "target", type: "HTMLElement", default: "—", description: "挂载的宿主元素" },
        { name: "controller.update", type: "(options) => void", default: "—", description: "更新选项" },
        { name: "controller.destroy", type: "() => void", default: "—", description: "销毁并清理" },
      ],
      usage: [
        {
          file: "main.ts",
          code: `import { mountPixelToggle } from "solen-design/vanilla";

const target = document.querySelector<HTMLElement>("#demo")!;
const component = mountPixelToggle(target);

// 卸载时
// component.destroy();`,
        },
      ],
    },
  ],
  prompt: specSource,
};
