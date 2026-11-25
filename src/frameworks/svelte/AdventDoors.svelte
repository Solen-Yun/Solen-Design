<script lang="ts">
import { onMount } from "svelte";
import { mountAdventDoors, type AdventDoorsOptions } from "../../components/advent-doors/AdventDoorsEngine.js";
import type { MotionController } from "../../components/advent-doors/motion-runtime";
export let options: AdventDoorsOptions = {};
let host: HTMLDivElement;
let controller: MotionController | undefined;
onMount(() => {
  const instance = mountAdventDoors(host, options);
  controller = instance;
  return () => { instance.destroy(); controller = undefined; };
});
$: controller?.update(options);
</script>

<div bind:this={host} class={$$restProps.class} data-motion-component="advent-doors"></div>
