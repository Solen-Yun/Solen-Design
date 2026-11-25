<script lang="ts">
import { onMount } from "svelte";
import { mountParallelCoords, type ParallelCoordsOptions } from "../../components/parallel-coords/ParallelCoordsEngine.js";
import type { MotionController } from "../../components/parallel-coords/motion-runtime";
export let options: ParallelCoordsOptions = {};
let host: HTMLDivElement;
let controller: MotionController | undefined;
onMount(() => {
  const instance = mountParallelCoords(host, options);
  controller = instance;
  return () => { instance.destroy(); controller = undefined; };
});
$: controller?.update(options);
</script>

<div bind:this={host} class={$$restProps.class} data-motion-component="parallel-coords"></div>
