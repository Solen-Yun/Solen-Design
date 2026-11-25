<script lang="ts">
import { onMount } from "svelte";
import { mountDragCardCarousel, type DragCardCarouselOptions } from "../../components/drag-card-carousel/DragCardCarouselEngine.js";
import type { MotionController } from "../../components/drag-card-carousel/motion-runtime";
export let options: DragCardCarouselOptions = {};
let host: HTMLDivElement;
let controller: MotionController | undefined;
onMount(() => {
  const instance = mountDragCardCarousel(host, options);
  controller = instance;
  return () => { instance.destroy(); controller = undefined; };
});
$: controller?.update(options);
</script>

<div bind:this={host} class={$$restProps.class} data-motion-component="drag-card-carousel"></div>
