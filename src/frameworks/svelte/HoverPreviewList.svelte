<script lang="ts">
import { onMount } from "svelte";
import { mountHoverPreviewList, type HoverPreviewListOptions } from "../../components/hover-preview-list/HoverPreviewListEngine.js";
import type { MotionController } from "../../components/hover-preview-list/motion-runtime";
export let options: HoverPreviewListOptions = {};
let host: HTMLDivElement;
let controller: MotionController | undefined;
onMount(() => {
  const instance = mountHoverPreviewList(host, options);
  controller = instance;
  return () => { instance.destroy(); controller = undefined; };
});
$: controller?.update(options);
</script>

<div bind:this={host} class={$$restProps.class} data-motion-component="hover-preview-list"></div>
