<script lang="ts">
import { onMount } from "svelte";
import { mountScrollExpandVideo, type ScrollExpandVideoOptions } from "../../components/scroll-expand-video/ScrollExpandVideoEngine.js";
import type { MotionController } from "../../components/scroll-expand-video/motion-runtime";
export let options: ScrollExpandVideoOptions = {};
let host: HTMLDivElement;
let controller: MotionController | undefined;
onMount(() => {
  const instance = mountScrollExpandVideo(host, options);
  controller = instance;
  return () => { instance.destroy(); controller = undefined; };
});
$: controller?.update(options);
</script>

<div bind:this={host} class={$$restProps.class} data-motion-component="scroll-expand-video"></div>
