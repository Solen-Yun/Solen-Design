<script lang="ts">
import { onMount } from "svelte";
import { mountBlurUpGallery, type BlurUpGalleryOptions } from "../../components/blur-up-gallery/BlurUpGalleryEngine.js";
import type { MotionController } from "../../components/blur-up-gallery/motion-runtime";
export let options: BlurUpGalleryOptions = {};
let host: HTMLDivElement;
let controller: MotionController | undefined;
onMount(() => {
  const instance = mountBlurUpGallery(host, options);
  controller = instance;
  return () => { instance.destroy(); controller = undefined; };
});
$: controller?.update(options);
</script>

<div bind:this={host} class={$$restProps.class} data-motion-component="blur-up-gallery"></div>
