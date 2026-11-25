<script lang="ts">
import { onMount } from "svelte";
import { mountImageOptimizer, type ImageOptimizerOptions } from "../../components/image-optimizer/ImageOptimizerEngine.js";
import type { MotionController } from "../../components/image-optimizer/motion-runtime";
export let options: ImageOptimizerOptions = {};
let host: HTMLDivElement;
let controller: MotionController | undefined;
onMount(() => {
  const instance = mountImageOptimizer(host, options);
  controller = instance;
  return () => { instance.destroy(); controller = undefined; };
});
$: controller?.update(options);
</script>

<div bind:this={host} class={$$restProps.class} data-motion-component="image-optimizer"></div>
