<script lang="ts">
import { onMount } from "svelte";
import { mountGalaxyEffortSlider, type GalaxyEffortSliderOptions } from "../../components/galaxy-effort-slider/GalaxyEffortSliderEngine.js";
import type { MotionController } from "../../components/galaxy-effort-slider/motion-runtime";
export let options: GalaxyEffortSliderOptions = {};
let host: HTMLDivElement;
let controller: MotionController | undefined;
onMount(() => {
  const instance = mountGalaxyEffortSlider(host, options);
  controller = instance;
  return () => { instance.destroy(); controller = undefined; };
});
$: controller?.update(options);
</script>

<div bind:this={host} class={$$restProps.class} data-motion-component="galaxy-effort-slider"></div>
