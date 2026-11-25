<script lang="ts">
import { onMount } from "svelte";
import { mountGridListFlip, type GridListFlipOptions } from "../../components/grid-list-flip/GridListFlipEngine.js";
import type { MotionController } from "../../components/grid-list-flip/motion-runtime";
export let options: GridListFlipOptions = {};
let host: HTMLDivElement;
let controller: MotionController | undefined;
onMount(() => {
  const instance = mountGridListFlip(host, options);
  controller = instance;
  return () => { instance.destroy(); controller = undefined; };
});
$: controller?.update(options);
</script>

<div bind:this={host} class={$$restProps.class} data-motion-component="grid-list-flip"></div>
