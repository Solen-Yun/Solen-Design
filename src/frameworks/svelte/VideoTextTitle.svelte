<script lang="ts">
import { onMount } from "svelte";
import { mountVideoTextTitle, type VideoTextTitleOptions } from "../../components/video-text-title/VideoTextTitleEngine.js";
import type { MotionController } from "../../components/video-text-title/motion-runtime";
export let options: VideoTextTitleOptions = {};
let host: HTMLDivElement;
let controller: MotionController | undefined;
onMount(() => {
  const instance = mountVideoTextTitle(host, options);
  controller = instance;
  return () => { instance.destroy(); controller = undefined; };
});
$: controller?.update(options);
</script>

<div bind:this={host} class={$$restProps.class} data-motion-component="video-text-title"></div>
