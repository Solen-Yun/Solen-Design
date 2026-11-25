<script lang="ts">
import { onMount } from "svelte";
import { mountPopulationPyramid, type PopulationPyramidOptions } from "../../components/population-pyramid/PopulationPyramidEngine.js";
import type { MotionController } from "../../components/population-pyramid/motion-runtime";
export let options: PopulationPyramidOptions = {};
let host: HTMLDivElement;
let controller: MotionController | undefined;
onMount(() => {
  const instance = mountPopulationPyramid(host, options);
  controller = instance;
  return () => { instance.destroy(); controller = undefined; };
});
$: controller?.update(options);
</script>

<div bind:this={host} class={$$restProps.class} data-motion-component="population-pyramid"></div>
