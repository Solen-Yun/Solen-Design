<script lang="ts">
import { onMount } from "svelte";
import { mountInfiniteFeed, type InfiniteFeedOptions } from "../../components/infinite-feed/InfiniteFeedEngine.js";
import type { MotionController } from "../../components/infinite-feed/motion-runtime";
export let options: InfiniteFeedOptions = {};
let host: HTMLDivElement;
let controller: MotionController | undefined;
onMount(() => {
  const instance = mountInfiniteFeed(host, options);
  controller = instance;
  return () => { instance.destroy(); controller = undefined; };
});
$: controller?.update(options);
</script>

<div bind:this={host} class={$$restProps.class} data-motion-component="infinite-feed"></div>
