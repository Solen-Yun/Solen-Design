<script lang="ts">
import { onMount } from "svelte";
import { mountHoverScrubThumbs, type HoverScrubThumbsOptions } from "../../components/hover-scrub-thumbs/HoverScrubThumbsEngine.js";
import type { MotionController } from "../../components/hover-scrub-thumbs/motion-runtime";
export let options: HoverScrubThumbsOptions = {};
let host: HTMLDivElement;
let controller: MotionController | undefined;
onMount(() => {
  const instance = mountHoverScrubThumbs(host, options);
  controller = instance;
  return () => { instance.destroy(); controller = undefined; };
});
$: controller?.update(options);
</script>

<div bind:this={host} class={$$restProps.class} data-motion-component="hover-scrub-thumbs"></div>
