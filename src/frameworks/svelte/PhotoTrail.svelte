<script lang="ts">
import { onMount } from "svelte";
import { mountPhotoTrail, type PhotoTrailOptions } from "../../components/photo-trail/PhotoTrailEngine.js";
import type { MotionController } from "../../components/photo-trail/motion-runtime";
export let options: PhotoTrailOptions = {};
let host: HTMLDivElement;
let controller: MotionController | undefined;
onMount(() => {
  const instance = mountPhotoTrail(host, options);
  controller = instance;
  return () => { instance.destroy(); controller = undefined; };
});
$: controller?.update(options);
</script>

<div bind:this={host} class={$$restProps.class} data-motion-component="photo-trail"></div>
