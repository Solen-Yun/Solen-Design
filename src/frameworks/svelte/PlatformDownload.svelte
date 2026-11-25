<script lang="ts">
import { onMount } from "svelte";
import { mountPlatformDownload, type PlatformDownloadOptions } from "../../components/platform-download/PlatformDownloadEngine.js";
import type { MotionController } from "../../components/platform-download/motion-runtime";
export let options: PlatformDownloadOptions = {};
let host: HTMLDivElement;
let controller: MotionController | undefined;
onMount(() => {
  const instance = mountPlatformDownload(host, options);
  controller = instance;
  return () => { instance.destroy(); controller = undefined; };
});
$: controller?.update(options);
</script>

<div bind:this={host} class={$$restProps.class} data-motion-component="platform-download"></div>
