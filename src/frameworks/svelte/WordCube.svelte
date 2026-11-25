<script lang="ts">
import { onMount } from "svelte";
import { mountWordCube, type WordCubeOptions } from "../../components/word-cube/WordCubeEngine.js";
import type { MotionController } from "../../components/word-cube/motion-runtime";
export let options: WordCubeOptions = {};
let host: HTMLDivElement;
let controller: MotionController | undefined;
onMount(() => {
  const instance = mountWordCube(host, options);
  controller = instance;
  return () => { instance.destroy(); controller = undefined; };
});
$: controller?.update(options);
</script>

<div bind:this={host} class={$$restProps.class} data-motion-component="word-cube"></div>
