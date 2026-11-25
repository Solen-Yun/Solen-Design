<script lang="ts">
import { onMount } from "svelte";
import { mountSitePreloader, type SitePreloaderOptions } from "../../components/site-preloader/SitePreloaderEngine.js";
import type { MotionController } from "../../components/site-preloader/motion-runtime";
export let options: SitePreloaderOptions = {};
let host: HTMLDivElement;
let controller: MotionController | undefined;
onMount(() => {
  const instance = mountSitePreloader(host, options);
  controller = instance;
  return () => { instance.destroy(); controller = undefined; };
});
$: controller?.update(options);
</script>

<div bind:this={host} class={$$restProps.class} data-motion-component="site-preloader"></div>
