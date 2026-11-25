<script lang="ts">
import { onMount } from "svelte";
import { mountPixelDissolveSlider, type PixelDissolveSliderOptions } from "../../components/pixel-dissolve-slider/PixelDissolveSliderEngine.js";
import type { MotionController } from "../../components/pixel-dissolve-slider/motion-runtime";
export let options: PixelDissolveSliderOptions = {};
let host: HTMLDivElement;
let controller: MotionController | undefined;
onMount(() => {
  const instance = mountPixelDissolveSlider(host, options);
  controller = instance;
  return () => { instance.destroy(); controller = undefined; };
});
$: controller?.update(options);
</script>

<div bind:this={host} class={$$restProps.class} data-motion-component="pixel-dissolve-slider"></div>
