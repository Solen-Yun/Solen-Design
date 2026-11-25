<script lang="ts">
import { onMount } from "svelte";
import { mountScrollMarqueeRows, type ScrollMarqueeRowsOptions } from "../../components/scroll-marquee-rows/ScrollMarqueeRowsEngine.js";
import type { MotionController } from "../../components/scroll-marquee-rows/motion-runtime";
export let options: ScrollMarqueeRowsOptions = {};
let host: HTMLDivElement;
let controller: MotionController | undefined;
onMount(() => {
  const instance = mountScrollMarqueeRows(host, options);
  controller = instance;
  return () => { instance.destroy(); controller = undefined; };
});
$: controller?.update(options);
</script>

<div bind:this={host} class={$$restProps.class} data-motion-component="scroll-marquee-rows"></div>
