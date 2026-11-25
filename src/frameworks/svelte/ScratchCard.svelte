<script lang="ts">
import { onMount } from "svelte";
import { mountScratchCard, type ScratchCardOptions } from "../../components/scratch-card/ScratchCardEngine.js";
import type { MotionController } from "../../components/scratch-card/motion-runtime";
export let options: ScratchCardOptions = {};
let host: HTMLDivElement;
let controller: MotionController | undefined;
onMount(() => {
  const instance = mountScratchCard(host, options);
  controller = instance;
  return () => { instance.destroy(); controller = undefined; };
});
$: controller?.update(options);
</script>

<div bind:this={host} class={$$restProps.class} data-motion-component="scratch-card"></div>
