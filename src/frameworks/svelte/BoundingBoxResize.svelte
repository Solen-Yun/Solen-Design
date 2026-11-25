<script lang="ts">
import { onMount } from "svelte";
import { mountBoundingBoxResize, type BoundingBoxResizeOptions } from "../../components/bounding-box-resize/BoundingBoxResizeEngine.js";
import type { MotionController } from "../../components/bounding-box-resize/motion-runtime";
export let options: BoundingBoxResizeOptions = {};
let host: HTMLDivElement;
let controller: MotionController | undefined;
onMount(() => {
  const instance = mountBoundingBoxResize(host, options);
  controller = instance;
  return () => { instance.destroy(); controller = undefined; };
});
$: controller?.update(options);
</script>

<div bind:this={host} class={$$restProps.class} data-motion-component="bounding-box-resize"></div>
