<script lang="ts">
import { onMount } from "svelte";
import { mountBlindsSliceSlider, type BlindsSliceSliderOptions } from "../../components/blinds-slice-slider/BlindsSliceSliderEngine.js";
import type { MotionController } from "../../components/blinds-slice-slider/motion-runtime";
export let options: BlindsSliceSliderOptions = {};
let host: HTMLDivElement;
let controller: MotionController | undefined;
onMount(() => {
  const instance = mountBlindsSliceSlider(host, options);
  controller = instance;
  return () => { instance.destroy(); controller = undefined; };
});
$: controller?.update(options);
</script>

<div bind:this={host} class={$$restProps.class} data-motion-component="blinds-slice-slider"></div>
