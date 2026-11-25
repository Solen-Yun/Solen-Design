<script lang="ts">
import { onMount } from "svelte";
import { mountRidgeline, type RidgelineOptions } from "../../components/ridgeline/RidgelineEngine.js";
import type { MotionController } from "../../components/ridgeline/motion-runtime";
export let options: RidgelineOptions = {};
let host: HTMLDivElement;
let controller: MotionController | undefined;
onMount(() => {
  const instance = mountRidgeline(host, options);
  controller = instance;
  return () => { instance.destroy(); controller = undefined; };
});
$: controller?.update(options);
</script>

<div bind:this={host} class={$$restProps.class} data-motion-component="ridgeline"></div>
