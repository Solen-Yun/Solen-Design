<script lang="ts">
import { onMount } from "svelte";
import { mountInkSpreadCarousel, type InkSpreadCarouselOptions } from "../../components/ink-spread-carousel/InkSpreadCarouselEngine.js";
import type { MotionController } from "../../components/ink-spread-carousel/motion-runtime";
export let options: InkSpreadCarouselOptions = {};
let host: HTMLDivElement;
let controller: MotionController | undefined;
onMount(() => {
  const instance = mountInkSpreadCarousel(host, options);
  controller = instance;
  return () => { instance.destroy(); controller = undefined; };
});
$: controller?.update(options);
</script>

<div bind:this={host} class={$$restProps.class} data-motion-component="ink-spread-carousel"></div>
