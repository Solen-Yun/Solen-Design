import entrySource from "../../src/components/spider-music-player/SpiderMusicPlayer.tsx?raw";
import engineSource from "../../src/components/spider-music-player/SpiderMusicPlayerEngine.js?raw";
import runtimeSource from "../../src/components/spider-music-player/motion-runtime.ts?raw";
import typesSource from "../../src/components/spider-music-player/SpiderMusicPlayerEngine.d.ts?raw";
import vueSource from "../../src/frameworks/vue/SpiderMusicPlayer.vue?raw";
import svelteSource from "../../src/frameworks/svelte/SpiderMusicPlayer.svelte?raw";
import solidSource from "../../src/frameworks/solid/SpiderMusicPlayer.solid.tsx?raw";
import preactSource from "../../src/frameworks/preact/SpiderMusicPlayer.preact.tsx?raw";
import vanillaSource from "../../src/frameworks/vanilla/SpiderMusicPlayer.ts?raw";
import specSource from "../../src/components/spider-music-player/SPEC.md?raw";

const CORE = [
  { name: "SpiderMusicPlayerEngine.js", code: engineSource },
  { name: "motion-runtime.ts", code: runtimeSource },
  { name: "SpiderMusicPlayerEngine.d.ts", code: typesSource },
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
      install: "npm install solen-design react react-dom gsap@3.12.7",
      dependencies: deps("react react-dom gsap@3.12.7"),
      files: [{ name: "SpiderMusicPlayer.tsx", code: entrySource }, ...CORE],
      api: [
        { name: "options", type: "SpiderMusicPlayerOptions", default: "—", description: "组件选项" },
        { name: "className", type: "string", default: "—", description: "宿主元素的类名" },
      ],
      usage: [
        {
          file: "App.tsx",
          code: `import { SpiderMusicPlayer } from "solen-design/react";

export default function App() {
  return <SpiderMusicPlayer options={{ track: 0 }} />;
}`,
        },
      ],
    },
    {
      name: "Vue",
      install: "npm install solen-design vue gsap@3.12.7",
      dependencies: deps("vue gsap@3.12.7"),
      files: [{ name: "SpiderMusicPlayer.vue", code: vueSource }, ...CORE],
      api: [
        { name: "options", type: "SpiderMusicPlayerOptions", default: "—", description: "组件选项" },
        { name: "class", type: "string", default: "—", description: "宿主元素的类名" },
      ],
      usage: [
        {
          file: "App.vue",
          code: `<script setup>
import { SpiderMusicPlayer } from "solen-design/vue";
</script>

<template>
  <SpiderMusicPlayer :options="{ track: 0 }" />
</template>`,
        },
      ],
    },
    {
      name: "Svelte",
      install: "npm install solen-design svelte gsap@3.12.7",
      dependencies: deps("svelte gsap@3.12.7"),
      files: [{ name: "SpiderMusicPlayer.svelte", code: svelteSource }, ...CORE],
      api: [
        { name: "options", type: "SpiderMusicPlayerOptions", default: "—", description: "组件选项" },
        { name: "class", type: "string", default: "—", description: "宿主元素的类名" },
      ],
      usage: [
        {
          file: "App.svelte",
          code: `<script>
  import { SpiderMusicPlayer } from "solen-design/svelte";
</script>

<SpiderMusicPlayer options={{ track: 0 }} />`,
        },
      ],
    },
    {
      name: "Solid",
      install: "npm install solen-design solid-js gsap@3.12.7",
      dependencies: deps("solid-js gsap@3.12.7"),
      files: [{ name: "SpiderMusicPlayer.solid.tsx", code: solidSource }, ...CORE],
      api: [
        { name: "options", type: "SpiderMusicPlayerOptions", default: "—", description: "组件选项" },
        { name: "class", type: "string", default: "—", description: "宿主元素的类名" },
      ],
      usage: [
        {
          file: "App.tsx",
          code: `import { SpiderMusicPlayer } from "solen-design/solid";

export default function App() {
  return <SpiderMusicPlayer options={{ track: 0 }} />;
}`,
        },
      ],
    },
    {
      name: "Preact",
      install: "npm install solen-design preact gsap@3.12.7",
      dependencies: deps("preact gsap@3.12.7"),
      files: [{ name: "SpiderMusicPlayer.preact.tsx", code: preactSource }, ...CORE],
      api: [
        { name: "options", type: "SpiderMusicPlayerOptions", default: "—", description: "组件选项" },
        { name: "className", type: "string", default: "—", description: "宿主元素的类名" },
      ],
      usage: [
        {
          file: "App.tsx",
          code: `import { SpiderMusicPlayer } from "solen-design/preact";

export default function App() {
  return <SpiderMusicPlayer options={{ track: 0 }} />;
}`,
        },
      ],
    },
    {
      name: "Vanilla",
      install: "npm install solen-design gsap@3.12.7",
      dependencies: deps("gsap@3.12.7"),
      files: [{ name: "SpiderMusicPlayer.ts", code: vanillaSource }, ...CORE],
      api: [
        { name: "options", type: "SpiderMusicPlayerOptions", default: "—", description: "组件选项" },
        { name: "target", type: "HTMLElement", default: "—", description: "挂载的宿主元素" },
        { name: "controller.update", type: "(options) => void", default: "—", description: "更新选项" },
        { name: "controller.destroy", type: "() => void", default: "—", description: "销毁并清理" },
      ],
      usage: [
        {
          file: "main.ts",
          code: `import { mountSpiderMusicPlayer } from "solen-design/vanilla";

const target = document.querySelector<HTMLElement>("#demo")!;
const component = mountSpiderMusicPlayer(target, { track: 0 });

// 卸载时
// component.destroy();`,
        },
      ],
    },
  ],
  prompt: specSource,
};
