<script lang="ts">
import { onMount } from "svelte";
import { mountTopographicContours, type TopographicContoursOptions } from "../../components/topographic-contours/TopographicContoursEngine.js";
import type { MotionController } from "../../components/topographic-contours/motion-runtime";
export let options: TopographicContoursOptions = {};
let host: HTMLDivElement;
let controller: MotionController | undefined;
onMount(() => {
  const instance = mountTopographicContours(host, options);
  controller = instance;
  return () => { instance.destroy(); controller = undefined; };
});
$: controller?.update(options);
</script>

<div bind:this={host} class={$$restProps.class} data-motion-component="topographic-contours"></div>
