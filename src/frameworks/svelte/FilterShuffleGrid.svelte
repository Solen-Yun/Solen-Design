<script lang="ts">
import { onMount } from "svelte";
import { mountFilterShuffleGrid, type FilterShuffleGridOptions } from "../../components/filter-shuffle-grid/FilterShuffleGridEngine.js";
import type { MotionController } from "../../components/filter-shuffle-grid/motion-runtime";
export let options: FilterShuffleGridOptions = {};
let host: HTMLDivElement;
let controller: MotionController | undefined;
onMount(() => {
  const instance = mountFilterShuffleGrid(host, options);
  controller = instance;
  return () => { instance.destroy(); controller = undefined; };
});
$: controller?.update(options);
</script>

<div bind:this={host} class={$$restProps.class} data-motion-component="filter-shuffle-grid"></div>
