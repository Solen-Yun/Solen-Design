<script lang="ts">
import { onMount } from "svelte";
import { mountFilterDrawer, type FilterDrawerOptions } from "../../components/filter-drawer/FilterDrawerEngine.js";
import type { MotionController } from "../../components/filter-drawer/motion-runtime";
export let options: FilterDrawerOptions = {};
let host: HTMLDivElement;
let controller: MotionController | undefined;
onMount(() => {
  const instance = mountFilterDrawer(host, options);
  controller = instance;
  return () => { instance.destroy(); controller = undefined; };
});
$: controller?.update(options);
</script>

<div bind:this={host} class={$$restProps.class} data-motion-component="filter-drawer"></div>
