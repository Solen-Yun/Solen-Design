<script lang="ts">
import { onMount } from "svelte";
import { mountMarkerHighlight, type MarkerHighlightOptions } from "../../components/marker-highlight/MarkerHighlightEngine.js";
import type { MotionController } from "../../components/marker-highlight/motion-runtime";
export let options: MarkerHighlightOptions = {};
let host: HTMLDivElement;
let controller: MotionController | undefined;
onMount(() => {
  const instance = mountMarkerHighlight(host, options);
  controller = instance;
  return () => { instance.destroy(); controller = undefined; };
});
$: controller?.update(options);
</script>

<div bind:this={host} class={$$restProps.class} data-motion-component="marker-highlight"></div>
