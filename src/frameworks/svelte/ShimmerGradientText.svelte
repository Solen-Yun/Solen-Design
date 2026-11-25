<script lang="ts">
import { onMount } from "svelte";
import { mountShimmerGradientText, type ShimmerGradientTextOptions } from "../../components/shimmer-gradient-text/ShimmerGradientTextEngine.js";
import type { MotionController } from "../../components/shimmer-gradient-text/motion-runtime";
export let options: ShimmerGradientTextOptions = {};
let host: HTMLDivElement;
let controller: MotionController | undefined;
onMount(() => {
  const instance = mountShimmerGradientText(host, options);
  controller = instance;
  return () => { instance.destroy(); controller = undefined; };
});
$: controller?.update(options);
</script>

<div bind:this={host} class={$$restProps.class} data-motion-component="shimmer-gradient-text"></div>
