<script lang="ts">
import { onMount } from "svelte";
import { mountClipRevealPhotos, type ClipRevealPhotosOptions } from "../../components/clip-reveal-photos/ClipRevealPhotosEngine.js";
import type { MotionController } from "../../components/clip-reveal-photos/motion-runtime";
export let options: ClipRevealPhotosOptions = {};
let host: HTMLDivElement;
let controller: MotionController | undefined;
onMount(() => {
  const instance = mountClipRevealPhotos(host, options);
  controller = instance;
  return () => { instance.destroy(); controller = undefined; };
});
$: controller?.update(options);
</script>

<div bind:this={host} class={$$restProps.class} data-motion-component="clip-reveal-photos"></div>
